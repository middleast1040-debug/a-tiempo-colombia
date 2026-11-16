import React, { useState } from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [selectedCity, setSelectedCity] = useState('Bogotá');
  const [destination, setDestination] = useState('Portal Norte');

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col justify-between font-['Plus_Jakarta_Sans',sans-serif]">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-[#0C1424]/80 backdrop-blur-md sticky top-0 z-50 px-4 py-3.5 flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] shadow-lg">
            <div className="w-full h-full rounded-[10.5px] bg-[#070D18] flex items-center justify-center">
              <span className="text-white font-black text-sm">A</span>
            </div>
          </div>
          <div>
            <h2 className="font-black text-base tracking-tight text-white leading-none">A Tiempo</h2>
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Colombia</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-bold">
            Sincronizado GPS
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-3xl mx-auto w-full px-4 py-8 space-y-6 flex-1">
        {/* HERO CARD */}
        <div className="rounded-3xl bg-[#0C1424] border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-cyan-300 text-xs font-bold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {selectedCity}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold">
              Transbordo $0 COP
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Movilidad inteligente <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">puerta a andén</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mb-6">
            Calcula tu salida exacta para TransMilenio, SITP, Metro de Medellín, MIO y Transcaribe sin esperas innecesarias.
          </p>

          {/* INTERACTIVE SELECTOR BOX */}
          <div className="bg-[#070D18] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Sistema</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-[#0C1424] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400"
                >
                  <option>Bogotá (TransMilenio / SITP)</option>
                  <option>Medellín (Metro / Metrocable)</option>
                  <option>Cali (MIO)</option>
                  <option>Cartagena (Transcaribe)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Destino Frecuente</label>
                <input 
                  type="text" 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-[#0C1424] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <button 
              onClick={() => alert('¡Ruta sincronizada con éxito!')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Calcular Salida Exacta</span>
            </button>
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
              <span className="text-base font-bold text-white">4 min al andén</span>
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
        A Tiempo Colombia &mdash; Precisión Urbana y Movilidad Inteligente
      </footer>
    </div>
  );
}
