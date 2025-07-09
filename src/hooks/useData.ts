import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'; // <-- FIXED: Removed 'doc' from import
import { db } from '../firebase'; 
import { Order, DashboardStats, User as AppUser } from '../types'; 

// --- useOrders Hook ---
interface UseOrdersResult {
  orders: Order[];
  isLoading: boolean;
  error: any | null; 
}

export function useOrders(): UseOrdersResult {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null); 

  useEffect(() => {
    const ordersCollectionRef = collection(db, 'orders');
    const q = query(ordersCollectionRef, orderBy('createdAt', 'desc')); 

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const fetchedOrders: Order[] = querySnapshot.docs.map(doc => ({
          ...doc.data() as Order, 
          id: doc.id,              
        }));
        setOrders(fetchedOrders);
        setIsLoading(false);
        setError(null); 
      }, 
      (err) => {
        console.error("Error fetching orders:", err);
        setError(err); 
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []); 

  return { orders, isLoading, error }; 
}

// --- useDashboardStats Hook ---
interface UseDashboardStatsResult {
  stats: DashboardStats;
  isLoading: boolean;
  error: any | null; 
}

export function useDashboardStats(): UseDashboardStatsResult {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    completedOrders: 0,
    pendingOrders: 0,
    monthlyGrowth: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    // This is a placeholder. For actual stats, you'd fetch from Firestore
    // or use Firebase Cloud Functions.
    // The 'doc' import was previously here for a commented-out section,
    // but since it's not used in the current active code, it was removed.
    
    // Using mock data for now to ensure no errors with current setup
    setTimeout(() => {
      setStats({
        totalUsers: 1250,
        totalOrders: 3420,
        totalRevenue: 125000,
        completedOrders: 3180,
        pendingOrders: 240, 
        monthlyGrowth: 12.5,
      });
      setIsLoading(false);
      setError(null);
    }, 1000); 

  }, []);

  return { stats, isLoading, error };
}

// --- useUsers Hook ---
interface UseUsersResult {
  users: AppUser[];
  isLoading: boolean;
  error: any | null;
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    const q = query(usersCollectionRef, orderBy('name')); 

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const fetchedUsers: AppUser[] = querySnapshot.docs.map(doc => ({
          ...doc.data() as AppUser, 
          id: doc.id,               
        }));
        setUsers(fetchedUsers);
        setIsLoading(false);
        setError(null); 
      }, 
      (err) => {
        console.error("Error fetching users:", err);
        setError(err); 
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { users, isLoading, error };
}
