import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Upload, FileText, Plus, Minus, X, AlertCircle, CreditCard, DollarSign 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

// Firebase Imports
import { db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp, doc, runTransaction } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface OrderFormData {
  academicLevel: string;
  paperType: string;
  subject: string;
  topic: string;
  pages: number;
  deadline: string;
  citationStyle: string;
  spacing: string;
  sources: number;
  instructions: string;
}

const priceConfig: { [key: string]: any } = {
  "College": { "3 hours": { base: 25, urgent: 1.8 }, "6 hours": { base: 22, urgent: 1.6 }, "12 hours": { base: 18, urgent: 1.4 }, "24 hours": { base: 15, urgent: 1.2 }, "48 hours": { base: 12, urgent: 1.0 }, "3 days": { base: 12, urgent: 1.0 }, "5 days": { base: 12, urgent: 1.0 }, "7 days": { base: 12, urgent: 1.0 }, "10 days": { base: 12, urgent: 1.0 }, "14 days": { base: 12, urgent: 1.0 } },
  "Undergraduate": { "3 hours": { base: 28, urgent: 1.8 }, "6 hours": { base: 25, urgent: 1.6 }, "12 hours": { base: 21, urgent: 1.4 }, "24 hours": { base: 18, urgent: 1.2 }, "48 hours": { base: 15, urgent: 1.0 }, "3 days": { base: 15, urgent: 1.0 }, "5 days": { base: 15, urgent: 1.0 }, "7 days": { base: 15, urgent: 1.0 }, "10 days": { base: 15, urgent: 1.0 }, "14 days": { base: 15, urgent: 1.0 } },
  "Masters": { "3 hours": { base: 32, urgent: 1.8 }, "6 hours": { base: 29, urgent: 1.6 }, "12 hours": { base: 25, urgent: 1.4 }, "24 hours": { base: 22, urgent: 1.2 }, "48 hours": { base: 19, urgent: 1.0 }, "3 days": { base: 19, urgent: 1.0 }, "5 days": { base: 19, urgent: 1.0 }, "7 days": { base: 19, urgent: 1.0 }, "10 days": { base: 19, urgent: 1.0 }, "14 days": { base: 19, urgent: 1.0 } },
  "PhD": { "3 hours": { base: 38, urgent: 1.8 }, "6 hours": { base: 35, urgent: 1.6 }, "12 hours": { base: 31, urgent: 1.4 }, "24 hours": { base: 28, urgent: 1.2 }, "48 hours": { base: 25, urgent: 1.0 }, "3 days": { base: 25, urgent: 1.0 }, "5 days": { base: 25, urgent: 1.0 }, "7 days": { base: 25, urgent: 1.0 }, "10 days": { base: 25, urgent: 1.0 }, "14 days": { base: 25, urgent: 1.0 } }
};

const paperTypes = [ "Essay (Any Type)", "Admission Essay", "Analysis", "Annotated Bibliography", "Article Review", "Assignment", "Book/Movie Review", "Business Plan", "Capstone Project", "Case Study", "Coursework", "Creative Writing", "Critical Thinking", "Dissertation", "Lab Report", "Research Paper", "Research Proposal", "Speech", "Term Paper", "Thesis" ];
const subjects = [ "Business Studies", "Computer Science", "Economics", "Education", "Engineering", "English", "Health Sciences", "History", "Law", "Literature", "Management", "Marketing", "Nursing", "Political Science", "Psychology", "Sociology", "Other" ];
const academicLevels = ["College", "Undergraduate", "Masters", "PhD"];
const deadlines = ["3 hours", "6 hours", "12 hours", "24 hours", "48 hours", "3 days", "5 days", "7 days", "10 days", "14 days"];
const citationStyles = ["APA", "MLA", "Chicago", "Harvard", "Other"];

const convertDeadlineToDate = (relativeDeadline: string): Date => {
  const now = new Date();
  let futureDate = new Date(now);
  switch (relativeDeadline) {
    case "3 hours": futureDate.setHours(now.getHours() + 3); break;
    case "6 hours": futureDate.setHours(now.getHours() + 6); break;
    case "12 hours": futureDate.setHours(now.getHours() + 12); break;
    case "24 hours": futureDate.setDate(now.getDate() + 1); break;
    case "48 hours": futureDate.setDate(now.getDate() + 2); break;
    case "3 days": futureDate.setDate(now.getDate() + 3); break;
    case "5 days": futureDate.setDate(now.getDate() + 5); break;
    case "7 days": futureDate.setDate(now.getDate() + 7); break;
    case "10 days": futureDate.setDate(now.getDate() + 10); break;
    case "14 days": futureDate.setDate(now.getDate() + 14); break;
    default: futureDate.setDate(now.getDate() + 2);
  }
  return futureDate;
};

