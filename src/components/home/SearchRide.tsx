
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { cn } from '@/lib/utils';

const SearchRide = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<Date>();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/rides', {
      state: {
        origin,
        destination,
        date: date ? date.toISOString() : undefined
      }
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <form onSubmit={handleSearch} className="space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Leaving from..."
            className="pl-10"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Going to..."
            className="pl-10"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        
        <DatePicker 
          date={date} 
          setDate={setDate} 
          className={cn("border border-gray-200")}
          placeholder="Select date (optional)"
        />
        
        <Button type="submit" className="w-full gap-2">
          <SearchIcon className="h-4 w-4" />
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchRide;
