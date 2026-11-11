/*
 * Glow Media Card
 * Wat er speelt, met de hoes en een gloed in de kleur van de hoes, grote bediening,
 * internetradio (favoriete zenders en zoeken), Spotify-afspeellijsten, speakers kiezen
 * en samen laten spelen, een slaaptimer en geluidsmodus of bron.
 * Met layout: compact blijft het een kleine kaart met alleen wat er speelt.
 */

const GMED_I18N = {
  nl: {
    idle: 'Niets aan het spelen', off: 'Uit', unavailable: 'Niet beschikbaar', paused: 'Gepauzeerd', turn_on: 'Aanzetten', turn_off: 'Uitzetten',
    prev: 'Vorige', next: 'Volgende', play: 'Afspelen', pause: 'Pauzeren', mute: 'Geluid uit', volume: 'Volume', shuffle: 'Shuffle', repeat: 'Herhalen',
    radio: 'Radio', spotify: 'Spotify', search_radio: 'Zoek een zender…', live: 'Live', now: 'Nu: {t}', playing: 'Speelt', ready: 'Klaar',
    speakers: 'Speakers', together: 'Samen afspelen', together_on: 'Samen afspelen aan', on_speaker: 'op {n}',
    sleep: 'Slaap', sleep_title: 'Slaaptimer', sleep_sub: 'Muziek stopt vanzelf na…', sleep_left: 'Stopt over {n} min', sleep_cancel: 'Timer uitzetten', min: '{n} min',
    sound: 'Geluid', source: 'Bron', sound_title: 'Geluid en bron', no_fav: 'Zoek een zender en tik op de ster om ze hier te bewaren.',
    searching: 'Zoeken…', no_results: 'Niets gevonden', loading: 'Laden…', no_spotify_dev: '{n} is geen Spotify-apparaat. Kies de tv of soundbar, of open Spotify op die speaker.',
    fav_add: 'Bewaren als favoriet', fav_del: 'Verwijderen uit favorieten', back: 'Terug', close: 'Sluiten',
    err: 'Vul "entities" in met een of meer mediaspelers.',
    l_entities: 'Speakers en spelers', l_spotify: 'Spotify-account', l_stations: 'Favoriete zenders (naam of link)', l_layout: 'Weergave', layout_full: 'Groot (radio, Spotify, speakers)', layout_compact: 'Compact (alleen wat er speelt)', l_name: 'Naam', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Mediakaart met hoes en gloed, internetradio, Spotify, speakers en slaaptimer.',
  },
  en: {
    idle: 'Nothing playing', off: 'Off', unavailable: 'Unavailable', paused: 'Paused', turn_on: 'Turn on', turn_off: 'Turn off',
    prev: 'Previous', next: 'Next', play: 'Play', pause: 'Pause', mute: 'Mute', volume: 'Volume', shuffle: 'Shuffle', repeat: 'Repeat',
    radio: 'Radio', spotify: 'Spotify', search_radio: 'Search a station…', live: 'Live', now: 'Now: {t}', playing: 'Playing', ready: 'Ready',
    speakers: 'Speakers', together: 'Play together', together_on: 'Playing together', on_speaker: 'on {n}',
    sleep: 'Sleep', sleep_title: 'Sleep timer', sleep_sub: 'Music stops by itself after…', sleep_left: 'Stops in {n} min', sleep_cancel: 'Turn timer off', min: '{n} min',
    sound: 'Sound', source: 'Source', sound_title: 'Sound and source', no_fav: 'Search a station and tap the star to keep it here.',
    searching: 'Searching…', no_results: 'Nothing found', loading: 'Loading…', no_spotify_dev: '{n} is not a Spotify device. Pick the TV or soundbar, or open Spotify on that speaker.',
    fav_add: 'Save as favourite', fav_del: 'Remove from favourites', back: 'Back', close: 'Close',
    err: 'Fill in "entities" with one or more media players.',
    l_entities: 'Speakers and players', l_spotify: 'Spotify account', l_stations: 'Favourite stations (name or link)', l_layout: 'Layout', layout_full: 'Large (radio, Spotify, speakers)', layout_compact: 'Compact (only what is playing)', l_name: 'Name', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Media card with artwork and glow, internet radio, Spotify, speakers and a sleep timer.',
  },
  fr: {
    idle: 'Rien en lecture', off: 'Éteint', unavailable: 'Indisponible', paused: 'En pause', turn_on: 'Allumer', turn_off: 'Éteindre',
    prev: 'Précédent', next: 'Suivant', play: 'Lecture', pause: 'Pause', mute: 'Muet', volume: 'Volume', shuffle: 'Aléatoire', repeat: 'Répéter',
    radio: 'Radio', spotify: 'Spotify', search_radio: 'Chercher une station…', live: 'Direct', now: 'En cours : {t}', playing: 'Lecture', ready: 'Prêt',
    speakers: 'Enceintes', together: 'Lire ensemble', together_on: 'Lecture groupée', on_speaker: 'sur {n}',
    sleep: 'Veille', sleep_title: 'Minuterie', sleep_sub: 'La musique s\'arrête après…', sleep_left: 'S\'arrête dans {n} min', sleep_cancel: 'Désactiver', min: '{n} min',
    sound: 'Son', source: 'Source', sound_title: 'Son et source', no_fav: 'Cherchez une station et touchez l\'étoile pour la garder ici.',
    searching: 'Recherche…', no_results: 'Aucun résultat', loading: 'Chargement…', no_spotify_dev: '{n} n\'est pas un appareil Spotify. Choisissez la télé ou la barre de son.',
    fav_add: 'Ajouter aux favoris', fav_del: 'Retirer des favoris', back: 'Retour', close: 'Fermer',
    err: 'Renseignez "entities" avec un ou plusieurs lecteurs.',
    l_entities: 'Enceintes et lecteurs', l_spotify: 'Compte Spotify', l_stations: 'Stations favorites (nom ou lien)', l_layout: 'Affichage', layout_full: 'Grand (radio, Spotify, enceintes)', layout_compact: 'Compact', l_name: 'Nom', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Carte multimédia avec pochette, radio internet, Spotify, enceintes et minuterie.',
  },
  de: {
    idle: 'Es läuft nichts', off: 'Aus', unavailable: 'Nicht verfügbar', paused: 'Pausiert', turn_on: 'Einschalten', turn_off: 'Ausschalten',
    prev: 'Zurück', next: 'Weiter', play: 'Abspielen', pause: 'Pause', mute: 'Stumm', volume: 'Lautstärke', shuffle: 'Zufall', repeat: 'Wiederholen',
    radio: 'Radio', spotify: 'Spotify', search_radio: 'Sender suchen…', live: 'Live', now: 'Jetzt: {t}', playing: 'Spielt', ready: 'Bereit',
    speakers: 'Lautsprecher', together: 'Zusammen abspielen', together_on: 'Spielt zusammen', on_speaker: 'auf {n}',
    sleep: 'Schlaf', sleep_title: 'Sleep-Timer', sleep_sub: 'Musik stoppt von selbst nach…', sleep_left: 'Stoppt in {n} Min.', sleep_cancel: 'Timer aus', min: '{n} Min.',
    sound: 'Klang', source: 'Quelle', sound_title: 'Klang und Quelle', no_fav: 'Sender suchen und auf den Stern tippen, um ihn hier zu behalten.',
    searching: 'Suche…', no_results: 'Nichts gefunden', loading: 'Laden…', no_spotify_dev: '{n} ist kein Spotify-Gerät. Wähle TV oder Soundbar.',
    fav_add: 'Als Favorit speichern', fav_del: 'Aus Favoriten entfernen', back: 'Zurück', close: 'Schließen',
    err: 'Gib unter "entities" einen oder mehrere Mediaplayer an.',
    l_entities: 'Lautsprecher und Player', l_spotify: 'Spotify-Konto', l_stations: 'Lieblingssender (Name oder Link)', l_layout: 'Ansicht', layout_full: 'Groß (Radio, Spotify, Lautsprecher)', layout_compact: 'Kompakt', l_name: 'Name', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Medienkarte mit Cover, Internetradio, Spotify, Lautsprechern und Sleep-Timer.',
  },
  es: {
    idle: 'No se reproduce nada', off: 'Apagado', unavailable: 'No disponible', paused: 'En pausa', turn_on: 'Encender', turn_off: 'Apagar',
    prev: 'Anterior', next: 'Siguiente', play: 'Reproducir', pause: 'Pausa', mute: 'Silencio', volume: 'Volumen', shuffle: 'Aleatorio', repeat: 'Repetir',
    radio: 'Radio', spotify: 'Spotify', search_radio: 'Buscar una emisora…', live: 'En directo', now: 'Ahora: {t}', playing: 'Sonando', ready: 'Listo',
    speakers: 'Altavoces', together: 'Reproducir juntos', together_on: 'Sonando juntos', on_speaker: 'en {n}',
    sleep: 'Dormir', sleep_title: 'Temporizador', sleep_sub: 'La música se para sola tras…', sleep_left: 'Se para en {n} min', sleep_cancel: 'Quitar temporizador', min: '{n} min',
    sound: 'Sonido', source: 'Fuente', sound_title: 'Sonido y fuente', no_fav: 'Busca una emisora y toca la estrella para guardarla aquí.',
    searching: 'Buscando…', no_results: 'Sin resultados', loading: 'Cargando…', no_spotify_dev: '{n} no es un dispositivo Spotify. Elige la tele o la barra de sonido.',
    fav_add: 'Guardar como favorita', fav_del: 'Quitar de favoritas', back: 'Volver', close: 'Cerrar',
    err: 'Indica en "entities" uno o más reproductores.',
    l_entities: 'Altavoces y reproductores', l_spotify: 'Cuenta de Spotify', l_stations: 'Emisoras favoritas (nombre o enlace)', l_layout: 'Vista', layout_full: 'Grande (radio, Spotify, altavoces)', layout_compact: 'Compacta', l_name: 'Nombre', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Tarjeta multimedia con carátula, radio por internet, Spotify, altavoces y temporizador.',
  },
  it: {
    idle: 'Niente in riproduzione', off: 'Spento', unavailable: 'Non disponibile', paused: 'In pausa', turn_on: 'Accendi', turn_off: 'Spegni',
    prev: 'Precedente', next: 'Successivo', play: 'Riproduci', pause: 'Pausa', mute: 'Muto', volume: 'Volume', shuffle: 'Casuale', repeat: 'Ripeti',
    radio: 'Radio', spotify: 'Spotify', search_radio: 'Cerca una stazione…', live: 'Diretta', now: 'Ora: {t}', playing: 'In riproduzione', ready: 'Pronto',
    speakers: 'Altoparlanti', together: 'Riproduci insieme', together_on: 'Riproduzione insieme', on_speaker: 'su {n}',
    sleep: 'Sonno', sleep_title: 'Timer di spegnimento', sleep_sub: 'La musica si ferma da sola dopo…', sleep_left: 'Si ferma tra {n} min', sleep_cancel: 'Disattiva timer', min: '{n} min',
    sound: 'Suono', source: 'Sorgente', sound_title: 'Suono e sorgente', no_fav: 'Cerca una stazione e tocca la stella per tenerla qui.',
    searching: 'Ricerca…', no_results: 'Nessun risultato', loading: 'Caricamento…', no_spotify_dev: '{n} non è un dispositivo Spotify. Scegli la TV o la soundbar.',
    fav_add: 'Salva nei preferiti', fav_del: 'Rimuovi dai preferiti', back: 'Indietro', close: 'Chiudi',
    err: 'Indica in "entities" uno o più lettori.',
    l_entities: 'Altoparlanti e lettori', l_spotify: 'Account Spotify', l_stations: 'Stazioni preferite (nome o link)', l_layout: 'Visualizzazione', layout_full: 'Grande (radio, Spotify, altoparlanti)', layout_compact: 'Compatta', l_name: 'Nome', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Scheda multimediale con copertina, radio internet, Spotify, altoparlanti e timer.',
  },
};
const GMED_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
function gmedLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GMED_I18N[l] ? l : 'en';
}
function gmedT(lang, key, vars) {
  let s = (GMED_I18N[lang] && GMED_I18N[lang][key]) || GMED_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gmedEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
const gmedTime = (s) => { s = Math.max(0, Math.floor(s || 0)); const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const x = String(s % 60).padStart(2, '0'); return h ? h + ':' + String(m).padStart(2, '0') + ':' + x : m + ':' + x; };
function gmedStore(key, val) {
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem('glow-media-' + key) || 'null');
    localStorage.setItem('glow-media-' + key, JSON.stringify(val));
  } catch (e) { /* geen opslag */ }
  return null;
}