export default function OrderNow() {
  const { user, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [price, setPrice] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({ name: '', email: '', password: '' });
  const [pendingOrderData, setPendingOrderData] = useState<OrderFormData | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<OrderFormData>({
    defaultValues: {
      academicLevel: searchParams.get('academicLevel') || "College",
      paperType: searchParams.get('paperType') || "Essay (Any Type)",
      pages: parseInt(searchParams.get('pages') || '1'),
      deadline: searchParams.get('deadline') || "48 hours",
      citationStyle: "APA",
      spacing: "double",
      sources: 0,
    }
  });

  const watchedValues = watch();

  const calculatePrice = useCallback(() => {
    const config = priceConfig[watchedValues.academicLevel]?.[watchedValues.deadline];
    if (config) {
      const pageMultiplier = watchedValues.spacing === 'double' ? 1 : 2;
      const totalPrice = watchedValues.pages * config.base * config.urgent * pageMultiplier;
      setPrice(Math.round(totalPrice * 100) / 100);
    }
  }, [watchedValues.academicLevel, watchedValues.deadline, watchedValues.pages, watchedValues.spacing]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const getNextOrderNumber = async (): Promise<number> => {
    const counterRef = doc(db, 'counters', 'orderCounter');
    try {
      const newOrderNumber = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        if (!counterDoc.exists()) {
          transaction.set(counterRef, { currentNumber: 1001 });
          return 1001;
        }
        const newNumber = counterDoc.data().currentNumber + 1;
        transaction.update(counterRef, { currentNumber: newNumber });
        return newNumber;
      });
      return newOrderNumber;
    } catch (e) {
      console.error("Transaction to get order number failed: ", e);
      throw new Error("Could not generate order number.");
    }
  };
  
  const createOrderInFirestore = useCallback(async (orderData: OrderFormData, author: { id: string, name: string }) => {
    setIsSubmitting(true);
    try {
      const orderNumber = await getNextOrderNumber();
      const fileUploadPromises = files.map(file => {
        const fileRef = ref(storage, `order_files/${author.id}/${orderNumber}/${file.name}`);
        return uploadBytes(fileRef, file).then(snapshot => getDownloadURL(snapshot.ref));
      });
      const uploadedFileUrls = await Promise.all(fileUploadPromises);

      const newOrderData = {
        orderNumber,
        clientId: author.id,
        clientName: author.name,
        academicLevel: orderData.academicLevel,
        paperType: orderData.paperType,
        subject: orderData.subject,
        topic: orderData.topic,
        pages: orderData.pages,
        words: orderData.pages * (orderData.spacing === 'double' ? 275 : 550),
        deadline: convertDeadlineToDate(orderData.deadline),
        citationStyle: orderData.citationStyle,
        spacing: orderData.spacing,
        sources: orderData.sources,
        instructions: orderData.instructions,
        fileUrls: uploadedFileUrls,
        status: 'pending-payment',
        paymentStatus: 'pending',
        amount: price,
        createdAt: serverTimestamp(),
        writerId: null,
      };

      const docRef = await addDoc(collection(db, 'orders'), newOrderData);
      toast.success(`Order #${orderNumber} created successfully!`);
      navigate(`/dashboard/orders/${docRef.id}`);
    } catch (error) {
      console.error("Error creating order in Firestore: ", error);
      toast.error(`Failed to create order. Please try again.`);
      setIsSubmitting(false); // **CRITICAL FIX:** Stop processing on error
    }
  }, [navigate, price, files]);

  useEffect(() => {
    if (user && pendingOrderData) {
      createOrderInFirestore(pendingOrderData, { id: user.id, name: user.name });
    }
  }, [user, pendingOrderData, createOrderInFirestore]);

  const handleFormSubmit = (data: OrderFormData) => {
    if (user) {
      createOrderInFirestore(data, { id: user.id, name: user.name });
    } else {
      setPendingOrderData(data);
      setShowRegistration(true);
    }
  };

  const handleRegistration = async () => {
    if (!registrationData.name || !registrationData.email || !registrationData.password) {
      toast.error('Please fill in all registration fields');
      return;
    }
    setIsSubmitting(true);
    try {
      await registerUser(registrationData.email, registrationData.password, registrationData.name);
      toast.success('Account created! Finalizing your order...');
      setShowRegistration(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePagesChange = (increment: boolean) => {
    const currentPages = watchedValues.pages || 1;
    const newPages = increment ? currentPages + 1 : Math.max(1, currentPages - 1);
    setValue('pages', newPages);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const labelStyle = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";
  const inputStyle = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 transition-colors placeholder-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400";
  const errorStyle = "text-red-500 text-sm mt-1 flex items-center";
  const stepperButtonStyle = "w-10 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Place Your <span className="text-primary-500">Order</span></h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Get professional academic writing help from our expert writers. Fill out the form below to get started.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Academic Level</label>
                  <select {...register('academicLevel')} className={inputStyle}>
                    {academicLevels.map(level => (<option key={level} value={level}>{level}</option>))}
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Type of Paper</label>
                  <select {...register('paperType')} className={inputStyle}>
                    {paperTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelStyle}>Subject</label>
                <select {...register('subject')} className={inputStyle}>
                  {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                </select>
              </div>
              <div>
                <label className={labelStyle}>Topic</label>
                <input type="text" {...register('topic', { required: "Topic is required." })} className={inputStyle} placeholder="e.g., The Impact of AI on Modern Society" />
                {errors.topic && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.topic.message}</p>}
              </div>
              <div>
                <label className={labelStyle}>Paper Instructions</label>
                <textarea {...register('instructions')} rows={5} className={inputStyle} placeholder="Include all necessary details for your assignment..."></textarea>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <label className={labelStyle}>Upload Files (Optional)</label>
                <div className={`border-2 border-dashed rounded-lg p-6 transition-colors ${isDragOver ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600'}`}
                  onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }} onDragLeave={() => setIsDragOver(false)}>
                  <div className="text-center">
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Drag & drop files or <label htmlFor="file-upload" className="text-primary-500 cursor-pointer hover:underline">browse</label></p>
                    <input type="file" multiple onChange={handleFileChange} className="hidden" id="file-upload" />
                  </div>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                        <div className="flex items-center text-sm"><FileText size={16} className="mr-2 text-gray-500" /><span>{file.name}</span></div>
                        <button type="button" onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700"><X size={16} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <DollarSign className="mr-2 text-primary-500" size={24} />
                Order Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Pages</label>
                  <div className="flex items-center">
                    <button type="button" onClick={() => handlePagesChange(false)} className={stepperButtonStyle} disabled={watchedValues.pages <= 1}><Minus size={16} /></button>
                    <input type="number" {...register('pages', { required: true, min: 1, valueAsNumber: true })} className={`${inputStyle} text-center mx-2`} />
                    <button type="button" onClick={() => handlePagesChange(true)} className={stepperButtonStyle}><Plus size={16} /></button>
                  </div>
                </div>
                <div>
                  <label className={labelStyle}>Spacing</label>
                  <select {...register('spacing')} className={inputStyle}>
                    <option value="double">Double</option>
                    <option value="single">Single</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelStyle}>Deadline</label>
                <select {...register('deadline', { required: true })} className={inputStyle}>
                  {deadlines.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={labelStyle}>Citation Style</label>
                <select {...register('citationStyle')} className={inputStyle}>
                  {citationStyles.map(style => <option key={style} value={style}>{style}</option>)}
                </select>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Price:</span>
                  <p className="text-3xl font-bold text-primary-500">${price}</p>
                </div>
              </div>
              <button onClick={handleSubmit(handleFormSubmit)} disabled={isSubmitting} className="w-full btn-primary py-3 flex items-center justify-center text-lg">
                {isSubmitting ? <><LoadingSpinner size="sm" className="mr-2" />Processing...</> : <><CreditCard size={20} className="mr-2" />Submit & Continue</>}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Account to Continue</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">We'll create your account and place your order immediately.</p>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" value={registrationData.name} onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))} className={inputStyle} />
              <input type="email" placeholder="Email Address" value={registrationData.email} onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))} className={inputStyle} />
              <input type="password" placeholder="Password" value={registrationData.password} onChange={(e) => setRegistrationData(prev => ({ ...prev, password: e.target.value }))} className={inputStyle} />
            </div>
            <div className="flex space-x-4 mt-6">
              <button onClick={() => { setShowRegistration(false); setPendingOrderData(null); }} className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
              <button onClick={handleRegistration} disabled={isSubmitting} className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50">
                {isSubmitting ? <LoadingSpinner size="sm" /> : 'Create Account & Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
