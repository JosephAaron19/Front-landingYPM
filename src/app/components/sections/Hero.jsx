import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Award } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function Hero({ heroBgImage, heroBgImage2, heroBgImage3, slidesList = [], announcementsList = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto transition every 4 seconds
  useEffect(() => {
    const totalSlides = slidesList.length > 0 ? slidesList.length : 3;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(timer);
  }, [slidesList]);

  // Map icon strings to Lucide components
  const getIcon = (name) => {
    switch (name) {
      case 'Trophy': return <Trophy className="w-3.5 h-3.5" />;
      case 'Award': return <Award className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const slides = slidesList.length > 0 ? slidesList.map((sl, index) => ({
    image: sl.imagen_url || (index === 0 ? heroBgImage : index === 1 ? heroBgImage2 : heroBgImage3),
    tag: sl.tag || 'Fútbol Femenino de Élite',
    tagIcon: getIcon(sl.icono),
    titleLine1: sl.titulo_linea_1 || 'YANA',
    titleLine2: sl.titulo_linea_2 || 'PUMA FC',
    subtitle: sl.subtitulo || 'La Fuerza de la Selva',
    botones: sl.botones || []
  })) : [
    {
      image: heroBgImage,
      tag: 'Fútbol Femenino de Élite',
      tagIcon: <Sparkles className="w-3.5 h-3.5" />,
      titleLine1: 'YANA',
      titleLine2: 'PUMA FC',
      subtitle: 'Pasión, Garra e Identidad Inquebrantable en la Cancha',
      botones: []
    },
    {
      image: heroBgImage2,
      tag: 'Espíritu Guerrero',
      tagIcon: <Trophy className="w-3.5 h-3.5" />,
      titleLine1: 'FUERZA',
      titleLine2: 'INDOMABLE',
      subtitle: 'Decididas a dejar nuestra huella en cada minuto del partido',
      botones: []
    },
    {
      image: heroBgImage3,
      tag: 'El Clan de la Fiera',
      tagIcon: <Award className="w-3.5 h-3.5" />,
      titleLine1: 'UNIÓN Y',
      titleLine2: 'HONOR',
      subtitle: 'Nacidas para luchar, unidas y comprometidas para vencer',
      botones: []
    }
  ];

  return (
    <section id="inicio" className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-black mt-[16px] md:mt-[40px]">
      
      {/* 1. Background Slide Images (Rendered together with absolute positioning and opacity crossfades) */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-all duration-[1000ms] ease-in-out ${
            currentSlide === index ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 z-[-10]'
          }`}
        >
          {/* Ambient Dark Top-Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black z-10"></div>
          
          {/* Brighter backdrop image visibility (increased from opacity-35 to opacity-70) */}
          <ImageWithFallback
            src={slide.image}
            alt={`Yanapuma Cover Slide ${index + 1}`}
            className="w-full h-full object-cover opacity-70 filter contrast-[105%]"
          />
        </div>
      ))}
      
      {/* Cyber Scanline Scan Overlay Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,215,0,0.02)_1px,transparent_1px)] bg-[size:100%_4px] z-10 pointer-events-none"></div>

      {/* 2. Centered Text content with radial contrast bubble mask (protects text legibility) */}
      <div className="relative z-20 text-center px-4 max-w-4xl pt-10 select-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0)_60%)] p-8 rounded-full">
        
        {/* Dynamic Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/60 border border-[#FFD700]/30 text-[9px] uppercase tracking-widest text-[#FFD700] mb-5 transition-all">
          {slides[currentSlide].tagIcon}
          <span>{slides[currentSlide].tag}</span>
        </div>

        {/* Dynamic Glowing Title */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-4 tracking-tighter uppercase leading-none transition-all duration-500">
          <span className="text-white drop-shadow-[0_4px_15px_rgba(0,0,0,1)]">{slides[currentSlide].titleLine1} </span>
          <span className="text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.4)]">{slides[currentSlide].titleLine2}</span>
        </h1>
        
        {/* Dynamic Description */}
        <p className="text-sm md:text-lg mb-10 text-zinc-200 uppercase tracking-widest font-extrabold max-w-2xl mx-auto leading-relaxed border-y border-[#FFD700]/25 py-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] transition-all">
          {slides[currentSlide].subtitle}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {slides[currentSlide].botones && slides[currentSlide].botones.length > 0 ? (
            slides[currentSlide].botones.map((btn, bIdx) => (
              <a
                key={bIdx}
                href={btn.url}
                className={btn.tipo === 'SECUNDARIO' 
                  ? "px-8 py-3.5 border border-[#FFD700] hover:bg-[#FFD700]/15 text-[#FFD700] font-black uppercase tracking-wider text-xs rounded-lg hover:scale-105 active:scale-95 transition-all text-center w-48 bg-black/60 cursor-pointer"
                  : "px-8 py-3.5 bg-gradient-to-r from-[#FFD700] to-[#e6c200] text-black font-black uppercase tracking-wider text-xs rounded-lg hover:scale-105 active:scale-95 transition-all text-center w-48 shadow-lg shadow-[#FFD700]/15 cursor-pointer"
                }
              >
                {btn.texto}
              </a>
            ))
          ) : (
            <>
              <a
                href="#nosotras"
                className="px-8 py-3.5 bg-gradient-to-r from-[#FFD700] to-[#e6c200] text-black font-black uppercase tracking-wider text-xs rounded-lg hover:scale-105 active:scale-95 transition-all text-center w-48 shadow-lg shadow-[#FFD700]/15 cursor-pointer"
              >
                Conocer Historia
              </a>
              <a
                href="#contacto"
                className="px-8 py-3.5 border border-[#FFD700] hover:bg-[#FFD700]/15 text-[#FFD700] font-black uppercase tracking-wider text-xs rounded-lg hover:scale-105 active:scale-95 transition-all text-center w-48 bg-black/60 cursor-pointer"
              >
                Contáctanos
              </a>
            </>
          )}
        </div>
      </div>

      {/* Slide Indicators (Pagination Dots on bottom overlay) */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-[#FFD700] w-12 shadow-[0_0_10px_rgba(255,215,0,0.5)]' : 'bg-white/30 hover:bg-white/60'
            }`}
            title={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Moving ticker ribbon at the bottom of the section */}
      <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#FFD700] via-[#e6c200] to-[#FFD700] text-black py-2.5 overflow-hidden z-20 font-black text-[9px] md:text-[10px] uppercase tracking-widest flex items-center shadow-2xl border-t border-[#FFD700]/25">
        <div className="whitespace-nowrap animate-marquee flex gap-16">
          {announcementsList.length > 0 ? (
            // Duplicate list to ensure continuous scrolling
            [...announcementsList, ...announcementsList].map((ann, aIdx) => (
              <span key={aIdx}>⚡ {ann.texto.toUpperCase()} ⚡</span>
            ))
          ) : (
            <>
              <span>⚡ ¡VENTA DE ENTRADAS ACTIVA PARA EL ENCUENTRO CONTRA LAS ÁGUILAS! ⚡</span>
              <span>🏆 CLAN YANAPUMA FC: 8 AÑOS DE LUCHA Y TRIUNFOS 🏆</span>
              <span>⚽ PRÓXIMA FECHA: LUNES 25 MAYO - 16:00 ⚽</span>
              <span>🐾 #GARRAYANAPUMA: ÚNETE AL REGISTRO DE SOCIAS DIGITALES 🐾</span>
              <span>⚡ ¡VENTA DE ENTRADAS ACTIVA PARA EL ENCUENTRO CONTRA LAS ÁGUILAS! ⚡</span>
              <span>🏆 CLAN YANAPUMA FC: 8 AÑOS DE LUCHA Y TRIUNFOS 🏆</span>
              <span>⚽ PRÓXIMA FECHA: LUNES 25 MAYO - 16:00 ⚽</span>
              <span>🐾 #GARRAYANAPUMA: ÚNETE AL REGISTRO DE SOCIAS DIGITALES 🐾</span>
            </>
          )}
        </div>
      </div>

      {/* Inline styles for custom self-contained keyframe animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}
