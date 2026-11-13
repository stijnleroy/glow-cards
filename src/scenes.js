/*
 * Glow Scenes Card
 * Sferen van de integratie Scene presets (Hue-achtige kleurensferen) met hun afbeeldingen.
 * Kies precies welke lampen meedoen, tik een sfeer aan, of laat ze dynamisch verschuiven.
 */

const GSC_I18N = {
  nl: {
    lgroups: 'Groepen', singles: 'Losse lampen', edit: 'Aanpassen', done: 'Klaar', nosel: 'Nog geen lampen gekozen', lights: 'Lampen', chosen: '{n} gekozen', all: 'Alles', none: 'Niets', whole: 'Hele {r}', favorites: 'Favorieten',
    brightness: 'Helderheid', as_scene: 'zoals de sfeer', own_bri: 'Eigen helderheid', scene_bri: 'Helderheid van de sfeer',
    transition: 'Overgang', shuffle: 'Door elkaar', dynamic: 'Dynamisch', dynamic_sub: 'Kleuren verschuiven zachtjes', every: 'Elke {n}',
    stop: 'Stoppen', n_lights: '{n} lampen', dyn_info: 'Dynamisch · elke {n} s · ', pick_lights: 'Kies eerst een of meer lampen.',
    no_favs: 'Tik op de ster bij een sfeer om ze hier te bewaren.', loading: 'Sferen laden…', no_plugin: 'Scene presets is niet gevonden. Installeer de integratie Scene presets.',
    fav_full: 'Er passen geen favorieten meer bij.', custom: 'Eigen',
    err: 'Vul "rooms" of "areas" in met de kamers en lampen.',
    l_areas: 'Ruimtes (alle lampen uit deze ruimtes)', l_favorites_entity: 'Favorieten bewaren in (input_text)', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Sferen van Scene presets met afbeeldingen, eigen lampkeuze en dynamische sferen.',
    groups: { white: 'Wit licht', warm: 'Warm', calm: 'Rustig', nature: 'Natuur', party: 'Feest', season: 'Seizoenen', custom: 'Eigen' },
    cats: { Defaults: 'Standaard', Refreshing: 'Fris', Cozy: 'Gezellig', 'Party vibes': 'Feest', Serenity: 'Sereen', Dreamy: 'Dromerig', Peaceful: 'Rustig', Sunrise: 'Zonsopgang', Luxurious: 'Luxueus', Pure: 'Puur', Lush: 'Weelderig', Futuristic: 'Futuristisch', Halloween: 'Halloween', 'Winter holidays': 'Feestdagen', Daily: 'Dagelijks', 'Race Day': 'Racedag', Romantic: 'Romantisch', Vibrant: 'Levendig', Wanderlust: 'Reislust', Rustic: 'Landelijk', 'Misc Additions': 'Extra', 'Winter whisper': 'Winter', 'Sports live': 'Sport' },
  },
  en: {
    lgroups: 'Groups', singles: 'Single lights', edit: 'Change', done: 'Done', nosel: 'No lights selected yet', lights: 'Lights', chosen: '{n} selected', all: 'All', none: 'None', whole: 'All of {r}', favorites: 'Favourites',
    brightness: 'Brightness', as_scene: 'as the scene', own_bri: 'Own brightness', scene_bri: 'Scene brightness',
    transition: 'Transition', shuffle: 'Shuffle', dynamic: 'Dynamic', dynamic_sub: 'Colours shift gently', every: 'Every {n}',
    stop: 'Stop', n_lights: '{n} lights', dyn_info: 'Dynamic · every {n} s · ', pick_lights: 'Pick one or more lights first.',
    no_favs: 'Tap the star on a scene to keep it here.', loading: 'Loading scenes…', no_plugin: 'Scene presets was not found. Install the Scene presets integration.',
    fav_full: 'No room for more favourites.', custom: 'Custom',
    err: 'Fill in "rooms" or "areas" with the rooms and lights.',
    l_areas: 'Areas (all lights in these areas)', l_favorites_entity: 'Keep favourites in (input_text)', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Scene presets with images, your own light selection and dynamic scenes.',
    groups: { white: 'White light', warm: 'Warm', calm: 'Calm', nature: 'Nature', party: 'Party', season: 'Seasons', custom: 'Custom' },
    cats: {},
  },
  fr: {
    lgroups: 'Groupes', singles: 'Lampes seules', edit: 'Modifier', done: 'OK', nosel: 'Aucune lampe choisie', lights: 'Lampes', chosen: '{n} choisies', all: 'Toutes', none: 'Aucune', whole: 'Tout {r}', favorites: 'Favoris',
    brightness: 'Luminosité', as_scene: 'comme l\'ambiance', own_bri: 'Luminosité propre', scene_bri: 'Luminosité de l\'ambiance',
    transition: 'Transition', shuffle: 'Mélanger', dynamic: 'Dynamique', dynamic_sub: 'Les couleurs changent doucement', every: 'Toutes les {n}',
    stop: 'Arrêter', n_lights: '{n} lampes', dyn_info: 'Dynamique · toutes les {n} s · ', pick_lights: 'Choisissez d\'abord une ou plusieurs lampes.',
    no_favs: 'Touchez l\'étoile d\'une ambiance pour la garder ici.', loading: 'Chargement…', no_plugin: 'Scene presets introuvable. Installez l\'intégration Scene presets.',
    fav_full: 'Plus de place pour des favoris.', custom: 'Perso',
    err: 'Renseignez "rooms" ou "areas".',
    l_areas: 'Pièces (toutes les lampes)', l_favorites_entity: 'Favoris dans (input_text)', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Ambiances Scene presets avec images, choix des lampes et ambiances dynamiques.',
    groups: { white: 'Lumière blanche', warm: 'Chaleureux', calm: 'Calme', nature: 'Nature', party: 'Fête', season: 'Saisons', custom: 'Perso' },
    cats: {},
  },
  de: {
    lgroups: 'Gruppen', singles: 'Einzelne Lampen', edit: 'Ändern', done: 'Fertig', nosel: 'Noch keine Lampen gewählt', lights: 'Lampen', chosen: '{n} gewählt', all: 'Alle', none: 'Keine', whole: 'Ganz {r}', favorites: 'Favoriten',
    brightness: 'Helligkeit', as_scene: 'wie die Szene', own_bri: 'Eigene Helligkeit', scene_bri: 'Helligkeit der Szene',
    transition: 'Übergang', shuffle: 'Mischen', dynamic: 'Dynamisch', dynamic_sub: 'Farben wechseln sanft', every: 'Alle {n}',
    stop: 'Stoppen', n_lights: '{n} Lampen', dyn_info: 'Dynamisch · alle {n} s · ', pick_lights: 'Wähle zuerst eine oder mehrere Lampen.',
    no_favs: 'Tippe auf den Stern einer Szene, um sie hier zu behalten.', loading: 'Szenen laden…', no_plugin: 'Scene presets nicht gefunden. Installiere die Integration Scene presets.',
    fav_full: 'Kein Platz für weitere Favoriten.', custom: 'Eigene',
    err: 'Gib "rooms" oder "areas" an.',
    l_areas: 'Bereiche (alle Lampen)', l_favorites_entity: 'Favoriten speichern in (input_text)', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Scene-presets-Szenen mit Bildern, eigener Lampenauswahl und dynamischen Szenen.',
    groups: { white: 'Weißes Licht', warm: 'Warm', calm: 'Ruhig', nature: 'Natur', party: 'Party', season: 'Jahreszeiten', custom: 'Eigene' },
    cats: {},
  },
  es: {
    lgroups: 'Grupos', singles: 'Luces sueltas', edit: 'Cambiar', done: 'Listo', nosel: 'Aún no hay luces elegidas', lights: 'Luces', chosen: '{n} elegidas', all: 'Todas', none: 'Ninguna', whole: 'Todo {r}', favorites: 'Favoritas',
    brightness: 'Brillo', as_scene: 'como la escena', own_bri: 'Brillo propio', scene_bri: 'Brillo de la escena',
    transition: 'Transición', shuffle: 'Mezclar', dynamic: 'Dinámico', dynamic_sub: 'Los colores cambian suavemente', every: 'Cada {n}',
    stop: 'Parar', n_lights: '{n} luces', dyn_info: 'Dinámico · cada {n} s · ', pick_lights: 'Elige primero una o más luces.',
    no_favs: 'Toca la estrella de una escena para guardarla aquí.', loading: 'Cargando escenas…', no_plugin: 'No se encontró Scene presets. Instala la integración Scene presets.',
    fav_full: 'No caben más favoritas.', custom: 'Propias',
    err: 'Indica "rooms" o "areas".',
    l_areas: 'Zonas (todas las luces)', l_favorites_entity: 'Guardar favoritas en (input_text)', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Escenas de Scene presets con imágenes, tu selección de luces y escenas dinámicas.',
    groups: { white: 'Luz blanca', warm: 'Cálido', calm: 'Tranquilo', nature: 'Naturaleza', party: 'Fiesta', season: 'Temporadas', custom: 'Propias' },
    cats: {},
  },
  it: {
    lgroups: 'Gruppi', singles: 'Luci singole', edit: 'Modifica', done: 'Fatto', nosel: 'Nessuna luce scelta', lights: 'Luci', chosen: '{n} scelte', all: 'Tutte', none: 'Nessuna', whole: 'Tutto {r}', favorites: 'Preferite',
    brightness: 'Luminosità', as_scene: 'come la scena', own_bri: 'Luminosità propria', scene_bri: 'Luminosità della scena',
    transition: 'Transizione', shuffle: 'Mescola', dynamic: 'Dinamica', dynamic_sub: 'I colori cambiano dolcemente', every: 'Ogni {n}',
    stop: 'Ferma', n_lights: '{n} luci', dyn_info: 'Dinamica · ogni {n} s · ', pick_lights: 'Scegli prima una o più luci.',
    no_favs: 'Tocca la stella di una scena per tenerla qui.', loading: 'Caricamento scene…', no_plugin: 'Scene presets non trovato. Installa l\'integrazione Scene presets.',
    fav_full: 'Non c\'è posto per altre preferite.', custom: 'Personali',
    err: 'Indica "rooms" o "areas".',
    l_areas: 'Aree (tutte le luci)', l_favorites_entity: 'Salva preferite in (input_text)', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Scene di Scene presets con immagini, scelta delle luci e scene dinamiche.',
    groups: { white: 'Luce bianca', warm: 'Caldo', calm: 'Calmo', nature: 'Natura', party: 'Festa', season: 'Stagioni', custom: 'Personali' },
    cats: {},
  },
};
const GSC_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
function gscLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GSC_I18N[l] ? l : 'en';
}
function gscT(lang, key, vars) {
  let s = (GSC_I18N[lang] && GSC_I18N[lang][key]) ?? GSC_I18N.en[key] ?? key;
  if (vars && typeof s === 'string') Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gscEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function gscStore(key, val) {
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem('glow-scenes-' + key) || 'null');
    localStorage.setItem('glow-scenes-' + key, JSON.stringify(val));
  } catch (e) { /* geen opslag */ }
  return null;
}
// CIE xy naar een kleur om te tonen
function gscXY(x, y) {
  if (!y) y = 1e-6;
  const z = 1 - x - y;
  const X = x / y, Z = z / y;
  let r = X * 1.656492 - 0.354851 - Z * 0.255038;
  let g = -X * 0.707196 + 1.655397 + Z * 0.036152;
  let b = X * 0.051713 - 0.121364 + Z * 1.011530;
  const m = Math.max(r, g, b, 1e-6);
  const f = (v) => { v = Math.max(0, v / m); v = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055; return Math.round(Math.max(0, Math.min(1, v)) * 255); };
  return [f(r), f(g), f(b)].join(', ');
}

