import React from 'react';
import { Ticket, Flame, Trophy, Calendar, MapPin, Zap } from 'lucide-react';

export default function ClubHighlights() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-black via-[#0d0d0d] to-[#121212] overflow-hidden border-t border-[#FFD700]/10">
      {/* Subtle Background Glows */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#FFD700]/3 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          
          {/* Column 1: Next Match Ticket Spotlight */}
          <div className="bg-[#0a0a0a]/90 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6 flex flex-col justify-between hover:border-[#FFD700]/50 transition-all duration-300 group shadow-2xl relative overflow-hidden">
            {/* Corner Ticket Notch Decorator */}
            <div className="absolute top-1/2 -left-4 w-8 h-8 bg-[#121212] rounded-full border-r border-[#FFD700]/20 z-20"></div>
            <div className="absolute top-1/2 -right-4 w-8 h-8 bg-[#121212] rounded-full border-l border-[#FFD700]/20 z-20"></div>

            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#FFD700]/10">
                <span className="text-[10px] uppercase tracking-widest text-[#FFD700] font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-ping"></span>
                  Siguiente Fecha
                </span>
                <Ticket className="w-5 h-5 text-[#FFD700]" />
              </div>

              <div className="text-center my-6">
                <div className="flex items-center justify-center gap-6">
                  {/* Team Crest A (Yanapuma) */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#FFD700] text-black rounded-full flex items-center justify-center font-black shadow-lg shadow-[#FFD700]/10">
                      YP
                    </div>
                    <span className="text-xs font-bold mt-2 text-white">Yanapuma</span>
                  </div>

                  <span className="text-2xl font-black text-[#FFD700] italic">VS</span>

                  {/* Team Crest B (Opponent) */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-zinc-800 text-white rounded-full flex items-center justify-center font-bold border border-zinc-700">
                      AE
                    </div>
                    <span className="text-xs font-bold mt-2 text-zinc-400">Águilas FC</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-dashed border-[#FFD700]/20">
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <Calendar className="w-4 h-4 text-[#FFD700]" />
                  <span>Lunes, 25 Mayo 2026 - 16:00</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <MapPin className="w-4 h-4 text-[#FFD700]" />
                  <span>Estadio Olímpico Municipal</span>
                </div>
              </div>
            </div>

            <a 
              href="https://passandgo.finatech.com.pe/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-8 w-full py-3 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg transition-all active:scale-95 cursor-pointer text-center block"
            >
              Adquirir Entradas
            </a>
          </div>

          {/* Column 2: Club Creed & Philosophy */}
          <div className="bg-[#0f0f0f] border border-[#FFD700]/10 rounded-xl p-8 flex flex-col justify-between hover:border-[#FFD700]/30 transition-all duration-300 relative group overflow-hidden">
            {/* Top Glowing Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50"></div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FFD700] font-extrabold">
                <Flame className="w-4 h-4" />
                Nuestra Identidad
              </div>
              <h3 className="text-2xl font-black text-white leading-tight uppercase">
                Garras que <span className="text-[#FFD700]">Defienden</span> una Pasión
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed pt-2">
                "Nacidas para luchar, unidas para triunfar." El espíritu del Yanapuma late en cada jugadora. 
                Representamos la fuerza y la agilidad de la pantera en el campo, jugando con una garra inquebrantable que honra nuestros colores.
              </p>
            </div>

            <div className="border-t border-[#FFD700]/10 pt-6 mt-6 flex items-center justify-between">
              <div className="text-xs text-zinc-500 font-medium">Fundado en 2018 | Iquitos, Loreto</div>
              <div className="text-sm font-black text-[#FFD700] tracking-widest italic uppercase">#FamiliaYanapuma</div>
            </div>
          </div>

          {/* Column 3: Recent Championship Milestone */}
          <div className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border border-[#FFD700]/10 rounded-xl p-8 flex flex-col justify-between hover:border-[#FFD700]/30 transition-all duration-300 relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FFD700] font-extrabold">
                  <Trophy className="w-4 h-4" />
                  Último Logro
                </div>
                <Zap className="w-4 h-4 text-[#FFD700]" />
              </div>
              
              <h3 className="text-xl font-bold text-white leading-snug">
                ¡Campeonas de la Liga de Ascenso!
              </h3>
              
              {/* Highlighted Match Score */}
              <div className="bg-black/60 border border-[#FFD700]/10 rounded-lg p-3.5 my-3 flex items-center justify-between">
                <div className="text-xs font-bold text-white">Final de Ascenso 2025</div>
                <div className="text-sm font-black text-white">
                  Yanapuma <span className="text-[#FFD700]">3 - 1</span> FC Huaral
                </div>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed">
                Hazaña histórica en la ciudad de Huaral. Coronamos una brillante campaña de ascenso nacional, convirtiéndonos en el primer equipo de la región Loreto en subir al fútbol profesional peruano de la Primera División.
              </p>
            </div>

            <a 
              href="#galeria"
              className="mt-6 inline-flex items-center justify-center gap-2 text-xs font-bold text-[#FFD700] hover:text-white transition-colors group/link pt-4 border-t border-[#FFD700]/10"
            >
              Ver Galería del Partido
              <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
