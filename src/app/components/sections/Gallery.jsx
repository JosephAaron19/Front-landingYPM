import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ZoomIn } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function Gallery({ galleryList }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  };

  return (
    <section id="galeria" className="py-24 px-4 bg-gradient-to-b from-[#121212] via-black to-[#0c0c0c] border-t border-[#FFD700]/5 overflow-hidden relative">
      {/* Background Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFD700]/3 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[10px] uppercase tracking-widest text-[#FFD700] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Galería Cibernética
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Nuestra <span className="text-[#FFD700]">Galería</span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Dynamic 3D Slider Container */}
        <div className="relative max-w-4xl mx-auto flex items-center justify-center my-10">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:-left-8 z-30 w-12 h-12 rounded-full bg-black/85 border border-[#FFD700]/30 text-[#FFD700] hover:text-black hover:bg-[#FFD700] hover:border-[#FFD700] active:scale-95 transition-all shadow-lg flex items-center justify-center cursor-pointer"
            title="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Active Spotlight Card */}
          <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border-2 border-[#FFD700]/40 shadow-[0_0_50px_rgba(255,215,0,0.15)] bg-[#101010] relative group transition-all duration-500">
            {/* Ambient Background Blur to fill space */}
            <div className="absolute inset-0 filter blur-3xl opacity-20 pointer-events-none scale-110">
              <img 
                src={galleryList[activeIndex]} 
                alt="blur background" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Main Spotlight Image */}
            <ImageWithFallback
              src={galleryList[activeIndex]}
              alt={`Galeria Yanapuma ${activeIndex + 1}`}
              className="w-full h-full object-cover relative z-10 transition-all duration-700 group-hover:scale-105"
            />

            {/* Glassmorphic Cyber Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
              <div className="flex justify-end">
                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700]">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#FFD700] font-black">Yanapuma FC</span>
                <h4 className="text-lg font-bold text-white uppercase tracking-wide mt-1">Momento Histórico #{activeIndex + 1}</h4>
              </div>
            </div>

            {/* Glowing Corner Borders for Futuristic Vibe */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#FFD700] z-20"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#FFD700] z-20"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#FFD700] z-20"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#FFD700] z-20"></div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:-right-8 z-30 w-12 h-12 rounded-full bg-black/85 border border-[#FFD700]/30 text-[#FFD700] hover:text-black hover:bg-[#FFD700] hover:border-[#FFD700] active:scale-95 transition-all shadow-lg flex items-center justify-center cursor-pointer"
            title="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Preview strip below */}
        <div className="flex justify-center items-center gap-3.5 mt-8 max-w-xl mx-auto flex-wrap">
          {galleryList.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all relative ${
                activeIndex === index 
                  ? 'border-[#FFD700] scale-110 shadow-[0_0_15px_rgba(255,215,0,0.3)]' 
                  : 'border-zinc-800 opacity-40 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img 
                src={image} 
                alt={`thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              {/* Scanline active layer */}
              {activeIndex === index && (
                <div className="absolute inset-0 bg-[#FFD700]/10 mix-blend-color-dodge"></div>
              )}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
