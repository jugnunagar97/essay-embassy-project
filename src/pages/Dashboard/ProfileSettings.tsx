// src/pages/Dashboard/ProfileSettings.tsx

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db, auth } from '../../firebase'; // FIXED: import 'auth' alongside 'db'
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';
import { User, KeyRound, AlertTriangle, Save } from 'lucide-react'; // FIXED: Removed unused 'Mail' icon
import LoadingSpinner from '../../components/Common/LoadingSpinner';

export default function ProfileSettings() {
  const { user, forgotPassword, isLoading: isAuthLoading } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (name === user.name) {
        toast('No changes to save.');
        return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Updating profile...');

    try {
      // FIXED: Changed from 'db.app.auth()' to the correct 'auth' object
      if (auth.currentUser) {
        // Update Firebase Auth profile (this changes user.displayName)
        await updateProfile(auth.currentUser, { displayName: name });
      }

      // Update Firestore document
      const userDocRef = doc(db, 'users', user.id);
      await updateDoc(userDocRef, { name });

      toast.success('Profile updated successfully! Changes will be fully visible on next login.', { id: toastId });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || 'Failed to update profile.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user) return;
    try {
      await forgotPassword(user.email);
    } catch (error) {
      // Error toast is already handled inside the forgotPassword function
      console.error("Failed to send password reset email from settings page.");
    }
  };

  if (isAuthLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account preferences and profile.</p>
      </div>

      {/* Profile Information Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleProfileUpdate}>
          <div className="p-6">
            <h2 className="text-xl font-bold flex items-center"><User className="mr-3 text-primary-500"/>Profile Information</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your personal details.</p>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" id="email" value={email} disabled
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 opacity-70 cursor-not-allowed" />
                <p className="text-xs text-gray-400 mt-1">Changing your email address requires support assistance.</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 rounded-b-xl flex justify-end">
            <button type="submit" disabled={isSubmitting || name === user.name}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold flex items-center justify-center disabled:opacity-50 hover:bg-primary-700 transition-colors">
              {isSubmitting ? <LoadingSpinner size="sm" className="mr-2" /> : <Save size={16} className="mr-2"/>}
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Security Settings Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-bold flex items-center"><KeyRound className="mr-3 text-primary-500"/>Security</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your password.</p>
            <div className="mt-4 flex justify-between items-center">
                <p className="font-medium">Password</p>
                <button onClick={handlePasswordReset} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Send Password Reset Email
                </button>
            </div>
          </div>
      </div>
      
      {/* Danger Zone Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-red-500/50 dark:border-red-500/30">
          <div className="p-6">
            <h2 className="text-xl font-bold flex items-center text-red-500"><AlertTriangle className="mr-3"/>Danger Zone</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Irreversible and destructive actions.</p>
            <div className="mt-4 flex justify-between items-center">
                <div>
                    <p className="font-bold">Delete This Account</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Once deleted, all data will be gone forever.</p>
                </div>
                <button 
                  onClick={() => toast.error('This action is disabled on the admin panel for security reasons.')}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors">
                    Delete Account
                </button>
            </div>
          </div>
      </div>

    </div>
  );
}