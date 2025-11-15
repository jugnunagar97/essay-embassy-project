import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import QaForm from '../../components/Admin/QaForm';
import AdminSidebar from '../../components/Layout/AdminSidebar';

const AdminQANew: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <Link 
                to="/admin/qa" 
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
              >
                <ArrowLeft size={20} />
                <span>Back to Q&A Manager</span>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Add New Question</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Create a new Q&A entry for your library</p>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <QaForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQANew;
