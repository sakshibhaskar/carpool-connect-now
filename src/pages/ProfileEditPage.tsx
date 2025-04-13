
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { User as UserType } from '@/types';
import { Avatar } from '@/components/ui/avatar';

const ProfileEditPage = () => {
  const navigate = useNavigate();

  // Mock user data - in a real app, this would come from authentication context
  const [user, setUser] = useState<UserType>({
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
  });

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    bio: 'I enjoy road trips and meeting new people. Love listening to podcasts while driving.',
    phone: '+1 (234) 567-8901',
    location: 'San Francisco, CA'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Update user data
    setUser({
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });

    // Show success message
    toast.success('Profile updated successfully');
    
    // Navigate back
    navigate('/profile');
  };

  const handleImageUpload = () => {
    // Simulate image upload with a random avatar
    const avatars = [
      '/lovable-uploads/8709c341-a273-4678-8345-65a0ccb7e0ec.png',
      '/lovable-uploads/b63d7144-b3e0-4e03-a033-46a27dad4dba.png',
      '/lovable-uploads/b17b6fab-90bd-4ac0-aa4d-0d79a66be01b.png'
    ];
    
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    
    setUser({
      ...user,
      profilePicture: randomAvatar
    });
    
    toast.success('Profile picture updated successfully');
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
          <h1 className="text-xl font-semibold text-secondary ml-4">Edit Profile</h1>
        </div>
        <button 
          className="text-primary font-medium"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      
      {/* Profile Picture */}
      <div className="bg-white p-6 flex flex-col items-center">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-white shadow-md">
            {user.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt={formData.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-3xl text-gray-500 bg-gray-200">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </Avatar>
          <button 
            className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md"
            onClick={handleImageUpload}
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Edit Form */}
      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-md">
          <h2 className="font-medium text-secondary mb-3">Personal Information</h2>
          
          <div className="space-y-3">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                Tell other users about yourself
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-md">
          <h2 className="font-medium text-secondary mb-3">Contact Information</h2>
          
          <div className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                value={user.email}
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
