import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { CafePage } from './pages/CafePage';
import { GamingPage } from './pages/GamingPage';
import { AdminPage } from './pages/AdminPage';
import { ReservationPage } from './pages/ReservationPage';
import { LandingSelection } from './components/LandingSelection';
import { Navigation } from './components/Navigation';
import { PageView } from './types';

const getPageFromURL = (): PageView => {
  if (typeof window === 'undefined') return 'HOME';
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (path === '/admin' || hash === '#admin' || hash === '#/admin' || search.includes('page=admin') || search.includes('admin=true')) {
    return 'ADMIN';
  }
  if (path === '/cafe' || hash === '#cafe' || hash === '#/cafe') {
    return 'CAFE';
  }
  if (path === '/gaming' || hash === '#gaming' || hash === '#/gaming') {
    return 'GAMING';
  }
  if (path === '/rezervace' || path === '/reservation' || hash === '#reservation' || hash === '#rezervace') {
    return 'RESERVATION';
  }
  if (path === '/o-nas' || path === '/about' || hash === '#about' || hash === '#o-nas') {
    return 'ABOUT';
  }
  if (path === '/knihovna' || path === '/shop' || hash === '#shop' || hash === '#knihovna') {
    return 'SHOP';
  }
  if (path === '/akce' || path === '/events' || hash === '#events' || hash === '#akce') {
    return 'EVENTS';
  }
  return 'HOME';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(() => getPageFromURL());

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    try {
      const urlMap: Record<PageView, string> = {
        HOME: '/',
        CAFE: '/cafe',
        GAMING: '/gaming',
        ADMIN: '/admin',
        MEMBERSHIP: '/membership',
        RESERVATION: '/rezervace',
        EVENTS: '/akce',
        ABOUT: '/o-nas',
        SHOP: '/knihovna'
      };
      const newPath = urlMap[page] || '/';
      if (window.location.pathname !== newPath) {
        window.history.pushState({ page }, '', newPath);
      }
    } catch {
      // Ignore
    }
  };

  // Sync with browser back/forward and hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPage(getPageFromURL());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Funkce pro scrollování nahoru při změně stránky
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'HOME':
        // Úvodní rozcestník 2 v 1 (split screen)
        return <LandingSelection onSelect={(mode) => navigateTo(mode === 'cafe' ? 'CAFE' : 'GAMING')} />;
      case 'CAFE':
        return <CafePage onNavigate={navigateTo} />;
      case 'GAMING':
        return <GamingPage onNavigate={navigateTo} />;
      case 'ADMIN':
        return <AdminPage onBack={() => navigateTo('HOME')} />;
      case 'MEMBERSHIP':
        return <GamingPage initialView="membership" onNavigate={navigateTo} />;
      case 'RESERVATION':
        return <ReservationPage />;
      case 'EVENTS':
        return <GamingPage initialView="events" onNavigate={navigateTo} />;
      case 'ABOUT':
        return <CafePage initialView="about" onNavigate={navigateTo} />;
      case 'SHOP':
         return <GamingPage initialView="library" onNavigate={navigateTo} />;
      default:
        return <LandingSelection onSelect={(mode) => navigateTo(mode === 'cafe' ? 'CAFE' : 'GAMING')} />;
    }
  };

  if (currentPage === 'ADMIN') {
      return <AdminPage onBack={() => navigateTo('HOME')} />;
  }

  // Na úvodní obrazovce (HOME) nechceme hlavní navigaci, aby vynikl rozcestník 2 v 1
  const showNav = currentPage !== 'HOME';

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-stone-900 font-sans flex flex-col selection:bg-amber-700 selection:text-white">
      {showNav && <Navigation activePage={currentPage} onNavigate={navigateTo} />}
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Admin Trigger (Secret footer button style) */}
      <div className="fixed bottom-2 right-2 opacity-0 hover:opacity-100 transition-opacity z-50">
          <button onClick={() => navigateTo('ADMIN')} className="bg-black text-xs p-1 text-white rounded cursor-pointer">Admin</button>
      </div>
    </div>
  );
}