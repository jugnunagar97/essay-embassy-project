// src/context/AuthContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseAuthUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, name: string) => Promise<any>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseAuthUser | null) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          let userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            // Create user doc for Google sign-in users if missing
            const newUserProfile: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || 'User',
              role: 'client',
              createdAt: new Date().toISOString(),
              avatar: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(firebaseUser.displayName || 'User')}&background=random&color=fff`
            };
            await setDoc(userDocRef, newUserProfile);
            userDocSnap = await getDoc(userDocRef);
          }

          if (userDocSnap.exists()) {
            const userDataFromFirestore = userDocSnap.data();
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: userDataFromFirestore.name || firebaseUser.displayName || 'User',
              role: userDataFromFirestore.role || 'client',
              createdAt: userDataFromFirestore.createdAt,
              avatar: userDataFromFirestore.avatar
            });
          } else {
            console.warn(`Firestore document for user ${firebaseUser.uid} not found. This is expected during the registration process.`);
          }
        } catch (error) {
          console.error("Error fetching user profile from Firestore:", error);
          toast.error("Failed to load user profile.");
          setUser(null);
          await signOut(auth);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      return userCredential;
    } catch (error: any) {
      console.error("Login error:", error);
      const message = error.code === 'auth/invalid-credential' 
        ? 'Invalid email or password.' 
        : error.message;
      toast.error(`Login failed: ${message}`);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      await updateProfile(firebaseUser, { displayName: name });

      const newUserProfile: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || email,
        name,
        role: 'client',
        createdAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), newUserProfile);
      
      setUser(newUserProfile);
      
      toast.success("Registration successful! Welcome.");
      
      return userCredential;
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(`Registration failed: ${error.message}`);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully.");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      console.error("Forgot password error:", error);
      toast.error(`Failed to send reset email: ${error.message}`);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}