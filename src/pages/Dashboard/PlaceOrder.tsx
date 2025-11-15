import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Upload, FileText, Plus, Minus, X, AlertCircle, CreditCard, DollarSign, ShoppingCart
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
import { collection, addDoc, serverTimestamp, doc, runTransaction, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

// ==================================================================================
// === TYPE DEFINITIONS ===
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
  [key: string]: {
    [key: string]: { base: number; urgent: number };
  };
}

// ==================================================================================
// === PRICE CONFIGURATION (Same as OrderNow.tsx) ===
// ==================================================================================
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

const paperTypes = ["Essay (Any Type)", "Admission Essay", "Analysis", "Annotated Bibliography", "Article Review", "Assignment", "Book/Movie Review", "Business Plan", "Capstone Project", "Case Study", "Coursework", "Creative Writing", "Critical Thinking", "Dissertation", "Lab Report", "Research Paper", "Research Proposal", "Speech", "Term Paper", "Thesis"];
const subjects = ["Business Studies", "Computer Science", "Economics", "Education", "Engineering", "English", "Health Sciences", "History", "Law", "Literature", "Management", "Marketing", "Nursing", "Political Science", "Psychology", "Sociology", "Other"];
const academicLevels = ["High School", "College", "University", "PhD"];
const deadlines = ["3 hours", "6 hours", "12 hours", "24 hours", "48 hours", "3 days", "5 days", "7 days", "10 days", "14 days"];
const citationStyles = ["APA", "MLA", "Chicago", "Harvard", "Other"];

// ==================================================================================
// === HELPER FUNCTIONS ===
// ==================================================================================
const convertDeadlineToDate = (relativeDeadline: string): Timestamp => {
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
  return Timestamp.fromDate(futureDate);
};

const getBasePrice = (academicLevel: string, deadline: string, spacing: string): number => {
  const levelConfig = priceConfig[academicLevel];
  const deadlineConfig = levelConfig?.[deadline];
  let price = 0;
  if (deadlineConfig) {
    price = deadlineConfig.base * deadlineConfig.urgent;
  }
  if (spacing === 'single') price *= 2;
  return price;
};

