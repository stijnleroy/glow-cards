/*
 * Glow Welcome Card
 * Een welkomstkaart zonder achtergrond voor bovenaan het dashboard: uur, datum,
 * begroeting, waar iedereen is, het weer, het eerstvolgende afval en de post.
 */

const GWC_I18N = {
  nl: {
    morning: 'Goeiemorgen', afternoon: 'Goeiemiddag', evening: 'Goeieavond', night: 'Goeienacht',
    today: 'Vandaag', tonight: 'Vanavond buiten', tomorrow: 'Morgen', in_days: 'Over {n} dagen',
    letter: '1 brief', letters: '{n} brieven', no_mail: 'Geen post', last: 'Laatst om {t}', reset: 'Op 0 zetten', close: 'Sluiten',
    l_name: 'Naam in de begroeting (optioneel)', l_persons: 'Personen (leeg = iedereen)', l_weather: 'Weer', l_waste: 'Afvalsensoren (leeg = automatisch, Afvalbeheer)',
    l_mail: 'Postteller', l_mail_reset: 'Reset-knop of script (alleen als de postteller geen counter of input_number is)', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    zone_home: 'Thuis', zone_away: 'Afwezig', c_zones: 'Kleuren per zone', c_waste: 'Kleuren per afvalsoort',
    description: 'Welkomstkaart zonder achtergrond: uur, begroeting, personen, weer, afval en post.',
  },
  en: {
    morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening', night: 'Good night',
    today: 'Today', tonight: 'Put out tonight', tomorrow: 'Tomorrow', in_days: 'In {n} days',
    letter: '1 letter', letters: '{n} letters', no_mail: 'No mail', last: 'Last at {t}', reset: 'Reset to 0', close: 'Close',
    l_name: 'Name in the greeting (optional)', l_persons: 'People (empty = everyone)', l_weather: 'Weather', l_waste: 'Waste sensors (empty = automatic, Afvalbeheer)',
    l_mail: 'Mail counter', l_mail_reset: 'Reset button or script (only if the mail counter is not a counter or input_number)', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    zone_home: 'Home', zone_away: 'Away', c_zones: 'Colours per zone', c_waste: 'Colours per waste type',
    description: 'Welcome card without a background: time, greeting, people, weather, waste and mail.',
  },
  fr: {
    morning: 'Bonjour', afternoon: 'Bon après-midi', evening: 'Bonsoir', night: 'Bonne nuit',
    today: 'Aujourd\'hui', tonight: 'À sortir ce soir', tomorrow: 'Demain', in_days: 'Dans {n} jours',
    letter: '1 lettre', letters: '{n} lettres', no_mail: 'Pas de courrier', last: 'Dernier à {t}', reset: 'Remettre à 0', close: 'Fermer',
    l_name: 'Nom dans la salutation (optionnel)', l_persons: 'Personnes (vide = tout le monde)', l_weather: 'Météo', l_waste: 'Capteurs de déchets (vide = automatique, Afvalbeheer)',
    l_mail: 'Compteur de courrier', l_mail_reset: 'Bouton ou script de remise à zéro (seulement si ce n\'est pas un counter ou input_number)', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    zone_home: 'Maison', zone_away: 'Absent', c_zones: 'Couleurs par zone', c_waste: 'Couleurs par type de déchet',
    description: 'Carte d\'accueil sans fond : heure, salutation, personnes, météo, déchets et courrier.',
  },
  de: {
    morning: 'Guten Morgen', afternoon: 'Guten Tag', evening: 'Guten Abend', night: 'Gute Nacht',
    today: 'Heute', tonight: 'Heute Abend raus', tomorrow: 'Morgen', in_days: 'In {n} Tagen',
    letter: '1 Brief', letters: '{n} Briefe', no_mail: 'Keine Post', last: 'Zuletzt um {t}', reset: 'Auf 0 setzen', close: 'Schließen',
    l_name: 'Name in der Begrüßung (optional)', l_persons: 'Personen (leer = alle)', l_weather: 'Wetter', l_waste: 'Müllsensoren (leer = automatisch, Afvalbeheer)',
    l_mail: 'Postzähler', l_mail_reset: 'Reset-Taste oder Skript (nur wenn der Postzähler kein counter oder input_number ist)', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    zone_home: 'Zuhause', zone_away: 'Abwesend', c_zones: 'Farben pro Zone', c_waste: 'Farben pro Müllart',
    description: 'Begrüßungskarte ohne Hintergrund: Uhrzeit, Begrüßung, Personen, Wetter, Müll und Post.',
  },
  es: {
    morning: 'Buenos días', afternoon: 'Buenas tardes', evening: 'Buenas tardes', night: 'Buenas noches',
    today: 'Hoy', tonight: 'Sacar esta noche', tomorrow: 'Mañana', in_days: 'En {n} días',
    letter: '1 carta', letters: '{n} cartas', no_mail: 'Sin correo', last: 'Última a las {t}', reset: 'Poner a 0', close: 'Cerrar',
    l_name: 'Nombre en el saludo (opcional)', l_persons: 'Personas (vacío = todos)', l_weather: 'Tiempo', l_waste: 'Sensores de basura (vacío = automático, Afvalbeheer)',
    l_mail: 'Contador de correo', l_mail_reset: 'Botón o script para reiniciar (solo si no es un counter o input_number)', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    zone_home: 'Casa', zone_away: 'Fuera', c_zones: 'Colores por zona', c_waste: 'Colores por tipo de basura',
    description: 'Tarjeta de bienvenida sin fondo: hora, saludo, personas, tiempo, basura y correo.',
  },
  it: {
    morning: 'Buongiorno', afternoon: 'Buon pomeriggio', evening: 'Buonasera', night: 'Buonanotte',
    today: 'Oggi', tonight: 'Fuori stasera', tomorrow: 'Domani', in_days: 'Tra {n} giorni',
    letter: '1 lettera', letters: '{n} lettere', no_mail: 'Nessuna posta', last: 'Ultima alle {t}', reset: 'Azzera', close: 'Chiudi',
    l_name: 'Nome nel saluto (opzionale)', l_persons: 'Persone (vuoto = tutti)', l_weather: 'Meteo', l_waste: 'Sensori rifiuti (vuoto = automatico, Afvalbeheer)',
    l_mail: 'Contatore posta', l_mail_reset: 'Pulsante o script di azzeramento (solo se non è un counter o input_number)', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    zone_home: 'Casa', zone_away: 'Fuori', c_zones: 'Colori per zona', c_waste: 'Colori per tipo di rifiuto',
    description: 'Scheda di benvenuto senza sfondo: ora, saluto, persone, meteo, rifiuti e posta.',
  },
};
const GWC_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };

function gwcLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GWC_I18N[l] ? l : 'en';
}
function gwcT(lang, key, vars) {
  let s = (GWC_I18N[lang] && GWC_I18N[lang][key]) || GWC_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gwcEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const GWC_HOME = '143, 227, 184';
const GWC_AWAY = '201, 196, 221';
const GWC_ZONE_HINTS = [
  { re: /werk|work|kantoor|office|job|bureau/i, c: '142, 197, 255' },
  { re: /school|college|campus|univ|hogeschool|crèche|creche|kinderopvang/i, c: '255, 224, 138' },
  { re: /sport|gym|fitness|zwem|club|voetbal/i, c: '255, 184, 153' },
  { re: /oma|opa|ouders|familie|family|grandma|grandpa|parents/i, c: '255, 159, 191' },
];
// standaardkleuren voor de overige zones, in volgorde van de zones
const GWC_ZONE_PALETTE = ['185, 168, 255', '142, 227, 214', '255, 184, 153', '255, 224, 138'];

// '#8EC5FF', [142, 197, 255] of '142, 197, 255' → '142, 197, 255'
function gwcRgb(v) {
  if (Array.isArray(v) && v.length >= 3) return v.slice(0, 3).map((x) => Math.round(+x || 0)).join(', ');
  const str = String(v || '').trim();
  if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(str)) return str.split(',').map((x) => x.trim()).join(', ');
  let h = str.replace('#', '');
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const n = parseInt(h.slice(0, 6), 16);
  return h.length >= 6 && !isNaN(n) ? ((n >> 16) & 255) + ', ' + ((n >> 8) & 255) + ', ' + (n & 255) : null;
}
// opzoeken in een kleurenlijst, ongeacht hoofdletters
function gwcLookup(map, ...keys) {
  if (!map || typeof map !== 'object') return null;
  const low = {};
  Object.keys(map).forEach((k) => { low[String(k).toLowerCase()] = map[k]; });
  for (const k of keys) {
    if (k === undefined || k === null) continue;
    const v = low[String(k).toLowerCase()];
    const c = v !== undefined ? gwcRgb(v) : null;
    if (c) return c;
  }
  return null;
}
const GWC_MAIL = '255, 159, 191';

