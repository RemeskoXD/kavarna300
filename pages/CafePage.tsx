import React, { useEffect, useState } from 'react';
import { DataService } from '../services/dataService';
import { MenuItem, PageView } from '../types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Quote, 
  Bean, 
  ChefHat, 
  Heart, 
  Film, 
  X, 
  Sparkles, 
  Coffee, 
  Gamepad2, 
  Glasses, 
  ArrowRight,
  Clock,
  Compass,
  Wifi,
  Zap,
  CheckCircle2,
  Calendar,
  UtensilsCrossed,
  HelpCircle,
  Car
} from 'lucide-react';

type CafeView = 'home' | 'menu' | 'about' | 'gallery' | 'faq';

interface CafePageProps {
  onNavigate: (page: PageView) => void;
  initialView?: CafeView;
}

export const CafePage: React.FC<CafePageProps> = ({ onNavigate, initialView = 'home' }) => {
  const [view, setView] = useState<CafeView>(initialView);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [showVideo, setShowVideo] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState<string>('all');
  const [selectedPortrait, setSelectedPortrait] = useState<{ name: string; role: string; img: string; text: string } | null>(null);

  useEffect(() => {
    if (initialView) {
      setView(initialView);
    }
  }, [initialView]);

  useEffect(() => {
    setMenu(DataService.getMenu());
  }, []);

  const categories = ['coffee', 'snack', 'dessert', 'drink'];
  const categoryNames: Record<string, string> = {
    coffee: 'Výběrová káva & Teplé nápoje',
    snack: 'Snídaně, Brunch & Bistro',
    dessert: 'Domácí dezerty & Pekárna',
    drink: 'Domácí limonády, Pivo & Víno'
  };

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", title: "Příprava výběrového espressa" },
    { url: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=800", title: "Čerstvý avokádový brunch" },
    { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800", title: "Prosvětlený interiér s dřevěnými stoly" },
    { url: "https://images.unsplash.com/photo-1442512595367-427325097196?auto=format&fit=crop&q=80&w=800", title: "Profesionální baristický kávovar" },
    { url: "https://images.unsplash.com/photo-1579952777085-0210e75a7c29?auto=format&fit=crop&q=80&w=800", title: "Poctivý pistáciový dort" },
    { url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800", title: "Čerstvě pražená zrnková káva" },
  ];

  const petraCaricature = '/assets/aistudio/Karikatura_Petra_c3a76be2.webp';
  const jirkaCaricature = '/karikatura-jirka.webp';
  const officialLogo = '/assets/aistudio/Logo_verze_3_1-Picsart-BackgroundRemover_bd276156.webp';

  const faqs = [
    {
      q: "Máte v nabídce rostlinná mléka a bezlepkové dezerty?",
      a: "Ano! Vždy máme čerstvé ovesné mléko Oatly pro dokonalou mikropěnu do cappuccina a flat white. Každý den pečeme minimálně jeden bezlepkový zákusek a máme veganské varianty."
    },
    {
      q: "Dá se u vás pohodlně pracovat na notebooku?",
      a: "Určitě. Máme stabilní optickou Wi-Fi s rychlostí přes 200 Mbps, elektrické zásuvky u většiny stolků a klidné dopolední hodiny ideální pro soustředěnou práci."
    },
    {
      q: "Můžu s sebou vzít pejska?",
      a: "Ano, jsme 100% dog-friendly podnik! Váš čtyřnohý kamarád u nás dostane misku s čerstvou vodou a přátelské přivítání."
    },
    {
      q: "Jak je to s parkováním na náměstí?",
      a: "Přímo před kavárnou na Náměstí Míru je velké parkoviště. Ve všední dny po 16:00 a po celé víkendy a svátky je parkování zcela zdarma."
    },
    {
      q: "Mohu si u kávy zahrát i deskovou hru?",
      a: "Samozřejmě! Šálek zábavy spojuje kavárnu i herní doupě. Můžete si půjčit jakoukoliv hru z naší knihovny s 500+ tituly a obsluha vám ráda pomůže s pravidly."
    }
  ];

  const filteredMenuItems = activeMenuTab === 'all' 
    ? menu 
    : menu.filter(item => item.category === activeMenuTab);

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans flex flex-col selection:bg-amber-700 selection:text-white">
      
      {/* Sub-Navigation in Pure White with Soft Shadow */}
      <div className="bg-white/95 border-b border-stone-200 sticky top-20 z-40 shadow-[0_2px_15px_rgba(0,0,0,0.03)] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span className="font-serif font-bold text-sm tracking-wider uppercase text-stone-900">Kavárna na náměstí</span>
          </div>

          <div className="flex justify-center flex-wrap gap-1 sm:gap-2 text-xs uppercase tracking-wider font-semibold text-stone-600">
            <button 
              onClick={() => setView('home')} 
              className={`px-3 py-1.5 rounded-lg transition-all ${view === 'home' ? 'bg-stone-900 text-white font-bold shadow-sm' : 'hover:text-amber-800 hover:bg-stone-100'}`}
            >
              Přehled
            </button>
            <button 
              onClick={() => setView('menu')} 
              className={`px-3 py-1.5 rounded-lg transition-all ${view === 'menu' ? 'bg-stone-900 text-white font-bold shadow-sm' : 'hover:text-amber-800 hover:bg-stone-100'}`}
            >
              Jídelní & Nápojový lístek
            </button>
            <button 
              onClick={() => setView('about')} 
              className={`px-3 py-1.5 rounded-lg transition-all ${view === 'about' ? 'bg-stone-900 text-white font-bold shadow-sm' : 'hover:text-amber-800 hover:bg-stone-100'}`}
            >
              Náš Příběh
            </button>
            <button 
              onClick={() => setView('gallery')} 
              className={`px-3 py-1.5 rounded-lg transition-all ${view === 'gallery' ? 'bg-stone-900 text-white font-bold shadow-sm' : 'hover:text-amber-800 hover:bg-stone-100'}`}
            >
              Galerie
            </button>
            <button 
              onClick={() => setView('faq')} 
              className={`px-3 py-1.5 rounded-lg transition-all ${view === 'faq' ? 'bg-stone-900 text-white font-bold shadow-sm' : 'hover:text-amber-800 hover:bg-stone-100'}`}
            >
              Časté dotazy
            </button>
            <button 
              onClick={() => onNavigate('RESERVATION')} 
              className="px-3.5 py-1.5 rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition-all font-bold shadow-sm flex items-center gap-1.5"
            >
              <Calendar size={13} />
              <span>Rezervace</span>
            </button>
          </div>
        </div>
      </div>

      <div className="animate-fade-in flex-grow">
        
        {/* VIEW: HOME */}
        {view === 'home' && (
          <>
            {/* Bright Hero Section with luminous photography and crisp typography */}
            <header className="relative bg-[#faf8f5] border-b border-stone-200 overflow-hidden py-16 sm:py-24">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Text Column */}
                <div className="lg:col-span-7 text-left">
                  <div className="inline-flex items-center gap-2 bg-amber-100/80 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full uppercase tracking-wider text-xs font-bold mb-6 shadow-sm">
                    <Sparkles size={14} className="text-amber-700" />
                    <span>Výběrová káva • Poctivá kuchyně • Bruntál</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-stone-900 leading-[1.1] mb-6">
                    Kavárna <br/>
                    <span className="italic font-normal text-amber-800">na náměstí</span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-stone-600 font-serif leading-relaxed mb-8 max-w-xl">
                    Místo provoněné čerstvě mletou výběrovou kávou, domácími zákusky a pohodou. Zastavte se na vydatný brunch, schůzku nebo si jen vydechněte u oblíbeného šálku.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3.5 mb-10">
                    <button 
                      onClick={() => setView('menu')} 
                      className="px-6 py-3.5 bg-stone-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <UtensilsCrossed size={16} />
                      <span>Zobrazit Menu & Ceny</span>
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
                      <span>Video prohlídka</span>
                    </button>
                  </div>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200">
                    <div>
                      <span className="block text-2xl font-serif font-bold text-stone-900">100%</span>
                      <span className="text-xs text-stone-500 font-medium">Výběrová arabika</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-serif font-bold text-stone-900">07:30</span>
                      <span className="text-xs text-stone-500 font-medium">Čerstvá káva od rána</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-serif font-bold text-stone-900">500+</span>
                      <span className="text-xs text-stone-500 font-medium">Deskových her</span>
                    </div>
                  </div>
                </div>

                {/* Right Visual Image Card */}
                <div className="lg:col-span-5 relative">
                  <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                    <img 
                      src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" 
                      alt="Interiér kavárny na náměstí v Bruntále" 
                      className="w-full h-[440px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Badge Floating on image */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-lg text-stone-900">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Náměstí Míru 5, Bruntál</p>
                          <p className="text-xs text-stone-500">Přímo v srdci města • Parkování před kavárnou</p>
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
                      <Film size={18} className="text-amber-400" /> Video prohlídka Kavárny na náměstí
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
                      src="/video/1.webm" 
                      controls 
                      autoPlay 
                      className="max-h-[70vh] w-auto max-w-full rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* THE PROMINENT FRONT CARD (Krátký text na přední stranu webu) */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-30 mb-20">
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-stone-200/90 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  
                  <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl bg-amber-50 border border-amber-200/70 p-2 flex items-center justify-center shadow-sm">
                    <img src={officialLogo} alt="Šálek zábavy" className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-grow text-center md:text-left">
                    <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">
                      Filozofie našeho prostoru
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
                        onClick={() => setView('about')}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 hover:text-amber-700 border-b-2 border-amber-800 pb-0.5 transition-colors"
                      >
                        <span>Přečíst celý příběh vzniku Petry & Jirky</span>
                        <ArrowRight size={14} />
                      </button>
                      
                      <button 
                        onClick={() => onNavigate('GAMING')}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3.5 py-1.5 rounded-full transition-colors"
                      >
                        <Gamepad2 size={14} className="text-amber-700" />
                        <span>Herní Doupě & Knihovna her</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* WHAT VISITORS VALUE MOST (Practical features) */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
              <div className="text-center mb-14">
                <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Komfort & Pohodlí</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">Vše, co pro návštěvu potřebujete</h2>
                <div className="w-16 h-1 bg-amber-700 mx-auto mt-4"></div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-stone-50 border border-stone-200/80 p-6 rounded-2xl text-left hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 text-amber-800 flex items-center justify-center mb-4 shadow-sm">
                    <Wifi size={22} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">Rychlá Wi-Fi & Zásuvky</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Optický internet 200 Mbps a zásuvky u stolků pro bezstarostnou práci i online hry.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 p-6 rounded-2xl text-left hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 text-amber-800 flex items-center justify-center mb-4 shadow-sm">
                    <Car size={22} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">Pohodlné Parkování</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Parkoviště přímo před budovou na náměstí. Po 16:00 a po celé víkendy parkování zdarma.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 p-6 rounded-2xl text-left hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 text-amber-800 flex items-center justify-center mb-4 shadow-sm">
                    <Heart size={22} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">Dog & Family Friendly</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Vychovaní pejsci jsou vítáni s miskou vody. Děti zabaví deskovky i dětské menu.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 p-6 rounded-2xl text-left hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 text-amber-800 flex items-center justify-center mb-4 shadow-sm">
                    <Clock size={22} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">Otevřeno 7 dní v týdnu</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Kavárna otevírá už od 07:30 ráno, večer plynule navazuje herní doupě s barovými drinky.
                  </p>
                </div>
              </div>
            </section>

            {/* FOUNDERS TEASER (Petra & Jirka) */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
              <div className="bg-gradient-to-br from-[#faf7f2] to-[#f4eee4] border border-amber-900/15 rounded-3xl p-8 sm:p-12 shadow-sm">
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  
                  <div className="md:col-span-5 flex justify-center items-center gap-4">
                    <div className="relative w-36 sm:w-40 h-52 sm:h-56 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white shrink-0">
                      <img 
                        src={petraCaricature} 
                        alt="Petra - majitelka kavárny" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-stone-900/85 text-white text-[10px] text-center py-1 font-semibold uppercase tracking-wider">
                        Petra • Káva & Zákusky
                      </div>
                    </div>
                    <div className="relative w-36 sm:w-40 h-52 sm:h-56 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white shrink-0">
                      <img 
                        src={jirkaCaricature} 
                        alt="Jirka - herní doupě" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-stone-900/85 text-white text-[10px] text-center py-1 font-semibold uppercase tracking-wider">
                        Jirka • Hry & Komunita
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-7 text-left">
                    <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">
                      Spoluzakladatelé
                    </span>
                    <h3 className="text-3xl font-serif font-bold text-stone-900 mb-4">
                      Jak se spojil sen Petry a Jirky
                    </h3>
                    <p className="text-stone-700 font-serif text-base sm:text-lg leading-relaxed mb-4">
                      Petra vždy milovala vůni čerstvé kávy, poctivé zákusky a klidné prostředí. Jirka naopak celý život propadl světu her a komunitě. V roce 2025 se jejich vize propojily – a zrodil se <strong>Šálek zábavy</strong>.
                    </p>
                    <button 
                      onClick={() => setView('about')}
                      className="px-6 py-3 rounded-xl bg-stone-900 text-white hover:bg-amber-800 text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm"
                    >
                      <span>Číst celý příběh vzniku</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              </div>
            </section>

            {/* THREE PILLARS OF GASTRO */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
              <div className="text-center mb-14">
                <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Naše Speciality</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">Na čem si u nás pochutnáte</h2>
                <div className="w-16 h-1 bg-amber-700 mx-auto mt-4"></div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                
                <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-6">
                    <Bean size={32} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">Výběrová Káva</h3>
                  <p className="text-stone-600 font-serif text-sm leading-relaxed mb-4">
                    Střídáme zrna z předních českých i evropských pražíren. Precizní espresso, krémové cappuccino i svěží ovocný batch brew.
                  </p>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider font-mono">Espresso od 55 Kč</span>
                </div>

                <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-6">
                    <ChefHat size={32} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">Snídaně & Brunch</h3>
                  <p className="text-stone-600 font-serif text-sm leading-relaxed mb-4">
                    Kváskové toasty s avokádem, farmářská vajíčka z volného chovu, zapečené pannini a vydatné brunch talíře denně do 15:00.
                  </p>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider font-mono">Brunch od 120 Kč</span>
                </div>

                <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-6">
                    <Heart size={32} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">Domácí Zákusky</h3>
                  <p className="text-stone-600 font-serif text-sm leading-relaxed mb-4">
                    Pečeme přímo u nás bez polotovarů. Nadýchaný mrkvový dort, pistáciový cheesecake i bezlepkové a veganské dezerty.
                  </p>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider font-mono">Dorty od 79 Kč</span>
                </div>

              </div>
            </section>
          </>
        )}

        {/* VIEW: MENU (Čistý bílý jídelní lístek s filtry a cenami) */}
        {view === 'menu' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">
                Gastronomická nabídka
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 mb-4">
                Nápojový a jídelní lístek
              </h2>
              <p className="text-stone-600 font-serif italic text-base">
                Kuchyně a brunch otevřeny denně do 15:00. Káva, dezerty a barové drinky až do zavírací doby.
              </p>
              <div className="w-16 h-1 bg-amber-700 mx-auto mt-4"></div>
            </div>

            {/* Menu Category Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <button
                onClick={() => setActiveMenuTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeMenuTab === 'all'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Všechno ({menu.length})
              </button>

              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveMenuTab(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeMenuTab === cat
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat === 'coffee' ? 'Káva' : cat === 'snack' ? 'Brunch & Bistro' : cat === 'dessert' ? 'Dezerty' : 'Nápoje & Víno'}
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredMenuItems.map(item => (
                <div 
                  key={item.id} 
                  className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                >
                  {item.image && (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <h4 className="font-serif font-bold text-stone-900 text-lg">{item.name}</h4>
                      <span className="font-mono font-bold text-amber-800 text-lg shrink-0">{item.price} Kč</span>
                    </div>
                    <p className="text-stone-600 text-xs sm:text-sm font-serif leading-relaxed mb-2">
                      {item.description}
                    </p>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-stone-100 text-[10px] text-stone-600 font-semibold uppercase tracking-wider">
                      {item.category === 'coffee' ? 'Výběrová káva' : item.category === 'snack' ? 'Čerstvý brunch' : item.category === 'dessert' ? 'Vlastní výroba' : 'Osvěžení'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-center text-sm text-stone-700 font-serif">
              Máte potravinovou alergii nebo speciální dietu? Zeptejte se naší obsluhy, rádi vám sdělíme kompletní složení pokrmů i nápojů.
            </div>

          </div>
        )}

        {/* VIEW: ABOUT (PŘÍBĚH PETRY A JIRKY VE SVĚTLÉM BOUTIQUE STYLU) */}
        {view === 'about' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            
            <div className="text-center mb-16">
              <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">
                Zrození konceptu • 2025
              </span>
              <h2 className="text-4xl sm:text-6xl font-serif font-bold text-stone-900 mb-6">
                Jak vznikl Šálek zábavy
              </h2>
              <p className="text-xl font-serif italic text-stone-600 max-w-2xl mx-auto leading-relaxed">
                Každý dobrý nápad začíná malým snem – a náš nebyl výjimkou.
              </p>
              <div className="w-20 h-1 bg-amber-700 mx-auto mt-6"></div>
            </div>

            {/* Side-by-side Founders Portrait & Passion Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              
              {/* Petra Card */}
              <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
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

                  <p className="text-stone-700 font-serif text-base leading-relaxed mb-4">
                    <strong>Petra vždy milovala</strong> vůni čerstvě namleté kávy, poctivé zákusky a klidné prostředí kaváren, kde si člověk může vydechnout od ruchu dne.
                  </p>
                  <p className="text-stone-700 font-serif text-base leading-relaxed">
                    Už dlouho si pohrávala s myšlenkou otevřít vlastní kavárnu – místo, kam lidé přijdou nejen pro kávu, ale i pro atmosféru a pohodu.
                  </p>
                </div>
              </div>

              {/* Jirka Card */}
              <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
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

                  <p className="text-stone-700 font-serif text-base leading-relaxed mb-4">
                    <strong>Jirka naopak celý život</strong> propadl světu her. Deskovky, karetní bitvy, herní konzole… Hledal prostor, kde by se mohli hráči setkávat, sdílet svou vášeň a vytvářet novou komunitu.
                  </p>
                  <p className="text-stone-700 font-serif text-base leading-relaxed">
                    Vytvořit doupě, kde se lidé baví u stolu tváří v tvář, zažívají epické příběhy a smějí se s přáteli.
                  </p>
                </div>
              </div>

            </div>

            {/* The 2025 Union Story Box */}
            <div className="bg-[#faf8f5] rounded-3xl p-8 sm:p-12 border border-amber-900/15 shadow-sm text-center mb-16">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-white border border-amber-300/60 p-2 mb-6 flex items-center justify-center shadow-md">
                <img src={officialLogo} alt="Logo Šálek zábavy" className="w-full h-full object-contain" />
              </div>

              <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">
                Rok 2025 • Slovo dalo slovo
              </span>

              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-6">
                Zrodil se Šálek zábavy
              </h3>

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

              <div className="mt-8 pt-8 border-t border-stone-200 flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => onNavigate('RESERVATION')} 
                  className="px-6 py-3 rounded-xl bg-amber-700 text-white hover:bg-amber-800 text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  Zarezervovat si stůl u nás
                </button>
                <button 
                  onClick={() => onNavigate('GAMING')} 
                  className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Prozkoumat herní doupě
                </button>
              </div>
            </div>

          </div>
        )}

        {/* VIEW: GALLERY */}
        {view === 'gallery' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="text-center mb-12">
              <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Atmosféra podniku</span>
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-3">Fotogalerie</h2>
              <p className="text-stone-600 font-serif italic">Momentky z každodenního života v Šálku zábavy.</p>
              <div className="w-16 h-1 bg-amber-700 mx-auto mt-4"></div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((img, i) => (
                <div key={i} className="group relative rounded-2xl overflow-hidden shadow-sm border border-stone-200 bg-stone-100 aspect-square">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <span className="text-xs uppercase tracking-wider text-amber-300 font-mono mb-1">Momentka</span>
                    <h4 className="font-serif font-bold text-sm">{img.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: FAQ (Časté dotazy) */}
        {view === 'faq' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="text-center mb-12">
              <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-2 font-mono">Užitečné informace</span>
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-3">Často kladené otázky</h2>
              <p className="text-stone-600 font-serif italic">Všechno, co se hosté před první návštěvou nejčastěji ptají.</p>
              <div className="w-16 h-1 bg-amber-700 mx-auto mt-4"></div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
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

            <div className="mt-12 text-center p-8 bg-amber-50/70 border border-amber-200 rounded-3xl">
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-2">Máte jiný dotaz?</h4>
              <p className="text-stone-600 text-sm mb-4">Neváhejte nám zavolat nebo napsat na e-mail. Rádi vám vše vysvětlíme.</p>
              <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-wider">
                <a href="tel:+420777123456" className="px-4 py-2 bg-stone-900 text-white rounded-xl hover:bg-black transition-colors">
                  📞 +420 777 123 456
                </a>
                <a href="mailto:info@salekzabavy.cz" className="px-4 py-2 bg-white border border-stone-300 text-stone-800 rounded-xl hover:bg-stone-100 transition-colors">
                  ✉️ info@salekzabavy.cz
                </a>
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
                <span className="text-[10px] uppercase tracking-widest text-amber-800 font-semibold">Kavárna na náměstí • Káva & Hry Bruntál</span>
              </div>
            </div>
            <p className="text-stone-600 text-sm font-serif leading-relaxed max-w-md">
              Výběrová káva, domácí dezerty, moderní brunch a přátelské herní doupě na historickém Náměstí Míru v Bruntále.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-stone-900 mb-4">Sekce kavárny</h4>
            <ul className="space-y-2 text-sm text-stone-600 font-sans">
              <li><button onClick={() => setView('home')} className="hover:text-amber-800 transition-colors">Úvodní přehled</button></li>
              <li><button onClick={() => setView('menu')} className="hover:text-amber-800 transition-colors">Jídelní lístek & Ceny</button></li>
              <li><button onClick={() => setView('about')} className="hover:text-amber-800 transition-colors">Jak vznikl Šálek zábavy</button></li>
              <li><button onClick={() => setView('faq')} className="hover:text-amber-800 transition-colors">Časté dotazy hostů</button></li>
              <li><button onClick={() => onNavigate('GAMING')} className="hover:text-amber-800 transition-colors">Herní Doupě & VR</button></li>
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