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
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export type QaAttachment = {
  name: string;
  url: string;
  type: "image" | "pdf";
};

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
  questionNumber: string;
  questionNumberInt: number;
  slug: string;
  assignedEditorId?: string | null;
  assignedEditorEmail?: string | null;
  questionAttachments?: QaAttachment[];
  answerAttachments?: QaAttachment[];
};

const qaCollection = collection(db, "qaEntries");

const formatQuestionNumber = (value: number) => `ee${String(value).padStart(5, "0")}`;

function deriveQuestionNumberInt(
  questionNumberRaw: unknown,
  fallbackRaw: unknown
): number {
  if (typeof questionNumberRaw === "number" && !isNaN(questionNumberRaw)) {
    return questionNumberRaw;
  }
  if (typeof questionNumberRaw === "string" && questionNumberRaw.trim()) {
    const parsed = parseInt(questionNumberRaw.replace(/^ee/i, ""), 10);
    if (!isNaN(parsed)) return parsed;
  }
  if (typeof fallbackRaw === "number" && !isNaN(fallbackRaw)) {
    return fallbackRaw;
  }
  return 0;
}

function parseAttachments(value: unknown): QaAttachment[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (
        item &&
        typeof item === "object" &&
        typeof (item as QaAttachment).name === "string" &&
        typeof (item as QaAttachment).url === "string" &&
        ((item as QaAttachment).type === "image" || (item as QaAttachment).type === "pdf")
      ) {
        return item as QaAttachment;
      }
      return null;
    })
    .filter((item): item is QaAttachment => Boolean(item));
}

function mapSnapshot(snapshot: QueryDocumentSnapshot | DocumentSnapshot): QaEntry {
  const data = snapshot.data() || {};
  const questionNumberInt = deriveQuestionNumberInt(data.questionNumber, data.questionNumberInt);
  const questionNumber =
    typeof data.questionNumber === "string" && data.questionNumber.trim()
      ? data.questionNumber
      : questionNumberInt
      ? formatQuestionNumber(questionNumberInt)
      : "";

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
    questionNumber,
    questionNumberInt,
    slug: data.slug || slugify(data.title || ""),
    assignedEditorId: data.assignedEditorId || null,
    assignedEditorEmail: data.assignedEditorEmail || null,
    questionAttachments: parseAttachments(data.questionAttachments),
    answerAttachments: parseAttachments(data.answerAttachments),
  };
}

async function generateQuestionNumber() {
  const q = query(qaCollection, orderBy("questionNumberInt", "desc"), limit(1));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    const randomStart = Math.floor(Math.random() * 90000) + 10000;
    return {
      questionNumber: formatQuestionNumber(randomStart),
      questionNumberInt: randomStart,
    };
  }

  const docData = snapshot.docs[0].data();
  const lastNumber =
    typeof docData.questionNumberInt === "number"
      ? docData.questionNumberInt
      : deriveQuestionNumberInt(docData.questionNumber, undefined);
  const nextNumber = (lastNumber || 10000) + 1;
  return {
    questionNumber: formatQuestionNumber(nextNumber),
    questionNumberInt: nextNumber,
  };
}

function normalizeQuestionNumberInput(
  questionNumber?: string,
  questionNumberInt?: number
) {
  if (questionNumber && typeof questionNumberInt === "number") {
    return { questionNumber, questionNumberInt };
  }

  if (questionNumber) {
    const parsed = parseInt(questionNumber.replace(/^ee/i, ""), 10);
    return {
      questionNumber,
      questionNumberInt: isNaN(parsed) ? 0 : parsed,
    };
  }

  if (typeof questionNumberInt === "number") {
    return {
      questionNumber: formatQuestionNumber(questionNumberInt),
      questionNumberInt,
    };
  }

  return null;
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

export async function getQaBySlug(slug: string, questionNumber?: string): Promise<QaEntry | undefined> {
  const q = query(qaCollection, where("slug", "==", slug), limit(10));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return undefined;
  const maybe = snapshot.docs
    .map(mapSnapshot)
    .find((entry) => (questionNumber ? entry.questionNumber === questionNumber : true));
  return maybe;
}

export async function getQaByQuestionNumber(questionNumber: string): Promise<QaEntry | undefined> {
  const q = query(qaCollection, where("questionNumber", "==", questionNumber), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return undefined;
  return mapSnapshot(snapshot.docs[0]);
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
      const questionNumberOverrides = normalizeQuestionNumberInput(
        entry.questionNumber,
        entry.questionNumberInt
      );
      const updated: QaEntry = {
        ...existing,
        ...entry,
        price: typeof entry.price === "number" ? entry.price : existing.price,
        slug: entry.slug || existing.slug || slugify(entry.title || existing.title),
        updatedAt: now,
        questionNumber: questionNumberOverrides?.questionNumber ?? existing.questionNumber,
        questionNumberInt: questionNumberOverrides?.questionNumberInt ?? existing.questionNumberInt,
        questionAttachments: entry.questionAttachments ?? existing.questionAttachments,
        answerAttachments: entry.answerAttachments ?? existing.answerAttachments,
      };
      transaction.set(docRef, updated, { merge: true });
      return updated;
    });
  }

  return runTransaction(db, async (transaction) => {
    const newDocRef = doc(qaCollection);
    const normalized = normalizeQuestionNumberInput(
      entry.questionNumber,
      entry.questionNumberInt
    );
    const questionMeta = normalized ?? (await generateQuestionNumber());
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
      questionNumber: questionMeta.questionNumber,
      questionNumberInt: questionMeta.questionNumberInt,
      slug: entry.slug || slugify(entry.title || questionMeta.questionNumber),
      assignedEditorId: entry.assignedEditorId || null,
      assignedEditorEmail: entry.assignedEditorEmail || null,
      questionAttachments: entry.questionAttachments ?? [],
      answerAttachments: entry.answerAttachments ?? [],
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
