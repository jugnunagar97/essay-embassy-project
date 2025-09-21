import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import QaForm from '../../components/admin/QaForm';

const AdminQAEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={true} onClose={() => {}} />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white shadow rounded p-8">
          <h1 className="text-2xl font-bold mb-6">Edit Q&A</h1>
          {id ? <QaForm id={id} /> : <div>Invalid ID</div>}
        </div>
      </main>
    </div>
  );
};

export default AdminQAEdit;
