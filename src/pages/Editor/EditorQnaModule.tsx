import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminQAList from '../Admin/AdminQAList';
import QaForm from '../../components/Admin/QaForm';
import { QaEntry } from '../../lib/qaStore';

export default function EditorQnaModule() {
  const { user } = useAuth();
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState(0);

  if (!user) {
    return null;
  }

  const filterEntries = (entry: QaEntry) => {
    if (!entry.assignedEditorId) return true;
    return entry.assignedEditorId === user.id;
  };

  const openCreate = () => {
    setEditingId(undefined);
    setView('form');
  };

  const openEdit = (entry: QaEntry) => {
    setEditingId(entry.id);
    setView('form');
  };

  const handleFormDone = () => {
    setView('list');
    setRefreshToken((prev) => prev + 1);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <header>
        <p className="text-xs md:text-sm font-semibold text-primary-600 uppercase tracking-wide">Q&A Hub</p>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">Manage Your Assigned Questions</h2>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mt-1">
          Access the same powerful Q&A toolkit as admins—including the math-ready editor—while viewing only the entries
          assigned to you.
        </p>
      </header>

      {view === 'list' ? (
        <AdminQAList
          embedded
          filterFn={filterEntries}
          onAddNew={openCreate}
          onEditEntry={openEdit}
          disableLegacyActions
          refreshToken={refreshToken}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
                {editingId ? 'Edit Entry' : 'New Entry'}
              </p>
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Update Assigned Q&A' : 'Create Assigned Q&A'}
              </h2>
            </div>
            <button
              onClick={() => setView('list')}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Back to list
            </button>
          </div>
          <QaForm
            id={editingId}
            redirectPath={null}
            onSuccess={handleFormDone}
            onCancel={() => setView('list')}
            createDefaults={{
              assignedEditorId: user.id,
              assignedEditorEmail: user.email,
            }}
          />
        </div>
      )}
    </div>
  );
}

