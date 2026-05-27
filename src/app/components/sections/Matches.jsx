import React from 'react';
import { Calendar, MapPin, Tv, Sparkles, Activity } from 'lucide-react';

export default function Matches({ nextMatches }) {
  return (
    <section id="partidos" className="py-24 px-4 bg-gradient-to-b from-[#0c0c0c] via-black to-[#121212] border-t border-[#FFD700]/5 overflow-hidden relative">
      {/* Subtle Background Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[10px] uppercase tracking-widest text-[#FFD700] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Calendario de Combates
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Próximos <span className="text-[#FFD700]">Partidos</span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Matches Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {nextMatches.map((match, index) => {
            // Simulated opponent acronym
            const oppAcronym = match.opponent.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase();
            const isFirst = index === 0;

            return (
              <div 
                key={index} 
                className={`bg-[#0b0b0b] border rounded-2xl p-6 transition-all duration-300 hover:scale-103 flex flex-col justify-between relative group ${
                  isFirst 
                    ? 'border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.1)]' 
                    : 'border-zinc-950 hover:border-[#FFD700]/30'
                }`}
              >
                {/* Glowing corner bracket decorators */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#FFD700]/30 z-10"></div>
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#FFD700]/30 z-10"></div>

                <div>
                  {/* Top Header Tag */}
                  <div className="flex items-center justify-between mb-6 border-b border-zinc-900 pb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FFD700]">
                      <Calendar className="w-4 h-4" />
                      <span>{match.date}</span>
                    </div>

                    {isFirst ? (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-red-600/10 border border-red-500/20 text-[8px] font-black uppercase text-red-500 tracking-widest animate-pulse">
                        <Activity className="w-3 h-3" />
                        Próximo Derby
                      </span>
                    ) : (
                      <span className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">Fecha #{index + 2}</span>
                    )}
                  </div>

                  {/* Match Matchup Scoreboard display */}
                  <div className="text-center my-6 py-2 bg-black/60 rounded-xl border border-zinc-900/60 p-4">
                    <div className="flex items-center justify-center gap-4">
                      {/* Crest A */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-[#FFD700] text-black rounded-lg flex items-center justify-center font-black shadow-md shadow-[#FFD700]/10">
                          YP
                        </div>
                        <span className="text-[9px] font-bold mt-1 text-white uppercase tracking-wider">Yanapuma</span>
                      </div>

                      <span className="text-lg font-black text-[#FFD700] italic">VS</span>

                      {/* Crest B */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 text-white rounded-lg flex items-center justify-center font-bold">
                          {oppAcronym}
                        </div>
                        <span className="text-[9px] font-bold mt-1 text-zinc-500 uppercase tracking-wider truncate max-w-[70px]">{match.opponent}</span>
                      </div>
                    </div>
                  </div>

                  {/* Location & Time details */}
                  <div className="space-y-2.5 pt-4 text-zinc-400 text-xs border-t border-dashed border-zinc-900">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#FFD700]" />
                      <span className="truncate">{match.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tv className="w-4 h-4 text-[#FFD700]" />
                      <span>{match.time} / Transmisión Live</span>
                    </div>
                  </div>
                </div>

                {/* Match CTA button */}
                <button 
                  className={`mt-6 w-full py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 cursor-pointer ${
                    isFirst 
                      ? 'bg-[#FFD700] hover:bg-[#FFD700]/90 text-black shadow-lg shadow-[#FFD700]/10' 
                      : 'bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800'
                  }`}
                >
                  Ficha Técnica
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
