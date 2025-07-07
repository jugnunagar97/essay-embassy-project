import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Upload,
  FileText,
  Plus,
  Minus,
  X,
  AlertCircle,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

// === FIREBASE IMPORTS ===
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// ==================================================================================
// === TYPE DEFINITIONS & CONSTANTS ===
// ==================================================================================
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

interface PriceConfig {
  [key: string]: { [key: string]: { base: number; urgent: number; }; };
}

const priceConfig: PriceConfig = {
  "College": { "3 hours": { base: 25, urgent: 1.8 }, "6 hours": { base: 22, urgent: 1.6 }, "12 hours": { base: 18, urgent: 1.4 }, "24 hours": { base: 15, urgent: 1.2 }, "48 hours": { base: 12, urgent: 1.0 }, "3 days": { base: 12, urgent: 1.0 }, "5 days": { base: 12, urgent: 1.0 }, "7 days": { base: 12, urgent: 1.0 }, "10 days": { base: 12, urgent: 1.0 }, "14 days": { base: 12, urgent: 1.0 } },
  "Undergraduate": { "3 hours": { base: 28, urgent: 1.8 }, "6 hours": { base: 25, urgent: 1.6 }, "12 hours": { base: 21, urgent: 1.4 }, "24 hours": { base: 18, urgent: 1.2 }, "48 hours": { base: 15, urgent: 1.0 }, "3 days": { base: 15, urgent: 1.0 }, "5 days": { base: 15, urgent: 1.0 }, "7 days": { base: 15, urgent: 1.0 }, "10 days": { base: 15, urgent: 1.0 }, "14 days": { base: 15, urgent: 1.0 } },
  "Masters": { "3 hours": { base: 32, urgent: 1.8 }, "6 hours": { base: 29, urgent: 1.6 }, "12 hours": { base: 25, urgent: 1.4 }, "24 hours": { base: 22, urgent: 1.2 }, "48 hours": { base: 19, urgent: 1.0 }, "3 days": { base: 19, urgent: 1.0 }, "5 days": { base: 19, urgent: 1.0 }, "7 days": { base: 19, urgent: 1.0 }, "10 days": { base: 19, urgent: 1.0 }, "14 days": { base: 19, urgent: 1.0 } },
  "PhD": { "3 hours": { base: 38, urgent: 1.8 }, "6 hours": { base: 35, urgent: 1.6 }, "12 hours": { base: 31, urgent: 1.4 }, "24 hours": { base: 28, urgent: 1.2 }, "48 hours": { base: 25, urgent: 1.0 }, "3 days": { base: 25, urgent: 1.0 }, "5 days": { base: 25, urgent: 1.0 }, "7 days": { base: 25, urgent: 1.0 }, "10 days": { base: 25, urgent: 1.0 }, "14 days": { base: 25, urgent: 1.0 } }
};

