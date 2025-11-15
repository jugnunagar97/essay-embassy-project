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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to="/qa" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Knowledge Base
          </Link>
      </div>

      {/* Main layout with sidebar */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-8 items-start">
        {/* Content card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Q</span>
                  </div>
                  <div>
                    <div className="text-sm text-primary-100">Question #{entry.questionNumber}</div>
                    <div className="text-xs text-primary-200">{entry.subject || "General"}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${entry.price.toFixed(2)}</div>
                  <div className="text-xs text-primary-200">one-time access</div>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight" dangerouslySetInnerHTML={{ __html: entry.title || entry.question }} />
          </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Question Section */}
              <section className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Question</h2>
                </div>
                <div className="prose prose-gray dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: entry.question }} />
            </section>

              {/* Answer Section */}
            {unlocked ? (
                <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Expert Solution</h2>
                    <span className="ml-auto inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Unlocked
                    </span>
                  </div>
                  <div className="prose prose-gray dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: entry.answer }} />
              </section>
            ) : (
              // Enhanced paywall card with better UI/UX
              <section className="relative rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <div className="absolute inset-0 z-[1] flex items-center justify-center p-6">
                  <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-xl">
                    <div className="flex flex-col items-center gap-4 text-center">
                      {/* Lock Icon */}
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Premium Answer</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
                          Unlock the complete solution with detailed explanations and step-by-step guidance.
                        </p>
                      </div>
                      
                      <div className="w-full space-y-3">
                      <button
                        onClick={() => unlock(entry.id)}
                          className="w-full inline-flex items-center justify-center rounded-lg bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                      >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        Unlock for ${entry.price.toFixed(2)}
                      </button>
                        
                        <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Instant access
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Secure payment
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Blurred preview content */}
                <div className="pointer-events-none select-none blur-sm opacity-50">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Answer Preview</h2>
                    <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: entry.answer }} />
                  </div>
                </div>
              </section>
            )}

              {/* Question Details */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Paper Type</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{entry.paperType || "General"}</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Price</span>
              </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">${entry.price.toFixed(2)}</div>
              </div>
            </section>

              {/* What You'll Get Section */}
              <section className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">What You'll Get</h3>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Step-by-step derivation and explanations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Clean formatting with professional presentation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Key takeaways and common pitfalls</span>
                  </div>
                </div>
            </section>

              {/* About Section */}
              <section className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About This Question</h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-2">
                    Tagged under <span className="font-semibold text-primary-600 dark:text-primary-400">{entry.subject || "General"}</span> category.
                  </p>
                  <p>
                    Difficulty level: <span className="font-semibold text-orange-600 dark:text-orange-400">Intermediate</span> • 
                    Estimated solve time: <span className="font-semibold text-blue-600 dark:text-blue-400">15-30 minutes</span>
                  </p>
              </div>
            </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicQaDetail;
