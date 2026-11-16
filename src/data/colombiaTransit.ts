export interface TransitCitySystem {
  id: string;
  name: string;
  fare: number;
  currency: string;
  systemsList: string[];
  stations: string[];
}

export const COLOMBIA_SYSTEMS: Record<string, TransitCitySystem> = {
  bogota: {
    id: 'bogota',
    name: 'Bogotá (TransMilenio / SITP)',
    fare: 2950,
    currency: 'COP',
    systemsList: ['TransMilenio Troncal', 'SITP Urbano', 'CableAéreo Tunal'],
    stations: [
      'Estación Calle 100',
      'Portal Norte',
      'Calle 72',
      'Héroes',
      'Avenida Chile',
      'Portal Usme',
      'Portal Sur',
      'Universidades',
    ],
  },
  medellin: {
    id: 'medellin',
    name: 'Medellín (Metro / Metrocable)',
    fare: 3210,
    currency: 'COP',
    systemsList: ['Metro Línea A y B', 'Metrocable', 'Metrocable P-J-H-K', 'Tranvía de Ayacucho'],
    stations: [
      'Estación Niquía',
      'Estación Acevedo',
      'Estación Universidad',
      'Estación San Antonio',
      'Estación Poblado',
      'Estación Itagüí',
      'Estación La Estrella',
    ],
  },
  cali: {
    id: 'cali',
    name: 'Cali (MIO)',
    fare: 2900,
    currency: 'COP',
    systemsList: ['MIO Troncal', 'MIO Alimentador', 'MIO Pretroncal'],
    stations: [
      'Terminal Menga',
      'Estación Universidades',
      'Estación San Bosco',
      'Estación Torre de Cali',
      'Terminal Paso del Comercio',
      'Estación Cañaveralejo',
    ],
  },
  cartagena: {
    id: 'cartagena',
    name: 'Cartagena (Transcaribe)',
    fare: 3100,
    currency: 'COP',
    systemsList: ['Transcaribe Troncal', 'Alimentadores'],
    stations: [
      'Patio Portal',
      'Estación Bodeguita',
      'Estación Centro',
      'Estación Bazurto',
      'Estación Los Ejecutivos',
    ],
  },
};
