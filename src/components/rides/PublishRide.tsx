import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Car, MinusIcon, PlusIcon, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Ride } from '@/types';

const initialRide: Ride = {
  id: "new-ride-1",
  driverId: "d1",
  origin: "Delhi",
  destination: "Chandigarh",
  departureDate: new Date(),
  departureTime: "09:00",
  estimatedArrival: "12:00",
  availableSeats: 2,
  price: 400,
  currency: "₹",
  carModel: "Maruti Swift",
  carColor: "White",
  status: "active",
  createdAt: new Date(),
};

const PublishRide = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ride] = useState<Ride>(initialRide);
  const [formData, setFormData] = useState({
    origin: 'Delhi',
    destination: 'Chandigarh',
    departureDate: '',
    departureTime: '',
    seats: 2,
    price: '400',
    car: 'Maruti Swift',
    luggage: 'medium',
    description: '',
    phoneNumber: '',
    genderPreference: 'any',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const incrementSeats = () => {
    if (formData.seats < 7) {
      setFormData({
        ...formData,
        seats: formData.seats + 1
      });
    }
  };

  const decrementSeats = () => {
    if (formData.seats > 1) {
      setFormData({
        ...formData,
        seats: formData.seats - 1
      });
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.origin || !formData.destination) {
        toast.error('Please enter origin and destination');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.departureDate || !formData.departureTime) {
        toast.error('Please enter departure date and time');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.price) {
        toast.error('Please enter price per seat');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!formData.car) {
        toast.error('Please enter your car details');
        return;
      }
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (isSubmitted) {
      setIsSubmitted(false);
      return;
    }
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    toast.success('Your ride has been published successfully!');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen p-6">
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="p-1 mr-2">
            <ArrowLeft className="h-6 w-6 text-secondary" />
          </button>
          <h1 className="text-xl font-semibold text-secondary">Published Ride Details</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-semibold">{ride.origin}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-semibold">{ride.destination}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold">
                    {ride.departureDate.toLocaleDateString('en-IN', { 
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold">{ride.departureTime}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-sm text-gray-500">Price per seat</p>
                <p className="text-xl font-bold text-secondary">
                  {ride.currency}{ride.price}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Available seats</p>
                  <p className="font-semibold">{ride.availableSeats}</p>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-500">Car details</p>
              <p className="font-semibold">{ride.carModel} ({ride.carColor})</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Gender preference</p>
              <p className="font-semibold">{formData.genderPreference === 'any' ? 'Any gender welcome' : 'Same gender only'}</p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 left-6 right-6">
          <Button 
            className="w-full" 
            onClick={() => navigate('/my-rides')}
          >
            View My Rides
          </Button>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-primary-title">Where are you driving?</h1>
            
            <div className="space-y-5">
              {/* Origin */}
              <div className="relative">
                <div className="absolute left-3 top-3.5">
                  <div className="w-3 h-3 rounded-full bg-primary border-2 border-white"></div>
                </div>
                <Input
                  className="pl-10 input-base"
                  type="text"
                  name="origin"
                  placeholder="Pick-up location"
                  value={formData.origin}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Destination */}
              <div className="relative">
                <div className="absolute left-3 top-3.5">
                  <div className="w-3 h-3 rounded-full bg-primary border-2 border-white"></div>
                </div>
                <Input
                  className="pl-10 input-base"
                  type="text"
                  name="destination"
                  placeholder="Drop-off location"
                  value={formData.destination}
                  onChange={handleInputChange}
                />
              </div>
              
              <p className="text-gray-500 text-sm">
                Enter precise addresses so passengers know exactly where to meet you
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-primary-title">When are you going?</h1>
            
            <div className="space-y-5">
              {/* Departure Date */}
              <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-full">
                <Calendar className="h-5 w-5 text-gray-500" />
                <Input
                  className="border-0 bg-transparent px-2 focus:ring-0"
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Departure Time */}
              <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-full">
                <Clock className="h-5 w-5 text-gray-500" />
                <Input
                  className="border-0 bg-transparent px-2 focus:ring-0"
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Number of Seats */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-secondary mb-3">Number of seats to offer</h2>
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-full">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={decrementSeats}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-lg font-medium">{formData.seats}</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={incrementSeats}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  Make sure every passenger has a seat belt
                </p>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-primary-title">Set your price</h1>
            
            <div className="space-y-5">
              {/* Price */}
              <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-full">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <Input
                  className="border-0 bg-transparent px-2 focus:ring-0"
                  type="number"
                  name="price"
                  placeholder="Price per seat"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-secondary">You'll receive</span>
                  <span className="font-semibold text-secondary">
                    {formData.price ? `${(Number(formData.price) * 0.9).toFixed(2)} USD` : '-'}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  We take a small service fee to cover platform costs
                </p>
              </div>
              
              {/* Preferences */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-secondary mb-3">Luggage size allowed</h2>
                <div className="flex space-x-2">
                  <button
                    className={`flex-1 p-3 rounded-lg border ${
                      formData.luggage === 'small' ? 'border-primary bg-primary-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleSelectChange('luggage', 'small')}
                  >
                    Small
                  </button>
                  <button
                    className={`flex-1 p-3 rounded-lg border ${
                      formData.luggage === 'medium' ? 'border-primary bg-primary-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleSelectChange('luggage', 'medium')}
                  >
                    Medium
                  </button>
                  <button
                    className={`flex-1 p-3 rounded-lg border ${
                      formData.luggage === 'large' ? 'border-primary bg-primary-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleSelectChange('luggage', 'large')}
                  >
                    Large
                  </button>
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-secondary mb-3">Gender preference</h2>
                <div className="flex space-x-2">
                  <button
                    className={`flex-1 p-3 rounded-lg border ${
                      formData.genderPreference === 'any' ? 'border-primary bg-primary-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleSelectChange('genderPreference', 'any')}
                  >
                    Any
                  </button>
                  <button
                    className={`flex-1 p-3 rounded-lg border ${
                      formData.genderPreference === 'sameGender' ? 'border-primary bg-primary-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleSelectChange('genderPreference', 'sameGender')}
                  >
                    Same gender only
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-primary-title">Almost done!</h1>
            
            <div className="space-y-5">
              {/* Car Details */}
              <div>
                <h2 className="text-lg font-semibold text-secondary mb-2">Car information</h2>
                <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-full">
                  <Car className="h-5 w-5 text-gray-500" />
                  <Input
                    className="border-0 bg-transparent px-2 focus:ring-0"
                    type="text"
                    name="car"
                    placeholder="Car model and color (e.g., Blue Honda Civic)"
                    value={formData.car}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold text-secondary mb-2">Additional details (optional)</h2>
                <Textarea
                  className="rounded-2xl bg-gray-100 border-0"
                  name="description"
                  placeholder="Add important details about your ride (meeting point, specific rules, etc.)"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Phone verification */}
              <div>
                <h2 className="text-lg font-semibold text-secondary mb-2">Contact phone (optional)</h2>
                <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-full">
                  <Input
                    className="border-0 bg-transparent px-2 focus:ring-0"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone number for contact"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <p className="text-sm text-yellow-800">
                  By publishing this ride, you agree to our Terms of Service and commit to completing the ride as described.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBack}
          className="p-1 mr-2"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        <h1 className="text-xl font-semibold text-secondary">
          {step === 1 ? 'Publish a Ride' : 
           step === 2 ? 'When & Seats' : 
           step === 3 ? 'Price & Preferences' : 
           'Final Details'}
        </h1>
      </div>
      
      <div className="flex justify-between mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className={`h-1 flex-1 ${i <= step ? 'bg-primary' : 'bg-gray-200'} ${i < 4 ? 'mr-1' : ''}`}
          ></div>
        ))}
      </div>
      
      {renderStep()}
      
      <div className="fixed bottom-6 left-6 right-6 flex space-x-3">
        {step > 1 && (
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        <Button 
          className="flex-1 btn-primary"
          onClick={handleNext}
        >
          {step < 4 ? 'Next' : 'Publish ride'}
        </Button>
      </div>
    </div>
  );
};

export default PublishRide;
