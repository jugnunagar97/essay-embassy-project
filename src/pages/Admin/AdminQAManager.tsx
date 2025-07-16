import React from 'react';
import { Link } from 'react-router-dom';

const AdminQAManager: React.FC = () => {
  // TODO: Fetch Q&A entries from Firestore
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow rounded p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Q&A Manager</h1>
          <Link to="/admin/qa/new" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Add New Question</Link>
        </div>
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
            {/* TODO: Render Q&A rows from Firestore */}
            <tr>
              <td className="p-2">Example Question Title</td>
              <td className="p-2">History</td>
              <td className="p-2">Essay</td>
              <td className="p-2">$12.99</td>
              <td className="p-2">Published</td>
              <td className="p-2">
                <Link to="/admin/qa/1/edit" className="text-blue-600 mr-2">Edit</Link>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQAManager; 