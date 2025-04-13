
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import SOSButton from '@/components/emergency/SOSButton';
import { toast } from 'sonner';
import { Ride } from '@/types';
import { generateMockRides } from '@/lib/utils';

const BookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch user bookings
    const timer = setTimeout(() => {
      // Get some mock rides and mark them as booked
      const mockRides = generateMockRides(3).map(ride => ({
        ...ride,
        status: 'booked'
      }));
      
      setBookings(mockRides);
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

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
        <h1 className="text-xl font-semibold text-secondary ml-4">My Bookings</h1>
      </div>
      
      {/* Bookings list */}
      <div className="p-4">
        {loading ? (
          // Loading skeletons
          [...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 mb-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))
        ) : bookings.length > 0 ? (
          // Bookings list
          bookings.map((booking) => (
            <div 
              key={booking.id}
              className="bg-white rounded-lg p-4 mb-4 border border-gray-100 shadow-sm"
              onClick={() => navigate(`/rides/${booking.id}`)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-500">
                    {new Date(booking.departureTime).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                  Confirmed
                </span>
              </div>
              
              <div className="font-medium text-lg mb-3">
                {booking.origin} → {booking.destination}
              </div>
              
              <div className="flex items-center mt-4">
                <Avatar className="h-8 w-8 mr-3">
                  {booking.driver.profilePicture ? (
                    <img 
                      src={booking.driver.profilePicture} 
                      alt={booking.driver.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="h-5 w-5 text-gray-400" />
                  )}
                </Avatar>
                <div>
                  <div className="font-medium">{booking.driver.name}</div>
                  <div className="text-xs text-gray-500">Driver</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Empty state
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6">
              When you book rides, they will appear here
            </p>
            <Button onClick={() => navigate('/rides')}>Find a ride</Button>
          </div>
        )}
      </div>
      
      {/* SOS Button */}
      <SOSButton />
    </div>
  );
};

export default BookingsPage;
