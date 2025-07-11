// src/types/index.ts

// Import Timestamp if you are using it for Firestore dates
import { Timestamp } from "firebase/firestore";

// Interface for Blog Post (from previous discussions)
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

// Interface for Service Category (UPDATED)
export interface ServiceCategory {
    id: string;
    name: string;
    description?: string; // Added: Optional description for the category
    isActive: boolean; // Added: To control category visibility/status
    order: number; // Added: For custom ordering of categories
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

// Interface for Sub Service (UPDATED - This is the main one causing errors)
export interface SubService {
    id: string;
    name: string;
    description?: string; // Added: Short description for the service
    link: string; // Used as URL slug for the service page (e.g., /services/my-service)
    isActive: boolean; // Added: To control service visibility/status
    order: number; // Added: For custom ordering of services within a category
    categoryId: string; // Foreign key: Links service to its parent category
    content?: string; // Added: Rich text content for the full service page (from ReactQuill)
    seoTitle?: string; // Added: SEO title for the service page
    seoDescription?: string; // Added: SEO meta description for the service page
    faqs?: { question: string; answer: string; }[]; // Added: Array of FAQ objects for the service page
    featuredImage?: string; // Added: URL of the featured image for the service page
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

// You can add other interfaces here if your project uses them.
// For example, if you have a User type:
export interface User {
    uid: string;
    email: string;
    role: 'admin' | 'client'; // Example roles
    displayName?: string;
    // ... other user properties
}

// Example Order type (if you have one)
export interface Order {
    id: string;
    userId: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    serviceName: string;
    // ... other order details
    createdAt: Timestamp;
    updatedAt?: Timestamp;
}
