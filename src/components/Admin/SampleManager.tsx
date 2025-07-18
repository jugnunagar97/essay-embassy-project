// src/components/Admin/SampleManager.tsx

import { useState, useMemo } from 'react';
import { useSamples } from '../../hooks/useData';
import { db, storage } from '../../firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { PlusCircle, Trash2, Download, UploadCloud, XCircle, FileText, Book, GraduationCap, X } from 'lucide-react';
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
  
  // State for the upload form (new fields)
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [academicLevel, setAcademicLevel] = useState('Undergraduate');
  const [documentType, setDocumentType] = useState('Research Paper');
  const [citationStyle, setCitationStyle] = useState('APA');
  const [pageCount, setPageCount] = useState<number | ''>('');
  const [publicationDate, setPublicationDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const memoizedSamples = useMemo(() => samples, [samples]);

  const academicLevels = ["High School", "Undergraduate", "Master", "Ph.D."];
  const documentTypes = [
    "Research Paper",
    "Essay",
    "Case Study",
    "Literature Review",
    "Assignment",
    "Report",
    "Other",
  ];
  const citationStyles = ["APA", "MLA", "Chicago", "Harvard", "Other"];

  const resetForm = () => {
    setTitle('');
    setSubject('');
    setDescription('');
    setAcademicLevel(academicLevels[1]);
    setDocumentType(documentTypes[0]);
    setCitationStyle(citationStyles[0]);
    setPageCount('');
    setPublicationDate('');
    setFileToUpload(null);
    setError(null);
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

  const validate = () => {
    if (
      !title.trim() ||
      !subject.trim() ||
      !description.trim() ||
      !academicLevel ||
      !documentType ||
      !citationStyle ||
      !pageCount ||
      !publicationDate ||
      !fileToUpload
    ) {
      setError('Please fill out all required fields.');
      return false;
    }
    setError(null);
    return true;
  };

  // --- Robust handleSaveSample function ---
  const handleSaveSample = async (sampleData: any) => {
    try {
      // 1. Generate a new Firestore document reference to get a unique ID
      const newSampleRef = doc(collection(db, "samples"));
      const newSampleId = newSampleRef.id;

      // 2. Prepare the storage path using the new document ID
      const file = sampleData.file;
      if (!file) throw new Error("No file provided.");
      const storagePath = `samples/${newSampleId}/${file.name}`;
      const fileRef = ref(storage, storagePath);

      // 3. Upload the file to Firebase Storage
      await uploadBytes(fileRef, file);

      // 4. Get the download URL
      const downloadURL = await getDownloadURL(fileRef);

      // 5. Prepare the data object for Firestore (exclude the raw file object)
      const {
        file: _omitFile, // Exclude the file object
        ...rest
      } = sampleData;

      const sampleDoc = {
        ...rest,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileUrl: downloadURL,
        createdAt: serverTimestamp(),
      };

      // 6. Save the complete data object to Firestore using setDoc and the same ID
      await setDoc(newSampleRef, sampleDoc);

      toast.success("Sample uploaded successfully!");
      closeModal();
    } catch (error: any) {
      console.error("Failed to upload sample:", error);
      toast.error(error.message || "Failed to upload sample.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const sampleData = {
      title,
      subject,
      description,
      academicLevel,
      documentType,
      citationStyle,
      pageCount: Number(pageCount),
      publicationDate,
      file: fileToUpload,
    };
    await handleSaveSample(sampleData);
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
              <button onClick={closeModal}><X className="text-gray-400 hover:text-gray-600"/></button>
            </div>
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>
              )}
              <div>
                <label className="block font-medium mb-1">Title *</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div>
                <label className="block font-medium mb-1">Subject *</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              </div>
              <div>
                <label className="block font-medium mb-1">Description *</label>
                <textarea className="w-full border rounded-lg px-3 py-2" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block font-medium mb-1">Academic Level *</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={academicLevel} onChange={(e) => setAcademicLevel(e.target.value)} required>
                    {academicLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1">Document Type *</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={documentType} onChange={(e) => setDocumentType(e.target.value)} required>
                    {documentTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block font-medium mb-1">Citation Style *</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={citationStyle} onChange={(e) => setCitationStyle(e.target.value)} required>
                    {citationStyles.map((style) => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1">Page Count *</label>
                  <input type="number" min={1} className="w-full border rounded-lg px-3 py-2" value={pageCount} onChange={(e) => setPageCount(Number(e.target.value))} required />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Publication Date *</label>
                <input type="date" className="w-full border rounded-lg px-3 py-2" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} required />
              </div>
              <div>
                <label className="block font-medium mb-1">Sample File *</label>
                <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="w-full border rounded-lg px-3 py-2" onChange={handleFileChange} required />
                <div className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</div>
                {fileToUpload && <div className="text-xs text-green-600 mt-1">{fileToUpload.name}</div>}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={closeModal} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700" disabled={isSubmitting}>{isSubmitting ? "Uploading..." : "Upload Sample"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}