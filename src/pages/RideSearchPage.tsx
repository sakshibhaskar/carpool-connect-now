
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import RideCard from '@/components/rides/RideCard';
import { Ride, User } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SOSButton from '@/components/emergency/SOSButton';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Hardcoded Indian driver names
const indianDrivers: User[] = [
  {
    id: "d1",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh@example.com",
    verified: true,
    createdAt: new Date(),
    rating: 4.7,
    gender: "male",
  },
  {
    id: "d2",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya@example.com",
    verified: true,
    createdAt: new Date(),
    rating: 4.9,
    gender: "female",
    profilePicture: "/lovable-uploads/1cebc420-97f9-4f39-af90-5f342327a793.png"
  },
  {
    id: "d3",
    firstName: "Amit",
    lastName: "Singh",
    email: "amit@example.com",
    verified: true,
    createdAt: new Date(),
    rating: 4.5,
    gender: "male",
  },
  {
    id: "d4",
    firstName: "Neha",
    lastName: "Patel",
    email: "neha@example.com",
    verified: true,
    createdAt: new Date(),
    rating: 4.8,
    gender: "female",
  },
  {
    id: "d5",
    firstName: "Vikram",
    lastName: "Malhotra",
    email: "vikram@example.com",
    verified: true,
    createdAt: new Date(),
    rating: 4.6,
    gender: "male",
  },
];

// Hardcoded rides from Delhi to Chandigarh
const delhiToChandigarhRides: Ride[] = [
  {
    id: "r1",
    driverId: "d1",
    driver: indianDrivers[0],
    origin: "Delhi",
    destination: "Chandigarh",
    departureDate: new Date(),
    departureTime: "07:00",
    estimatedArrival: new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toISOString(),
    availableSeats: 3,
    price: 349,
    currency: "₹",
    carModel: "Maruti Swift",
    carColor: "White",
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "r2",
    driverId: "d2",
    driver: indianDrivers[1],
    origin: "Delhi",
    destination: "Chandigarh",
    departureDate: new Date(),
    departureTime: "08:30",
    estimatedArrival: new Date(new Date().getTime() + 4.5 * 60 * 60 * 1000).toISOString(),
    availableSeats: 2,
    price: 299,
    currency: "₹",
    carModel: "Hyundai i20",
    carColor: "Silver",
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "r3",
    driverId: "d3",
    driver: indianDrivers[2],
    origin: "Delhi",
    destination: "Chandigarh",
    departureDate: new Date(),
    departureTime: "09:15",
    estimatedArrival: new Date(new Date().getTime() + 4.2 * 60 * 60 * 1000).toISOString(),
    availableSeats: 4,
    price: 399,
    currency: "₹",
    carModel: "Honda City",
    carColor: "Blue",
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "r4",
    driverId: "d4",
    driver: indianDrivers[3],
    origin: "Delhi",
    destination: "Chandigarh",
    departureDate: new Date(),
    departureTime: "10:00",
    estimatedArrival: new Date(new Date().getTime() + 3.8 * 60 * 60 * 1000).toISOString(),
    availableSeats: 1,
    price: 449,
    currency: "₹",
    carModel: "Mahindra XUV300",
    carColor: "Red",
    status: "active",
    createdAt: new Date(),
  },
  {
    id: "r5",
    driverId: "d5",
    driver: indianDrivers[4],
    origin: "Delhi",
    destination: "Chandigarh",
    departureDate: new Date(),
    departureTime: "11:30",
    estimatedArrival: new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toISOString(),
    availableSeats: 3,
    price: 249,
    currency: "₹",
    carModel: "Toyota Innova",
    carColor: "Black",
    status: "active",
    createdAt: new Date(),
  },
];

const RideSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rides, setRides] = useState<Ride[]>([]);
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<string>("none");
  const [showNoRides, setShowNoRides] = useState(false);

  // Parse search parameters
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const dateParam = searchParams.get('date') || '';
  const passengers = Number(searchParams.get('passengers')) || 1;

  useEffect(() => {
    // Simulate API call with a slight delay
    const timer = setTimeout(() => {
      // Check if searching for Delhi to Chandigarh
      const isDelhi = origin.toLowerCase() === 'delhi';
      const isChandigarh = destination.toLowerCase() === 'chandigarh';
      const isToday = !dateParam || new Date(dateParam).toDateString() === new Date().toDateString();
      
      if (isDelhi && isChandigarh && isToday) {
        // Filter hardcoded rides based on passenger count
        const availableRides = delhiToChandigarhRides.filter(ride => 
          passengers <= ride.availableSeats
        );
        
        setRides(availableRides);
        setFilteredRides(availableRides);
        setShowNoRides(availableRides.length === 0);
      } else {
        setRides([]);
        setFilteredRides([]);
        setShowNoRides(true);
      }
      
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [origin, destination, dateParam, passengers]);

  // Apply filters when filter values change
  useEffect(() => {
    let result = [...rides];
    
    // Apply gender filter
    if (genderFilter !== "all") {
      result = result.filter(ride => ride.driver?.gender === genderFilter);
    }
    
    // Apply price sort
    if (priceSort === "lowToHigh") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "highToLow") {
      result = result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredRides(result);
  }, [genderFilter, priceSort, rides]);

  // Reset filters
  const handleResetFilters = () => {
    setGenderFilter("all");
    setPriceSort("none");
  };

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
            {dateParam || 'Today'}, {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
          </div>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Rides</SheetTitle>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              {/* Gender Filter */}
              <div>
                <h3 className="text-base font-semibold mb-3">Driver Gender</h3>
                <RadioGroup 
                  value={genderFilter} 
                  onValueChange={setGenderFilter}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">Show all</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male driver only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female driver only</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Price Filter */}
              <div>
                <h3 className="text-base font-semibold mb-3">Price</h3>
                <Select value={priceSort} onValueChange={setPriceSort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No sorting</SelectItem>
                    <SelectItem value="lowToHigh">Low to High</SelectItem>
                    <SelectItem value="highToLow">High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <SheetFooter className="pt-2">
              <Button 
                variant="outline" 
                onClick={handleResetFilters}
                className="w-full mt-2"
              >
                Reset Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
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
        ) : showNoRides ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-center">
            <img 
              src="/lovable-uploads/dcfdc46b-dc19-4942-b1b9-c5435fac5470.png" 
              alt="No rides found"
              className="w-48 h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-medium mb-2">No such rides available yet.</h3>
            <p>Try searching for Delhi to Chandigarh today.</p>
            <Button 
              className="mt-6"
              onClick={() => navigate('/publish')}
            >
              Publish a ride
            </Button>
          </div>
        ) : filteredRides.length > 0 ? (
          <div>
            <h2 className="text-secondary font-semibold mb-4">
              {filteredRides.length} {filteredRides.length === 1 ? 'ride' : 'rides'} available
            </h2>
            <div className="space-y-4">
              {filteredRides.map((ride) => (
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
            <h3 className="text-lg font-medium mb-2">No rides found with current filters</h3>
            <p>Try adjusting your filters or search criteria</p>
            <Button 
              className="mt-6"
              onClick={handleResetFilters}
            >
              Reset Filters
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
