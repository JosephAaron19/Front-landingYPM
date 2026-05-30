import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Tv, Sparkles, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { resolveImageUrl } from '../figma/ImageWithFallback';

// Reusable Team Crest Component with Fallback handling
function TeamCrest({ url, name, initials, isYanapuma }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [url]);

  if (url && !hasError) {
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-zinc-950/60 rounded-xl p-1.5 border border-zinc-900">
        <img 
          src={resolveImageUrl(url)} 
          alt={name} 
          onError={() => setHasError(true)}
          className={`w-full h-full object-contain hover:scale-105 transition-transform ${
            isYanapuma 
              ? "drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]" 
              : "drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
          }`}
        />
      </div>
    );
  }

  return (
    <div className={`w-12 h-12 ${
      isYanapuma 
        ? "bg-[#FFD700] text-black shadow-lg shadow-[#FFD700]/10 border border-[#FFD700]/30" 
        : "bg-zinc-900 text-white border border-zinc-800"
    } rounded-xl flex items-center justify-center font-black hover:scale-105 transition-transform text-sm tracking-wider`}>
      {initials}
    </div>
  );
}

// Extract Initials from Team Name
const getInitials = (name) => {
  if (!name) return "YP";
  return name.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase();
};

export default function Matches({ nextMatches = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Screen size listener to change responsive card counts
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Boundaries safeguard on match length changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [nextMatches.length]);

  const prev = () => {
    setCurrentIndex(prevIdx => Math.max(prevIdx - 1, 0));
  };

  const next = () => {
    setCurrentIndex(prevIdx => Math.min(prevIdx + 1, nextMatches.length - visibleCards));
  };

  // Swipe gesture handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    const threshold = 50; // swipe threshold in px
    if (deltaX > threshold) {
      // swipe left (next)
      if (currentIndex < nextMatches.length - visibleCards) {
        setCurrentIndex(prevIdx => prevIdx + 1);
      }
    } else if (deltaX < -threshold) {
      // swipe right (prev)
      if (currentIndex > 0) {
        setCurrentIndex(prevIdx => prevIdx - 1);
      }
    }
  };

  // Mathematically exact transform values factoring in slide widths & gap size (24px)
  const getTransform = () => {
    if (visibleCards === 1) {
      return `translate3d(calc(-${currentIndex} * (100% + 24px)), 0, 0)`;
    } else if (visibleCards === 2) {
      return `translate3d(calc(-${currentIndex} * (50% + 12px)), 0, 0)`;
    } else {
      return `translate3d(calc(-${currentIndex} * (33.333% + 8px)), 0, 0)`;
    }
  };

  // Slide width styles
  const getSlideStyle = () => {
    if (visibleCards === 1) {
      return { width: '100%', flexShrink: 0 };
    } else if (visibleCards === 2) {
      return { width: 'calc(50% - 12px)', flexShrink: 0 };
    } else {
      return { width: 'calc(33.333% - 16px)', flexShrink: 0 };
    }
  };

  return (
    <section id="partidos" className="py-24 px-4 bg-gradient-to-b from-[#0c0c0c] via-black to-[#121212] border-t border-[#FFD700]/5 overflow-hidden relative">
      {/* Subtle Background Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Title & Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[10px] uppercase tracking-widest text-[#FFD700] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Calendario de Combates
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Próximos <span className="text-[#FFD700]">Partidos</span>
            </h2>
            <div className="w-20 h-[3px] bg-gradient-to-r from-[#FFD700] to-transparent mt-4 rounded-full"></div>
          </div>

          {/* Navigation Controls */}
          {nextMatches.length > visibleCards && (
            <div className="flex gap-3 mt-6 md:mt-0 select-none">
              <button 
                onClick={prev}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-full border border-[#FFD700]/20 hover:border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 flex items-center justify-center transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                aria-label="Partido anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={next}
                disabled={currentIndex >= nextMatches.length - visibleCards}
                className="w-10 h-10 rounded-full border border-[#FFD700]/20 hover:border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 flex items-center justify-center transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                aria-label="Siguiente partido"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Viewport Container */}
        {nextMatches.length === 0 ? (
          <div className="bg-[#0b0b0b] border border-zinc-950 rounded-2xl p-12 text-center text-zinc-500 uppercase tracking-widest font-extrabold text-xs">
            No hay próximos partidos programados por el momento. ¡Pronto anunciaremos nuevos encuentros!
          </div>
        ) : (
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ 
                transform: getTransform()
              }}
            >
              {nextMatches.map((match) => {
                const localName = match.equipo_local || "Yanapuma FC";
                const visitanteName = match.equipo_visitante || match.opponent || "Rival";
                const initialsLocal = getInitials(localName);
                const initialsVisitante = getInitials(visitanteName);
                const isYanapumaLocal = localName.toLowerCase().includes('yanapuma');
                const isYanapumaVisitante = visitanteName.toLowerCase().includes('yanapuma');

                return (
                  <div 
                    key={match.id} 
                    style={getSlideStyle()}
                    className={`bg-[#0b0b0b] border rounded-2xl p-6 transition-all duration-300 hover:border-[#FFD700]/40 flex flex-col justify-between relative group ${
                      match.es_derby 
                        ? 'border-[#FFD700]/30 shadow-[0_0_30px_rgba(255,215,0,0.04)]' 
                        : 'border-zinc-950'
                    }`}
                  >
                    {/* Glowing corner bracket decorators */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#FFD700]/20 z-10"></div>
                    <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#FFD700]/20 z-10"></div>

                    <div>
                      {/* Top Card Info header */}
                      <div className="flex items-center justify-between mb-6 border-b border-zinc-900 pb-4">
                        <div className="flex items-center gap-2 text-xs font-black text-[#FFD700]">
                          <Calendar className="w-4 h-4 text-[#FFD700]/80" />
                          <span>{match.date}</span>
                        </div>

                        {match.es_derby ? (
                          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-red-600/10 border border-red-500/20 text-[8px] font-black uppercase text-red-500 tracking-widest animate-pulse">
                            <Activity className="w-3 h-3" />
                            Derby Destacado
                          </span>
                        ) : (
                          <span className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">Programado</span>
                        )}
                      </div>

                      {/* Tournament and Matchday */}
                      {(match.competicion || match.jornada) && (
                        <div className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-widest mb-4 truncate text-center">
                          {match.competicion || 'Copa'} {match.jornada ? `• ${match.jornada}` : ''}
                        </div>
                      )}

                      {/* Match Matchup Scoreboard display */}
                      <div className="text-center my-6 py-4 bg-black/60 rounded-xl border border-zinc-900/60 px-4">
                        <div className="flex items-center justify-between gap-2">
                          {/* Team A (Local) */}
                          <div className="flex flex-col items-center flex-1 min-w-0">
                            <TeamCrest 
                              url={match.escudo_local_url} 
                              name={localName} 
                              initials={initialsLocal} 
                              isYanapuma={isYanapumaLocal} 
                            />
                            <span className="text-[10px] font-black mt-2.5 text-white uppercase tracking-wider truncate w-full text-center">
                              {localName}
                            </span>
                          </div>

                          <span className="text-sm font-black text-[#FFD700] italic px-2">VS</span>

                          {/* Team B (Visitor) */}
                          <div className="flex flex-col items-center flex-1 min-w-0">
                            <TeamCrest 
                              url={match.escudo_visitante_url} 
                              name={visitanteName} 
                              initials={initialsVisitante} 
                              isYanapuma={isYanapumaVisitante} 
                            />
                            <span className="text-[10px] font-black mt-2.5 text-white uppercase tracking-wider truncate w-full text-center">
                              {visitanteName}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Location & Time details */}
                      <div className="space-y-2.5 pt-4 text-zinc-400 text-xs border-t border-dashed border-zinc-900">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#FFD700]" />
                          <span className="truncate">{match.location}{match.ciudad ? `, ${match.ciudad}` : ''}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tv className="w-4 h-4 text-[#FFD700]" />
                          <span>{match.time} HS / Central Oficial</span>
                        </div>
                      </div>
                    </div>

                    {/* Match Action Button */}
                    {match.ticket_url ? (
                      <a 
                        href={match.ticket_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 w-full py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 cursor-pointer bg-[#FFD700] hover:bg-[#FFD700]/90 text-black shadow-lg shadow-[#FFD700]/10 text-center block"
                      >
                        Comprar Entradas
                      </a>
                    ) : (
                      <button 
                        disabled
                        className="mt-6 w-full py-2.5 text-xs font-black uppercase tracking-wider rounded-lg bg-zinc-900/30 border border-zinc-900/40 text-zinc-600 cursor-not-allowed text-center block"
                      >
                        Entradas no Disponibles
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
