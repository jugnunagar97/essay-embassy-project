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
  const dashboardRoutes = [
    '/dashboard',
    '/dashboard/new-order',
    '/dashboard/orders',
    '/dashboard/history',
    '/dashboard/payments',
    '/dashboard/support',
    '/dashboard/settings',
    '/dashboard/testimonials',
    '/dashboard/users',
    '/dashboard/blog',
    '/dashboard/analytics',
    '/dashboard/samples',
    '/dashboard/services',
    '/dashboard/chat'
  ];

  // Check if current route is a dashboard route
  const isDashboardRoute = dashboardRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith(route + '/')
  );

  // Only show sidebar for logged-in users on dashboard routes
  const shouldShowSidebar = user && isDashboardRoute;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        {/* Only show sidebar for dashboard routes */}
        {shouldShowSidebar && <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />}
        
        <main className={`flex-1 ${shouldShowSidebar ? 'lg:ml-64' : ''}`}>
          <div className={isDashboardRoute ? 'p-4 lg:p-8' : ''}>
            {children}
          </div>
        </main>
      </div>
      
      {/* Only show footer for non-dashboard routes */}
      {!isDashboardRoute && <Footer />}
    </div>
  );
}