import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/Common/LoadingSpinner';
import SocialProofNotificationSystem from './components/Common/SocialProofNotificationSystem';
import ScrollToTop from './components/Common/ScrollToTop';

// --- Core Page Imports ---
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services'; // The main services overview page (likely lists categories/popular services)
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import HonorCode from './pages/HonorCode';
import FAQ from './pages/FAQ';
import Writers from './pages/Writers';
import Samples from './pages/Samples';
import Reviews from './pages/Reviews';
import OrderNow from './pages/Order/OrderNow';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import QALibrary from './pages/QALibrary';
import QASolutionPage from './pages/QASolutionPage';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';

// --- Static Service Page Imports ---
import ArgumentativeEssay from './pages/Services/ArgumentativeEssay';
import AssignmentHelp from './pages/Services/AssignmentHelp';
import BookReview from './pages/Services/BookReview';
import CaseStudy from './pages/Services/CaseStudy';
import CaseStudyHelp from './pages/Services/CaseStudyHelp';
import DissertationWriting from './pages/Services/DissertationWriting';
import EnglishAssignmentHelp from './pages/Services/EnglishAssignmentHelp';
import EssayWriting from './pages/Services/EssayWriting';
import HomeworkHelp from './pages/Services/HomeworkHelp';
import LabReport from './pages/Services/LabReport';
import NarrativeEssay from './pages/Services/NarrativeEssay';
import PhysicsAssignmentHelp from './pages/Services/PhysicsAssignmentHelp';
import ProgrammingHelp from './pages/Services/ProgrammingHelp';
import PythonProgrammingHelp from './pages/Services/PythonProgrammingHelp';
import JavaProgrammingHelp from './pages/Services/JavaProgrammingHelp';
import JSProgrammingHelp from './pages/Services/JSProgrammingHelp';
import CProgrammingHelp from './pages/Services/CProgrammingHelp';
import CSharpProgrammingHelp from './pages/Services/CSharpProgrammingHelp';
import ResearchPaperWriting from './pages/Services/ResearchPaperWriting';
import ResearchProposal from './pages/Services/ResearchProposal';
import ScholarshipEssay from './pages/Services/ScholarshipEssay';
import TermPaper from './pages/Services/TermPaper';
import ThesisWriting from './pages/Services/ThesisWriting';
import AdmissionEssayWriting from './pages/Services/AdmissionEssayWriting';
import MatlabProgrammingHelp from './pages/Services/MatlabProgrammingHelp';

// --- Dashboard & Admin Page Imports ---
import ClientDashboard from './pages/Dashboard/ClientDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import LiveChat from './pages/Dashboard/LiveChat';
import ProfileSettings from './pages/Dashboard/ProfileSettings'; // Admin profile settings
import ClientProfileSettings from './pages/Dashboard/ClientProfileSettings'; // Client profile settings
import OrderDetailPage from './pages/Dashboard/OrderDetailPage';
import Messages from './pages/Dashboard/AdminMessages'; // Assuming this is for admin messages
import NewOrder from './pages/Dashboard/NewOrder';
import Orders from './pages/Dashboard/Orders';
import UserManagement from './pages/Dashboard/UserManagement';
import UserDetail from './pages/Dashboard/UserDetail';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminQAManager from './pages/Admin/AdminQAManager';
import AdminQAManagerForm from './pages/Admin/AdminQAManagerForm';

// --- Admin Management Component Imports (from components/Admin) ---
import ServiceManager from './components/Admin/ServiceManager';
import ReviewManager from './components/Admin/ReviewManager';
import BlogManager from './components/Admin/BlogManager';

// --- Admin Page Editor Imports (from pages/Admin) ---
import ServicePageEditor from './pages/Admin/ServicePageEditor';

// --- Dynamic Service Page Import (NEW & CRUCIAL) ---
// This single component will now handle all your dynamically created service pages.
// import DynamicServicePage from './pages/Services/DynamicServicePage';

/**
 * ProtectedRoute component
 * Renders children only if the user is authenticated.
 * Can also restrict access to admin users.
 * Displays a loading spinner while authentication state is being determined.
 * Redirects unauthenticated users to the login page.
 * Redirects non-admin users from admin-only routes to the client dashboard.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render if authenticated.
 * @param {boolean} [props.adminOnly=false] - If true, only allows access to admin users.
 */
function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, isLoading } = useAuth();

  // Show a loading spinner while authentication state is being loaded
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center p-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If route is admin-only and user is not an admin, redirect to client dashboard
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated and authorized, render the children
  return <>{children}</>;
}

/**
 * DashboardRouter component
 * Dynamically renders either the AdminDashboard or ClientDashboard
 * based on the authenticated user's role.
 */
function DashboardRouter() {
  const { user } = useAuth();
  // Render AdminDashboard if user is admin, otherwise render ClientDashboard
  return user?.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />;
}

/**
 * App component
 * Sets up the main routing for the Essay Embassy platform.
 * Includes public routes, protected routes for authenticated users,
 * and admin-only protected routes.
 */
