/*
 * Glow Doorbell Card
 * Live beeld van de deurbel, wanneer er het laatst gebeld werd en wat de camera's
 * vandaag zagen. Wordt er aangebeld, dan springt op elke view van het dashboard
 * een popup open met het live beeld (ook als deze kaart niet in beeld is).
 */

const GDB_I18N = {
  nl: {
    doorbell: 'Deurbel', live: 'Live', watch: 'Live bekijken', last: 'Laatst aangebeld om {t}', last_day: 'Laatst aangebeld {d} om {t}', fresh: 'Net aangebeld om {t}', never: 'Nog niet aangebeld',
    today: 'Vandaag', nothing: 'Nog niets gebeurd vandaag', ringing: 'Er wordt aangebeld', close: 'Sluiten', live_view: 'Live beeld',
    ev_ring: 'Aangebeld', ev_person: 'Persoon', ev_vehicle: 'Voertuig', ev_animal: 'Dier', ev_motion: 'Beweging', ev_package: 'Pakje', ev_sound: 'Geluid', ev_open: 'Geopend',
    err: 'Vul "camera" in met de camera van je deurbel.',
    l_camera: 'Camera van de deurbel', l_event: 'Deurbel (event-entiteit)', l_name: 'Naam', l_timeline: 'Gebeurtenissen (camera\'s en sensoren)', l_popup: 'Popup tonen bij aanbellen (op elke view)', l_popup_time: 'Popup sluit na (seconden)', l_wake: 'Scherm aanzetten (schakelaar van de tablet)', l_live: 'Live beeld in de kaart', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Deurbel met live beeld, gebeurtenissen van je camera\'s en een popup bij aanbellen.',
  },
  en: {
    doorbell: 'Doorbell', live: 'Live', watch: 'Watch live', last: 'Last rang at {t}', last_day: 'Last rang {d} at {t}', fresh: 'Just rang at {t}', never: 'No rings yet',
    today: 'Today', nothing: 'Nothing happened yet today', ringing: 'Someone is at the door', close: 'Close', live_view: 'Live view',
    ev_ring: 'Doorbell', ev_person: 'Person', ev_vehicle: 'Vehicle', ev_animal: 'Animal', ev_motion: 'Motion', ev_package: 'Package', ev_sound: 'Sound', ev_open: 'Opened',
    err: 'Fill in "camera" with your doorbell camera.',
    l_camera: 'Doorbell camera', l_event: 'Doorbell (event entity)', l_name: 'Name', l_timeline: 'Events (cameras and sensors)', l_popup: 'Show a popup when someone rings (on every view)', l_popup_time: 'Popup closes after (seconds)', l_wake: 'Turn the screen on (tablet switch)', l_live: 'Live video in the card', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Doorbell with live video, camera events and a popup when someone rings.',
  },
  fr: {
    doorbell: 'Sonnette', live: 'Direct', watch: 'Voir en direct', last: 'Dernier coup de sonnette à {t}', last_day: 'Dernier coup de sonnette {d} à {t}', fresh: 'On vient de sonner à {t}', never: 'Pas encore sonné',
    today: 'Aujourd\'hui', nothing: 'Rien aujourd\'hui', ringing: 'On sonne à la porte', close: 'Fermer', live_view: 'En direct',
    ev_ring: 'Sonnette', ev_person: 'Personne', ev_vehicle: 'Véhicule', ev_animal: 'Animal', ev_motion: 'Mouvement', ev_package: 'Colis', ev_sound: 'Son', ev_open: 'Ouvert',
    err: 'Renseignez "camera" avec la caméra de la sonnette.',
    l_camera: 'Caméra de la sonnette', l_event: 'Sonnette (entité event)', l_name: 'Nom', l_timeline: 'Événements', l_popup: 'Afficher une fenêtre quand on sonne', l_popup_time: 'Fermer après (secondes)', l_wake: 'Allumer l\'écran (interrupteur de la tablette)', l_live: 'Vidéo en direct dans la carte', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Sonnette avec vidéo en direct, événements des caméras et fenêtre quand on sonne.',
  },
  de: {
    doorbell: 'Türklingel', live: 'Live', watch: 'Live ansehen', last: 'Zuletzt geklingelt um {t}', last_day: 'Zuletzt geklingelt {d} um {t}', fresh: 'Gerade geklingelt um {t}', never: 'Noch nicht geklingelt',
    today: 'Heute', nothing: 'Heute noch nichts passiert', ringing: 'Es klingelt', close: 'Schließen', live_view: 'Livebild',
    ev_ring: 'Geklingelt', ev_person: 'Person', ev_vehicle: 'Fahrzeug', ev_animal: 'Tier', ev_motion: 'Bewegung', ev_package: 'Paket', ev_sound: 'Geräusch', ev_open: 'Geöffnet',
    err: 'Gib unter "camera" die Kamera der Türklingel an.',
    l_camera: 'Kamera der Türklingel', l_event: 'Türklingel (Event-Entität)', l_name: 'Name', l_timeline: 'Ereignisse', l_popup: 'Popup beim Klingeln (auf jeder Ansicht)', l_popup_time: 'Popup schließt nach (Sekunden)', l_wake: 'Bildschirm einschalten (Schalter des Tablets)', l_live: 'Livebild in der Karte', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Türklingel mit Livebild, Kameraereignissen und Popup beim Klingeln.',
  },
  es: {
    doorbell: 'Timbre', live: 'En directo', watch: 'Ver en directo', last: 'Último timbre a las {t}', last_day: 'Último timbre {d} a las {t}', fresh: 'Acaban de llamar a las {t}', never: 'Aún no han llamado',
    today: 'Hoy', nothing: 'Hoy aún no ha pasado nada', ringing: 'Llaman a la puerta', close: 'Cerrar', live_view: 'En directo',
    ev_ring: 'Timbre', ev_person: 'Persona', ev_vehicle: 'Vehículo', ev_animal: 'Animal', ev_motion: 'Movimiento', ev_package: 'Paquete', ev_sound: 'Sonido', ev_open: 'Abierto',
    err: 'Indica en "camera" la cámara del timbre.',
    l_camera: 'Cámara del timbre', l_event: 'Timbre (entidad event)', l_name: 'Nombre', l_timeline: 'Eventos', l_popup: 'Ventana al llamar (en cada vista)', l_popup_time: 'Cerrar tras (segundos)', l_wake: 'Encender la pantalla (interruptor de la tableta)', l_live: 'Vídeo en directo en la tarjeta', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Timbre con vídeo en directo, eventos de cámaras y ventana al llamar.',
  },
  it: {
    doorbell: 'Campanello', live: 'Diretta', watch: 'Guarda in diretta', last: 'Ultima chiamata alle {t}', last_day: 'Ultima chiamata {d} alle {t}', fresh: 'Hanno appena suonato alle {t}', never: 'Nessuna chiamata',
    today: 'Oggi', nothing: 'Oggi non è ancora successo nulla', ringing: 'Suonano alla porta', close: 'Chiudi', live_view: 'In diretta',
    ev_ring: 'Campanello', ev_person: 'Persona', ev_vehicle: 'Veicolo', ev_animal: 'Animale', ev_motion: 'Movimento', ev_package: 'Pacco', ev_sound: 'Suono', ev_open: 'Aperto',
    err: 'Indica in "camera" la telecamera del campanello.',
    l_camera: 'Telecamera del campanello', l_event: 'Campanello (entità event)', l_name: 'Nome', l_timeline: 'Eventi', l_popup: 'Finestra quando suonano (in ogni vista)', l_popup_time: 'Chiudi dopo (secondi)', l_wake: 'Accendi lo schermo (interruttore del tablet)', l_live: 'Video in diretta nella scheda', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Campanello con video in diretta, eventi delle telecamere e finestra quando suonano.',
  },
};
const GDB_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
function gdbLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GDB_I18N[l] ? l : 'en';
}
function gdbT(lang, key, vars) {
  let s = (GDB_I18N[lang] && GDB_I18N[lang][key]) || GDB_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gdbEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
const gdbHM = (t) => { const d = new Date(t); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };

const GDB_C = '255, 224, 138';
const GDB_KIND = {
  ring: { c: '255, 224, 138', i: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>' },
  person: { c: '185, 168, 255', i: '<circle cx="12" cy="6" r="3"/><path d="M6 21v-3a6 6 0 0 1 12 0v3"/>' },
  vehicle: { c: '142, 197, 255', i: '<path d="M5 17h14v-4l-2-5H7l-2 5z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/>' },
  animal: { c: '142, 227, 214', i: '<circle cx="7" cy="9" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="17" cy="9" r="2"/><path d="M8 17c0-3 2-5 4-5s4 2 4 5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z"/>' },
  package: { c: '255, 184, 153', i: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>' },
  sound: { c: '255, 159, 191', i: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>' },
  open: { c: '255, 184, 153', i: '<path d="M4 21V4a1 1 0 0 1 1-1h10l4 2v16"/><circle cx="12" cy="12" r="1"/>' },
  motion: { c: '255, 159, 191', i: '<circle cx="13" cy="4" r="2"/><path d="m8 21 3-6 3 2v4M7 12l3-4 4 1 3 3"/>' },
};
const GDB_BELL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${GDB_KIND.ring.i}</svg>`;
// soort gebeurtenis uit de naam of de klasse van de entiteit
function gdbKind(id, s) {
  const a = (s && s.attributes) || {};
  const txt = (id + ' ' + (a.friendly_name || '')).toLowerCase();
  if (a.device_class === 'doorbell' || /\bbel\b|doorbell|ring|klingel|sonnette/.test(txt)) return 'ring';
  if (/persoon|person|personne/.test(txt)) return 'person';
  if (/voertuig|vehicle|auto\b|car\b|fahrzeug|véhicule/.test(txt)) return 'vehicle';
  if (/dier|animal|pet|tier/.test(txt)) return 'animal';
  if (/pakje|pakket|package|paket|colis/.test(txt)) return 'package';
  if (/geluid|sound|audio/.test(txt)) return 'sound';
  if (['door', 'window', 'opening', 'garage_door'].includes(a.device_class)) return 'open';
  return 'motion';
}

const GDB_STYLE = `
  :host { display: block; }
  ha-card {
    display: flex; flex-direction: column; gap: 16px; position: relative; overflow: hidden; box-sizing: border-box; padding: 18px;
    border-radius: var(--ha-card-border-radius, 28px); color: var(--glow-text, #F3F1FA);
    background: linear-gradient(rgba(var(--c), 0.04), rgba(var(--c), 0.04)), var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.35); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.22); transition: border-color 0.5s, box-shadow 0.5s, background 0.5s;
  }
  ha-card.fresh { border-color: rgba(var(--c), 0.6); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.45); background: linear-gradient(rgba(var(--c), 0.1), rgba(var(--c), 0.1)), var(--glow-card-background, #15121F); }
  .halo { position: absolute; right: -60px; top: -80px; width: 260px; height: 260px; border-radius: 50%; filter: blur(60px); background: rgb(var(--c)); opacity: 0.2; pointer-events: none; transition: opacity 0.5s; }
  ha-card.fresh .halo { opacity: 0.45; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; }
  .cam { position: relative; aspect-ratio: 16 / 9; max-height: 420px; border-radius: 22px; overflow: hidden; cursor: pointer; background: #1E1A2C; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.25); }
  .cam .media { position: absolute; inset: 0; }
  .cam img, .cam ha-camera-stream { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
  .cam ha-camera-stream { --video-max-height: 100%; }
  .cam .shade { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 65%, rgba(10, 8, 18, 0.6)); pointer-events: none; }
  .cam .ph { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.35; }
  .cam .ph svg { width: 56px; height: 56px; }
  .chipl { position: absolute; left: 14px; top: 14px; height: 28px; padding: 0 12px; border-radius: 14px; display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 800; background: rgba(28, 23, 48, 0.7); color: #fff; }
  .chipl i { width: 8px; height: 8px; border-radius: 4px; background: #FF808C; box-shadow: 0 0 8px #FF808C; animation: gdb-live 1.4s ease-in-out infinite; }
  @keyframes gdb-live { 50% { opacity: 0.35; } }
  .cn { position: absolute; left: 16px; bottom: 14px; font-size: 1.15rem; font-weight: 800; color: #fff; }
  .ct { position: absolute; right: 16px; bottom: 14px; font-size: 1rem; font-weight: 800; color: rgba(255,255,255,0.85); font-variant-numeric: tabular-nums; }
  .bar { position: relative; display: flex; align-items: center; gap: 14px; }
  .bi { width: 52px; height: 52px; border-radius: 26px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgba(var(--c), 0.16); color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); transition: all 0.5s; }
  .bi svg { width: 26px; height: 26px; }
  ha-card.fresh .bi { background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.8); }
  .tx { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .nm { font-size: 1.3rem; font-weight: 800; }
  .ls { font-size: 0.95rem; font-weight: 700; opacity: 0.62; }
  ha-card.fresh .ls { opacity: 1; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .watch { height: 48px; padding: 0 18px; border-radius: 16px; font-size: 0.95rem; font-weight: 800; border: 1px solid rgba(var(--c), 0.5); background: rgba(var(--c), 0.14); color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); flex-shrink: 0; }
  .tl { position: relative; display: flex; flex-direction: column; gap: 8px; }
  .tl:empty { display: none; }
  .st { font-size: 0.85rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .ev { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 16px; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .ev .d { width: 38px; height: 38px; border-radius: 19px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgba(var(--k), 0.2); box-shadow: 0 0 10px rgba(var(--k), 0.25); color: color-mix(in srgb, rgb(var(--k)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .ev .d svg { width: 20px; height: 20px; }
  .ev .t { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .ev .t b { font-size: 1rem; font-weight: 800; }
  .ev .t span { font-size: 0.82rem; font-weight: 700; opacity: 0.6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ev .h { font-size: 0.95rem; font-weight: 800; opacity: 0.6; font-variant-numeric: tabular-nums; }
  .none { padding: 12px; font-weight: 700; opacity: 0.55; text-align: center; }
`;

const GDB_POP_STYLE = `
  .veil { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box;
    background: rgba(10, 8, 18, 0.6); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); font-family: var(--paper-font-body1_-_font-family, Nunito, system-ui, sans-serif); }
  .pop { width: min(760px, 100%); box-sizing: border-box; padding: 22px; border-radius: 30px; display: flex; flex-direction: column; gap: 18px; color: var(--glow-text, #F3F1FA);
    background: var(--glow-card-background, #1A1626); border: 1px solid rgba(${GDB_C}, 0.6); box-shadow: 0 0 calc(var(--glow, 15px) * 2.4) rgba(${GDB_C}, 0.45); }
  .hd { display: flex; align-items: center; gap: 16px; }
  .bell { position: relative; width: 64px; height: 64px; flex-shrink: 0; }
  .bell .w { position: absolute; inset: 0; border-radius: 32px; border: 3px solid rgba(${GDB_C}, 0.8); animation: gdb-ring 1.6s ease-out infinite; }
  .bell .w2 { animation-delay: 0.8s; }
  .bell .c { position: absolute; inset: 0; border-radius: 32px; display: flex; align-items: center; justify-content: center; color: #1C1730; background: rgb(${GDB_C}); box-shadow: 0 0 calc(var(--glow, 15px) * 1.5) rgba(${GDB_C}, 0.9); }
  .bell svg { width: 30px; height: 30px; animation: gdb-shake 1.2s ease-in-out infinite; transform-origin: 50% 10%; }
  .pop.view .bell .w, .pop.view .bell svg { animation: none; opacity: 0; }
  .pop.view .bell svg { opacity: 1; }
  @keyframes gdb-ring { 0% { transform: scale(0.85); opacity: 0.9; } 100% { transform: scale(1.9); opacity: 0; } }
  @keyframes gdb-shake { 0%, 100% { transform: rotate(0); } 15% { transform: rotate(14deg); } 30% { transform: rotate(-12deg); } 45% { transform: rotate(9deg); } 60% { transform: rotate(-6deg); } 75% { transform: rotate(3deg); } }
  .ti { flex: 1; display: flex; flex-direction: column; }
  .ti b { font-size: 1.7rem; font-weight: 800; line-height: 1.1; }
  .ti span { font-size: 1rem; font-weight: 700; opacity: 0.62; }
  .cam { position: relative; aspect-ratio: 4 / 3; max-height: 62vh; border-radius: 22px; overflow: hidden; background: #1E1A2C; }
  .cam img, .cam ha-camera-stream { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
  .cam ha-camera-stream { --video-max-height: 100%; }
  .chipl { position: absolute; left: 14px; top: 14px; height: 28px; padding: 0 12px; border-radius: 14px; display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 800; background: rgba(28, 23, 48, 0.7); color: #fff; z-index: 1; }
  .chipl i { width: 8px; height: 8px; border-radius: 4px; background: #FF808C; box-shadow: 0 0 8px #FF808C; }
  .close { height: 60px; border-radius: 20px; font: inherit; font-size: 1.1rem; font-weight: 800; cursor: pointer; color: inherit; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .rail { height: 6px; border-radius: 3px; background: var(--glow-surface, rgba(255,255,255,0.07)); overflow: hidden; }
  .rail div { height: 100%; width: 100%; border-radius: 3px; background: rgb(${GDB_C}); box-shadow: 0 0 8px rgba(${GDB_C}, 0.8); transform-origin: left; }
`;

// live beeld (of anders een foto die om de paar seconden vernieuwt) in een vak zetten
function gdbMountCam(box, hass, entity, live) {
  const s = hass.states[entity];
  if (!s) return null;
  if (live !== false && customElements.get('ha-camera-stream')) {
    const v = document.createElement('ha-camera-stream');
    v.hass = hass; v.stateObj = s; v.muted = true; v.controls = false; v.allowExoPlayer = false;
    box.appendChild(v);
    return { update: (h) => { v.hass = h; v.stateObj = h.states[entity]; }, stop: () => {} };
  }
  const img = new Image();
  img.alt = '';
  const load = (h) => { const st = h.states[entity]; const pic = st && st.attributes.entity_picture; if (pic) img.src = pic + (pic.includes('?') ? '&' : '?') + '_t=' + Date.now(); };
  let cur = hass;
  load(hass);
  box.appendChild(img);
  const iv = setInterval(() => load(cur), 5000);
  return { update: (h) => { cur = h; }, stop: () => clearInterval(iv) };
}

// ---- popup bij aanbellen, over het hele dashboard ----
const GDB = (window.__glowDoorbell = window.__glowDoorbell || { hass: null, dash: null, cfgs: [], unsub: null, pop: null, seen: {} });

function gdbOpenPopup(cfg, mode) {
  const hass = GDB.hass;
  if (!hass) return;
  gdbClosePopup();
  const lang = gdbLang(hass, cfg.language);
  const t = (k, v) => gdbT(lang, k, v);
  const host = document.createElement('div');
  host.className = 'glow-doorbell-popup';
  const src = document.querySelector('glow-doorbell-card') || document.querySelector('glow-navbar-card') || document.body;
  const cs = getComputedStyle(src);
  ['--glow-text', '--glow-card-background', '--glow-surface', '--glow-border', '--glow-ink', '--glow-ink-amount'].forEach((v) => { const x = cs.getPropertyValue(v); if (x) host.style.setProperty(v, x); });
  host.style.setProperty('--glow', (parseInt(cfg.glow ?? 15, 10) || 0) + 'px');
  const sh = host.attachShadow({ mode: 'open' });
  const secs = Math.max(10, parseInt(cfg.popup_time, 10) || 60);
  const ringing = mode === 'ring';
  const name = cfg.name || (hass.states[cfg.camera] && hass.states[cfg.camera].attributes.friendly_name) || t('doorbell');
  sh.innerHTML = `<style>${GDB_POP_STYLE}</style>
    <div class="veil"><div class="pop${ringing ? '' : ' view'}">
      <div class="hd"><div class="bell"><span class="w"></span><span class="w w2"></span><span class="c">${GDB_BELL}</span></div>
        <div class="ti"><b>${gdbEsc(ringing ? t('ringing') : name)}</b><span>${gdbEsc(ringing ? name + ' · ' + gdbHM(Date.now()) : t('live_view'))}</span></div></div>
      <div class="cam"><span class="chipl"><i></i>${gdbEsc(t('live').toUpperCase())}</span></div>
      <button class="close" type="button">${gdbEsc(t('close'))}</button>
      <div class="rail"><div></div></div>
    </div></div>`;
  const cam = gdbMountCam(sh.querySelector('.cam'), hass, cfg.camera, true);
  const fill = sh.querySelector('.rail div');
  fill.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration: secs * 1000, easing: 'linear', fill: 'forwards' });
  const close = () => gdbClosePopup();
  sh.querySelector('.close').addEventListener('click', close);
  sh.querySelector('.veil').addEventListener('click', (e) => { if (e.target.classList.contains('veil')) close(); });
  document.body.appendChild(host);
  GDB.pop = { host, cam, timer: setTimeout(close, secs * 1000) };
}
function gdbClosePopup() {
  const p = GDB.pop;
  if (!p) return;
  clearTimeout(p.timer);
  if (p.cam) p.cam.stop();
  p.host.remove();
  GDB.pop = null;
}
function gdbRing(cfg) {
  // scherm van de tablet aanzetten: Fully Kiosk in de browser, of een schakelaar in Home Assistant
  try {
    if (window.fully) {
      if (window.fully.turnScreenOn) window.fully.turnScreenOn();
      if (window.fully.stopScreensaver) window.fully.stopScreensaver();
    }
  } catch (e) { /* geen Fully */ }
  if (cfg.wake && GDB.hass && GDB.hass.states[cfg.wake]) {
    const [d] = cfg.wake.split('.');
    GDB.hass.callService(d === 'button' ? 'button' : 'homeassistant', d === 'button' ? 'press' : 'turn_on', { entity_id: cfg.wake });
  }
  gdbOpenPopup(cfg, 'ring');
}

// dashboardconfiguratie lezen en luisteren naar de deurbel (één keer per dashboard)
function gdbWatch(hass) {
  if (!hass || !hass.connection) return;
  GDB.hass = hass;
  if (GDB.pop && GDB.pop.cam) GDB.pop.cam.update(hass);
  const dash = window.location.pathname.split('/').filter(Boolean)[0] || 'lovelace';
  if (GDB.dash === dash || GDB.loading) return;
  GDB.loading = true;
  hass.callWS({ type: 'lovelace/config', url_path: dash === 'lovelace' ? null : dash })
    .then((cfg) => {
      const found = [];
      const walk = (n) => {
        if (!n || typeof n !== 'object') return;
        if (Array.isArray(n)) { n.forEach(walk); return; }
        if (n.type === 'custom:glow-doorbell-card' && n.popup !== false && n.camera) found.push(n);
        ['views', 'sections', 'cards', 'card'].forEach((k) => { if (n[k]) walk(n[k]); });
      };
      walk(cfg && cfg.views);
      GDB.cfgs = found;
      GDB.dash = dash;
      if (GDB.unsub) { GDB.unsub(); GDB.unsub = null; }
      if (!found.length) return null;
      return hass.connection.subscribeEvents((ev) => {
        const d = ev.data || {};
        const c = GDB.cfgs.find((x) => gdbEvent(GDB.hass, x) === d.entity_id);
        if (!c || !d.new_state) return;
        const ns = d.new_state.state;
        const os = d.old_state && d.old_state.state;
        // een event-entiteit krijgt bij elke druk een nieuwe tijd; een binaire sensor gaat naar 'on'
        const isEvent = d.entity_id.startsWith('event.');
        const rang = isEvent ? ns !== os && !['unknown', 'unavailable'].includes(ns) && os !== 'unavailable' : ns === 'on' && os === 'off';
        if (!rang || GDB.seen[d.entity_id] === ns) return;
        GDB.seen[d.entity_id] = ns;
        gdbRing(c);
      }, 'state_changed').then((u) => { GDB.unsub = u; });
    })
    .catch(() => { /* geen toegang tot de configuratie */ })
    .finally(() => { GDB.loading = false; });
}
function gdbEvent(hass, cfg) {
  if (cfg.event) return cfg.event;
  const st = (hass && hass.states) || {};
  const base = String(cfg.camera || '').split('.')[1] || '';
  const all = Object.keys(st).filter((e) => (e.startsWith('event.') || e.startsWith('binary_sensor.')) && (st[e].attributes.device_class === 'doorbell' || /_(bel|doorbell|ring)$/.test(e)));
  return all.find((e) => e.includes(base)) || all[0] || null;
}
window.glowDoorbellWatch = gdbWatch;

class GlowDoorbellCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._built = false; this._hist = null; }
  static getConfigElement() { return document.createElement('glow-doorbell-card-editor'); }
  static getStubConfig(hass) {
    const st = (hass && hass.states) || {};
    const ev = Object.keys(st).find((e) => e.startsWith('event.') && st[e].attributes.device_class === 'doorbell');
    const cam = Object.keys(st).find((e) => e.startsWith('camera.') && /voordeur|door|bel/i.test(e + (st[e].attributes.friendly_name || '')));
    return { camera: cam || Object.keys(st).find((e) => e.startsWith('camera.')) || '', ...(ev ? { event: ev } : {}) };
  }
  setConfig(config) {
    if (!config || !config.camera) throw new Error(gdbT(gdbLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, popup: true, popup_time: 60, live: true, ...config };
    this._built = false;
    this._hist = null; this._histAt = 0;
    if (this._hass) this._render();
  }
  set hass(hass) { this._hass = hass; gdbWatch(hass); if (this._config) this._render(); }
  get hass() { return this._hass; }
  getCardSize() { return 9; }
  getGridOptions() { return { columns: 12, rows: 'auto', min_columns: 6 }; }
  connectedCallback() { clearInterval(this._tick); this._tick = setInterval(() => { if (this._hass) this._render(); }, 30000); }
  disconnectedCallback() { clearInterval(this._tick); if (this._cam) { this._cam.stop(); this._cam = null; } this._built = false; }

  _lang() { return gdbLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gdbT(this._lang(), k, v); }

  // welke entiteiten in de tijdlijn komen: ingesteld, of de bel + detectie van camera's
  _timeline() {
    const st = this._hass.states;
    if (Array.isArray(this._config.timeline)) return this._config.timeline.map((x) => (typeof x === 'string' ? { entity: x } : x)).filter((x) => x && st[x.entity]);
    const ev = gdbEvent(this._hass, this._config);
    const list = ev ? [{ entity: ev }] : [];
    Object.keys(st).forEach((e) => {
      const a = st[e].attributes;
      if (e === ev) return;
      if (e.startsWith('binary_sensor.') && /camera|cam\b|deurbel|doorbell/i.test(e + ' ' + (a.friendly_name || '')) && /persoon|person|voertuig|vehicle|dier|animal|pakje|package/i.test(e)) list.push({ entity: e });
    });
    return list.slice(0, 12);
  }

  _loadHistory() {
    if (!this._hass.callApi || (this._histAt && Date.now() - this._histAt < 60000)) return;
    this._histAt = Date.now();
    const ids = this._timeline().map((x) => x.entity);
    if (!ids.length) { this._hist = []; return; }
    const d0 = new Date(); d0.setHours(0, 0, 0, 0);
    // vanaf gisteren, zodat we ook de laatste keer aanbellen kennen
    const start = new Date(d0.getTime() - 86400000 * 7).toISOString();
    this._hass.callApi('GET', `history/period/${start}?filter_entity_id=${encodeURIComponent(ids.join(','))}&minimal_response&no_attributes`)
      .then((res) => {
        const out = [];
        (res || []).forEach((rows) => {
          if (!rows || !rows.length) return;
          const id = rows[0].entity_id;
          const isEv = id.startsWith('event.');
          for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            const s = r.state ?? r.s;
            const tt = r.last_changed ? Date.parse(r.last_changed) : r.lc ? r.lc * 1000 : r.last_updated ? Date.parse(r.last_updated) : (r.lu || 0) * 1000;
            const prev = i ? (rows[i - 1].state ?? rows[i - 1].s) : null;
            if (isEv) {
              if (!['unknown', 'unavailable', ''].includes(s) && s !== prev) { const at = Date.parse(s); out.push({ id, t: isNaN(at) ? tt : at }); }
            } else if (s === 'on' && prev !== 'on' && i) out.push({ id, t: tt });
          }
        });
        this._hist = out.sort((a, b) => b.t - a.t);
      })
      .catch(() => { this._hist = []; })
      .finally(() => { this._key = null; this._render(); });
  }

  _build() {
    this.shadowRoot.innerHTML = `
      <style>${GDB_STYLE}</style>
      <ha-card>
        <div class="halo"></div>
        <div class="cam"><div class="ph">${GDB_BELL}</div><div class="media"></div><div class="shade"></div><span class="chipl"><i></i>${gdbEsc(this._t('live').toUpperCase())}</span><span class="cn"></span><span class="ct"></span></div>
        <div class="bar"><div class="bi">${GDB_BELL}</div><div class="tx"><span class="nm"></span><span class="ls"></span></div><button class="watch" type="button">${gdbEsc(this._t('watch'))}</button></div>
        <div class="tl"></div>
      </ha-card>`;
    const r = this.shadowRoot;
    this._card = r.querySelector('ha-card');
    const open = () => gdbOpenPopup(this._config, 'view');
    r.querySelector('.cam').addEventListener('click', open);
    r.querySelector('.watch').addEventListener('click', open);
    if (this._cam) this._cam.stop();
    this._cam = gdbMountCam(r.querySelector('.media'), this._hass, this._config.camera, this._config.live);
    if (this._cam) r.querySelector('.ph').style.display = 'none';
    this._built = true;
    this._builtLang = this._lang();
    this._key = null;
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    const c = this._config;
    const st = this._hass.states;
    const r = this.shadowRoot;
    if (this._cam) this._cam.update(this._hass);
    this._loadHistory();
    const camS = st[c.camera];
    const name = c.name || (camS && camS.attributes.friendly_name) || this._t('doorbell');
    r.querySelector('.cn').textContent = name;
    r.querySelector('.ct').textContent = gdbHM(Date.now());
    r.querySelector('.chipl').style.display = camS && camS.state !== 'unavailable' ? '' : 'none';
    this._card.style.setProperty('--c', GDB_C);
    this._card.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');

    // laatste keer aanbellen
    const ev = gdbEvent(this._hass, c);
    const evS = ev && st[ev];
    let lastT = null;
    if (evS) {
      const at = ev.startsWith('event.') ? Date.parse(evS.state) : evS.state === 'on' ? Date.now() : Date.parse(evS.last_changed);
      if (!isNaN(at)) lastT = at;
    }
    // een nieuwe druk meteen in de lijst zetten, ook voor de geschiedenis opnieuw geladen is
    if (this._hist && ev && evS && ev.startsWith('event.')) {
      const at = Date.parse(evS.state);
      if (!isNaN(at) && !this._hist.some((x) => x.id === ev && Math.abs(x.t - at) < 2000)) { this._hist.unshift({ id: ev, t: at }); this._hist.sort((x, y) => y.t - x.t); }
    }
    const fromHist = (this._hist || []).find((x) => x.id === ev);
    if (fromHist && (!lastT || fromHist.t > lastT)) lastT = fromHist.t;
    const fresh = lastT && Date.now() - lastT < 5 * 60000;
    this._card.classList.toggle('fresh', !!fresh);
    r.querySelector('.nm').textContent = this._t('doorbell');
    let ls = this._t('never');
    if (lastT) {
      const d0 = new Date(); d0.setHours(0, 0, 0, 0);
      if (fresh) ls = this._t('fresh', { t: gdbHM(lastT) });
      else if (lastT >= d0.getTime()) ls = this._t('last', { t: gdbHM(lastT) });
      else {
        let dd;
        try { dd = new Date(lastT).toLocaleDateString(this._lang(), { weekday: 'long', day: 'numeric', month: 'short' }); } catch (e) { dd = ''; }
        ls = this._t('last_day', { d: dd, t: gdbHM(lastT) });
      }
    }
    r.querySelector('.ls').textContent = ls;

    // tijdlijn van vandaag
    const tl = this._timeline();
    const d0 = new Date(); d0.setHours(0, 0, 0, 0);
    const today = (this._hist || []).filter((x) => x.t >= d0.getTime()).slice(0, c.max_events || 6);
    let html = '';
    if (tl.length && this._hist) {
      html = `<span class="st">${gdbEsc(this._t('today'))}</span>` + (today.length ? today.map((x) => {
        const item = tl.find((y) => y.entity === x.id) || { entity: x.id };
        const s = st[x.id];
        const kind = item.kind || gdbKind(x.id, s);
        const k = GDB_KIND[kind] || GDB_KIND.motion;
        const fn = (s && s.attributes.friendly_name) || x.id;
        const label = item.name || this._t('ev_' + kind);
        // de bron: naam van het toestel, zonder het soort gebeurtenis
        const srcName = item.source || fn.replace(/\s*(persoon|person|voertuig|vehicle|dier|animal|bel|doorbell|beweging|motion|pakje|package|geluid|sound)\s*$/i, '').trim() || fn;
        return `<div class="ev" style="--k:${k.c}"><span class="d"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${k.i}</svg></span><span class="t"><b>${gdbEsc(label)}</b><span>${gdbEsc(srcName)}</span></span><span class="h">${gdbHM(x.t)}</span></div>`;
      }).join('') : `<div class="none">${gdbEsc(this._t('nothing'))}</div>`);
    }
    if (this._key !== html) { this._key = html; r.querySelector('.tl').innerHTML = html; }
  }
}

class GlowDoorbellCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._render(); }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = gdbLang(this._hass, this._config.language);
    const t = (k) => gdbT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gdbT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length)) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        [['glow', 15], ['popup', true], ['popup_time', 60], ['live', true]].forEach(([k, d]) => { if (v[k] === d) delete v[k]; });
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    const simpleTl = (this._config.timeline || []).every((x) => typeof x === 'string');
    this._form.schema = [
      { name: 'camera', selector: { entity: { domain: 'camera' } } },
      { name: 'event', selector: { entity: { domain: ['event', 'binary_sensor'] } } },
      { name: 'name', selector: { text: {} } },
      ...(simpleTl ? [{ name: 'timeline', selector: { entity: { domain: ['binary_sensor', 'event'], multiple: true } } }] : []),
      { type: 'grid', name: '', schema: [
        { name: 'popup', selector: { boolean: {} } },
        { name: 'live', selector: { boolean: {} } },
      ] },
      { name: 'popup_time', selector: { number: { min: 10, max: 300, step: 5, mode: 'box', unit_of_measurement: 's' } } },
      { name: 'wake', selector: { entity: { domain: ['switch', 'button', 'light'] } } },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GDB_LANG_NAMES).map((k) => ({ value: k, label: GDB_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, popup: true, popup_time: 60, live: true, language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-doorbell-card')) customElements.define('glow-doorbell-card', GlowDoorbellCard);
if (!customElements.get('glow-doorbell-card-editor')) customElements.define('glow-doorbell-card-editor', GlowDoorbellCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-doorbell-card')) {
  window.customCards.push({ type: 'glow-doorbell-card', name: 'Glow Doorbell Card', description: gdbT(gdbLang(null), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}
