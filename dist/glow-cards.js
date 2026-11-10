/*! Glow Cards v1.6.0 – https://github.com/stijnleroy/glow-cards – MIT */

/* ---- blinds.js ---- */
{
/*
 * Glow Blinds Card
 * Een Home Assistant dashboardkaart voor rolgordijnen: verticale ramen,
 * slepen om te positioneren, stopknop, live positie en een lucht die
 * het huidige weer en het dagdeel volgt.
 *
 * https://github.com/stijnleroy/glow-blinds-card
 * Licentie: MIT
 */

const GBC_VERSION = '1.2.0';

const GBC_PALETTE = ['#FFB899', '#B9A8FF', '#8FE3B8', '#8EC5FF', '#FFE08A', '#FF9FBF'];

const GBC_WEATHER = {
  'sunny': 'helder',
  'clear-night': 'helder',
  'partlycloudy': 'halfbewolkt',
  'windy': 'halfbewolkt',
  'windy-variant': 'bewolkt',
  'cloudy': 'bewolkt',
  'exceptional': 'bewolkt',
  'fog': 'mist',
  'rainy': 'regen',
  'pouring': 'regen',
  'lightning': 'onweer',
  'lightning-rainy': 'onweer',
  'snowy': 'sneeuw',
  'snowy-rainy': 'sneeuw',
  'hail': 'sneeuw',
};

/* ------------------------------------------------------------------ */
/*  Vertalingen                                                        */
/* ------------------------------------------------------------------ */

const GBC_LANG_NAMES = {
  nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano',
};

const GBC_I18N = {
  nl: {
    title: 'Rolgordijnen', open_all: 'Alles open', close_all: 'Alles dicht',
    hint: 'Sleep in een raam om het gordijn te verplaatsen', stop: 'Stop',
    n_open_one: '{n} open', n_open: '{n} open',
    dag: 'dag', schemer: 'schemer', nacht: 'nacht',
    helder: 'Helder', halfbewolkt: 'Halfbewolkt', bewolkt: 'Bewolkt', regen: 'Regen', onweer: 'Onweer', sneeuw: 'Sneeuw', mist: 'Mist',
    to: 'naar {p}%', opening: 'gaat open…', closing: 'gaat dicht…', stopped: 'gestopt', moving: 'beweegt…',
    open: 'Open', closed: 'Dicht', half: 'Half open',
    unavailable: 'Niet beschikbaar', not_found: 'Entiteit niet gevonden',
    aria_unavailable: '{name}, niet beschikbaar', aria_pos: '{name}, {p} procent open', aria_stop: 'Stop {name}',
    err_no_blinds: 'Voeg minstens één rolgordijn toe onder "blinds".', err_no_entity: 'Rolgordijn {n} heeft geen "entity".',
    description: 'Rolgordijnen als verticale ramen: slepen, stop, live positie en een lucht die het weer volgt.',
    l_title: 'Titel', l_weather: 'Weer-entiteit (voor de lucht)', l_sun: 'Zon-entiteit (dag/schemer/nacht)',
    l_glow: 'Sterkte van de gloed', l_columns: 'Kolommen (leeg = automatisch)', l_height: 'Hoogte van de ramen in px (leeg = automatisch)',
    l_background: 'Achtergrond', l_show_all_buttons: 'Knoppen "alles open/dicht" tonen', l_show_hint: 'Uitleg onderaan tonen',
    l_sky: 'Lucht met weer tonen', l_language: 'Taal', l_entity: 'Rolgordijn', l_name: 'Naam (optioneel)',
    l_invert: 'Positie omkeren (0 = open)', l_travel_time: 'Looptijd van open tot dicht (seconden)', l_fabric: 'Soort stof',
    bg_dark: 'Donker met gloed', bg_theme: 'Thema van je dashboard',
    fab_dimout: 'Deels verduisterend', fab_blackout: 'Volledig verduisterend',
    lang_auto: 'Automatisch (taal van Home Assistant)',
    ed_blind: 'Gordijn {n}', ed_up: 'Omhoog', ed_down: 'Omlaag', ed_delete: 'Verwijderen', ed_color: 'Eigen kleur', ed_add: '+ Rolgordijn toevoegen',
  },
  en: {
    title: 'Blinds', open_all: 'Open all', close_all: 'Close all',
    hint: 'Drag inside a window to move the blind', stop: 'Stop',
    n_open_one: '{n} open', n_open: '{n} open',
    dag: 'day', schemer: 'twilight', nacht: 'night',
    helder: 'Clear', halfbewolkt: 'Partly cloudy', bewolkt: 'Cloudy', regen: 'Rain', onweer: 'Thunderstorm', sneeuw: 'Snow', mist: 'Fog',
    to: 'to {p}%', opening: 'opening…', closing: 'closing…', stopped: 'stopped', moving: 'moving…',
    open: 'Open', closed: 'Closed', half: 'Partly open',
    unavailable: 'Unavailable', not_found: 'Entity not found',
    aria_unavailable: '{name}, unavailable', aria_pos: '{name}, {p} percent open', aria_stop: 'Stop {name}',
    err_no_blinds: 'Add at least one blind under "blinds".', err_no_entity: 'Blind {n} has no "entity".',
    description: 'Roller blinds as vertical windows: drag, stop, live position and a sky that follows the weather.',
    l_title: 'Title', l_weather: 'Weather entity (for the sky)', l_sun: 'Sun entity (day/twilight/night)',
    l_glow: 'Glow strength', l_columns: 'Columns (empty = automatic)', l_height: 'Window height in px (empty = automatic)',
    l_background: 'Background', l_show_all_buttons: 'Show "open/close all" buttons', l_show_hint: 'Show hint at the bottom',
    l_sky: 'Show sky with weather', l_language: 'Language', l_entity: 'Blind', l_name: 'Name (optional)',
    l_invert: 'Invert position (0 = open)', l_travel_time: 'Travel time from open to closed (seconds)', l_fabric: 'Fabric type',
    bg_dark: 'Dark with glow', bg_theme: 'Dashboard theme',
    fab_dimout: 'Dimout (partly darkening)', fab_blackout: 'Blackout (fully darkening)',
    lang_auto: 'Automatic (Home Assistant language)',
    ed_blind: 'Blind {n}', ed_up: 'Move up', ed_down: 'Move down', ed_delete: 'Remove', ed_color: 'Custom color', ed_add: '+ Add blind',
  },
  fr: {
    title: 'Stores', open_all: 'Tout ouvrir', close_all: 'Tout fermer',
    hint: 'Faites glisser dans une fenêtre pour déplacer le store', stop: 'Stop',
    n_open_one: '{n} ouvert', n_open: '{n} ouverts',
    dag: 'jour', schemer: 'crépuscule', nacht: 'nuit',
    helder: 'Dégagé', halfbewolkt: 'Partiellement nuageux', bewolkt: 'Nuageux', regen: 'Pluie', onweer: 'Orage', sneeuw: 'Neige', mist: 'Brouillard',
    to: 'vers {p}%', opening: 'ouverture…', closing: 'fermeture…', stopped: 'arrêté', moving: 'en mouvement…',
    open: 'Ouvert', closed: 'Fermé', half: 'Entrouvert',
    unavailable: 'Indisponible', not_found: 'Entité introuvable',
    aria_unavailable: '{name}, indisponible', aria_pos: '{name}, ouvert à {p} pour cent', aria_stop: 'Arrêter {name}',
    err_no_blinds: 'Ajoutez au moins un store sous "blinds".', err_no_entity: 'Le store {n} n\'a pas d\'"entity".',
    description: 'Des stores en fenêtres verticales : glisser, arrêter, position en direct et un ciel qui suit la météo.',
    l_title: 'Titre', l_weather: 'Entité météo (pour le ciel)', l_sun: 'Entité soleil (jour/crépuscule/nuit)',
    l_glow: 'Intensité de la lueur', l_columns: 'Colonnes (vide = automatique)', l_height: 'Hauteur des fenêtres en px (vide = automatique)',
    l_background: 'Arrière-plan', l_show_all_buttons: 'Afficher les boutons « tout ouvrir/fermer »', l_show_hint: 'Afficher l\'aide en bas',
    l_sky: 'Afficher le ciel avec la météo', l_language: 'Langue', l_entity: 'Store', l_name: 'Nom (facultatif)',
    l_invert: 'Inverser la position (0 = ouvert)', l_travel_time: 'Durée de l\'ouverture à la fermeture (secondes)', l_fabric: 'Type de tissu',
    bg_dark: 'Sombre avec lueur', bg_theme: 'Thème du tableau de bord',
    fab_dimout: 'Tamisant (partiellement occultant)', fab_blackout: 'Occultant (totalement)',
    lang_auto: 'Automatique (langue de Home Assistant)',
    ed_blind: 'Store {n}', ed_up: 'Monter', ed_down: 'Descendre', ed_delete: 'Supprimer', ed_color: 'Couleur personnalisée', ed_add: '+ Ajouter un store',
  },
  de: {
    title: 'Rollos', open_all: 'Alle öffnen', close_all: 'Alle schließen',
    hint: 'Im Fenster ziehen, um das Rollo zu bewegen', stop: 'Stopp',
    n_open_one: '{n} offen', n_open: '{n} offen',
    dag: 'Tag', schemer: 'Dämmerung', nacht: 'Nacht',
    helder: 'Klar', halfbewolkt: 'Teilweise bewölkt', bewolkt: 'Bewölkt', regen: 'Regen', onweer: 'Gewitter', sneeuw: 'Schnee', mist: 'Nebel',
    to: 'auf {p}%', opening: 'öffnet…', closing: 'schließt…', stopped: 'gestoppt', moving: 'bewegt sich…',
    open: 'Offen', closed: 'Geschlossen', half: 'Teilweise offen',
    unavailable: 'Nicht verfügbar', not_found: 'Entität nicht gefunden',
    aria_unavailable: '{name}, nicht verfügbar', aria_pos: '{name}, {p} Prozent offen', aria_stop: '{name} stoppen',
    err_no_blinds: 'Füge unter "blinds" mindestens ein Rollo hinzu.', err_no_entity: 'Rollo {n} hat keine "entity".',
    description: 'Rollos als senkrechte Fenster: ziehen, stoppen, Live-Position und ein Himmel, der dem Wetter folgt.',
    l_title: 'Titel', l_weather: 'Wetter-Entität (für den Himmel)', l_sun: 'Sonnen-Entität (Tag/Dämmerung/Nacht)',
    l_glow: 'Leuchtstärke', l_columns: 'Spalten (leer = automatisch)', l_height: 'Fensterhöhe in px (leer = automatisch)',
    l_background: 'Hintergrund', l_show_all_buttons: 'Schaltflächen „Alle öffnen/schließen“ anzeigen', l_show_hint: 'Hinweis unten anzeigen',
    l_sky: 'Himmel mit Wetter anzeigen', l_language: 'Sprache', l_entity: 'Rollo', l_name: 'Name (optional)',
    l_invert: 'Position umkehren (0 = offen)', l_travel_time: 'Laufzeit von offen bis geschlossen (Sekunden)', l_fabric: 'Stoffart',
    bg_dark: 'Dunkel mit Leuchten', bg_theme: 'Dashboard-Design',
    fab_dimout: 'Teilweise verdunkelnd', fab_blackout: 'Vollständig verdunkelnd',
    lang_auto: 'Automatisch (Sprache von Home Assistant)',
    ed_blind: 'Rollo {n}', ed_up: 'Nach oben', ed_down: 'Nach unten', ed_delete: 'Entfernen', ed_color: 'Eigene Farbe', ed_add: '+ Rollo hinzufügen',
  },
  es: {
    title: 'Estores', open_all: 'Abrir todo', close_all: 'Cerrar todo',
    hint: 'Arrastra dentro de una ventana para mover el estor', stop: 'Parar',
    n_open_one: '{n} abierto', n_open: '{n} abiertos',
    dag: 'día', schemer: 'crepúsculo', nacht: 'noche',
    helder: 'Despejado', halfbewolkt: 'Parcialmente nublado', bewolkt: 'Nublado', regen: 'Lluvia', onweer: 'Tormenta', sneeuw: 'Nieve', mist: 'Niebla',
    to: 'a {p}%', opening: 'abriendo…', closing: 'cerrando…', stopped: 'detenido', moving: 'en movimiento…',
    open: 'Abierto', closed: 'Cerrado', half: 'Entreabierto',
    unavailable: 'No disponible', not_found: 'Entidad no encontrada',
    aria_unavailable: '{name}, no disponible', aria_pos: '{name}, abierto al {p} por ciento', aria_stop: 'Parar {name}',
    err_no_blinds: 'Añade al menos un estor en "blinds".', err_no_entity: 'El estor {n} no tiene "entity".',
    description: 'Estores como ventanas verticales: arrastrar, parar, posición en directo y un cielo que sigue el tiempo.',
    l_title: 'Título', l_weather: 'Entidad del tiempo (para el cielo)', l_sun: 'Entidad del sol (día/crepúsculo/noche)',
    l_glow: 'Intensidad del brillo', l_columns: 'Columnas (vacío = automático)', l_height: 'Altura de las ventanas en px (vacío = automático)',
    l_background: 'Fondo', l_show_all_buttons: 'Mostrar botones «abrir/cerrar todo»', l_show_hint: 'Mostrar ayuda abajo',
    l_sky: 'Mostrar cielo con el tiempo', l_language: 'Idioma', l_entity: 'Estor', l_name: 'Nombre (opcional)',
    l_invert: 'Invertir posición (0 = abierto)', l_travel_time: 'Tiempo de recorrido de abierto a cerrado (segundos)', l_fabric: 'Tipo de tejido',
    bg_dark: 'Oscuro con brillo', bg_theme: 'Tema del panel',
    fab_dimout: 'Traslúcido (oscurece en parte)', fab_blackout: 'Opaco (oscurece por completo)',
    lang_auto: 'Automático (idioma de Home Assistant)',
    ed_blind: 'Estor {n}', ed_up: 'Subir', ed_down: 'Bajar', ed_delete: 'Eliminar', ed_color: 'Color personalizado', ed_add: '+ Añadir estor',
  },
  it: {
    title: 'Tende', open_all: 'Apri tutto', close_all: 'Chiudi tutto',
    hint: 'Trascina in una finestra per spostare la tenda', stop: 'Stop',
    n_open_one: '{n} aperta', n_open: '{n} aperte',
    dag: 'giorno', schemer: 'crepuscolo', nacht: 'notte',
    helder: 'Sereno', halfbewolkt: 'Parzialmente nuvoloso', bewolkt: 'Nuvoloso', regen: 'Pioggia', onweer: 'Temporale', sneeuw: 'Neve', mist: 'Nebbia',
    to: 'a {p}%', opening: 'in apertura…', closing: 'in chiusura…', stopped: 'fermata', moving: 'in movimento…',
    open: 'Aperta', closed: 'Chiusa', half: 'Socchiusa',
    unavailable: 'Non disponibile', not_found: 'Entità non trovata',
    aria_unavailable: '{name}, non disponibile', aria_pos: '{name}, aperta al {p} per cento', aria_stop: 'Ferma {name}',
    err_no_blinds: 'Aggiungi almeno una tenda in "blinds".', err_no_entity: 'La tenda {n} non ha "entity".',
    description: 'Tende come finestre verticali: trascina, ferma, posizione in tempo reale e un cielo che segue il meteo.',
    l_title: 'Titolo', l_weather: 'Entità meteo (per il cielo)', l_sun: 'Entità sole (giorno/crepuscolo/notte)',
    l_glow: 'Intensità del bagliore', l_columns: 'Colonne (vuoto = automatico)', l_height: 'Altezza delle finestre in px (vuoto = automatico)',
    l_background: 'Sfondo', l_show_all_buttons: 'Mostra i pulsanti «apri/chiudi tutto»', l_show_hint: 'Mostra suggerimento in basso',
    l_sky: 'Mostra il cielo con il meteo', l_language: 'Lingua', l_entity: 'Tenda', l_name: 'Nome (opzionale)',
    l_invert: 'Inverti posizione (0 = aperta)', l_travel_time: 'Tempo di corsa da aperta a chiusa (secondi)', l_fabric: 'Tipo di tessuto',
    bg_dark: 'Scuro con bagliore', bg_theme: 'Tema della dashboard',
    fab_dimout: 'Filtrante (oscura in parte)', fab_blackout: 'Oscurante (oscura completamente)',
    lang_auto: 'Automatico (lingua di Home Assistant)',
    ed_blind: 'Tenda {n}', ed_up: 'Su', ed_down: 'Giù', ed_delete: 'Rimuovi', ed_color: 'Colore personalizzato', ed_add: '+ Aggiungi tenda',
  },
};

function gbcLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GBC_I18N[l] ? l : 'en';
}

function gbcT(lang, key, vars) {
  let s = (GBC_I18N[lang] && GBC_I18N[lang][key]) || GBC_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}

// cover supported_features bits
const GBC_SET_POSITION = 4;
const GBC_STOP = 8;

function gbcRgb(hex) {
  let h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const v = parseInt(h.slice(0, 6), 16);
  if (isNaN(v)) return '185, 168, 255';
  return ((v >> 16) & 255) + ', ' + ((v >> 8) & 255) + ', ' + (v & 255);
}

function gbcClamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

/* ------------------------------------------------------------------ */
/*  Lucht (weer + dagdeel)                                             */
/* ------------------------------------------------------------------ */

// idx = nummer van het raam, zodat elk raam een ander stukje van dezelfde lucht toont.
// showOrb = alleen in één raam een zon of maan.
function gbcSkyHtml(weer, phase, idx = 0, showOrb = true) {
  const clear = weer === 'helder' || weer === 'halfbewolkt';
  const grim = weer === 'regen' || weer === 'onweer';
  const bgs = {
    dag: clear ? ['#5FB3F0', '#CDE9FB'] : grim ? ['#6B7B8E', '#A7B3C0'] : weer === 'sneeuw' ? ['#B4C2D0', '#E8EEF4'] : weer === 'mist' ? ['#BFC6CD', '#E4E7EA'] : ['#93A5B8', '#CCD5DE'],
    schemer: clear ? ['#5B4F9E', '#F6A578'] : ['#5E5872', '#B99A92'],
    nacht: clear ? ['#070D24', '#1E2A58'] : ['#141824', '#2C3346'],
  };
  const g = bgs[phase] || bgs.nacht;
  let html = '<div class="sky-bg" style="background:linear-gradient(180deg,' + g[0] + ',' + g[1] + ')"></div>';

  // sterren
  const starPts = [[12, 60], [30, 36], [22, 120], [52, 90], [74, 50], [86, 140], [42, 170]];
  const nStars = phase === 'nacht' ? (weer === 'helder' ? 7 : weer === 'halfbewolkt' ? 4 : 0) : 0;
  starPts.slice(0, nStars).forEach((p, k) => {
    const s = k % 2 ? 2 : 3;
    html += '<span class="star" style="left:' + ((p[0] + idx * 29) % 92) + '%;top:' + p[1] + 'px;width:' + s + 'px;height:' + s + 'px;opacity:' + (0.5 + (k % 3) * 0.15) + '"></span>';
  });

  // zon / maan
  if (clear && showOrb) {
    if (phase === 'dag') html += '<span class="orb sun"></span>';
    else if (phase === 'schemer') html += '<span class="orb sunset"></span>';
    else html += '<span class="orb moon"></span>';
  }

  // wolken: [top px, left %, breedte %]
  const sets = {
    helder: [],
    halfbewolkt: [[44, -6, 55], [118, 45, 42]],
    bewolkt: [[22, -15, 65], [64, 35, 60], [122, -8, 56], [172, 48, 52]],
    regen: [[18, -15, 68], [58, 33, 64], [110, -10, 58]],
    onweer: [[18, -15, 68], [58, 33, 64], [110, -10, 58]],
    sneeuw: [[18, -15, 65], [60, 35, 60]],
    mist: [[40, 20, 58]],
  };
  const fill = phase === 'nacht' ? '#3A4358' : phase === 'schemer' ? '#E7C3C0' : weer === 'onweer' ? '#6B7587' : weer === 'regen' ? '#97A3B2' : weer === 'bewolkt' ? '#E4E9EE' : '#FFFFFF';
  (sets[weer] || []).forEach((c, k) => {
    const left = idx ? ((c[1] + 15 + idx * 43) % 100) - 15 : c[1];
    html += '<span class="cloud" style="top:' + c[0] + 'px;left:' + left + '%;width:' + c[2] + '%;animation-duration:' + (6 + k) + 's">' +
      '<svg viewBox="0 0 62 44"><path d="M48 42H16a13 13 0 1 1 3-25.6A16 16 0 0 1 49 18a12 12 0 0 1-1 24z" fill="' + fill + '"/></svg></span>';
  });

  if (weer === 'mist') {
    [70, 130, 190].forEach((t) => { html += '<span class="mist" style="top:' + t + 'px"></span>'; });
  }
  if (grim) {
    for (let k = 0; k < 16; k++) {
      html += '<span class="drop" style="left:' + ((k * 37 + idx * 13) % 100) + '%;animation-delay:-' + ((k * 0.17) % 0.8).toFixed(2) + 's"></span>';
    }
  }
  if (weer === 'sneeuw') {
    for (let k = 0; k < 14; k++) {
      html += '<span class="flake" style="left:' + ((k * 41) % 100) + '%;animation-duration:' + (3.5 + (k % 3)) + 's;animation-delay:-' + ((k * 0.6) % 4).toFixed(1) + 's"></span>';
    }
  }
  if (weer === 'onweer') html += '<span class="flash"></span>';
  return html;
}

const GBC_STYLE = `
  :host { display: block; }
  ha-card {
    display: block;
    position: relative;
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 24px);
    padding: 16px;
    color: var(--glow-text, #F3F1FA);
    background: var(--glow-card-background, #15121F);
    border: 1px solid var(--glow-card-border, rgba(255, 255, 255, 0.08));
    box-sizing: border-box;
  }
  ha-card.theme-bg { background: var(--ha-card-background, var(--card-background-color)); color: var(--primary-text-color); }
  ha-card.theme-bg .halo { display: none; }
  /* één zachte lichtvlek, zoals bij de kamer- en scènekaarten; feller zolang een gordijn beweegt */
  .halo { position: absolute; right: -60px; top: -70px; width: 190px; height: 190px; border-radius: 50%; filter: blur(50px); pointer-events: none;
    background: rgb(var(--h, 185, 168, 255)); opacity: calc(0.22 * var(--glow-blob, 1)); transition: opacity 0.5s, background 0.5s; }
  ha-card.busy .halo { opacity: calc(0.5 * var(--glow-blob, 1)); }
  .wrap { position: relative; display: flex; flex-direction: column; gap: 16px; }

  .head { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
  .head .titles { display: flex; flex-direction: column; min-width: 0; }
  .head h2 { margin: 0; font-size: 21px; font-weight: 800; line-height: 1.2; }
  .head .summary { font-size: 13px; font-weight: 600; opacity: 0.75; }
  .head .btns { display: flex; gap: 8px; flex-shrink: 0; }
  .round {
    width: 44px; height: 44px; border-radius: 22px; padding: 0;
    border: 1px solid var(--glow-border, rgba(255, 255, 255, 0.12)); background: var(--glow-surface, rgba(255, 255, 255, 0.07));
    color: inherit; display: flex; align-items: center; justify-content: center; cursor: pointer;
  }
  .round:active { transform: scale(0.95); }
  .round svg { width: 18px; height: 18px; }

  .grid { display: grid; gap: 14px; }
  .blind { display: flex; flex-direction: column; gap: 8px; min-width: 0; --c: #B9A8FF; --rgb: 185, 168, 255; }

  .win {
    position: relative; padding: 0; overflow: hidden;
    border-radius: 16px; border: 5px solid var(--glow-frame, #2A2740); background: #0F1A33;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
    touch-action: none; cursor: ns-resize; user-select: none; -webkit-user-select: none;
    outline: none; box-sizing: border-box;
    --closed: 0; --gclosed: 0;
  }
  .win:focus-visible { box-shadow: 0 0 0 3px var(--c); }
  .win.unavailable { cursor: not-allowed; opacity: 0.5; }
  .sky { position: absolute; inset: 0; pointer-events: none; }
  .sky-bg { position: absolute; inset: 0; }
  .star { position: absolute; border-radius: 50%; background: #fff; }
  .orb { position: absolute; border-radius: 50%; }
  .orb.sun { right: 12%; top: 28px; width: 30px; height: 30px; background: #FFE58A; box-shadow: 0 0 30px 10px rgba(255, 229, 138, 0.6); }
  .orb.sunset { left: 14%; top: 62%; width: 34px; height: 34px; background: #FFB46B; box-shadow: 0 0 34px 12px rgba(255, 180, 107, 0.55); }
  .orb.moon { right: 12%; top: 28px; width: 22px; height: 22px; background: #FFF4D6; box-shadow: 0 0 22px 5px rgba(255, 244, 214, 0.45); }
  .cloud { position: absolute; opacity: 0.95; animation: gbc-drift 6s ease-in-out infinite alternate; }
  .cloud svg { display: block; width: 100%; height: auto; }
  .mist { position: absolute; left: -20%; right: -20%; height: 24px; border-radius: 12px; background: rgba(255, 255, 255, 0.45); filter: blur(5px); animation: gbc-drift 7s ease-in-out infinite alternate; }
  .drop { position: absolute; top: 0; width: 2px; height: 13px; border-radius: 1px; background: rgba(210, 228, 255, 0.75); animation: gbc-fall 0.8s linear infinite; }
  .flake { position: absolute; top: 0; width: 5px; height: 5px; border-radius: 50%; background: #fff; animation: gbc-snow 4s linear infinite; }
  .flash { position: absolute; inset: 0; background: rgba(255, 255, 240, 0.85); opacity: 0; animation: gbc-flash 6s linear infinite; }
  @keyframes gbc-fall { from { transform: translateY(-20px); } to { transform: translateY(520px); } }
  @keyframes gbc-snow { from { transform: translate(0, -20px); } to { transform: translate(12px, 520px); } }
  @keyframes gbc-drift { from { transform: translateX(-8px); } to { transform: translateX(8px); } }
  @keyframes gbc-flash { 0%, 90%, 100% { opacity: 0; } 92% { opacity: 1; } 93% { opacity: 0.2; } 95% { opacity: 0.9; } }

  .bar { position: absolute; left: 0; right: 0; top: 50%; height: 4px; background: var(--glow-frame, #2A2740); pointer-events: none; }
  .fabric, .ghost {
    position: absolute; left: 0; right: 0; top: 0; pointer-events: none;
  }
  .fabric {
    height: calc(14px + (100% - 14px) * var(--closed));
    background-color: var(--c);
    background-image: repeating-linear-gradient(180deg, rgba(255,255,255,0.16) 0 2px, rgba(0,0,0,0) 2px 16px);
    opacity: 0.72;
    transition: height 0.3s linear;
  }
  /* volledig verduisterend: dichte stof, geen lucht zichtbaar */
  .blind.blackout .fabric {
    opacity: 1;
    background-image:
      linear-gradient(rgba(0,0,0,0.18), rgba(0,0,0,0.18)),
      repeating-linear-gradient(180deg, rgba(255,255,255,0.08) 0 2px, rgba(0,0,0,0) 2px 16px);
  }
  .rail {
    position: absolute; left: 5px; right: 5px; height: 7px; border-radius: 4px; pointer-events: none;
    top: calc(14px + (100% - 14px) * var(--closed) - 6px);
    background: #fff;
    box-shadow: 0 0 var(--gbc-glow, 22px) 4px rgba(var(--rgb), 0.85);
    transition: top 0.3s linear;
  }
  .ghost { height: calc(14px + (100% - 14px) * var(--gclosed)); background: rgba(var(--rgb), 0.22); display: none; }
  .gline {
    position: absolute; left: 4px; right: 4px; height: 0; pointer-events: none; display: none;
    top: calc(14px + (100% - 14px) * var(--gclosed) - 1px);
    border-top: 2px dashed rgba(255, 255, 255, 0.9);
  }
  .win.has-target .ghost, .win.has-target .gline { display: block; }
  .win.dragging .fabric, .win.dragging .rail { transition: none; }
  .cassette { position: absolute; left: 0; right: 0; top: 0; height: 14px; background: var(--glow-cassette, #3A3654); box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35); pointer-events: none; }
  .bubble {
    position: absolute; left: 50%; transform: translateX(-50%);
    top: calc(14px + (100% - 14px) * var(--gclosed) - 40px);
    padding: 4px 10px; border-radius: 12px; font-size: 15px; font-weight: 800; color: #1C1730;
    background: var(--c); box-shadow: 0 0 var(--gbc-glow, 22px) rgba(var(--rgb), 0.8);
    white-space: nowrap; pointer-events: none; display: none;
  }
  .win.dragging .bubble { display: block; }

  .info { display: flex; justify-content: space-between; align-items: flex-end; gap: 6px; min-width: 0; }
  .meta { display: flex; flex-direction: column; min-width: 0; text-align: left; }
  .pct {
    flex-shrink: 0; font-size: 24px; font-weight: 800; line-height: 1.1; font-variant-numeric: tabular-nums;
    color: color-mix(in srgb, var(--c), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); text-shadow: 0 0 calc(var(--gbc-glow, 22px) * 0.8) rgba(var(--rgb), 0.6);
  }
  .name { font-size: 13px; font-weight: 800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
  .status { font-size: 12px; font-weight: 600; opacity: 0.7; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .stop {
    height: 46px; border-radius: 16px; font: inherit; font-size: 15px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.12); color: inherit; background: rgba(255, 255, 255, 0.07);
    transition: background 0.12s, box-shadow 0.12s, color 0.12s, transform 0.08s;
    touch-action: manipulation; -webkit-tap-highlight-color: transparent; user-select: none;
  }
  .stop:active, .stop.pressed { transform: scale(0.95); }
  .round { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
  .stop svg { width: 14px; height: 14px; fill: currentColor; }
  .stop.active { border-color: transparent; color: #1C1730; background: var(--c); box-shadow: 0 0 var(--gbc-glow, 22px) rgba(var(--rgb), 0.7); }
  .stop[hidden] { display: none; }
  .hint { margin: 0; font-size: 12px; font-weight: 600; opacity: 0.6; text-align: center; }
  .err { padding: 8px; color: #FF9FBF; font-size: 13px; }
`;

