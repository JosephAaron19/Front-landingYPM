import React, { useState, useMemo } from 'react';
import { Calendar, Search, ArrowLeft, BookOpen, Sparkles, Filter } from 'lucide-react';

const defaultImagePlaceholder = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%23141414"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23ffd700" font-weight="bold">Yanapuma FC</text><text x="50%" y="62%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23666">Noticia sin Imagen</text></svg>`;

export default function NewsList({ navigateTo, newsList }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [visibleCount, setVisibleCount] = useState(6);

  // Extract unique categories from list
  const categories = useMemo(() => {
    const cats = new Set();
    newsList.forEach(n => {
      if (n.categoria && n.publicado !== false) {
        cats.add(n.categoria);
      }
    });
    return ['Todas', ...Array.from(cats)];
  }, [newsList]);

  // Filter and sort news list
  const filteredNews = useMemo(() => {
    const publishedNews = newsList.filter(n => n.publicado !== false);
    
    // Sort: Featured first, then by date newest first
    const sorted = [...publishedNews].sort((a, b) => {
      if (a.destacado && !b.destacado) return -1;
      if (!a.destacado && b.destacado) return 1;
      return new Date(b.fecha_publicacion || b.created_at) - new Date(a.fecha_publicacion || a.created_at);
    });

    return sorted.filter(news => {
      const matchesSearch = 
        news.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (news.extracto && news.extracto.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (news.contenido && news.contenido.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Todas' || news.categoria === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [newsList, searchTerm, selectedCategory]);

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

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="pt-32 pb-24 px-4 bg-gradient-to-b from-black via-[#0c0c0c] to-[#050505] min-h-screen relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <button 
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-[#FFD700] transition-colors mb-8 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Volver al Inicio
        </button>

        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[10px] uppercase tracking-widest text-[#FFD700] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Yanapuma Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Todas las <span className="text-[#FFD700]">Noticias</span>
          </h1>
          <div className="w-24 h-[3px] bg-gradient-to-r from-[#FFD700] to-transparent mt-4 rounded-full"></div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#0b0b0b] border border-zinc-900 rounded-2xl p-6 mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar noticias..." 
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setVisibleCount(6); // Reset pagination on filter
              }}
              className="w-full pl-11 pr-4 py-3 bg-black/60 border border-zinc-800 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFD700]/40 transition-colors"
            />
          </div>

          {/* Category selector tags */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-zinc-500 shrink-0" />
            <div className="flex gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(6); // Reset pagination on filter
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#FFD700] text-black shadow-lg shadow-[#FFD700]/5'
                      : 'bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results summary */}
        {searchTerm && (
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-6 font-bold">
            Resultados de búsqueda: {filteredNews.length} noticia(s) encontrada(s)
          </div>
        )}

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredNews.slice(0, visibleCount).map((news) => (
            <article 
              key={news.id} 
              className={`bg-[#0b0b0b] border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-103 group ${
                news.destacado 
                  ? 'border-[#FFD700]/40 hover:border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.02)] hover:shadow-[0_0_30px_rgba(255,215,0,0.06)]' 
                  : 'border-zinc-900 hover:border-[#FFD700]/20'
              }`}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-zinc-900">
                <img 
                  src={news.imagen_url || defaultImagePlaceholder} 
                  alt={news.titulo}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category Badge */}
                {news.categoria && (
                  <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded bg-black/80 border border-zinc-800 text-[9px] font-black uppercase text-[#FFD700] tracking-widest z-10">
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

        {/* Empty state */}
        {filteredNews.length === 0 && (
          <div className="bg-[#0b0b0b] border border-zinc-950 rounded-2xl p-12 text-center text-zinc-500">
            No se encontraron noticias con los filtros seleccionados.
          </div>
        )}

        {/* Load More Button */}
        {filteredNews.length > visibleCount && (
          <div className="text-center mt-16">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3.5 bg-zinc-950 border border-zinc-800 text-xs font-black uppercase tracking-widest text-[#FFD700] hover:text-black hover:bg-[#FFD700] transition-all duration-300 rounded-xl cursor-pointer active:scale-95 shadow-md hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]"
            >
              Cargar más noticias
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
