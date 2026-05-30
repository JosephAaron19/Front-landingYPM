import React, { useState, useEffect } from 'react';
import { Calendar, ArrowLeft, Eye, User, BookOpen, Sparkles } from 'lucide-react';

const defaultImagePlaceholder = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%23141414"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23ffd700" font-weight="bold">Yanapuma FC</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23666">Noticia sin Imagen</text></svg>`;

export default function NewsDetail({ slug, navigateTo }) {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiBase = import.meta.env.DEV
          ? 'http://localhost:8002/api'
          : (import.meta.env.VITE_API_BASE_URL || `${window.location.origin}/api`);
        const res = await fetch(`${apiBase}/noticias/${slug}`);
        if (!res.ok) {
          throw new Error('No se pudo encontrar la noticia especificada.');
        }
        const data = await res.json();
        setNews(data);

        // SEO Optimization: Update document title and meta description
        const originalTitle = document.title;
        document.title = `${data.meta_title || data.titulo} | Yanapuma FC`;

        const metaDesc = document.querySelector('meta[name="description"]');
        let originalDesc = "";
        if (metaDesc) {
          originalDesc = metaDesc.getAttribute('content');
          metaDesc.setAttribute('content', data.meta_description || data.extracto || '');
        }

        // Return cleanup function to restore tags on unmount
        return () => {
          document.title = originalTitle;
          if (metaDesc) {
            metaDesc.setAttribute('content', originalDesc);
          }
        };
      } catch (err) {
        console.error("Error loading news detail:", err);
        setError(err.message || 'Error al cargar la noticia.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Reciente';
    try {
      const dateObj = new Date(dateStr + 'T00:00:00');
      const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
      return `${dateObj.getDate()} de ${months[dateObj.getMonth()]} de ${dateObj.getFullYear()}`;
    } catch (e) {
      return dateStr;
    }
  };

  const handleImageError = (e) => {
    e.target.src = defaultImagePlaceholder;
  };

  const renderContent = (contentStr) => {
    if (!contentStr) return null;
    
    // Check if it looks like HTML
    const isHtml = /<[a-z][\s\S]*>/i.test(contentStr);
    
    if (isHtml) {
      return (
        <div 
          className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: contentStr }}
        />
      );
    }

    // Render plain text split into paragraphs
    return (
      <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
        {contentStr.split('\n').filter(p => p.trim() !== '').map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-4 bg-black min-h-screen flex items-center justify-center">
        <div className="text-[#FFD700] text-center font-bold tracking-wider uppercase text-sm">
          <div className="w-8 h-8 border-2 border-t-transparent border-[#FFD700] rounded-full animate-spin mx-auto mb-4"></div>
          Cargando noticia...
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="pt-32 pb-24 px-4 bg-black min-h-screen flex items-center justify-center">
        <div className="bg-[#0b0b0b] border border-zinc-950 rounded-2xl p-12 text-center max-w-md w-full">
          <div className="text-red-500 font-bold mb-4">¡Ha ocurrido un error!</div>
          <p className="text-zinc-400 text-xs mb-8 leading-relaxed">{error || 'La noticia no está disponible.'}</p>
          <button
            onClick={() => navigateTo('/noticias')}
            className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-wider text-[#FFD700] hover:text-black hover:bg-[#FFD700] transition-all rounded-lg cursor-pointer"
          >
            Volver al listado
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 bg-gradient-to-b from-black via-[#0c0c0c] to-black min-h-screen relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex justify-between items-center mb-8 border-b border-zinc-900/60 pb-4">
          <button 
            onClick={() => navigateTo('/noticias')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-[#FFD700] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver a Noticias
          </button>
          
          <button 
            onClick={() => navigateTo('/')}
            className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            Inicio
          </button>
        </div>

        {/* Article header details */}
        <header className="mb-8">
          {/* Category */}
          {news.categoria && (
            <span className="inline-block px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[9px] uppercase tracking-widest text-[#FFD700] mb-4 font-black">
              {news.categoria}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase mb-4 tracking-tight">
            {news.titulo}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-500 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#FFD700]" />
              {formatDate(news.fecha_publicacion)}
            </span>
            {news.autor && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#FFD700]" />
                Escrito por: {news.autor}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#FFD700]" />
              {news.vistas || 0} visitas
            </span>
          </div>
        </header>

        {/* Main Cover Image */}
        <div className="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 mb-10 shadow-lg">
          <img 
            src={news.imagen_url || defaultImagePlaceholder} 
            alt={news.titulo}
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
          {news.destacado && (
            <span className="absolute bottom-4 right-4 px-3 py-1 rounded bg-[#FFD700] text-[9px] font-black uppercase text-black tracking-widest shadow-md">
              Noticia Destacada
            </span>
          )}
        </div>

        {/* Extract blockquote if it exists */}
        {news.extracto && (
          <div className="border-l-4 border-[#FFD700] pl-6 py-1 my-8 italic text-zinc-400 text-sm md:text-base leading-relaxed bg-[#0b0b0b]/40 rounded-r-xl pr-4">
            {news.extracto}
          </div>
        )}

        {/* Full content body */}
        <div className="bg-[#0b0b0b] border border-zinc-900 rounded-2xl p-6 md:p-10 mb-12 shadow-md">
          {renderContent(news.contenido)}
        </div>

        {/* Bottom CTA returns */}
        <div className="text-center border-t border-zinc-900 pt-10">
          <button
            onClick={() => navigateTo('/noticias')}
            className="px-8 py-3.5 bg-zinc-950 border border-zinc-800 hover:bg-[#FFD700] hover:text-black transition-all text-xs font-black uppercase tracking-wider text-[#FFD700] rounded-xl cursor-pointer"
          >
            Regresar al listado de noticias
          </button>
        </div>

      </div>
    </div>
  );
}
