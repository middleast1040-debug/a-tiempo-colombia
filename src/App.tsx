import React, { useState, useEffect, useMemo } from 'react';
import { Route, DepartureCalculation } from './types/transit';
import { COLOMBIA_SYSTEMS, TransitCitySystem } from './data/colombiaTransit';
import { calculateDeparture } from './utils/transitCalculator';
import { MapPin, Navigation, Clock, ShieldCheck, Zap, ArrowRightLeft, Footprints, Gauge } from 'lucide-react';

const MOCK_ROUTES: Route[] = [
  {
    id: 'tm-h27',
    code: 'H27',
    name: 'Portal Usme — Calle 100',
    system: 'TransMilenio',
    color: 'bg-red-600',
    textColor: 'text-white',
    frequencyMinutes: 6,
    popularStop: 'Estación Calle 100',
    direction: 'Sur',
    scheduleSummary: 'Cada 6 min',
  },
  {
    id: 'sitp-c15',
    code: 'C15',
    name: 'Usaquén — Centro Internacional',
    system: 'SITP',
    color: 'bg-blue-600',
    textColor: 'text-white',
    frequencyMinutes: 10,
    popularStop: 'Paradero Cra 7',
    direction: 'Centro',
    scheduleSummary: 'Cada 10 min',
  },
];

export default function App() {
  const [selectedCityId, setSelectedCityId] = useState<string>('bogota');
  const currentCitySystem: TransitCitySystem = useMemo(() => {
    return COLOMBIA_SYSTEMS[selectedCityId] || COLOMBIA_SYSTEMS.bogota;
  }, [selectedCityId]);

  const [walkingMinutes, setWalkingMinutes] = useState<number>(5);
  const [bufferMinutes, setBufferMinutes] = useState<number>(1);
  const [currentTimeMs, setCurrentTimeMs] = useState<number>(Date.now());
  const [selectedRouteId, setSelectedRouteId] = useState<string>('tm-h27');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTimeMs(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentRoute = useMemo(() => {
    return MOCK_ROUTES.find((r) => r.id === selectedRouteId) || MOCK_ROUTES[0];
  }, [selectedRouteId]);

  const calculation: DepartureCalculation = useMemo(() => {
    return calculateDeparture(currentRoute, currentCitySystem.stations[0], walkingMinutes, bufferMinutes, currentTimeMs);
  }, [currentRoute, currentCitySystem, walkingMinutes, bufferMinutes, currentTimeMs]);

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col justify-between font-['Plus_Jakarta_Sans',sans-serif]">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-[#0C1424]/80 backdrop-blur-md sticky top-0 z-50 px-4 py-3.5 flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0A2540] to-[#00D4AA] p-[1.5px] shadow-lg">
            <div className="w-full h-full rounded-[10.5px] bg-[#070D18] flex items-center justify-center">
              <span className="text-white font-black text-sm">A</span>
            </div>
          </div>
          <div>
            <h2 className="font-black text-base tracking-tight text-white leading-none">A Tiempo</h2>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00E5A8]">Colombia</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Sincronizado GPS
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-4xl mx-auto w-full px-4 py-8 space-y-6 flex-1">
        {/* HERO BANNER */}
        <div className="rounded-3xl bg-[#0C1424] border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-600/10 to-[#00D4AA]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {currentCitySystem.name}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              Pasaje ${currentCitySystem.fare.toLocaleString('es-CO')} · Transbordo $0
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3 leading-tight">
            Movilidad inteligente <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#00E5A8]">puerta a andén</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mb-6">
            Calcula tu salida exacta y evita esperas prolongadas en los paraderos y estaciones de Colombia.
          </p>

          {/* SELECTOR DE CIUDAD Y PARADA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#070D18] border border-slate-800 p-4 rounded-2xl">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Sistema de Ciudad</label>
              <select
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                className="w-full bg-[#0C1424] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400"
              >
                {Object.values(COLOMBIA_SYSTEMS).map((sys) => (
                  <option key={sys.id} value={sys.id}>
                    {sys.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Estación Principal</label>
              <select
                className="w-full bg-[#0C1424] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400"
              >
                {currentCitySystem.stations.map((st, idx) => (
                  <option key={idx} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* TARJETA DE RESULTADO DE SALIDA */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0C1424] to-[#080E1B] border border-slate-800 p-6 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-black text-sm tracking-wider">
                {calculation.route.code}
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{calculation.route.name}</h3>
                <span className="text-xs text-slate-400">Frecuencia estimada: {calculation.route.scheduleSummary}</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold">
              {calculation.route.system}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-2 bg-[#070D18] border border-slate-800 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                {calculation.statusText}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Sal en <span className="text-[#00E5A8]">{calculation.leaveInMinutes} minutos</span>
              </div>
              <p className="text-xs text-slate-400">
                Calculado con {walkingMinutes} min de caminata hacia el andén y {bufferMinutes} min de margen.
              </p>
            </div>

            <div className="bg-[#070D18] border border-slate-800 p-5 rounded-2xl flex flex-col justify-center space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Footprints className="w-3.5 h-3.5 text-cyan-400" /> Caminata</span>
                <strong className="text-white">{walkingMinutes} min</strong>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5 text-emerald-400" /> Margen</span>
                <strong className="text-white">{bufferMinutes} min</strong>
              </div>
              <button
                onClick={() => alert('¡Sincronización de ruta actualizada!')}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-[#00D4AA] text-slate-950 font-bold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Actualizar Estado</span>
              </button>
            </div>
          </div>
        </div>

        {/* STATUS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0C1424] border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 bg-blue-950 text-cyan-400 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Ventana Ideal</span>
              <span className="text-base font-bold text-white">Precisión GPS</span>
            </div>
          </div>

          <div className="bg-[#0C1424] border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Estado TuLlave</span>
              <span className="text-base font-bold text-white">Saldo Activo</span>
            </div>
          </div>

          <div className="bg-[#0C1424] border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 bg-purple-950 text-purple-400 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Modo Offline</span>
              <span className="text-base font-bold text-white">Sincronizado</span>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-[#0C1424]/50 py-4 text-center text-xs text-slate-500">
        A Tiempo Colombia &mdash; Movilidad Inteligente sin Esperas
      </footer>
    </div>
  );
}
