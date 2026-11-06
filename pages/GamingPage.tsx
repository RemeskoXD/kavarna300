import React, { useEffect, useState } from 'react';
import { DataService } from '../services/dataService';
import { GameItem, CalendarEvent, PageView } from '../types';
import { 
  Calendar, 
  Users, 
  Swords, 
  Scroll, 
  Trophy, 
  Shield, 
  BookOpen, 
  Search, 
  Sparkles, 
  Dices, 
  Film, 
  X,
  Coffee,
  Glasses,
  Compass,
  ArrowRight,
  Clock,
  MapPin,
  Mail,
  Phone,
  HelpCircle,
  Award,
  Zap,
  CheckCircle2
} from 'lucide-react';

export type GamingView = 'lounge' | 'library' | 'vr' | 'events' | 'membership' | 'ranking' | 'story' | 'faq';

interface GamingPageProps {
  initialView?: GamingView;
  onNavigate: (page: PageView) => void;
}

export const GamingPage: React.FC<GamingPageProps> = ({ initialView = 'lounge', onNavigate }) => {
  const [view, setView] = useState<GamingView>(initialView);
  const [games, setGames] = useState<GameItem[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showVideo, setShowVideo] = useState(false);
  
  // Library filters
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Vše');
  const [selectedPortrait, setSelectedPortrait] = useState<{ name: string; role: string; img: string; text: string } | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);

  const officialLogo = '/assets/aistudio/Logo_verze_3_1-Picsart-BackgroundRemover_bd276156.webp';
  const petraCaricature = '/assets/aistudio/Karikatura_Petra_c3a76be2.webp';
  const jirkaCaricature = '/karikatura-jirka.webp';

  useEffect(() => {
    if (initialView) {
      setView(initialView);
    }
  }, [initialView]);

  useEffect(() => {
    setGames(DataService.getGames());
    setEvents(DataService.getEvents());
  }, []);

  const genres = ['Vše', ...Array.from(new Set(games.map(g => g.genre)))];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Vše' || game.genre === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const rankingPlayers = [
    { name: "Gandalf_Bruntál", points: 2450, game: "Magic: The Gathering", avatar: "🧙‍♂️", title: "Arcimág ligy" },
    { name: "Kostěj_Nesmrtelný", points: 2100, game: "Warhammer 40k", avatar: "⚔️", title: "Vojevůdce" },
    { name: "Eliška_z_Riviery", points: 1950, game: "D&D 5e", avatar: "🧝‍♀️", title: "Dungeon Master" },
    { name: "CyberPunk_Jirka", points: 1800, game: "Netrunner", avatar: "🎲", title: "Stratég" },
    { name: "Drakobijce123", points: 1500, game: "Catan & Scythe", avatar: "🏰", title: "Osadník" },
  ];

  const gamingFaqs = [
    {
      q: "Musím umět pravidla her dopředu?",
      a: "Vůbec ne! To je hlavní kouzlo Šálku zábavy. Náš herní personál vám rád doporučí vhodnou hru podle počtu hráčů a nálady a během 5 minut vám ochotně vysvětlí pravidla. Nemusíte číst žádné dlouhé manuály!"
    },
    {
      q: "Kolik stojí půjčení deskových her?",
      a: "Půjčení jakékoliv hry z naší knihovny s 500+ tituly je za symbolický poplatek 50 Kč na osobu na neomezeně dlouhou dobu (tarif Poutník). Pokud si dáte balíček Hrdina za 100 Kč, máte v ceně i kávu nebo drink z baru!"
    },
    {
      q: "Můžu přijít hrát sám nebo ve dvou?",
      a: "Určitě ano. Máme desítky skvělých her přímo pro 2 hráče (Duel, 7 Divů, Karak, Patchwork) i sólo hry. Pravidelně také pořádáme otevřené herní večery, kde vás rádi posadíme k partě dalších hráčů."
    },
    {
      q: "Jak funguje VR zóna s Meta Quest 3?",
      a: "VR stanici si můžete zarezervovat na 30 nebo 60 minut. Obsluha vám pomůže brýle nasadit, nastavit a vybrat hru (např. Beat Saber, Superhot, horská dráha). Váš obraz navíc promítáme na obrazovku pro vaše kamarády."
    },
    {
      q: "Pořádáte turnaje a karetní hry (Magic, Pokémon)?",
      a: "Ano, jsme oficiální herní centrum. Každý pátek hrajeme Magic: The Gathering (FNM) a o víkendech Pokémon TCG, Lorcanu a deskoherní turnaje s cenami."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans flex flex-col selection:bg-amber-700 selection:text-white">
      
      {/* Sub-Navigation in Pure White */}
      <div className="bg-white/95 border-b border-stone-200 sticky top-20 z-40 shadow-[0_2px_15px_rgba(0,0,0,0.03)] backdrop-blur-md overflow-x-auto scrollbar-hide">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center py-2.5 min-w-max">
          <div className="flex items-center gap-2 mr-4">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span className="font-serif font-bold text-sm tracking-wider uppercase text-stone-900">Herní Doupě</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 text-xs uppercase tracking-wider font-semibold text-stone-600">
            {[
              { id: 'lounge', label: 'Přehled' },
              { id: 'library', label: 'Knihovna Her (500+)' },
              { id: 'vr', label: 'VR Zóna' },
              { id: 'events', label: 'Turnaje & Akce' },
              { id: 'ranking', label: 'Síň Slávy' },
              { id: 'membership', label: 'Členství' },
              { id: 'faq', label: 'Časté dotazy' },
              { id: 'story', label: 'Náš Příběh' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setView(item.id as GamingView)} 
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  view === item.id 
                    ? 'bg-stone-900 text-white font-bold shadow-sm' 
                    : 'hover:text-amber-800 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <button 
              onClick={() => onNavigate('RESERVATION')} 
              className="px-3.5 py-1.5 ml-2 rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition-all font-bold shadow-sm flex items-center gap-1.5"
            >
              <Calendar size={13} />
              <span>Rezervovat stůl</span>
            </button>
          </div>
        </div>
      </div>

      <div className="animate-fade-in flex-grow">

        {/* VIEW: LOUNGE (Home overview in modern Scandinavian white / light lounge aesthetic) */}
        {view === 'lounge' && (
          <>
            {/* Luminous Hero Section */}
            <header className="relative bg-[#faf8f5] border-b border-stone-200 overflow-hidden py-16 sm:py-24">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Text */}
                <div className="lg:col-span-7 text-left">
                  <div className="inline-flex items-center gap-2 bg-amber-100/80 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full uppercase tracking-wider text-xs font-bold mb-6 shadow-sm">
                    <Dices size={14} className="text-amber-700" />
                    <span>500+ Deskových her • VR Meta Quest 3 • TCG Turnaje</span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-stone-900 leading-[1.1] mb-6">
                    Herní Doupě <br/>
                    <span className="italic font-normal text-amber-800">Šálek zábavy</span>
                  </h1>

                  <p className="text-lg sm:text-xl text-stone-600 font-serif leading-relaxed mb-8 max-w-xl">
                    Útočiště pro přátele, rodiny, stratégy i hrdiny. Přijďte si zahrát cokoliv od svižných párty her přes rodinnou klasiku až po epické bitvy. <strong>Pravidla vám rádi vysvětlíme!</strong>
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 mb-10">
                    <button 
                      onClick={() => setView('library')} 
                      className="px-6 py-3.5 bg-stone-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <BookOpen size={16} />
                      <span>Katalog 500+ her</span>
                    </button>

                    <button 
                      onClick={() => onNavigate('RESERVATION')} 
                      className="px-6 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <Calendar size={16} />
                      <span>Rezervovat stůl</span>
                    </button>

                    <button 
                      onClick={() => setShowVideo(true)} 
                      className="px-4 py-3.5 bg-white border border-stone-300 hover:border-amber-600 text-stone-700 hover:text-amber-800 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2"
                    >
                      <Film size={16} className="text-amber-700" />
                      <span>Video upoutávka</span>
                    </button>
                  </div>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200">
                    <div>
                      <span className="block text-2xl font-serif font-bold text-stone-900">500+</span>
                      <span className="text-xs text-stone-500 font-medium">Her v knihovně</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-serif font-bold text-stone-900">5 min</span>
                      <span className="text-xs text-stone-500 font-medium">Vysvětlení pravidel</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-serif font-bold text-stone-900">50 Kč</span>
                      <span className="text-xs text-stone-500 font-medium">Celodenní vstupné</span>
                    </div>
                  </div>
                </div>

                {/* Right Visual Image Card */}
                <div className="lg:col-span-5 relative">
                  <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                    <img 
                      src="https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=1200" 
                      alt="Desková hra v herním doupěti" 
                      className="w-full h-[440px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-lg text-stone-900">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                          <Trophy size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Pravidelné turnaje & večery</p>
                          <p className="text-xs text-stone-500">Magic: The Gathering • Pokémon • Deskovky</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </header>

            {/* Video Modal */}
            {showVideo && (
              <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="relative w-full max-w-4xl bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-stone-700">
                  <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-black">
                    <span className="font-serif font-bold text-amber-200 text-sm flex items-center gap-2">
                      <Film size={18} className="text-amber-400" /> Upoutávka Herního doupěte • Šálek zábavy
                    </span>
                    <button 
                      onClick={() => setShowVideo(false)} 
                      className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <X size={22} />
                    </button>
                  </div>
                  <div className="p-2 sm:p-4 bg-black flex justify-center">
                    <video 
                      src="/video/2.webm" 
                      controls 
                      autoPlay 
                      className="max-h-[70vh] w-auto max-w-full rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PROMINENT FRONT CARD (Krátký text na přední stranu webu) */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-30 mb-20">
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-stone-200/90 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  
                  <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl bg-amber-50 border border-amber-200/70 p-2 flex items-center justify-center shadow-sm">
                    <img src={officialLogo} alt="Šálek zábavy" className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-grow text-center md:text-left">
                    <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">
                      Šálek zábavy • Herní doupě
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-3">
                      Kde se mísí vůně kávy a zvuk kostek
                    </h2>
                    
                    <div className="space-y-3 text-stone-700 font-serif text-base sm:text-lg leading-relaxed italic">
                      <p className="border-l-4 border-amber-600 pl-4 my-2 text-stone-800 not-italic font-normal">
                        „Šálek zábavy je místo, kde se mísí vůně kávy a zvuk kostek. Jsme kavárna pro všechny, kdo milují kávu, hry, smích a dobré chvíle. V našem herním koutku si můžeš půjčit deskovky, nechat si vysvětlit pravidla, zahrát si na VR a nebo jen vypnout u dobrého nápoje. Zažij pohodové místo, kde vznikají přátelství, bitvy i legendy a je dobrá zábava a fajn lidé.“
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4 items-center justify-center md:justify-start pt-2">
                      <button 
                        onClick={() => setView('story')}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 hover:text-amber-700 border-b-2 border-amber-800 pb-0.5 transition-colors"
                      >
                        <span>Jak vznikl Šálek zábavy (Příběh Petry & Jirky)</span>
                        <ArrowRight size={14} />
                      </button>
                      
                      <button 
                        onClick={() => onNavigate('CAFE')}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3.5 py-1.5 rounded-full transition-colors"
                      >
                        <Coffee size={14} className="text-amber-700" />
                        <span>Kavárna na náměstí & Menu</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* WHAT WE OFFER (4 Pillars of Gaming) */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
              <div className="text-center mb-14">
                <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Herní Zóny</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">Co všechno u nás zažijete?</h2>
                <div className="w-16 h-1 bg-amber-700 mx-auto mt-4"></div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-6 hover:shadow-md transition-all text-left">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 text-amber-800 flex items-center justify-center mb-4 shadow-sm">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">500+ Deskových her</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    Od Catanu, Carcassonne a Krycích jmen až po Scythe a Mars. Půjčíme přímo na stůl.
                  </p>
                  <button onClick={() => setView('library')} className="text-xs text-amber-800 font-bold hover:underline flex items-center gap-1">
                    Katalog her <ArrowRight size={12} />
                  </button>
                </div>

                <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-6 hover:shadow-md transition-all text-left">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 text-amber-800 flex items-center justify-center mb-4 shadow-sm">
                    <Glasses size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">VR Meta Quest 3</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    Ponořte se do virtuálního světa. Beat Saber na světelné meče promítaný pro kamarády.
                  </p>
                  <button onClick={() => setView('vr')} className="text-xs text-amber-800 font-bold hover:underline flex items-center gap-1">
                    VR ceník & hry <ArrowRight size={12} />
                  </button>
                </div>

                <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-6 hover:shadow-md transition-all text-left">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 text-amber-800 flex items-center justify-center mb-4 shadow-sm">
                    <Swords size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">Karetní Hry & TCG</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    Magic: The Gathering, Pokémon TCG i Lorcana. Karty k zakoupení i páteční turnaje.
                  </p>
                  <button onClick={() => setView('events')} className="text-xs text-amber-800 font-bold hover:underline flex items-center gap-1">
                    Kalendář akcí <ArrowRight size={12} />
                  </button>
                </div>

                <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-6 hover:shadow-md transition-all text-left">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 text-amber-800 flex items-center justify-center mb-4 shadow-sm">
                    <Scroll size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">RPG Salonek (D&D)</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    Odhlučněná komorní místnost pro Dungeons & Dragons a Dračí Hlídku s atmosférickým osvětlením.
                  </p>
                  <button onClick={() => onNavigate('RESERVATION')} className="text-xs text-amber-800 font-bold hover:underline flex items-center gap-1">
                    Rezervovat salonek <ArrowRight size={12} />
                  </button>
                </div>

              </div>
            </section>

            {/* HOW IT WORKS BANNER */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
              <div className="bg-gradient-to-br from-[#faf7f2] to-[#f4eee4] border border-amber-900/15 rounded-3xl p-8 sm:p-12 text-center">
                <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Jednoduchý postup</span>
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">Jak návštěva doupěte funguje?</h2>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm mb-4">1</span>
                    <h4 className="font-bold text-stone-900 mb-2">Přijďte nebo si rezervujte stůl</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Můžete přijít jen tak nebo si předem zajistit velký stůl. Vstup je jen 50 Kč na osobu na celý den.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm mb-4">2</span>
                    <h4 className="font-bold text-stone-900 mb-2">Vyberte si hru (rádi pomůžeme!)</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Prohlédněte si regály nebo řekněte obsluze své preference. Během chvilky vám doporučíme to pravé a vysvětlíme pravidla.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm mb-4">3</span>
                    <h4 className="font-bold text-stone-900 mb-2">Užijte si kávu, drink a zábavu</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Přímo ke stolu vám doneseme kávu z kavárny, domácí limonádu, pivo z lokálních pivovarů nebo něco dobrého na zub.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* VIEW: LIBRARY (Přehledná knihovna her) */}
        {view === 'library' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-8 border-b border-stone-200">
              <div>
                <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Sbírka her</span>
                <h2 className="text-4xl font-serif font-bold text-stone-900 mb-2">Knihovna Deskových Her</h2>
                <p className="text-stone-600 text-sm">Všechny tyto hry máme k dispozici přímo na místě k zapůjčení.</p>
              </div>

              {/* Search bar */}
              <div className="relative w-full md:w-80">
                <input 
                  type="text" 
                  placeholder="Hledat hru podle názvu..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl py-3 pl-10 pr-4 text-sm text-stone-900 focus:outline-none focus:border-amber-700 transition-colors"
                />
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
              </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => setActiveCategory(genre)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    activeCategory === genre
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGames.map(game => (
                <div 
                  key={game.id} 
                  onClick={() => setSelectedGame(game)}
                  className="bg-white border border-stone-200 rounded-3xl p-4 flex flex-col justify-between hover:shadow-xl hover:border-amber-300 transition-all duration-300 group cursor-pointer text-left"
                >
                  <div>
                    {game.image && (
                      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-stone-100 border border-stone-200/80 shadow-inner">
                        <img 
                          src={game.image} 
                          alt={game.title} 
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out" 
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-wider text-amber-900 shadow-sm border border-stone-200/50">
                            {game.genre}
                          </span>
                        </div>
                        {game.difficulty && (
                          <div className="absolute top-2.5 right-2.5">
                            <span className="px-2 py-0.5 bg-stone-900/80 backdrop-blur-md rounded-md text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                              {game.difficulty}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                          <span>🔍 Zobrazit detail</span>
                        </div>
                      </div>
                    )}

                    <h3 className="font-serif font-bold text-lg text-stone-900 mb-1.5 group-hover:text-amber-800 transition-colors line-clamp-1">
                      {game.title}
                    </h3>

                    {game.description && (
                      <p className="text-xs text-stone-600 font-serif leading-relaxed line-clamp-2 mb-3">
                        {game.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 text-[11px] text-stone-600 font-sans mb-3">
                      {game.players && (
                        <span className="inline-flex items-center gap-1 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-md">
                          <Users size={12} className="text-amber-800" />
                          <span>{game.players}</span>
                        </span>
                      )}
                      {game.playTime && (
                        <span className="inline-flex items-center gap-1 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-md">
                          <Clock size={12} className="text-amber-800" />
                          <span>{game.playTime}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-1">
                    <span className="text-xs font-bold text-amber-700">⭐ {game.rating}.0</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('RESERVATION');
                      }}
                      className="text-xs text-stone-900 font-bold hover:text-amber-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                    >
                      Hrát u nás →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: VR (Virtuální realita ceník a přehled) */}
        {view === 'vr' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
            <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Moderní zábava</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">VR Zóna Meta Quest 3</h2>
            <p className="text-stone-600 max-w-xl mx-auto mb-12 text-sm leading-relaxed">
              Zkuste si světelné meče v Beat Saberu, přestřelku v Superhot nebo realistické simulace. Herní obraz promítáme na televizor pro celou partu.
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-stone-50 border border-stone-200 p-8 rounded-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Glasses size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">Standardní Session</h3>
                    <span className="text-xs text-stone-500">Ideální pro 1–2 hráče na střídačku</span>
                  </div>
                </div>
                <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                  30 minut čistého herního času s asistencí obsluhy. Výběr z desítek akčních i klidných her.
                </p>
                <div className="flex items-baseline justify-between pt-4 border-t border-stone-200">
                  <span className="text-stone-500 text-xs uppercase tracking-wider font-bold">30 minut</span>
                  <span className="text-2xl font-mono font-bold text-stone-900">150 Kč</span>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200 p-8 rounded-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">Party & Duel Balíček</h3>
                    <span className="text-xs text-stone-500">Skvělé pro partu přátel či oslavu</span>
                  </div>
                </div>
                <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                  Celá hodina zábavy s turnajem o nejvyšší Beat Saber skóre promítaným pro všechny v doupěti.
                </p>
                <div className="flex items-baseline justify-between pt-4 border-t border-stone-200">
                  <span className="text-stone-500 text-xs uppercase tracking-wider font-bold">60 minut</span>
                  <span className="text-2xl font-mono font-bold text-stone-900">250 Kč</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button onClick={() => onNavigate('RESERVATION')} className="px-8 py-3.5 bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-800 transition-colors shadow-sm">
                Rezervovat VR termín
              </button>
            </div>
          </div>
        )}

        {/* VIEW: EVENTS */}
        {view === 'events' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="text-center mb-12">
              <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Turnaje & Komunita</span>
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-3">Kalendář Turnajů a Akcí</h2>
              <p className="text-stone-600 text-sm">Pravidelná páteční klání v MTG i víkendové rodinné odpoledne.</p>
              <div className="w-16 h-1 bg-amber-700 mx-auto mt-4"></div>
            </div>

            <div className="space-y-4">
              {events.map(ev => (
                <div key={ev.id} className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                        {ev.type}
                      </span>
                      <span className="text-xs text-stone-500 font-mono font-semibold">{ev.date}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">{ev.title}</h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1">{ev.description}</p>
                  </div>
                  <button onClick={() => onNavigate('RESERVATION')} className="px-5 py-2.5 rounded-xl bg-stone-900 text-white hover:bg-amber-800 font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-sm">
                    Registrovat se
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: MEMBERSHIP (Ceník v čistě bílém provedení) */}
        {view === 'membership' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="text-center mb-12">
              <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Vstupné a členství</span>
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-3">Herní tarify pro každého</h2>
              <p className="text-stone-600 text-sm">Hrajte bez limitu a užívejte si slevy na bar.</p>
              <div className="w-16 h-1 bg-amber-700 mx-auto mt-4"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
              <div className="bg-white border border-stone-200 p-8 rounded-3xl text-center shadow-sm">
                <h3 className="text-stone-900 font-serif font-bold text-xl mb-1">Poutník</h3>
                <span className="text-xs text-stone-500 block mb-4">Jednodenní herní vstup</span>
                <div className="text-3xl font-mono font-bold text-stone-900 mb-4">50 Kč <span className="text-xs text-stone-500 font-normal">/ den</span></div>
                <p className="text-stone-600 text-xs mb-8 leading-relaxed">
                  Neomezený přístup k 500+ deskovým hrám po celý den a asistence obsluhy s pravidly.
                </p>
                <button onClick={() => onNavigate('RESERVATION')} className="w-full py-3 border border-stone-300 text-stone-800 text-xs uppercase tracking-wider hover:bg-stone-100 transition-colors rounded-xl font-bold">
                  Přijít jako Poutník
                </button>
              </div>

              <div className="bg-amber-50/80 border-2 border-amber-600 p-8 rounded-3xl text-center shadow-lg relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Nejvýhodnější
                </div>
                <h3 className="text-stone-900 font-serif font-bold text-xl mb-1">Hrdina</h3>
                <span className="text-xs text-amber-800 block mb-4 font-semibold">Hry + Káva či Nápoj</span>
                <div className="text-3xl font-mono font-bold text-amber-900 mb-4">100 Kč <span className="text-xs text-stone-500 font-normal">/ den</span></div>
                <p className="text-stone-700 text-xs mb-8 leading-relaxed">
                  Celodenní hraní všech deskovek + 1 káva (cappuccino, espresso) nebo domácí limonáda z baru v ceně!
                </p>
                <button onClick={() => onNavigate('RESERVATION')} className="w-full py-3 bg-amber-700 text-white text-xs uppercase tracking-wider hover:bg-amber-800 transition-colors rounded-xl font-bold shadow-md">
                  Zvolit balíček Hrdina
                </button>
              </div>

              <div className="bg-white border border-stone-200 p-8 rounded-3xl text-center shadow-sm">
                <h3 className="text-stone-900 font-serif font-bold text-xl mb-1">Legenda</h3>
                <span className="text-xs text-stone-500 block mb-4">Měsíční permanentka</span>
                <div className="text-3xl font-mono font-bold text-stone-900 mb-4">800 Kč <span className="text-xs text-stone-500 font-normal">/ měsíc</span></div>
                <p className="text-stone-600 text-xs mb-8 leading-relaxed">
                  Neomezený vstup po celý měsíc, 10% sleva na nákup her a přednostní rezervace stolu na turnaje.
                </p>
                <button onClick={() => onNavigate('RESERVATION')} className="w-full py-3 border border-stone-300 text-stone-800 text-xs uppercase tracking-wider hover:bg-stone-100 transition-colors rounded-xl font-bold">
                  Stát se Legendou
                </button>
              </div>

            </div>
          </div>
        )}

        {/* VIEW: RANKING */}
        {view === 'ranking' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="text-center mb-12">
              <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Šampionát doupěte</span>
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-2">Síň Slávy</h2>
              <p className="text-stone-600 text-sm">Nejaktivnější hráči a mistři měsíčních lig</p>
              <div className="w-16 h-1 bg-amber-700 mx-auto mt-4"></div>
            </div>

            <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
              {rankingPlayers.map((player, index) => (
                <div key={index} className="flex items-center justify-between p-5 border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className={`font-serif font-bold text-lg w-7 text-center ${index === 0 ? 'text-amber-700' : 'text-stone-400'}`}>
                      {index + 1}.
                    </span>
                    <div className="text-3xl">{player.avatar}</div>
                    <div>
                      <div className="text-stone-900 font-bold text-base">{player.name}</div>
                      <div className="text-stone-500 text-xs font-mono">{player.title} • {player.game}</div>
                    </div>
                  </div>
                  <div className="text-amber-800 font-bold font-mono text-base">{player.points} XP</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: FAQ */}
        {view === 'faq' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="text-center mb-12">
              <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Užitečné informace</span>
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-3">Časté dotazy k hernímu doupěti</h2>
              <p className="text-stone-600 font-serif italic">Všechno, co potřebujete vědět před první hrou.</p>
              <div className="w-16 h-1 bg-amber-700 mx-auto mt-4"></div>
            </div>

            <div className="space-y-4">
              {gamingFaqs.map((faq, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200 rounded-2xl p-6 text-left">
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-2 flex items-start gap-2.5">
                    <HelpCircle size={20} className="text-amber-700 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-stone-600 font-sans text-sm leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: STORY */}
        {view === 'story' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="text-center mb-14">
              <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Zrození konceptu</span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 mb-4">Jak vznikl Šálek zábavy</h2>
              <p className="text-stone-600 font-serif italic text-lg max-w-xl mx-auto">
                Každý dobrý nápad začíná malým snem – a náš nebyl výjimkou.
              </p>
            </div>

            {/* Side-by-side Founders Cards in Gaming Page */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col justify-between text-left hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-5 mb-6">
                    <button 
                      onClick={() => setSelectedPortrait({
                        name: 'Petra',
                        role: 'Spoluzakladatelka kavárny',
                        img: petraCaricature,
                        text: 'Originální autorská kresba spoluzakladatelky Petry (8. 1. 2026, M. Per).'
                      })}
                      className="group relative w-28 h-36 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-stone-50 shrink-0 text-left focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      title="Klikněte pro zvětšení originální kresby"
                    >
                      <img src={petraCaricature} alt="Petra" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                        🔍 Zvětšit
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-stone-900/80 text-white text-[10px] text-center py-0.5 font-bold uppercase tracking-wider">
                        Petra
                      </div>
                    </button>
                    <div>
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">Spoluzakladatelka</span>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">Sen o voňavé kavárně</h3>
                      <p className="text-xs text-stone-500 font-serif italic">Káva, poctivé pečení a klid</p>
                    </div>
                  </div>
                  <p className="text-stone-700 font-serif text-sm leading-relaxed mb-3">
                    <strong>Petra vždy milovala</strong> vůni čerstvě namleté kávy, poctivé zákusky a klidné prostředí kaváren, kde si člověk může vydechnout od ruchu dne.
                  </p>
                  <p className="text-stone-700 font-serif text-sm leading-relaxed">
                    Už dlouho si pohrávala s myšlenkou otevřít vlastní kavárnu – místo, kam lidé přijdou nejen pro kávu, ale i pro atmosféru a pohodu.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col justify-between text-left hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-5 mb-6">
                    <button 
                      onClick={() => setSelectedPortrait({
                        name: 'Jirka',
                        role: 'Spoluzakladatel herního doupěte',
                        img: jirkaCaricature,
                        text: 'Originální autorská kresba spoluzakladatele Jirky (8. 1. 2026, M. Per).'
                      })}
                      className="group relative w-28 h-36 rounded-2xl overflow-hidden border-2 border-stone-300 shadow-md bg-stone-50 shrink-0 text-left focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      title="Klikněte pro zvětšení originální kresby"
                    >
                      <img src={jirkaCaricature} alt="Jirka" className="w-full h-full object-cover object-[50%_20%] group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                        🔍 Zvětšit
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-stone-900/80 text-white text-[10px] text-center py-0.5 font-bold uppercase tracking-wider">
                        Jirka
                      </div>
                    </button>
                    <div>
                      <span className="text-xs uppercase tracking-widest font-bold text-stone-700">Spoluzakladatel</span>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">Vášeň pro herní svět</h3>
                      <p className="text-xs text-stone-500 font-serif italic">Deskovky, turnaje, VR a komunita</p>
                    </div>
                  </div>
                  <p className="text-stone-700 font-serif text-sm leading-relaxed mb-3">
                    <strong>Jirka naopak celý život</strong> propadl světu her. Deskovky, karetní bitvy, herní konzole… Hledal prostor, kde by se mohli hráči setkávat, sdílet svou vášeň a vytvářet novou komunitu.
                  </p>
                  <p className="text-stone-700 font-serif text-sm leading-relaxed">
                    Vytvořit doupě, kde se lidé baví u stolu tváří v tvář, zažívají epické příběhy a smějí se s přáteli.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#faf8f5] border border-amber-900/15 rounded-3xl p-8 sm:p-12 text-center mb-12">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-white border border-amber-300 p-2 mb-6 flex items-center justify-center shadow-md">
                <img src={officialLogo} alt="Logo Šálek zábavy" className="w-full h-full object-contain" />
              </div>

              <div className="max-w-3xl mx-auto space-y-4 text-stone-700 font-serif text-lg leading-relaxed text-left sm:text-center">
                <p className="italic text-stone-900 font-semibold">
                  „V roce 2025 se jejich představy propojily a jak se říká, slovo dalo slovo. Zrodil se nápad spojit obě radosti v jedno. Tak vznikl Šálek zábavy – kavárna a herní doupě v jednom.“
                </p>
                <p>
                  Místo, kde se potkává aroma kávy se smíchem hráčů, kde se mísí přátelská atmosféra, tvořivost a zvědavost.
                </p>
                <p>
                  Ať už si přijdeš vychutnat latté, dát si něco na zub, roztočit kostky u oblíbené deskovky, zamíchat karty nebo poznat nové přátele – u nás jsi vítán. Šálek zábavy je otevřen pro všechny, kteří se chtějí na chvíli zastavit, vypnout a užít si hru i dobrou kávu.
                </p>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <button onClick={() => onNavigate('RESERVATION')} className="px-6 py-3 bg-amber-700 text-white rounded-xl font-bold uppercase text-xs tracking-wider shadow-sm hover:bg-amber-800 transition-colors">
                  Rezervovat stůl
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Lightbox Modal for Full Portrait Drawing */}
      {selectedPortrait && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPortrait(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedPortrait(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Zavřít"
            >
              <X size={18} />
            </button>
            <div className="text-center mb-4">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-800 font-mono block mb-1">
                {selectedPortrait.role}
              </span>
              <h3 className="font-serif font-bold text-2xl text-stone-900">
                {selectedPortrait.name}
              </h3>
            </div>
            <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 max-h-[60vh] flex items-center justify-center p-2 mb-4">
              <img 
                src={selectedPortrait.img} 
                alt={selectedPortrait.name} 
                className="max-h-[56vh] w-auto object-contain rounded-xl shadow-sm"
              />
            </div>
            <p className="text-stone-600 text-center text-xs font-serif italic">
              {selectedPortrait.text}
            </p>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Game Detail */}
      {selectedGame && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedGame(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-stone-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedGame(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer z-10"
              title="Zavřít"
            >
              <X size={18} />
            </button>

            {selectedGame.image && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-stone-100 border border-stone-200 shadow-md">
                <img 
                  src={selectedGame.image} 
                  alt={selectedGame.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-bold uppercase tracking-wider font-mono">
                {selectedGame.genre}
              </span>
              {selectedGame.difficulty && (
                <span className="px-2.5 py-1 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold">
                  Obtížnost: {selectedGame.difficulty}
                </span>
              )}
              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-xs font-bold ml-auto">
                ⭐ {selectedGame.rating}.0 / 5
              </span>
            </div>

            <h3 className="font-serif font-bold text-3xl text-stone-900 mb-3">
              {selectedGame.title}
            </h3>

            {selectedGame.description && (
              <p className="text-stone-700 font-serif text-base leading-relaxed mb-6">
                {selectedGame.description}
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200/80 mb-6 text-xs text-stone-700">
              <div>
                <span className="text-stone-400 uppercase text-[10px] font-bold block">Doporučený počet</span>
                <strong className="text-stone-900 flex items-center gap-1 mt-0.5">
                  <Users size={14} className="text-amber-800" />
                  {selectedGame.players || '1–4 hráči'}
                </strong>
              </div>
              <div>
                <span className="text-stone-400 uppercase text-[10px] font-bold block">Doba jedné partie</span>
                <strong className="text-stone-900 flex items-center gap-1 mt-0.5">
                  <Clock size={14} className="text-amber-800" />
                  {selectedGame.playTime || '45 min'}
                </strong>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-stone-400 uppercase text-[10px] font-bold block">Dostupnost</span>
                <strong className="text-emerald-700 flex items-center gap-1 mt-0.5">
                  ✓ K zapůjčení na baru
                </strong>
              </div>
            </div>

            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/60 mb-6 text-xs text-stone-600">
              💡 <strong>Rádi vysvětlíme pravidla:</strong> Pokud hru ještě neznáte, naše obsluha vám ochotně pomůže s přípravou herního plánu a vysvětlením základních herních mechanik.
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => {
                  setSelectedGame(null);
                  onNavigate('RESERVATION');
                }}
                className="flex-1 py-3 px-6 bg-stone-900 hover:bg-black text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-colors"
              >
                Rezervovat herní stůl
              </button>
              <button 
                onClick={() => setSelectedGame(null)}
                className="py-3 px-6 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-colors"
              >
                Zpět do knihovny
              </button>
            </div>
          </div>
        </div>
      )}

      </div>

      {/* Light Clean Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 text-stone-600 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 p-1 flex items-center justify-center shadow-sm">
                <img src={officialLogo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-stone-900 block">ŠÁLEK ZÁBAVY</span>
                <span className="text-[10px] uppercase tracking-widest text-amber-800 font-semibold">Herní doupě • Káva & Hry Bruntál</span>
              </div>
            </div>
            <p className="text-stone-600 text-sm font-serif leading-relaxed max-w-md">
              Deskové hry, VR virtuální realita, přátelské turnaje a posezení s výběrovou kávou.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-stone-900 mb-4">Navigace herny</h4>
            <ul className="space-y-2 text-sm text-stone-600 font-sans">
              <li><button onClick={() => setView('lounge')} className="hover:text-amber-800 transition-colors">Přehled doupěte</button></li>
              <li><button onClick={() => setView('library')} className="hover:text-amber-800 transition-colors">Knihovna 500+ her</button></li>
              <li><button onClick={() => setView('vr')} className="hover:text-amber-800 transition-colors">VR Zóna Meta Quest 3</button></li>
              <li><button onClick={() => setView('membership')} className="hover:text-amber-800 transition-colors">Vstupné a ceník</button></li>
              <li><button onClick={() => onNavigate('CAFE')} className="hover:text-amber-800 transition-colors">Kavárna na náměstí</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-stone-900 mb-4">Provozovatel & Fakturační údaje</h4>
            <ul className="space-y-1.5 text-xs text-stone-600 font-sans">
              <li className="font-bold text-stone-800 text-sm">Šálek zábavy s.r.o.</li>
              <li>IČO: <strong className="font-mono text-stone-800">23821965</strong></li>
              <li>Datová schránka: <strong className="font-mono text-stone-800">j4in84r</strong></li>
              <li>Sídlo: Ruská 1870/3, 792 01 Bruntál</li>
              <li className="pt-2 border-t border-stone-200 mt-2 font-medium text-stone-700">
                Provozovna: Náměstí Míru 5, 792 01 Bruntál
              </li>
              <li className="text-stone-500 text-[11px]">Zapsáno v obchodním rejstříku</li>
            </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
          <p>© 2025–2026 Šálek zábavy s.r.o. Všechna práva vyhrazena.</p>
          <button onClick={() => onNavigate('HOME')} className="hover:text-stone-900 font-semibold transition-colors mt-2 sm:mt-0">
            Zpět na úvodní rozcestník
          </button>
        </div>
      </footer>

    </div>
  );
};