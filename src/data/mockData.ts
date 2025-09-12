import { Property } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern 2-bedroom apartment in city center',
    description: 'Beautiful modern apartment with stunning city views. Recently renovated with high-quality materials. Perfect for young professionals or small families.',
    price: 1200,
    currency: 'USD',
    type: 'rent',
    propertyType: 'apartment',
    rooms: 2,
    area: 85,
    floor: 12,
    totalFloors: 20,
    location: {
      city: 'Almaty',
      district: 'Almaty',
      address: 'Abay Avenue 150',
      coordinates: { lat: 43.2220, lng: 76.8512 }
    },
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800',
      'https://images.unsplash.com/photo-1560448204-5e3c8a5b5b5b?w=800'
    ],
    features: ['Balcony', 'Parking', 'Elevator', 'Security', 'Gym'],
    contact: {
      name: 'Aidar K.',
      phone: '+7 777 123 4567',
      email: 'aidar@example.com'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    isActive: true
  },
  {
    id: '2',
    title: 'Luxury 3-bedroom house with garden',
    description: 'Spacious family house with private garden and modern amenities. Located in quiet residential area with excellent schools nearby.',
    price: 250000,
    currency: 'USD',
    type: 'sale',
    propertyType: 'house',
    rooms: 3,
    area: 150,
    floor: 1,
    totalFloors: 2,
    location: {
      city: 'Almaty',
      district: 'Medeu',
      address: 'Kok-Tobe Street 45',
      coordinates: { lat: 43.2500, lng: 76.9500 }
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    ],
    features: ['Garden', 'Parking', 'Fireplace', 'Security', 'Pool'],
    contact: {
      name: 'Marina S.',
      phone: '+7 777 234 5678',
      email: 'marina@example.com'
    },
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
    isActive: true
  },
  {
    id: '3',
    title: 'Cozy studio apartment near university',
    description: 'Perfect studio apartment for students or young professionals. Close to public transport and university campus.',
    price: 450,
    currency: 'USD',
    type: 'rent',
    propertyType: 'studio',
    rooms: 1,
    area: 35,
    floor: 3,
    totalFloors: 5,
    location: {
      city: 'Almaty',
      district: 'Bostandyk',
      address: 'Satpayev Street 90',
      coordinates: { lat: 43.2000, lng: 76.9000 }
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    features: ['Balcony', 'Internet', 'Furnished'],
    contact: {
      name: 'Dmitry A.',
      phone: '+7 777 345 6789',
      email: 'dmitry@example.com'
    },
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    isActive: true
  },
  {
    id: '4',
    title: 'Premium 4-bedroom penthouse',
    description: 'Exclusive penthouse with panoramic city views. High-end finishes and luxury amenities throughout.',
    price: 500000,
    currency: 'USD',
    type: 'sale',
    propertyType: 'apartment',
    rooms: 4,
    area: 200,
    floor: 25,
    totalFloors: 25,
    location: {
      city: 'Almaty',
      district: 'Almaty',
      address: 'Nazarbayev Avenue 200',
      coordinates: { lat: 43.2200, lng: 76.8500 }
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'
    ],
    features: ['Balcony', 'Parking', 'Elevator', 'Security', 'Gym', 'Pool', 'Concierge'],
    contact: {
      name: 'Elena V.',
      phone: '+7 777 456 7890',
      email: 'elena@example.com'
    },
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    isActive: true
  },
  {
    id: '5',
    title: 'Family house with large backyard',
    description: 'Perfect family home with spacious backyard for children. Quiet neighborhood with excellent schools.',
    price: 1800,
    currency: 'USD',
    type: 'rent',
    propertyType: 'house',
    rooms: 3,
    area: 120,
    floor: 1,
    totalFloors: 2,
    location: {
      city: 'Almaty',
      district: 'Zhetysu',
      address: 'Rozybakiev Street 78',
      coordinates: { lat: 43.1800, lng: 76.9200 }
    },
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
    ],
    features: ['Garden', 'Parking', 'Garage', 'Fireplace'],
    contact: {
      name: 'Sergey M.',
      phone: '+7 777 567 8901',
      email: 'sergey@example.com'
    },
    createdAt: '2024-01-11T11:20:00Z',
    updatedAt: '2024-01-11T11:20:00Z',
    isActive: true
  }
];

export const cities = ['Almaty', 'Nur-Sultan', 'Shymkent', 'Aktobe', 'Taraz'];
export const districts = ['Almaty', 'Medeu', 'Bostandyk', 'Zhetysu', 'Turksib'];
export const features = ['Balcony', 'Parking', 'Elevator', 'Security', 'Gym', 'Pool', 'Garden', 'Fireplace', 'Internet', 'Furnished', 'Garage', 'Concierge'];
