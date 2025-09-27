// src/components/Layout/Layout.tsx

import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import ClientSidebar from './ClientSidebar';

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  
  // Determine which sidebar to show based on the route
  const isAdminPage = location.pathname.startsWith('/dashboard') && 
    (location.pathname.includes('/admin') || 
     location.pathname.includes('/dashboard/reviews') ||
     location.pathname.includes('/dashboard/services') ||
     location.pathname.includes('/dashboard/blog') ||
     location.pathname.includes('/dashboard/settings') ||
     location.pathname.includes('/dashboard/new-order') ||
     location.pathname.includes('/dashboard/orders') ||
     location.pathname.includes('/dashboard/users') ||
     location.pathname.includes('/dashboard/messages'));

  // Show client sidebar for all client dashboard routes (not admin routes)
  const isClientDashboard = location.pathname.startsWith('/dashboard') && !isAdminPage;
  
  // Debug logging
  console.log('Layout Debug:', {
    pathname: location.pathname,
    isAdminPage,
    isClientDashboard,
    isSidebarOpen
  });

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{backgroundColor: 'yellow'}}>
      {/* FORCE VISIBLE DEBUG - This should be VERY obvious */}
      <div style={{
        position: 'fixed', 
        top: '50px', 
        left: '0', 
        background: 'red', 
        color: 'white', 
        padding: '10px', 
        zIndex: 99999,
        fontSize: '16px',
        fontWeight: 'bold'
      }}>
        🔴 LAYOUT COMPONENT IS RENDERING! 🔴
      </div>
      
      <Header onToggleSidebar={handleToggleSidebar} />

      <div className="flex flex-1">
        {isAdminPage && <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />}
        {isClientDashboard && (
          <>
            <div style={{
              position: 'fixed', 
              top: '100px', 
              left: '0', 
              background: 'blue', 
              color: 'white', 
              padding: '10px', 
              zIndex: 99999,
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              🔵 CLIENT SIDEBAR SHOULD BE HERE! 🔵
            </div>
            <ClientSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
          </>
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