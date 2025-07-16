import React from 'react';

const AdminQAManagerForm: React.FC = () => {
  // TODO: Fetch subjects and paper types for dropdowns
  // TODO: Implement form state and Firestore/file upload logic

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-8">
        <h1 className="text-2xl font-bold mb-6">Add / Edit Q&A</h1>
        <form>
          <label className="block mb-2 font-semibold">Question Title</label>
          <input className="w-full border rounded px-3 py-2 mb-4" placeholder="Enter question title" />

          <label className="block mb-2 font-semibold">Question Text</label>
          <textarea className="w-full border rounded px-3 py-2 mb-4" rows={3} placeholder="Enter full question text" />

          <label className="block mb-2 font-semibold">Answer (Rich Text)</label>
          {/* TODO: Replace with rich text editor */}
          <textarea className="w-full border rounded px-3 py-2 mb-4" rows={5} placeholder="Enter answer (rich text supported)" />

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 font-semibold">Subject</label>
              <select className="w-full border rounded px-3 py-2">
                <option>Select subject</option>
                {/* TODO: Render subjects */}
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold">Paper Type</label>
              <select className="w-full border rounded px-3 py-2">
                <option>Select paper type</option>
                {/* TODO: Render paper types */}
              </select>
            </div>
          </div>

          <label className="block mb-2 font-semibold">Price (USD)</label>
          <input type="number" className="w-full border rounded px-3 py-2 mb-4" placeholder="Enter price in USD" min={0} step={0.01} />

          <label className="block mb-2 font-semibold">File Attachments</label>
          {/* TODO: Implement multi-file upload */}
          <input type="file" multiple className="w-full mb-4" />

          <label className="block mb-2 font-semibold">Status</label>
          <select className="w-full border rounded px-3 py-2 mb-6">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold">Publish</button>
            <button type="button" className="bg-gray-400 text-white px-6 py-2 rounded font-semibold">Save as Draft</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminQAManagerForm; 