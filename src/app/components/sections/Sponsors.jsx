import React from 'react';
import { Shield, Zap, Sparkles, Compass, Flame } from 'lucide-react';
import { resolveImageUrl } from '../figma/ImageWithFallback';

export default function Sponsors({ sponsorsList = [] }) {
  const principalSponsors = sponsorsList.filter(s => s.nivel?.slug === 'principal');
  const goldSponsors = sponsorsList.filter(s => s.nivel?.slug === 'oficial' || s.nivel?.slug === 'oro');
  const silverSponsors = sponsorsList.filter(s => s.nivel?.slug && s.nivel?.slug !== 'principal' && s.nivel?.slug !== 'oficial' && s.nivel?.slug !== 'oro');

  const hasSponsors = sponsorsList.length > 0;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#121212] via-[#0a0a0a] to-[#050505] border-t border-[#FFD700]/5 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-widest text-[#FFD700] font-black">
            Alianzas Estratégicas
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2 uppercase">
            Auspiciadores <span className="text-[#FFD700]">Oficiales</span>
          </h2>
          <div className="w-16 h-1 bg-[#FFD700] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Tier 1: Sponsors Globales (Main/Large Logos) */}
        <div className="mb-14">
          <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-extrabold mb-6">
            Sponsor Principal
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {hasSponsors ? (
              principalSponsors.map(s => (
                <a 
                  key={s.id} 
                  href={s.website_url || "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3.5 grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 group cursor-pointer"
                >
                  <img 
                    src={resolveImageUrl(s.logo_url)} 
                    alt={s.nombre} 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150x80'; }}
                    className="h-14 object-contain"
                  />
                  <div className="text-left">
                    <span className="text-2xl font-black tracking-tighter text-white group-hover:text-[#FFD700] transition-colors block leading-none">
                      {s.nombre.toUpperCase()}
                    </span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{s.descripcion || 'Socio Estratégico'}</span>
                  </div>
                </a>
              ))
            ) : (
              <div className="flex items-center gap-3.5 grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 group cursor-pointer">
                <Compass className="w-10 h-10 text-[#FFD700] group-hover:rotate-12 transition-transform duration-300" />
                <div className="text-left">
                  <span className="text-3xl font-black tracking-tighter text-white group-hover:text-[#FFD700] transition-colors block leading-none">
                    MDK<span className="text-[#FFD700] font-light text-base tracking-widest ml-1">GLOBAL</span>
                  </span>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Shipping del Perú</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tier 2: Sponsors Oro (Medium Logos) */}
        <div className="mb-14 border-t border-zinc-900 pt-10">
          <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-extrabold mb-6">
            Sponsors Oficiales Oro
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {hasSponsors ? (
              goldSponsors.map(s => (
                <a 
                  key={s.id} 
                  href={s.website_url || "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 group cursor-pointer"
                >
                  <img 
                    src={resolveImageUrl(s.logo_url)} 
                    alt={s.nombre} 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150x80'; }}
                    className="h-10 object-contain"
                  />
                  <span className="text-xl font-black text-white tracking-widest uppercase">
                    {s.nombre}
                  </span>
                </a>
              ))
            ) : (
              <>
                <div className="flex items-center gap-2 grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 group cursor-pointer">
                  <Flame className="w-7 h-7 text-[#FFD700] group-hover:scale-110 transition-transform" />
                  <span className="text-xl font-black text-white tracking-widest uppercase">
                    TABO<span className="text-[#FFD700]">ONO</span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 group cursor-pointer">
                  <Shield className="w-7 h-7 text-[#FFD700] group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <span className="text-lg font-black text-white uppercase tracking-wider block leading-none">CAJA</span>
                    <span className="text-[10px] font-bold text-[#FFD700] uppercase tracking-widest block">MAYNAS</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tier 3: Sponsors Plata (Small/Subtle Logos) */}
        <div className="border-t border-zinc-900 pt-10">
          <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-extrabold mb-6">
            Sponsors Oficiales Plata & Institucionales
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {hasSponsors ? (
              silverSponsors.map(s => (
                <a 
                  key={s.id} 
                  href={s.website_url || "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group"
                >
                  <img 
                    src={resolveImageUrl(s.logo_url)} 
                    alt={s.nombre} 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150x80'; }}
                    className="h-8 object-contain"
                  />
                  <span className="text-xs font-black tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                    {s.nombre.toUpperCase()}
                  </span>
                </a>
              ))
            ) : (
              <>
                <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
                  <span className="text-xs font-black tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                    PIAD <span className="text-[#FFD700]">SPORTS</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
                  <span className="text-xs font-black tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                    AHCES <span className="text-[#FFD700] font-light">MELAMINA</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
