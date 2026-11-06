import React from 'react';
import { PageView } from '../types';
import { Coffee, Gamepad2, MapPin, Star, Users, ArrowRight, Shield, Scroll, Sword, Flame, Quote } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-guild-bg">
      
      {/* 1. HERO SECTION: Elegant & Clean */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {/* Overlay with subtle gradient instead of heavy black */}
        <div className="absolute inset-0 bg-black/45 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1920" 
          alt="Atmosféra kavárny" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8 flex justify-center animate-fade-in">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-2 uppercase tracking-[0.3em] text-xs font-bold shadow-lg">
              Est. 2023 • Bruntál
            </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-2xl leading-tight uppercase tracking-wide">
            Kavárna na náměstí
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-sans font-light mb-12 max-w-3xl mx-auto tracking-wide">
            Káva, Hry a Komunita. Dva světy v jednom prostoru.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6">
             <button onClick={() => onNavigate('CAFE')} className="px-10 py-4 bg-white text-guild-dark font-sans font-bold uppercase tracking-widest hover:bg-guild-gold hover:text-white transition-all shadow-lg rounded-sm border-2 border-transparent">
                <div className="flex items-center gap-3">
                    <Coffee size={18} />
                    <span>Kavárna</span>
                </div>
             </button>
             
             <button onClick={() => onNavigate('GAMING')} className="px-10 py-4 bg-transparent backdrop-blur-sm border-2 border-white text-white font-sans font-bold uppercase tracking-widest hover:bg-white hover:text-guild-dark transition-all shadow-lg rounded-sm">
                <div className="flex items-center gap-3">
                    <Gamepad2 size={18} />
                    <span>Herní Doupě</span>
                </div>
             </button>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/70">
            <ArrowRight className="rotate-90 w-6 h-6" />
        </div>
      </section>

      {/* 2. MAPA & LOKACE (Clean Style) */}
      <section className="py-12 bg-guild-bg relative">
         <div className="max-w-7xl mx-auto px-4">
            <div className="h-[400px] w-full relative shadow-elegant rounded-sm overflow-hidden border border-gray-200">
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2579.645484834898!2d17.4624443!3d49.9882229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47123ad900000001%3A0x0!2zTsOibS4gTcOtcHUgMTUsIDc5MiAwMSBCcnVudMOhbA!5e0!3m2!1scs!2scz!4v1700000000000!5m2!1scs!2scz" 
                width="100%" 
                height="100%" 
                style={{border:0, filter: 'grayscale(100%) contrast(1.2) opacity(0.8)'}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                ></iframe>
                
                <div className="absolute top-6 left-6 bg-white p-8 max-w-xs shadow-xl border-l-4 border-guild-gold">
                    <div className="flex items-start gap-4">
                        <MapPin className="text-guild-gold w-6 h-6 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-display font-bold text-guild-dark text-xl mb-2">Naše Adresa</h3>
                            <p className="text-gray-500 text-sm mb-4 font-sans leading-relaxed">Náměstí Míru 15<br/>792 01 Bruntál</p>
                            <a href="https://maps.google.com" target="_blank" className="text-xs uppercase font-bold tracking-widest text-guild-gold hover:text-guild-dark border-b border-guild-gold pb-1 transition-colors">
                                Navigovat
                            </a>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* 3. ROZCESTNÍK (Clean Cards) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <span className="text-guild-gold uppercase tracking-[0.2em] text-xs font-bold block mb-4">
                Co nabízíme
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-guild-dark">Svět Kavárny</h2>
            <div className="w-20 h-1 bg-guild-gold mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div 
                onClick={() => onNavigate('CAFE')}
                className="bg-white p-10 rounded-sm shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group text-center border border-transparent hover:border-guild-gold/30"
            >
                <div className="w-16 h-16 mx-auto bg-guild-bg rounded-full flex items-center justify-center mb-8 group-hover:bg-guild-gold transition-colors duration-300">
                    <Coffee className="w-8 h-8 text-guild-dark group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl text-guild-dark mb-4 group-hover:text-guild-gold transition-colors">Kavárna</h3>
                <p className="text-sm text-gray-500 font-sans leading-relaxed">Výběrová káva z top pražíren, domácí dorty a moderní brunch.</p>
            </div>

            {/* Card 2 */}
            <div 
                onClick={() => onNavigate('GAMING')}
                className="bg-white p-10 rounded-sm shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group text-center border border-transparent hover:border-guild-gold/30"
            >
                <div className="w-16 h-16 mx-auto bg-guild-bg rounded-full flex items-center justify-center mb-8 group-hover:bg-guild-gold transition-colors duration-300">
                    <Gamepad2 className="w-8 h-8 text-guild-dark group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl text-guild-dark mb-4 group-hover:text-guild-gold transition-colors">Herní Doupě</h3>
                <p className="text-sm text-gray-500 font-sans leading-relaxed">500+ deskových her, Wargaming stoly a privátní RPG místnosti.</p>
            </div>

            {/* Card 3 */}
            <div 
                onClick={() => onNavigate('MEMBERSHIP')}
                className="bg-white p-10 rounded-sm shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group text-center border border-transparent hover:border-guild-gold/30"
            >
                <div className="w-16 h-16 mx-auto bg-guild-bg rounded-full flex items-center justify-center mb-8 group-hover:bg-guild-gold transition-colors duration-300">
                    <Users className="w-8 h-8 text-guild-dark group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl text-guild-dark mb-4 group-hover:text-guild-gold transition-colors">Komunita</h3>
                <p className="text-sm text-gray-500 font-sans leading-relaxed">Pravidelné turnaje, workshopy a členské výhody pro hráče.</p>
            </div>

            {/* Card 4 */}
            <div 
                onClick={() => onNavigate('SHOP')}
                className="bg-white p-10 rounded-sm shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group text-center border border-transparent hover:border-guild-gold/30"
            >
                <div className="w-16 h-16 mx-auto bg-guild-bg rounded-full flex items-center justify-center mb-8 group-hover:bg-guild-gold transition-colors duration-300">
                    <Star className="w-8 h-8 text-guild-dark group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl text-guild-dark mb-4 group-hover:text-guild-gold transition-colors">Obchod</h3>
                <p className="text-sm text-gray-500 font-sans leading-relaxed">Magic: The Gathering, Warhammer a deskové hry k zakoupení.</p>
            </div>
        </div>
      </section>

      {/* 4. O NÁS (Premium Aesthetic) */}
      <section className="py-24 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
              <div>
                  <span className="text-guild-gold uppercase tracking-widest text-xs font-bold mb-4 block">Náš Příběh</span>
                  <h2 className="text-4xl font-display font-bold mb-8 text-guild-dark">
                      Kde se káva potkává s fantazií
                  </h2>
                  <p className="text-gray-600 font-sans text-lg leading-relaxed mb-6 font-light">
                      Vše začalo snem dvou dobrodruhů, kteří hledali místo, kde by se dobře najedli a zároveň si zahráli pořádnou hru. 
                      Protože ho nenašli, postavili si ho.
                  </p>
                  <p className="text-gray-600 font-sans text-lg leading-relaxed mb-10 font-light">
                      Dnes je <strong>Kavárna na náměstí</strong> centrem komunity v Bruntále. Spojujeme svět výběrové kávy (protože bez kofeinu není magie) 
                      a deskových her. Elegantní prostředí pro práci i zábavu.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border-l-2 border-guild-gold pl-6">
                        <span className="block text-3xl font-display font-bold text-guild-dark mb-1">500+</span>
                        <span className="text-xs text-gray-400 uppercase tracking-widest">Her k zapůjčení</span>
                    </div>
                    <div className="border-l-2 border-guild-gold pl-6">
                        <span className="block text-3xl font-display font-bold text-guild-dark mb-1">7/7</span>
                        <span className="text-xs text-gray-400 uppercase tracking-widest">Otevřeno denně</span>
                    </div>
                  </div>
              </div>
              
              <div className="relative">
                  <div className="absolute top-10 left-10 w-full h-full border-2 border-guild-gold/30 rounded-sm z-0"></div>
                  <img src="https://images.unsplash.com/photo-1542181961-9590d0c79dab?auto=format&fit=crop&q=80&w=800" className="relative z-10 w-full shadow-2xl rounded-sm grayscale hover:grayscale-0 transition-all duration-1000" alt="Interior" />
              </div>
          </div>
      </section>

      {/* 5. RECENZE (Clean Testimonials) */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-guild-bg">
          <div className="text-center mb-20">
              <h2 className="text-4xl font-display font-bold text-guild-dark">Hlasy návštěvníků</h2>
              <div className="w-20 h-1 bg-guild-gold mx-auto mt-6"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
              {[
                  { name: "Jakub N.", text: "Nejlepší Flat White ve městě. A k tomu si můžu půjčit Scythe? Dokonalost." },
                  { name: "Lenka K.", text: "Chodím sem pracovat. Rychlá wifi, klid a skvělé dorty. Večer pak zůstávám na deskovky." },
                  { name: "Petr S.", text: "Warhammer stoly jsou parádní. Konečně místo v Bruntále, které má úroveň." }
              ].map((review, i) => (
                  <div key={i} className="bg-white p-10 rounded-sm shadow-sm border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
                      <Quote className="text-guild-gold w-10 h-10 mb-6 opacity-20 group-hover:opacity-100 transition-opacity" />
                      <p className="text-gray-600 font-sans italic mb-8 leading-relaxed">"{review.text}"</p>
                      <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-guild-dark font-display">
                              {review.name[0]}
                          </div>
                          <div>
                              <div className="font-bold text-guild-dark text-sm uppercase tracking-wide">{review.name}</div>
                              <div className="text-[10px] text-guild-gold uppercase tracking-widest">Místní Hrdina</div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* 6. CTA / REZERVACE */}
      <section className="py-24 bg-guild-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Zajistěte si svůj stůl</h2>
              <p className="text-gray-400 mb-10 font-sans text-lg font-light max-w-2xl mx-auto">
                  Ať už plánujete pracovní schůzku nebo epickou bitvu, rezervace je jistota. V podvečer bývá plno.
              </p>
              <button onClick={() => onNavigate('RESERVATION')} className="bg-guild-gold text-white px-12 py-5 font-sans font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-guild-dark transition-all shadow-glow rounded-sm">
                  Rezervovat Stůl
              </button>
          </div>
      </section>

      {/* 7. FOOTER (Clean & Minimal) */}
      <footer className="bg-white border-t border-gray-200 pt-20 pb-10 text-guild-dark">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2 pr-10">
                  <div className="font-display font-bold text-2xl text-guild-dark mb-6 flex items-center gap-2">
                      KAVÁRNA NA NÁMĚSTÍ
                  </div>
                  <p className="font-sans text-gray-500 leading-relaxed font-light">
                      Spojujeme světy. Káva, Hry, Lidé. 
                      Moderní prostor v historickém srdci Bruntálu, kde se snoubí výběrová káva s vášní pro hry.
                  </p>
              </div>
              
              <div>
                  <h4 className="font-sans font-bold text-guild-dark uppercase tracking-widest text-xs mb-6">Navigace</h4>
                  <ul className="space-y-3 text-sm text-gray-600 font-sans">
                      <li><button onClick={() => onNavigate('CAFE')} className="hover:text-guild-gold transition-colors">Kavárna Menu</button></li>
                      <li><button onClick={() => onNavigate('GAMING')} className="hover:text-guild-gold transition-colors">Herní Knihovna</button></li>
                      <li><button onClick={() => onNavigate('EVENTS')} className="hover:text-guild-gold transition-colors">Kalendář Akcí</button></li>
                      <li><button onClick={() => onNavigate('RESERVATION')} className="hover:text-guild-gold transition-colors">Rezervace</button></li>
                  </ul>
              </div>
              
              <div>
                  <h4 className="font-sans font-bold text-guild-dark uppercase tracking-widest text-xs mb-6">Kontakt</h4>
                  <ul className="space-y-3 text-sm text-gray-600 font-sans">
                      <li className="flex items-center gap-3"><MapPin size={16} className="text-guild-gold" /> Náměstí Míru 15, Bruntál</li>
                      <li className="flex items-center gap-3"><Users size={16} className="text-guild-gold" /> +420 777 666 555</li>
                      <li className="flex items-center gap-3"><Scroll size={16} className="text-guild-gold" /> info@kavarnananamesti.cz</li>
                  </ul>
              </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 text-center text-xs uppercase tracking-[0.2em] text-gray-400 font-sans font-medium">
              © 2023 Kavárna na náměstí • Coffee & Gaming Lounge
          </div>
      </footer>
    </div>
  );
};