import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listQa, type QaEntry } from "../../lib/qaStore";

const PublicQaList: React.FC = () => {
  const [items, setItems] = useState<QaEntry[]>([]);
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    // Load only published entries
    const data = listQa().filter((e) => e.status === "published");
    setItems(data);
  }, []);

  const subjects = useMemo(() => {
    const set = new Set(items.map((i) => i.subject).filter(Boolean));
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter((i) => {
      if (subject && i.subject !== subject) return false;
      if (!term) return true;
      const hay = `${i.title} ${i.question} ${i.answer} ${i.paperType}`.toLowerCase();
      return hay.includes(term);
    });
  }, [items, q, subject]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Browse Q&A</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search questions..."
            className="w-full sm:w-64 px-3 py-2 rounded border bg-background"
          />
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="px-3 py-2 rounded border bg-background"
          >
            <option value="">All subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-sm text-muted-foreground border rounded p-6">No results found.</div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <li key={e.id} className="border rounded-lg p-4 bg-card">
              <div className="text-xs text-muted-foreground mb-1">#{e.questionNumber} • {e.subject || "General"}</div>
              <h3 className="font-medium line-clamp-2 mb-2" dangerouslySetInnerHTML={{ __html: e.title || e.question }} />
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3" dangerouslySetInnerHTML={{ __html: e.question }} />
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">${e.price.toFixed(2)}</span>
                <Link
                  to={`/question/${e.questionNumber}/${e.slug}`}
                  className="px-3 py-1.5 rounded bg-primary text-primary-foreground"
                >
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublicQaList;