const ICON_UP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>';
const ICON_DOWN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
const ICON_STOP = '<svg viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="3"/></svg>';

/* ------------------------------------------------------------------ */
/*  De kaart                                                           */
/* ------------------------------------------------------------------ */

class GlowBlindsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._targets = {};
    this._drag = null;
    this._skyKey = null;
    this._built = false;
    this._keyTimers = {};
    this._moves = {};      // bewegingen gestart via de kaart
    this._last = {};       // laatst geziene positie + tijdstip van laatste verandering
    this._stoppedAt = {};  // tijdstip van laatste druk op stop
    this._disp = {};       // getoonde positie per gordijn
    this._tick = null;
  }

  connectedCallback() {
    if (this._hass && this._built) this._update();
  }

  disconnectedCallback() {
    clearInterval(this._tick);
    this._tick = null;
  }

  static getConfigElement() {
    return document.createElement('glow-blinds-card-editor');
  }

  static getStubConfig(hass) {
    const ids = Object.keys((hass && hass.states) || {});
    const covers = ids.filter((e) => e.startsWith('cover.')).slice(0, 2);
    const weather = ids.find((e) => e.startsWith('weather.'));
    const cfg = {
      blinds: (covers.length ? covers : ['cover.voorbeeld']).map((e, i) => ({ entity: e, color: GBC_PALETTE[i % GBC_PALETTE.length] })),
    };
    if (weather) cfg.weather = weather;
    return cfg;
  }

  setConfig(config) {
    const lang = gbcLang(this._hass, config && config.language);
    if (!config || !Array.isArray(config.blinds) || config.blinds.length === 0) {
      throw new Error(gbcT(lang, 'err_no_blinds'));
    }
    const blinds = config.blinds.map((b, i) => {
      const o = typeof b === 'string' ? { entity: b } : { ...b };
      if (!o.entity) throw new Error(gbcT(lang, 'err_no_entity', { n: i + 1 }));
      if (!o.color) o.color = GBC_PALETTE[i % GBC_PALETTE.length];
      return o;
    });
    this._config = {
      sun: 'sun.sun',
      glow: 15,
      show_all_buttons: true,
      show_hint: true,
      sky: true,
      background: 'dark',
      ...config,
      blinds,
    };
    this._targets = {};
    this._moves = {};
    this._last = {};
    this._stoppedAt = {};
    this._disp = {};
    this._built = false;
    this._skyKey = null;
    if (this._hass) {
      this._build();
      this._update();
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    if (this._built && this._builtLang !== this._lang()) this._built = false;
    if (!this._built) this._build();
    this._update();
  }

  get hass() {
    return this._hass;
  }

  getCardSize() {
    const n = this._config ? this._config.blinds.length : 2;
    return Math.ceil(n / this._cols()) * 6 + 1;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 'auto' };
  }

  _lang() {
    return gbcLang(this._hass, this._config && this._config.language);
  }

  _t(key, vars) {
    return gbcT(this._lang(), key, vars);
  }

  _cols() {
    const n = this._config.blinds.length;
    if (this._config.columns) return gbcClamp(parseInt(this._config.columns, 10) || 1, 1, 8);
    if (n <= 3) return n;
    if (n === 4) return 2;
    return 3;
  }

  _winHeight() {
    if (this._config.height) return parseInt(this._config.height, 10) || 270;
    const rows = Math.ceil(this._config.blinds.length / this._cols());
    return rows > 1 ? 170 : 270;
  }

  _build() {
    const c = this._config;
    const cols = this._cols();
    const t = (k, v) => this._t(k, v);
    this._builtLang = this._lang();
    const title = c.title === undefined || c.title === null ? t('title') : c.title;
    const blindsHtml = c.blinds.map((b, i) => `
      <div class="blind${(b.fabric || c.fabric) === 'blackout' ? ' blackout' : ''}" data-i="${i}" style="--c:${b.color};--rgb:${gbcRgb(b.color)}">
        <div class="win" data-i="${i}" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="100" style="height:${this._winHeight()}px">
          <div class="sky"></div>
          <div class="bar"></div>
          <div class="ghost"></div>
          <div class="fabric"></div>
          <div class="rail"></div>
          <div class="gline"></div>
          <div class="cassette"></div>
          <div class="bubble"></div>
        </div>
        <div class="info">
          <div class="meta">
            <span class="name"></span>
            <span class="status"></span>
          </div>
          <span class="pct">–</span>
        </div>
        <button class="stop" type="button" data-i="${i}">${ICON_STOP}<span>${t('stop')}</span></button>
      </div>`).join('');

    this.shadowRoot.innerHTML = `
      <style>${GBC_STYLE}</style>
      <ha-card class="${c.background === 'theme' ? 'theme-bg' : ''}" style="--gbc-glow:${parseInt(c.glow, 10) || 0}px">
        <div class="halo"></div>
        <div class="wrap">
          <div class="head">
            <div class="titles">
              ${title ? `<h2></h2>` : ''}
              <span class="summary"></span>
            </div>
            ${c.show_all_buttons ? `
            <div class="btns">
              <button class="round all-open" type="button" aria-label="${t('open_all')}" title="${t('open_all')}">${ICON_UP}</button>
              <button class="round all-close" type="button" aria-label="${t('close_all')}" title="${t('close_all')}">${ICON_DOWN}</button>
            </div>` : ''}
          </div>
          <div class="grid" style="grid-template-columns:repeat(${cols}, minmax(0, 1fr))">${blindsHtml}</div>
          ${c.show_hint ? '<p class="hint">' + t('hint') + '</p>' : ''}
        </div>
      </ha-card>`;

    const h2 = this.shadowRoot.querySelector('h2');
    if (h2) h2.textContent = title;

    this.shadowRoot.querySelectorAll('.win').forEach((win) => this._bindWindow(win));
    this.shadowRoot.querySelectorAll('.stop').forEach((btn) => {
      const i = parseInt(btn.dataset.i, 10);
      // meteen reageren bij aanraken, niet pas bij loslaten
      btn.addEventListener('pointerdown', (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        btn._firedAt = Date.now();
        this._stop(i);
      });
      // toetsenbord / fallback, zonder dubbel te versturen
      btn.addEventListener('click', () => {
        if (btn._firedAt && Date.now() - btn._firedAt < 800) return;
        this._stop(i);
      });
    });
    const ao = this.shadowRoot.querySelector('.all-open');
    const ac = this.shadowRoot.querySelector('.all-close');
    if (ao) ao.addEventListener('click', () => this._all('open_cover'));
    if (ac) ac.addEventListener('click', () => this._all('close_cover'));
    this._built = true;
    this._skyKey = null;
  }

  _bindWindow(win) {
    const i = parseInt(win.dataset.i, 10);
    const posFrom = (e) => {
      const r = win.getBoundingClientRect();
      const inner = Math.max(1, r.height - 14);
      const frac = gbcClamp((e.clientY - r.top - 14) / inner, 0, 1);
      return Math.round(100 - frac * 100);
    };
    win.addEventListener('pointerdown', (e) => {
      if (this._isUnavailable(i)) return;
      if (e.button !== undefined && e.button !== 0) return;
      try { win.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      this._drag = { i, pos: posFrom(e) };
      this._updateBlind(i);
      e.preventDefault();
    });
    win.addEventListener('pointermove', (e) => {
      if (!this._drag || this._drag.i !== i) return;
      this._drag.pos = posFrom(e);
      this._updateBlind(i);
    });
    const finish = (e, apply) => {
      if (!this._drag || this._drag.i !== i) return;
      const pos = apply ? posFrom(e) : null;
      this._drag = null;
      try { win.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      if (apply) this._setPos(i, pos);
      else this._updateBlind(i);
    };
    win.addEventListener('pointerup', (e) => finish(e, true));
    win.addEventListener('pointercancel', (e) => finish(e, false));
    win.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Home' && e.key !== 'End') return;
      e.preventDefault();
      const cur = this._targets[i] ? this._targets[i].pos : (this._getPos(i) ?? 0);
      let next = cur;
      if (e.key === 'ArrowUp') next = cur + 10;
      if (e.key === 'ArrowDown') next = cur - 10;
      if (e.key === 'Home') next = 100;
      if (e.key === 'End') next = 0;
      next = gbcClamp(next, 0, 100);
      this._targets[i] = { pos: next, t: Date.now() };
      this._updateBlind(i);
      clearTimeout(this._keyTimers[i]);
      this._keyTimers[i] = setTimeout(() => this._setPos(i, next), 500);
    });
  }

  _state(i) {
    const b = this._config.blinds[i];
    return this._hass && this._hass.states[b.entity];
  }

  _isUnavailable(i) {
    const st = this._state(i);
    return !st || st.state === 'unavailable' || st.state === 'unknown';
  }

  _getPos(i) {
    const st = this._state(i);
    if (!st) return null;
    let p = st.attributes.current_position;
    if (p === undefined || p === null) {
      if (st.state === 'closed') p = 0;
      else if (st.state === 'open') p = 100;
      else if (st.state === 'opening' || st.state === 'closing') p = 50;
      else return null;
    }
    p = gbcClamp(Number(p), 0, 100);
    if (this._config.blinds[i].invert) p = 100 - p;
    return p;
  }

  _call(service, data) {
    if (!this._hass) return;
    this._hass.callService('cover', service, data);
  }

  _setPos(i, pos) {
    const b = this._config.blinds[i];
    const st = this._state(i);
    if (!st) return;
    const feat = st.attributes.supported_features || 0;
    this._targets[i] = { pos, t: Date.now() };
    if (feat & GBC_SET_POSITION) {
      const real = b.invert ? 100 - pos : pos;
      this._call('set_cover_position', { entity_id: b.entity, position: real });
    } else {
      this._targets[i].pos = pos >= 50 ? 100 : 0;
      this._call(pos >= 50 ? 'open_cover' : 'close_cover', { entity_id: b.entity });
    }
    this._startMove(i, this._targets[i].pos);
    this._updateBlind(i);
  }

  // Onthoud dat er een beweging loopt. Veel motoren (o.a. Zigbee) melden geen
  // "opening/closing" of geven de eindpositie meteen door; daarom schatten we
  // hoelang de beweging duurt op basis van de looptijd van het gordijn.
  _startMove(i, target) {
    const b = this._config.blinds[i];
    const raw = this._getPos(i) ?? 0;
    const from = this._disp[i] !== undefined ? this._disp[i] : raw;
    const travel = Number(b.travel_time || this._config.travel_time || 30);
    const dur = Math.max(1000, (travel * 1000 * Math.abs(target - from)) / 100);
    const now = Date.now();
    this._moves[i] = { start: now, until: now + Math.max(3000, dur + 1500), dur, from, target, sawMotion: false, trusted: false };
    delete this._stoppedAt[i];
    this._ensureTick();
  }

  _stop(i) {
    const b = this._config.blinds[i];
    delete this._targets[i];
    delete this._moves[i];
    this._stoppedAt[i] = Date.now();
    const btn = this.shadowRoot.querySelector('.stop[data-i="' + i + '"]');
    if (btn) {
      btn.classList.add('pressed');
      setTimeout(() => btn.classList.remove('pressed'), 150);
    }
    this._updateBlind(i);
    this._call('stop_cover', { entity_id: b.entity });
    this._ensureTick();
  }

  // Ververst de kaart regelmatig zolang er iets beweegt, ook als Home
  // Assistant even geen nieuwe status doorstuurt.
  _ensureTick() {
    if (this._tick) return;
    this._tick = setInterval(() => {
      if (!this._hass || !this._built) return;
      const now = Date.now();
      const busy = Object.keys(this._moves).length > 0 ||
        Object.values(this._last).some((l) => now - l.at < 3000) ||
        Object.values(this._stoppedAt).some((t) => now - t < 3000);
      this._config.blinds.forEach((_, i) => this._updateBlind(i));
      if (!busy) {
        clearInterval(this._tick);
        this._tick = null;
      }
    }, 300);
  }

  _all(service) {
    const ids = this._config.blinds.map((b) => b.entity).filter((e) => this._hass && this._hass.states[e]);
    if (!ids.length) return;
    const pos = service === 'open_cover' ? 100 : 0;
    this._config.blinds.forEach((b, i) => {
      // bij "invert" is open/dicht omgekeerd voor de motor
      if (b.invert) {
        this._call(service === 'open_cover' ? 'close_cover' : 'open_cover', { entity_id: b.entity });
      }
      this._targets[i] = { pos, t: Date.now() };
      this._startMove(i, pos);
    });
    const normal = this._config.blinds.filter((b) => !b.invert).map((b) => b.entity);
    if (normal.length) this._call(service, { entity_id: normal });
    this._update();
  }

  _phase() {
    const sun = this._config.sun && this._hass.states[this._config.sun];
    if (sun) {
      const el = sun.attributes.elevation;
      if (typeof el === 'number') {
        if (el > 6) return 'dag';
        if (el > -6) return 'schemer';
        return 'nacht';
      }
      return sun.state === 'above_horizon' ? 'dag' : 'nacht';
    }
    const h = new Date().getHours();
    if (h >= 9 && h < 17) return 'dag';
    if (h >= 7 && h < 9) return 'schemer';
    if (h >= 17 && h < 19) return 'schemer';
    return 'nacht';
  }

  _weather() {
    const w = this._config.weather && this._hass.states[this._config.weather];
    if (!w) return 'helder';
    return GBC_WEATHER[w.state] || 'bewolkt';
  }

  _update() {
    if (!this._hass || !this._built) return;
    const c = this._config;

    const phase = this._phase();
    const weer = this._weather();
    const key = c.sky === false ? 'off|' + phase : weer + '|' + phase;
    if (key !== this._skyKey) {
      this._skyKey = key;
      // zon/maan maar één keer: in het meest rechtse raam van de bovenste rij
      const orbIdx = Math.min(this._cols(), c.blinds.length) - 1;
      this.shadowRoot.querySelectorAll('.sky').forEach((s, i) => {
        s.innerHTML = c.sky === false
          ? gbcSkyHtml('helder', 'nacht').split('<span')[0]
          : gbcSkyHtml(weer, phase, i, i === orbIdx);
      });
    }

    let open = 0;
    c.blinds.forEach((b, i) => {
      const p = this._getPos(i);
      if (p !== null && p > 0) open++;
      this._updateBlind(i);
    });

    const summary = this.shadowRoot.querySelector('.summary');
    if (summary) {
      const one = open === 1 || (open === 0 && this._lang() === 'fr');
      const parts = [this._t(one ? 'n_open_one' : 'n_open', { n: open })];
      if (c.sky !== false && c.weather) parts.push(this._t(weer));
      if (c.sky !== false) parts.push(this._t(phase));
      summary.textContent = parts.join(' · ');
    }
  }

  _updateHalo() {
    const card = this.shadowRoot.querySelector('ha-card');
    if (!card) return;
    const moving = this.shadowRoot.querySelector('.stop.active');
    card.classList.toggle('busy', !!moving);
    const blind = moving && moving.closest('.blind');
    card.style.setProperty('--h', blind ? gbcRgb(this._config.blinds[parseInt(blind.dataset.i, 10)].color) : '185, 168, 255');
  }

  _updateBlind(i) {
    const root = this.shadowRoot.querySelector('.blind[data-i="' + i + '"]');
    if (!root) return;
    const b = this._config.blinds[i];
    const st = this._state(i);
    const win = root.querySelector('.win');
    const pctEl = root.querySelector('.pct');
    const nameEl = root.querySelector('.name');
    const statusEl = root.querySelector('.status');
    const stopEl = root.querySelector('.stop');
    const bubble = root.querySelector('.bubble');

    const name = b.name || (st && st.attributes.friendly_name) || b.entity;
    nameEl.textContent = name;

    if (!st || this._isUnavailable(i)) {
      win.classList.add('unavailable');
      win.classList.remove('dragging', 'has-target');
      pctEl.textContent = '–';
      statusEl.textContent = this._t(st ? 'unavailable' : 'not_found');
      stopEl.classList.remove('active');
      win.setAttribute('aria-label', this._t('aria_unavailable', { name }));
      return;
    }
    win.classList.remove('unavailable');

    const raw = this._getPos(i) ?? 0;
    const feat = st.attributes.supported_features || 0;

    const now = Date.now();
    const motorState = st.state === 'opening' || st.state === 'closing';

    // positieveranderingen bijhouden: een veranderende positie = beweging,
    // ook als de motor geen "opening/closing" meldt
    let last = this._last[i];
    if (!last) {
      last = this._last[i] = { pos: raw, at: 0 };
    } else if (last.pos !== raw) {
      last.pos = raw;
      last.at = now;
      this._ensureTick();
    }
    if (motorState) this._ensureTick();

    // beweging die via de kaart gestart is
    // Sommige integraties zetten de positie meteen op de gekozen waarde
    // (optimistisch) en melden pas daarna de echte posities. Dan zou het
    // gordijn op de kaart eerst naar het doel springen, terug naar de
    // beginpositie gaan en pas dan live bewegen. Zolang we geen echte
    // tussenwaarde gezien hebben, tonen we daarom een geschatte positie.
    const mv = this._moves[i];
    let pos = raw;
    if (mv) {
      if (motorState) mv.sawMotion = true;
      if (!mv.trusted && raw !== mv.from && raw !== mv.target) mv.trusted = true;
      if (!mv.trusted && raw === mv.target && mv.target !== mv.from) {
        const f = gbcClamp((now - mv.start - 1200) / mv.dur, 0, 1);
        pos = Math.round(mv.from + (mv.target - mv.from) * f);
      }
      const reached = mv.trusted && Math.abs(mv.target - raw) <= 1 && now - last.at > 1500;
      const motorDone = mv.sawMotion && !motorState && now - last.at > 1000;
      if (now > mv.until || reached || motorDone) {
        delete this._moves[i];
        pos = raw;
      }
    }
    this._disp[i] = pos;

    // doel (stippellijn) opruimen als het bereikt is of de beweging voorbij is
    const tgt = this._targets[i];
    if (tgt) {
      const age = now - tgt.t;
      if (Math.abs(tgt.pos - pos) <= 1 || age > 180000 || (!this._moves[i] && !motorState && age > 2000)) {
        delete this._targets[i];
      }
    }

    const dragging = this._drag && this._drag.i === i;
    const target = dragging ? this._drag.pos : (this._targets[i] ? this._targets[i].pos : null);
    const justStopped = this._stoppedAt[i] && now - this._stoppedAt[i] < 2500;
    const moving = !dragging && !justStopped && (motorState || now - last.at < 2500 || !!this._moves[i]);

    win.style.setProperty('--closed', String((100 - pos) / 100));
    if (target !== null) win.style.setProperty('--gclosed', String((100 - target) / 100));
    win.classList.toggle('dragging', !!dragging);
    win.classList.toggle('has-target', target !== null);
    bubble.textContent = (target ?? pos) + '%';

    pctEl.textContent = pos + '%';

    let status;
    if (dragging) status = this._t('to', { p: target });
    else if (st.state === 'opening') status = this._t('opening');
    else if (st.state === 'closing') status = this._t('closing');
    else if (justStopped) status = this._t('stopped');
    else if (target !== null) status = this._t('to', { p: target });
    else if (moving) status = this._t('moving');
    else if (pos >= 100) status = this._t('open');
    else if (pos <= 0) status = this._t('closed');
    else status = this._t('half');
    statusEl.textContent = status;

    stopEl.hidden = !(feat & GBC_STOP) && feat !== 0;
    stopEl.classList.toggle('active', moving);
    stopEl.setAttribute('aria-label', this._t('aria_stop', { name }));

    win.setAttribute('aria-valuenow', String(pos));
    this._updateHalo();
    win.setAttribute('aria-label', this._t('aria_pos', { name, p: pos }));
  }
}

/* ------------------------------------------------------------------ */
/*  Visuele editor                                                     */
/* ------------------------------------------------------------------ */

function gbcMainSchema(lang) {
  const t = (k) => gbcT(lang, k);
  return [
  { name: 'title', selector: { text: {} } },
  { name: 'weather', selector: { entity: { domain: 'weather' } } },
  { name: 'sun', selector: { entity: { domain: 'sun' } } },
  { name: 'glow', selector: { number: { min: 0, max: 60, step: 2, mode: 'slider', unit_of_measurement: 'px' } } },
  {
    type: 'grid', name: '', schema: [
      { name: 'columns', selector: { number: { min: 1, max: 8, mode: 'box' } } },
      { name: 'height', selector: { number: { min: 100, max: 600, step: 10, mode: 'box', unit_of_measurement: 'px' } } },
    ],
  },
  {
    name: 'background', selector: {
      select: {
        mode: 'dropdown', options: [
          { value: 'dark', label: t('bg_dark') },
          { value: 'theme', label: t('bg_theme') },
        ],
      },
    },
  },
  {
    type: 'grid', name: '', schema: [
      { name: 'sky', selector: { boolean: {} } },
      { name: 'show_all_buttons', selector: { boolean: {} } },
      { name: 'show_hint', selector: { boolean: {} } },
    ],
  },
  {
    name: 'language', selector: {
      select: {
        mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }]
          .concat(Object.keys(GBC_LANG_NAMES).map((k) => ({ value: k, label: GBC_LANG_NAMES[k] }))),
      },
    },
  },
];
}

function gbcBlindSchema(lang) {
  const t = (k) => gbcT(lang, k);
  return [
  { name: 'entity', selector: { entity: { domain: 'cover' } } },
  { name: 'name', selector: { text: {} } },
  { name: 'travel_time', selector: { number: { min: 3, max: 300, mode: 'box', unit_of_measurement: 's' } } },
  {
    name: 'fabric', selector: {
      select: {
        mode: 'dropdown', options: [
          { value: 'dimout', label: t('fab_dimout') },
          { value: 'blackout', label: t('fab_blackout') },
        ],
      },
    },
  },
  { name: 'invert', selector: { boolean: {} } },
];
}

const GBC_EDITOR_STYLE = `
  .main { margin-bottom: 16px; }
  h3 { margin: 20px 0 8px; font-size: 16px; font-weight: 600; }
  .blind {
    border: 1px solid var(--divider-color, rgba(127,127,127,0.3));
    border-radius: 12px; padding: 12px; margin-bottom: 12px;
    border-left: 6px solid var(--c);
  }
  .row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
  .row .label { font-weight: 600; flex: 1; }
  .row input[type=color] { width: 44px; height: 32px; border: none; padding: 0; background: none; cursor: pointer; }
  .row button, .add {
    font: inherit; cursor: pointer; border-radius: 8px; padding: 6px 10px;
    border: 1px solid var(--divider-color, rgba(127,127,127,0.4));
    background: var(--secondary-background-color, transparent); color: var(--primary-text-color);
  }
  .swatches { display: flex; gap: 6px; }
  .sw { width: 22px; height: 22px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; padding: 0; }
  .sw.on { border-color: var(--primary-text-color); }
  .add { width: 100%; padding: 10px; font-weight: 600; }
`;

class GlowBlindsCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sig = null;
  }

  setConfig(config) {
    this._config = { ...config, blinds: (config.blinds || []).map((b) => (typeof b === 'string' ? { entity: b } : { ...b })) };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._config && gbcLang(hass, this._config.language) !== this._lang) {
      this._sig = null;
      this._render();
      return;
    }
    this.shadowRoot.querySelectorAll('ha-form').forEach((f) => { f.hass = hass; });
  }

  _emit(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
  }

  _render() {
    if (!this._config) return;
    const c = this._config;
    const lang = gbcLang(this._hass, c.language);
    this._lang = lang;
    const t = (k, v) => gbcT(lang, k, v);
    const label = (s) => gbcT(lang, 'l_' + s.name);
    const sig = lang + '|' + c.blinds.length + '|' + c.blinds.map((b) => b.color).join(',');

    if (sig === this._sig) {
      // alleen data bijwerken, zodat de focus in tekstvelden blijft
      const main = this.shadowRoot.querySelector('ha-form.main');
      if (main) main.data = this._mainData();
      this.shadowRoot.querySelectorAll('ha-form.bf').forEach((f) => {
        f.data = c.blinds[parseInt(f.dataset.i, 10)];
      });
      return;
    }
    this._sig = sig;

    this.shadowRoot.innerHTML = `<style>${GBC_EDITOR_STYLE}</style>`;

    const main = document.createElement('ha-form');
    main.className = 'main';
    main.hass = this._hass;
    main.schema = gbcMainSchema(lang);
    main.data = this._mainData();
    main.computeLabel = label;
    main.addEventListener('value-changed', (e) => {
      const v = { ...e.detail.value };
      ['columns', 'height'].forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined) delete v[k]; });
      ['weather'].forEach((k) => { if (!v[k]) delete v[k]; });
      if (!v.language || v.language === 'auto') delete v.language;
      this._emit({ ...this._config, ...v, blinds: this._config.blinds });
    });
    this.shadowRoot.appendChild(main);

    const h3 = document.createElement('h3');
    h3.textContent = t('title');
    this.shadowRoot.appendChild(h3);

    c.blinds.forEach((b, i) => {
      const color = b.color || GBC_PALETTE[i % GBC_PALETTE.length];
      const box = document.createElement('div');
      box.className = 'blind';
      box.style.setProperty('--c', color);

      const row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = `<span class="label">${t('ed_blind', { n: i + 1 })}</span>
        <span class="swatches">${GBC_PALETTE.map((p) => `<button type="button" class="sw${p.toLowerCase() === color.toLowerCase() ? ' on' : ''}" style="background:${p}" data-col="${p}" title="${p}"></button>`).join('')}</span>
        <input type="color" value="${/^#[0-9a-f]{6}$/i.test(color) ? color : '#b9a8ff'}" title="${t('ed_color')}">
        <button type="button" class="up" title="${t('ed_up')}" ${i === 0 ? 'disabled' : ''}>↑</button>
        <button type="button" class="down" title="${t('ed_down')}" ${i === c.blinds.length - 1 ? 'disabled' : ''}>↓</button>
        <button type="button" class="del" title="${t('ed_delete')}">${t('ed_delete')}</button>`;
      box.appendChild(row);

      row.querySelectorAll('.sw').forEach((sw) => sw.addEventListener('click', () => this._patch(i, { color: sw.dataset.col })));
      row.querySelector('input[type=color]').addEventListener('change', (e) => this._patch(i, { color: e.target.value.toUpperCase() }));
      row.querySelector('.up').addEventListener('click', () => this._move(i, -1));
      row.querySelector('.down').addEventListener('click', () => this._move(i, 1));
      row.querySelector('.del').addEventListener('click', () => {
        const blinds = this._config.blinds.filter((_, k) => k !== i);
        this._emit({ ...this._config, blinds });
        this._render();
      });

      const f = document.createElement('ha-form');
      f.className = 'bf';
      f.dataset.i = String(i);
      f.hass = this._hass;
      f.schema = gbcBlindSchema(lang);
      f.data = b;
      f.computeLabel = label;
      f.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        if (!v.name) delete v.name;
        if (!v.invert) delete v.invert;
        if (!v.travel_time) delete v.travel_time;
        const blinds = this._config.blinds.slice();
        blinds[i] = { ...v, color: blinds[i].color };
        this._emit({ ...this._config, blinds });
      });
      box.appendChild(f);
      this.shadowRoot.appendChild(box);
    });

    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'add';
    add.textContent = t('ed_add');
    add.addEventListener('click', () => {
      const used = new Set(this._config.blinds.map((b) => b.entity));
      const free = Object.keys((this._hass && this._hass.states) || {}).find((e) => e.startsWith('cover.') && !used.has(e));
      const n = this._config.blinds.length;
      const blinds = this._config.blinds.concat([{ entity: free || '', color: GBC_PALETTE[n % GBC_PALETTE.length] }]);
      this._emit({ ...this._config, blinds });
      this._render();
    });
    this.shadowRoot.appendChild(add);
  }

  _mainData() {
    const c = this._config;
    return {
      title: c.title ?? gbcT(this._lang || 'en', 'title'),
      language: c.language ?? 'auto',
      weather: c.weather,
      sun: c.sun ?? 'sun.sun',
      glow: c.glow ?? 15,
      columns: c.columns,
      height: c.height,
      background: c.background ?? 'dark',
      sky: c.sky !== false,
      show_all_buttons: c.show_all_buttons !== false,
      show_hint: c.show_hint !== false,
    };
  }

  _patch(i, p) {
    const blinds = this._config.blinds.slice();
    blinds[i] = { ...blinds[i], ...p };
    this._emit({ ...this._config, blinds });
    this._render();
  }

  _move(i, d) {
    const j = i + d;
    const blinds = this._config.blinds.slice();
    if (j < 0 || j >= blinds.length) return;
    [blinds[i], blinds[j]] = [blinds[j], blinds[i]];
    this._emit({ ...this._config, blinds });
    this._sig = null;
    this._render();
  }
}

if (!customElements.get('glow-blinds-card')) {
  customElements.define('glow-blinds-card', GlowBlindsCard);
}
if (!customElements.get('glow-blinds-card-editor')) {
  customElements.define('glow-blinds-card-editor', GlowBlindsCardEditor);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === 'glow-blinds-card')) {
  window.customCards.push({
    type: 'glow-blinds-card',
    name: 'Glow Blinds Card',
    description: gbcT(gbcLang(null), 'description'),
    preview: true,
    documentationURL: 'https://github.com/stijnleroy/glow-blinds-card',
  });
}


}

/* ---- energy.js ---- */
{
/*
 * Glow Energy Card
 * Een Home Assistant dashboardkaart voor zonnepanelen, thuisbatterij en net:
 * een advies dat je van ver ziet ("verbruik maar" / "met mate" / "liever later"),
 * een stroomschema met lopende stroom en swipebare tegels.
 *
 * https://github.com/stijnleroy/glow-energy-card
 * Licentie: MIT
 */

const GEC_VERSION = '1.1.0';

const GEC_COL = {
  sun: '255, 224, 138',
  grid: '142, 197, 255',
  batt: '143, 227, 184',
  house: '255, 184, 153',
  exp: '185, 168, 255',
  go: '143, 227, 184',
  ok: '255, 210, 122',
  wait: '255, 159, 191',
};

const GEC_PALETTE = ['#8FE3B8', '#FFE08A', '#FFB899', '#B9A8FF', '#8EC5FF', '#FF9FBF'];

/* ------------------------------------------------------------------ */
/*  Vertalingen                                                        */
/* ------------------------------------------------------------------ */

const GEC_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };

const GEC_I18N = {
  nl: {
    go_tag: 'GROEN LICHT', go_title: 'Verbruik maar!',
    ok_tag: 'MET MATE', ok_title: 'Kleine toestellen oké',
    wait_tag: 'EVEN WACHTEN', wait_title: 'Liever later',
    battery: 'Batterij', full: 'Vol', good: 'Goed geladen', half: 'Half geladen', low: 'Bijna leeg',
    charging: 'laadt', discharging: 'levert', idle: 'rust',
    solar: 'Zon', grid: 'Net', house: 'Huis', import: 'afname', export: 'injectie',
    self: 'Zelfvoorzienend', self_sub: 'van je verbruik nu',
    unavailable: 'niet beschikbaar', next: 'Volgende tegel', prev: 'Vorige tegel', tile: 'Tegel {n}',
    err_solar: 'Vul minstens "solar" of "grid" in.',
    l_solar: 'Zonnepanelen – vermogen', l_grid: 'Net – vermogen (positief = afname)', l_battery: 'Batterij – laad/ontlaadvermogen (positief = laden)',
    l_battery_soc: 'Batterij – percentage', l_house: 'Thuisverbruik (leeg = berekenen)', l_invert_grid: 'Teken net omkeren', l_invert_battery: 'Teken batterij omkeren',
    l_units: 'Eenheden', u_w: 'Altijd W en Wh', u_auto: 'Automatisch kW en kWh',
    l_surplus: 'Groen licht vanaf overschot (W)', l_soc_ok: 'Met mate vanaf batterij (%)', l_soc_full: 'Batterij vol vanaf (%)', l_advice_delay: 'Advies pas wijzigen na (seconden)',
    l_auto_rotate: 'Tegels automatisch wisselen (seconden, 0 = uit)', l_glow: 'Sterkte van de gloed', l_height: 'Hoogte van de kaart (px)', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    l_type: 'Soort tegel', t_entity: 'Sensor', t_self: 'Zelfvoorzienend (berekend)',
    l_entity: 'Sensor', l_name: 'Naam', l_icon: 'Icoon (optioneel)', l_secondary: 'Tweede sensor (optioneel)', l_secondary_name: 'Tekst voor tweede sensor', l_sub: 'Vaste uitleg (optioneel)',
    ed_entities: 'Sensoren', ed_advice: 'Advies', ed_display: 'Weergave', ed_tiles: 'Tegels', ed_tile: 'Tegel {n}', ed_add: '+ Tegel toevoegen', ed_delete: 'Verwijderen', ed_up: 'Omhoog', ed_down: 'Omlaag', ed_color: 'Eigen kleur',
    description: 'Zon, batterij en net met een advies dat je van ver ziet: verbruik maar, met mate of liever later.',
  },
  en: {
    go_tag: 'GREEN LIGHT', go_title: 'Go ahead!',
    ok_tag: 'IN MODERATION', ok_title: 'Small appliances OK',
    wait_tag: 'HOLD ON', wait_title: 'Better wait',
    battery: 'Battery', full: 'Full', good: 'Well charged', half: 'Half charged', low: 'Almost empty',
    charging: 'charging', discharging: 'supplying', idle: 'idle',
    solar: 'Solar', grid: 'Grid', house: 'Home', import: 'import', export: 'export',
    self: 'Self-sufficient', self_sub: 'of your usage now',
    unavailable: 'unavailable', next: 'Next tile', prev: 'Previous tile', tile: 'Tile {n}',
    err_solar: 'Fill in at least "solar" or "grid".',
    l_solar: 'Solar panels – power', l_grid: 'Grid – power (positive = import)', l_battery: 'Battery – charge/discharge power (positive = charging)',
    l_battery_soc: 'Battery – state of charge', l_house: 'Home usage (empty = calculate)', l_invert_grid: 'Invert grid sign', l_invert_battery: 'Invert battery sign',
    l_units: 'Units', u_w: 'Always W and Wh', u_auto: 'Automatic kW and kWh',
    l_surplus: 'Green light from surplus (W)', l_soc_ok: 'Moderation from battery (%)', l_soc_full: 'Battery full from (%)', l_advice_delay: 'Change advice only after (seconds)',
    l_auto_rotate: 'Rotate tiles automatically (seconds, 0 = off)', l_glow: 'Glow strength', l_height: 'Card height (px)', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    l_type: 'Tile type', t_entity: 'Sensor', t_self: 'Self-sufficiency (calculated)',
    l_entity: 'Sensor', l_name: 'Name', l_icon: 'Icon (optional)', l_secondary: 'Second sensor (optional)', l_secondary_name: 'Text for second sensor', l_sub: 'Fixed caption (optional)',
    ed_entities: 'Sensors', ed_advice: 'Advice', ed_display: 'Display', ed_tiles: 'Tiles', ed_tile: 'Tile {n}', ed_add: '+ Add tile', ed_delete: 'Remove', ed_up: 'Move up', ed_down: 'Move down', ed_color: 'Custom color',
    description: 'Solar, battery and grid with advice you can see from across the room: go ahead, in moderation or better wait.',
  },
  fr: {
    go_tag: 'FEU VERT', go_title: 'Allez-y !',
    ok_tag: 'AVEC MODÉRATION', ok_title: 'Petits appareils OK',
    wait_tag: 'PATIENCE', wait_title: 'Plutôt plus tard',
    battery: 'Batterie', full: 'Pleine', good: 'Bien chargée', half: 'À moitié chargée', low: 'Presque vide',
    charging: 'charge', discharging: 'fournit', idle: 'au repos',
    solar: 'Soleil', grid: 'Réseau', house: 'Maison', import: 'prélèvement', export: 'injection',
    self: 'Autonomie', self_sub: 'de votre consommation',
    unavailable: 'indisponible', next: 'Tuile suivante', prev: 'Tuile précédente', tile: 'Tuile {n}',
    err_solar: 'Renseignez au moins "solar" ou "grid".',
    l_solar: 'Panneaux solaires – puissance', l_grid: 'Réseau – puissance (positive = prélèvement)', l_battery: 'Batterie – puissance charge/décharge (positive = charge)',
    l_battery_soc: 'Batterie – pourcentage', l_house: 'Consommation maison (vide = calculer)', l_invert_grid: 'Inverser le signe du réseau', l_invert_battery: 'Inverser le signe de la batterie',
    l_units: 'Unités', u_w: 'Toujours W et Wh', u_auto: 'kW et kWh automatiques',
    l_surplus: 'Feu vert à partir d\'un surplus de (W)', l_soc_ok: 'Modération à partir de (%) de batterie', l_soc_full: 'Batterie pleine à partir de (%)', l_advice_delay: 'Changer le conseil après (secondes)',
    l_auto_rotate: 'Faire défiler les tuiles (secondes, 0 = non)', l_glow: 'Intensité de la lueur', l_height: 'Hauteur de la carte (px)', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    l_type: 'Type de tuile', t_entity: 'Capteur', t_self: 'Autonomie (calculée)',
    l_entity: 'Capteur', l_name: 'Nom', l_icon: 'Icône (facultatif)', l_secondary: 'Second capteur (facultatif)', l_secondary_name: 'Texte du second capteur', l_sub: 'Légende fixe (facultatif)',
    ed_entities: 'Capteurs', ed_advice: 'Conseil', ed_display: 'Affichage', ed_tiles: 'Tuiles', ed_tile: 'Tuile {n}', ed_add: '+ Ajouter une tuile', ed_delete: 'Supprimer', ed_up: 'Monter', ed_down: 'Descendre', ed_color: 'Couleur personnalisée',
    description: 'Soleil, batterie et réseau avec un conseil visible de loin : allez-y, avec modération ou plutôt plus tard.',
  },
  de: {
    go_tag: 'GRÜNES LICHT', go_title: 'Nur zu!',
    ok_tag: 'IN MASSEN', ok_title: 'Kleine Geräte OK',
    wait_tag: 'KURZ WARTEN', wait_title: 'Lieber später',
    battery: 'Batterie', full: 'Voll', good: 'Gut geladen', half: 'Halb geladen', low: 'Fast leer',
    charging: 'lädt', discharging: 'liefert', idle: 'Ruhe',
    solar: 'Sonne', grid: 'Netz', house: 'Haus', import: 'Bezug', export: 'Einspeisung',
    self: 'Autarkie', self_sub: 'deines Verbrauchs jetzt',
    unavailable: 'nicht verfügbar', next: 'Nächste Kachel', prev: 'Vorherige Kachel', tile: 'Kachel {n}',
    err_solar: 'Gib mindestens "solar" oder "grid" an.',
    l_solar: 'Solaranlage – Leistung', l_grid: 'Netz – Leistung (positiv = Bezug)', l_battery: 'Batterie – Lade-/Entladeleistung (positiv = Laden)',
    l_battery_soc: 'Batterie – Ladestand', l_house: 'Hausverbrauch (leer = berechnen)', l_invert_grid: 'Vorzeichen Netz umkehren', l_invert_battery: 'Vorzeichen Batterie umkehren',
    l_units: 'Einheiten', u_w: 'Immer W und Wh', u_auto: 'Automatisch kW und kWh',
    l_surplus: 'Grünes Licht ab Überschuss (W)', l_soc_ok: 'In Maßen ab Batterie (%)', l_soc_full: 'Batterie voll ab (%)', l_advice_delay: 'Empfehlung erst ändern nach (Sekunden)',
    l_auto_rotate: 'Kacheln automatisch wechseln (Sekunden, 0 = aus)', l_glow: 'Leuchtstärke', l_height: 'Kartenhöhe (px)', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    l_type: 'Kacheltyp', t_entity: 'Sensor', t_self: 'Autarkie (berechnet)',
    l_entity: 'Sensor', l_name: 'Name', l_icon: 'Symbol (optional)', l_secondary: 'Zweiter Sensor (optional)', l_secondary_name: 'Text für zweiten Sensor', l_sub: 'Fester Untertitel (optional)',
    ed_entities: 'Sensoren', ed_advice: 'Empfehlung', ed_display: 'Anzeige', ed_tiles: 'Kacheln', ed_tile: 'Kachel {n}', ed_add: '+ Kachel hinzufügen', ed_delete: 'Entfernen', ed_up: 'Nach oben', ed_down: 'Nach unten', ed_color: 'Eigene Farbe',
    description: 'Sonne, Batterie und Netz mit einer Empfehlung, die man von weitem sieht: nur zu, in Maßen oder lieber später.',
  },
  es: {
    go_tag: 'LUZ VERDE', go_title: '¡Adelante!',
    ok_tag: 'CON MODERACIÓN', ok_title: 'Aparatos pequeños OK',
    wait_tag: 'ESPERA', wait_title: 'Mejor más tarde',
    battery: 'Batería', full: 'Llena', good: 'Bien cargada', half: 'Media carga', low: 'Casi vacía',
    charging: 'cargando', discharging: 'aportando', idle: 'en reposo',
    solar: 'Sol', grid: 'Red', house: 'Casa', import: 'consumo', export: 'vertido',
    self: 'Autosuficiencia', self_sub: 'de tu consumo ahora',
    unavailable: 'no disponible', next: 'Siguiente', prev: 'Anterior', tile: 'Ficha {n}',
    err_solar: 'Indica al menos "solar" o "grid".',
    l_solar: 'Paneles solares – potencia', l_grid: 'Red – potencia (positiva = consumo)', l_battery: 'Batería – potencia de carga/descarga (positiva = carga)',
    l_battery_soc: 'Batería – porcentaje', l_house: 'Consumo de la casa (vacío = calcular)', l_invert_grid: 'Invertir signo de la red', l_invert_battery: 'Invertir signo de la batería',
    l_units: 'Unidades', u_w: 'Siempre W y Wh', u_auto: 'kW y kWh automáticos',
    l_surplus: 'Luz verde con excedente desde (W)', l_soc_ok: 'Moderación desde batería (%)', l_soc_full: 'Batería llena desde (%)', l_advice_delay: 'Cambiar el consejo tras (segundos)',
    l_auto_rotate: 'Rotar fichas automáticamente (segundos, 0 = no)', l_glow: 'Intensidad del brillo', l_height: 'Altura de la tarjeta (px)', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    l_type: 'Tipo de ficha', t_entity: 'Sensor', t_self: 'Autosuficiencia (calculada)',
    l_entity: 'Sensor', l_name: 'Nombre', l_icon: 'Icono (opcional)', l_secondary: 'Segundo sensor (opcional)', l_secondary_name: 'Texto del segundo sensor', l_sub: 'Texto fijo (opcional)',
    ed_entities: 'Sensores', ed_advice: 'Consejo', ed_display: 'Visualización', ed_tiles: 'Fichas', ed_tile: 'Ficha {n}', ed_add: '+ Añadir ficha', ed_delete: 'Eliminar', ed_up: 'Subir', ed_down: 'Bajar', ed_color: 'Color personalizado',
    description: 'Sol, batería y red con un consejo que se ve de lejos: adelante, con moderación o mejor más tarde.',
  },
  it: {
    go_tag: 'VIA LIBERA', go_title: 'Vai pure!',
    ok_tag: 'CON MODERAZIONE', ok_title: 'Piccoli elettrodomestici OK',
    wait_tag: 'ASPETTA', wait_title: 'Meglio dopo',
    battery: 'Batteria', full: 'Piena', good: 'Ben carica', half: 'Carica a metà', low: 'Quasi scarica',
    charging: 'in carica', discharging: 'fornisce', idle: 'a riposo',
    solar: 'Sole', grid: 'Rete', house: 'Casa', import: 'prelievo', export: 'immissione',
    self: 'Autosufficienza', self_sub: 'del tuo consumo ora',
    unavailable: 'non disponibile', next: 'Successiva', prev: 'Precedente', tile: 'Riquadro {n}',
    err_solar: 'Indica almeno "solar" o "grid".',
    l_solar: 'Pannelli solari – potenza', l_grid: 'Rete – potenza (positiva = prelievo)', l_battery: 'Batteria – potenza carica/scarica (positiva = carica)',
    l_battery_soc: 'Batteria – percentuale', l_house: 'Consumo casa (vuoto = calcola)', l_invert_grid: 'Inverti segno rete', l_invert_battery: 'Inverti segno batteria',
    l_units: 'Unità', u_w: 'Sempre W e Wh', u_auto: 'kW e kWh automatici',
    l_surplus: 'Via libera da un surplus di (W)', l_soc_ok: 'Moderazione da batteria (%)', l_soc_full: 'Batteria piena da (%)', l_advice_delay: 'Cambia consiglio dopo (secondi)',
    l_auto_rotate: 'Scorri i riquadri automaticamente (secondi, 0 = no)', l_glow: 'Intensità del bagliore', l_height: 'Altezza della scheda (px)', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    l_type: 'Tipo di riquadro', t_entity: 'Sensore', t_self: 'Autosufficienza (calcolata)',
    l_entity: 'Sensore', l_name: 'Nome', l_icon: 'Icona (opzionale)', l_secondary: 'Secondo sensore (opzionale)', l_secondary_name: 'Testo per il secondo sensore', l_sub: 'Didascalia fissa (opzionale)',
    ed_entities: 'Sensori', ed_advice: 'Consiglio', ed_display: 'Visualizzazione', ed_tiles: 'Riquadri', ed_tile: 'Riquadro {n}', ed_add: '+ Aggiungi riquadro', ed_delete: 'Rimuovi', ed_up: 'Su', ed_down: 'Giù', ed_color: 'Colore personalizzato',
    description: 'Sole, batteria e rete con un consiglio visibile da lontano: vai pure, con moderazione o meglio dopo.',
  },
};

function gecLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GEC_I18N[l] ? l : 'en';
}

function gecT(lang, key, vars) {
  let s = (GEC_I18N[lang] && GEC_I18N[lang][key]) || GEC_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}

function gecRgb(hex) {
  let h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const v = parseInt(h.slice(0, 6), 16);
  if (isNaN(v)) return '185, 168, 255';
  return ((v >> 16) & 255) + ', ' + ((v >> 8) & 255) + ', ' + (v & 255);
}

function gecEsc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ------------------------------------------------------------------ */
/*  Iconen                                                             */
/* ------------------------------------------------------------------ */

