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
};

const STORAGE_KEY = "qaLibrary";

function readAll(): QaEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QaEntry[]) : [];
  } catch {
    return [];
  }
}

function writeAll(entries: QaEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function listQa(): QaEntry[] {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function getQaById(id: string): QaEntry | undefined {
  return readAll().find((e) => e.id === id);
}

export function removeQa(id: string) {
  const all = readAll().filter((e) => e.id !== id);
  writeAll(all);
}

export function removeLegacyQa(): number {
  const all = readAll();
  const keep = all.filter((e) => e.questionNumber && e.slug);
  const deleted = all.length - keep.length;
  writeAll(keep);
  return deleted;
}

export function upsertQa(entry: Partial<QaEntry> & { id?: string }): QaEntry {
  const all = readAll();
  const now = Date.now();

  if (entry.id) {
    const idx = all.findIndex((e) => e.id === entry.id);
    if (idx >= 0) {
      const merged: QaEntry = { ...all[idx], ...entry, updatedAt: now } as QaEntry;
      all[idx] = merged;
      writeAll(all);
      return merged;
    }
  }

  const nextQn = all.reduce((max, e) => (e.questionNumber > max ? e.questionNumber : max), 0) + 1;
  const id = entry.id ?? crypto.randomUUID();
  const record: QaEntry = {
    id,
    title: entry.title || "",
    question: entry.question || "",
    answer: entry.answer || "",
    subject: entry.subject || "",
    paperType: entry.paperType || "",
    price: typeof entry.price === "number" ? entry.price : Number(entry.price ?? 0),
    status: (entry.status as QaEntry["status"]) || "draft",
    createdAt: now,
    updatedAt: now,
    questionNumber: entry.questionNumber ?? nextQn,
    slug: entry.slug || slugify(entry.title || ""),
  };
  all.push(record);
  writeAll(all);
  return record;
}

export function updateQa(id: string, patch: Partial<QaEntry>): QaEntry | undefined {
  const all = readAll();
  const idx = all.findIndex((e) => e.id === id);
  if (idx === -1) return undefined;
  const merged: QaEntry = { ...all[idx], ...patch, updatedAt: Date.now() } as QaEntry;
  all[idx] = merged;
  writeAll(all);
  return merged;
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
