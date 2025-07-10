// src/hooks/useData.ts

import { useState, useEffect, useMemo } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  Order, DashboardStats, User as AppUser, Review, ReviewStats, ServiceCategory, SubService, Sample, BlogPost, ServicePage 
} from '../types';

// --- useOrders Hook ---
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setOrders(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Order)));
      setIsLoading(false);
      setError(null);
    }, (err) => {
      console.error("Error fetching orders:", err);
      setError(err);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { orders, isLoading, error };
}

// --- useDashboardStats Hook ---
export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({ totalUsers: 0, totalOrders: 0, totalRevenue: 0, completedOrders: 0, pendingOrders: 0, monthlyGrowth: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setStats({ totalUsers: 1250, totalOrders: 3420, totalRevenue: 125000, completedOrders: 3180, pendingOrders: 240, monthlyGrowth: 12.5 });
      setIsLoading(false);
      setError(null); 
    }, 1000);
  }, []);

  return { stats, isLoading, error };
}

// --- useUsers Hook ---
export function useUsers() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUsers(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as AppUser)));
      setIsLoading(false);
      setError(null);
    }, (err) => {
      console.error("Error fetching users:", err);
      setError(err);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { users, isLoading, error };
}

// --- useReviews Hook ---
export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setReviews(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Review)));
      setIsLoading(false);
      setError(null);
    }, (err) => {
      console.error("Error fetching reviews:", err);
      setError(err);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { reviews, isLoading, error };
}

// --- useReviewStats Hook ---
export function useReviewStats(reviews: Review[]) {
    const stats = useMemo<ReviewStats>(() => {
        const totalReviews = reviews.length;
        const pendingReviews = reviews.filter(r => r.isPending && !r.isApproved).length;
        const flaggedReviews = reviews.filter(r => r.isFlagged).length;
        const verifiedPurchases = reviews.filter(r => r.isVerifiedPurchase).length;
        const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
        const averageRating = totalReviews > 0 ? totalRating / reviews.length : 0;
        const ratingDistribution = reviews.reduce((acc, r) => {
            const ratingKey = Math.round(r.rating) as keyof ReviewStats['ratingDistribution'];
            acc[ratingKey] = (acc[ratingKey] || 0) + 1;
            return acc;
        }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
        const platformReviews = reviews.reduce((acc, r) => {
            const platformKey = r.platform || 'website';
            acc[platformKey] = (acc[platformKey] || 0) + 1;
            return acc;
        }, { google: 0, trustpilot: 0, sitejabber: 0, website: 0 });

        return { totalReviews, averageRating, pendingReviews, flaggedReviews, verifiedPurchases, ratingDistribution, platformReviews };
    }, [reviews]);

    return { stats, isLoading: !reviews.length };
}


// --- useServiceCategories Hook ---
export function useServiceCategories() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'serviceCategories'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedCategories = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as ServiceCategory));
      setCategories(fetchedCategories);
      setIsLoading(false);
      setError(null);
    }, (err) => {
      console.error("Error fetching service categories:", err);
      setError(err);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { categories, isLoading, error };
}


// --- useSubServices Hook ---
export function useSubServices() {
  const [services, setServices] = useState<SubService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'subServices'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedServices = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as SubService));
      setServices(fetchedServices);
      setIsLoading(false);
      setError(null);
    }, (err) => {
      console.error("Error fetching sub-services:", err);
      setError(err);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { services, isLoading, error };
}

// --- useSamples Hook ---
export function useSamples() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'samples'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedSamples = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Sample));
      setSamples(fetchedSamples);
      setIsLoading(false);
      setError(null);
    }, (err) => {
      console.error("Error fetching samples:", err);
      setError(err);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { samples, isLoading, error };
}

// --- useBlogs Hook ---
export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedBlogs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as BlogPost));
      setBlogs(fetchedBlogs);
      setIsLoading(false);
      setError(null);
    }, (err) => {
      console.error("Error fetching blogs:", err);
      setError(err);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { blogs, isLoading, error };
}

// --- useServicePages Hook ---
export function useServicePages() {
  const [pages, setPages] = useState<ServicePage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'servicePages'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedPages = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as ServicePage));
      setPages(fetchedPages);
      setIsLoading(false);
      setError(null);
    }, (err) => {
      console.error("Error fetching service pages:", err);
      setError(err);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { pages, isLoading, error };
}