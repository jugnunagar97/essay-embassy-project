import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listQa, type QaEntry } from "../../lib/qaStore";

function useUnlocked() {
  const KEY = "qaUnlockedIds";
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setIds(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      setIds([]);
    }
  }, []);
  const isUnlocked = (id: string) => ids.includes(id);
  const unlock = (id: string) => {
    const next = Array.from(new Set([...ids, id]));
    localStorage.setItem(KEY, JSON.stringify(next));
    setIds(next);
  };
  return { ids, isUnlocked, unlock };
}

export type PublicQaDetailProps = {
  questionNumber: number;
  slug: string;
};

const PublicQaDetail: React.FC<PublicQaDetailProps> = ({ questionNumber, slug }) => {
  const [entry, setEntry] = useState<QaEntry | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { isUnlocked, unlock } = useUnlocked();

  useEffect(() => {
    const found = listQa().find(
      (e) => e.status === "published" && e.questionNumber === questionNumber && e.slug === slug
    );
    if (!found) {
      setNotFound(true);
    } else {
      setEntry(found);
    }
  }, [questionNumber, slug]);

  const unlocked = useMemo(() => (entry ? isUnlocked(entry.id) : false), [entry, isUnlocked]);

  // Related questions (same subject, excluding current)
  const related = useMemo(() => {
    if (!entry) return [] as QaEntry[];
    return listQa()
      .filter(
        (e) =>
          e.status === "published" &&
          e.id !== entry.id &&
          (e.subject || "") === (entry.subject || "")
      )
      .slice(0, 6);
  }, [entry]);

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-lg border p-8 bg-card">
          <h1 className="text-xl font-semibold mb-2">Question not found</h1>
          <p className="text-sm text-muted-foreground mb-6">It may have been removed or is not published.</p>
          <Link to="/qa" className="px-4 py-2 rounded bg-primary text-primary-foreground">Back to catalog</Link>
        </div>
      </div>
    );
  }

  if (!entry) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link to="/qa" className="text-sm text-muted-foreground hover:underline">← Back to catalog</Link>
      </div>

      {/* Main layout with sidebar */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8 items-start">
        {/* Content card */}
        <div className="rounded-lg border bg-card">
          <div className="p-5 border-b">
            <div className="text-xs text-muted-foreground">#{entry.questionNumber} • {entry.subject || "General"}</div>
            <h1 className="mt-1 text-2xl font-semibold" dangerouslySetInnerHTML={{ __html: entry.title || entry.question }} />
          </div>

          <div className="p-5 grid gap-6">
            <section>
              <h2 className="text-sm font-medium mb-2">Question</h2>
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: entry.question }} />
            </section>

            {unlocked ? (
              <section>
                <h2 className="text-sm font-medium mb-2">Answer</h2>
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: entry.answer }} />
              </section>
            ) : (
              // Blurred paywall showing a preview of the answer with a centered CTA overlay
              <section className="relative rounded-md border overflow-hidden">
                <div className="absolute inset-0 z-[1] flex items-center justify-center">
                  <div className="rounded-lg bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 border p-4 sm:p-5 shadow-sm mx-3">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <p className="text-base font-semibold">Answer locked</p>
                      <p className="text-sm text-muted-foreground max-w-sm">Pay once to unlock the full worked solution for this question.</p>
                      <button
                        onClick={() => unlock(entry.id)}
                        className="mt-2 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 font-medium shadow-sm hover:opacity-90"
                      >
                        Unlock for ${entry.price.toFixed(2)}
                      </button>
                      <p className="text-xs text-muted-foreground">Instant access • No account required (demo)</p>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none select-none blur-sm opacity-70">
                  <div className="p-4">
                    <h2 className="text-sm font-medium mb-2">Answer (preview)</h2>
                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: entry.answer }} />
                  </div>
                </div>
              </section>
            )}

            <section className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded border p-3">
                <div className="text-muted-foreground">Paper type</div>
                <div className="font-medium">{entry.paperType || "—"}</div>
              </div>
              <div className="rounded border p-3">
                <div className="text-muted-foreground">Price</div>
                <div className="font-medium">${entry.price.toFixed(2)}</div>
              </div>
            </section>

            {/* Bottom sections to complete the page */}
            <section className="rounded-lg border p-4 sm:p-5 bg-secondary/40">
              <h3 className="text-sm font-semibold mb-2">What you'll get</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground grid gap-1">
                <li>Step-by-step derivation and explanations</li>
                <li>Clean math formatting with KaTeX</li>
                <li>Key takeaways and common pitfalls</li>
              </ul>
            </section>

            <section className="rounded-lg border p-4 sm:p-5">
              <h3 className="text-sm font-semibold mb-2">About this question</h3>
              <div className="text-sm text-muted-foreground">
                Tagged under <span className="font-medium text-foreground">{entry.subject || "General"}</span>. Difficulty: <span className="font-medium text-foreground">Intermediate</span>.
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar with related questions */}
        <aside className="lg:sticky lg:top-20 h-fit space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-sm font-semibold mb-3">Related questions</h3>
            <div className="grid gap-3">
              {related.length === 0 ? (
                <p className="text-sm text-muted-foreground">No related items yet.</p>
              ) : (
                related.map((q) => (
                  <Link
                    key={q.id}
                    to={`/question/${q.questionNumber}/${q.slug}`}
                    className="group rounded border p-3 hover:bg-accent"
                  >
                    <div className="text-xs text-muted-foreground">#{q.questionNumber} • {q.subject || "General"}</div>
                    <div
                      className="mt-0.5 line-clamp-2 text-sm font-medium group-hover:underline"
                      dangerouslySetInnerHTML={{ __html: q.title || q.question }}
                    />
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-sm font-semibold mb-2">Quick details</h3>
            <div className="text-sm grid gap-2 text-muted-foreground">
              <div className="flex items-center justify-between"><span>Paper type</span><span className="text-foreground font-medium">{entry.paperType || "—"}</span></div>
              <div className="flex items-center justify-between"><span>Price</span><span className="text-foreground font-medium">${entry.price.toFixed(2)}</span></div>
            </div>
          </div>
        </aside>
      </div>

      {/* More sections below main content */}
      <div className="mt-10 grid gap-6">
        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-semibold mb-2">More from {entry.subject || "this category"}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(related.length ? related : listQa().filter((q)=>q.status==='published' && q.id!==entry.id).slice(0,6)).map((q) => (
              <Link key={q.id} to={`/question/${q.questionNumber}/${q.slug}`} className="rounded border p-3 hover:bg-accent">
                <div className="text-xs text-muted-foreground">#{q.questionNumber}</div>
                <div className="mt-1 line-clamp-2 text-sm font-medium" dangerouslySetInnerHTML={{ __html: q.title || q.question }} />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-semibold mb-2">FAQs</h3>
          <ul className="text-sm text-muted-foreground grid gap-2">
            <li><span className="font-medium text-foreground">How do unlocks work?</span> You pay once to access the full solution in this demo.</li>
            <li><span className="font-medium text-foreground">Can I view later?</span> Yes, unlocked items stay available in your browser.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PublicQaDetail;
