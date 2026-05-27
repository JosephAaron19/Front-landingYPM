import React, { useState } from 'react';
import { X, Award, ShieldCheck, Check } from 'lucide-react';

export default function MembershipModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState('pantera');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  const tiers = [
    {
      id: 'fiera',
      name: 'Fiera',
      price: '$5.00 / mes',
      accent: 'border-zinc-700 text-zinc-400',
      perks: [
        'Carnet Digital de Aficionada',
        'Participación en Sorteos Oficiales',
        'Boletín Institucional Mensual'
      ]
    },
    {
      id: 'pantera',
      name: 'Pantera',
      price: '$12.00 / mes',
      accent: 'border-[#FFD700] text-[#FFD700]',
      popular: true,
      perks: [
        'Carnet Físico Coleccionable',
        '10% Descuento en Tienda Yanapuma',
        'Preventa Prioritaria de Entradas',
        'Acceso a Entrenamientos Abiertos'
      ]
    },
    {
      id: 'yanapuma',
      name: 'Yanapuma VIP',
      price: '$25.00 / mes',
      accent: 'border-[#e6c200] text-[#FFD700]',
      perks: [
        'Camiseta Oficial autografiada anual',
        '20% Descuento en Tienda Yanapuma',
        'Acreditación VIP & Butaca en Palco',
        'Meet & Greet con Jugadoras Estrella',
        'Entrada Libre a Partidos Locales'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all">
      <div 
        className="absolute inset-0 bg-transparent"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-[#0b0b0b] border border-[#FFD700]/30 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row animate-scale-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-[#FFD700] transition-colors z-20 cursor-pointer p-1 bg-black/60 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left column: Brand/Promo */}
        <div className="md:w-2/5 bg-gradient-to-br from-[#121212] via-black to-[#1a1a1a] p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#FFD700]/10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-[#FFD700]" />
              <span className="text-xs font-black uppercase tracking-widest text-[#FFD700]">PROGRAMA DE SOCIAS</span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase leading-tight">
              SÉ PARTE DE LA <span className="text-[#FFD700]">GARRA INCONDICIONAL</span>
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed mt-4">
              Sé parte del primer club de socias exclusivas del fútbol femenino de Yanapuma. Disfruta de beneficios directos, merch autografiada y experiencias inmersivas con nuestro primer equipo.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#FFD700]/10 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#FFD700]" />
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Membresías Oficiales Yanapuma FC</span>
          </div>
        </div>

        {/* Right column: Tiers & Sign Up */}
        <div className="md:w-3/5 p-8 flex flex-col justify-between bg-black/40">
          {!submitted ? (
            <div className="space-y-6">
              <div className="text-sm font-bold text-white mb-2 uppercase">Elige tu Membresía:</div>

              {/* Tiers list */}
              <div className="grid sm:grid-cols-3 gap-3">
                {tiers.map((tier) => (
                  <div 
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`bg-[#0f0f0f] border-2 rounded-xl p-4 cursor-pointer hover:border-[#FFD700]/50 transition-all flex flex-col justify-between text-left relative ${
                      selectedTier === tier.id ? 'border-[#FFD700] shadow-lg shadow-[#FFD700]/5 bg-[#121212]' : 'border-zinc-800'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2 left-4 px-2 py-0.5 bg-[#FFD700] text-black font-extrabold text-[8px] uppercase tracking-wider rounded">
                        Popular
                      </span>
                    )}
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{tier.name}</h4>
                      <p className="text-[#FFD700] font-black text-xs mt-1">{tier.price}</p>
                    </div>

                    <ul className="space-y-1.5 mt-4 text-[9px] text-gray-400 flex-1">
                      {tier.perks.slice(0, 3).map((perk, i) => (
                        <li key={i} className="flex gap-1 items-start">
                          <Check className="w-3 h-3 text-[#FFD700] shrink-0 mt-0.5" />
                          <span className="truncate">{perk}</span>
                        </li>
                      ))}
                      {tier.perks.length > 3 && (
                        <li className="text-[8px] text-[#FFD700] italic font-semibold">
                          +{tier.perks.length - 3} más
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Sub Email Form */}
              <form onSubmit={handleSubmit} className="pt-4 border-t border-zinc-900 space-y-3">
                <label className="block text-[10px] text-zinc-400 uppercase tracking-widest font-extrabold">
                  Ingresa tu correo electrónico para postular
                </label>
                <div className="flex gap-2">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="flex-1 px-4 py-2.5 bg-[#101010] border border-[#FFD700]/20 rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD700]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Postular
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-12 space-y-6 flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 bg-[#FFD700]/10 border border-[#FFD700] rounded-full flex items-center justify-center animate-bounce">
                <Award className="w-8 h-8 text-[#FFD700]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-[#FFD700] uppercase tracking-wide">¡Solicitud Recibida!</h4>
                <p className="text-zinc-300 text-sm max-w-sm mx-auto leading-relaxed">
                  Hemos enviado los pasos de facturación digital y registro para el <strong>Tier {tiers.find(t => t.id === selectedTier).name}</strong> a <span className="text-[#FFD700] underline">{email}</span>.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                  onClose();
                }}
                className="px-6 py-2 bg-[#FFD700] text-black font-extrabold text-xs uppercase tracking-wider rounded shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Cerrar Ventana
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
