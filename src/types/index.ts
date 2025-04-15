
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  dateOfBirth?: string;
  gender?: string;
  rating?: number;
  verified: boolean;
  createdAt: Date;
}

export interface Ride {
  id: string;
  driverId: string;
  driver?: User;
  origin: string;
  destination: string;
  departureDate: Date;
  departureTime: string;
  estimatedArrival: string;
  availableSeats: number;
  price: number;
  currency: string; // This accepts any string value including '₹' and 'INR'
  carModel?: string;
  carColor?: string;
  allowedLuggage?: string;
  genderPreference?: string;
  description?: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface Booking {
  id: string;
  rideId: string;
  ride?: Ride;
  passengerId: string;
  passenger?: User;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';
  seats: number;
  price: number;
  currency: string;
  paymentStatus: 'pending' | 'completed' | 'refunded';
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  sender?: User;
  receiverId: string;
  receiver?: User;
  rideId?: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewer?: User;
  reviewedUserId: string;
  reviewedUser?: User;
  rideId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface EmergencyContact {
  id: string;
  userId: string;
  name: string;
  phoneNumber: string;
  relationship: string;
}

export interface SOSAlert {
  id: string;
  userId: string;
  user?: User;
  rideId?: string;
  ride?: Ride;
  location: {
    latitude: number;
    longitude: number;
  };
  status: 'active' | 'resolved';
  createdAt: Date;
  resolvedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'ride' | 'booking' | 'message' | 'payment' | 'system' | 'sos';
  read: boolean;
  data?: any;
  createdAt: Date;
}
