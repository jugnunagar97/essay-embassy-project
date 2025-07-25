import { useState, useCallback, useMemo, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowUp,
  ArrowDown,
  Eye
} from 'lucide-react';
import { useOrders } from '../../hooks/useData'; // This hook now returns 'error'
import StatusBadge from '../../components/Common/StatusBadge';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { Order } from '../../types';
import { format, isValid } from 'date-fns';
import { db } from '../../firebase';

// Helper function to safely format dates (replicated for self-containment)
const formatDate = (timestamp: any, formatString: string = 'MMM dd,yyyy HH:mm'): string => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    const date = timestamp.toDate();
    if (isValid(date)) {
      return format(date, formatString);
    }
  }
  const date = new Date(timestamp);
  if (isValid(date)) {
    return format(date, formatString);
  }
  return 'N/A';
};

// Main Orders Management Component
export default function Orders() {
  // Now useOrders is guaranteed to return error
  const { orders, isLoading, error } = useOrders(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortColumn, setSortColumn] = useState<keyof Order>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Filtered and Sorted Orders
  const filteredOrders = useMemo(() => { 
    return orders.filter((order: Order) => {
      const matchesSearch = searchTerm === '' || 
                            order.orderNumber.toString().includes(searchTerm) ||
                            order.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, filterStatus]); 

  const sortedOrders = useMemo(() => { 
    return [...filteredOrders].sort((a: Order, b: Order) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (sortColumn === 'createdAt' || sortColumn === 'deadline') {
        const aTime = (aValue as any)?.toDate ? (aValue as any).toDate().getTime() : new Date(aValue as any).getTime();
        const bTime = (bValue as any)?.toDate ? (bValue as any).toDate().getTime() : new Date(bValue as any).getTime();
        return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }, [filteredOrders, sortColumn, sortDirection]); 

  const handleSort = useCallback((column: keyof Order) => { 
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('desc'); 
    }
  }, [sortColumn]); 

  // Modal close on ESC
  useEffect(() => {
    if (!showModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Display error message if there is an error
  if (error) { 
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error loading orders: {error.message || 'Unknown error'}
      </div>
    );
  }

  const orderStatuses = [
    { label: 'All', value: 'all' },
    { label: 'Pending Payment', value: 'pending-payment' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Revision', value: 'revision' },
    { label: 'Editing', value: 'editing' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Manage <span className="text-primary-500">Orders</span></h1>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          {/* Search by Order ID / Topic / Client */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Orders
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Search by ID, Topic, Client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter by Status */}
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Status
            </label>
            <select
              id="statusFilter"
              className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {orderStatuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="md:col-span-1 lg:col-span-1">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setSortColumn('createdAt');
                setSortDirection('desc');
              }}
              className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('orderNumber')}
                >
                  <div className="flex items-center">
                    Order ID
                    {sortColumn === 'orderNumber' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('topic')}
                >
                  <div className="flex items-center">
                    Topic
                    {sortColumn === 'topic' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('clientName')}
                >
                  <div className="flex items-center">
                    Client
                    {sortColumn === 'clientName' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortColumn === 'status' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center">
                    Amount
                    {sortColumn === 'amount' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('deadline')}
                >
                  <div className="flex items-center">
                    Deadline
                    {sortColumn === 'deadline' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedOrders.length > 0 ? (
                sortedOrders.map((order: Order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      <Link to={`/dashboard/orders/${order.id}`} className="text-primary-600 hover:underline">
                        #{order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {order.topic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {order.clientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(order.deadline)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-primary-600 hover:text-primary-900"
                        onClick={() => { setSelectedOrder(order); setShowModal(true); }}
                        aria-label="View Order Details"
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full p-6 relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">Order ID: #EE{selectedOrder.orderNumber}</h2>
            <p className="text-muted mb-4">Topic: {selectedOrder.topic}</p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm mb-4">
              <div className="flex justify-between"><span className="text-muted">Type of Service:</span> <span className="font-medium text-right">{selectedOrder.paperType}</span></div>
              <div className="flex justify-between"><span className="text-muted">Format:</span> <span className="font-medium">{selectedOrder.citationStyle}</span></div>
              <div className="flex justify-between"><span className="text-muted">Amount:</span> <span className="font-medium">${selectedOrder.amount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Writer:</span> <span className="font-medium">{selectedOrder.writerId || 'Unassigned'}</span></div>
              <div className="flex justify-between"><span className="text-muted">Pages:</span> <span className="font-medium">{selectedOrder.words ? `~${selectedOrder.words} words` : 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-muted">Deadline:</span> <span className="font-medium">{formatDate(selectedOrder.deadline)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Status:</span> <span><StatusBadge status={selectedOrder.status} /></span></div>
              <div className="flex justify-between">
                <span className="text-muted">Payment:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${selectedOrder.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'}`}>
                  {selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
              <h3 className="font-semibold text-lg mb-2">Instructions</h3>
              <p className="text-muted text-sm whitespace-pre-wrap">{selectedOrder.instructions || "No specific instructions were provided."}</p>
            </div>
            {/* Add more details as needed */}
          </div>
        </div>
      )}
    </div>
  );
}