const GSC_C = '185, 168, 255';
// de 23 groepen van Scene presets samengevoegd tot een handvol
const GSC_GROUP = {
  Defaults: 'white', Daily: 'white',
  Cozy: 'warm', Sunrise: 'warm', Rustic: 'warm', Romantic: 'warm', Luxurious: 'warm',
  Refreshing: 'calm', Serenity: 'calm', Peaceful: 'calm', Pure: 'calm', 'Winter whisper': 'calm',
  Dreamy: 'nature', Lush: 'nature', Wanderlust: 'nature',
  'Party vibes': 'party', Vibrant: 'party', Futuristic: 'party', 'Race Day': 'party', 'Sports live': 'party', 'Misc Additions': 'party',
  Halloween: 'season', 'Winter holidays': 'season',
};
const GSC_ORDER = ['white', 'warm', 'calm', 'nature', 'party', 'season', 'custom'];
const GSC_STYLE = `
  :host { display: block; }
  ha-card { display: flex; flex-direction: column; gap: 14px; background: none; border: 0; box-shadow: none; color: var(--glow-text, #F3F1FA); user-select: none; -webkit-user-select: none; container-type: inline-size; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .panel { position: relative; box-sizing: border-box; padding: 18px; border-radius: var(--ha-card-border-radius, 26px); display: flex; flex-direction: column; gap: 14px;
    background: var(--glow-card-background, #15121F); border: 1px solid var(--glow-card-border, rgba(255,255,255,0.08)); }
  .row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .pt { font-size: 0.85rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .cnt { height: 26px; padding: 0 10px; border-radius: 13px; display: inline-flex; align-items: center; font-size: 0.8rem; font-weight: 800; background: rgba(${GSC_C}, 0.18); color: color-mix(in srgb, rgb(${GSC_C}), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .grow { flex: 1; }
  .sm { height: 34px; padding: 0 14px; border-radius: 17px; font-size: 0.85rem; font-weight: 800; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .room { display: flex; flex-direction: column; gap: 8px; }
  .rn { font-size: 1.05rem; font-weight: 800; margin-right: 4px; }
  .sum { flex: 1 1 160px; min-width: 0; font-size: 1rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sum.no { opacity: 0.5; }
  .seg { display: flex; gap: 4px; padding: 4px; border-radius: 22px; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); align-self: flex-start; }
  .seg button { height: 38px; padding: 0 18px; border-radius: 19px; border: 0; background: none; font-size: 0.95rem; font-weight: 800; display: inline-flex; align-items: center; gap: 8px; }
  .seg button.on { background: rgba(${GSC_C}, 0.22); color: color-mix(in srgb, rgb(${GSC_C}), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .seg em { font-style: normal; min-width: 20px; height: 20px; padding: 0 6px; box-sizing: border-box; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem; background: rgba(${GSC_C}, 0.3); }
  .sub { font-size: 0.75rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.5; margin-top: 2px; }
  .chip.g { padding: 0 8px 0 16px; }
  .chip.g small { min-width: 24px; height: 24px; padding: 0 6px; box-sizing: border-box; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.78rem; background: rgba(128,128,128,0.2); }
  .chip.g.part { border-color: rgba(${GSC_C}, 0.35); }
  .lbody { display: flex; flex-direction: column; gap: 10px; }
  .lbody[hidden] { display: none; }
  .chip { height: 38px; padding: 0 14px; border-radius: 19px; display: inline-flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 800;
    border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); background: var(--glow-surface, rgba(255,255,255,0.07)); transition: background 0.2s, border-color 0.2s; }
  .chip.on, .tab.on, .sm.on { border-color: rgba(${GSC_C}, 0.6); background: rgba(${GSC_C}, 0.16); color: color-mix(in srgb, rgb(${GSC_C}), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .chip.na { opacity: 0.4; pointer-events: none; }
  .chip i { width: 12px; height: 12px; border-radius: 6px; background: rgba(128,128,128,0.45); flex-shrink: 0; }
  .chip i.lit { background: rgb(var(--l)); box-shadow: 0 0 8px rgba(var(--l), 0.9); }
  .act { position: relative; display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: 22px; background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--a), 0.6); box-shadow: 0 0 var(--glow) rgba(var(--a), 0.4); }
  .act[hidden] { display: none; }
  .act .sw { width: 64px; height: 40px; border-radius: 14px; flex-shrink: 0; background-size: cover; background-position: center; }
  .act.dyn .sw { animation: gsc-pulse 3s ease-in-out infinite; }
  @keyframes gsc-pulse { 50% { filter: saturate(1.5) brightness(1.15); } }
  .act .tx { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .act b { font-size: 1.1rem; font-weight: 800; }
  .act span span { font-size: 0.85rem; font-weight: 700; opacity: 0.62; }
  .stop { height: 42px; padding: 0 16px; border-radius: 16px; font-size: 0.9rem; font-weight: 800; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .tabs { display: flex; gap: 8px; flex-wrap: wrap; }
  .tabs::-webkit-scrollbar { display: none; }
  .tab { flex-shrink: 0; height: 38px; padding: 0 16px; border-radius: 19px; font-size: 0.9rem; font-weight: 800; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
  .tile { position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 8px 8px 10px; border-radius: 20px; min-width: 0; text-align: left;
    border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); background: var(--glow-surface, rgba(255,255,255,0.07)); transition: border-color 0.3s, background 0.3s; }
  .tile.on { border-color: rgba(var(--t), 0.9); background: rgba(var(--t), 0.14); }
  .tile .im { position: relative; width: 100%; aspect-ratio: 1.5; border-radius: 16px; background-size: cover; background-position: center; }
  .tile.on .im { box-shadow: 0 0 var(--glow) rgba(var(--t), 0.9); }
  .tile .nm { font-size: 0.92rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
  .star { position: absolute; right: 12px; top: 12px; width: 32px; height: 32px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1rem; background: rgba(20, 16, 32, 0.5); color: #fff; z-index: 1; }
  .star.on { color: #FFD678; }
  .msg { grid-column: 1 / -1; padding: 18px 8px; text-align: center; font-weight: 700; opacity: 0.6; }
  .set { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 22px; }
  .col { display: flex; flex-direction: column; gap: 8px; }
  .col > .sm { align-self: flex-start; }
  .lbl { font-size: 0.8rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.6; }
  .rail { position: relative; height: 40px; display: flex; align-items: center; cursor: pointer; touch-action: none; }
  .rail div { position: relative; width: 100%; height: 14px; border-radius: 7px; background: var(--glow-surface, rgba(255,255,255,0.08)); overflow: hidden; }
  .rail span { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 7px; background: linear-gradient(90deg, rgba(${GSC_C}, 0.4), rgb(${GSC_C})); }
  .rail.off span { opacity: 0.35; }
  .dynrow { grid-column: 1 / -1; display: flex; align-items: center; gap: 14px; flex-wrap: wrap; padding-top: 4px; }
  .sw2 { position: relative; width: 64px; height: 36px; border-radius: 18px; flex-shrink: 0; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .sw2 i { position: absolute; top: 4px; left: 4px; width: 26px; height: 26px; border-radius: 13px; background: #9a95ad; transition: left 0.2s; }
  .sw2.on { border-color: rgba(${GSC_C}, 0.6); background: rgba(${GSC_C}, 0.35); }
  .sw2.on i { left: 32px; background: rgb(${GSC_C}); box-shadow: 0 0 var(--glow) rgba(${GSC_C}, 0.8); }
  .dynt { display: flex; flex-direction: column; }
  .dynt b { font-size: 1.05rem; font-weight: 800; }
  .dynt span { font-size: 0.85rem; font-weight: 700; opacity: 0.62; }
  .iv { display: flex; align-items: center; gap: 12px; min-width: 260px; flex: 1; }
  .iv .rail { flex: 1; }
  .iv[hidden] { display: none; }
  .toast { padding: 10px 14px; border-radius: 14px; font-size: 0.9rem; font-weight: 700; background: rgba(255, 184, 153, 0.14); border: 1px solid rgba(255, 184, 153, 0.45); }
  .toast:empty { display: none; }
  @container (max-width: 620px) { .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } .set { grid-template-columns: 1fr; } }
  @container (max-width: 420px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
`;

