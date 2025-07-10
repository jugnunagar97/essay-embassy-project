// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/Common/LoadingSpinner';

// --- Page Imports ---
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import Samples from './pages/Samples';
import Reviews from './pages/Reviews';
import OrderNow from './pages/Order/OrderNow';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ClientDashboard from './pages/Dashboard/ClientDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import LiveChat from './pages/Dashboard/LiveChat';
import ProfileSettings from './pages/Dashboard/ProfileSettings';
import ClientProfileSettings from './pages/Dashboard/ClientProfileSettings';
import OrderDetailPage from './pages/Dashboard/OrderDetailPage';
import Messages from './pages/Dashboard/AdminMessages';
import NewOrder from './pages/Dashboard/NewOrder';
import Orders from './pages/Dashboard/Orders';
import UserManagement from './pages/Dashboard/UserManagement';
import UserDetail from './pages/Dashboard/UserDetail';
import ServiceManager from './components/Admin/ServiceManager';
import SampleManager from './components/Admin/SampleManager';
import ReviewManager from './components/Admin/ReviewManager';
import BlogManager from './components/Admin/BlogManager';
import ServicePageEditor from './pages/Admin/ServicePageEditor';
// ... other page imports

// === Helper Components ===
function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div className="h-full w-full flex items-center justify-center p-20"><LoadingSpinner size="lg" /></div>;
  }
  if (!user) { return <Navigate to="/login" replace />; }
  if (adminOnly && user.role !== 'admin') { return <Navigate to="/dashboard" replace />; }
  return <>{children}</>;
}

function DashboardRouter() {
  const { user } = useAuth();
  return user?.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services" element={<Services />} />
            <Route path="samples" element={<Samples />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="order-now" element={<OrderNow />} />
            
            <Route path="dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
            <Route path="dashboard/reviews" element={<ProtectedRoute adminOnly><ReviewManager /></ProtectedRoute>} />
            <Route path="dashboard/services" element={<ProtectedRoute adminOnly><ServiceManager /></ProtectedRoute>} />
            <Route path="dashboard/services/new" element={<ProtectedRoute adminOnly><ServicePageEditor /></ProtectedRoute>} />
            <Route path="dashboard/services/edit/:pageId" element={<ProtectedRoute adminOnly><ServicePageEditor /></ProtectedRoute>} />
            <Route path="dashboard/samples" element={<ProtectedRoute adminOnly><SampleManager /></ProtectedRoute>} />
            <Route path="dashboard/blog" element={<ProtectedRoute adminOnly><BlogManager /></ProtectedRoute>} />
            <Route path="dashboard/settings" element={<ProtectedRoute adminOnly><ProfileSettings /></ProtectedRoute>} />
            <Route path="dashboard/new-order" element={<ProtectedRoute adminOnly><NewOrder /></ProtectedRoute>} />
            <Route path="dashboard/orders" element={<ProtectedRoute adminOnly><Orders /></ProtectedRoute>} />
            <Route path="dashboard/users" element={<ProtectedRoute adminOnly><UserManagement /></ProtectedRoute>} />
            <Route path="dashboard/users/:userId" element={<ProtectedRoute adminOnly><UserDetail /></ProtectedRoute>} />
            <Route path="dashboard/messages" element={<ProtectedRoute adminOnly><Messages /></ProtectedRoute>} />
            
            <Route path="dashboard/order/:orderId" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
            <Route path="dashboard/chat" element={<ProtectedRoute><LiveChat /></ProtectedRoute>} />
            <Route path="dashboard/my-settings" element={<ProtectedRoute><ClientProfileSettings /></ProtectedRoute>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;