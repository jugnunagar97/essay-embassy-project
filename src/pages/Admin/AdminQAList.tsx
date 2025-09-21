import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
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
    // Simulate async load
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
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={true} onClose={() => {}} />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto bg-white shadow rounded p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Q&A Manager</h1>
            <div>
              <Link to="/admin/qa/new" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold mr-2">Add New Question</Link>
              <button onClick={handleDeleteLegacy} className="bg-red-600 text-white px-4 py-2 rounded font-semibold">Delete Legacy Q&A</button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No Q&A entries found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Title</th>
                    <th className="p-2">Subject</th>
                    <th className="p-2">Paper Type</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="border-t">
                      <td className="p-2" dangerouslySetInnerHTML={{ __html: entry.title || entry.question?.slice(0, 60) || "Untitled" }} />
                      <td className="p-2">{entry.subject || "-"}</td>
                      <td className="p-2">{entry.paperType || "-"}</td>
                      <td className="p-2">{entry.price ? `$${entry.price}` : "-"}</td>
                      <td className="p-2">{entry.status || "-"}</td>
                      <td className="p-2">
                        <Link to={`/admin/qa/${entry.id}/edit`} className="text-blue-600 mr-2">Edit</Link>
                        <button className="text-red-600" disabled={deletingId === entry.id} onClick={() => handleDelete(entry.id)}>
                          {deletingId === entry.id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminQAList;
