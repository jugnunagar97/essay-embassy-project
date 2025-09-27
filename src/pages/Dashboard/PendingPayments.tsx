import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, AlertCircle, Clock, DollarSign, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Order } from '../../types';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const PendingPayments: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('clientId', '==', user.id), where('status', '==', 'pending-payment'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedOrders: Order[] = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(fetchedOrders);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching orders: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const formatDate = (date: any): string => {
    if (!date) return 'N/A';
    if (date.toDate) {
      return date.toDate().toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  const handlePayment = (orderId: string) => {
    // TODO: Implement payment processing
    console.log('Processing payment for order:', orderId);
    // This would typically redirect to a payment gateway
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const totalAmount = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pending Payments</h1>
            <p className="text-gray-600 dark:text-gray-400">Complete payments for your orders</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Order</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${orders.length > 0 ? (totalAmount / orders.length).toFixed(2) : '0.00'}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Orders Awaiting Payment</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Complete payment to start work on your orders
            </p>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <Link 
                        to={`/dashboard/order/${order.id}`}
                        className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                      >
                        EE{order.orderNumber}
                      </Link>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
                        Pending Payment
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {order.topic}
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Type:</span>
                        <span>{order.paperType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Words:</span>
                        <span>{order.words}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">Deadline:</span>
                        <span>{formatDate(order.deadline)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium">Amount:</span>
                        <span className="font-bold text-green-600 dark:text-green-400">${order.amount?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 ml-6">
                    <button
                      onClick={() => handlePayment(order.id)}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Pay Now
                    </button>
                    <Link
                      to={`/dashboard/order/${order.id}`}
                      className="text-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="flex flex-col items-center">
            <CreditCard className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Pending Payments</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              All your orders are up to date! No payments are currently pending.
            </p>
            <Link
              to="/order-now"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Place New Order
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingPayments;