// lijst met sferen één keer ophalen bij de integratie
let GSC_DATA = null;
function gscLoad(hass) {
  if (GSC_DATA) return GSC_DATA;
  const url = hass && hass.hassUrl ? hass.hassUrl('/assets/scene_presets/scene_presets.json') : '/assets/scene_presets/scene_presets.json';
  GSC_DATA = fetch(url, { credentials: 'same-origin' })
    .then((r) => { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
    .then((d) => {
      const data = d && d.result ? d.result : d;
      const cats = new Map((data.categories || []).map((c) => [c.id, c.name]));
      return {
        cats: (data.categories || []).map((c) => c.name),
        presets: (data.presets || []).map((p) => ({
          id: p.id, name: p.name, cat: cats.get(p.categoryId) || 'Custom', bri: p.bri,
          img: p.img ? (hass && hass.hassUrl ? hass.hassUrl('/assets/scene_presets/' + p.img) : '/assets/scene_presets/' + p.img) : null,
          cols: (p.lights || []).map((l) => gscXY(l.x, l.y)),
        })),
      };
    })
    .catch((e) => { GSC_DATA = null; throw e; });
  return GSC_DATA;
}

class GlowScenesCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._built = false; this._keys = {}; this._data = null; this._dyn = []; this._err = false;
    const st = gscStore('settings') || {};
    this._s = { cat: null, bri: 60, ownBri: false, tr: 2, shuffle: true, dyn: false, iv: 60, ...st };
  }
  static getConfigElement() { return document.createElement('glow-scenes-card-editor'); }
  static getStubConfig() { return { areas: ['living'] }; }
  setConfig(config) {
    if (!config || (!Array.isArray(config.rooms) && !Array.isArray(config.areas))) throw new Error(gscT(gscLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, ...config };
    this._built = false;
    if (this._hass) this._render();
  }
  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first) this._init();
    if (this._config) this._render();
  }
  get hass() { return this._hass; }
  getCardSize() { return 16; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }
  connectedCallback() { clearInterval(this._poll); this._poll = setInterval(() => this._loadDyn(), 15000); }
  disconnectedCallback() { clearInterval(this._poll); }

  _lang() { return gscLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gscT(this._lang(), k, v); }
  _save() { gscStore('settings', { cat: this._s.cat, bri: this._s.bri, ownBri: this._s.ownBri, tr: this._s.tr, shuffle: this._s.shuffle, dyn: this._s.dyn, iv: this._s.iv }); }

  _init() {
    gscLoad(this._hass).then((d) => { this._data = d; this._render(); }).catch(() => { this._err = true; this._render(); });
    this._loadDyn();
  }
  _loadDyn() {
    if (!this._hass || !this._hass.callWS) return;
    this._hass.callWS({ type: 'scene_presets/get_dynamic_scenes' })
      .then((r) => {
        // antwoord is { dynamic_scenes: [...] }
        const list = Array.isArray(r) ? r : r && Array.isArray(r.dynamic_scenes) ? r.dynamic_scenes : [];
        this._dyn = list.filter((d) => d && d.running !== false);
        this._render();
      })
      .catch(() => { this._dyn = []; });
  }

  // kamers: ingesteld, of alle lampen uit de opgegeven ruimtes
  _rooms() {
    const st = this._hass.states;
    if (Array.isArray(this._config.rooms)) {
      return this._config.rooms.map((r) => ({
        name: r.name,
        lights: (r.lights || []).map((l) => (typeof l === 'string' ? { entity: l } : l)).filter((l) => st[l.entity]),
        groups: (r.groups || []).map((g) => ({ name: g.name, lights: (g.lights || []).filter((e) => st[e]) })),
      }));
    }
    const reg = this._hass.entities || {};
    const devs = this._hass.devices || {};
    const areas = this._hass.areas || {};
    return this._config.areas.map((a) => {
      const ids = Object.keys(st).filter((e) => {
        if (!e.startsWith('light.')) return false;
        const en = reg[e];
        if (!en || en.hidden) return false;
        const area = en.area_id || (en.device_id && devs[en.device_id] && devs[en.device_id].area_id);
        return area === a;
      });
      return { name: (areas[a] && areas[a].name) || a, lights: ids.map((e) => ({ entity: e })), groups: [] };
    });
  }
  // groepen per kamer: zelf ingesteld + lichtgroepen uit Home Assistant (group_entities)
  _groups(rooms) {
    const st = this._hass.states;
    const all = rooms.flatMap((r) => r.lights.map((l) => l.entity));
    const key = (ids) => [...ids].sort().join(',');
    const seen = new Set();
    const out = rooms.map(() => []);
    const nice = (n) => String(n).replace(/(\D)(\d+)_(\d+)$/, '$1 $2–$3').replace(/_/g, ' ');
    const add = (ri, name, ids) => {
      ids = ids.filter((e) => all.includes(e));
      if (ids.length < 2 || seen.has(key(ids))) return;
      seen.add(key(ids));
      out[ri].push({ name, lights: ids });
    };
    rooms.forEach((rm, ri) => rm.groups.forEach((g) => add(ri, g.name, g.lights)));
    if (this._config.auto_groups !== false) {
      Object.keys(st).filter((e) => e.startsWith('light.') && !all.includes(e)).forEach((e) => {
        const a = st[e].attributes || {};
        const mem = Array.isArray(a.group_entities) ? a.group_entities : Array.isArray(a.entity_id) ? a.entity_id : null;
        if (!mem) return;
        const ids = mem.filter((x) => all.includes(x));
        if (ids.length < 2) return;
        // in de kamer met de meeste leden
        let best = 0, bn = -1;
        rooms.forEach((rm, ri) => { const n = rm.lights.filter((l) => ids.includes(l.entity)).length; if (n > bn) { bn = n; best = ri; } });
        add(best, nice(a.friendly_name || e), ids);
      });
    }
    // de hele kamer als die nog niet als groep bestaat, vooraan
    rooms.forEach((rm, ri) => {
      const ids = rm.lights.map((l) => l.entity);
      if (ids.length >= 2 && !seen.has(key(ids))) { seen.add(key(ids)); out[ri].unshift({ name: this._t('whole', { r: rm.name.toLowerCase() }), lights: ids }); }
      out[ri].sort((a, b) => b.lights.length - a.lights.length);
    });
    return out;
  }
  // korte beschrijving van de keuze: grootste volledig gekozen groepen + losse lampen
  _summary(rooms, groups, sel) {
    if (!sel.length) return '';
    const left = new Set(sel);
    const parts = [];
    groups.flat().forEach((g) => { if (g.lights.every((e) => left.has(e))) { parts.push(g.name); g.lights.forEach((e) => left.delete(e)); } });
    rooms.forEach((rm) => rm.lights.forEach((l) => { if (left.has(l.entity)) parts.push(this._lname(l)); }));
    return parts.join(' + ');
  }
  _sel() {
    const all = this._rooms().flatMap((r) => r.lights.map((l) => l.entity));
    const saved = gscStore('selection');
    const sel = Array.isArray(saved) ? saved.filter((e) => all.includes(e)) : all.slice(0, 4);
    return sel;
  }
  _setSel(sel) { gscStore('selection', sel); this._render(); }
  _lname(l) {
    if (l.name) return l.name;
    const s = this._hass.states[l.entity];
    return (s && s.attributes.friendly_name) || l.entity;
  }

  // favorieten: gedeeld via een input_text (korte stukjes van de id's), anders op dit toestel
  _favEntity() { const e = this._config.favorites_entity; return e && this._hass.states[e] ? e : null; }
  _favs() {
    const e = this._favEntity();
    if (e) return String(this._hass.states[e].state || '').split(',').map((x) => x.trim()).filter((x) => x && x !== 'unknown');
    return gscStore('favorites') || [];
  }
  _isFav(p) { return this._favs().some((f) => p.id.startsWith(f)); }
  _toggleFav(p) {
    const short = p.id.slice(0, 8);
    let favs = this._favs();
    favs = favs.some((f) => p.id.startsWith(f)) ? favs.filter((f) => !p.id.startsWith(f)) : favs.concat(short);
    const e = this._favEntity();
    if (e) {
      const val = favs.join(',');
      const max = parseInt(this._hass.states[e].attributes.max, 10) || 255;
      if (val.length > max) { this._flash(this._t('fav_full')); return; }
      this._hass.callService('input_text', 'set_value', { entity_id: e, value: val });
    } else {
      gscStore('favorites', favs);
    }
    this._render();
  }
  _flash(msg) { this._toast = msg; this._render(); clearTimeout(this._tt); this._tt = setTimeout(() => { this._toast = ''; this._render(); }, 4000); }

  _apply(p) {
    const sel = this._sel();
    if (!sel.length) { this._flash(this._t('pick_lights')); return; }
    const s = this._s;
    const data = { preset_id: p.id, targets: { entity_id: sel }, transition: s.tr };
    if (s.ownBri) data.brightness = Math.round(s.bri * 2.55);
    if (s.dyn) {
      data.interval = s.iv;
      this._hass.callService('scene_presets', 'start_dynamic_scene', data);
    } else {
      // een gewone sfeer stopt een dynamische sfeer op dezelfde lampen
      this._hass.callService('scene_presets', 'stop_dynamic_scenes_for_targets', { targets: { entity_id: sel } });
      this._hass.callService('scene_presets', 'apply_preset', { ...data, shuffle: s.shuffle, smart_shuffle: s.shuffle });
    }
    this._last = { id: p.id, lights: sel, at: Date.now(), dyn: !!s.dyn };
    gscStore('last', this._last);
    setTimeout(() => this._loadDyn(), 800);
    this._render();
  }

  _build() {
    this.shadowRoot.innerHTML = `<style>${GSC_STYLE}</style>
      <ha-card>
        <div class="panel lights"></div>
        <div class="act" hidden><span class="sw"></span><span class="tx"><b></b><span></span></span><button class="stop" type="button"></button></div>
        <div class="toast"></div>
        <div class="panel"><div class="tabs"></div><div class="grid"></div></div>
        <div class="panel"><div class="set">
          <div class="col"><span class="lbl lb"></span><div class="rail" data-r="bri"><div><span></span></div></div><button class="sm ob" type="button"></button></div>
          <div class="col"><span class="lbl lt"></span><div class="rail" data-r="tr"><div><span></span></div></div><div class="row"><button class="sm shf" type="button"></button></div></div>
          <div class="dynrow"><button class="sw2" type="button" aria-label="dyn"><i></i></button><span class="dynt"><b></b><span></span></span><div class="grow"></div>
            <div class="iv"><span class="lbl li"></span><div class="rail" data-r="iv"><div><span></span></div></div></div></div>
        </div></div>
      </ha-card>`;
    const r = this.shadowRoot;
    this._card = r.querySelector('ha-card');
    r.querySelector('.lights').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const rooms = this._rooms();
      const all = rooms.flatMap((x) => x.lights.map((l) => l.entity));
      let sel = this._sel();
      if (b.dataset.open) { this._lopen = !(this._lopen ?? (gscStore('lights-open') ?? !sel.length)); gscStore('lights-open', this._lopen); this._render(); return; }
      if (b.dataset.room) { this._room = parseInt(b.dataset.room, 10); gscStore('room', this._room); this._render(); return; }
      if (b.dataset.all) sel = all.filter((x) => this._hass.states[x].state !== 'unavailable');
      else if (b.dataset.none) sel = [];
      else if (b.dataset.g) {
        const ids = JSON.parse(b.dataset.g).filter((x) => this._hass.states[x] && this._hass.states[x].state !== 'unavailable');
        const on = ids.every((x) => sel.includes(x));
        sel = on ? sel.filter((x) => !ids.includes(x)) : [...new Set([...sel, ...ids])];
      } else if (b.dataset.e) {
        sel = sel.includes(b.dataset.e) ? sel.filter((x) => x !== b.dataset.e) : sel.concat(b.dataset.e);
      }
      this._setSel(sel);
    });
    r.querySelector('.tabs').addEventListener('click', (e) => { const b = e.target.closest('.tab'); if (b) { this._s.cat = b.dataset.c; this._save(); this._render(); } });
    r.querySelector('.grid').addEventListener('click', (e) => {
      const star = e.target.closest('.star');
      const tile = e.target.closest('.tile');
      if (!tile || !this._data) return;
      const p = this._data.presets.find((x) => x.id === tile.dataset.id);
      if (!p) return;
      if (star) { e.stopPropagation(); this._toggleFav(p); } else this._apply(p);
    });
    r.querySelector('.stop').addEventListener('click', () => {
      const d = this._activeDyn();
      const last = this._last || gscStore('last');
      if (d) this._hass.callService('scene_presets', 'stop_dynamic_scene', { id: d.id });
      else if (last && last.lights) this._hass.callService('scene_presets', 'stop_dynamic_scenes_for_targets', { targets: { entity_id: last.lights } });
      if (last) { last.dyn = false; this._last = last; gscStore('last', last); }
      this._dyn = this._dyn.filter((x) => !d || x.id !== d.id);
      setTimeout(() => this._loadDyn(), 800);
      this._render();
    });
    r.querySelector('.ob').addEventListener('click', () => { this._s.ownBri = !this._s.ownBri; this._save(); this._render(); });
    r.querySelector('.shf').addEventListener('click', () => { this._s.shuffle = !this._s.shuffle; this._save(); this._render(); });
    r.querySelector('.sw2').addEventListener('click', () => { this._s.dyn = !this._s.dyn; this._save(); this._render(); });
    // schuifjes: slepen of tikken
    r.querySelectorAll('.rail').forEach((rail) => {
      const kind = rail.dataset.r;
      const val = (e) => { const b = rail.getBoundingClientRect(); return Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)); };
      const setv = (p) => {
        if (kind === 'bri') { this._s.bri = Math.max(1, Math.round(p * 100)); this._s.ownBri = true; }
        if (kind === 'tr') this._s.tr = Math.round(p * 10);
        if (kind === 'iv') this._s.iv = Math.max(5, Math.round(p * 300 / 5) * 5);
        this._render();
      };
      let drag = false;
      rail.addEventListener('pointerdown', (e) => { drag = true; try { rail.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ } setv(val(e)); });
      rail.addEventListener('pointermove', (e) => { if (drag) setv(val(e)); });
      rail.addEventListener('pointerup', () => { drag = false; this._save(); });
      rail.addEventListener('pointercancel', () => { drag = false; });
    });
    this._built = true;
    this._builtLang = this._lang();
    this._keys = {};
  }

  // de dynamische sfeer die (deels) op de gekozen lampen loopt
  _activeDyn() {
    const all = this._rooms().flatMap((r) => r.lights.map((l) => l.entity));
    return this._dyn.find((d) => d && d.parameters && (d.parameters.light_entity_ids || []).some((e) => all.includes(e)));
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    const st = this._hass.states;
    const r = this.shadowRoot;
    const s = this._s;
    this._card.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');
    const rooms = this._rooms();
    const sel = this._sel();

    // lampen
    const chip = (l) => {
      const ls = st[l.entity];
      const on = sel.includes(l.entity);
      const lit = ls && ls.state === 'on';
      const rgb = lit && ls.attributes.rgb_color ? ls.attributes.rgb_color.join(', ') : lit ? '255, 214, 160' : '';
      return `<button class="chip${on ? ' on' : ''}${!ls || ls.state === 'unavailable' ? ' na' : ''}" type="button" data-e="${gscEsc(l.entity)}"><i class="${lit ? 'lit' : ''}" style="${rgb ? '--l:' + rgb : ''}"></i>${gscEsc(this._lname(l))}</button>`;
    };
    const groups = this._groups(rooms);
    const open = this._lopen ?? (gscStore('lights-open') ?? !sel.length);
    let ri = Math.min(Math.max(0, parseInt(this._room ?? gscStore('room') ?? 0, 10) || 0), rooms.length - 1);
    const gchip = (g) => {
      const ok = g.lights.filter((x) => st[x] && st[x].state !== 'unavailable');
      const n = ok.filter((x) => sel.includes(x)).length;
      const cls = ok.length && n === ok.length ? ' on' : n ? ' part' : '';
      return `<button class="chip g${cls}" type="button" data-g="${gscEsc(JSON.stringify(g.lights))}">${gscEsc(g.name)}<small>${g.lights.length}</small></button>`;
    };
    const sum = this._summary(rooms, groups, sel);
    const rm = rooms[ri];
    const lightsHtml = `<div class="row"><span class="pt">${gscEsc(this._t('lights'))}</span>${sel.length ? `<span class="cnt">${sel.length}</span>` : ''}
        <span class="sum${sum ? '' : ' no'}">${gscEsc(sum || this._t('nosel'))}</span>
        <button class="sm${open ? ' on' : ''}" type="button" data-open="1">${gscEsc(this._t(open ? 'done' : 'edit'))}</button></div>`
      + `<div class="lbody"${open ? '' : ' hidden'}>`
      + (rooms.length > 1 ? `<div class="row"><div class="seg">${rooms.map((x, i) => { const c = x.lights.filter((l) => sel.includes(l.entity)).length; return `<button type="button" class="${i === ri ? 'on' : ''}" data-room="${i}">${gscEsc(x.name)}${c ? `<em>${c}</em>` : ''}</button>`; }).join('')}</div><div class="grow"></div>
          <button class="sm" type="button" data-all="1">${gscEsc(this._t('all'))}</button><button class="sm" type="button" data-none="1">${gscEsc(this._t('none'))}</button></div>`
        : `<div class="row"><div class="grow"></div><button class="sm" type="button" data-all="1">${gscEsc(this._t('all'))}</button><button class="sm" type="button" data-none="1">${gscEsc(this._t('none'))}</button></div>`)
      + (rm ? (groups[ri].length ? `<span class="sub">${gscEsc(this._t('lgroups'))}</span><div class="row">${groups[ri].map(gchip).join('')}</div>` : '')
        + `<span class="sub">${gscEsc(this._t('singles'))}</span><div class="row">${rm.lights.map(chip).join('')}</div>` : '')
      + `</div>`;
    if (this._keys.lights !== lightsHtml) { this._keys.lights = lightsHtml; r.querySelector('.lights').innerHTML = lightsHtml; }

    // actieve sfeer: een lopende dynamische, anders de laatste die je koos
    const presets = (this._data && this._data.presets) || [];
    const dyn = this._activeDyn();
    const last = this._last || gscStore('last');
    const actId = dyn ? dyn.parameters.preset_id : last && Date.now() - last.at < 6 * 3600000 ? last.id : null;
    const ap = presets.find((p) => p.id === actId);
    const act = r.querySelector('.act');
    act.hidden = !ap;
    if (ap) {
      const col = ap.cols[0] || GSC_C;
      act.style.setProperty('--a', col);
      act.classList.toggle('dyn', !!dyn);
      act.querySelector('.sw').style.background = ap.img ? `url("${ap.img}") center / cover` : `linear-gradient(135deg, ${ap.cols.map((c) => 'rgb(' + c + ')').join(', ')})`;
      act.querySelector('b').textContent = ap.name;
      const n = dyn ? (dyn.parameters.light_entity_ids || []).length : (last.lights || []).length;
      act.querySelector('.tx span').textContent = (dyn ? this._t('dyn_info', { n: dyn.interval }) : '') + this._t('n_lights', { n });
      const stop = act.querySelector('.stop');
      stop.hidden = !(dyn || (last && last.dyn && last.id === actId));
      stop.textContent = this._t('stop');
    }
    r.querySelector('.toast').textContent = this._toast || '';

    // sferen
    const favs = this._favs();
    const grpOf = (p) => GSC_GROUP[p.cat] || 'custom';
    const present = this._data ? new Set(this._data.presets.map(grpOf)) : new Set();
    const cats = GSC_ORDER.filter((g) => present.has(g));
    if (!s.cat || (s.cat !== '__fav' && !cats.includes(s.cat))) s.cat = favs.length ? '__fav' : cats[0] || '__fav';
    const catName = (c) => (GSC_I18N[this._lang()].groups || GSC_I18N.en.groups)[c] || c;
    const tabs = [`<button class="tab${s.cat === '__fav' ? ' on' : ''}" type="button" data-c="__fav">★ ${gscEsc(this._t('favorites'))}</button>`]
      .concat(cats.map((c) => `<button class="tab${s.cat === c ? ' on' : ''}" type="button" data-c="${gscEsc(c)}">${gscEsc(catName(c))}</button>`)).join('');
    if (this._keys.tabs !== tabs) { this._keys.tabs = tabs; r.querySelector('.tabs').innerHTML = tabs; }
    let grid;
    if (this._err) grid = `<div class="msg">${gscEsc(this._t('no_plugin'))}</div>`;
    else if (!this._data) grid = `<div class="msg">${gscEsc(this._t('loading'))}</div>`;
    else {
      const list = s.cat === '__fav' ? presets.filter((p) => favs.some((f) => p.id.startsWith(f))) : presets.filter((p) => grpOf(p) === s.cat);
      grid = !list.length ? `<div class="msg">${gscEsc(this._t('no_favs'))}</div>` : list.map((p) => {
        const fav = favs.some((f) => p.id.startsWith(f));
        const bg = (p.img ? `url('${p.img}') center / cover, ` : '') + (p.cols.length > 1 ? `linear-gradient(135deg, ${p.cols.map((c) => 'rgb(' + c + ')').join(', ')})` : `rgb(${p.cols[0] || GSC_C})`);
        return `<button class="tile${p.id === actId ? ' on' : ''}" type="button" data-id="${gscEsc(p.id)}" style="--t:${p.cols[0] || GSC_C}"><span class="im" style="background:${gscEsc(bg)}"><span class="star${fav ? ' on' : ''}" role="button">${fav ? '★' : '☆'}</span></span><span class="nm">${gscEsc(p.name)}</span></button>`;
      }).join('');
    }
    if (this._keys.grid !== grid) { this._keys.grid = grid; r.querySelector('.grid').innerHTML = grid; }

    // instellingen
    r.querySelector('.lb').textContent = this._t('brightness') + ' · ' + (s.ownBri ? s.bri + '%' : this._t('as_scene'));
    const rb = r.querySelector('[data-r="bri"]');
    rb.classList.toggle('off', !s.ownBri);
    rb.querySelector('span').style.width = s.bri + '%';
    const ob = r.querySelector('.ob');
    ob.classList.toggle('on', s.ownBri);
    ob.textContent = this._t(s.ownBri ? 'own_bri' : 'scene_bri');
    r.querySelector('.lt').textContent = this._t('transition') + ' · ' + s.tr + ' s';
    r.querySelector('[data-r="tr"] span').style.width = (s.tr * 10) + '%';
    const shf = r.querySelector('.shf');
    shf.classList.toggle('on', s.shuffle);
    shf.textContent = '🔀 ' + this._t('shuffle');
    r.querySelector('.sw2').classList.toggle('on', s.dyn);
    r.querySelector('.dynt b').textContent = this._t('dynamic');
    r.querySelector('.dynt span').textContent = this._t('dynamic_sub');
    r.querySelector('.iv').hidden = !s.dyn;
    r.querySelector('.li').textContent = this._t('every', { n: s.iv + ' s' });
    r.querySelector('[data-r="iv"] span').style.width = (s.iv / 300 * 100) + '%';
  }
}

class GlowScenesCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._render(); }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = gscLang(this._hass, this._config.language);
    const t = (k) => gscT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gscT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length)) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.glow === 15) delete v.glow;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      ...(Array.isArray(this._config.rooms) ? [] : [{ name: 'areas', selector: { area: { multiple: true } } }]),
      { name: 'favorites_entity', selector: { entity: { domain: 'input_text' } } },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GSC_LANG_NAMES).map((k) => ({ value: k, label: GSC_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-scenes-card')) customElements.define('glow-scenes-card', GlowScenesCard);
if (!customElements.get('glow-scenes-card-editor')) customElements.define('glow-scenes-card-editor', GlowScenesCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-scenes-card')) {
  window.customCards.push({ type: 'glow-scenes-card', name: 'Glow Scenes Card', description: gscT(gscLang(null), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}
