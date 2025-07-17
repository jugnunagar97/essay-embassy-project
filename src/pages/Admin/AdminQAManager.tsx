import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const AdminQAManager: React.FC = () => {
  const [qaEntries, setQaEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'qaLibrary'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setQaEntries(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
      setError(null);
    }, () => {
      setError('Failed to load Q&A entries.');
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this Q&A entry?')) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, 'qaLibrary', id));
    } catch (err) {
      alert('Failed to delete Q&A entry.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow rounded p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Q&A Manager</h1>
          <Link to="/admin/qa/new" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Add New Question</Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
        ) : error ? (
          <div className="text-red-600 text-center py-8">{error}</div>
        ) : (
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
              {qaEntries.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">No Q&A entries found.</td></tr>
              ) : qaEntries.map(entry => (
                <tr key={entry.id} className="border-t">
                  <td className="p-2">{entry.title || entry.question?.slice(0, 60) || 'Untitled'}</td>
                  <td className="p-2">{entry.subject || '-'}</td>
                  <td className="p-2">{entry.paperType || '-'}</td>
                  <td className="p-2">{entry.price ? `$${entry.price}` : '-'}</td>
                  <td className="p-2">{entry.status || '-'}</td>
                  <td className="p-2">
                    <Link to={`/admin/qa/${entry.id}/edit`} className="text-blue-600 mr-2">Edit</Link>
                    <button
                      className="text-red-600"
                      disabled={deletingId === entry.id}
                      onClick={() => handleDelete(entry.id)}
                    >
                      {deletingId === entry.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminQAManager; 