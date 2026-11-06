import { MenuItem, GameItem, CalendarEvent } from '../types';

const KEYS = {
  MENU: 'app_data_menu',
  GAMES: 'app_data_games',
  EVENTS: 'app_data_events',
};

// Initial Seed Data - Cafe (Modern Brunch & Selection Coffee Style)
const INITIAL_MENU: MenuItem[] = [
  // Brunch & Food
  { id: '1', name: 'Avocado Toast', description: 'Kváskový chléb, guacamole, pošírované vejce, granátové jablko, klíčky.', price: 185, category: 'snack', image: 'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?auto=format&fit=crop&q=80&w=600' },
  { id: '2', name: 'Eggs Benedict', description: 'Opečená brioška, šunka od kosti, holandská omáčka, pažitka.', price: 195, category: 'snack', image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=600' },
  { id: '3', name: 'Borůvkové Lívance', description: 'Naše nadýchané lívance, mascarpone krém, borůvkový rozvar, javorový sirup.', price: 165, category: 'dessert', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=600' },
  { id: '4', name: 'Burrata Salad', description: 'Čerstvá burrata, cherry rajčata, bazalkové pesto, piniové oříšky.', price: 210, category: 'snack', image: 'https://images.unsplash.com/photo-1621289650085-5a7ff6a0eb26?auto=format&fit=crop&q=80&w=600' },
  
  // Coffee (Specialty)
  { id: '5', name: 'Batch Brew', description: 'Filtrovaná káva dne. Aktuálně na mlýnku výběr z Etiopie (promytá metoda).', price: 75, category: 'coffee', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600' },
  { id: '6', name: 'Flat White', description: 'Dvojité espresso (Brazílie/Kolumbie), mikropěna. Dokonalý poměr.', price: 89, category: 'coffee', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=600' },
  { id: '7', name: 'V60 Hand Brew', description: 'Ručně připravovaná káva na dripperu Hario. Zeptejte se baristy na aktuální nabídku zrn.', price: 95, category: 'coffee', image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=600' },
  { id: '8', name: 'Espresso Tonic', description: 'Espresso, prémiový tonic, rozmarýn, grep.', price: 95, category: 'coffee', image: 'https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?auto=format&fit=crop&q=80&w=600' },
  
  // Desserts
  { id: '9', name: 'Pistáciový Cheesecake', description: 'Pečený cheesecake, pistáciový krém, drcené pistácie. Domácí výroba.', price: 115, category: 'dessert', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600' },
  { id: '10', name: 'Banana Bread', description: 'Domácí banánový chlebíček s ořechy a čokoládou, podávaný teplý.', price: 65, category: 'dessert', image: 'https://images.unsplash.com/photo-1601247346808-1428526526be?auto=format&fit=crop&q=80&w=600' },
];

// Initial Seed Data - Board Games & TCG (Library)
const INITIAL_GAMES: GameItem[] = [
  // Rodinné & Klasika
  { 
    id: '15', 
    title: 'Catan (Osadníci z Katanu)', 
    genre: 'Rodinné', 
    price: 0, 
    rating: 5, 
    image: '/games/catan.jpg',
    players: '3–4 hráči',
    playTime: '60–90 min',
    difficulty: 'Lehká',
    description: 'Klasika deskových her. Stavějte osady, cesty a obchodujte se surovinami na ostrově Katan.'
  },
  { 
    id: '21', 
    title: 'Carcassonne', 
    genre: 'Rodinné', 
    price: 0, 
    rating: 5, 
    image: '/games/carcassonne.jpg',
    players: '2–5 hráčů',
    playTime: '35–45 min',
    difficulty: 'Lehká',
    description: 'Skládejte krajinu středověké Francie. Budujte města, cesty a kláštery se svými družiníky.'
  },
  { 
    id: '22', 
    title: 'Karak', 
    genre: 'Rodinné', 
    price: 0, 
    rating: 5, 
    image: '/games/karak.jpg',
    players: '2–5 hráčů',
    playTime: '45 min',
    difficulty: 'Lehká',
    description: 'Oblíbený český dungeon crawl pro rodiny i hráče. Prozkoumávejte labyrint pod hradem Karak a porazte draka.'
  },
  { 
    id: '8', 
    title: 'Na Křídlech (Wingspan)', 
    genre: 'Rodinné', 
    price: 0, 
    rating: 5, 
    image: '/games/wingspan.jpg',
    players: '1–5 hráčů',
    playTime: '40–70 min',
    difficulty: 'Střední',
    description: 'Nádherná desková hra o ptactvu. Lákejte opeřence do rezervace, snášejte vajíčka a kombinujte schopnosti.'
  },
  { 
    id: '9', 
    title: 'Divukraj (Everdell)', 
    genre: 'Rodinné', 
    price: 0, 
    rating: 5, 
    image: '/games/everdell.jpg',
    players: '1–4 hráči',
    playTime: '40–80 min',
    difficulty: 'Střední',
    description: 'Pohádkové údolí pod korunou Věčného stromu. Rozvíjejte městečko lesních zvířátek a shromažďujte suroviny.'
  },
  { 
    id: '10', 
    title: 'Azul', 
    genre: 'Abstraktní', 
    price: 0, 
    rating: 5, 
    image: '/games/azul.jpg',
    players: '2–4 hráči',
    playTime: '30–45 min',
    difficulty: 'Lehká',
    description: 'Vyzdobte zdi královského paláce v Évoře nádhernými portugalskými kachličkami azulejos.'
  },
  { 
    id: '18', 
    title: 'Jízdenky, prosím! (Ticket to Ride)', 
    genre: 'Rodinné', 
    price: 0, 
    rating: 5, 
    image: '/games/ticket-to-ride.jpg',
    players: '2–5 hráčů',
    playTime: '45–60 min',
    difficulty: 'Lehká',
    description: 'Železniční dobrodružství napříč Evropou. Propojujte města svými vagónky a plňte tajné trasy.'
  },

  // Strategie & Euro
  { 
    id: '5', 
    title: 'Scythe', 
    genre: 'Strategie', 
    price: 0, 
    rating: 5, 
    image: '/games/scythe.jpg',
    players: '1–5 hráčů',
    playTime: '90–120 min',
    difficulty: 'Pokročilá',
    description: 'Alternativní historie 1920+. Dobyjte území s obřími naftovými mechy a veďte svou frakci k prosperitě.'
  },
  { 
    id: '6', 
    title: 'Terraforming Mars', 
    genre: 'Strategie', 
    price: 0, 
    rating: 5, 
    image: '/games/terraforming-mars.jpg',
    players: '1–5 hráčů',
    playTime: '120 min',
    difficulty: 'Pokročilá',
    description: 'Zúrodněte Rudou planetu. Zvyšujte teplotu, hladinu kyslíku a budujte oceány za megakorporaci budoucnosti.'
  },
  { 
    id: '7', 
    title: 'Dune: Imperium', 
    genre: 'Strategie', 
    price: 0, 
    rating: 5, 
    image: '/games/dune-imperium.jpg',
    players: '1–4 hráči',
    playTime: '90–120 min',
    difficulty: 'Pokročilá',
    description: 'Boj o koření na písečné planetě Arrakis. Špičkový deckbuilding propojený s worker placementem a intrikami.'
  },

  // RPG, Dungeon Crawlers & Horor
  { 
    id: '11', 
    title: 'Dungeons & Dragons (D&D)', 
    genre: 'RPG', 
    price: 0, 
    rating: 5, 
    image: '/games/dnd.jpg',
    players: '3–6 hráčů',
    playTime: '180+ min',
    difficulty: 'Střední',
    description: 'Nejpopulárnější stolní RPG na světě. Ponořte se s přáteli a Pánem jeskyně do epického fantasy příběhu.'
  },
  { 
    id: '12', 
    title: 'Gloomhaven', 
    genre: 'RPG', 
    price: 0, 
    rating: 5, 
    image: '/games/gloomhaven.jpg',
    players: '1–4 hráči',
    playTime: '90–150 min',
    difficulty: 'Pro experty',
    description: 'Epická kooperativní kampaň v temném fantasy světě s taktickými souboji bez náhody kostek.'
  },
  { 
    id: '13', 
    title: 'Nemesis', 
    genre: 'Sci-Fi Horror', 
    price: 0, 
    rating: 5, 
    image: '/games/nemesis.jpg',
    players: '1–5 hráčů',
    playTime: '90–180 min',
    difficulty: 'Pokročilá',
    description: 'Vetřelci na vesmírné lodi. Bojujte o přežití, opravte motory a doufejte, že vás parťák nepodrazí.'
  },
  { 
    id: '14', 
    title: 'Zombicide', 
    genre: 'Kooperativní', 
    price: 0, 
    rating: 4, 
    image: '/games/zombicide.jpg',
    players: '1–6 hráčů',
    playTime: '60 min',
    difficulty: 'Střední',
    description: 'Akční řežba se zástupy zombie. Hledejte zbraně, zvyšujte si level a probojujte se zamořeným městem.'
  },

  // TCG & Wargaming
  { 
    id: '1', 
    title: 'Magic: The Gathering', 
    genre: 'TCG', 
    price: 0, 
    rating: 5, 
    image: '/games/magic-the-gathering.jpg',
    players: '2 hráči',
    playTime: '20–40 min',
    difficulty: 'Střední',
    description: 'Legendární sběratelská karetní hra. Souboje sférochodců s kouzly pěti barev many.'
  },
  { 
    id: '3', 
    title: 'Pokémon TCG', 
    genre: 'TCG', 
    price: 0, 
    rating: 5, 
    image: '/games/pokemon.jpg',
    players: '2 hráči',
    playTime: '20–30 min',
    difficulty: 'Lehká',
    description: 'Sbírejte a bojujte s oblíbenými Pokémony, trenérskými kartami a energiemi v dynamických zápasech.'
  },
  { 
    id: '2', 
    title: 'Warhammer 40k', 
    genre: 'Wargaming', 
    price: 0, 
    rating: 5, 
    image: '/games/warhammer-40k.jpg',
    players: '2 hráči',
    playTime: '120–180 min',
    difficulty: 'Pro experty',
    description: 'V temné budoucnosti 41. tisíciletí existuje jen válka. Bitvy detailních miniatur v gotických ruinách.'
  },
  { 
    id: '4', 
    title: 'Star Wars: Legion', 
    genre: 'Wargaming', 
    price: 0, 
    rating: 4, 
    image: '/games/star-wars-legion.jpg',
    players: '2 hráči',
    playTime: '90–120 min',
    difficulty: 'Pokročilá',
    description: 'Taktické pozemní střety v galaxii Star Wars na stole plném miniatur vojáků a techniky.'
  },

  // Párty hry
  { 
    id: '19', 
    title: 'Krycí Jména', 
    genre: 'Párty', 
    price: 0, 
    rating: 5, 
    image: '/games/codenames.jpg',
    players: '2–8 hráčů',
    playTime: '15–20 min',
    difficulty: 'Lehká',
    description: 'Světoznámá česká špionážní party hra od Vládi Chvátila. Hledejte agenty podle jednoslovných nápověd.'
  },
  { 
    id: '17', 
    title: 'Bang!', 
    genre: 'Párty', 
    price: 0, 
    rating: 4, 
    image: '/games/bang.jpg',
    players: '4–7 hráčů',
    playTime: '20–40 min',
    difficulty: 'Lehká',
    description: 'Divoký západ plný blafování. Odhalíte, kdo je šerif, bandita a kdo zrádný odpadlík?'
  },
  { 
    id: '16', 
    title: 'Dixit', 
    genre: 'Párty', 
    price: 0, 
    rating: 5, 
    image: '/games/dixit.jpg',
    players: '3–8 hráčů',
    playTime: '30 min',
    difficulty: 'Lehká',
    description: 'Kouzelná hra plná fantazie. Vymýšlejte nápovědy k snovým ilustracím a odhadujte karty spoluhráčů.'
  },
  { 
    id: '20', 
    title: 'Výbušná Koťátka', 
    genre: 'Párty', 
    price: 0, 
    rating: 4, 
    image: '/games/exploding-kittens.jpg',
    players: '2–5 hráčů',
    playTime: '15 min',
    difficulty: 'Lehká',
    description: 'Ruská ruleta v kočičím podání. Zneškodňujte vybuchující kočky laserovými ukazátky a sendviči.'
  },
  { 
    id: '23', 
    title: 'Dobble', 
    genre: 'Párty', 
    price: 0, 
    rating: 4, 
    image: '/games/dobble.jpg',
    players: '2–8 hráčů',
    playTime: '10–15 min',
    difficulty: 'Lehká',
    description: 'Bleskový postřeh a reflexy! Na libovolných dvou kruhových kartách je vždy přesně jeden shodný symbol.'
  },
];

// Initial Seed Data - Events
const INITIAL_EVENTS: CalendarEvent[] = [
  { id: '1', title: 'Friday Night Magic', date: '2026-11-14T18:00', description: 'Pravidelný turnaj ve formátu Standard a Commander. Promo karty pro účastníky.', type: 'tournament' },
  { id: '2', title: 'Pokémon Trade Day', date: '2026-11-16T14:00', description: 'Výměna karet pro děti i sběratele. Naučíme vás hrát!', type: 'party' },
  { id: '3', title: 'D&D: Noc v Bruntále', date: '2026-11-21T17:00', description: 'One-shot dobrodružství pro začátečníky. Postavy připraveny.', type: 'workshop' },
  { id: '4', title: 'Turnaj v Osadnících z Katanu', date: '2026-11-28T16:00', description: 'O titul Vládce Katanu a poukaz na konzumaci.', type: 'tournament' },
  { id: '5', title: 'Warhammer: Malování', date: '2026-12-05T17:00', description: 'Workshop barvení miniatur. Barvy a štětce k zapůjčení.', type: 'workshop' },
];

// Helper to get or set data
const getWithDefault = <T>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  return JSON.parse(stored);
};

export const DataService = {
  // Menu
  getMenu: (): MenuItem[] => getWithDefault<MenuItem[]>(KEYS.MENU, INITIAL_MENU),
  addMenuItem: (item: MenuItem) => {
    const items = DataService.getMenu();
    localStorage.setItem(KEYS.MENU, JSON.stringify([...items, item]));
  },
  deleteMenuItem: (id: string) => {
    const items = DataService.getMenu().filter(i => i.id !== id);
    localStorage.setItem(KEYS.MENU, JSON.stringify(items));
  },

  // Games
  getGames: (): GameItem[] => {
    const stored = localStorage.getItem(KEYS.GAMES);
    if (!stored) {
      localStorage.setItem(KEYS.GAMES, JSON.stringify(INITIAL_GAMES));
      return INITIAL_GAMES;
    }
    try {
      const parsed: GameItem[] = JSON.parse(stored);
      // Sync or upgrade images if old unadapted images were stored
      const updated = parsed.map(game => {
        const matchingInitial = INITIAL_GAMES.find(g => g.id === game.id || g.title.toLowerCase() === game.title.toLowerCase());
        if (matchingInitial && (!game.image || game.image.includes('unsplash'))) {
          return { ...matchingInitial, ...game, image: matchingInitial.image };
        }
        return game;
      });
      // Also ensure newly added games from INITIAL_GAMES are included
      const existingIds = new Set(updated.map(g => g.id));
      const missingGames = INITIAL_GAMES.filter(g => !existingIds.has(g.id));
      const finalGames = [...updated, ...missingGames];
      localStorage.setItem(KEYS.GAMES, JSON.stringify(finalGames));
      return finalGames;
    } catch {
      localStorage.setItem(KEYS.GAMES, JSON.stringify(INITIAL_GAMES));
      return INITIAL_GAMES;
    }
  },
  addGame: (item: GameItem) => {
    const items = DataService.getGames();
    localStorage.setItem(KEYS.GAMES, JSON.stringify([...items, item]));
  },
  deleteGame: (id: string) => {
    const items = DataService.getGames().filter(i => i.id !== id);
    localStorage.setItem(KEYS.GAMES, JSON.stringify(items));
  },

  // Events
  getEvents: (): CalendarEvent[] => getWithDefault<CalendarEvent[]>(KEYS.EVENTS, INITIAL_EVENTS),
  addEvent: (item: CalendarEvent) => {
    const items = DataService.getEvents();
    localStorage.setItem(KEYS.EVENTS, JSON.stringify([...items, item]));
    DataService.syncCSV();
  },
  deleteEvent: (id: string) => {
    const items = DataService.getEvents().filter(i => i.id !== id);
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(items));
    DataService.syncCSV();
  },

  // Bulk Save (NoSQL + CSV Dual Storage)
  saveMenu: (items: MenuItem[]) => {
    localStorage.setItem(KEYS.MENU, JSON.stringify(items));
    DataService.syncCSV();
  },
  saveGames: (items: GameItem[]) => {
    localStorage.setItem(KEYS.GAMES, JSON.stringify(items));
    DataService.syncCSV();
  },
  saveEvents: (items: CalendarEvent[]) => {
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(items));
    DataService.syncCSV();
  },
  saveAll: (menu: MenuItem[], games: GameItem[], events: CalendarEvent[]) => {
    localStorage.setItem(KEYS.MENU, JSON.stringify(menu));
    localStorage.setItem(KEYS.GAMES, JSON.stringify(games));
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
    localStorage.setItem('app_db_last_saved', new Date().toISOString());
    DataService.syncCSV();
  },

  // Dual Storage: CSV Database Generation & Synchronization
  syncCSV: () => {
    try {
      const menuCSV = DataService.menuToCSV(DataService.getMenu());
      const gamesCSV = DataService.gamesToCSV(DataService.getGames());
      const eventsCSV = DataService.eventsToCSV(DataService.getEvents());
      localStorage.setItem('app_csv_menu', menuCSV);
      localStorage.setItem('app_csv_games', gamesCSV);
      localStorage.setItem('app_csv_events', eventsCSV);
    } catch {
      // Storage error safeguard
    }
  },

  getCSV: (type: 'menu' | 'games' | 'events'): string => {
    if (type === 'menu') return DataService.menuToCSV(DataService.getMenu());
    if (type === 'games') return DataService.gamesToCSV(DataService.getGames());
    return DataService.eventsToCSV(DataService.getEvents());
  },

  menuToCSV: (items: MenuItem[]): string => {
    const headers = ['id', 'name', 'category', 'price', 'description', 'image'];
    const rows = items.map(i => [
      escapeCSVField(i.id),
      escapeCSVField(i.name),
      escapeCSVField(i.category),
      escapeCSVField(i.price),
      escapeCSVField(i.description),
      escapeCSVField(i.image || '')
    ].join(','));
    return [headers.join(','), ...rows].join('\n');
  },

  csvToMenu: (csv: string): MenuItem[] => {
    const lines = csv.trim().split('\n').filter(Boolean);
    if (lines.length <= 1) return [];
    return lines.slice(1).map(line => {
      const parts = parseCSVLine(line);
      return {
        id: parts[0] || Date.now().toString(),
        name: parts[1] || 'Položka',
        category: (parts[2] as any) || 'coffee',
        price: Number(parts[3]) || 0,
        description: parts[4] || '',
        image: parts[5] || ''
      };
    });
  },

  gamesToCSV: (items: GameItem[]): string => {
    const headers = ['id', 'title', 'genre', 'price', 'rating', 'players', 'playTime', 'difficulty', 'description', 'image'];
    const rows = items.map(g => [
      escapeCSVField(g.id),
      escapeCSVField(g.title),
      escapeCSVField(g.genre),
      escapeCSVField(g.price),
      escapeCSVField(g.rating),
      escapeCSVField(g.players || ''),
      escapeCSVField(g.playTime || ''),
      escapeCSVField(g.difficulty || ''),
      escapeCSVField(g.description || ''),
      escapeCSVField(g.image || '')
    ].join(','));
    return [headers.join(','), ...rows].join('\n');
  },

  csvToGames: (csv: string): GameItem[] => {
    const lines = csv.trim().split('\n').filter(Boolean);
    if (lines.length <= 1) return [];
    return lines.slice(1).map(line => {
      const parts = parseCSVLine(line);
      return {
        id: parts[0] || Date.now().toString(),
        title: parts[1] || 'Hra',
        genre: parts[2] || 'Rodinné',
        price: Number(parts[3]) || 0,
        rating: Number(parts[4]) || 5,
        players: parts[5] || '',
        playTime: parts[6] || '',
        difficulty: (parts[7] as any) || 'Lehká',
        description: parts[8] || '',
        image: parts[9] || ''
      };
    });
  },

  eventsToCSV: (items: CalendarEvent[]): string => {
    const headers = ['id', 'title', 'date', 'type', 'description'];
    const rows = items.map(e => [
      escapeCSVField(e.id),
      escapeCSVField(e.title),
      escapeCSVField(e.date),
      escapeCSVField(e.type),
      escapeCSVField(e.description)
    ].join(','));
    return [headers.join(','), ...rows].join('\n');
  },

  csvToEvents: (csv: string): CalendarEvent[] => {
    const lines = csv.trim().split('\n').filter(Boolean);
    if (lines.length <= 1) return [];
    return lines.slice(1).map(line => {
      const parts = parseCSVLine(line);
      return {
        id: parts[0] || Date.now().toString(),
        title: parts[1] || 'Akce',
        date: parts[2] || new Date().toISOString(),
        type: (parts[3] as any) || 'tournament',
        description: parts[4] || ''
      };
    });
  },

  // NoSQL Document Export & Import
  getNoSQLDump: (): string => {
    const data = {
      _database: 'salek_zabavy_nosql_document_store',
      _version: '2.0.0',
      _updatedAt: new Date().toISOString(),
      collections: {
        menu: DataService.getMenu(),
        games: DataService.getGames(),
        events: DataService.getEvents()
      }
    };
    return JSON.stringify(data, null, 2);
  },

  restoreNoSQLDump: (jsonText: string): boolean => {
    try {
      const data = JSON.parse(jsonText);
      if (data.collections) {
        if (Array.isArray(data.collections.menu)) DataService.saveMenu(data.collections.menu);
        if (Array.isArray(data.collections.games)) DataService.saveGames(data.collections.games);
        if (Array.isArray(data.collections.events)) DataService.saveEvents(data.collections.events);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  // Reset to original factory defaults
  resetToDefaults: () => {
    localStorage.removeItem(KEYS.MENU);
    localStorage.removeItem(KEYS.GAMES);
    localStorage.removeItem(KEYS.EVENTS);
    localStorage.removeItem('app_csv_menu');
    localStorage.removeItem('app_csv_games');
    localStorage.removeItem('app_csv_events');
  }
};

const escapeCSVField = (val: any): string => {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
};

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
};