import { useState, useEffect, useCallback } from 'react'; 
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import {
  User as UserIcon,
  Mail,
  Key,
  Phone, // Used for phone field
  Save,
  Trash2,
  ArrowLeft,
  Eye, // Used for view orders
  ClipboardList // Used for user's orders icon
} from 'lucide-react'; // <-- FIXED: Removed AlertCircle
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';
import StatusBadge from '../../components/Common/StatusBadge'; 

// Firebase Imports
import { db, auth } from '../../firebase';
import { doc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth'; 

// Types
import { User, Order } from '../../types';
import { format, isValid } from 'date-fns'; 

// Helper function to safely format dates
const formatDate = (timestamp: any, formatString: string = 'MMM dd,yyyy HH:mm'): string => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    const date = timestamp.toDate();
    if (isValid(date)) {
      return format(date, formatString);
    }
  }
  const date = new Date(timestamp);
  if (isValid(date)) {
    return format(date, formatString);
  }
  return 'N/A';
};

// Main User Detail Component
export default function UserDetail() {
  const { userId } = useParams<{ userId: string }>(); 
  const navigate = useNavigate();
  const { user: currentUser, isLoading: authLoading } = useAuth(); 
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPasswordResetting, setIsPasswordResetting] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); 
  const [role, setRole] = useState<'admin' | 'client'>('client');

  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);


  // Fetch user data
  useEffect(() => {
    if (!userId) {
      setError("User ID is missing.");
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as User;
          setUser(userData);
          setName(userData.name);
          setEmail(userData.email);
          setPhone(userData.phone || ''); 
          setRole(userData.role);
        } else {
          setError("User not found.");
        }
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to fetch user data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // Fetch user's orders
  useEffect(() => {
    if (!userId) return;

    const fetchUserOrders = async () => {
      try {
        const ordersCollectionRef = collection(db, 'orders');
        const q = query(ordersCollectionRef, where('clientId', '==', userId));
        const querySnapshot = await getDocs(q);
        const fetchedOrders: Order[] = querySnapshot.docs.map(doc => ({
          ...doc.data() as Order, 
          id: doc.id,              
        }));
        setUserOrders(fetchedOrders);
      } catch (err: any) {
        console.error("Error fetching user orders:", err);
        setOrdersError(err.message || "Failed to fetch user orders.");
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchUserOrders();
  }, [userId]);


  // Handle saving user details
  const handleSave = useCallback(async () => {
    if (!user || !userId) return;
    setIsSaving(true);
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        name: name,
        email: email,
        phone: phone, 
        role: role,
      });
      toast.success("User details updated successfully!");
    } catch (err: any) {
      console.error("Error saving user details:", err);
      toast.error(err.message || "Failed to save user details.");
    } finally {
      setIsSaving(false);
    }
  }, [user, userId, name, email, phone, role]);

  // Handle password reset (send reset email)
  const handlePasswordResetEmail = useCallback(async () => {
    if (!user || !email) {
      toast.error("User email is required to send reset email.");
      return;
    }
    setIsPasswordResetting(true);
    try {
      // Firebase Auth password reset email
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent to user's email!");
    } catch (err: any) {
      console.error("Error sending password reset email:", err);
      toast.error(err.message || "Failed to send password reset email.");
    } finally {
      setIsPasswordResetting(false);
    }
  }, [user, email]);

  // Handle deleting user
  const handleDeleteUser = useCallback(async () => {
    if (!user || !userId || !window.confirm(`Are you sure you want to delete user ${user.name} (${user.email})? This action cannot be undone.`)) {
      return;
    }
    setIsDeleting(true);
    try {
      // Delete user document from Firestore
      const userDocRef = doc(db, 'users', userId);
      await deleteDoc(userDocRef);

      // Optionally, delete Firebase Auth user. This requires Admin SDK on a backend/cloud function.
      // You cannot directly delete a Firebase Auth user from client-side code for security reasons.
      // If you need to delete the Auth user, you'd trigger a Cloud Function.
      toast.success("User deleted successfully from Firestore!");
      navigate('/dashboard/users'); // Redirect back to user list
    } catch (err: any) {
      console.error("Error deleting user:", err);
      toast.error(err.message || "Failed to delete user.");
    } finally {
      setIsDeleting(false);
    }
  }, [user, userId, navigate]);


  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  }

  // Check if user object is loaded before rendering
  if (!user) { 
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        User data not found or inaccessible.
      </div>
    );
  }

  // Check if current user is Super Admin for role/delete options
  const isSuperAdmin = currentUser?.role === 'admin'; 

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 lg:p-8">
      <div className="max-w-full mx-auto"> 
        <button
          onClick={() => navigate('/dashboard/users')}
          className="mb-6 flex items-center text-primary-600 hover:text-primary-800 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Users
        </button>

        <h1 className="text-3xl font-bold mb-6">User <span className="text-primary-500">Details</span></h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <UserIcon size={24} className="mr-3 text-primary-500" /> User Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"> {/* FIXED: Added flex items-center for icon alignment */}
                  <Phone size={16} className="mr-2 text-gray-500" /> {/* FIXED: Added Phone icon here */}
                  Phone (Optional)
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., +1234567890"
                />
              </div>

              {/* Role Assignment (Super Admin Only) */}
              {isSuperAdmin && (
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">User Role</label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'admin' | 'client')}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="client">Client</option>
                    <option value="admin">Admin</option>
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    As Super Admin, you can assign roles. Fine-grained permissions will be added here later.
                  </p>
                </div>
              )}

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center transition-colors"
              >
                {isSaving ? <LoadingSpinner size="sm" className="mr-2" /> : <Save size={20} className="mr-2" />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Actions & Password Reset */}
          <div className="lg:col-span-1 space-y-6">
            {/* Password Reset */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Key size={24} className="mr-3 text-yellow-500" /> Password Actions
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Send a password reset email to the user's registered email address.
              </p>
              <button
                onClick={handlePasswordResetEmail}
                disabled={isPasswordResetting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center transition-colors"
              >
                {isPasswordResetting ? <LoadingSpinner size="sm" className="mr-2" /> : <Mail size={20} className="mr-2" />}
                {isPasswordResetting ? 'Sending...' : 'Send Password Reset Email'}
              </button>
            </div>

            {/* Delete User */}
            {isSuperAdmin && ( // Only Super Admin can delete users
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl shadow-md p-6 border border-red-200 dark:border-red-800">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-red-700 dark:text-red-400">
                  <Trash2 size={24} className="mr-3" /> Danger Zone
                </h2>
                <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                  Permanently delete this user and all associated data. This action cannot be undone.
                </p>
                <button
                  onClick={handleDeleteUser}
                  disabled={isDeleting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center transition-colors"
                >
                  {isDeleting ? <LoadingSpinner size="sm" className="mr-2" /> : <Trash2 size={20} className="mr-2" />}
                  {isDeleting ? 'Deleting...' : 'Delete User'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* User's Order History */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <ClipboardList size={24} className="mr-3 text-primary-500" /> User's Order History
          </h2>
          {ordersLoading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner size="md" />
            </div>
          ) : ordersError ? (
            <div className="text-red-600 text-center py-8">
              Error loading orders: {ordersError}
            </div>
          ) : userOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Topic</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deadline</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">View</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {userOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        <Link to={`/dashboard/orders/${order.id}`} className="text-primary-600 hover:underline">
                          #{order.orderNumber}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{order.topic}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${order.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {/* Assuming deadline is a Timestamp and formatDate can handle it */}
                        {order.deadline && typeof order.deadline.toDate === 'function' ? formatDate(order.deadline.toDate()) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/dashboard/orders/${order.id}`} className="text-primary-600 hover:text-primary-900">
                          <Eye size={20} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No orders found for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
}
