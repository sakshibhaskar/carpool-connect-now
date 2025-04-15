
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Car } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface Ride {
  id: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  date: Date;
  origin: string;
  destination: string;
  price: number;
  seats: {
    total: number;
    available: number;
  };
  car?: {
    make: string;
    model: string;
    color: string;
  };
  passengers: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  }[];
}

const MyRidesPage = () => {
  const navigate = useNavigate();
  const [rides, setRides] = useState<Ride[]>([]);
  const [filter, setFilter] = useState<string>('upcoming');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockRides: Ride[] = [
        {
          id: 'ride-0',
          status: 'upcoming',
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day in future
          origin: 'Delhi',
          destination: 'Chandigarh',
          price: 400,
          seats: {
            total: 3,
            available: 2
          },
          car: {
            make: 'Maruti',
            model: 'Swift',
            color: 'White'
          },
          passengers: [
            {
              id: 'user-delhi-1',
              firstName: 'Rahul',
              lastName: 'Sharma',
              avatar: '/lovable-uploads/8709c341-a273-4678-8345-65a0ccb7e0ec.png'
            }
          ]
        },
        {
          id: 'ride-1',
          status: 'upcoming',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days in future
          origin: 'San Francisco',
          destination: 'Los Angeles',
          price: 45,
          seats: {
            total: 4,
            available: 2
          },
          car: {
            make: 'Toyota',
            model: 'Prius',
            color: 'Blue'
          },
          passengers: [
            {
              id: 'user-1',
              firstName: 'John',
              lastName: 'Smith',
              avatar: '/lovable-uploads/8709c341-a273-4678-8345-65a0ccb7e0ec.png'
            },
            {
              id: 'user-2',
              firstName: 'Sarah',
              lastName: 'Johnson'
            }
          ]
        },
        {
          id: 'ride-2',
          status: 'ongoing',
          date: new Date(), // Now
          origin: 'Los Angeles',
          destination: 'San Diego',
          price: 35,
          seats: {
            total: 3,
            available: 1
          },
          car: {
            make: 'Honda',
            model: 'Civic',
            color: 'Red'
          },
          passengers: [
            {
              id: 'user-3',
              firstName: 'Michael',
              lastName: 'Brown',
              avatar: '/lovable-uploads/b63d7144-b3e0-4e03-a033-46a27dad4dba.png'
            },
            {
              id: 'user-4',
              firstName: 'Emma',
              lastName: 'Wilson'
            }
          ]
        },
        {
          id: 'ride-3',
          status: 'completed',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          origin: 'San Diego',
          destination: 'Las Vegas',
          price: 65,
          seats: {
            total: 4,
            available: 0
          },
          car: {
            make: 'Tesla',
            model: 'Model 3',
            color: 'White'
          },
          passengers: [
            {
              id: 'user-5',
              firstName: 'Laura',
              lastName: 'Taylor',
              avatar: '/lovable-uploads/b63d7144-b3e0-4e03-a033-46a27dad4dba.png'
            },
            {
              id: 'user-6',
              firstName: 'David',
              lastName: 'Brown'
            },
            {
              id: 'user-7',
              firstName: 'Sophia',
              lastName: 'Martinez'
            },
            {
              id: 'user-8',
              firstName: 'James',
              lastName: 'Anderson'
            }
          ]
        }
      ];
      setRides(mockRides);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRides = rides.filter(ride => {
    if (filter !== 'all' && ride.status !== filter) return false;
    
    if (search) {
      const searchTerm = search.toLowerCase();
      return (
        ride.origin.toLowerCase().includes(searchTerm) ||
        ride.destination.toLowerCase().includes(searchTerm)
      );
    }
    
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'upcoming':
        return <Badge variant="default" className="bg-primary">Upcoming</Badge>;
      case 'ongoing':
        return <Badge variant="default" className="bg-green-600">Ongoing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-600">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-red-600 border-red-600">Cancelled</Badge>;
      default:
        return null;
    }
  };

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
        <h1 className="text-xl font-semibold text-secondary ml-4">My Rides</h1>
      </div>
      
      {/* Search and filters */}
      <div className="p-4 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search rides..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex mt-4 space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filter === 'upcoming' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('ongoing')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filter === 'ongoing' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Ongoing
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filter === 'completed' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filter === 'cancelled' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Cancelled
          </button>
        </div>
      </div>
      
      {/* Rides list */}
      <div className="space-y-4 mt-4 px-4">
        {loading ? (
          // Loading skeleton
          [...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
              <div className="flex justify-between mb-3">
                <div className="w-32 h-5 bg-gray-200 rounded"></div>
                <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded mb-3"></div>
              <div className="flex justify-between items-center">
                <div className="flex">
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-16 h-5 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))
        ) : filteredRides.length > 0 ? (
          filteredRides.map(ride => (
            <div 
              key={ride.id} 
              className="bg-white p-4 rounded-lg shadow-sm"
              onClick={() => navigate(`/rides/${ride.id}`)}
            >
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">
                  {format(ride.date, 'MMM dd, yyyy')} · {format(ride.date, 'h:mm a')}
                </span>
                {getStatusBadge(ride.status)}
              </div>
              
              <div className="text-secondary mb-3">
                <span className="font-semibold">{ride.origin}</span> → <span className="font-semibold">{ride.destination}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex items-center text-sm text-gray-600">
                    {ride.car && (
                      <div className="flex items-center mr-4">
                        <Car className="h-4 w-4 mr-1" />
                        <span>{ride.car.make} {ride.car.model}</span>
                      </div>
                    )}
                    <div>
                      {ride.seats.available}/{ride.seats.total} seats available
                    </div>
                  </div>
                </div>
                
                <span className="text-primary font-semibold">₹{ride.price}</span>
              </div>
              
              {/* Show passengers */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500 mb-2 block">
                  {ride.passengers.length} passenger{ride.passengers.length !== 1 ? 's' : ''}
                </span>
                <div className="flex overflow-hidden">
                  {ride.passengers.slice(0, 4).map((passenger, index) => (
                    <Avatar key={passenger.id} className={`h-8 w-8 border-2 border-white ${index > 0 ? '-ml-2' : ''}`}>
                      {passenger.avatar ? (
                        <img src={passenger.avatar} alt="Passenger" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center text-xs">
                          {passenger.firstName.charAt(0)}
                        </div>
                      )}
                    </Avatar>
                  ))}
                  {ride.passengers.length > 4 && (
                    <div className="h-8 w-8 rounded-full bg-gray-100 -ml-2 flex items-center justify-center text-xs text-gray-600">
                      +{ride.passengers.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-gray-500">No rides found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRidesPage;
