import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  X,
  MessageCircle as LiveChatIcon, // Used for Live Chat and Messages
  PlusCircle, // For New Order
  FileText, // For Manage Orders
  Users, // For Manage Users
  BookOpen, // For Manage Blog and Samples
  Star // For Testimonials (or Reviews)
} from 'lucide-react'; // Removed unused icons: MessageSquare, ClipboardList
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const clientMenuItems = [
    { icon: LayoutDashboard, label: 'My Orders', path: '/dashboard' },
    { icon: LiveChatIcon, label: 'Live Chat', path: '/dashboard/chat' },
    { icon: Settings, label: 'Edit Profile', path: '/dashboard/settings' },
  ];

  // === UPDATED ADMIN MENU ITEMS ===
  // This list now contains all the items you want in the sidebar
  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: PlusCircle, label: 'New Order', path: '/dashboard/new-order' }, // New Order for Admin
    { icon: FileText, label: 'Orders', path: '/dashboard/orders' }, // Manage Orders
    { icon: Users, label: 'Users', path: '/dashboard/users' }, // Manage Users
    { icon: LiveChatIcon, label: 'Messages', path: '/dashboard/messages' }, // Messages (Admin Chat)
    { icon: BookOpen, label: 'Blog', path: '/dashboard/blog' }, // Manage Blog
    { icon: Star, label: 'Reviews', path: '/dashboard/reviews' }, // Testimonials/Reviews
    { icon: Settings, label: 'Services', path: '/dashboard/services' }, // Manage Services
    { icon: BookOpen, label: 'Samples', path: '/dashboard/samples' }, // Manage Samples
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' }, // Admin Settings (General)
  ];

  const menuItems = user.role === 'admin' ? adminMenuItems : clientMenuItems;

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4">
              {user.role === 'admin' ? 'Admin Panel' : 'Client Portal'}
            </h3>
          </div>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
                    ${active
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                    }
                  `}
                >
                  <Icon 
                    size={20} 
                    className={`mr-3 transition-colors duration-200 ${
                      active 
                        ? 'text-primary-600 dark:text-primary-400' 
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-primary-500'
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                  
                  {/* Active indicator */}
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
