export interface Walker {
  id: number;
  name: string;
  platform: string;
  rating: number;
  reviewCount: number | null;
  pricePerWalk: number | null;
  priceDisplay: string;
  priceConfirmed: boolean;
  services: string[];
  location: string;
  profileUrl: string;
  website: string | null;
  phone: string | null;
  highlight: string;
  experience: string | null;
  repeatClients: number | null;
}

export interface WalkerData {
  metadata: {
    location: string;
    lastUpdated: string;
    filters: {
      minRating: number;
      minReviews: number;
      maxPrice: number;
      note: string;
    };
  };
  walkers: Walker[];
}
