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
import NewsSection from './components/sections/NewsSection';
import NewsList from './components/sections/NewsList';
import NewsDetail from './components/sections/NewsDetail';

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

const API_BASE = import.meta.env.DEV
  ? 'http://localhost:8002/api'
  : (import.meta.env.VITE_API_BASE_URL || `${window.location.origin}/api`);

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
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [newsList, setNewsList] = useState([]);

  const fetchClubInfo = async () => {
    try {
      const clubRes = await fetch(`${API_BASE}/club`);
      if (clubRes.ok) {
        const clubData = await clubRes.json();
        if (clubData && clubData.length > 0) {
          setClubInfo(clubData[0]);
        }
      }
    } catch (e) {
      console.error("Error loading club info from API:", e);
    }
  };

  const fetchSlides = async () => {
    try {
      const slidesRes = await fetch(`${API_BASE}/hero/slides`);
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
  };

  const fetchAnnouncements = async () => {
    try {
      const annRes = await fetch(`${API_BASE}/hero/anuncios`);
      if (annRes.ok) {
        const annData = await annRes.json();
        if (annData && annData.length > 0) {
          setAnnouncements(annData);
        }
      }
    } catch (e) {
      console.error("Error loading announcements from API:", e);
    }
  };

  const fetchAboutInfo = async () => {
    try {
      const histRes = await fetch(`${API_BASE}/historia`);
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
  };

  const fetchValores = async () => {
    try {
      const valRes = await fetch(`${API_BASE}/valores`);
      if (valRes.ok) {
        const valData = await valRes.json();
        if (valData && valData.length > 0) {
          setValores(valData);
        }
      }
    } catch (e) {
      console.error("Error loading values from API:", e);
    }
  };

  const fetchPlantel = async () => {
    try {
      const plantelRes = await fetch(`${API_BASE}/plantel`);
      if (plantelRes.ok) {
        const plantelData = await plantelRes.json();
        if (plantelData && plantelData.length > 0) {
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
  };

  const fetchMatches = async () => {
    try {
      const matchesRes = await fetch(`${API_BASE}/partidos?solo_proximos=true`);
      if (matchesRes.ok) {
        const matchesData = await matchesRes.json();
        if (matchesData) {
          const formatted = matchesData.map((m, idx) => {
            const isLocal = m.es_local || m.equipo_local.toLowerCase().includes('yanapuma');
            const opponent = isLocal ? m.equipo_visitante : m.equipo_local;
            
            let formattedDate = m.fecha;
            try {
              const dateObj = new Date(m.fecha + 'T00:00:00');
              const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
              formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
            } catch (err) {}

            return {
              id: m.id,
              equipo_local: m.equipo_local,
              equipo_visitante: m.equipo_visitante,
              escudo_local_url: m.escudo_local_url,
              escudo_visitante_url: m.escudo_visitante_url,
              date: formattedDate,
              time: m.hora ? m.hora.substring(0, 5) : '15:00',
              location: m.estadio || 'Campo Yanapuma',
              ciudad: m.ciudad || 'Iquitos',
              competicion: m.competicion,
              jornada: m.jornada,
              ticket_url: m.ticket_url,
              isLocal: isLocal,
              es_proximo: m.es_proximo,
              es_derby: m.es_derby
            };
          });
          setMatches(formatted);
        } else {
          setMatches([]);
        }
      }
    } catch (e) {
      console.error("Error loading matches from API:", e);
    }

    try {
      const nextRes = await fetch(`${API_BASE}/partidos/proximo`);
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

  const fetchGallery = async () => {
    try {
      const galRes = await fetch(`${API_BASE}/galeria`);
      if (galRes.ok) {
        const galData = await galRes.json();
        if (galData && galData.length > 0) {
          setGalleryList(galData.map(item => item.url));
        }
      }
    } catch (e) {
      console.error("Error loading gallery from API:", e);
    }
  };

  const fetchSponsors = async () => {
    try {
      const spRes = await fetch(`${API_BASE}/patrocinadores`);
      if (spRes.ok) {
        const spData = await spRes.json();
        setSponsors(spData || []);
      }
    } catch (e) {
      console.error("Error loading sponsors from API:", e);
    }
  };

  const fetchMemberships = async () => {
    try {
      const membRes = await fetch(`${API_BASE}/membresias`);
      if (membRes.ok) {
        const membData = await membRes.json();
        if (membData && membData.length > 0) {
          setMemberships(membData);
        }
      }
    } catch (e) {
      console.error("Error loading memberships from API:", e);
    }
  };

  const fetchMenu = async () => {
    try {
      const menuRes = await fetch(`${API_BASE}/menu`);
      if (menuRes.ok) {
        const menuData = await menuRes.json();
        if (menuData && menuData.length > 0) {
          setMenus(menuData);
        }
      }
    } catch (e) {
      console.error("Error loading menu links from API:", e);
    }
  };

  const fetchNews = async () => {
    try {
      const newsRes = await fetch(`${API_BASE}/noticias`);
      if (newsRes.ok) {
        const newsData = await newsRes.json();
        setNewsList(newsData);
      }
    } catch (e) {
      console.error("Error loading news from API:", e);
    }
  };

  const navigateTo = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top on view changes (e.g. news page, roster toggling)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showFullRoster, currentPath]);

  useEffect(() => {
    // Initial fetch of all sections
    const fetchAll = async () => {
      await Promise.all([
        fetchClubInfo(),
        fetchSlides(),
        fetchAnnouncements(),
        fetchAboutInfo(),
        fetchValores(),
        fetchPlantel(),
        fetchMatches(),
        fetchGallery(),
        fetchSponsors(),
        fetchMemberships(),
        fetchMenu(),
        fetchNews()
      ]);
    };
    fetchAll();

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    // WebSocket connection with automatic reconnect
    let ws;
    let reconnectTimeout = null;

    const connectWebSocket = () => {
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = import.meta.env.DEV
        ? "ws://localhost:8003"
        : (import.meta.env.VITE_WS_URL || `${wsProtocol}//${window.location.host}/ws`);
      console.log(`Connecting to WebSocket server on ${wsUrl}...`);
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket connected successfully!");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("WebSocket message received:", data);
          
          const eventName = data.event;
          const module = data.module;
          
          if (eventName === 'landing.matches.updated' || module === 'partido') {
            fetchMatches();
          } else {
            switch (module) {
              case 'club':
                fetchClubInfo();
                break;
              case 'hero_slide':
              case 'hero_slide_boton':
                fetchSlides();
                break;
              case 'hero_anuncio':
                fetchAnnouncements();
                break;
              case 'historia':
              case 'historia_hito':
                fetchAboutInfo();
                break;
              case 'valores':
              case 'valor':
                fetchValores();
                break;
              case 'plantel':
              case 'plantel_estadistica':
                fetchPlantel();
                break;
              case 'patrocinador':
                fetchSponsors();
                break;
              case 'membresia':
              case 'membresia_beneficio':
                fetchMemberships();
                break;
              case 'menu':
                fetchMenu();
                break;
              case 'galeria':
                fetchGallery();
                break;
              case 'noticia':
                fetchNews();
                break;
              default:
                console.log("Unhandled WS module event:", module);
                break;
            }
          }
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      };

      ws.onclose = () => {
        console.warn("WebSocket connection closed. Attempting reconnect in 3s...");
        reconnectTimeout = setTimeout(connectWebSocket, 3000);
      };

      ws.onerror = (err) => {
        console.error("WebSocket connection error:", err);
        ws.close();
      };
    };

    connectWebSocket();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (ws) ws.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
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

  // --- SPA ROUTER RENDERING ---
  const isNewsList = currentPath === '/noticias' || currentPath === '/noticias/';
  const isNewsDetail = currentPath.startsWith('/noticias/') && currentPath.length > 10;
  let activeSlug = "";
  if (isNewsDetail) {
    activeSlug = currentPath.split('/noticias/')[1];
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
        navigateTo={navigateTo}
        currentPath={currentPath}
      />

      {isNewsList ? (
        <NewsList navigateTo={navigateTo} newsList={newsList} />
      ) : isNewsDetail ? (
        <NewsDetail slug={activeSlug} navigateTo={navigateTo} />
      ) : (
        <>
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

          {/* Dynamic News Section (Home) */}
          <NewsSection navigateTo={navigateTo} newsList={newsList} />

          {/* Styled Contact Section */}
          <Contact clubInfo={clubInfo} />

          {/* Structured Sponsors Section */}
          <Sponsors sponsorsList={sponsors} />
        </>
      )}

      {/* Footer Branding & Social Links */}
      <Footer setShowFullRoster={setShowFullRoster} clubInfo={clubInfo} navigateTo={navigateTo} />

      {/* Glassmorphic Membership Tiers Modal */}
      <MembershipModal 
        isOpen={isMembershipModalOpen} 
        onClose={() => setIsMembershipModalOpen(false)} 
        membershipsList={memberships}
      />
    </div>
  );

}
