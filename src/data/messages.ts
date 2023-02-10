export interface FeedInterface {
  date: string;
  id: string;
  title: string;
  contents: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    speed: number;
    heading: number;
  };
  imageUrl?: string;
  category?: string;
}

export interface FeedResponseInterface {
  date: string;
  id: string;
  title: string;
  contents: string;
  location: string;
  imageUrl?: string;
  category?: string;
}