// ==================================================================================
// === MAIN COMPONENT ===
// ==================================================================================
export default function PlaceOrder() {
  const { user } = useAuth();
  const { selectedCurrency } = useCurrency();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [price, setPrice] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

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

  // Calculate price whenever form values change
  const calculatePrice = useCallback(() => {
    const basePrice = getBasePrice(
      watchedValues.academicLevel,
      watchedValues.deadline,
      watchedValues.spacing
    );
    const totalPrice = basePrice * (watchedValues.pages || 1);
    setPrice(Math.round(totalPrice * 100) / 100);
  }, [watchedValues]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  // Generate next order number
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

  // Create order in Firestore
  const createOrderInFirestore = async (orderData: OrderFormData) => {
    if (!user) {
      toast.error('You must be logged in to place an order');
      return null;
    }

    try {
      let uploadedFileUrls: string[] = [];

      // Upload files if any
      if (files.length > 0) {
        const fileUploadPromises = files.map(file => {
          const fileRef = ref(storage, `order_files/${user.id}/${Date.now()}/${file.name}`);
          return uploadBytes(fileRef, file).then(snapshot => getDownloadURL(snapshot.ref));
        });
        uploadedFileUrls = await Promise.all(fileUploadPromises);
        console.log("Files uploaded successfully:", uploadedFileUrls);
      }

      const orderNumber = await getNextOrderNumber();
      console.log("Assigned order number:", orderNumber);

      const newOrderData = {
        orderNumber,
        clientId: user.id,
        clientName: (user as any).name || user.displayName || 'User',
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
      console.log("Order created successfully with ID:", orderRef.id);
      
      setOrderNumber(orderNumber);
      setCreatedOrderId(orderRef.id);
      
      return { success: true, orderNumber, orderId: orderRef.id };
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
      throw error;
    }
  };

  // Handle form submission
  const handleFormSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createOrderInFirestore(data);
      if (result?.success) {
        toast.success(`Order #${result.orderNumber} created! Please complete payment.`);
      }
    } catch (err) {
      console.error("Error during order creation:", err);
      toast.error("Failed to create order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle pages increment/decrement
  const handlePagesChange = (increment: boolean) => {
    const currentPages = watchedValues.pages || 1;
    const newPages = increment ? currentPages + 1 : Math.max(1, currentPages - 1);
    setValue('pages', newPages);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  // Remove file
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle payment success
  const handlePaymentSuccess = (paymentId: string) => {
    setPaymentId(paymentId);
    setPaymentSuccess(true);
    toast.success('Payment successful! Your order is now confirmed.');
  };

  // Handle payment error
  const handlePaymentError = (error: string) => {
    toast.error(`Payment failed: ${error}`);
  };

  // Styles
  const labelStyle = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";
  const inputStyle = "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors placeholder-gray-400";
  const errorStyle = "text-red-500 text-sm mt-1 flex items-center";
  const stepperButtonStyle = "w-10 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  // Show payment success screen
  if (paymentSuccess && orderNumber) {
    return (
      <div className="p-6 space-y-6">
        <PaymentSuccess
          paymentId={paymentId}
          amount={price}
          orderId={`#${orderNumber}`}
          onDownload={() => {
            toast.success('Receipt download started');
          }}
          onEmailReceipt={() => {
            toast.success('Receipt sent to your email');
          }}
        />
        <div className="text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Place New Order</h1>
            <p className="text-gray-600 dark:text-gray-400">Fill out the form below to get started</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Order Form */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Academic Level & Paper Type */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}>Academic Level</label>
                <select
                  {...register('academicLevel', { required: "Academic level is required" })}
                  className={inputStyle}
                >
                  {academicLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.academicLevel && (
                  <p className={errorStyle}>
                    <AlertCircle size={14} className="mr-1" />
                    {errors.academicLevel.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelStyle}>Type of Paper</label>
                <select
                  {...register('paperType', { required: "Paper type is required" })}
                  className={inputStyle}
                >
                  {paperTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.paperType && (
                  <p className={errorStyle}>
                    <AlertCircle size={14} className="mr-1" />
                    {errors.paperType.message}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className={labelStyle}>Subject</label>
              <select
                {...register('subject', { required: "Subject is required" })}
                className={inputStyle}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              {errors.subject && (
                <p className={errorStyle}>
                  <AlertCircle size={14} className="mr-1" />
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Topic */}
            <div>
              <label className={labelStyle}>Topic</label>
              <input
                type="text"
                {...register('topic', { required: "Topic is required" })}
                className={inputStyle}
                placeholder="e.g., The Impact of AI on Modern Society"
              />
              {errors.topic && (
                <p className={errorStyle}>
                  <AlertCircle size={14} className="mr-1" />
                  {errors.topic.message}
                </p>
              )}
            </div>

            {/* Number of Sources */}
            <div>
              <label className={labelStyle}>Number of Sources</label>
              <input
                type="number"
                {...register('sources', { required: "Number of sources is required", min: 0 })}
                className={inputStyle}
                placeholder="e.g., 5"
              />
              {errors.sources && (
                <p className={errorStyle}>
                  <AlertCircle size={14} className="mr-1" />
                  {errors.sources.message}
                </p>
              )}
            </div>

            {/* Instructions */}
            <div>
              <label className={labelStyle}>Paper Instructions</label>
              <textarea
                {...register('instructions', { required: "Instructions are required" })}
                rows={5}
                className={inputStyle}
                placeholder="Include all necessary details for your assignment..."
              />
              {errors.instructions && (
                <p className={errorStyle}>
                  <AlertCircle size={14} className="mr-1" />
                  {errors.instructions.message}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <label className={labelStyle}>Upload Files (Optional)</label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                  isDragOver
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
              >
                <div className="text-center">
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Drag & drop files or{' '}
                    <label
                      htmlFor="file-upload"
                      className="text-primary-500 cursor-pointer hover:underline"
                    >
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
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"
                    >
                      <div className="flex items-center text-sm">
                        <FileText size={16} className="mr-2 text-gray-500" />
                        <span className="text-gray-900 dark:text-white">{file.name}</span>
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

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 sticky top-24 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <DollarSign className="mr-2 text-primary-500" size={24} />
              Order Summary
            </h3>

            {/* Pages & Spacing */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}>Pages</label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handlePagesChange(false)}
                    className={stepperButtonStyle}
                    disabled={watchedValues.pages <= 1}
                    aria-label="Decrease pages"
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
                    aria-label="Increase pages"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {errors.pages && (
                  <p className={errorStyle}>
                    <AlertCircle size={14} className="mr-1" />
                    {errors.pages.message || "Pages are required"}
                  </p>
                )}
              </div>
              <div>
                <label className={labelStyle}>Spacing</label>
                <select {...register('spacing')} className={inputStyle}>
                  <option value="double">Double</option>
                  <option value="single">Single</option>
                </select>
              </div>
            </div>

            {/* Deadline */}
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
              {errors.deadline && (
                <p className={errorStyle}>
                  <AlertCircle size={14} className="mr-1" />
                  {errors.deadline.message}
                </p>
              )}
            </div>

            {/* Citation Style */}
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
              {errors.citationStyle && (
                <p className={errorStyle}>
                  <AlertCircle size={14} className="mr-1" />
                  {errors.citationStyle.message}
                </p>
              )}
            </div>

            {/* Price Display */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total Price:
                </span>
                <PriceDisplay usdPrice={price} variant="large" />
              </div>
              <div className="flex justify-end">
                <CurrencyConverter variant="card" />
              </div>
            </div>

            {/* Submit or Payment Button */}
            {orderNumber && createdOrderId ? (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                          ✓
                        </span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800 dark:text-green-300">
                        Order #{orderNumber} Created Successfully
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
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
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
}
