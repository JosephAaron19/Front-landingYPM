import React from 'react';
import { Users, Shield, Flame, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function About({ aboutImage }) {
  return (
    <section id="nosotras" className="py-24 px-4 bg-gradient-to-b from-[#121212] via-black to-[#0c0c0c] relative overflow-hidden border-t border-[#FFD700]/5">
      {/* Background Tech Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Text/Content Column */}
          <div className="space-y-6">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[10px] uppercase tracking-widest text-[#FFD700]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Nuestra Historia
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
              Sobre <span className="text-[#FFD700]">Nosotras</span>
            </h2>
            <div className="w-16 h-1 bg-[#FFD700] rounded-full mb-6"></div>

            {/* Paragraphs */}
            <p className="text-zinc-300 text-sm leading-relaxed">
              El <strong>Club Deportivo Yanapuma</strong> es un histórico equipo de fútbol femenino de Iquitos (Loreto, Perú). 
              Nace como un inspirador proyecto social y deportivo para rescatar y potenciar el talento de jóvenes loretanas que se habían quedado sin respaldo profesional. 
              Refundado en 2025 por empresarios loretanos comprometidos con el deporte del oriente, el equipo emprendió una campaña brillante.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Tras coronarse campeonas nacionales absolutas de la Liga de Ascenso en la hazaña histórica de Huaral, sellaron su boleto a la Primera División, 
              convirtiéndose en el primer equipo en la historia de la región Loreto en subir a la máxima categoría del fútbol profesional peruano (Liga Femenina FPF).
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              El término <strong>"Yanapuma"</strong> representa a la mítica pantera negra de la Amazonía: sinónimo de agilidad letal, fuerza y sigilo inquebrantable. 
              Portando con orgullo el negro y oro, nuestras "guerreras yanapumas" sirven de vitrina para destacar figuras locales y aportar valores a la Selección Peruana juvenil.
            </p>

            {/* Glassmorphic Value Grid (FUT Cockpit theme) */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-[#0b0b0b] border border-zinc-900 rounded-xl p-4 flex gap-3 hover:border-[#FFD700]/30 transition-colors">
                <Flame className="w-8 h-8 text-[#FFD700] shrink-0" />
                <div>
                  <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">Garra Incondicional</h4>
                  <p className="text-[10px] text-zinc-500 mt-1">Lucha inquebrantable hasta el pitido final.</p>
                </div>
              </div>

              <div className="bg-[#0b0b0b] border border-zinc-900 rounded-xl p-4 flex gap-3 hover:border-[#FFD700]/30 transition-colors">
                <Shield className="w-8 h-8 text-[#FFD700] shrink-0" />
                <div>
                  <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">Excelencia y Honor</h4>
                  <p className="text-[10px] text-zinc-500 mt-1">Formación deportiva y personal íntegra.</p>
                </div>
              </div>
            </div>

            {/* Mission bar */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-[#0b0b0b] to-transparent border-l-2 border-[#FFD700] p-4 mt-6">
              <Users className="w-10 h-10 text-[#FFD700]" />
              <div>
                <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">Nuestra Gran Misión</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Empoderar y profesionalizar el fútbol femenino en toda la región.</p>
              </div>
            </div>
          </div>

          {/* Futuristic radar framed Photo Container */}
          <div className="relative h-[480px] p-2 bg-[#090909] border border-zinc-900 rounded-2xl group overflow-hidden shadow-2xl">
            {/* Cyber HUD Brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#FFD700]/50 z-20 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#FFD700]/50 z-20 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#FFD700]/50 z-20 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#FFD700]/50 z-20 pointer-events-none group-hover:scale-110 transition-transform"></div>

            {/* Holographic Glowing scanner bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-[3000ms] ease-linear z-20"></div>

            {/* Inner Wrapper */}
            <div className="w-full h-full rounded-xl overflow-hidden relative bg-zinc-950">
              <ImageWithFallback
                src={aboutImage}
                alt="Yanapuma Team Gathering"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-103 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              
              {/* Badge text on image */}
              <div className="absolute bottom-6 left-6 z-20">
                <span className="text-[9px] uppercase tracking-widest text-[#FFD700] font-black">Registro Fotográfico</span>
                <h4 className="text-lg font-bold text-white uppercase mt-1">El Plantel Unido - Iquitos</h4>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
