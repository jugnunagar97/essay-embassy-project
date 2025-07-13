// src/components/Layout/Header.tsx

import { useState } from 'react'; // FIXED: Removed unused 'React' import, kept useState
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ServicesDropdown from './ServicesDropdown';
import MobileServicesMenu from './MobileServicesMenu'; // Correctly import the external MobileServicesMenu component

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isAdminPage = location.pathname.startsWith('/dashboard');

  // State for controlling the mobile navigation menu
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      {/* Top Bar for Contact Info and Support */}
      <div className="bg-primary-700 text-white text-xs px-6 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span>📞 +1 (555) 123-4567</span>
          <span>✉️ support@essayembassy.com</span>
        </div>
        <span>24/7 Customer Support Available</span>
      </div>

      {/* Main Header Content */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Section: Logo and Admin Sidebar Toggle */}
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

        {/* Center Section: Main Navigation (Desktop ONLY) */}
        <nav className="hidden lg:flex items-center space-x-6">
          <ServicesDropdown /> {/* This is your dynamic services dropdown */}
          <Link to="/samples" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Samples</Link>
          <Link to="/reviews" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Reviews</Link>
          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">About</Link>
          <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Blog</Link>
          <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Contact</Link>
        </nav>

        {/* Right Section: Action Buttons and User Auth */}
        <div className="flex items-center space-x-4">
          <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 hidden sm:block">WhatsApp</a>
          <Link to="/order-now" className="btn-primary text-sm px-4 py-2">
            Order Now
          </Link>
          {user ? (
            <button
              onClick={logout}
              className="text-sm font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="text-sm font-semibold px-4 py-2 rounded-lg border border-primary-600 text-primary-600 bg-white hover:bg-primary-50 dark:bg-gray-900 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-900/10 transition-colors shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button (for non-admin pages) */}
          {!isAdminPage && (
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="lg:hidden text-gray-600 dark:text-gray-300 ml-4"
              aria-label="Toggle mobile menu"
            >
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {/* The MobileServicesMenu component is correctly imported and passed props now. */}
      {!isAdminPage && isMobileNavOpen && (
        <MobileServicesMenu onClose={() => setIsMobileNavOpen(false)} />
      )}
    </header>
  );
}
