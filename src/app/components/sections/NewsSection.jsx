import React from 'react';
import { Calendar, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

const defaultImagePlaceholder = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%23141414"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23ffd700" font-weight="bold">Yanapuma FC</text><text x="50%" y="62%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23666">Noticia sin Imagen</text></svg>`;

export default function NewsSection({ navigateTo, newsList }) {
  // Only display published news (already filtered by backend, but safe check)
  const publishedNews = newsList.filter(n => n.publicado !== false);

  // Sort: Featured first, then by date (newest first)
  const sortedNews = [...publishedNews].sort((a, b) => {
    if (a.destacado && !b.destacado) return -1;
    if (!a.destacado && b.destacado) return 1;
    return new Date(b.fecha_publicacion || b.created_at) - new Date(a.fecha_publicacion || a.created_at);
  });

  // Limit to the latest 3 news cards
  const latestNews = sortedNews.slice(0, 3);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Reciente';
    try {
      const dateObj = new Date(dateStr + 'T00:00:00');
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    } catch (e) {
      return dateStr;
    }
  };

  const handleImageError = (e) => {
    e.target.src = defaultImagePlaceholder;
  };

  if (latestNews.length === 0) {
    return null; // Don't render section if there are no published news
  }

  return (
    <section id="noticias" className="py-24 px-4 bg-gradient-to-b from-[#121212] via-black to-[#0c0c0c] border-t border-[#FFD700]/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[10px] uppercase tracking-widest text-[#FFD700] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Noticias & Actualidad
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Últimas <span className="text-[#FFD700]">Novedades</span>
            </h2>
            <div className="w-20 h-[3px] bg-gradient-to-r from-[#FFD700] to-transparent mt-4 rounded-full"></div>
          </div>
          
          <button 
            onClick={() => navigateTo('/noticias')}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFD700] hover:text-white transition-colors cursor-pointer group"
          >
            Ver todas las noticias 
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* News Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {latestNews.map((news) => (
            <article 
              key={news.id} 
              className={`bg-[#0b0b0b] border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-103 group ${
                news.destacado 
                  ? 'border-[#FFD700]/40 hover:border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.03)] hover:shadow-[0_0_30px_rgba(255,215,0,0.08)]' 
                  : 'border-zinc-900 hover:border-[#FFD700]/20'
              }`}
            >
              {/* Image & Category tag */}
              <div className="relative aspect-video overflow-hidden bg-zinc-900">
                <img 
                  src={news.imagen_url || defaultImagePlaceholder} 
                  alt={news.titulo}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category Badge */}
                {news.categoria && (
                  <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded bg-black/85 border border-zinc-800 text-[9px] font-black uppercase text-[#FFD700] tracking-widest z-10">
                    {news.categoria}
                  </span>
                )}

                {/* Destacado Tag */}
                {news.destacado && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded bg-[#FFD700] text-[8px] font-black uppercase text-black tracking-widest z-10 shadow-md">
                    Destacado
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  {/* Date & Views */}
                  <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-bold mb-3 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#FFD700]/60" />
                      {formatDate(news.fecha_publicacion)}
                    </span>
                    <span>•</span>
                    <span>{news.vistas || 0} vistas</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-white group-hover:text-[#FFD700] transition-colors leading-tight mb-3 line-clamp-2">
                    {news.titulo}
                  </h3>

                  {/* Extract */}
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 mb-6">
                    {news.extracto || (news.contenido ? news.contenido.replace(/<[^>]*>/g, '') : '')}
                  </p>
                </div>

                {/* Read more button */}
                <button 
                  onClick={() => navigateTo(`/noticias/${news.slug}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#FFD700] transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#FFD700]" />
                  Leer más
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
