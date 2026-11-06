import React, { useState } from 'react';
import { Menu, X, Coffee, Gamepad2, ShoppingBag, Calendar, User, Shield, Scroll, Clock, MapPin, Sparkles } from 'lucide-react';
import { PageView } from '../types';

interface NavigationProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activePage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'HOME', label: 'Rozcestník', icon: <Shield size={15} /> },
    { id: 'CAFE', label: 'Kavárna', icon: <Coffee size={15} /> },
    { id: 'GAMING', label: 'Herní Doupě', icon: <Gamepad2 size={15} /> },
    { id: 'ABOUT', label: 'Náš Příběh', icon: <Scroll size={15} /> },
    { id: 'SHOP', label: 'Knihovna Her', icon: <ShoppingBag size={15} /> },
    { id: 'RESERVATION', label: 'Rezervace', icon: <Calendar size={15} /> },
  ];

  const officialLogo = '/assets/aistudio/Logo_verze_3_1-Picsart-BackgroundRemover_bd276156.webp';

  return (
    <nav className="sticky top-0 z-50 bg-white/95 border-b border-stone-200/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300">
      
      {/* Top micro-bar with opening hours & location in pure white */}
      <div className="bg-stone-50/80 border-b border-stone-100 hidden sm:block py-1.5 px-4 text-[11px] text-stone-600 font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-stone-600">
              <MapPin size={13} className="text-amber-700" />
              Náměstí Míru 5, Bruntál
            </span>
            <span className="flex items-center gap-1.5 text-stone-600">
              <Clock size={13} className="text-amber-700" />
              Kavárna: 07:30 – 21:00 • Herna: 13:00 – 22:00+
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Dnes máme otevřeno
            </span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-600 font-mono">+420 777 123 456</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Area with Official Emblem */}
          <div 
            className="flex items-center cursor-pointer group gap-3.5 select-none" 
            onClick={() => onNavigate('HOME')}
          >
            <div className="relative w-12 h-12 flex items-center justify-center p-1 rounded-2xl bg-gradient-to-br from-amber-50 to-stone-100 border border-amber-600/20 shadow-sm group-hover:shadow-md group-hover:border-amber-600/40 group-hover:scale-105 transition-all duration-300">
              <img 
                src={officialLogo} 
                alt="Logo Šálek zábavy" 
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl md:text-2xl tracking-wide text-stone-900 group-hover:text-amber-800 transition-colors">
                ŠÁLEK ZÁBAVY
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-800 font-semibold">
                KÁVA & HRY BRUNTÁL
              </span>
            </div>
          </div>

          {/* Desktop Menu - Bright Clean Luxury */}
          <div className="hidden md:flex items-center space-x-1.5">
            {navItems.map((item) => {
              const isReservation = item.id === 'RESERVATION';
              const isActive = activePage === item.id;

              if (isReservation) {
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className="ml-3 px-5 py-2.5 rounded-xl font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white shadow-amber-900/10 hover:shadow-lg hover:scale-105"
                  >
                    <Calendar size={15} />
                    <span>Rezervace stolu</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-2 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
                    isActive 
                      ? 'text-amber-900 bg-amber-50/90 font-bold border border-amber-200/80 shadow-sm' 
                      : 'text-stone-700 hover:text-amber-800 hover:bg-stone-50'
                  }`}
                >
                  <span className={isActive ? 'text-amber-700' : 'text-stone-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Admin entry icon */}
            <button
              onClick={() => onNavigate('ADMIN')}
              className="p-2 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-colors ml-1 cursor-pointer"
              title="Správa obsahu (Admin)"
              aria-label="Administrace"
            >
              <User size={16} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => onNavigate('RESERVATION')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              Rezervovat
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-700 hover:text-amber-800 p-2 transition-colors rounded-lg hover:bg-stone-100"
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Pure White */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 animate-fade-in absolute w-full shadow-2xl">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-sans font-semibold text-sm tracking-wider uppercase flex items-center gap-3 transition-colors ${
                  activePage === item.id 
                    ? 'text-amber-900 bg-amber-50 border border-amber-200/80 font-bold' 
                    : 'text-stone-700 hover:text-amber-800 hover:bg-stone-50'
                }`}
              >
                <span className={activePage === item.id ? 'text-amber-700' : 'text-stone-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}

            <button
              onClick={() => {
                onNavigate('ADMIN');
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl font-sans text-xs text-stone-500 hover:text-stone-900 flex items-center gap-3 transition-colors pt-3 border-t border-stone-100"
            >
              <User size={14} />
              <span>Správa webu (Administrace)</span>
            </button>

            <div className="pt-2 text-xs text-stone-500 space-y-1">
              <p className="flex items-center gap-2"><MapPin size={14} className="text-amber-700" /> Náměstí Míru 5, Bruntál</p>
              <p className="flex items-center gap-2"><Clock size={14} className="text-amber-700" /> Po–Ne: 07:30 – 22:00+</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};