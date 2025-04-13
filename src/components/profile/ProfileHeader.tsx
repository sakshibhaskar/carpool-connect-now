
import React from 'react';
import { User } from '@/types';
import { Star, Shield, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  user: User;
  isCurrentUser?: boolean;
  onEditProfile?: () => void;
  onMessage?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  user, 
  isCurrentUser = false,
  onEditProfile,
  onMessage
}) => {
  return (
    <div className="p-5 bg-white">
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24 border-4 border-white shadow-md mb-3">
          {user.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt={`${user.firstName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-3xl text-gray-500 bg-gray-200">
              {user.firstName?.charAt(0) || '?'}
            </div>
          )}
        </Avatar>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">
            {user.firstName} {user.lastName}
          </div>
          
          <div className="flex items-center justify-center mt-1">
            <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
            <span className="mr-3">{user.rating || 4.8}</span>
            <Shield className="h-4 w-4 text-primary mr-1" />
            <span>Verified</span>
          </div>
        </div>
        
        {isCurrentUser ? (
          <Button 
            variant="outline" 
            className="mt-4 rounded-full"
            onClick={onEditProfile}
          >
            Edit profile
          </Button>
        ) : (
          <Button 
            className="mt-4 rounded-full"
            onClick={onMessage}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Message
          </Button>
        )}
      </div>
      
      <div className="flex justify-between mt-6 pt-6 border-t">
        <div className="text-center flex-1">
          <div className="text-xl font-semibold text-secondary">217</div>
          <div className="text-sm text-gray-500">Rides</div>
        </div>
        
        <div className="text-center flex-1 border-x">
          <div className="text-xl font-semibold text-secondary">143</div>
          <div className="text-sm text-gray-500">Reviews</div>
        </div>
        
        <div className="text-center flex-1">
          <div className="text-xl font-semibold text-secondary">2 years</div>
          <div className="text-sm text-gray-500">Member</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
