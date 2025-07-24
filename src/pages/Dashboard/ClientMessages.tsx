import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Order } from '../../types';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { format, formatDistanceToNow } from 'date-fns';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { MessageSquare, Inbox } from 'lucide-react';
import toast from 'react-hot-toast'; // <-- THIS LINE FIXES THE ERROR

// ==================================================================================
// === TYPE DEFINITIONS ===
// ==================================================================================
interface LastMessage {
  text: string;
  timestamp: Timestamp;
  senderName: string;
}

interface Conversation extends Order {
  lastMessage: LastMessage | null;
}

// ==================================================================================
// === HELPER FUNCTION ===
// ==================================================================================
const formatDate = (timestamp: Timestamp | null): string => {
  if (!timestamp?.toDate) return 'No date';
  const date = timestamp.toDate();
  // If it's within the last 7 days, show relative time, otherwise show the date
  if (Date.now() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  return format(date, 'MMM dd, yyyy');
};

// ==================================================================================
// === MAIN MESSAGES PAGE COMPONENT ===
// ==================================================================================
export default function Messages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // 1. Fetch all orders for the current user
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('clientId', '==', user.id), orderBy('createdAt', 'desc'));
        const orderSnapshot = await getDocs(q);
        const userOrders = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));

        // 2. For each order, fetch the last message
        const conversationPromises = userOrders.map(async (order) => {
          const messagesRef = collection(db, 'orders', order.id, 'messages');
          const lastMessageQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
          const messageSnapshot = await getDocs(lastMessageQuery);
          
          let lastMessage: LastMessage | null = null;
          if (!messageSnapshot.empty) {
            const lastMsgData = messageSnapshot.docs[0].data();
            lastMessage = {
              text: lastMsgData.text,
              timestamp: lastMsgData.timestamp,
              senderName: lastMsgData.senderName
            };
          }
          
          return { ...order, lastMessage };
        });

        // 3. Wait for all fetches to complete
        const resolvedConversations = await Promise.all(conversationPromises);
        setConversations(resolvedConversations);

      } catch (error) {
        console.error("Error fetching conversations:", error);
        toast.error("Could not load your messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <MessageSquare className="text-primary-500" size={32} />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Messages</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Message From</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {conversations.length > 0 ? (
                conversations.map(convo => (
                  <tr key={convo.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-500">
                      <Link to={`/dashboard/orders/${convo.id}`}>#{convo.id.substring(0, 7)}...</Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                      {convo.lastMessage ? convo.lastMessage.senderName : 'No messages yet'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {convo.lastMessage ? `${convo.lastMessage.text.substring(0, 40)}...` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(convo.lastMessage?.timestamp || null)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/dashboard/orders/${convo.id}`} className="btn-secondary text-xs px-3 py-1">
                        View Chat
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <Inbox size={48} className="mx-auto text-gray-300 dark:text-gray-600" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No Conversations</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">You have no messages yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}