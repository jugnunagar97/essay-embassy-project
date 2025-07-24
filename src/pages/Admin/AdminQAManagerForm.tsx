import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'katex/dist/katex.min.css';

const SUBJECTS = [
  'History', 'Math', 'Science', 'English', 'Economics', 'Business', 'Computer Science', 'Other'
];
const PAPER_TYPES = [
  'Essay', 'Research Paper', 'Case Study', 'Lab Report', 'Assignment', 'Other'
];

const AdminQAManagerForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    question: '',
    answer: '',
    subject: '',
    paperType: '',
    price: '',
    status: 'draft',
  });
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video', 'formula'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'link', 'image', 'video', 'formula',
  ];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getDoc(doc(db, 'qaLibrary', id!)).then(docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            title: data.title || '',
            question: data.question || '',
            answer: data.answer || '',
            subject: data.subject || '',
            paperType: data.paperType || '',
            price: data.price ? String(data.price) : '',
            status: data.status || 'draft',
          });
        } else {
          setError('Q&A entry not found.');
        }
        setLoading(false);
      }).catch(() => {
        setError('Failed to load Q&A entry.');
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError(null);
    setSuccess(null);
  };
  const handleQuillChange = (name: string, value: string) => {
    setForm(f => ({ ...f, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const validate = () => {
    if (!form.title.trim() || !form.question.trim() || !form.answer.trim() || !form.subject || !form.paperType || !form.price) {
      setError('All fields are required.');
      return false;
    }
    if (isNaN(Number(form.price)) || Number(form.price) < 0) {
      setError('Price must be a valid non-negative number.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const data = {
        ...form,
        price: Number(form.price),
        updatedAt: serverTimestamp(),
      };
      if (isEdit) {
        await updateDoc(doc(db, 'qaLibrary', id!), data);
        setSuccess('Q&A entry updated successfully.');
      } else {
        await addDoc(collection(db, 'qaLibrary'), {
          ...data,
          createdAt: serverTimestamp(),
        });
        setSuccess('Q&A entry created successfully.');
        setForm({ title: '', question: '', answer: '', subject: '', paperType: '', price: '', status: 'draft' });
      }
      setTimeout(() => navigate('/admin/qa'), 1000);
    } catch (err) {
      setError('Failed to save Q&A entry.');
      // Log the error for debugging
      // eslint-disable-next-line no-console
      console.error('Firestore Q&A save error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-8">
        <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit' : 'Add'} Q&A</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Question Title</label>
          <ReactQuill
            value={form.title}
            onChange={val => handleQuillChange('title', val)}
            modules={quillModules}
            formats={quillFormats}
            className="mb-4 bg-white"
            placeholder="Enter question title"
          />

          <label className="block mb-2 font-semibold">Question Text</label>
          <ReactQuill
            value={form.question}
            onChange={val => handleQuillChange('question', val)}
            modules={quillModules}
            formats={quillFormats}
            className="mb-4 bg-white"
            placeholder="Enter full question text"
          />

          <label className="block mb-2 font-semibold">Answer (Rich Text, Math Supported)</label>
          <ReactQuill
            value={form.answer}
            onChange={val => handleQuillChange('answer', val)}
            modules={quillModules}
            formats={quillFormats}
            className="mb-4 bg-white"
            placeholder="Enter answer (rich text and math supported)"
          />

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 font-semibold">Subject</label>
              <select name="subject" value={form.subject} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                <option value="">Select subject</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold">Paper Type</label>
              <select name="paperType" value={form.paperType} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                <option value="">Select paper type</option>
                {PAPER_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <label className="block mb-2 font-semibold">Price (USD)</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" placeholder="Enter price in USD" min={0} step={0.01} required />

          <label className="block mb-2 font-semibold">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-6" required>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          {error && <div className="text-red-600 mb-4">{error}</div>}
          {success && <div className="text-green-600 mb-4">{success}</div>}

          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded font-semibold">
              {loading ? (isEdit ? 'Saving...' : 'Publishing...') : (isEdit ? 'Save Changes' : 'Publish')}
            </button>
            <button type="button" disabled={loading} className="bg-gray-400 text-white px-6 py-2 rounded font-semibold" onClick={() => navigate('/admin/qa')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminQAManagerForm; 