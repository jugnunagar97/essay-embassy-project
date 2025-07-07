// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react'; // Ensure createContext and useContext are imported
import { User } from '../types';
import { auth, db } from '../firebase'; // Import auth and db from firebase.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User as FirebaseAuthUser // Alias User from firebase/auth to avoid naming conflict
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast'; // Import toast for notifications

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

// Declare AuthContext at the top level, outside of any components
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This listener observes changes in Firebase Authentication state (login, logout)
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseAuthUser | null) => {
      if (firebaseUser) {
        // User is signed in. Now, fetch their custom profile from Firestore.
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // Found user profile in Firestore
            const userDataFromFirestore = userDocSnap.data() as User; // Cast to your User interface
            setUser({
              id: firebaseUser.uid,
              // Prioritize email from firebaseUser, then from Firestore, then empty string
              email: firebaseUser.email || userDataFromFirestore.email || '',
              name: userDataFromFirestore.name,
              role: userDataFromFirestore.role,
              createdAt: userDataFromFirestore.createdAt,
              avatar: userDataFromFirestore.avatar
            });
          } else {
            // Scenario: User exists in Firebase Auth but not in Firestore (e.g., if a user was created directly in console
            // or an old account without a Firestore profile). Create a basic profile.
            console.warn("User profile not found in Firestore for UID:", firebaseUser.uid, "Creating basic profile.");
            const basicUser: User = {
                id: firebaseUser.uid,
                email: firebaseUser.email || '',
                name: firebaseUser.displayName || 'New User', // Use Firebase displayName or default
                role: 'client', // Default role
                createdAt: new Date().toISOString(),
                avatar: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(firebaseUser.displayName || firebaseUser.email || '')}&background=random&color=fff`
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), basicUser); // Create the Firestore document
            setUser(basicUser); // Set the user state with the basic profile
          }
        } catch (error) {
          console.error("Error fetching user profile from Firestore:", error);
          toast.error("Failed to load user profile. Please try again.");
          setUser(null); // Clear user if fetching profile fails
          signOut(auth); // Sign out if profile is corrupted/unreachable
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setIsLoading(false); // Authentication check is complete
    });

    // Cleanup subscription on unmount to prevent memory leaks
    return () => unsubscribe();
  }, []); // Empty dependency array: runs only once on component mount

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      // The onAuthStateChanged listener will handle setting the user state after successful login
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(`Login failed: ${error.message}`);
      throw error; // Re-throw to allow component (e.g., Login.tsx) to catch and display specific error
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // 1. Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // 2. Create a corresponding user document in Firestore with custom fields
      const newUserProfile: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || email, // Use email from Firebase Auth, fallback to input
        name,
        role: 'client', // Default role for newly registered users
        createdAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff` // Generate a simple avatar
      };
      await setDoc(doc(db, 'users', firebaseUser.uid), newUserProfile);
      
      toast.success("Registration successful! Welcome to Essay Embassy.");
      // The onAuthStateChanged listener will handle setting the user state after successful registration
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(`Registration failed: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      toast.success("Logged out successfully.");
      // The onAuthStateChanged listener will handle clearing the user state
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(`Logout failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      console.error("Forgot password error:", error);
      toast.error(`Failed to send reset email: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      forgotPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to consume the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}