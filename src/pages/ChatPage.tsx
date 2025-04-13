
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatInterface from '@/components/chat/ChatInterface';
import { User, Message } from '@/types';
import { generateMockMessages, generateId } from '@/lib/utils';

// Mock current user
const currentUser: User = {
  id: 'current-user',
  firstName: 'You',
  lastName: '',
  email: 'you@example.com',
  verified: true,
  createdAt: new Date()
};

// Mock recipient
const mockRecipients: User[] = [
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    profilePicture: '/lovable-uploads/8709c341-a273-4678-8345-65a0ccb7e0ec.png',
    verified: true,
    createdAt: new Date()
  }
];

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipient, setRecipient] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    if (id) {
      // Find recipient
      const foundRecipient = mockRecipients.find(r => r.id === id) || null;
      setRecipient(foundRecipient);
      
      // Generate mock messages
      if (foundRecipient) {
        const mockMessages = generateMockMessages(currentUser.id, foundRecipient.id, 8);
        setMessages(mockMessages);
      }
    }
  }, [id]);

  const handleSendMessage = (content: string) => {
    if (!recipient) return;
    
    const newMessage: Message = {
      id: generateId(),
      senderId: currentUser.id,
      receiverId: recipient.id,
      content: content,
      read: false,
      createdAt: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  if (!recipient) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading chat...</p>
      </div>
    );
  }

  return (
    <ChatInterface
      recipient={recipient}
      messages={messages}
      onSendMessage={handleSendMessage}
    />
  );
};

export default ChatPage;
