import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileText,
  Plus,
  Minus,
  X,
  AlertCircle,
  CreditCard,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

// === FIREBASE IMPORTS ===
import { db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// === TYPE DEFINITIONS & CONSTANTS ===
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
  "College": { "3 hours": { base: 25, urgent: 1.8 }, "6 hours": { base: 22, urgent: 1.6 }, "12 hours": { base: 18, urgent: 1.4 }, "24 hours": { base: 15, urgent: 1.2 }, "48 hours": { base: 12, urgent: 1.0 }, "3 days": { base: 12, urgent: 1.0 }, "5 days": { base: 12, urgent: 1.0 }, "7 days": { base: 12, urgent: 1.0 }, "10 days": { base: 12, urgent: 12.0 }, "14 days": { base: 12, urgent: 1.0 } },
  "Undergraduate": { "3 hours": { base: 28, urgent: 1.8 }, "6 hours": { base: 25, urgent: 1.6 }, "12 hours": { base: 21, urgent: 1.4 }, "24 hours": { base: 18, urgent: 1.2 }, "48 hours": { base: 15, urgent: 1.0 }, "3 days": { base: 15, urgent: 1.0 }, "5 days": { base: 15, urgent: 1.0 }, "7 days": { base: 15, urgent: 1.0 }, "10 days": { base: 15, urgent: 1.0 }, "14 days": { base: 15, urgent: 1.0 } },
  "Masters": { "3 hours": { base: 32, urgent: 1.8 }, "6 hours": { base: 29, urgent: 1.6 }, "12 hours": { base: 25, urgent: 1.4 }, "24 hours": { base: 22, urgent: 1.2 }, "48 hours": { base: 19, urgent: 1.0 }, "3 days": { base: 19, urgent: 1.0 }, "5 days": { base: 19, urgent: 1.0 }, "7 days": { base: 19, urgent: 19.0 }, "10 days": { base: 19, urgent: 1.0 }, "14 days": { base: 19, urgent: 1.0 } },
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

// --- Unified Pricing using foundational rules ---
const getBasePrice = (academicLevel: string, deadline: string, _discipline: string, spacing: string) => {
  const levelConfig = (priceConfig as Record<string, Record<string, { base: number; urgent: number }>>)[academicLevel];
  const deadlineConfig = levelConfig?.[deadline];
  let price = 0;
  if (deadlineConfig) {
    price = deadlineConfig.base * deadlineConfig.urgent;
  }
  if (spacing === 'single') price *= 2;
  return price;
};

export default function OrderForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [price, setPrice] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<OrderFormData>({
    defaultValues: {
      academicLevel: "Undergraduate",
      paperType: "Essay (Any Type)",
      pages: 1,
      deadline: "48 hours",
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
    const basePrice = getBasePrice(watchedValues.academicLevel, watchedValues.deadline, watchedValues.subject, watchedValues.spacing);
    const totalPrice = basePrice * (watchedValues.pages || 1);
    setPrice(Math.round(totalPrice * 100) / 100);
  }, [watchedValues]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

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

  const onSubmit = async (data: OrderFormData) => {
    if (!user) {
      toast.error('Please log in to place an order.');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting order...");

    try {
      console.log("Uploading files...");
      const fileUploadPromises = files.map(file => {
        const fileRef = ref(storage, `order_files/${user.id}/${Date.now()}_${file.name}`);
        return uploadBytes(fileRef, file).then(snapshot => getDownloadURL(snapshot.ref));
      });

      const uploadedFileUrls = await Promise.all(fileUploadPromises);
      console.log("Files uploaded successfully:", uploadedFileUrls);

      const actualDeadline = convertDeadlineToDate(data.deadline);

      const newOrderData = {
        clientId: user.id,
        clientName: user.name,
        academicLevel: data.academicLevel,
        paperType: data.paperType,
        subject: data.subject,
        topic: data.topic,
        pages: data.pages,
        words: data.pages * (data.spacing === 'double' ? 275 : 550),
        deadline: actualDeadline,
        citationStyle: data.citationStyle,
        spacing: data.spacing,
        sources: data.sources,
        instructions: data.instructions,
        fileUrls: uploadedFileUrls,
        status: 'pending-payment',
        paymentStatus: 'pending',
        amount: price,
        createdAt: serverTimestamp(),
        writerId: null,
      };

      console.log("Saving order to Firestore...");
      const ordersCollectionRef = collection(db, 'orders');
      const docRef = await addDoc(ordersCollectionRef, newOrderData);
      console.log("Order saved with ID:", docRef.id);

      toast.success(`Order created successfully!`);
      navigate(`/dashboard/orders/${docRef.id}`);

    } catch (error) {
      console.error("Error creating order: ", error);
      toast.error('Failed to create order. Please check the console for details.');
    } finally {
      console.log("Finalizing submission...");
      setIsSubmitting(false);
    }
  };

  const labelStyle = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";
  const errorStyle = "text-red-500 text-sm mt-1 flex items-center";
  const stepperButtonStyle = "w-10 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>Academic Level</label>
              <select
                {...register('academicLevel')}
                className="form-select dark:text-white dark:bg-gray-700 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {academicLevels.map(level => <option key={level} value={level}>{level}</option>)}
              </select>
            </div>
            <div>
              <label className={labelStyle}>Type of Paper</label>
              <select
                {...register('paperType')}
                className="form-select dark:text-white dark:bg-gray-700 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {paperTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelStyle}>Subject</label>
            <select
              {...register('subject')}
              className="form-select dark:text-white dark:bg-gray-700 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
            </select>
          </div>
          <div>
            <label className={labelStyle}>Topic</label>
            <input
              type="text"
              {...register('topic', { required: "Topic is required." })}
              className="form-input dark:text-white dark:bg-gray-700 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., The Impact of AI on Modern Society"
            />
            {errors.topic && <p className={errorStyle}><AlertCircle size={14} className="mr-1" />{errors.topic.message}</p>}
          </div>
          <div>
            <label className={labelStyle}>Paper Instructions</label>
            <textarea
              {...register('instructions')}
              rows={5}
              className="form-input dark:text-white dark:bg-gray-700 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Include all necessary details for your assignment..."
            />
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <label className={labelStyle}>Upload Files (Optional)</label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 transition-colors ${isDragOver ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600'}`}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
            >
              <div className="text-center">
                <Upload className="mx-auto h-10 w-10 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Drag & drop files or <label htmlFor="file-upload" className="text-primary-500 cursor-pointer hover:underline">browse</label>
                </p>
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
                <input
                  type="number"
                  {...register('pages', { required: true, min: 1, valueAsNumber: true })}
                  className="form-input text-center mx-2 dark:text-white dark:bg-gray-700 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button type="button" onClick={() => handlePagesChange(true)} className={stepperButtonStyle}><Plus size={16} /></button>
              </div>
            </div>
            <div>
              <label className={labelStyle}>Spacing</label>
              <select
                {...register('spacing')}
                className="form-select dark:text-white dark:bg-gray-700 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="double">Double</option>
                <option value="single">Single</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelStyle}>Deadline</label>
            <select
              {...register('deadline', { required: true })}
              className="form-select dark:text-white dark:bg-gray-700 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {deadlines.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className={labelStyle}>Citation Style</label>
            <select
              {...register('citationStyle')}
              className="form-select dark:text-white dark:bg-gray-700 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {citationStyles.map(style => <option key={style} value={style}>{style}</option>)}
            </select>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Price:</span>
              <p className="text-3xl font-bold text-primary-500">${price}</p>
            </div>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full btn-primary py-3 flex items-center justify-center text-lg"
          >
            {isSubmitting ? <><LoadingSpinner size="sm" className="mr-2" />Processing...</> : <><CreditCard size={20} className="mr-2" />Submit & Continue</>}
          </button>
        </div>
      </div>
    </div>
  );
}