const GMED_DEFAULT = '185, 168, 255';
const GMED_PALETTE = ['255, 128, 140', '255, 159, 191', '142, 197, 255', '255, 184, 153', '185, 168, 255', '142, 227, 214', '255, 224, 138'];
const GMED_SVG = (d, fill) => `<svg viewBox="0 0 24 24" ${fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"'}>${d}</svg>`;
const GMED_ICON = {
  prev: GMED_SVG('<path d="M6 5h2.2v14H6z"/><path d="M20 5v14L9.5 12z"/>', true),
  next: GMED_SVG('<path d="M15.8 5H18v14h-2.2z"/><path d="M4 5v14l10.5-7z"/>', true),
  play: GMED_SVG('<path d="M7 4.5v15l12.5-7.5z"/>', true),
  pause: GMED_SVG('<path d="M6.5 5h4v14h-4zM13.5 5h4v14h-4z"/>', true),
  vol: GMED_SVG('<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>'),
  mute: GMED_SVG('<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>'),
  power: GMED_SVG('<path d="M12 3v9"/><path d="M6.3 7.2a8 8 0 1 0 11.4 0"/>'),
  note: GMED_SVG('<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>'),
  tv: GMED_SVG('<rect x="3" y="5" width="18" height="12" rx="2.5"/><path d="M8 21h8"/>'),
  speaker: GMED_SVG('<rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="14" r="3.5"/><circle cx="12" cy="6.5" r="1"/>'),
  hub: GMED_SVG('<path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="M8 20h8l-1-4H9z"/>'),
  shuffle: GMED_SVG('<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>'),
  repeat: GMED_SVG('<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>'),
  moon: GMED_SVG('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),
  eq: GMED_SVG('<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/>'),
  search: GMED_SVG('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
  group: GMED_SVG('<rect x="3" y="4" width="7" height="16" rx="2"/><rect x="14" y="4" width="7" height="16" rx="2"/><circle cx="6.5" cy="14" r="1.6"/><circle cx="17.5" cy="14" r="1.6"/>'),
  star: GMED_SVG('<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>'),
  starf: GMED_SVG('<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>', true),
  back: GMED_SVG('<path d="m15 18-6-6 6-6"/>'),
  x: GMED_SVG('<path d="M18 6 6 18M6 6l12 12"/>'),
};
// Radio Browser: dezelfde open zenderlijst als de integratie in Home Assistant
const GMED_RB = 'https://de1.api.radio-browser.info/json';

const GMED_STYLE = `
  :host { display: block; }
  ha-card {
    display: flex; flex-direction: column; gap: 14px; position: relative; box-sizing: border-box; padding: 0; background: none; border: 0; box-shadow: none;
    color: var(--glow-text, #F3F1FA); user-select: none; -webkit-user-select: none; container-type: inline-size;
  }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .np, .panel {
    position: relative; overflow: hidden; box-sizing: border-box; border-radius: var(--ha-card-border-radius, 24px);
    background: var(--glow-card-background, #15121F); border: 1px solid var(--glow-card-border, rgba(255, 255, 255, 0.08));
  }
  .np { padding: 22px; display: flex; flex-direction: column; gap: 20px; border-color: rgba(var(--c), 0.45); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.3);
    background: linear-gradient(rgba(var(--c), 0.08), rgba(var(--c), 0.08)), var(--glow-card-background, #15121F); transition: border-color 0.6s, box-shadow 0.6s; }
  .bg { position: absolute; inset: -40px; background-size: cover; background-position: center; filter: blur(44px) saturate(1.3); opacity: 0; transition: opacity 0.8s; pointer-events: none; }
  .np.has-art .bg { opacity: 0.26; }
  .halo { position: absolute; left: -60px; top: -80px; width: 320px; height: 320px; border-radius: 50%; filter: blur(70px); background: rgb(var(--c)); opacity: 0.15; transition: opacity 0.6s, background 0.6s; pointer-events: none; }
  .halo2 { position: absolute; right: -80px; bottom: -120px; width: 300px; height: 300px; border-radius: 50%; filter: blur(80px); background: rgb(var(--c2)); opacity: 0.08; transition: opacity 0.6s, background 0.6s; pointer-events: none; }
  .np.playing .halo { opacity: 0.4; }
  .np.playing .halo2 { opacity: 0.22; }
  .top { position: relative; display: flex; gap: 22px; align-items: stretch; }
  .art { position: relative; flex-shrink: 0; width: 220px; height: 220px; border-radius: 24px; overflow: hidden; display: flex; align-items: center; justify-content: center; cursor: pointer;
    background: radial-gradient(circle at 25% 20%, rgb(var(--c2)), transparent 60%), radial-gradient(circle at 80% 85%, rgb(var(--c)), transparent 65%), linear-gradient(135deg, rgb(var(--c)), #2A2140);
    box-shadow: 0 0 calc(var(--glow) * 1.6) rgba(var(--c), 0.55); color: rgba(255,255,255,0.85); transition: box-shadow 0.6s; }
  .art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .art img.logo { inset: 18%; width: 64%; height: 64%; object-fit: contain; border-radius: 16px; }
  .art svg { width: 72px; height: 72px; }
  .art .ini { font-size: 3.2rem; font-weight: 800; color: #1C1730; }
  .live { position: absolute; left: 12px; top: 12px; height: 28px; padding: 0 12px; border-radius: 14px; display: none; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 800; background: rgba(28, 23, 48, 0.75); color: #fff; }
  .live i { width: 8px; height: 8px; border-radius: 4px; background: #FF808C; box-shadow: 0 0 8px #FF808C; }
  .np.radio .live { display: inline-flex; }
  .np.radio.playing .live i { animation: gmed-live 1.4s ease-in-out infinite; }
  @keyframes gmed-live { 50% { opacity: 0.35; } }
  .info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
  .chips { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .chip { height: 28px; padding: 0 12px; border-radius: 14px; display: inline-flex; align-items: center; font-size: 0.8rem; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); opacity: 0.85; }
  .chip.src { background: rgba(var(--c), 0.2); color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); opacity: 1; }
  .chip:empty { display: none; }
  .title { font-size: 1.9rem; font-weight: 800; line-height: 1.12; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .artist { font-size: 1.1rem; font-weight: 700; opacity: 0.65; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .grow { flex: 1; }
  .prog { display: flex; flex-direction: column; gap: 4px; }
  .prog .rail { height: 8px; border-radius: 4px; background: var(--glow-surface, rgba(255,255,255,0.08)); overflow: hidden; }
  .prog .fill { height: 100%; width: 0; border-radius: 4px; background: rgb(var(--c)); box-shadow: 0 0 10px rgba(var(--c), 0.8); }
  .prog .times { display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; opacity: 0.6; font-variant-numeric: tabular-nums; }
  .prog[hidden], .eqb[hidden] { display: none; }
  .eqb { display: flex; gap: 4px; align-items: flex-end; height: 22px; }
  .eqb span { width: 6px; height: 100%; border-radius: 3px; transform-origin: bottom; background: rgb(var(--c)); opacity: 0.8; transform: scaleY(0.3); }
  .np.playing .eqb span { animation: gmed-eq var(--d) ease-in-out var(--dl) infinite; }
  @keyframes gmed-eq { 0%, 100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
  .ctl { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .b { display: flex; align-items: center; justify-content: center; padding: 0; flex-shrink: 0; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); background: var(--glow-surface, rgba(255,255,255,0.07)); transition: background 0.3s, border-color 0.3s, box-shadow 0.3s, opacity 0.3s; }
  .b svg { width: 26px; height: 26px; }
  .b.m { width: 64px; height: 64px; border-radius: 22px; }
  .b.s { position: relative; width: 56px; height: 56px; border-radius: 20px; }
  .b.s svg { width: 22px; height: 22px; }
  .b.big { width: 96px; height: 96px; border-radius: 48px; border: 0; color: #1C1730; background: rgb(var(--c)); box-shadow: 0 0 calc(var(--glow) * 1.4) rgba(var(--c), 0.75); }
  .b.big svg { width: 36px; height: 36px; }
  .b.on { border-color: rgba(var(--c), 0.6); background: rgba(var(--c), 0.16); color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.3); }
  .b.dim { opacity: 0.3; pointer-events: none; }
  .b .one { position: absolute; right: 7px; top: 5px; font-size: 0.7rem; font-weight: 800; }
  .b[hidden] { display: none; }
  .b:active { transform: scale(0.95); }
  .row { position: relative; display: flex; align-items: center; gap: 12px; }
  .b.r { width: 48px; height: 48px; border-radius: 16px; }
  .b.r svg { width: 22px; height: 22px; }
  .b.r.muted { border-color: rgba(255, 184, 153, 0.6); background: rgba(255, 184, 153, 0.16); }
  .b.t { height: 48px; padding: 0 14px; gap: 8px; border-radius: 16px; font-size: 0.9rem; font-weight: 800; }
  .b.t svg { width: 20px; height: 20px; }
  .b.t.on { --c: 185, 168, 255; }
  .vtrack { position: relative; flex: 1; height: 40px; display: flex; align-items: center; touch-action: none; cursor: pointer; }
  .vrail { position: relative; width: 100%; height: 14px; border-radius: 7px; background: var(--glow-surface, rgba(255,255,255,0.08)); }
  .vfill { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 7px; background: linear-gradient(90deg, rgba(var(--c), 0.5), rgb(var(--c))); box-shadow: 0 0 10px rgba(var(--c), 0.6); }
  .vknob { position: absolute; top: 50%; width: 26px; height: 26px; margin: -13px 0 0 -13px; border-radius: 13px; background: #fff; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.9); }
  .vtxt { width: 46px; font-size: 1rem; font-weight: 800; opacity: 0.6; font-variant-numeric: tabular-nums; }
  .np.idle .ctl .b:not(.pw), .np.idle .row .vtrack, .np.idle .row .vtxt, .np.idle .row [data-a="mute"] { display: none; }
  .np.idle .ctl { justify-content: center; }
  .pw { width: 64px; height: 64px; border-radius: 22px; }
  .pw[hidden] { display: none; }

  .panel { padding: 18px; display: flex; flex-direction: column; gap: 14px; }
  .ph { display: flex; gap: 8px; align-items: center; }
  .ptitle { font-size: 0.85rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .tab { height: 40px; padding: 0 18px; border-radius: 20px; font-size: 0.95rem; font-weight: 800; border: 1px solid transparent; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .tab.sel { border-color: rgba(var(--c), 0.6); background: rgba(var(--c), 0.16); color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .search { height: 40px; width: 240px; max-width: 45%; padding: 0 14px; box-sizing: border-box; border-radius: 20px; display: flex; align-items: center; gap: 8px; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .search svg { width: 18px; height: 18px; opacity: 0.6; flex-shrink: 0; }
  .search input { flex: 1; min-width: 0; border: 0; outline: 0; background: none; color: inherit; font: inherit; font-size: 0.95rem; font-weight: 700; }
  .search input::placeholder { color: inherit; opacity: 0.55; }
  .grid4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
  .grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .st, .sp { position: relative; display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px 8px 12px; border-radius: 20px; min-width: 0;
    border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); background: var(--glow-surface, rgba(255,255,255,0.07)); transition: background 0.3s, border-color 0.3s, box-shadow 0.3s; }
  .st.sel { border-color: rgba(var(--k), 0.6); background: rgba(var(--k), 0.14); box-shadow: 0 0 var(--glow) rgba(var(--k), 0.3); }
  .logo { position: relative; width: 64px; height: 64px; border-radius: 20px; overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; font-weight: 800; color: #1C1730;
    background: radial-gradient(circle at 30% 25%, rgba(255,255,255,0.4), transparent 55%), rgb(var(--k)); }
  .logo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; background: #fff; }
  .st.sel .logo { box-shadow: 0 0 var(--glow) rgba(var(--k), 0.8); }
  .nm { font-size: 0.92rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
  .sub { font-size: 0.78rem; font-weight: 700; opacity: 0.6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
  .st.sel .sub, .sp.sel .sub { opacity: 1; color: color-mix(in srgb, rgb(var(--k, var(--c))), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .fav { position: absolute; right: 6px; top: 6px; width: 30px; height: 30px; border-radius: 15px; border: 0; padding: 0; background: none; display: flex; align-items: center; justify-content: center; opacity: 0.55; }
  .fav svg { width: 18px; height: 18px; }
  .fav.on { opacity: 1; color: rgb(255, 214, 120); }
  .pl { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 18px; min-width: 0; text-align: left; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .pl .cv { flex-shrink: 0; width: 52px; height: 52px; border-radius: 14px; overflow: hidden; background: radial-gradient(circle at 25% 20%, rgba(255,255,255,0.45), transparent 55%), linear-gradient(135deg, rgb(var(--k)), rgba(var(--k), 0.45)); }
  .pl .cv img { width: 100%; height: 100%; object-fit: cover; }
  .pl .tx { display: flex; flex-direction: column; min-width: 0; }
  .pl .nm { font-size: 1rem; }
  .msg { padding: 18px 8px; text-align: center; font-weight: 700; opacity: 0.6; grid-column: 1 / -1; }
  .sp { gap: 5px; }
  .sp .ic { width: 44px; height: 44px; border-radius: 22px; display: flex; align-items: center; justify-content: center; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .sp .ic svg { width: 22px; height: 22px; }
  .sp.sel { border-color: rgba(var(--c), 0.55); background: rgba(var(--c), 0.12); }
  .sp.sel .ic { background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.7); }
  .sp.off { opacity: 0.55; }
  .sp .ck { position: absolute; right: 10px; top: 8px; width: 22px; height: 22px; border-radius: 11px; display: none; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; color: #1C1730; background: rgb(var(--c)); }
  .grouping .sp.sel .ck { display: flex; }
  .grp { height: 40px; padding: 0 14px; gap: 8px; border-radius: 20px; font-size: 0.9rem; font-weight: 800; }
  .grp svg { width: 18px; height: 18px; }
  .toast { position: relative; padding: 10px 14px; border-radius: 14px; font-size: 0.9rem; font-weight: 700; background: rgba(255, 184, 153, 0.14); border: 1px solid rgba(255, 184, 153, 0.45); }
  .toast:empty { display: none; }

  /* compact: alleen wat er speelt */
  ha-card.compact .panel, ha-card.compact .row .t, ha-card.compact .eqb { display: none; }
  ha-card.compact .np { padding: 16px; gap: 14px; }
  ha-card.compact .art { width: 112px; height: 112px; border-radius: 20px; }
  ha-card.compact .art svg { width: 44px; height: 44px; }
  ha-card.compact .title { font-size: 1.25rem; }
  ha-card.compact .artist { font-size: 0.95rem; }
  ha-card.compact .b.big { width: 64px; height: 64px; }
  ha-card.compact .b.m { width: 48px; height: 48px; border-radius: 18px; }
  ha-card.compact .b.s { display: none; }
  ha-card.compact .pchips { display: flex; }
  .pchips { display: none; gap: 6px; overflow-x: auto; scrollbar-width: none; position: relative; }
  .pchips button { height: 30px; padding: 0 12px; border-radius: 15px; flex-shrink: 0; font-size: 13px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid transparent; }
  .pchips button.sel { border-color: rgba(var(--c), 0.55); background: rgba(var(--c), 0.16); }

  @container (max-width: 620px) {
    .art { width: 150px; height: 150px; }
    .title { font-size: 1.5rem; }
    .grid4 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .b.big { width: 80px; height: 80px; }
    .b.m { width: 54px; height: 54px; }
    .row { flex-wrap: wrap; }
    .vtrack { flex-basis: 50%; }
  }
  @container (max-width: 440px) {
    .top { flex-direction: column; }
    .art { width: 100%; height: 200px; }
    .grid4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .grid2 { grid-template-columns: minmax(0, 1fr); }
    .search { max-width: none; width: 100%; }
    .ph { flex-wrap: wrap; }
  }
`;

const GMED_POP = `
  .veil { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background: rgba(10, 8, 18, 0.55); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); font-family: var(--paper-font-body1_-_font-family, inherit); }
  .pop { width: min(460px, calc(100vw - 32px)); box-sizing: border-box; padding: 22px; border-radius: 28px; display: flex; flex-direction: column; gap: 16px; color: var(--glow-text, #F3F1FA);
    background: var(--glow-card-background, #1A1626); border: 1px solid rgba(var(--p), 0.5); box-shadow: 0 0 calc(var(--glow, 15px) * 2) rgba(var(--p), 0.35); }
  .pop button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; }
  .ph { display: flex; align-items: center; gap: 12px; }
  .pi { width: 48px; height: 48px; border-radius: 24px; display: flex; align-items: center; justify-content: center; color: #1C1730; background: rgb(var(--p)); box-shadow: 0 0 var(--glow, 15px) rgba(var(--p), 0.8); }
  .pi svg { width: 24px; height: 24px; }
  .pt { display: flex; flex-direction: column; }
  .pt b { font-size: 1.25rem; font-weight: 800; }
  .pt span { font-size: 0.9rem; font-weight: 700; opacity: 0.6; }
  .opts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .opts.list { grid-template-columns: repeat(2, 1fr); }
  .o { min-height: 52px; padding: 6px 10px; border-radius: 18px; font-size: 1rem; font-weight: 800; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .o.sel { border-color: rgba(var(--p), 0.6); background: rgba(var(--p), 0.16); }
  .lbl { font-size: 0.8rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .cancel { height: 48px; border-radius: 16px; font-size: 0.95rem; font-weight: 800; color: color-mix(in srgb, rgb(255, 184, 153), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); border: 1px solid rgba(255, 184, 153, 0.5); background: rgba(255, 184, 153, 0.12); }
`;

// opvallende kleur uit de hoes halen (zelfde bron, dus het canvas mag gelezen worden)
function gmedColor(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const cv = document.createElement('canvas');
        cv.width = 24; cv.height = 24;
        const ctx = cv.getContext('2d');
        ctx.drawImage(img, 0, 0, 24, 24);
        const d = ctx.getImageData(0, 0, 24, 24).data;
        let best = null;
        let bestScore = -1;
        const sum = [0, 0, 0];
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          sum[0] += r; sum[1] += g; sum[2] += b;
          const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
          const sat = mx ? (mx - mn) / mx : 0;
          const score = sat * (mx / 255) * (mx > 40 ? 1 : 0.2);
          if (score > bestScore) { bestScore = score; best = [r, g, b]; }
        }
        let c = bestScore > 0.2 ? best : sum.map((x) => Math.round(x / (d.length / 4)));
        c = c.map((x) => Math.round(x + (255 - x) * 0.35));
        resolve(c.join(', '));
      } catch (e) { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}
function gmedHash(s) { let h = 0; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; }
function gmedShort(n) {
  const w = String(n || '').replace(/[^\p{L}\p{N} ]/gu, ' ').trim().split(/\s+/).filter(Boolean);
  if (!w.length) return '♪';
  if (w.length === 1) return w[0].slice(0, 4);
  return w.slice(0, 3).map((x) => x[0]).join('').toUpperCase();
}

class GlowMediaCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._built = false; this._sel = null; this._colors = {}; this._tab = 'radio'; this._group = false; this._members = [];
    this._resolved = gmedStore('resolved') || {}; this._q = ''; this._results = null; this._pl = null; this._plFor = null;
  }
  static getConfigElement() { return document.createElement('glow-media-card-editor'); }
  static getStubConfig(hass) {
    const st = (hass && hass.states) || {};
    const ids = Object.keys(st).filter((e) => e.startsWith('media_player.') && !/spotify/.test(e) && st[e].state !== 'unavailable');
    return { entities: ids.slice(0, 4), stations: ['Studio Brussel', 'MNM', 'Radio 1', 'Radio 2'] };
  }
  setConfig(config) {
    const list = Array.isArray(config && config.entities) ? config.entities : config && config.entity ? [config.entity] : [];
    if (!list.length) throw new Error(gmedT(gmedLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, layout: 'full', ...config };
    this._list = list.map((e) => (typeof e === 'string' ? { entity: e } : e)).filter((e) => e && e.entity);
    this._built = false;
    if (this._hass) this._render();
  }
  set hass(hass) { this._hass = hass; if (this._config) this._render(); }
  get hass() { return this._hass; }
  getCardSize() { return this._config && this._config.layout === 'compact' ? 3 : 14; }
  getGridOptions() { return this._config && this._config.layout === 'compact' ? { columns: 12, rows: 'auto', min_columns: 6 } : { columns: 'full', rows: 'auto', min_columns: 6 }; }
  connectedCallback() { clearInterval(this._tick); this._tick = setInterval(() => { this._progress(); this._sleepTick(); }, 1000); }
  disconnectedCallback() { clearInterval(this._tick); this._closePop(); }

  _lang() { return gmedLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gmedT(this._lang(), k, v); }
  _full() { return this._config.layout !== 'compact'; }
  _name(e) { const x = this._list.find((y) => y.entity === e); const s = this._hass.states[e]; return (x && x.name) || (s && s.attributes.friendly_name) || e; }

  _spotify() {
    const c = this._config.spotify;
    if (c === false) return null;
    if (c) return this._hass.states[c] ? c : null;
    return Object.keys(this._hass.states).find((e) => e.startsWith('media_player.spotify')) || null;
  }

  // de gekozen speaker, of anders de eerste die speelt
  _main() {
    const st = this._hass.states;
    const ok = this._list.filter((x) => st[x.entity]);
    if (this._sel && ok.some((x) => x.entity === this._sel)) return this._sel;
    const sp = this._spotify();
    if (sp && st[sp].state === 'playing') {
      const m = ok.find((x) => this._spotifyName(x.entity) === st[sp].attributes.source);
      if (m) return m.entity;
    }
    const p = ok.find((x) => st[x.entity].state === 'playing') || ok.find((x) => st[x.entity].state === 'paused') || ok.find((x) => !['off', 'unavailable', 'standby'].includes(st[x.entity].state));
    return (p || ok[0] || {}).entity;
  }
  _spotifyName(e) {
    const x = this._list.find((y) => y.entity === e);
    if (x && x.spotify_source) return x.spotify_source;
    const sp = this._spotify();
    const srcs = (sp && this._hass.states[sp].attributes.source_list) || [];
    const n = this._name(e).toLowerCase();
    const fn = String((this._hass.states[e] && this._hass.states[e].attributes.friendly_name) || '').toLowerCase();
    return srcs.find((s) => s.toLowerCase() === n || s.toLowerCase() === fn) || null;
  }
  // welke entiteit toont wat er speelt: Spotify als die op deze speaker speelt
  _shown(main) {
    const sp = this._spotify();
    if (main && this._radioOn(main)) return main;
    if (sp && main) {
      const s = this._hass.states[sp];
      if (['playing', 'paused'].includes(s.state) && s.attributes.source && s.attributes.source === this._spotifyName(main)) return sp;
    }
    return main;
  }
  _targets() { return this._group && this._members.length ? this._members : [this._main()]; }
  _call(svc, data, ents) { this._hass.callService('media_player', svc, { entity_id: ents || this._cur, ...(data || {}) }); }

  // zenders: uit de instellingen en zelf bewaard
  _stations() {
    const own = (this._config.stations || []).map((x) => (typeof x === 'string' ? (/^https?:/.test(x) ? { name: x.replace(/^https?:\/\//, '').split(/[/?]/)[0], url: x } : { name: x }) : x)).filter((x) => x && x.name);
    const saved = (gmedStore('favs') || []).filter((x) => x && x.name && !own.some((o) => o.name.toLowerCase() === x.name.toLowerCase()));
    return own.map((x) => ({ ...x, own: true })).concat(saved);
  }
  _resolve(st) {
    if (st.url) return Promise.resolve(st);
    const key = st.name.toLowerCase();
    const hit = this._resolved[key];
    if (hit && hit.url) return Promise.resolve({ ...st, ...hit });
    if (this._resolving && this._resolving[key]) return this._resolving[key];
    this._resolving = this._resolving || {};
    const cc = st.country || (this._hass.config && this._hass.config.country) || '';
    const q = (extra) => fetch(`${GMED_RB}/stations/search?name=${encodeURIComponent(st.name)}&limit=8&order=votes&reverse=true&hidebroken=true${extra}`).then((r) => r.json());
    const p = (cc ? q('&countrycode=' + cc).then((r) => (r && r.length ? r : q(''))) : q(''))
      .then((r) => {
        const exact = (r || []).find((x) => x.name.trim().toLowerCase() === key) || (r || [])[0];
        if (!exact) return st;
        const v = { url: exact.url_resolved || exact.url, logo: exact.favicon || '', uuid: exact.stationuuid };
        this._resolved[key] = v;
        gmedStore('resolved', this._resolved);
        return { ...st, ...v };
      })
      .catch(() => st)
      .finally(() => { delete this._resolving[key]; this._render(); });
    this._resolving[key] = p;
    return p;
  }
  _playStation(st) {
    this._resolve(st).then((s) => {
      if (!s.url) return;
      const ents = this._targets();
      const data = { media_content_id: s.url, media_content_type: 'music', extra: { title: s.name, thumb: s.logo || undefined, metadata: { metadataType: 3, title: s.name, artist: this._t('radio'), images: s.logo ? [{ url: s.logo }] : [] } } };
      const nowR = gmedStore('playing') || {};
      ents.forEach((e) => { nowR[e] = { name: s.name, url: s.url, logo: s.logo, t: Date.now() }; });
      gmedStore('playing', nowR);
      // de Spotify-speler eerst stilleggen als die op deze speaker speelt
      const sp = this._spotify();
      if (sp && this._shown(this._main()) === sp) this._call('media_pause', {}, sp);
      this._call('play_media', data, ents);
      this._render();
    });
  }
  _radioOn(e) {
    const s = this._hass.states[e];
    const now = (gmedStore('playing') || {})[e];
    if (!s || !now || !['playing', 'paused', 'buffering'].includes(s.state)) return null;
    const id = s.attributes.media_content_id || '';
    if (id && id !== now.url && !id.includes(now.url) && !now.url.includes(id)) return null;
    return now;
  }

  _search(q) {
    this._q = q;
    clearTimeout(this._sq);
    if (!q.trim()) { this._results = null; this._render(); return; }
    this._results = 'busy';
    this._render();
    this._sq = setTimeout(() => {
      fetch(`${GMED_RB}/stations/search?name=${encodeURIComponent(q.trim())}&limit=16&order=votes&reverse=true&hidebroken=true`)
        .then((r) => r.json())
        .then((r) => { if (this._q === q) { this._results = (r || []).map((x) => ({ name: x.name.trim(), url: x.url_resolved || x.url, logo: x.favicon || '', sub: [x.countrycode, (x.tags || '').split(',')[0]].filter(Boolean).join(' · ') })); this._render(); } })
        .catch(() => { this._results = []; this._render(); });
    }, 350);
  }
  _toggleFav(st) {
    const favs = gmedStore('favs') || [];
    const i = favs.findIndex((x) => x.name.toLowerCase() === st.name.toLowerCase());
    if (i >= 0) favs.splice(i, 1); else favs.push({ name: st.name, url: st.url, logo: st.logo });
    gmedStore('favs', favs);
    this._render();
  }

  // Spotify: eigen afspeellijsten via de mediabrowser van Home Assistant
  _loadPlaylists() {
    const sp = this._spotify();
    if (!sp || this._plFor === sp || !this._hass.callWS) return;
    this._plFor = sp;
    this._pl = 'busy';
    const browse = (id, type) => this._hass.callWS({ type: 'media_player/browse_media', entity_id: sp, ...(id ? { media_content_id: id, media_content_type: type } : {}) });
    browse()
      .then((root) => {
        const kids = root.children || [];
        const pick = kids.find((c) => /playlists/i.test(c.media_content_id)) || kids.find((c) => /playlist/i.test(c.title));
        return pick ? browse(pick.media_content_id, pick.media_content_type) : root;
      })
      .then((r) => { this._pl = (r.children || []).filter((c) => c.can_play).slice(0, 24); })
      .catch(() => { this._pl = []; })
      .finally(() => this._render());
  }
  _playSpotify(item) {
    const sp = this._spotify();
    const main = this._main();
    const dev = this._spotifyName(main);
    if (!dev) { this._toast = this._t('no_spotify_dev', { n: this._name(main) }); this._render(); clearTimeout(this._tt); this._tt = setTimeout(() => { this._toast = ''; this._render(); }, 6000); return; }
    const go = () => this._call('play_media', { media_content_id: item.media_content_id, media_content_type: item.media_content_type }, sp);
    if (this._hass.states[sp].attributes.source !== dev) {
      this._hass.callService('media_player', 'select_source', { entity_id: sp, source: dev });
      setTimeout(go, 1500);
    } else go();
  }

  // slaaptimer: bewaard op dit toestel, de kaart zet de muziek zelf stil
  _sleep() { const s = gmedStore('sleep'); return s && s.end > Date.now() ? s : null; }
  _sleepTick() {
    const s = gmedStore('sleep');
    if (!s || !this._hass) return;
    if (s.end <= Date.now()) {
      gmedStore('sleep', null);
      (s.ents || []).forEach((e) => {
        const st = this._hass.states[e];
        if (st && st.state === 'playing') this._call((st.attributes.supported_features || 0) & 1 ? 'media_pause' : 'turn_off', {}, e);
      });
      this._render();
    } else if (this._built) {
      const lab = this.shadowRoot.querySelector('[data-a="sleep"] span');
      const txt = Math.ceil((s.end - Date.now()) / 60000) + ' min';
      if (lab && lab.textContent !== txt) lab.textContent = txt;
    }
  }

  _closePop() { if (this._pop) { this._pop.remove(); this._pop = null; } }
  _openPop(kind) {
    this._closePop();
    const host = document.createElement('div');
    const sh = host.attachShadow({ mode: 'open' });
    const cs = getComputedStyle(this);
    ['--glow-text', '--glow-card-background', '--glow-surface', '--glow-border', '--glow-ink', '--glow-ink-amount'].forEach((v) => { const x = cs.getPropertyValue(v); if (x) host.style.setProperty(v, x); });
    host.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');
    const draw = () => {
      let body = '';
      if (kind === 'sleep') {
        const s = this._sleep();
        host.style.setProperty('--p', '185, 168, 255');
        body = `<div class="ph"><span class="pi">${GMED_ICON.moon}</span><span class="pt"><b>${gmedEsc(this._t('sleep_title'))}</b><span>${gmedEsc(s ? this._t('sleep_left', { n: Math.ceil((s.end - Date.now()) / 60000) }) : this._t('sleep_sub'))}</span></span></div>
          <div class="opts">${[15, 30, 45, 60].map((m) => `<button class="o" type="button" data-m="${m}">${gmedEsc(this._t('min', { n: m }))}</button>`).join('')}</div>
          ${s ? `<button class="cancel" type="button" data-x="1">${gmedEsc(this._t('sleep_cancel'))}</button>` : ''}`;
      } else {
        const e = this._main();
        const a = (this._hass.states[e] || {}).attributes || {};
        host.style.setProperty('--p', this._col || GMED_DEFAULT);
        const modes = a.sound_mode_list || [];
        const srcs = a.source_list || [];
        body = `<div class="ph"><span class="pi">${GMED_ICON.eq}</span><span class="pt"><b>${gmedEsc(this._t('sound_title'))}</b><span>${gmedEsc(this._name(e))}</span></span></div>
          ${modes.length ? `<span class="lbl">${gmedEsc(this._t('sound'))}</span><div class="opts list">${modes.map((m) => `<button class="o${m === a.sound_mode ? ' sel' : ''}" type="button" data-sm="${gmedEsc(m)}">${gmedEsc(m)}</button>`).join('')}</div>` : ''}
          ${srcs.length ? `<span class="lbl">${gmedEsc(this._t('source'))}</span><div class="opts list">${srcs.map((m) => `<button class="o${m === a.source ? ' sel' : ''}" type="button" data-src="${gmedEsc(m)}">${gmedEsc(m)}</button>`).join('')}</div>` : ''}`;
      }
      sh.innerHTML = `<style>${GMED_POP}</style><div class="veil"><div class="pop">${body}</div></div>`;
    };
    draw();
    sh.addEventListener('click', (ev) => {
      const t = ev.target;
      if (t.classList && t.classList.contains('veil')) { this._closePop(); return; }
      const b = t.closest && t.closest('button');
      if (!b) return;
      if (b.dataset.m) { gmedStore('sleep', { end: Date.now() + b.dataset.m * 60000, ents: this._targets().map((e) => this._shown(e)) }); this._closePop(); this._render(); }
      else if (b.dataset.x) { gmedStore('sleep', null); this._closePop(); this._render(); }
      else if (b.dataset.sm) { this._call('select_sound_mode', { sound_mode: b.dataset.sm }, this._main()); this._closePop(); }
      else if (b.dataset.src) { this._call('select_source', { source: b.dataset.src }, this._main()); this._closePop(); }
    });
    document.body.appendChild(host);
    this._pop = host;
  }

  _build() {
    const eq = Array.from({ length: 14 }, (_, i) => `<span style="--d:${(0.6 + (i * 37 % 7) / 10).toFixed(1)}s;--dl:${((i % 5) / 10).toFixed(1)}s"></span>`).join('');
    this.shadowRoot.innerHTML = `
      <style>${GMED_STYLE}</style>
      <ha-card>
        <div class="np">
          <div class="bg"></div><div class="halo"></div><div class="halo2"></div>
          <div class="pchips"></div>
          <div class="top">
            <div class="art"></div>
            <div class="info">
              <div class="chips"><span class="chip src"></span><span class="chip on"></span></div>
              <span class="title"></span>
              <span class="artist"></span>
              <div class="grow"></div>
              <div class="prog" hidden><div class="rail"><div class="fill"></div></div><div class="times"><span class="pos"></span><span class="dur"></span></div></div>
              <div class="eqb" hidden>${eq}</div>
            </div>
          </div>
          <div class="ctl">
            <button class="b s" type="button" data-a="shuffle" aria-label="${gmedEsc(this._t('shuffle'))}">${GMED_ICON.shuffle}</button>
            <button class="b m" type="button" data-a="prev" aria-label="${gmedEsc(this._t('prev'))}">${GMED_ICON.prev}</button>
            <button class="b pw" type="button" data-a="power" hidden>${GMED_ICON.power}</button>
            <button class="b big" type="button" data-a="play"></button>
            <button class="b m" type="button" data-a="next" aria-label="${gmedEsc(this._t('next'))}">${GMED_ICON.next}</button>
            <button class="b s" type="button" data-a="repeat" aria-label="${gmedEsc(this._t('repeat'))}">${GMED_ICON.repeat}<span class="one"></span></button>
          </div>
          <div class="row">
            <button class="b r" type="button" data-a="mute" aria-label="${gmedEsc(this._t('mute'))}"></button>
            <div class="vtrack" role="slider" aria-label="${gmedEsc(this._t('volume'))}"><div class="vrail"><div class="vfill"></div><div class="vknob"></div></div></div>
            <span class="vtxt"></span>
            <button class="b t" type="button" data-a="sleep">${GMED_ICON.moon}<span></span></button>
            <button class="b t" type="button" data-a="sound">${GMED_ICON.eq}<span></span></button>
          </div>
        </div>
        <div class="toast"></div>
        <div class="panel lib"></div>
        <div class="panel spk"></div>
      </ha-card>`;
    const r = this.shadowRoot;
    this._card = r.querySelector('ha-card');
    this._np = r.querySelector('.np');
    r.querySelector('.art').addEventListener('click', () => this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._cur }, bubbles: true, composed: true })));
    r.querySelector('.pchips').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { this._sel = b.dataset.e; this._render(); } });
    this._np.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-a]');
      if (!b || !this._cur) return;
      const s = this._hass.states[this._cur];
      const a = b.dataset.a;
      const ents = this._cur === this._spotify() ? this._cur : this._targets().map((x) => this._shown(x));
      if (a === 'play') this._call(s.state === 'playing' ? 'media_pause' : 'media_play', {}, ents);
      else if (a === 'prev') { const now = this._radioOn(this._cur); if (now) this._stepStation(-1); else this._call('media_previous_track'); }
      else if (a === 'next') { const now = this._radioOn(this._cur); if (now) this._stepStation(1); else this._call('media_next_track'); }
      else if (a === 'mute') this._call('volume_mute', { is_volume_muted: !s.attributes.is_volume_muted }, ents);
      else if (a === 'power') this._call(['off', 'standby'].includes(s.state) ? 'turn_on' : 'turn_off', {}, this._main());
      else if (a === 'shuffle') this._call('shuffle_set', { shuffle: !s.attributes.shuffle });
      else if (a === 'repeat') { const order = ['off', 'all', 'one']; this._call('repeat_set', { repeat: order[(order.indexOf(s.attributes.repeat || 'off') + 1) % 3] }); }
      else if (a === 'sleep') this._openPop('sleep');
      else if (a === 'sound') this._openPop('sound');
    });
    // volume: slepen, versturen bij loslaten
    const track = r.querySelector('.vtrack');
    const fill = r.querySelector('.vfill');
    const knob = r.querySelector('.vknob');
    const pct = (e) => { const b = track.getBoundingClientRect(); return Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)); };
    const show = (p) => { fill.style.width = p * 100 + '%'; knob.style.left = p * 100 + '%'; r.querySelector('.vtxt').textContent = Math.round(p * 100) + '%'; };
    let drag = false;
    track.addEventListener('pointerdown', (e) => { drag = true; this._volDrag = true; try { track.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ } show(pct(e)); });
    track.addEventListener('pointermove', (e) => { if (drag) show(pct(e)); });
    track.addEventListener('pointerup', (e) => {
      if (!drag) return;
      drag = false;
      const v = Math.round(pct(e) * 100) / 100;
      const ents = this._cur === this._spotify() ? this._cur : this._targets().map((x) => this._shown(x));
      this._call('volume_set', { volume_level: v }, ents);
      setTimeout(() => { this._volDrag = false; }, 1500);
    });
    track.addEventListener('pointercancel', () => { drag = false; this._volDrag = false; });

    // bibliotheek: radio en Spotify
    const lib = r.querySelector('.lib');
    lib.addEventListener('click', (e) => {
      const t = e.target.closest('[data-tab]');
      if (t) { this._tab = t.dataset.tab; this._render(); return; }
      const f = e.target.closest('.fav');
      if (f) { e.stopPropagation(); const st = this._libItems[+f.dataset.i]; if (st) this._toggleFav(st); return; }
      const s = e.target.closest('.st');
      if (s) { const st = this._libItems[+s.dataset.i]; if (st) this._playStation(st); return; }
      const p = e.target.closest('.pl');
      if (p && Array.isArray(this._pl)) { const it = this._pl[+p.dataset.i]; if (it) this._playSpotify(it); }
    });
    lib.addEventListener('input', (e) => { if (e.target.matches('input')) this._search(e.target.value); });
    // speakers
    const spk = r.querySelector('.spk');
    spk.addEventListener('click', (e) => {
      if (e.target.closest('.grp')) {
        this._group = !this._group;
        this._members = this._group ? [this._main()] : [];
        if (!this._group) this._unjoin();
        this._render();
        return;
      }
      const b = e.target.closest('.sp');
      if (!b) return;
      const id = b.dataset.e;
      if (this._group) {
        const has = this._members.includes(id);
        if (has && this._members.length > 1) this._members = this._members.filter((x) => x !== id);
        else if (!has) this._members = this._members.concat(id);
        this._sel = this._members[0];
        this._joinOrCopy(id, !has);
      } else {
        this._sel = id;
      }
      this._render();
    });
    this._built = true;
    this._builtLang = this._lang();
    this._keys = {};
  }

  _stepStation(d) {
    const list = this._stations();
    const now = this._radioOn(this._cur);
    if (!list.length || !now) return;
    const i = list.findIndex((x) => x.name === now.name);
    this._playStation(list[(i + d + list.length) % list.length]);
  }
  // samen afspelen: echt groeperen als de speler dat kan, anders dezelfde zender ook daar starten
  _joinOrCopy(id, add) {
    const lead = this._members[0];
    const ls = this._hass.states[lead];
    if (!ls) return;
    if ((ls.attributes.supported_features || 0) & 524288) {
      if (add) this._call('join', { group_members: [id] }, lead); else this._call('unjoin', {}, id);
      return;
    }
    if (add) { const now = this._radioOn(lead); if (now) this._playStation({ name: now.name, url: now.url, logo: now.logo }); }
    else this._call('media_stop', {}, id);
  }
  _unjoin() { /* groepen die de speler zelf maakt blijven tot je ze uitzet in de app */ }

  _progress() {
    if (!this._built || !this._hass || !this._cur) return;
    const s = this._hass.states[this._cur];
    const r = this.shadowRoot;
    const prog = r.querySelector('.prog');
    const a = s && s.attributes;
    if (!a || !a.media_duration || a.media_position === undefined || this._radioOn(this._cur)) { prog.hidden = true; return; }
    let pos = a.media_position;
    if (s.state === 'playing' && a.media_position_updated_at) pos += (Date.now() - Date.parse(a.media_position_updated_at)) / 1000;
    pos = Math.min(pos, a.media_duration);
    prog.hidden = false;
    r.querySelector('.pos').textContent = gmedTime(pos);
    r.querySelector('.dur').textContent = gmedTime(a.media_duration);
    r.querySelector('.prog .fill').style.width = (pos / a.media_duration * 100).toFixed(2) + '%';
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    const st = this._hass.states;
    const r = this.shadowRoot;
    const full = this._full();
    this._card.classList.toggle('compact', !full);
    const main = this._main();
    this._cur = this._shown(main);
    const s = this._cur && st[this._cur];
    const a = (s && s.attributes) || {};
    const state = s ? s.state : 'unavailable';
    const active = ['playing', 'paused', 'buffering'].includes(state);
    const f = a.supported_features || 0;
    const radio = this._radioOn(this._cur);
    const isSp = this._cur && this._cur === this._spotify();
    this._card.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');

    // compacte spelerknopjes
    const chips = !full && this._list.length > 1 ? this._list.filter((x) => st[x.entity]).map((x) => `<button class="${x.entity === main ? 'sel' : ''}" type="button" data-e="${gmedEsc(x.entity)}">${gmedEsc(this._name(x.entity))}</button>`).join('') : '';
    if (this._keys.chips !== chips) { this._keys.chips = chips; r.querySelector('.pchips').innerHTML = chips; }

    // hoes en kleur
    const pic = active ? (radio ? radio.logo : (a.entity_picture_local || a.entity_picture)) : null;
    const artKey = (radio ? 'r:' : '') + (pic || (radio ? radio.name : /tv|android|chromecast|shield|pus|orange/i.test(this._cur || '') ? 'tv' : 'note'));
    let col = GMED_DEFAULT;
    let col2 = '255, 159, 191';
    if (radio) { col = GMED_PALETTE[gmedHash(radio.name) % GMED_PALETTE.length]; col2 = '255, 224, 138'; }
    if (pic && this._colors[pic]) col = this._colors[pic];
    if (this._keys.art !== artKey) {
      this._keys.art = artKey;
      const art = r.querySelector('.art');
      art.innerHTML = (radio
        ? (pic ? `<img class="logo" alt="" src="${gmedEsc(pic)}" onerror="this.remove()">` : `<span class="ini">${gmedEsc(gmedShort(radio.name))}</span>`)
        : pic ? `<img alt="" src="${gmedEsc(pic)}">` : GMED_ICON[artKey === 'tv' ? 'tv' : 'note'])
        + `<span class="live"><i></i>${gmedEsc(this._t('live').toUpperCase())}</span>`;
      r.querySelector('.bg').style.backgroundImage = pic && !radio ? `url("${pic.replace(/"/g, '%22')}")` : 'none';
      this._np.classList.toggle('has-art', !!pic && !radio);
      if (pic && !this._colors[pic] && !radio) gmedColor(pic).then((c) => { this._colors[pic] = c || GMED_DEFAULT; this._render(); });
    }
    this._col = col;
    this._card.style.setProperty('--c', col);
    this._card.style.setProperty('--c2', col2);
    this._np.classList.toggle('playing', state === 'playing');
    this._np.classList.toggle('idle', !active);
    this._np.classList.toggle('radio', !!radio);

    // tekst
    const ents = this._targets();
    let title, sub;
    if (radio) {
      title = radio.name;
      const t = a.media_title && a.media_title !== radio.name ? a.media_title : '';
      sub = state === 'paused' ? this._t('paused') : t ? this._t('now', { t: [a.media_artist, t].filter(Boolean).join(' – ') }) : this._t('live') + ' · ' + this._t('radio');
    } else if (active) {
      title = a.media_title || a.app_name || a.source || this._name(main);
      sub = [a.media_artist || a.media_series_title || a.media_album_artist, a.media_album_name].filter(Boolean).join(' · ') || a.app_name || this._name(main);
      if (state === 'paused') sub = this._t('paused') + ' · ' + sub;
    } else {
      title = this._name(main);
      sub = state === 'unavailable' ? this._t('unavailable') : ['off', 'standby'].includes(state) ? this._t('off') : this._t('idle');
    }
    r.querySelector('.title').textContent = title;
    r.querySelector('.artist').textContent = sub;
    r.querySelector('.chip.src').textContent = active ? (radio ? this._t('radio') : isSp ? 'Spotify' : (a.app_name || '')) : '';
    r.querySelector('.chip.on').textContent = full ? this._t('on_speaker', { n: ents.map((e) => this._name(e)).join(' + ') }) : '';
    r.querySelector('.eqb').hidden = !radio || !full;

    // knoppen volgens wat de speler kan
    const play = r.querySelector('[data-a="play"]');
    const playIcon = state === 'playing' ? 'pause' : 'play';
    if (this._keys.play !== playIcon) { this._keys.play = playIcon; play.innerHTML = GMED_ICON[playIcon]; play.setAttribute('aria-label', this._t(playIcon)); }
    play.hidden = !(f & 1 || f & 16384) || !active;
    const prev = r.querySelector('[data-a="prev"]');
    const next = r.querySelector('[data-a="next"]');
    prev.hidden = !active; next.hidden = !active;
    prev.classList.toggle('dim', !radio && !(f & 16));
    next.classList.toggle('dim', !radio && !(f & 32));
    const sh = r.querySelector('[data-a="shuffle"]');
    const rp = r.querySelector('[data-a="repeat"]');
    sh.hidden = !active; rp.hidden = !active;
    sh.classList.toggle('dim', !!radio || !(f & 32768));
    rp.classList.toggle('dim', !!radio || !(f & 262144));
    sh.classList.toggle('on', !radio && !!a.shuffle);
    rp.classList.toggle('on', !radio && !!a.repeat && a.repeat !== 'off');
    rp.querySelector('.one').textContent = a.repeat === 'one' ? '1' : '';
    const pw = r.querySelector('[data-a="power"]');
    const ms = st[main] || { attributes: {} };
    pw.hidden = active || !((ms.attributes.supported_features || 0) & 384);
    pw.setAttribute('aria-label', this._t(['off', 'standby'].includes(ms.state) ? 'turn_on' : 'turn_off'));
    const muted = !!a.is_volume_muted;
    const mb = r.querySelector('[data-a="mute"]');
    const mi = muted ? 'mute' : 'vol';
    if (this._keys.mute !== mi) { this._keys.mute = mi; mb.innerHTML = GMED_ICON[mi]; }
    mb.classList.toggle('muted', muted);
    mb.hidden = !(f & 8);
    r.querySelector('.vtrack').style.visibility = f & 4 ? '' : 'hidden';
    if (!this._volDrag) {
      const v = muted ? 0 : (a.volume_level || 0) * 100;
      r.querySelector('.vfill').style.width = v + '%';
      r.querySelector('.vknob').style.left = v + '%';
      r.querySelector('.vtxt').textContent = f & 4 ? (muted ? '—' : Math.round(v) + '%') : '';
    }
    const sl = this._sleep();
    const sb = r.querySelector('[data-a="sleep"]');
    sb.classList.toggle('on', !!sl);
    sb.querySelector('span').textContent = sl ? Math.ceil((sl.end - Date.now()) / 60000) + ' min' : this._t('sleep');
    const ma = ms.attributes || {};
    const snd = r.querySelector('[data-a="sound"]');
    const hasModes = (ma.sound_mode_list || []).length > 1 || (ma.source_list || []).length > 0;
    snd.hidden = !hasModes;
    snd.querySelector('span').textContent = ma.sound_mode && (ma.sound_mode_list || []).length > 1 ? ma.sound_mode : ma.source || this._t('sound');
    r.querySelector('.toast').textContent = this._toast || '';
    this._progress();
    if (full) { this._renderLib(); this._renderSpk(main); }
  }

  _renderLib() {
    const r = this.shadowRoot;
    const sp = this._spotify();
    if (this._tab === 'spotify' && !sp) this._tab = 'radio';
    if (this._tab === 'spotify') this._loadPlaylists();
    const now = this._radioOn(this._cur);
    let items;
    let body;
    if (this._tab === 'radio') {
      const favs = this._stations();
      const favNames = favs.map((x) => x.name.toLowerCase());
      if (this._results) {
        items = this._results === 'busy' ? [] : this._results;
        body = this._results === 'busy' ? `<div class="msg">${gmedEsc(this._t('searching'))}</div>` : !items.length ? `<div class="msg">${gmedEsc(this._t('no_results'))}</div>` : '';
      } else {
        items = favs;
        items.forEach((x) => { if (!x.url && !x.logo) { const h = this._resolved[x.name.toLowerCase()]; if (h) Object.assign(x, h); else this._resolve(x); } });
        body = !items.length ? `<div class="msg">${gmedEsc(this._t('no_fav'))}</div>` : '';
      }
      this._libItems = items;
      body += items.map((x, i) => {
        const sel = now && now.name === x.name;
        const k = GMED_PALETTE[gmedHash(x.name) % GMED_PALETTE.length];
        const fav = favNames.includes(x.name.toLowerCase());
        const st = this._hass.states[this._cur];
        return `<button class="st${sel ? ' sel' : ''}" type="button" data-i="${i}" style="--k:${k}">
          ${!x.own ? `<span class="fav${fav ? ' on' : ''}" data-i="${i}" role="button" aria-label="${gmedEsc(this._t(fav ? 'fav_del' : 'fav_add'))}">${fav ? GMED_ICON.starf : GMED_ICON.star}</span>` : ''}
          <span class="logo">${gmedEsc(gmedShort(x.name))}${x.logo ? `<img alt="" src="${gmedEsc(x.logo)}" loading="lazy" onerror="this.remove()">` : ''}</span>
          <span class="nm">${gmedEsc(x.name)}</span>
          <span class="sub">${gmedEsc(sel ? (st && st.state === 'paused' ? this._t('paused') : this._t('playing')) : x.sub || this._t('live'))}</span>
        </button>`;
      }).join('');
      body = `<div class="grid4">${body}</div>`;
    } else {
      const pl = this._pl;
      body = `<div class="grid2">${pl === 'busy' || pl === null ? `<div class="msg">${gmedEsc(this._t('loading'))}</div>` : !pl.length ? `<div class="msg">${gmedEsc(this._t('no_results'))}</div>` : pl.map((x, i) => {
        const k = GMED_PALETTE[gmedHash(x.title) % GMED_PALETTE.length];
        return `<button class="pl" type="button" data-i="${i}" style="--k:${k}"><span class="cv">${x.thumbnail ? `<img alt="" src="${gmedEsc(x.thumbnail)}" loading="lazy">` : ''}</span><span class="tx"><span class="nm">${gmedEsc(x.title)}</span><span class="sub">Spotify</span></span></button>`;
      }).join('')}</div>`;
    }
    const head = `<div class="ph">
        <button class="tab${this._tab === 'radio' ? ' sel' : ''}" type="button" data-tab="radio">${gmedEsc(this._t('radio'))}</button>
        ${sp ? `<button class="tab${this._tab === 'spotify' ? ' sel' : ''}" type="button" data-tab="spotify">Spotify</button>` : ''}
        <div class="grow"></div>
        ${this._tab === 'radio' ? `<label class="search">${GMED_ICON.search}<input type="search" placeholder="${gmedEsc(this._t('search_radio'))}" value="${gmedEsc(this._q)}"></label>` : ''}
      </div>`;
    const html = head + body;
    if (this._keys.lib === html) return;
    this._keys.lib = html;
    const lib = r.querySelector('.lib');
    const inp = lib.querySelector('input');
    const focused = inp && this.shadowRoot.activeElement === inp;
    const caret = focused ? inp.selectionStart : null;
    // het zoekveld laten staan tijdens het typen
    if (focused) {
      lib.querySelectorAll(':scope > :not(.ph)').forEach((n) => n.remove());
      lib.querySelectorAll('.tab').forEach((t) => t.classList.toggle('sel', t.dataset.tab === this._tab));
      lib.insertAdjacentHTML('beforeend', body);
      try { inp.setSelectionRange(caret, caret); } catch (e) { /* ignore */ }
    } else lib.innerHTML = html;
  }

  _renderSpk(main) {
    const st = this._hass.states;
    const r = this.shadowRoot;
    const spk = r.querySelector('.spk');
    const list = this._list.filter((x) => st[x.entity]);
    spk.hidden = list.length < 2;
    const sel = this._group ? this._members : [main];
    const html = `<div class="ph"><span class="ptitle">${gmedEsc(this._t('speakers'))}</span><div class="grow"></div>
        <button class="b grp${this._group ? ' on' : ''}" type="button">${GMED_ICON.group}<span>${gmedEsc(this._t(this._group ? 'together_on' : 'together'))}</span></button></div>
      <div class="grid4${this._group ? ' grouping' : ''}">${list.map((x) => {
        const s = st[x.entity];
        const on = sel.includes(x.entity);
        const shown = this._shown(x.entity);
        const ss = st[shown] || s;
        const sub = ss.state === 'playing' ? this._t('playing') : ss.state === 'paused' ? this._t('paused') : ['off', 'standby'].includes(s.state) ? this._t('off') : s.state === 'unavailable' ? this._t('unavailable') : this._t('ready');
        const icon = /tv|pus|orange|android|beamer|chromecast/i.test(x.entity + ' ' + (s.attributes.friendly_name || '')) ? 'tv' : /nesthub|hub/i.test(x.entity) ? 'hub' : 'speaker';
        return `<button class="sp${on ? ' sel' : ''}${['off', 'unavailable', 'standby'].includes(s.state) && !on ? ' off' : ''}" type="button" data-e="${gmedEsc(x.entity)}"><span class="ck">✓</span><span class="ic">${GMED_ICON[icon]}</span><span class="nm">${gmedEsc(this._name(x.entity))}</span><span class="sub">${gmedEsc(sub)}</span></button>`;
      }).join('')}</div>`;
    if (this._keys.spk !== html) { this._keys.spk = html; spk.innerHTML = html; }
  }
}

class GlowMediaCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._render(); }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = gmedLang(this._hass, this._config.language);
    const t = (k) => gmedT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gmedT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length)) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.glow === 15) delete v.glow;
        if (v.layout === 'full') delete v.layout;
        if (typeof v.stations === 'string') v.stations = v.stations.split('\n').map((x) => x.trim()).filter(Boolean);
        delete v.entity;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    const simple = (this._config.entities || []).every((x) => typeof x === 'string');
    const simpleSt = (this._config.stations || []).every((x) => typeof x === 'string');
    const ents = this._config.entities || (this._config.entity ? [this._config.entity] : []);
    this._form.schema = [
      ...(simple ? [{ name: 'entities', selector: { entity: { domain: 'media_player', multiple: true } } }] : []),
      { name: 'layout', selector: { select: { mode: 'dropdown', options: [{ value: 'full', label: t('layout_full') }, { value: 'compact', label: t('layout_compact') }] } } },
      { name: 'spotify', selector: { entity: { domain: 'media_player' } } },
      ...(simpleSt ? [{ name: 'stations', selector: { text: { multiline: true } } }] : []),
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GMED_LANG_NAMES).map((k) => ({ value: k, label: GMED_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, layout: 'full', language: 'auto', ...this._config, entities: ents, stations: (this._config.stations || []).filter((x) => typeof x === 'string').join('\n') };
  }
}

if (!customElements.get('glow-media-card')) customElements.define('glow-media-card', GlowMediaCard);
if (!customElements.get('glow-media-card-editor')) customElements.define('glow-media-card-editor', GlowMediaCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-media-card')) {
  window.customCards.push({ type: 'glow-media-card', name: 'Glow Media Card', description: gmedT(gmedLang(null), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}
