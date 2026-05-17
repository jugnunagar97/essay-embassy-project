import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { listQa, type QaEntry } from "../../lib/qaStore";
import LoadingSpinner from "../Common/LoadingSpinner";

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFromEntry(e: QaEntry, maxLen = 180): string {
  const fromAnswer = stripHtml(e.answer || "");
  if (fromAnswer.length >= 40) return fromAnswer.slice(0, maxLen) + (fromAnswer.length > maxLen ? "…" : "");
  const fromQ = stripHtml(e.question || "");
  return fromQ.slice(0, maxLen) + (fromQ.length > maxLen ? "…" : "");
}

const PublicQaList: React.FC = () => {
  const [items, setItems] = useState<QaEntry[]>([]);
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("");
  const [paperType, setPaperType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await listQa({ status: "published" });
        if (isMounted) setItems(data);
      } catch (error) {
        console.error("Failed to load Q&A entries", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const subjects = useMemo(() => {
    const set = new Set(items.map((i) => i.subject).filter(Boolean));
    return Array.from(set).sort();
  }, [items]);

  const paperTypes = useMemo(() => {
    const set = new Set(items.map((i) => i.paperType).filter(Boolean));
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter((i) => {
      if (subject && i.subject !== subject) return false;
      if (paperType && i.paperType !== paperType) return false;
      if (!term) return true;
      const hay = `${i.title} ${i.question} ${i.answer} ${i.paperType}`.toLowerCase();
      return hay.includes(term);
    });
  }, [items, q, subject, paperType]);

  const clearFilters = () => {
    setQ("");
    setSubject("");
    setPaperType("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-light via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        {/* Breadcrumbs — explicit contrast (not inherited white) */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex flex-wrap items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <li>
              <Link to="/" className="font-medium text-primary transition-colors hover:text-deep-navy hover:underline dark:text-light-blue dark:hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400 dark:text-gray-500">
              /
            </li>
            <li className="font-medium text-gray-900 dark:text-gray-100">Academic Writing</li>
            <li aria-hidden="true" className="text-gray-400 dark:text-gray-500">
              /
            </li>
            <li className="font-medium text-gray-900 dark:text-gray-100" aria-current="page">
              Q&A Knowledge Base
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="mb-10 text-center lg:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:bg-primary/20 dark:text-light-blue">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Expert solutions
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-deep-navy dark:text-white sm:text-4xl md:text-5xl">
            Q&A Knowledge Base
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
            Discover clear answers to academic questions—search by topic, paper type, or keyword.
          </p>
        </div>

        {/* Search & filters */}
        <div className="mb-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-medium dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search for any question or keyword…"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 transition-all placeholder:text-gray-500 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <label className="sr-only" htmlFor="qa-subject">
                  Subject
                </label>
                <select
                  id="qa-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All subjects</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <label className="sr-only" htmlFor="qa-paper">
                  Paper type
                </label>
                <select
                  id="qa-paper"
                  value={paperType}
                  onChange={(e) => setPaperType(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All paper types</option>
                  {paperTypes.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <div className="hidden lg:block" aria-hidden />
              </div>
            </div>

            <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {filtered.length} questions
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {subjects.length} subjects
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold-dark" />
                  {paperTypes.length} paper types
                </span>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">No questions found</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">Try different keywords or clear filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-deep-navy"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => {
              const titleHtml = e.title || e.question;
              const relative = formatDistanceToNow(new Date(e.createdAt), { addSuffix: true });
              const preview = excerptFromEntry(e);

              return (
                <article
                  key={e.id}
                  className="group flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-strong dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <span className="inline-flex max-w-[55%] items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-deep-navy dark:bg-primary/20 dark:text-light-blue">
                        {e.subject || "General"}
                      </span>
                      <time className="shrink-0 text-xs text-gray-500 dark:text-gray-400" dateTime={new Date(e.createdAt).toISOString()}>
                        {relative}
                      </time>
                    </div>
                    <p className="mb-2 font-mono text-[11px] font-medium text-gray-400 dark:text-gray-500">{e.questionNumber}</p>
                    <h3
                      className="line-clamp-2 text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-light-blue sm:text-lg"
                      dangerouslySetInnerHTML={{ __html: titleHtml }}
                    />
                    <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{preview}</p>
                  </div>

                  <div className="mt-auto border-t border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-600 dark:bg-gray-700/50 sm:px-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-2xl font-bold text-primary dark:text-light-blue">${e.price.toFixed(2)}</span>
                        <span className="ml-2 text-xs font-medium text-gray-600 dark:text-gray-300">per page</span>
                      </div>
                      <Link
                        to={`/question/${e.questionNumber}/${e.slug}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-deep-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        View solution
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="mt-14 text-center lg:mt-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-royal-blue via-primary to-deep-navy px-6 py-10 text-white shadow-strong sm:px-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.12),transparent)]" aria-hidden />
              <div className="relative">
                <h3 className="text-2xl font-bold tracking-tight">Need help finding something?</h3>
                <p className="mx-auto mt-3 max-w-lg text-base text-white/90">Our team can point you to the right answer or set up custom help.</p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-base font-semibold text-primary shadow-md transition-colors hover:bg-gray-100"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicQaList;