const GEC_SVG = (inner, w = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
const GEC_ICONS = {
  sun: GEC_SVG('<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.9 4.9l1.4 1.4"/><path d="M17.7 17.7l1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.9 19.1l1.4-1.4"/><path d="M17.7 6.3l1.4-1.4"/>'),
  grid: GEC_SVG('<path d="M8 2l-3 20"/><path d="M16 2l3 20"/><path d="M6.5 9h11"/><path d="M5.5 15h13"/><path d="M8 2h8"/>'),
  battery: GEC_SVG('<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><path d="M7 11v2"/><path d="M11 11v2"/>'),
  home: GEC_SVG('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>'),
  bolt: GEC_SVG('<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>', 2.2),
  gauge: GEC_SVG('<path d="M3.5 17a9 9 0 1 1 17 0"/><path d="M12 15V9"/><circle cx="12" cy="16" r="1.5"/><path d="M5.6 9.6l1.2.8"/><path d="M18.4 9.6l-1.2.8"/>', 2.2),
  hourglass: GEC_SVG('<path d="M6 2h12"/><path d="M6 22h12"/><path d="M7 2v4a5 5 0 0 0 10 0V2"/><path d="M7 22v-4a5 5 0 0 1 10 0v4"/>', 2.2),
  leaf: GEC_SVG('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.1-6"/>', 2.4),
  peak: GEC_SVG('<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', 2.4),
  arrow: GEC_SVG('<path d="M7 17L17 7"/><path d="M7 7h10v10"/>', 2.4),
};

function gecIconHtml(icon) {
  if (icon && String(icon).includes(':')) return `<ha-icon icon="${gecEsc(icon)}"></ha-icon>`;
  return GEC_ICONS[icon] || GEC_ICONS.bolt;
}

/* ------------------------------------------------------------------ */
/*  Stijl                                                              */
/* ------------------------------------------------------------------ */

const GEC_STYLE = `
  :host { display: block; }
  ha-card {
    display: block; position: relative; overflow: hidden; box-sizing: border-box;
    border-radius: var(--ha-card-border-radius, 24px); padding: 16px; color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid var(--glow-card-border, rgba(255, 255, 255, 0.08));
  }
  .wrap { position: relative; display: flex; gap: 14px; height: var(--gec-h, 218px); }

  /* advies */
  .adv {
    position: relative; overflow: hidden; flex: 0 0 30%; min-width: 190px; max-width: 260px; box-sizing: border-box;
    border-radius: 22px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;
    background: rgba(var(--a), 0.14); border: 1.5px solid rgba(var(--a), 0.55);
    box-shadow: 0 0 var(--glow) rgba(var(--a), 0.35);
    transition: background 0.6s, border-color 0.6s, box-shadow 0.6s;
  }
  .halo { position: absolute; right: -60px; top: -60px; width: 180px; height: 180px; border-radius: 50%; background: rgb(var(--a)); opacity: 0.35; filter: blur(50px); animation: gec-breathe 3s ease-in-out infinite; pointer-events: none; }
  .adv-head { position: relative; display: flex; align-items: center; gap: 10px; }
  .adv-icon { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #1C1730; background: rgb(var(--a)); box-shadow: 0 0 var(--glow) rgba(var(--a), 0.8); flex-shrink: 0; }
  .adv-icon svg { width: 30px; height: 30px; }
  .adv-tag { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; color: color-mix(in srgb, rgb(var(--a)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .adv-title { position: relative; font-size: 28px; font-weight: 800; line-height: 1.05; letter-spacing: -0.01em; }
  .soc { position: relative; display: flex; flex-direction: column; gap: 6px; cursor: pointer; }
  .soc-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; font-weight: 700; }
  .soc-row b { font-size: 20px; font-weight: 800; }
  .soc-track { height: 14px; border-radius: 7px; background: var(--glow-surface, rgba(255, 255, 255, 0.1)); overflow: hidden; }
  .soc-bar { height: 14px; border-radius: 7px; width: 0; background: rgb(var(--s)); box-shadow: 0 0 calc(var(--glow) * 0.7) rgba(var(--s), 0.8); transition: width 0.8s; }
  .soc-label { font-size: 12px; font-weight: 600; opacity: 0.75; }

  /* schema */
  .flow { position: relative; flex: 0 0 290px; width: 290px; height: 218px; align-self: center; }
  .flow svg.lines { position: absolute; left: 0; top: 0; }
  .dot { position: absolute; left: 0; top: 0; width: 8px; height: 8px; margin: -4px 0 0 -4px; border-radius: 50%; offset-rotate: 0deg; animation: gec-flow 2s linear infinite; pointer-events: none; }
  .node {
    position: absolute; width: 72px; height: 72px; box-sizing: border-box; border-radius: 50%;
    display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
    background: var(--glow-node, #1A1729); border: 2px solid rgba(var(--n), 0.3); cursor: pointer; transition: box-shadow 0.4s, border-color 0.4s;
  }
  .node.on { border-color: rgba(var(--n), 0.9); box-shadow: 0 0 var(--glow) rgba(var(--n), 0.45); }
  .node svg { width: 20px; height: 20px; color: rgb(var(--n)); }
  .node .v { font-size: 14px; font-weight: 800; line-height: 1.15; white-space: nowrap; }
  .node .l { font-size: 10.5px; font-weight: 700; opacity: 0.8; }
  .node.hidden { display: none; }

  /* tegels */
  .tiles { flex: 1; min-width: 150px; display: flex; flex-direction: column; gap: 6px; }
  .viewport { flex: 1; min-height: 0; position: relative; overflow: hidden; border-radius: 22px; touch-action: pan-y; overscroll-behavior: contain; user-select: none; -webkit-user-select: none; cursor: grab; }
  .track { display: flex; height: 100%; will-change: transform; }
  .track.anim { transition: transform 0.35s cubic-bezier(.4, 0, .2, 1); }
  .tile {
    flex: 0 0 100%; width: 100%; height: 100%; box-sizing: border-box; border-radius: 22px; padding: 16px;
    display: flex; flex-direction: column; justify-content: space-between; background: rgba(var(--t), 0.09); min-width: 0;
  }
  .t-icon { width: 44px; height: 44px; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #1C1730; background: rgb(var(--t)); box-shadow: 0 0 calc(var(--glow) * 0.7) rgba(var(--t), 0.6); }
  .t-icon svg { width: 22px; height: 22px; }
  .t-icon ha-icon { --mdc-icon-size: 22px; }
  .t-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .t-label { font-size: 14px; font-weight: 800; color: color-mix(in srgb, rgb(var(--t)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .t-value { font-size: 30px; font-weight: 800; line-height: 1.05; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .t-sub { font-size: 13px; font-weight: 600; opacity: 0.65; line-height: 1.3; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .dots { display: flex; justify-content: center; gap: 2px; }
  .dots button { width: 26px; height: 22px; padding: 0; border: 0; background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; }
  .dots span { display: block; height: 8px; width: 8px; border-radius: 4px; background: var(--glow-dot, rgba(255, 255, 255, 0.25)); transition: width 0.2s, background 0.2s; }
  .dots button.on span { width: 20px; background: var(--glow-text, #F3F1FA); }

  /* smal (1 kolom): onder elkaar */
  .wrap.narrow { flex-direction: column; height: auto; }
  .wrap.narrow .adv { flex: none; max-width: none; min-height: 150px; }
  .wrap.narrow .flow { flex: none; align-self: center; }
  .wrap.narrow .tiles { min-height: 170px; }

  @keyframes gec-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }
  @keyframes gec-breathe { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { .dot, .halo { animation: none; } }
`;

/* stroomschema: posities in een vak van 290 x 218 */
const GEC_NODES = { sun: [145, 36], grid: [40, 109], batt: [250, 109], house: [145, 182] };
const GEC_PATHS = {
  sToH: 'M145 72 L145 146',
  sToB: 'M175 52 Q 226 60 236 76',
  sToG: 'M115 52 Q 64 60 54 76',
  gToH: 'M54 142 Q 64 168 110 176',
  bToH: 'M236 142 Q 226 168 180 176',
  gToB: 'M76 109 L214 109',
};

/* ------------------------------------------------------------------ */
/*  De kaart                                                           */
/* ------------------------------------------------------------------ */

class GlowEnergyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._page = 0;
    this._built = false;
    this._level = null;
    this._pending = null;
  }

  static getConfigElement() {
    return document.createElement('glow-energy-card-editor');
  }

  static getStubConfig(hass) {
    const st = (hass && hass.states) || {};
    const ids = Object.keys(st).filter((e) => e.startsWith('sensor.'));
    const unit = (e) => (st[e].attributes.unit_of_measurement || '');
    const power = ids.filter((e) => ['W', 'kW'].includes(unit(e)));
    const find = (list, words) => list.find((e) => words.some((w) => e.includes(w)));
    const cfg = {
      solar: find(power, ['input_power', 'pv_power', 'solar', 'zon']),
      grid: find(power, ['p1', 'grid', 'net_power']),
      battery: find(power, ['battery_charge_discharge', 'battery_power']),
      battery_soc: ids.find((e) => unit(e) === '%' && /battery_(state_of_capacity|soc|level)/.test(e) && !/iphone|phone|tab|ipad/.test(e)),
      tiles: [{ type: 'self_sufficiency' }],
    };
    Object.keys(cfg).forEach((k) => { if (cfg[k] === undefined) delete cfg[k]; });
    return cfg;
  }

  setConfig(config) {
    const lang = gecLang(this._hass, config && config.language);
    if (!config || (!config.solar && !config.grid)) throw new Error(gecT(lang, 'err_solar'));
    const tiles = (config.tiles || []).map((t, i) => {
      const o = typeof t === 'string' ? { entity: t } : { ...t };
      if (!o.color) o.color = GEC_PALETTE[i % GEC_PALETTE.length];
      return o;
    });
    this._config = {
      units: 'w',
      surplus: 1500,
      soc_ok: 40,
      soc_full: 90,
      advice_delay: 60,
      auto_rotate: 0,
      glow: 15,
      height: 218,
      ...config,
      tiles,
    };
    this._built = false;
    this._level = null;
    this._pending = null;
    this._page = 0;
    if (this._hass) { this._build(); this._update(); }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    if (this._built && this._builtLang !== this._lang()) this._built = false;
    if (!this._built) this._build();
    this._update();
  }

  get hass() { return this._hass; }

  connectedCallback() {
    this._startRotate();
    if (this._ro && this._wrap) this._ro.observe(this);
  }

  disconnectedCallback() {
    clearInterval(this._rotTimer);
    this._rotTimer = null;
    if (this._ro) this._ro.disconnect();
  }

  getCardSize() { return 5; }

  getGridOptions() { return { columns: 12, min_columns: 6, rows: 'auto' }; }

  _lang() { return gecLang(this._hass, this._config && this._config.language); }

  _t(k, v) { return gecT(this._lang(), k, v); }

  /* ---------- waarden lezen ---------- */

  _num(entity) {
    const st = entity && this._hass && this._hass.states[entity];
    if (!st) return null;
    const v = parseFloat(st.state);
    return isNaN(v) ? null : v;
  }

  // vermogen in W, ongeacht of de sensor W of kW geeft
  _watt(entity, invert) {
    const v = this._num(entity);
    if (v === null) return null;
    const u = (this._hass.states[entity].attributes.unit_of_measurement || 'W').toLowerCase();
    let w = u === 'kw' ? v * 1000 : u === 'mw' ? v * 1e6 : v;
    if (invert) w = -w;
    return w;
  }

  _values() {
    const c = this._config;
    const pv = Math.max(0, this._watt(c.solar) ?? 0);
    const grid = this._watt(c.grid, c.invert_grid) ?? 0;
    const batt = c.battery ? (this._watt(c.battery, c.invert_battery) ?? 0) : 0;
    const soc = c.battery_soc ? this._num(c.battery_soc) : null;
    let house = c.house ? this._watt(c.house) : null;
    if (house === null) house = Math.max(0, pv + grid - batt);
    return { pv, grid, batt, soc, house };
  }

  /* ---------- opmaak ---------- */

  _fmtNum(v, digits) {
    try {
      return Number(v).toLocaleString(this._lang() === 'en' ? 'en-GB' : this._lang() + '-BE', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
    } catch (e) {
      return String(Math.round(v));
    }
  }

  _fmtPower(w) {
    const a = Math.abs(w);
    if (this._config.units === 'auto' && a >= 1000) return this._fmtNum(a / 1000, 1) + ' kW';
    return this._fmtNum(Math.round(a), 0) + ' W';
  }

  _fmtEnergy(wh, sign) {
    const a = Math.abs(wh);
    let s = this._config.units === 'auto' && a >= 1000 ? this._fmtNum(a / 1000, 2) + ' kWh' : this._fmtNum(Math.round(a), 0) + ' Wh';
    if (sign && Math.round(a) > 0) s = (wh < 0 ? '−' : '+') + s;
    return s;
  }

  // een sensorwaarde netjes tonen; vermogen en energie in de gekozen eenheid
  _fmtEntity(entity, sign) {
    const st = entity && this._hass.states[entity];
    if (!st) return '–';
    if (st.state === 'unavailable' || st.state === 'unknown') return '–';
    const v = parseFloat(st.state);
    const unit = st.attributes.unit_of_measurement || '';
    if (isNaN(v)) return st.state;
    const u = unit.toLowerCase();
    if (u === 'w' || u === 'kw') return (sign && v < 0 ? '−' : '') + this._fmtPower(u === 'kw' ? v * 1000 : v);
    if (u === 'wh' || u === 'kwh' || u === 'mwh') return this._fmtEnergy(u === 'kwh' ? v * 1000 : u === 'mwh' ? v * 1e6 : v, sign);
    return this._fmtNum(v, Math.abs(v) < 10 ? 1 : 0) + (unit ? (unit === '%' ? '%' : ' ' + unit) : '');
  }

  /* ---------- opbouw ---------- */

  _build() {
    const c = this._config;
    const t = (k, v) => this._t(k, v);
    this._builtLang = this._lang();
    const tiles = c.tiles;
    const n = tiles.length;

    const lines = Object.keys(GEC_PATHS).filter((k) => k !== 'gToB' && (c.battery || (k !== 'sToB' && k !== 'bToH')))
      .map((k) => `<path d="${GEC_PATHS[k]}" fill="none" style="stroke: var(--glow-line, rgba(255,255,255,0.10))" stroke-width="3" stroke-linecap="round"/>`).join('');

    const node = (key, icon, cls) => {
      const [x, y] = GEC_NODES[key];
      return `<div class="node ${cls}" data-node="${key}" style="left:${x - 36}px;top:${y - 36}px">${GEC_ICONS[icon]}<span class="v">–</span><span class="l"></span></div>`;
    };

    const tileHtml = (tile, i) => `
      <div class="tile" data-i="${i}" style="--t:${gecRgb(tile.color)}">
        <div class="t-icon">${gecIconHtml(tile.icon || (tile.type === 'self_sufficiency' ? 'leaf' : 'bolt'))}</div>
        <div class="t-body">
          <span class="t-label"></span>
          <span class="t-value">–</span>
          <span class="t-sub"></span>
        </div>
      </div>`;
    // kopie van de laatste tegel vooraan en van de eerste achteraan: eindeloos rond
    const order = n > 1 ? [n - 1].concat(tiles.map((_, i) => i), [0]) : tiles.map((_, i) => i);

    this.shadowRoot.innerHTML = `
      <style>${GEC_STYLE}</style>
      <ha-card style="--glow:${parseInt(c.glow, 10) || 0}px">
        <div class="wrap" style="--gec-h:${parseInt(c.height, 10) || 218}px">
          <section class="adv" style="--a:${GEC_COL.ok};--s:${GEC_COL.ok}">
            <div class="halo"></div>
            <div class="adv-head"><div class="adv-icon"></div><span class="adv-tag"></span></div>
            <span class="adv-title"></span>
            ${c.battery_soc ? `
            <div class="soc" data-entity="${gecEsc(c.battery_soc)}">
              <div class="soc-row"><span>${t('battery')}</span><b>–</b></div>
              <div class="soc-track"><div class="soc-bar"></div></div>
              <span class="soc-label"></span>
            </div>` : ''}
          </section>
          <section class="flow">
            <svg class="lines" width="290" height="218" viewBox="0 0 290 218" aria-hidden="true">${lines}</svg>
            <div class="dotlayer"></div>
            ${node('sun', 'sun', c.solar ? '' : 'hidden')}
            ${node('grid', 'grid', c.grid ? '' : 'hidden')}
            ${node('batt', 'battery', c.battery ? '' : 'hidden')}
            ${node('house', 'home', '')}
          </section>
          ${n ? `
          <section class="tiles">
            <div class="viewport"><div class="track anim">${order.map((i) => tileHtml(tiles[i], i)).join('')}</div></div>
            ${n > 1 ? `<div class="dots">${tiles.map((_, i) => `<button type="button" data-p="${i}" aria-label="${gecEsc(t('tile', { n: i + 1 }))}"><span></span></button>`).join('')}</div>` : ''}
          </section>` : ''}
        </div>
      </ha-card>`;

    const root = this.shadowRoot;
    this._wrap = root.querySelector('.wrap');
    root.querySelector('.node[data-node="sun"] .l').textContent = t('solar');
    root.querySelector('.node[data-node="house"] .l').textContent = t('house');

    // meer info bij tikken
    const more = (entity) => {
      if (!entity) return;
      this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: entity }, bubbles: true, composed: true }));
    };
    const nodeEnt = { sun: c.solar, grid: c.grid, batt: c.battery_soc || c.battery, house: c.house };
    root.querySelectorAll('.node').forEach((el) => el.addEventListener('click', () => more(nodeEnt[el.dataset.node])));
    const soc = root.querySelector('.soc');
    if (soc) soc.addEventListener('click', () => more(c.battery_soc));

    // tegels: swipen, bolletjes, tikken
    this._track = root.querySelector('.track');
    const vp = root.querySelector('.viewport');
    if (vp && this._track) this._bindSwipe(vp, more);
    root.querySelectorAll('.dots button').forEach((b) => b.addEventListener('click', () => {
      this._touched = Date.now();
      this._goTo(parseInt(b.dataset.p, 10));
    }));

    // breedte volgen: smal = onder elkaar
    if (!this._ro && typeof ResizeObserver !== 'undefined') {
      this._ro = new ResizeObserver(() => this._checkWidth());
    }
    if (this._ro) { this._ro.disconnect(); this._ro.observe(this); }

    this._built = true;
    this._dotKey = null;
    this._setTrack(false);
    this._startRotate();
    this._checkWidth();
  }

  _checkWidth() {
    if (!this._wrap) return;
    const w = this.getBoundingClientRect().width;
    if (w > 0) this._wrap.classList.toggle('narrow', w < 600);
  }

  _bindSwipe(vp, more) {
    let startX = null;
    let startY = null;
    let moved = false;

    // Swipes op de tegels mogen niet doorlopen naar het dashboard (wisselen
    // tussen views, bv. hass-swipe-navigation of de kiosk-browser).
    let tStartX = null;
    let tStartY = null;
    let tHoriz = null;
    const stop = (e) => e.stopPropagation();
    vp.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      const p = e.touches[0];
      tStartX = p.clientX; tStartY = p.clientY; tHoriz = null;
    }, { passive: true });
    vp.addEventListener('touchmove', (e) => {
      e.stopPropagation();
      if (tStartX === null) return;
      const p = e.touches[0];
      const dx = p.clientX - tStartX;
      const dy = p.clientY - tStartY;
      if (tHoriz === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) tHoriz = Math.abs(dx) > Math.abs(dy);
      if (tHoriz && e.cancelable) e.preventDefault();
    }, { passive: false });
    vp.addEventListener('touchend', (e) => { e.stopPropagation(); tStartX = null; });
    vp.addEventListener('touchcancel', (e) => { e.stopPropagation(); tStartX = null; });
    ['mousedown', 'mousemove', 'mouseup'].forEach((ev) => vp.addEventListener(ev, stop));

    vp.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      if (e.button !== undefined && e.button !== 0) return;
      startX = e.clientX; startY = e.clientY; moved = false;
      try { vp.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      this._track.classList.remove('anim');
    });
    vp.addEventListener('pointermove', (e) => {
      e.stopPropagation();
      if (startX === null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(e.clientY - startY)) moved = true;
      if (moved) this._setTrack(false, dx);
    });
    const end = (e, cancel) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      this._track.classList.add('anim');
      this._touched = Date.now();
      if (!cancel && moved && Math.abs(dx) > 40) {
        this._goTo(this._page + (dx < 0 ? 1 : -1));
      } else {
        this._setTrack(true);
        if (!cancel && !moved) {
          const tile = this._config.tiles[((this._page % this._config.tiles.length) + this._config.tiles.length) % this._config.tiles.length];
          if (tile && tile.entity) more(tile.entity);
        }
      }
    };
    vp.addEventListener('pointerup', (e) => { e.stopPropagation(); end(e, false); });
    vp.addEventListener('pointercancel', (e) => { e.stopPropagation(); end(e, true); });
  }

  _setTrack(anim, dx = 0) {
    if (!this._track) return;
    const n = this._config.tiles.length;
    const offset = n > 1 ? this._page + 1 : 0;
    this._track.classList.toggle('anim', !!anim);
    this._track.style.transform = `translateX(calc(${-offset * 100}% + ${dx}px))`;
    const active = ((this._page % n) + n) % n;
    this.shadowRoot.querySelectorAll('.dots button').forEach((b, i) => b.classList.toggle('on', i === active));
  }

  _goTo(p) {
    const n = this._config.tiles.length;
    if (n < 2) return;
    clearTimeout(this._wrapTimer);
    this._page = p;
    this._setTrack(true);
    if (p >= n || p < 0) {
      // na de animatie ongemerkt naar de echte tegel springen
      this._wrapTimer = setTimeout(() => {
        this._page = p >= n ? 0 : n - 1;
        this._setTrack(false);
      }, 370);
    }
  }

  _startRotate() {
    clearInterval(this._rotTimer);
    this._rotTimer = null;
    const s = this._config ? parseInt(this._config.auto_rotate, 10) || 0 : 0;
    if (s <= 0 || !this._config || this._config.tiles.length < 2) return;
    this._rotTimer = setInterval(() => {
      if (this._touched && Date.now() - this._touched < s * 1000) return;
      this._goTo(this._page + 1);
    }, s * 1000);
  }

  /* ---------- bijwerken ---------- */

  _advice(v) {
    const c = this._config;
    const surplus = Math.max(0, -v.grid) + Math.max(0, v.batt);
    const soc = v.soc ?? 0;
    let level;
    if (surplus >= c.surplus || (v.soc !== null && soc >= c.soc_full && v.pv >= v.house)) level = 'go';
    else if (v.pv >= v.house * 0.8 || (v.soc !== null && soc >= c.soc_ok)) level = 'ok';
    else level = 'wait';

    // niet bij elke schommeling van advies wisselen
    const delay = (parseInt(c.advice_delay, 10) || 0) * 1000;
    const now = Date.now();
    if (this._level === null || delay === 0) {
      this._level = level;
      this._pending = null;
    } else if (level !== this._level) {
      if (!this._pending || this._pending.level !== level) this._pending = { level, since: now };
      else if (now - this._pending.since >= delay) { this._level = level; this._pending = null; }
    } else {
      this._pending = null;
    }
    return this._level;
  }

  _update() {
    if (!this._hass || !this._built) return;
    const c = this._config;
    const root = this.shadowRoot;
    const v = this._values();
    const t = (k, x) => this._t(k, x);

    // advies
    const level = this._advice(v);
    const adv = root.querySelector('.adv');
    adv.style.setProperty('--a', GEC_COL[level]);
    const icon = { go: 'bolt', ok: 'gauge', wait: 'hourglass' }[level];
    if (this._advIcon !== icon) {
      root.querySelector('.adv-icon').innerHTML = GEC_ICONS[icon];
      this._advIcon = icon;
    }
    root.querySelector('.adv-tag').textContent = t(level + '_tag');
    root.querySelector('.adv-title').textContent = t(level + '_title');

    // batterij-balk
    if (c.battery_soc) {
      const soc = v.soc;
      const sc = soc === null ? GEC_COL.ok : soc >= 80 ? GEC_COL.batt : soc >= 30 ? GEC_COL.ok : GEC_COL.wait;
      adv.style.setProperty('--s', sc);
      root.querySelector('.soc-row b').textContent = soc === null ? '–' : Math.round(soc) + '%';
      root.querySelector('.soc-bar').style.width = (soc === null ? 0 : Math.max(0, Math.min(100, soc))) + '%';
      let lab = soc === null ? t('unavailable') : soc >= 95 ? t('full') : soc >= 80 ? t('good') : soc >= 30 ? t('half') : t('low');
      if (v.batt > 10) lab += ' · ' + t('charging') + ' ' + this._fmtPower(v.batt);
      else if (v.batt < -10) lab += ' · ' + t('discharging') + ' ' + this._fmtPower(v.batt);
      root.querySelector('.soc-label').textContent = lab;
    }

    // knopen
    const setNode = (key, value, label, col, on) => {
      const el = root.querySelector(`.node[data-node="${key}"]`);
      if (!el) return;
      el.style.setProperty('--n', col);
      el.classList.toggle('on', !!on);
      el.querySelector('.v').textContent = value;
      if (label !== null) el.querySelector('.l').textContent = label;
    };
    setNode('sun', this._fmtPower(v.pv), null, GEC_COL.sun, v.pv > 10);
    setNode('grid', this._fmtPower(v.grid), v.grid > 10 ? t('import') : v.grid < -10 ? t('export') : t('grid'), v.grid < -10 ? GEC_COL.exp : GEC_COL.grid, Math.abs(v.grid) > 10);
    setNode('batt', this._fmtPower(v.batt), v.batt > 10 ? t('charging') : v.batt < -10 ? t('discharging') : t('idle'), GEC_COL.batt, Math.abs(v.batt) > 10);
    setNode('house', this._fmtPower(v.house), null, GEC_COL.house, true);

    // stromen
    const sToH = Math.min(v.pv, v.house);
    const sToB = Math.max(0, Math.min(v.pv - sToH, Math.max(0, v.batt)));
    const sToG = Math.max(0, v.pv - sToH - sToB);
    const bToH = v.batt < 0 ? -v.batt : 0;
    const gToH = v.grid > 0 ? Math.min(v.grid, Math.max(0, v.house - sToH - bToH)) : 0;
    const gToB = v.grid > 0 && v.batt > 0 ? Math.max(0, v.batt - sToB) : 0;
    const flows = [
      [sToH, 'sToH', GEC_COL.sun], [sToB, 'sToB', GEC_COL.sun], [sToG, 'sToG', GEC_COL.exp],
      [gToH, 'gToH', GEC_COL.grid], [bToH, 'bToH', GEC_COL.batt], [gToB, 'gToB', GEC_COL.grid],
    ].filter((f) => f[0] >= 10);
    // stap per 250 W, zodat de animaties niet bij elke kleine verandering herstarten
    const key = flows.map((f) => f[1] + Math.round(f[0] / 250)).join('|');
    if (key !== this._dotKey) {
      this._dotKey = key;
      let html = '';
      flows.forEach(([w, p, col]) => {
        const dur = Math.max(0.9, 3.2 - Math.min(2.3, w / 1000));
        for (let k = 0; k < 3; k++) {
          html += `<span class="dot" style="offset-path:path('${GEC_PATHS[p]}');background:rgb(${col});box-shadow:0 0 calc(var(--glow) * 0.6) 2px rgba(${col},0.85);animation-duration:${dur.toFixed(2)}s;animation-delay:-${(dur * k / 3).toFixed(2)}s"></span>`;
        }
      });
      root.querySelector('.dotlayer').innerHTML = html;
    }

    // tegels
    const selfPct = v.house > 0 ? Math.round(100 * Math.max(0, v.house - Math.max(0, v.grid)) / v.house) : 100;
    c.tiles.forEach((tile, i) => {
      let label; let value; let sub;
      if (tile.type === 'self_sufficiency') {
        label = tile.name || t('self');
        value = Math.max(0, Math.min(100, selfPct)) + '%';
        sub = tile.sub ?? t('self_sub');
      } else {
        const st = tile.entity && this._hass.states[tile.entity];
        label = tile.name || (st && st.attributes.friendly_name) || tile.entity || '';
        value = this._fmtEntity(tile.entity, tile.sign);
        if (tile.secondary) {
          sub = (tile.secondary_name ? tile.secondary_name + ' ' : '') + this._fmtEntity(tile.secondary);
        } else {
          sub = tile.sub || '';
        }
      }
      root.querySelectorAll(`.tile[data-i="${i}"]`).forEach((el) => {
        el.querySelector('.t-label').textContent = label;
        el.querySelector('.t-value').textContent = value;
        el.querySelector('.t-sub').textContent = sub;
      });
    });
  }
}

/* ------------------------------------------------------------------ */
/*  Visuele editor                                                     */
/* ------------------------------------------------------------------ */

function gecMainSchema(lang) {
  const t = (k) => gecT(lang, k);
  const ent = (domain) => ({ entity: { domain } });
  return [
    { name: 'solar', selector: ent('sensor') },
    { name: 'grid', selector: ent('sensor') },
    { name: 'battery', selector: ent('sensor') },
    { name: 'battery_soc', selector: ent('sensor') },
    { name: 'house', selector: ent('sensor') },
    { type: 'grid', name: '', schema: [
      { name: 'invert_grid', selector: { boolean: {} } },
      { name: 'invert_battery', selector: { boolean: {} } },
    ] },
  ];
}

