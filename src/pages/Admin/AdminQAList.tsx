import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import AdminSidebar from '../../components/Layout/AdminSidebar';
import { QaEntry, listQa, removeLegacyQa, removeQa } from '../../lib/qaStore';
import toast from 'react-hot-toast';

interface AdminQAListProps {
  embedded?: boolean;
  filterFn?: (entry: QaEntry) => boolean;
  onAddNew?: () => void;
  onEditEntry?: (entry: QaEntry) => void;
  disableLegacyActions?: boolean;
  refreshToken?: number;
}

const AdminQAList: React.FC<AdminQAListProps> = ({
  embedded = false,
  filterFn,
  onAddNew,
  onEditEntry,
  disableLegacyActions = false,
  refreshToken = 0,
}) => {
  const [entries, setEntries] = useState<QaEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const refresh = async () => {
    try {
      const data = await listQa();
      setEntries(data);
    } catch (error) {
      console.error('Failed to load Q&A entries', error);
      toast.error('Failed to load Q&A entries.');
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    (async () => {
      await refresh();
      if (isMounted) {
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [refreshToken]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Q&A entry?")) return;
    setDeletingId(id);
    try {
      await removeQa(id);
      await refresh();
      toast.success('Entry deleted.');
    } catch (error) {
      console.error('Failed to delete Q&A entry', error);
      toast.error('Failed to delete entry.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteLegacy = async () => {
    if (!confirm("Are you sure you want to delete ALL legacy Q&A entries (without questionNumber or slug)? This cannot be undone.")) return;
    try {
      const count = await removeLegacyQa();
      toast.success(`Deleted ${count} legacy Q&A entries.`);
      await refresh();
    } catch (error) {
      console.error('Failed to delete legacy entries', error);
      toast.error('Failed to delete legacy entries.');
    }
  };

  const displayEntries = filterFn ? entries.filter(filterFn) : entries;

  const renderAddButton = () => {
    if (embedded && onAddNew) {
      return (
        <button
          onClick={onAddNew}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors text-center"
        >
          Add New Question
        </button>
      );
    }
    return (
      <Link
        to="/admin/qa/new"
        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors text-center"
      >
        Add New Question
      </Link>
    );
  };

  const renderEditAction = (entry: QaEntry) => {
    if (embedded && onEditEntry) {
      return (
        <button
          onClick={() => onEditEntry(entry)}
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
        >
          Edit
        </button>
      );
    }
    return (
      <Link
        to={`/admin/qa/${entry.id}/edit`}
        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
      >
        Edit
      </Link>
    );
  };

  const mainContent = (
    <div className="p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Q&A Manager</h1>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {renderAddButton()}
              {!embedded && !disableLegacyActions && (
                <button
                  onClick={handleDeleteLegacy}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
                >
                  Delete Legacy Q&A
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner size="lg" />
            </div>
          ) : displayEntries.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Q&A entries found</p>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Get started by adding your first question</p>
              {renderAddButton()}
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
                  {displayEntries.map((entry) => (
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
                          {renderEditAction(entry)}
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
  );

  if (embedded) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl">
        {mainContent}
      </div>
    );
  }

  return (
    <div className="flex flex-1 h-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        {mainContent}
      </main>
    </div>
  );
};

export default AdminQAList;
