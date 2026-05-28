import { useState, useEffect } from 'react';
import Navigation from './components/sections/Navigation';
import Hero from './components/sections/Hero';
import ClubHighlights from './components/sections/ClubHighlights';
import About from './components/sections/About';
import Roster from './components/sections/Roster';
import Matches from './components/sections/Matches';
import Gallery from './components/sections/Gallery';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

import Sponsors from './components/sections/Sponsors';
import MembershipModal from './components/sections/MembershipModal';

// Import initial player lists, staff lists, matches, and images
import {
  INITIAL_HERO_BG,
  INITIAL_HERO_BG2,
  INITIAL_HERO_BG3,
  INITIAL_ABOUT_IMG,
  INITIAL_STAFF,
  INITIAL_GK,
  INITIAL_DEF,
  INITIAL_MID,
  INITIAL_FWD,
  INITIAL_GALLERY,
  NEXT_MATCHES
} from './data/defaultData';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFullRoster, setShowFullRoster] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);

  // Dynamic States for Customizable Images & Roster
  const [heroBgImage, setHeroBgImage] = useState(INITIAL_HERO_BG);
  const [heroBgImage2, setHeroBgImage2] = useState(INITIAL_HERO_BG2);
  const [heroBgImage3, setHeroBgImage3] = useState(INITIAL_HERO_BG3);
  const [aboutImage, setAboutImage] = useState(INITIAL_ABOUT_IMG);
  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [gkList, setGkList] = useState(INITIAL_GK);
  const [defList, setDefList] = useState(INITIAL_DEF);
  const [midList, setMidList] = useState(INITIAL_MID);
  const [fwdList, setFwdList] = useState(INITIAL_FWD);
  const [galleryList, setGalleryList] = useState(INITIAL_GALLERY);

  // New integration states
  const [clubInfo, setClubInfo] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [slides, setSlides] = useState([]);
  const [aboutInfo, setAboutInfo] = useState(null);
  const [valores, setValores] = useState([]);
  const [matches, setMatches] = useState(NEXT_MATCHES);
  const [sponsors, setSponsors] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [menus, setMenus] = useState([]);
  const [nextMatch, setNextMatch] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch Club config
        const clubRes = await fetch('http://localhost:8000/api/club');
        if (clubRes.ok) {
          const clubData = await clubRes.json();
          if (clubData && clubData.length > 0) {
            setClubInfo(clubData[0]);
          }
        }
      } catch (e) {
        console.error("Error loading club info from API:", e);
      }

      try {
        // Fetch Hero Slides
        const slidesRes = await fetch('http://localhost:8000/api/hero/slides');
        if (slidesRes.ok) {
          const slidesData = await slidesRes.json();
          if (slidesData && slidesData.length > 0) {
            setSlides(slidesData);
            if (slidesData[0]?.imagen_url) setHeroBgImage(slidesData[0].imagen_url);
            if (slidesData[1]?.imagen_url) setHeroBgImage2(slidesData[1].imagen_url);
            if (slidesData[2]?.imagen_url) setHeroBgImage3(slidesData[2].imagen_url);
          }
        }
      } catch (e) {
        console.error("Error loading slides from API:", e);
      }

      try {
        // Fetch Hero Announcements
        const annRes = await fetch('http://localhost:8000/api/hero/anuncios');
        if (annRes.ok) {
          const annData = await annRes.json();
          if (annData && annData.length > 0) {
            setAnnouncements(annData);
          }
        }
      } catch (e) {
        console.error("Error loading announcements from API:", e);
      }

      try {
        // Fetch Historia
        const histRes = await fetch('http://localhost:8000/api/historia');
        if (histRes.ok) {
          const histData = await histRes.json();
          if (histData) {
            setAboutInfo(histData);
            if (histData.imagen_url) setAboutImage(histData.imagen_url);
          }
        }
      } catch (e) {
        console.error("Error loading history from API:", e);
      }

      try {
        // Fetch Valores
        const valRes = await fetch('http://localhost:8000/api/valores');
        if (valRes.ok) {
          const valData = await valRes.json();
          if (valData && valData.length > 0) {
            setValores(valData);
          }
        }
      } catch (e) {
        console.error("Error loading values from API:", e);
      }

      try {
        // Fetch Plantel
        const plantelRes = await fetch('http://localhost:8000/api/plantel');
        if (plantelRes.ok) {
          const plantelData = await plantelRes.json();
          if (plantelData && plantelData.length > 0) {
            // Map player lists based on category (supporting both singular/plural and ID match)
            const staff = plantelData.filter(p => p.categoria.id === 1 || p.categoria.slug === 'cuerpo-tecnico')
              .map(p => ({ name: `${p.nombres} ${p.apellidos}`, role: p.rol, image: p.foto_url }));
            const gk = plantelData.filter(p => p.categoria.id === 2 || p.categoria.slug === 'arqueras' || p.categoria.slug === 'arquero')
              .map(p => ({ number: p.dorsal || 1, name: `${p.nombres} ${p.apellidos}`, age: p.edad || 20, image: p.foto_url, position: p.rol }));
            const def = plantelData.filter(p => p.categoria.id === 3 || p.categoria.slug === 'defensas' || p.categoria.slug === 'defensa')
              .map(p => ({ number: p.dorsal || 2, name: `${p.nombres} ${p.apellidos}`, age: p.edad || 20, image: p.foto_url, position: p.rol }));
            const mid = plantelData.filter(p => p.categoria.id === 4 || p.categoria.slug === 'mediocampistas' || p.categoria.slug === 'mediocampo')
              .map(p => ({ number: p.dorsal || 6, name: `${p.nombres} ${p.apellidos}`, age: p.edad || 20, image: p.foto_url, position: p.rol }));
            const fwd = plantelData.filter(p => p.categoria.id === 5 || p.categoria.slug === 'delanteras' || p.categoria.slug === 'delantero')
              .map(p => ({ number: p.dorsal || 9, name: `${p.nombres} ${p.apellidos}`, age: p.edad || 20, image: p.foto_url, position: p.rol }));

            if (staff.length > 0) setStaffList(staff);
            if (gk.length > 0) setGkList(gk);
            if (def.length > 0) setDefList(def);
            if (mid.length > 0) setMidList(mid);
            if (fwd.length > 0) setFwdList(fwd);
          }
        }
      } catch (e) {
        console.error("Error loading roster from API:", e);
      }

      try {
        // Fetch Matches
        const matchesRes = await fetch('http://localhost:8000/api/partidos');
        if (matchesRes.ok) {
          const matchesData = await matchesRes.json();
          if (matchesData && matchesData.length > 0) {
            const formatted = matchesData.map((m, idx) => {
              const isLocal = m.equipo_local.toLowerCase().includes('yanapuma');
              const opponent = isLocal ? m.equipo_visitante : m.equipo_local;
              
              // Format Date
              let formattedDate = m.fecha;
              try {
                const dateObj = new Date(m.fecha + 'T00:00:00');
                const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
              } catch (err) {}

              return {
                date: formattedDate,
                opponent: opponent,
                location: m.estadio || 'Campo Yanapuma',
                time: m.hora ? m.hora.substring(0, 5) : '15:00',
                isProximo: m.es_proximo,
                isLocal: m.es_local
              };
            });
            setMatches(formatted);
          }
        }
      } catch (e) {
        console.error("Error loading matches from API:", e);
      }

      try {
        // Fetch Gallery
        const galRes = await fetch('http://localhost:8000/api/galeria');
        if (galRes.ok) {
          const galData = await galRes.json();
          if (galData && galData.length > 0) {
            setGalleryList(galData.map(item => item.url));
          }
        }
      } catch (e) {
        console.error("Error loading gallery from API:", e);
      }

      try {
        // Fetch Sponsors
        const spRes = await fetch('http://localhost:8000/api/patrocinadores');
        if (spRes.ok) {
          const spData = await spRes.json();
          if (spData && spData.length > 0) {
            setSponsors(spData);
          }
        }
      } catch (e) {
        console.error("Error loading sponsors from API:", e);
      }

      try {
        // Fetch Memberships
        const membRes = await fetch('http://localhost:8000/api/membresias');
        if (membRes.ok) {
          const membData = await membRes.json();
          if (membData && membData.length > 0) {
            setMemberships(membData);
          }
        }
      } catch (e) {
        console.error("Error loading memberships from API:", e);
      }

      try {
        // Fetch Menu links
        const menuRes = await fetch('http://localhost:8000/api/menu');
        if (menuRes.ok) {
          const menuData = await menuRes.json();
          if (menuData && menuData.length > 0) {
            setMenus(menuData);
          }
        }
      } catch (e) {
        console.error("Error loading menu links from API:", e);
      }

      try {
        // Fetch Next Match
        const nextRes = await fetch('http://localhost:8000/api/partidos/proximo');
        if (nextRes.ok) {
          const nextData = await nextRes.json();
          if (nextData) {
            setNextMatch(nextData);
          }
        }
      } catch (e) {
        console.error("Error loading next match from API:", e);
      }
    };

    loadData();
  }, []);

  // Deriving Featured Players reactively from lists so changes are synchronized
  const featuredPlayers = [
    { ...gkList[0], position: 'Arquera' },
    { ...defList[0], position: 'Defensa' },
    { ...defList[1], position: 'Defensa' },
    { ...midList[0], position: 'Mediocampista' },
    { ...midList[2], position: 'Mediocampista' },
    { ...fwdList[0], position: 'Delantera' },
    { ...fwdList[1], position: 'Delantera' },
    { ...defList[2], position: 'Defensa' },
    { ...midList[3], position: 'Mediocampista' },
    { ...fwdList[2], position: 'Delantera' },
  ].filter(p => p && p.name); // Safeguard against undefined players

  // If the full roster view is toggled, only render the navigation and detailed roster
  if (showFullRoster) {
    return (
      <Roster 
        showFullRoster={showFullRoster}
        setShowFullRoster={setShowFullRoster}
        staffList={staffList}
        gkList={gkList}
        defList={defList}
        midList={midList}
        fwdList={fwdList}
        featuredPlayers={featuredPlayers}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Navigation Header */}
      <Navigation 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setShowFullRoster={setShowFullRoster}
        setIsMembershipModalOpen={setIsMembershipModalOpen}
        clubInfo={clubInfo}
        menusList={menus}
      />

      {/* Hero Banner Section */}
      <Hero 
        heroBgImage={heroBgImage} 
        heroBgImage2={heroBgImage2} 
        heroBgImage3={heroBgImage3} 
        slidesList={slides}
        announcementsList={announcements}
      />

      {/* Professional Club Highlights Dashboard */}
      <ClubHighlights nextMatch={nextMatch} />

      {/* About Section */}
      <About aboutImage={aboutImage} aboutInfo={aboutInfo} valoresList={valores} />

      {/* Featured Roster Stars Section */}
      <Roster 
        showFullRoster={showFullRoster}
        setShowFullRoster={setShowFullRoster}
        staffList={staffList}
        gkList={gkList}
        defList={defList}
        midList={midList}
        fwdList={fwdList}
        featuredPlayers={featuredPlayers}
      />

      {/* Upcoming Matches Section */}
      <Matches nextMatches={matches} />

      {/* Image Gallery Section */}
      <Gallery galleryList={galleryList} />

      {/* Styled Contact Section */}
      <Contact clubInfo={clubInfo} />

      {/* Structured Sponsors Section */}
      <Sponsors sponsorsList={sponsors} />

      {/* Footer Branding & Social Links */}
      <Footer setShowFullRoster={setShowFullRoster} clubInfo={clubInfo} />

      {/* Glassmorphic Membership Tiers Modal */}
      <MembershipModal 
        isOpen={isMembershipModalOpen} 
        onClose={() => setIsMembershipModalOpen(false)} 
        membershipsList={memberships}
      />
    </div>
  );
}
