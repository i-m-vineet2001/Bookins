import { Hotel } from '@/types';

export const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    location: 'New York City, USA',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
    description: 'Luxury hotel in the heart of Manhattan with stunning city views.',
    rating: 4.8,
    reviews: 1250,
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Room Service'],
    prices: [
      { platform: 'Booking.com', price: 299, logo: 'https://example.com/booking.png' },
      { platform: 'Expedia', price: 315, logo: 'https://example.com/expedia.png' },
      { platform: 'Hotels.com', price: 289, logo: 'https://example.com/hotels.png' },
    ],
  },
  {
    id: '2',
    name: 'Seaside Resort & Spa',
    location: 'Miami Beach, USA',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
    description: 'Beachfront resort with private beach access and world-class spa.',
    rating: 4.6,
    reviews: 890,
    amenities: ['Beach Access', 'Spa', 'Pool', 'Restaurant', 'Bar', 'Fitness Center'],
    prices: [
      { platform: 'Booking.com', price: 399, logo: 'https://example.com/booking.png' },
      { platform: 'Expedia', price: 385, logo: 'https://example.com/expedia.png' },
      { platform: 'Hotels.com', price: 405, logo: 'https://example.com/hotels.png' },
    ],
  },
  // Add more mock hotels...
];