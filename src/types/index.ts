export interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  amenities: string[];
  prices: {
    platform: string;
    price: number;
    logo: string;
  }[];
}

export interface SearchFilters {
  location: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: number;
  priceRange: [number, number];
  rating: number;
}