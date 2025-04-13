
import React, { useState } from 'react';
import { Search, Calendar as CalendarIcon, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const SearchRide: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    passengers: 1,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setSearchData({
      ...searchData,
      [field]: value,
    });
  };

  const handleSearch = () => {
    navigate(`/rides?origin=${searchData.origin}&destination=${searchData.destination}&date=${date ? format(date, 'yyyy-MM-dd') : 'today'}&passengers=${searchData.passengers}`);
  };

  return (
    <div className="rounded-xl bg-white shadow-md overflow-hidden">
      <div className="p-4 space-y-4">
        {/* Origin */}
        <div className="flex items-center space-x-4 border-b pb-3">
          <MapPin className="text-gray-400 flex-shrink-0" size={24} />
          <Input 
            type="text" 
            placeholder="Leaving from"
            className="border-0 p-0 focus:ring-0"
            value={searchData.origin}
            onChange={(e) => handleInputChange('origin', e.target.value)}
          />
        </div>
        
        {/* Destination */}
        <div className="flex items-center space-x-4 border-b pb-3">
          <MapPin className="text-gray-400 flex-shrink-0" size={24} />
          <Input 
            type="text" 
            placeholder="Going to"
            className="border-0 p-0 focus:ring-0"
            value={searchData.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
          />
        </div>
        
        {/* Date with Calendar */}
        <div className="flex items-center space-x-4 border-b pb-3">
          <CalendarIcon className="text-gray-400 flex-shrink-0" size={24} />
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex-1 text-left p-0 focus:outline-none">
                {date ? format(date, 'MMMM d, yyyy') : "Select date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Passengers */}
        <div className="flex items-center space-x-4">
          <User className="text-gray-400 flex-shrink-0" size={24} />
          <Input 
            type="number" 
            placeholder="1"
            className="border-0 p-0 focus:ring-0"
            value={searchData.passengers}
            onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
          />
        </div>
      </div>
      
      {/* Search button */}
      <Button 
        onClick={handleSearch}
        className="w-full bg-primary hover:bg-primary-600 text-white py-4 rounded-none"
      >
        <Search className="mr-2 h-5 w-5" />
        Search
      </Button>
    </div>
  );
};

export default SearchRide;