function gecAdviceSchema() {
  return [
    { type: 'grid', name: '', schema: [
      { name: 'surplus', selector: { number: { min: 0, max: 20000, step: 100, mode: 'box', unit_of_measurement: 'W' } } },
      { name: 'advice_delay', selector: { number: { min: 0, max: 900, step: 10, mode: 'box', unit_of_measurement: 's' } } },
      { name: 'soc_ok', selector: { number: { min: 0, max: 100, mode: 'box', unit_of_measurement: '%' } } },
      { name: 'soc_full', selector: { number: { min: 0, max: 100, mode: 'box', unit_of_measurement: '%' } } },
    ] },
  ];
}

function gecDisplaySchema(lang) {
  const t = (k) => gecT(lang, k);
  return [
    { name: 'units', selector: { select: { mode: 'dropdown', options: [{ value: 'w', label: t('u_w') }, { value: 'auto', label: t('u_auto') }] } } },
    { name: 'auto_rotate', selector: { number: { min: 0, max: 120, step: 1, mode: 'box', unit_of_measurement: 's' } } },
    { name: 'glow', selector: { number: { min: 0, max: 60, step: 2, mode: 'slider', unit_of_measurement: 'px' } } },
    { name: 'height', selector: { number: { min: 160, max: 400, step: 10, mode: 'box', unit_of_measurement: 'px' } } },
    { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GEC_LANG_NAMES).map((k) => ({ value: k, label: GEC_LANG_NAMES[k] }))) } } },
  ];
}

function gecTileSchema(lang, type) {
  const t = (k) => gecT(lang, k);
  const s = [{ name: 'type', selector: { select: { mode: 'dropdown', options: [{ value: 'entity', label: t('t_entity') }, { value: 'self_sufficiency', label: t('t_self') }] } } }];
  if (type === 'self_sufficiency') {
    return s.concat([{ name: 'name', selector: { text: {} } }, { name: 'icon', selector: { icon: {} } }]);
  }
  return s.concat([
    { name: 'entity', selector: { entity: {} } },
    { name: 'name', selector: { text: {} } },
    { name: 'icon', selector: { icon: {} } },
    { type: 'grid', name: '', schema: [
      { name: 'secondary', selector: { entity: {} } },
      { name: 'secondary_name', selector: { text: {} } },
    ] },
    { name: 'sub', selector: { text: {} } },
  ]);
}

const GEC_EDITOR_STYLE = `
  h3 { margin: 22px 0 8px; font-size: 16px; font-weight: 600; }
  h3:first-child { margin-top: 4px; }
  .tile { border: 1px solid var(--divider-color, rgba(127,127,127,0.3)); border-left: 6px solid var(--c); border-radius: 12px; padding: 12px; margin-bottom: 12px; }
  .row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
  .row .label { font-weight: 600; flex: 1; }
  .row input[type=color] { width: 44px; height: 32px; border: none; padding: 0; background: none; cursor: pointer; }
  .row button, .add { font: inherit; cursor: pointer; border-radius: 8px; padding: 6px 10px; border: 1px solid var(--divider-color, rgba(127,127,127,0.4)); background: var(--secondary-background-color, transparent); color: var(--primary-text-color); }
  .swatches { display: flex; gap: 6px; }
  .sw { width: 22px; height: 22px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; padding: 0; }
  .sw.on { border-color: var(--primary-text-color); }
  .add { width: 100%; padding: 10px; font-weight: 600; }
`;

class GlowEnergyCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sig = null;
  }

  setConfig(config) {
    this._config = { ...config, tiles: (config.tiles || []).map((x) => (typeof x === 'string' ? { entity: x } : { ...x })) };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._config && gecLang(hass, this._config.language) !== this._lang) {
      this._sig = null;
      this._render();
      return;
    }
    this.shadowRoot.querySelectorAll('ha-form').forEach((f) => { f.hass = hass; });
  }

  _emit(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
  }

  _clean(v) {
    Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined) delete v[k]; });
    if (v.language === 'auto') delete v.language;
    if (v.type === 'entity') delete v.type;
    if (v.invert_grid === false) delete v.invert_grid;
    if (v.invert_battery === false) delete v.invert_battery;
    return v;
  }

  _form(schema, data, onChange) {
    const f = document.createElement('ha-form');
    f.hass = this._hass;
    f.schema = schema;
    f.data = data;
    f.computeLabel = (s) => gecT(this._lang, 'l_' + s.name);
    f.addEventListener('value-changed', (e) => onChange({ ...e.detail.value }));
    return f;
  }

  _render() {
    if (!this._config) return;
    const c = this._config;
    const lang = gecLang(this._hass, c.language);
    this._lang = lang;
    const t = (k, v) => gecT(lang, k, v);
    const sig = lang + '|' + c.tiles.length + '|' + c.tiles.map((x) => (x.color || '') + (x.type || '')).join(',');

    if (sig === this._sig) {
      if (this._forms) {
        this._forms.main.data = this._mainData();
        this._forms.advice.data = this._mainData();
        this._forms.display.data = this._mainData();
        this._forms.tiles.forEach((f, i) => { f.data = { type: 'entity', ...c.tiles[i] }; });
      }
      return;
    }
    this._sig = sig;
    const root = this.shadowRoot;
    root.innerHTML = `<style>${GEC_EDITOR_STYLE}</style>`;
    const h = (txt) => { const el = document.createElement('h3'); el.textContent = txt; root.appendChild(el); };
    const mainChange = (v) => this._emit(this._clean({ ...this._config, ...v, tiles: this._config.tiles }));

    this._forms = { tiles: [] };
    h(t('ed_entities'));
    this._forms.main = this._form(gecMainSchema(lang), this._mainData(), mainChange);
    root.appendChild(this._forms.main);
    h(t('ed_advice'));
    this._forms.advice = this._form(gecAdviceSchema(), this._mainData(), mainChange);
    root.appendChild(this._forms.advice);
    h(t('ed_display'));
    this._forms.display = this._form(gecDisplaySchema(lang), this._mainData(), mainChange);
    root.appendChild(this._forms.display);
    h(t('ed_tiles'));

    c.tiles.forEach((tile, i) => {
      const color = tile.color || GEC_PALETTE[i % GEC_PALETTE.length];
      const box = document.createElement('div');
      box.className = 'tile';
      box.style.setProperty('--c', color);
      const row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = `<span class="label">${gecEsc(t('ed_tile', { n: i + 1 }))}</span>
        <span class="swatches">${GEC_PALETTE.map((p) => `<button type="button" class="sw${p.toLowerCase() === color.toLowerCase() ? ' on' : ''}" style="background:${p}" data-col="${p}"></button>`).join('')}</span>
        <input type="color" value="${/^#[0-9a-f]{6}$/i.test(color) ? color : '#b9a8ff'}" title="${gecEsc(t('ed_color'))}">
        <button type="button" class="up" ${i === 0 ? 'disabled' : ''} title="${gecEsc(t('ed_up'))}">↑</button>
        <button type="button" class="down" ${i === c.tiles.length - 1 ? 'disabled' : ''} title="${gecEsc(t('ed_down'))}">↓</button>
        <button type="button" class="del">${gecEsc(t('ed_delete'))}</button>`;
      box.appendChild(row);
      row.querySelectorAll('.sw').forEach((sw) => sw.addEventListener('click', () => this._patch(i, { color: sw.dataset.col })));
      row.querySelector('input[type=color]').addEventListener('change', (e) => this._patch(i, { color: e.target.value.toUpperCase() }));
      row.querySelector('.up').addEventListener('click', () => this._move(i, -1));
      row.querySelector('.down').addEventListener('click', () => this._move(i, 1));
      row.querySelector('.del').addEventListener('click', () => {
        this._emit({ ...this._config, tiles: this._config.tiles.filter((_, k) => k !== i) });
        this._render();
      });
      const f = this._form(gecTileSchema(lang, tile.type), { type: 'entity', ...tile }, (v) => {
        const tiles = this._config.tiles.slice();
        const typeChanged = (v.type || 'entity') !== (tiles[i].type || 'entity');
        tiles[i] = this._clean({ ...v, color: tiles[i].color });
        this._emit({ ...this._config, tiles });
        if (typeChanged) this._render();
      });
      this._forms.tiles.push(f);
      box.appendChild(f);
      root.appendChild(box);
    });

    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'add';
    add.textContent = t('ed_add');
    add.addEventListener('click', () => {
      const n = this._config.tiles.length;
      this._emit({ ...this._config, tiles: this._config.tiles.concat([{ entity: '', color: GEC_PALETTE[n % GEC_PALETTE.length] }]) });
      this._render();
    });
    root.appendChild(add);
  }

  _mainData() {
    const c = this._config;
    return {
      solar: c.solar, grid: c.grid, battery: c.battery, battery_soc: c.battery_soc, house: c.house,
      invert_grid: !!c.invert_grid, invert_battery: !!c.invert_battery,
      surplus: c.surplus ?? 1500, advice_delay: c.advice_delay ?? 60, soc_ok: c.soc_ok ?? 40, soc_full: c.soc_full ?? 90,
      units: c.units ?? 'w', auto_rotate: c.auto_rotate ?? 0, glow: c.glow ?? 15, height: c.height ?? 218,
      language: c.language ?? 'auto',
    };
  }

  _patch(i, p) {
    const tiles = this._config.tiles.slice();
    tiles[i] = { ...tiles[i], ...p };
    this._emit({ ...this._config, tiles });
    this._render();
  }

  _move(i, d) {
    const j = i + d;
    const tiles = this._config.tiles.slice();
    if (j < 0 || j >= tiles.length) return;
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    this._emit({ ...this._config, tiles });
    this._sig = null;
    this._render();
  }
}

if (!customElements.get('glow-energy-card')) customElements.define('glow-energy-card', GlowEnergyCard);
if (!customElements.get('glow-energy-card-editor')) customElements.define('glow-energy-card-editor', GlowEnergyCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-energy-card')) {
  window.customCards.push({
    type: 'glow-energy-card',
    name: 'Glow Energy Card',
    description: gecT(gecLang(null), 'description'),
    preview: true,
    documentationURL: 'https://github.com/stijnleroy/glow-energy-card',
  });
}


}

/* ---- room.js ---- */
{
/*
 * Glow Room Card
 * Een kamerkaart in de Glow-stijl: tik = licht aan/uit, dubbeltik = popup met
 * scènes, lampen (helderheid, kleurtemperatuur, kleur), rolluiken, schakelaars en klimaat.
 */

const GRC_VERSION = '1.1.0';

const GRC_I18N = {
  nl: {
    off: 'Uit', all_on: 'Alles aan', n_on: '{n} van {t} aan', on_one: 'Aan', unavailable: 'Niet beschikbaar',
    close: 'Sluiten', brightness: 'Helderheid', color_temp: 'Kleurtemperatuur', colour: 'Kleur', warm: 'Warm', neutral: 'Neutraal', cool: 'Koel',
    nothing: 'Niets gevonden voor deze kamer.', all_on_btn: 'Alles aan', all_off_btn: 'Alles uit',
    sec_climate: 'Klimaat', sec_scenes: 'Scènes', sec_lights: 'Lampen', sec_covers: 'Rolluiken', sec_switches: 'Schakelaars',
    open: 'Open', closed: 'Dicht', opening: 'Gaat open', closing: 'Gaat dicht', c_open: 'Openen', c_stop: 'Stop', c_close: 'Sluiten',
    err_entity: 'Vul "entity" (een lamp of lampgroep) of "area" in.',
    l_entity: 'Lamp of lampgroep', l_name: 'Naam', l_icon: 'Icoon', l_area: 'Ruimte (voor de inhoud van de popup)',
    l_color: 'Kleur als de lampen geen kleur doorgeven', l_glow: 'Sterkte van de gloed', l_auto_close: 'Popup sluiten na (seconden, 0 = nooit)', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    popup: 'Inhoud van de popup', l_sections: 'Onderdelen', l_lights: 'Lampen (leeg = automatisch)', l_scenes: 'Scènes (leeg = uit de ruimte)', l_covers: 'Rolluiken (leeg = uit de ruimte)', l_switches: 'Schakelaars (leeg = uit de ruimte)', l_temperature: 'Temperatuur (leeg = uit de ruimte)', l_humidity: 'Vochtigheid (leeg = uit de ruimte)',
    description: 'Kamerkaart met gloed: tik schakelt het licht, dubbeltik opent een popup met scènes, lampen, rolluiken en schakelaars.',
  },
  en: {
    off: 'Off', all_on: 'All on', n_on: '{n} of {t} on', on_one: 'On', unavailable: 'Unavailable',
    close: 'Close', brightness: 'Brightness', color_temp: 'Colour temperature', colour: 'Colour', warm: 'Warm', neutral: 'Neutral', cool: 'Cool',
    nothing: 'Nothing found for this room.', all_on_btn: 'All on', all_off_btn: 'All off',
    sec_climate: 'Climate', sec_scenes: 'Scenes', sec_lights: 'Lights', sec_covers: 'Covers', sec_switches: 'Switches',
    open: 'Open', closed: 'Closed', opening: 'Opening', closing: 'Closing', c_open: 'Open', c_stop: 'Stop', c_close: 'Close',
    err_entity: 'Fill in "entity" (a light or light group) or "area".',
    l_entity: 'Light or light group', l_name: 'Name', l_icon: 'Icon', l_area: 'Area (for the popup content)',
    l_color: 'Colour when the lights report none', l_glow: 'Glow strength', l_auto_close: 'Close popup after (seconds, 0 = never)', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    popup: 'Popup content', l_sections: 'Sections', l_lights: 'Lights (empty = automatic)', l_scenes: 'Scenes (empty = from the area)', l_covers: 'Covers (empty = from the area)', l_switches: 'Switches (empty = from the area)', l_temperature: 'Temperature (empty = from the area)', l_humidity: 'Humidity (empty = from the area)',
    description: 'Glowing room card: tap toggles the lights, double tap opens a popup with scenes, lights, covers and switches.',
  },
  fr: {
    off: 'Éteint', all_on: 'Tout allumé', n_on: '{n} sur {t} allumées', on_one: 'Allumé', unavailable: 'Indisponible',
    close: 'Fermer', brightness: 'Luminosité', color_temp: 'Température de couleur', colour: 'Couleur', warm: 'Chaud', neutral: 'Neutre', cool: 'Froid',
    nothing: 'Rien trouvé pour cette pièce.', all_on_btn: 'Tout allumer', all_off_btn: 'Tout éteindre',
    sec_climate: 'Climat', sec_scenes: 'Scènes', sec_lights: 'Lampes', sec_covers: 'Volets', sec_switches: 'Interrupteurs',
    open: 'Ouvert', closed: 'Fermé', opening: 'S\'ouvre', closing: 'Se ferme', c_open: 'Ouvrir', c_stop: 'Stop', c_close: 'Fermer',
    err_entity: 'Renseignez "entity" (une lampe ou un groupe) ou "area".',
    l_entity: 'Lampe ou groupe', l_name: 'Nom', l_icon: 'Icône', l_area: 'Pièce (pour le contenu du popup)',
    l_color: 'Couleur si les lampes n\'en indiquent pas', l_glow: 'Intensité de la lueur', l_auto_close: 'Fermer le popup après (secondes, 0 = jamais)', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    popup: 'Contenu du popup', l_sections: 'Sections', l_lights: 'Lampes (vide = automatique)', l_scenes: 'Scènes (vide = de la pièce)', l_covers: 'Volets (vide = de la pièce)', l_switches: 'Interrupteurs (vide = de la pièce)', l_temperature: 'Température (vide = de la pièce)', l_humidity: 'Humidité (vide = de la pièce)',
    description: 'Carte de pièce lumineuse : un toucher allume, un double toucher ouvre scènes, lampes, volets et interrupteurs.',
  },
  de: {
    off: 'Aus', all_on: 'Alle an', n_on: '{n} von {t} an', on_one: 'An', unavailable: 'Nicht verfügbar',
    close: 'Schließen', brightness: 'Helligkeit', color_temp: 'Farbtemperatur', colour: 'Farbe', warm: 'Warm', neutral: 'Neutral', cool: 'Kalt',
    nothing: 'Nichts für diesen Raum gefunden.', all_on_btn: 'Alle an', all_off_btn: 'Alle aus',
    sec_climate: 'Klima', sec_scenes: 'Szenen', sec_lights: 'Lampen', sec_covers: 'Rollläden', sec_switches: 'Schalter',
    open: 'Offen', closed: 'Zu', opening: 'Öffnet', closing: 'Schließt', c_open: 'Öffnen', c_stop: 'Stopp', c_close: 'Schließen',
    err_entity: 'Gib "entity" (Lampe oder Lampengruppe) oder "area" an.',
    l_entity: 'Lampe oder Lampengruppe', l_name: 'Name', l_icon: 'Symbol', l_area: 'Bereich (für den Popup-Inhalt)',
    l_color: 'Farbe, wenn die Lampen keine melden', l_glow: 'Leuchtstärke', l_auto_close: 'Popup schließen nach (Sekunden, 0 = nie)', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    popup: 'Popup-Inhalt', l_sections: 'Bereiche', l_lights: 'Lampen (leer = automatisch)', l_scenes: 'Szenen (leer = aus dem Bereich)', l_covers: 'Rollläden (leer = aus dem Bereich)', l_switches: 'Schalter (leer = aus dem Bereich)', l_temperature: 'Temperatur (leer = aus dem Bereich)', l_humidity: 'Luftfeuchte (leer = aus dem Bereich)',
    description: 'Leuchtende Raumkarte: Tippen schaltet das Licht, Doppeltippen öffnet Szenen, Lampen, Rollläden und Schalter.',
  },
  es: {
    off: 'Apagado', all_on: 'Todo encendido', n_on: '{n} de {t} encendidas', on_one: 'Encendido', unavailable: 'No disponible',
    close: 'Cerrar', brightness: 'Brillo', color_temp: 'Temperatura de color', colour: 'Color', warm: 'Cálida', neutral: 'Neutra', cool: 'Fría',
    nothing: 'No se encontró nada para esta estancia.', all_on_btn: 'Encender todo', all_off_btn: 'Apagar todo',
    sec_climate: 'Clima', sec_scenes: 'Escenas', sec_lights: 'Luces', sec_covers: 'Persianas', sec_switches: 'Interruptores',
    open: 'Abierta', closed: 'Cerrada', opening: 'Abriendo', closing: 'Cerrando', c_open: 'Abrir', c_stop: 'Parar', c_close: 'Cerrar',
    err_entity: 'Indica "entity" (una luz o grupo) o "area".',
    l_entity: 'Luz o grupo de luces', l_name: 'Nombre', l_icon: 'Icono', l_area: 'Estancia (para el contenido del popup)',
    l_color: 'Color si las luces no indican ninguno', l_glow: 'Intensidad del brillo', l_auto_close: 'Cerrar el popup tras (segundos, 0 = nunca)', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    popup: 'Contenido del popup', l_sections: 'Secciones', l_lights: 'Luces (vacío = automático)', l_scenes: 'Escenas (vacío = de la estancia)', l_covers: 'Persianas (vacío = de la estancia)', l_switches: 'Interruptores (vacío = de la estancia)', l_temperature: 'Temperatura (vacío = de la estancia)', l_humidity: 'Humedad (vacío = de la estancia)',
    description: 'Tarjeta de estancia con brillo: un toque enciende, doble toque abre escenas, luces, persianas e interruptores.',
  },
  it: {
    off: 'Spento', all_on: 'Tutto acceso', n_on: '{n} di {t} accese', on_one: 'Acceso', unavailable: 'Non disponibile',
    close: 'Chiudi', brightness: 'Luminosità', color_temp: 'Temperatura colore', colour: 'Colore', warm: 'Calda', neutral: 'Neutra', cool: 'Fredda',
    nothing: 'Niente trovato per questa stanza.', all_on_btn: 'Accendi tutto', all_off_btn: 'Spegni tutto',
    sec_climate: 'Clima', sec_scenes: 'Scene', sec_lights: 'Luci', sec_covers: 'Tapparelle', sec_switches: 'Interruttori',
    open: 'Aperta', closed: 'Chiusa', opening: 'In apertura', closing: 'In chiusura', c_open: 'Apri', c_stop: 'Stop', c_close: 'Chiudi',
    err_entity: 'Indica "entity" (una luce o un gruppo) o "area".',
    l_entity: 'Luce o gruppo di luci', l_name: 'Nome', l_icon: 'Icona', l_area: 'Stanza (per il contenuto del popup)',
    l_color: 'Colore se le luci non ne indicano', l_glow: 'Intensità del bagliore', l_auto_close: 'Chiudi il popup dopo (secondi, 0 = mai)', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    popup: 'Contenuto del popup', l_sections: 'Sezioni', l_lights: 'Luci (vuoto = automatico)', l_scenes: 'Scene (vuoto = dalla stanza)', l_covers: 'Tapparelle (vuoto = dalla stanza)', l_switches: 'Interruttori (vuoto = dalla stanza)', l_temperature: 'Temperatura (vuoto = dalla stanza)', l_humidity: 'Umidità (vuoto = dalla stanza)',
    description: 'Scheda stanza luminosa: un tocco accende, doppio tocco apre scene, luci, tapparelle e interruttori.',
  },
};
const GRC_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };

function grcLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GRC_I18N[l] ? l : 'en';
}
function grcT(lang, key, vars) {
  let s = (GRC_I18N[lang] && GRC_I18N[lang][key]) || GRC_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function grcEsc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function grcHexRgb(hex) {
  let h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const v = parseInt(h.slice(0, 6), 16);
  return isNaN(v) ? [255, 210, 122] : [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}
// heel verzadigde lampkleuren iets zachter maken, zodat de gloed pastel blijft
function grcSoft(rgb) {
  return rgb.map((c) => Math.round(c + (255 - c) * 0.35));
}
const grcClamp = (v, a, b) => Math.max(a, Math.min(b, v));
const grcLerp = (a, b, t) => a.map((x, i) => Math.round(x + (b[i] - x) * t));
// kleurtemperatuur als pastelkleur: warm → neutraal → koel
function grcCtRgb(k) {
  const p = grcClamp((k - 2700) / (6500 - 2700), 0, 1);
  const W = [255, 180, 107], N = [255, 241, 220], C = [207, 227, 255];
  return p < 0.5 ? grcLerp(W, N, p * 2) : grcLerp(N, C, (p - 0.5) * 2);
}
// tint (0–360) als pastelkleur
function grcHueRgb(h) {
  const s = 0.9, l = 0.76;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [f(0), f(8), f(4)].map((x) => Math.round(x * 255));
}

const GRC_BULB = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>';
const GRC_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>';
const GRC_SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const GRC_THERMO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0z"/></svg>';
const GRC_DROP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.4 0z"/></svg>';
const GRC_PALETTE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 1 10-10c0 2.8-2.2 4-4 4h-2a2 2 0 0 0-1 3.7A1.8 1.8 0 0 1 12 22z"/><circle cx="7.5" cy="11" r="1"/><circle cx="11" cy="7" r="1"/><circle cx="16" cy="8.5" r="1"/></svg>';
const GRC_UP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>';
const GRC_DOWN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
const GRC_STOP = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="3"/></svg>';

/* ---------------- kaart ---------------- */

const GRC_STYLE = `
  :host { display: block; height: 100%; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; height: 100%; min-height: 112px;
    border-radius: var(--ha-card-border-radius, 24px); padding: 14px 16px; cursor: pointer; user-select: none; -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent; touch-action: manipulation;
    color: var(--glow-text, #F3F1FA);
    background: var(--glow-card-background, #15121F);
    border: 1px solid var(--glow-card-border, rgba(255, 255, 255, 0.08));
    display: flex; flex-direction: column; justify-content: space-between;
    transition: background 0.4s, border-color 0.4s, box-shadow 0.4s, transform 0.12s;
  }
  ha-card:active { transform: scale(0.98); }
  ha-card.on {
    background: linear-gradient(rgba(var(--l), 0.16), rgba(var(--l), 0.16)), var(--glow-card-background, #15121F);
    border-color: rgba(var(--l), 0.5);
    box-shadow: 0 0 var(--glow) rgba(var(--l), 0.35);
  }
  .halo { position: absolute; right: -50px; top: -60px; width: 160px; height: 160px; border-radius: 50%; background: rgb(var(--l)); opacity: 0; filter: blur(46px); transition: opacity 0.5s; pointer-events: none; }
  ha-card.on .halo { opacity: 0.45; }
  .icon {
    position: relative; width: 52px; height: 52px; border-radius: 26px; display: flex; align-items: center; justify-content: center;
    background: var(--glow-surface, rgba(255, 255, 255, 0.07)); color: var(--glow-text, #F3F1FA); transition: background 0.4s, box-shadow 0.4s, color 0.4s;
    --mdc-icon-size: 28px;
  }
  .icon svg { width: 26px; height: 26px; }
  ha-card.on .icon { background: rgb(var(--l)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--l), 0.8); }
  .txt { position: relative; display: flex; flex-direction: column; min-width: 0; }
  .name { font-size: 1.3rem; font-weight: 800; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .state { font-size: 0.95rem; font-weight: 600; opacity: 0.7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  ha-card.unavailable { opacity: 0.5; }
`;

/* ---------------- popup ---------------- */

const GRC_INK = (v) => `color-mix(in srgb, rgb(var(${v})), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%))`;
const GRC_TINT = (pct) => `color-mix(in srgb, var(--glow-text, #F3F1FA) ${pct}%, transparent)`;

const GRC_POP_STYLE = `
  :host { all: initial; }
  .backdrop {
    position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center;
    padding: 24px; box-sizing: border-box; background: rgba(8, 6, 16, 0.55);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    font-family: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif);
    animation: grc-fade 0.2s ease-out;
  }
  .panel {
    position: relative; overflow: hidden; width: 100%; max-width: 680px; max-height: calc(100vh - 48px); box-sizing: border-box;
    display: flex; flex-direction: column; border-radius: 30px;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--l), 0.45); box-shadow: 0 0 60px rgba(var(--l), 0.22), 0 30px 80px rgba(0, 0, 0, 0.45);
    animation: grc-pop 0.25s cubic-bezier(.2, .9, .3, 1.2);
  }
  .panel > .halo { position: absolute; right: -80px; top: -100px; width: 280px; height: 280px; border-radius: 50%; background: rgb(var(--l)); opacity: 0.28; filter: blur(70px); pointer-events: none; }
  button { font: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }

  .top { position: relative; padding: 22px 22px 12px; display: flex; flex-direction: column; gap: 14px; }
  .head { display: flex; align-items: center; gap: 14px; }
  .head .icon { width: 56px; height: 56px; border-radius: 28px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; --mdc-icon-size: 30px; background: var(--glow-surface, rgba(255,255,255,0.07)); color: var(--glow-text, #F3F1FA); transition: background 0.4s, box-shadow 0.4s; }
  .head .icon.on { background: rgb(var(--l)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--l), 0.8); }
  .head .icon svg { width: 28px; height: 28px; }
  .head .t { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
  .head h2 { margin: 0; font-size: 26px; font-weight: 800; line-height: 1.1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .meta { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; min-height: 26px; }
  .sub { font-size: 14px; font-weight: 600; opacity: 0.7; margin-right: 4px; }
  .cchip { display: inline-flex; align-items: center; gap: 4px; height: 26px; padding: 0 10px; border-radius: 13px; box-sizing: border-box; font-size: 13px; font-weight: 800; background: rgba(var(--c), 0.14); color: ${GRC_INK('--c')}; border: 1px solid transparent; font-variant-numeric: tabular-nums; }
  .cchip svg { width: 14px; height: 14px; }
  .cchip.heat { border-color: rgba(var(--c), 0.5); box-shadow: 0 0 calc(var(--glow) * 0.6) rgba(var(--c), 0.45); }
  .round { width: 48px; height: 48px; border-radius: 24px; padding: 0; flex-shrink: 0; border: 1px solid var(--glow-border, rgba(255,255,255,0.12)); background: var(--glow-surface, rgba(255,255,255,0.07)); color: inherit; display: flex; align-items: center; justify-content: center; }
  .round svg { width: 20px; height: 20px; }

  .scenes { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; margin: 0 -22px; padding: 4px 22px 8px; }
  .scenes::-webkit-scrollbar { display: none; }
  .scenes:empty { display: none; }
  .scene { height: 42px; padding: 0 16px; flex-shrink: 0; border-radius: 21px; display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 800; color: inherit; white-space: nowrap; border: 1px solid var(--glow-border, rgba(255,255,255,0.12)); background: var(--glow-surface, rgba(255,255,255,0.06)); transition: background 0.3s, border-color 0.3s, box-shadow 0.3s; }
  .scene .dot { display: none; width: 8px; height: 8px; border-radius: 4px; background: rgb(var(--c)); box-shadow: 0 0 8px rgba(var(--c), 0.9); }
  .scene.active { border-color: rgba(var(--c), 0.55); background: rgba(var(--c), 0.16); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); }
  .scene.active .dot { display: block; }
  .scene:active { transform: scale(0.97); }

  .body { position: relative; flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 14px 22px 22px; display: flex; flex-direction: column; gap: 18px; border-top: 1px solid var(--glow-line, rgba(255,255,255,0.07)); }
  .sec { display: flex; flex-direction: column; gap: 10px; }
  .sh { display: flex; justify-content: space-between; align-items: center; min-height: 32px; gap: 8px; }
  .sh .lab { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .sh .btns { display: flex; gap: 6px; }
  .mini { height: 32px; padding: 0 12px; border-radius: 16px; border: 1px solid var(--glow-border, rgba(255,255,255,0.12)); background: var(--glow-surface, rgba(255,255,255,0.06)); color: inherit; font-size: 12px; font-weight: 800; }
  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }

  .tile { position: relative; min-width: 0; box-sizing: border-box; border-radius: 18px; padding: 10px 12px; display: flex; align-items: center; gap: 10px; background: var(--glow-surface, rgba(255,255,255,0.05)); border: 1px solid transparent; transition: background 0.3s, border-color 0.3s; }
  .tile.unavailable { opacity: 0.45; }
  .light.on { background: rgba(var(--c), 0.14); border-color: rgba(var(--c), 0.45); }
  .lbtn { width: 38px; height: 38px; border-radius: 19px; padding: 0; flex-shrink: 0; border: 0; display: flex; align-items: center; justify-content: center; background: ${GRC_TINT(9)}; color: var(--glow-text, #F3F1FA); transition: background 0.3s, box-shadow 0.3s; }
  .lbtn svg { width: 18px; height: 18px; }
  .light.on .lbtn { background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(var(--c), 0.8); }
  .lmain { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
  .lrow { display: flex; align-items: center; gap: 6px; min-height: 22px; }
  .lname { flex: 1; min-width: 0; font-size: 14px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; }
  .lpct { font-size: 13px; font-weight: 800; opacity: 0.75; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .cover .lpct { opacity: 1; color: ${GRC_INK('--c')}; }
  .lctl { display: flex; align-items: center; gap: 4px; }
  .track { position: relative; flex: 1; min-width: 40px; height: 32px; display: flex; align-items: center; touch-action: none; cursor: pointer; margin-right: 4px; }
  .rail { position: relative; width: 100%; height: 14px; border-radius: 7px; background: ${GRC_TINT(9)}; }
  .fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0; border-radius: 7px; background: rgb(var(--c)); box-shadow: 0 0 calc(var(--glow) * 0.5) rgba(var(--c), 0.6); }
  .knob { display: none; position: absolute; top: 50%; left: 0; width: 18px; height: 18px; margin: -9px 0 0 -9px; border-radius: 9px; background: #FFFFFF; box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.4); }
  .track.ct .rail { background: linear-gradient(90deg, #FFB46B, #FFF1DC, #CFE3FF); }
  .track.col .rail { background: linear-gradient(90deg, hsl(0, 90%, 76%), hsl(60, 90%, 76%), hsl(120, 90%, 76%), hsl(180, 90%, 76%), hsl(240, 90%, 76%), hsl(300, 90%, 76%), hsl(360, 90%, 76%)); }
  .track.ct .fill, .track.col .fill { display: none; }
  .track.ct .knob, .track.col .knob { display: block; }
  .mode { width: 30px; height: 30px; border-radius: 15px; padding: 0; flex-shrink: 0; border: 0; display: flex; align-items: center; justify-content: center; background: transparent; color: inherit; opacity: 0.55; }
  .mode.sel { background: ${GRC_TINT(16)}; opacity: 1; }
  .mode svg { width: 14px; height: 14px; }
  .cbtn { width: 34px; height: 34px; border-radius: 12px; padding: 0; flex-shrink: 0; border: 0; display: flex; align-items: center; justify-content: center; background: ${GRC_TINT(9)}; color: inherit; }
  .cbtn svg { width: 16px; height: 16px; }
  .cbtn:active { background: rgba(var(--c), 0.35); }
  .gap { flex: 1; }

  .sw { height: 52px; padding: 0 14px; border-radius: 18px; color: inherit; text-align: left; font-size: 14px; font-weight: 800; }
  .sw .dot { width: 12px; height: 12px; border-radius: 6px; flex-shrink: 0; background: ${GRC_TINT(18)}; transition: background 0.3s, box-shadow 0.3s; }
  .sw .n { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sw.on { background: rgba(var(--c), 0.14); border-color: rgba(var(--c), 0.45); }
  .sw.on .dot { background: rgb(var(--c)); box-shadow: 0 0 10px rgba(var(--c), 0.9); }

  .empty { opacity: 0.7; font-weight: 600; padding: 12px 4px; }
  @media (max-width: 560px) { .grid { grid-template-columns: minmax(0, 1fr); } .grid.three { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @keyframes grc-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes grc-pop { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: none; } }
`;

// vaste warme gloed van de popup; alleen de tegels kleuren mee met hun lamp
const GRC_WARM = [255, 184, 153];
const GRC_PALETTE = [[255, 184, 153], [185, 168, 255], [142, 197, 255], [143, 227, 184], [255, 224, 138], [255, 159, 191]];
const GRC_SECTIONS = ['climate', 'scenes', 'lights', 'covers', 'switches'];
const GRC_COLOR_MODES = ['hs', 'xy', 'rgb', 'rgbw', 'rgbww'];
// gedeelde cache van opgeslagen scènes (zelfde vraag als de Glow Scene Card)
const GRC_SCENE_CFG = (window.__glowSceneCfg = window.__glowSceneCfg || new Map());

// variabelen die de popup van het thema moet overnemen (de popup hangt in <body>)
const GRC_THEME_VARS = ['--glow-card-background', '--glow-card-border', '--glow-text', '--glow-surface', '--glow-border', '--glow-line', '--glow-ink-amount', '--paper-font-body1_-_font-family'];

class GlowRoomCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._built = false;
    this._modes = {};
  }

  static getConfigElement() { return document.createElement('glow-room-card-editor'); }

  static getStubConfig(hass) {
    const ids = Object.keys((hass && hass.states) || {}).filter((e) => e.startsWith('light.'));
    const grp = ids.find((e) => Array.isArray(hass.states[e].attributes.entity_id) || Array.isArray(hass.states[e].attributes.group_entities)) || ids[0];
    return grp ? { entity: grp } : { entity: '' };
  }

  setConfig(config) {
    const lang = grcLang(this._hass, config && config.language);
    if (!config || (!config.entity && !config.area)) throw new Error(grcT(lang, 'err_entity'));
    this._config = { glow: 22, auto_close: 30, color: '#FFD27A', ...config };
    this._built = false;
    this._bodyKey = null;
    if (this._hass) { this._build(); this._update(); }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    if (this._built && this._builtLang !== this._lang()) this._built = false;
    if (!this._built) this._build();
    this._update();
    if (this._pop) this._updatePopup();
  }

  get hass() { return this._hass; }

  getCardSize() { return 2; }
  getGridOptions() { return { columns: 6, rows: 2, min_columns: 3, min_rows: 2 }; }

  disconnectedCallback() { this._closePopup(); }

  _lang() { return grcLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return grcT(this._lang(), k, v); }

  /* ---- wat hoort bij de kamer ---- */

  _area() { return this._config.area || this._areaOf(this._config.entity); }

  _areaOfEnt(ent) {
    if (!ent) return null;
    return ent.area_id || (ent.device_id && this._hass.devices && this._hass.devices[ent.device_id] && this._hass.devices[ent.device_id].area_id) || null;
  }

  _areaOf(entity) {
    return this._areaOfEnt(entity && this._hass.entities && this._hass.entities[entity]);
  }

  // zichtbare entiteiten van deze domeinen in de ruimte, op naam gesorteerd
  _inArea(domains, filter) {
    const area = this._area();
    const st = this._hass.states;
    if (!area || !this._hass.entities) return [];
    const name = (e) => (st[e].attributes.friendly_name || e).toLowerCase();
    return Object.values(this._hass.entities)
      .filter((ent) => {
        const id = ent.entity_id;
        if (!domains.includes(id.split('.')[0]) || ent.hidden || ent.entity_category || !st[id]) return false;
        return this._areaOfEnt(ent) === area && (!filter || filter(st[id]));
      })
      .map((ent) => ent.entity_id)
      .sort((a, b) => name(a).localeCompare(name(b)));
  }

  _list(key, domains) {
    const v = this._config[key];
    if (Array.isArray(v) && v.length) return v.filter((e) => this._hass.states[e]);
    return this._inArea(domains);
  }

  _sections() {
    const s = this._config.sections;
    return Array.isArray(s) && s.length ? s : GRC_SECTIONS;
  }

  _lights() {
    const c = this._config;
    const st = this._hass.states;
    if (Array.isArray(c.lights) && c.lights.length) return c.lights.filter((e) => st[e]);
    const out = [];
    const add = (e, depth) => {
      const s = st[e];
      if (!s || out.includes(e)) return;
      const members = s.attributes.entity_id || s.attributes.group_entities;
      if (Array.isArray(members) && members.length && depth < 3) members.forEach((m) => add(m, depth + 1));
      else if (e.startsWith('light.')) out.push(e);
    };
    if (c.entity) add(c.entity, 0);
    // geen leden (bv. een Hue-ruimte)? dan de lampen uit dezelfde ruimte nemen
    if (!out.length || c.area) {
      const area = this._area();
      if (area && this._hass.entities) {
        Object.values(this._hass.entities).forEach((ent) => {
          const id = ent.entity_id;
          if (!id.startsWith('light.') || id === c.entity || ent.hidden || ent.entity_category) return;
          if (this._areaOfEnt(ent) !== area || !st[id]) return;
          if (Array.isArray(st[id].attributes.entity_id) || Array.isArray(st[id].attributes.group_entities) || st[id].attributes.is_hue_group) return; // geen groepen
          if (!out.includes(id)) out.push(id);
        });
      }
    }
    return out;
  }

  _climate() {
    const c = this._config;
    const st = this._hass.states;
    const num = (e) => e && st[e] && !isNaN(parseFloat(st[e].state));
    const byClass = (cls) => this._inArea(['sensor'], (s) => s.attributes.device_class === cls && !isNaN(parseFloat(s.state)))[0];
    const thermostat = this._inArea(['climate'])[0];
    const th = thermostat && st[thermostat];
    let temp = num(c.temperature) ? parseFloat(st[c.temperature].state) : null;
    if (temp === null && !c.temperature) {
      const s = byClass('temperature');
      if (s) temp = parseFloat(st[s].state);
      else if (th && typeof th.attributes.current_temperature === 'number') temp = th.attributes.current_temperature;
    }
    let hum = num(c.humidity) ? parseFloat(st[c.humidity].state) : null;
    if (hum === null && !c.humidity) {
      const s = byClass('humidity');
      if (s) hum = parseFloat(st[s].state);
      else if (th && typeof th.attributes.current_humidity === 'number') hum = th.attributes.current_humidity;
    }
    return { temp, hum, heating: !!(th && th.attributes.hvac_action === 'heating') };
  }

  _lightModes(s) {
    const m = (s && s.attributes.supported_color_modes) || [];
    const out = [];
    if (m.some((x) => x !== 'onoff')) out.push('bri');
    if (m.includes('color_temp')) out.push('ct');
    if (m.some((x) => GRC_COLOR_MODES.includes(x))) out.push('col');
    return out;
  }

  _colorOf(s) {
    const a = s && s.state === 'on' && s.attributes;
    if (a) {
      if (a.color_mode === 'color_temp' && a.color_temp_kelvin) return grcCtRgb(a.color_temp_kelvin);
      if (Array.isArray(a.rgb_color)) return grcSoft(a.rgb_color);
    }
    return grcHexRgb(this._config.color);
  }

  /* ---- opbouw kaart ---- */

  _build() {
    const c = this._config;
    this._builtLang = this._lang();
    const icon = c.icon ? `<ha-icon icon="${grcEsc(c.icon)}"></ha-icon>` : GRC_BULB;
    this.shadowRoot.innerHTML = `
      <style>${GRC_STYLE}</style>
      <ha-card style="--glow:${parseInt(c.glow, 10) || 0}px">
        <div class="halo"></div>
        <div class="icon">${icon}</div>
        <div class="txt"><span class="name"></span><span class="state"></span></div>
      </ha-card>`;
    this._card = this.shadowRoot.querySelector('ha-card');
    this._bindTaps(this._card);
    this._built = true;
  }

  // tik = schakelen, dubbeltik = popup, lang drukken = meer info
  _bindTaps(el) {
    let lastUp = 0;
    let single = null;
    let holdTimer = null;
    let held = false;
    let start = null;
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      held = false;
      start = [e.clientX, e.clientY];
      holdTimer = setTimeout(() => { held = true; this._moreInfo(this._config.entity); }, 600);
    });
    el.addEventListener('pointermove', (e) => {
      if (start && Math.hypot(e.clientX - start[0], e.clientY - start[1]) > 12) { clearTimeout(holdTimer); start = null; }
    });
    el.addEventListener('pointerup', () => {
      clearTimeout(holdTimer);
      if (held || !start) return;
      start = null;
      const now = Date.now();
      if (now - lastUp < 300) {
        clearTimeout(single);
        lastUp = 0;
        this._openPopup();
        return;
      }
      lastUp = now;
      single = setTimeout(() => this._toggleRoom(), 280);
    });
    el.addEventListener('pointercancel', () => { clearTimeout(holdTimer); start = null; });
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  _moreInfo(entity) {
    if (!entity) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: entity }, bubbles: true, composed: true }));
  }

  _call(service, data) {
    this._hass.callService('light', service, data);
  }

  _toggleRoom() {
    const lights = this._lights();
    const anyOn = lights.some((e) => this._hass.states[e].state === 'on') || (this._config.entity && this._hass.states[this._config.entity] && this._hass.states[this._config.entity].state === 'on');
    const target = this._config.entity ? { entity_id: this._config.entity } : { entity_id: lights };
    this._call(anyOn ? 'turn_off' : 'turn_on', target);
  }

  _update() {
    if (!this._hass || !this._built) return;
    const c = this._config;
    const st = this._hass.states;
    const main = c.entity && st[c.entity];
    const lights = this._lights();
    const on = lights.filter((e) => st[e].state === 'on');
    const isOn = on.length > 0 || (main && main.state === 'on');
    const unavailable = main ? main.state === 'unavailable' : lights.length === 0;
    const colorSrc = (main && main.state === 'on' && main) || (on[0] && st[on[0]]);
    const rgb = this._colorOf(colorSrc);

    this._card.style.setProperty('--l', rgb.join(', '));
    this._card.classList.toggle('on', !!isOn);
    this._card.classList.toggle('unavailable', !!unavailable);
    this.shadowRoot.querySelector('.name').textContent = c.name || (main && main.attributes.friendly_name) || c.area || '';

    let state;
    if (unavailable) state = this._t('unavailable');
    else if (!isOn) state = this._t('off');
    else if (lights.length > 1) state = on.length === lights.length ? this._t('all_on') : this._t('n_on', { n: on.length, t: lights.length });
    else state = this._t('on_one');
    const bri = main && main.state === 'on' && main.attributes.brightness;
    if (isOn && bri) state += ' · ' + Math.round(bri / 2.55) + '%';
    this.shadowRoot.querySelector('.state').textContent = state;
  }

  /* ---- popup ---- */

  _openPopup() {
    if (this._pop) return;
    const host = document.createElement('div');
    host.className = 'glow-room-popup';
    const root = host.attachShadow({ mode: 'open' });
    // themakleuren overnemen van de kaart
    const cs = getComputedStyle(this);
    GRC_THEME_VARS.forEach((v) => { const val = cs.getPropertyValue(v); if (val) host.style.setProperty(v, val.trim()); });
    host.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');
    const c = this._config;
    const icon = c.icon ? `<ha-icon icon="${grcEsc(c.icon)}"></ha-icon>` : GRC_BULB;

    root.innerHTML = `
      <style>${GRC_POP_STYLE}</style>
      <div class="backdrop">
        <div class="panel" role="dialog" aria-modal="true" style="--l:${GRC_WARM.join(', ')}">
          <div class="halo"></div>
          <div class="top">
            <div class="head">
              <div class="icon">${icon}</div>
              <div class="t"><h2></h2><div class="meta"><span class="sub"></span><span class="chips"></span></div></div>
              <button class="round close" type="button" aria-label="${grcEsc(this._t('close'))}">${GRC_X}</button>
            </div>
            <div class="scenes"></div>
          </div>
          <div class="body"></div>
        </div>
      </div>`;

    document.body.appendChild(host);
    this._pop = host;
    this._popRoot = root;
    this._bodyKey = null;
    this._chipKey = null;

    const close = () => this._closePopup();
    root.querySelector('.backdrop').addEventListener('pointerdown', (e) => { if (e.target.classList.contains('backdrop')) close(); });
    root.querySelector('.close').addEventListener('click', close);
    this._onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', this._onKey);
    root.querySelector('.panel').addEventListener('pointerdown', () => this._resetAutoClose());
    root.querySelector('.body').addEventListener('scroll', () => this._resetAutoClose(), { passive: true });

    this._updatePopup();
    this._resetAutoClose();
  }

  _resetAutoClose() {
    clearTimeout(this._autoTimer);
    const s = parseInt(this._config.auto_close, 10) || 0;
    if (s > 0) this._autoTimer = setTimeout(() => this._closePopup(), s * 1000);
  }

  _closePopup() {
    clearTimeout(this._autoTimer);
    if (this._onKey) document.removeEventListener('keydown', this._onKey);
    if (this._pop) this._pop.remove();
    this._pop = null;
    this._popRoot = null;
  }

  // horizontale schuifregelaar; stuurt pas bij loslaten (zuinig voor Zigbee)
  _bindTrack(track, onMove, onSet) {
    const pctOf = (e) => {
      const r = track.getBoundingClientRect();
      return Math.round(grcClamp((e.clientX - r.left) / r.width, 0, 1) * 100);
    };
    let active = false;
    track.addEventListener('pointerdown', (e) => {
      active = true;
      track._dragging = true;
      try { track.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      onMove(pctOf(e));
      e.stopPropagation();
      this._resetAutoClose();
    });
    track.addEventListener('pointermove', (e) => { if (active) onMove(pctOf(e)); });
    const end = (e, apply) => {
      if (!active) return;
      active = false;
      track._dragging = false;
      if (apply) {
        // even de nieuwe stand vasthouden tot Home Assistant hem bevestigt
        track._hold = Date.now() + 1500;
        onSet(pctOf(e));
      } else this._updatePopup();
    };
    track.addEventListener('pointerup', (e) => end(e, true));
    track.addEventListener('pointercancel', (e) => end(e, false));
  }

  _busy(track) { return track && (track._dragging || Date.now() < (track._hold || 0)); }

  /* ---- scènes: welke klopt er nu ---- */

  _sceneCfg(s) {
    const id = s.attributes.id;
    if (!id) return null;
    const cfg = GRC_SCENE_CFG.get(id);
    if (cfg === undefined) {
      GRC_SCENE_CFG.set(id, 'loading');
      this._hass.callApi('GET', 'config/scene/config/' + encodeURIComponent(id))
        .then((r) => GRC_SCENE_CFG.set(id, r && r.entities ? r : null))
        .catch(() => GRC_SCENE_CFG.set(id, null))
        .finally(() => { if (this._pop) this._updatePopup(); });
      return null;
    }
    return cfg === 'loading' ? null : cfg;
  }

  _activeScene(ids) {
    const st = this._hass.states;
    const tol = 10 * 2.55;
    let best = null;
    let bestT = -1;
    ids.forEach((id) => {
      const s = st[id];
      if (!s) return;
      const t = Date.parse(s.state) || 0;
      const cfg = this._sceneCfg(s);
      let match;
      if (cfg) {
        const ents = cfg.entities;
        const keys = Object.keys(ents);
        match = keys.some((k) => st[k]) && keys.every((k) => {
          const want = ents[k];
          const cur = st[k];
          if (!cur) return true;
          const ws = typeof want === 'string' ? want : want.state;
          if (ws && cur.state !== ws) return false;
          if (ws === 'on' && k.startsWith('light.') && typeof want.brightness === 'number' && typeof cur.attributes.brightness === 'number'
            && Math.abs(want.brightness - cur.attributes.brightness) > tol) return false;
          return true;
        });
      } else {
        // geen opgeslagen scène: de laatst gestarte, zolang haar lampen niet meer veranderden
        const members = s.attributes.entity_id || [];
        match = t > 0 && members.every((m) => !st[m] || Date.parse(st[m].last_changed) <= t + 5000);
      }
      if (match && t > bestT) { best = id; bestT = t; }
    });
    return best;
  }

  _sceneColor(id, i) {
    const s = this._hass.states[id];
    const cfg = s && this._sceneCfg(s);
    if (cfg) {
      const cols = Object.values(cfg.entities).filter((e) => e && e.state === 'on' && Array.isArray(e.rgb_color)).map((e) => e.rgb_color);
      if (cols.length) return grcSoft([0, 1, 2].map((k) => Math.round(cols.reduce((a, c) => a + c[k], 0) / cols.length)));
    }
    return GRC_PALETTE[i % GRC_PALETTE.length];
  }

  /* ---- popup opbouwen en bijwerken ---- */

  _content() {
    const secs = this._sections();
    const has = (s) => secs.includes(s);
    return {
      secs,
      climate: has('climate'),
      scenes: has('scenes') ? this._list('scenes', ['scene']) : [],
      lights: has('lights') ? this._lights() : [],
      covers: has('covers') ? this._list('covers', ['cover']) : [],
      switches: has('switches') ? this._list('switches', ['switch', 'fan', 'input_boolean']) : [],
    };
  }

  _buildBody(ct) {
    const root = this._popRoot;
    const st = this._hass.states;
    const t = (k) => grcEsc(this._t(k));

    // scènes bovenaan
    const scenes = root.querySelector('.scenes');
    scenes.innerHTML = ct.scenes.map((e, i) => `<button class="scene" type="button" data-e="${grcEsc(e)}" style="--c:${this._sceneColor(e, i).join(', ')}"><span class="dot"></span><span class="sn"></span></button>`).join('');
    scenes.querySelectorAll('.scene').forEach((b) => b.addEventListener('click', () => {
      this._resetAutoClose();
      this._hass.callService('scene', 'turn_on', { entity_id: b.dataset.e });
    }));

    const lightTile = (e) => {
      const modes = this._lightModes(st[e]);
      const ctl = modes.length ? `
        <div class="lctl">
          <div class="track"><div class="rail"><div class="fill"></div><div class="knob"></div></div></div>
          ${modes.length > 1 ? modes.map((m) => `<button class="mode" type="button" data-m="${m}" aria-label="${t({ bri: 'brightness', ct: 'color_temp', col: 'colour' }[m])}">${{ bri: GRC_SUN, ct: GRC_THERMO, col: GRC_PALETTE_ICON }[m]}</button>`).join('') : ''}
        </div>` : '';
      return `
        <div class="tile light" data-e="${grcEsc(e)}">
          <button class="lbtn" type="button">${GRC_BULB}</button>
          <div class="lmain">
            <div class="lrow"><span class="lname"></span><span class="lpct"></span></div>
            ${ctl}
          </div>
        </div>`;
    };
    const coverTile = (e, i) => {
      const f = st[e].attributes.supported_features || 0;
      const btn = (bit, a, ic) => (f & bit ? `<button class="cbtn" type="button" data-a="${a}" aria-label="${t('c_' + a)}">${ic}</button>` : '');
      return `
        <div class="tile cover" data-e="${grcEsc(e)}" style="--c:${GRC_PALETTE[i % GRC_PALETTE.length].join(', ')}">
          <div class="lmain">
            <div class="lrow"><span class="lname"></span><span class="lpct"></span></div>
            <div class="lctl">
              ${f & 4 ? '<div class="track"><div class="rail"><div class="fill"></div></div></div>' : '<span class="gap"></span>'}
              ${btn(1, 'open', GRC_UP)}${btn(8, 'stop', GRC_STOP)}${btn(2, 'close', GRC_DOWN)}
            </div>
          </div>
        </div>`;
    };
    const switchTile = (e, i) => `<button class="tile sw" type="button" data-e="${grcEsc(e)}" style="--c:${GRC_PALETTE[(i + 1) % GRC_PALETTE.length].join(', ')}"><span class="dot"></span><span class="n"></span></button>`;

    const parts = [];
    ct.secs.forEach((s) => {
      if (s === 'lights' && ct.lights.length) {
        parts.push(`<div class="sec"><div class="sh"><span class="lab">${t('sec_lights')}</span><span class="btns"><button class="mini all-on" type="button">${t('all_on_btn')}</button><button class="mini all-off" type="button">${t('all_off_btn')}</button></span></div><div class="grid">${ct.lights.map(lightTile).join('')}</div></div>`);
      }
      if (s === 'covers' && ct.covers.length) {
        parts.push(`<div class="sec"><div class="sh"><span class="lab">${t('sec_covers')}</span></div><div class="grid">${ct.covers.map(coverTile).join('')}</div></div>`);
      }
      if (s === 'switches' && ct.switches.length) {
        parts.push(`<div class="sec"><div class="sh"><span class="lab">${t('sec_switches')}</span></div><div class="grid three">${ct.switches.map(switchTile).join('')}</div></div>`);
      }
    });
    const body = root.querySelector('.body');
    body.innerHTML = parts.join('') || (ct.scenes.length ? '' : `<div class="empty">${t('nothing')}</div>`);
    body.style.display = body.innerHTML ? '' : 'none';

    // lampen
    const roomTarget = () => (this._config.entity ? { entity_id: this._config.entity } : { entity_id: this._lights() });
    const allOn = body.querySelector('.all-on');
    if (allOn) {
      allOn.addEventListener('click', () => this._call('turn_on', roomTarget()));
      body.querySelector('.all-off').addEventListener('click', () => this._call('turn_off', roomTarget()));
    }
    body.querySelectorAll('.light').forEach((el) => {
      const e = el.dataset.e;
      el.querySelector('.lbtn').addEventListener('click', () => { this._resetAutoClose(); this._call('toggle', { entity_id: e }); });
      el.querySelector('.lname').addEventListener('click', () => { this._closePopup(); this._moreInfo(e); });
      el.querySelectorAll('.mode').forEach((b) => b.addEventListener('click', () => {
        this._modes[e] = b.dataset.m;
        const tr = el.querySelector('.track');
        if (tr) tr._hold = 0;
        this._resetAutoClose();
        this._refreshLight(el);
      }));
      const track = el.querySelector('.track');
      if (!track) return;
      this._bindTrack(track,
        (p) => this._previewLight(el, p),
        (p) => {
          const s = this._hass.states[e];
          const m = this._modeOf(e, s);
          if (m === 'ct') this._call('turn_on', { entity_id: e, color_temp_kelvin: this._kelvinAt(s, p) });
          else if (m === 'col') this._call('turn_on', { entity_id: e, hs_color: [Math.round(p * 3.6) % 360, 100] });
          else if (p <= 0) this._call('turn_off', { entity_id: e });
          else this._call('turn_on', { entity_id: e, brightness_pct: p });
        });
    });

    // rolluiken
    body.querySelectorAll('.cover').forEach((el) => {
      const e = el.dataset.e;
      el.querySelector('.lname').addEventListener('click', () => { this._closePopup(); this._moreInfo(e); });
      el.querySelectorAll('.cbtn').forEach((b) => b.addEventListener('click', () => {
        this._resetAutoClose();
        this._hass.callService('cover', b.dataset.a + '_cover', { entity_id: e });
      }));
      const track = el.querySelector('.track');
      if (track) {
        this._bindTrack(track,
          (p) => { track.querySelector('.fill').style.width = p + '%'; el.querySelector('.lpct').textContent = this._coverLabel(p); },
          (p) => this._hass.callService('cover', 'set_cover_position', { entity_id: e, position: p }));
      }
    });

    // schakelaars
    body.querySelectorAll('.sw').forEach((el) => el.addEventListener('click', () => {
      this._resetAutoClose();
      this._hass.callService('homeassistant', 'toggle', { entity_id: el.dataset.e });
    }));
  }

  _modeOf(e, s) {
    const modes = this._lightModes(s);
    return modes.includes(this._modes[e]) ? this._modes[e] : (modes[0] || 'bri');
  }

  _kelvinRange(s) {
    const a = (s && s.attributes) || {};
    const min = a.min_color_temp_kelvin || 2000;
    const max = a.max_color_temp_kelvin || 6500;
    return [min, Math.max(max, min + 1)];
  }

  _kelvinAt(s, p) {
    const [min, max] = this._kelvinRange(s);
    return Math.round(min + (max - min) * p / 100);
  }

  _ctLabel(k) { return this._t(k < 3300 ? 'warm' : k < 4800 ? 'neutral' : 'cool'); }

  _coverLabel(p) { return p >= 100 ? this._t('open') : p <= 0 ? this._t('closed') : p + '%'; }

  // live voorvertoning tijdens het slepen
  _previewLight(el, p) {
    const e = el.dataset.e;
    const s = this._hass.states[e];
    const m = this._modeOf(e, s);
    const lab = el.querySelector('.lpct');
    if (m === 'bri') {
      el.querySelector('.fill').style.width = p + '%';
      lab.textContent = p <= 0 ? this._t('off') : p + '%';
      return;
    }
    el.querySelector('.knob').style.left = p + '%';
    const k = this._kelvinAt(s, p);
    const rgb = m === 'ct' ? grcCtRgb(k) : grcHueRgb(p * 3.6);
    el.style.setProperty('--c', rgb.join(', '));
    el.classList.add('on');
    lab.textContent = m === 'ct' ? this._ctLabel(k) : this._t('colour');
  }

  _refreshLight(el) {
    const e = el.dataset.e;
    const s = this._hass.states[e];
    if (!s) return;
    const a = s.attributes;
    const isOn = s.state === 'on';
    const m = this._modeOf(e, s);
    const track = el.querySelector('.track');
    el.querySelectorAll('.mode').forEach((b) => b.classList.toggle('sel', b.dataset.m === m));
    el.querySelector('.lname').textContent = a.friendly_name || e;
    el.classList.toggle('unavailable', s.state === 'unavailable');
    if (track) {
      track.classList.toggle('ct', m === 'ct');
      track.classList.toggle('col', m === 'col');
    }
    if (this._busy(track)) return;
    el.style.setProperty('--c', this._colorOf(s).join(', '));
    el.classList.toggle('on', isOn);
    const bri = isOn ? (a.brightness ? Math.round(a.brightness / 2.55) : 100) : 0;
    let label = s.state === 'unavailable' ? '–' : (isOn ? bri + '%' : this._t('off'));
    if (track) {
      track.querySelector('.fill').style.width = bri + '%';
      let pos = 0;
      if (m === 'ct') {
        const [min, max] = this._kelvinRange(s);
        const k = a.color_temp_kelvin || Math.round((min + max) / 2);
        pos = grcClamp((k - min) / (max - min) * 100, 0, 100);
        if (isOn && a.color_mode === 'color_temp') label = this._ctLabel(k);
      } else if (m === 'col') {
        pos = Array.isArray(a.hs_color) ? a.hs_color[0] / 3.6 : 0;
        if (isOn && GRC_COLOR_MODES.includes(a.color_mode)) label = this._t('colour');
      }
      track.querySelector('.knob').style.left = pos + '%';
    }
    el.querySelector('.lpct').textContent = label;
  }

  _updatePopup() {
    const root = this._popRoot;
    if (!root || !this._hass) return;
    const c = this._config;
    const st = this._hass.states;
    const ct = this._content();

    // opnieuw opbouwen als de samenstelling wijzigt
    const key = JSON.stringify([ct.secs, ct.scenes, ct.lights.map((e) => e + ':' + this._lightModes(st[e]).join('')), ct.covers.map((e) => e + ':' + (st[e].attributes.supported_features || 0)), ct.switches, this._lang()]);
    if (key !== this._bodyKey) {
      this._bodyKey = key;
      this._buildBody(ct);
    }

    // kop
    const main = c.entity && st[c.entity];
    const lights = this._lights();
    const on = lights.filter((e) => st[e].state === 'on');
    root.querySelector('.head .icon').classList.toggle('on', on.length > 0 || !!(main && main.state === 'on'));
    root.querySelector('h2').textContent = c.name || (main && main.attributes.friendly_name) || c.area || '';
    root.querySelector('.sub').textContent = !lights.length ? '' : on.length === 0 ? this._t('off') : (lights.length > 1 ? this._t('n_on', { n: on.length, t: lights.length }) : this._t('on_one'));

    // klimaat
    let chips = '';
    if (ct.climate) {
      const cl = this._climate();
      const fmt = (v, d) => v.toLocaleString(this._lang(), { minimumFractionDigits: d, maximumFractionDigits: d });
      if (cl.temp !== null) chips += `<span class="cchip${cl.heating ? ' heat' : ''}" style="--c:255, 184, 153">${GRC_THERMO}${fmt(cl.temp, 1)}°</span>`;
      if (cl.hum !== null) chips += `<span class="cchip" style="--c:142, 197, 255">${GRC_DROP}${fmt(cl.hum, 0)}%</span>`;
    }
    if (chips !== this._chipKey) {
      this._chipKey = chips;
      root.querySelector('.chips').innerHTML = chips;
      root.querySelector('.chips').style.display = chips ? 'contents' : 'none';
    }

    // scènes
    const active = ct.scenes.length ? this._activeScene(ct.scenes) : null;
    root.querySelectorAll('.scene').forEach((b) => {
      const s = st[b.dataset.e];
      b.querySelector('.sn').textContent = (s && s.attributes.friendly_name) || b.dataset.e;
      b.classList.toggle('active', b.dataset.e === active);
    });

    // lampen
    root.querySelectorAll('.light').forEach((el) => this._refreshLight(el));

    // rolluiken
    root.querySelectorAll('.cover').forEach((el) => {
      const s = st[el.dataset.e];
      if (!s) return;
      const a = s.attributes;
      el.querySelector('.lname').textContent = a.friendly_name || el.dataset.e;
      el.classList.toggle('unavailable', s.state === 'unavailable');
      const track = el.querySelector('.track');
      if (this._busy(track)) return;
      const pos = typeof a.current_position === 'number' ? a.current_position : (s.state === 'open' ? 100 : s.state === 'closed' ? 0 : null);
      let label;
      if (s.state === 'unavailable') label = '–';
      else if (s.state === 'opening') label = this._t('opening');
      else if (s.state === 'closing') label = this._t('closing');
      else label = pos === null ? '' : this._coverLabel(pos);
      el.querySelector('.lpct').textContent = label;
      if (track) track.querySelector('.fill').style.width = (pos || 0) + '%';
    });

    // schakelaars
    root.querySelectorAll('.sw').forEach((el) => {
      const s = st[el.dataset.e];
      if (!s) return;
      el.querySelector('.n').textContent = s.attributes.friendly_name || el.dataset.e;
      el.classList.toggle('on', s.state === 'on');
      el.classList.toggle('unavailable', s.state === 'unavailable');
    });
  }
}

