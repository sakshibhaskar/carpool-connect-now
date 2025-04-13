
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Globe, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would call an authentication service to log out
    toast.success("Logged out successfully");
    setTimeout(() => {
      // Navigate to login page instead of a non-existent logout route
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-1"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        <h1 className="text-xl font-semibold text-secondary ml-4">Settings</h1>
      </div>
      
      {/* Settings Sections */}
      <div className="divide-y divide-gray-100 bg-white">
        {/* Account Section */}
        <div className="p-4">
          <h2 className="font-medium text-secondary mb-3">Account</h2>
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/profile/edit')}
              className="flex items-center justify-between w-full text-left"
            >
              <span>Edit profile</span>
              <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
            </button>
            <button 
              onClick={() => navigate('/emergency-contacts')}
              className="flex items-center justify-between w-full text-left"
            >
              <span>Emergency contacts</span>
              <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
            </button>
          </div>
        </div>
        
        {/* Preferences Section */}
        <div className="p-4">
          <h2 className="font-medium text-secondary mb-3">Preferences</h2>
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/notifications')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-3 text-gray-500" />
                <span>Notifications</span>
              </div>
              <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
            </button>
            <button 
              onClick={() => navigate('/language')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-3 text-gray-500" />
                <span>Language</span>
              </div>
              <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
            </button>
          </div>
        </div>
        
        {/* Support & Privacy Section */}
        <div className="p-4">
          <h2 className="font-medium text-secondary mb-3">Support & Privacy</h2>
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/help')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-3 text-gray-500" />
                <span>Help & Support</span>
              </div>
              <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
            </button>
            <button 
              onClick={() => navigate('/privacy')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-3 text-gray-500" />
                <span>Privacy & Data</span>
              </div>
              <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
            </button>
          </div>
        </div>
        
        {/* Logout Section */}
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full text-danger justify-center"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
