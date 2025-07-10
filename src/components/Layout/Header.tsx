// src/components/Layout/Header.tsx

import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ServicesDropdown from './ServicesDropdown';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const location = useLocation();
  // FIXED: Destructure the logout function from the auth context
  const { user, logout } = useAuth();
  
  const isAdminPage = location.pathname.startsWith('/dashboard');

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="bg-primary-700 text-white text-xs px-6 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span>📞 +1 (555) 123-4567</span>
          <span>✉️ support@essayembassy.com</span>
        </div>
        <span>24/7 Customer Support Available</span>
      </div>

      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {isAdminPage && (
            <button
              onClick={onToggleSidebar}
              className="text-gray-600 dark:text-gray-300 mr-4 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Essay Embassy
            </span>
          </Link>
        </div>

        {/* FIXED: Main navigation is now always visible, the condition has been removed. */}
        <nav className="hidden lg:flex items-center space-x-6">
          <ServicesDropdown />
          <Link to="/samples" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Samples</Link>
          <Link to="/reviews" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Reviews</Link>
          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">About</Link>
          <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Blog</Link>
          <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Contact</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 hidden sm:block">WhatsApp</a>
          <Link to="/order-now" className="btn-primary text-sm px-4 py-2">
            Order Now
          </Link>
          {user ? (
             // FIXED: Replaced profile icon with a dedicated "Sign Out" button
             <button
                onClick={logout}
                className="text-sm font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
             >
                Sign Out
             </button>
          ) : (
            <Link to="/login" className="text-sm font-semibold text-gray-600 dark:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}