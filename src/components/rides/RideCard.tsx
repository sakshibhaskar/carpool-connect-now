
import React from 'react';
import { Star, Clock, ZapIcon } from 'lucide-react';
import { Ride } from '@/types';
import { formatCurrency, formatTime } from '@/lib/utils';

interface RideCardProps {
  ride: Ride;
  onClick?: () => void;
}

const RideCard: React.FC<RideCardProps> = ({ ride, onClick }) => {
  const durationInHours = ride.estimatedArrival
    ? Math.round((new Date(ride.estimatedArrival).getTime() - new Date(ride.departureDate).getTime()) / (1000 * 60 * 60) * 10) / 10
    : 0;

  return (
    <div className="card-ride mb-4" onClick={onClick}>
      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between">
          <div>
            <div className="text-xl font-bold text-secondary">
              {formatTime(ride.departureTime)}
            </div>
            <div className="text-gray-500 text-sm">
              {durationInHours.toFixed(1)}h{durationInHours % 1 > 0 ? '' : '00'}
            </div>
          </div>
          
          <div className="text-xl font-bold text-secondary">
            {formatCurrency(ride.price, ride.currency)}
          </div>
        </div>
        
        <div className="flex mt-2">
          <div className="relative flex flex-col items-center mr-4">
            <div className="w-3 h-3 rounded-full bg-primary border-4 border-white"></div>
            <div className="h-full border-l-2 border-dashed border-gray-300 mx-auto my-1"></div>
            <div className="w-3 h-3 rounded-full bg-primary border-4 border-white"></div>
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <div className="text-lg font-semibold text-secondary">{ride.origin}</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-secondary">{ride.destination}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Driver info */}
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
            {ride.driver?.profilePicture ? (
              <img 
                src={ride.driver.profilePicture} 
                alt={`${ride.driver.firstName}`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                {ride.driver?.firstName?.charAt(0) || '?'}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="text-lg font-medium text-gray-700">
            {ride.driver?.firstName} {ride.driver?.lastName?.charAt(0) || ''}
          </div>
          
          <div className="flex items-center text-gray-500">
            <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
            <span>{ride.driver?.rating || 4.8}</span>
          </div>
        </div>
        
        {/* Instant booking indicator */}
        {Math.random() > 0.3 && (
          <div className="ml-auto">
            <ZapIcon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RideCard;
