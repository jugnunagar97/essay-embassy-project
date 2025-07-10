// src/pages/Admin/ServicePageEditor.tsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, addDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ServicePage } from '../../types';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { Save, PlusCircle, Trash2 } from 'lucide-react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const quillModules = {
  toolbar: [
    [{ 'header': [2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link'],
    ['clean']
  ],
};

const initialPageState: Partial<ServicePage> = {
  title: '',
  slug: '',
  category: 'Academic Writing',
  status: 'draft',
  seoTitle: '',
  metaDescription: '',
  heroHeading: '',
  mainContent: '',
  faqs: [{ question: '', answer: '' }],
  order: 0,
};

export default function ServicePageEditor() {
  const { pageId } = useParams();
  const navigate = useNavigate();

  const [pageData, setPageData] = useState<Partial<ServicePage>>(initialPageState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (pageId) {
      const docRef = doc(db, 'servicePages', pageId);
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          setPageData({ id: docSnap.id, ...docSnap.data() } as ServicePage);
        } else {
          toast.error("Service page not found.");
          navigate('/dashboard/services');
        }
        setIsLoading(false);
      });
    } else {
      setPageData(initialPageState);
      setIsLoading(false);
    }
  }, [pageId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPageData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (content: string) => {
    setPageData(prev => ({ ...prev, mainContent: content }));
  };
  
  const handleFaqChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const faqs = [...(pageData.faqs || [])];
    faqs[index] = { ...faqs[index], [name]: value };
    setPageData(prev => ({ ...prev, faqs }));
  };

  const addFaq = () => {
    const faqs = [...(pageData.faqs || []), { question: '', answer: '' }];
    setPageData(prev => ({ ...prev, faqs }));
  };

  const removeFaq = (index: number) => {
    const faqs = [...(pageData.faqs || [])];
    faqs.splice(index, 1);
    setPageData(prev => ({ ...prev, faqs }));
  };
  
  const handleSave = async () => {
    if (!pageData.title) {
        toast.error("Page Title is required.");
        return;
    }
    setIsSubmitting(true);
    const toastId = toast.loading(pageId ? 'Updating page...' : 'Creating page...');

    const dataToSave = {
        ...pageData,
        slug: pageData.slug || pageData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        updatedAt: serverTimestamp()
    };
    
    try {
        if (pageId) {
            await updateDoc(doc(db, 'servicePages', pageId), dataToSave);
        } else {
            await addDoc(collection(db, 'servicePages'), {
                ...dataToSave,
                createdAt: serverTimestamp()
            });
        }
        toast.success("Page saved successfully!", { id: toastId });
        navigate('/dashboard/services');
    } catch(err) {
        toast.error("Failed to save page.", { id: toastId });
        console.error(err);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-10 flex justify-center"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{pageId ? 'Edit' : 'Create'} Service Page</h1>
        <button onClick={handleSave} disabled={isSubmitting} className="btn-primary flex items-center">
            {isSubmitting ? <LoadingSpinner size="sm" className="mr-2"/> : <Save size={20} className="mr-2"/>}
            {isSubmitting ? 'Saving...' : 'Save Page'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <label className="form-label">Page Title</label>
            <input type="text" name="title" value={pageData.title || ''} onChange={handleInputChange} className="form-input text-2xl font-bold" placeholder="e.g., Admission Essay Writing Service" />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <label className="form-label">Main Content</label>
            <ReactQuill theme="snow" value={pageData.mainContent || ''} onChange={handleQuillChange} modules={quillModules} className="bg-white dark:bg-gray-100 dark:text-black"/>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">Frequently Asked Questions (FAQs)</h3>
            <div className="space-y-4">
              {pageData.faqs?.map((faq, index) => (
                <div key={index} className="p-4 border rounded-lg relative">
                   <button type="button" onClick={() => removeFaq(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                   <label className="block text-sm font-medium">Question</label>
                   <input type="text" name="question" value={faq.question} onChange={e => handleFaqChange(index, e)} className="form-input mt-1" />
                   <label className="block text-sm font-medium mt-2">Answer</label>
                   <textarea name="answer" value={faq.answer} onChange={e => handleFaqChange(index, e)} className="form-input mt-1" rows={3}/>
                </div>
              ))}
            </div>
            <button onClick={addFaq} className="btn-secondary mt-4 flex items-center"><PlusCircle size={16} className="mr-2"/> Add FAQ</button>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <label className="form-label">Status</label>
                <select name="status" value={pageData.status || 'draft'} onChange={handleInputChange} className="form-select">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <label className="form-label">URL Slug</label>
                <input type="text" name="slug" value={pageData.slug || ''} onChange={handleInputChange} className="form-input" placeholder="auto-generates from title"/>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <label className="form-label">Category</label>
                <input type="text" name="category" value={pageData.category || ''} onChange={handleInputChange} className="form-input" placeholder="e.g., Academic Writing"/>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold mb-2">SEO Settings</h3>
                <div className="space-y-4">
                    <div><label className="form-label">SEO Title</label><input type="text" name="seoTitle" value={pageData.seoTitle || ''} onChange={handleInputChange} className="form-input"/></div>
                    <div><label className="form-label">Meta Description</label><textarea name="metaDescription" value={pageData.metaDescription || ''} onChange={handleInputChange} className="form-input" rows={3}/></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}