// afvalsoorten herkennen aan de naam van de sensor
const GWC_WASTE = [
  { re: /pmd|plastic|pbd/i, label: 'PMD', c: '142, 197, 255' },
  { re: /gft|groente|bio|organic/i, label: 'GFT', c: '143, 227, 184' },
  { re: /groen|tuin|garden|snoei/i, label: null, c: '143, 227, 184' },
  { re: /papier|karton|paper/i, label: null, c: '255, 224, 138' },
  { re: /glas|glass/i, label: null, c: '142, 227, 214' },
  { re: /textiel|textile/i, label: null, c: '255, 159, 191' },
  { re: /rest|grijs|grey|gray/i, label: null, c: '201, 196, 221' },
];

const GWC_SVG = (body, w = 2.2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
const GWC_ICONS = {
  sun: GWC_SVG('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  moon: GWC_SVG('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>'),
  partly: GWC_SVG('<path d="M8 3.5v1.2M3.5 8h1.2M4.8 4.8l.9.9M11.2 4.8l-.9.9"/><path d="M5.3 10.4A3.2 3.2 0 0 1 10.6 7"/><path d="M9 20h8a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.5 1.3A2.9 2.9 0 0 0 9 20z"/>'),
  cloud: GWC_SVG('<path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4 1.6A3.3 3.3 0 0 0 7 18z"/>'),
  rain: GWC_SVG('<path d="M7 15h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4 1.6A3.3 3.3 0 0 0 7 15z"/><path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3"/>'),
  storm: GWC_SVG('<path d="M7 15h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4 1.6A3.3 3.3 0 0 0 7 15z"/><path d="M13 15l-2 3.5h3L12 22"/>'),
  snow: GWC_SVG('<path d="M7 15h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4 1.6A3.3 3.3 0 0 0 7 15z"/><path d="M9 19h.01M13 19h.01M17 19h.01M11 22h.01M15 22h.01"/>'),
  fog: GWC_SVG('<path d="M4 9h16M3 13h18M5 17h14"/>'),
  wind: GWC_SVG('<path d="M3 9h11a3 3 0 1 0-3-3"/><path d="M3 15h15a3 3 0 1 1-3 3"/>'),
};
const GWC_WEATHER = {
  'clear-night': ['moon', '185, 168, 255'], sunny: ['sun', '255, 224, 138'], partlycloudy: ['partly', '255, 224, 138'],
  cloudy: ['cloud', '201, 196, 221'], fog: ['fog', '201, 196, 221'], windy: ['wind', '201, 196, 221'], 'windy-variant': ['wind', '201, 196, 221'],
  rainy: ['rain', '142, 197, 255'], pouring: ['rain', '142, 197, 255'], lightning: ['storm', '185, 168, 255'], 'lightning-rainy': ['storm', '185, 168, 255'],
  snowy: ['snow', '207, 227, 255'], 'snowy-rainy': ['snow', '207, 227, 255'], hail: ['snow', '207, 227, 255'], exceptional: ['cloud', '201, 196, 221'],
};
const GWC_BIN = GWC_SVG('<path d="M4 7h16"/><path d="M10 3h4l1 4H9z"/><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/><path d="M10 11v6"/><path d="M14 11v6"/>');
const GWC_ENVELOPE = GWC_SVG('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 8l9 6 9-6"/>', 2.4);

const GWC_INK = (v) => `color-mix(in srgb, rgb(var(${v})), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%))`;

const GWC_STYLE = `
  :host { display: block; }
  ha-card {
    display: block; background: none !important; border: none !important; box-shadow: none !important;
    backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
    color: var(--glow-text, var(--primary-text-color, #F3F1FA)); padding: 4px 4px 6px; container-type: inline-size;
  }
  .wrap { display: flex; align-items: center; gap: 20px; }
  .left { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
  .top { display: flex; align-items: center; gap: 18px; min-width: 0; }
  .clock { font-size: 64px; font-weight: 800; line-height: 1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; flex-shrink: 0; }
  .hello { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .greet { font-size: 22px; font-weight: 800; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .date { font-size: 15px; font-weight: 700; opacity: 0.65; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .row { display: flex; gap: 8px; flex-wrap: wrap; }
  .row:empty { display: none; }
  .pill { display: flex; align-items: center; gap: 7px; height: 32px; padding: 0 12px 0 10px; border-radius: 16px; box-sizing: border-box; font: inherit; color: inherit; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid transparent; white-space: nowrap; }
  .pill .dot { width: 10px; height: 10px; border-radius: 5px; flex-shrink: 0; box-sizing: border-box; border: 2px solid rgba(var(--c), 0.7); }
  .pill .n { font-size: 14px; font-weight: 800; }
  .pill .w { font-size: 13px; font-weight: 700; opacity: 0.65; }
  .pill.home { background: rgba(var(--c), 0.14); border-color: rgba(var(--c), 0.45); }
  .pill.home .dot { border: 0; background: rgb(var(--c)); box-shadow: 0 0 calc(var(--glow) * 0.6) rgba(var(--c), 0.9); }
  .pill.home .w, .pill.zone .w { opacity: 1; color: ${GWC_INK('--c')}; }
  .pill.zone .dot { border: 0; background: rgb(var(--c)); }
  .mail { cursor: pointer; font-size: 14px; font-weight: 800; color: ${GWC_INK('--c')}; background: rgba(var(--c), 0.16); border-color: rgba(var(--c), 0.55); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); -webkit-tap-highlight-color: transparent; }
  .mail svg { width: 16px; height: 16px; }
  .mail:active { transform: scale(0.97); }
  .right { display: flex; flex-direction: column; align-items: stretch; gap: 8px; flex-shrink: 0; }
  .right:empty { display: none; }
  .wx { display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px 0 10px; border-radius: 18px; box-sizing: border-box; background: var(--glow-surface, rgba(255,255,255,0.07)); cursor: pointer; }
  .wx svg { width: 22px; height: 22px; color: ${GWC_INK('--c')}; flex-shrink: 0; }
  .wx .t { font-size: 20px; font-weight: 800; font-variant-numeric: tabular-nums; }
  .wx .l { font-size: 13px; font-weight: 700; opacity: 0.65; white-space: nowrap; }
  .bin { display: flex; align-items: center; gap: 10px; height: 58px; padding: 0 16px 0 9px; border-radius: 20px; box-sizing: border-box; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid transparent; cursor: pointer; }
  .bin .ic { width: 40px; height: 40px; border-radius: 20px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .bin .ic svg { width: 20px; height: 20px; }
  .bin .tx { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .bin .when { font-size: 12px; font-weight: 800; letter-spacing: 0.04em; opacity: 0.65; white-space: nowrap; }
  .bin .what { font-size: 17px; font-weight: 800; white-space: nowrap; }
  .bin.hot { background: rgba(var(--c), 0.14); border-color: rgba(var(--c), 0.5); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.3); }
  .bin.hot .ic { background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(var(--c), 0.8); }
  .bin.hot .when { opacity: 1; color: ${GWC_INK('--c')}; }
  @container (max-width: 560px) {
    .wrap { flex-direction: column; align-items: stretch; gap: 12px; }
    .right { flex-direction: row; flex-wrap: wrap; }
    .clock { font-size: 52px; }
  }
`;

const GWC_POP_STYLE = `
  :host { all: initial; }
  .backdrop {
    position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box;
    background: rgba(8, 6, 16, 0.55); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    font-family: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif); animation: gwc-fade 0.2s ease-out;
  }
  .panel {
    width: 100%; max-width: 460px; box-sizing: border-box; display: flex; align-items: center; gap: 16px; padding: 20px; border-radius: 28px;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.5); box-shadow: 0 0 40px rgba(var(--c), 0.25), 0 20px 50px rgba(0, 0, 0, 0.4);
    animation: gwc-pop 0.25s cubic-bezier(.2, .9, .3, 1.2);
  }
  .big { width: 60px; height: 60px; border-radius: 30px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.8); }
  .big svg { width: 30px; height: 30px; }
  .tx { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .count { font-size: 30px; font-weight: 800; line-height: 1.05; }
  .sub { font-size: 14px; font-weight: 700; opacity: 0.65; }
  button { font: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .reset { height: 48px; padding: 0 18px; border-radius: 24px; flex-shrink: 0; font-size: 15px; font-weight: 800; color: inherit; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.12)); }
  .reset:active { background: rgba(var(--c), 0.3); }
  @media (max-width: 420px) { .panel { flex-wrap: wrap; } .reset { width: 100%; } }
  @keyframes gwc-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes gwc-pop { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: none; } }
`;
const GWC_THEME_VARS = ['--glow-card-background', '--glow-text', '--glow-surface', '--glow-border', '--glow-ink-amount', '--paper-font-body1_-_font-family'];

class GlowWelcomeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._built = false;
  }

  static getConfigElement() { return document.createElement('glow-welcome-card-editor'); }

  static getStubConfig(hass) {
    const ids = Object.keys((hass && hass.states) || {});
    const cfg = {};
    const w = ids.find((e) => e.startsWith('weather.'));
    if (w) cfg.weather = w;
    const m = ids.find((e) => /^(counter|input_number|sensor)\..*(post|mail|brief|letter)/i.test(e));
    if (m) cfg.mail = m;
    return cfg;
  }

  setConfig(config) {
    this._config = { glow: 15, ...(config || {}) };
    this._built = false;
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._config) this._render();
    if (this._pop) this._updatePopup();
  }
  get hass() { return this._hass; }

  getCardSize() { return 2; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }

  connectedCallback() {
    // elke minuut het uur bijwerken, net na de minuutwissel
    const tick = () => {
      this._renderClock();
      this._timer = setTimeout(tick, 60000 - (Date.now() % 60000) + 200);
    };
    clearTimeout(this._timer);
    this._timer = setTimeout(tick, 60000 - (Date.now() % 60000) + 200);
  }

  disconnectedCallback() {
    clearTimeout(this._timer);
    this._closePopup();
  }

  _lang() { return gwcLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gwcT(this._lang(), k, v); }
  _locale() {
    const l = (this._hass && this._hass.locale && this._hass.locale.language) || this._lang();
    return l;
  }

  _fmtState(s) {
    try { if (this._hass.formatEntityState) return this._hass.formatEntityState(s); } catch (e) { /* oudere HA */ }
    return s.state;
  }

  /* ---- gegevens ---- */

  _persons() {
    const st = this._hass.states;
    const list = Array.isArray(this._config.persons) && this._config.persons.length
      ? this._config.persons
      : Object.keys(st).filter((e) => e.startsWith('person.')).sort((a, b) => (st[a].attributes.friendly_name || a).localeCompare(st[b].attributes.friendly_name || b));
    return list.filter((e) => st[e]);
  }

  // alle zones: thuis, afwezig en de andere zones uit Home Assistant
  _zones() {
    const st = this._hass.states;
    const others = Object.keys(st).filter((e) => e.startsWith('zone.') && e !== 'zone.home').sort()
      .map((e) => ({ key: st[e].attributes.friendly_name || e.split('.')[1], id: e }));
    return [{ key: 'home', id: 'zone.home' }, { key: 'not_home', id: null }].concat(others);
  }

  _zoneColor(state) {
    const zones = this._zones();
    const z = zones.find((x) => x.key === state || (x.key && String(x.key).toLowerCase() === String(state).toLowerCase()));
    const own = gwcLookup(this._config.zone_colors, state, z && z.id, z && z.id && z.id.split('.')[1]);
    if (own) return own;
    if (state === 'home') return GWC_HOME;
    if (!z || state === 'not_home') return GWC_AWAY;
    // bekende zonenamen krijgen een vaste kleur, de rest om beurten uit het palet
    const hint = GWC_ZONE_HINTS.find((h) => h.re.test(z.key + ' ' + (z.id || '')));
    if (hint) return hint.c;
    const i = zones.filter((x) => x.id && x.id !== 'zone.home' && !GWC_ZONE_HINTS.some((h) => h.re.test(x.key + ' ' + x.id))).indexOf(z);
    return GWC_ZONE_PALETTE[i % GWC_ZONE_PALETTE.length];
  }

  _weather() {
    const st = this._hass.states;
    const id = this._config.weather || Object.keys(st).find((e) => e.startsWith('weather.'));
    return id && st[id] ? st[id] : null;
  }

  // dagen tot de ophaling: eerst uit sort_date (JJJJMMDD), anders days_until
  _daysUntil(s) {
    const a = s.attributes;
    const sd = a.sort_date ?? a.Sort_date;
    if (sd && /^\d{8}$/.test(String(sd))) {
      const d = new Date(+String(sd).slice(0, 4), +String(sd).slice(4, 6) - 1, +String(sd).slice(6, 8));
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return { days: Math.round((d - today) / 86400000), date: d };
    }
    const du = a.days_until ?? a.Days_until;
    if (du !== undefined && du !== null && du !== '' && !isNaN(+du)) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + +du);
      return { days: +du, date: d };
    }
    return null;
  }

  _wasteSensors() {
    const st = this._hass.states;
    if (Array.isArray(this._config.waste) && this._config.waste.length) return this._config.waste.filter((e) => st[e]);
    return Object.keys(st).filter((e) => {
      if (!e.startsWith('sensor.')) return false;
      const a = st[e].attributes;
      return (a.days_until ?? a.Days_until ?? a.sort_date ?? a.Sort_date) !== undefined;
    });
  }

  _wasteType(id) {
    const s = this._hass.states[id];
    const name = (s.attributes.friendly_name || id.split('.')[1]).trim();
    const hay = id + ' ' + name;
    const hit = GWC_WASTE.find((w) => w.re.test(hay));
    // de naam van de ophaler vooraan weglaten ("Ilva Papier" → "Papier")
    let label = name;
    if (hit && hit.label) label = hit.label;
    else if (hit) {
      const m = name.match(new RegExp('(' + hit.re.source + ')[\\w\\s-]*$', 'i'));
      label = m ? m[0] : name;
    }
    label = label.charAt(0).toUpperCase() + label.slice(1);
    const own = gwcLookup(this._config.waste_colors, label, id, id.split('.')[1]);
    return { label, c: own || (hit ? hit.c : '201, 196, 221') };
  }

  _nextWaste() {
    let best = null;
    this._wasteSensors().forEach((id) => {
      const s = this._hass.states[id];
      const d = s && this._daysUntil(s);
      if (!d || d.days < 0) return;
      const type = this._wasteType(id);
      if (!best || d.days < best.days) best = { days: d.days, date: d.date, types: [type], ids: [id] };
      else if (d.days === best.days && !best.types.some((t) => t.label === type.label)) { best.types.push(type); best.ids.push(id); }
    });
    return best;
  }

  _mail() {
    const id = this._config.mail;
    const s = id && this._hass.states[id];
    if (!s) return null;
    const n = parseInt(s.state, 10);
    return { id, s, n: isNaN(n) ? 0 : n };
  }

  _mailLabel(n) { return n === 0 ? this._t('no_mail') : n === 1 ? this._t('letter') : this._t('letters', { n }); }

  /* ---- tekenen ---- */

  _build() {
    this.shadowRoot.innerHTML = `
      <style>${GWC_STYLE}</style>
      <ha-card>
        <div class="wrap">
          <div class="left">
            <div class="top">
              <span class="clock"></span>
              <div class="hello"><span class="greet"></span><span class="date"></span></div>
            </div>
            <div class="row"></div>
          </div>
          <div class="right"></div>
        </div>
      </ha-card>`;
    this._card = this.shadowRoot.querySelector('ha-card');
    this._row = this.shadowRoot.querySelector('.row');
    this._right = this.shadowRoot.querySelector('.right');
    this._row.addEventListener('click', (e) => {
      if (e.target.closest('.mail')) { this._openPopup(); return; }
      const p = e.target.closest('.pill[data-e]');
      if (p) this._moreInfo(p.dataset.e);
    });
    this._right.addEventListener('click', (e) => {
      const el = e.target.closest('[data-e]');
      if (el) this._moreInfo(el.dataset.e);
    });
    this._built = true;
    this._html = {};
  }

  _moreInfo(entity) {
    if (!entity) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: entity }, bubbles: true, composed: true }));
  }

  _renderClock() {
    if (!this._built || !this._hass) return;
    const now = new Date();
    const loc = this._locale();
    const h = now.getHours();
    let time;
    try { time = now.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' }); } catch (e) { time = String(h).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0'); }
    let date;
    try { date = now.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' }); } catch (e) { date = now.toDateString(); }
    const key = h >= 5 && h < 12 ? 'morning' : h >= 12 && h < 18 ? 'afternoon' : h >= 18 && h < 23 ? 'evening' : 'night';
    const name = this._config.name ? ', ' + this._config.name : '';
    this.shadowRoot.querySelector('.clock').textContent = time;
    this.shadowRoot.querySelector('.greet').textContent = this._t(key) + name;
    this.shadowRoot.querySelector('.date').textContent = date.charAt(0).toUpperCase() + date.slice(1);
  }

  _set(el, key, html) {
    if (this._html[key] === html) return;
    this._html[key] = html;
    el.innerHTML = html;
  }

  _render() {
    if (!this._built) this._build();
    this._card.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');
    this._renderClock();
    const st = this._hass.states;

    // personen en post
    let row = this._persons().map((e) => {
      const s = st[e];
      const home = s.state === 'home';
      const known = s.state !== 'not_home' && s.state !== 'unknown' && s.state !== 'unavailable';
      const c = this._zoneColor(s.state);
      const name = s.attributes.friendly_name || e;
      const where = s.state === 'unknown' || s.state === 'unavailable' ? '–' : this._fmtState(s);
      return `<div class="pill${home ? ' home' : known ? ' zone' : ''}" data-e="${gwcEsc(e)}" style="--c:${c}"><span class="dot"></span><span class="n">${gwcEsc(name)}</span><span class="w">${gwcEsc(where)}</span></div>`;
    }).join('');
    const mail = this._mail();
    if (mail && mail.n > 0) {
      row += `<button class="pill mail" type="button" style="--c:${GWC_MAIL}">${GWC_ENVELOPE}<span>${gwcEsc(this._mailLabel(mail.n))}</span></button>`;
    }
    this._set(this._row, 'row', row);

    // weer en afval
    let right = '';
    const w = this._weather();
    if (w) {
      const [icon, c] = GWC_WEATHER[w.state] || ['cloud', '201, 196, 221'];
      const sunUp = !st['sun.sun'] || st['sun.sun'].state === 'above_horizon';
      const ic = icon === 'sun' && !sunUp ? 'moon' : icon;
      const temp = typeof w.attributes.temperature === 'number' ? Math.round(w.attributes.temperature) + '°' : '';
      right += `<div class="wx" data-e="${gwcEsc(w.entity_id)}" style="--c:${ic === 'moon' ? '185, 168, 255' : c}">${GWC_ICONS[ic]}<span class="t">${temp}</span><span class="l">${gwcEsc(this._fmtState(w))}</span></div>`;
    }
    const nw = this._nextWaste();
    if (nw) {
      let when;
      if (nw.days === 0) when = this._t('today');
      else if (nw.days === 1) when = new Date().getHours() >= 12 ? this._t('tonight') : this._t('tomorrow');
      else if (nw.days < 7) {
        try { when = nw.date.toLocaleDateString(this._locale(), { weekday: 'long' }); } catch (e) { when = this._t('in_days', { n: nw.days }); }
        when = when.charAt(0).toUpperCase() + when.slice(1);
      } else when = this._t('in_days', { n: nw.days });
      const hot = nw.days <= 1;
      right += `<div class="bin${hot ? ' hot' : ''}" data-e="${gwcEsc(nw.ids[0])}" style="--c:${nw.types[0].c}"><div class="ic">${GWC_BIN}</div><div class="tx"><span class="when">${gwcEsc(when)}</span><span class="what">${gwcEsc(nw.types.map((t) => t.label).join(' + '))}</span></div></div>`;
    }
    this._set(this._right, 'right', right);
  }

  /* ---- postpopup ---- */

  _openPopup() {
    if (this._pop) return;
    const host = document.createElement('div');
    host.className = 'glow-welcome-popup';
    const root = host.attachShadow({ mode: 'open' });
    const cs = getComputedStyle(this);
    GWC_THEME_VARS.forEach((v) => { const val = cs.getPropertyValue(v); if (val) host.style.setProperty(v, val.trim()); });
    host.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');
    host.style.setProperty('--c', GWC_MAIL);
    root.innerHTML = `
      <style>${GWC_POP_STYLE}</style>
      <div class="backdrop">
        <div class="panel" role="dialog" aria-modal="true">
          <div class="big">${GWC_ENVELOPE}</div>
          <div class="tx"><span class="count"></span><span class="sub"></span></div>
          <button class="reset" type="button">${gwcEsc(this._t('reset'))}</button>
        </div>
      </div>`;
    document.body.appendChild(host);
    this._pop = host;
    root.querySelector('.backdrop').addEventListener('pointerdown', (e) => { if (e.target.classList.contains('backdrop')) this._closePopup(); });
    root.querySelector('.reset').addEventListener('click', () => { this._resetMail(); this._closePopup(); });
    this._onKey = (e) => { if (e.key === 'Escape') this._closePopup(); };
    document.addEventListener('keydown', this._onKey);
    this._autoTimer = setTimeout(() => this._closePopup(), 30000);
    this._updatePopup();
  }

  _updatePopup() {
    const root = this._pop && this._pop.shadowRoot;
    const mail = this._mail();
    if (!root || !mail) return;
    root.querySelector('.count').textContent = this._mailLabel(mail.n);
    let t = '';
    try { t = new Date(mail.s.last_changed).toLocaleTimeString(this._locale(), { hour: '2-digit', minute: '2-digit' }); } catch (e) { /* ignore */ }
    root.querySelector('.sub').textContent = mail.n > 0 && t ? this._t('last', { t }) : '';
  }

  _closePopup() {
    clearTimeout(this._autoTimer);
    if (this._onKey) document.removeEventListener('keydown', this._onKey);
    if (this._pop) this._pop.remove();
    this._pop = null;
  }

  _resetMail() {
    const mail = this._mail();
    if (!mail) return;
    const domain = mail.id.split('.')[0];
    const r = this._config.mail_reset;
    if (r) {
      const d = r.split('.')[0];
      if (d === 'script') this._hass.callService('script', 'turn_on', { entity_id: r });
      else if (d === 'button' || d === 'input_button') this._hass.callService(d, 'press', { entity_id: r });
      else if (d === 'automation') this._hass.callService('automation', 'trigger', { entity_id: r });
      else if (d === 'counter') this._hass.callService('counter', 'reset', { entity_id: r });
    } else if (domain === 'counter') this._hass.callService('counter', 'reset', { entity_id: mail.id });
    else if (domain === 'input_number') this._hass.callService('input_number', 'set_value', { entity_id: mail.id, value: 0 });
  }
}

