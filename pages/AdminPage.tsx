import React, { useState, useEffect } from 'react';
import { DataService } from '../services/dataService';
import { MenuItem, GameItem, CalendarEvent } from '../types';
import { 
  Trash2, 
  Plus, 
  ArrowLeft, 
  Edit, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Lock, 
  LogOut, 
  Database, 
  FileSpreadsheet, 
  Download, 
  RefreshCw, 
  X, 
  Coffee, 
  Gamepad2, 
  Calendar, 
  Search, 
  Clock, 
  Users,
  ShieldAlert,
  Sparkles,
  Layers
} from 'lucide-react';

interface AdminPageProps {
  onBack: () => void;
}

const ADMIN_PASSWORD = 'IIUSDIUASGD6787';
const AUTH_SESSION_KEY = 'salek_admin_auth_v2';

export const AdminPage: React.FC<AdminPageProps> = ({ onBack }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Navigation State
  const [activeMainSection, setActiveMainSection] = useState<'cafe' | 'gaming' | 'database'>('cafe');
  const [gamingSubTab, setGamingSubTab] = useState<'games' | 'events'>('games');
  const [csvViewTab, setCsvViewTab] = useState<'menu' | 'games' | 'events'>('menu');

  // Draft Data State (held in memory until user clicks "Uložit změny")
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [games, setGames] = useState<GameItem[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [menuFilterCategory, setMenuFilterCategory] = useState<string>('all');
  const [gameFilterGenre, setGameFilterGenre] = useState<string>('all');

  // Edit / Add Modal State
  const [editingItemType, setEditingItemType] = useState<'menu' | 'game' | 'event' | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null); // null means adding new

  // Form Fields
  const [formMenu, setFormMenu] = useState<Partial<MenuItem>>({
    name: '',
    category: 'coffee',
    price: 0,
    description: '',
    image: ''
  });

  const [formGame, setFormGame] = useState<Partial<GameItem>>({
    title: '',
    genre: 'Rodinné',
    price: 0,
    rating: 5,
    players: '2–4 hráči',
    playTime: '45 min',
    difficulty: 'Lehká',
    description: '',
    image: '/games/catan.jpg'
  });

  const [formEvent, setFormEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    date: new Date().toISOString().slice(0, 16),
    type: 'tournament',
    description: ''
  });

  // Load initial data
  useEffect(() => {
    setMenu(DataService.getMenu());
    setGames(DataService.getGames());
    setEvents(DataService.getEvents());
  }, []);

  // Warn on browser tab close if unsaved changes exist
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      try {
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      } catch {
        // Ignore
      }
    } else {
      setAuthError('Zadané heslo není správné. Zkuste to prosím znovu.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    try {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    } catch {
      // Ignore
    }
  };

  // Commit All Changes to NoSQL & CSV Storage ("Vždy nahoře musí dát uložit aby se to propsalo")
  const handleSaveAll = () => {
    DataService.saveAll(menu, games, events);
    setHasUnsavedChanges(false);
    setSaveSuccessMessage('✓ Všechny změny byly úspěšně uloženy a propsány na web (do NoSQL i CSV databáze)!');
    setTimeout(() => {
      setSaveSuccessMessage('');
    }, 4500);
  };

  // =========================
  // CRUD HANDLERS (Draft state)
  // =========================
  const openAddMenuModal = () => {
    setEditingItemType('menu');
    setEditingItemId(null);
    setFormMenu({
      name: '',
      category: 'coffee',
      price: 85,
      description: '',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600'
    });
  };

  const openEditMenuModal = (item: MenuItem) => {
    setEditingItemType('menu');
    setEditingItemId(item.id);
    setFormMenu({ ...item });
  };

  const saveMenuForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMenu.name) return;

    if (editingItemId) {
      // Edit
      setMenu(prev => prev.map(m => m.id === editingItemId ? {
        id: editingItemId,
        name: formMenu.name || '',
        category: formMenu.category || 'coffee',
        price: Number(formMenu.price) || 0,
        description: formMenu.description || '',
        image: formMenu.image || ''
      } : m));
    } else {
      // Add
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: formMenu.name || '',
        category: formMenu.category || 'coffee',
        price: Number(formMenu.price) || 0,
        description: formMenu.description || '',
        image: formMenu.image || ''
      };
      setMenu(prev => [newItem, ...prev]);
    }
    setHasUnsavedChanges(true);
    setEditingItemType(null);
  };

  const deleteMenuItem = (id: string) => {
    if (confirm('Opravdu chcete tuto položku smazat z menu? (Pro potvrzení na webu klikněte poté Uložit)')) {
      setMenu(prev => prev.filter(m => m.id !== id));
      setHasUnsavedChanges(true);
    }
  };

  // Games CRUD
  const openAddGameModal = () => {
    setEditingItemType('game');
    setEditingItemId(null);
    setFormGame({
      title: '',
      genre: 'Rodinné',
      price: 0,
      rating: 5,
      players: '2–4 hráči',
      playTime: '45 min',
      difficulty: 'Lehká',
      description: '',
      image: '/games/catan.jpg'
    });
  };

  const openEditGameModal = (game: GameItem) => {
    setEditingItemType('game');
    setEditingItemId(game.id);
    setFormGame({ ...game });
  };

  const saveGameForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formGame.title) return;

    if (editingItemId) {
      // Edit
      setGames(prev => prev.map(g => g.id === editingItemId ? {
        id: editingItemId,
        title: formGame.title || '',
        genre: formGame.genre || 'Rodinné',
        price: Number(formGame.price) || 0,
        rating: Number(formGame.rating) || 5,
        players: formGame.players || '',
        playTime: formGame.playTime || '',
        difficulty: formGame.difficulty || 'Lehká',
        description: formGame.description || '',
        image: formGame.image || '/games/catan.jpg'
      } : g));
    } else {
      // Add
      const newGame: GameItem = {
        id: Date.now().toString(),
        title: formGame.title || '',
        genre: formGame.genre || 'Rodinné',
        price: Number(formGame.price) || 0,
        rating: Number(formGame.rating) || 5,
        players: formGame.players || '',
        playTime: formGame.playTime || '',
        difficulty: formGame.difficulty || 'Lehká',
        description: formGame.description || '',
        image: formGame.image || '/games/catan.jpg'
      };
      setGames(prev => [newGame, ...prev]);
    }
    setHasUnsavedChanges(true);
    setEditingItemType(null);
  };

  const deleteGame = (id: string) => {
    if (confirm('Opravdu chcete tuto hru odstranit z knihovny? (Pro potvrzení na webu klikněte poté Uložit)')) {
      setGames(prev => prev.filter(g => g.id !== id));
      setHasUnsavedChanges(true);
    }
  };

  // Events CRUD
  const openAddEventModal = () => {
    setEditingItemType('event');
    setEditingItemId(null);
    setFormEvent({
      title: '',
      date: new Date().toISOString().slice(0, 16),
      type: 'tournament',
      description: ''
    });
  };

  const openEditEventModal = (ev: CalendarEvent) => {
    setEditingItemType('event');
    setEditingItemId(ev.id);
    setFormEvent({ ...ev });
  };

  const saveEventForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEvent.title) return;

    if (editingItemId) {
      setEvents(prev => prev.map(ev => ev.id === editingItemId ? {
        id: editingItemId,
        title: formEvent.title || '',
        date: formEvent.date || new Date().toISOString(),
        type: formEvent.type || 'tournament',
        description: formEvent.description || ''
      } : ev));
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: formEvent.title || '',
        date: formEvent.date || new Date().toISOString(),
        type: formEvent.type || 'tournament',
        description: formEvent.description || ''
      };
      setEvents(prev => [newEvent, ...prev]);
    }
    setHasUnsavedChanges(true);
    setEditingItemType(null);
  };

  const deleteEvent = (id: string) => {
    if (confirm('Opravdu smazat tuto událost? (Pro potvrzení na webu klikněte poté Uložit)')) {
      setEvents(prev => prev.filter(ev => ev.id !== id));
      setHasUnsavedChanges(true);
    }
  };

  // Download CSV helper
  const handleDownloadCSV = (type: 'menu' | 'games' | 'events') => {
    const csvContent = type === 'menu' ? DataService.menuToCSV(menu) : type === 'games' ? DataService.gamesToCSV(games) : DataService.eventsToCSV(events);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `salek_${type}_databaze.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download NoSQL JSON Dump
  const handleDownloadNoSQL = () => {
    const jsonStr = DataService.getNoSQLDump();
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'salek_zabavy_nosql_dump.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset to factory defaults
  const handleResetDefaults = () => {
    if (confirm('Pozor! Tímto resetujete veškerá data na výchozí nastavení. Pokračovat?')) {
      DataService.resetToDefaults();
      setMenu(DataService.getMenu());
      setGames(DataService.getGames());
      setEvents(DataService.getEvents());
      setHasUnsavedChanges(false);
      alert('Data byla resetována na výchozí hodnoty.');
    }
  };

  // Available local game images for quick selection in the modal
  const localGameCovers = [
    { label: 'Catan (Osadníci)', url: '/games/catan.jpg' },
    { label: 'Carcassonne', url: '/games/carcassonne.jpg' },
    { label: 'Karak', url: '/games/karak.jpg' },
    { label: 'Na Křídlech (Wingspan)', url: '/games/wingspan.jpg' },
    { label: 'Divukraj (Everdell)', url: '/games/everdell.jpg' },
    { label: 'Azul', url: '/games/azul.jpg' },
    { label: 'Jízdenky, prosím!', url: '/games/ticket-to-ride.jpg' },
    { label: 'Scythe', url: '/games/scythe.jpg' },
    { label: 'Terraforming Mars', url: '/games/terraforming-mars.jpg' },
    { label: 'Dune: Imperium', url: '/games/dune-imperium.jpg' },
    { label: 'Dungeons & Dragons', url: '/games/dnd.jpg' },
    { label: 'Gloomhaven', url: '/games/gloomhaven.jpg' },
    { label: 'Nemesis', url: '/games/nemesis.jpg' },
    { label: 'Zombicide', url: '/games/zombicide.jpg' },
    { label: 'Magic: The Gathering', url: '/games/magic-the-gathering.jpg' },
    { label: 'Pokémon TCG', url: '/games/pokemon.jpg' },
    { label: 'Warhammer 40k', url: '/games/warhammer-40k.jpg' },
    { label: 'Star Wars: Legion', url: '/games/star-wars-legion.jpg' },
    { label: 'Krycí Jména', url: '/games/codenames.jpg' },
    { label: 'Bang!', url: '/games/bang.jpg' },
    { label: 'Dixit', url: '/games/dixit.jpg' },
    { label: 'Výbušná Koťátka', url: '/games/exploding-kittens.jpg' },
    { label: 'Dobble', url: '/games/dobble.jpg' }
  ];

  // ===================================
  // 1. UN-AUTHENTICATED LOGIN SCREEN
  // ===================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl text-center">
          
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-center shadow-sm">
            <Lock size={30} />
          </div>

          <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-amber-800 block mb-1">
            Administrace Šálek zábavy
          </span>
          <h1 className="font-serif font-bold text-3xl text-stone-900 mb-2">
            Přihlášení do správy
          </h1>
          <p className="text-stone-600 text-xs font-sans mb-8 leading-relaxed">
            Zadejte administrátorské heslo pro úpravu nabídky kavárny, herního doupěte a správy databází.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 font-mono">
                Heslo správce
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Zadejte heslo..."
                  autoFocus
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                  title={showPassword ? 'Skrýt heslo' : 'Zobrazit heslo'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-900 hover:bg-black text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              Vstoupit do administrace
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <button
              onClick={onBack}
              className="text-stone-500 hover:text-stone-900 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Zpět na úvodní stránku webu</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Filtered lists
  const filteredMenu = menu.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = menuFilterCategory === 'all' || item.category === menuFilterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || (game.description && game.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGenre = gameFilterGenre === 'all' || game.genre === gameFilterGenre;
    return matchesSearch && matchesGenre;
  });

  const allGenres = ['all', ...Array.from(new Set(games.map(g => g.genre)))];

  // ===================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ===================================
  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 font-sans pb-24">
      
      {/* STICKY TOP MANAGEMENT HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              title="Zpět na web"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg sm:text-xl text-stone-900">
                  Šálek zábavy • Správa obsahu
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase font-mono">
                  Online
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Administrátorská konzole s lokální NoSQL & CSV synchronizací
              </p>
            </div>
          </div>

          {/* SAVE BUTTON & STATUS INDICATOR (Klíčový požadavek: vždy nahoře musí dát uložit aby se to propsalo) */}
          <div className="flex items-center flex-wrap gap-2.5">
            {hasUnsavedChanges ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold animate-pulse border border-amber-300">
                <AlertCircle size={14} />
                <span>Máte neuložené změny!</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
                <CheckCircle2 size={14} />
                <span>Vše uloženo na webu</span>
              </span>
            )}

            <button
              onClick={handleSaveAll}
              className={`px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                hasUnsavedChanges 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-400/50 scale-102' 
                  : 'bg-stone-900 hover:bg-black text-white'
              }`}
              title="Uloží veškeré úpravy do databáze a okamžitě je propíše na web"
            >
              <Save size={15} />
              <span>Uložit změny na web</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-stone-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
              title="Odhlásit se z administrace"
            >
              <LogOut size={18} />
            </button>
          </div>

        </div>

        {/* Success toast notification banner */}
        {saveSuccessMessage && (
          <div className="max-w-7xl mx-auto mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-between animate-fade-in">
            <span>{saveSuccessMessage}</span>
            <button onClick={() => setSaveSuccessMessage('')} className="text-white/80 hover:text-white">
              <X size={14} />
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* TOP LEVEL NAVIGATION TABS */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-stone-200 pb-4">
          <button
            onClick={() => setActiveMainSection('cafe')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeMainSection === 'cafe'
                ? 'bg-amber-800 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Coffee size={16} />
            <span>Kavárna • Menu a ceník</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-black/20 text-white">
              {menu.length}
            </span>
          </button>

          <button
            onClick={() => setActiveMainSection('gaming')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeMainSection === 'gaming'
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Gamepad2 size={16} />
            <span>Herní doupě • Knihovna her & Turnaje</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white">
              {games.length} her
            </span>
          </button>

          <button
            onClick={() => setActiveMainSection('database')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeMainSection === 'database'
                ? 'bg-blue-800 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Database size={16} />
            <span>Databáze • NoSQL & CSV synchronizace</span>
          </button>
        </div>

        {/* SEARCH BAR (For Cafe & Gaming) */}
        {activeMainSection !== 'database' && (
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={activeMainSection === 'cafe' ? "Hledat v menu kavárny..." : "Hledat v knihovně her..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-xl py-2.5 pl-10 pr-4 text-xs text-stone-900 focus:outline-none focus:border-amber-700"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
            </div>

            {activeMainSection === 'cafe' && (
              <button
                onClick={openAddMenuModal}
                className="px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
              >
                <Plus size={16} />
                <span>Přidat položku do menu</span>
              </button>
            )}

            {activeMainSection === 'gaming' && gamingSubTab === 'games' && (
              <button
                onClick={openAddGameModal}
                className="px-4 py-2.5 bg-stone-900 hover:bg-black text-white rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
              >
                <Plus size={16} />
                <span>Přidat hru do knihovny</span>
              </button>
            )}

            {activeMainSection === 'gaming' && gamingSubTab === 'events' && (
              <button
                onClick={openAddEventModal}
                className="px-4 py-2.5 bg-stone-900 hover:bg-black text-white rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
              >
                <Plus size={16} />
                <span>Přidat turnaj / akci</span>
              </button>
            )}
          </div>
        )}

        {/* ===================================== */}
        {/* SECTION 1: KAVÁRNA MENU ADMIN         */}
        {/* ===================================== */}
        {activeMainSection === 'cafe' && (
          <div>
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'all', label: 'Všechny kategorie' },
                { id: 'coffee', label: 'Výběrová káva' },
                { id: 'snack', label: 'Brunch & Bistro' },
                { id: 'dessert', label: 'Domácí dezerty' },
                { id: 'drink', label: 'Limonády & Nápoje' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setMenuFilterCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    menuFilterCategory === cat.id
                      ? 'bg-amber-800 text-white'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenu.map(item => (
                <div key={item.id} className="bg-white border border-stone-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-stone-100 border border-stone-200/80">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-white/95 text-[10px] font-bold uppercase tracking-wider text-amber-900 border border-stone-200 shadow-sm">
                        {item.category}
                      </span>
                      <span className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-lg bg-stone-900/90 text-white text-xs font-bold font-mono shadow-md">
                        {item.price} Kč
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-stone-900 mb-1.5">
                      {item.name}
                    </h3>
                    <p className="text-stone-600 font-serif text-xs leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 mt-2">
                    <button
                      onClick={() => openEditMenuModal(item)}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit size={13} />
                      <span>Upravit</span>
                    </button>
                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-red-100 text-stone-700 hover:text-red-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>Smazat</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredMenu.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
                <Coffee size={36} className="mx-auto text-stone-400 mb-3" />
                <p className="text-stone-600 font-serif text-sm">Žádná položka menu neodpovídá zvolenému filtru.</p>
              </div>
            )}
          </div>
        )}

        {/* ===================================== */}
        {/* SECTION 2: HERNÍ DOUPĚ ADMIN          */}
        {/* ===================================== */}
        {activeMainSection === 'gaming' && (
          <div>
            {/* Sub-tabs: Knihovna her vs Akce a turnaje */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setGamingSubTab('games')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors ${
                  gamingSubTab === 'games'
                    ? 'bg-stone-900 text-white'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Gamepad2 size={15} />
                <span>Knihovna her ({games.length})</span>
              </button>
              <button
                onClick={() => setGamingSubTab('events')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors ${
                  gamingSubTab === 'events'
                    ? 'bg-stone-900 text-white'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Calendar size={15} />
                <span>Akce a turnaje ({events.length})</span>
              </button>
            </div>

            {/* SUB-TAB 1: GAMES */}
            {gamingSubTab === 'games' && (
              <div>
                {/* Genre Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {allGenres.map(genre => (
                    <button
                      key={genre}
                      onClick={() => setGameFilterGenre(genre)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        gameFilterGenre === genre
                          ? 'bg-stone-900 text-white'
                          : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {genre === 'all' ? 'Všechny žánry' : genre}
                    </button>
                  ))}
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGames.map(game => (
                    <div key={game.id} className="bg-white border border-stone-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        {game.image && (
                          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-stone-100 border border-stone-200/80">
                            <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-white/95 text-[10px] font-bold uppercase tracking-wider text-amber-900 border border-stone-200 shadow-sm">
                              {game.genre}
                            </span>
                            {game.difficulty && (
                              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-stone-900/80 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                                {game.difficulty}
                              </span>
                            )}
                          </div>
                        )}

                        <h3 className="font-serif font-bold text-lg text-stone-900 mb-1.5">
                          {game.title}
                        </h3>

                        {game.description && (
                          <p className="text-stone-600 font-serif text-xs leading-relaxed line-clamp-2 mb-3">
                            {game.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2 text-[11px] text-stone-600 mb-4">
                          {game.players && (
                            <span className="inline-flex items-center gap-1 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-md">
                              <Users size={12} className="text-amber-800" />
                              {game.players}
                            </span>
                          )}
                          {game.playTime && (
                            <span className="inline-flex items-center gap-1 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-md">
                              <Clock size={12} className="text-amber-800" />
                              {game.playTime}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-amber-800 font-bold">
                            ⭐ {game.rating}/5
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                        <button
                          onClick={() => openEditGameModal(game)}
                          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit size={13} />
                          <span>Upravit</span>
                        </button>
                        <button
                          onClick={() => deleteGame(game.id)}
                          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-red-100 text-stone-700 hover:text-red-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>Smazat</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TAB 2: EVENTS */}
            {gamingSubTab === 'events' && (
              <div className="space-y-4">
                {events.map(ev => (
                  <div key={ev.id} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono ${
                          ev.type === 'tournament' ? 'bg-amber-100 text-amber-900' : ev.type === 'workshop' ? 'bg-blue-100 text-blue-900' : 'bg-purple-100 text-purple-900'
                        }`}>
                          {ev.type}
                        </span>
                        <span className="text-xs text-stone-500 font-mono">
                          📅 {new Date(ev.date).toLocaleDateString('cs-CZ', { weekday: 'short', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-stone-900">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-stone-600 font-serif leading-relaxed mt-1">
                        {ev.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEditEventModal(ev)}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Edit size={13} />
                        <span>Upravit</span>
                      </button>
                      <button
                        onClick={() => deleteEvent(ev.id)}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-red-100 text-stone-700 hover:text-red-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} />
                        <span>Smazat</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 3: DATABÁZE (NoSQL & CSV DUAL STORAGE MANAGEMENT)  */}
        {/* ========================================================= */}
        {activeMainSection === 'database' && (
          <div className="space-y-8">
            {/* Overview Banner */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <span className="text-amber-800 uppercase tracking-widest text-xs font-bold block mb-1 font-mono">
                Architektura ukládání dat
              </span>
              <h2 className="font-serif font-bold text-2xl text-stone-900 mb-2">
                Duální databázový systém: NoSQL & CSV
              </h2>
              <p className="text-stone-600 text-sm font-serif leading-relaxed max-w-3xl mb-6">
                Systém ukládá veškerá data lokálně ve dvou synchronizovaných formátech. 
                <strong> NoSQL Document Store (JSON)</strong> zajišťuje okamžitý a spolehlivý běh přímo na webu, 
                zatímco <strong>CSV databáze</strong> umožňuje export a import tabulek například v Excelu nebo Google Sheets.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#faf8f5] p-5 rounded-2xl border border-stone-200">
                  <div className="flex items-center gap-2 mb-2 font-bold text-stone-900 text-sm">
                    <Database size={16} className="text-blue-700" />
                    <span>NoSQL Document Store (JSON)</span>
                  </div>
                  <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                    Strukturované kolekce pro Menu, Hry a Turnaje. Běží bez výpadků a drží aktuální stav webu.
                  </p>
                  <button
                    onClick={handleDownloadNoSQL}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Download size={14} />
                    <span>Stáhnout NoSQL JSON zálohu</span>
                  </button>
                </div>

                <div className="bg-[#faf8f5] p-5 rounded-2xl border border-stone-200">
                  <div className="flex items-center gap-2 mb-2 font-bold text-stone-900 text-sm">
                    <FileSpreadsheet size={16} className="text-emerald-700" />
                    <span>CSV Tabulková databáze</span>
                  </div>
                  <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                    Plochý tabulkový formát se standardním RFC 4180 kódováním vhodný pro archivaci a tabulkové editory.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleDownloadCSV('menu')}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Download size={12} /> Menu.csv
                    </button>
                    <button
                      onClick={() => handleDownloadCSV('games')}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Download size={12} /> Games.csv
                    </button>
                    <button
                      onClick={() => handleDownloadCSV('events')}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Download size={12} /> Events.csv
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Data Viewer (CSV & JSON) */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setCsvViewTab('menu')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                      csvViewTab === 'menu' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    CSV Menu
                  </button>
                  <button
                    onClick={() => setCsvViewTab('games')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                      csvViewTab === 'games' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    CSV Games
                  </button>
                  <button
                    onClick={() => setCsvViewTab('events')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                      csvViewTab === 'events' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    CSV Events
                  </button>
                </div>

                <span className="text-xs text-stone-500 font-mono">
                  Aktuální živý náhled vygenerovaného CSV
                </span>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  value={DataService.getCSV(csvViewTab)}
                  rows={10}
                  className="w-full bg-stone-900 text-emerald-400 font-mono text-xs p-4 rounded-2xl outline-none select-all"
                />
              </div>
            </div>

            {/* Factory Reset Section */}
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-red-900 text-sm flex items-center gap-2">
                  <ShieldAlert size={16} />
                  <span>Obnovení do továrního nastavení</span>
                </h4>
                <p className="text-xs text-red-700 mt-1">
                  Vrátí veškeré menu, hry a turnaje do původního stavu při spuštění webu.
                </p>
              </div>
              <button
                onClick={handleResetDefaults}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Resetovat databázi
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ===================================== */}
      {/* 3. MODAL FOR MENU ITEM EDIT / ADD     */}
      {/* ===================================== */}
      {editingItemType === 'menu' && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setEditingItemType(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-stone-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingItemType(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <h3 className="font-serif font-bold text-2xl text-stone-900 mb-1">
              {editingItemId ? 'Upravit položku menu' : 'Přidat novou položku'}
            </h3>
            <p className="text-stone-500 text-xs mb-6">
              Upravte název, cenu, kategorii, popis a fotografii.
            </p>

            <form onSubmit={saveMenuForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                  Název položky *
                </label>
                <input
                  type="text"
                  required
                  value={formMenu.name}
                  onChange={(e) => setFormMenu({ ...formMenu, name: e.target.value })}
                  placeholder="např. Flat White, Pistáciový Cheesecake..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                    Kategorie *
                  </label>
                  <select
                    value={formMenu.category}
                    onChange={(e) => setFormMenu({ ...formMenu, category: e.target.value as any })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
                  >
                    <option value="coffee">Výběrová káva</option>
                    <option value="snack">Brunch & Bistro</option>
                    <option value="dessert">Domácí dezert</option>
                    <option value="drink">Limonády & Nápoje</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                    Cena v Kč *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formMenu.price}
                    onChange={(e) => setFormMenu({ ...formMenu, price: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                  Popis (suroviny, původ zrn, servírování)
                </label>
                <textarea
                  rows={3}
                  value={formMenu.description}
                  onChange={(e) => setFormMenu({ ...formMenu, description: e.target.value })}
                  placeholder="Detailní popis pro hosty kavárny..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                  URL fotografie
                </label>
                <input
                  type="text"
                  value={formMenu.image}
                  onChange={(e) => setFormMenu({ ...formMenu, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600 font-mono"
                />
              </div>

              {formMenu.image && (
                <div className="w-full h-32 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                  <img src={formMenu.image} alt="Náhled" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {editingItemId ? 'Uložit úpravu položky' : 'Přidat do menu'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItemType(null)}
                  className="py-3 px-6 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Zrušit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* 4. MODAL FOR GAME ITEM EDIT / ADD     */}
      {/* ===================================== */}
      {editingItemType === 'game' && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setEditingItemType(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-stone-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingItemType(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <h3 className="font-serif font-bold text-2xl text-stone-900 mb-1">
              {editingItemId ? 'Upravit deskovou hru' : 'Přidat novou hru do knihovny'}
            </h3>
            <p className="text-stone-500 text-xs mb-6">
              Nastavte název, žánr, počet hráčů, herní dobu, hodnocení a obrázek.
            </p>

            <form onSubmit={saveGameForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                  Název hry *
                </label>
                <input
                  type="text"
                  required
                  value={formGame.title}
                  onChange={(e) => setFormGame({ ...formGame, title: e.target.value })}
                  placeholder="např. Catan, Scythe, Karak, Wingspan..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 font-serif font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                    Žánr
                  </label>
                  <select
                    value={formGame.genre}
                    onChange={(e) => setFormGame({ ...formGame, genre: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
                  >
                    <option value="Rodinné">Rodinné</option>
                    <option value="Strategie">Strategie</option>
                    <option value="RPG">RPG</option>
                    <option value="TCG">TCG</option>
                    <option value="Wargaming">Wargaming</option>
                    <option value="Párty">Párty</option>
                    <option value="Abstraktní">Abstraktní</option>
                    <option value="Kooperativní">Kooperativní</option>
                    <option value="Sci-Fi Horror">Sci-Fi Horror</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                    Doporučený počet hráčů
                  </label>
                  <input
                    type="text"
                    value={formGame.players}
                    onChange={(e) => setFormGame({ ...formGame, players: e.target.value })}
                    placeholder="např. 2–5 hráčů"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                    Herní doba
                  </label>
                  <input
                    type="text"
                    value={formGame.playTime}
                    onChange={(e) => setFormGame({ ...formGame, playTime: e.target.value })}
                    placeholder="např. 45–60 min"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                    Obtížnost pravidel
                  </label>
                  <select
                    value={formGame.difficulty}
                    onChange={(e) => setFormGame({ ...formGame, difficulty: e.target.value as any })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
                  >
                    <option value="Lehká">Lehká</option>
                    <option value="Střední">Střední</option>
                    <option value="Pokročilá">Pokročilá</option>
                    <option value="Pro experty">Pro experty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                    Hodnocení (1–5 ⭐)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={formGame.rating}
                    onChange={(e) => setFormGame({ ...formGame, rating: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                  Popis hry & Atmosféra
                </label>
                <textarea
                  rows={3}
                  value={formGame.description}
                  onChange={(e) => setFormGame({ ...formGame, description: e.target.value })}
                  placeholder="O čem hra je, cíl hry a zážitek..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 font-serif"
                />
              </div>

              {/* Quick Image Picker from existing local high-res game photos */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                  Výběr fotografie hry
                </label>
                <div className="flex gap-2 mb-2">
                  <select
                    value={formGame.image}
                    onChange={(e) => setFormGame({ ...formGame, image: e.target.value })}
                    className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
                  >
                    <option value="">Vlastní URL adresa...</option>
                    {localGameCovers.map(cov => (
                      <option key={cov.url} value={cov.url}>{cov.label} ({cov.url})</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={formGame.image}
                  onChange={(e) => setFormGame({ ...formGame, image: e.target.value })}
                  placeholder="Cesta k obrázku /games/catan.jpg nebo https://..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              {formGame.image && (
                <div className="w-full h-36 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                  <img src={formGame.image} alt="Náhled hry" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-stone-900 hover:bg-black text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {editingItemId ? 'Uložit úpravu hry' : 'Přidat hru do knihovny'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItemType(null)}
                  className="py-3 px-6 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Zrušit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* 5. MODAL FOR EVENT EDIT / ADD         */}
      {/* ===================================== */}
      {editingItemType === 'event' && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setEditingItemType(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-stone-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingItemType(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <h3 className="font-serif font-bold text-2xl text-stone-900 mb-1">
              {editingItemId ? 'Upravit turnaj / akci' : 'Přidat novou událost'}
            </h3>
            <p className="text-stone-500 text-xs mb-6">
              Přidejte turnaj, workshop nebo party den do kalendáře herního doupěte.
            </p>

            <form onSubmit={saveEventForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                  Název události *
                </label>
                <input
                  type="text"
                  required
                  value={formEvent.title}
                  onChange={(e) => setFormEvent({ ...formEvent, title: e.target.value })}
                  placeholder="např. Friday Night Magic, Turnaj v Katanu..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                    Typ akce
                  </label>
                  <select
                    value={formEvent.type}
                    onChange={(e) => setFormEvent({ ...formEvent, type: e.target.value as any })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
                  >
                    <option value="tournament">Turnaj</option>
                    <option value="party">Party / Hraní</option>
                    <option value="workshop">Workshop / Malování</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                    Datum a čas
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formEvent.date ? formEvent.date.slice(0, 16) : ''}
                    onChange={(e) => setFormEvent({ ...formEvent, date: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1 font-mono">
                  Podrobný popis (formát, ceny, pravidla účasti)
                </label>
                <textarea
                  rows={3}
                  value={formEvent.description}
                  onChange={(e) => setFormEvent({ ...formEvent, description: e.target.value })}
                  placeholder="Popis akce pro hráče a návštěvníky..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 font-serif"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-stone-900 hover:bg-black text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {editingItemId ? 'Uložit úpravu události' : 'Přidat do kalendáře'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItemType(null)}
                  className="py-3 px-6 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Zrušit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};