
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
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

// Mock data generators
export function generateMockRides(count: number = 10) {
  const rides = [];
  const origins = ['New York', 'Boston', 'San Francisco', 'Los Angeles', 'Chicago', 'Miami'];
  const destinations = ['Washington DC', 'Philadelphia', 'Seattle', 'Austin', 'Denver', 'Portland'];
  
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 14));
    
    const departureTime = `${String(Math.floor(Math.random() * 23)).padStart(2, '0')}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}`;
    const durationHours = 2 + Math.floor(Math.random() * 5);
    const arrivalDate = new Date(date);
    arrivalDate.setHours(arrivalDate.getHours() + durationHours);
    
    rides.push({
      id: `ride-${i + 1}`,
      driverId: `driver-${i + 1}`,
      driver: {
        id: `driver-${i + 1}`,
        firstName: ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah'][i % 6],
        lastName: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller'][i % 6],
        email: `driver${i + 1}@example.com`,
        verified: true,
        rating: 4 + Math.random(),
        createdAt: new Date()
      },
      origin: origins[i % origins.length],
      destination: destinations[i % destinations.length],
      departureDate: date,
      departureTime: departureTime,
      estimatedArrival: arrivalDate.toISOString(),
      availableSeats: 1 + Math.floor(Math.random() * 3),
      price: 20 + Math.floor(Math.random() * 80),
      currency: 'USD',
      status: 'active',
      carModel: ['Honda Civic', 'Toyota Corolla', 'Ford Focus', 'Hyundai Elantra'][i % 4],
      carColor: ['Blue', 'Red', 'Silver', 'Black', 'White'][i % 5],
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

