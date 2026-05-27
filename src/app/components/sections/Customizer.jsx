import React, { useState } from 'react';
import { Camera, RotateCcw, Sparkles, X } from 'lucide-react';

export default function Customizer({
  isCustomizerOpen,
  setIsCustomizerOpen,
  heroBgImage,
  setHeroBgImage,
  heroBgImage2,
  setHeroBgImage2,
  heroBgImage3,
  setHeroBgImage3,
  aboutImage,
  setAboutImage,
  galleryList,
  setGalleryList,
  staffList,
  setStaffList,
  gkList,
  setGkList,
  defList,
  setDefList,
  midList,
  setMidList,
  fwdList,
  setFwdList,
  resetToDefaultImages
}) {
  const [selectedCategory, setSelectedCategory] = useState('staff');
  const [selectedMemberName, setSelectedMemberName] = useState('María González');

  // Helper to handle player/staff image change
  const handlePlayerImageChange = (newUrl) => {
    if (selectedCategory === 'staff') {
      setStaffList(prev => prev.map(item => item.name === selectedMemberName ? { ...item, image: newUrl } : item));
    } else if (selectedCategory === 'gk') {
      setGkList(prev => prev.map(item => item.name === selectedMemberName ? { ...item, image: newUrl } : item));
    } else if (selectedCategory === 'def') {
      setDefList(prev => prev.map(item => item.name === selectedMemberName ? { ...item, image: newUrl } : item));
    } else if (selectedCategory === 'mid') {
      setMidList(prev => prev.map(item => item.name === selectedMemberName ? { ...item, image: newUrl } : item));
    } else if (selectedCategory === 'fwd') {
      setFwdList(prev => prev.map(item => item.name === selectedMemberName ? { ...item, image: newUrl } : item));
    }
  };

  // Helper to get active members list based on selected category
  const getCategoryMembers = () => {
    if (selectedCategory === 'staff') return staffList;
    if (selectedCategory === 'gk') return gkList;
    if (selectedCategory === 'def') return defList;
    if (selectedCategory === 'mid') return midList;
    if (selectedCategory === 'fwd') return fwdList;
    return [];
  };

  // Helper to find selected member image URL
  const getSelectedMemberImage = () => {
    const list = getCategoryMembers();
    const found = list.find(item => item.name === selectedMemberName);
    return found ? found.image : '';
  };

  return (
    <>
      {/* Floating Action Toggle Button */}
      <button
        onClick={() => setIsCustomizerOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-[#FFD700] text-black font-bold rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 border-2 border-black animate-pulse cursor-pointer"
        title="Personalizar Imágenes"
      >
        <Camera className="w-5 h-5" />
        <span className="hidden md:inline text-xs tracking-wider font-extrabold uppercase">Personalizar Fotos</span>
      </button>

      {/* Sidebar Drawer */}
      {isCustomizerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCustomizerOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-md bg-[#0e0e0e]/95 backdrop-blur-md border-l border-[#FFD700]/20 h-full shadow-2xl p-6 overflow-y-auto flex flex-col z-10 transition-all">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#FFD700]/10 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFD700]" />
                <h2 className="text-xl font-bold tracking-wide text-white">Panel de Fotos</h2>
              </div>
              <button 
                onClick={() => setIsCustomizerOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-[#FFD700] transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Customizer Instructions */}
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Pega cualquier URL de imagen aquí. Gracias al escalado inteligente <code className="text-[#FFD700] bg-black px-1 py-0.5 rounded">object-cover</code>, las fotos se adaptarán de forma óptima a los marcos sin estirarse.
            </p>

            <div className="flex-1 space-y-6">
              {/* Section 1: Hero & About */}
              <div className="space-y-4 bg-black/40 p-4 rounded-lg border border-[#FFD700]/5">
                <h3 className="font-semibold text-[#FFD700] text-sm uppercase tracking-wider">Imágenes de Secciones</h3>
                
                {/* Hero BG 1 */}
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Fondo Inicio - Diapositiva 1</label>
                  <input
                    type="text"
                    value={heroBgImage}
                    onChange={(e) => setHeroBgImage(e.target.value)}
                    placeholder="URL de la imagen 1"
                    className="w-full px-3 py-2 bg-black/80 text-xs border border-[#FFD700]/20 rounded text-gray-200 focus:outline-none focus:border-[#FFD700] transition-all"
                  />
                </div>

                {/* Hero BG 2 */}
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Fondo Inicio - Diapositiva 2</label>
                  <input
                    type="text"
                    value={heroBgImage2}
                    onChange={(e) => setHeroBgImage2(e.target.value)}
                    placeholder="URL de la imagen 2"
                    className="w-full px-3 py-2 bg-black/80 text-xs border border-[#FFD700]/20 rounded text-gray-200 focus:outline-none focus:border-[#FFD700] transition-all"
                  />
                </div>

                {/* Hero BG 3 */}
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Fondo Inicio - Diapositiva 3</label>
                  <input
                    type="text"
                    value={heroBgImage3}
                    onChange={(e) => setHeroBgImage3(e.target.value)}
                    placeholder="URL de la imagen 3"
                    className="w-full px-3 py-2 bg-black/80 text-xs border border-[#FFD700]/20 rounded text-gray-200 focus:outline-none focus:border-[#FFD700] transition-all"
                  />
                </div>

                {/* About US */}
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Imagen "Sobre Nosotras"</label>
                  <input
                    type="text"
                    value={aboutImage}
                    onChange={(e) => setAboutImage(e.target.value)}
                    placeholder="URL de la imagen de historia"
                    className="w-full px-3 py-2 bg-black/80 text-xs border border-[#FFD700]/20 rounded text-gray-200 focus:outline-none focus:border-[#FFD700] transition-all"
                  />
                </div>
              </div>

              {/* Section 2: Staff & Roster (Plantel) */}
              <div className="space-y-4 bg-black/40 p-4 rounded-lg border border-[#FFD700]/5">
                <h3 className="font-semibold text-[#FFD700] text-sm uppercase tracking-wider">Cuerpo Técnico y Plantel</h3>
                
                <div className="grid grid-cols-2 gap-2">
                  {/* Category Selector */}
                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1">Categoría</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        const cat = e.target.value;
                        setSelectedCategory(cat);
                        // Default to first member of category to avoid crash
                        const firstVal = 
                          cat === 'staff' ? 'John Ortega' :
                          cat === 'gk' ? 'Flavia Aquino' :
                          cat === 'def' ? 'Lucero Prada' :
                          cat === 'mid' ? 'Esther Díaz' : 'Sabrina Ramírez';
                        setSelectedMemberName(firstVal);
                      }}
                      className="w-full px-2 py-1.5 bg-black text-xs border border-[#FFD700]/20 rounded text-gray-300 focus:outline-none"
                    >
                      <option value="staff">Cuerpo Técnico</option>
                      <option value="gk">Arqueras</option>
                      <option value="def">Defensas</option>
                      <option value="mid">Mediocampistas</option>
                      <option value="fwd">Delanteras</option>
                    </select>
                  </div>

                  {/* Member Selector */}
                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1">Persona</label>
                    <select
                      value={selectedMemberName}
                      onChange={(e) => setSelectedMemberName(e.target.value)}
                      className="w-full px-2 py-1.5 bg-black text-xs border border-[#FFD700]/20 rounded text-gray-300 focus:outline-none"
                    >
                      {getCategoryMembers().map(member => (
                        <option key={member.name} value={member.name}>{member.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Member Image URL Input */}
                <div>
                  <label className="block text-xs text-gray-300 mb-1">
                    Foto de {selectedMemberName}
                  </label>
                  <input
                    type="text"
                    value={getSelectedMemberImage()}
                    onChange={(e) => handlePlayerImageChange(e.target.value)}
                    placeholder="URL de la imagen"
                    className="w-full px-3 py-2 bg-black/80 text-xs border border-[#FFD700]/20 rounded text-gray-200 focus:outline-none focus:border-[#FFD700] transition-all"
                  />
                </div>
              </div>

              {/* Section 3: Gallery */}
              <div className="space-y-4 bg-black/40 p-4 rounded-lg border border-[#FFD700]/5">
                <h3 className="font-semibold text-[#FFD700] text-sm uppercase tracking-wider">Galería de Fotos</h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {galleryList.map((url, index) => (
                    <div key={index}>
                      <label className="block text-[10px] text-gray-400 mb-0.5">Imagen de Galería {index + 1}</label>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => {
                          const newUrl = e.target.value;
                          setGalleryList(prev => {
                            const copy = [...prev];
                            copy[index] = newUrl;
                            return copy;
                          });
                        }}
                        placeholder={`URL de Galería ${index + 1}`}
                        className="w-full px-3 py-1.5 bg-black/80 text-xs border border-[#FFD700]/20 rounded text-gray-300 focus:outline-none focus:border-[#FFD700] transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions / Reset */}
            <div className="pt-6 border-t border-[#FFD700]/10 mt-6 flex gap-3">
              <button
                onClick={resetToDefaultImages}
                className="flex-1 py-2 border border-[#FFD700]/30 hover:border-[#FFD700] text-xs text-[#FFD700] rounded font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 bg-black cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restablecer Todo
              </button>
              <button
                onClick={() => setIsCustomizerOpen(false)}
                className="flex-1 py-2 bg-[#FFD700] text-black text-xs font-bold rounded hover:bg-[#FFD700]/80 transition-all active:scale-95 cursor-pointer text-center"
              >
                Guardar Vista
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
