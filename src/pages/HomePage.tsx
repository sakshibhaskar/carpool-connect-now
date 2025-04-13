
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchRide from '@/components/home/SearchRide';
import RideCard from '@/components/rides/RideCard';
import SOSButton from '@/components/emergency/SOSButton';
import { Ride } from '@/types';
import { generateMockRides } from '@/lib/utils';
import { CircleUser, CarFront, MessageCircle, Search, Bell } from 'lucide-react';

const mockRides = generateMockRides(5);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [rides] = useState<Ride[]>(mockRides);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Background image */}
      <div className="h-32 bg-primary-500">
        <div className="container mx-auto px-4 pt-6">
          <div className="flex justify-between items-center text-white mb-4">
            <h1 className="text-2xl font-bold">CarPool Connect</h1>
            <button 
              onClick={() => navigate('/notifications')}
              className="p-1"
            >
              <Bell className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Search box */}
      <div className="container mx-auto px-4 -mt-12 mb-6">
        <SearchRide />
      </div>
      
      {/* Ride listings */}
      <div className="container mx-auto px-4 flex-1 pb-24">
        <h2 className="text-xl font-semibold text-secondary mb-4">Popular rides</h2>
        
        <div className="space-y-4">
          {rides.map((ride) => (
            <RideCard 
              key={ride.id} 
              ride={ride}
              onClick={() => navigate(`/rides/${ride.id}`)}
            />
          ))}
        </div>
        
        {/* Empty state for when there are no rides */}
        {rides.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-center">
            <img 
              src="/lovable-uploads/dcfdc46b-dc19-4942-b1b9-c5435fac5470.png" 
              alt="No rides found"
              className="w-48 h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-medium mb-2">No rides found</h3>
            <p>Try adjusting your search or publish a ride yourself!</p>
          </div>
        )}
      </div>
      
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex justify-around py-2">
          <button 
            onClick={() => navigate('/home')}
            className="flex flex-col items-center py-1 px-3 text-primary"
          >
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">Search</span>
          </button>
          
          <button 
            onClick={() => navigate('/publish')}
            className="flex flex-col items-center py-1 px-3 text-gray-500"
          >
            <CarFront className="h-6 w-6" />
            <span className="text-xs mt-1">Publish</span>
          </button>
          
          <button 
            onClick={() => navigate('/my-rides')}
            className="flex flex-col items-center py-1 px-3 text-gray-500"
          >
            <CarFront className="h-6 w-6" />
            <span className="text-xs mt-1">Your rides</span>
          </button>
          
          <button 
            onClick={() => navigate('/messages')}
            className="flex flex-col items-center py-1 px-3 text-gray-500"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Messages</span>
          </button>
          
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center py-1 px-3 text-gray-500"
          >
            <CircleUser className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
      
      {/* SOS Button */}
      <SOSButton />
    </div>
  );
};

export default HomePage;
