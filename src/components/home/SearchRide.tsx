
import React, { useState } from 'react';
import { Search, Calendar, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const SearchRide: React.FC = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    date: 'Today',
    passengers: 1,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setSearchData({
      ...searchData,
      [field]: value,
    });
  };

  const handleSearch = () => {
    navigate(`/rides?origin=${searchData.origin}&destination=${searchData.destination}&date=${searchData.date}&passengers=${searchData.passengers}`);
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
        
        {/* Date */}
        <div className="flex items-center space-x-4 border-b pb-3">
          <Calendar className="text-gray-400 flex-shrink-0" size={24} />
          <Input 
            type="text" 
            placeholder="Today"
            className="border-0 p-0 focus:ring-0"
            value={searchData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />
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
