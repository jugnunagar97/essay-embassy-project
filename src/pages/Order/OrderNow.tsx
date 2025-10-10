import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Upload, FileText, Plus, Minus, X, AlertCircle, CreditCard, DollarSign, Eye, EyeOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import PriceDisplay from '../../components/Common/PriceDisplay';
import CurrencyConverter from '../../components/Common/CurrencyConverter';
import RazorpayButton from '../../components/Payment/RazorpayButton';
import PaymentSuccess from '../../components/Payment/PaymentSuccess';
import { useCurrency } from '../../context/CurrencyContext';
import toast from 'react-hot-toast';

// Firebase Imports
import { collection, addDoc, serverTimestamp, doc, runTransaction } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

// Interfaces
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

interface User {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  register: (email: string, password: string, name: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  isLoading: boolean;
}

interface PriceConfig {
  [key: string]: {
    [key: string]: { base: number; urgent: number };
  };
}

// === UPDATED priceConfig and academicLevels to match HomePage ===
const priceConfig: PriceConfig = {
  // Assuming 'High School' base price is $12
  "High School": {
    "3 hours": { base: 18, urgent: 1.8 }, "6 hours": { base: 16, urgent: 1.6 }, "12 hours": { base: 14, urgent: 1.4 },
    "24 hours": { base: 12, urgent: 1.2 }, "48 hours": { base: 12, urgent: 1.0 }, "3 days": { base: 12, urgent: 1.0 },
    "5 days": { base: 12, urgent: 1.0 }, "7 days": { base: 12, urgent: 1.0 }, "10 days": { base: 12, urgent: 1.0 }, "14 days": { base: 12, urgent: 1.0 }
  },
  // 'College' base price is $15
  "College": {
    "3 hours": { base: 25, urgent: 1.8 }, "6 hours": { base: 22, urgent: 1.6 }, "12 hours": { base: 18, urgent: 1.4 },
    "24 hours": { base: 15, urgent: 1.2 }, "48 hours": { base: 15, urgent: 1.0 }, "3 days": { base: 15, urgent: 1.0 },
    "5 days": { base: 15, urgent: 1.0 }, "7 days": { base: 15, urgent: 1.0 }, "10 days": { base: 15, urgent: 1.0 }, "14 days": { base: 15, urgent: 1.0 }
  },
  // 'University' base price is $18
  "University": { // Renamed from "Undergraduate" or "Masters" to match Home.tsx
    "3 hours": { base: 28, urgent: 1.8 }, "6 hours": { base: 25, urgent: 1.6 }, "12 hours": { base: 21, urgent: 1.4 },
    "24 hours": { base: 18, urgent: 1.2 }, "48 hours": { base: 18, urgent: 1.0 }, "3 days": { base: 18, urgent: 1.0 },
    "5 days": { base: 18, urgent: 1.0 }, "7 days": { base: 18, urgent: 1.0 }, "10 days": { base: 18, urgent: 1.0 }, "14 days": { base: 18, urgent: 1.0 }
  },
  // Keeping PhD as it is, as it's a higher level not explicitly on home page pricing
  "PhD": {
    "3 hours": { base: 38, urgent: 1.8 }, "6 hours": { base: 35, urgent: 1.6 }, "12 hours": { base: 31, urgent: 1.4 },
    "24 hours": { base: 28, urgent: 1.2 }, "48 hours": { base: 25, urgent: 1.0 }, "3 days": { base: 25, urgent: 1.0 },
    "5 days": { base: 25, urgent: 1.0 }, "7 days": { base: 25, urgent: 1.0 }, "10 days": { base: 25, urgent: 1.0 }, "14 days": { base: 25, urgent: 1.0 }
  }
};

const paperTypes = ["Essay (Any Type)", "Admission Essay", "Analysis", "Annotated Bibliography", "Article Review", "Assignment", "Book/Movie Review", "Business Plan", "Capstone Project", "Case Study", "Coursework", "Creative Writing", "Critical Thinking", "Dissertation", "Lab Report", "Research Paper", "Research Proposal", "Speech", "Term Paper", "Thesis"];
const subjects = ["Business Studies", "Computer Science", "Economics", "Education", "Engineering", "English", "Health Sciences", "History", "Law", "Literature", "Management", "Marketing", "Nursing", "Political Science", "Psychology", "Sociology", "Other"];
// === UPDATED academicLevels to match Home.tsx ===
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
    default: futureDate.setDate(now.getDate() + 2); // Fallback for safety
  }
  return futureDate;
};

