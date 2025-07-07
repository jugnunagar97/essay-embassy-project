// src/types/index.ts

// Add this import at the top of the file
import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  createdAt: string;
  avatar?: string;
}

// === THIS IS THE CORRECTED ORDER INTERFACE ===
export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  academicLevel: string;
  paperType: string;
  subject: string;
  topic: string;
  pages: number;
  words: number;
  deadline: Timestamp; // Corrected from string
  citationStyle: string; // This field was missing/mismatched
  spacing: string;
  sources: number;
  instructions: string;
  fileUrls: string[];
  status: 'pending-payment' | 'in-progress' | 'revision' | 'editing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'completed';
  amount: number;
  createdAt: Timestamp; // Corrected from string
  writerId: string | null; // Corrected from 'writer?: string'
  // Optional fields
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

// Rest of the interfaces (BlogPost, Payment, etc.) remain unchanged
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  publishedAt: string;
  tags: string[];
  category: string;
  slug: string;
  published: boolean;
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
  description?: string;
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
  description?: string;
  link?: string;
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
  orderId: string;
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