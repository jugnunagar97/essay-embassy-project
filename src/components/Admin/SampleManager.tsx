// src/components/Admin/SampleManager.tsx

import { useState, useMemo } from 'react';
import { useSamples } from '../../hooks/useData';
import { db, storage } from '../../firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { PlusCircle, Trash2, Download, UploadCloud, XCircle, FileText, Book, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import { Sample } from '../../types';
import LoadingSpinner from '../Common/LoadingSpinner';
import { format } from 'date-fns';

// Helper to format file size
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export default function SampleManager() {
  const { samples, isLoading, error } = useSamples();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for the upload form
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [academicLevel, setAcademicLevel] = useState('Undergraduate');
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  
  const memoizedSamples = useMemo(() => samples, [samples]);

  const resetForm = () => {
    setTitle('');
    setSubject('');
    setAcademicLevel('Undergraduate');
    setFileToUpload(null);
  };

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileToUpload(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileToUpload || !title || !subject) {
      toast.error('Please fill out all fields and select a file.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading(`Uploading "${fileToUpload.name}"...`);

    try {
      // 1. Upload file to Firebase Storage
      const fileRef = ref(storage, `samples/${Date.now()}_${fileToUpload.name}`);
      const uploadResult = await uploadBytes(fileRef, fileToUpload);
      const fileUrl = await getDownloadURL(uploadResult.ref);

      // 2. Create document in Firestore
      await addDoc(collection(db, 'samples'), {
        title,
        subject,
        academicLevel,
        fileUrl,
        fileName: fileToUpload.name,
        fileType: fileToUpload.type,
        fileSize: fileToUpload.size,
        createdAt: serverTimestamp(),
      });

      toast.success('Sample uploaded successfully!', { id: toastId });
      closeModal();
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to upload sample.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteSample = async (sample: Sample) => {
    if (!window.confirm(`Are you sure you want to delete the sample "${sample.title}"? This cannot be undone.`)) {
      return;
    }

    const toastId = toast.loading('Deleting sample...');
    try {
      // 1. Delete file from Storage
      const fileRef = ref(storage, sample.fileUrl);
      await deleteObject(fileRef);
      
      // 2. Delete document from Firestore
      await deleteDoc(doc(db, 'samples', sample.id));

      toast.success('Sample deleted successfully!', { id: toastId });
    } catch (err: any) {
        // Handle cases where the file might not exist in storage but the doc does
        if (err.code === 'storage/object-not-found') {
            console.warn("File not found in storage, deleting Firestore document anyway.");
            await deleteDoc(doc(db, 'samples', sample.id));
            toast.success('Sample record deleted!', { id: toastId });
        } else {
            console.error("Failed to delete sample:", err);
            toast.error("Failed to delete sample.", { id: toastId });
        }
    }
  };


  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage <span className="text-primary-500">Samples</span></h1>
        <button onClick={openModal} className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <PlusCircle size={20} className="mr-2" /> Upload New Sample
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">File Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Uploaded</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {memoizedSamples.length > 0 ? (
                memoizedSamples.map(sample => (
                  <tr key={sample.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">{sample.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{sample.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{sample.academicLevel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{formatBytes(sample.fileSize)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {sample.createdAt ? format(sample.createdAt.toDate(), 'MMM dd, yyyy') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <a href={sample.fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 inline-flex items-center" title="Download">
                        <Download size={18} />
                      </a>
                      <button onClick={() => handleDeleteSample(sample)} className="text-red-600 hover:text-red-800" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">No samples uploaded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold">Upload New Sample</h3>
              <button onClick={closeModal}><XCircle className="text-gray-400 hover:text-gray-600"/></button>
            </div>
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1 flex items-center"><FileText size={14} className="mr-2"/>Title *</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1 flex items-center"><Book size={14} className="mr-2"/>Subject *</label>
                  <input id="subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"/>
                </div>
                <div>
                  <label htmlFor="academicLevel" className="block text-sm font-medium mb-1 flex items-center"><GraduationCap size={14} className="mr-2"/>Academic Level *</label>
                  <select id="academicLevel" value={academicLevel} onChange={(e) => setAcademicLevel(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700">
                    <option>Undergraduate</option>
                    <option>Bachelor</option>
                    <option>Master</option>
                    <option>PhD</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sample File *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} required accept=".pdf,.doc,.docx" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    {fileToUpload ? (
                        <p className="text-sm text-green-500 font-semibold">{fileToUpload.name}</p>
                    ) : (
                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX up to 10MB</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={closeModal} disabled={isSubmitting} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary-500 text-white rounded-lg disabled:opacity-50 flex items-center">
                  {isSubmitting && <LoadingSpinner size="sm" className="mr-2"/>}
                  {isSubmitting ? 'Uploading...' : 'Upload Sample'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}