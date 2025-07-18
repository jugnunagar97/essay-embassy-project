// src/components/Layout/Header.tsx

import { useState } from 'react'; // FIXED: Removed unused 'React' import, kept useState
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
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
  // State for profile dropdown
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Only hide profile dropdown if logged in and on the main dashboard page ("/dashboard")
  const isMainDashboard = location.pathname === '/dashboard';
  const showProfileDropdown = user && !isMainDashboard;

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
      <div className="flex items-center justify-between px-6 py-2">
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
          {/* Brand name as text replaced with logo */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <img src="/images/logo.png" alt="Essay Embassy Logo" className="h-16 max-h-16 w-auto" />
            </Link>
          </div>
        </div>

        {/* Center Section: Main Navigation (Desktop ONLY) */}
        <nav className="hidden lg:flex items-center space-x-6">
          <ServicesDropdown /> {/* This is your dynamic services dropdown */}
          <Link to="/samples" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Samples</Link>
          <Link to="/reviews" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Reviews</Link>
          <Link to="/qa-library" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 font-semibold">Q&amp;A Library</Link>
          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">About</Link>
          <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Blog</Link>
          <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Contact</Link>
        </nav>

        {/* Right Section: Action Buttons and User Auth */}
        <div className="flex items-center gap-4">
          <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 hidden sm:block">WhatsApp</a>
          <Link to="/order-now" className="btn-primary text-sm px-4 py-2">
            Order Now
          </Link>
          {showProfileDropdown ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen((open) => !open)}
                className="flex items-center px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-primary-700 dark:text-primary-300 font-bold text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500 text-white mr-2 uppercase">
                  {(user.displayName?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase()}
                </span>
                <ChevronDown size={18} />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg text-sm font-medium"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : user ? (
            isMainDashboard ? null : (
              <button
                onClick={logout}
                className="text-sm font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            )
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
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="lg:hidden text-gray-600 dark:text-gray-300 ml-4"
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {/* The MobileServicesMenu component is correctly imported and passed props now. */}
      {/* TODO: Add Q&A Library link to MobileServicesMenu if not present */}
      {!isAdminPage && isMobileNavOpen && (
        <MobileServicesMenu onClose={() => setIsMobileNavOpen(false)} />
      )}
    </header>
  );
}
