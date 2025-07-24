import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Send,
  Paperclip,
  User as UserIcon, 
  CheckCircle,
  Search,
  ChevronLeft, 
  ChevronRight, 
  X 
} from 'lucide-react'; 
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';
import { format, isValid } from 'date-fns';

// Firebase Imports
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  Timestamp,
  getDocs,
  limit 
} from 'firebase/firestore'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Types (replicated for self-containment, but ideally imported from ../../types)
interface ChatMessage {
  id?: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'admin';
  message: string;
  timestamp: Timestamp;
  type: 'text' | 'file';
  fileUrl?: string;
  fileName?: string;
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string; // User ID
  name: string;
  email: string;
  lastMessage: string;
  lastMessageTimestamp: Timestamp;
  unreadCount: number; 
}

// Helper function to format timestamps
const formatTimestamp = (timestamp: Timestamp | null, formatStr: string = 'p'): string => {
  if (!timestamp?.toDate) return '';
  const date = timestamp.toDate();
  if (!isValid(date)) return '';
  return format(date, formatStr);
};

// Main Admin Messages Component
export default function AdminMessages() { 
  const { user: adminUser, isLoading: authLoading } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false); 
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [isConversationListOpen, setIsConversationListOpen] = useState(true); 


  // 1. Fetch all conversations (users who have sent messages)
  useEffect(() => {
    if (!adminUser) return;

    const fetchConversations = async () => {
      try {
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef); 

        const unsubscribe = onSnapshot(q, async (snapshot) => {
          const convos: Conversation[] = [];
          await Promise.all(snapshot.docs.map(async (userDoc) => {
            const userId = userDoc.id;
            const userName = userDoc.data().name;
            const userEmail = userDoc.data().email;

            const messagesRef = collection(db, 'users', userId, 'messages');
            const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(1)); 

            const messagesSnapshot = await getDocs(messagesQuery); 
            if (!messagesSnapshot.empty) {
              const lastMessageDoc = messagesSnapshot.docs[0];
              const lastMessageData = lastMessageDoc.data() as ChatMessage;
              convos.push({
                id: userId,
                name: userName,
                email: userEmail,
                lastMessage: lastMessageData.message,
                lastMessageTimestamp: lastMessageData.timestamp,
                unreadCount: 0 
              });
            }
          }));
          
          convos.sort((a, b) => (b.lastMessageTimestamp as any)?.toDate().getTime() - (a.lastMessageTimestamp as any)?.toDate().getTime());
          setConversations(convos);
          
          if (!selectedConversation && convos.length > 0) {
            setSelectedConversation(convos[0]);
          }
        }, (err) => {
          console.error("Error fetching conversations:", err);
          toast.error("Failed to load conversations.");
        });

        return () => unsubscribe();
      } catch (err) {
        console.error("Error setting up conversation listener:", err);
      }
    };

    fetchConversations();
  }, [adminUser, selectedConversation]); 

  // 2. Fetch messages for selected conversation
  useEffect(() => {
    if (!selectedConversation?.id) {
      setMessages([]); 
      return;
    }

    const messagesCollectionRef = collection(db, 'users', selectedConversation.id, 'messages');
    const q = query(messagesCollectionRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        ...doc.data() as ChatMessage, 
        id: doc.id
      }));
      setMessages(msgs);
    }, (err) => {
      console.error("Error fetching chat messages for conversation:", err);
      toast.error("Failed to load messages for this conversation.");
    });

    return () => unsubscribe();
  }, [selectedConversation]); 

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  // Handle sending messages (text and files)
  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim() && filesToUpload.length === 0) return;
    if (!selectedConversation?.id) {
      toast.error("Please select a conversation to send a message.");
      return;
    }

    setIsSending(true);
    let messageContent = newMessage;
    let messageType: ChatMessage['type'] = 'text';
    let fileUrl: string | undefined = undefined;
    let fileName: string | undefined = undefined;

    try {
      // 1. Upload files if any
      if (filesToUpload.length > 0) {
        setIsUploading(true);
        const file = filesToUpload[0]; 
        const fileRef = ref(db.storage, `chat_files/${selectedConversation.id}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(snapshot.ref);
        fileName = file.name;
        messageType = 'file';
        messageContent = newMessage.trim() ? newMessage : `[File: ${fileName}]`; 
        toast.success(`File ${fileName} uploaded.`);
        setIsUploading(false);
      }

      // 2. Send message to Firestore
      // Only include fileUrl and fileName if they are defined
      const messageData: any = {
        senderId: adminUser?.id || 'admin_guest',
        senderName: adminUser?.displayName || 'Admin',
        senderRole: 'admin',
        message: messageContent,
        timestamp: serverTimestamp() as Timestamp,
        type: messageType,
        status: 'sent', 
      };
      if (fileUrl) messageData.fileUrl = fileUrl;
      if (fileName) messageData.fileName = fileName;

      const messagesCollectionRef = collection(db, 'users', selectedConversation.id, 'messages');
      await addDoc(messagesCollectionRef, messageData);

      setNewMessage('');
      setFilesToUpload([]);
      toast.success("Message sent!");

    } catch (error) {
      console.error("Error sending message or uploading file:", error);
      toast.error("Failed to send message.");
    } finally {
      setIsSending(false);
      setIsUploading(false);
    }
  }, [newMessage, filesToUpload, selectedConversation, adminUser]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFilesToUpload(Array.from(e.target.files)); 
    }
  };

  const handleDrop = (e: React.DragEvent) => { 
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFilesToUpload(Array.from(e.dataTransfer.files));
    }
  };

  // Removed the unused 'removeFile' function
  // const removeFile = (index: number) => { 
  //   setFilesToUpload(prev => prev.filter((_, i) => i !== index));
  // };


  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 lg:p-8 flex h-[calc(100vh-8rem)]"> 
      {/* Conversation List Sidebar */}
      <div className={`
        ${isConversationListOpen ? 'w-full lg:w-80' : 'w-0'} 
        flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 
        overflow-hidden transition-all duration-300 ease-in-out flex flex-col
        ${selectedConversation ? 'hidden lg:flex' : 'flex'} 
      `}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-bold">Conversations</h2>
          <button onClick={() => setIsConversationListOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Search conversations..."
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length > 0 ? (
            conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => {
                  setSelectedConversation(conv);
                  setIsConversationListOpen(false); 
                }}
                className={`w-full text-left p-4 border-b border-gray-100 dark:border-gray-700 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                  ${selectedConversation?.id === conv.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-primary-200 dark:bg-primary-700 flex items-center justify-center text-white font-semibold flex-shrink-0 mr-3">
                  {conv.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{conv.name}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimestamp(conv.lastMessageTimestamp, 'p')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{conv.lastMessage}</p>
                  {/* Future: Unread count badge */}
                </div>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 p-4">No conversations yet.</p>
          )}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className={`
        flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col
        ${selectedConversation ? 'ml-0 lg:ml-6' : 'hidden lg:flex ml-6'} 
      `}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <button onClick={() => setIsConversationListOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700 mr-2">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-200 dark:bg-primary-700 flex items-center justify-center text-white font-semibold flex-shrink-0 mr-3">
                        {selectedConversation.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{selectedConversation.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Online</p> 
                    </div>
                </div>
                {/* Future: Call, Video, User Profile buttons */}
            </div>

            {/* Messages Display */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.length > 0 ? (
                messages.map((message) => {
                  const isAdmin = message.senderRole === 'admin';
                  return (
                    <div
                      key={message.id}
                      className={`flex items-end gap-2 mb-2 ${isAdmin ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isAdmin && (
                        <div className="w-7 h-7 rounded-full flex-shrink-0 bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-semibold">
                          <UserIcon size={14} />
                        </div>
                      )}
                      <div className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <div
                          className={`px-4 py-2 rounded-xl max-w-xs shadow-sm text-sm whitespace-pre-line ${
                            isAdmin
                              ? 'bg-[#e6f0fa] text-gray-900'
                              : 'bg-[#f5f5f5] text-gray-800'
                          }`}
                          style={{ lineHeight: 1.5 }}
                        >
                          {message.fileUrl && message.fileName ? (
                            <div className="flex items-center mb-1">
                              <Paperclip size={16} className="w-4 h-4 mr-1 text-blue-500" />
                              <a
                                href={message.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`font-medium underline hover:text-blue-700 transition-colors duration-150 ${isAdmin ? 'text-blue-700' : 'text-blue-600'}`}
                                style={{ fontSize: '0.97em' }}
                              >
                                {message.fileName}
                              </a>
                            </div>
                          ) : null}
                          {message.message}
                        </div>
                        <span className="text-xs text-gray-400 mt-1" style={{ fontSize: '0.75em' }}>
                          {formatTimestamp(message.timestamp, 'p')}
                        </span>
                      </div>
                      {isAdmin && (
                        <div className="w-7 h-7 rounded-full flex-shrink-0 bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-bold border border-blue-300">
                          {adminUser?.displayName?.charAt(0).toUpperCase() || 'A'}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-gray-400 text-center py-8">No messages yet.</div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              {filesToUpload.length > 0 && (
                  <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-between">
                      <span className="text-sm truncate">{filesToUpload[0].name}</span>
                      <button onClick={() => setFilesToUpload([])} className="text-gray-500 hover:text-gray-700 ml-2">
                          <X size={16} />
                      </button>
                  </div>
              )}
              <div 
                className="flex items-center space-x-3"
                onDrop={handleDrop} 
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
              >
                <label 
                    htmlFor="file-upload" 
                    className={`p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="Attach file"
                >
                  <Paperclip size={20} />
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 px-4 py-2 border rounded-lg resize-none dark:bg-gray-700 dark:text-white ${isDragOver ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-gray-300 dark:border-gray-600'}`} 
                  rows={1}
                  disabled={isSending || isUploading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isSending || isUploading || (!newMessage.trim() && filesToUpload.length === 0)}
                  className="bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white p-3 rounded-lg flex items-center justify-center"
                >
                  {isSending || isUploading ? (
                    <LoadingSpinner size="sm" className="text-white" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg">
            <p className="hidden lg:block">Select a conversation from the left.</p>
            <button onClick={() => setIsConversationListOpen(true)} className="lg:hidden bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center">
                <ChevronRight size={20} className="mr-2" /> Open Conversations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
