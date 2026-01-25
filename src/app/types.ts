// Type definitions
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  condition: 'new' | 'used' | 'certified';
  imageUrl: string;
  images?: string[]; // Multiple images for the listing
  description: string;
  location: string;
  sellerId: string;
  sellerName: string;
  featured?: boolean;
  isListed?: boolean; // Whether the listing is publicly visible
  // Additional optional fields
  bodyType?: string;
  color?: string;
  doors?: number;
  seats?: number;
  engineSize?: number; // in liters
  horsepower?: number;
  driveType?: 'fwd' | 'rwd' | 'awd' | '4wd';
  owners?: number;
  vin?: string;
  features?: string[];
}

export interface Wheel {
  id: string;
  carId: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  likes: number;
  views: number;
  userId: string;
  userName: string;
  isListed?: boolean; // Whether the wheel is publicly visible
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
}