// --- Unified Pricing (foundational rules) ---
// Use the same priceConfig defined above. Compute price solely from level + deadline,
// then apply spacing multiplier. This avoids mismatches like "High School"/"University"
// mapping to legacy tables and returning 0.
const getBasePrice = (academicLevel: string, deadline: string, _discipline: string, spacing: string) => {
  const levelConfig = (priceConfig as Record<string, Record<string, { base: number; urgent: number }>>)[academicLevel];
  const deadlineConfig = levelConfig?.[deadline];
  let price = 0;
  if (deadlineConfig) {
    // Apply foundational rule: base multiplied by its urgent factor for short deadlines
    price = deadlineConfig.base * deadlineConfig.urgent;
  }
  if (spacing === 'single') price *= 2;
  return price;
};

export default function OrderNow() {
  const { user, register: registerUser, login: loginUser, isLoading: isAuthLoading } = useAuth() as AuthContextType;
  const { selectedCurrency } = useCurrency();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [price, setPrice] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signup' | 'login'>('signup');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState<OrderFormData | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<OrderFormData>({
    defaultValues: {
      // Read academicLevel from URL, if present. Otherwise, default to "College".
      academicLevel: searchParams.get('academicLevel') || "College",
      paperType: searchParams.get('paperType') || "Essay (Any Type)",
      pages: parseInt(searchParams.get('pages') || '1'),
      deadline: searchParams.get('deadline') || "48 hours",
      citationStyle: "APA",
      spacing: "double",
      sources: 0,
      subject: "Other",
      topic: "",
      instructions: "",
    }
  });

  const watchedValues = watch();

  const calculatePrice = useCallback(() => {
    const basePrice = getBasePrice(watchedValues.academicLevel, watchedValues.deadline, watchedValues.subject, watchedValues.spacing);
    const totalPrice = basePrice * (watchedValues.pages || 1);
    setPrice(Math.round(totalPrice * 100) / 100);
  }, [watchedValues]);

  useEffect(() => {
    // This effect ensures the price is calculated when component mounts or relevant values change
    calculatePrice();
  }, [calculatePrice]);

  // === NEW EFFECT TO SET FORM VALUE FROM URL PARAMETER ===
  useEffect(() => {
    const academicLevelFromUrl = searchParams.get('academicLevel');
    if (academicLevelFromUrl && academicLevels.includes(academicLevelFromUrl)) {
      setValue('academicLevel', academicLevelFromUrl);
    }
    const paperTypeFromUrl = searchParams.get('paperType');
    if (paperTypeFromUrl) {
      setValue('paperType', paperTypeFromUrl);
    }
    const subjectFromUrl = searchParams.get('subject');
    if (subjectFromUrl) {
      setValue('subject', subjectFromUrl);
    }
    const deadlineFromUrl = searchParams.get('deadline');
    if (deadlineFromUrl) {
      setValue('deadline', deadlineFromUrl);
    }
    const pagesFromUrl = searchParams.get('pages');
    if (pagesFromUrl && !isNaN(Number(pagesFromUrl))) {
      setValue('pages', Number(pagesFromUrl));
    }
  }, [searchParams, setValue]); // Re-run if searchParams or setValue changes

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
  
  const createOrderInFirestore = useCallback(async (orderData: OrderFormData, author: { id: string, name: string }) => {
    try {
      let uploadedFileUrls: string[] = [];
      
      if (files.length > 0) {
        const fileUploadPromises = files.map(file => {
          const fileRef = ref(storage, `order_files/${author.id}/${Date.now()}/${file.name}`);
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

      const orderRef = await addDoc(collection(db, 'orders'), newOrderData);
      console.log("Order document created successfully for order #", orderNumber);
      setOrderNumber(orderNumber);
      return { success: true, orderNumber, orderId: orderRef.id }; // Return success indicator
    } catch (error) {
      console.error("Error in createOrderInFirestore:", error);
      toast.error("Failed to create order. Please try again.");
      throw error; // Propagate error to caller
    }
  }, [navigate, price, files, user]);

  const handleFormSubmit = async (data: OrderFormData) => {
    if (user) {
      setIsSubmitting(true);
      try {
        const result = await createOrderInFirestore(data, { id: user.id, name: user.name });
        if (result.success) {
          // Order created successfully, now show payment option
          toast.success(`Order #${result.orderNumber} created! Please complete payment.`);
        }
      } catch (err) {
        console.error("Error during direct order creation:", err);
        toast.error("Failed to create order. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setPendingOrderData(data);
      setShowAuthModal(true);
      setAuthModalMode('signup');
    }
  };

  const handleAuthSubmit = async () => {
    if (!pendingOrderData) {
      toast.error("Something went wrong, pending order data is missing.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      let authResult;
      let finalUserName;

      console.log("Starting auth process:", authModalMode);
      if (authModalMode === 'signup') {
        if (!authName || !authEmail || !authPassword) throw new Error('Please fill in all signup fields');
        authResult = await registerUser(authEmail, authPassword, authName);
        finalUserName = authName;
        console.log("Signup successful, user:", authResult.user.uid);
        toast.success('Account created! Finalizing your order...');
      } else {
        if (!authEmail || !authPassword) throw new Error('Please fill in email and password');
        authResult = await loginUser(authEmail, authPassword);
        finalUserName = authResult.user.displayName;
        console.log("Login successful, user:", authResult.user.uid);
        toast.success('Logged in! Finalizing your order...');
      }
      
      const loggedInUser = authResult?.user;
      if (!loggedInUser || !loggedInUser.uid) {
        throw new Error("Authentication succeeded but user details are missing.");
      }

      console.log("Creating order with user:", loggedInUser.uid);
      const result = await createOrderInFirestore(pendingOrderData, { id: loggedInUser.uid, name: finalUserName });
      if (result.success) {
        console.log("Order creation completed");
        toast.success(`Order #${result.orderNumber} created! Please complete payment.`);
      }
    } catch (error: any) {
      console.error("Error in handleAuthSubmit:", error);
      toast.error(error.message || `Failed to ${authModalMode === 'signup' ? 'create account' : 'log in'}`);
    } finally {
      console.log("Resetting states in finally block");
      setIsSubmitting(false);
      setPendingOrderData(null);
      setShowAuthModal(false);
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

  const handlePaymentSuccess = (paymentId: string) => {
    setPaymentId(paymentId);
    setPaymentSuccess(true);
    toast.success('Payment successful! Your order is now confirmed.');
  };

  const handlePaymentError = (error: string) => {
    toast.error(`Payment failed: ${error}`);
  };

  const labelStyle = "block text-sm font-semibold text-gray-700 mb-2";
  const inputStyle = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 transition-colors placeholder-gray-400";
  const errorStyle = "text-red-500 text-sm mt-1 flex items-center";
  const stepperButtonStyle = "w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Show payment success screen
  if (paymentSuccess && orderNumber) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <PaymentSuccess
            paymentId={paymentId}
            amount={price}
            orderId={`#${orderNumber}`}
            onDownload={() => {
              // TODO: Implement download receipt
              toast.success('Receipt download started');
            }}
            onEmailReceipt={() => {
              // TODO: Implement email receipt
              toast.success('Receipt sent to your email');
            }}
          />
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Place Your <span className="text-primary-500">Order</span></h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get professional academic writing help from our expert writers. Fill out the form below to get started.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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
              <div className="border-t border-gray-200 pt-6">
                <label className={labelStyle}>Upload Files (Optional)</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 transition-colors ${isDragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}`}
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
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
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                        <div className="flex items-center text-sm">
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

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
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
                      {...register('pages', { required: true, min: 1, valueAsNumber: true })}
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
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-gray-900">Total Price:</span>
                  <PriceDisplay usdPrice={price} variant="large" />
                </div>
                <div className="flex justify-end">
                  <CurrencyConverter variant="card" />
                </div>
              </div>
              {orderNumber ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">✓</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          Order #{orderNumber} Created Successfully
                        </p>
                        <p className="text-sm text-green-600">
                          Complete payment to confirm your order
                        </p>
                      </div>
                    </div>
                  </div>
                  <RazorpayButton
                    amount={price}
                    currency={selectedCurrency}
                    orderId={`order_${orderNumber}`}
                    userId={user?.id}
                    serviceType="essay"
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    className="w-full"
                  >
                    <CreditCard size={20} className="mr-2" />
                    Pay with Razorpay
                  </RazorpayButton>
                </div>
              ) : (
                <button
                  onClick={handleSubmit(handleFormSubmit)}
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 flex items-center justify-center text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} className="mr-2" />
                      Submit & Continue
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Authentication Modal (Login/Signup) */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
              <button
                onClick={() => { setShowAuthModal(false); setPendingOrderData(null); setIsSubmitting(false); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {authModalMode === 'signup' ? 'Create Account to Continue' : 'Login to Continue'}
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                {authModalMode === 'signup' ? "We'll create your account and place your order immediately." : "Log in to finalize your order."}
              </p>

              <div className="space-y-4">
                {authModalMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className={inputStyle}
                      disabled={isSubmitting}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className={inputStyle}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className={inputStyle}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleAuthSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? <LoadingSpinner size="sm" /> : (authModalMode === 'signup' ? 'Create Account & Submit' : 'Login & Submit')}
                </button>
              </div>

              <div className="mt-6 text-center">
                {authModalMode === 'signup' ? (
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthModalMode('login')}
                      className="text-primary-500 font-medium hover:underline"
                      disabled={isSubmitting}
                    >
                      Log In
                    </button>
                  </p>
                ) : (
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthModalMode('signup')}
                      className="text-primary-500 font-medium hover:underline"
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}