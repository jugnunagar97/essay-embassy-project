import { useState, useEffect } from 'react';
import { Order, BlogPost, DashboardStats } from '../types';
import { useAuth } from '../context/AuthContext';

// === FIREBASE IMPORTS ===
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

// ==================================================================================
// === REAL-TIME ORDERS HOOK ===
// ==================================================================================
export function useOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    const ordersCollectionRef = collection(db, 'orders');
    const q = query(
      ordersCollectionRef, 
      where('clientId', '==', user.id),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userOrders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Order));
      setOrders(userOrders);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching user orders:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { orders, isLoading };
}


// ==================================================================================
// === MOCK DATA HOOKS (Corrected) ===
// ==================================================================================
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Write an Effective Essay Introduction',
    content: 'Writing a compelling essay introduction is crucial for engaging your readers...',
    excerpt: 'Learn the key elements of a strong essay introduction that captures attention.',
    featuredImage: 'https://images.pexels.com/photos/159844/pencil-office-design-creative-159844.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Essay Embassy Team',
    publishedAt: '2024-01-20T10:00:00Z',
    tags: ['Writing Tips', 'Essays', 'Academic'],
    category: 'Writing Guide',
    slug: 'effective-essay-introduction',
    published: true
  }
];

const mockStats: DashboardStats = {
  totalUsers: 1250,
  totalOrders: 3420,
  totalRevenue: 125000,
  completedOrders: 3180,
  pendingOrders: 240,
  monthlyGrowth: 12.5
};

export function useBlogPosts() {
  // This hook now simply returns the mock data without unused state setters.
  const posts = mockBlogPosts;
  const isLoading = false;
  return { posts, isLoading };
}

export function useDashboardStats() {
  // This hook now simply returns the mock data without unused state setters.
  const stats = mockStats;
  const isLoading = false;
  return { stats, isLoading };
}