const paperTypes = [ "Acceptance Letter", "Admission Essay", "Analysis", "Annotated Bibliography", "Application Paper", "Article (Any Type)", "Article Review", "Assignment", "Blog Writing", "Book/Movie Review", "Brochure", "Business Plan", "Capstone Project", "Case Study", "Combined Sections", "Content (Any Type)", "Coursework", "Creative Writing", "Critical Thinking", "Dissertation", "Dissertation Chapter", "Dissertation Editing", "Essay (Any Type)", "Executive Summary", "Extended Revision", "Grant Proposal", "Lab Report", "Math Problem", "Memo/Letter", "Microsoft Project", "Nursing Calculations", "Online Exam", "Other", "Outline", "Paper Editing", "Personal Reflection", "Presentation or Speech", "Presentation/PPT", "Progressive Paper", "Proofreading/Editing", "Q&A", "Report (Any Type)", "Research Paper", "Research Proposal", "Research Summary", "Response Essay", "Revision Paper", "Scholarship Essay", "Speech", "Speech Work", "Statistic Project", "Term Paper", "Thesis/Thesis Chapter" ];
const subjects = [ "Accounting", "Anthropology", "Architecture", "Art", "Biology", "Business Studies", "Chemistry", "Computer Science", "Criminal Justice", "Economics", "Education", "Engineering", "English", "Environmental Science", "Finance", "Geography", "Health Sciences", "History", "Law", "Literature", "Management", "Marketing", "Mathematics", "Medicine", "Music", "Nursing", "Philosophy", "Physics", "Political Science", "Psychology", "Religion", "Sociology", "Statistics", "Other" ];
const academicLevels = ["College", "Undergraduate", "Masters", "PhD"];
const deadlines = ["3 hours", "6 hours", "12 hours", "24 hours", "48 hours", "3 days", "5 days", "7 days", "10 days", "14 days"];
const citationStyles = ["APA", "MLA", "Chicago", "Harvard", "IEEE", "AMA", "ASA", "APSA", "Other"];

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
      subject: "Business Studies",
      topic: "",
      instructions: ""
    }
  });

  const watchedValues = watch();

  const calculatePrice = useCallback(() => {
    const config = priceConfig[watchedValues.academicLevel as keyof PriceConfig]?.[watchedValues.deadline];
    if (config) {
      const totalPrice = watchedValues.pages * config.base * config.urgent;
      setPrice(Math.round(totalPrice * 100) / 100);
    }
  }, [watchedValues.academicLevel, watchedValues.deadline, watchedValues.pages]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const createOrderInFirestore = useCallback(async (orderData: OrderFormData, author: { id: string, name: string }) => {
    setIsSubmitting(true);
    try {
      const actualDeadline = convertDeadlineToDate(orderData.deadline);
      // Removed 'uploadedFileUrls' variable as it was unused at this stage.
      // You'll handle file uploads to Firebase Storage and get URLs here when you implement that feature.

      const newOrderData = {
        clientId: author.id,
        clientName: author.name,
        academicLevel: orderData.academicLevel,
        paperType: orderData.paperType,
        subject: orderData.subject,
        topic: orderData.topic,
        pages: orderData.pages,
        words: orderData.pages * 275, // Assuming 275 words per page
        deadline: actualDeadline.toISOString(), // Convert Date object to ISO string for Firestore storage
        citationStyle: orderData.citationStyle,
        spacing: orderData.spacing,
        sources: orderData.sources,
        instructions: orderData.instructions,
        // files: [] as { id: string, name: string, url: string, size: number, type: string, uploadedAt: string }[], // Correctly initialized as FileUpload[]
        files: [], // Simply initialize as empty array, it matches FileUpload[]
        completedFiles: [], // Simply initialize as empty array
        status: 'pending-payment',
        paymentStatus: 'pending',
        amount: price,
        createdAt: serverTimestamp(),
        writerId: null, // Initial state, no writer assigned
      };

      const ordersCollectionRef = collection(db, 'orders');
      const docRef = await addDoc(ordersCollectionRef, newOrderData);

      toast.success(`Order #${docRef.id} created successfully!`);
      navigate(`/dashboard/orders/${docRef.id}`);
    } catch (error) {
      console.error("Error creating order in Firestore: ", error);
      toast.error('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
      setPendingOrderData(null);
    }
  }, [navigate, price]);

  useEffect(() => {
    if (user && pendingOrderData) {
      createOrderInFirestore(pendingOrderData, { id: user.id, name: user.name });
    }
  }, [user, pendingOrderData, createOrderInFirestore]);

  const handleFormSubmit = async (data: OrderFormData) => {
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
      setIsSubmitting(false); // Ensure button is re-enabled on failure
    }
  };

  const handlePagesChange = (increment: boolean) => {
    const currentPages = watchedValues.pages || 1;
    const newPages = increment ? currentPages + 1 : Math.max(1, currentPages - 1);
    setValue('pages', newPages);
  };

  // FIX: Make Array.from robust against null
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : []; // Safely get files or an empty array
    setFiles(prev => [...prev, ...newFiles]);
  };

  // FIX: Make Array.from robust against null
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = e.dataTransfer.files ? Array.from(e.dataTransfer.files) : []; // Safely get files or an empty array
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const labelStyle = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";
  const inputStyle = "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors";
  const errorStyle = "text-red-500 text-sm mt-1 flex items-center";
  const stepperButtonStyle = "w-10 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Place Your <span className="text-primary-500">Order</span></h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Get professional academic writing help from our expert writers. Fill out the form below to get started.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>Academic Level</label>
                    <select {...register('academicLevel', { required: true })} className={inputStyle}>
                      {academicLevels.map(level => (<option key={level} value={level}>{level}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>Type of Paper</label>
                    <select {...register('paperType', { required: true })} className={inputStyle}>
                      {paperTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelStyle}>Subject</label>
                  <select {...register('subject', { required: true })} className={inputStyle}>
                    {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Topic</label>
                  <input type="text" {...register('topic', { required: "Topic is required." })} className={inputStyle} placeholder="e.g., The Impact of AI on Modern Society" />
                  {errors.topic && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.topic.message}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>Number of Pages</label>
                    <div className="flex items-center space-x-3">
                      <button type="button" onClick={() => handlePagesChange(false)} className={stepperButtonStyle} disabled={watchedValues.pages <= 1}><Minus size={16} /></button>
                      <input type="number" {...register('pages', { required: true, min: 1 })} className={`${inputStyle} text-center w-20`} />
                      <button type="button" onClick={() => handlePagesChange(true)} className={stepperButtonStyle}><Plus size={16} /></button>
                      <span className="text-gray-500 dark:text-gray-400">({(watchedValues.pages || 1) * 275} words)</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelStyle}>Deadline</label>
                    <select {...register('deadline', { required: true })} className={inputStyle}>
                      {deadlines.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                
                {/* --- Added missing form fields from previous fix --- */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>Citation Style</label>
                    <select {...register('citationStyle', { required: true })} className={inputStyle}>
                      {citationStyles.map(style => <option key={style} value={style}>{style}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>Spacing</label>
                    <select {...register('spacing', { required: true })} className={inputStyle}>
                      <option value="double">Double Spaced</option>
                      <option value="single">Single Spaced</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelStyle}>Number of Sources</label>
                  <input
                    type="number"
                    {...register('sources', { min: 0, valueAsNumber: true })}
                    className={inputStyle}
                    placeholder="e.g., 5"
                  />
                  {errors.sources && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.sources.message}</p>}
                </div>

                <div>
                  <label className={labelStyle}>Paper Instructions</label>
                  <textarea {...register('instructions')} rows={6} className={inputStyle} placeholder="Include all necessary details for your assignment..."></textarea>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8 space-y-6">
                  <div>
                    <label className={labelStyle}>Upload Files (Optional)</label>
                    <div className={`border-2 border-dashed rounded-lg p-6 transition-colors ${isDragOver ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600'}`}
                      onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }} onDragLeave={() => setIsDragOver(false)}>
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
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
                  <div className="flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full md:w-auto flex items-center justify-center py-3 px-8 text-lg">
                      {isSubmitting ? <><LoadingSpinner size="sm" className="mr-2" />Processing...</> : <><CreditCard size={20} className="mr-2" />Proceed to Checkout</>}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Price Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Academic Level:</span><span className="font-medium text-gray-900 dark:text-white">{watchedValues.academicLevel}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Pages:</span><span className="font-medium text-gray-900 dark:text-white">{watchedValues.pages || 1}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Deadline:</span><span className="font-medium text-gray-900 dark:text-white">{watchedValues.deadline}</span></div>
                {/* Add summary for citation, spacing, sources here if desired */}
                <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Citation Style:</span><span className="font-medium text-gray-900 dark:text-white">{watchedValues.citationStyle}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Spacing:</span><span className="font-medium text-gray-900 dark:text-white">{watchedValues.spacing}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Sources:</span><span className="font-medium text-gray-900 dark:text-white">{watchedValues.sources}</span></div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                  <p className="text-3xl font-bold text-primary-500">${price}</p>
                </div>
              </div>
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