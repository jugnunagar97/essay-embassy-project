// src/components/Layout/Header.tsx

import { useState } from 'react'; // FIXED: Removed unused 'React' import, kept useState
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ServicesDropdown from './ServicesDropdown';
import MobileServicesMenu from './MobileServicesMenu'; // Correctly import the external MobileServicesMenu component
import CurrencyConverter from '../Common/CurrencyConverter';

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
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      {/* Top Bar for Contact Info and Support */}
      <div className="bg-primary-700 text-white text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-1 flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="truncate">✉️ essayembassy@gmail.com</span>
        </div>
        <span className="text-center sm:text-right truncate">24/7 Customer Support Available</span>
      </div>

      {/* Main Header Content */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 max-w-7xl mx-auto">
        {/* Left Section: Logo and Admin Sidebar Toggle */}
        <div className="flex items-center">
          {isAdminPage && (
            <button
              onClick={onToggleSidebar}
              className="text-gray-600 dark:text-gray-300 mr-2 sm:mr-3 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={18} className="sm:w-5 sm:h-5" />
            </button>
          )}
          {/* Brand name as text replaced with logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src="/images/logo.png" alt="Essay Embassy Logo" className="h-10 sm:h-12 md:h-14 w-auto" />
            </Link>
          </div>
        </div>

        {/* Center Section: Main Navigation (Desktop ONLY) */}
        <nav className="hidden lg:flex items-center space-x-5">
          <ServicesDropdown /> {/* This is your dynamic services dropdown */}
          <Link to="/samples" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 text-sm font-medium transition-colors">Samples</Link>
          <Link to="/reviews" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 text-sm font-medium transition-colors">Reviews</Link>
          <Link to="/qa" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 text-sm font-semibold transition-colors">Q&amp;A Library</Link>
          <Link to="/writers" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 text-sm font-medium transition-colors">Our Writers</Link>
        </nav>

        {/* Right Section: Action Buttons and User Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/order-now" className="btn-primary text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap">
            <span className="hidden sm:inline">Order Now</span>
            <span className="sm:hidden">Order</span>
          </Link>
          {showProfileDropdown ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen((open) => !open)}
                className="flex items-center px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-primary-700 dark:text-primary-300 font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
                <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-primary-500 text-white mr-1 sm:mr-1.5 uppercase text-[10px] sm:text-xs">
                  {(user.displayName?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase()}
                </span>
                <ChevronDown size={14} className="sm:w-4 sm:h-4" />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <Link
                    to="/dashboard"
                    className="block px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg text-xs sm:text-sm font-medium"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg text-xs sm:text-sm font-medium"
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
                className="text-xs sm:text-sm font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Out</span>
              </button>
            )
          ) : (
            <div className="flex space-x-1.5 sm:space-x-2">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-primary-600 text-primary-600 bg-white hover:bg-primary-50 dark:bg-gray-900 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-900/10 transition-colors shadow-sm whitespace-nowrap"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">Sign Up</span>
                <span className="sm:hidden">Sign Up</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button (for non-admin pages only) */}
          {!isAdminPage && (
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="lg:hidden text-gray-600 dark:text-gray-300 ml-1 sm:ml-2"
              aria-label="Toggle mobile menu"
            >
              <Menu size={18} className="sm:w-5 sm:h-5" />
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
