import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/Common/LoadingSpinner';
import SocialProofNotificationSystem from './components/Common/SocialProofNotificationSystem';
import ScrollToTop from './components/Common/ScrollToTop';
import GeoBlock from './components/GeoBlock';
import NoIndex from './components/NoIndex';

// --- Core Page Imports ---
// import Home from './pages/Home';
import HomeV2 from './pages/HomeV2';
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
// Old Q&A system removed - using new localStorage-based system
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';

// --- New Q&A Pages ---
import QACatalog from './pages/QACatalog';
import QuestionDetail from './pages/QuestionDetail';
import AdminQAList from './pages/Admin/AdminQAList';
import AdminQANew from './pages/Admin/AdminQANew';
import AdminQAEdit from './pages/Admin/AdminQAEdit';
// import ErrorPage from './pages/ErrorPage';
import EditorLayout from './components/Layout/EditorLayout';
import EditorReviewsModule from './pages/Editor/EditorReviewsModule';
import EditorQnaModule from './pages/Editor/EditorQnaModule';
import EditorBlogModule from './pages/Editor/EditorBlogModule';
import type { User } from './types';


// --- Static Service Page Imports ---
import ArgumentativeEssayWriting from './pages/Services/ArgumentativeEssayWriting';
import PersuasiveEssayWriting from './pages/Services/PersuasiveEssayWriting';
import DescriptiveEssayWriting from './pages/Services/DescriptiveEssayWriting';
import ExpositoryEssayWritingService from './pages/Services/ExpositoryEssayWriting';
import AnalyticalEssayWritingService from './pages/Services/AnalyticalEssayWriting';
import AssignmentHelp from './pages/Services/AssignmentHelp';
import BookReview from './pages/Services/BookReview';
import CaseStudyHelp from './pages/Services/CaseStudyHelp';
import DissertationWriting from './pages/Services/DissertationWriting';
import EnglishAssignmentHelp from './pages/Services/EnglishAssignmentHelp';
import EssayWriting from './pages/Services/EssayWriting';
import HomeworkHelp from './pages/Services/HomeworkHelp';
import LabReport from './pages/Services/LabReport';
import NarrativeEssayWriting from './pages/Services/NarrativeEssayWriting';
import PhysicsAssignmentHelp from './pages/Services/PhysicsAssignmentHelp';
import ProgrammingHelp from './pages/Services/ProgrammingHelp';
import PythonProgrammingHelp from './pages/Services/PythonProgrammingHelp';
import JavaProgrammingHelp from './pages/Services/JavaProgrammingHelp';
import JSProgrammingHelp from './pages/Services/JSProgrammingHelp';
import CProgrammingHelp from './pages/Services/CProgrammingHelp';
import CSharpProgrammingHelp from './pages/Services/CSharpProgrammingHelp';
import ResearchPaperWriting from './pages/Services/ResearchPaperWriting';
import TermPaper from './pages/Services/TermPaper';
import ThesisWriting from './pages/Services/ThesisWriting';
import AdmissionEssayWriting from './pages/Services/AdmissionEssayWriting';
import ReflectiveEssay from './pages/Services/ReflectiveEssay';
import CompareContrastEssay from './pages/Services/CompareContrastEssay';
import CauseEffectEssay from './pages/Services/CauseEffectEssay';
import ScholarshipEssay from './pages/Services/ScholarshipEssay';
import PaperWriting from './pages/Services/PaperWriting';
import ThesisWritingServices from './pages/Services/ThesisWritingServices';
import DissertationWritingServices from './pages/Services/DissertationWritingServices';
import MatlabProgrammingHelp from './pages/Services/MatlabProgrammingHelp';
import RubyProgrammingHelp from './pages/Services/RubyProgrammingHelp';
import CPPProgrammingHelp from './pages/Services/CPPProgrammingHelp';
import ManagementAssignmentHelp from './pages/Services/ManagementAssignmentHelp';
import MathAssignmentHelp from './pages/Services/MathAssignmentHelp';
import ComputerAssignmentHelp from './pages/Services/ComputerAssignmentHelp';
import HumanitiesAssignmentHelp from './pages/Services/HumanitiesAssignmentHelp';
import EngineeringAssignmentHelp from './pages/Services/EngineeringAssignmentHelp';
import BiotechnologyAssignmentHelp from './pages/Services/BiotechnologyAssignmentHelp';
import LawAssignmentHelp from './pages/Services/LawAssignmentHelp';
import ScienceAssignmentHelp from './pages/Services/ScienceAssignmentHelp';
import DynamicServicePage from './pages/DynamicServicePage';

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

