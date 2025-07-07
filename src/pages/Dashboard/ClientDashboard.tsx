import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, XCircle, PlusCircle } from 'lucide-react';
import StatusBadge from '../../components/Common/StatusBadge';
import { isValid } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../hooks/useData';
import { Order } from '../../types';

// ==================================================================================
// === REUSABLE STAT CARD COMPONENT ===
// ==================================================================================
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactElement;
  iconBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBgColor }) => {
  return (
    <div className="bg-white dark:bg-secondary-800 p-6 rounded-xl shadow-soft border border-gray-200 dark:border-secondary-700 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted">{title}</p>
        <p className="text-3xl font-bold text-secondary-900 dark:text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${iconBgColor}`}>
        {icon}
      </div>
    </div>
  );
};

// ==================================================================================
// === HELPER FUNCTION ===
// ==================================================================================
const formatDate = (dateString: string): string | React.ReactElement => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (!isValid(date)) return 'N/A';
  
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (diff < 0) {
    return <span className="text-red-500 font-semibold">Overdue</span>;
  }
  return `${days} days ${hours} hours`;
};

// ==================================================================================
// === MAIN CLIENT DASHBOARD COMPONENT ===
// ==================================================================================
const ClientDashboard = () => {
  const { user } = useAuth();
  const { orders } = useOrders();

  const [activeTab, setActiveTab] = useState<'in-progress' | 'revision' | 'editing' | 'completed'>('in-progress');

  const pendingPaymentOrders = orders.filter(o => o.status === 'pending-payment');
  
  const assignedOrders = useMemo(() => {
    return orders.filter(o => o.status === activeTab);
  }, [orders, activeTab]);

  const stats = useMemo(() => ({
    total: orders.length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  }), [orders]);
  
  // === START: MODIFIED THIS LINE ===
  const tabs: { name: string; status: 'in-progress' | 'revision' | 'editing' | 'completed' }[] = [
    { name: 'In Progress', status: 'in-progress' },
    { name: 'Revision', status: 'revision' },
    { name: 'Editing', status: 'editing' },
    { name: 'Completed', status: 'completed' },
  ];
  // === END: MODIFIED THIS LINE ===

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-primary-100">
          Ready to get help with your next assignment? Let's achieve academic excellence together.
        </p>
        <Link
          to="/order-now"
          className="inline-flex items-center mt-4 bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          <PlusCircle size={20} className="mr-2" />
          Place New Order
        </Link>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Orders" 
          value={stats.total}
          icon={<FileText className="text-blue-500" size={24} />}
          iconBgColor="bg-blue-100 dark:bg-blue-900/20"
        />
        <StatCard 
          title="Completed Orders" 
          value={stats.completed}
          icon={<CheckCircle className="text-green-500" size={24} />}
          iconBgColor="bg-green-100 dark:bg-green-900/20"
        />
        <StatCard 
          title="Cancelled Orders" 
          value={stats.cancelled}
          icon={<XCircle className="text-red-500" size={24} />}
          iconBgColor="bg-red-100 dark:bg-red-900/20"
        />
      </div>

      {/* Pending Payments Table */}
      {pendingPaymentOrders.length > 0 && (
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-soft border border-gray-200 dark:border-secondary-700">
          <div className="p-6 border-b border-gray-200 dark:border-secondary-700"><h3 className="text-lg font-semibold text-secondary-900 dark:text-white">Pending Payments</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="bg-secondary-50 dark:bg-secondary-900/50"><th className="th-cell">#ID</th><th className="th-cell">Title</th><th className="th-cell">Type of Paper</th><th className="th-cell">Words</th><th className="th-cell">Writer</th><th className="th-cell">Action</th></tr></thead>
              <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                {pendingPaymentOrders.map((order: Order) => (
                  <tr key={order.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-900/50">
                    <td className="td-cell text-primary-500 font-medium"><Link to={`/dashboard/orders/${order.id.replace('#', '')}`}>{order.id}</Link></td>
                    <td className="td-cell">{order.topic}</td>
                    <td className="td-cell">{order.paperType}</td>
                    <td className="td-cell">{order.words}</td>
                    <td className="td-cell">{order.writer || 'N/A'}</td>
                    <td className="td-cell"><button className="btn-danger px-4 py-2 text-sm">Pay Now (USD {order.amount})</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assigned Orders Activity */}
      <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-soft border border-gray-200 dark:border-secondary-700">
        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-secondary-700">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 md:mb-0">Assigned Orders Activity</h3>
            <div className="flex space-x-2 bg-secondary-100 dark:bg-secondary-900/50 p-1 rounded-lg">
              {tabs.map(tab => (
                <button 
                  key={tab.status}
                  onClick={() => setActiveTab(tab.status)}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${activeTab === tab.status ? 'bg-primary-500 text-white shadow' : 'text-muted hover:bg-secondary-200 dark:hover:bg-secondary-700'}`}
                >
                  {tab.name} ({orders.filter(o => o.status === tab.status).length})
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-secondary-50 dark:bg-secondary-900/50"><th className="th-cell">#ID</th><th className="th-cell">Title</th><th className="th-cell">Words</th><th className="th-cell">Deadline</th><th className="th-cell">Writer</th><th className="th-cell">Status</th></tr></thead>
            <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
              {assignedOrders.map((order: Order) => (
                <tr key={order.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-900/50">
                  <td className="td-cell text-primary-500 font-medium"><Link to={`/dashboard/orders/${order.id.replace('#', '')}`}>{order.id}</Link></td>
                  <td className="td-cell">{order.topic}</td>
                  <td className="td-cell">{order.words}</td>
                  <td className="td-cell font-medium">{formatDate(order.deadline)}</td>
                  <td className="td-cell">{order.writer || 'Assigning...'}</td>
                  <td className="td-cell"><StatusBadge status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {assignedOrders.length === 0 && <p className="text-center text-muted py-8">No orders in this category.</p>}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;