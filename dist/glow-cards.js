/*! Glow Cards v1.14.1 – https://github.com/stijnleroy/glow-cards – MIT */

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
      // zon/maan maar één keer: in het meest linkse raam
      const orbIdx = 0;
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
  .dot.pulse { animation: gnc-pulse 1.1s ease-in-out infinite; }
  @keyframes gnc-pulse { 50% { transform: scale(1.5); box-shadow: 0 0 16px rgba(var(--b), 1); } }
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

const GNC_DEFAULTS = { max_items: 6, labels: 'always', style: 'floating', glow: 15, spacer: true };
// sleutels die niets over de balk zelf zeggen
const GNC_LAYOUT_KEYS = ['type', 'grid_options', 'view_layout', 'layout_options', 'visibility'];

// de dashboardconfiguratie maar één keer ophalen, ook als er veel navigatiebalken zijn
function gncDashConfig(hass, dash) {
  const cache = (window.__glowNavbarDash = window.__glowNavbarDash || {});
  const hit = cache[dash];
  if (hit && Date.now() - hit.t < 10000) return hit.p;
  const p = hass.callWS({ type: 'lovelace/config', url_path: dash === 'lovelace' ? null : dash });
  cache[dash] = { t: Date.now(), p };
  return p;
}

// de eerste navigatiebalk met eigen instellingen zoeken (ook in secties en stapels)
function gncFindMaster(cfg) {
  let found = null;
  const walk = (node) => {
    if (found || !node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node.type === 'custom:glow-navbar-card' && Object.keys(node).some((k) => !GNC_LAYOUT_KEYS.includes(k))) { found = node; return; }
    ['views', 'sections', 'cards', 'card', 'badges'].forEach((k) => { if (node[k]) walk(node[k]); });
  };
  walk(cfg && cfg.views);
  return found;
}

// welke entiteiten en welk soort view: voor de automatische bolletjes
function gncViewInfo(v) {
  let json = '';
  try { json = JSON.stringify(v); } catch (e) { json = ''; }
  const ids = [...new Set(json.match(/\b(climate|alarm_control_panel|light|media_player|cover|lock)\.[a-z0-9_]+/g) || [])];
  const name = ((v.title || '') + ' ' + (v.path || '')).toLowerCase();
  const icon = String(v.icon || '').toLowerCase();
  return {
    ids,
    climate: /klimaat|climate|verwarm|thermo|heat|clima|klima|chauff|riscald|calefac/.test(name) || /thermo|radiator|heat/.test(icon),
    light: /verlicht|\blicht|\blights?\b|lamp|lumi|luce|luz|beleucht/.test(name) || /lightbulb|lamp|ceiling-light|led-strip/.test(icon),
    alarm: /beveilig|alarm|secur|sicher|segur|sicur/.test(name) || /security|shield|alarm/.test(icon),
    media: /media|\btv\b|muziek|music|musique|musik|musica/.test(name) || /speaker|television|music/.test(icon),
  };
}

const GNC_HEAT = '255, 150, 96';
const GNC_ALARM = '255, 118, 130';
const GNC_LIGHT = '255, 214, 120';

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
    this._raw = config || {};
    // een lege kaart neemt de instellingen over van de eerste ingestelde navigatiebalk in dit dashboard
    this._inherit = !Object.keys(this._raw).some((k) => !GNC_LAYOUT_KEYS.includes(k));
    this._config = { ...GNC_DEFAULTS, ...this._raw };
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
    gncDashConfig(this._hass, dash)
      .then((cfg) => {
        this._viewInfo = {};
        (cfg.views || []).forEach((v, i) => { this._viewInfo['/' + dash + '/' + (v.path || i)] = gncViewInfo(v); });
        if (this._inherit) {
          const master = gncFindMaster(cfg);
          if (master) {
            const { type, ...rest } = master;
            this._config = { ...GNC_DEFAULTS, ...rest };
            if (Array.isArray(rest.views) && rest.views.length) {
              this._views = rest.views.map((v, i) => ({ ...v, color: v.color || GNC_PALETTE[i % GNC_PALETTE.length], auto: this._viewInfo[String(v.path || '').replace(/\/$/, '')] }));
              return;
            }
          }
        }
        this._views = (cfg.views || [])
          .map((v, i) => ({ v, i }))
          .filter(({ v }) => !v.subview && v.visible !== false)
          .map(({ v, i }, n) => ({
            path: '/' + dash + '/' + (v.path || i),
            name: v.title || v.path || String(i + 1),
            icon: v.icon || 'mdi:view-dashboard',
            color: GNC_PALETTE[n % GNC_PALETTE.length],
            auto: gncViewInfo(v),
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

  // zonder ingesteld bolletje: automatisch volgens wat er in de view staat
  _autoBadge(v) {
    const a = v.auto;
    const st = this._hass.states;
    if (!a || v.badge === false) return null;
    const pick = (domain, byName) => {
      const own = a.ids.filter((e) => e.startsWith(domain + '.') && st[e]);
      return own.length ? own : byName ? Object.keys(st).filter((e) => e.startsWith(domain + '.')) : [];
    };
    const alarms = pick('alarm_control_panel', a.alarm);
    if (alarms.some((e) => st[e].state === 'triggered')) return { dot: true, color: GNC_ALARM, pulse: true };
    if (a.alarm && alarms.some((e) => /^armed/.test(st[e].state))) return { dot: true, color: GNC_ALARM };
    const heat = pick('climate', a.climate).filter((e) => st[e].attributes.hvac_action === 'heating' || (st[e].attributes.hvac_action === undefined && st[e].state === 'heat'));
    if (heat.length) return { dot: true, color: GNC_HEAT };
    if (a.light) {
      const n = pick('light', true).filter((e) => st[e].state === 'on' && !Array.isArray(st[e].attributes.entity_id) && !st[e].attributes.is_hue_group).length;
      if (n) return { num: String(n), color: GNC_LIGHT };
    }
    if (a.media && pick('media_player', true).some((e) => st[e].state === 'playing')) return { dot: true, color: gncRgb(v.color) };
    return null;
  }

  _badge(v) {
    const b = v.badge;
    if (!this._hass) return null;
    if (!b) return this._autoBadge(v);
    const st = this._hass.states;
    const color = gncRgb(b.color || v.color);
    if (b === true || b.type === 'auto') return this._autoBadge(v);
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
      const badge = b ? (b.dot ? `<span class="dot${b.pulse ? ' pulse' : ''}" style="--b:${b.color}"></span>` : `<span class="num" style="--b:${b.color}">${gncEsc(b.num)}</span>`) : '';
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

}

/* ---- security.js ---- */
{
/*
 * Glow Security Card
 * Een grote beveiligingskaart voor Alarmo (of een ander alarmpaneel): altijd een
 * klavier, grote standknoppen, de openingen en de camera's die je zelf kiest.
 */

const GSEC_I18N = {
  nl: {
    title: 'Beveiliging', disarmed: 'Uitgeschakeld', armed_home: 'Ingeschakeld · thuis', armed_away: 'Ingeschakeld · afwezig', armed_night: 'Ingeschakeld · nacht', armed_vacation: 'Ingeschakeld · vakantie', armed_custom_bypass: 'Ingeschakeld · aangepast',
    arming: 'Inschakelen… {m}', arming_s: 'Inschakelen… {m} over {s} s', pending: 'Ingangsvertraging, typ je code', pending_s: 'Ingangsvertraging, typ je code ({s} s)', triggered: 'Alarm!', unavailable: 'Niet beschikbaar',
    m_disarmed: 'Uit', m_armed_home: 'Thuis', m_armed_night: 'Nacht', m_armed_away: 'Afwezig', m_armed_vacation: 'Vakantie', m_armed_custom_bypass: 'Aangepast',
    d_disarmed: 'Uitschakelen', d_armed_home: 'Buitenkant bewaakt', d_armed_night: 'Voor de nacht', d_armed_away: 'Alles bewaakt', d_armed_vacation: 'Lang weg', d_armed_custom_bypass: 'Eigen keuze',
    active: 'Actief', busy: 'Bezig…', since: 'Sinds {t}', hint: 'Typ je code en kies een stand', hint_ready: 'Kies een stand', hint_code: 'Typ eerst je code', wrong: 'Dat lukte niet. Klopt de code?',
    openings: 'Openingen', cameras: 'Camera\'s', all_closed: 'Alles dicht', n_open: '{n} open', open: 'Open', closed: 'Dicht', locked: 'Op slot', unlocked: 'Niet op slot', motion: 'Beweging', motion_now: 'Beweging nu',
    ago: '{t} geleden', just_now: 'Zojuist', min: '{n} min', hours: '{n} u', yesterday: 'Gisteren', live: 'LIVE',
    err: 'Vul "entity" in met een alarmpaneel (bv. Alarmo).',
    l_entity: 'Alarm (bv. Alarmo)', l_openings: 'Openingen', l_cameras: 'Camera\'s', l_modes: 'Standen', l_live: 'Live beeld (anders om de paar seconden een foto)', l_refresh: 'Foto vernieuwen om de (seconden)', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)', descriptions: 'Uitleg per stand',
    description: 'Grote beveiligingskaart voor Alarmo: klavier, standen, openingen en camera\'s.',
  },
  en: {
    title: 'Security', disarmed: 'Disarmed', armed_home: 'Armed · home', armed_away: 'Armed · away', armed_night: 'Armed · night', armed_vacation: 'Armed · vacation', armed_custom_bypass: 'Armed · custom',
    arming: 'Arming… {m}', arming_s: 'Arming… {m} in {s} s', pending: 'Entry delay, enter your code', pending_s: 'Entry delay, enter your code ({s} s)', triggered: 'Alarm!', unavailable: 'Unavailable',
    m_disarmed: 'Off', m_armed_home: 'Home', m_armed_night: 'Night', m_armed_away: 'Away', m_armed_vacation: 'Vacation', m_armed_custom_bypass: 'Custom',
    d_disarmed: 'Disarm', d_armed_home: 'Perimeter guarded', d_armed_night: 'For the night', d_armed_away: 'Everything guarded', d_armed_vacation: 'Away for long', d_armed_custom_bypass: 'Your choice',
    active: 'Active', busy: 'Working…', since: 'Since {t}', hint: 'Enter your code and pick a mode', hint_ready: 'Pick a mode', hint_code: 'Enter your code first', wrong: 'That did not work. Is the code right?',
    openings: 'Openings', cameras: 'Cameras', all_closed: 'All closed', n_open: '{n} open', open: 'Open', closed: 'Closed', locked: 'Locked', unlocked: 'Unlocked', motion: 'Motion', motion_now: 'Motion now',
    ago: '{t} ago', just_now: 'Just now', min: '{n} min', hours: '{n} h', yesterday: 'Yesterday', live: 'LIVE',
    err: 'Fill in "entity" with an alarm panel (e.g. Alarmo).',
    l_entity: 'Alarm (e.g. Alarmo)', l_openings: 'Openings', l_cameras: 'Cameras', l_modes: 'Modes', l_live: 'Live video (otherwise a snapshot every few seconds)', l_refresh: 'Refresh snapshot every (seconds)', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)', descriptions: 'Text per mode',
    description: 'Large security card for Alarmo: keypad, modes, openings and cameras.',
  },
  fr: {
    title: 'Sécurité', disarmed: 'Désactivée', armed_home: 'Activée · maison', armed_away: 'Activée · absent', armed_night: 'Activée · nuit', armed_vacation: 'Activée · vacances', armed_custom_bypass: 'Activée · personnalisé',
    arming: 'Activation… {m}', arming_s: 'Activation… {m} dans {s} s', pending: 'Délai d\'entrée, tapez votre code', pending_s: 'Délai d\'entrée, tapez votre code ({s} s)', triggered: 'Alarme !', unavailable: 'Indisponible',
    m_disarmed: 'Arrêt', m_armed_home: 'Maison', m_armed_night: 'Nuit', m_armed_away: 'Absent', m_armed_vacation: 'Vacances', m_armed_custom_bypass: 'Perso',
    d_disarmed: 'Désactiver', d_armed_home: 'Extérieur surveillé', d_armed_night: 'Pour la nuit', d_armed_away: 'Tout surveillé', d_armed_vacation: 'Longue absence', d_armed_custom_bypass: 'Votre choix',
    active: 'Actif', busy: 'En cours…', since: 'Depuis {t}', hint: 'Tapez votre code et choisissez un mode', hint_ready: 'Choisissez un mode', hint_code: 'Tapez d\'abord votre code', wrong: 'Échec. Le code est-il correct ?',
    openings: 'Ouvertures', cameras: 'Caméras', all_closed: 'Tout est fermé', n_open: '{n} ouvert(s)', open: 'Ouvert', closed: 'Fermé', locked: 'Verrouillé', unlocked: 'Déverrouillé', motion: 'Mouvement', motion_now: 'Mouvement',
    ago: 'il y a {t}', just_now: 'À l\'instant', min: '{n} min', hours: '{n} h', yesterday: 'Hier', live: 'LIVE',
    err: 'Renseignez "entity" avec un panneau d\'alarme (p. ex. Alarmo).',
    l_entity: 'Alarme (p. ex. Alarmo)', l_openings: 'Ouvertures', l_cameras: 'Caméras', l_modes: 'Modes', l_live: 'Vidéo en direct (sinon une image toutes les quelques secondes)', l_refresh: 'Rafraîchir l\'image toutes les (secondes)', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)', descriptions: 'Texte par mode',
    description: 'Grande carte de sécurité pour Alarmo : clavier, modes, ouvertures et caméras.',
  },
  de: {
    title: 'Sicherheit', disarmed: 'Unscharf', armed_home: 'Scharf · zuhause', armed_away: 'Scharf · abwesend', armed_night: 'Scharf · Nacht', armed_vacation: 'Scharf · Urlaub', armed_custom_bypass: 'Scharf · benutzerdefiniert',
    arming: 'Wird scharf geschaltet… {m}', arming_s: 'Scharf… {m} in {s} s', pending: 'Eingangsverzögerung, Code eingeben', pending_s: 'Eingangsverzögerung, Code eingeben ({s} s)', triggered: 'Alarm!', unavailable: 'Nicht verfügbar',
    m_disarmed: 'Aus', m_armed_home: 'Zuhause', m_armed_night: 'Nacht', m_armed_away: 'Abwesend', m_armed_vacation: 'Urlaub', m_armed_custom_bypass: 'Eigene',
    d_disarmed: 'Unscharf schalten', d_armed_home: 'Außenhaut gesichert', d_armed_night: 'Für die Nacht', d_armed_away: 'Alles gesichert', d_armed_vacation: 'Lange weg', d_armed_custom_bypass: 'Eigene Wahl',
    active: 'Aktiv', busy: 'Läuft…', since: 'Seit {t}', hint: 'Code eingeben und Modus wählen', hint_ready: 'Modus wählen', hint_code: 'Zuerst den Code eingeben', wrong: 'Hat nicht geklappt. Stimmt der Code?',
    openings: 'Öffnungen', cameras: 'Kameras', all_closed: 'Alles zu', n_open: '{n} offen', open: 'Offen', closed: 'Zu', locked: 'Verriegelt', unlocked: 'Entriegelt', motion: 'Bewegung', motion_now: 'Bewegung jetzt',
    ago: 'vor {t}', just_now: 'Gerade eben', min: '{n} Min.', hours: '{n} Std.', yesterday: 'Gestern', live: 'LIVE',
    err: 'Gib unter "entity" ein Alarmpanel an (z. B. Alarmo).',
    l_entity: 'Alarm (z. B. Alarmo)', l_openings: 'Öffnungen', l_cameras: 'Kameras', l_modes: 'Modi', l_live: 'Livebild (sonst alle paar Sekunden ein Foto)', l_refresh: 'Foto erneuern alle (Sekunden)', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)', descriptions: 'Text pro Modus',
    description: 'Große Sicherheitskarte für Alarmo: Tastenfeld, Modi, Öffnungen und Kameras.',
  },
  es: {
    title: 'Seguridad', disarmed: 'Desactivada', armed_home: 'Activada · en casa', armed_away: 'Activada · fuera', armed_night: 'Activada · noche', armed_vacation: 'Activada · vacaciones', armed_custom_bypass: 'Activada · personalizada',
    arming: 'Activando… {m}', arming_s: 'Activando… {m} en {s} s', pending: 'Retardo de entrada, introduce tu código', pending_s: 'Retardo de entrada, introduce tu código ({s} s)', triggered: '¡Alarma!', unavailable: 'No disponible',
    m_disarmed: 'Apagada', m_armed_home: 'En casa', m_armed_night: 'Noche', m_armed_away: 'Fuera', m_armed_vacation: 'Vacaciones', m_armed_custom_bypass: 'Propia',
    d_disarmed: 'Desactivar', d_armed_home: 'Exterior vigilado', d_armed_night: 'Para la noche', d_armed_away: 'Todo vigilado', d_armed_vacation: 'Ausencia larga', d_armed_custom_bypass: 'A tu elección',
    active: 'Activa', busy: 'En curso…', since: 'Desde las {t}', hint: 'Introduce tu código y elige un modo', hint_ready: 'Elige un modo', hint_code: 'Primero introduce tu código', wrong: 'No ha funcionado. ¿Es correcto el código?',
    openings: 'Aberturas', cameras: 'Cámaras', all_closed: 'Todo cerrado', n_open: '{n} abiertas', open: 'Abierta', closed: 'Cerrada', locked: 'Cerrada con llave', unlocked: 'Sin llave', motion: 'Movimiento', motion_now: 'Movimiento ahora',
    ago: 'hace {t}', just_now: 'Ahora mismo', min: '{n} min', hours: '{n} h', yesterday: 'Ayer', live: 'EN VIVO',
    err: 'Indica en "entity" un panel de alarma (p. ej. Alarmo).',
    l_entity: 'Alarma (p. ej. Alarmo)', l_openings: 'Aberturas', l_cameras: 'Cámaras', l_modes: 'Modos', l_live: 'Vídeo en directo (si no, una foto cada pocos segundos)', l_refresh: 'Actualizar foto cada (segundos)', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)', descriptions: 'Texto por modo',
    description: 'Tarjeta de seguridad grande para Alarmo: teclado, modos, aberturas y cámaras.',
  },
  it: {
    title: 'Sicurezza', disarmed: 'Disattivato', armed_home: 'Attivo · in casa', armed_away: 'Attivo · fuori', armed_night: 'Attivo · notte', armed_vacation: 'Attivo · vacanza', armed_custom_bypass: 'Attivo · personalizzato',
    arming: 'Attivazione… {m}', arming_s: 'Attivazione… {m} tra {s} s', pending: 'Ritardo d\'ingresso, inserisci il codice', pending_s: 'Ritardo d\'ingresso, inserisci il codice ({s} s)', triggered: 'Allarme!', unavailable: 'Non disponibile',
    m_disarmed: 'Spento', m_armed_home: 'In casa', m_armed_night: 'Notte', m_armed_away: 'Fuori', m_armed_vacation: 'Vacanza', m_armed_custom_bypass: 'Personale',
    d_disarmed: 'Disattiva', d_armed_home: 'Perimetro sorvegliato', d_armed_night: 'Per la notte', d_armed_away: 'Tutto sorvegliato', d_armed_vacation: 'Assenza lunga', d_armed_custom_bypass: 'A tua scelta',
    active: 'Attivo', busy: 'In corso…', since: 'Dalle {t}', hint: 'Inserisci il codice e scegli una modalità', hint_ready: 'Scegli una modalità', hint_code: 'Prima inserisci il codice', wrong: 'Non è riuscito. Il codice è giusto?',
    openings: 'Aperture', cameras: 'Telecamere', all_closed: 'Tutto chiuso', n_open: '{n} aperte', open: 'Aperta', closed: 'Chiusa', locked: 'Bloccata', unlocked: 'Sbloccata', motion: 'Movimento', motion_now: 'Movimento ora',
    ago: '{t} fa', just_now: 'Adesso', min: '{n} min', hours: '{n} h', yesterday: 'Ieri', live: 'LIVE',
    err: 'Indica in "entity" un pannello d\'allarme (es. Alarmo).',
    l_entity: 'Allarme (es. Alarmo)', l_openings: 'Aperture', l_cameras: 'Telecamere', l_modes: 'Modalità', l_live: 'Video dal vivo (altrimenti una foto ogni pochi secondi)', l_refresh: 'Aggiorna la foto ogni (secondi)', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)', descriptions: 'Testo per modalità',
    description: 'Grande scheda di sicurezza per Alarmo: tastierino, modalità, aperture e telecamere.',
  },
};
const GSEC_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };

function gsecLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GSEC_I18N[l] ? l : 'en';
}
function gsecT(lang, key, vars) {
  let s = (GSEC_I18N[lang] && GSEC_I18N[lang][key]) || GSEC_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gsecEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

// standen in volgorde, met de functie-bit van het alarmpaneel en de dienst
const GSEC_MODES = [
  { k: 'disarmed', bit: 0, svc: 'alarm_disarm', c: '143, 227, 184' },
  { k: 'armed_home', bit: 1, svc: 'alarm_arm_home', c: '142, 197, 255' },
  { k: 'armed_night', bit: 4, svc: 'alarm_arm_night', c: '185, 168, 255' },
  { k: 'armed_away', bit: 2, svc: 'alarm_arm_away', c: '255, 184, 153' },
  { k: 'armed_vacation', bit: 32, svc: 'alarm_arm_vacation', c: '255, 224, 138' },
  { k: 'armed_custom_bypass', bit: 16, svc: 'alarm_arm_custom_bypass', c: '142, 227, 214' },
];
const GSEC_BUSY = '255, 224, 138';
const GSEC_ALARM = '255, 128, 140';
const GSEC_OPEN = '255, 184, 153';
const GSEC_SHUT = '143, 227, 184';
const GSEC_MOTION = '255, 159, 191';

const GSEC_SHIELD = (inner) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/>${inner}</svg>`;
const GSEC_CHECK = '<path d="M9 12l2 2 4-4"/>';
const GSEC_BANG = '<path d="M12 8v4M12 15.5h.01"/>';
const GSEC_CAM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="3"/><path d="M16 10l5-3v10l-5-3"/></svg>';

const GSEC_INK = (v) => `color-mix(in srgb, rgb(var(${v})), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%))`;
const GSEC_LINE = 'var(--glow-border, rgba(255, 255, 255, 0.1))';

const GSEC_STYLE = `
  :host { display: block; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: column; gap: 22px; padding: 22px;
    border-radius: var(--ha-card-border-radius, 24px); container-type: inline-size;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.3); box-shadow: 0 0 calc(var(--glow) * 0.5) rgba(var(--c), 0.15);
    transition: border-color 0.4s, box-shadow 0.4s; user-select: none; -webkit-user-select: none;
  }
  ha-card.armed { border-color: rgba(var(--c), 0.55); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); }
  ha-card.alarm { border-color: rgba(var(--c), 0.8); box-shadow: 0 0 calc(var(--glow) * 2) rgba(var(--c), 0.6); }
  .halo { position: absolute; right: -80px; top: -100px; width: 300px; height: 300px; border-radius: 50%; filter: blur(70px); background: rgb(var(--c)); opacity: 0.15; transition: background 0.4s, opacity 0.4s; pointer-events: none; }
  ha-card.armed .halo { opacity: 0.3; }
  ha-card.alarm .halo { opacity: 0.45; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }

  .head { position: relative; display: flex; align-items: center; gap: 18px; }
  .shield { width: 72px; height: 72px; border-radius: 36px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.8); transition: background 0.4s, box-shadow 0.4s; cursor: pointer; }
  .shield svg { width: 38px; height: 38px; }
  .ht { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
  .ht .t { font-size: 26px; font-weight: 800; line-height: 1.1; }
  .ht .s { font-size: 17px; font-weight: 800; color: ${GSEC_INK('--c')}; }
  .since { font-size: 14px; font-weight: 700; opacity: 0.65; white-space: nowrap; }

  .ctl { position: relative; display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 18px; }
  .pad { display: flex; flex-direction: column; gap: 16px; padding: 18px; border-radius: 22px; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .dots { display: flex; gap: 12px; height: 16px; align-items: center; justify-content: center; }
  .dots span { width: 14px; height: 14px; border-radius: 7px; background: ${GSEC_LINE}; transition: background 0.2s, box-shadow 0.2s; }
  .dots span.on { background: rgb(var(--c)); box-shadow: 0 0 8px rgba(var(--c), 0.9); }
  .dots.wrong span { background: rgba(${GSEC_ALARM}, 0.55); }
  .keys { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
  .key { height: 64px; border-radius: 20px; font-size: 26px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GSEC_LINE}; }
  .key.fn { font-size: 20px; opacity: 0.65; }
  .key:active { background: rgba(var(--c), 0.25); }
  .modes { display: flex; flex-direction: column; gap: 10px; }
  .hint { font-size: 14px; font-weight: 700; min-height: 20px; opacity: 0.65; }
  .hint.bad { opacity: 1; color: ${GSEC_INK('--bad')}; }
  .mode { height: 62px; padding: 0 18px; border-radius: 20px; display: flex; align-items: center; gap: 12px; border: 1px solid ${GSEC_LINE}; background: var(--glow-surface, rgba(255,255,255,0.07)); transition: background 0.3s, border-color 0.3s, box-shadow 0.3s, opacity 0.3s; opacity: 0.75; }
  .modes.ready .mode { opacity: 1; }
  .mode .dot { width: 14px; height: 14px; border-radius: 7px; flex-shrink: 0; box-sizing: border-box; border: 2px solid rgba(var(--m), 0.7); }
  .mode .n { flex: 1; text-align: left; font-size: 18px; font-weight: 800; }
  .mode .d { font-size: 13px; font-weight: 700; opacity: 0.65; white-space: nowrap; }
  .mode.on { opacity: 1; border-color: rgba(var(--m), 0.6); background: rgba(var(--m), 0.16); box-shadow: 0 0 var(--glow) rgba(var(--m), 0.35); }
  .mode.on .dot { border: 0; background: rgb(var(--m)); box-shadow: 0 0 10px rgba(var(--m), 0.9); }
  .mode.on .d { opacity: 1; color: ${GSEC_INK('--m')}; }
  .mode:active { transform: scale(0.98); }

  .sec { position: relative; display: flex; flex-direction: column; gap: 10px; }
  .sh { display: flex; justify-content: space-between; align-items: baseline; }
  .lab { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .cnt { font-size: 13px; font-weight: 800; color: ${GSEC_INK('--k')}; }
  .doors { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
  .door { display: flex; align-items: center; gap: 9px; height: 46px; padding: 0 14px 0 12px; border-radius: 16px; box-sizing: border-box; min-width: 0; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid transparent; cursor: pointer; }
  .door .dot { width: 10px; height: 10px; border-radius: 5px; flex-shrink: 0; background: rgba(${GSEC_SHUT}, 0.85); }
  .door .n { flex: 1; min-width: 0; font-size: 15px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .door .v { font-size: 13px; font-weight: 700; opacity: 0.65; white-space: nowrap; }
  .door.open { background: rgba(${GSEC_OPEN}, 0.16); border-color: rgba(${GSEC_OPEN}, 0.55); box-shadow: 0 0 var(--glow) rgba(${GSEC_OPEN}, 0.3); --o: ${GSEC_OPEN}; }
  .door.open .dot { background: rgb(${GSEC_OPEN}); box-shadow: 0 0 8px rgba(${GSEC_OPEN}, 0.9); }
  .door.open .v { opacity: 1; color: ${GSEC_INK('--o')}; }
  .door.na { opacity: 0.45; }
  .door.na .dot { background: ${GSEC_LINE}; }

  .cams { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .cam { position: relative; aspect-ratio: 16 / 9; border-radius: 20px; overflow: hidden; background: #0F0D18; border: 1px solid transparent; cursor: pointer; transition: border-color 0.3s, box-shadow 0.3s; }
  .cam img, .cam ha-camera-stream { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
  .cam ha-camera-stream { --video-max-height: 100%; }
  .cam .ph { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: rgba(243, 241, 250, 0.3); }
  .cam .ph svg { width: 36px; height: 36px; }
  .cam .shade { position: absolute; inset: 0; background: linear-gradient(transparent 50%, rgba(8, 6, 16, 0.78)); pointer-events: none; }
  .cam .live { position: absolute; top: 10px; right: 12px; display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 800; letter-spacing: 0.06em; color: #F3F1FA; opacity: 0.85; }
  .cam .live i { width: 7px; height: 7px; border-radius: 4px; background: #FF8F8F; }
  .cam .badge { position: absolute; top: 10px; left: 10px; display: none; align-items: center; gap: 6px; height: 26px; padding: 0 11px; border-radius: 13px; font-size: 12px; font-weight: 800; color: #1C1730; background: rgb(${GSEC_MOTION}); box-shadow: 0 0 10px rgba(${GSEC_MOTION}, 0.8); }
  .cam .badge i { width: 6px; height: 6px; border-radius: 3px; background: #1C1730; }
  .cam .foot { position: absolute; left: 14px; right: 14px; bottom: 12px; display: flex; justify-content: space-between; align-items: baseline; gap: 8px; color: #F3F1FA; pointer-events: none; }
  .cam .foot .n { font-size: 16px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cam .foot .w { font-size: 13px; font-weight: 700; opacity: 0.75; white-space: nowrap; }
  .cam.motion { border-color: rgba(${GSEC_MOTION}, 0.6); box-shadow: 0 0 var(--glow) rgba(${GSEC_MOTION}, 0.35); }
  .cam.motion .badge { display: flex; }

  @container (max-width: 640px) {
    .ctl { grid-template-columns: minmax(0, 1fr); }
    .doors { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @container (max-width: 420px) {
    .cams { grid-template-columns: minmax(0, 1fr); }
    .since { display: none; }
  }
`;

class GlowSecurityCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._built = false;
    this._code = '';
  }

  static getConfigElement() { return document.createElement('glow-security-card-editor'); }

  static getStubConfig(hass) {
    const ids = Object.keys((hass && hass.states) || {});
    const alarm = ids.find((e) => e.startsWith('alarm_control_panel.') && /alarmo/i.test(e)) || ids.find((e) => e.startsWith('alarm_control_panel.'));
    return { entity: alarm || '' };
  }

  setConfig(config) {
    if (!config || !config.entity) throw new Error(gsecT(gsecLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, live: false, refresh: 10, ...config };
    this._built = false;
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._config) this._render();
  }
  get hass() { return this._hass; }

  getCardSize() { return 12; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }

  connectedCallback() {
    // elke seconde: aftellen bij in- of uitloopvertraging, en de camerafoto's vernieuwen
    clearInterval(this._tick);
    this._tick = setInterval(() => this._onTick(), 1000);
  }

  disconnectedCallback() {
    clearInterval(this._tick);
    clearTimeout(this._codeTimer);
  }

  _lang() { return gsecLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gsecT(this._lang(), k, v); }
  _locale() { return (this._hass && this._hass.locale && this._hass.locale.language) || this._lang(); }

  _fmtTime(d) {
    try { return d.toLocaleTimeString(this._locale(), { hour: '2-digit', minute: '2-digit' }); } catch (e) { return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
  }

  _ago(iso) {
    const t = Date.parse(iso);
    if (!t) return '';
    const s = (Date.now() - t) / 1000;
    if (s < 60) return this._t('just_now');
    if (s < 3600) return this._t('ago', { t: this._t('min', { n: Math.floor(s / 60) }) });
    if (s < 86400) return this._t('ago', { t: this._t('hours', { n: Math.floor(s / 3600) }) });
    if (s < 172800) return this._t('yesterday');
    try { return new Date(t).toLocaleDateString(this._locale(), { day: 'numeric', month: 'short' }); } catch (e) { return ''; }
  }

  /* ---- gegevens ---- */

  _alarm() { return this._hass.states[this._config.entity]; }

  _modes() {
    const s = this._alarm();
    const f = (s && s.attributes.supported_features) || 0;
    const wanted = Array.isArray(this._config.modes) && this._config.modes.length ? this._config.modes : ['disarmed', 'armed_home', 'armed_night', 'armed_away'];
    return GSEC_MODES.filter((m) => wanted.includes(m.k) && (m.bit === 0 || !f || f & m.bit));
  }

  _modeColor(k) { const m = GSEC_MODES.find((x) => x.k === k); return m ? m.c : GSEC_BUSY; }

  _openings() {
    const st = this._hass.states;
    if (Array.isArray(this._config.openings) && this._config.openings.length) return this._config.openings.filter((e) => st[e]);
    return Object.keys(st).filter((e) => e.startsWith('binary_sensor.') && ['door', 'window', 'garage_door', 'opening'].includes(st[e].attributes.device_class))
      .sort((a, b) => (st[a].attributes.friendly_name || a).localeCompare(st[b].attributes.friendly_name || b));
  }

  _openState(s, id) {
    const d = String(s.entity_id || id || '').split('.')[0];
    if (s.state === 'unavailable' || s.state === 'unknown') return { open: false, na: true, label: '–' };
    if (d === 'lock') return { open: s.state !== 'locked', label: this._t(s.state === 'locked' ? 'locked' : 'unlocked') };
    if (d === 'cover') { const o = s.state !== 'closed'; return { open: o, label: this._t(o ? 'open' : 'closed') }; }
    if (s.attributes.device_class === 'motion' || s.attributes.device_class === 'occupancy' || s.attributes.device_class === 'presence') {
      return { open: s.state === 'on', label: s.state === 'on' ? this._t('motion') : this._ago(s.last_changed) };
    }
    const o = s.state === 'on' || s.state === 'open';
    return { open: o, label: this._t(o ? 'open' : 'closed') };
  }

  // camera's: tekst ("camera.oprit") of { entity, name, motion }
  _cameras() {
    const st = this._hass.states;
    const list = Array.isArray(this._config.cameras) ? this._config.cameras : [];
    return list.map((c) => (typeof c === 'string' ? { entity: c } : c)).filter((c) => c && st[c.entity]).map((c) => ({ ...c, motion: c.motion || this._findMotion(c.entity) }));
  }

  // bewegingssensor van hetzelfde toestel (bv. Reolink: binary_sensor.oprit_motion / _person)
  _findMotion(cam) {
    const ents = this._hass.entities;
    const st = this._hass.states;
    const dev = ents && ents[cam] && ents[cam].device_id;
    if (!dev) return null;
    const mine = Object.values(ents).filter((e) => e.device_id === dev && e.entity_id.startsWith('binary_sensor.') && st[e.entity_id]);
    const pick = (re) => mine.find((e) => re.test(e.entity_id) || re.test(st[e.entity_id].attributes.device_class || ''));
    const hit = pick(/motion/) || pick(/person/) || pick(/occupancy|presence/);
    return hit ? hit.entity_id : null;
  }

  /* ---- opbouw ---- */

  _build() {
    this.shadowRoot.innerHTML = `
      <style>${GSEC_STYLE}</style>
      <ha-card>
        <div class="halo"></div>
        <div class="head">
          <div class="shield"></div>
          <div class="ht"><span class="t"></span><span class="s"></span></div>
          <span class="since"></span>
        </div>
        <div class="ctl">
          <div class="pad">
            <div class="dots"></div>
            <div class="keys">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '✕', '0', '⌫'].map((k) => `<button class="key${k === '✕' || k === '⌫' ? ' fn' : ''}" type="button" data-k="${k}">${k}</button>`).join('')}</div>
          </div>
          <div class="modes"><span class="hint"></span></div>
        </div>
        <div class="sec openings"><div class="sh"><span class="lab"></span><span class="cnt"></span></div><div class="doors"></div></div>
        <div class="sec cameras"><div class="sh"><span class="lab"></span></div><div class="cams"></div></div>
      </ha-card>`;
    const r = this.shadowRoot;
    this._card = r.querySelector('ha-card');
    r.querySelector('.shield').addEventListener('click', () => this._moreInfo(this._config.entity));
    r.querySelectorAll('.key').forEach((b) => b.addEventListener('click', () => this._press(b.dataset.k)));
    r.querySelector('.modes').addEventListener('click', (e) => {
      const b = e.target.closest('.mode');
      if (b) this._choose(b.dataset.k);
    });
    r.querySelector('.doors').addEventListener('click', (e) => {
      const d = e.target.closest('.door');
      if (d) this._moreInfo(d.dataset.e);
    });
    r.querySelector('.cams').addEventListener('click', (e) => {
      const c = e.target.closest('.cam');
      if (c) this._moreInfo(c.dataset.e);
    });
    this._keys = {};
    this._built = true;
    this._builtLang = this._lang();
  }

  _moreInfo(entity) {
    if (!entity) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: entity }, bubbles: true, composed: true }));
  }

  /* ---- klavier en standen ---- */

  _press(k) {
    if (k === '✕') this._code = '';
    else if (k === '⌫') this._code = this._code.slice(0, -1);
    else if (this._code.length < 12) this._code += k;
    this._error = null;
    // een half ingetypte code niet laten staan
    clearTimeout(this._codeTimer);
    this._codeTimer = setTimeout(() => { this._code = ''; this._renderPad(); }, 30000);
    this._renderPad();
  }

  _needsCode(k) {
    const a = this._alarm();
    if (!a || !a.attributes.code_format) return false;
    if (k === 'disarmed') return true;
    return a.attributes.code_arm_required !== false;
  }

  _choose(k) {
    const a = this._alarm();
    if (!a) return;
    const m = GSEC_MODES.find((x) => x.k === k);
    if (!m) return;
    if (a.state === k) return;
    if (this._needsCode(k) && !this._code) {
      this._error = 'hint_code';
      this._renderPad();
      clearTimeout(this._errTimer);
      this._errTimer = setTimeout(() => { this._error = null; this._renderPad(); }, 2000);
      return;
    }
    const data = { entity_id: this._config.entity };
    if (this._code) data.code = this._code;
    this._code = '';
    this._error = null;
    this._sentAt = Date.now();
    this._renderPad();
    Promise.resolve(this._hass.callService('alarm_control_panel', m.svc, data)).catch(() => {
      this._error = 'wrong';
      this._renderPad();
      clearTimeout(this._errTimer);
      this._errTimer = setTimeout(() => { this._error = null; this._renderPad(); }, 4000);
    });
  }

  _renderPad() {
    if (!this._built) return;
    const r = this.shadowRoot;
    const n = this._code.length;
    const dots = r.querySelector('.dots');
    dots.innerHTML = Array.from({ length: Math.max(4, n) }, (_, i) => `<span class="${i < n ? 'on' : ''}"></span>`).join('');
    dots.classList.toggle('wrong', !!this._error);
    const hint = r.querySelector('.hint');
    hint.textContent = this._t(this._error || (n ? 'hint_ready' : 'hint'));
    hint.classList.toggle('bad', !!this._error);
    hint.style.setProperty('--bad', GSEC_ALARM);
    r.querySelector('.modes').classList.toggle('ready', n > 0);
  }

  /* ---- tekenen ---- */

  _status(a) {
    const st = a.state;
    const attr = a.attributes;
    const left = () => {
      const d = +attr.delay || 0;
      if (!d) return 0;
      return Math.max(0, Math.ceil(d - (Date.now() - Date.parse(a.last_changed)) / 1000));
    };
    if (st === 'unavailable' || st === 'unknown') return { text: this._t('unavailable'), c: '201, 196, 221', armed: false };
    if (st === 'triggered') {
      const open = attr.open_sensors && typeof attr.open_sensors === 'object' ? Object.keys(attr.open_sensors) : [];
      const names = open.map((e) => (this._hass.states[e] && this._hass.states[e].attributes.friendly_name) || e).join(', ');
      return { text: this._t('triggered') + (names ? ' ' + names : ''), c: GSEC_ALARM, armed: true, alarm: true };
    }
    if (st === 'arming') {
      const mode = attr.arm_mode || attr.next_state;
      const name = mode ? this._t('m_' + mode).toLowerCase() : '';
      const s = left();
      return { text: s ? this._t('arming_s', { m: name, s }) : this._t('arming', { m: name }), c: GSEC_BUSY, armed: true, pending: mode };
    }
    if (st === 'pending') {
      const s = left();
      return { text: s ? this._t('pending_s', { s }) : this._t('pending'), c: GSEC_ALARM, armed: true, alarm: true };
    }
    return { text: this._t(st), c: this._modeColor(st), armed: st !== 'disarmed' };
  }

  _set(el, key, html) {
    if (this._keys[key] === html) return false;
    this._keys[key] = html;
    el.innerHTML = html;
    return true;
  }

  _onTick() {
    if (!this._hass || !this._built) return;
    const a = this._alarm();
    if (a && (a.state === 'arming' || a.state === 'pending')) this._renderHead();
    // camerafoto's om de zoveel seconden
    const every = Math.max(2, parseInt(this._config.refresh, 10) || 10) * 1000;
    if (!this._config.live && (!this._lastSnap || Date.now() - this._lastSnap >= every)) this._refreshSnaps();
    if (!this._lastAgo || Date.now() - this._lastAgo > 30000) { this._lastAgo = Date.now(); this._renderLists(); }
  }

  _renderHead() {
    const a = this._alarm();
    const r = this.shadowRoot;
    if (!a) return;
    const s = this._status(a);
    this._card.style.setProperty('--c', s.c);
    this._card.classList.toggle('armed', !!s.armed);
    this._card.classList.toggle('alarm', !!s.alarm);
    this._set(r.querySelector('.shield'), 'shield', GSEC_SHIELD(s.alarm ? GSEC_BANG : s.armed && !s.pending ? GSEC_CHECK : ''));
    r.querySelector('.ht .t').textContent = this._config.name || this._t('title');
    r.querySelector('.ht .s').textContent = s.text;
    r.querySelector('.since').textContent = a.last_changed ? this._t('since', { t: this._fmtTime(new Date(a.last_changed)) }) : '';

    // standknoppen
    const desc = this._config.descriptions || {};
    const html = this._modes().map((m) => {
      const on = a.state === m.k || s.pending === m.k;
      const d = on ? this._t(s.pending === m.k ? 'busy' : 'active') : (desc[m.k] !== undefined ? desc[m.k] : this._t('d_' + m.k));
      return `<button class="mode${on ? ' on' : ''}" type="button" data-k="${m.k}" style="--m:${m.c}"><span class="dot"></span><span class="n">${gsecEsc(this._t('m_' + m.k))}</span><span class="d">${gsecEsc(d)}</span></button>`;
    }).join('');
    const box = r.querySelector('.modes');
    if (this._keys.modes !== html) {
      this._keys.modes = html;
      box.querySelectorAll('.mode').forEach((b) => b.remove());
      box.insertAdjacentHTML('beforeend', html);
    }
  }

  _renderLists() {
    const r = this.shadowRoot;
    const st = this._hass.states;

    // openingen
    const ops = this._openings();
    const sec = r.querySelector('.openings');
    sec.style.display = ops.length ? '' : 'none';
    sec.querySelector('.lab').textContent = this._t('openings');
    let nOpen = 0;
    const doors = ops.map((e) => {
      const s = st[e];
      const o = this._openState(s, e);
      if (o.open) nOpen++;
      return `<div class="door${o.open ? ' open' : ''}${o.na ? ' na' : ''}" data-e="${gsecEsc(e)}"><span class="dot"></span><span class="n">${gsecEsc(s.attributes.friendly_name || e)}</span><span class="v">${gsecEsc(o.label)}</span></div>`;
    }).join('');
    this._set(sec.querySelector('.doors'), 'doors', doors);
    const cnt = sec.querySelector('.cnt');
    cnt.textContent = nOpen ? this._t('n_open', { n: nOpen }) : this._t('all_closed');
    cnt.style.setProperty('--k', nOpen ? GSEC_OPEN : GSEC_SHUT);

    // camera's: de tegels alleen opnieuw opbouwen als de lijst verandert
    const cams = this._cameras();
    const csec = r.querySelector('.cameras');
    csec.style.display = cams.length ? '' : 'none';
    csec.querySelector('.lab').textContent = this._t('cameras');
    const grid = csec.querySelector('.cams');
    const key = JSON.stringify([cams.map((c) => c.entity), !!this._config.live, this._lang()]);
    if (this._keys.cams !== key) {
      this._keys.cams = key;
      grid.innerHTML = cams.map((c) => `
        <div class="cam" data-e="${gsecEsc(c.entity)}">
          <div class="ph">${GSEC_CAM}</div>
          <div class="media"></div>
          <div class="shade"></div>
          <span class="live"><i></i>${gsecEsc(this._t('live'))}</span>
          <span class="badge"><i></i>${gsecEsc(this._t('motion'))}</span>
          <div class="foot"><span class="n"></span><span class="w"></span></div>
        </div>`).join('');
      this._lastSnap = 0;
      if (this._config.live) this._mountStreams();
    }
    cams.forEach((c) => {
      const el = grid.querySelector(`.cam[data-e="${CSS.escape(c.entity)}"]`);
      if (!el) return;
      const s = st[c.entity];
      el.querySelector('.n').textContent = c.name || s.attributes.friendly_name || c.entity;
      const m = c.motion && st[c.motion];
      const moving = !!(m && m.state === 'on');
      el.classList.toggle('motion', moving);
      el.querySelector('.w').textContent = !m ? '' : moving ? this._t('motion_now') : this._ago(m.last_changed);
      const live = el.querySelector('.live');
      live.style.display = s.state === 'unavailable' ? 'none' : '';
      if (this._config.live) {
        const stream = el.querySelector('ha-camera-stream');
        if (stream) { stream.hass = this._hass; stream.stateObj = s; }
      }
    });
    if (!this._config.live && !this._lastSnap) this._refreshSnaps();
  }

  // live beeld via het eigen camera-element van Home Assistant
  _mountStreams() {
    const r = this.shadowRoot;
    r.querySelectorAll('.cam').forEach((el) => {
      const s = this._hass.states[el.dataset.e];
      const media = el.querySelector('.media');
      if (!s || !customElements.get('ha-camera-stream')) { this._snapInto(el); return; }
      const v = document.createElement('ha-camera-stream');
      v.hass = this._hass;
      v.stateObj = s;
      v.muted = true;
      v.controls = false;
      v.allowExoPlayer = false;
      media.appendChild(v);
      el.querySelector('.ph').style.display = 'none';
    });
  }

  _refreshSnaps() {
    this._lastSnap = Date.now();
    this.shadowRoot.querySelectorAll('.cam').forEach((el) => this._snapInto(el));
  }

  // nieuwe foto eerst laden en pas dan wisselen, zodat het beeld niet flikkert
  _snapInto(el) {
    const s = this._hass.states[el.dataset.e];
    const pic = s && s.attributes.entity_picture;
    if (!pic || s.state === 'unavailable') return;
    const url = pic + (pic.includes('?') ? '&' : '?') + '_t=' + Date.now();
    const img = new Image();
    img.onload = () => {
      const media = el.querySelector('.media');
      media.innerHTML = '';
      img.alt = '';
      media.appendChild(img);
      el.querySelector('.ph').style.display = 'none';
    };
    img.src = url;
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    this._card.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');
    this._renderHead();
    this._renderPad();
    this._renderLists();
  }
}

/* ---------------- editor ---------------- */

class GlowSecurityCardEditor extends HTMLElement {
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
    const lang = gsecLang(this._hass, this._config.language);
    const t = (k) => gsecT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => (s.name.startsWith('desc_') ? gsecT(lang, 'm_' + s.name.slice(5)) : gsecT(lang, 'l_' + s.name));
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        // uitleg per stand samenvoegen tot "descriptions"
        const desc = {};
        Object.keys(v).filter((k) => k.startsWith('desc_')).forEach((k) => {
          if (v[k] !== undefined && v[k] !== null && v[k] !== '' && v[k] !== gsecT(lang, 'd_' + k.slice(5))) desc[k.slice(5)] = v[k];
          delete v[k];
        });
        if (Object.keys(desc).length) v.descriptions = desc; else delete v.descriptions;
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length)) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.live === false) delete v.live;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    const camEntities = (this._config.cameras || []).map((c) => (typeof c === 'string' ? c : c && c.entity)).filter(Boolean);
    const camsAreSimple = (this._config.cameras || []).every((c) => typeof c === 'string');
    const schema = [
      { name: 'entity', selector: { entity: { domain: 'alarm_control_panel' } } },
      { name: 'modes', selector: { select: { multiple: true, mode: 'list', options: GSEC_MODES.map((m) => ({ value: m.k, label: t('m_' + m.k) })) } } },
      { name: 'openings', selector: { entity: { domain: ['binary_sensor', 'cover', 'lock'], multiple: true } } },
    ];
    // camera's met eigen naam of bewegingssensor blijven in YAML
    if (camsAreSimple) schema.push({ name: 'cameras', selector: { entity: { domain: 'camera', multiple: true } } });
    schema.push(
      { type: 'grid', name: '', schema: [
        { name: 'live', selector: { boolean: {} } },
        { name: 'refresh', selector: { number: { min: 2, max: 120, step: 1, mode: 'box', unit_of_measurement: 's' } } },
      ] },
      { type: 'expandable', name: '', flatten: true, title: t('descriptions'), schema: GSEC_MODES.map((m) => ({ name: 'desc_' + m.k, selector: { text: {} } })) },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GSEC_LANG_NAMES).map((k) => ({ value: k, label: GSEC_LANG_NAMES[k] }))) } } },
    );
    this._form.schema = schema;
    const data = { glow: 15, refresh: 10, live: false, language: 'auto', modes: ['disarmed', 'armed_home', 'armed_night', 'armed_away'], ...this._config };
    if (camsAreSimple) data.cameras = camEntities;
    const desc = this._config.descriptions || {};
    GSEC_MODES.forEach((m) => { data['desc_' + m.k] = desc[m.k] !== undefined ? desc[m.k] : t('d_' + m.k); });
    delete data.descriptions;
    this._form.data = data;
  }
}

if (!customElements.get('glow-security-card')) customElements.define('glow-security-card', GlowSecurityCard);
if (!customElements.get('glow-security-card-editor')) customElements.define('glow-security-card-editor', GlowSecurityCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-security-card')) {
  window.customCards.push({
    type: 'glow-security-card',
    name: 'Glow Security Card',
    description: gsecT(gsecLang(null), 'description'),
    preview: false,
    documentationURL: 'https://github.com/stijnleroy/glow-cards',
  });
}

}

/* ---- fan.js ---- */
{
/*
 * Glow Fan Card
 * Een ventilatortegel in de Glow-stijl: tik = aan/uit, met timerknoppen
 * ("30 min aan") en een eigen tijd. Werkt met fan-, switch-, light- en input_boolean-entiteiten.
 */

const GFAN_I18N = {
  nl: {
    off: 'Uit', on: 'Aan', on_since: 'Aan sinds {t}', left: 'Aan · nog {t}', unavailable: 'Niet beschikbaar', other: 'Andere', on_for: 'Aan voor', start: 'Starten', stop: 'Stoppen', min: '{n} min', h: '{h} u', hm: '{h} u {m}',
    err: 'Vul "entity" in (bv. een fan of switch).',
    l_entity: 'Ventilator (fan, switch, …)', l_name: 'Naam', l_icon: 'Icoon', l_timers: 'Timerknoppen (minuten, gescheiden door komma\'s; leeg = geen timer)', l_custom: 'Knop "Andere" voor een eigen tijd', l_timer_entity: 'Timer-helper (aanbevolen, zie uitleg)', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    l_timer_position: 'Plaats van de timerknoppen', pos_inside: 'In de tegel, rechts', pos_below: 'Onder de tegel',
    pos_popup: 'In een popup (dubbeltik)', own_time: 'Eigen tijd', stop_timer: 'Timer stoppen en uitzetten',
    description: 'Ventilatortegel met gloed: tik schakelt, met timerknoppen en een eigen tijd.',
  },
  en: {
    off: 'Off', on: 'On', on_since: 'On since {t}', left: 'On · {t} left', unavailable: 'Unavailable', other: 'Other', on_for: 'On for', start: 'Start', stop: 'Stop', min: '{n} min', h: '{h} h', hm: '{h} h {m}',
    err: 'Fill in "entity" (e.g. a fan or switch).',
    l_entity: 'Fan (fan, switch, …)', l_name: 'Name', l_icon: 'Icon', l_timers: 'Timer buttons (minutes, comma separated; empty = no timer)', l_custom: '"Other" button for your own time', l_timer_entity: 'Timer helper (recommended, see docs)', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    l_timer_position: 'Position of the timer buttons', pos_inside: 'Inside the tile, on the right', pos_below: 'Below the tile',
    pos_popup: 'In a popup (double tap)', own_time: 'Your own time', stop_timer: 'Stop timer and turn off',
    description: 'Glowing fan tile: tap toggles, with timer buttons and your own time.',
  },
  fr: {
    off: 'Arrêt', on: 'Marche', on_since: 'En marche depuis {t}', left: 'Marche · encore {t}', unavailable: 'Indisponible', other: 'Autre', on_for: 'En marche pendant', start: 'Démarrer', stop: 'Arrêter', min: '{n} min', h: '{h} h', hm: '{h} h {m}',
    err: 'Renseignez "entity" (p. ex. un ventilateur ou un interrupteur).',
    l_entity: 'Ventilateur (fan, switch, …)', l_name: 'Nom', l_icon: 'Icône', l_timers: 'Boutons minuterie (minutes, séparées par des virgules ; vide = pas de minuterie)', l_custom: 'Bouton « Autre » pour une durée libre', l_timer_entity: 'Minuteur (recommandé, voir la doc)', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    l_timer_position: 'Position des boutons minuterie', pos_inside: 'Dans la tuile, à droite', pos_below: 'Sous la tuile',
    pos_popup: 'Dans un popup (double toucher)', own_time: 'Durée libre', stop_timer: 'Arrêter la minuterie et éteindre',
    description: 'Tuile de ventilateur lumineuse : un toucher allume, avec minuterie.',
  },
  de: {
    off: 'Aus', on: 'An', on_since: 'An seit {t}', left: 'An · noch {t}', unavailable: 'Nicht verfügbar', other: 'Andere', on_for: 'An für', start: 'Starten', stop: 'Stoppen', min: '{n} Min.', h: '{h} Std.', hm: '{h} Std. {m}',
    err: 'Gib "entity" an (z. B. einen Lüfter oder Schalter).',
    l_entity: 'Lüfter (fan, switch, …)', l_name: 'Name', l_icon: 'Symbol', l_timers: 'Timer-Tasten (Minuten, durch Kommas getrennt; leer = kein Timer)', l_custom: 'Taste „Andere“ für eine eigene Zeit', l_timer_entity: 'Timer-Helfer (empfohlen, siehe Doku)', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    l_timer_position: 'Position der Timer-Tasten', pos_inside: 'In der Kachel, rechts', pos_below: 'Unter der Kachel',
    pos_popup: 'In einem Popup (Doppeltippen)', own_time: 'Eigene Zeit', stop_timer: 'Timer stoppen und ausschalten',
    description: 'Leuchtende Lüfterkachel: Tippen schaltet, mit Timer-Tasten und eigener Zeit.',
  },
  es: {
    off: 'Apagado', on: 'Encendido', on_since: 'Encendido desde las {t}', left: 'Encendido · quedan {t}', unavailable: 'No disponible', other: 'Otro', on_for: 'Encendido durante', start: 'Iniciar', stop: 'Parar', min: '{n} min', h: '{h} h', hm: '{h} h {m}',
    err: 'Indica "entity" (p. ej. un ventilador o interruptor).',
    l_entity: 'Ventilador (fan, switch, …)', l_name: 'Nombre', l_icon: 'Icono', l_timers: 'Botones de temporizador (minutos separados por comas; vacío = sin temporizador)', l_custom: 'Botón «Otro» para un tiempo propio', l_timer_entity: 'Temporizador auxiliar (recomendado, ver docs)', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    l_timer_position: 'Posición de los botones', pos_inside: 'Dentro del mosaico, a la derecha', pos_below: 'Debajo del mosaico',
    pos_popup: 'En un popup (doble toque)', own_time: 'Tiempo propio', stop_timer: 'Parar el temporizador y apagar',
    description: 'Mosaico de ventilador con brillo: un toque enciende, con temporizador.',
  },
  it: {
    off: 'Spento', on: 'Acceso', on_since: 'Acceso dalle {t}', left: 'Acceso · ancora {t}', unavailable: 'Non disponibile', other: 'Altro', on_for: 'Acceso per', start: 'Avvia', stop: 'Ferma', min: '{n} min', h: '{h} h', hm: '{h} h {m}',
    err: 'Indica "entity" (es. un ventilatore o interruttore).',
    l_entity: 'Ventilatore (fan, switch, …)', l_name: 'Nome', l_icon: 'Icona', l_timers: 'Pulsanti timer (minuti separati da virgole; vuoto = nessun timer)', l_custom: 'Pulsante «Altro» per un tempo a scelta', l_timer_entity: 'Timer helper (consigliato, vedi doc)', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    l_timer_position: 'Posizione dei pulsanti timer', pos_inside: 'Nel riquadro, a destra', pos_below: 'Sotto il riquadro',
    pos_popup: 'In un popup (doppio tocco)', own_time: 'Tempo a scelta', stop_timer: 'Ferma il timer e spegni',
    description: 'Riquadro ventilatore luminoso: un tocco accende, con timer.',
  },
};
const GFAN_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };

function gfanLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GFAN_I18N[l] ? l : 'en';
}
function gfanT(lang, key, vars) {
  let s = (GFAN_I18N[lang] && GFAN_I18N[lang][key]) || GFAN_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gfanEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function gfanRgb(hex) {
  let h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const v = parseInt(h.slice(0, 6), 16);
  return h.length >= 6 && !isNaN(v) ? ((v >> 16) & 255) + ', ' + ((v >> 8) & 255) + ', ' + (v & 255) : null;
}
// "15, 30, 60" of [15, 30, 60] → [15, 30, 60]
function gfanList(v) {
  if (v === undefined || v === null) return [15, 30, 60];
  const arr = Array.isArray(v) ? v : String(v).split(/[,;\s]+/);
  return arr.map((x) => parseInt(x, 10)).filter((x) => x > 0 && x <= 1440);
}
// "0:15:00" → 900
function gfanDur(s) {
  if (typeof s === 'number') return s;
  const p = String(s || '').split(':').map((x) => parseInt(x, 10) || 0);
  if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
  if (p.length === 2) return p[0] * 60 + p[1];
  return p[0] || 0;
}

const GFAN_FAN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12c-1.5-3.5-1-7 1.5-8.5 2-1 3.5 1 2.5 3-1 2.2-2.6 3.8-4 5.5z"/><path d="M12 12c3.8-.4 6.8 1.5 6.8 4.4-.1 2.3-2.5 2.5-3.9.8-1.6-1.8-2.3-3.6-2.9-5.2z"/><path d="M12 12c-2.3 3.1-5.6 4.5-8 3-1.9-1.3-.8-3.4 1.4-3.6 2.4-.3 4.5.1 6.6.6z"/><circle cx="12" cy="12" r="1.2"/></svg>';
const GFAN_INK = (v) => `color-mix(in srgb, rgb(var(${v})), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%))`;
const GFAN_LINE = 'var(--glow-border, rgba(255, 255, 255, 0.1))';

const GFAN_STYLE = `
  :host { display: block; height: 100%; }
  .wrap { height: 100%; display: flex; flex-direction: column; gap: 8px; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; flex: 1; min-height: 112px;
    border-radius: var(--ha-card-border-radius, 24px); padding: 14px 16px; cursor: pointer; user-select: none; -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent; touch-action: manipulation;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid var(--glow-card-border, rgba(255, 255, 255, 0.08));
    display: flex; flex-direction: column; justify-content: space-between;
    transition: background 0.4s, border-color 0.4s, box-shadow 0.4s, transform 0.12s;
  }
  ha-card:active { transform: scale(0.98); }
  ha-card.on { background: linear-gradient(rgba(var(--c), 0.16), rgba(var(--c), 0.16)), var(--glow-card-background, #15121F); border-color: rgba(var(--c), 0.5); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); }
  ha-card.unavailable { opacity: 0.5; }
  .halo { position: absolute; right: -50px; top: -60px; width: 160px; height: 160px; border-radius: 50%; background: rgb(var(--c)); opacity: 0; filter: blur(46px); transition: opacity 0.5s; pointer-events: none; }
  ha-card.on .halo { opacity: 0.45; }
  .icon { position: relative; width: 52px; height: 52px; border-radius: 26px; display: flex; align-items: center; justify-content: center; background: var(--glow-surface, rgba(255,255,255,0.07)); transition: background 0.4s, box-shadow 0.4s; --mdc-icon-size: 28px; }
  .icon svg, .icon ha-icon { width: 30px; height: 30px; display: block; }
  ha-card.on .icon { background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.8); }
  ha-card.on .icon .spin { animation: gfan-spin 1.1s linear infinite; }
  .txt { position: relative; display: flex; flex-direction: column; min-width: 0; }
  .name { font-size: 1.3rem; font-weight: 800; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .state { font-size: 0.95rem; font-weight: 700; opacity: 0.7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-variant-numeric: tabular-nums; }
  ha-card.on .state { opacity: 1; color: ${GFAN_INK('--c')}; }
  .timers { display: flex; gap: 8px; }
  .timers:empty { display: none; }
  .tb { flex: 1; min-width: 0; height: 44px; padding: 0 6px; border-radius: 16px; font: inherit; font-size: 14px; font-weight: 800; white-space: nowrap; cursor: pointer; color: var(--glow-text, #F3F1FA);
    border: 1px solid ${GFAN_LINE}; background: var(--glow-card-background, #15121F); -webkit-tap-highlight-color: transparent; touch-action: manipulation; transition: background 0.3s, border-color 0.3s, box-shadow 0.3s; }
  .tb.sel { color: ${GFAN_INK('--c')}; border-color: rgba(var(--c), 0.6); background: linear-gradient(rgba(var(--c), 0.16), rgba(var(--c), 0.16)), var(--glow-card-background, #15121F); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); }
  .tb:active { transform: scale(0.97); }
  /* timerknoppen in de tegel: een blokje van 2 rijen aan de rechterkant */
  .timers.in { position: absolute; top: 12px; bottom: 12px; right: 12px; display: grid; grid-template-rows: repeat(2, minmax(0, 1fr)); grid-template-columns: repeat(var(--cols, 2), 66px); grid-auto-flow: row; gap: 6px; }
  .timers.in .tb { height: auto; border-radius: 14px; font-size: 13px; padding: 0 4px; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .timers.in .tb.sel { background: rgba(var(--c), 0.24); }
  ha-card.in .txt { padding-right: var(--tw, 0px); }
  ha-card.in:has(.timers:active) { transform: none; }
  @keyframes gfan-spin { to { transform: rotate(360deg); } }
`;

const GFAN_POP_STYLE = `
  :host { all: initial; }
  .backdrop { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box;
    background: rgba(8, 6, 16, 0.55); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    font-family: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif); animation: gfan-fade 0.2s ease-out; }
  .panel { width: 100%; max-width: 380px; box-sizing: border-box; display: flex; flex-direction: column; align-items: stretch; gap: 18px; padding: 22px; border-radius: 28px;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.5); box-shadow: 0 0 40px rgba(var(--c), 0.25), 0 20px 50px rgba(0, 0, 0, 0.4); animation: gfan-pop 0.25s cubic-bezier(.2, .9, .3, 1.2); }
  .lab { font-size: 15px; font-weight: 700; opacity: 0.65; text-align: center; }
  .head { display: flex; align-items: center; gap: 14px; }
  .head .ic { width: 52px; height: 52px; border-radius: 26px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .head .ic svg { width: 30px; height: 30px; }
  .head.on .ic { background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.8); }
  .head.on .ic svg { animation: gfan-spin 1.1s linear infinite; }
  .head .t { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .head .n { font-size: 22px; font-weight: 800; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .head .s { font-size: 15px; font-weight: 700; opacity: 0.65; font-variant-numeric: tabular-nums; }
  .head.on .s { opacity: 1; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .sec { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .presets { display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); gap: 8px; }
  .p { height: 52px; border-radius: 18px; font-size: 16px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GFAN_LINE}; transition: background 0.3s, border-color 0.3s, box-shadow 0.3s; }
  .p.sel { color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); border-color: rgba(var(--c), 0.6); background: rgba(var(--c), 0.16); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); }
  .p:active { background: rgba(var(--c), 0.25); }
  .stopt { height: 46px; border-radius: 23px; font-size: 15px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GFAN_LINE}; }
  .stopt[hidden], .custom[hidden] { display: none; }
  .custom { display: flex; flex-direction: column; gap: 14px; }
  .row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .val { flex: 1; text-align: center; font-size: 40px; font-weight: 800; font-variant-numeric: tabular-nums; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .step { width: 64px; height: 64px; border-radius: 32px; font-size: 30px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GFAN_LINE}; }
  .step:active { background: rgba(var(--c), 0.25); }
  .quick { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
  .q { height: 40px; border-radius: 14px; font-size: 14px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GFAN_LINE}; }
  .go { height: 54px; border-radius: 27px; font-size: 17px; font-weight: 800; color: #1C1730; background: rgb(var(--c)); border: 0; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.6); }
  @keyframes gfan-spin { to { transform: rotate(360deg); } }
  @keyframes gfan-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes gfan-pop { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: none; } }
`;
const GFAN_THEME_VARS = ['--glow-card-background', '--glow-text', '--glow-surface', '--glow-border', '--glow-ink-amount', '--paper-font-body1_-_font-family'];
const GFAN_DEFAULT_C = '142, 227, 214';

class GlowFanCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._built = false;
    this._custom = 45;
  }

  static getConfigElement() { return document.createElement('glow-fan-card-editor'); }
  static getStubConfig(hass) {
    const ids = Object.keys((hass && hass.states) || {});
    const f = ids.find((e) => e.startsWith('fan.')) || ids.find((e) => /^switch\..*(vent|fan)/i.test(e));
    return { entity: f || '' };
  }

  setConfig(config) {
    if (!config || !config.entity) throw new Error(gfanT(gfanLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, custom: true, ...config };
    this._built = false;
    if (this._hass) this._render();
  }

  set hass(hass) {
    const prev = this._hass && this._config && this._hass.states[this._config.entity];
    this._hass = hass;
    if (!this._config) return;
    // met de hand uitgezet: lokale timer vergeten
    const now = hass.states[this._config.entity];
    if (prev && now && prev.state === 'on' && now.state === 'off') this._clearLocal();
    this._render();
  }
  get hass() { return this._hass; }

  getCardSize() { return this._config && this._config.timer_position === 'below' ? 3 : 2; }
  getGridOptions() { return this._config && this._config.timer_position === 'below' ? { columns: 6, rows: 'auto', min_columns: 3 } : { columns: 6, rows: 2, min_columns: 4, min_rows: 2 }; }

  connectedCallback() {
    clearInterval(this._tick);
    this._tick = setInterval(() => this._onTick(), 1000);
  }
  disconnectedCallback() {
    clearInterval(this._tick);
    this._closePopup();
  }

  _lang() { return gfanLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gfanT(this._lang(), k, v); }
  _locale() { return (this._hass && this._hass.locale && this._hass.locale.language) || this._lang(); }
  _color() { return gfanRgb(this._config.color) || GFAN_DEFAULT_C; }

  _fmtLeft(sec) {
    const m = Math.max(1, Math.ceil(sec / 60));
    if (m < 60) return this._t('min', { n: m });
    return this._t('hm', { h: Math.floor(m / 60), m: String(m % 60).padStart(2, '0') });
  }
  _fmtMin(m) {
    if (m < 60) return this._t('min', { n: m });
    if (m % 60 === 0) return this._t('h', { h: m / 60 });
    return this._t('hm', { h: Math.floor(m / 60), m: String(m % 60).padStart(2, '0') });
  }

  /* ---- timer: via een timer-helper, anders lokaal op dit toestel ---- */

  _localKey() { return 'glow-fan-timer:' + this._config.entity; }
  _readLocal() {
    try { const v = JSON.parse(localStorage.getItem(this._localKey()) || 'null'); return v && v.end > Date.now() - 5000 ? v : null; } catch (e) { return null; }
  }
  _writeLocal(v) { try { localStorage.setItem(this._localKey(), JSON.stringify(v)); } catch (e) { /* geen opslag */ } }
  _clearLocal() { try { localStorage.removeItem(this._localKey()); } catch (e) { /* geen opslag */ } }

  // { end: ms, minutes } of null
  _timer() {
    const te = this._config.timer_entity;
    if (te) {
      const t = this._hass.states[te];
      if (!t || t.state !== 'active') return null;
      const end = Date.parse(t.attributes.finishes_at) || (Date.parse(t.last_changed) + gfanDur(t.attributes.remaining) * 1000);
      return { end, minutes: Math.round(gfanDur(t.attributes.duration) / 60) };
    }
    return this._readLocal();
  }

  _turn(on) {
    this._hass.callService('homeassistant', on ? 'turn_on' : 'turn_off', { entity_id: this._config.entity });
  }

  _startTimer(minutes) {
    const te = this._config.timer_entity;
    this._turn(true);
    if (te) {
      const h = Math.floor(minutes / 60);
      this._hass.callService('timer', 'start', { entity_id: te, duration: String(h).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0') + ':00' });
    } else {
      this._writeLocal({ end: Date.now() + minutes * 60000, minutes });
    }
    this._render();
  }

  _stopTimer(turnOff) {
    const te = this._config.timer_entity;
    if (te) this._hass.callService('timer', 'cancel', { entity_id: te });
    this._clearLocal();
    if (turnOff) this._turn(false);
    this._render();
  }

  _onTick() {
    if (!this._hass || !this._built) return;
    const t = this._timer();
    if (!t) return;
    // zonder helper zet de kaart zelf de ventilator uit als de tijd om is
    if (!this._config.timer_entity && t.end <= Date.now()) {
      this._clearLocal();
      const s = this._hass.states[this._config.entity];
      if (s && s.state === 'on') this._turn(false);
    }
    this._render();
  }

  /* ---- tekenen ---- */

  _build() {
    const c = this._config;
    const pos = c.timer_position || 'popup';
    const inside = pos === 'inside';
    const usePopup = pos === 'popup';
    const icon = c.icon ? `<ha-icon icon="${gfanEsc(c.icon)}"></ha-icon>` : `<span class="spin" style="display:block;width:30px;height:30px">${GFAN_FAN}</span>`;
    this.shadowRoot.innerHTML = `
      <style>${GFAN_STYLE}</style>
      <div class="wrap">
        <ha-card class="${inside ? 'in' : ''}">
          <div class="halo"></div>
          <div class="icon">${icon}</div>
          <div class="txt"><span class="name"></span><span class="state"></span></div>
          ${inside ? '<div class="timers in"></div>' : ''}
        </ha-card>
        ${pos === 'below' ? '<div class="timers"></div>' : ''}
      </div>`;
    this._card = this.shadowRoot.querySelector('ha-card');
    this._timers = this.shadowRoot.querySelector('.timers');
    let hold = null;
    let held = false;
    let lastUp = 0;
    let single = null;
    this._card.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.timers')) return;
      held = false;
      hold = setTimeout(() => { held = true; this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._config.entity }, bubbles: true, composed: true })); }, 600);
    });
    const cancel = () => clearTimeout(hold);
    this._card.addEventListener('pointerleave', cancel);
    this._card.addEventListener('pointercancel', cancel);
    this._card.addEventListener('pointerup', (e) => {
      clearTimeout(hold);
      if (held || e.target.closest('.timers')) return;
      const toggle = () => {
        const s = this._hass.states[this._config.entity];
        if (!s || s.state === 'unavailable') return;
        if (s.state === 'on') this._stopTimer(true);
        else this._turn(true);
      };
      if (!usePopup) { toggle(); return; }
      // dubbeltik opent de timers, enkele tik schakelt
      const now = Date.now();
      if (now - lastUp < 300) { clearTimeout(single); lastUp = 0; this._openPopup(); return; }
      lastUp = now;
      single = setTimeout(toggle, 280);
    });
    this._card.addEventListener('contextmenu', (e) => e.preventDefault());
    if (this._timers) this._timers.addEventListener('click', (e) => {
      const b = e.target.closest('.tb');
      if (!b) return;
      if (b.dataset.m === 'other') { this._openPopup(); return; }
      const m = +b.dataset.m;
      const t = this._timer();
      if (t && t.minutes === m && b.classList.contains('sel')) this._stopTimer(true);
      else this._startTimer(m);
    });
    this._built = true;
    this._builtLang = this._lang();
    this._timersKey = null;
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    const c = this._config;
    const s = this._hass.states[c.entity];
    const on = !!s && s.state === 'on';
    const una = !s || s.state === 'unavailable';
    const t = on ? this._timer() : null;
    this._card.style.setProperty('--c', this._color());
    this._card.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');
    if (this._timers) {
      this._timers.style.setProperty('--c', this._color());
      this._timers.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');
    }
    this._card.classList.toggle('on', on);
    this._card.classList.toggle('unavailable', una);
    this.shadowRoot.querySelector('.name').textContent = c.name || (s && s.attributes.friendly_name) || c.entity;
    let state;
    if (una) state = this._t('unavailable');
    else if (!on) state = this._t('off');
    else if (t) state = this._t('left', { t: this._fmtLeft((t.end - Date.now()) / 1000) });
    else {
      let time = '';
      try { time = new Date(s.last_changed).toLocaleTimeString(this._locale(), { hour: '2-digit', minute: '2-digit' }); } catch (e) { /* ignore */ }
      state = time ? this._t('on_since', { t: time }) : this._t('on');
    }
    this.shadowRoot.querySelector('.state').textContent = state;

    // timerknoppen
    const list = gfanList(c.timers);
    const sel = t && t.minutes;
    const html = list.map((m) => {
      const isSel = sel === m;
      return `<button class="tb${isSel ? ' sel' : ''}" type="button" data-m="${m}">${gfanEsc(isSel ? this._fmtLeft((t.end - Date.now()) / 1000) : this._fmtMin(m))}</button>`;
    }).join('') + (list.length && c.custom !== false
      ? `<button class="tb${t && !list.includes(sel) ? ' sel' : ''}" type="button" data-m="other">${gfanEsc(t && !list.includes(sel) ? this._fmtLeft((t.end - Date.now()) / 1000) : this._t('other'))}</button>`
      : '');
    if (this._pop) this._updatePopup();
    if (!this._timers) return;
    if (html !== this._timersKey) {
      this._timersKey = html;
      this._timers.innerHTML = html;
      // ruimte voor de knoppen vrijhouden naast de tekst
      const n = this._timers.children.length;
      const cols = Math.ceil(n / 2);
      this._timers.style.setProperty('--cols', String(Math.max(1, cols)));
      this._card.style.setProperty('--tw', n ? (cols * 66 + (cols - 1) * 6 + 8) + 'px' : '0px');
    }
  }

  /* ---- eigen tijd ---- */

  _openPopup() {
    if (this._pop) return;
    const host = document.createElement('div');
    host.className = 'glow-fan-popup';
    const root = host.attachShadow({ mode: 'open' });
    const cs = getComputedStyle(this);
    GFAN_THEME_VARS.forEach((v) => { const val = cs.getPropertyValue(v); if (val) host.style.setProperty(v, val.trim()); });
    host.style.setProperty('--c', this._color());
    host.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');
    const list = gfanList(this._config.timers);
    const custom = this._config.custom !== false;
    root.innerHTML = `
      <style>${GFAN_POP_STYLE}</style>
      <div class="backdrop">
        <div class="panel" role="dialog" aria-modal="true">
          <div class="head"><div class="ic">${GFAN_FAN}</div><div class="t"><span class="n"></span><span class="s"></span></div></div>
          ${list.length ? `<span class="sec">${gfanEsc(this._t('on_for'))}</span><div class="presets">${list.map((m) => `<button class="p" type="button" data-m="${m}">${gfanEsc(this._fmtMin(m))}</button>`).join('')}</div>` : ''}
          <div class="custom"${custom ? '' : ' hidden'}>
            <span class="sec">${gfanEsc(this._t('own_time'))}</span>
            <div class="row">
              <button class="step" type="button" data-d="-5">−</button>
              <span class="val"></span>
              <button class="step" type="button" data-d="5">+</button>
            </div>
            <button class="go" type="button">${gfanEsc(this._t('start'))}</button>
          </div>
          <button class="stopt" type="button" hidden>${gfanEsc(this._t('stop_timer'))}</button>
        </div>
      </div>`;
    document.body.appendChild(host);
    this._pop = host;
    const show = () => { root.querySelector('.val').textContent = this._fmtMin(this._custom); };
    show();
    root.querySelector('.backdrop').addEventListener('pointerdown', (e) => { if (e.target.classList.contains('backdrop')) this._closePopup(); });
    root.querySelectorAll('.step').forEach((b) => b.addEventListener('click', () => {
      const d = +b.dataset.d;
      const step = this._custom + d > 60 || (d < 0 && this._custom > 60) ? 15 : 5;
      this._custom = Math.max(5, Math.min(720, this._custom + Math.sign(d) * step));
      show();
    }));
    // een vaste tijd start meteen
    root.querySelectorAll('.p').forEach((b) => b.addEventListener('click', () => { this._startTimer(+b.dataset.m); this._closePopup(); }));
    root.querySelector('.go').addEventListener('click', () => { this._startTimer(this._custom); this._closePopup(); });
    root.querySelector('.stopt').addEventListener('click', () => { this._stopTimer(true); this._closePopup(); });
    this._updatePopup();
    this._onKey = (e) => { if (e.key === 'Escape') this._closePopup(); };
    document.addEventListener('keydown', this._onKey);
    this._autoTimer = setTimeout(() => this._closePopup(), 60000);
  }

  _updatePopup() {
    const root = this._pop && this._pop.shadowRoot;
    if (!root) return;
    const s = this._hass.states[this._config.entity];
    const on = !!s && s.state === 'on';
    const t = on ? this._timer() : null;
    root.querySelector('.head').classList.toggle('on', on);
    root.querySelector('.head .n').textContent = this.shadowRoot.querySelector('.name').textContent;
    root.querySelector('.head .s').textContent = this.shadowRoot.querySelector('.state').textContent;
    root.querySelectorAll('.p').forEach((b) => b.classList.toggle('sel', !!t && t.minutes === +b.dataset.m));
    root.querySelector('.stopt').hidden = !t;
  }

  _closePopup() {
    clearTimeout(this._autoTimer);
    if (this._onKey) document.removeEventListener('keydown', this._onKey);
    if (this._pop) this._pop.remove();
    this._pop = null;
  }
}

/* ---------------- editor ---------------- */

class GlowFanCardEditor extends HTMLElement {
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
    const lang = gfanLang(this._hass, this._config.language);
    const t = (k) => gfanT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gfanT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        // timers als lijst getallen bewaren
        if (typeof v.timers === 'string') {
          const list = gfanList(v.timers);
          if (v.timers.trim() === '') v.timers = [];
          else if (list.length) v.timers = list;
          else delete v.timers;
          if (Array.isArray(v.timers) && v.timers.join(',') === '15,30,60') delete v.timers;
        }
        Object.keys(v).forEach((k) => { if (k !== 'timers' && (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length))) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.custom === true) delete v.custom;
        if (v.timer_position === 'popup') delete v.timer_position;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      { name: 'entity', selector: { entity: { domain: ['fan', 'switch', 'light', 'input_boolean'] } } },
      { type: 'grid', name: '', schema: [
        { name: 'name', selector: { text: {} } },
        { name: 'icon', selector: { icon: {} } },
      ] },
      { name: 'timers', selector: { text: {} } },
      { name: 'custom', selector: { boolean: {} } },
      { name: 'timer_position', selector: { select: { mode: 'dropdown', options: [{ value: 'popup', label: t('pos_popup') }, { value: 'inside', label: t('pos_inside') }, { value: 'below', label: t('pos_below') }] } } },
      { name: 'timer_entity', selector: { entity: { domain: 'timer' } } },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GFAN_LANG_NAMES).map((k) => ({ value: k, label: GFAN_LANG_NAMES[k] }))) } } },
    ];
    const timers = this._config.timers === undefined ? '15, 30, 60' : gfanList(this._config.timers).join(', ');
    this._form.data = { glow: 15, custom: true, timer_position: 'popup', language: 'auto', ...this._config, timers };
  }
}

if (!customElements.get('glow-fan-card')) customElements.define('glow-fan-card', GlowFanCard);
if (!customElements.get('glow-fan-card-editor')) customElements.define('glow-fan-card-editor', GlowFanCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-fan-card')) {
  window.customCards.push({
    type: 'glow-fan-card',
    name: 'Glow Fan Card',
    description: gfanT(gfanLang(null), 'description'),
    preview: true,
    documentationURL: 'https://github.com/stijnleroy/glow-cards',
  });
}

}

/* ---- garage.js ---- */
{
/*
 * Glow Garage Card
 * Een garagepoorttegel in de Glow-stijl: toont open of dicht, en bedient de
 * poort met een bevestigingstik zodat ze niet per ongeluk opengaat.
 */

const GGAR_I18N = {
  nl: {
    open_since: 'Open sinds {t}', closed_since: 'Dicht sinds {t}', open: 'Open', closed: 'Dicht', unavailable: 'Niet beschikbaar',
    confirm_open: 'Tik nog eens om te openen', confirm_close: 'Tik nog eens om te sluiten', name: 'Garagepoort',
    err: 'Vul "entity" in (een cover of switch).',
    l_entity: 'Garagepoort (cover of switch)', l_name: 'Naam', l_confirm: 'Bevestigen met een tweede tik', l_confirm_time: 'Tijd voor de tweede tik (seconden)', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Garagepoorttegel met gloed: toont open of dicht, bedienen met een bevestigingstik.',
  },
  en: {
    open_since: 'Open since {t}', closed_since: 'Closed since {t}', open: 'Open', closed: 'Closed', unavailable: 'Unavailable',
    confirm_open: 'Tap again to open', confirm_close: 'Tap again to close', name: 'Garage door',
    err: 'Fill in "entity" (a cover or switch).',
    l_entity: 'Garage door (cover or switch)', l_name: 'Name', l_confirm: 'Confirm with a second tap', l_confirm_time: 'Time for the second tap (seconds)', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Glowing garage door tile: shows open or closed, operate with a confirmation tap.',
  },
  fr: {
    open_since: 'Ouverte depuis {t}', closed_since: 'Fermée depuis {t}', open: 'Ouverte', closed: 'Fermée', unavailable: 'Indisponible',
    confirm_open: 'Touchez encore pour ouvrir', confirm_close: 'Touchez encore pour fermer', name: 'Porte de garage',
    err: 'Renseignez "entity" (un cover ou un interrupteur).',
    l_entity: 'Porte de garage (cover ou switch)', l_name: 'Nom', l_confirm: 'Confirmer par un second toucher', l_confirm_time: 'Délai pour le second toucher (secondes)', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Tuile de porte de garage : ouverte ou fermée, commande avec confirmation.',
  },
  de: {
    open_since: 'Offen seit {t}', closed_since: 'Zu seit {t}', open: 'Offen', closed: 'Zu', unavailable: 'Nicht verfügbar',
    confirm_open: 'Nochmal tippen zum Öffnen', confirm_close: 'Nochmal tippen zum Schließen', name: 'Garagentor',
    err: 'Gib "entity" an (ein Cover oder Schalter).',
    l_entity: 'Garagentor (cover oder switch)', l_name: 'Name', l_confirm: 'Mit zweitem Tippen bestätigen', l_confirm_time: 'Zeit für das zweite Tippen (Sekunden)', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Leuchtende Garagentor-Kachel: zeigt offen oder zu, Bedienung mit Bestätigung.',
  },
  es: {
    open_since: 'Abierta desde las {t}', closed_since: 'Cerrada desde las {t}', open: 'Abierta', closed: 'Cerrada', unavailable: 'No disponible',
    confirm_open: 'Toca otra vez para abrir', confirm_close: 'Toca otra vez para cerrar', name: 'Puerta del garaje',
    err: 'Indica "entity" (un cover o interruptor).',
    l_entity: 'Puerta del garaje (cover o switch)', l_name: 'Nombre', l_confirm: 'Confirmar con un segundo toque', l_confirm_time: 'Tiempo para el segundo toque (segundos)', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Mosaico de puerta de garaje: abierta o cerrada, con toque de confirmación.',
  },
  it: {
    open_since: 'Aperta dalle {t}', closed_since: 'Chiusa dalle {t}', open: 'Aperta', closed: 'Chiusa', unavailable: 'Non disponibile',
    confirm_open: 'Tocca ancora per aprire', confirm_close: 'Tocca ancora per chiudere', name: 'Porta del garage',
    err: 'Indica "entity" (un cover o interruttore).',
    l_entity: 'Porta del garage (cover o switch)', l_name: 'Nome', l_confirm: 'Conferma con un secondo tocco', l_confirm_time: 'Tempo per il secondo tocco (secondi)', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Riquadro porta del garage: aperta o chiusa, comando con tocco di conferma.',
  },
};
const GGAR_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };

function ggarLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GGAR_I18N[l] ? l : 'en';
}
function ggarT(lang, key, vars) {
  let s = (GGAR_I18N[lang] && GGAR_I18N[lang][key]) || GGAR_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function ggarEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const GGAR_OPEN = '255, 184, 153';
const GGAR_SHUT = '143, 227, 184';
const GGAR_ASK = '255, 224, 138';
const GGAR_ICON = (closed) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V9l9-5 9 5v12"/><path d="M6 21v-9h12v9"/>${closed ? '<path d="M6 15h12M6 18h12"/>' : ''}</svg>`;

const GGAR_STYLE = `
  :host { display: block; height: 100%; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; height: 100%; min-height: 112px;
    border-radius: var(--ha-card-border-radius, 24px); padding: 14px 16px; cursor: pointer; user-select: none; -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent; touch-action: manipulation;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid var(--glow-card-border, rgba(255, 255, 255, 0.08));
    display: flex; flex-direction: column; justify-content: space-between;
    transition: background 0.4s, border-color 0.4s, box-shadow 0.4s, transform 0.12s;
  }
  ha-card:active { transform: scale(0.98); }
  ha-card.lit { background: linear-gradient(rgba(var(--c), 0.16), rgba(var(--c), 0.16)), var(--glow-card-background, #15121F); border-color: rgba(var(--c), 0.55); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); }
  ha-card.unavailable { opacity: 0.5; }
  .halo { position: absolute; right: -50px; top: -60px; width: 160px; height: 160px; border-radius: 50%; background: rgb(var(--c)); opacity: 0; filter: blur(46px); transition: opacity 0.5s, background 0.4s; pointer-events: none; }
  ha-card.lit .halo { opacity: 0.45; }
  .top { position: relative; display: flex; justify-content: space-between; align-items: flex-start; }
  .icon { width: 52px; height: 52px; border-radius: 26px; display: flex; align-items: center; justify-content: center; background: var(--glow-surface, rgba(255,255,255,0.07)); transition: background 0.4s, box-shadow 0.4s; --mdc-icon-size: 28px; }
  .icon svg { width: 30px; height: 30px; }
  ha-card.lit .icon { background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.8); }
  .count { display: none; min-width: 30px; height: 30px; border-radius: 15px; align-items: center; justify-content: center; font-size: 15px; font-weight: 800; color: #1C1730; background: rgb(${GGAR_ASK}); box-shadow: 0 0 10px rgba(${GGAR_ASK}, 0.8); }
  ha-card.ask .count { display: flex; }
  .txt { position: relative; display: flex; flex-direction: column; min-width: 0; }
  .name { font-size: 1.3rem; font-weight: 800; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .state { font-size: 0.95rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
`;

class GlowGarageCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._built = false;
    this._ask = 0;
  }

  static getConfigElement() { return document.createElement('glow-garage-card-editor'); }
  static getStubConfig(hass) {
    const ids = Object.keys((hass && hass.states) || {});
    const g = ids.find((e) => e.startsWith('cover.') && (hass.states[e].attributes.device_class === 'garage' || /garage/i.test(e))) || ids.find((e) => /garage/i.test(e));
    return { entity: g || '' };
  }

  setConfig(config) {
    if (!config || !config.entity) throw new Error(ggarT(ggarLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, confirm: true, confirm_time: 3, ...config };
    this._built = false;
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._config) this._render();
  }
  get hass() { return this._hass; }

  getCardSize() { return 2; }
  getGridOptions() { return { columns: 6, rows: 2, min_columns: 3, min_rows: 2 }; }
  disconnectedCallback() { clearInterval(this._askTimer); this._ask = 0; }

  _lang() { return ggarLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return ggarT(this._lang(), k, v); }

  _isOpen(s) {
    if (!s) return false;
    if (s.entity_id && s.entity_id.startsWith('cover.') || ['open', 'closed', 'opening', 'closing'].includes(s.state)) return s.state === 'open' || s.state === 'opening';
    return s.state === 'on';
  }

  _build() {
    this.shadowRoot.innerHTML = `
      <style>${GGAR_STYLE}</style>
      <ha-card>
        <div class="halo"></div>
        <div class="top"><div class="icon"></div><span class="count"></span></div>
        <div class="txt"><span class="name"></span><span class="state"></span></div>
      </ha-card>`;
    this._card = this.shadowRoot.querySelector('ha-card');
    let hold = null;
    let held = false;
    this._card.addEventListener('pointerdown', () => {
      held = false;
      hold = setTimeout(() => { held = true; this._stopAsk(); this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._config.entity }, bubbles: true, composed: true })); }, 600);
    });
    const cancel = () => clearTimeout(hold);
    this._card.addEventListener('pointerleave', cancel);
    this._card.addEventListener('pointercancel', cancel);
    this._card.addEventListener('pointerup', () => { clearTimeout(hold); if (!held) this._tap(); });
    this._card.addEventListener('contextmenu', (e) => e.preventDefault());
    this._built = true;
    this._builtLang = this._lang();
  }

  _tap() {
    const s = this._hass.states[this._config.entity];
    if (!s || s.state === 'unavailable') return;
    if (this._config.confirm === false || this._ask > 0) {
      this._stopAsk();
      this._operate(s);
      return;
    }
    // eerste tik: om bevestiging vragen en aftellen
    this._ask = Math.max(1, parseInt(this._config.confirm_time, 10) || 3);
    clearInterval(this._askTimer);
    this._askTimer = setInterval(() => {
      this._ask -= 1;
      if (this._ask <= 0) this._stopAsk();
      else this._render();
    }, 1000);
    this._render();
  }

  _stopAsk() {
    clearInterval(this._askTimer);
    this._ask = 0;
    if (this._built) this._render();
  }

  _operate(s) {
    const id = this._config.entity;
    const open = this._isOpen(s);
    if (id.startsWith('cover.')) this._hass.callService('cover', open ? 'close_cover' : 'open_cover', { entity_id: id });
    else this._hass.callService('homeassistant', open ? 'turn_off' : 'turn_on', { entity_id: id });
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    const c = this._config;
    const s = this._hass.states[c.entity];
    const una = !s || s.state === 'unavailable' || s.state === 'unknown';
    const open = this._isOpen(s);
    const asking = this._ask > 0;
    const col = asking ? GGAR_ASK : open ? GGAR_OPEN : GGAR_SHUT;
    this._card.style.setProperty('--c', col);
    this._card.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');
    this._card.classList.toggle('lit', !una && (open || asking));
    this._card.classList.toggle('ask', asking);
    this._card.classList.toggle('unavailable', una);
    const key = open ? 'o' : 'c';
    if (this._iconKey !== key) { this._iconKey = key; this.shadowRoot.querySelector('.icon').innerHTML = GGAR_ICON(!open); }
    this.shadowRoot.querySelector('.count').textContent = asking ? String(this._ask) : '';
    this.shadowRoot.querySelector('.name').textContent = c.name || (s && s.attributes.friendly_name) || this._t('name');
    let state;
    if (una) state = this._t('unavailable');
    else if (asking) state = this._t(open ? 'confirm_close' : 'confirm_open');
    else {
      let t = '';
      try { t = new Date(s.last_changed).toLocaleTimeString((this._hass.locale && this._hass.locale.language) || this._lang(), { hour: '2-digit', minute: '2-digit' }); } catch (e) { /* ignore */ }
      state = t ? this._t(open ? 'open_since' : 'closed_since', { t }) : this._t(open ? 'open' : 'closed');
    }
    this.shadowRoot.querySelector('.state').textContent = state;
  }
}

/* ---------------- editor ---------------- */

class GlowGarageCardEditor extends HTMLElement {
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
    const lang = ggarLang(this._hass, this._config.language);
    const t = (k) => ggarT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => ggarT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.confirm === true) delete v.confirm;
        if (v.confirm_time === 3) delete v.confirm_time;
        if (v.glow === 15) delete v.glow;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      { name: 'entity', selector: { entity: { domain: ['cover', 'switch', 'input_boolean'] } } },
      { name: 'name', selector: { text: {} } },
      { type: 'grid', name: '', schema: [
        { name: 'confirm', selector: { boolean: {} } },
        { name: 'confirm_time', selector: { number: { min: 1, max: 10, step: 1, mode: 'box', unit_of_measurement: 's' } } },
      ] },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GGAR_LANG_NAMES).map((k) => ({ value: k, label: GGAR_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, confirm: true, confirm_time: 3, language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-garage-card')) customElements.define('glow-garage-card', GlowGarageCard);
if (!customElements.get('glow-garage-card-editor')) customElements.define('glow-garage-card-editor', GlowGarageCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-garage-card')) {
  window.customCards.push({
    type: 'glow-garage-card',
    name: 'Glow Garage Card',
    description: ggarT(ggarLang(null), 'description'),
    preview: true,
    documentationURL: 'https://github.com/stijnleroy/glow-cards',
  });
}

}

/* ---- thermostat.js ---- */
{
/*
 * Glow Thermostat Card
 * Een thermostaatkaart in de Glow-stijl met draaiknop, standen en een weekschema
 * (comfort/spaarstand) dat volledig in Home Assistant draait: een schedule-helper,
 * twee input_numbers, een input_boolean en één automatisering.
 */

const GTH_I18N = {
  nl: {
    off: 'Uit', heating: 'Verwarmt naar {t}', idle: 'Op temperatuur', cooling: 'Koelt naar {t}', unavailable: 'Niet beschikbaar', now: 'Nu {t}',
    m_off: 'Uit', m_heat: 'Verwarmen', m_auto: 'Schema', schedule: 'Schema', colder: 'Kouder', warmer: 'Warmer',
    comfort: 'Comfort', eco: 'Spaarstand', on: 'Aan', sched_off: 'Schema staat uit', comfort_until: 'Nu comfort tot {t}, daarna {e}', eco_until: 'Nu spaarstand tot {t}, daarna {c}', eco_all: 'Vandaag geen comfortblokken',
    days: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'], days_long: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'],
    until: 'tot', add_block: '+ Blok toevoegen', remove: 'Verwijderen', copy_week: 'Kopieer naar alle weekdagen', copy_weekend: 'Kopieer naar het weekend', saved: 'Opgeslagen', saving: 'Opslaan…',
    setup_title: 'Schema nog niet ingesteld', setup_text: 'De kaart maakt in Home Assistant een schema, twee temperaturen (comfort en spaarstand), een schakelaar "schema actief" en één automatisering aan. Daarna loopt het schema ook als de tablet uit staat.', setup_btn: 'Schema instellen', setup_busy: 'Bezig met instellen…', setup_err: 'Dat lukte niet: {e}. Dit vraagt een beheerdersaccount.',
    err: 'Vul "entity" in met een thermostaat (climate).',
    l_entity: 'Thermostaat', l_name: 'Naam', l_schedule: 'Schema-helper (leeg = automatisch)', l_comfort: 'Comforttemperatuur (input_number)', l_eco: 'Spaartemperatuur (input_number)', l_active: 'Schema actief (input_boolean)', l_humidity: 'Vochtigheidssensor (optioneel)', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    l_layout: 'Weergave', lay_full: 'Groot, met het schema erbij', lay_compact: 'Klein, schema in een popup',
    description: 'Thermostaat met draaiknop en een weekschema met comfort- en spaartemperatuur.',
  },
  en: {
    off: 'Off', heating: 'Heating to {t}', idle: 'At temperature', cooling: 'Cooling to {t}', unavailable: 'Unavailable', now: 'Now {t}',
    m_off: 'Off', m_heat: 'Heat', m_auto: 'Schedule', schedule: 'Schedule', colder: 'Colder', warmer: 'Warmer',
    comfort: 'Comfort', eco: 'Eco', on: 'On', sched_off: 'Schedule is off', comfort_until: 'Comfort until {t}, then {e}', eco_until: 'Eco until {t}, then {c}', eco_all: 'No comfort blocks today',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], days_long: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    until: 'to', add_block: '+ Add block', remove: 'Remove', copy_week: 'Copy to all weekdays', copy_weekend: 'Copy to the weekend', saved: 'Saved', saving: 'Saving…',
    setup_title: 'Schedule not set up yet', setup_text: 'The card creates a schedule, two temperatures (comfort and eco), a "schedule active" switch and one automation in Home Assistant. The schedule then runs even when the tablet is off.', setup_btn: 'Set up schedule', setup_busy: 'Setting up…', setup_err: 'That did not work: {e}. This needs an administrator account.',
    err: 'Fill in "entity" with a thermostat (climate).',
    l_entity: 'Thermostat', l_name: 'Name', l_schedule: 'Schedule helper (empty = automatic)', l_comfort: 'Comfort temperature (input_number)', l_eco: 'Eco temperature (input_number)', l_active: 'Schedule active (input_boolean)', l_humidity: 'Humidity sensor (optional)', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    l_layout: 'Layout', lay_full: 'Large, with the schedule', lay_compact: 'Small, schedule in a popup',
    description: 'Thermostat with a dial and a weekly comfort/eco schedule.',
  },
  fr: {
    off: 'Arrêt', heating: 'Chauffe à {t}', idle: 'À température', cooling: 'Refroidit à {t}', unavailable: 'Indisponible', now: 'Actuel {t}',
    m_off: 'Arrêt', m_heat: 'Chauffer', m_auto: 'Programme', schedule: 'Programme', colder: 'Plus froid', warmer: 'Plus chaud',
    comfort: 'Confort', eco: 'Éco', on: 'Activé', sched_off: 'Programme désactivé', comfort_until: 'Confort jusqu\'à {t}, puis {e}', eco_until: 'Éco jusqu\'à {t}, puis {c}', eco_all: 'Pas de confort aujourd\'hui',
    days: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'], days_long: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    until: 'à', add_block: '+ Ajouter un bloc', remove: 'Supprimer', copy_week: 'Copier sur la semaine', copy_weekend: 'Copier sur le week-end', saved: 'Enregistré', saving: 'Enregistrement…',
    setup_title: 'Programme pas encore configuré', setup_text: 'La carte crée dans Home Assistant un programme, deux températures (confort et éco), un interrupteur « programme actif » et une automatisation. Le programme tourne ensuite même si la tablette est éteinte.', setup_btn: 'Configurer le programme', setup_busy: 'Configuration…', setup_err: 'Échec : {e}. Un compte administrateur est nécessaire.',
    err: 'Renseignez "entity" avec un thermostat (climate).',
    l_entity: 'Thermostat', l_name: 'Nom', l_schedule: 'Programme (vide = automatique)', l_comfort: 'Température confort (input_number)', l_eco: 'Température éco (input_number)', l_active: 'Programme actif (input_boolean)', l_humidity: 'Capteur d\'humidité (optionnel)', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    l_layout: 'Affichage', lay_full: 'Grand, avec le programme', lay_compact: 'Petit, programme dans un popup',
    description: 'Thermostat avec molette et programme hebdomadaire confort/éco.',
  },
  de: {
    off: 'Aus', heating: 'Heizt auf {t}', idle: 'Temperatur erreicht', cooling: 'Kühlt auf {t}', unavailable: 'Nicht verfügbar', now: 'Jetzt {t}',
    m_off: 'Aus', m_heat: 'Heizen', m_auto: 'Zeitplan', schedule: 'Zeitplan', colder: 'Kälter', warmer: 'Wärmer',
    comfort: 'Komfort', eco: 'Spar', on: 'An', sched_off: 'Zeitplan ist aus', comfort_until: 'Komfort bis {t}, dann {e}', eco_until: 'Spar bis {t}, dann {c}', eco_all: 'Heute keine Komfortblöcke',
    days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'], days_long: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    until: 'bis', add_block: '+ Block hinzufügen', remove: 'Entfernen', copy_week: 'Auf alle Werktage kopieren', copy_weekend: 'Aufs Wochenende kopieren', saved: 'Gespeichert', saving: 'Speichern…',
    setup_title: 'Zeitplan noch nicht eingerichtet', setup_text: 'Die Karte legt in Home Assistant einen Zeitplan, zwei Temperaturen (Komfort und Spar), einen Schalter „Zeitplan aktiv“ und eine Automatisierung an. Der Zeitplan läuft dann auch, wenn das Tablet aus ist.', setup_btn: 'Zeitplan einrichten', setup_busy: 'Wird eingerichtet…', setup_err: 'Hat nicht geklappt: {e}. Dafür ist ein Administratorkonto nötig.',
    err: 'Gib unter "entity" einen Thermostat (climate) an.',
    l_entity: 'Thermostat', l_name: 'Name', l_schedule: 'Zeitplan-Helfer (leer = automatisch)', l_comfort: 'Komforttemperatur (input_number)', l_eco: 'Spartemperatur (input_number)', l_active: 'Zeitplan aktiv (input_boolean)', l_humidity: 'Feuchtesensor (optional)', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    l_layout: 'Darstellung', lay_full: 'Groß, mit Zeitplan', lay_compact: 'Klein, Zeitplan im Popup',
    description: 'Thermostat mit Drehregler und Wochenplan für Komfort/Spar.',
  },
  es: {
    off: 'Apagado', heating: 'Calentando a {t}', idle: 'A temperatura', cooling: 'Enfriando a {t}', unavailable: 'No disponible', now: 'Ahora {t}',
    m_off: 'Apagado', m_heat: 'Calentar', m_auto: 'Horario', schedule: 'Horario', colder: 'Más frío', warmer: 'Más calor',
    comfort: 'Confort', eco: 'Ahorro', on: 'Activo', sched_off: 'Horario desactivado', comfort_until: 'Confort hasta las {t}, luego {e}', eco_until: 'Ahorro hasta las {t}, luego {c}', eco_all: 'Hoy sin bloques de confort',
    days: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'], days_long: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    until: 'a', add_block: '+ Añadir bloque', remove: 'Eliminar', copy_week: 'Copiar a días laborables', copy_weekend: 'Copiar al fin de semana', saved: 'Guardado', saving: 'Guardando…',
    setup_title: 'Horario aún no configurado', setup_text: 'La tarjeta crea en Home Assistant un horario, dos temperaturas (confort y ahorro), un interruptor «horario activo» y una automatización. El horario funciona aunque la tableta esté apagada.', setup_btn: 'Configurar horario', setup_busy: 'Configurando…', setup_err: 'No ha funcionado: {e}. Hace falta una cuenta de administrador.',
    err: 'Indica en "entity" un termostato (climate).',
    l_entity: 'Termostato', l_name: 'Nombre', l_schedule: 'Horario (vacío = automático)', l_comfort: 'Temperatura confort (input_number)', l_eco: 'Temperatura ahorro (input_number)', l_active: 'Horario activo (input_boolean)', l_humidity: 'Sensor de humedad (opcional)', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    l_layout: 'Vista', lay_full: 'Grande, con el horario', lay_compact: 'Pequeña, horario en un popup',
    description: 'Termostato con dial y horario semanal de confort/ahorro.',
  },
  it: {
    off: 'Spento', heating: 'Riscalda a {t}', idle: 'In temperatura', cooling: 'Raffredda a {t}', unavailable: 'Non disponibile', now: 'Ora {t}',
    m_off: 'Spento', m_heat: 'Riscalda', m_auto: 'Programma', schedule: 'Programma', colder: 'Più freddo', warmer: 'Più caldo',
    comfort: 'Comfort', eco: 'Eco', on: 'Attivo', sched_off: 'Programma spento', comfort_until: 'Comfort fino alle {t}, poi {e}', eco_until: 'Eco fino alle {t}, poi {c}', eco_all: 'Oggi nessun blocco comfort',
    days: ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'], days_long: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
    until: 'a', add_block: '+ Aggiungi blocco', remove: 'Rimuovi', copy_week: 'Copia sui giorni feriali', copy_weekend: 'Copia sul weekend', saved: 'Salvato', saving: 'Salvataggio…',
    setup_title: 'Programma non ancora configurato', setup_text: 'La scheda crea in Home Assistant un programma, due temperature (comfort ed eco), un interruttore «programma attivo» e un\'automazione. Il programma funziona anche a tablet spento.', setup_btn: 'Configura programma', setup_busy: 'Configurazione…', setup_err: 'Non è riuscito: {e}. Serve un account amministratore.',
    err: 'Indica in "entity" un termostato (climate).',
    l_entity: 'Termostato', l_name: 'Nome', l_schedule: 'Programma (vuoto = automatico)', l_comfort: 'Temperatura comfort (input_number)', l_eco: 'Temperatura eco (input_number)', l_active: 'Programma attivo (input_boolean)', l_humidity: 'Sensore di umidità (opzionale)', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    l_layout: 'Vista', lay_full: 'Grande, con il programma', lay_compact: 'Piccola, programma in un popup',
    description: 'Termostato con manopola e programma settimanale comfort/eco.',
  },
};
const GTH_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };

function gthLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GTH_I18N[l] ? l : 'en';
}
function gthT(lang, key, vars) {
  let s = (GTH_I18N[lang] && GTH_I18N[lang][key]) || GTH_I18N.en[key] || key;
  if (vars && typeof s === 'string') Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gthEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const GTH_DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const GTH_HEAT = '255, 184, 153';
const GTH_CALM = '185, 168, 255';
const GTH_COOL = '142, 197, 255';
const GTH_OFF = '201, 196, 221';
const GTH_INK = (v) => `color-mix(in srgb, rgb(var(${v})), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%))`;
const GTH_LINE = 'var(--glow-border, rgba(255, 255, 255, 0.1))';
const GTH_CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';

// "06:30:00" → 6.5 ; 6.5 → "06:30:00"
const gthH = (s) => { const p = String(s || '0:0').split(':').map((x) => parseInt(x, 10) || 0); return p[0] + p[1] / 60; };
const gthS = (h) => String(Math.floor(h)).padStart(2, '0') + ':' + String(Math.round((h % 1) * 60)).padStart(2, '0') + ':00';
const gthHM = (h) => String(Math.floor(h)).padStart(2, '0') + ':' + String(Math.round((h % 1) * 60)).padStart(2, '0');

const GTH_SCHED_STYLE = `
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .top { display: flex; align-items: center; gap: 12px; }
  .top .t { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .top .n { font-size: 22px; font-weight: 800; }
  .top .s { font-size: 14px; font-weight: 700; opacity: 0.65; }
  .top .s.on { opacity: 1; color: color-mix(in srgb, rgb(${GTH_HEAT}), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .tog { height: 40px; padding: 0 18px; border-radius: 20px; font-size: 14px; font-weight: 800; border: 0; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .tog.on { color: #1C1730; background: rgb(${GTH_HEAT}); box-shadow: 0 0 var(--glow) rgba(${GTH_HEAT}, 0.5); }
  .x { width: 40px; height: 40px; border-radius: 20px; font-size: 18px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GTH_LINE}; }
  .temps { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .tb { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 18px; background: rgba(var(--k), 0.12); border: 1px solid rgba(var(--k), 0.4); }
  .tb .dot { width: 12px; height: 12px; border-radius: 6px; background: rgb(var(--k)); box-shadow: 0 0 8px rgba(var(--k), 0.8); }
  .tb .l { flex: 1; font-size: 15px; font-weight: 800; }
  .tb .v { min-width: 54px; text-align: center; font-size: 18px; font-weight: 800; font-variant-numeric: tabular-nums; }
  .mini { width: 36px; height: 36px; border-radius: 12px; font-size: 18px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GTH_LINE}; flex-shrink: 0; }
  .mini:active { background: rgba(${GTH_HEAT}, 0.3); }
  .scale { display: flex; padding-left: 50px; justify-content: space-between; font-size: 11px; font-weight: 800; opacity: 0.55; }
  .week { display: flex; flex-direction: column; gap: 6px; }
  .day { display: flex; align-items: center; gap: 10px; padding: 4px 6px; border-radius: 12px; border: 1px solid transparent; background: transparent; }
  .day.sel { border-color: rgba(${GTH_HEAT}, 0.5); background: rgba(${GTH_HEAT}, 0.08); }
  .day .dn { width: 34px; text-align: left; font-size: 14px; font-weight: 800; }
  .bar { position: relative; flex: 1; height: 22px; border-radius: 8px; overflow: hidden; background: rgba(${GTH_COOL}, 0.22); }
  .bar i { position: absolute; top: 0; bottom: 0; border-radius: 6px; background: rgb(${GTH_HEAT}); opacity: 0.9; box-shadow: 0 0 8px rgba(${GTH_HEAT}, 0.5); }
  .bar b { position: absolute; top: -2px; bottom: -2px; width: 2px; background: var(--glow-text, #F3F1FA); }
  .inactive .bar { background: rgba(${GTH_COOL}, 0.1); }
  .inactive .bar i { opacity: 0.35; }
  .edit { display: flex; flex-direction: column; gap: 10px; padding: 14px; border-radius: 20px; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .eh { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; }
  .eh .dn { font-size: 16px; font-weight: 800; }
  .link { height: 32px; padding: 0 12px; border-radius: 16px; font-size: 13px; font-weight: 800; background: transparent; border: 1px solid rgba(${GTH_HEAT}, 0.45); color: color-mix(in srgb, rgb(${GTH_HEAT}), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .blk { display: flex; align-items: center; gap: 8px; }
  .blk .tm { min-width: 52px; text-align: center; font-size: 17px; font-weight: 800; font-variant-numeric: tabular-nums; }
  .blk .to { opacity: 0.55; font-weight: 800; }
  .blk .gap { flex: 1; }
  .add { height: 42px; border-radius: 16px; font-size: 14px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px dashed ${GTH_LINE}; }
  .msg { font-size: 13px; font-weight: 700; opacity: 0.6; text-align: right; min-height: 18px; }
  .setup { display: flex; flex-direction: column; gap: 14px; }
  .setup p { margin: 0; font-size: 15px; line-height: 1.45; opacity: 0.8; }
  .go { height: 52px; border-radius: 26px; font-size: 16px; font-weight: 800; color: #1C1730; background: rgb(${GTH_HEAT}); border: 0; box-shadow: 0 0 var(--glow) rgba(${GTH_HEAT}, 0.5); }
  .go[disabled] { opacity: 0.6; }
  .err { font-size: 14px; font-weight: 700; color: #FF8F8F; }
`;

const GTH_STYLE = `
  :host { display: block; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px; padding: 18px; container-type: inline-size;
    border-radius: var(--ha-card-border-radius, 24px); user-select: none; -webkit-user-select: none;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.3); box-shadow: 0 0 calc(var(--glow) * 0.4) rgba(var(--c), 0.15);
    transition: border-color 0.4s, box-shadow 0.4s;
  }
  ha-card.hot { border-color: rgba(var(--c), 0.55); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); }
  .halo { position: absolute; right: -60px; top: -70px; width: 200px; height: 200px; border-radius: 50%; filter: blur(55px); background: rgb(var(--c)); opacity: 0.12; transition: background 0.4s, opacity 0.4s; pointer-events: none; }
  ha-card.hot .halo { opacity: 0.35; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .head { position: relative; display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
  .ht { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .ht .n { font-size: 20px; font-weight: 800; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; }
  .ht .s { font-size: 15px; font-weight: 800; color: ${GTH_INK('--c')}; }
  ha-card.off .ht .s { color: inherit; opacity: 0.65; }
  .sbtn { height: 36px; padding: 0 12px; border-radius: 18px; display: flex; align-items: center; gap: 6px; flex-shrink: 0; font-size: 13px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GTH_LINE}; }
  .sbtn svg { width: 16px; height: 16px; }
  .dial { position: relative; align-self: center; width: 240px; height: 220px; touch-action: none; }
  .dial svg { position: absolute; left: 0; top: 0; width: 240px; height: 240px; overflow: visible; }
  .dial .track { stroke: ${GTH_LINE}; }
  .dial .arc { filter: drop-shadow(0 0 calc(var(--glow) * 0.5) rgba(var(--c), 0.6)); transition: opacity 0.3s; }
  ha-card.off .dial .arc { opacity: 0.25; }
  .dial .knob { fill: #FFFFFF; filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4)); cursor: grab; }
  .dial .cur { fill: var(--glow-text, #F3F1FA); }
  .mid { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding-top: 6px; pointer-events: none; }
  .big { font-size: 48px; font-weight: 800; line-height: 1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  ha-card.off .big { opacity: 0.6; }
  .now { font-size: 14px; font-weight: 700; opacity: 0.65; }
  .steps { position: relative; display: flex; justify-content: center; gap: 18px; margin-top: -10px; }
  .step { width: 56px; height: 56px; border-radius: 28px; font-size: 28px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GTH_LINE}; }
  .step:active { background: rgba(var(--c), 0.25); }
  .seg { position: relative; display: flex; gap: 4px; padding: 4px; border-radius: 19px; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .seg button { flex: 1; height: 42px; border-radius: 15px; border: 0; font-size: 14px; font-weight: 800; background: transparent; transition: background 0.3s, box-shadow 0.3s; }
  .seg button.sel { color: #1C1730; background: rgb(var(--c)); box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(var(--c), 0.6); }
  ha-card.full { padding: 22px; gap: 18px; }
  .cols { position: relative; display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 22px; align-items: start; }
  .lcol { display: flex; flex-direction: column; gap: 12px; }
  .rcol, .sbody { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
  ha-card.full .temps { grid-template-columns: minmax(0, 1fr); }
  ha-card.full .tb { padding: 14px 16px; }
  ha-card.full .tb .v { font-size: 22px; }
  .sbody { position: relative; }
  .sbody .day { padding: 6px; }
  .sbody .bar { height: 28px; }
  .rcol .x, .sbody .x { display: none; }
  @container (max-width: 640px) { .cols { grid-template-columns: minmax(0, 1fr); } }
  @container (max-width: 480px) { .blk { flex-wrap: wrap; row-gap: 6px; } .blk .gap { display: none; } .sbody .bar { height: 24px; } }
  ${GTH_SCHED_STYLE}
  .seg button.sel.offsel { color: inherit; background: color-mix(in srgb, var(--glow-text, #F3F1FA) 16%, transparent); box-shadow: none; }
`;


const GTH_POP_STYLE = `
  :host { all: initial; }
  .backdrop { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;
    background: rgba(8, 6, 16, 0.55); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    font-family: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif); animation: gth-fade 0.2s ease-out; }
  .panel { width: 100%; max-width: 640px; max-height: calc(100vh - 40px); overflow-y: auto; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; padding: 22px; border-radius: 28px;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(${GTH_HEAT}, 0.45); box-shadow: 0 0 50px rgba(${GTH_HEAT}, 0.2), 0 20px 50px rgba(0, 0, 0, 0.4); animation: gth-pop 0.25s cubic-bezier(.2, .9, .3, 1.2); }
${GTH_SCHED_STYLE}
  @media (max-width: 520px) { .temps { grid-template-columns: 1fr; } .blk { flex-wrap: wrap; } }
  .sched { display: flex; flex-direction: column; gap: 16px; }
  @keyframes gth-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes gth-pop { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: none; } }
`;
const GTH_THEME_VARS = ['--glow-card-background', '--glow-text', '--glow-surface', '--glow-border', '--glow-ink-amount', '--paper-font-body1_-_font-family'];

class GlowThermostatCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._built = false;
    this._pending = null;
  }

  static getConfigElement() { return document.createElement('glow-thermostat-card-editor'); }
  static getStubConfig(hass) {
    const c = Object.keys((hass && hass.states) || {}).find((e) => e.startsWith('climate.'));
    return { entity: c || '' };
  }

  setConfig(config) {
    if (!config || !config.entity) throw new Error(gthT(gthLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, ...config };
    this._built = false;
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    this._render();
    if (this._pop) this._renderPopup();
  }
  get hass() { return this._hass; }

  getCardSize() { return this._config && this._config.layout === 'compact' ? 6 : 12; }
  getGridOptions() { return this._config && this._config.layout === 'compact' ? { columns: 6, rows: 'auto', min_columns: 6 } : { columns: 'full', rows: 'auto', min_columns: 6 }; }
  disconnectedCallback() { this._closePopup(); }

  _lang() { return gthLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gthT(this._lang(), k, v); }
  _fmt(v) {
    if (typeof v !== 'number' || isNaN(v)) return '–';
    try { return v.toLocaleString(this._lang(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '°'; } catch (e) { return v.toFixed(1) + '°'; }
  }

  /* ---- helpers van het schema: standaardnamen afgeleid van de thermostaat ---- */

  _ids() {
    const c = this._config;
    const obj = c.entity.split('.')[1];
    return {
      schedule: c.schedule || 'schedule.' + obj + '_schema',
      comfort: c.comfort || 'input_number.' + obj + '_comfort',
      eco: c.eco || 'input_number.' + obj + '_spaarstand',
      active: c.active || 'input_boolean.' + obj + '_schema_actief',
    };
  }
  _hasSchedule() { const i = this._ids(); const st = this._hass.states; return !!(st[i.schedule] && st[i.comfort] && st[i.eco] && st[i.active]); }
  _num(id) { const s = this._hass.states[id]; const v = s ? parseFloat(s.state) : NaN; return isNaN(v) ? null : v; }

  /* ---- kaart ---- */

  _full() { return this._config.layout !== 'compact'; }

  _build() {
    const full = this._full();
    const dial = `
          <div class="head">
            <div class="ht"><span class="n"></span><span class="s"></span></div>
            ${full ? '' : `<button class="sbtn" type="button">${GTH_CAL}<span></span></button>`}
          </div>
          <div class="dial">
            <svg viewBox="0 0 240 240" aria-hidden="true">
              <defs><linearGradient id="gth-arc" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#8EC5FF"/><stop offset="55%" stop-color="#FFE08A"/><stop offset="100%" stop-color="#FFB899"/></linearGradient></defs>
              <path class="track" fill="none" stroke-width="14" stroke-linecap="round"/>
              <path class="arc" fill="none" stroke="url(#gth-arc)" stroke-width="14" stroke-linecap="round"/>
              <circle class="cur" r="4"/>
              <circle class="knob" r="13"/>
            </svg>
            <div class="mid"><span class="big"></span><span class="now"></span></div>
          </div>
          <div class="steps">
            <button class="step" type="button" data-d="-1"></button>
            <button class="step" type="button" data-d="1"></button>
          </div>
          <div class="seg"></div>`;
    this.shadowRoot.innerHTML = `
      <style>${GTH_STYLE}</style>
      <ha-card class="${full ? 'full' : ''}">
        <div class="halo"></div>
        ${full ? `<div class="cols"><div class="lcol">${dial}</div><div class="rcol"></div></div><div class="sbody"></div>` : dial}
      </ha-card>`;
    const r = this.shadowRoot;
    this._card = r.querySelector('ha-card');
    const steps = r.querySelectorAll('.step');
    steps[0].textContent = '−'; steps[0].setAttribute('aria-label', this._t('colder'));
    steps[1].textContent = '+'; steps[1].setAttribute('aria-label', this._t('warmer'));
    steps.forEach((b) => b.addEventListener('click', () => this._nudge(+b.dataset.d)));
    if (r.querySelector('.sbtn')) {
      r.querySelector('.sbtn span').textContent = this._t('schedule');
      r.querySelector('.sbtn').addEventListener('click', () => this._openPopup());
    } else {
      // schema in de kaart zelf
      r.querySelectorAll('.rcol, .sbody').forEach((el) => el.addEventListener('click', (e) => this._popClick(e)));
      this._day = (new Date().getDay() + 6) % 7;
      this._week = null;
    }
    r.querySelector('.ht .n').addEventListener('click', () => this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._config.entity }, bubbles: true, composed: true })));
    r.querySelector('.seg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) this._setMode(b.dataset.m); });
    this._bindDial(r.querySelector('.dial'));
    this._built = true;
    this._builtLang = this._lang();
    this._segKey = null;
    this._popKey = null;
  }

  _range() {
    const a = this._hass.states[this._config.entity].attributes;
    return { min: typeof a.min_temp === 'number' ? a.min_temp : 7, max: typeof a.max_temp === 'number' ? a.max_temp : 30, step: a.target_temp_step || 0.5 };
  }
  _target() {
    if (this._pending !== null) return this._pending;
    const a = this._hass.states[this._config.entity].attributes;
    return typeof a.temperature === 'number' ? a.temperature : null;
  }

  // temperatuur pas na een korte pauze versturen, zodat snel tikken één opdracht wordt
  _setTarget(v) {
    const { min, max, step } = this._range();
    v = Math.round(Math.max(min, Math.min(max, v)) / step) * step;
    this._pending = v;
    this._render();
    clearTimeout(this._sendTimer);
    this._sendTimer = setTimeout(() => {
      this._hass.callService('climate', 'set_temperature', { entity_id: this._config.entity, temperature: v });
      setTimeout(() => { this._pending = null; this._render(); }, 2500);
    }, 800);
  }
  _nudge(d) {
    const t = this._target();
    if (t === null) return;
    this._setTarget(t + d * this._range().step);
  }

  _bindDial(el) {
    const angleTo = (e) => {
      const r = el.querySelector('svg').getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      let a = Math.atan2(y, x) * 180 / Math.PI; // -180..180, 0 = rechts
      a = (a - 135 + 360) % 360; // 0 = begin van de boog
      if (a > 270) a = a > 315 ? 0 : 270;
      const { min, max } = this._range();
      return min + (a / 270) * (max - min);
    };
    let active = false;
    el.addEventListener('pointerdown', (e) => {
      const s = this._hass.states[this._config.entity];
      if (!s || s.state === 'off' || s.state === 'unavailable') return;
      active = true;
      try { el.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      this._setTarget(angleTo(e));
    });
    el.addEventListener('pointermove', (e) => { if (active) this._setTarget(angleTo(e)); });
    const end = () => { active = false; };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  _heatMode() {
    const modes = this._hass.states[this._config.entity].attributes.hvac_modes || ['heat'];
    return modes.includes('heat') ? 'heat' : (modes.find((m) => m !== 'off') || 'heat');
  }

  _schedOn() {
    const i = this._ids();
    return this._hasSchedule() && this._hass.states[i.active].state === 'on';
  }

  _setMode(m) {
    const id = this._config.entity;
    const i = this._ids();
    if (m === 'off') {
      if (this._hasSchedule()) this._hass.callService('input_boolean', 'turn_off', { entity_id: i.active });
      this._hass.callService('climate', 'set_hvac_mode', { entity_id: id, hvac_mode: 'off' });
    } else if (m === 'heat') {
      if (this._hasSchedule()) this._hass.callService('input_boolean', 'turn_off', { entity_id: i.active });
      this._hass.callService('climate', 'set_hvac_mode', { entity_id: id, hvac_mode: this._heatMode() });
    } else if (m === 'auto') {
      if (!this._hasSchedule()) { if (!this._full()) this._openPopup(); return; }
      this._hass.callService('climate', 'set_hvac_mode', { entity_id: id, hvac_mode: this._heatMode() });
      this._hass.callService('input_boolean', 'turn_on', { entity_id: i.active });
    }
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    const c = this._config;
    const s = this._hass.states[c.entity];
    const r = this.shadowRoot;
    const una = !s || s.state === 'unavailable';
    const off = !una && s.state === 'off';
    const a = (s && s.attributes) || {};
    const action = a.hvac_action;
    const heating = !off && !una && (action === 'heating' || action === 'preheating');
    const cooling = !off && !una && action === 'cooling';
    const col = una || off ? GTH_OFF : heating ? GTH_HEAT : cooling ? GTH_COOL : GTH_CALM;
    this._card.style.setProperty('--c', col);
    this._card.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');
    this._card.classList.toggle('hot', heating || cooling);
    this._card.classList.toggle('off', off || una);
    const target = una ? null : this._target();
    const sched = !una && !off && this._schedOn();
    r.querySelector('.ht .n').textContent = c.name || a.friendly_name || c.entity;
    let st;
    if (una) st = this._t('unavailable');
    else if (off) st = this._t('off');
    else if (heating) st = this._t('heating', { t: this._fmt(target) });
    else if (cooling) st = this._t('cooling', { t: this._fmt(target) });
    else st = this._t('idle');
    if (sched) st += ' · ' + this._t('schedule').toLowerCase();
    r.querySelector('.ht .s').textContent = st;

    // draaiknop
    const { min, max } = una ? { min: 7, max: 30 } : this._range();
    const cx = 120, cy = 120, rad = 96;
    const ang = (v) => (135 + (Math.max(min, Math.min(max, v)) - min) / (max - min) * 270) * Math.PI / 180;
    const pt = (an) => [cx + rad * Math.cos(an), cy + rad * Math.sin(an)];
    const arc = (a0, a1) => { const [x0, y0] = pt(a0); const [x1, y1] = pt(a1); return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${rad} ${rad} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`; };
    const a0 = 135 * Math.PI / 180;
    r.querySelector('.track').setAttribute('d', arc(a0, a0 + 1.5 * Math.PI));
    const tv = target === null ? min : target;
    r.querySelector('.arc').setAttribute('d', arc(a0, Math.max(a0 + 0.01, ang(tv))));
    const [kx, ky] = pt(ang(tv));
    const knob = r.querySelector('.knob');
    knob.setAttribute('cx', kx.toFixed(1)); knob.setAttribute('cy', ky.toFixed(1));
    knob.style.opacity = off || una ? 0.35 : 1;
    const cur = typeof a.current_temperature === 'number' ? a.current_temperature : null;
    const curDot = r.querySelector('.cur');
    if (cur !== null) { const [ux, uy] = pt(ang(cur)); curDot.setAttribute('cx', ux.toFixed(1)); curDot.setAttribute('cy', uy.toFixed(1)); curDot.style.display = ''; } else curDot.style.display = 'none';
    r.querySelector('.big').textContent = off ? this._t('off') : this._fmt(target);
    let hum = typeof a.current_humidity === 'number' ? a.current_humidity : null;
    if (c.humidity && this._hass.states[c.humidity]) { const h = parseFloat(this._hass.states[c.humidity].state); if (!isNaN(h)) hum = h; }
    r.querySelector('.now').textContent = cur === null ? '' : this._t('now', { t: this._fmt(cur) }) + (hum !== null ? ' · ' + Math.round(hum) + '%' : '');

    // standen
    const mode = una ? '' : off ? 'off' : sched ? 'auto' : 'heat';
    const seg = ['off', 'heat', 'auto'].map((m) => `<button type="button" data-m="${m}" class="${mode === m ? 'sel' + (m === 'off' ? ' offsel' : '') : ''}">${gthEsc(this._t('m_' + m))}</button>`).join('');
    if (seg !== this._segKey) { this._segKey = seg; r.querySelector('.seg').innerHTML = seg; }
    if (this._full() && !una) this._renderPopup();
  }

  /* ---- schemapopup ---- */

  _openPopup() {
    if (this._pop) return;
    const host = document.createElement('div');
    host.className = 'glow-thermostat-popup';
    const root = host.attachShadow({ mode: 'open' });
    const cs = getComputedStyle(this);
    GTH_THEME_VARS.forEach((v) => { const val = cs.getPropertyValue(v); if (val) host.style.setProperty(v, val.trim()); });
    host.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');
    root.innerHTML = `<style>${GTH_POP_STYLE}</style><div class="backdrop"><div class="panel" role="dialog" aria-modal="true"></div></div>`;
    document.body.appendChild(host);
    this._pop = host;
    this._week = null;
    this._day = (new Date().getDay() + 6) % 7;
    root.querySelector('.backdrop').addEventListener('pointerdown', (e) => { if (e.target.classList.contains('backdrop')) this._closePopup(); });
    root.querySelector('.panel').addEventListener('click', (e) => this._popClick(e));
    this._onKey = (e) => { if (e.key === 'Escape') this._closePopup(); };
    document.addEventListener('keydown', this._onKey);
    this._renderPopup(true);
  }

  _closePopup() {
    if (this._saveTimer) { clearTimeout(this._saveTimer); this._saveWeek(); }
    if (this._onKey) document.removeEventListener('keydown', this._onKey);
    if (this._pop) this._pop.remove();
    this._pop = null;
  }

  // het schema uit Home Assistant halen
  async _loadWeek() {
    try {
      const reg = await this._hass.callWS({ type: 'config/entity_registry/get', entity_id: this._ids().schedule });
      const list = await this._hass.callWS({ type: 'schedule/list' });
      const item = list.find((x) => x.id === reg.unique_id);
      if (!item) throw new Error('schedule not found');
      this._schedItem = item;
      this._week = GTH_DAYS.map((d) => (item[d] || []).map((b) => [gthH(b.from), gthH(b.to) || 24]).sort((x, y) => x[0] - y[0]));
    } catch (e) {
      this._error = e && e.message ? e.message : String(e);
      this._week = GTH_DAYS.map(() => []);
    }
    this._renderPopup(true);
  }

  // blokken sorteren, overlappingen samenvoegen
  _clean(blocks) {
    const out = [];
    blocks.map((b) => [Math.max(0, Math.min(24, b[0])), Math.max(0, Math.min(24, b[1]))]).filter((b) => b[1] > b[0]).sort((x, y) => x[0] - y[0]).forEach((b) => {
      const last = out[out.length - 1];
      if (last && b[0] <= last[1]) last[1] = Math.max(last[1], b[1]);
      else out.push(b.slice());
    });
    return out;
  }

  _queueSave() {
    this._msg = this._t('saving');
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this._saveWeek(), 1200);
  }

  async _saveWeek() {
    this._saveTimer = null;
    if (!this._schedItem || !this._week) return;
    const data = { type: 'schedule/update', schedule_id: this._schedItem.id, name: this._schedItem.name };
    if (this._schedItem.icon) data.icon = this._schedItem.icon;
    GTH_DAYS.forEach((d, i) => { data[d] = this._clean(this._week[i]).map((b) => ({ from: gthS(b[0]), to: b[1] >= 24 ? '24:00:00' : gthS(b[1]) })); });
    try {
      await this._hass.callWS(data);
      this._msg = this._t('saved');
    } catch (e) {
      this._msg = '';
      this._error = e && e.message ? e.message : String(e);
    }
    if (this._pop || this._full()) this._renderPopup(true);
  }

  _popClick(e) {
    const b = e.target.closest('button');
    if (!b) return;
    const act = b.dataset.a;
    const i = this._ids();
    const d = this._day;
    if (act === 'close') { this._closePopup(); return; }
    if (act === 'setup') { this._setup(); return; }
    if (act === 'toggle') {
      const on = this._hass.states[i.active].state === 'on';
      if (!on) this._setMode('auto'); else this._hass.callService('input_boolean', 'turn_off', { entity_id: i.active });
      return;
    }
    if (act === 'temp') {
      const id = b.dataset.k === 'comfort' ? i.comfort : i.eco;
      const s = this._hass.states[id];
      const step = parseFloat(s.attributes.step) || 0.5;
      const v = Math.max(s.attributes.min ?? 5, Math.min(s.attributes.max ?? 30, (this._num(id) || 0) + (+b.dataset.d) * step));
      this._hass.callService('input_number', 'set_value', { entity_id: id, value: v });
      return;
    }
    if (act === 'day') { this._day = +b.dataset.i; this._renderPopup(true); return; }
    if (!this._week) return;
    if (act === 'mv') {
      const blk = this._week[d][+b.dataset.j];
      const k = +b.dataset.k;
      blk[k] = Math.max(0, Math.min(24, blk[k] + (+b.dataset.d) * 0.5));
      if (blk[0] >= blk[1]) { if (k === 0) blk[0] = blk[1] - 0.5; else blk[1] = blk[0] + 0.5; }
    } else if (act === 'rm') this._week[d].splice(+b.dataset.j, 1);
    else if (act === 'add') {
      const last = this._week[d][this._week[d].length - 1];
      const f = last ? Math.min(22, last[1] + 1) : 7;
      this._week[d].push([f, Math.min(24, f + 2)]);
    } else if (act === 'copy') {
      const src = this._clean(this._week[d]);
      (d < 5 ? [0, 1, 2, 3, 4] : [5, 6]).forEach((k) => { this._week[k] = src.map((x) => x.slice()); });
    } else return;
    this._queueSave();
    this._renderPopup(true);
  }

  // huidige toestand van het schema in één zin
  _schedText() {
    const i = this._ids();
    if (this._hass.states[i.active].state !== 'on') return { text: this._t('sched_off'), on: false };
    const now = new Date();
    const h = now.getHours() + now.getMinutes() / 60;
    const blocks = this._week ? this._clean(this._week[(now.getDay() + 6) % 7]) : [];
    const c = this._fmt(this._num(i.comfort));
    const e = this._fmt(this._num(i.eco));
    const inB = blocks.find((b) => h >= b[0] && h < b[1]);
    if (inB) return { text: this._t('comfort_until', { t: gthHM(inB[1] % 24), e }), on: true };
    const next = blocks.find((b) => b[0] > h);
    if (next) return { text: this._t('eco_until', { t: gthHM(next[0]), c }), on: true };
    return { text: this._t('eco_all'), on: true };
  }

  _renderPopup(force) {
    let panel;
    let body = null;
    if (this._full()) {
      if (!this._built) return;
      panel = this.shadowRoot.querySelector('.rcol');
      body = this.shadowRoot.querySelector('.sbody');
    } else {
      const root = this._pop && this._pop.shadowRoot;
      if (!root) return;
      panel = root.querySelector('.panel');
    }
    const name = this._config.name || (this._hass.states[this._config.entity] || { attributes: {} }).attributes.friendly_name || '';
    const close = '<button class="x" type="button" data-a="close" aria-label="×">✕</button>';

    if (!this._hasSchedule()) {
      const html = `
        <div class="top"><div class="t"><span class="n">${gthEsc(this._t('schedule'))} · ${gthEsc(name)}</span></div>${close}</div>
        <div class="setup">
          <span class="n" style="font-size:18px;font-weight:800">${gthEsc(this._t('setup_title'))}</span>
          <p>${gthEsc(this._t('setup_text'))}</p>
          ${this._error ? `<span class="err">${gthEsc(this._t('setup_err', { e: this._error }))}</span>` : ''}
          <button class="go" type="button" data-a="setup"${this._busy ? ' disabled' : ''}>${gthEsc(this._t(this._busy ? 'setup_busy' : 'setup_btn'))}</button>
        </div>`;
      if (html !== this._popKey) { this._popKey = html; panel.innerHTML = html; if (body) body.innerHTML = ''; }
      return;
    }
    if (!this._week && !this._loadingWeek) { this._loadingWeek = true; this._loadWeek().finally(() => { this._loadingWeek = false; }); }

    const i = this._ids();
    const st = this._schedText();
    panel.classList.toggle('inactive', !st.on);
    if (body) body.classList.toggle('inactive', !st.on);
    const days = this._t('days');
    const long = this._t('days_long');
    const today = (new Date().getDay() + 6) % 7;
    const nowPct = ((new Date().getHours() + new Date().getMinutes() / 60) / 24 * 100).toFixed(2);
    const week = this._week || GTH_DAYS.map(() => []);
    const d = this._day;
    const temp = (k, col) => `<div class="tb" style="--k:${col}"><span class="dot"></span><span class="l">${gthEsc(this._t(k))}</span><button class="mini" type="button" data-a="temp" data-k="${k}" data-d="-1">−</button><span class="v">${gthEsc(this._fmt(this._num(k === 'comfort' ? i.comfort : i.eco)))}</span><button class="mini" type="button" data-a="temp" data-k="${k}" data-d="1">+</button></div>`;
    const head = `
      <div class="top">
        <div class="t"><span class="n">${gthEsc(this._t('schedule'))} · ${gthEsc(name)}</span><span class="s${st.on ? ' on' : ''}">${gthEsc(st.text)}</span></div>
        <button class="tog${st.on ? ' on' : ''}" type="button" data-a="toggle">${gthEsc(this._t(st.on ? 'on' : 'off'))}</button>
        ${close}
      </div>
      <div class="temps">${temp('comfort', GTH_HEAT)}${temp('eco', GTH_COOL)}</div>`;
    const rest = `
      <div class="week">
        <div class="scale"><span>0</span><span>6</span><span>12</span><span>18</span><span>24</span></div>
        ${week.map((blocks, k) => `<button class="day${k === d ? ' sel' : ''}" type="button" data-a="day" data-i="${k}"><span class="dn">${gthEsc(days[k])}</span><span class="bar">${this._clean(blocks).map((b) => `<i style="left:${(b[0] / 24 * 100).toFixed(2)}%;width:${((b[1] - b[0]) / 24 * 100).toFixed(2)}%"></i>`).join('')}${k === today ? `<b style="left:${nowPct}%"></b>` : ''}</span></button>`).join('')}
      </div>
      <div class="edit">
        <div class="eh"><span class="dn">${gthEsc(long[d])} · ${gthEsc(this._t('comfort').toLowerCase())}</span><button class="link" type="button" data-a="copy">${gthEsc(this._t(d < 5 ? 'copy_week' : 'copy_weekend'))}</button></div>
        ${week[d].map((b, j) => `<div class="blk">
          <button class="mini" type="button" data-a="mv" data-j="${j}" data-k="0" data-d="-1">−</button><span class="tm">${gthHM(b[0])}</span><button class="mini" type="button" data-a="mv" data-j="${j}" data-k="0" data-d="1">+</button>
          <span class="to">${gthEsc(this._t('until'))}</span>
          <button class="mini" type="button" data-a="mv" data-j="${j}" data-k="1" data-d="-1">−</button><span class="tm">${gthHM(b[1])}</span><button class="mini" type="button" data-a="mv" data-j="${j}" data-k="1" data-d="1">+</button>
          <span class="gap"></span><button class="mini" type="button" data-a="rm" data-j="${j}" aria-label="${gthEsc(this._t('remove'))}">✕</button></div>`).join('')}
        <button class="add" type="button" data-a="add">${gthEsc(this._t('add_block'))}</button>
      </div>
      <span class="msg">${gthEsc(this._error || this._msg || '')}</span>`;
    const html = body ? head + '\u0000' + rest : head + rest;
    if (force || html !== this._popKey) {
      this._popKey = html;
      if (body) { panel.innerHTML = head; body.innerHTML = rest; } else panel.innerHTML = head + rest;
    }
  }

  /* ---- eenmalig instellen ---- */

  async _setup() {
    if (this._busy) return;
    this._busy = true;
    this._error = null;
    this._renderPopup(true);
    const ids = this._ids();
    const obj = this._config.entity.split('.')[1];
    const base = obj.replace(/_/g, ' ');
    const st = this._hass.states;
    const ws = (m) => this._hass.callWS(m);
    try {
      const a = st[this._config.entity].attributes;
      const cur = typeof a.temperature === 'number' ? a.temperature : 20;
      // namen zo kiezen dat Home Assistant de verwachte entiteit-id's maakt
      if (!st[ids.schedule]) {
        const week = {};
        GTH_DAYS.forEach((d, i) => { week[d] = i < 5 ? [{ from: '06:30:00', to: '08:00:00' }, { from: '17:00:00', to: '22:30:00' }] : [{ from: '08:00:00', to: '23:00:00' }]; });
        await ws({ type: 'schedule/create', name: base + ' schema', icon: 'mdi:calendar-clock', ...week });
      }
      if (!st[ids.comfort]) await ws({ type: 'input_number/create', name: base + ' comfort', min: 5, max: 30, step: 0.5, mode: 'box', unit_of_measurement: '°C', icon: 'mdi:sofa', initial: Math.max(cur, 20.5) });
      if (!st[ids.eco]) await ws({ type: 'input_number/create', name: base + ' spaarstand', min: 5, max: 30, step: 0.5, mode: 'box', unit_of_measurement: '°C', icon: 'mdi:leaf', initial: 17 });
      if (!st[ids.active]) await ws({ type: 'input_boolean/create', name: base + ' schema actief', icon: 'mdi:calendar-check' });
      const autoId = 'glow_thermostat_' + obj;
      const tpl = "{{ states('" + ids.comfort + "') | float(20) if is_state('" + ids.schedule + "', 'on') else states('" + ids.eco + "') | float(17) }}";
      await this._hass.callApi('POST', 'config/automation/config/' + autoId, {
        id: autoId,
        alias: 'Glow thermostaat schema (' + this._config.entity + ')',
        description: 'Aangemaakt door de Glow Thermostat Card: zet de comfort- of spaartemperatuur volgens het schema.',
        mode: 'restart',
        triggers: [
          { trigger: 'state', entity_id: ids.schedule },
          { trigger: 'state', entity_id: [ids.comfort, ids.eco] },
          { trigger: 'state', entity_id: ids.active, to: 'on' },
          { trigger: 'homeassistant', event: 'start' },
        ],
        conditions: [
          { condition: 'state', entity_id: ids.active, state: 'on' },
          { condition: 'not', conditions: [{ condition: 'state', entity_id: this._config.entity, state: 'off' }] },
        ],
        actions: [{ action: 'climate.set_temperature', target: { entity_id: this._config.entity }, data: { temperature: tpl } }],
      });
    } catch (e) {
      this._error = (e && (e.message || e.body && e.body.message)) || String(e);
    }
    this._busy = false;
    this._week = null;
    this._renderPopup(true);
  }
}

/* ---------------- editor ---------------- */

class GlowThermostatCardEditor extends HTMLElement {
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
    const lang = gthLang(this._hass, this._config.language);
    const t = (k) => gthT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gthT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.glow === 15) delete v.glow;
        if (v.layout === 'full') delete v.layout;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      { name: 'entity', selector: { entity: { domain: 'climate' } } },
      { name: 'name', selector: { text: {} } },
      { name: 'humidity', selector: { entity: { domain: 'sensor', device_class: 'humidity' } } },
      { name: 'layout', selector: { select: { mode: 'dropdown', options: [{ value: 'full', label: t('lay_full') }, { value: 'compact', label: t('lay_compact') }] } } },
      { type: 'expandable', name: '', flatten: true, title: t('schedule'), schema: [
        { name: 'schedule', selector: { entity: { domain: 'schedule' } } },
        { name: 'comfort', selector: { entity: { domain: 'input_number' } } },
        { name: 'eco', selector: { entity: { domain: 'input_number' } } },
        { name: 'active', selector: { entity: { domain: 'input_boolean' } } },
      ] },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GTH_LANG_NAMES).map((k) => ({ value: k, label: GTH_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, layout: 'full', language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-thermostat-card')) customElements.define('glow-thermostat-card', GlowThermostatCard);
if (!customElements.get('glow-thermostat-card-editor')) customElements.define('glow-thermostat-card-editor', GlowThermostatCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-thermostat-card')) {
  window.customCards.push({
    type: 'glow-thermostat-card',
    name: 'Glow Thermostat Card',
    description: gthT(gthLang(null), 'description'),
    preview: true,
    documentationURL: 'https://github.com/stijnleroy/glow-cards',
  });
}

}

/* ---- salt.js ---- */
{
/*
 * Glow Salt Card
 * Het zoutniveau van de waterontharder: een vat met zout dat leegloopt,
 * een waarschuwing om bij te vullen en een schatting wanneer het op is.
 */

const GSALT_I18N = {
  nl: {
    name: 'Zout', ok: 'Voldoende zout', low: 'Bijvullen', empty: 'Bijna leeg, vul bij', unavailable: 'Niet beschikbaar',
    days_left: 'Nog ongeveer {n} dagen', day_left: 'Nog ongeveer 1 dag', weeks_left: 'Nog ongeveer {n} weken', refilled: 'Bijgevuld op {d}', regen_left: 'Nog {n} regeneraties', ok_short: 'Voldoende', short_d: '± {n} dagen', short_w: '± {n} weken', last_regen: 'Laatste regeneratie {d}', refill_btn: 'Bijgevuld', confirm: 'Zeker?', done: 'Bijgevuld!',
    err: 'Vul "entity" in met de zoutsensor of de helper met het zout in kg.',
    l_entity: 'Zoutsensor (%, afstand of kg)', l_name: 'Naam', l_low: 'Waarschuwen onder (%)', l_empty_distance: 'Afstand als het vat leeg is (cm)', l_full_distance: 'Afstand als het vat vol is (cm)', l_capacity: 'Inhoud van het vat (kg)', l_per_regeneration: 'Zout per regeneratie (kg)', l_regen_days: 'Gemiddeld aantal dagen tussen regeneraties', l_refill_script: 'Script om bij te vullen', l_regen_automation: 'Automatisering die zout aftrekt bij regeneratie', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Zoutniveau van de waterontharder met waarschuwing en schatting wanneer het op is.',
  },
  en: {
    name: 'Salt', ok: 'Enough salt', low: 'Refill', empty: 'Almost empty, refill', unavailable: 'Unavailable',
    days_left: 'About {n} days left', day_left: 'About 1 day left', weeks_left: 'About {n} weeks left', refilled: 'Refilled on {d}', regen_left: '{n} regenerations left', ok_short: 'Enough', short_d: '± {n} days', short_w: '± {n} weeks', last_regen: 'Last regeneration {d}', refill_btn: 'Refilled', confirm: 'Sure?', done: 'Refilled!',
    err: 'Fill in "entity" with the salt sensor.',
    l_entity: 'Salt sensor (%, distance or kg)', l_name: 'Name', l_low: 'Warn below (%)', l_empty_distance: 'Distance when empty (cm)', l_full_distance: 'Distance when full (cm)', l_capacity: 'Tank capacity (kg)', l_per_regeneration: 'Salt per regeneration (kg)', l_regen_days: 'Average days between regenerations', l_refill_script: 'Refill script', l_regen_automation: 'Automation that subtracts salt on regeneration', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Water softener salt level with a warning and an estimate of when it runs out.',
  },
  fr: {
    name: 'Sel', ok: 'Assez de sel', low: 'À remplir', empty: 'Presque vide, remplissez', unavailable: 'Indisponible',
    days_left: 'Encore environ {n} jours', day_left: 'Encore environ 1 jour', weeks_left: 'Encore environ {n} semaines', refilled: 'Rempli le {d}', regen_left: 'Encore {n} régénérations', ok_short: 'Suffisant', short_d: '± {n} jours', short_w: '± {n} semaines', last_regen: 'Dernière régénération {d}', refill_btn: 'Rempli', confirm: 'Sûr ?', done: 'Rempli !',
    err: 'Renseignez "entity" avec le capteur de sel.',
    l_entity: 'Capteur de sel (% ou distance)', l_name: 'Nom', l_low: 'Alerter sous (%)', l_empty_distance: 'Distance à vide (cm)', l_full_distance: 'Distance à plein (cm)', l_capacity: 'Capacité du bac (kg)', l_per_regeneration: 'Sel par régénération (kg)', l_regen_days: 'Jours en moyenne entre régénérations', l_refill_script: 'Script de remplissage', l_regen_automation: 'Automatisation qui déduit le sel à la régénération', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Niveau de sel de l\'adoucisseur avec alerte et estimation.',
  },
  de: {
    name: 'Salz', ok: 'Genug Salz', low: 'Nachfüllen', empty: 'Fast leer, nachfüllen', unavailable: 'Nicht verfügbar',
    days_left: 'Noch etwa {n} Tage', day_left: 'Noch etwa 1 Tag', weeks_left: 'Noch etwa {n} Wochen', refilled: 'Nachgefüllt am {d}', regen_left: 'Noch {n} Regenerationen', ok_short: 'Genug', short_d: '± {n} Tage', short_w: '± {n} Wochen', last_regen: 'Letzte Regeneration {d}', refill_btn: 'Nachgefüllt', confirm: 'Sicher?', done: 'Nachgefüllt!',
    err: 'Gib unter "entity" den Salzsensor an.',
    l_entity: 'Salzsensor (% oder Abstand)', l_name: 'Name', l_low: 'Warnen unter (%)', l_empty_distance: 'Abstand, wenn leer (cm)', l_full_distance: 'Abstand, wenn voll (cm)', l_capacity: 'Behälterinhalt (kg)', l_per_regeneration: 'Salz pro Regeneration (kg)', l_regen_days: 'Durchschnittliche Tage zwischen Regenerationen', l_refill_script: 'Skript zum Nachfüllen', l_regen_automation: 'Automation, die bei Regeneration Salz abzieht', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Salzstand der Enthärtungsanlage mit Warnung und Schätzung.',
  },
  es: {
    name: 'Sal', ok: 'Sal suficiente', low: 'Rellenar', empty: 'Casi vacío, rellena', unavailable: 'No disponible',
    days_left: 'Quedan unos {n} días', day_left: 'Queda aproximadamente 1 día', weeks_left: 'Quedan unas {n} semanas', refilled: 'Rellenado el {d}', regen_left: 'Quedan {n} regeneraciones', ok_short: 'Suficiente', short_d: '± {n} días', short_w: '± {n} semanas', last_regen: 'Última regeneración {d}', refill_btn: 'Rellenado', confirm: '¿Seguro?', done: '¡Rellenado!',
    err: 'Indica en "entity" el sensor de sal.',
    l_entity: 'Sensor de sal (% o distancia)', l_name: 'Nombre', l_low: 'Avisar por debajo de (%)', l_empty_distance: 'Distancia vacío (cm)', l_full_distance: 'Distancia lleno (cm)', l_capacity: 'Capacidad del depósito (kg)', l_per_regeneration: 'Sal por regeneración (kg)', l_regen_days: 'Días promedio entre regeneraciones', l_refill_script: 'Script de rellenado', l_regen_automation: 'Automatización que resta sal en la regeneración', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Nivel de sal del descalcificador con aviso y estimación.',
  },
  it: {
    name: 'Sale', ok: 'Sale sufficiente', low: 'Da riempire', empty: 'Quasi vuoto, riempi', unavailable: 'Non disponibile',
    days_left: 'Ancora circa {n} giorni', day_left: 'Ancora circa 1 giorno', weeks_left: 'Ancora circa {n} settimane', refilled: 'Riempito il {d}', regen_left: 'Ancora {n} rigenerazioni', ok_short: 'Sufficiente', short_d: '± {n} giorni', short_w: '± {n} settimane', last_regen: 'Ultima rigenerazione {d}', refill_btn: 'Riempito', confirm: 'Sicuro?', done: 'Riempito!',
    err: 'Indica in "entity" il sensore del sale.',
    l_entity: 'Sensore sale (% o distanza)', l_name: 'Nome', l_low: 'Avvisa sotto (%)', l_empty_distance: 'Distanza a vuoto (cm)', l_full_distance: 'Distanza a pieno (cm)', l_capacity: 'Capacità del serbatoio (kg)', l_per_regeneration: 'Sale per rigenerazione (kg)', l_regen_days: 'Giorni medi tra le rigenerazioni', l_refill_script: 'Script di riempimento', l_regen_automation: 'Automazione che sottrae sale alla rigenerazione', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Livello del sale dell\'addolcitore con avviso e stima.',
  },
};
const GSALT_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
function gsaltLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GSALT_I18N[l] ? l : 'en';
}
function gsaltT(lang, key, vars) {
  let s = (GSALT_I18N[lang] && GSALT_I18N[lang][key]) || GSALT_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}

const GSALT_OK = '142, 227, 214';
const GSALT_LOW = '255, 184, 153';
const GSALT_EMPTY = '255, 128, 140';

const GSALT_STYLE = `
  :host { display: block; height: 100%; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; height: 100%; min-height: 112px; padding: 12px 16px 12px 12px;
    border-radius: var(--ha-card-border-radius, 24px); cursor: pointer; user-select: none; -webkit-user-select: none; -webkit-tap-highlight-color: transparent;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.4); box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(var(--c), 0.25);
    background: linear-gradient(rgba(var(--c), 0.06), rgba(var(--c), 0.06)), var(--glow-card-background, #15121F);
    display: flex; align-items: center; gap: 14px; transition: border-color 0.4s, box-shadow 0.4s;
  }
  ha-card.warn { border-color: rgba(var(--c), 0.6); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.4); background: linear-gradient(rgba(var(--c), 0.13), rgba(var(--c), 0.13)), var(--glow-card-background, #15121F); }
  ha-card.unavailable { opacity: 0.5; }
  .halo { position: absolute; left: -40px; bottom: -70px; width: 170px; height: 170px; border-radius: 50%; background: rgb(var(--c)); opacity: 0.3; filter: blur(46px); pointer-events: none; transition: opacity 0.5s, background 0.4s; }
  ha-card.warn .halo { opacity: 0.45; }
  .tank svg { filter: drop-shadow(0 0 calc(var(--glow) * 0.6) rgba(var(--c), 0.45)); }
  .tank { position: relative; flex-shrink: 0; width: 64px; height: 88px; }
  .tank svg { width: 100%; height: 100%; display: block; overflow: visible; }
  .tank .body { fill: var(--glow-surface, rgba(255,255,255,0.07)); stroke: rgba(var(--c), 0.55); stroke-width: 1.5; }
  .tank .lid { fill: var(--glow-border, rgba(255,255,255,0.18)); }
  .tank .salt { transition: y 0.8s ease, height 0.8s ease; }
  .tank .line { stroke: rgb(var(--c)); stroke-width: 2.5; stroke-linecap: round; filter: drop-shadow(0 0 4px rgba(var(--c), 0.9)); transition: y1 0.8s ease, y2 0.8s ease; }
  .txt { position: relative; flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
  .name { font-size: 1.05rem; font-weight: 800; opacity: 0.8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pct { font-size: 2rem; font-weight: 800; line-height: 1.05; font-variant-numeric: tabular-nums; }
  .state { font-size: 0.92rem; font-weight: 800; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pct small { font-size: 0.95rem; font-weight: 800; opacity: 0.55; margin-left: 6px; }
  .reg { font-size: 0.78rem; font-weight: 700; opacity: 0.5; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .reg:empty, .est:empty { display: none; }
  .refill { position: relative; flex-shrink: 0; align-self: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; width: 58px; height: 58px; padding: 0; border-radius: 18px; border: 1px solid rgba(var(--c), 0.35); background: rgba(var(--c), 0.1); color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); font: inherit; font-size: 0.68rem; font-weight: 800; cursor: pointer; -webkit-tap-highlight-color: transparent; transition: background 0.3s, border-color 0.3s, box-shadow 0.3s; }
  .refill svg { width: 20px; height: 20px; }
  .refill.arm, .refill.ok { border-color: rgba(var(--c), 0.7); background: rgba(var(--c), 0.2); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.45); color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .refill[hidden] { display: none; }
  .est { font-size: 0.85rem; font-weight: 700; opacity: 0.65; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
`;

class GlowSaltCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._built = false; }
  static getConfigElement() { return document.createElement('glow-salt-card-editor'); }
  static getStubConfig(hass) {
    const e = Object.keys((hass && hass.states) || {}).find((x) => /^(sensor|input_number|number)\./.test(x) && /salt|zout/i.test(x));
    return { entity: e || '' };
  }
  setConfig(config) {
    if (!config || !config.entity) throw new Error(gsaltT(gsaltLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, low: 25, empty_distance: 50, full_distance: 5, ...config };
    this._built = false;
    this._est = undefined;
    this._rate = null;
    this._histAt = 0;
    if (this._hass) this._render();
  }
  set hass(hass) { this._hass = hass; if (this._config) this._render(); }
  get hass() { return this._hass; }
  getCardSize() { return 2; }
  getGridOptions() { return { columns: 6, rows: 2, min_columns: 4, min_rows: 2 }; }

  _lang() { return gsaltLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gsaltT(this._lang(), k, v); }

  // percentage uit de sensor: rechtstreeks in %, of uit een afstand tot het zout
  _pct(state, unit) {
    const v = parseFloat(state);
    if (isNaN(v)) return null;
    const u = String(unit || '').toLowerCase();
    if (u === '%' || u === '') return Math.max(0, Math.min(100, v));
    if (u === 'kg' || u === 'g' || u === 'lb') { const cap = this._cap(); return cap ? Math.max(0, Math.min(100, v / cap * 100)) : null; }
    let cm = v;
    if (u === 'mm') cm = v / 10;
    else if (u === 'm') cm = v * 100;
    else if (u === 'in') cm = v * 2.54;
    const e = parseFloat(this._config.empty_distance);
    const f = parseFloat(this._config.full_distance);
    if (!(e > f)) return null;
    return Math.max(0, Math.min(100, (e - cm) / (e - f) * 100));
  }

  _isWeight() { const s = this._hass && this._hass.states[this._config.entity]; return !!s && /^(kg|g|lb)$/i.test(String(s.attributes.unit_of_measurement || '')); }
  // inhoud van het vat: uit de instellingen, anders het maximum van de helper
  _cap() {
    const c = parseFloat(this._config.capacity);
    if (c > 0) return c;
    const s = this._hass && this._hass.states[this._config.entity];
    const m = s && parseFloat(s.attributes.max);
    return m > 0 ? m : null;
  }
  // script om bij te vullen en automatisering voor de regeneratie: ingesteld of automatisch gevonden
  _find(domain, re) {
    return Object.keys(this._hass.states).find((x) => x.startsWith(domain + '.') && /zout|salt|waterverzacht|ontharder|softener/i.test(x + ' ' + (this._hass.states[x].attributes.friendly_name || '')) && re.test(x + ' ' + (this._hass.states[x].attributes.friendly_name || '')));
  }
  _script() { const c = this._config.refill_script; return c === false || c === 'none' ? null : c || (this._isWeight() ? this._find('script', /bijvul|vullen|refill|fill/i) : null); }
  _regenAuto() { const c = this._config.regen_automation; return c === false || c === 'none' ? null : c || (this._isWeight() ? this._find('automation', /regener/i) : null); }

  // verbruik schatten uit de geschiedenis sinds de laatste keer bijvullen (één keer per uur)
  _loadHistory() {
    if (this._histAt && Date.now() - this._histAt < 3600000) return;
    if (!this._hass.callApi) return;
    this._histAt = Date.now();
    const start = new Date(Date.now() - 45 * 86400000).toISOString();
    const unit = (this._hass.states[this._config.entity].attributes || {}).unit_of_measurement;
    this._hass.callApi('GET', `history/period/${start}?filter_entity_id=${encodeURIComponent(this._config.entity)}&minimal_response&no_attributes`)
      .then((res) => {
        const pts = ((res && res[0]) || []).map((p) => ({ t: Date.parse(p.last_changed || p.lu * 1000), v: this._pct(p.state ?? p.s, unit) })).filter((p) => p.v !== null && p.t);
        // stapgrootte per regeneratie (in kg): de meest voorkomende daling
        const raw = ((res && res[0]) || []).map((p) => parseFloat(p.state ?? p.s)).filter((v) => !isNaN(v));
        const drops = [];
        for (let i = 1; i < raw.length; i++) { const d = raw[i - 1] - raw[i]; if (d > 0.01) drops.push(Math.round(d * 100) / 100); }
        drops.sort((a, b) => a - b);
        this._step = drops.length ? drops[Math.floor(drops.length / 2)] : null;
        // te weinig geschiedenis (Home Assistant bewaart standaard 10 dagen)
        if (pts.length < 3 || drops.length < 2 && this._isWeight()) { this._rate = null; this._est = null; return; }
        // laatste bijvulling: een sprong van meer dan 15% omhoog
        let from = 0;
        for (let i = 1; i < pts.length; i++) if (pts[i].v - pts[i - 1].v > 15) from = i;
        this._refill = from > 0 ? pts[from].t : null;
        const seg = pts.slice(from);
        const first = seg[0];
        const last = seg[seg.length - 1];
        const days = (last.t - first.t) / 86400000;
        const used = first.v - last.v;
        // verbruik in % per dag; de schatting zelf rekent met de huidige stand
        this._rate = days >= 2 && used > 1 ? used / days : null;
        this._est = this._rate ? 1 : null;
      })
      .catch(() => { this._est = null; })
      .finally(() => this._render());
  }

  _build() {
    this.shadowRoot.innerHTML = `
      <style>${GSALT_STYLE}</style>
      <ha-card>
        <div class="halo"></div>
        <div class="tank">
          <svg viewBox="0 0 64 88" aria-hidden="true">
            <defs>
              <pattern id="gsalt-grain" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
                <rect width="9" height="9" fill="#F4F2FA"/>
                <rect x="1" y="1" width="3" height="3" rx="0.6" fill="#DCD8EA"/>
                <rect x="5.5" y="4.5" width="2.5" height="2.5" rx="0.6" fill="#E7E4F2"/>
                <rect x="2" y="6" width="2" height="2" rx="0.5" fill="#FFFFFF"/>
              </pattern>
              <clipPath id="gsalt-clip"><rect x="6" y="12" width="52" height="72" rx="10"/></clipPath>
            </defs>
            <rect class="body" x="6" y="12" width="52" height="72" rx="10"/>
            <g clip-path="url(#gsalt-clip)"><rect class="salt" x="6" y="84" width="52" height="0" fill="url(#gsalt-grain)"/></g>
            <line class="line" x1="10" x2="54" y1="84" y2="84"/>
            <rect class="lid" x="2" y="4" width="60" height="9" rx="4.5"/>
          </svg>
        </div>
        <div class="txt"><span class="name"></span><span class="pct"></span><span class="state"></span><span class="est"></span><span class="reg"></span></div>
        <button class="refill" type="button" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v10m-4-4 4 4 4-4"/><path d="M5 15v3a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-3"/></svg><span></span></button>
      </ha-card>`;
    this._card = this.shadowRoot.querySelector('ha-card');
    this._btn = this.shadowRoot.querySelector('.refill');
    this._btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sc = this._script();
      if (!sc) return;
      clearTimeout(this._armT);
      if (!this._armed) { this._armed = true; this._armT = setTimeout(() => { this._armed = false; this._render(); }, 3000); this._render(); return; }
      this._armed = false;
      const [d] = sc.split('.');
      this._hass.callService(d === 'script' ? 'script' : d, d === 'script' || d === 'automation' ? (d === 'script' ? 'turn_on' : 'trigger') : 'press', { entity_id: sc });
      this._done = Date.now();
      this._histAt = 0;
      setTimeout(() => this._render(), 2600);
      this._render();
    });
    this._card.addEventListener('click', () => this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._config.entity }, bubbles: true, composed: true })));
    this._built = true;
    this._builtLang = this._lang();
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    const c = this._config;
    const s = this._hass.states[c.entity];
    const r = this.shadowRoot;
    const una = !s || s.state === 'unavailable' || s.state === 'unknown';
    const p = una ? null : this._pct(s.state, s.attributes.unit_of_measurement);
    const low = parseFloat(c.low) || 25;
    const level = p === null ? 'na' : p < low / 2 ? 'empty' : p < low ? 'low' : 'ok';
    const col = level === 'empty' ? GSALT_EMPTY : level === 'low' ? GSALT_LOW : GSALT_OK;
    this._card.style.setProperty('--c', col);
    this._card.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');
    this._card.classList.toggle('warn', level === 'low' || level === 'empty');
    this._card.classList.toggle('unavailable', una);
    r.querySelector('.name').textContent = c.name || (s && s.attributes.friendly_name) || this._t('name');
    const kg = this._isWeight() && !una;
    if (kg) {
      const v = parseFloat(s.state);
      const u = s.attributes.unit_of_measurement;
      let vs;
      try { vs = v.toLocaleString(this._lang(), { maximumFractionDigits: 1 }); } catch (e) { vs = String(v); }
      r.querySelector('.pct').innerHTML = `${vs} ${u}${p !== null ? `<small>${Math.round(p)}%</small>` : ''}`;
    } else r.querySelector('.pct').textContent = p === null ? '–' : Math.round(p) + '%';
    r.querySelector('.state').textContent = una ? this._t('unavailable') : p === null ? s.state + ' ' + (s.attributes.unit_of_measurement || '') : this._t(level);

    // het vat: zout van onder (y=84) tot het niveau
    const top = 84 - (p || 0) / 100 * 72;
    const salt = r.querySelector('.salt');
    salt.setAttribute('y', top.toFixed(1));
    salt.setAttribute('height', (84 - top).toFixed(1));
    const line = r.querySelector('.line');
    line.setAttribute('y1', top.toFixed(1)); line.setAttribute('y2', top.toFixed(1));
    line.style.opacity = p === null ? 0 : 1;

    // schatting
    if (!una) this._loadHistory();
    let est = '';
    const step = parseFloat(c.per_regeneration) || this._step;
    const cap = this._cap();
    const rd = parseFloat(c.regen_days);
    // vaste instellingen gaan voor; anders het tempo uit de geschiedenis
    let rate = this._isWeight() && step && rd > 0 && cap ? step / cap * 100 / rd : this._rate;
    // te weinig geschiedenis: rekenen vanaf de laatste keer dat het bijvulscript liep (vat toen vol)
    if (!rate && this._isWeight() && cap && p !== null) {
      const sc = this._script();
      const lt = sc && this._hass.states[sc] && Date.parse(this._hass.states[sc].attributes.last_triggered || '');
      const days = lt ? (Date.now() - lt) / 86400000 : 0;
      if (days >= 2 && p < 99) rate = (100 - p) / days;
    }
    const left = rate && p !== null ? Math.max(0, (p - (this._isWeight() ? 0 : 3)) / rate) : null;
    if (left !== null && left >= 1) {
      const d = Math.round(left);
      est = d > 27 ? this._t('weeks_left', { n: Math.round(d / 7) }) : d === 1 ? this._t('day_left') : this._t('days_left', { n: Math.max(0, d) });
    }
    if (kg) {
      // kg: schatting naast de status, aantal regeneraties eronder
      if (left !== null && left >= 1) {
        const d = Math.round(left);
        r.querySelector('.state').textContent = (level === 'ok' ? this._t('ok_short') : this._t(level)) + ' · ' + (d > 27 ? this._t('short_w', { n: Math.round(d / 7) }) : this._t('short_d', { n: d }));
      }
      est = step > 0 ? this._t('regen_left', { n: Math.floor(parseFloat(s.state) / step + 1e-9) }) : '';
    } else if (est) {
      // niets
    } else if (this._refill) {
      try { est = this._t('refilled', { d: new Date(this._refill).toLocaleDateString(this._lang(), { day: 'numeric', month: 'short' }) }); } catch (e) { est = ''; }
    }
    r.querySelector('.est').textContent = est;
    // laatste regeneratie
    const ra = this._regenAuto();
    const lt = ra && this._hass.states[ra] && this._hass.states[ra].attributes.last_triggered;
    let reg = '';
    if (lt) { try { reg = this._t('last_regen', { d: new Date(lt).toLocaleDateString(this._lang(), { weekday: 'short', day: 'numeric', month: 'short' }) }); } catch (e) { reg = ''; } }
    r.querySelector('.reg').textContent = reg;
    // knop bijgevuld
    const sc = this._script();
    this._btn.hidden = !sc;
    const done = this._done && Date.now() - this._done < 2500;
    this._btn.classList.toggle('arm', !!this._armed);
    this._btn.classList.toggle('ok', !!done);
    this._btn.querySelector('span').textContent = done ? this._t('done') : this._armed ? this._t('confirm') : this._t('refill_btn');
  }
}

class GlowSaltCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._render(); }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = gsaltLang(this._hass, this._config.language);
    const t = (k) => gsaltT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gsaltT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        [['glow', 15], ['low', 25], ['empty_distance', 50], ['full_distance', 5]].forEach(([k, d]) => { if (v[k] === d) delete v[k]; });
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    const s = this._hass.states[this._config.entity];
    const unit = s && String(s.attributes.unit_of_measurement || '');
    const distance = !!unit && unit !== '%' && !/^(kg|g|lb)$/i.test(unit);
    const schema = [
      { name: 'entity', selector: { entity: { domain: ['sensor', 'input_number', 'number'] } } },
      { name: 'name', selector: { text: {} } },
      { name: 'low', selector: { number: { min: 5, max: 60, step: 1, mode: 'slider', unit_of_measurement: '%' } } },
    ];
    if (/^(kg|g|lb)$/i.test(unit || '')) schema.push(
      { type: 'grid', name: '', schema: [
        { name: 'capacity', selector: { number: { min: 1, max: 200, step: 0.5, mode: 'box', unit_of_measurement: unit } } },
        { name: 'per_regeneration', selector: { number: { min: 0.1, max: 20, step: 0.1, mode: 'box', unit_of_measurement: unit } } },
        { name: 'regen_days', selector: { number: { min: 0.5, max: 60, step: 0.5, mode: 'box' } } },
      ] },
      { name: 'refill_script', selector: { entity: { domain: ['script', 'input_button', 'button'] } } },
      { name: 'regen_automation', selector: { entity: { domain: 'automation' } } },
    );
    else if (distance) schema.push({ type: 'grid', name: '', schema: [
      { name: 'empty_distance', selector: { number: { min: 1, max: 300, step: 1, mode: 'box', unit_of_measurement: 'cm' } } },
      { name: 'full_distance', selector: { number: { min: 0, max: 300, step: 1, mode: 'box', unit_of_measurement: 'cm' } } },
    ] });
    schema.push(
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GSALT_LANG_NAMES).map((k) => ({ value: k, label: GSALT_LANG_NAMES[k] }))) } } },
    );
    this._form.schema = schema;
    this._form.data = { glow: 15, low: 25, empty_distance: 50, full_distance: 5, language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-salt-card')) customElements.define('glow-salt-card', GlowSaltCard);
if (!customElements.get('glow-salt-card-editor')) customElements.define('glow-salt-card-editor', GlowSaltCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-salt-card')) {
  window.customCards.push({ type: 'glow-salt-card', name: 'Glow Salt Card', description: gsaltT(gsaltLang(null), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}

}

/* ---- media.js ---- */
{
/*
 * Glow Media Card
 * Wat er speelt, met de hoes, een gloed in de kleur van de hoes, bediening,
 * volume en voortgang. Wisselen tussen meerdere spelers (tv, soundbar, …).
 */

const GMED_I18N = {
  nl: {
    idle: 'Niets aan het spelen', off: 'Uit', unavailable: 'Niet beschikbaar', paused: 'Gepauzeerd', turn_on: 'Aanzetten', turn_off: 'Uitzetten',
    prev: 'Vorige', next: 'Volgende', play: 'Afspelen', pause: 'Pauzeren', mute: 'Geluid uit', volume: 'Volume',
    err: 'Vul "entity" of "entities" in met een mediaspeler.',
    l_entities: 'Mediaspelers', l_name: 'Naam', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Mediakaart met de hoes, een gloed in de kleur van de hoes, bediening en volume.',
  },
  en: {
    idle: 'Nothing playing', off: 'Off', unavailable: 'Unavailable', paused: 'Paused', turn_on: 'Turn on', turn_off: 'Turn off',
    prev: 'Previous', next: 'Next', play: 'Play', pause: 'Pause', mute: 'Mute', volume: 'Volume',
    err: 'Fill in "entity" or "entities" with a media player.',
    l_entities: 'Media players', l_name: 'Name', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Media card with the artwork, a glow in its colour, controls and volume.',
  },
  fr: {
    idle: 'Rien en lecture', off: 'Éteint', unavailable: 'Indisponible', paused: 'En pause', turn_on: 'Allumer', turn_off: 'Éteindre',
    prev: 'Précédent', next: 'Suivant', play: 'Lecture', pause: 'Pause', mute: 'Muet', volume: 'Volume',
    err: 'Renseignez "entity" ou "entities" avec un lecteur multimédia.',
    l_entities: 'Lecteurs multimédia', l_name: 'Nom', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Carte multimédia avec pochette, lueur assortie, commandes et volume.',
  },
  de: {
    idle: 'Es läuft nichts', off: 'Aus', unavailable: 'Nicht verfügbar', paused: 'Pausiert', turn_on: 'Einschalten', turn_off: 'Ausschalten',
    prev: 'Zurück', next: 'Weiter', play: 'Abspielen', pause: 'Pause', mute: 'Stumm', volume: 'Lautstärke',
    err: 'Gib "entity" oder "entities" mit einem Mediaplayer an.',
    l_entities: 'Mediaplayer', l_name: 'Name', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Medienkarte mit Cover, Leuchten in dessen Farbe, Steuerung und Lautstärke.',
  },
  es: {
    idle: 'No se reproduce nada', off: 'Apagado', unavailable: 'No disponible', paused: 'En pausa', turn_on: 'Encender', turn_off: 'Apagar',
    prev: 'Anterior', next: 'Siguiente', play: 'Reproducir', pause: 'Pausa', mute: 'Silencio', volume: 'Volumen',
    err: 'Indica "entity" o "entities" con un reproductor.',
    l_entities: 'Reproductores', l_name: 'Nombre', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Tarjeta multimedia con carátula, brillo de su color, controles y volumen.',
  },
  it: {
    idle: 'Niente in riproduzione', off: 'Spento', unavailable: 'Non disponibile', paused: 'In pausa', turn_on: 'Accendi', turn_off: 'Spegni',
    prev: 'Precedente', next: 'Successivo', play: 'Riproduci', pause: 'Pausa', mute: 'Muto', volume: 'Volume',
    err: 'Indica "entity" o "entities" con un lettore multimediale.',
    l_entities: 'Lettori multimediali', l_name: 'Nome', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Scheda multimediale con copertina, bagliore del suo colore, comandi e volume.',
  },
};
const GMED_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
function gmedLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GMED_I18N[l] ? l : 'en';
}
function gmedT(lang, key) { return (GMED_I18N[lang] && GMED_I18N[lang][key]) || GMED_I18N.en[key] || key; }
function gmedEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
const gmedTime = (s) => { s = Math.max(0, Math.floor(s || 0)); const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const x = String(s % 60).padStart(2, '0'); return h ? h + ':' + String(m).padStart(2, '0') + ':' + x : m + ':' + x; };

const GMED_DEFAULT = '185, 168, 255';
const GMED_SVG = (d, fill) => `<svg viewBox="0 0 24 24" ${fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"'}>${d}</svg>`;
const GMED_ICON = {
  prev: GMED_SVG('<path d="M6 5h2v14H6z"/><path d="M20 5v14L9 12z"/>', true),
  next: GMED_SVG('<path d="M16 5h2v14h-2z"/><path d="M4 5v14l11-7z"/>', true),
  play: GMED_SVG('<path d="M7 4.5v15l13-7.5z"/>', true),
  pause: GMED_SVG('<rect x="6" y="4.5" width="4.5" height="15" rx="1.2"/><rect x="13.5" y="4.5" width="4.5" height="15" rx="1.2"/>', true),
  vol: GMED_SVG('<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/>'),
  mute: GMED_SVG('<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/>'),
  power: GMED_SVG('<path d="M12 3v9"/><path d="M6.3 7.2a8 8 0 1 0 11.4 0"/>'),
  note: GMED_SVG('<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>'),
  tv: GMED_SVG('<rect x="3" y="5" width="18" height="12" rx="2.5"/><path d="M8 21h8"/>'),
};

const GMED_STYLE = `
  :host { display: block; }
  ha-card {
    display: block; position: relative; overflow: hidden; box-sizing: border-box; padding: 16px; border-radius: var(--ha-card-border-radius, 24px); container-type: inline-size;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid var(--glow-card-border, rgba(255, 255, 255, 0.08)); user-select: none; -webkit-user-select: none;
    transition: border-color 0.6s, box-shadow 0.6s;
  }
  ha-card.playing { border-color: rgba(var(--c), 0.5); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); }
  .bg { position: absolute; inset: -40px; background-size: cover; background-position: center; filter: blur(40px) saturate(1.3); opacity: 0; transition: opacity 0.8s; pointer-events: none; }
  ha-card.has-art .bg { opacity: 0.28; }
  .tint { position: absolute; inset: 0; background: linear-gradient(120deg, rgba(var(--c), 0.18), transparent 60%); opacity: 0; transition: opacity 0.6s; pointer-events: none; }
  ha-card.playing .tint { opacity: 1; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .players { position: relative; display: flex; gap: 6px; margin-bottom: 12px; overflow-x: auto; scrollbar-width: none; }
  .players:empty { display: none; }
  .players::-webkit-scrollbar { display: none; }
  .pl { height: 30px; padding: 0 12px; border-radius: 15px; flex-shrink: 0; display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid transparent; }
  .pl i { width: 7px; height: 7px; border-radius: 4px; background: var(--glow-border, rgba(255,255,255,0.2)); }
  .pl.live i { background: rgb(var(--c)); box-shadow: 0 0 6px rgba(var(--c), 0.9); }
  .pl.sel { border-color: rgba(var(--c), 0.55); background: rgba(var(--c), 0.16); }
  .main { position: relative; display: flex; gap: 16px; align-items: center; }
  .art { position: relative; width: 112px; height: 112px; flex-shrink: 0; border-radius: 20px; overflow: hidden; cursor: pointer;
    background: var(--glow-surface, rgba(255,255,255,0.07)); display: flex; align-items: center; justify-content: center; transition: box-shadow 0.6s; }
  ha-card.playing .art { box-shadow: 0 0 var(--glow) rgba(var(--c), 0.7), 0 10px 26px rgba(0, 0, 0, 0.35); }
  .art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .art svg { width: 44px; height: 44px; opacity: 0.4; }
  .info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
  .title { font-size: 1.25rem; font-weight: 800; line-height: 1.2; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .artist { font-size: 0.95rem; font-weight: 700; opacity: 0.7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: -6px; }
  .prog { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 800; opacity: 0.85; font-variant-numeric: tabular-nums; }
  .prog .rail { flex: 1; height: 6px; border-radius: 3px; background: var(--glow-border, rgba(255,255,255,0.14)); overflow: hidden; }
  .prog .fill { height: 100%; width: 0; border-radius: 3px; background: rgb(var(--c)); box-shadow: 0 0 8px rgba(var(--c), 0.8); }
  .prog[hidden] { display: none; }
  .ctl { display: flex; align-items: center; gap: 10px; }
  .b { width: 44px; height: 44px; border-radius: 22px; padding: 0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border: 0; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .b svg { width: 20px; height: 20px; }
  .b.big { width: 56px; height: 56px; border-radius: 28px; color: #1C1730; background: rgb(var(--c)); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.7); }
  .b.big svg { width: 26px; height: 26px; }
  .b[hidden] { display: none; }
  .b:active { transform: scale(0.94); }
  .vol { flex: 1; min-width: 80px; display: flex; align-items: center; gap: 8px; }
  .vol .b { width: 38px; height: 38px; background: transparent; }
  .vol .track { flex: 1; height: 32px; display: flex; align-items: center; touch-action: none; cursor: pointer; }
  .vol .rail { position: relative; width: 100%; height: 10px; border-radius: 5px; background: var(--glow-border, rgba(255,255,255,0.14)); }
  .vol .fill { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 5px; background: rgba(var(--c), 0.9); }
  .vol[hidden] { display: none; }
  ha-card.idle .ctl .b:not(.pw), ha-card.idle .vol { display: none; }
  .pw[hidden] { display: none; }
  @container (max-width: 420px) {
    .art { width: 84px; height: 84px; border-radius: 16px; }
    .ctl { flex-wrap: wrap; }
    .vol { flex-basis: 100%; }
  }
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
        let sum = [0, 0, 0];
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          sum[0] += r; sum[1] += g; sum[2] += b;
          const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
          const sat = mx ? (mx - mn) / mx : 0;
          const score = sat * (mx / 255) * (mx > 40 ? 1 : 0.2);
          if (score > bestScore) { bestScore = score; best = [r, g, b]; }
        }
        let c = bestScore > 0.2 ? best : sum.map((x) => Math.round(x / (d.length / 4)));
        // pastel maken, zoals de rest van de Glow-kaarten
        c = c.map((x) => Math.round(x + (255 - x) * 0.35));
        resolve(c.join(', '));
      } catch (e) { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

class GlowMediaCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._built = false; this._sel = null; this._colors = {}; }
  static getConfigElement() { return document.createElement('glow-media-card-editor'); }
  static getStubConfig(hass) {
    const ids = Object.keys((hass && hass.states) || {}).filter((e) => e.startsWith('media_player.'));
    return { entities: ids.slice(0, 2) };
  }
  setConfig(config) {
    const list = Array.isArray(config && config.entities) ? config.entities : config && config.entity ? [config.entity] : [];
    if (!list.length) throw new Error(gmedT(gmedLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, ...config };
    this._list = list.map((e) => (typeof e === 'string' ? { entity: e } : e)).filter((e) => e && e.entity);
    this._built = false;
    if (this._hass) this._render();
  }
  set hass(hass) { this._hass = hass; if (this._config) this._render(); }
  get hass() { return this._hass; }
  getCardSize() { return 3; }
  getGridOptions() { return { columns: 12, rows: 'auto', min_columns: 6 }; }
  connectedCallback() { clearInterval(this._tick); this._tick = setInterval(() => this._progress(), 1000); }
  disconnectedCallback() { clearInterval(this._tick); }

  _lang() { return gmedLang(this._hass, this._config && this._config.language); }
  _t(k) { return gmedT(this._lang(), k); }

  // de gekozen speler, of anders de eerste die speelt
  _current() {
    const st = this._hass.states;
    const ok = this._list.filter((x) => st[x.entity]);
    if (this._sel && ok.some((x) => x.entity === this._sel)) return this._sel;
    const playing = ok.find((x) => st[x.entity].state === 'playing') || ok.find((x) => st[x.entity].state === 'paused') || ok.find((x) => !['off', 'unavailable', 'standby'].includes(st[x.entity].state));
    return (playing || ok[0] || {}).entity;
  }

  _call(svc, data) { this._hass.callService('media_player', svc, { entity_id: this._cur, ...(data || {}) }); }

  _build() {
    this.shadowRoot.innerHTML = `
      <style>${GMED_STYLE}</style>
      <ha-card>
        <div class="bg"></div><div class="tint"></div>
        <div class="players"></div>
        <div class="main">
          <div class="art"></div>
          <div class="info">
            <span class="title"></span>
            <span class="artist"></span>
            <div class="prog" hidden><span class="pos"></span><div class="rail"><div class="fill"></div></div><span class="dur"></span></div>
            <div class="ctl">
              <button class="b pw" type="button" data-a="power">${GMED_ICON.power}</button>
              <button class="b" type="button" data-a="prev" aria-label="${gmedEsc(this._t('prev'))}">${GMED_ICON.prev}</button>
              <button class="b big" type="button" data-a="play"></button>
              <button class="b" type="button" data-a="next" aria-label="${gmedEsc(this._t('next'))}">${GMED_ICON.next}</button>
              <div class="vol">
                <button class="b" type="button" data-a="mute" aria-label="${gmedEsc(this._t('mute'))}"></button>
                <div class="track" aria-label="${gmedEsc(this._t('volume'))}"><div class="rail"><div class="fill"></div></div></div>
              </div>
            </div>
          </div>
        </div>
      </ha-card>`;
    const r = this.shadowRoot;
    this._card = r.querySelector('ha-card');
    r.querySelector('.players').addEventListener('click', (e) => { const b = e.target.closest('.pl'); if (b) { this._sel = b.dataset.e; this._render(); } });
    r.querySelector('.art').addEventListener('click', () => this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._cur }, bubbles: true, composed: true })));
    r.querySelector('.ctl').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || !this._cur) return;
      const s = this._hass.states[this._cur];
      const a = b.dataset.a;
      if (a === 'play') this._call(s.state === 'playing' ? 'media_pause' : 'media_play');
      else if (a === 'prev') this._call('media_previous_track');
      else if (a === 'next') this._call('media_next_track');
      else if (a === 'mute') this._call('volume_mute', { is_volume_muted: !s.attributes.is_volume_muted });
      else if (a === 'power') this._call(['off', 'standby'].includes(s.state) ? 'turn_on' : 'turn_off');
    });
    // volume: slepen, versturen bij loslaten
    const track = r.querySelector('.vol .track');
    const fill = r.querySelector('.vol .fill');
    const pct = (e) => { const b = track.getBoundingClientRect(); return Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)); };
    let drag = false;
    track.addEventListener('pointerdown', (e) => { drag = true; this._volDrag = true; try { track.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ } fill.style.width = pct(e) * 100 + '%'; });
    track.addEventListener('pointermove', (e) => { if (drag) fill.style.width = pct(e) * 100 + '%'; });
    track.addEventListener('pointerup', (e) => { if (!drag) return; drag = false; const v = Math.round(pct(e) * 100) / 100; this._call('volume_set', { volume_level: v }); setTimeout(() => { this._volDrag = false; }, 1500); });
    track.addEventListener('pointercancel', () => { drag = false; this._volDrag = false; });
    this._built = true;
    this._builtLang = this._lang();
    this._keys = {};
  }

  _progress() {
    if (!this._built || !this._hass || !this._cur) return;
    const s = this._hass.states[this._cur];
    const r = this.shadowRoot;
    const prog = r.querySelector('.prog');
    const a = s && s.attributes;
    if (!a || !a.media_duration || a.media_position === undefined) { prog.hidden = true; return; }
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
    this._cur = this._current();
    const s = this._cur && st[this._cur];
    const a = (s && s.attributes) || {};
    const state = s ? s.state : 'unavailable';
    const active = state === 'playing' || state === 'paused' || state === 'buffering';
    const f = a.supported_features || 0;
    this._card.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');

    // spelers
    const chips = this._list.length > 1 ? this._list.filter((x) => st[x.entity]).map((x) => {
      const ps = st[x.entity];
      return `<button class="pl${x.entity === this._cur ? ' sel' : ''}${ps.state === 'playing' ? ' live' : ''}" type="button" data-e="${gmedEsc(x.entity)}"><i></i>${gmedEsc(x.name || ps.attributes.friendly_name || x.entity)}</button>`;
    }).join('') : '';
    if (this._keys.chips !== chips) { this._keys.chips = chips; r.querySelector('.players').innerHTML = chips; }

    // hoes en kleur
    const pic = active ? (a.entity_picture_local || a.entity_picture) : null;
    const artKey = pic || (/tv|android|chromecast|shield/i.test(this._cur || '') ? 'tv' : 'note');
    if (this._keys.art !== artKey) {
      this._keys.art = artKey;
      r.querySelector('.art').innerHTML = pic ? `<img alt="" src="${gmedEsc(pic)}">` : GMED_ICON[artKey];
      r.querySelector('.bg').style.backgroundImage = pic ? `url("${pic.replace(/"/g, '%22')}")` : 'none';
      this._card.classList.toggle('has-art', !!pic);
      if (pic && !this._colors[pic]) gmedColor(pic).then((c) => { this._colors[pic] = c || GMED_DEFAULT; this._render(); });
    }
    const col = (pic && this._colors[pic]) || GMED_DEFAULT;
    this._card.style.setProperty('--c', col);
    this._card.classList.toggle('playing', state === 'playing');
    this._card.classList.toggle('idle', !active);

    // tekst
    const name = (this._list.find((x) => x.entity === this._cur) || {}).name || a.friendly_name || this._cur || '';
    let title;
    let sub;
    if (active) {
      title = a.media_title || a.app_name || a.source || name;
      sub = [a.media_artist || a.media_series_title || a.media_album_artist, a.media_artist ? null : a.app_name].filter(Boolean).join(' · ') || name;
      if (state === 'paused') sub = this._t('paused') + ' · ' + sub;
    } else {
      title = name;
      sub = state === 'unavailable' ? this._t('unavailable') : ['off', 'standby'].includes(state) ? this._t('off') : this._t('idle');
    }
    r.querySelector('.title').textContent = title;
    r.querySelector('.artist').textContent = sub;

    // knoppen volgens wat de speler kan
    const play = r.querySelector('[data-a="play"]');
    const playIcon = state === 'playing' ? 'pause' : 'play';
    if (this._keys.play !== playIcon) { this._keys.play = playIcon; play.innerHTML = GMED_ICON[playIcon]; play.setAttribute('aria-label', this._t(playIcon)); }
    play.hidden = !(f & 1 || f & 16384);
    r.querySelector('[data-a="prev"]').hidden = !(f & 16);
    r.querySelector('[data-a="next"]').hidden = !(f & 32);
    const pw = r.querySelector('[data-a="power"]');
    pw.hidden = !(f & 128 || f & 256) || active;
    pw.setAttribute('aria-label', this._t(['off', 'standby'].includes(state) ? 'turn_on' : 'turn_off'));
    const vol = r.querySelector('.vol');
    vol.hidden = !(f & 4);
    const muted = !!a.is_volume_muted;
    const mi = muted ? 'mute' : 'vol';
    if (this._keys.mute !== mi) { this._keys.mute = mi; r.querySelector('[data-a="mute"]').innerHTML = GMED_ICON[mi]; }
    r.querySelector('[data-a="mute"]').hidden = !(f & 8);
    if (!this._volDrag) r.querySelector('.vol .fill').style.width = (muted ? 0 : (a.volume_level || 0) * 100) + '%';
    this._progress();
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
        delete v.entity;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    const simple = (this._config.entities || []).every((x) => typeof x === 'string');
    const ents = this._config.entities || (this._config.entity ? [this._config.entity] : []);
    this._form.schema = [
      ...(simple ? [{ name: 'entities', selector: { entity: { domain: 'media_player', multiple: true } } }] : []),
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GMED_LANG_NAMES).map((k) => ({ value: k, label: GMED_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, language: 'auto', ...this._config, entities: ents };
  }
}

if (!customElements.get('glow-media-card')) customElements.define('glow-media-card', GlowMediaCard);
if (!customElements.get('glow-media-card-editor')) customElements.define('glow-media-card-editor', GlowMediaCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-media-card')) {
  window.customCards.push({ type: 'glow-media-card', name: 'Glow Media Card', description: gmedT(gmedLang(null), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}

}

/* ---- weather.js ---- */
{
/*
 * Glow Weather Card
 * Het weer in de Glow-stijl: een lucht die het weer en het dagdeel volgt,
 * een zonneboog, details, een temperatuurcurve per uur en dagbalken.
 */

const GWX_I18N = {
  nl: {
    feels: 'Voelt als', wind: 'Wind', humidity: 'Vochtigheid', pressure: 'Luchtdruk', precipitation: 'Neerslag', uv: 'UV-index', clouds: 'Bewolking', visibility: 'Zicht', dew: 'Dauwpunt',
    hourly: 'Per uur', daily: 'Komende dagen', today: 'Vandaag', now: 'Nu', sunrise: 'Zonsopgang', sunset: 'Zonsondergang', unavailable: 'Niet beschikbaar',
    c: { 'clear-night': 'Helder', cloudy: 'Bewolkt', exceptional: 'Uitzonderlijk', fog: 'Mist', hail: 'Hagel', lightning: 'Onweer', 'lightning-rainy': 'Onweer met regen', partlycloudy: 'Halfbewolkt', pouring: 'Hevige regen', rainy: 'Regen', snowy: 'Sneeuw', 'snowy-rainy': 'Natte sneeuw', sunny: 'Zonnig', windy: 'Winderig', 'windy-variant': 'Winderig en bewolkt' },
    err: 'Vul "entity" in met een weer-entiteit.',
    l_entity: 'Weer', l_name: 'Naam', l_show_hourly: 'Verwachting per uur', l_show_daily: 'Verwachting per dag', l_show_details: 'Details', l_days: 'Aantal dagen', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Weerkaart met een lucht die het weer volgt, zonneboog, details en verwachting.',
  },
  en: {
    feels: 'Feels like', wind: 'Wind', humidity: 'Humidity', pressure: 'Pressure', precipitation: 'Precipitation', uv: 'UV index', clouds: 'Clouds', visibility: 'Visibility', dew: 'Dew point',
    hourly: 'Hourly', daily: 'Next days', today: 'Today', now: 'Now', sunrise: 'Sunrise', sunset: 'Sunset', unavailable: 'Unavailable',
    c: { 'clear-night': 'Clear', cloudy: 'Cloudy', exceptional: 'Exceptional', fog: 'Fog', hail: 'Hail', lightning: 'Thunderstorm', 'lightning-rainy': 'Thunderstorm and rain', partlycloudy: 'Partly cloudy', pouring: 'Heavy rain', rainy: 'Rain', snowy: 'Snow', 'snowy-rainy': 'Sleet', sunny: 'Sunny', windy: 'Windy', 'windy-variant': 'Windy and cloudy' },
    err: 'Fill in "entity" with a weather entity.',
    l_entity: 'Weather', l_name: 'Name', l_show_hourly: 'Hourly forecast', l_show_daily: 'Daily forecast', l_show_details: 'Details', l_days: 'Number of days', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Weather card with a sky that follows the weather, a sun arc, details and forecast.',
  },
  fr: {
    feels: 'Ressenti', wind: 'Vent', humidity: 'Humidité', pressure: 'Pression', precipitation: 'Précipitations', uv: 'Indice UV', clouds: 'Nuages', visibility: 'Visibilité', dew: 'Point de rosée',
    hourly: 'Par heure', daily: 'Prochains jours', today: 'Aujourd\'hui', now: 'Maint.', sunrise: 'Lever', sunset: 'Coucher', unavailable: 'Indisponible',
    c: { 'clear-night': 'Dégagé', cloudy: 'Nuageux', exceptional: 'Exceptionnel', fog: 'Brouillard', hail: 'Grêle', lightning: 'Orage', 'lightning-rainy': 'Orage et pluie', partlycloudy: 'Partiellement nuageux', pouring: 'Forte pluie', rainy: 'Pluie', snowy: 'Neige', 'snowy-rainy': 'Neige fondue', sunny: 'Ensoleillé', windy: 'Venteux', 'windy-variant': 'Venteux et nuageux' },
    err: 'Renseignez "entity" avec une entité météo.',
    l_entity: 'Météo', l_name: 'Nom', l_show_hourly: 'Prévision horaire', l_show_daily: 'Prévision journalière', l_show_details: 'Détails', l_days: 'Nombre de jours', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Carte météo avec ciel animé, arc solaire, détails et prévisions.',
  },
  de: {
    feels: 'Gefühlt', wind: 'Wind', humidity: 'Luftfeuchte', pressure: 'Luftdruck', precipitation: 'Niederschlag', uv: 'UV-Index', clouds: 'Bewölkung', visibility: 'Sicht', dew: 'Taupunkt',
    hourly: 'Stündlich', daily: 'Nächste Tage', today: 'Heute', now: 'Jetzt', sunrise: 'Sonnenaufgang', sunset: 'Sonnenuntergang', unavailable: 'Nicht verfügbar',
    c: { 'clear-night': 'Klar', cloudy: 'Bewölkt', exceptional: 'Außergewöhnlich', fog: 'Nebel', hail: 'Hagel', lightning: 'Gewitter', 'lightning-rainy': 'Gewitter mit Regen', partlycloudy: 'Teilweise bewölkt', pouring: 'Starkregen', rainy: 'Regen', snowy: 'Schnee', 'snowy-rainy': 'Schneeregen', sunny: 'Sonnig', windy: 'Windig', 'windy-variant': 'Windig und bewölkt' },
    err: 'Gib unter "entity" eine Wetter-Entität an.',
    l_entity: 'Wetter', l_name: 'Name', l_show_hourly: 'Stündliche Vorhersage', l_show_daily: 'Tägliche Vorhersage', l_show_details: 'Details', l_days: 'Anzahl Tage', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Wetterkarte mit Himmel, Sonnenbogen, Details und Vorhersage.',
  },
  es: {
    feels: 'Sensación', wind: 'Viento', humidity: 'Humedad', pressure: 'Presión', precipitation: 'Precipitación', uv: 'Índice UV', clouds: 'Nubes', visibility: 'Visibilidad', dew: 'Punto de rocío',
    hourly: 'Por horas', daily: 'Próximos días', today: 'Hoy', now: 'Ahora', sunrise: 'Amanecer', sunset: 'Atardecer', unavailable: 'No disponible',
    c: { 'clear-night': 'Despejado', cloudy: 'Nublado', exceptional: 'Excepcional', fog: 'Niebla', hail: 'Granizo', lightning: 'Tormenta', 'lightning-rainy': 'Tormenta con lluvia', partlycloudy: 'Parcialmente nublado', pouring: 'Lluvia intensa', rainy: 'Lluvia', snowy: 'Nieve', 'snowy-rainy': 'Aguanieve', sunny: 'Soleado', windy: 'Ventoso', 'windy-variant': 'Ventoso y nublado' },
    err: 'Indica en "entity" una entidad del tiempo.',
    l_entity: 'Tiempo', l_name: 'Nombre', l_show_hourly: 'Previsión por horas', l_show_daily: 'Previsión diaria', l_show_details: 'Detalles', l_days: 'Número de días', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Tarjeta del tiempo con cielo, arco solar, detalles y previsión.',
  },
  it: {
    feels: 'Percepita', wind: 'Vento', humidity: 'Umidità', pressure: 'Pressione', precipitation: 'Precipitazioni', uv: 'Indice UV', clouds: 'Nuvolosità', visibility: 'Visibilità', dew: 'Punto di rugiada',
    hourly: 'Ogni ora', daily: 'Prossimi giorni', today: 'Oggi', now: 'Ora', sunrise: 'Alba', sunset: 'Tramonto', unavailable: 'Non disponibile',
    c: { 'clear-night': 'Sereno', cloudy: 'Nuvoloso', exceptional: 'Eccezionale', fog: 'Nebbia', hail: 'Grandine', lightning: 'Temporale', 'lightning-rainy': 'Temporale con pioggia', partlycloudy: 'Parzialmente nuvoloso', pouring: 'Pioggia forte', rainy: 'Pioggia', snowy: 'Neve', 'snowy-rainy': 'Nevischio', sunny: 'Soleggiato', windy: 'Ventoso', 'windy-variant': 'Ventoso e nuvoloso' },
    err: 'Indica in "entity" un\'entità meteo.',
    l_entity: 'Meteo', l_name: 'Nome', l_show_hourly: 'Previsione oraria', l_show_daily: 'Previsione giornaliera', l_show_details: 'Dettagli', l_days: 'Numero di giorni', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Scheda meteo con cielo, arco solare, dettagli e previsioni.',
  },
};
const GWX_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
function gwxLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GWX_I18N[l] ? l : 'en';
}
function gwxT(lang, key) { return (GWX_I18N[lang] && GWX_I18N[lang][key]) || GWX_I18N.en[key] || key; }
function gwxEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

/* ---- iconen ---- */
const GWX_S = (b) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`;
const GWX_CLOUD = '<path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4 1.6A3.3 3.3 0 0 0 7 18z"/>';
const GWX_CLOUD_HI = '<path d="M7 15h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4 1.6A3.3 3.3 0 0 0 7 15z"/>';
const GWX_ICONS = {
  sun: { c: '255, 214, 120', s: GWX_S('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>') },
  moon: { c: '185, 168, 255', s: GWX_S('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>') },
  partly: { c: '255, 214, 120', s: GWX_S('<path d="M8 3.5v1.2M3.5 8h1.2M4.8 4.8l.9.9M11.2 4.8l-.9.9"/><path d="M5.3 10.4A3.2 3.2 0 0 1 10.6 7"/><path d="M9 20h8a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.5 1.3A2.9 2.9 0 0 0 9 20z"/>') },
  partlynight: { c: '185, 168, 255', s: GWX_S('<path d="M10.5 4.2A3.6 3.6 0 0 0 5 9.4"/><path d="M9 20h8a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.5 1.3A2.9 2.9 0 0 0 9 20z"/>') },
  cloud: { c: '201, 196, 221', s: GWX_S(GWX_CLOUD) },
  rain: { c: '142, 197, 255', s: GWX_S(GWX_CLOUD_HI + '<path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3"/>') },
  pour: { c: '142, 197, 255', s: GWX_S(GWX_CLOUD_HI + '<path d="M8 17.5l-1.5 4M12 17.5l-1.5 4M16 17.5l-1.5 4M10 17.5l-1.5 4"/>') },
  storm: { c: '185, 168, 255', s: GWX_S(GWX_CLOUD_HI + '<path d="M13 15l-2 3.5h3L12 22"/>') },
  snow: { c: '207, 227, 255', s: GWX_S(GWX_CLOUD_HI + '<path d="M9 19h.01M13 19h.01M17 19h.01M11 22h.01M15 22h.01"/>') },
  fog: { c: '201, 196, 221', s: GWX_S('<path d="M4 9h16M3 13h18M5 17h14"/>') },
  wind: { c: '142, 227, 214', s: GWX_S('<path d="M3 9h11a3 3 0 1 0-3-3"/><path d="M3 15h15a3 3 0 1 1-3 3"/>') },
};
function gwxIcon(cond, night) {
  const m = { sunny: night ? 'moon' : 'sun', 'clear-night': 'moon', partlycloudy: night ? 'partlynight' : 'partly', cloudy: 'cloud', rainy: 'rain', pouring: 'pour', lightning: 'storm', 'lightning-rainy': 'storm', snowy: 'snow', 'snowy-rainy': 'snow', hail: 'snow', fog: 'fog', windy: 'wind', 'windy-variant': 'wind', exceptional: 'cloud' };
  return GWX_ICONS[m[cond] || 'cloud'];
}
const GWX_SMALL = {
  feels: GWX_S('<path d="M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0z"/>'),
  humidity: GWX_S('<path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.4 0z"/>'),
  precipitation: GWX_S('<path d="M8 4l-2 5M13 4l-2 5M18 4l-2 5M8 13l-2 5M13 13l-2 5M18 13l-2 5"/>'),
  pressure: GWX_S('<circle cx="12" cy="13" r="8"/><path d="M12 13l3.5-3.5M8 5.5L6.5 4M16 5.5L17.5 4"/>'),
  uv: GWX_S('<circle cx="12" cy="12" r="3.5"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>'),
  clouds: GWX_S(GWX_CLOUD),
  visibility: GWX_S('<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  dew: GWX_S('<path d="M12 3c3 4 6 7 6 10a6 6 0 0 1-12 0c0-3 3-6 6-10z"/><path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5"/>'),
};

// temperatuur als kleur: koud blauw → mild geel → warm perzik
function gwxTempColor(t) {
  const stops = [[-5, [142, 197, 255]], [8, [185, 168, 255]], [16, [255, 224, 138]], [26, [255, 184, 153]], [34, [255, 128, 140]]];
  if (t <= stops[0][0]) return stops[0][1].join(', ');
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [t0, c0] = stops[i - 1];
      const [t1, c1] = stops[i];
      const k = (t - t0) / (t1 - t0);
      return c0.map((v, j) => Math.round(v + (c1[j] - v) * k)).join(', ');
    }
  }
  return stops[stops.length - 1][1].join(', ');
}

/* ---- lucht ---- */
function gwxSky(cond, phase) {
  const clear = cond === 'sunny' || cond === 'clear-night' || cond === 'partlycloudy';
  const grim = /rain|pour|lightning|hail/.test(cond);
  const snow = /snow/.test(cond);
  const fog = cond === 'fog';
  const g = {
    day: clear ? ['#5FB3F0', '#BFE3FB'] : grim ? ['#5E6E82', '#9AA8B6'] : snow ? ['#AEBDCC', '#E3EAF1'] : fog ? ['#B6BEC6', '#DCE0E4'] : ['#8B9DB1', '#C4CED8'],
    dusk: clear ? ['#4E4592', '#F29E76'] : ['#55506A', '#AD8F89'],
    night: clear ? ['#070D24', '#22305E'] : ['#12161F', '#2B3244'],
  }[phase];
  let html = `<div class="sky-bg" style="background:linear-gradient(170deg,${g[0]},${g[1]})"></div>`;
  if (phase === 'night' && clear) {
    [[8, 20], [22, 55], [36, 18], [55, 40], [68, 14], [82, 48], [92, 24], [46, 70]].forEach(([x, y], i) => {
      html += `<i class="star" style="left:${x}%;top:${y}%;animation-delay:${(i * 0.7) % 3}s"></i>`;
    });
  }
  if (clear || cond === 'cloudy') {
    if (phase === 'day' && clear) html += '<i class="orb sun"></i>';
    else if (phase === 'dusk' && clear) html += '<i class="orb dusk"></i>';
    else if (phase === 'night' && clear) html += '<i class="orb moon"></i>';
  }
  const clouds = { sunny: 0, 'clear-night': 0, partlycloudy: 2, cloudy: 4, fog: 1, windy: 2, 'windy-variant': 4 }[cond] ?? 4;
  // wolken vooral rechts, zodat de temperatuur links leesbaar blijft
  const pos = [[58, 10, 24], [40, 42, 18], [76, 44, 20], [46, 4, 20], [68, 28, 16]];
  const dark = grim || phase === 'night';
  for (let i = 0; i < clouds; i++) {
    const [x, y, w] = pos[i];
    html += `<span class="cloud${dark ? ' dark' : ''}" style="left:${x}%;top:${y}%;width:${w}%;animation-delay:${-i * 2}s"><svg viewBox="0 0 64 30"><path d="M14 28h38a10 10 0 0 0 1-20 14 14 0 0 0-27-2A10 10 0 0 0 14 28z"/></svg></span>`;
  }
  if (grim || snow) {
    for (let i = 0; i < 14; i++) html += `<i class="${snow ? 'flake' : 'drop'}" style="left:${(i * 7.3 + 3) % 100}%;animation-delay:${(i * 0.37) % 1.6}s"></i>`;
  }
  if (fog) html += '<i class="mist" style="top:55%"></i><i class="mist" style="top:72%;animation-delay:-3s"></i>';
  if (/lightning/.test(cond)) html += '<i class="flash"></i>';
  return html;
}

const GWX_STYLE = `
  :host { display: block; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; padding: 16px;
    border-radius: var(--ha-card-border-radius, 24px); container-type: inline-size;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.35); box-shadow: 0 0 calc(var(--glow) * 0.7) rgba(var(--c), 0.2);
  }
  .sky { position: relative; height: 190px; border-radius: 20px; overflow: hidden; color: #FFFFFF; flex-shrink: 0; cursor: pointer; }
  .sky-bg { position: absolute; inset: 0; }
  .star { position: absolute; width: 2px; height: 2px; border-radius: 1px; background: #fff; opacity: 0.8; animation: gwx-twinkle 3s ease-in-out infinite; }
  .orb { position: absolute; border-radius: 50%; }
  .orb.sun { right: 10%; top: 18%; width: 46px; height: 46px; background: #FFE58A; box-shadow: 0 0 40px 14px rgba(255, 229, 138, 0.6); }
  .orb.dusk { right: 14%; top: 58%; width: 50px; height: 50px; background: #FFB46B; box-shadow: 0 0 44px 16px rgba(255, 180, 107, 0.55); }
  .orb.moon { right: 12%; top: 16%; width: 34px; height: 34px; background: #FFF4D6; box-shadow: 0 0 30px 8px rgba(255, 244, 214, 0.45); }
  .cloud { position: absolute; animation: gwx-drift 9s ease-in-out infinite alternate; }
  .cloud svg { display: block; width: 100%; height: auto; fill: rgba(255, 255, 255, 0.92); }
  .cloud.dark svg { fill: rgba(196, 204, 218, 0.75); }
  .drop { position: absolute; top: -10%; width: 2px; height: 14px; border-radius: 1px; background: rgba(214, 232, 255, 0.75); animation: gwx-fall 1.1s linear infinite; }
  .flake { position: absolute; top: -10%; width: 5px; height: 5px; border-radius: 50%; background: #fff; opacity: 0.9; animation: gwx-fall 3.2s linear infinite; }
  .mist { position: absolute; left: -20%; right: -20%; height: 26px; border-radius: 13px; background: rgba(255, 255, 255, 0.45); filter: blur(6px); animation: gwx-drift 8s ease-in-out infinite alternate; }
  .flash { position: absolute; inset: 0; background: #fff; opacity: 0; animation: gwx-flash 7s infinite; }
  .shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(10, 12, 28, 0.45), transparent 70%); }
  .now { position: absolute; left: 20px; top: 16px; bottom: 16px; display: flex; flex-direction: column; justify-content: space-between; text-shadow: 0 1px 10px rgba(0, 0, 0, 0.35); }
  .now .loc { font-size: 15px; font-weight: 800; opacity: 0.9; }
  .now .temp { font-size: 64px; font-weight: 800; line-height: 1; letter-spacing: -0.03em; }
  .now .cond { font-size: 18px; font-weight: 800; }
  .now .hl { font-size: 14px; font-weight: 700; opacity: 0.9; }
  .mid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 14px; align-items: stretch; }
  .arc { position: relative; padding: 12px 14px 10px; border-radius: 20px; background: var(--glow-surface, rgba(255,255,255,0.07)); display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .arc svg { width: 100%; max-width: 260px; height: auto; overflow: visible; }
  .arc .times { width: 100%; max-width: 260px; display: flex; justify-content: space-between; font-size: 13px; font-weight: 800; margin-top: 4px; }
  .arc .times span { display: flex; flex-direction: column; align-items: center; gap: 1px; }
  .arc .times small { font-size: 11px; font-weight: 700; opacity: 0.6; }
  .det { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .d { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 16px; background: var(--glow-surface, rgba(255,255,255,0.07)); min-width: 0; }
  .d .ic { width: 32px; height: 32px; border-radius: 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgba(var(--k), 0.18); color: color-mix(in srgb, rgb(var(--k)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .d .ic svg { width: 17px; height: 17px; }
  .d .tx { display: flex; flex-direction: column; min-width: 0; }
  .d .l { font-size: 11px; font-weight: 800; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .d .v { font-size: 16px; font-weight: 800; white-space: nowrap; font-variant-numeric: tabular-nums; display: flex; align-items: center; gap: 6px; }
  .d .v svg.arrow { width: 14px; height: 14px; }
  .sec { display: flex; flex-direction: column; gap: 8px; }
  .lab { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .hours { overflow-x: auto; scrollbar-width: none; margin: 0 -16px; padding: 0 16px; touch-action: pan-x; }
  .hours::-webkit-scrollbar { display: none; }
  .hours svg { display: block; overflow: visible; }
  .hours .hl { font-size: 12px; font-weight: 800; fill: var(--glow-text, #F3F1FA); opacity: 0.6; }
  .hours .ht { font-size: 14px; font-weight: 800; fill: var(--glow-text, #F3F1FA); }
  .hours .hp { font-size: 11px; font-weight: 800; fill: color-mix(in srgb, rgb(142, 197, 255), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .hours .rain { fill: rgba(142, 197, 255, 0.35); }
  .days { display: flex; flex-direction: column; gap: 4px; }
  .day { display: grid; grid-template-columns: 76px 30px 44px 40px minmax(0, 1fr) 40px; align-items: center; gap: 8px; padding: 6px 4px; border-radius: 12px; }
  .day:first-child { background: var(--glow-surface, rgba(255,255,255,0.05)); }
  .day .dn { font-size: 15px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .day .di { width: 26px; height: 26px; color: color-mix(in srgb, rgb(var(--k)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .day .di svg { width: 26px; height: 26px; }
  .day .dp { font-size: 12px; font-weight: 800; color: color-mix(in srgb, rgb(142, 197, 255), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); text-align: right; }
  .day .lo, .day .hi { font-size: 15px; font-weight: 800; font-variant-numeric: tabular-nums; text-align: right; }
  .day .lo { opacity: 0.6; }
  .day .bar { position: relative; height: 8px; border-radius: 4px; background: var(--glow-surface, rgba(255,255,255,0.08)); }
  .day .bar i { position: absolute; top: 0; bottom: 0; border-radius: 4px; }
  .day .bar b { position: absolute; top: -3px; width: 14px; height: 14px; margin-left: -7px; border-radius: 7px; background: #fff; border: 3px solid var(--glow-card-background, #15121F); box-sizing: border-box; }
  .na { padding: 30px; text-align: center; opacity: 0.6; font-weight: 700; }
  @container (max-width: 520px) {
    .mid { grid-template-columns: minmax(0, 1fr); }
    .day { grid-template-columns: 52px 26px 36px 34px minmax(0, 1fr) 34px; gap: 6px; }
    .now .temp { font-size: 52px; }
  }
  @keyframes gwx-drift { from { transform: translateX(-6px); } to { transform: translateX(10px); } }
  @keyframes gwx-fall { from { transform: translateY(0); } to { transform: translateY(230px); } }
  @keyframes gwx-twinkle { 0%, 100% { opacity: 0.85; } 50% { opacity: 0.3; } }
  @keyframes gwx-flash { 0%, 92%, 96%, 100% { opacity: 0; } 94% { opacity: 0.55; } }
`;

class GlowWeatherCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._built = false; this._fc = { hourly: null, daily: null }; this._subs = {}; }
  static getConfigElement() { return document.createElement('glow-weather-card-editor'); }
  static getStubConfig(hass) { return { entity: Object.keys((hass && hass.states) || {}).find((e) => e.startsWith('weather.')) || '' }; }
  setConfig(config) {
    if (!config || !config.entity) throw new Error(gwxT(gwxLang(this._hass, config && config.language), 'err'));
    const changed = !this._config || this._config.entity !== config.entity;
    this._config = { glow: 15, days: 7, show_hourly: true, show_daily: true, show_details: true, ...config };
    this._built = false;
    if (changed) { this._unsub(); this._fc = { hourly: null, daily: null }; }
    if (this._hass) { this._subscribe(); this._render(); }
  }
  set hass(hass) { this._hass = hass; if (!this._config) return; this._subscribe(); this._render(); }
  get hass() { return this._hass; }
  getCardSize() { return 10; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }
  connectedCallback() { if (this._hass && this._config) this._subscribe(); clearInterval(this._tick); this._tick = setInterval(() => this._render(), 60000); }
  disconnectedCallback() { this._unsub(); clearInterval(this._tick); }

  _lang() { return gwxLang(this._hass, this._config && this._config.language); }
  _t(k) { return gwxT(this._lang(), k); }
  _loc() { return (this._hass && this._hass.locale && this._hass.locale.language) || this._lang(); }

  // verwachting via een abonnement (moderne Home Assistant), anders uit de attributen
  _subscribe() {
    const conn = this._hass && this._hass.connection;
    if (!conn || !conn.subscribeMessage) return;
    ['hourly', 'daily'].forEach((type) => {
      if (this._subs[type]) return;
      this._subs[type] = conn.subscribeMessage((msg) => { this._fc[type] = msg.forecast || []; this._render(); }, { type: 'weather/subscribe_forecast', entity_id: this._config.entity, forecast_type: type })
        .catch(() => { this._fc[type] = this._fc[type] || []; return null; });
    });
  }
  _unsub() {
    Object.values(this._subs).forEach((p) => p && p.then && p.then((u) => typeof u === 'function' && u()).catch(() => {}));
    this._subs = {};
  }

  _phase() {
    const sun = this._hass.states['sun.sun'];
    if (!sun) { const h = new Date().getHours(); return h >= 7 && h < 18 ? 'day' : h >= 18 && h < 20 ? 'dusk' : 'night'; }
    const el = sun.attributes.elevation;
    if (typeof el === 'number') return el > 6 ? 'day' : el > -4 ? 'dusk' : 'night';
    return sun.state === 'above_horizon' ? 'day' : 'night';
  }

  _num(v, d = 0) {
    if (typeof v !== 'number' || isNaN(v)) return '–';
    try { return v.toLocaleString(this._loc(), { maximumFractionDigits: d, minimumFractionDigits: 0 }); } catch (e) { return String(Math.round(v)); }
  }

  _sunTimes() {
    const sun = this._hass.states['sun.sun'];
    if (!sun) return null;
    const nr = Date.parse(sun.attributes.next_rising);
    const ns = Date.parse(sun.attributes.next_setting);
    if (!nr || !ns) return null;
    // vandaag: als de zon op is, dan was de opgang ~een dag voor de volgende opgang
    const up = sun.state === 'above_horizon';
    return up ? { rise: nr - 86400000, set: ns, up } : (ns < nr ? { rise: nr - 86400000, set: ns, up } : { rise: nr, set: ns, up });
  }

  _build() {
    this.shadowRoot.innerHTML = `<style>${GWX_STYLE}</style><ha-card></ha-card>`;
    this._card = this.shadowRoot.querySelector('ha-card');
    this._card.addEventListener('click', (e) => {
      if (e.target.closest('.sky')) this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._config.entity }, bubbles: true, composed: true }));
    });
    this._built = true;
    this._builtLang = this._lang();
    this._key = null;
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._built || this._builtLang !== this._lang()) this._build();
    const c = this._config;
    const s = this._hass.states[c.entity];
    this._card.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');
    if (!s || s.state === 'unavailable') {
      this._card.style.setProperty('--c', '201, 196, 221');
      const html = `<div class="na">${gwxEsc(this._t('unavailable'))}</div>`;
      if (html !== this._key) { this._key = html; this._card.innerHTML = html; }
      return;
    }
    const a = s.attributes;
    const phase = this._phase();
    const night = phase === 'night';
    const tu = a.temperature_unit || '°C';
    const deg = (v) => (typeof v === 'number' ? this._num(v, 0) + '°' : '–');
    const daily = (this._fc.daily || a.forecast || []).slice(0, Math.max(1, parseInt(c.days, 10) || 7));
    const hourly = (this._fc.hourly || []).filter((h) => Date.parse(h.datetime) > Date.now() - 3600000).slice(0, 24);
    const today = daily[0];
    const cond = this._t('c')[s.state] || s.state;
    const icon = gwxIcon(s.state, night);
    this._card.style.setProperty('--c', typeof a.temperature === 'number' ? gwxTempColor(a.temperature) : icon.c);

    // lucht met de huidige toestand
    const hl = today && typeof today.temperature === 'number' ? `↑ ${deg(today.temperature)}  ↓ ${deg(today.templow)}` : '';
    let html = `
      <div class="sky">${gwxSky(s.state, phase)}<div class="shade"></div>
        <div class="now">
          <span class="loc">${gwxEsc(c.name || a.friendly_name || '')}</span>
          <span class="temp">${deg(a.temperature)}</span>
          <div><div class="cond">${gwxEsc(cond)}</div><div class="hl">${gwxEsc(hl)}</div></div>
        </div>
      </div>`;

    // zonneboog en details
    if (c.show_details !== false) {
      const st = this._sunTimes();
      let arc = '';
      if (st) {
        const now = Date.now();
        const k = Math.max(0, Math.min(1, (now - st.rise) / (st.set - st.rise)));
        const ang = Math.PI * (1 - k);
        const cx = 120, cy = 100, r = 86;
        const sx = cx + r * Math.cos(ang), sy = cy - r * Math.sin(ang);
        const tm = (t) => { try { return new Date(t).toLocaleTimeString(this._loc(), { hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } };
        const up = now > st.rise && now < st.set;
        arc = `<div class="arc">
          <svg viewBox="0 0 240 112" aria-hidden="true">
            <defs><linearGradient id="gwx-sun" x1="0" x2="1"><stop offset="0" stop-color="#FFB46B"/><stop offset="0.5" stop-color="#FFE58A"/><stop offset="1" stop-color="#FFB46B"/></linearGradient></defs>
            <path d="M34 100 A86 86 0 0 1 206 100" fill="none" stroke="var(--glow-border, rgba(255,255,255,0.15))" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>
            ${up ? `<path d="M34 100 A86 86 0 0 1 ${sx.toFixed(1)} ${sy.toFixed(1)}" fill="none" stroke="url(#gwx-sun)" stroke-width="4" stroke-linecap="round"/>` : ''}
            <line x1="14" x2="226" y1="100" y2="100" stroke="var(--glow-border, rgba(255,255,255,0.15))" stroke-width="1.5"/>
            ${up ? `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="11" fill="#FFE58A" style="filter:drop-shadow(0 0 10px rgba(255,229,138,0.9))"/>` : `<circle cx="120" cy="100" r="8" fill="#FFF4D6" opacity="0.7"/>`}
          </svg>
          <div class="times"><span>${gwxEsc(tm(st.rise))}<small>${gwxEsc(this._t('sunrise'))}</small></span><span>${gwxEsc(tm(st.set))}<small>${gwxEsc(this._t('sunset'))}</small></span></div>
        </div>`;
      }
      const det = [];
      const add = (k, v, col, extra) => { if (v !== null && v !== undefined && v !== '–') det.push(`<div class="d" style="--k:${col}"><span class="ic">${GWX_SMALL[k] || ''}</span><span class="tx"><span class="l">${gwxEsc(this._t(k))}</span><span class="v">${extra || ''}${gwxEsc(v)}</span></span></div>`); };
      if (typeof a.apparent_temperature === 'number') add('feels', deg(a.apparent_temperature), gwxTempColor(a.apparent_temperature));
      if (typeof a.wind_speed === 'number') {
        const arrow = typeof a.wind_bearing === 'number' ? `<svg class="arrow" viewBox="0 0 24 24" style="transform:rotate(${a.wind_bearing + 180}deg)"><path d="M12 3l6 16-6-4-6 4z" fill="currentColor"/></svg>` : '';
        det.push(`<div class="d" style="--k:142, 227, 214"><span class="ic">${GWX_ICONS.wind.s}</span><span class="tx"><span class="l">${gwxEsc(this._t('wind'))}</span><span class="v">${arrow}${gwxEsc(this._num(a.wind_speed, 0) + ' ' + (a.wind_speed_unit || 'km/h'))}</span></span></div>`);
      }
      if (typeof a.humidity === 'number') add('humidity', this._num(a.humidity, 0) + '%', '142, 197, 255');
      const prec = today && typeof today.precipitation === 'number' ? today.precipitation : null;
      if (prec !== null) add('precipitation', this._num(prec, 1) + ' ' + (a.precipitation_unit || 'mm'), '142, 197, 255');
      if (typeof a.pressure === 'number') add('pressure', this._num(a.pressure, 0) + ' ' + (a.pressure_unit || 'hPa'), '185, 168, 255');
      if (typeof a.uv_index === 'number') add('uv', this._num(a.uv_index, 1), a.uv_index >= 6 ? '255, 184, 153' : '255, 224, 138');
      if (typeof a.cloud_coverage === 'number') add('clouds', this._num(a.cloud_coverage, 0) + '%', '201, 196, 221');
      if (typeof a.dew_point === 'number' && det.length < 8) add('dew', deg(a.dew_point), '142, 197, 255');
      if (arc || det.length) html += `<div class="mid">${arc}<div class="det">${det.slice(0, 6).join('')}</div></div>`;
    }

    // per uur: temperatuurcurve met icoontjes en regenkans
    if (c.show_hourly !== false && hourly.length > 1) {
      const step = 58;
      const w = step * hourly.length;
      const temps = hourly.map((h) => h.temperature);
      const lo = Math.min(...temps), hi = Math.max(...temps);
      const y = (t) => 74 - (hi === lo ? 0.5 : (t - lo) / (hi - lo)) * 34;
      const pts = hourly.map((h, i) => [i * step + step / 2, y(h.temperature)]);
      let d = `M${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1]; const [x1, y1] = pts[i];
        const mx = (x0 + x1) / 2;
        d += ` C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
      }
      const area = d + ` L${pts[pts.length - 1][0]} 96 L${pts[0][0]} 96 Z`;
      const stops = hourly.map((h, i) => `<stop offset="${(i / (hourly.length - 1)).toFixed(3)}" stop-color="rgb(${gwxTempColor(h.temperature)})"/>`).join('');
      const sunMs = this._sunTimes();
      const items = hourly.map((h, i) => {
        const t = new Date(h.datetime);
        const x = i * step + step / 2;
        let label;
        try { label = i === 0 ? this._t('now') : t.toLocaleTimeString(this._loc(), { hour: '2-digit' }).replace(/\s?u$/, ''); } catch (e) { label = String(t.getHours()); }
        const isNight = sunMs ? (() => { const hh = t.getHours() + t.getMinutes() / 60; const r = new Date(sunMs.rise); const st = new Date(sunMs.set); return hh < r.getHours() + r.getMinutes() / 60 || hh > st.getHours() + st.getMinutes() / 60; })() : (t.getHours() < 7 || t.getHours() > 19);
        const ic = gwxIcon(h.condition, isNight);
        const p = typeof h.precipitation_probability === 'number' ? h.precipitation_probability : null;
        const rainH = p ? Math.max(2, p / 100 * 26) : 0;
        return `
          <text class="hl" x="${x}" y="14" text-anchor="middle">${gwxEsc(label)}</text>
          <svg x="${x - 11}" y="20" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: color-mix(in srgb, rgb(${ic.c}), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%))">${ic.s.replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>
          <text class="ht" x="${x}" y="${(pts[i][1] - 10).toFixed(1) * 1 + 44}" text-anchor="middle">${gwxEsc(deg(h.temperature))}</text>
          <circle cx="${x}" cy="${(pts[i][1] + 44).toFixed(1)}" r="3.5" fill="rgb(${gwxTempColor(h.temperature)})"/>
          ${rainH ? `<rect class="rain" x="${x - 12}" y="${166 - rainH}" width="24" height="${rainH}" rx="4"/>` : ''}
          ${p ? `<text class="hp" x="${x}" y="182" text-anchor="middle">${p}%</text>` : ''}`;
      }).join('');
      html += `<div class="sec"><span class="lab">${gwxEsc(this._t('hourly'))}</span><div class="hours"><svg width="${w}" height="188" viewBox="0 0 ${w} 188">
        <defs><linearGradient id="gwx-temp" x1="0" x2="1">${stops}</linearGradient>
        <linearGradient id="gwx-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
        <g transform="translate(0 44)"><path d="${area}" fill="url(#gwx-area)"/><path d="${d}" fill="none" stroke="url(#gwx-temp)" stroke-width="3.5" stroke-linecap="round"/></g>
        ${items}</svg></div></div>`;
    }

    // per dag: temperatuurbalken op één gemeenschappelijke schaal
    if (c.show_daily !== false && daily.length) {
      const los = daily.map((d) => (typeof d.templow === 'number' ? d.templow : d.temperature));
      const his = daily.map((d) => d.temperature);
      const min = Math.min(...los), max = Math.max(...his);
      const span = Math.max(1, max - min);
      const rows = daily.map((d, i) => {
        const t = new Date(d.datetime);
        let name;
        try { name = i === 0 ? this._t('today') : t.toLocaleDateString(this._loc(), { weekday: 'short' }); } catch (e) { name = String(i); }
        const ic = gwxIcon(d.condition, false);
        const lo = typeof d.templow === 'number' ? d.templow : d.temperature;
        const x0 = (lo - min) / span * 100;
        const x1 = (d.temperature - min) / span * 100;
        const p = typeof d.precipitation_probability === 'number' && d.precipitation_probability >= 10 ? d.precipitation_probability + '%' : '';
        const nowMark = i === 0 && typeof a.temperature === 'number' ? `<b style="left:${Math.max(0, Math.min(100, (a.temperature - min) / span * 100)).toFixed(1)}%"></b>` : '';
        return `<div class="day"><span class="dn">${gwxEsc(name.charAt(0).toUpperCase() + name.slice(1))}</span><span class="di" style="--k:${ic.c}">${ic.s}</span><span class="dp">${gwxEsc(p)}</span><span class="lo">${deg(lo)}</span><span class="bar"><i style="left:${x0.toFixed(1)}%;width:${Math.max(3, x1 - x0).toFixed(1)}%;background:linear-gradient(90deg, rgb(${gwxTempColor(lo)}), rgb(${gwxTempColor(d.temperature)}));box-shadow:0 0 8px rgba(${gwxTempColor(d.temperature)}, 0.5)"></i>${nowMark}</span><span class="hi">${deg(d.temperature)}</span></div>`;
      }).join('');
      html += `<div class="sec"><span class="lab">${gwxEsc(this._t('daily'))}</span><div class="days">${rows}</div></div>`;
    }
    void tu;
    if (html !== this._key) {
      const sc = this.shadowRoot.querySelector('.hours');
      const keep = sc ? sc.scrollLeft : 0;
      this._key = html;
      this._card.innerHTML = html;
      const ns = this.shadowRoot.querySelector('.hours');
      if (ns) ns.scrollLeft = keep;
    }
  }
}

class GlowWeatherCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._render(); }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = gwxLang(this._hass, this._config.language);
    const t = (k) => gwxT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gwxT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        [['glow', 15], ['days', 7], ['show_hourly', true], ['show_daily', true], ['show_details', true]].forEach(([k, d]) => { if (v[k] === d) delete v[k]; });
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      { name: 'entity', selector: { entity: { domain: 'weather' } } },
      { name: 'name', selector: { text: {} } },
      { type: 'grid', name: '', schema: [
        { name: 'show_details', selector: { boolean: {} } },
        { name: 'show_hourly', selector: { boolean: {} } },
        { name: 'show_daily', selector: { boolean: {} } },
        { name: 'days', selector: { number: { min: 1, max: 10, step: 1, mode: 'box' } } },
      ] },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GWX_LANG_NAMES).map((k) => ({ value: k, label: GWX_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, days: 7, show_hourly: true, show_daily: true, show_details: true, language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-weather-card')) customElements.define('glow-weather-card', GlowWeatherCard);
if (!customElements.get('glow-weather-card-editor')) customElements.define('glow-weather-card-editor', GlowWeatherCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-weather-card')) {
  window.customCards.push({ type: 'glow-weather-card', name: 'Glow Weather Card', description: gwxT(gwxLang(null), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}

}

/* ---- usage.js ---- */
{
/*
 * Glow Usage Card
 * Verbruik van gas en water (of eender welke meterstand): vandaag, gisteren,
 * deze week en deze maand uit de statistieken van Home Assistant, met staafjes
 * voor de laatste dagen en optioneel de kosten.
 */

const GUSE_I18N = {
  nl: {
    today: 'Vandaag', yesterday: 'Gisteren', week: 'Deze week', month: 'Deze maand', vs: '{d} t.o.v. gisteren', same: 'Zelfde als gisteren', days: 'Laatste {n} dagen', cost: 'Kosten', loading: 'Gegevens laden…', none: 'Nog geen statistieken voor deze meter.',
    gas: 'Gas', water: 'Water', energy: 'Elektriciteit', imp: 'Afname', exp: 'Injectie', net: 'netto',
    err: 'Vul "meters" in met minstens één meter (gas, water, …).',
    l_meters: 'Meters (totale meterstand, bv. gas, water en elektriciteit)', l_name: 'Titel', l_days: 'Aantal dagen in de grafiek', l_gas_price: 'Prijs gas per eenheid (€)', l_water_price: 'Prijs water per eenheid (€)', l_energy_price: 'Prijs elektriciteit per kWh (€)', l_export_price: 'Vergoeding injectie per kWh (€)', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Verbruik van gas en water: vandaag, week, maand en een grafiek van de laatste dagen.',
  },
  en: {
    today: 'Today', yesterday: 'Yesterday', week: 'This week', month: 'This month', vs: '{d} vs yesterday', same: 'Same as yesterday', days: 'Last {n} days', cost: 'Cost', loading: 'Loading data…', none: 'No statistics for this meter yet.',
    gas: 'Gas', water: 'Water', energy: 'Electricity', imp: 'Import', exp: 'Export', net: 'net',
    err: 'Fill in "meters" with at least one meter (gas, water, …).',
    l_meters: 'Meters (total meter reading, e.g. gas, water and electricity)', l_name: 'Title', l_days: 'Days in the chart', l_gas_price: 'Gas price per unit', l_water_price: 'Water price per unit', l_energy_price: 'Electricity price per kWh', l_export_price: 'Export compensation per kWh', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Gas and water usage: today, week, month and a chart of the last days.',
  },
  fr: {
    today: 'Aujourd\'hui', yesterday: 'Hier', week: 'Cette semaine', month: 'Ce mois', vs: '{d} par rapport à hier', same: 'Comme hier', days: '{n} derniers jours', cost: 'Coût', loading: 'Chargement…', none: 'Pas encore de statistiques pour ce compteur.',
    gas: 'Gaz', water: 'Eau', energy: 'Électricité', imp: 'Prélèvement', exp: 'Injection', net: 'net',
    err: 'Renseignez "meters" avec au moins un compteur.',
    l_meters: 'Compteurs (index total, p. ex. gaz et eau)', l_name: 'Titre', l_days: 'Jours dans le graphique', l_gas_price: 'Prix du gaz par unité', l_water_price: 'Prix de l\'eau par unité', l_energy_price: 'Prix de l\'électricité par kWh', l_export_price: 'Rémunération de l\'injection par kWh', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Consommation de gaz et d\'eau : jour, semaine, mois et graphique.',
  },
  de: {
    today: 'Heute', yesterday: 'Gestern', week: 'Diese Woche', month: 'Dieser Monat', vs: '{d} gegenüber gestern', same: 'Wie gestern', days: 'Letzte {n} Tage', cost: 'Kosten', loading: 'Daten laden…', none: 'Noch keine Statistiken für diesen Zähler.',
    gas: 'Gas', water: 'Wasser', energy: 'Strom', imp: 'Bezug', exp: 'Einspeisung', net: 'netto',
    err: 'Gib unter "meters" mindestens einen Zähler an.',
    l_meters: 'Zähler (Gesamtstand, z. B. Gas und Wasser)', l_name: 'Titel', l_days: 'Tage im Diagramm', l_gas_price: 'Gaspreis pro Einheit', l_water_price: 'Wasserpreis pro Einheit', l_energy_price: 'Strompreis pro kWh', l_export_price: 'Einspeisevergütung pro kWh', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Gas- und Wasserverbrauch: heute, Woche, Monat und Diagramm.',
  },
  es: {
    today: 'Hoy', yesterday: 'Ayer', week: 'Esta semana', month: 'Este mes', vs: '{d} respecto a ayer', same: 'Igual que ayer', days: 'Últimos {n} días', cost: 'Coste', loading: 'Cargando datos…', none: 'Aún no hay estadísticas para este contador.',
    gas: 'Gas', water: 'Agua', energy: 'Electricidad', imp: 'Consumo de red', exp: 'Vertido', net: 'neto',
    err: 'Indica en "meters" al menos un contador.',
    l_meters: 'Contadores (lectura total, p. ej. gas y agua)', l_name: 'Título', l_days: 'Días en el gráfico', l_gas_price: 'Precio del gas por unidad', l_water_price: 'Precio del agua por unidad', l_energy_price: 'Precio de la electricidad por kWh', l_export_price: 'Compensación por vertido por kWh', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Consumo de gas y agua: hoy, semana, mes y gráfico.',
  },
  it: {
    today: 'Oggi', yesterday: 'Ieri', week: 'Questa settimana', month: 'Questo mese', vs: '{d} rispetto a ieri', same: 'Come ieri', days: 'Ultimi {n} giorni', cost: 'Costo', loading: 'Caricamento…', none: 'Ancora nessuna statistica per questo contatore.',
    gas: 'Gas', water: 'Acqua', energy: 'Elettricità', imp: 'Prelievo', exp: 'Immissione', net: 'netto',
    err: 'Indica in "meters" almeno un contatore.',
    l_meters: 'Contatori (lettura totale, es. gas e acqua)', l_name: 'Titolo', l_days: 'Giorni nel grafico', l_gas_price: 'Prezzo del gas per unità', l_water_price: 'Prezzo dell\'acqua per unità', l_energy_price: 'Prezzo dell\'elettricità per kWh', l_export_price: 'Compenso per l\'immissione per kWh', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Consumi di gas e acqua: oggi, settimana, mese e grafico.',
  },
};
const GUSE_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
function guseLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GUSE_I18N[l] ? l : 'en';
}
function guseT(lang, key, vars) {
  let s = (GUSE_I18N[lang] && GUSE_I18N[lang][key]) || GUSE_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function guseEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function guseRgb(hex) {
  let h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const v = parseInt(h.slice(0, 6), 16);
  return h.length >= 6 && !isNaN(v) ? ((v >> 16) & 255) + ', ' + ((v >> 8) & 255) + ', ' + (v & 255) : null;
}

const GUSE_KIND = {
  gas: { c: '255, 184, 153', icon: '<path d="M12 3c1 3.5 5 6 5 10.5A5 5 0 0 1 7 13.5C7 11 8.5 9.5 9.5 8c.3 2 1.2 3 2.3 3.4C11.4 8.5 12 5.5 12 3z"/>' },
  water: { c: '142, 197, 255', icon: '<path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.4 0z"/>' },
  energy: { c: '255, 224, 138', icon: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>' },
  other: { c: '185, 168, 255', icon: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>' },
};
const GUSE_SVG = (b) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`;

const GUSE_STYLE = `
  :host { display: block; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: column; gap: 14px; padding: 18px;
    border-radius: var(--ha-card-border-radius, 24px); container-type: inline-size;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.35); box-shadow: 0 0 calc(var(--glow) * 0.7) rgba(var(--c), 0.2); transition: border-color 0.4s, box-shadow 0.4s;
  }
  .halo { position: absolute; right: -70px; top: -80px; width: 220px; height: 220px; border-radius: 50%; filter: blur(60px); background: rgb(var(--c)); opacity: 0.22; pointer-events: none; transition: background 0.4s; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .tabs { position: relative; display: flex; gap: 6px; flex-wrap: wrap; }
  .tab { height: 36px; padding: 0 14px 0 10px; border-radius: 18px; display: flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid transparent; transition: background 0.3s, border-color 0.3s; }
  .tab svg { width: 17px; height: 17px; color: color-mix(in srgb, rgb(var(--k)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .tab.sel { border-color: rgba(var(--k), 0.6); background: rgba(var(--k), 0.16); box-shadow: 0 0 calc(var(--glow) * 0.7) rgba(var(--k), 0.3); }
  .title { position: relative; font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .top { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 14px; align-items: end; }
  .big { display: flex; align-items: center; gap: 14px; min-width: 0; }
  .big .ic { width: 56px; height: 56px; border-radius: 28px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.7); }
  .big .ic svg { width: 28px; height: 28px; }
  .big .tx { display: flex; flex-direction: column; min-width: 0; }
  .big .l { font-size: 13px; font-weight: 800; opacity: 0.65; }
  .big .v { font-size: 38px; font-weight: 800; line-height: 1.05; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .big .v small { font-size: 17px; font-weight: 800; opacity: 0.7; margin-left: 4px; letter-spacing: 0; }
  .big .cmp { font-size: 13px; font-weight: 800; color: color-mix(in srgb, rgb(var(--q)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); white-space: nowrap; }
  .tiles { display: flex; gap: 8px; }
  .tile { display: flex; flex-direction: column; gap: 1px; padding: 10px 14px; border-radius: 16px; background: var(--glow-surface, rgba(255,255,255,0.07)); min-width: 96px; }
  .tile .l { font-size: 11px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; opacity: 0.6; white-space: nowrap; }
  .tile .v { font-size: 18px; font-weight: 800; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .tile .e { font-size: 12px; font-weight: 800; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); white-space: nowrap; }
  .chart { position: relative; display: flex; flex-direction: column; gap: 6px; }
  .bars { position: relative; display: flex; align-items: flex-end; gap: 8px; height: 140px; padding-top: 18px; }
  .col { flex: 1; min-width: 0; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 6px; }
  .col .val { font-size: 11px; font-weight: 800; opacity: 0; transition: opacity 0.2s; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .col .bar { width: 100%; max-width: 46px; min-height: 4px; border-radius: 10px 10px 6px 6px; background: linear-gradient(180deg, rgba(var(--c), 0.75), rgba(var(--c), 0.35)); transition: height 0.6s cubic-bezier(.2, .9, .3, 1); }
  .col.today .bar { background: rgb(var(--c)); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.6); }
  .col.today .val, .col.peak .val, .bars:hover .col .val { opacity: 0.85; }
  .col .dn { font-size: 12px; font-weight: 800; opacity: 0.6; }
  .col.today .dn { opacity: 1; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .avg { position: absolute; left: 0; right: 0; border-top: 2px dashed rgba(var(--c), 0.45); pointer-events: none; }
  .big .xp, .tile .x { font-weight: 800; white-space: nowrap; color: color-mix(in srgb, rgb(var(--x)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .big .xp { font-size: 13px; }
  .tile .x { font-size: 13px; }
  .tile .e.gain { color: color-mix(in srgb, rgb(var(--x)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .pair { width: 100%; max-width: 52px; display: flex; align-items: flex-end; justify-content: center; gap: 3px; }
  .pair .bar { flex: 1; }
  .pair .bar.x { background: linear-gradient(180deg, rgba(var(--x), 0.75), rgba(var(--x), 0.35)); }
  .col.today .pair .bar.x { background: rgb(var(--x)); box-shadow: 0 0 var(--glow) rgba(var(--x), 0.6); }
  .legend { display: inline-flex; gap: 12px; margin-left: 10px; text-transform: none; letter-spacing: 0; }
  .legend i { display: inline-block; width: 9px; height: 9px; border-radius: 3px; margin-right: 5px; background: rgb(var(--c)); }
  .legend i.x { background: rgb(var(--x)); }
  .msg { padding: 24px 8px; text-align: center; font-weight: 700; opacity: 0.6; }
  @container (max-width: 520px) {
    .top { grid-template-columns: minmax(0, 1fr); }
    .tiles { flex-wrap: wrap; }
    .tile { flex: 1; }
    .big .v { font-size: 32px; }
    .bars { gap: 5px; }
  }
`;

class GlowUsageCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._built = false; this._data = {}; this._sel = 0; }
  static getConfigElement() { return document.createElement('glow-usage-card-editor'); }
  static getStubConfig(hass) {
    const st = (hass && hass.states) || {};
    const ids = Object.keys(st).filter((e) => e.startsWith('sensor.') && ['gas', 'water', 'energy'].includes(st[e].attributes.device_class) && st[e].attributes.state_class === 'total_increasing');
    return { meters: ids.slice(0, 3) };
  }
  setConfig(config) {
    const m = Array.isArray(config && config.meters) ? config.meters : config && config.entity ? [config.entity] : [];
    if (!m.length) throw new Error(guseT(guseLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, days: 7, ...config };
    this._meters = m.map((x) => (typeof x === 'string' || Array.isArray(x) ? { entity: x } : x)).filter((x) => x && x.entity && [].concat(x.entity).filter(Boolean).length);
    this._built = false;
    this._data = {};
    this._loadedAt = 0;
    if (this._hass) this._render();
  }
  set hass(hass) { this._hass = hass; if (this._config) this._render(); }
  get hass() { return this._hass; }
  getCardSize() { return 5; }
  getGridOptions() { return { columns: 12, rows: 'auto', min_columns: 6 }; }
  connectedCallback() { clearInterval(this._tick); this._tick = setInterval(() => { this._loadedAt = 0; this._render(); }, 600000); }
  disconnectedCallback() { clearInterval(this._tick); }

  _lang() { return guseLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return guseT(this._lang(), k, v); }
  _loc() { return (this._hass && this._hass.locale && this._hass.locale.language) || this._lang(); }

  // een meter kan uit meerdere sensoren bestaan (bv. dag- en nachttarief), die worden opgeteld
  _ids(m) { return [].concat(m.entity).filter(Boolean); }
  _main(m) { return this._ids(m)[0]; }
  _xids(m) { return [].concat(m.export || []).filter(Boolean); }
  _mkey(m) { return this._ids(m).join(',') + (this._xids(m).length ? '|' + this._xids(m).join(',') : ''); }
  _xprice(m) { const p = typeof m.export_price === 'number' ? m.export_price : this._config.export_price; return typeof p === 'number' ? p : parseFloat(p) || 0; }

  _kind(m) {
    const s = this._hass.states[this._main(m)];
    const dc = s && s.attributes.device_class;
    if (m.kind) return m.kind;
    if (dc === 'gas' || /gas/i.test(this._main(m))) return 'gas';
    if (dc === 'water' || /water/i.test(this._main(m))) return 'water';
    if (dc === 'energy') return 'energy';
    return 'other';
  }
  _unit(m) { const s = this._hass.states[this._main(m)]; return m.unit || (s && s.attributes.unit_of_measurement) || ''; }
  _price(m) {
    if (typeof m.price === 'number') return m.price;
    const k = this._kind(m);
    const p = k === 'gas' ? this._config.gas_price : k === 'water' ? this._config.water_price : k === 'energy' ? this._config.energy_price : null;
    return typeof p === 'number' ? p : parseFloat(p) || null;
  }

  _fmt(v, m) {
    if (typeof v !== 'number' || isNaN(v)) return '–';
    const u = this._unit(m).toLowerCase();
    const d = u === 'l' || u === 'wh' ? 0 : Math.abs(v) < 10 ? 2 : 1;
    try { return v.toLocaleString(this._loc(), { minimumFractionDigits: d, maximumFractionDigits: d }); } catch (e) { return v.toFixed(d); }
  }
  _money(v) {
    try { return v.toLocaleString(this._loc(), { style: 'currency', currency: (this._hass.config && this._hass.config.currency) || 'EUR' }); } catch (e) { return '€ ' + v.toFixed(2); }
  }

  // dagtotalen en maandtotaal uit de langetermijnstatistieken
  _load() {
    if (this._loading || (this._loadedAt && Date.now() - this._loadedAt < 600000)) return;
    if (!this._hass.callWS) return;
    this._loading = true;
    this._loadedAt = Date.now();
    const n = Math.max(7, parseInt(this._config.days, 10) || 7);
    const now = new Date();
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const from = new Date(dayStart.getTime() - (Math.max(n, 8) - 1) * 86400000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const ids = [...new Set([].concat(...this._meters.map((m) => this._ids(m).concat(this._xids(m)))))];
    // per eenheid opvragen, zodat de cijfers in de eenheid van de sensor komen (bv. liter i.p.v. m³)
    const cls = (u) => (/^(l|ml|m³|m3|ft³|ccf|gal|mcf)$/i.test(u) ? 'volume' : /^(wh|kwh|mwh|gwh|mj|gj)$/i.test(u) ? 'energy' : null);
    const groups = new Map();
    ids.forEach((id) => {
      const s = this._hass.states[id];
      const u = (s && s.attributes.unit_of_measurement) || '';
      const k = cls(u) ? cls(u) + ':' + u : '';
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(id);
    });
    const ws = (period, start, list, k) => this._hass.callWS(Object.assign({ type: 'recorder/statistics_during_period', start_time: start.toISOString(), statistic_ids: list, period, types: ['change'] }, k ? { units: { [k.split(':')[0]]: k.slice(k.indexOf(':') + 1) } } : {}));
    const all = (period, start) => Promise.all([...groups.entries()].map(([k, list]) => ws(period, start, list, k))).then((r) => Object.assign({}, ...r));
    Promise.all([all('day', from < monthStart ? from : monthStart), all('month', monthStart)])
      .then(([days, months]) => {
        const agg = (list) => {
          const sum = new Map();
          let month = null;
          list.forEach((id) => {
            (days[id] || []).forEach((r) => {
              const t = typeof r.start === 'number' ? r.start : Date.parse(r.start);
              sum.set(t, (sum.get(t) || 0) + (r.change || 0));
            });
            const mc = ((months[id] || [])[0] || {}).change;
            if (typeof mc === 'number') month = (month || 0) + mc;
          });
          return { days: [...sum.entries()].sort((a, b) => a[0] - b[0]).map(([t, v]) => ({ t, v })), month };
        };
        this._meters.forEach((m) => {
          const d = agg(this._ids(m));
          if (this._xids(m).length) d.x = agg(this._xids(m));
          this._data[this._mkey(m)] = d;
        });
      })
      .catch(() => { this._meters.forEach((m) => { const k = this._mkey(m); this._data[k] = this._data[k] || { days: [], month: null, error: true }; }); })
      .finally(() => { this._loading = false; this._render(); });
  }

  _build() {
    this.shadowRoot.innerHTML = `<style>${GUSE_STYLE}</style><ha-card><div class="halo"></div><div class="body"></div></ha-card>`;
    this._card = this.shadowRoot.querySelector('ha-card');
    this._body = this.shadowRoot.querySelector('.body');
    this._body.style.cssText = 'position:relative;display:flex;flex-direction:column;gap:14px';
    this._body.addEventListener('click', (e) => {
      const t = e.target.closest('.tab');
      if (t) { this._sel = +t.dataset.i; this._render(); return; }
      if (e.target.closest('.big .ic')) this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._main(this._meters[this._sel]) }, bubbles: true, composed: true }));
    });
    this._built = true;
    this._builtLang = this._lang();
    this._key = null;
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    this._load();
    const c = this._config;
    if (this._sel >= this._meters.length) this._sel = 0;
    const m = this._meters[this._sel];
    const kind = this._kind(m);
    const col = guseRgb(m.color) || GUSE_KIND[kind].c;
    this._card.style.setProperty('--c', col);
    this._card.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');
    const unit = this._unit(m);
    const st = this._hass.states;

    let html = '';
    if (c.name) html += `<span class="title">${guseEsc(c.name)}</span>`;
    if (this._meters.length > 1) {
      html += `<div class="tabs">${this._meters.map((x, i) => {
        const k = this._kind(x);
        const s = st[this._main(x)];
        return `<button class="tab${i === this._sel ? ' sel' : ''}" type="button" data-i="${i}" style="--k:${guseRgb(x.color) || GUSE_KIND[k].c}">${GUSE_SVG(GUSE_KIND[k].icon)}${guseEsc(x.name || (k !== 'other' ? this._t(k) : (s && s.attributes.friendly_name) || this._main(x)))}</button>`;
      }).join('')}</div>`;
    }
    const data = this._data[this._mkey(m)];
    if (!data) {
      html += `<div class="msg">${guseEsc(this._t('loading'))}</div>`;
    } else if (!data.days.length) {
      html += `<div class="msg">${guseEsc(this._t('none'))}</div>`;
    } else {
      const now = new Date();
      const d0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const dayMap = (list) => new Map(list.map((x) => [new Date(new Date(x.t).getFullYear(), new Date(x.t).getMonth(), new Date(x.t).getDate()).getTime(), x.v]));
      const byDay = dayMap(data.days);
      const val = (t) => byDay.get(t) || 0;
      const X = data.x;
      const xDay = X ? dayMap(X.days) : null;
      const xval = (t) => (xDay && xDay.get(t)) || 0;
      const XC = '143, 227, 184';
      this._card.style.setProperty('--x', XC);
      const today = val(d0);
      const yest = val(d0 - 86400000);
      // week vanaf maandag
      const dow = (now.getDay() + 6) % 7;
      let week = 0;
      for (let i = 0; i <= dow; i++) week += val(d0 - i * 86400000);
      const mStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
      const month = data.month !== null ? data.month : [...byDay.entries()].filter(([t]) => t >= mStart).reduce((a, [, v]) => a + v, 0);
      let xw = 0;
      for (let i = 0; i <= dow; i++) xw += xval(d0 - i * 86400000);
      const xs = X ? { today: xval(d0), yest: xval(d0 - 86400000), week: xw, month: X.month !== null ? X.month : [...xDay.entries()].filter(([t]) => t >= mStart).reduce((a, [, v]) => a + v, 0) } : null;
      const diff = today - yest;
      const up = diff > 0;
      const q = Math.abs(diff) < 1e-9 ? '201, 196, 221' : up ? '255, 184, 153' : '143, 227, 184';
      const cmp = Math.abs(diff) < 1e-9 ? this._t('same') : this._t('vs', { d: (up ? '▲ +' : '▼ −') + this._fmt(Math.abs(diff), m) + ' ' + unit });
      const price = this._price(m);
      const xprice = X ? this._xprice(m) : 0;
      const money = (v, xv) => {
        if (!price && !xprice) return '';
        const net = v * (price || 0) - (xv || 0) * xprice;
        return `<span class="e${net < 0 ? ' gain' : ''}">${net < 0 ? '+ ' : ''}${guseEsc(this._money(Math.abs(net)))}${X ? ' ' + guseEsc(this._t('net')) : ''}</span>`;
      };
      const xline = (v, cls) => (X ? `<span class="${cls}">↑ ${guseEsc(this._fmt(v, m))} ${guseEsc(unit)}</span>` : '');
      html += `
        <div class="top">
          <div class="big">
            <span class="ic">${GUSE_SVG(GUSE_KIND[kind].icon)}</span>
            <span class="tx">
              <span class="l">${guseEsc(this._t('today'))}${X ? ' · ' + guseEsc(this._t('imp')) : ''}</span>
              <span class="v">${guseEsc(this._fmt(today, m))}<small>${guseEsc(unit)}</small></span>
              <span class="cmp" style="--q:${q}">${guseEsc(cmp)}</span>
              ${X ? `<span class="xp">↑ ${guseEsc(this._t('exp'))} ${guseEsc(this._fmt(xs.today, m))} ${guseEsc(unit)}</span>` : ''}
            </span>
          </div>
          <div class="tiles">
            <div class="tile"><span class="l">${guseEsc(this._t('yesterday'))}</span><span class="v">${guseEsc(this._fmt(yest, m))} ${guseEsc(unit)}</span>${xline(xs && xs.yest, 'x')}${money(yest, xs && xs.yest)}</div>
            <div class="tile"><span class="l">${guseEsc(this._t('week'))}</span><span class="v">${guseEsc(this._fmt(week, m))} ${guseEsc(unit)}</span>${xline(xs && xs.week, 'x')}${money(week, xs && xs.week)}</div>
            <div class="tile"><span class="l">${guseEsc(this._t('month'))}</span><span class="v">${guseEsc(this._fmt(month, m))} ${guseEsc(unit)}</span>${xline(xs && xs.month, 'x')}${money(month, xs && xs.month)}</div>
          </div>
        </div>`;
      // staafjes
      const n = Math.max(3, Math.min(31, parseInt(c.days, 10) || 7));
      const cols = [];
      for (let i = n - 1; i >= 0; i--) cols.push({ t: d0 - i * 86400000, v: val(d0 - i * 86400000), x: xval(d0 - i * 86400000) });
      const max = Math.max(...cols.map((x) => Math.max(x.v, X ? x.x : 0)), 1e-9);
      const past = cols.slice(0, -1).filter((x) => x.v > 0);
      const avg = past.length ? past.reduce((a, x) => a + x.v, 0) / past.length : 0;
      const peak = cols.reduce((a, x, i) => (x.v > cols[a].v ? i : a), 0);
      const H = 140 - 18 - 22;
      html += `<div class="chart"><span class="title">${guseEsc(this._t('days', { n }))}${X ? `<span class="legend"><span><i></i>${guseEsc(this._t('imp'))}</span><span><i class="x"></i>${guseEsc(this._t('exp'))}</span></span>` : ''}</span><div class="bars">
        ${avg ? `<span class="avg" style="bottom:${(22 + avg / max * H).toFixed(1)}px"></span>` : ''}
        ${cols.map((x, i) => {
          let dn;
          try { dn = new Date(x.t).toLocaleDateString(this._loc(), n > 10 ? { day: 'numeric' } : { weekday: 'short' }); } catch (e) { dn = ''; }
          return `<div class="col${i === cols.length - 1 ? ' today' : ''}${i === peak ? ' peak' : ''}"><span class="val">${guseEsc(this._fmt(x.v, m))}</span>${X ? `<span class="pair"><span class="bar" style="height:${Math.max(4, x.v / max * H).toFixed(1)}px"></span><span class="bar x" style="height:${Math.max(4, x.x / max * H).toFixed(1)}px"></span></span>` : `<span class="bar" style="height:${Math.max(4, x.v / max * H).toFixed(1)}px"></span>`}<span class="dn">${guseEsc(dn.replace('.', ''))}</span></div>`;
        }).join('')}
      </div></div>`;
    }
    if (html !== this._key) { this._key = html; this._body.innerHTML = html; }
  }
}

class GlowUsageCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._render(); }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = guseLang(this._hass, this._config.language);
    const t = (k) => guseT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => guseT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length)) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.glow === 15) delete v.glow;
        if (v.days === 7) delete v.days;
        delete v.entity;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    const simple = (this._config.meters || []).every((x) => typeof x === 'string');
    this._form.schema = [
      ...(simple ? [{ name: 'meters', selector: { entity: { domain: 'sensor', multiple: true } } }] : []),
      { name: 'name', selector: { text: {} } },
      { type: 'grid', name: '', schema: [
        { name: 'gas_price', selector: { number: { min: 0, max: 20, step: 0.0001, mode: 'box' } } },
        { name: 'water_price', selector: { number: { min: 0, max: 20, step: 0.0001, mode: 'box' } } },
        { name: 'energy_price', selector: { number: { min: 0, max: 20, step: 0.0001, mode: 'box' } } },
        { name: 'export_price', selector: { number: { min: 0, max: 20, step: 0.0001, mode: 'box' } } },
      ] },
      { name: 'days', selector: { number: { min: 3, max: 31, step: 1, mode: 'box' } } },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GUSE_LANG_NAMES).map((k) => ({ value: k, label: GUSE_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, days: 7, language: 'auto', ...this._config, meters: this._config.meters || (this._config.entity ? [this._config.entity] : []) };
  }
}

if (!customElements.get('glow-usage-card')) customElements.define('glow-usage-card', GlowUsageCard);
if (!customElements.get('glow-usage-card-editor')) customElements.define('glow-usage-card-editor', GlowUsageCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-usage-card')) {
  window.customCards.push({ type: 'glow-usage-card', name: 'Glow Usage Card', description: guseT(guseLang(null), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}

}

console.info('%c GLOW-CARDS %c v1.14.1 ', 'color:#1C1730;background:#FFE08A;font-weight:700;border-radius:4px 0 0 4px;padding:2px 4px', 'color:#FFE08A;background:#1C1730;font-weight:700;border-radius:0 4px 4px 0;padding:2px 4px');
