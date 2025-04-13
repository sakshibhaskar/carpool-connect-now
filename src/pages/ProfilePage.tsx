
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Star, Box, Shield, IdCard } from 'lucide-react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import SOSButton from '@/components/emergency/SOSButton';

const mockUser: User = {
  id: 'user-1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  profilePicture: '/lovable-uploads/8709c341-a273-4678-8345-65a0ccb7e0ec.png',
  dateOfBirth: '1990-01-01',
  gender: 'male',
  rating: 4.9,
  verified: true,
  createdAt: new Date('2021-01-01')
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user] = useState<User>(mockUser);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-primary-500 p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="text-white p-1"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white text-lg font-semibold ml-4">Profile</h1>
        <button 
          onClick={() => navigate('/settings')}
          className="ml-auto text-white p-1"
        >
          <Settings className="h-6 w-6" />
        </button>
      </div>
      
      {/* Profile header */}
      <ProfileHeader 
        user={user}
        isCurrentUser={true}
        onEditProfile={() => navigate('/profile/edit')}
      />
      
      {/* Verification status */}
      <div className="bg-white p-4 mt-4 border-t border-b">
        <h2 className="text-lg font-semibold text-secondary mb-3">Verification</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-green-500 mr-3" />
              <span>ID verified</span>
            </div>
            <span className="text-green-500">✓</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IdCard className="h-5 w-5 text-green-500 mr-3" />
              <span>Driver's license</span>
            </div>
            <span className="text-green-500">✓</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Box className="h-5 w-5 text-gray-400 mr-3" />
              <span>Phone number</span>
            </div>
            <Button 
              variant="ghost"
              size="sm"
              className="text-primary"
              onClick={() => navigate('/profile/verify-phone')}
            >
              Verify
            </Button>
          </div>
        </div>
      </div>
      
      {/* Reviews section */}
      <div className="bg-white p-4 mt-4 border-t border-b">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-secondary">Reviews</h2>
          <Button 
            variant="ghost"
            size="sm"
            className="text-primary"
            onClick={() => navigate('/profile/reviews')}
          >
            See all
          </Button>
        </div>
        
        {/* Sample reviews */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-2">
              <div className="font-medium">Sarah M.</div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span>5.0</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Great driver! Very punctual and the car was clean. Would ride with John again.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-2">
              <div className="font-medium">David L.</div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span>4.8</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Smooth ride and great conversation. John is a reliable driver.
            </p>
          </div>
        </div>
      </div>
      
      {/* Preferences section */}
      <div className="bg-white p-4 mt-4 border-t border-b">
        <h2 className="text-lg font-semibold text-secondary mb-3">Preferences</h2>
        
        <div className="space-y-2 text-gray-600">
          <div>
            <span className="text-gray-500">Chat level:</span> Chatty
          </div>
          <div>
            <span className="text-gray-500">Music:</span> Any genre
          </div>
          <div>
            <span className="text-gray-500">Pets:</span> No pets please
          </div>
          <div>
            <span className="text-gray-500">Smoking:</span> Non-smoking
          </div>
        </div>
      </div>
      
      {/* Emergency contacts */}
      <div className="p-4">
        <Button 
          variant="outline"
          className="w-full"
          onClick={() => navigate('/emergency-contacts')}
        >
          Manage emergency contacts
        </Button>
        
        <div className="mt-4 text-center">
          <button 
            className="text-danger font-medium"
            onClick={() => navigate('/logout')}
          >
            Log out
          </button>
        </div>
      </div>
      
      {/* SOS Button */}
      <SOSButton />
    </div>
  );
};

export default ProfilePage;
