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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Expert Solutions Available
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-4">
            Q&A Knowledge Base
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover comprehensive solutions to complex questions with step-by-step explanations and expert insights.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search questions, topics, or keywords..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Subjects</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {filtered.length} questions found
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {subjects.length} subjects
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Expert solutions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No questions found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search terms or browse all subjects.</p>
            <button 
              onClick={() => { setQ(''); setSubject(''); }}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e, index) => (
              <div 
                key={e.id} 
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      #{e.questionNumber}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-lg">
                      {e.subject || "General"}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" dangerouslySetInnerHTML={{ __html: e.title || e.question }} />
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: e.question }} />
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">${e.price.toFixed(2)}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">one-time</span>
                    </div>
                    <Link
                      to={`/question/${e.questionNumber}/${e.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <span>View Solution</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {filtered.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Need Help Finding Something?</h3>
              <p className="text-primary-100 mb-6">Our expert team is here to help you with any questions.</p>
              <button className="px-8 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicQaList;
