export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'dessert' | 'snack' | 'drink';
  image?: string;
}

export interface GameItem {
  id: string;
  title: string;
  genre: string;
  price: number;
  rating: number; // 1-5
  image?: string;
  players?: string;
  playTime?: string;
  difficulty?: 'Lehká' | 'Střední' | 'Pokročilá' | 'Pro experty';
  description?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string
  description: string;
  type: 'tournament' | 'party' | 'workshop';
}

export type PageView = 'HOME' | 'CAFE' | 'GAMING' | 'MEMBERSHIP' | 'RESERVATION' | 'SHOP' | 'ABOUT' | 'ADMIN' | 'EVENTS';

export const AppMode = {
  HOME: 'HOME',
  CAFE: 'CAFE',
  GAMING: 'GAMING',
  ADMIN: 'ADMIN'
};