import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Define dashboard routes that should show the sidebar
  // Keep this list updated with all your dashboard paths
  const dashboardRoutes = [
    '/dashboard',
    '/dashboard/new-order',
    '/dashboard/orders',
    // '/dashboard/history', // Removed as per previous instructions
    // '/dashboard/payments', // Removed as per previous instructions
    // '/dashboard/support', // Removed as per previous instructions
    '/dashboard/settings',
    '/dashboard/testimonials',
    '/dashboard/users',
    '/dashboard/blog',
    // '/dashboard/analytics', // Removed as per previous instructions
    '/dashboard/samples',
    '/dashboard/services',
    '/dashboard/chat',
    '/dashboard/messages' // Added messages route
  ];

  // Check if current route is a dashboard route
  const isDashboardRoute = dashboardRoutes.some(route => 
    location.pathname === route || (location.pathname.startsWith(route + '/') && route !== '/dashboard')
    // The `route !== '/dashboard'` condition ensures that /dashboard/orders doesn't match /dashboard exactly,
    // but /dashboard still matches itself.
  );

  // Only show sidebar for logged-in users on dashboard routes
  const shouldShowSidebar = user && isDashboardRoute;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        {/* Only show sidebar for dashboard routes */}
        {shouldShowSidebar && <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />}
        
        {/* Main content area */}
        {/* Removed lg:ml-64 here. The sidebar is fixed and takes its own space. */}
        {/* The main content should just flex-grow and use padding */}
        <main className={`flex-1 overflow-auto ${isDashboardRoute ? 'p-4 lg:p-8' : ''}`}> {/* Added p-4 lg:p-8 directly here */}
          {children}
        </main>
      </div>
      
      {/* Only show footer for non-dashboard routes */}
      {!isDashboardRoute && <Footer />}
    </div>
  );
}
