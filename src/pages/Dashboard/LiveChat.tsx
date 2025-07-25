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
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  Timestamp,
  doc // Added doc import for subcollections
} from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';

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
// === REUSABLE UI SUB-COMPONENTS === (No changes needed here)
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
    <div className={`flex items-start gap-4 mb-4 ${isClient ? 'justify-end' : 'justify-start'}`}> 
      {!isClient && (
        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gray-400 text-white flex items-center justify-center">
          <User size={16} />
        </div>
      )}
      <div className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}> 
        <div className={`px-5 py-4 rounded-2xl max-w-md shadow transition-all duration-200 font-medium text-base
          ${isClient
            ? 'bg-primary-500 text-white rounded-br-none border-2 border-primary-300'
            : 'bg-white dark:bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-none'}
        `}>
          {message.type === 'file' && message.fileUrl ? (
            <div>
              <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" className="underline font-semibold flex items-center gap-1 text-blue-600">
                <Paperclip className="inline h-4 w-4" /> {message.fileName || 'Download file'}
              </a>
              {message.message && message.message !== `[File: ${message.fileName}]` && (
                <p className="text-sm mt-1">{message.message}</p>
              )}
            </div>
          ) : (
            <p className="text-base whitespace-pre-wrap">{message.message}</p>
          )}
        </div>
        <div className="flex items-center mt-2 text-xs text-gray-500">
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
  const { user } = useAuth(); // Get the current authenticated user
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Only proceed if user is logged in
    if (!user?.id) {
      setMessages([]); // Clear messages if no user is logged in
      return; 
    }

    // Reference to the subcollection of messages for the current user
    const userMessagesCollectionRef = collection(db, 'users', user.id, 'messages');
    const q = query(userMessagesCollectionRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ChatMessage));
      setMessages(msgs);
    }, (error) => {
        console.error("Error fetching chat messages: ", error);
        toast.error("Failed to load chat messages.");
    });

    return () => unsubscribe();
  }, [user?.id]); // Re-run effect if user ID changes (e.g., after login/logout)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !fileToUpload) || !user?.id) return;
    setIsUploading(true);
    let messageData: Partial<ChatMessage> = {
      senderId: user.id,
      senderName: user.displayName || (user as any).name || 'User',
      senderRole: user.role,
      timestamp: serverTimestamp() as Timestamp,
    };
    if (fileToUpload) {
      try {
        const filePath = `chat_files/${user.id}/${Date.now()}_${fileToUpload.name}`;
        const fileRef = storageRef(storage, filePath);
        const snapshot = await uploadBytes(fileRef, fileToUpload);
        const url = await getDownloadURL(snapshot.ref);
        messageData = {
          ...messageData,
          type: 'file',
          fileUrl: url,
          fileName: fileToUpload.name,
          message: newMessage.trim() ? newMessage : `[File: ${fileToUpload.name}]`,
          status: 'sent',
        };
      } catch (error) {
        toast.error('File upload failed.');
        setIsUploading(false);
        return;
      }
    } else {
      messageData = {
        ...messageData,
        type: 'text',
        message: newMessage,
        status: 'sent',
      };
    }
    try {
      const userMessagesCollectionRef = collection(db, 'users', user.id, 'messages');
      await addDoc(userMessagesCollectionRef, messageData);
      setNewMessage('');
      setFileToUpload(null);
    } catch (error) {
      toast.error("Couldn't send message. Please try again.");
      console.error('Error sending message:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachFile = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="flex justify-center items-start w-full" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mt-8 mb-8 flex flex-col" style={{ maxWidth: '600px', width: '100%', minHeight: '500px', maxHeight: '600px', marginLeft: '32px' }}>
        <ChatHeader isOnline={true} />
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50" style={{ minHeight: '300px' }}>
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 mb-4 ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                {message.senderId !== user?.id && (
                  <div className="w-7 h-7 rounded-full flex-shrink-0 bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-semibold">
                    <User size={14} />
                  </div>
                )}
                <div className={`flex flex-col ${message.senderId === user?.id ? 'items-end' : 'items-start'}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <div
                    className={`px-5 py-3 rounded-2xl max-w-xs shadow text-sm whitespace-pre-line ${
                      message.senderId === user?.id
                        ? 'bg-green-200 text-gray-900'
                        : 'bg-white text-gray-800'
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
                          className="font-medium underline hover:text-blue-700 transition-colors duration-150 text-blue-700"
                          style={{ fontSize: '0.97em' }}
                        >
                          {message.fileName}
                        </a>
                      </div>
                    ) : null}
                    {message.message}
                  </div>
                  <span className="text-xs text-gray-400 mt-1" style={{ fontSize: '0.75em' }}>
                    {formatDate(message.timestamp)}
                  </span>
                </div>
                {message.senderId === user?.id && (
                  <div className="w-7 h-7 rounded-full flex-shrink-0 bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold border border-green-200">
                    {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-8">No messages yet.</div>
          )}
          <div ref={chatEndRef} />
        </div>
        {fileToUpload && (
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-between mx-4 mb-2">
            <span className="text-sm truncate">{fileToUpload.name}</span>
            <button onClick={() => setFileToUpload(null)} className="text-gray-500 hover:text-gray-700 ml-2">Remove</button>
          </div>
        )}
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setFileToUpload(e.target.files[0]);
              }
            }}
          />
          <MessageInput
            value={newMessage}
            onValueChange={setNewMessage}
            onSendMessage={handleSendMessage}
            onAttachFile={handleAttachFile}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
}