/* ---------------- editor ---------------- */

class GlowRoomCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    this._render();
  }
  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    else this._render();
  }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = grcLang(this._hass, this._config.language);
    const t = (k) => grcT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => grcT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length)) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        // alle onderdelen aangevinkt = standaard, dan niet opslaan
        if (Array.isArray(v.sections) && GRC_SECTIONS.every((s) => v.sections.includes(s))) delete v.sections;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      { name: 'entity', selector: { entity: { domain: 'light' } } },
      { type: 'grid', name: '', schema: [
        { name: 'name', selector: { text: {} } },
        { name: 'icon', selector: { icon: {} } },
      ] },
      { name: 'area', selector: { area: {} } },
      { type: 'grid', name: '', schema: [
        { name: 'glow', selector: { number: { min: 0, max: 60, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
        { name: 'auto_close', selector: { number: { min: 0, max: 600, step: 5, mode: 'box', unit_of_measurement: 's' } } },
      ] },
      { type: 'expandable', name: '', flatten: true, title: t('popup'), schema: [
        { name: 'sections', selector: { select: { multiple: true, mode: 'list', options: GRC_SECTIONS.map((s) => ({ value: s, label: t('sec_' + s) })) } } },
        { name: 'scenes', selector: { entity: { domain: 'scene', multiple: true } } },
        { name: 'lights', selector: { entity: { domain: 'light', multiple: true } } },
        { name: 'covers', selector: { entity: { domain: 'cover', multiple: true } } },
        { name: 'switches', selector: { entity: { domain: ['switch', 'fan', 'input_boolean', 'light'], multiple: true } } },
        { type: 'grid', name: '', schema: [
          { name: 'temperature', selector: { entity: { domain: 'sensor', device_class: 'temperature' } } },
          { name: 'humidity', selector: { entity: { domain: 'sensor', device_class: 'humidity' } } },
        ] },
      ] },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GRC_LANG_NAMES).map((k) => ({ value: k, label: GRC_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 22, auto_close: 30, language: 'auto', sections: GRC_SECTIONS, ...this._config };
  }
}

if (!customElements.get('glow-room-card')) customElements.define('glow-room-card', GlowRoomCard);
if (!customElements.get('glow-room-card-editor')) customElements.define('glow-room-card-editor', GlowRoomCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-room-card')) {
  window.customCards.push({
    type: 'glow-room-card',
    name: 'Glow Room Card',
    description: grcT(grcLang(null), 'description'),
    preview: true,
    documentationURL: 'https://github.com/stijnleroy/glow-cards',
  });
}

}

/* ---- scene.js ---- */
{
/*
 * Glow Scene Card
 * Een scèneknop in de Glow-stijl die gloeit zolang de scène actief is.
 * "Actief" = de lampen staan nog zoals de scène ze zette (aan/uit en helderheid).
 */

const GSC_I18N = {
  nl: { active: 'Actief', start: 'Tik om te starten', err: 'Vul "entity" in met een scène.', l_entity: 'Scène', l_name: 'Naam', l_icon: 'Icoon', l_color: 'Kleur (leeg = uit de scène)', l_tolerance: 'Marge voor helderheid (%)', l_match_color: 'Ook de kleur vergelijken', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)', description: 'Scèneknop met gloed zolang de scène actief is.' },
  en: { active: 'Active', start: 'Tap to start', err: 'Fill in "entity" with a scene.', l_entity: 'Scene', l_name: 'Name', l_icon: 'Icon', l_color: 'Colour (empty = from the scene)', l_tolerance: 'Brightness margin (%)', l_match_color: 'Also compare colour', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)', description: 'Scene button that glows while the scene is active.' },
  fr: { active: 'Active', start: 'Toucher pour lancer', err: 'Renseignez "entity" avec une scène.', l_entity: 'Scène', l_name: 'Nom', l_icon: 'Icône', l_color: 'Couleur (vide = de la scène)', l_tolerance: 'Marge de luminosité (%)', l_match_color: 'Comparer aussi la couleur', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)', description: 'Bouton de scène qui brille tant que la scène est active.' },
  de: { active: 'Aktiv', start: 'Tippen zum Starten', err: 'Gib unter "entity" eine Szene an.', l_entity: 'Szene', l_name: 'Name', l_icon: 'Symbol', l_color: 'Farbe (leer = aus der Szene)', l_tolerance: 'Helligkeitstoleranz (%)', l_match_color: 'Auch die Farbe vergleichen', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)', description: 'Szenen-Taste, die leuchtet, solange die Szene aktiv ist.' },
  es: { active: 'Activa', start: 'Toca para iniciar', err: 'Indica una escena en "entity".', l_entity: 'Escena', l_name: 'Nombre', l_icon: 'Icono', l_color: 'Color (vacío = de la escena)', l_tolerance: 'Margen de brillo (%)', l_match_color: 'Comparar también el color', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)', description: 'Botón de escena que brilla mientras la escena está activa.' },
  it: { active: 'Attiva', start: 'Tocca per avviare', err: 'Indica una scena in "entity".', l_entity: 'Scena', l_name: 'Nome', l_icon: 'Icona', l_color: 'Colore (vuoto = dalla scena)', l_tolerance: 'Margine di luminosità (%)', l_match_color: 'Confronta anche il colore', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)', description: 'Pulsante scena che brilla finché la scena è attiva.' },
};
const GSC_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };

function gscLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GSC_I18N[l] ? l : 'en';
}
function gscT(lang, key) { return (GSC_I18N[lang] && GSC_I18N[lang][key]) || GSC_I18N.en[key] || key; }
function gscEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function gscHexRgb(hex) {
  let h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const v = parseInt(h.slice(0, 6), 16);
  return isNaN(v) ? null : [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}
function gscTime(s) {
  const t = Date.parse(s && s.state);
  return isNaN(t) ? 0 : t;
}

// gedeeld tussen alle scènekaarten: welke scènes kloppen nu
const GSC_REGISTRY = (window.__glowSceneRegistry = window.__glowSceneRegistry || new Map());

const GSC_SPARK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>';

const GSC_STYLE = `
  :host { display: block; height: 100%; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; height: 100%; min-height: 112px;
    border-radius: var(--ha-card-border-radius, 24px); padding: 14px 16px; cursor: pointer; user-select: none; -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent; touch-action: manipulation;
    color: var(--glow-text, #F3F1FA);
    background: var(--glow-card-background, #15121F);
    border: 1px solid var(--glow-card-border, rgba(255, 255, 255, 0.08));
    display: flex; flex-direction: column; justify-content: space-between;
    transition: background 0.4s, border-color 0.4s, box-shadow 0.4s, transform 0.12s;
  }
  ha-card:active, ha-card.pressed { transform: scale(0.97); }
  ha-card.active {
    background: linear-gradient(rgba(var(--l), 0.16), rgba(var(--l), 0.16)), var(--glow-card-background, #15121F);
    border-color: rgba(var(--l), 0.55);
    box-shadow: 0 0 var(--glow) rgba(var(--l), 0.35);
  }
  .halo { position: absolute; right: -50px; top: -60px; width: 160px; height: 160px; border-radius: 50%; background: rgb(var(--l)); opacity: 0; filter: blur(46px); transition: opacity 0.5s; pointer-events: none; }
  ha-card.active .halo { opacity: 0.45; }
  .icon {
    position: relative; width: 52px; height: 52px; border-radius: 26px; display: flex; align-items: center; justify-content: center;
    background: var(--glow-surface, rgba(255, 255, 255, 0.07)); color: var(--glow-text, #F3F1FA); transition: background 0.4s, box-shadow 0.4s, color 0.4s;
    --mdc-icon-size: 28px;
  }
  .icon svg { width: 26px; height: 26px; }
  ha-card.active .icon { background: rgb(var(--l)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--l), 0.8); }
  .txt { position: relative; display: flex; flex-direction: column; min-width: 0; }
  .name { font-size: 1.15rem; font-weight: 800; line-height: 1.2; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .state { font-size: 0.9rem; font-weight: 700; opacity: 0.7; white-space: nowrap; }
  ha-card.active .state { opacity: 1; color: color-mix(in srgb, rgb(var(--l)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .dot { display: inline-block; width: 8px; height: 8px; border-radius: 4px; margin-right: 6px; background: rgb(var(--l)); box-shadow: 0 0 8px rgba(var(--l), 0.9); vertical-align: 1px; }
`;

class GlowSceneCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sceneCfg = null;
    this._cfgFor = null;
    this._built = false;
  }

  static getConfigElement() { return document.createElement('glow-scene-card-editor'); }
  static getStubConfig(hass) {
    const s = Object.keys((hass && hass.states) || {}).find((e) => e.startsWith('scene.'));
    return { entity: s || '' };
  }

  setConfig(config) {
    if (!config || !config.entity) throw new Error(gscT(gscLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, tolerance: 10, match_color: false, ...config };
    this._built = false;
    this._sceneCfg = null;
    this._cfgFor = null;
    if (this._hass) { this._build(); this._update(); }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    if (this._built && this._builtLang !== this._lang()) this._built = false;
    if (!this._built) this._build();
    this._loadSceneConfig();
    this._update();
  }

  get hass() { return this._hass; }
  getCardSize() { return 2; }
  getGridOptions() { return { columns: 6, rows: 2, min_columns: 3, min_rows: 2 }; }

  disconnectedCallback() { GSC_REGISTRY.delete(this._config && this._config.entity); }

  _lang() { return gscLang(this._hass, this._config && this._config.language); }

  // de opgeslagen scène ophalen (alleen voor scènes uit de scène-editor, met beheerdersrechten)
  _loadSceneConfig() {
    const st = this._hass.states[this._config.entity];
    const id = st && st.attributes.id;
    if (!id || this._cfgFor === id || this._loading) return;
    this._loading = true;
    this._hass.callApi('GET', 'config/scene/config/' + encodeURIComponent(id))
      .then((cfg) => { this._sceneCfg = cfg && cfg.entities ? cfg : null; })
      .catch(() => { this._sceneCfg = null; })
      .finally(() => { this._cfgFor = id; this._loading = false; this._update(); });
  }

  _build() {
    const c = this._config;
    this._builtLang = this._lang();
    const icon = c.icon ? `<ha-icon icon="${gscEsc(c.icon)}"></ha-icon>` : null;
    this.shadowRoot.innerHTML = `
      <style>${GSC_STYLE}</style>
      <ha-card style="--glow:${parseInt(c.glow, 10) || 0}px">
        <div class="halo"></div>
        <div class="icon">${icon || GSC_SPARK}</div>
        <div class="txt"><span class="name"></span><span class="state"></span></div>
      </ha-card>`;
    this._card = this.shadowRoot.querySelector('ha-card');
    this._bindTaps();
    this._built = true;
  }

  _bindTaps() {
    let holdTimer = null;
    let held = false;
    let start = null;
    this._card.addEventListener('pointerdown', (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      held = false;
      start = [e.clientX, e.clientY];
      holdTimer = setTimeout(() => {
        held = true;
        this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._config.entity }, bubbles: true, composed: true }));
      }, 600);
    });
    this._card.addEventListener('pointermove', (e) => {
      if (start && Math.hypot(e.clientX - start[0], e.clientY - start[1]) > 12) { clearTimeout(holdTimer); start = null; }
    });
    this._card.addEventListener('pointerup', () => {
      clearTimeout(holdTimer);
      if (held || !start) return;
      start = null;
      this._card.classList.add('pressed');
      setTimeout(() => this._card.classList.remove('pressed'), 150);
      this._hass.callService('scene', 'turn_on', { entity_id: this._config.entity });
    });
    this._card.addEventListener('pointercancel', () => { clearTimeout(holdTimer); start = null; });
    this._card.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  // klopt de huidige toestand met de scène?
  _matches() {
    const st = this._hass.states;
    const scene = st[this._config.entity];
    if (!scene) return false;
    const tol = (parseFloat(this._config.tolerance) || 0) * 2.55;
    if (this._sceneCfg) {
      const ents = this._sceneCfg.entities;
      const ids = Object.keys(ents);
      if (!ids.some((id) => st[id])) return false; // geen enkele bekende entiteit
      return ids.every((id) => {
        const want = ents[id];
        const cur = st[id];
        if (!cur) return true; // onbekende entiteit telt niet mee
        const wantState = typeof want === 'string' ? want : want.state;
        if (wantState && cur.state !== wantState) return false;
        if (wantState === 'on' && id.startsWith('light.')) {
          if (typeof want.brightness === 'number' && typeof cur.attributes.brightness === 'number'
            && Math.abs(want.brightness - cur.attributes.brightness) > Math.max(tol, 3)) return false;
          if (this._config.match_color && Array.isArray(want.rgb_color) && Array.isArray(cur.attributes.rgb_color)) {
            const d = want.rgb_color.reduce((a, v, i) => a + Math.abs(v - cur.attributes.rgb_color[i]), 0);
            if (d > 90) return false;
          }
        }
        return true;
      });
    }
    // geen scène-instellingen: de laatst gestarte scène, zolang haar lampen niet meer veranderden
    const t = gscTime(scene);
    if (!t) return false;
    const members = scene.attributes.entity_id || [];
    return members.every((id) => {
      const cur = st[id];
      return !cur || Date.parse(cur.last_changed) <= t + 5000;
    });
  }

  _sceneColor() {
    const fixed = gscHexRgb(this._config.color);
    if (fixed) return fixed;
    if (this._sceneCfg) {
      const cols = Object.values(this._sceneCfg.entities)
        .filter((e) => e && e.state === 'on' && Array.isArray(e.rgb_color))
        .map((e) => e.rgb_color);
      if (cols.length) {
        const avg = [0, 1, 2].map((i) => Math.round(cols.reduce((a, c) => a + c[i], 0) / cols.length));
        return avg.map((c) => Math.round(c + (255 - c) * 0.35));
      }
    }
    return [185, 168, 255];
  }

  _update() {
    if (!this._hass || !this._built) return;
    const c = this._config;
    const st = this._hass.states[c.entity];
    const match = !!st && this._matches();
    const lastOn = gscTime(st);
    GSC_REGISTRY.set(c.entity, { match, last: lastOn, members: (st && st.attributes.entity_id) || [] });

    // twee scènes met dezelfde lampen die allebei kloppen? dan wint de laatst gestarte
    let active = match;
    if (match) {
      GSC_REGISTRY.forEach((other, ent) => {
        if (ent === c.entity || !other.match) return;
        const overlap = other.members.some((m) => (st.attributes.entity_id || []).includes(m));
        if (overlap && other.last > lastOn) active = false;
      });
    }

    this._card.style.setProperty('--l', this._sceneColor().join(', '));
    this._card.classList.toggle('active', active);
    this.shadowRoot.querySelector('.name').textContent = c.name || (st && st.attributes.friendly_name) || c.entity;
    const state = this.shadowRoot.querySelector('.state');
    if (active) state.innerHTML = '<span class="dot"></span>' + gscEsc(gscT(this._lang(), 'active'));
    else state.textContent = '';
    if (!c.icon && st && st.attributes.icon && !this._iconSet) {
      this.shadowRoot.querySelector('.icon').innerHTML = `<ha-icon icon="${gscEsc(st.attributes.icon)}"></ha-icon>`;
      this._iconSet = true;
    }

    // de andere scènekaarten laten herberekenen
    if (this._lastActive !== active || this._lastMatch !== match) {
      this._lastActive = active;
      this._lastMatch = match;
      window.dispatchEvent(new CustomEvent('glow-scene-changed', { detail: c.entity }));
    }
  }

  connectedCallback() {
    this._onOther = (e) => { if (e.detail !== (this._config && this._config.entity) && this._hass) this._update(); };
    window.addEventListener('glow-scene-changed', this._onOther);
  }
}

// het venster-event pas loskoppelen bij verwijderen
const _gscDisc = GlowSceneCard.prototype.disconnectedCallback;
GlowSceneCard.prototype.disconnectedCallback = function () {
  if (this._onOther) window.removeEventListener('glow-scene-changed', this._onOther);
  _gscDisc.call(this);
};

class GlowSceneCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._render(); }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = gscLang(this._hass, this._config.language);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gscT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.match_color === false) delete v.match_color;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      { name: 'entity', selector: { entity: { domain: 'scene' } } },
      { type: 'grid', name: '', schema: [
        { name: 'name', selector: { text: {} } },
        { name: 'icon', selector: { icon: {} } },
      ] },
      { name: 'color', selector: { text: {} } },
      { type: 'grid', name: '', schema: [
        { name: 'tolerance', selector: { number: { min: 0, max: 50, mode: 'box', unit_of_measurement: '%' } } },
        { name: 'glow', selector: { number: { min: 0, max: 60, step: 1, mode: 'box', unit_of_measurement: 'px' } } },
      ] },
      { name: 'match_color', selector: { boolean: {} } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: gscT(lang, 'lang_auto') }].concat(Object.keys(GSC_LANG_NAMES).map((k) => ({ value: k, label: GSC_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, tolerance: 10, language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-scene-card')) customElements.define('glow-scene-card', GlowSceneCard);
if (!customElements.get('glow-scene-card-editor')) customElements.define('glow-scene-card-editor', GlowSceneCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-scene-card')) {
  window.customCards.push({
    type: 'glow-scene-card',
    name: 'Glow Scene Card',
    description: gscT(gscLang(null), 'description'),
    preview: true,
    documentationURL: 'https://github.com/stijnleroy/glow-cards',
  });
}

}

/* ---- navbar.js ---- */
{
/*
 * Glow Navbar Card
 * Een navigatiebalk onderaan het scherm in de Glow-stijl: tik om van view te
 * wisselen, met bolletjes voor bv. verwarming, alarm of het aantal lampen aan.
 * Zet de kaart op elke view (onderaan); de balk zelf zweeft over het scherm.
 */

const GNC_I18N = {
  nl: { more: 'Meer', l_labels: 'Labels', lab_always: 'Altijd', lab_active: 'Alleen bij de actieve view', lab_never: 'Nooit', l_style: 'Stijl', st_floating: 'Zwevend', st_fixed: 'Vast tegen de onderrand', l_max_items: 'Aantal views op de balk (de rest onder "Meer")', l_glow: 'Sterkte van de gloed', l_views: 'Views (leeg = automatisch uit dit dashboard)', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)', description: 'Navigatiebalk onderaan het scherm, met bolletjes voor verwarming, alarm en meer.' },
  en: { more: 'More', l_labels: 'Labels', lab_always: 'Always', lab_active: 'Only on the active view', lab_never: 'Never', l_style: 'Style', st_floating: 'Floating', st_fixed: 'Fixed to the bottom edge', l_max_items: 'Views on the bar (the rest under "More")', l_glow: 'Glow strength', l_views: 'Views (empty = automatic from this dashboard)', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)', description: 'Navigation bar at the bottom of the screen, with dots for heating, alarm and more.' },
  fr: { more: 'Plus', l_labels: 'Libellés', lab_always: 'Toujours', lab_active: 'Seulement la vue active', lab_never: 'Jamais', l_style: 'Style', st_floating: 'Flottant', st_fixed: 'Collé en bas', l_max_items: 'Vues sur la barre (le reste sous « Plus »)', l_glow: 'Intensité de la lueur', l_views: 'Vues (vide = automatique depuis ce tableau de bord)', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)', description: 'Barre de navigation en bas de l\'écran, avec des pastilles pour le chauffage, l\'alarme et plus.' },
  de: { more: 'Mehr', l_labels: 'Beschriftungen', lab_always: 'Immer', lab_active: 'Nur bei der aktiven Ansicht', lab_never: 'Nie', l_style: 'Stil', st_floating: 'Schwebend', st_fixed: 'Am unteren Rand', l_max_items: 'Ansichten in der Leiste (Rest unter „Mehr“)', l_glow: 'Leuchtstärke', l_views: 'Ansichten (leer = automatisch aus diesem Dashboard)', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)', description: 'Navigationsleiste am unteren Bildschirmrand, mit Punkten für Heizung, Alarm und mehr.' },
  es: { more: 'Más', l_labels: 'Etiquetas', lab_always: 'Siempre', lab_active: 'Solo en la vista activa', lab_never: 'Nunca', l_style: 'Estilo', st_floating: 'Flotante', st_fixed: 'Fija abajo', l_max_items: 'Vistas en la barra (el resto en «Más»)', l_glow: 'Intensidad del brillo', l_views: 'Vistas (vacío = automático desde este panel)', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)', description: 'Barra de navegación en la parte inferior, con puntos para calefacción, alarma y más.' },
  it: { more: 'Altro', l_labels: 'Etichette', lab_always: 'Sempre', lab_active: 'Solo sulla vista attiva', lab_never: 'Mai', l_style: 'Stile', st_floating: 'Fluttuante', st_fixed: 'Fissa in basso', l_max_items: 'Viste nella barra (il resto in «Altro»)', l_glow: 'Intensità del bagliore', l_views: 'Viste (vuoto = automatico da questa dashboard)', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)', description: 'Barra di navigazione in basso, con pallini per riscaldamento, allarme e altro.' },
};
const GNC_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
const GNC_PALETTE = ['#B9A8FF', '#FFE08A', '#FFB899', '#FF9FBF', '#8EC5FF', '#8FE3B8'];

function gncLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GNC_I18N[l] ? l : 'en';
}
function gncT(lang, key) { return (GNC_I18N[lang] && GNC_I18N[lang][key]) || GNC_I18N.en[key] || key; }
function gncEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function gncRgb(hex) {
  let h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const v = parseInt(h.slice(0, 6), 16);
  return isNaN(v) ? '185, 168, 255' : ((v >> 16) & 255) + ', ' + ((v >> 8) & 255) + ', ' + (v & 255);
}

const GNC_DOTS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 12h.01M12 12h.01M19 12h.01"/></svg>';

const GNC_STYLE = `
  :host { all: initial; }
  .bar {
    position: fixed; z-index: 7; left: 50%; transform: translateX(-50%);
    bottom: calc(16px + env(safe-area-inset-bottom, 0px)); width: calc(100% - 32px); max-width: 900px; height: 80px;
    box-sizing: border-box; padding: 8px; display: flex; gap: 4px;
    border-radius: var(--ha-card-border-radius, 24px);
    background: color-mix(in srgb, var(--glow-card-background, #15121F) 85%, transparent);
    border: 1px solid var(--glow-border, rgba(255, 255, 255, 0.12));
    box-shadow: 0 16px 50px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    font-family: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif);
    touch-action: manipulation;
  }
  .bar.fixed { left: 0; right: 0; bottom: 0; transform: none; width: 100%; max-width: none; height: calc(88px + env(safe-area-inset-bottom, 0px)); padding: 8px 16px calc(12px + env(safe-area-inset-bottom, 0px)); border-radius: 0; border-width: 1px 0 0 0; box-shadow: none; }
  .bar.inline { position: relative; left: 0; transform: none; bottom: 0; width: 100%; max-width: none; }
  button {
    flex: 1; min-width: 0; height: 64px; border: 0; padding: 0 6px; border-radius: 20px; cursor: pointer;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
    font: inherit; color: var(--glow-text, #F3F1FA); background: transparent;
    -webkit-tap-highlight-color: transparent; transition: background 0.3s, box-shadow 0.3s;
  }
  button.on { background: rgba(var(--c), 0.16); box-shadow: inset 0 0 0 1px rgba(var(--c), 0.5), 0 0 var(--glow) rgba(var(--c), 0.35); }
  .ic { position: relative; display: flex; align-items: center; justify-content: center; color: var(--glow-muted, #A39FB8); --mdc-icon-size: 24px; }
  .ic svg { width: 24px; height: 24px; }
  button.on .ic { color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); filter: drop-shadow(0 0 calc(var(--glow) * 0.5) rgba(var(--c), 0.9)); }
  .lab { font-size: 12px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; color: var(--glow-muted, #A39FB8); }
  button.on .lab { color: var(--glow-text, #F3F1FA); }
  .dot { position: absolute; right: -4px; top: -2px; width: 10px; height: 10px; border-radius: 5px; background: rgb(var(--b)); box-shadow: 0 0 10px rgba(var(--b), 0.95); }
  .num { position: absolute; right: -14px; top: -8px; min-width: 18px; height: 18px; padding: 0 5px; box-sizing: border-box; border-radius: 9px; font-size: 11px; font-weight: 800; line-height: 18px; text-align: center; color: #1C1730; background: rgb(var(--b)); box-shadow: 0 0 8px rgba(var(--b), 0.8); }
  .more {
    position: fixed; z-index: 8; right: max(16px, calc(50% - 450px)); bottom: calc(108px + env(safe-area-inset-bottom, 0px));
    width: min(340px, calc(100% - 32px)); box-sizing: border-box; padding: 14px; border-radius: 26px;
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px;
    background: var(--glow-card-background, #1A1729); border: 1px solid var(--glow-border, rgba(255, 255, 255, 0.12));
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); animation: gnc-pop 0.2s ease-out;
    font-family: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif);
  }
  .more.inline { position: absolute; bottom: 92px; right: 0; }
  .more button { height: 84px; border: 1px solid transparent; background: var(--glow-surface, rgba(255, 255, 255, 0.05)); gap: 6px; }
  .more button.on { border-color: rgba(var(--c), 0.55); background: rgba(var(--c), 0.16); box-shadow: none; }
  .more .ic { width: 40px; height: 40px; border-radius: 20px; color: rgb(var(--c)); background: rgba(var(--c), 0.14); filter: none; }
  .more button.on .ic { color: #1C1730; background: rgb(var(--c)); }
  .more .lab { font-size: 13px; color: var(--glow-text, #F3F1FA); }
  .shade { position: fixed; inset: 0; z-index: 7; }
  @keyframes gnc-pop { from { opacity: 0; transform: translateY(10px) scale(0.97); } to { opacity: 1; transform: none; } }
`;

const GNC_VARS = ['--glow-card-background', '--glow-text', '--glow-surface', '--glow-border', '--glow-ink-amount', '--ha-card-border-radius', '--paper-font-body1_-_font-family', '--secondary-text-color'];

class GlowNavbarCard extends HTMLElement {
  constructor() {
    super();
    this._views = null;
    this._moreOpen = false;
    this._onLoc = () => this._render();
  }

  static getConfigElement() { return document.createElement('glow-navbar-card-editor'); }
  static getStubConfig() { return {}; }

  setConfig(config) {
    this._config = { max_items: 6, labels: 'always', style: 'floating', glow: 15, spacer: true, ...(config || {}) };
    this._views = null;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    if (!this._views) this._loadViews();
    this._render();
  }
  get hass() { return this._hass; }

  getCardSize() { return 1; }
  getGridOptions() { return { columns: 'full', rows: 'auto' }; }

  connectedCallback() {
    window.addEventListener('location-changed', this._onLoc);
    window.addEventListener('popstate', this._onLoc);
    this._render();
  }

  disconnectedCallback() {
    window.removeEventListener('location-changed', this._onLoc);
    window.removeEventListener('popstate', this._onLoc);
    if (this._portal && window.__glowNavbar === this._portal) window.__glowNavbar = null;
    if (this._portal) this._portal.remove();
    this._portal = null;
  }

  _lang() { return gncLang(this._hass, this._config && this._config.language); }

  // in de editor-voorvertoning de balk gewoon in de kaart tonen
  _inline() { return !!this.preview || !!this.editMode; }

  _dashPath() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts[0] || 'lovelace';
  }

  // views uit de configuratie, of automatisch uit dit dashboard
  _loadViews() {
    const c = this._config;
    if (Array.isArray(c.views) && c.views.length) {
      this._views = c.views.map((v, i) => ({ ...v, color: v.color || GNC_PALETTE[i % GNC_PALETTE.length] }));
      return;
    }
    if (this._loading || !this._hass || !this._hass.callWS) return;
    this._loading = true;
    const dash = this._dashPath();
    this._hass.callWS({ type: 'lovelace/config', url_path: dash === 'lovelace' ? null : dash })
      .then((cfg) => {
        this._views = (cfg.views || [])
          .map((v, i) => ({ v, i }))
          .filter(({ v }) => !v.subview && v.visible !== false)
          .map(({ v, i }, n) => ({
            path: '/' + dash + '/' + (v.path || i),
            name: v.title || v.path || String(i + 1),
            icon: v.icon || 'mdi:view-dashboard',
            color: GNC_PALETTE[n % GNC_PALETTE.length],
          }));
      })
      .catch(() => { this._views = []; })
      .finally(() => { this._loading = false; this._render(); });
  }

  _isActive(v) {
    const here = window.location.pathname.replace(/\/$/, '');
    const p = String(v.path || '').replace(/\/$/, '');
    if (!p) return false;
    if (here === p) return true;
    // de eerste view (index 0) is ook actief op /dashboard zonder viewpad
    return /\/0$/.test(p) && here === p.replace(/\/0$/, '');
  }

  _badge(v) {
    const b = v.badge;
    if (!b || !this._hass) return null;
    const st = this._hass.states;
    const color = gncRgb(b.color || v.color);
    if (b.type === 'lights_on') {
      const n = Object.keys(st).filter((e) => e.startsWith('light.') && st[e].state === 'on'
        && !Array.isArray(st[e].attributes.entity_id) && !Array.isArray(st[e].attributes.group_entities) && !st[e].attributes.is_hue_group).length;
      return n > 0 ? { num: String(n), color } : null;
    }
    const s = b.entity && st[b.entity];
    if (!s) return null;
    const val = b.attribute ? s.attributes[b.attribute] : s.state;
    if (b.type === 'count') {
      const n = parseFloat(val);
      return n > 0 ? { num: String(Math.round(n)), color } : null;
    }
    const list = (x) => (Array.isArray(x) ? x : x === undefined ? [] : [x]).map(String);
    let show;
    if (b.state !== undefined) show = list(b.state).includes(String(val));
    else if (b.state_not !== undefined) show = !list(b.state_not).includes(String(val));
    else show = ['on', 'open', 'heating', 'home', 'playing'].includes(String(val));
    return show ? { dot: true, color } : null;
  }

  _navigate(path) {
    this._moreOpen = false;
    if (!path) return;
    if (/^https?:/.test(path)) { window.open(path, '_blank'); return; }
    history.pushState(null, '', path);
    window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } }));
    this._render();
  }

  _iconHtml(icon) {
    return icon ? `<ha-icon icon="${gncEsc(icon)}"></ha-icon>` : GNC_DOTS;
  }

  _render() {
    if (!this._config || !this.isConnected) return;
    const c = this._config;
    const inline = this._inline();

    // ruimte vrijhouden onderaan de view, zodat de balk niets bedekt
    this.style.display = 'block';
    this.style.height = inline ? 'auto' : (c.spacer === false ? '0px' : '96px');

    if (!this._portal) {
      // één balk tegelijk: de nieuwste view neemt over
      if (window.__glowNavbar && window.__glowNavbar !== this._portal) window.__glowNavbar.remove();
      this._portal = document.createElement('div');
      this._portal.className = 'glow-navbar';
      this._portal.attachShadow({ mode: 'open' });
      this._lastHtml = null;
      window.__glowNavbar = this._portal;
    }
    const host = this._portal;
    const parent = inline ? this : document.body;
    if (host.parentNode !== parent) parent.appendChild(host);
    if (inline) host.style.cssText = 'display:block;position:relative;';

    // themakleuren overnemen (de balk hangt buiten het dashboard)
    const cs = getComputedStyle(this);
    GNC_VARS.forEach((n) => { const val = cs.getPropertyValue(n); if (val) host.style.setProperty(n, val.trim()); });
    const muted = cs.getPropertyValue('--secondary-text-color');
    if (muted) host.style.setProperty('--glow-muted', muted.trim());
    host.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');

    const views = this._views || [];
    const max = Math.max(2, parseInt(c.max_items, 10) || 6);
    const needMore = views.length > max;
    const shown = needMore ? views.slice(0, max) : views;
    const rest = needMore ? views.slice(max) : [];
    const lang = this._lang();
    const lab = (on) => c.labels === 'always' || (c.labels === 'active' && on);

    const btn = (v, i, inMore) => {
      const on = this._isActive(v);
      const b = this._badge(v);
      const badge = b ? (b.dot ? `<span class="dot" style="--b:${b.color}"></span>` : `<span class="num" style="--b:${b.color}">${gncEsc(b.num)}</span>`) : '';
      return `<button type="button" class="${on ? 'on' : ''}" data-i="${i}" style="--c:${gncRgb(v.color)}" aria-label="${gncEsc(v.name)}" ${on && !inMore ? 'aria-current="page"' : ''}>
        <span class="ic">${this._iconHtml(v.icon)}${badge}</span>
        ${inMore || lab(on) ? `<span class="lab">${gncEsc(v.name)}</span>` : ''}
      </button>`;
    };

    const restActive = rest.some((v) => this._isActive(v));
    const moreOn = this._moreOpen || restActive;
    const moreBtn = needMore ? `<button type="button" class="morebtn ${moreOn ? 'on' : ''}" style="--c:185, 168, 255" aria-label="${gncEsc(gncT(lang, 'more'))}" aria-expanded="${this._moreOpen}">
        <span class="ic">${GNC_DOTS}</span>${lab(moreOn) ? `<span class="lab">${gncEsc(gncT(lang, 'more'))}</span>` : ''}</button>` : '';

    const html = `
      <style>${GNC_STYLE}</style>
      ${this._moreOpen ? `<div class="shade"></div><div class="more ${inline ? 'inline' : ''}">${rest.map((v, k) => btn(v, max + k, true)).join('')}</div>` : ''}
      <nav class="bar ${c.style === 'fixed' ? 'fixed' : ''} ${inline ? 'inline' : ''}">${shown.map((v, i) => btn(v, i, false)).join('')}${moreBtn}</nav>`;
    // alleen opnieuw tekenen als er echt iets veranderde (anders kan een tik verloren gaan)
    if (html === this._lastHtml && host.shadowRoot.firstChild) return;
    this._lastHtml = html;
    host.shadowRoot.innerHTML = html;

    const root = host.shadowRoot;
    root.querySelectorAll('button[data-i]').forEach((el) => el.addEventListener('click', () => {
      const v = views[parseInt(el.dataset.i, 10)];
      this._navigate(v && v.path);
    }));
    const mb = root.querySelector('.morebtn');
    if (mb) mb.addEventListener('click', () => { this._moreOpen = !this._moreOpen; this._render(); });
    const shade = root.querySelector('.shade');
    if (shade) shade.addEventListener('click', () => { this._moreOpen = false; this._render(); });
    // tikken op de balk niet laten doorlopen naar swipe-navigatie
    ['touchstart', 'touchmove', 'touchend', 'pointerdown'].forEach((ev) => root.querySelectorAll('.bar, .more').forEach((el) => el.addEventListener(ev, (e) => e.stopPropagation(), { passive: true })));
  }
}

class GlowNavbarCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._draw(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._draw(); }
  _draw() {
    if (!this._config || !this._hass) return;
    const lang = gncLang(this._hass, this._config.language);
    const t = (k) => gncT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gncT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (Array.isArray(v.views) && !v.views.length) delete v.views;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      { type: 'grid', name: '', schema: [
        { name: 'labels', selector: { select: { mode: 'dropdown', options: [{ value: 'always', label: t('lab_always') }, { value: 'active', label: t('lab_active') }, { value: 'never', label: t('lab_never') }] } } },
        { name: 'style', selector: { select: { mode: 'dropdown', options: [{ value: 'floating', label: t('st_floating') }, { value: 'fixed', label: t('st_fixed') }] } } },
        { name: 'max_items', selector: { number: { min: 2, max: 10, mode: 'box' } } },
        { name: 'glow', selector: { number: { min: 0, max: 40, mode: 'box', unit_of_measurement: 'px' } } },
      ] },
      { name: 'views', selector: { object: {} } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GNC_LANG_NAMES).map((k) => ({ value: k, label: GNC_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { labels: 'always', style: 'floating', max_items: 6, glow: 15, language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-navbar-card')) customElements.define('glow-navbar-card', GlowNavbarCard);
if (!customElements.get('glow-navbar-card-editor')) customElements.define('glow-navbar-card-editor', GlowNavbarCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-navbar-card')) {
  window.customCards.push({
    type: 'glow-navbar-card',
    name: 'Glow Navbar Card',
    description: gncT(gncLang(null), 'description'),
    preview: true,
    documentationURL: 'https://github.com/stijnleroy/glow-cards',
  });
}

}

/* ---- welcome.js ---- */
{
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
    description: 'Welkomstkaart zonder achtergrond: uur, begroeting, personen, weer, afval en post.',
  },
  en: {
    morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening', night: 'Good night',
    today: 'Today', tonight: 'Put out tonight', tomorrow: 'Tomorrow', in_days: 'In {n} days',
    letter: '1 letter', letters: '{n} letters', no_mail: 'No mail', last: 'Last at {t}', reset: 'Reset to 0', close: 'Close',
    l_name: 'Name in the greeting (optional)', l_persons: 'People (empty = everyone)', l_weather: 'Weather', l_waste: 'Waste sensors (empty = automatic, Afvalbeheer)',
    l_mail: 'Mail counter', l_mail_reset: 'Reset button or script (only if the mail counter is not a counter or input_number)', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Welcome card without a background: time, greeting, people, weather, waste and mail.',
  },
  fr: {
    morning: 'Bonjour', afternoon: 'Bon après-midi', evening: 'Bonsoir', night: 'Bonne nuit',
    today: 'Aujourd\'hui', tonight: 'À sortir ce soir', tomorrow: 'Demain', in_days: 'Dans {n} jours',
    letter: '1 lettre', letters: '{n} lettres', no_mail: 'Pas de courrier', last: 'Dernier à {t}', reset: 'Remettre à 0', close: 'Fermer',
    l_name: 'Nom dans la salutation (optionnel)', l_persons: 'Personnes (vide = tout le monde)', l_weather: 'Météo', l_waste: 'Capteurs de déchets (vide = automatique, Afvalbeheer)',
    l_mail: 'Compteur de courrier', l_mail_reset: 'Bouton ou script de remise à zéro (seulement si ce n\'est pas un counter ou input_number)', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Carte d\'accueil sans fond : heure, salutation, personnes, météo, déchets et courrier.',
  },
  de: {
    morning: 'Guten Morgen', afternoon: 'Guten Tag', evening: 'Guten Abend', night: 'Gute Nacht',
    today: 'Heute', tonight: 'Heute Abend raus', tomorrow: 'Morgen', in_days: 'In {n} Tagen',
    letter: '1 Brief', letters: '{n} Briefe', no_mail: 'Keine Post', last: 'Zuletzt um {t}', reset: 'Auf 0 setzen', close: 'Schließen',
    l_name: 'Name in der Begrüßung (optional)', l_persons: 'Personen (leer = alle)', l_weather: 'Wetter', l_waste: 'Müllsensoren (leer = automatisch, Afvalbeheer)',
    l_mail: 'Postzähler', l_mail_reset: 'Reset-Taste oder Skript (nur wenn der Postzähler kein counter oder input_number ist)', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Begrüßungskarte ohne Hintergrund: Uhrzeit, Begrüßung, Personen, Wetter, Müll und Post.',
  },
  es: {
    morning: 'Buenos días', afternoon: 'Buenas tardes', evening: 'Buenas tardes', night: 'Buenas noches',
    today: 'Hoy', tonight: 'Sacar esta noche', tomorrow: 'Mañana', in_days: 'En {n} días',
    letter: '1 carta', letters: '{n} cartas', no_mail: 'Sin correo', last: 'Última a las {t}', reset: 'Poner a 0', close: 'Cerrar',
    l_name: 'Nombre en el saludo (opcional)', l_persons: 'Personas (vacío = todos)', l_weather: 'Tiempo', l_waste: 'Sensores de basura (vacío = automático, Afvalbeheer)',
    l_mail: 'Contador de correo', l_mail_reset: 'Botón o script para reiniciar (solo si no es un counter o input_number)', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Tarjeta de bienvenida sin fondo: hora, saludo, personas, tiempo, basura y correo.',
  },
  it: {
    morning: 'Buongiorno', afternoon: 'Buon pomeriggio', evening: 'Buonasera', night: 'Buonanotte',
    today: 'Oggi', tonight: 'Fuori stasera', tomorrow: 'Domani', in_days: 'Tra {n} giorni',
    letter: '1 lettera', letters: '{n} lettere', no_mail: 'Nessuna posta', last: 'Ultima alle {t}', reset: 'Azzera', close: 'Chiudi',
    l_name: 'Nome nel saluto (opzionale)', l_persons: 'Persone (vuoto = tutti)', l_weather: 'Meteo', l_waste: 'Sensori rifiuti (vuoto = automatico, Afvalbeheer)',
    l_mail: 'Contatore posta', l_mail_reset: 'Pulsante o script di azzeramento (solo se non è un counter o input_number)', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
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

const GWC_PALETTE = ['143, 227, 184', '185, 168, 255', '142, 197, 255', '255, 184, 153', '255, 224, 138', '255, 159, 191'];
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
  .pill.home .w { opacity: 1; color: ${GWC_INK('--c')}; }
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
    return { label, c: hit ? hit.c : '201, 196, 221' };
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
    let row = this._persons().map((e, i) => {
      const s = st[e];
      const home = s.state === 'home';
      const c = GWC_PALETTE[i % GWC_PALETTE.length];
      const name = s.attributes.friendly_name || e;
      const where = s.state === 'unknown' || s.state === 'unavailable' ? '–' : this._fmtState(s);
      return `<div class="pill${home ? ' home' : ''}" data-e="${gwcEsc(e)}" style="--c:${c}"><span class="dot"></span><span class="n">${gwcEsc(name)}</span><span class="w">${gwcEsc(where)}</span></div>`;
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
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    else this._render();
  }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = gwcLang(this._hass, this._config.language);
    const t = (k) => gwcT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gwcT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length)) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      { name: 'name', selector: { text: {} } },
      { name: 'persons', selector: { entity: { domain: 'person', multiple: true } } },
      { name: 'weather', selector: { entity: { domain: 'weather' } } },
      { name: 'waste', selector: { entity: { domain: 'sensor', multiple: true } } },
      { name: 'mail', selector: { entity: { domain: ['counter', 'input_number', 'sensor'] } } },
      { name: 'mail_reset', selector: { entity: { domain: ['button', 'input_button', 'script', 'automation', 'counter'] } } },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GWC_LANG_NAMES).map((k) => ({ value: k, label: GWC_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, language: 'auto', ...this._config };
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

}

console.info('%c GLOW-CARDS %c v1.6.0 ', 'color:#1C1730;background:#FFE08A;font-weight:700;border-radius:4px 0 0 4px;padding:2px 4px', 'color:#FFE08A;background:#1C1730;font-weight:700;border-radius:0 4px 4px 0;padding:2px 4px');
