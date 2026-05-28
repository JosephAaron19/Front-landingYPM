import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles, Terminal } from 'lucide-react';

export default function Contact({ clubInfo }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (name.trim() && email.trim() && message.trim()) {
      try {
        const response = await fetch('http://localhost:8000/api/contacto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: name,
            email: email,
            mensaje: message,
            asunto: 'Contacto desde la Web',
            telefono: '',
          }),
        });

        if (response.ok) {
          setSubmitted(true);
        } else {
          const errData = await response.json();
          setError(errData.message || 'Error al enviar el mensaje.');
        }
      } catch (err) {
        console.error("Error submitting contact form:", err);
        setError('No se pudo conectar con el servidor. Inténtelo de nuevo.');
      }
    }
  };

  return (
    <section id="contacto" className="py-24 px-4 bg-gradient-to-b from-[#121212] via-black to-[#0a0a0a] border-t border-[#FFD700]/5 overflow-hidden relative">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[10px] uppercase tracking-widest text-[#FFD700] mb-3">
            <Terminal className="w-3.5 h-3.5" />
            Canal de Comunicación
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Contáctanos
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-stretch">
          
          {/* Info cards (Left 2/5ths) */}
          <div className="md:col-span-2 space-y-5 flex flex-col justify-center">
            
            {/* Card A */}
            <div className="bg-[#0b0b0b] border border-zinc-950 hover:border-[#FFD700]/30 rounded-xl p-5 flex items-center gap-4 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center shadow-lg shadow-[#FFD700]/15 group-hover:scale-105 transition-transform duration-300">
                <Mail className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-extrabold text-[10px] text-zinc-500 uppercase tracking-widest">Escríbenos</h3>
                <p className="text-sm font-semibold text-white mt-0.5">{clubInfo?.email || 'contacto@yanapuma.com'}</p>
              </div>
            </div>

            {/* Card B */}
            <div className="bg-[#0b0b0b] border border-zinc-950 hover:border-[#FFD700]/30 rounded-xl p-5 flex items-center gap-4 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center shadow-lg shadow-[#FFD700]/15 group-hover:scale-105 transition-transform duration-300">
                <Phone className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-extrabold text-[10px] text-zinc-500 uppercase tracking-widest">Llámanos</h3>
                <p className="text-sm font-semibold text-white mt-0.5">{clubInfo?.telefono || '+51 987 654 321'}</p>
              </div>
            </div>

            {/* Card C */}
            <div className="bg-[#0b0b0b] border border-zinc-950 hover:border-[#FFD700]/30 rounded-xl p-5 flex items-center gap-4 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center shadow-lg shadow-[#FFD700]/15 group-hover:scale-105 transition-transform duration-300">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-extrabold text-[10px] text-zinc-500 uppercase tracking-widest">Sede Oficial</h3>
                <p className="text-sm font-semibold text-white mt-0.5">{clubInfo?.direccion || 'Iquitos, Loreto, Perú'}</p>
              </div>
            </div>

          </div>

          {/* Glowing Glassmorphic Terminal Form (Right 3/5ths) */}
          <div className="md:col-span-3 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#FFD700]/25 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
            {/* HUD Corner Decorators */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#FFD700]/40 z-20 pointer-events-none"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#FFD700]/40 z-20 pointer-events-none"></div>

            {!submitted ? (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Nombre del Hincha</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black border border-zinc-900 rounded-lg focus:outline-none focus:border-[#FFD700] text-sm text-gray-200 transition-colors focus:shadow-[0_0_15px_rgba(255,215,0,0.05)]"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Correo Electrónico</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black border border-zinc-900 rounded-lg focus:outline-none focus:border-[#FFD700] text-sm text-gray-200 transition-colors focus:shadow-[0_0_15px_rgba(255,215,0,0.05)]"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Escribe tu Mensaje</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-black border border-zinc-900 rounded-lg focus:outline-none focus:border-[#FFD700] text-sm text-gray-200 transition-colors focus:shadow-[0_0_15px_rgba(255,215,0,0.05)]"
                    placeholder="Escribe tu consulta sobre entradas, plantel o convenios..."
                  ></textarea>
                </div>

                {error && (
                  <div className="text-red-500 text-xs font-bold bg-red-500/10 border border-red-500/30 rounded p-2.5">
                    {error}
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full py-3 bg-[#FFD700] hover:bg-[#e6c200] text-black font-black uppercase tracking-wider text-xs rounded-lg shadow-lg hover:scale-101 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Enviar Transmisión
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-5">
                <div className="w-14 h-14 bg-[#FFD700]/10 border border-[#FFD700]/40 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Sparkles className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-[#FFD700] uppercase tracking-wide">¡Mensaje Transmitido!</h4>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed mt-2">
                    Hola <strong>{name}</strong>, tu comunicación ha sido encriptada y enviada a la central de Yanapuma FC. Te responderemos en un plazo máximo de 24 horas a <span className="underline text-white">{email}</span>.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setName('');
                    setEmail('');
                    setMessage('');
                    setSubmitted(false);
                  }}
                  className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-white font-extrabold text-[10px] uppercase tracking-wider rounded hover:bg-zinc-800 active:scale-95 transition-all"
                >
                  Enviar otro mensaje
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
