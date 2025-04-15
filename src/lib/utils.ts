
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  // Special handling for Indian Rupee symbol
  if (currency === '₹') {
    currency = 'INR';
    return `₹${new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(amount)}`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(dateObj);
}

export function formatTime(time: string): string {
  if (!time) return '';
  
  // Check if time is in ISO format or just HH:MM format
  if (time.includes('T')) {
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  }
  
  // If it's just HH:MM format
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours, 10);
  const m = minutes || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12; // Convert 0 to 12 for 12 AM
  
  return `${hour}:${m} ${ampm}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function generateMockRides(count: number = 10) {
  const popularRoutes = [
    { origin: 'Mumbai', destination: 'Pune', basePrice: 349 },
    { origin: 'Delhi', destination: 'Chandigarh', basePrice: 299 },
    { origin: 'Bangalore', destination: 'Mysore', basePrice: 249 },
    { origin: 'Chennai', destination: 'Pondicherry', basePrice: 279 },
    { origin: 'Ahmedabad', destination: 'Vadodara', basePrice: 229 },
    { origin: 'Jaipur', destination: 'Ajmer', basePrice: 199 },
  ];

  const indianDrivers = [
    { firstName: 'Rajesh', lastName: 'Kumar', gender: 'male' },
    { firstName: 'Priya', lastName: 'Sharma', gender: 'female', profilePicture: '/lovable-uploads/1cebc420-97f9-4f39-af90-5f342327a793.png' },
    { firstName: 'Amit', lastName: 'Patel', gender: 'male' },
    { firstName: 'Neha', lastName: 'Singh', gender: 'female' },
    { firstName: 'Arjun', lastName: 'Reddy', gender: 'male' },
    { firstName: 'Meera', lastName: 'Verma', gender: 'female' }
  ];

  const rides = [];
  
  for (let i = 0; i < count; i++) {
    const route = popularRoutes[i % popularRoutes.length];
    const driver = indianDrivers[i % indianDrivers.length];
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 7));
    
    const departureTime = `${String(7 + Math.floor(Math.random() * 12)).padStart(2, '0')}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}`;
    const durationHours = 2 + Math.floor(Math.random() * 3);
    const arrivalDate = new Date(date);
    arrivalDate.setHours(arrivalDate.getHours() + durationHours);
    
    rides.push({
      id: `ride-${i + 1}`,
      driverId: `driver-${i + 1}`,
      driver: {
        id: `driver-${i + 1}`,
        firstName: driver.firstName,
        lastName: driver.lastName,
        email: `${driver.firstName.toLowerCase()}@example.com`,
        verified: true,
        rating: 4.5 + Math.random() * 0.4,
        gender: driver.gender,
        profilePicture: driver.profilePicture,
        createdAt: new Date()
      },
      origin: route.origin,
      destination: route.destination,
      departureDate: date,
      departureTime: departureTime,
      estimatedArrival: arrivalDate.toISOString(),
      availableSeats: 1 + Math.floor(Math.random() * 3),
      price: route.basePrice + Math.floor(Math.random() * 100),
      currency: '₹',
      status: 'active',
      carModel: ['Maruti Swift', 'Hyundai i20', 'Honda City', 'Tata Nexon', 'Mahindra XUV300'][i % 5],
      carColor: ['White', 'Silver', 'Grey', 'Black', 'Red'][i % 5],
      createdAt: new Date()
    });
  }
  
  return rides;
}

export function generateMockMessages(userId: string, otherUserId: string, count: number = 10) {
  const messages = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const isFromUser = i % 2 === 0;
    const messageDate = new Date(now);
    messageDate.setMinutes(now.getMinutes() - (count - i) * 5);
    
    messages.push({
      id: `message-${i + 1}`,
      senderId: isFromUser ? userId : otherUserId,
      receiverId: isFromUser ? otherUserId : userId,
      content: [
        "Hey there!",
        "I'm interested in your ride from New York to Boston.",
        "What time will you arrive exactly?",
        "Around 2:30 PM if traffic is good.",
        "Perfect! I'd like to book a seat.",
        "Great! I'll accept your request.",
        "Is there space for a small suitcase?",
        "Yes, no problem at all.",
        "See you tomorrow!",
        "Looking forward to it!"
      ][i],
      read: i < count - 2,
      createdAt: messageDate
    });
  }
  
  return messages;
}