// --- Client Dashboard Pages ---
import MyOrders from './pages/Dashboard/MyOrders';
import PendingPayments from './pages/Dashboard/PendingPayments';
import ClientLiveChat from './pages/Dashboard/ClientLiveChat';
import HelpSupport from './pages/Dashboard/HelpSupport';
import PlaceOrder from './pages/Dashboard/PlaceOrder';
// Old Q&A admin system removed - using new localStorage-based system

// --- Tools ---
import EssayAnalyzer from './pages/tools/EssayAnalyzer';

// --- Admin Management Component Imports (from components/Admin) ---
import ServiceManager from './components/Admin/ServiceManager';
import ReviewManager from './components/Admin/ReviewManager';
import BlogManager from './components/Admin/BlogManager';





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
function ProtectedRoute({
  children,
  adminOnly = false,
  allowedRoles
}: {
  children: React.ReactNode,
  adminOnly?: boolean,
  allowedRoles?: Array<User['role']>
}) {
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

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'editor' ? '/editor' : '/dashboard'} replace />;
  }

  // If route is admin-only and user is not an admin, redirect to client dashboard
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated and authorized, render the children
  return (
    <>
      <NoIndex />
      {children}
    </>
  );
}

function EditorRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['editor']}>
      {children}
    </ProtectedRoute>
  );
}

/**
 * DashboardRouter component
 * Dynamically renders either the AdminDashboard or ClientDashboard
 * based on the authenticated user's role.
 */
function DashboardRouter() {
  const { user } = useAuth();
  // Render AdminDashboard if user is admin, otherwise render ClientDashboard
  if (user?.role === 'admin') return <AdminDashboard />;
  if (user?.role === 'editor') return <Navigate to="/editor" replace />;
  return <ClientDashboard />;
}

/**
 * App component
 * Sets up the main routing for the Essay Embassy platform.
 * Includes public routes, protected routes for authenticated users,
 * and admin-only protected routes.
 */
