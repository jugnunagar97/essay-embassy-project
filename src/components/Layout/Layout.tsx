// src/components/Layout/Layout.tsx

import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const isAdminPage = location.pathname.startsWith('/dashboard');

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      
      <Header onToggleSidebar={handleToggleSidebar} />

      <div className="flex flex-1">
        {isAdminPage && <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />}
        
        {/* FIXED: Removed overflow classes that were preventing sticky positioning */}
        <main className="flex-1">
          {/* This container is now inside the Outlet pages, which is a better pattern */}
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}