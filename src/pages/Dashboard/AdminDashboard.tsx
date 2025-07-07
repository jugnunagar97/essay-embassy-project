import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Activity,
  MessageCircle,
  Settings,
  BookOpen,
  Star
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOrders, useDashboardStats } from '../../hooks/useData';
import StatusBadge from '../../components/Common/StatusBadge';
import { format, isValid } from 'date-fns';

// Helper function to safely format dates
const formatDate = (dateString: string, formatString: string = 'MMM dd, yyyy'): string => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  if (!isValid(date)) return 'N/A';
  
  return format(date, formatString);
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { stats } = useDashboardStats();

  const recentOrders = orders.slice(0, 5);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const inProgressOrders = orders.filter(order => order.status === 'in-progress').length;
  const overdueOrders = orders.filter(order => 
    new Date(order.deadline) < new Date() && order.status !== 'completed'
  ).length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-indigo-100">
          Welcome back, {user?.name}. Here's what's happening with Essay Embassy today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">+{stats.monthlyGrowth}% this month</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <Users className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOrders.toLocaleString()}</p>
              <p className="text-xs text-blue-600 mt-1">{stats.pendingOrders} pending</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <FileText className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">+{stats.monthlyGrowth}% this month</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
              <DollarSign className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round((stats.completedOrders / stats.totalOrders) * 100)}%
              </p>
              <p className="text-xs text-green-600 mt-1">{stats.completedOrders} completed</p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
              <TrendingUp className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="text-yellow-600 dark:text-yellow-400" size={20} />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                Pending Orders
              </h3>
              <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">
                {pendingOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center">
            <Activity className="text-blue-600 dark:text-blue-400" size={20} />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400">
                In Progress
              </h3>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                {inProgressOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="text-red-600 dark:text-red-400" size={20} />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                Overdue
              </h3>
              <p className="text-2xl font-bold text-red-900 dark:text-red-300">
                {overdueOrders}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounde-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
            <Link
              to="/dashboard/orders"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              View All Orders
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Deadline
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.topic}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.subject} • {order.pages} pages
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {order.clientName}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    ${order.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(order.deadline)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Link
          to="/dashboard/orders"
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group"
        >
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg inline-block group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
              <FileText className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Manage Orders</h3>
          </div>
        </Link>

        <Link
          to="/dashboard/users"
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group"
        >
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg inline-block group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
              <Users className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Manage Users</h3>
          </div>
        </Link>

        <Link
          to="/dashboard/blog"
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group"
        >
          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg inline-block group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30 transition-colors">
              <FileText className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Manage Blog</h3>
          </div>
        </Link>

        <Link
          to="/dashboard/testimonials"
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group"
        >
          <div className="text-center">
            <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-lg inline-block group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/30 transition-colors">
              <MessageCircle className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Testimonials</h3>
          </div>
        </Link>

        <Link
          to="/dashboard/services"
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group"
        >
          <div className="text-center">
            <div className="bg-teal-100 dark:bg-teal-900/20 p-3 rounded-lg inline-block group-hover:bg-teal-200 dark:group-hover:bg-teal-900/30 transition-colors">
              <Settings className="text-teal-600 dark:text-teal-400" size={24} />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Manage Services</h3>
          </div>
        </Link>

        <Link
          to="/dashboard/samples"
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group"
        >
          <div className="text-center">
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg inline-block group-hover:bg-red-200 dark:group-hover:bg-red-900/30 transition-colors">
              <BookOpen className="text-red-600 dark:text-red-400" size={24} />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Manage Samples</h3>
          </div>
        </Link>
      </div>

      {/* Additional Admin Quick Action for Reviews */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Review Management</h3>
            <p className="text-gray-600 dark:text-gray-400">Moderate customer reviews and testimonials</p>
          </div>
          <Link
            to="/dashboard/reviews"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <Star size={20} />
            <span>Manage Reviews</span>
          </Link>
        </div>
      </div>
    </div>
  );
}