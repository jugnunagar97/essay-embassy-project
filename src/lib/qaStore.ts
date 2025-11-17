import {
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  Query,
  QueryDocumentSnapshot,
  runTransaction,
  Transaction,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export type QaEntry = {
  id: string;
  title: string;
  question: string;
  answer: string;
  subject: string;
  paperType: string;
  price: number;
  status: "draft" | "published";
  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
  questionNumber: number;
  slug: string;
  assignedEditorId?: string | null;
  assignedEditorEmail?: string | null;
};

const qaCollection = collection(db, "qaEntries");
const countersDoc = doc(db, "counters", "qaEntries");

function mapSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): QaEntry {
  const data = snapshot.data() || {};
  return {
    id: snapshot.id,
    title: data.title || "",
    question: data.question || "",
    answer: data.answer || "",
    subject: data.subject || "",
    paperType: data.paperType || "",
    price: typeof data.price === "number" ? data.price : Number(data.price ?? 0),
    status: data.status === "published" ? "published" : "draft",
    createdAt: typeof data.createdAt === "number" ? data.createdAt : Date.now(),
    updatedAt: typeof data.updatedAt === "number" ? data.updatedAt : Date.now(),
    questionNumber: typeof data.questionNumber === "number" ? data.questionNumber : 0,
    slug: data.slug || slugify(data.title || ""),
    assignedEditorId: data.assignedEditorId || null,
    assignedEditorEmail: data.assignedEditorEmail || null,
  };
}

async function fetchNextQuestionNumber(transaction: Transaction) {
  const counterSnap = await transaction.get(countersDoc);
  const next = counterSnap.exists ? (counterSnap.data()?.nextQuestionNumber ?? 1) : 1;
  transaction.set(
    countersDoc,
    {
      nextQuestionNumber: next + 1,
    },
    { merge: true }
  );
  return next;
}

export async function listQa(options: { status?: QaEntry["status"] } = {}): Promise<QaEntry[]> {
  let q: Query = query(qaCollection, orderBy("createdAt", "desc"));
  if (options.status) {
    q = query(q, where("status", "==", options.status));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapSnapshot);
}

export async function getQaById(id: string): Promise<QaEntry | undefined> {
  const snap = await getDoc(doc(qaCollection, id));
  if (!snap.exists()) return undefined;
  return mapSnapshot(snap);
}

export async function getQaBySlug(slug: string, questionNumber?: number): Promise<QaEntry | undefined> {
  const q = query(qaCollection, where("slug", "==", slug), limit(10));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return undefined;
  const maybe = snapshot.docs
    .map(mapSnapshot)
    .find((entry) => (questionNumber ? entry.questionNumber === questionNumber : true));
  return maybe;
}

export async function removeQa(id: string): Promise<void> {
  await deleteDoc(doc(qaCollection, id));
}

export async function removeLegacyQa(): Promise<number> {
  const snapshot = await getDocs(qaCollection);
  const stale = snapshot.docs.filter((docSnap) => {
    const data = docSnap.data();
    return !data.questionNumber || !data.slug;
  });
  await Promise.all(stale.map((docSnap) => deleteDoc(docSnap.ref)));
  return stale.length;
}

export async function upsertQa(entry: Partial<QaEntry> & { id?: string }): Promise<QaEntry> {
  const now = Date.now();

  if (entry.id) {
    return runTransaction(db, async (transaction) => {
      const docRef = doc(qaCollection, entry.id!);
      const existingSnap = await transaction.get(docRef);
      if (!existingSnap.exists()) {
        throw new Error("Q&A entry not found.");
      }
      const existing = mapSnapshot(existingSnap);
      const updated: QaEntry = {
        ...existing,
        ...entry,
        price: typeof entry.price === "number" ? entry.price : existing.price,
        slug: entry.slug || existing.slug || slugify(entry.title || existing.title),
        updatedAt: now,
      };
      transaction.set(docRef, updated, { merge: true });
      return updated;
    });
  }

  return runTransaction(db, async (transaction) => {
    const newDocRef = doc(qaCollection);
    const questionNumber =
      entry.questionNumber ??
      (await fetchNextQuestionNumber(transaction as unknown as firebase.firestore.Transaction));
    const record: QaEntry = {
      id: newDocRef.id,
      title: entry.title || "",
      question: entry.question || "",
      answer: entry.answer || "",
      subject: entry.subject || "",
      paperType: entry.paperType || "",
      price: typeof entry.price === "number" ? entry.price : Number(entry.price ?? 0),
      status: (entry.status as QaEntry["status"]) || "draft",
      createdAt: now,
      updatedAt: now,
      questionNumber,
      slug: entry.slug || slugify(entry.title || `question-${questionNumber}`),
      assignedEditorId: entry.assignedEditorId || null,
      assignedEditorEmail: entry.assignedEditorEmail || null,
    };
    transaction.set(newDocRef, record);
    return record;
  });
}

export function updateQa(id: string, patch: Partial<QaEntry>): Promise<QaEntry> {
  return upsertQa({ id, ...patch });
}

export function slugify(text: string) {
  return (text || "")
    .toString()
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}
