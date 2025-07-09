import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Upload, FileText, Plus, Minus, X, AlertCircle, CreditCard, DollarSign, Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

// Firebase Imports
import { db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp, doc, runTransaction, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Interfaces & Types
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

// Re-using the User interface from types
interface AppUser { 
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
}

interface PriceConfig {
  [key: string]: {
    [key: string]: { base: number; urgent: number };
  };
}

// --- Replicated from HeroSection.tsx and OrderNow.tsx for consistency ---
const priceConfig: PriceConfig = {
  "High School": {
    "3 hours": { base: 18, urgent: 1.8 }, "6 hours": { base: 16, urgent: 1.6 }, "12 hours": { base: 14, urgent: 1.4 },
    "24 hours": { base: 12, urgent: 1.2 }, "48 hours": { base: 12, urgent: 1.0 }, "3 days": { base: 12, urgent: 1.0 },
    "5 days": { base: 12, urgent: 1.0 }, "7 days": { base: 12, urgent: 1.0 }, "10 days": { base: 12, urgent: 1.0 }, "14 days": { base: 12, urgent: 1.0 }
  },
  "College": {
    "3 hours": { base: 25, urgent: 1.8 }, "6 hours": { base: 22, urgent: 1.6 }, "12 hours": { base: 18, urgent: 1.4 },
    "24 hours": { base: 15, urgent: 1.2 }, "48 hours": { base: 15, urgent: 1.0 }, "3 days": { base: 15, urgent: 1.0 },
    "5 days": { base: 15, urgent: 1.0 }, "7 days": { base: 15, urgent: 1.0 }, "10 days": { base: 15, urgent: 1.0 }, "14 days": { base: 15, urgent: 1.0 }
  },
  "University": {
    "3 hours": { base: 28, urgent: 1.8 }, "6 hours": { base: 25, urgent: 1.6 }, "12 hours": { base: 21, urgent: 1.4 },
    "24 hours": { base: 18, urgent: 1.2 }, "48 hours": { base: 18, urgent: 1.0 }, "3 days": { base: 18, urgent: 1.0 },
    "5 days": { base: 18, urgent: 1.0 }, "7 days": { base: 18, urgent: 1.0 }, "10 days": { base: 18, urgent: 1.0 }, "14 days": { base: 18, urgent: 1.0 }
  },
  "PhD": {
    "3 hours": { base: 38, urgent: 1.8 }, "6 hours": { base: 35, urgent: 1.6 }, "12 hours": { base: 31, urgent: 1.4 },
    "24 hours": { base: 28, urgent: 1.2 }, "48 hours": { base: 25, urgent: 1.0 }, "3 days": { base: 25, urgent: 1.0 },
    "5 days": { base: 25, urgent: 1.0 }, "7 days": { base: 25, urgent: 1.0 }, "10 days": { base: 25, urgent: 1.0 }, "14 days": { base: 25, urgent: 1.0 }
  }
};

const paperTypes = ["Essay (Any Type)", "Admission Essay", "Analysis", "Annotated Bibliography", "Article Review", "Assignment", "Book/Movie Review", "Business Plan", "Capstone Project", "Case Study", "Combined Sections", "Content (Any Type)", "Coursework", "Creative Writing", "Critical Thinking", "Dissertation", "Dissertation Chapter", "Dissertation Editing", "Essay (Any Type)", "Executive Summary", "Extended Revision", "Grant Proposal", "Lab Report", "Math Problem", "Memo/Letter", "Microsoft Project", "Nursing Calculations", "Online Exam", "Other", "Outline", "Paper Editing", "Pages (increase/decrease functionality only)", "Personal Reflection", "Presentation or Speech", "Presentation/PPT", "Progressive Paper", "Proofreading/Editing", "Q&A", "Report (Any Type)", "Research Paper", "Research Proposal", "Research Summary", "Response Essay", "Revision Paper", "Scholarship Essay", "Speech", "Speech Work", "Statistic Project", "Term Paper", "Thesis/Thesis Chapter"];
const subjects = ["Business Studies", "Computer Science", "Economics", "Education", "Engineering", "English", "Health Sciences", "History", "Law", "Literature", "Management", "Marketing", "Nursing", "Political Science", "Psychology", "Sociology", "Other"];
const academicLevels = ["High School", "College", "University", "PhD"];
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

export default function NewOrder() {
  const { isLoading: isAuthLoading } = useAuth(); // <-- FIXED: Removed 'user' from destructuring
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [price, setPrice] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);
  const [selectedClient, setSelectedClient] = useState<AppUser | null>(null);
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const clientDropdownRef = useRef<HTMLDivElement>(null);


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<OrderFormData>({
    defaultValues: {
      academicLevel: "College", 
      paperType: "Essay (Any Type)",
      pages: 1,
      deadline: "48 hours",
      citationStyle: "APA",
      spacing: "double",
      sources: 0,
      subject: "Other",
      topic: "",
      instructions: "",
    }
  });

  const watchedValues = watch();

  // Fetch all users for client selection
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, orderBy('name')); 
        const querySnapshot = await getDocs(q);
        const usersList: AppUser[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as AppUser));
        setAllUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users for selection.");
      }
    };
    fetchUsers();
  }, []);

  // Handle click outside for client dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (clientDropdownRef.current && !clientDropdownRef.current.contains(event.target as Node)) {
        setShowClientDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const calculatePrice = useCallback(() => {
    const config = priceConfig[watchedValues.academicLevel]?.[watchedValues.deadline];
    if (config) {
      const pageMultiplier = watchedValues.spacing === 'double' ? 1 : 2;
      const totalPrice = watchedValues.pages * config.base * config.urgent * pageMultiplier;
      setPrice(Math.round(totalPrice * 100) / 100);
    } else {
      setPrice(0);
      console.warn("Price configuration not found for:", watchedValues.academicLevel, watchedValues.deadline);
    }
  }, [watchedValues.academicLevel, watchedValues.deadline, watchedValues.pages, watchedValues.spacing]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const getNextOrderNumber = async (): Promise<number> => {
    const counterRef = doc(db, 'counters', 'orderCounter');
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
  };
  
  const createOrderInFirestore = useCallback(async (orderData: OrderFormData, client: AppUser) => {
    try {
      let uploadedFileUrls: string[] = [];
      
      if (files.length > 0) {
        const fileUploadPromises = files.map(file => {
          const fileRef = ref(storage, `order_files/${client.id}/${Date.now()}/${file.name}`);
          return uploadBytes(fileRef, file).then(snapshot => getDownloadURL(snapshot.ref));
        });
        uploadedFileUrls = await Promise.all(fileUploadPromises);
        console.log("Files uploaded successfully:", uploadedFileUrls);
      } else {
        console.log("No files to upload.");
      }

      const orderNumber = await getNextOrderNumber();
      console.log("Assigned order number:", orderNumber);

      const newOrderData = {
        orderNumber,
        clientId: client.id,
        clientName: client.name,
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

      await addDoc(collection(db, 'orders'), newOrderData);
      console.log("Order document created successfully for order #", orderNumber);
      toast.success(`Order #${orderNumber} created for ${client.name}!`);
      navigate('/dashboard/orders', { replace: true }); 
      return { success: true, orderNumber };
    } catch (error) {
      console.error("Error in createOrderInFirestore:", error);
      toast.error("Failed to create order. Please try again.");
      throw error;
    }
  }, [navigate, price, files]); 

  const handleFormSubmit = (data: OrderFormData) => {
    if (!selectedClient) {
      toast.error("Please select a client for this order.");
      return;
    }
    setIsSubmitting(true);
    createOrderInFirestore(data, selectedClient)
      .catch(err => {
        console.error("Error during order creation:", err);
        toast.error("Failed to create order. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
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
  const inputStyle = "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors placeholder-gray-400";
  const errorStyle = "text-red-500 text-sm mt-1 flex items-center";
  const stepperButtonStyle = "w-10 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300";

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Create New <span className="text-primary-500">Order</span></h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create an order on behalf of a client. This order will appear in their dashboard.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              {/* Client Selection */}
              <div className="relative" ref={clientDropdownRef}>
                <label className={labelStyle}>Select Client *</label>
                <input
                  type="text"
                  value={selectedClient ? selectedClient.name + ' (' + selectedClient.email + ')' : clientSearchTerm}
                  onChange={(e) => {
                    setClientSearchTerm(e.target.value);
                    setSelectedClient(null); 
                    setShowClientDropdown(true);
                  }}
                  onFocus={() => setShowClientDropdown(true)}
                  placeholder="Search client by name or email..."
                  className={`${inputStyle} pr-10`}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                {showClientDropdown && (
                  <div className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                    {allUsers.filter(u => 
                      u.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) || 
                      u.email.toLowerCase().includes(clientSearchTerm.toLowerCase())
                    ).map(client => (
                      <button
                        key={client.id}
                        type="button"
                        onClick={() => {
                          setSelectedClient(client);
                          setClientSearchTerm(client.name + ' (' + client.email + ')');
                          setShowClientDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        {client.name} ({client.email})
                      </button>
                    ))}
                    {allUsers.filter(u => 
                      u.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) || 
                      u.email.toLowerCase().includes(clientSearchTerm.toLowerCase())
                    ).length === 0 && clientSearchTerm.length > 0 && (
                      <div className="px-4 py-2 text-gray-500 text-center">No users found</div>
                    )}
                  </div>
                )}
                {!selectedClient && errors.academicLevel && ( 
                  <p className={errorStyle}><AlertCircle size={14} className="mr-1" />Please select a client.</p>
                )}
              </div>

              {/* Order Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Academic Level</label>
                  <select
                    {...register('academicLevel', { required: "Academic level is required" })}
                    className={`${inputStyle} form-select`}
                  >
                    {academicLevels.map(level => (<option key={level} value={level}>{level}</option>))}
                  </select>
                  {errors.academicLevel && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.academicLevel.message}</p>}
                </div>
                <div>
                  <label className={labelStyle}>Type of Paper</label>
                  <select
                    {...register('paperType', { required: "Paper type is required" })}
                    className={`${inputStyle} form-select`}
                  >
                    {paperTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                  {errors.paperType && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.paperType.message}</p>}
                </div>
              </div>
              <div>
                <label className={labelStyle}>Subject</label>
                <select
                  {...register('subject', { required: "Subject is required" })}
                  className={`${inputStyle} form-select`}
                >
                  {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                </select>
                {errors.subject && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.subject.message}</p>}
              </div>
              <div>
                <label className={labelStyle}>Topic</label>
                <input type="text" {...register('topic', { required: "Topic is required." })} className={inputStyle} placeholder="e.g., The Impact of AI on Modern Society" />
                {errors.topic && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.topic.message}</p>}
              </div>
              <div>
                <label className={labelStyle}>Number of Sources</label>
                <input
                  type="number"
                  {...register('sources', { required: "Number of sources is required", min: 0 })}
                  className={inputStyle}
                  placeholder="e.g., 5"
                />
                {errors.sources && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.sources.message}</p>}
              </div>
              <div>
                <label className={labelStyle}>Paper Instructions</label>
                <textarea
                  {...register('instructions', { required: "Instructions are required" })}
                  rows={5}
                  className={inputStyle}
                  placeholder="Include all necessary details for your assignment..."
                ></textarea>
                {errors.instructions && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.instructions.message}</p>}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <label className={labelStyle}>Upload Files (Optional)</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 transition-colors ${isDragOver ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-gray-300 dark:border-gray-600'}`}
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Drag & drop files or{' '}
                      <label htmlFor="file-upload" className="text-primary-500 cursor-pointer hover:underline">
                        browse
                      </label>
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                  </div>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                          <FileText size={16} className="mr-2 text-gray-500" />
                          <span>{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-inner p-6 sticky top-24 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <DollarSign className="mr-2 text-primary-500" size={24} />
                Order Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Pages</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handlePagesChange(false)}
                      className={stepperButtonStyle}
                      disabled={watchedValues.pages <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={watchedValues.pages}
                      onChange={(e) => setValue('pages', Math.max(1, parseInt(e.target.value) || 1))}
                      className={`${inputStyle} text-center mx-2`}
                    />
                    <button
                      type="button"
                      onClick={() => handlePagesChange(true)}
                      className={stepperButtonStyle}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {errors.pages && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.pages.message || "Pages are required"}</p>}
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
                <select
                  {...register('deadline', { required: "Deadline is required" })}
                  className={inputStyle}
                >
                  {deadlines.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.deadline && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.deadline.message}</p>}
              </div>
              <div>
                <label className={labelStyle}>Citation Style</label>
                <select
                  {...register('citationStyle', { required: "Citation style is required" })}
                  className={inputStyle}
                >
                  {citationStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
                {errors.citationStyle && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.citationStyle.message}</p>}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Price:</span>
                  <p className="text-3xl font-bold text-primary-500">${price.toFixed(2)}</p>
                </div>
              </div>
              <button
                type="submit" 
                onClick={handleSubmit(handleFormSubmit)}
                disabled={isSubmitting || !selectedClient} 
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center text-lg"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Creating Order...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} className="mr-2" />
                    Create Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