function App() {
  return (
    <AuthProvider> {/* Provides authentication context to all child components */}
      <Router> {/* Enables client-side routing */}
        <ScrollToTop />
        <Toaster position="top-right" /> {/* Global notification system */}
        <SocialProofNotificationSystem />
        <Routes> {/* Defines all possible routes in the application */}
          {/* Main layout route - all nested routes will render within the Layout component */}
          <Route path="/" element={<Layout />}>
            {/* Public routes accessible to everyone */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route index element={<Home />} /> {/* Home page */}
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services" element={<Services />} /> {/* Main services overview page */}

            {/* Static service page routes - NEW STRUCTURE WITHOUT "services" PREFIX */}
            <Route path="essay-writing/admission" element={<AdmissionEssayWriting />} />
            <Route path="argumentative-essay" element={<ArgumentativeEssay />} />
            <Route path="assignment-help" element={<AssignmentHelp />} />
            <Route path="book-review" element={<BookReview />} />
            <Route path="case-study" element={<CaseStudy />} />
            <Route path="case-study-help" element={<CaseStudyHelp />} />
            <Route path="dissertation-writing" element={<DissertationWriting />} />
            <Route path="english-assignment-help" element={<EnglishAssignmentHelp />} />
            <Route path="essay-writing" element={<EssayWriting />} />
            <Route path="homework-help" element={<HomeworkHelp />} />
            <Route path="lab-report" element={<LabReport />} />
            <Route path="narrative-essay" element={<NarrativeEssay />} />
            <Route path="physics-assignment-help" element={<PhysicsAssignmentHelp />} />
            <Route path="programming-help" element={<ProgrammingHelp />} />
            <Route path="programming-help/python" element={<PythonProgrammingHelp />} />
            <Route path="programming-help/java" element={<JavaProgrammingHelp />} />
            <Route path="programming-help/js" element={<JSProgrammingHelp />} />
            <Route path="programming-help/c" element={<CProgrammingHelp />} />
            <Route path="programming-help/csharp" element={<CSharpProgrammingHelp />} />
            <Route path="programming-help/matlab" element={<MatlabProgrammingHelp />} />
            <Route path="research-paper-writing" element={<ResearchPaperWriting />} />
            <Route path="research-proposal" element={<ResearchProposal />} />
            <Route path="scholarship-essay" element={<ScholarshipEssay />} />
            <Route path="term-paper" element={<TermPaper />} />
            <Route path="thesis-writing" element={<ThesisWriting />} />

            {/* Dynamic service route - fallback for any service slugs not covered above */}
            {/* Temporarily disabled to fix routing conflicts */}
            {/* <Route path=":slug" element={<DynamicServicePage />} /> */}

            <Route path="samples" element={<Samples />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} /> {/* Dynamic blog post page */}
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="honor-code" element={<HonorCode />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="writers" element={<Writers />} />
            <Route path="order-now" element={<OrderNow />} />
            <Route path="qa-library" element={<QALibrary />} />
            <Route path="qa-library/:subject/:id" element={<QASolutionPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="/thank-you/:orderId" element={<ThankYou />} />
            <Route path="question/:questionNumber/:slug" element={<QASolutionPage />} />

            {/* Protected routes - require authentication */}
            {/* Dashboard route - dynamically renders admin or client dashboard */}
            <Route path="dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/qa" element={<AdminQAManager />} />
            <Route path="/admin/qa/new" element={<AdminQAManagerForm />} />
            <Route path="/admin/qa/:id/edit" element={<AdminQAManagerForm />} />

            {/* Admin-only protected routes */}
            <Route path="dashboard/reviews" element={<ProtectedRoute adminOnly><ReviewManager /></ProtectedRoute>} />
            <Route path="dashboard/services" element={<ProtectedRoute adminOnly><ServiceManager /></ProtectedRoute>} />
            <Route path="dashboard/services/new" element={<ProtectedRoute adminOnly><ServicePageEditor /></ProtectedRoute>} />
            <Route path="dashboard/services/edit/:pageId" element={<ProtectedRoute adminOnly><ServicePageEditor /></ProtectedRoute>} /> {/* Edit existing service page */}
            <Route path="dashboard/blog" element={<ProtectedRoute adminOnly><BlogManager /></ProtectedRoute>} />
            <Route path="dashboard/settings" element={<ProtectedRoute adminOnly><ProfileSettings /></ProtectedRoute>} /> {/* Admin profile settings */}
            <Route path="dashboard/new-order" element={<ProtectedRoute adminOnly><NewOrder /></ProtectedRoute>} />
            <Route path="dashboard/orders" element={<ProtectedRoute adminOnly><Orders /></ProtectedRoute>} />
            <Route path="dashboard/users" element={<ProtectedRoute adminOnly><UserManagement /></ProtectedRoute>} />
            <Route path="dashboard/users/:userId" element={<ProtectedRoute adminOnly><UserDetail /></ProtectedRoute>} /> {/* View/edit specific user details */}
            <Route path="dashboard/messages" element={<ProtectedRoute adminOnly><Messages /></ProtectedRoute>} />

            {/* Routes accessible to both authenticated clients and admins */}
            <Route path="dashboard/order/:orderId" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} /> {/* Dynamic order detail page */}
            <Route path="dashboard/chat" element={<ProtectedRoute><LiveChat /></ProtectedRoute>} />
            <Route path="dashboard/my-settings" element={<ProtectedRoute><ClientProfileSettings /></ProtectedRoute>} /> {/* Client profile settings */}
          </Route>

          {/* Fallback route for any unmatched paths, redirects to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
