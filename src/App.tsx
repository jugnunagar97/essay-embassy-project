import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';

// === PAGE IMPORTS ===
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Dashboard Pages
import ClientDashboard from './pages/Dashboard/ClientDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import LiveChat from './pages/Dashboard/LiveChat';
import ProfileSettings from './pages/Dashboard/ProfileSettings';
import OrderDetailPage from './pages/Dashboard/OrderDetailPage';
import Messages from './pages/Dashboard/Messages'; // 1. Import the new Messages page

// Order Pages
import OrderForm from './pages/Order/OrderForm';
import OrderNow from './pages/Order/OrderNow';

// Other Public Pages
import Samples from './pages/Samples';
import Reviews from './pages/Reviews';

// Service Detail Pages
import EssayWriting from './pages/Services/EssayWriting';
import AssignmentHelp from './pages/Services/AssignmentHelp';
// ... other service pages

// Admin Components
import TestimonialManager from './components/Admin/TestimonialManager';
import ServiceManager from './components/Admin/ServiceManager';
import SampleManager from './components/Admin/SampleManager';
import ReviewManager from './components/Admin/ReviewManager';


// === HELPER COMPONENTS ===
function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div></div>;
  }
  if (!user) { return <Navigate to="/login" replace />; }
  if (adminOnly && user.role !== 'admin') { return <Navigate to="/dashboard" replace />; }
  return <>{children}</>;
}

function DashboardRouter() {
  const { user } = useAuth();
  if (!user) { return <Navigate to="/login" replace />; }
  return user.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />;
}


// === MAIN APP CONTENT & ROUTES ===
function AppContent() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/samples" element={<Samples />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        
        {/* Service Sub-Page Routes */}
        <Route path="/services/essay-writing" element={<EssayWriting />} />
        <Route path="/services/assignment-help" element={<AssignmentHelp />} />
        {/* ... other service routes */}

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Order Routes */}
        <Route path="/order" element={<OrderForm />} />
        <Route path="/order-now" element={<OrderNow />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
        <Route path="/dashboard/orders/:orderId" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
        <Route path="/dashboard/chat" element={<ProtectedRoute><LiveChat /></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
        {/* === THIS IS THE NEW, CORRECTED LINE === */}
        <Route path="/dashboard/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />

        {/* Admin Only Routes */}
        <Route path="/dashboard/testimonials" element={<ProtectedRoute adminOnly><TestimonialManager /></ProtectedRoute>} />
        <Route path="/dashboard/services" element={<ProtectedRoute adminOnly><ServiceManager /></ProtectedRoute>} />
        <Route path="/dashboard/samples" element={<ProtectedRoute adminOnly><SampleManager /></ProtectedRoute>} />
        <Route path="/dashboard/reviews" element={<ProtectedRoute adminOnly><ReviewManager /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

// === ROOT APP COMPONENT ===
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
          <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background: 'var(--toast-bg)', color: 'var(--toast-color)' } }} />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;