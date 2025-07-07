import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Lock, 
  Save, 
  Eye, 
  EyeOff,
  Edit
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

// === FIREBASE IMPORTS ===
import { getAuth, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

// ==================================================================================
// === TYPE DEFINITIONS ===
// ==================================================================================
interface ProfileFormData {
  name: string;
  email: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ==================================================================================
// === MAIN COMPONENT ===
// ==================================================================================
export default function ProfileSettings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-profile'); // 'my-profile' or 'edit-profile'
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors }
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    }
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors }
  } = useForm<PasswordFormData>();

  const newPassword = watch('newPassword');

  const onProfileSubmit = async (data: ProfileFormData) => {
    setIsUpdatingProfile(true);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      toast.error("You must be logged in to update your profile.");
      setIsUpdatingProfile(false);
      return;
    }

    try {
      await updateProfile(currentUser, { displayName: data.name });
      toast.success('Profile updated successfully! Refresh the page to see changes.');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      console.error("Profile update error:", error);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsUpdatingPassword(true);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.email) {
      toast.error("User not found. Please log in again.");
      setIsUpdatingPassword(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(currentUser.email, data.currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, data.newPassword);
      
      toast.success('Password updated successfully!');
      resetPasswordForm();
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect current password.');
      } else {
        toast.error('Failed to update password. Please try again.');
      }
      console.error("Password update error:", error);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const labelStyle = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";
  const inputStyle = "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors";
  const errorStyle = "text-red-500 text-sm mt-1";
  const infoRowStyle = "flex justify-between py-3 border-b border-gray-200 dark:border-gray-700";
  const infoLabelStyle = "text-gray-600 dark:text-gray-400";
  const infoValueStyle = "font-medium text-gray-900 dark:text-white";

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Tab Navigation */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2 bg-gray-100 dark:bg-gray-900/50 p-1 rounded-lg">
            <button onClick={() => setActiveTab('my-profile')} className={`flex-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'my-profile' ? 'bg-primary-500 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              My Profile
            </button>
            <button onClick={() => setActiveTab('edit-profile')} className={`flex-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'edit-profile' ? 'bg-primary-500 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'my-profile' && (
            <div className="space-y-4 animate-fade-in">
              <div className={infoRowStyle}><span className={infoLabelStyle}>My ID:</span> <span className={infoValueStyle}>#{user?.id.substring(0, 8)}...</span></div>
              <div className={infoRowStyle}><span className={infoLabelStyle}>Full Name:</span> <span className={infoValueStyle}>{user?.name}</span></div>
              <div className={infoRowStyle}><span className={infoLabelStyle}>Email:</span> <span className={infoValueStyle}>{user?.email}</span></div>
              <div className={infoRowStyle}><span className={infoLabelStyle}>Password:</span> <span className={infoValueStyle}>**********</span></div>
              <div className="pt-4 text-center">
                <button onClick={() => setActiveTab('edit-profile')} className="btn-primary">
                  <Edit size={16} className="mr-2" />
                  Edit My Profile
                </button>
              </div>
            </div>
          )}

          {activeTab === 'edit-profile' && (
            <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
              {/* Profile Information Form */}
              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <User className="mr-2 text-primary-500" size={20} />
                  Update Information
                </h3>
                <div>
                  <label className={labelStyle}>Full Name</label>
                  <input type="text" {...registerProfile('name', { required: 'Name is required' })} className={inputStyle} />
                  {profileErrors.name && <p className={errorStyle}>{profileErrors.name.message}</p>}
                </div>
                <div>
                  <label className={labelStyle}>Email Address (Cannot be changed)</label>
                  <input type="email" {...registerProfile('email')} className={`${inputStyle} bg-gray-100 dark:bg-gray-900 cursor-not-allowed`} readOnly />
                </div>
                <button type="submit" disabled={isUpdatingProfile} className="w-full btn-primary py-3 flex items-center justify-center">
                  {isUpdatingProfile ? <><LoadingSpinner size="sm" className="mr-2" />Updating...</> : <><Save size={20} className="mr-2" />Save Changes</>}
                </button>
              </form>

              {/* Password Security Form */}
              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Lock className="mr-2 text-primary-500" size={20} />
                  Update Password
                </h3>
                <div>
                  <label className={labelStyle}>Current Password</label>
                  <div className="relative">
                    <input type={showCurrentPassword ? 'text' : 'password'} {...registerPassword('currentPassword', { required: 'Current password is required' })} className={inputStyle} />
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                  </div>
                  {passwordErrors.currentPassword && <p className={errorStyle}>{passwordErrors.currentPassword.message}</p>}
                </div>
                <div>
                  <label className={labelStyle}>New Password</label>
                  <div className="relative">
                    <input type={showNewPassword ? 'text' : 'password'} {...registerPassword('newPassword', { required: 'New password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })} className={inputStyle} />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                  </div>
                  {passwordErrors.newPassword && <p className={errorStyle}>{passwordErrors.newPassword.message}</p>}
                </div>
                <div>
                  <label className={labelStyle}>Confirm New Password</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? 'text' : 'password'} {...registerPassword('confirmPassword', { required: 'Please confirm your new password', validate: value => value === newPassword || 'Passwords do not match' })} className={inputStyle} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                  </div>
                  {passwordErrors.confirmPassword && <p className={errorStyle}>{passwordErrors.confirmPassword.message}</p>}
                </div>
                <button type="submit" disabled={isUpdatingPassword} className="w-full btn-primary py-3 flex items-center justify-center">
                  {isUpdatingPassword ? <><LoadingSpinner size="sm" className="mr-2" />Updating...</> : <><Lock size={20} className="mr-2" />Update Password</>}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}