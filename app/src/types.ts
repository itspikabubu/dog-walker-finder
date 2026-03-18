export interface Walker {
  id: number;
  name: string;
  platform: string;
  rating: number;
  reviewCount: number | null;
  pricePerWalk: number | null;
  priceDisplay: string;
  priceNote: string;
  services: string[];
  location: string;
  profileUrl: string;
  website: string | null;
  phone: string | null;
  highlight: string;
  meetsAllFilters: boolean;
  filterNotes: string;
}

export interface WalkerData {
  metadata: {
    location: string;
    lastUpdated: string;
    filters: {
      minRating: number;
      minReviews: number;
      maxPrice: number;
    };
  };
  walkers: Walker[];
}
