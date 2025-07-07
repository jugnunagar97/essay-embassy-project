import { useState, useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FileText, 
  DollarSign, 
  User, 
  MessageCircle, 
  Paperclip, 
  Send, 
  Download, 
  Edit, 
  CheckCircle,
  ClipboardList,
  FileUp
} from 'lucide-react';
import StatusBadge from '../../components/Common/StatusBadge';
import { format, isValid } from 'date-fns';
import { Order } from '../../types';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

// === FIREBASE IMPORTS ===
import { db } from '../../firebase';
import { doc, onSnapshot, collection, addDoc, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';

// ==================================================================================
// === TYPE DEFINITIONS ===
// ==================================================================================
interface ChatMessage {
  id?: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Timestamp;
}

// ==================================================================================
// === HELPER FUNCTIONS ===
// ==================================================================================
const formatDate = (timestamp: Timestamp | null, formatString: string = 'MMM dd, yyyy HH:mm'): string => {
  if (!timestamp?.toDate) return 'N/A';
  const date = timestamp.toDate();
  return isValid(date) ? format(date, formatString) : 'N/A';
};

const mapStatus = (status: Order['status']): 'pending-payment' | 'in-progress' | 'revision' | 'editing' | 'completed' | 'cancelled' => {
  const validStatuses: { [key: string]: 'pending-payment' | 'in-progress' | 'revision' | 'editing' | 'completed' | 'cancelled' } = {
    'pending': 'pending-payment',
    'pending-payment': 'pending-payment',
    'in-progress': 'in-progress',
    'revision': 'revision',
    'editing': 'editing',
    'completed': 'completed',
    'cancelled': 'cancelled',
  };
  return validStatuses[status] || 'pending-payment';
};

// ==================================================================================
// === MAIN ORDER DETAIL PAGE COMPONENT ===
// ==================================================================================
export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('details'); // State for active tab

  // Effect to fetch the specific order data
  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    const docRef = doc(db, 'orders', orderId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setOrder({ id: doc.id, ...doc.data() } as Order);
      } else {
        toast.error("Order not found.");
        setOrder(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [orderId]);

  // Effect to fetch chat messages for this order
  useEffect(() => {
    if (!orderId) return;
    const messagesRef = collection(db, 'orders', orderId, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ChatMessage));
      setChatMessages(msgs);
    });
    return () => unsubscribe();
  }, [orderId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || !orderId) return;

    const messageData = {
      senderId: user.id,
      senderName: user.name,
      text: newMessage,
      timestamp: serverTimestamp(),
    };

    try {
      const messagesRef = collection(db, 'orders', orderId, 'messages');
      await addDoc(messagesRef, messageData);
      setNewMessage('');
    } catch (error) {
      toast.error("Failed to send message.");
      console.error("Error sending message:", error);
    }
  };

  const paymentStatusClasses: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  }

  if (!order) {
    return <Navigate to="/dashboard" replace />;
  }

  const uploadedFiles = order.files || [];
  const completedFiles = order.completedFiles || [];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Order ID: #{order.id.substring(0, 7)}...</h1>
          <p className="text-muted mt-1">Topic: {order.topic}</p>
        </div>
        <div className="flex items-center gap-4">
          {order.status !== 'completed' && <button className="btn-secondary"><Edit className="mr-2 h-4 w-4"/> Edit Order</button>}
          {order.paymentStatus === 'pending' && <button className="btn-primary"><DollarSign className="mr-2 h-4 w-4"/> Pay for this Order</button>}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content with Tabs */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-6 px-6">
                <button onClick={() => setActiveTab('details')} className={`tab-button ${activeTab === 'details' ? 'tab-active' : 'tab-inactive'}`}>
                  <ClipboardList className="mr-2" size={16} /> Details
                </button>
                <button onClick={() => setActiveTab('files')} className={`tab-button ${activeTab === 'files' ? 'tab-active' : 'tab-inactive'}`}>
                  <FileUp className="mr-2" size={16} /> Files
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Order Details</h3>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                      <div className="flex justify-between"><span className="text-muted">Type of Service:</span> <span className="font-medium text-right">{order.paperType}</span></div>
                      <div className="flex justify-between"><span className="text-muted">Format:</span> <span className="font-medium">{order.citationStyle}</span></div>
                      <div className="flex justify-between"><span className="text-muted">Amount:</span> <span className="font-medium">${order.amount.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span className="text-muted">Writer:</span> <span className="font-medium">{order.writerId || 'Pending'}</span></div>
                      <div className="flex justify-between"><span className="text-muted">Pages:</span> <span className="font-medium">{order.pages} (~{order.words} words)</span></div>
                      <div className="flex justify-between"><span className="text-muted">Deadline:</span> <span className="font-medium">{formatDate(order.deadline)}</span></div>
                      <div className="flex justify-between"><span className="text-muted">Status:</span> <span><StatusBadge status={mapStatus(order.status)} /></span></div>
                      <div className="flex justify-between">
                        <span className="text-muted">Payment:</span> 
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${paymentStatusClasses[order.paymentStatus]}`}>
                          {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-secondary-200 dark:border-secondary-700">
                    <h3 className="font-semibold text-lg mb-4">Instructions</h3>
                    <p className="text-muted text-sm whitespace-pre-wrap">{order.instructions || "No specific instructions were provided."}</p>
                  </div>
                </div>
              )}

              {activeTab === 'files' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-lg mb-4">Files You Uploaded</h4>
                    {uploadedFiles.length > 0 ? uploadedFiles.map((file, index) => (
                      <div key={index} className="bg-secondary-50 dark:bg-secondary-700/50 p-3 rounded-lg flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-muted"/> <span className="font-medium">{file.name}</span> <span className="text-xs text-muted">({(file.size / 1024).toFixed(1)} KB)</span></div>
                        <a href={file.url} download className="btn-icon-sm"><Download className="h-4 w-4"/></a>
                      </div>
                    )) : <p className="text-sm text-muted">No files were uploaded for this order.</p>}
                  </div>
                  <div className="pt-6 border-t border-secondary-200 dark:border-secondary-700">
                    <h4 className="font-medium text-lg mb-4">Completed Files from Writer</h4>
                    {completedFiles.length > 0 ? completedFiles.map((file, index) => (
                      <div key={index} className="bg-green-50 dark:bg-green-900/50 p-3 rounded-lg flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500"/> <span className="font-medium">{file.name}</span> <span className="text-xs text-muted">({(file.size / 1024).toFixed(1)} KB)</span></div>
                        <a href={file.url} download className="btn-icon-sm bg-green-500 hover:bg-green-600 text-white"><Download className="h-4 w-4"/></a>
                      </div>
                    )) : <p className="text-sm text-muted">The writer has not uploaded any completed files yet.</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat History */}
        <div className="lg:col-span-1">
          <div className="card flex flex-col h-[70vh] sticky top-24">
            <h3 className="font-semibold text-lg p-6 border-b border-secondary-200 dark:border-secondary-700">Chat History</h3>
            <div className="flex-grow p-6 space-y-6 overflow-y-auto">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex items-end gap-3 ${msg.senderId === user?.id ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center text-muted flex-shrink-0`}>
                    {msg.senderId === user?.id ? <User size={16}/> : <MessageCircle size={16}/>}
                  </div>
                  <div className={`p-3 rounded-lg max-w-xs ${msg.senderId === user?.id ? 'bg-primary-500 text-white' : 'bg-secondary-100 dark:bg-secondary-700'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.senderId === user?.id ? 'text-primary-100' : 'text-muted'} text-right`}>{formatDate(msg.timestamp, 'HH:mm')}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
              <div className="relative">
                <textarea 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-2 pr-20 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-secondary-50 dark:bg-secondary-900 focus:ring-2 focus:ring-primary-500"
                  rows={2}
                />
                <div className="absolute right-2 top-2 flex items-center gap-1">
                  <button className="btn-icon-sm"><Paperclip className="h-4 w-4"/></button>
                  <button onClick={handleSendMessage} className="btn-primary rounded-md p-2"><Send className="h-4 w-4"/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}