/* ---------------- editor ---------------- */

class GlowWelcomeCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    this._render();
  }
  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first || !this._form) this._render();
    else this._form.hass = hass;
  }

  // dezelfde logica als de kaart, om de zones en afvalsoorten te vinden
  _probe() {
    const p = Object.create(GlowWelcomeCard.prototype);
    p._hass = this._hass;
    p._config = this._config;
    return p;
  }

  _colorFields() {
    const p = this._probe();
    const zones = p._zones().map((z) => ({ key: z.key, color: p._zoneColor(z.key) }));
    const seen = new Set();
    const waste = [];
    p._wasteSensors().forEach((id) => {
      const w = p._wasteType(id);
      if (seen.has(w.label)) return;
      seen.add(w.label);
      waste.push({ key: w.label, color: w.c });
    });
    return { zones, waste };
  }

  _render() {
    if (!this._config || !this._hass) return;
    const lang = gwcLang(this._hass, this._config.language);
    const t = (k) => gwcT(lang, k);
    const cf = this._colorFields();
    this._cf = cf;
    const zoneLabel = (k) => (k === 'home' ? t('zone_home') : k === 'not_home' ? t('zone_away') : k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.addEventListener('value-changed', (e) => this._changed(e.detail.value));
      this.appendChild(this._form);
    }
    this._form.computeLabel = (s) => {
      if (s.name.startsWith('zc_')) return zoneLabel(this._cf.zones[+s.name.slice(3)].key);
      if (s.name.startsWith('wc_')) return this._cf.waste[+s.name.slice(3)].key;
      return gwcT(lang, 'l_' + s.name);
    };
    this._form.hass = this._hass;
    const rgb = (c) => c.split(',').map((x) => +x.trim());
    const colorGrid = (list, pre) => ({ type: 'grid', name: '', schema: list.map((z, i) => ({ name: pre + i, selector: { color_rgb: {} } })) });
    const schema = [
      { name: 'name', selector: { text: {} } },
      { name: 'persons', selector: { entity: { domain: 'person', multiple: true } } },
      { name: 'weather', selector: { entity: { domain: 'weather' } } },
      { name: 'waste', selector: { entity: { domain: 'sensor', multiple: true } } },
      { name: 'mail', selector: { entity: { domain: ['counter', 'input_number', 'sensor'] } } },
      { name: 'mail_reset', selector: { entity: { domain: ['button', 'input_button', 'script', 'automation', 'counter'] } } },
      { type: 'expandable', name: '', flatten: true, title: t('c_zones'), schema: [colorGrid(cf.zones, 'zc_')] },
    ];
    if (cf.waste.length) schema.push({ type: 'expandable', name: '', flatten: true, title: t('c_waste'), schema: [colorGrid(cf.waste, 'wc_')] });
    schema.push(
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GWC_LANG_NAMES).map((k) => ({ value: k, label: GWC_LANG_NAMES[k] }))) } } },
    );
    this._form.schema = schema;
    const data = { glow: 15, language: 'auto', ...this._config };
    cf.zones.forEach((z, i) => { data['zc_' + i] = rgb(z.color); });
    cf.waste.forEach((w, i) => { data['wc_' + i] = rgb(w.color); });
    this._form.data = data;
  }

  _changed(value) {
    const v = { ...value };
    const hex = (a) => '#' + a.slice(0, 3).map((x) => Math.round(+x).toString(16).padStart(2, '0')).join('').toUpperCase();
    const same = (a, c) => Array.isArray(a) && a.slice(0, 3).join(', ') === c;
    // gewijzigde kleuren bewaren als zone_colors / waste_colors
    const collect = (pre, list, prop) => {
      const map = { ...(this._config[prop] || {}) };
      list.forEach((item, i) => {
        const val = v[pre + i];
        delete v[pre + i];
        if (Array.isArray(val) && !same(val, item.color)) map[item.key] = hex(val);
      });
      if (Object.keys(map).length) v[prop] = map; else delete v[prop];
    };
    collect('zc_', this._cf.zones, 'zone_colors');
    collect('wc_', this._cf.waste, 'waste_colors');
    Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length)) delete v[k]; });
    if (v.language === 'auto') delete v.language;
    this._config = { type: this._config.type, ...v };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('glow-welcome-card')) customElements.define('glow-welcome-card', GlowWelcomeCard);
if (!customElements.get('glow-welcome-card-editor')) customElements.define('glow-welcome-card-editor', GlowWelcomeCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-welcome-card')) {
  window.customCards.push({
    type: 'glow-welcome-card',
    name: 'Glow Welcome Card',
    description: gwcT(gwcLang(null), 'description'),
    preview: true,
    documentationURL: 'https://github.com/stijnleroy/glow-cards',
  });
}
