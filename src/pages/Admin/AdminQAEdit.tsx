import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import QaForm from '../../components/Admin/QaForm';
import AdminSidebar from '../../components/Layout/AdminSidebar';

const AdminQAEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Edit Question</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Update the Q&A entry details</p>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              {id ? <QaForm id={id} /> : (
                <div className="text-center py-8">
                  <p className="text-red-600 dark:text-red-400">Invalid ID - Unable to load Q&A entry</p>
                  <Link 
                    to="/admin/qa" 
                    className="inline-block mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                  >
                    Return to Q&A Manager
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQAEdit;
