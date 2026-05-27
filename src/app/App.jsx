import { useState } from 'react';
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

  // Dynamic States for Customizable Images
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
  ];



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
      />

      {/* Hero Banner Section */}
      <Hero 
        heroBgImage={heroBgImage} 
        heroBgImage2={heroBgImage2} 
        heroBgImage3={heroBgImage3} 
      />

      {/* Professional Club Highlights Dashboard */}
      <ClubHighlights />

      {/* About Section */}
      <About aboutImage={aboutImage} />

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
      <Matches nextMatches={NEXT_MATCHES} />

      {/* Image Gallery Section */}
      <Gallery galleryList={galleryList} />

      {/* Styled Contact Section */}
      <Contact />

      {/* Structured Sponsors Section (inspired by Alianza Lima) */}
      <Sponsors />

      {/* Footer Branding & Social Links */}
      <Footer setShowFullRoster={setShowFullRoster} />



      {/* Glassmorphic Membership Tiers Modal */}
      <MembershipModal 
        isOpen={isMembershipModalOpen} 
        onClose={() => setIsMembershipModalOpen(false)} 
      />
    </div>
  );
}
