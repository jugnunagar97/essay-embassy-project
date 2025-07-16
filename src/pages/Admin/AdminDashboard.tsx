import React from 'react';

const AdminDashboard: React.FC = () => {
  // TODO: Fetch subjects and paper types from Firestore
  // TODO: Implement add, edit, delete logic
  // TODO: Implement logout logic

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded font-semibold">Logout</button>
        </div>

        {/* Subjects Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Subjects</h2>
            <button className="bg-blue-600 text-white px-3 py-1 rounded">Add Subject</button>
          </div>
          <ul className="divide-y">
            {/* TODO: Render subjects list */}
            <li className="flex justify-between items-center py-2">
              <span>Example Subject</span>
              <div>
                <button className="text-blue-600 mr-2">Edit</button>
                <button className="text-red-600">Delete</button>
              </div>
            </li>
          </ul>
        </section>

        {/* Paper Types Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Paper Types</h2>
            <button className="bg-blue-600 text-white px-3 py-1 rounded">Add Paper Type</button>
          </div>
          <ul className="divide-y">
            {/* TODO: Render paper types list */}
            <li className="flex justify-between items-center py-2">
              <span>Example Paper Type</span>
              <div>
                <button className="text-blue-600 mr-2">Edit</button>
                <button className="text-red-600">Delete</button>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard; 