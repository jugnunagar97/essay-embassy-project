// src/components/Layout/Layout.tsx

import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AdminSidebar from './AdminSidebar';
import ClientSidebar from './ClientSidebar';
import { useAuth } from '../../context/AuthContext';

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, isLoading } = useAuth(); // This gets the logged-in user
  
  // Show loading while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Determine which sidebar to show based on the route and user role
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  const isAdmin = user?.role === 'admin';  // Or whatever your role field is (e.g., user.isAdmin if it's a boolean)

  const isAdminPage = isDashboardPage && isAdmin;
  const isClientDashboard = isDashboardPage && !isAdmin;

  // Debug logging
  // console.log('Path:', location.pathname, 'isAdminPage:', isAdminPage, 'isClientDashboard:', isClientDashboard, 'User Role:', user?.role);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      <Header onToggleSidebar={handleToggleSidebar} />

      <div className="flex flex-1">
        {isAdminPage && <AdminSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />}
        {isClientDashboard && (
          <ClientSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
        
        {/* FIXED: Removed overflow classes that were preventing sticky positioning */}
        <main className="flex-1">
          {/* This container is now inside the Outlet pages, which is a better pattern */}
          <Outlet />
        </main>
      </div>

      {!isAdminPage && <Footer />}
    </div>
  );
}