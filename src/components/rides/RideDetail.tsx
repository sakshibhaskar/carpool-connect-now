
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MessageSquare, Shield, Clock, MapPin, Info, Users, BadgeCheck, Calendar, Car, Luggage, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Ride } from '@/types';
import { formatCurrency, formatTime, formatDate } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface RideDetailProps {
  ride: Ride;
}

const RideDetail: React.FC<RideDetailProps> = ({ ride }) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [seats, setSeats] = useState(1);

  const durationInHours = ride.estimatedArrival
    ? Math.round((new Date(ride.estimatedArrival).getTime() - new Date(ride.departureDate).getTime()) / (1000 * 60 * 60) * 10) / 10
    : 0;

  const handleBooking = () => {
    toast.success(`Booking requested for ${seats} seat(s)!`);
    navigate('/bookings');
  };

  const incrementSeats = () => {
    if (seats < ride.availableSeats) {
      setSeats(seats + 1);
    } else {
      toast.error(`Maximum ${ride.availableSeats} seats available`);
    }
  };

  const decrementSeats = () => {
    if (seats > 1) {
      setSeats(seats - 1);
    }
  };

  const handleContactDriver = () => {
    navigate(`/messages/${ride.driverId}`);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Top navigation */}
      <div className="sticky top-0 z-10 bg-white p-4 border-b">
        <button 
          onClick={() => navigate(-1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
      </div>
      
      {/* Ride details */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-secondary-500 text-sm">
              {formatDate(ride.departureDate)}
            </div>
            <div className="text-xl font-bold text-secondary mt-1">
              {ride.origin} → {ride.destination}
            </div>
          </div>
          
          <div className="text-xl font-bold text-secondary">
            {formatCurrency(ride.price, ride.currency)}
          </div>
        </div>
        
        {/* Time and route */}
        <div className="flex mb-6">
          <div className="relative flex flex-col items-center mr-4">
            <div className="w-3 h-3 rounded-full bg-primary border-4 border-white"></div>
            <div className="h-full border-l-2 border-dashed border-gray-300 mx-auto my-1 flex-1"></div>
            <div className="w-3 h-3 rounded-full bg-primary border-4 border-white"></div>
          </div>
          
          <div className="flex-1">
            <div className="mb-6">
              <div className="text-lg font-semibold text-secondary">{formatTime(ride.departureTime)}</div>
              <div className="text-gray-500">{ride.origin}</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-secondary">{formatTime(ride.estimatedArrival)}</div>
              <div className="text-gray-500">{ride.destination}</div>
            </div>
          </div>
        </div>
        
        {/* Driver info */}
        <div className="p-4 bg-gray-50 rounded-xl mb-6">
          <div className="flex items-center">
            <Avatar className="h-14 w-14 mr-4">
              {ride.driver?.profilePicture ? (
                <img 
                  src={ride.driver.profilePicture} 
                  alt={`${ride.driver.firstName}`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-500 bg-gray-200">
                  {ride.driver?.firstName?.charAt(0) || '?'}
                </div>
              )}
            </Avatar>
            
            <div>
              <div className="text-lg font-medium text-secondary flex items-center">
                {ride.driver?.firstName} {ride.driver?.lastName?.charAt(0) || ''}
                {ride.driver?.verified && (
                  <BadgeCheck className="h-4 w-4 text-primary ml-1" fill="currentColor" />
                )}
              </div>
              
              <div className="flex items-center text-gray-500">
                <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                <span>{ride.driver?.rating || 4.8}</span>
                <span className="mx-1">•</span>
                <span>125 rides</span>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="ml-auto rounded-full"
              onClick={handleContactDriver}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Ride details */}
        <div className="space-y-6">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-secondary">Trip details</h3>
            <button 
              className="text-primary flex items-center"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? (
                <>
                  <span>Less info</span>
                  <ChevronUp className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  <span>More info</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Trip duration</div>
                <div className="font-medium">{durationInHours.toFixed(1)} hours</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Available seats</div>
                <div className="font-medium">{ride.availableSeats}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Car className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Car</div>
                <div className="font-medium">{ride.carModel || 'Honda Civic (Blue)'}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Luggage className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Luggage</div>
                <div className="font-medium">{ride.allowedLuggage || 'Medium'}</div>
              </div>
            </div>
          </div>
          
          {showDetails && (
            <div className="pt-2 space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  Meeting point
                </h4>
                <p className="text-gray-600 text-sm">
                  {ride.description || 'I will be waiting at the main entrance. Please be on time.'}
                </p>
              </div>
              
              {ride.genderPreference && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    Gender preference
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {ride.genderPreference === 'sameGender' ? 'Same gender only' : 'Any gender welcome'}
                  </p>
                </div>
              )}
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-primary" />
                  Safety features
                </h4>
                <div className="text-gray-600 text-sm space-y-2">
                  <p>• Driver ID verified</p>
                  <p>• Emergency contact available</p>
                  <p>• Real-time location sharing</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Booking bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <div className="font-medium text-secondary">Select seats:</div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={decrementSeats}
            >
              <span className="text-lg">-</span>
            </Button>
            <span className="text-lg font-semibold">{seats}</span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={incrementSeats}
            >
              <span className="text-lg">+</span>
            </Button>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex-1 mr-4">
            <div className="text-gray-500">Total price</div>
            <div className="text-xl font-bold text-secondary">
              {formatCurrency(ride.price * seats, ride.currency)}
            </div>
          </div>
          
          <Button className="btn-primary px-8" onClick={handleBooking}>
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RideDetail;
