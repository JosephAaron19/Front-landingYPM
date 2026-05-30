import React from 'react';
import { Trophy, Instagram, Facebook } from 'lucide-react';
import logoImg from '../../../assets/yanapumas.png';
import { resolveImageUrl } from '../figma/ImageWithFallback';

export default function Footer({ setShowFullRoster, clubInfo, navigateTo }) {
  const handleAnchorClick = (e, href) => {
    setShowFullRoster(false);
    if (href.startsWith('#')) {
      const isNotHome = window.location.pathname !== '/' && window.location.pathname !== '';
      if (isNotHome) {
        e.preventDefault();
        navigateTo('/');
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  };

  return (
    <footer className="py-12 px-4 bg-[#0a0a0a] border-t border-[#FFD700]/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={resolveImageUrl(clubInfo?.logo_url, logoImg)} alt="Yanapuma FC Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.25)]" />
              <span className="text-2xl font-black text-[#FFD700] tracking-wider uppercase">YANAPUMA</span>
            </div>
            <p className="text-gray-400">
              {clubInfo?.descripcion || "Fútbol femenino con pasión, garra y espíritu de equipo desde 2018."}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[#FFD700]">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#inicio" onClick={(e) => handleAnchorClick(e, '#inicio')} className="hover:text-[#FFD700] transition-colors">Inicio</a></li>
              <li><a href="#nosotras" onClick={(e) => handleAnchorClick(e, '#nosotras')} className="hover:text-[#FFD700] transition-colors">Nosotras</a></li>
              <li>
                <button 
                  onClick={() => { setShowFullRoster(true); navigateTo('/'); }} 
                  className="hover:text-[#FFD700] transition-colors text-left cursor-pointer"
                >
                  Plantel
                </button>
              </li>
              <li><a href="#partidos" onClick={(e) => handleAnchorClick(e, '#partidos')} className="hover:text-[#FFD700] transition-colors">Partidos</a></li>
              <li><a href="#galeria" onClick={(e) => handleAnchorClick(e, '#galeria')} className="hover:text-[#FFD700] transition-colors">Galería</a></li>
              <li>
                <button 
                  onClick={() => { setShowFullRoster(false); navigateTo('/noticias'); }}
                  className="hover:text-[#FFD700] transition-colors text-left cursor-pointer"
                >
                  Noticias
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[#FFD700]">Redes Sociales</h3>
            <div className="flex gap-4">
              <a 
                href={clubInfo?.instagram_url || "https://www.instagram.com/club_yanapuma/"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-all"
                title="Instagram oficial"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={clubInfo?.facebook_url || "https://www.facebook.com/clubyanapuma/photos?locale=es_LA"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-all"
                title="Facebook oficial"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#FFD700]/20 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Yanapuma FC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
