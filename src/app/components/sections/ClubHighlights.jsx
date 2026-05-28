import React, { useState, useEffect } from 'react';
import { Ticket, Flame, Trophy, Calendar, MapPin, Zap } from 'lucide-react';
import { resolveImageUrl } from '../figma/ImageWithFallback';

function TeamCrest({ url, name, initials, isYanapuma }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [url]);

  if (url && !hasError) {
    return (
      <div className="w-12 h-12 flex items-center justify-center">
        <img 
          src={resolveImageUrl(url)} 
          alt={name} 
          onError={() => setHasError(true)}
          className={`w-12 h-12 object-contain hover:scale-105 transition-transform ${
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
        ? "bg-[#FFD700] text-black shadow-lg shadow-[#FFD700]/10" 
        : "bg-zinc-800 text-white border border-zinc-700"
    } rounded-full flex items-center justify-center font-bold hover:scale-105 transition-transform`}>
      {initials}
    </div>
  );
}

export default function ClubHighlights({ nextMatch }) {
  const isLocal = nextMatch ? nextMatch.es_local : true;
  
  const localName = isLocal ? "Yanapuma FC" : (nextMatch ? nextMatch.equipo_local : "Yanapuma FC");
  const localCrest = isLocal ? "YP" : (nextMatch ? nextMatch.equipo_local.substring(0, 2).toUpperCase() : "YP");
  
  const visitorName = isLocal ? (nextMatch ? nextMatch.equipo_visitante : "Águilas FC") : "Yanapuma FC";
  const visitorCrest = isLocal ? (nextMatch ? nextMatch.equipo_visitante.substring(0, 2).toUpperCase() : "AE") : "YP";

  const matchEstadio = nextMatch ? nextMatch.estadio : "Estadio Olímpico Municipal";
  const matchTicketUrl = nextMatch ? (nextMatch.ticket_url || "https://passandgo.finatech.com.pe/") : "https://passandgo.finatech.com.pe/";

  // Format Date
  let formattedDateString = "Lunes, 25 Mayo 2026 - 16:00";
  if (nextMatch) {
    try {
      const dateObj = new Date(nextMatch.fecha + 'T00:00:00');
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const formattedDate = `${days[dateObj.getDay()]}, ${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
      const formattedTime = nextMatch.hora ? nextMatch.hora.substring(0, 5) : '15:00';
      formattedDateString = `${formattedDate} - ${formattedTime}`;
    } catch (err) {}
  }

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
                  {/* Team Crest A (Local) */}
                  <div className="flex flex-col items-center">
                    <TeamCrest 
                      url={nextMatch?.escudo_local_url} 
                      name={localName} 
                      initials={localCrest} 
                      isYanapuma={isLocal} 
                    />
                    <span className="text-xs font-bold mt-2 text-white">{localName}</span>
                  </div>

                  <span className="text-2xl font-black text-[#FFD700] italic">VS</span>

                  {/* Team Crest B (Visitor) */}
                  <div className="flex flex-col items-center">
                    <TeamCrest 
                      url={nextMatch?.escudo_visitante_url} 
                      name={visitorName} 
                      initials={visitorCrest} 
                      isYanapuma={!isLocal} 
                    />
                    <span className="text-xs font-bold mt-2 text-zinc-400">{visitorName}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-dashed border-[#FFD700]/20">
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <Calendar className="w-4 h-4 text-[#FFD700]" />
                  <span>{formattedDateString}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <MapPin className="w-4 h-4 text-[#FFD700]" />
                  <span>{matchEstadio}</span>
                </div>
              </div>
            </div>

            <a 
              href={matchTicketUrl} 
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
