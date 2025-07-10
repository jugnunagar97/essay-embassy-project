// src/types/index.ts

import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  createdAt: string;
  avatar?: string;
  phone?: string; 
}

export interface Order {
  id: string;
  orderNumber: number;
  clientId: string;
  clientName: string;
  academicLevel: string;
  paperType: string;
  subject: string;
  topic: string;
  pages: number;
  deadline: Timestamp;
  citationStyle: string;
  spacing: string;
  sources: number;
  instructions: string;
  fileUrls: string[];
  status: 'pending-payment' | 'in-progress' | 'revision' | 'editing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'completed';
  amount: number;
  createdAt: Timestamp;
  writerId?: string | null;
  files?: any[];
  completedFiles?: any[];
  updatedAt?: Timestamp;
}

export interface FileUpload {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  authorAvatar?: string; // ADDED
  readTime?: string;   // ADDED
  publishedAt: Timestamp | null;
  tags: string[];
  category: string;
  slug: string;
  published: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'stripe' | 'razorpay';
  transactionId?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  completedOrders: number;
  pendingOrders: number;
  monthlyGrowth: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  platform: 'google' | 'trustpilot' | 'sitejabber';
  avatar: string;
  date?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubService {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  link: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  content: string;
  orderId?: string; 
  location?: string;
  purchaseDate?: string;
  platform?: 'google' | 'trustpilot' | 'sitejabber' | 'website';
  platformVerified?: boolean;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  isPending: boolean;
  isFlagged: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
  moderatorNotes?: string;
  isAnonymous?: boolean;
}

export interface ReviewSubmission {
  name: string;
  rating: number;
  content: string;
  orderId?: string; 
  isAnonymous?: boolean;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  pendingReviews: number;
  flaggedReviews: number;
  verifiedPurchases: number;
  platformReviews: {
    google: number;
    trustpilot: number;
    sitejabber: number;
    website: number;
  };
}

export interface Sample {
  id: string;
  title: string;
  subject: string;
  academicLevel: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  createdAt: Timestamp;
}
// Add this to the bottom of src/types/index.ts

export interface ServicePage {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: 'published' | 'draft';
  order: number;
  // SEO
  seoTitle: string;
  metaDescription: string;
  // Page Content
  heroHeading: string;
  mainContent: string; // This will hold the rich text content
  faqs: { question: string; answer: string; }[];
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
}