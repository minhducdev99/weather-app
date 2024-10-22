export interface Coord {
  lon: number;
  lat: number;
}

export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}
