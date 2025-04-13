
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Phone, MoreVertical, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Message } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { formatTime } from '@/lib/utils';

interface ChatInterfaceProps {
  recipient: User;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  recipient, 
  messages, 
  onSendMessage 
}) => {
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat header */}
      <div className="px-4 py-3 bg-white border-b flex items-center">
        <button 
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        
        <Avatar className="h-10 w-10 mr-3">
          {recipient.profilePicture ? (
            <img 
              src={recipient.profilePicture} 
              alt={recipient.firstName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-500 bg-gray-200">
              {recipient.firstName?.charAt(0) || '?'}
            </div>
          )}
        </Avatar>
        
        <div className="flex-1">
          <div className="font-medium text-secondary">
            {recipient.firstName} {recipient.lastName}
          </div>
          <div className="text-xs text-gray-500">
            Usually responds within 30 minutes
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.senderId === recipient.id ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-xl ${
                  message.senderId === recipient.id 
                    ? 'bg-white text-secondary rounded-tl-none' 
                    : 'bg-primary text-white rounded-tr-none'
                }`}
              >
                <div>{message.content}</div>
                <div 
                  className={`text-xs mt-1 ${
                    message.senderId === recipient.id ? 'text-gray-500' : 'text-primary-50'
                  }`}
                >
                  {formatTime(message.createdAt.toISOString())}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <p>No messages yet</p>
            <p className="text-sm">Send a message to start the conversation</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </Button>
          
          <Input
            className="flex-1 rounded-full bg-gray-100 border-0"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          
          <Button 
            onClick={handleSend}
            size="icon"
            disabled={!newMessage.trim()}
            className={`rounded-full ${newMessage.trim() ? 'bg-primary hover:bg-primary-600' : 'bg-gray-200'}`}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
