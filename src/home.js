/*
 * Glow Home Card
 * Het hele huis op één gsm-scherm: begroeting en weer, wie waar is, post en afval,
 * een raster met wat er nu speelt, kamers als lichtbollen, scènes, snelknoppen en een energiebalk.
 */

const GHM_I18N = {
  nl: {
    morning: 'Goeiemorgen', afternoon: 'Goeiemiddag', evening: 'Goeieavond', night: 'Goeienacht',
    now: 'Nu in huis', rooms: 'Kamers', scenes: 'Scènes', n_on: '{n} aan', off: 'uit',
    letters: '{n} brieven', letter: '1 brief', in_box: 'in de bus', today: 'vandaag', tonight: 'vanavond buiten', tomorrow: 'morgen',
    a_disarmed: 'Alarm uit', a_home: 'Alarm thuis', a_night: 'Alarm nacht', a_away: 'Alarm weg', a_trig: 'ALARM', a_pending: 'Alarm…',
    calm: 'alles rustig', armed: 'ingeschakeld', heating: 'verwarmt', now_t: 'nu {t}', lights: '{n} lampen', light1: '1 lamp', all_off: 'Alles uit', on: 'aan',
    open: 'open', n_open: '{n} open', batteries: '{n} batterijen', battery1: '1 batterij', replace: 'aandacht', playing: 'speelt',
    tap_again: 'Tik nog eens', closed: 'Dicht', opened: 'Open', is_on: 'Aan', is_off: 'Uit', home: 'thuis', away: 'weg',
    solar: 'zon', house: 'huis', charging: 'laadt', discharging: 'levert', idle: 'rust', export: 'teruglevering', import: 'van het net',
    description: 'Het hele huis op één gsm-scherm: kamers als lichtbollen, wat er nu speelt, scènes en energie.',
  },
  en: {
    morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening', night: 'Good night',
    now: 'Right now', rooms: 'Rooms', scenes: 'Scenes', n_on: '{n} on', off: 'off',
    letters: '{n} letters', letter: '1 letter', in_box: 'in the box', today: 'today', tonight: 'put out tonight', tomorrow: 'tomorrow',
    a_disarmed: 'Alarm off', a_home: 'Alarm home', a_night: 'Alarm night', a_away: 'Alarm away', a_trig: 'ALARM', a_pending: 'Alarm…',
    calm: 'all quiet', armed: 'armed', heating: 'heating', now_t: 'now {t}', lights: '{n} lights', light1: '1 light', all_off: 'All off', on: 'on',
    open: 'open', n_open: '{n} open', batteries: '{n} batteries', battery1: '1 battery', replace: 'attention', playing: 'playing',
    tap_again: 'Tap again', closed: 'Closed', opened: 'Open', is_on: 'On', is_off: 'Off', home: 'home', away: 'away',
    solar: 'solar', house: 'home', charging: 'charging', discharging: 'supplying', idle: 'idle', export: 'exporting', import: 'from grid',
    description: 'The whole house on one phone screen: rooms as glowing orbs, what is going on, scenes and energy.',
  },
  fr: {
    morning: 'Bonjour', afternoon: 'Bon après-midi', evening: 'Bonsoir', night: 'Bonne nuit',
    now: 'En ce moment', rooms: 'Pièces', scenes: 'Scènes', n_on: '{n} allumées', off: 'éteint',
    letters: '{n} lettres', letter: '1 lettre', in_box: 'dans la boîte', today: 'aujourd\'hui', tonight: 'à sortir ce soir', tomorrow: 'demain',
    a_disarmed: 'Alarme off', a_home: 'Alarme maison', a_night: 'Alarme nuit', a_away: 'Alarme absent', a_trig: 'ALARME', a_pending: 'Alarme…',
    calm: 'tout est calme', armed: 'activée', heating: 'chauffe', now_t: 'actuel {t}', lights: '{n} lampes', light1: '1 lampe', all_off: 'Tout éteint', on: 'allumées',
    open: 'ouvert', n_open: '{n} ouverts', batteries: '{n} piles', battery1: '1 pile', replace: 'à vérifier', playing: 'en lecture',
    tap_again: 'Touchez encore', closed: 'Fermé', opened: 'Ouvert', is_on: 'Allumé', is_off: 'Éteint', home: 'maison', away: 'absent',
    solar: 'soleil', house: 'maison', charging: 'charge', discharging: 'fournit', idle: 'repos', export: 'injection', import: 'du réseau',
    description: 'Toute la maison sur un écran de téléphone : pièces lumineuses, état actuel, scènes et énergie.',
  },
  de: {
    morning: 'Guten Morgen', afternoon: 'Guten Tag', evening: 'Guten Abend', night: 'Gute Nacht',
    now: 'Gerade jetzt', rooms: 'Räume', scenes: 'Szenen', n_on: '{n} an', off: 'aus',
    letters: '{n} Briefe', letter: '1 Brief', in_box: 'im Kasten', today: 'heute', tonight: 'heute Abend raus', tomorrow: 'morgen',
    a_disarmed: 'Alarm aus', a_home: 'Alarm zuhause', a_night: 'Alarm Nacht', a_away: 'Alarm weg', a_trig: 'ALARM', a_pending: 'Alarm…',
    calm: 'alles ruhig', armed: 'scharf', heating: 'heizt', now_t: 'jetzt {t}', lights: '{n} Lampen', light1: '1 Lampe', all_off: 'Alles aus', on: 'an',
    open: 'offen', n_open: '{n} offen', batteries: '{n} Batterien', battery1: '1 Batterie', replace: 'prüfen', playing: 'spielt',
    tap_again: 'Nochmal tippen', closed: 'Zu', opened: 'Offen', is_on: 'An', is_off: 'Aus', home: 'zuhause', away: 'weg',
    solar: 'Sonne', house: 'Haus', charging: 'lädt', discharging: 'liefert', idle: 'Ruhe', export: 'Einspeisung', import: 'vom Netz',
    description: 'Das ganze Haus auf einem Handybildschirm: leuchtende Räume, aktueller Stand, Szenen und Energie.',
  },
  es: {
    morning: 'Buenos días', afternoon: 'Buenas tardes', evening: 'Buenas tardes', night: 'Buenas noches',
    now: 'Ahora mismo', rooms: 'Habitaciones', scenes: 'Escenas', n_on: '{n} encendidas', off: 'apagado',
    letters: '{n} cartas', letter: '1 carta', in_box: 'en el buzón', today: 'hoy', tonight: 'sacar esta noche', tomorrow: 'mañana',
    a_disarmed: 'Alarma off', a_home: 'Alarma casa', a_night: 'Alarma noche', a_away: 'Alarma fuera', a_trig: 'ALARMA', a_pending: 'Alarma…',
    calm: 'todo tranquilo', armed: 'activada', heating: 'calienta', now_t: 'ahora {t}', lights: '{n} luces', light1: '1 luz', all_off: 'Todo apagado', on: 'encendidas',
    open: 'abierto', n_open: '{n} abiertos', batteries: '{n} pilas', battery1: '1 pila', replace: 'revisar', playing: 'sonando',
    tap_again: 'Toca otra vez', closed: 'Cerrado', opened: 'Abierto', is_on: 'Encendido', is_off: 'Apagado', home: 'casa', away: 'fuera',
    solar: 'sol', house: 'casa', charging: 'carga', discharging: 'suministra', idle: 'reposo', export: 'vertido', import: 'de la red',
    description: 'Toda la casa en una pantalla de móvil: habitaciones luminosas, estado actual, escenas y energía.',
  },
  it: {
    morning: 'Buongiorno', afternoon: 'Buon pomeriggio', evening: 'Buonasera', night: 'Buonanotte',
    now: 'Adesso', rooms: 'Stanze', scenes: 'Scene', n_on: '{n} accese', off: 'spento',
    letters: '{n} lettere', letter: '1 lettera', in_box: 'nella cassetta', today: 'oggi', tonight: 'fuori stasera', tomorrow: 'domani',
    a_disarmed: 'Allarme off', a_home: 'Allarme casa', a_night: 'Allarme notte', a_away: 'Allarme fuori', a_trig: 'ALLARME', a_pending: 'Allarme…',
    calm: 'tutto tranquillo', armed: 'inserito', heating: 'riscalda', now_t: 'ora {t}', lights: '{n} luci', light1: '1 luce', all_off: 'Tutto spento', on: 'accese',
    open: 'aperto', n_open: '{n} aperti', batteries: '{n} batterie', battery1: '1 batteria', replace: 'controllare', playing: 'in riproduzione',
    tap_again: 'Tocca ancora', closed: 'Chiuso', opened: 'Aperto', is_on: 'Acceso', is_off: 'Spento', home: 'casa', away: 'fuori',
    solar: 'sole', house: 'casa', charging: 'carica', discharging: 'fornisce', idle: 'riposo', export: 'immissione', import: 'dalla rete',
    description: 'Tutta la casa su uno schermo del telefono: stanze luminose, stato attuale, scene ed energia.',
  },
};
function ghmLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GHM_I18N[l] ? l : 'en';
}
function ghmT(lang, key, vars) {
  let s = (GHM_I18N[lang] && GHM_I18N[lang][key]) ?? GHM_I18N.en[key] ?? key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function ghmEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const GHM_PAL = ['255, 224, 138', '185, 168, 255', '255, 184, 153', '142, 197, 255', '143, 227, 184', '255, 159, 191'];
const GHM_C = { mint: '143, 227, 184', peach: '255, 184, 153', yellow: '255, 224, 138', lilac: '185, 168, 255', blue: '142, 197, 255', red: '255, 143, 143', pink: '255, 159, 191', grey: '111, 106, 133' };
const GHM_WASTE = [
  { re: /pmd|plastic|pbd/i, label: 'PMD', c: '142, 197, 255' }, { re: /gft|groente|bio|organic/i, label: 'GFT', c: '143, 227, 184' },
  { re: /papier|karton|paper/i, label: 'Papier', c: '255, 224, 138' }, { re: /glas|glass/i, label: 'Glas', c: '142, 227, 214' },
  { re: /textiel|textile/i, label: 'Textiel', c: '255, 159, 191' }, { re: /groen|tuin|garden|snoei/i, label: 'Groen', c: '143, 227, 184' },
  { re: /rest|grijs|grey|gray/i, label: 'Rest', c: '201, 196, 221' },
];
function ghmHex(h) {
  if (!h) return null;
  if (Array.isArray(h)) return h.slice(0, 3).join(', ');
  const m = String(h).trim().match(/^#?([0-9a-f]{6})$/i);
  if (m) { const n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(', '); }
  return /^\d+\s*,\s*\d+\s*,\s*\d+$/.test(String(h)) ? String(h) : null;
}
// lichtkleuren worden verzadigd weergegeven; heel witte tinten krijgen de eigen pastelkleur
function ghmLightRgb(s) {
  const a = (s && s.attributes) || {};
  if (Array.isArray(a.rgb_color) && a.color_mode && !/color_temp|white|brightness|onoff/.test(a.color_mode)) {
    const [r, g, b] = a.rgb_color;
    if (Math.max(r, g, b) - Math.min(r, g, b) > 40) return [r, g, b].join(', ');
  }
  return null;
}
const GHM_ICON = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${p}"/></svg>`;
const GHM_P = {
  sun: 'M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  cloud: 'M17.5 19H9a5 5 0 1 1 1.6-9.7A6 6 0 0 1 21.5 13a3.5 3.5 0 0 1-4 6z',
  partly: 'M12 3v2M5.6 5.6l1.4 1.4M3 12h2M17.5 19H9a5 5 0 1 1 1.6-9.7A6 6 0 0 1 21.5 13a3.5 3.5 0 0 1-4 6z',
  rain: 'M17.5 15H9a5 5 0 1 1 1.6-9.7A6 6 0 0 1 21.5 9a3.5 3.5 0 0 1-4 6zM9 18l-1 3M13 18l-1 3M17 18l-1 3',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z',
  mail: 'M3 5h18v14H3zM3 7l9 6 9-6',
  bin: 'M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3',
};
function ghmWxIcon(cond) {
  if (/rain|pour|light|hail|snow/.test(cond || '')) return GHM_P.rain;
  if (cond === 'clear-night') return GHM_P.moon;
  if (cond === 'sunny') return GHM_P.sun;
  if (cond === 'partlycloudy') return GHM_P.partly;
  return GHM_P.cloud;
}

const GHM_STYLE = `
  :host { display: block; }
  ha-card { position: relative; overflow: visible; background: none; border: 0; box-shadow: none; color: var(--glow-text, #F3F1FA); display: flex; flex-direction: column; gap: 10px; user-select: none; -webkit-user-select: none; }
  button { font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .ink { color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .head { display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; }
  .hd { display: flex; flex-direction: column; min-width: 0; }
  .hd span { font-size: 0.85rem; font-weight: 800; opacity: 0.6; }
  .hd b { font-size: 1.55rem; font-weight: 900; line-height: 1.1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .wx { flex-shrink: 0; display: flex; align-items: center; gap: 6px; height: 40px; padding: 0 12px; border-radius: 20px; border: 1px solid rgba(var(--c), 0.4); background: rgba(var(--c), 0.14); }
  .wx svg { width: 20px; height: 20px; }
  .wx b { font-size: 1.1rem; font-weight: 900; }
  .info { display: flex; align-items: center; justify-content: space-between; gap: 6px; min-height: 42px; }
  .avs { display: flex; align-items: center; padding-left: 7px; }
  .av { width: 32px; height: 32px; margin-left: -7px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 900; color: #1C1730; background: rgb(var(--c)); border: 2px solid var(--glow-card-background, #13111F); box-shadow: 0 0 10px rgba(var(--c), 0.6); overflow: hidden; padding: 0; background-size: cover; background-position: center; }
  .av.pic { color: transparent; border-color: rgb(var(--c)); }
  .tags { display: flex; gap: 6px; min-width: 0; }
  .tag { flex-shrink: 0; display: flex; align-items: center; gap: 5px; height: 42px; padding: 0 9px; border-radius: 16px; border: 1px solid rgba(var(--c), 0.45); background: rgba(var(--c), 0.14); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.22); text-align: left; }
  .tag svg { width: 18px; height: 18px; flex-shrink: 0; }
  .tag span { display: flex; flex-direction: column; line-height: 1.05; }
  .tag b { font-size: 0.85rem; font-weight: 900; white-space: nowrap; }
  .tag i { font-style: normal; font-size: 0.62rem; font-weight: 800; opacity: 0.85; white-space: nowrap; }
  .lab { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: -2px; }
  .lab b { font-size: 0.75rem; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.5; }
  .lab span { font-size: 0.75rem; font-weight: 800; }
  .now { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
  .chip { min-width: 0; display: flex; align-items: center; gap: 7px; height: 44px; padding: 0 8px 0 10px; border-radius: 14px; text-align: left; border: 1px solid rgba(var(--c), 0.2); background: rgba(var(--c), 0.06); transition: background 0.3s, box-shadow 0.3s; }
  .chip.on { border-color: rgba(var(--c), 0.55); background: rgba(var(--c), 0.16); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.25); }
  .chip > i { width: 10px; height: 10px; border-radius: 5px; flex-shrink: 0; background: rgb(var(--c)); box-shadow: 0 0 8px rgba(var(--c), 0.9); }
  .chip.pulse > i { animation: ghm-pulse 1s ease-in-out infinite; }
  .chip span { min-width: 0; display: flex; flex-direction: column; line-height: 1.1; }
  .chip b { font-size: 0.8rem; font-weight: 900; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .chip em { font-style: normal; font-size: 0.62rem; font-weight: 800; opacity: 0.7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .rooms { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px 4px; }
  .room { border: 0; background: none; padding: 4px 0; display: flex; flex-direction: column; align-items: center; gap: 5px; min-width: 0; touch-action: manipulation; }
  .orb { width: 58px; height: 58px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.4s, box-shadow 0.4s, transform 0.15s; background: var(--glow-surface, rgba(255,255,255,0.06)); color: var(--glow-muted, #A39FB8); box-shadow: inset 0 0 0 1px var(--glow-border, rgba(255,255,255,0.1)); --mdc-icon-size: 26px; }
  .room.on .orb { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), rgb(var(--c)) 58%); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.85), 0 0 calc(var(--glow) * 2.4) rgba(var(--c), 0.35); }
  .room:active .orb { transform: scale(0.93); }
  .room > b { font-size: 0.75rem; font-weight: 800; line-height: 1; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .room > span { font-size: 0.68rem; font-weight: 800; line-height: 1; opacity: 0.55; }
  .room.on > span { opacity: 1; }
  .scenes { display: flex; flex-wrap: wrap; gap: 6px; }
  .sc { display: flex; align-items: center; gap: 6px; height: 38px; padding: 0 13px; border-radius: 19px; font-size: 0.8rem; font-weight: 800; border: 1px solid rgba(var(--c), 0.25); background: rgba(var(--c), 0.07); transition: all 0.3s; --mdc-icon-size: 18px; }
  .sc ha-icon { color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .sc.on { border-color: rgba(var(--c), 0.7); background: rgba(var(--c), 0.22); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.45); }
  .quick { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
  .q { height: 62px; border-radius: 18px; display: flex; flex-direction: column; justify-content: center; gap: 4px; padding: 0 10px; text-align: left; overflow: hidden; min-width: 0; border: 1px solid var(--glow-border, rgba(255,255,255,0.08)); background: var(--glow-surface, rgba(255,255,255,0.05)); transition: all 0.35s; }
  .q > span { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .q .qi { flex-shrink: 0; width: 24px; height: 24px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--glow-surface, rgba(255,255,255,0.08)); --mdc-icon-size: 15px; }
  .q b { font-size: 0.8rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .q em { font-style: normal; font-size: 0.75rem; font-weight: 800; padding-left: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; opacity: 0.6; }
  .q.on { border-color: rgba(var(--c), 0.55); background: rgba(var(--c), 0.15); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.3); }
  .q.on .qi { background: rgb(var(--c)); color: #1C1730; }
  .q.on em { opacity: 1; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .q.ask { border-color: rgba(255, 224, 138, 0.7); background: rgba(255, 224, 138, 0.18); }
  .q.ask em { opacity: 1; color: color-mix(in srgb, rgb(255, 224, 138), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .en { display: flex; align-items: center; gap: 8px; height: 58px; padding: 0 14px; border-radius: 20px; background: linear-gradient(90deg, rgba(255, 224, 138, 0.14), rgba(143, 227, 184, 0.14)); border: 1px solid rgba(143, 227, 184, 0.35); text-align: left; }
  .en > span { display: flex; flex-direction: column; line-height: 1.05; }
  .en > span:nth-of-type(2) { align-items: center; }
  .en > span:last-of-type { align-items: flex-end; }
  .en b { font-size: 1rem; font-weight: 900; }
  .en em { font-style: normal; font-size: 0.68rem; font-weight: 800; opacity: 0.7; }
  .flow { position: relative; flex: 1; height: 4px; border-radius: 2px; background: var(--glow-surface, rgba(255,255,255,0.08)); overflow: hidden; }
  .flow i { position: absolute; left: 0; top: -2px; width: 8px; height: 8px; border-radius: 4px; background: rgb(var(--c)); box-shadow: 0 0 8px rgb(var(--c)); animation: ghm-flow 1.6s linear infinite; }
  .flow.rev i { animation-name: ghm-flow-rev; }
  .flow.idle i { display: none; }
  @keyframes ghm-flow { from { transform: translateX(-12px); opacity: 0; } 30% { opacity: 1; } to { transform: translateX(60px); opacity: 0; } }
  @keyframes ghm-flow-rev { from { transform: translateX(60px); opacity: 0; } 30% { opacity: 1; } to { transform: translateX(-12px); opacity: 0; } }
  @keyframes ghm-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.5); } }
`;

class GlowHomeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._ask = null;
    this._bound = false;
  }
  static getStubConfig() { return {}; }
  setConfig(config) { this._config = { glow: 14, ...(config || {}) }; this._key = null; this._render(); }
  set hass(hass) { this._hass = hass; this._render(); }
  connectedCallback() { this._tick = setInterval(() => { this._key = null; this._render(); }, 30000); }
  disconnectedCallback() { clearInterval(this._tick); clearTimeout(this._askT); }
  getCardSize() { return 12; }
  getGridOptions() { return { columns: 'full', rows: 'auto' }; }
  _lang() { return ghmLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return ghmT(this._lang(), k, v); }
  _st(id) { return id && this._hass.states[id]; }
  _num(id) { const s = this._st(id); const n = s ? parseFloat(s.state) : NaN; return isNaN(n) ? null : n; }
  _fmt(n, d = 1) { return Number(n).toLocaleString(this._lang(), { minimumFractionDigits: d, maximumFractionDigits: d }); }
  _first(domain) { return Object.keys(this._hass.states).find((e) => e.startsWith(domain + '.')); }
  _dash() { return window.location.pathname.split('/').filter(Boolean)[0] || 'lovelace'; }

  // ---- onderdelen ----
  _people() {
    const st = this._hass.states;
    const ids = Array.isArray(this._config.persons) && this._config.persons.length ? this._config.persons
      : Object.keys(st).filter((e) => e.startsWith('person.')).sort();
    return ids.filter((e) => st[e]).map((e) => {
      const s = st[e];
      const name = s.attributes.friendly_name || e.split('.')[1];
      const c = s.state === 'home' ? GHM_C.mint : s.state === 'not_home' ? GHM_C.grey : GHM_C.lilac;
      const where = s.state === 'home' ? this._t('home') : s.state === 'not_home' ? this._t('away') : s.state;
      return { id: e, ini: name.slice(0, 2), name, where, c, pic: this._config.pictures !== false ? s.attributes.entity_picture : null };
    });
  }
  _mail() {
    const n = this._num(this._config.mail);
    return n && n > 0 ? { n } : null;
  }
  _waste() {
    const st = this._hass.states;
    const ids = Array.isArray(this._config.waste) && this._config.waste.length ? this._config.waste
      : Object.keys(st).filter((e) => e.startsWith('sensor.') && ['days_until', 'Days_until', 'sort_date', 'Sort_date'].some((k) => st[e].attributes[k] !== undefined));
    let best = null;
    ids.forEach((id) => {
      const s = st[id];
      if (!s) return;
      const a = s.attributes;
      let days = null;
      const sd = a.sort_date ?? a.Sort_date;
      if (sd && /^\d{8}$/.test(String(sd))) {
        const d = new Date(+String(sd).slice(0, 4), +String(sd).slice(4, 6) - 1, +String(sd).slice(6, 8));
        const t = new Date(); t.setHours(0, 0, 0, 0);
        days = Math.round((d - t) / 86400000);
      } else if (a.days_until ?? a.Days_until) days = +(a.days_until ?? a.Days_until);
      if (days === null || isNaN(days) || days < 0 || days > 1) return;
      const nm = (a.friendly_name || id) + ' ' + id;
      const w = GHM_WASTE.find((x) => x.re.test(nm));
      const own = this._config.waste_colors && (this._config.waste_colors[w ? w.label : ''] || this._config.waste_colors[id]);
      const item = { label: w ? w.label : (a.friendly_name || id), c: ghmHex(own) || (w ? w.c : '201, 196, 221') };
      if (!best || days < best.days) best = { days, items: [item] };
      else if (days === best.days && !best.items.some((x) => x.label === item.label)) best.items.push(item);
    });
    if (!best) return null;
    const when = best.days === 0 ? this._t('today') : new Date().getHours() >= 12 ? this._t('tonight') : this._t('tomorrow');
    return { label: best.items.map((x) => x.label).join(' + '), when, c: best.items[0].c };
  }
  _status() {
    const c = this._config, st = this._hass.states, out = [];
    const nav = { alarm: 'beveiliging', climate: 'klimaat', lights: 'verlichting', openings: 'beveiliging', batteries: 'batterijen', media: 'media', ...(c.links || {}) };
    const alarm = c.alarm || this._first('alarm_control_panel');
    const a = this._st(alarm);
    if (a) {
      const m = { disarmed: ['a_disarmed', GHM_C.mint], armed_home: ['a_home', GHM_C.blue], armed_night: ['a_night', GHM_C.lilac], armed_away: ['a_away', GHM_C.peach], armed_vacation: ['a_away', GHM_C.peach], triggered: ['a_trig', GHM_C.red] }[a.state] || ['a_pending', GHM_C.yellow];
      out.push({ k: 'alarm', id: alarm, big: this._t(m[0]), small: a.state === 'disarmed' ? this._t('calm') : this._t('armed'), c: m[1], on: a.state !== 'disarmed', pulse: a.state === 'triggered' });
    }
    const clim = c.climate || this._first('climate');
    const cl = this._st(clim);
    if (cl) {
      const heat = cl.attributes.hvac_action === 'heating';
      const tgt = cl.attributes.temperature, cur = cl.attributes.current_temperature;
      out.push({ k: 'climate', id: clim, big: tgt != null ? this._fmt(tgt, 1) + '°' : (cur != null ? this._fmt(cur, 1) + '°' : cl.state), small: heat ? this._t('heating') : cur != null ? this._t('now_t', { t: this._fmt(cur, 1) + '°' }) : cl.state, c: GHM_C.peach, on: heat });
    }
    const lights = Object.keys(st).filter((e) => e.startsWith('light.') && st[e].state === 'on' && !Array.isArray(st[e].attributes.entity_id) && !Array.isArray(st[e].attributes.group_entities) && !st[e].attributes.is_hue_group);
    out.push({ k: 'lights', big: lights.length ? (lights.length === 1 ? this._t('light1') : this._t('lights', { n: lights.length })) : this._t('all_off'), small: lights.length ? this._t('on') : '', c: GHM_C.yellow, on: lights.length > 0 });
    const opens = (c.openings || []).filter((e) => st[e] && ['on', 'open', 'opening', 'unlocked'].includes(st[e].state));
    if (opens.length) out.push({ k: 'openings', id: opens[0], big: opens.length === 1 ? (st[opens[0]].attributes.friendly_name || opens[0]).replace(/\s*(deursensor|contact|sensor)$/i, '') : this._t('n_open', { n: opens.length }), small: this._t('open'), c: GHM_C.peach, on: true });
    const bat = window.glowBatteryAlerts ? window.glowBatteryAlerts(this._hass, c.batteries) : 0;
    if (bat) out.push({ k: 'batteries', big: bat === 1 ? this._t('battery1') : this._t('batteries', { n: bat }), small: this._t('replace'), c: GHM_C.red, on: true });
    const mids = Array.isArray(c.media) && c.media.length ? c.media : Object.keys(st).filter((e) => e.startsWith('media_player.'));
    const play = mids.find((e) => st[e] && st[e].state === 'playing');
    if (play) { const p = st[play].attributes; out.push({ k: 'media', id: play, big: p.friendly_name || play, small: p.media_title || p.media_channel || this._t('playing'), c: GHM_C.blue, on: true }); }
    return out.slice(0, 6).map((x) => ({ ...x, nav: c.links === false ? null : nav[x.k] }));
  }
  _rooms() {
    return (this._config.rooms || []).map((r, i) => {
      const x = typeof r === 'string' ? { entity: r } : r;
      const s = this._st(x.entity);
      const on = !!s && s.state === 'on';
      const bri = s && s.attributes.brightness != null ? Math.round(s.attributes.brightness / 2.55) : null;
      const c = (on && x.light_color !== false && ghmLightRgb(s)) || ghmHex(x.color) || GHM_PAL[i % GHM_PAL.length];
      const name = x.name || (s && s.attributes.friendly_name) || x.entity;
      return { id: x.entity, name, icon: x.icon || (s && s.attributes.icon) || 'mdi:lightbulb', on, c, sub: !s ? '–' : on ? (bri != null ? bri + ' %' : this._t('on')) : this._t('off'), na: !s || s.state === 'unavailable' };
    });
  }
  _scenes() {
    return (this._config.scenes || []).map((r, i) => {
      const x = typeof r === 'string' ? { entity: r } : r;
      const s = this._st(x.entity);
      const name = x.name || (s && s.attributes.friendly_name) || x.entity;
      return { id: x.entity, name, icon: x.icon || (s && s.attributes.icon) || 'mdi:palette', c: ghmHex(x.color) || GHM_PAL[(i + 1) % GHM_PAL.length], on: this._lastScene === x.entity && Date.now() - this._lastSceneAt < 120000 };
    });
  }
  _quick() {
    const st = this._hass.states;
    return (this._config.quick || []).slice(0, 6).map((r, i) => {
      const x = typeof r === 'string' ? { entity: r } : r;
      const ids = [].concat(x.entity || []).filter((e) => st[e]);
      const s = st[ids[0]];
      const dom = ids[0] ? ids[0].split('.')[0] : '';
      const openish = (e) => ['on', 'open', 'opening', 'playing', 'unlocked', 'heat'].includes(st[e].state);
      const n = ids.filter(openish).length;
      let txt;
      if (!s) txt = '–';
      else if (ids.length > 1) txt = n ? this._t('n_open', { n }) : this._t('closed');
      else if (dom === 'cover') txt = s.state === 'opening' || s.state === 'closing' ? s.state : openish(ids[0]) ? this._t('opened') : this._t('closed');
      else if (dom === 'timer' || dom === 'sensor') txt = s.state;
      else txt = openish(ids[0]) ? this._t('is_on') : this._t('is_off');
      if (s && x.timer && st[x.timer] && st[x.timer].state === 'active' && openish(ids[0])) {
        const f = st[x.timer].attributes.finishes_at;
        if (f) { const m = Math.max(0, Math.round((Date.parse(f) - Date.now()) / 60000)); txt += ' · ' + m + ' min'; }
      }
      const name = x.name || (s && s.attributes.friendly_name) || ids[0] || '?';
      const confirm = x.confirm ?? (dom === 'cover' && ids.length === 1 && /garage|poort|gate|door/i.test(ids[0] + ' ' + name));
      return { i, ids, name, icon: x.icon || (s && s.attributes.icon) || (dom === 'cover' ? 'mdi:garage' : dom === 'fan' ? 'mdi:fan' : 'mdi:toggle-switch'), txt, on: n > 0, c: ghmHex(x.color) || [GHM_C.peach, GHM_C.mint, GHM_C.lilac, GHM_C.blue, GHM_C.yellow, GHM_C.pink][i % 6], confirm, navigate: x.navigate, dom };
    });
  }
  _energy() {
    const e = this._config.energy;
    if (!e) return null;
    const w = (id, inv) => { const s = this._st(id); if (!s) return null; let v = parseFloat(s.state); if (isNaN(v)) return null; const u = (s.attributes.unit_of_measurement || 'W').toLowerCase(); if (u === 'kw') v *= 1000; return inv ? -v : v; };
    const pv = Math.max(0, w(e.solar) ?? 0);
    const grid = w(e.grid, e.invert_grid) ?? 0;
    const batt = e.battery ? (w(e.battery, e.invert_battery) ?? 0) : 0;
    const house = e.house ? (w(e.house) ?? 0) : Math.max(0, pv + grid - batt);
    const soc = this._num(e.battery_soc);
    const kw = (v) => (Math.abs(v) >= 1000 ? this._fmt(v / 1000, 1) + ' kW' : Math.round(v) + ' W');
    let right, rsub, rc, flow2;
    if (soc !== null) { right = Math.round(soc) + ' %'; rsub = batt > 30 ? this._t('charging') : batt < -30 ? this._t('discharging') : this._t('idle'); rc = GHM_C.mint; flow2 = batt > 30 ? '' : batt < -30 ? 'rev' : 'idle'; }
    else { right = kw(Math.abs(grid)); rsub = grid < -30 ? this._t('export') : this._t('import'); rc = GHM_C.lilac; flow2 = grid < -30 ? '' : grid > 30 ? 'rev' : 'idle'; }
    return { pv: kw(pv), house: kw(house), right, rsub, rc, flow1: pv > 30 ? '' : 'idle', flow2, nav: e.navigate || 'energie' };
  }

  // ---- tekenen ----
  _render() {
    if (!this._hass || !this._config) return;
    const c = this._config;
    const now = new Date();
    const h = now.getHours();
    const greet = this._t(h < 6 ? 'night' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening') + (c.name ? ', ' + c.name : '');
    const date = now.toLocaleDateString(this._lang(), { weekday: 'long', day: 'numeric', month: 'long' });
    const wxId = c.weather || this._first('weather');
    const wx = this._st(wxId);
    const people = this._people(), mail = this._mail(), waste = this._waste(), status = this._status();
    const rooms = this._rooms(), scenes = this._scenes(), quick = this._quick(), en = this._energy();
    const key = JSON.stringify([greet, date, wx && [wx.state, wx.attributes.temperature], people.map((p) => [p.where, p.pic]), mail, waste, status, rooms, scenes, quick, en, this._ask, this._lang()]);
    if (key === this._key) return;
    this._key = key;
    const lit = rooms.filter((r) => r.on).length;
    const E = ghmEsc;
    const showInfo = people.length || mail || waste;
    const html = `<style>${GHM_STYLE}</style>
      <ha-card style="--glow:${parseInt(c.glow, 10) || 0}px">
        <div class="head"><div class="hd"><span>${E(date.charAt(0).toUpperCase() + date.slice(1))}</span><b>${E(greet)}</b></div>
          ${wx ? `<button type="button" class="wx" data-more="${E(wxId)}" style="--c:${GHM_C.blue}"><span class="ink">${GHM_ICON(ghmWxIcon(wx.state))}</span><b>${E(wx.attributes.temperature != null ? Math.round(wx.attributes.temperature) + '°' : wx.state)}</b></button>` : ''}</div>
        ${showInfo ? `<div class="info"><div class="avs">${people.map((p) => `<button type="button" class="av${p.pic ? ' pic' : ''}" data-more="${E(p.id)}" title="${E(p.name + ' · ' + p.where)}" style="--c:${p.c}${p.pic ? ';background-image:url(' + E(p.pic) + ')' : ''}">${E(p.ini)}</button>`).join('')}</div>
          <div class="tags">${mail ? `<button type="button" class="tag ink" data-more="${E(c.mail)}" style="--c:${GHM_C.pink}">${GHM_ICON(GHM_P.mail)}<span><b>${E(mail.n === 1 ? this._t('letter') : this._t('letters', { n: mail.n }))}</b><i>${E(this._t('in_box'))}</i></span></button>` : ''}
          ${waste ? `<div class="tag ink" style="--c:${waste.c}">${GHM_ICON(GHM_P.bin)}<span><b>${E(waste.label)}</b><i>${E(waste.when)}</i></span></div>` : ''}</div></div>` : ''}
        ${status.length ? `<div class="lab"><b>${E(this._t('now'))}</b></div><div class="now">${status.map((s, i) => `<button type="button" class="chip${s.on ? ' on' : ''}${s.pulse ? ' pulse' : ''}" data-st="${i}" style="--c:${s.c}"><i></i><span><b>${E(s.big)}</b>${s.small ? `<em>${E(s.small)}</em>` : ''}</span></button>`).join('')}</div>` : ''}
        ${rooms.length ? `<div class="lab"><b>${E(this._t('rooms'))}</b>${lit ? `<span class="ink" style="--c:${GHM_C.yellow}">${E(this._t('n_on', { n: lit }))}</span>` : ''}</div>
          <div class="rooms">${rooms.map((r, i) => `<button type="button" class="room${r.on ? ' on' : ''}" data-room="${i}" style="--c:${r.c}${r.na ? ';opacity:0.4' : ''}"><span class="orb"><ha-icon icon="${E(r.icon)}"></ha-icon></span><b>${E(r.name)}</b><span class="${r.on ? 'ink' : ''}">${E(r.sub)}</span></button>`).join('')}</div>` : ''}
        ${scenes.length ? `<div class="lab"><b>${E(this._t('scenes'))}</b></div><div class="scenes">${scenes.map((s, i) => `<button type="button" class="sc${s.on ? ' on' : ''}" data-sc="${i}" style="--c:${s.c}"><ha-icon icon="${E(s.icon)}"></ha-icon>${E(s.name)}</button>`).join('')}</div>` : ''}
        ${quick.length ? `<div class="quick">${quick.map((q) => `<button type="button" class="q${q.on ? ' on' : ''}${this._ask === q.i ? ' ask' : ''}" data-q="${q.i}" style="--c:${q.c}"><span><span class="qi"><ha-icon icon="${E(q.icon)}"></ha-icon></span><b>${E(q.name)}</b></span><em>${E(this._ask === q.i ? this._t('tap_again') : q.txt)}</em></button>`).join('')}</div>` : ''}
        ${en ? `<button type="button" class="en" data-en="1"><span><b class="ink" style="--c:${GHM_C.yellow}">${E(en.pv)}</b><em>${E(this._t('solar'))}</em></span><span class="flow ${en.flow1}" style="--c:${GHM_C.yellow}"><i></i></span><span><b>${E(en.house)}</b><em>${E(this._t('house'))}</em></span><span class="flow ${en.flow2}" style="--c:${en.rc}"><i></i></span><span><b class="ink" style="--c:${en.rc}">${E(en.right)}</b><em>${E(en.rsub)}</em></span></button>` : ''}
      </ha-card>`;
    this._data = { status, rooms, scenes, quick, en };
    this.shadowRoot.innerHTML = html;
    if (!this._bound) this._bind();
  }

  _more(id) { if (id) this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: id }, bubbles: true, composed: true })); }
  _go(path) {
    if (!path) return;
    const p = path.startsWith('/') ? path : '/' + this._dash() + '/' + path;
    history.pushState(null, '', p);
    window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } }));
  }
  _bind() {
    this._bound = true;
    const root = this.shadowRoot;
    let holdT = null, held = false;
    root.addEventListener('pointerdown', (ev) => {
      const b = ev.target.closest('[data-room]');
      held = false;
      if (!b) return;
      holdT = setTimeout(() => { held = true; const r = this._data.rooms[+b.dataset.room]; if (r) this._more(r.id); }, 550);
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((t) => root.addEventListener(t, () => clearTimeout(holdT)));
    root.addEventListener('click', (ev) => {
      const b = ev.target.closest('button');
      if (!b) return;
      const d = b.dataset, hass = this._hass;
      if (d.more) { this._more(d.more); return; }
      if (d.room !== undefined) {
        if (held) { held = false; return; }
        const r = this._data.rooms[+d.room];
        if (r && !r.na) hass.callService('homeassistant', 'toggle', { entity_id: r.id });
        return;
      }
      if (d.st !== undefined) {
        const s = this._data.status[+d.st];
        if (!s) return;
        if (s.nav) this._go(s.nav); else this._more(s.id);
        return;
      }
      if (d.sc !== undefined) {
        const s = this._data.scenes[+d.sc];
        if (!s) return;
        const dom = s.id.split('.')[0];
        hass.callService(['scene', 'script'].includes(dom) ? dom : 'homeassistant', 'turn_on', { entity_id: s.id });
        this._lastScene = s.id; this._lastSceneAt = Date.now(); this._key = null; this._render();
        return;
      }
      if (d.q !== undefined) {
        const q = this._data.quick.find((x) => x.i === +d.q);
        if (!q || !q.ids.length) return;
        if (q.navigate) { this._go(q.navigate); return; }
        if (q.ids.length > 1) { this._more(q.ids[0]); return; }
        if (q.confirm && this._ask !== q.i) {
          this._ask = q.i; this._key = null; this._render();
          clearTimeout(this._askT);
          this._askT = setTimeout(() => { this._ask = null; this._key = null; this._render(); }, 3000);
          return;
        }
        this._ask = null; clearTimeout(this._askT);
        const id = q.ids[0];
        if (q.dom === 'cover') hass.callService('cover', 'toggle', { entity_id: id });
        else hass.callService('homeassistant', 'toggle', { entity_id: id });
        this._key = null; this._render();
        return;
      }
      if (d.en) { const e = this._data.en; if (e) this._go(e.nav); }
    });
  }
}

if (!customElements.get('glow-home-card')) customElements.define('glow-home-card', GlowHomeCard);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-home-card')) {
  window.customCards.push({ type: 'glow-home-card', name: 'Glow Home Card', description: ghmT(ghmLang(null), 'description'), preview: false, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}
