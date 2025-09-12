export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'USD' | 'KZT';
  type: 'rent' | 'sale';
  propertyType: 'apartment' | 'house' | 'studio' | 'commercial';
  rooms: number;
  area: number;
  floor: number;
  totalFloors: number;
  location: {
    city: string;
    district: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  features: string[];
  contact: {
    name: string;
    phone: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface SearchFilters {
  type?: 'rent' | 'sale';
  propertyType?: 'apartment' | 'house' | 'studio' | 'commercial';
  minPrice?: number;
  maxPrice?: number;
  minRooms?: number;
  maxRooms?: number;
  minArea?: number;
  maxArea?: number;
  city?: string;
  district?: string;
  features?: string[];
}

export interface SortOption {
  value: string;
  label: string;
}
