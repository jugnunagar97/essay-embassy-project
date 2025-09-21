import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import QaForm from '../../components/admin/QaForm';

const AdminQANew: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={true} onClose={() => {}} />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white shadow rounded p-8">
          <h1 className="text-2xl font-bold mb-6">Add Q&A</h1>
          <QaForm />
        </div>
      </main>
    </div>
  );
};

export default AdminQANew;
