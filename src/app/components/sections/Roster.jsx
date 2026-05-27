import React from 'react';
import { Users, Shield, ArrowLeft, Trophy, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Reusable Futuristic FUT Tactical Card Component
function PlayerCard({ player, subtitle }) {
  // Deterministic tactical stats computed reactively
  const pac = 80 + (player.number % 17);
  const reg = 78 + (player.name.length % 19);
  const tto = 75 + ((player.number + player.age) % 21);
  const fza = 76 + (player.age % 19);

  return (
    <div className="bg-[#0b0b0b]/90 border border-zinc-900 hover:border-[#FFD700]/40 rounded-xl overflow-hidden shadow-xl transition-all duration-300 group relative">
      {/* Visual cyber borders for sci-fi look */}
      <div className="absolute top-0 left-0 w-[5px] h-[5px] border-t border-l border-[#FFD700]/30 z-10"></div>
      <div className="absolute top-0 right-0 w-[5px] h-[5px] border-t border-r border-[#FFD700]/30 z-10"></div>
      <div className="absolute bottom-0 left-0 w-[5px] h-[5px] border-b border-l border-[#FFD700]/30 z-10"></div>
      <div className="absolute bottom-0 right-0 w-[5px] h-[5px] border-b border-r border-[#FFD700]/30 z-10"></div>

      {/* Card Image Container */}
      <div className="aspect-[3/4] overflow-hidden bg-zinc-950 relative">
        <ImageWithFallback
          src={player.image}
          alt={player.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none"></div>

        {/* Squad Number Plate (inspired by classic FUT badges) */}
        <div className="absolute top-3 left-3 bg-[#FFD700] text-black font-black w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-md shadow-[#FFD700]/20 z-10">
          {player.number}
        </div>

        {/* Futuristic Glassmorphic FUT Stat Panel (slides up on hover) */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-20 p-4 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="text-center mb-4">
            <span className="text-[8px] uppercase font-black tracking-widest text-[#FFD700] block mb-0.5">TÁCTICA YANAPUMA</span>
            <h4 className="font-extrabold text-xs text-white truncate px-1 uppercase">{player.name}</h4>
          </div>
          
          {/* Progress bar grids */}
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-[8px] uppercase font-extrabold text-zinc-400 mb-0.5">
                <span>PAC (Velocidad)</span>
                <span className="text-[#FFD700] font-black">{pac}</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FFD700] to-[#e6c200]" style={{ width: `${pac}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[8px] uppercase font-extrabold text-zinc-400 mb-0.5">
                <span>REG (Dribbling)</span>
                <span className="text-[#FFD700] font-black">{reg}</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FFD700] to-[#e6c200]" style={{ width: `${reg}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[8px] uppercase font-extrabold text-zinc-400 mb-0.5">
                <span>TTO (Tiro)</span>
                <span className="text-[#FFD700] font-black">{tto}</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FFD700] to-[#e6c200]" style={{ width: `${tto}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[8px] uppercase font-extrabold text-zinc-400 mb-0.5">
                <span>FZA (Fuerza)</span>
                <span className="text-[#FFD700] font-black">{fza}</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FFD700] to-[#e6c200]" style={{ width: `${fza}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info bottom */}
      <div className="p-3.5 bg-black/60">
        <h3 className="font-extrabold text-sm mb-0.5 truncate text-white uppercase group-hover:text-[#FFD700] transition-colors">{player.name}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] font-black uppercase text-[#FFD700]">{subtitle}</span>
          <span className="text-zinc-500 text-[10px] font-semibold">{player.age} años</span>
        </div>
      </div>
    </div>
  );
}

export default function Roster({ 
  showFullRoster, 
  setShowFullRoster, 
  staffList, 
  gkList, 
  defList, 
  midList, 
  fwdList, 
  featuredPlayers 
}) {
  if (showFullRoster) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Full Roster View */}
        <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#FFD700]/20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button
              onClick={() => setShowFullRoster(false)}
              className="flex items-center gap-2 text-[#FFD700] hover:text-[#FFD700]/80 transition-all cursor-pointer font-bold uppercase tracking-wider text-xs"
            >
              <ArrowLeft className="w-5 h-5 animate-pulse" />
              <span>Volver a la Landing</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block text-[10px] uppercase tracking-widest text-[#FFD700] font-black mb-3">Plantel Oficial</span>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight">
              Plantel <span className="text-[#FFD700]">Completo</span>
            </h1>
            <div className="w-16 h-1 bg-[#FFD700] mx-auto mt-4 rounded-full"></div>
            <p className="text-zinc-500 text-sm mt-3 uppercase tracking-wider font-semibold">Temporada Femenina 2026</p>
          </div>

          {/* Technical Staff */}
          <div className="mb-20">
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3 border-b border-[#FFD700]/10 pb-3 uppercase">
              <Shield className="w-7 h-7 text-[#FFD700]" />
              Cuerpo Técnico
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {staffList.map((staff, index) => (
                <div key={index} className="bg-[#0b0b0b] border border-zinc-900 hover:border-[#FFD700]/30 rounded-xl overflow-hidden hover:scale-102 transition-all duration-300 group">
                  <div className="aspect-[3/4] overflow-hidden bg-zinc-950">
                    <ImageWithFallback
                      src={staff.image}
                      alt={staff.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-extrabold text-sm mb-0.5 text-white uppercase">{staff.name}</h3>
                    <p className="text-[#FFD700] text-xs font-bold uppercase tracking-wider">{staff.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goalkeepers */}
          <div className="mb-16">
            <h2 className="text-2xl font-black mb-8 border-b border-[#FFD700]/10 pb-3 uppercase flex items-center gap-2">
              <span className="text-[#FFD700]">01.</span> Arqueras
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {gkList.map((player) => (
                <PlayerCard key={player.number} player={player} subtitle={player.position || "Arquera"} />
              ))}
            </div>
          </div>

          {/* Defenders */}
          <div className="mb-16">
            <h2 className="text-2xl font-black mb-8 border-b border-[#FFD700]/10 pb-3 uppercase flex items-center gap-2">
              <span className="text-[#FFD700]">02.</span> Defensas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {defList.map((player) => (
                <PlayerCard key={player.number} player={player} subtitle={player.position || "Defensa"} />
              ))}
            </div>
          </div>

          {/* Midfielders */}
          <div className="mb-16">
            <h2 className="text-2xl font-black mb-8 border-b border-[#FFD700]/10 pb-3 uppercase flex items-center gap-2">
              <span className="text-[#FFD700]">03.</span> Mediocampistas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {midList.map((player) => (
                <PlayerCard key={player.number} player={player} subtitle={player.position || "Mediocampista"} />
              ))}
            </div>
          </div>

          {/* Forwards */}
          <div className="mb-16">
            <h2 className="text-2xl font-black mb-8 border-b border-[#FFD700]/10 pb-3 uppercase flex items-center gap-2">
              <span className="text-[#FFD700]">04.</span> Delanteras
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {fwdList.map((player) => (
                <PlayerCard key={player.number} player={player} subtitle={player.position || "Delantera"} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#0c0c0c] via-black to-[#121212] relative overflow-hidden">
      {/* Futuristic Cyber Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[10px] uppercase tracking-widest text-[#FFD700] mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Las Protagonistas
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Nuestras <span className="text-[#FFD700]">Estrellas</span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-16">
          {featuredPlayers.map((player) => (
            <PlayerCard key={player.number} player={player} subtitle={player.position} />
          ))}
        </div>

        {/* Actions Roster */}
        <div className="text-center">
          <button
            onClick={() => setShowFullRoster(true)}
            className="px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#e6c200] text-black font-black uppercase tracking-wider text-sm rounded-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2.5 cursor-pointer shadow-lg shadow-[#FFD700]/15"
          >
            <Users className="w-5 h-5" />
            Ver Plantel Completo
          </button>
        </div>
      </div>
    </section>
  );
}
