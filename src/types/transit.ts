export interface TransitStop {
  id: string;
  name: string;
  zone?: string;
  isTerminal?: boolean;
}

export interface Route {
  id: string;
  code: string;
  name: string;
  system: 'TransMilenio' | 'SITP' | 'Metro Medellín' | 'MIO' | 'Transcaribe';
  color: string;
  textColor: string;
  frequencyMinutes: number;
  popularStop: string;
  direction: string;
  scheduleSummary: string;
}

export interface DepartureCalculation {
  route: Route;
  originStop: string;
  walkingMinutes: number;
  bufferMinutes: number;
  nextBusTimestamp: number;
  leaveInMinutes: number;
  statusText: string;
  statusColor: 'emerald' | 'amber' | 'red';
}

export interface FavoriteDestination {
  id: string;
  title: string;
  routeId: string;
  destinationStop: string;
  iconName: string;
}

export interface ExitChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  icon: string;
}

export type TravelActivityState = 'inactive' | 'monitoring' | 'arrived';
