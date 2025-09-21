import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowUp,
  ArrowDown,
  Eye, // For view details icon
  User as UserIcon, // Icon for user management
  FileText as OrderIcon // For orders count icon - Renamed to avoid conflict with FileText if used elsewhere
} from 'lucide-react'; // <-- FIXED: Added UserIcon and OrderIcon (FileText as OrderIcon)
import { useUsers, useOrders } from '../../hooks/useData'; 
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { User, Order } from '../../types';
import Sidebar from '../../components/layout/Sidebar'; 

// Main User Management Component
export default function UserManagement() {
  const { users, isLoading: usersLoading, error: usersError } = useUsers(); 
  const { orders, isLoading: ordersLoading, error: ordersError } = useOrders(); 
  
  const [searchTerm, setSearchTerm] = useState('');
  // <-- FIXED: Expanded sortColumn type to include all order count properties
  const [sortColumn, setSortColumn] = useState<keyof User | 'completedOrders' | 'pendingOrders' | 'inProgressOrders' | 'revisionOrders' | 'cancelledOrders'>('createdAt'); 
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Augment users with order counts
  const usersWithOrderCounts = useMemo(() => {
    if (!users || !orders) return [];

    const orderCountsByUser: { [key: string]: { completed: number; pending: number; inProgress: number; revision: number; cancelled: number } } = {};
    orders.forEach((order: Order) => {
      if (!orderCountsByUser[order.clientId]) {
        orderCountsByUser[order.clientId] = { completed: 0, pending: 0, inProgress: 0, revision: 0, cancelled: 0 };
      }
      if (order.status === 'completed') orderCountsByUser[order.clientId].completed++;
      if (order.status === 'pending-payment') orderCountsByUser[order.clientId].pending++;
      if (order.status === 'in-progress') orderCountsByUser[order.clientId].inProgress++;
      if (order.status === 'revision') orderCountsByUser[order.clientId].revision++;
      if (order.status === 'cancelled') orderCountsByUser[order.clientId].cancelled++;
    });

    return users.map(user => ({
      ...user,
      completedOrders: orderCountsByUser[user.id]?.completed || 0,
      pendingOrders: orderCountsByUser[user.id]?.pending || 0,
      inProgressOrders: orderCountsByUser[user.id]?.inProgress || 0,
      revisionOrders: orderCountsByUser[user.id]?.revision || 0,
      cancelledOrders: orderCountsByUser[user.id]?.cancelled || 0,
    }));
  }, [users, orders]);

  // Filtered and Sorted Users
  const filteredUsers = useMemo(() => {
    return usersWithOrderCounts.filter(user => {
      const matchesSearch = searchTerm === '' || 
                            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [usersWithOrderCounts, searchTerm]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      // <-- FIXED: Ensured all possible sortColumn values are handled
      if (sortColumn === 'completedOrders' || sortColumn === 'pendingOrders' || sortColumn === 'inProgressOrders' || sortColumn === 'revisionOrders' || sortColumn === 'cancelledOrders') {
        aValue = (a as any)[sortColumn];
        bValue = (b as any)[sortColumn];
      } else if (sortColumn === 'createdAt') {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      } else {
        aValue = a[sortColumn as keyof User];
        bValue = b[sortColumn as keyof User];
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }, [filteredUsers, sortColumn, sortDirection]);

  // <-- FIXED: Updated useCallback dependency
  const handleSort = useCallback((column: keyof User | 'completedOrders' | 'pendingOrders' | 'inProgressOrders' | 'revisionOrders' | 'cancelledOrders') => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('desc'); 
    }
  }, [sortColumn, sortDirection]); // Added sortDirection to dependencies for correct toggle logic

  if (usersLoading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (usersError || ordersError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error loading data: {usersError?.message || ordersError?.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex">
      <Sidebar isOpen={true} onClose={() => {}} />
      <main className="flex-1 p-4 lg:p-8">
        <h1 className="text-3xl font-bold mb-6">Manage <span className="text-primary-500">Users</span></h1>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          {/* Search by User ID / Name / Email */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Users
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Search by ID, Name, Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="md:col-span-1 lg:col-span-1">
            <button
              onClick={() => {
                setSearchTerm('');
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

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    <UserIcon size={14} className="mr-1" /> {/* <-- FIXED: UserIcon used */}
                    User ID
                    {sortColumn === 'id' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name
                    {sortColumn === 'name' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center">
                    Email
                    {sortColumn === 'email' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center">
                    Role
                    {sortColumn === 'role' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('completedOrders')}
                >
                  <div className="flex items-center">
                    <OrderIcon size={14} className="mr-1" /> {/* <-- FIXED: OrderIcon used */}
                    Completed Orders
                    {sortColumn === 'completedOrders' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('pendingOrders')}
                >
                  <div className="flex items-center">
                    <OrderIcon size={14} className="mr-1" /> {/* <-- FIXED: OrderIcon used */}
                    Pending Orders
                    {sortColumn === 'pendingOrders' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user: User & { completedOrders: number; pendingOrders: number; inProgressOrders: number; revisionOrders: number; cancelledOrders: number }) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      <Link to={`/dashboard/users/${user.id}`} className="text-primary-600 hover:underline">
                        {user.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.completedOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.pendingOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/dashboard/users/${user.id}`} className="text-primary-600 hover:text-primary-900">
                        <Eye size={20} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </main>
    </div>
  );
}
