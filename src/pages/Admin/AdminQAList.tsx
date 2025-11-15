import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import AdminSidebar from '../../components/Layout/AdminSidebar';
import { QaEntry, listQa, removeLegacyQa, removeQa } from '../../lib/qaStore';

const AdminQAList: React.FC = () => {
  const [entries, setEntries] = useState<QaEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const refresh = () => {
    setEntries(listQa());
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      refresh();
      setLoading(false);
    }, 200);
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this Q&A entry?")) return;
    setDeletingId(id);
    try {
      removeQa(id);
      refresh();
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteLegacy = () => {
    if (!confirm("Are you sure you want to delete ALL legacy Q&A entries (without questionNumber or slug)? This cannot be undone.")) return;
    const count = removeLegacyQa();
    alert(`Deleted ${count} legacy Q&A entries.`);
    refresh();
  };

  return (
    <div className="flex flex-1 h-full">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Q&A Manager</h1>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Link 
                    to="/admin/qa/new" 
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors text-center"
                  >
                    Add New Question
                  </Link>
                  <button 
                    onClick={handleDeleteLegacy} 
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
                  >
                    Delete Legacy Q&A
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {loading ? (
                <div className="flex justify-center py-16">
                  <LoadingSpinner size="lg" />
                </div>
              ) : entries.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Q&A entries found</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Get started by adding your first question</p>
                  <Link 
                    to="/admin/qa/new" 
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Add New Question
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Subject</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Paper Type</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {entries.map((entry) => (
                        <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-4 py-4 text-sm text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: entry.title || entry.question?.slice(0, 60) || "Untitled" }} />
                          <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{entry.subject || "-"}</td>
                          <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{entry.paperType || "-"}</td>
                          <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{entry.price ? `$${entry.price}` : "-"}</td>
                          <td className="px-4 py-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              entry.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                              entry.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {entry.status || "Draft"}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex items-center gap-3">
                              <Link 
                                to={`/admin/qa/${entry.id}/edit`} 
                                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
                              >
                                Edit
                              </Link>
                              <button 
                                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors disabled:opacity-50"
                                disabled={deletingId === entry.id}
                                onClick={() => handleDelete(entry.id)}
                              >
                                {deletingId === entry.id ? "Deleting..." : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminQAList;
