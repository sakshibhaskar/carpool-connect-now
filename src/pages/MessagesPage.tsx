
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import SOSButton from '@/components/emergency/SOSButton';

interface ChatPreview {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
}

const MessagesPage = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a slight delay
    const timer = setTimeout(() => {
      const mockChats: ChatPreview[] = [
        {
          id: 'chat-1',
          recipientId: 'user-1',
          recipientName: 'John Smith',
          recipientAvatar: '/lovable-uploads/8709c341-a273-4678-8345-65a0ccb7e0ec.png',
          lastMessage: 'See you tomorrow!',
          timestamp: new Date(),
          unread: true
        },
        {
          id: 'chat-2',
          recipientId: 'user-2',
          recipientName: 'Sarah Johnson',
          lastMessage: 'Is there space for a small suitcase?',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          unread: false
        },
        {
          id: 'chat-3',
          recipientId: 'user-3',
          recipientName: 'Michael Brown',
          recipientAvatar: '/lovable-uploads/b63d7144-b3e0-4e03-a033-46a27dad4dba.png',
          lastMessage: 'Perfect! I'll be there.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          unread: false
        }
      ];
      
      setChats(mockChats);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60);
    
    if (diffHrs < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffHrs < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-1"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        <h1 className="text-xl font-semibold text-secondary ml-4">Messages</h1>
      </div>
      
      {/* Chat list */}
      <div className="divide-y divide-gray-100">
        {loading ? (
          // Loading skeleton
          [...Array(3)].map((_, i) => (
            <div key={i} className="flex p-4 bg-white animate-pulse">
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              <div className="ml-4 flex-1">
                <div className="w-32 h-5 bg-gray-200 rounded mb-2"></div>
                <div className="w-48 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-12 text-right">
                <div className="w-10 h-4 bg-gray-200 rounded ml-auto"></div>
              </div>
            </div>
          ))
        ) : chats.length > 0 ? (
          // Chat list
          chats.map(chat => (
            <div 
              key={chat.id} 
              className="flex p-4 bg-white hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/messages/${chat.recipientId}`)}
            >
              <Avatar className="h-12 w-12 flex-shrink-0">
                {chat.recipientAvatar ? (
                  <img 
                    src={chat.recipientAvatar} 
                    alt={chat.recipientName}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 text-lg">
                    {chat.recipientName.charAt(0)}
                  </div>
                )}
              </Avatar>
              
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <span className={`font-medium ${chat.unread ? 'text-secondary' : 'text-gray-700'}`}>
                    {chat.recipientName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(chat.timestamp)}
                  </span>
                </div>
                
                <div className={`mt-1 ${chat.unread ? 'font-medium text-secondary' : 'text-gray-500'}`}>
                  {chat.lastMessage}
                </div>
              </div>
              
              {chat.unread && (
                <div className="ml-2 self-center">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
              )}
            </div>
          ))
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-16 bg-white text-center px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-secondary mb-2">No messages yet</h3>
            <p className="text-gray-500">
              Messages from your rides and bookings will appear here
            </p>
          </div>
        )}
      </div>
      
      {/* SOS Button */}
      <SOSButton />
    </div>
  );
};

export default MessagesPage;
