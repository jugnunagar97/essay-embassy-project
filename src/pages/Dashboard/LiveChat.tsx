// src/pages/Dashboard/LiveChat.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Paperclip,
  MessageCircle,
  User,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { format, isValid } from 'date-fns';
import toast from 'react-hot-toast';

// === FIREBASE IMPORTS ===
import { db } from '../../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';

// ==================================================================================
// === TYPE DEFINITIONS & HELPERS (with Firestore Timestamp) ===
// ==================================================================================
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

const formatDate = (timestamp: Timestamp | null, formatString: string = 'HH:mm'): string => {
  if (!timestamp?.toDate) return '';
  const date = timestamp.toDate();
  if (!isValid(date)) return '';
  return format(date, formatString);
};

// ==================================================================================
// === REUSABLE UI SUB-COMPONENTS ===
// ==================================================================================
const ChatHeader: React.FC<{ isOnline: boolean }> = ({ isOnline }) => (
  <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-500 to-primary-600 rounded-t-xl">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-white p-2 rounded-full"><MessageCircle className="text-primary-500" size={24} /></div>
        <div>
          <h2 className="text-xl font-bold text-white">Live Chat Support</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            <span className="text-primary-100 text-sm">{isOnline ? 'Support team is online' : 'Support team is offline'}</span>
          </div>
        </div>
      </div>
      <div className="text-primary-100 text-sm flex items-center">
        <Clock size={16} className="inline mr-1" />
        Usually replies in minutes
      </div>
    </div>
  </div>
);

const MessageBubble: React.FC<{ message: ChatMessage; currentUserId: string | undefined }> = ({ message, currentUserId }) => {
  const isClient = message.senderId === currentUserId;
  return (
    <div className={`flex items-start gap-3 ${isClient ? 'justify-end' : 'justify-start'}`}>
      {!isClient && (
        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gray-500 text-white flex items-center justify-center">
          <User size={16} />
        </div>
      )}
      <div className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl max-w-xs lg:max-w-md ${
          isClient
            ? 'bg-primary-500 text-white rounded-br-none'
            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-bl-none'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
        </div>
        <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span>{formatDate(message.timestamp)}</span>
          {isClient && (
            <div className="ml-2">
              <CheckCircle size={12} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MessageInput: React.FC<{
  value: string;
  onValueChange: (value: string) => void;
  onSendMessage: () => void;
  onAttachFile: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}> = ({ value, onValueChange, onSendMessage, onAttachFile, onKeyPress }) => (
  <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-xl">
    <div className="flex items-center space-x-3">
      <button onClick={onAttachFile} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg" title="Attach file">
        <Paperclip size={20} />
      </button>
      <div className="flex-1 relative">
        <textarea
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Type your message..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none"
          rows={1}
        />
      </div>
      <button onClick={onSendMessage} disabled={!value.trim()} className="bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white p-3 rounded-lg">
        <Send size={20} />
      </button>
    </div>
    <div className="text-center mt-2 text-xs text-gray-500 dark:text-gray-400">
      Press Enter to send, Shift+Enter for a new line.
    </div>
  </div>
);

// ==================================================================================
// === MAIN LIVE CHAT COMPONENT ===
// ==================================================================================
export default function LiveChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messagesCollectionRef = collection(db, 'live-chat-messages');
    const q = query(messagesCollectionRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ChatMessage));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: user?.id || 'client_guest',
      senderName: user?.name || 'Client',
      senderRole: 'client' as const,
      message: newMessage,
      timestamp: serverTimestamp(),
      type: 'text' as const,
      status: 'sent' as const,
    };

    try {
      const messagesCollectionRef = collection(db, 'live-chat-messages');
      await addDoc(messagesCollectionRef, messageData);
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
      toast.error("Couldn't send message. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <ChatHeader isOnline={true} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-gray-900">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} currentUserId={user?.id} />
        ))}
        <div ref={chatEndRef} />
      </div>

      <MessageInput 
        value={newMessage}
        onValueChange={setNewMessage}
        onSendMessage={handleSendMessage}
        onAttachFile={() => toast.error("File attachments will be added next!")}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}