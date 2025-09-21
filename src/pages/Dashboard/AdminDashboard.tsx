import { 
  Users, 
  FileText, 
  DollarSign, 
  CheckCircle,
  ClipboardList, 
  BarChart, 
  LineChart
} from 'lucide-react'; // Removed unused icons (Link, MessageCircle, Settings, BookOpen, PlusCircle)
import { useAuth } from '../../context/AuthContext';
import { useOrders, useDashboardStats } from '../../hooks/useData';
import StatusBadge from '../../components/Common/StatusBadge'; 
import { format, isValid } from 'date-fns'; 
import { Order } from '../../types'; 
import { Link } from 'react-router-dom'; // Re-added Link as it's used in "View All Orders"
import { db } from '../../firebase';
import Sidebar from '../../components/layout/Sidebar';

// Helper function to safely format dates
const formatDate = (timestamp: any, formatString: string = 'MMM dd,yyyy'): string => { 
  // Check if timestamp is a Firebase Timestamp object and convert
  if (timestamp && typeof timestamp.toDate === 'function') {
    const date = timestamp.toDate();
    if (isValid(date)) { 
      return format(date, formatString);
    }
  }
  // Fallback for string dates or invalid timestamps
  const date = new Date(timestamp);
  if (isValid(date)) { 
    return format(date, formatString);
  }
  return 'N/A';
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const { orders } = useOrders(); 
  const { stats } = useDashboardStats();

  // Filter orders for specific statuses
  const pendingOrders = orders.filter((order: Order) => order.status === 'pending-payment').length;
  const inProgressOrders = orders.filter((order: Order) => 
    order.status === 'in-progress' || order.status === 'editing' || order.status === 'revision'
  ).length;
  const completedOrdersCount = orders.filter((order: Order) => order.status === 'completed').length;
  const cancelledOrders = orders.filter((order: Order) => order.status === 'cancelled').length;


  // Calculate overdue orders based on deadline and status
  const overdueOrders = orders.filter((order: Order) => {
    // Ensure order.deadline is a valid Date object for comparison
    const deadlineDate = order.deadline && typeof order.deadline.toDate === 'function' 
                         ? order.deadline.toDate() 
                         : new Date(order.deadline as any); 

    return isValid(deadlineDate) && 
           deadlineDate < new Date() && 
           order.status !== 'completed' && 
           order.status !== 'cancelled';
  }).length;

  // Display top 5 recent orders
  const recentOrders = orders
    .sort((a: Order, b: Order) => (b.createdAt as any).toDate().getTime() - (a.createdAt as any).toDate().getTime()) 
    .slice(0, 5); 

  // Calculate completion rate safely
  const completionRate = stats.totalOrders > 0 
                         ? Math.round((stats.completedOrders / stats.totalOrders) * 100) 
                         : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex">
      <Sidebar isOpen={true} onClose={() => {}} />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-2">Welcome, <span className="text-primary-500">{user?.name || 'Admin'}</span>!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's a comprehensive overview of your Essay Embassy platform.
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                <Users className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">+{stats.monthlyGrowth}% this month</p>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
                <FileText className="text-green-600 dark:text-green-400" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalOrders.toLocaleString()}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{stats.pendingOrders} pending</p>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                <DollarSign className="text-purple-600 dark:text-purple-400" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">+{stats.monthlyGrowth}% this month</p>
          </div>

          {/* Completion Rate Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</p>
              <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-lg">
                <CheckCircle className="text-orange-600 dark:text-orange-400" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{completionRate}%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{stats.completedOrders} completed orders</p>
          </div>
        </div>

        {/* Order Status Summary & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Status Summary Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Status Overview</h2>
              <div className="bg-primary-100 dark:bg-primary-900/20 p-2 rounded-lg">
                <ClipboardList className="text-primary-600" size={20} />
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">{pendingOrders}</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Pending</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Awaiting assignment</p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{inProgressOrders}</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">In Progress</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Currently being worked on</p>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">{overdueOrders}</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Overdue</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Past deadline</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{completedOrdersCount}</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Successfully delivered</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  {completedOrdersCount} completed
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  {cancelledOrders} cancelled
                </span>
              </div>
            </div>
          </div>

        </div>



        {/* Quick Actions / Management Links - This section is now removed as per your request */}
        {/*
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <Link
            to="/dashboard/new-order" 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 group text-center"
          >
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg inline-block group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/30 transition-colors mb-2">
              <PlusCircle className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">New Order</h3>
          </Link>

          <Link
            to="/dashboard/orders"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 group text-center"
          >
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg inline-block group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors mb-2">
              <FileText className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Manage Orders</h3>
          </Link>

          <Link
            to="/dashboard/users"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 group text-center"
          >
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg inline-block group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors mb-2">
              <Users className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Manage Users</h3>
          </Link>

          <Link
            to="/dashboard/messages" 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 group text-center"
          >
            <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-lg inline-block group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/30 transition-colors mb-2">
              <MessageCircle className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Messages</h3>
          </Link>

          <Link
            to="/dashboard/blog"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 group text-center"
          >
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg inline-block group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30 transition-colors mb-2">
              <BookOpen className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Manage Blog</h3>
          </Link>

          <Link
            to="/dashboard/testimonials"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 group text-center"
          >
            <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-lg inline-block group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/30 transition-colors mb-2">
              <MessageCircle className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Testimonials</h3>
          </Link>

          <Link
            to="/dashboard/services"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 group text-center"
          >
            <div className="bg-teal-100 dark:bg-teal-900/20 p-3 rounded-lg inline-block group-hover:bg-teal-200 dark:group-hover:bg-teal-900/30 transition-colors mb-2">
              <Settings className="text-teal-600 dark:text-teal-400" size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Manage Services</h3>
          </Link>
        </div>
        */}
        </div>
      </main>
    </div>
  );
}
