// src/types/index.ts

// Import Timestamp if you are using it for Firestore dates
import { Timestamp } from "firebase/firestore";

// Interface for Blog Post
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    featuredImage: string; // URL of the featured image
    author: string;
    authorId?: string;
    authorEmail?: string;
    tags: string[]; // Stored as array in Firestore
    category: string;
    slug: string;
    published: boolean;
    publishedAt?: Timestamp; // Optional, set when published
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export type ContentBlockType =
  | 'HERO'
  | 'WRITERS'
  | 'WRITERS_CAROUSEL'
  | 'WHY_CHOOSE_US'
  | 'FEATURES_GRID'
  | 'PRICING'
  | 'PRICING_TABLE'
  | 'FAQ'
  | 'STATS'
  | 'STATS_ROW'
  | 'TESTIMONIALS'
  | 'STEPS'
  | 'SAMPLES'
  | 'TEXT';

export interface ContentBlock<T = any> {
  id: string;
  type: ContentBlockType;
  data: T;
}

// Interface for Service Category
export interface ServiceCategory {
    id: string;
    name: string;
    description?: string; // Optional description for the category
    isActive: boolean; // To control category visibility/status
    order: number; // For custom ordering of categories
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

// Interface for Sub Service (Your Dynamic Service Page Data)
export interface SubService {
    id: string;
    name: string;
    description?: string; // Short description for the service
    link: string; // Used as URL slug for the service page (e.g., /services/my-service)
    isActive: boolean; // To control service visibility/status
    order: number; // For custom ordering of services within a category
    categoryId: string; // Foreign key: Links service to its parent category
    content?: string; // Legacy rich text content (kept for backwards compatibility)
    contentBlocks?: ContentBlock[]; // Block-based content definition
    seoTitle?: string; // SEO title for the service page
    seoDescription?: string; // SEO meta description for the service page
    faqs?: { question: string; answer: string; }[]; // Array of FAQ objects for the service page
    featuredImage?: string; // URL of the featured image for the service page
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export type UserRole = 'admin' | 'editor' | 'client' | 'writer';

// Interface for User (AppUser alias in useData.ts) - aligned with AuthContext shape
export interface User {
    id: string; // Firestore document ID (usually same as uid)
    uid: string; // Firebase Authentication UID
    email: string;
    role: UserRole;
    name?: string;
    displayName?: string;
    avatar?: string;
    createdAt?: Timestamp | string;
    updatedAt?: Timestamp | string;
    // Add any other user properties stored in Firestore
}

// Interface for Order
export interface Order {
    id: string;
    orderNumber: number;
    topic: string;
    clientName: string;
    userId: string;
    status: 'pending-payment' | 'in-progress' | 'completed' | 'cancelled' | 'editing' | 'revision';
    amount: number;
    deadline: Timestamp;
    paperType: string;
    citationStyle: string;
    writerId?: string;
    words?: number;
    instructions?: string;
    paymentStatus: 'pending' | 'completed';
    createdAt: Timestamp;
    updatedAt?: Timestamp;
    // Add any other fields you use in your UI
}

// Interface for Review - FIXED: Added missing properties based on useReviewStats
export interface Review {
    id: string;
    userId: string;
    userName: string;
    rating: number; // 1-5
    comment: string;
    isApproved: boolean;
    isPending: boolean;
    isFlagged?: boolean; // Optional, for flagging reviews
    isVerifiedPurchase?: boolean; // Optional, for verified purchases
    platform?: 'google' | 'trustpilot' | 'sitejabber' | 'website'; // Optional, where review came from
    createdAt: Timestamp;
    updatedAt?: Timestamp;
    helpfulCount?: number; // Number of helpful hits (admin editable)
    publishDate?: Timestamp | Date; // Date when review is published (admin editable)
    assignedEditorId?: string;
}

// Interface for Review Stats - FIXED: Exported
export interface ReviewStats {
    totalReviews: number;
    averageRating: number;
    pendingReviews: number;
    flaggedReviews: number;
    verifiedPurchases: number;
    ratingDistribution: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
    platformReviews: {
        google: number;
        trustpilot: number;
        sitejabber: number;
        website: number;
        [key: string]: number; // Allow for other platforms dynamically
    };
}

// Interface for Dashboard Stats - FIXED: Exported
export interface DashboardStats {
    totalUsers: number;
    totalOrders: number;
    totalRevenue: number;
    completedOrders: number;
    pendingOrders: number;
    monthlyGrowth: number;
}

// Interface for Sample - FIXED: Exported
export interface Sample {
    id: string;
    title: string;
    description: string;
    fileUrl: string; // URL to the sample document in storage
    category: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    // Added fields for SampleManager compatibility
    subject?: string;
    academicLevel?: string;
    fileSize?: number;
    documentType?: string;
    citationStyle?: string;
    pageCount?: number;
    publicationDate?: string;
    fileName?: string;
    fileType?: string;
}



// Q&A Library Types

export interface Subject {
  id: string; // Firestore doc ID
  name: string;
}

export interface PaperType {
  id: string; // Firestore doc ID
  name: string;
}

export interface QASolution {
  id: string; // Firestore doc ID
  questionTitle: string;
  questionText: string;
  answerText: string; // Rich text (HTML or similar)
  subjectId: string;
  subjectName: string; // For denormalized display
  paperTypeId: string;
  paperTypeName: string; // For denormalized display
  priceUSD: number;
  files: QASolutionFile[];
  status: 'published' | 'draft';
  createdAt: number; // Timestamp
  updatedAt: number; // Timestamp
}

export interface QaAttachment {
  name: string;
  url: string;
  type: 'image' | 'pdf';
}

export interface QASolutionFile {
  name: string; // Filename
  url: string; // Firebase Storage URL
  size: number; // Bytes
  type: string; // MIME type
}

export interface QAPurchase {
  userId: string;
  qaId: string;
  purchasedAt: string; // ISO string
}
