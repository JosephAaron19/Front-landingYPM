import React from 'react';
import { Trophy, Menu, X, Instagram, Facebook, Award } from 'lucide-react';
import logoImg from '../../../assets/yanapumas.png';
import { resolveImageUrl } from '../figma/ImageWithFallback';

export default function Navigation({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  setShowFullRoster,
  setIsMembershipModalOpen,
  clubInfo,
  menusList = [],
  navigateTo,
  currentPath
}) {
  const handleAnchorClick = (e, href) => {
    setShowFullRoster(false);
    if (href.startsWith('#')) {
      const isNotHome = currentPath !== '/' && currentPath !== '';
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
    <header className="fixed top-0 w-full z-50">
      {/* Upper Utility Ribbon (inspired by Alianza Lima) */}
      <div className="bg-[#0a0a0a] border-b border-[#FFD700]/10 text-white text-[10px] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span><strong className="text-[#FFD700] uppercase">Contacto:</strong> {clubInfo?.email_contacto || 'contacto@yanapumafc.com'}</span>
            <span className="w-[1px] h-3 bg-zinc-800"></span>
            <span><strong className="text-[#FFD700] uppercase">Ubicación:</strong> {clubInfo ? `${clubInfo.ciudad}, ${clubInfo.region}, ${clubInfo.pais}` : 'Iquitos, Loreto, Perú'}</span>
          </div>
          <div className="flex gap-4 items-center">
            <a 
              href={clubInfo?.instagram_url || "https://www.instagram.com/club_yanapuma/"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#FFD700] transition-colors"
              title="Instagram Oficial"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a 
              href={clubInfo?.facebook_url || "https://www.facebook.com/clubyanapuma/photos?locale=es_LA"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#FFD700] transition-colors"
              title="Facebook Oficial"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <span className="w-[1px] h-3 bg-zinc-800"></span>
            <span className="text-zinc-500 uppercase tracking-wider text-[8px]">Yanapuma Femenino FC</span>
          </div>
        </div>
      </div>

      {/* Main Premium Navbar */}
      <nav className="bg-black/95 backdrop-blur-sm border-b border-[#FFD700]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setShowFullRoster(false); navigateTo('/'); }}>
              <img src={resolveImageUrl(clubInfo?.logo_url, logoImg)} alt="Yanapuma FC Logo" className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.25)] hover:scale-105 transition-transform" />
              <span className="text-xl sm:text-2xl font-black text-[#FFD700] tracking-wider uppercase">YANAPUMA</span>
            </div>

            {/* Desktop Menu links */}
            <div className="hidden md:flex gap-8 items-center">
              {menusList.length > 0 ? (
                menusList.map(menu => {
                  if (menu.label.toLowerCase() === 'plantilla' || menu.label.toLowerCase() === 'plantel') {
                    return (
                      <button 
                        key={menu.id}
                        onClick={() => { setShowFullRoster(true); navigateTo('/'); }} 
                        className="text-sm font-bold uppercase tracking-wider hover:text-[#FFD700] transition-colors cursor-pointer"
                      >
                        {menu.label}
                      </button>
                    );
                  }
                  if (menu.href.startsWith('/noticias') || menu.label.toLowerCase() === 'noticias') {
                    return (
                      <button
                        key={menu.id}
                        onClick={() => { setShowFullRoster(false); navigateTo('/noticias'); }}
                        className="text-sm font-bold uppercase tracking-wider hover:text-[#FFD700] transition-colors cursor-pointer"
                      >
                        {menu.label}
                      </button>
                    );
                  }
                  return (
                    <a 
                      key={menu.id}
                      href={menu.href} 
                      className="text-sm font-bold uppercase tracking-wider hover:text-[#FFD700] transition-colors"
                      onClick={(e) => handleAnchorClick(e, menu.href)}
                    >
                      {menu.label}
                    </a>
                  );
                })
              ) : (
                <>
                  <a href="#inicio" onClick={(e) => handleAnchorClick(e, '#inicio')} className="text-sm font-bold uppercase tracking-wider hover:text-[#FFD700] transition-colors">Inicio</a>
                  <a href="#nosotras" onClick={(e) => handleAnchorClick(e, '#nosotras')} className="text-sm font-bold uppercase tracking-wider hover:text-[#FFD700] transition-colors">Nosotras</a>
                  <button 
                    onClick={() => { setShowFullRoster(true); navigateTo('/'); }} 
                    className="text-sm font-bold uppercase tracking-wider hover:text-[#FFD700] transition-colors cursor-pointer"
                  >
                    Plantel
                  </button>
                  <a href="#partidos" onClick={(e) => handleAnchorClick(e, '#partidos')} className="text-sm font-bold uppercase tracking-wider hover:text-[#FFD700] transition-colors">Partidos</a>
                  <a href="#galeria" onClick={(e) => handleAnchorClick(e, '#galeria')} className="text-sm font-bold uppercase tracking-wider hover:text-[#FFD700] transition-colors">Galería</a>
                  <button 
                    onClick={() => { setShowFullRoster(false); navigateTo('/noticias'); }}
                    className="text-sm font-bold uppercase tracking-wider hover:text-[#FFD700] transition-colors cursor-pointer"
                  >
                    Noticias
                  </button>
                  <a href="#contacto" onClick={(e) => handleAnchorClick(e, '#contacto')} className="text-sm font-bold uppercase tracking-wider hover:text-[#FFD700] transition-colors">Contacto</a>
                </>
              )}
            </div>

            {/* "HAZTE INCONDICIONAL" Button */}
            <button
              onClick={() => setIsMembershipModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#e6c200] hover:scale-105 text-black font-black text-[10px] uppercase tracking-widest rounded shadow-lg shadow-[#FFD700]/10 active:scale-95 transition-all cursor-pointer"
            >
              <Award className="w-4 h-4" />
              Hazte Incondicional
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#FFD700] cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-[#FFD700]/20">
            <div className="px-4 py-4 space-y-3">
              {menusList.length > 0 ? (
                menusList.map(menu => {
                  if (menu.label.toLowerCase() === 'plantilla' || menu.label.toLowerCase() === 'plantel') {
                    return (
                      <button 
                        key={menu.id}
                        onClick={() => { setShowFullRoster(true); setMobileMenuOpen(false); navigateTo('/'); }} 
                        className="block hover:text-[#FFD700] transition-colors text-left w-full cursor-pointer uppercase tracking-wider text-xs font-bold"
                      >
                        {menu.label}
                      </button>
                    );
                  }
                  if (menu.href.startsWith('/noticias') || menu.label.toLowerCase() === 'noticias') {
                    return (
                      <button
                        key={menu.id}
                        onClick={() => { setShowFullRoster(false); navigateTo('/noticias'); setMobileMenuOpen(false); }}
                        className="block hover:text-[#FFD700] transition-colors text-left w-full cursor-pointer uppercase tracking-wider text-xs font-bold"
                      >
                        {menu.label}
                      </button>
                    );
                  }
                  return (
                    <a 
                      key={menu.id}
                      href={menu.href} 
                      className="block hover:text-[#FFD700] transition-colors uppercase tracking-wider text-xs font-bold"
                      onClick={(e) => { handleAnchorClick(e, menu.href); setMobileMenuOpen(false); }}
                    >
                      {menu.label}
                    </a>
                  );
                })
              ) : (
                <>
                  <a href="#inicio" className="block hover:text-[#FFD700] transition-colors uppercase tracking-wider text-xs font-bold" onClick={(e) => { handleAnchorClick(e, '#inicio'); setMobileMenuOpen(false); }}>Inicio</a>
                  <a href="#nosotras" className="block hover:text-[#FFD700] transition-colors uppercase tracking-wider text-xs font-bold" onClick={(e) => { handleAnchorClick(e, '#nosotras'); setMobileMenuOpen(false); }}>Nosotras</a>
                  <button 
                    onClick={() => { setShowFullRoster(true); setMobileMenuOpen(false); navigateTo('/'); }} 
                    className="block hover:text-[#FFD700] transition-colors text-left w-full cursor-pointer uppercase tracking-wider text-xs font-bold"
                  >
                    Plantel
                  </button>
                  <a href="#partidos" className="block hover:text-[#FFD700] transition-colors uppercase tracking-wider text-xs font-bold" onClick={(e) => { handleAnchorClick(e, '#partidos'); setMobileMenuOpen(false); }}>Partidos</a>
                  <a href="#galeria" className="block hover:text-[#FFD700] transition-colors uppercase tracking-wider text-xs font-bold" onClick={(e) => { handleAnchorClick(e, '#galeria'); setMobileMenuOpen(false); }}>Galería</a>
                  <button 
                    onClick={() => { setShowFullRoster(false); navigateTo('/noticias'); setMobileMenuOpen(false); }}
                    className="block hover:text-[#FFD700] transition-colors text-left w-full cursor-pointer uppercase tracking-wider text-xs font-bold"
                  >
                    Noticias
                  </button>
                  <a href="#contacto" className="block hover:text-[#FFD700] transition-colors uppercase tracking-wider text-xs font-bold" onClick={(e) => { handleAnchorClick(e, '#contacto'); setMobileMenuOpen(false); }}>Contacto</a>
                </>
              )}
              <button 
                onClick={() => { setIsMembershipModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-2.5 mt-2 bg-[#FFD700] text-black text-xs font-black uppercase tracking-widest rounded flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                Hazte Incondicional
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
