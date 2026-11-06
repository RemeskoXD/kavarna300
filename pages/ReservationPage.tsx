import React, { useState } from 'react';
import { Coffee, Gamepad2, Scroll, Users, Calendar, Clock, CheckCircle, MapPin, Glasses, Phone, Mail, Sparkles, ArrowRight } from 'lucide-react';

type ReservationType = 'cafe' | 'gaming' | 'vr' | 'rpg' | null;

export const ReservationPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ReservationType>('cafe');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().slice(0, 10),
    time: '15:00',
    guests: '2',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const getTypeName = (type: ReservationType) => {
    switch (type) {
      case 'cafe': return 'Stůl v Kavárně (Brunch & Káva)';
      case 'gaming': return 'Herní stůl (Deskové hry)';
      case 'vr': return 'VR Stanice (Meta Quest 3)';
      case 'rpg': return 'Privátní RPG Salonek (D&D)';
      default: return 'Rezervace';
    }
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-lg w-full bg-white p-8 sm:p-12 rounded-3xl shadow-xl text-center border border-stone-200 animate-fade-in">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle size={40} />
          </div>
          <span className="text-xs uppercase tracking-widest font-bold text-amber-800 font-mono">Potvrzení</span>
          <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1 mb-4">Rezervace byla odeslána!</h2>
          <p className="text-stone-600 font-serif leading-relaxed mb-6">
            Děkujeme, <strong>{formData.name || 'hoste'}</strong>! Váš stůl pro <strong>{formData.guests} {parseInt(formData.guests) === 1 ? 'osobu' : parseInt(formData.guests) < 5 ? 'osoby' : 'osob'}</strong> na <strong>{formData.date} v {formData.time}</strong> je připravován.
          </p>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs text-stone-600 space-y-2 mb-8">
            <p className="flex justify-between"><span>Zóna:</span> <strong className="text-stone-900">{getTypeName(selectedType)}</strong></p>
            <p className="flex justify-between"><span>Telefon:</span> <strong className="text-stone-900">{formData.phone || '+420 777 123 456'}</strong></p>
            <p className="flex justify-between"><span>Místo:</span> <strong className="text-stone-900">Náměstí Míru 5, Bruntál</strong></p>
          </div>

          <button 
            onClick={() => {
              setFormSubmitted(false);
              setSelectedType('cafe');
            }}
            className="w-full py-3.5 bg-stone-900 text-white rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-black transition-colors shadow-md"
          >
            Vytvořit další rezervaci
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans pb-24">
      
      {/* Header */}
      <div className="bg-[#faf8f5] border-b border-stone-200 py-16 sm:py-20 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>Plánování návštěvy • Šálek zábavy</span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-stone-900 mb-4">
            Rezervace Stolu
          </h1>
          <p className="text-stone-600 font-serif text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Zajistěte si své oblíbené místo. Ať už plánujete ranní brunch, pracovní schůzku nebo večerní deskoherní partii s přáteli.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12">
        
        {/* Step 1: Select Zone */}
        <div className="mb-12">
          <div className="text-center sm:text-left mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">Krok 1 ze 2</span>
            <h2 className="text-2xl font-serif font-bold text-stone-900">Vyberte si herní nebo kavárenskou zónu</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Cafe Table */}
            <button
              type="button"
              onClick={() => setSelectedType('cafe')}
              className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                selectedType === 'cafe'
                  ? 'bg-amber-50/70 border-amber-700 shadow-md ring-1 ring-amber-700'
                  : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  selectedType === 'cafe' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700'
                }`}>
                  <Coffee size={24} />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">Kavárna & Brunch</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Stolky u oken, pohodlná křesílka, káva, zákusky a snídaně.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/60 text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                {selectedType === 'cafe' ? '✓ Zvoleno' : 'Vybrat zónu'}
              </div>
            </button>

            {/* Gaming Table */}
            <button
              type="button"
              onClick={() => setSelectedType('gaming')}
              className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                selectedType === 'gaming'
                  ? 'bg-amber-50/70 border-amber-700 shadow-md ring-1 ring-amber-700'
                  : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  selectedType === 'gaming' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700'
                }`}>
                  <Gamepad2 size={24} />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">Herní Stůl</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Velké stoly pro deskovky, karty i Warhammer. 500+ her k ruce.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/60 text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                {selectedType === 'gaming' ? '✓ Zvoleno' : 'Vybrat zónu'}
              </div>
            </button>

            {/* VR Zone */}
            <button
              type="button"
              onClick={() => setSelectedType('vr')}
              className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                selectedType === 'vr'
                  ? 'bg-amber-50/70 border-amber-700 shadow-md ring-1 ring-amber-700'
                  : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  selectedType === 'vr' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700'
                }`}>
                  <Glasses size={24} />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">VR Meta Quest 3</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Virtuální realita Beat Saber, asistence obsluhy a promítání.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/60 text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                {selectedType === 'vr' ? '✓ Zvoleno' : 'Vybrat zónu'}
              </div>
            </button>

            {/* RPG Room */}
            <button
              type="button"
              onClick={() => setSelectedType('rpg')}
              className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                selectedType === 'rpg'
                  ? 'bg-amber-50/70 border-amber-700 shadow-md ring-1 ring-amber-700'
                  : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  selectedType === 'rpg' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700'
                }`}>
                  <Scroll size={24} />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">RPG Salonek</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Privátní komorní místnost pro D&D a nerušené večerní hraní.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/60 text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                {selectedType === 'rpg' ? '✓ Zvoleno' : 'Vybrat zónu'}
              </div>
            </button>

          </div>
        </div>

        {/* Step 2: Form */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <div className="border-b border-stone-200 pb-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">Krok 2 ze 2</span>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Vyplňte údaje k rezervaci</h2>
            </div>
            <span className="text-xs text-stone-500">Zvoleno: <strong>{getTypeName(selectedType)}</strong></span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Jméno a Příjmení *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-300 p-3.5 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-sm" 
                  placeholder="např. Jan Novák" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Telefonní číslo *</label>
                <input 
                  type="tel" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-300 p-3.5 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-sm" 
                  placeholder="+420 777 123 456" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">E-mail *</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-300 p-3.5 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-sm" 
                  placeholder="jan@example.cz" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Počet osob *</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-300 p-3.5 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-sm"
                >
                  {[1,2,3,4,5,6,7,8,"9 a více (připravíme velký stůl)"].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'osoba' : (typeof n === 'number' && n < 5) ? 'osoby' : 'osob'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Datum *</label>
                <input 
                  type="date" 
                  required 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-300 p-3.5 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-sm" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Čas příchodu *</label>
                <input 
                  type="time" 
                  required 
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-300 p-3.5 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-sm" 
                />
              </div>

            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Poznámka / Speciální přání (volitelné)</label>
              <textarea 
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-stone-50 border border-stone-300 p-3.5 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-sm resize-none" 
                placeholder="Např. přijdeme s kočárkem, chceme připravit konkrétní hru na stůl, oslava narozenin..."
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
              <span className="text-xs text-stone-500 text-center sm:text-left">
                Rezervaci držíme 15 minut po smluveném čase. V případě zrušení stačí zavolat.
              </span>
              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-md transition-all hover:scale-105"
              >
                Odeslat a potvrdit rezervaci
              </button>
            </div>
          </form>
        </div>

        {/* Location & Quick Contact card */}
        <div className="mt-12 p-8 rounded-3xl bg-stone-50 border border-stone-200 text-center">
          <p className="flex items-center justify-center gap-2 text-stone-800 font-serif font-bold mb-1">
            <MapPin size={18} className="text-amber-700" />
            Šálek zábavy • Náměstí Míru 5, 792 01 Bruntál
          </p>
          <p className="text-xs text-stone-500">
            Potřebujete rychlou změnu nebo konzultaci? Volejte kdykoliv: <strong className="text-stone-800 font-mono">+420 777 123 456</strong>
          </p>
        </div>

      </div>

    </div>
  );
};