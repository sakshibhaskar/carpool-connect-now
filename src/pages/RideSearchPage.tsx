
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import RideCard from '@/components/rides/RideCard';
import { Ride } from '@/types';
import { generateMockRides } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SOSButton from '@/components/emergency/SOSButton';

const RideSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  // Parse search parameters
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const date = searchParams.get('date') || 'Today';
  const passengers = Number(searchParams.get('passengers')) || 1;

  useEffect(() => {
    // Simulate API call with a slight delay
    const timer = setTimeout(() => {
      const mockRides = generateMockRides(Math.floor(Math.random() * 6) + 4);
      
      // Filter rides based on search criteria
      const filteredRides = mockRides.filter(ride => {
        if (origin && !ride.origin.toLowerCase().includes(origin.toLowerCase())) return false;
        if (destination && !ride.destination.toLowerCase().includes(destination.toLowerCase())) return false;
        if (passengers > ride.availableSeats) return false;
        return true;
      });
      
      setRides(filteredRides);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [origin, destination, date, passengers]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white p-4 shadow-sm flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="p-1"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        
        <div className="text-center flex-1 mx-2">
          <div className="text-secondary font-medium">
            {origin} → {destination}
          </div>
          <div className="text-gray-500 text-sm">
            {date}, {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full"
          onClick={() => {}}
        >
          <Filter className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Results list */}
      <div className="p-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
                <div className="flex justify-between">
                  <div className="w-24 h-6 bg-gray-200 rounded"></div>
                  <div className="w-16 h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center mt-4 pt-4 border-t">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="ml-3">
                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded mt-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : rides.length > 0 ? (
          <div>
            <h2 className="text-secondary font-semibold mb-4">
              {rides.length} {rides.length === 1 ? 'ride' : 'rides'} available
            </h2>
            <div className="space-y-4">
              {rides.map((ride) => (
                <RideCard 
                  key={ride.id} 
                  ride={ride}
                  onClick={() => navigate(`/rides/${ride.id}`)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-center">
            <img 
              src="/lovable-uploads/dcfdc46b-dc19-4942-b1b9-c5435fac5470.png" 
              alt="No rides found"
              className="w-48 h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-medium mb-2">No rides found</h3>
            <p>Try adjusting your search or publish a ride yourself!</p>
            <Button 
              className="mt-6"
              onClick={() => navigate('/publish')}
            >
              Publish a ride
            </Button>
          </div>
        )}
      </div>
      
      {/* SOS Button */}
      <SOSButton />
    </div>
  );
};

export default RideSearchPage;
