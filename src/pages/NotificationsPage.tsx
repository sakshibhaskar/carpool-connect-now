
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New ride request',
      message: 'John has requested to join your ride to Boston',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false
    },
    {
      id: '2',
      title: 'Ride confirmed',
      message: 'Your ride with Sarah to New York has been confirmed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: false
    },
    {
      id: '3',
      title: 'Rate your experience',
      message: 'How was your ride with Michael? Please leave a rating',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true
    }
  ]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60);
    
    if (diffHrs < 1) {
      const diffMins = Math.round(diffMs / (1000 * 60));
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHrs < 24) {
      const hours = Math.round(diffHrs);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffHrs < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleNotificationClick = (id: string) => {
    // Mark as read
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    
    // In a real app, this would navigate to the relevant screen based on notification type
    navigate('/rides');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-1"
          >
            <ArrowLeft className="h-6 w-6 text-secondary" />
          </button>
          <h1 className="text-xl font-semibold text-secondary ml-4">Notifications</h1>
        </div>
        <button 
          className="text-primary text-sm font-medium"
          onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
        >
          Mark all as read
        </button>
      </div>
      
      {/* Notifications List */}
      <div className="divide-y divide-gray-100">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 ${notification.read ? 'bg-white' : 'bg-primary-50'}`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  {!notification.read && (
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={`font-medium ${notification.read ? 'text-gray-800' : 'text-secondary'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-white text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No notifications</h3>
            <p className="text-gray-500 max-w-xs">
              When you get notifications about your rides or messages, they'll appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
