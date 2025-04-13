
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, PlusCircle, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SOSButton from '@/components/emergency/SOSButton';
import { Ride } from '@/types';
import { generateMockRides } from '@/lib/utils';
import { toast } from 'sonner';

const MyRidesPage = () => {
  const navigate = useNavigate();
  const [publishedRides, setPublishedRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch user's published rides
    const timer = setTimeout(() => {
      // Get some mock rides and set them as published by the current user
      const mockRides = generateMockRides(3).map(ride => ({
        ...ride,
        isPublishedByCurrentUser: true
      }));
      
      setPublishedRides(mockRides);
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-1"
          >
            <ArrowLeft className="h-6 w-6 text-secondary" />
          </button>
          <h1 className="text-xl font-semibold text-secondary ml-4">My Rides</h1>
        </div>
        <Button 
          size="sm"
          className="rounded-full"
          onClick={() => navigate('/publish')}
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Publish
        </Button>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="published" className="w-full pt-4">
        <div className="px-4">
          <TabsList className="w-full">
            <TabsTrigger value="published" className="flex-1">Published</TabsTrigger>
            <TabsTrigger value="booked" className="flex-1">Booked</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="published" className="p-4 pt-2">
          {loading ? (
            // Loading skeletons
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 mb-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))
          ) : publishedRides.length > 0 ? (
            // Published rides list
            publishedRides.map((ride) => (
              <div 
                key={ride.id}
                className="bg-white rounded-lg p-4 mb-4 border border-gray-100 shadow-sm"
                onClick={() => navigate(`/rides/${ride.id}`)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">
                      {new Date(ride.departureTime).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                    {ride.availableSeats} seats left
                  </span>
                </div>
                
                <div className="font-medium text-lg mb-3">
                  {ride.origin} → {ride.destination}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{ride.carDetails}</span>
                  </div>
                  <div className="font-semibold text-primary">${ride.price}</div>
                </div>
              </div>
            ))
          ) : (
            // Empty state
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No published rides</h3>
              <p className="text-gray-500 mb-6">
                Start earning by offering rides to others
              </p>
              <Button onClick={() => navigate('/publish')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Publish a ride
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="booked" className="p-4 pt-2">
          <div 
            className="bg-white rounded-lg p-8 text-center"
            onClick={() => navigate('/bookings')}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">View your bookings</h3>
            <p className="text-gray-500 mb-6">
              Check your booked rides
            </p>
            <Button onClick={() => navigate('/bookings')}>
              My Bookings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* SOS Button */}
      <SOSButton />
    </div>
  );
};

export default MyRidesPage;
