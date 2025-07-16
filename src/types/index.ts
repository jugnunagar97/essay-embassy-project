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
    tags: string[]; // Stored as array in Firestore
    category: string;
    slug: string;
    published: boolean;
    publishedAt?: Timestamp; // Optional, set when published
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
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
    content?: string; // Rich text content for the full service page (from ReactQuill)
    seoTitle?: string; // SEO title for the service page
    seoDescription?: string; // SEO meta description for the service page
    faqs?: { question: string; answer: string; }[]; // Array of FAQ objects for the service page
    featuredImage?: string; // URL of the featured image for the service page
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

// Interface for User (AppUser alias in useData.ts) - FIXED: Added uid, email, role as required
export interface User {
    id: string; // Document ID, often same as uid
    uid: string; // User's Firebase Authentication UID
    email: string;
    role: 'admin' | 'client' | 'writer'; // Example roles, add 'writer' if applicable
    displayName?: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
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
}

// Interface for ServicePage (if distinct from SubService, otherwise use SubService)
// Based on your useServicePages hook, you have a 'servicePages' collection.
// If this is meant to be the same as SubService, you can remove this and use SubService directly.
// For now, defining it as a separate interface to match your hook.
export interface ServicePage {
    id: string;
    title: string; // Assuming 'title' is used in this collection
    content: string;
    order: number;
    // Add other fields specific to your 'servicePages' collection if they differ from SubService
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
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

export interface QASolutionFile {
  name: string; // Filename
  url: string; // Firebase Storage URL
  size: number; // Bytes
  type: string; // MIME type
}