function App() {
  return (
    <GeoBlock>
      <AuthProvider> {/* Provides authentication context to all child components */}
        <CurrencyProvider> {/* Provides currency context to all child components */}
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
                <Route index element={<HomeV2 />} /> {/* New Standard Homepage */}
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="services" element={<Services />} /> {/* Main services overview page */}

                {/* Static service page routes - NEW STRUCTURE WITHOUT "services" PREFIX */}
                <Route path="essay-writing/admission" element={<AdmissionEssayWriting />} />
                <Route path="essay-writing/reflective" element={<ReflectiveEssay />} />
                <Route path="essay-writing/compare-contrast" element={<CompareContrastEssay />} />
                <Route path="essay-writing/cause-effect" element={<CauseEffectEssay />} />
                <Route path="essay-writing/narrative" element={<NarrativeEssayWriting />} />
                <Route path="essay-writing/argumentative" element={<ArgumentativeEssayWriting />} />
                <Route path="essay-writing/persuasive" element={<PersuasiveEssayWriting />} />
                <Route path="essay-writing/descriptive" element={<DescriptiveEssayWriting />} />
                <Route path="essay-writing/expository" element={<ExpositoryEssayWritingService />} />
                <Route path="essay-writing/analytical" element={<AnalyticalEssayWritingService />} />
                <Route path="essay-writing/scholarship" element={<ScholarshipEssay />} />
                {/* Backward compatibility routes */}
                <Route path="argumentative-essay" element={<ArgumentativeEssayWriting />} />
                <Route path="narrative-essay" element={<NarrativeEssayWriting />} />
                <Route path="assignment-help" element={<AssignmentHelp />} />
                <Route path="assignment-help/management" element={<ManagementAssignmentHelp />} />
                <Route path="assignment-help/computer" element={<ComputerAssignmentHelp />} />
                <Route path="assignment-help/humanities" element={<HumanitiesAssignmentHelp />} />
                <Route path="assignment-help/math" element={<MathAssignmentHelp />} />
                <Route path="assignment-help/law" element={<LawAssignmentHelp />} />
                <Route path="assignment-help/science" element={<ScienceAssignmentHelp />} />
                <Route path="assignment-help/engineering" element={<EngineeringAssignmentHelp />} />
                <Route path="assignment-help/biotechnology" element={<BiotechnologyAssignmentHelp />} />
                <Route path="book-review" element={<BookReview />} />
                <Route path="case-study-help" element={<CaseStudyHelp />} />
                <Route path="dissertation-writing" element={<DissertationWriting />} />
                <Route path="english-assignment-help" element={<EnglishAssignmentHelp />} />
                <Route path="essay-writing" element={<EssayWriting />} />
                <Route path="homework-help" element={<HomeworkHelp />} />
                <Route path="lab-report" element={<LabReport />} />
                <Route path="narrative-essay" element={<NarrativeEssayWriting />} />
                <Route path="physics-assignment-help" element={<PhysicsAssignmentHelp />} />
                <Route path="programming-help" element={<ProgrammingHelp />} />
                <Route path="programming-help/python" element={<PythonProgrammingHelp />} />
                <Route path="programming-help/java" element={<JavaProgrammingHelp />} />
                <Route path="programming-help/js" element={<JSProgrammingHelp />} />
                <Route path="programming-help/c" element={<CProgrammingHelp />} />
                <Route path="programming-help/csharp" element={<CSharpProgrammingHelp />} />
                <Route path="programming-help/ruby" element={<RubyProgrammingHelp />} />
                <Route path="programming-help/cpp" element={<CPPProgrammingHelp />} />
                <Route path="programming-help/matlab" element={<MatlabProgrammingHelp />} />
                <Route path="research-paper-writing" element={<ResearchPaperWriting />} />
                <Route path="paper-writing-services" element={<PaperWriting />} />
                <Route path="thesis-writing-services" element={<ThesisWritingServices />} />
                <Route path="dissertation-writing-services" element={<DissertationWritingServices />} />
                <Route path="term-paper" element={<TermPaper />} />
                <Route path="thesis-writing" element={<ThesisWriting />} />
                <Route path="services/:slug" element={<DynamicServicePage />} />



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
                <Route path="checkout" element={<Checkout />} />
                <Route path="/thank-you/:orderId" element={<ThankYou />} />

                {/* Tools */}
                <Route path="tools/scholarship-analyzer" element={<EssayAnalyzer />} />

                {/* Q&A Routes - New localStorage-based system */}
                <Route path="qa" element={<QACatalog />} />
                <Route path="question/:questionNumber/:slug" element={<QuestionDetail />} />

                {/* Protected routes - require authentication */}
                {/* Dashboard route - dynamically renders admin or client dashboard */}
                <Route path="dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />

                {/* Admin-only protected routes */}
                <Route path="dashboard/reviews" element={<ProtectedRoute adminOnly><ReviewManager /></ProtectedRoute>} />
                <Route path="dashboard/services" element={<ProtectedRoute adminOnly><ServiceManager /></ProtectedRoute>} />

                <Route path="dashboard/blog" element={<ProtectedRoute adminOnly><BlogManager /></ProtectedRoute>} />
                <Route path="dashboard/settings" element={<ProtectedRoute adminOnly><ProfileSettings /></ProtectedRoute>} /> {/* Admin profile settings */}
                <Route path="dashboard/new-order" element={<ProtectedRoute adminOnly><NewOrder /></ProtectedRoute>} />
                <Route path="dashboard/orders" element={<ProtectedRoute adminOnly><Orders /></ProtectedRoute>} />
                <Route path="dashboard/users" element={<ProtectedRoute adminOnly><UserManagement /></ProtectedRoute>} />
                <Route path="dashboard/users/:userId" element={<ProtectedRoute adminOnly><UserDetail /></ProtectedRoute>} /> {/* View/edit specific user details */}
                <Route path="dashboard/messages" element={<ProtectedRoute adminOnly><Messages /></ProtectedRoute>} />

                {/* Admin Q&A Routes */}
                <Route path="admin/qa" element={<ProtectedRoute adminOnly><AdminQAList /></ProtectedRoute>} />
                <Route path="admin/qa/new" element={<ProtectedRoute adminOnly><AdminQANew /></ProtectedRoute>} />
                <Route path="admin/qa/:id/edit" element={<ProtectedRoute adminOnly><AdminQAEdit /></ProtectedRoute>} />

                {/* Routes accessible to both authenticated clients and admins */}
                <Route path="dashboard/order/:orderId" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} /> {/* Dynamic order detail page */}
                <Route path="dashboard/chat" element={<ProtectedRoute><LiveChat /></ProtectedRoute>} />
                <Route path="dashboard/my-settings" element={<ProtectedRoute><ClientProfileSettings /></ProtectedRoute>} /> {/* Client profile settings */}

                {/* Client-specific routes */}
                <Route path="dashboard/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
                <Route path="dashboard/pending-payments" element={<ProtectedRoute><PendingPayments /></ProtectedRoute>} />
                <Route path="dashboard/client-chat" element={<ProtectedRoute><ClientLiveChat /></ProtectedRoute>} />
                <Route path="dashboard/help" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
                <Route path="dashboard/place-order" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />

              </Route>

              {/* Admin routes outside Layout wrapper */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Editor routes */}
              <Route path="/editor" element={<EditorRoute><EditorLayout /></EditorRoute>}>
                <Route index element={<Navigate to="reviews" replace />} />
                <Route path="reviews/*" element={<EditorReviewsModule />} />
                <Route path="qna/*" element={<EditorQnaModule />} />
                <Route path="blog/*" element={<EditorBlogModule />} />
              </Route>

              {/* Fallback route for any unmatched paths, redirects to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </CurrencyProvider>
      </AuthProvider>
    </GeoBlock>
  );
}

export default App;
