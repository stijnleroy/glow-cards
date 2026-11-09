/*! Glow Cards v1.3.0 – https://github.com/stijnleroy/glow-cards – MIT */

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

const GBC_VERSION = '1.1.1';

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
    border-radius: var(--gbc-radius, 28px);
    padding: 18px;
    color: var(--glow-text, #F3F1FA);
    background: var(--glow-card-background, #15121F);
    border: 1px solid var(--glow-card-border, rgba(255, 255, 255, 0.08));
    box-sizing: border-box;
  }
  ha-card.theme-bg { background: var(--ha-card-background, var(--card-background-color)); color: var(--primary-text-color); }
  ha-card.theme-bg .blob { display: none; }
  .blob { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; }
  .blob.a { left: -90px; top: -90px; width: 260px; height: 260px; background: #B9A8FF; opacity: calc(0.28 * var(--glow-blob, 1)); }
  .blob.b { right: -100px; bottom: -110px; width: 280px; height: 280px; background: #FFB899; opacity: calc(0.22 * var(--glow-blob, 1)); }
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
      glow: 22,
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
        <div class="blob a"></div><div class="blob b"></div>
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
      glow: c.glow ?? 22,
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

const GEC_VERSION = '1.0.1';

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
    border-radius: 28px; padding: 16px; color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid var(--glow-card-border, rgba(255, 255, 255, 0.08));
  }
  .blob { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
  .blob.a { left: -110px; top: -130px; width: 320px; height: 320px; background: #FFE08A; opacity: calc(0.14 * var(--glow-blob, 1)); }
  .blob.b { right: -120px; bottom: -150px; width: 340px; height: 340px; background: #B9A8FF; opacity: calc(0.18 * var(--glow-blob, 1)); }
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
      glow: 22,
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
        <div class="blob a"></div><div class="blob b"></div>
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
      units: c.units ?? 'w', auto_rotate: c.auto_rotate ?? 0, glow: c.glow ?? 22, height: c.height ?? 218,
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
 * alle lampen van de kamer (aan/uit, helderheid, kleurtemperatuur en kleur).
 */

const GRC_VERSION = '1.0.0';

const GRC_I18N = {
  nl: {
    off: 'Uit', all_on: 'Alles aan', n_on: '{n} van {t} aan', on_one: 'Aan', unavailable: 'Niet beschikbaar',
    close: 'Sluiten', brightness: 'Helderheid', warm: 'Warm', neutral: 'Neutraal', cool: 'Koel', no_lights: 'Geen lampen gevonden voor deze kamer.',
    all_on_btn: 'Alles aan', all_off_btn: 'Alles uit', err_entity: 'Vul "entity" (een lamp of lampgroep) of "area" in.',
    l_entity: 'Lamp of lampgroep', l_name: 'Naam', l_icon: 'Icoon', l_area: 'Ruimte (voor de lampen in de popup)', l_lights: 'Lampen in de popup (leeg = automatisch)',
    l_color: 'Kleur als de lampen geen kleur doorgeven', l_glow: 'Sterkte van de gloed', l_auto_close: 'Popup sluiten na (seconden, 0 = nooit)', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Kamerkaart met gloed: tik schakelt het licht, dubbeltik opent een popup met alle lampen.',
  },
  en: {
    off: 'Off', all_on: 'All on', n_on: '{n} of {t} on', on_one: 'On', unavailable: 'Unavailable',
    close: 'Close', brightness: 'Brightness', warm: 'Warm', neutral: 'Neutral', cool: 'Cool', no_lights: 'No lights found for this room.',
    all_on_btn: 'All on', all_off_btn: 'All off', err_entity: 'Fill in "entity" (a light or light group) or "area".',
    l_entity: 'Light or light group', l_name: 'Name', l_icon: 'Icon', l_area: 'Area (for the lights in the popup)', l_lights: 'Lights in the popup (empty = automatic)',
    l_color: 'Colour when the lights report none', l_glow: 'Glow strength', l_auto_close: 'Close popup after (seconds, 0 = never)', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Glowing room card: tap toggles the lights, double tap opens a popup with every light.',
  },
  fr: {
    off: 'Éteint', all_on: 'Tout allumé', n_on: '{n} sur {t} allumées', on_one: 'Allumé', unavailable: 'Indisponible',
    close: 'Fermer', brightness: 'Luminosité', warm: 'Chaud', neutral: 'Neutre', cool: 'Froid', no_lights: 'Aucune lampe trouvée pour cette pièce.',
    all_on_btn: 'Tout allumer', all_off_btn: 'Tout éteindre', err_entity: 'Renseignez "entity" (une lampe ou un groupe) ou "area".',
    l_entity: 'Lampe ou groupe', l_name: 'Nom', l_icon: 'Icône', l_area: 'Pièce (pour les lampes du popup)', l_lights: 'Lampes du popup (vide = automatique)',
    l_color: 'Couleur si les lampes n\'en indiquent pas', l_glow: 'Intensité de la lueur', l_auto_close: 'Fermer le popup après (secondes, 0 = jamais)', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Carte de pièce lumineuse : un toucher allume, un double toucher ouvre toutes les lampes.',
  },
  de: {
    off: 'Aus', all_on: 'Alle an', n_on: '{n} von {t} an', on_one: 'An', unavailable: 'Nicht verfügbar',
    close: 'Schließen', brightness: 'Helligkeit', warm: 'Warm', neutral: 'Neutral', cool: 'Kalt', no_lights: 'Keine Lampen für diesen Raum gefunden.',
    all_on_btn: 'Alle an', all_off_btn: 'Alle aus', err_entity: 'Gib "entity" (Lampe oder Lampengruppe) oder "area" an.',
    l_entity: 'Lampe oder Lampengruppe', l_name: 'Name', l_icon: 'Symbol', l_area: 'Bereich (für die Lampen im Popup)', l_lights: 'Lampen im Popup (leer = automatisch)',
    l_color: 'Farbe, wenn die Lampen keine melden', l_glow: 'Leuchtstärke', l_auto_close: 'Popup schließen nach (Sekunden, 0 = nie)', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Leuchtende Raumkarte: Tippen schaltet das Licht, Doppeltippen öffnet alle Lampen.',
  },
  es: {
    off: 'Apagado', all_on: 'Todo encendido', n_on: '{n} de {t} encendidas', on_one: 'Encendido', unavailable: 'No disponible',
    close: 'Cerrar', brightness: 'Brillo', warm: 'Cálida', neutral: 'Neutra', cool: 'Fría', no_lights: 'No se encontraron luces para esta estancia.',
    all_on_btn: 'Encender todo', all_off_btn: 'Apagar todo', err_entity: 'Indica "entity" (una luz o grupo) o "area".',
    l_entity: 'Luz o grupo de luces', l_name: 'Nombre', l_icon: 'Icono', l_area: 'Estancia (para las luces del popup)', l_lights: 'Luces del popup (vacío = automático)',
    l_color: 'Color si las luces no indican ninguno', l_glow: 'Intensidad del brillo', l_auto_close: 'Cerrar el popup tras (segundos, 0 = nunca)', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Tarjeta de estancia con brillo: un toque enciende, doble toque abre todas las luces.',
  },
  it: {
    off: 'Spento', all_on: 'Tutto acceso', n_on: '{n} di {t} accese', on_one: 'Acceso', unavailable: 'Non disponibile',
    close: 'Chiudi', brightness: 'Luminosità', warm: 'Calda', neutral: 'Neutra', cool: 'Fredda', no_lights: 'Nessuna luce trovata per questa stanza.',
    all_on_btn: 'Accendi tutto', all_off_btn: 'Spegni tutto', err_entity: 'Indica "entity" (una luce o un gruppo) o "area".',
    l_entity: 'Luce o gruppo di luci', l_name: 'Nome', l_icon: 'Icona', l_area: 'Stanza (per le luci nel popup)', l_lights: 'Luci nel popup (vuoto = automatico)',
    l_color: 'Colore se le luci non ne indicano', l_glow: 'Intensità del bagliore', l_auto_close: 'Chiudi il popup dopo (secondi, 0 = mai)', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Scheda stanza luminosa: un tocco accende, doppio tocco apre tutte le luci.',
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

const GRC_BULB = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>';
const GRC_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>';

/* ---------------- kaart ---------------- */

const GRC_STYLE = `
  :host { display: block; height: 100%; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; height: 100%; min-height: 112px;
    border-radius: 24px; padding: 14px 16px; cursor: pointer; user-select: none; -webkit-user-select: none;
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
    display: flex; flex-direction: column; gap: 16px; padding: 22px; border-radius: 30px;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--l), 0.45); box-shadow: 0 0 60px rgba(var(--l), 0.25), 0 30px 80px rgba(0, 0, 0, 0.45);
    animation: grc-pop 0.25s cubic-bezier(.2, .9, .3, 1.2);
  }
  .panel .halo { position: absolute; right: -80px; top: -100px; width: 280px; height: 280px; border-radius: 50%; background: rgb(var(--l)); opacity: 0.3; filter: blur(70px); pointer-events: none; }
  .head { position: relative; display: flex; align-items: center; gap: 14px; }
  .head .icon { width: 56px; height: 56px; border-radius: 28px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; --mdc-icon-size: 30px; background: var(--glow-surface, rgba(255,255,255,0.07)); color: var(--glow-text, #F3F1FA); }
  .head .icon.on { background: rgb(var(--l)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--l), 0.8); }
  .head .icon svg { width: 28px; height: 28px; }
  .head .t { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .head h2 { margin: 0; font-size: 26px; font-weight: 800; line-height: 1.1; }
  .head .sub { font-size: 14px; font-weight: 600; opacity: 0.7; }
  button { font: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .round { width: 48px; height: 48px; border-radius: 24px; padding: 0; flex-shrink: 0; border: 1px solid var(--glow-border, rgba(255,255,255,0.12)); background: var(--glow-surface, rgba(255,255,255,0.07)); color: inherit; display: flex; align-items: center; justify-content: center; }
  .round svg { width: 20px; height: 20px; }
  .bar { position: relative; display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .pill { height: 44px; padding: 0 14px; border-radius: 22px; border: 1px solid var(--glow-border, rgba(255,255,255,0.12)); background: var(--glow-surface, rgba(255,255,255,0.07)); color: inherit; font-size: 14px; font-weight: 800; display: flex; align-items: center; gap: 8px; }
  .pill .sw { width: 16px; height: 16px; border-radius: 8px; }
  .chip { width: 38px; height: 38px; border-radius: 19px; padding: 0; flex-shrink: 0; border: 2px solid var(--glow-border, rgba(255,255,255,0.12)); }
  .spacer { flex: 1; }
  .list { position: relative; overflow-y: auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; padding: 2px; }
  .light {
    position: relative; overflow: hidden; border-radius: 20px; padding: 12px; display: flex; flex-direction: column; gap: 10px;
    background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid transparent; transition: background 0.3s, border-color 0.3s;
  }
  .light.on { background: rgba(var(--c), 0.14); border-color: rgba(var(--c), 0.45); }
  .light.unavailable { opacity: 0.45; }
  .lrow { display: flex; align-items: center; gap: 10px; }
  .lbtn { width: 40px; height: 40px; border-radius: 20px; padding: 0; flex-shrink: 0; border: 0; display: flex; align-items: center; justify-content: center; background: var(--glow-surface, rgba(255,255,255,0.08)); color: var(--glow-text, #F3F1FA); }
  .lbtn svg { width: 20px; height: 20px; }
  .light.on .lbtn { background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(var(--c), 0.8); }
  .lname { flex: 1; min-width: 0; font-size: 15px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .lpct { font-size: 14px; font-weight: 800; opacity: 0.8; font-variant-numeric: tabular-nums; }
  .slider { position: relative; height: 34px; border-radius: 17px; background: var(--glow-surface, rgba(255,255,255,0.08)); overflow: hidden; touch-action: none; cursor: ew-resize; }
  .slider .fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0; border-radius: 17px; background: rgba(var(--c), 0.85); box-shadow: 0 0 calc(var(--glow) * 0.6) rgba(var(--c), 0.6); }
  .slider.off .fill { background: var(--glow-border, rgba(255,255,255,0.15)); box-shadow: none; }
  .slider.nodim { display: none; }
  .room-slider { flex: 1; min-width: 180px; height: 44px; border-radius: 22px; }
  .room-slider .fill { border-radius: 22px; }
  .room-slider .lab { position: absolute; left: 16px; top: 0; bottom: 0; display: flex; align-items: center; font-size: 14px; font-weight: 800; pointer-events: none; color: var(--glow-text, #F3F1FA); }
  .empty { opacity: 0.7; font-weight: 600; padding: 12px 4px; }
  @media (max-width: 520px) { .list { grid-template-columns: minmax(0, 1fr); } }
  @keyframes grc-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes grc-pop { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: none; } }
`;

const GRC_PRESETS = [
  { k: 'warm', kelvin: 2700, css: '#FFC58A' },
  { k: 'neutral', kelvin: 4000, css: '#FFF1DC' },
  { k: 'cool', kelvin: 6000, css: '#DDEBFF' },
];
const GRC_COLORS = ['#FFB899', '#FFE08A', '#8FE3B8', '#8EC5FF', '#B9A8FF', '#FF9FBF'];

// variabelen die de popup van het thema moet overnemen (de popup hangt in <body>)
const GRC_THEME_VARS = ['--glow-card-background', '--glow-card-border', '--glow-text', '--glow-surface', '--glow-border', '--glow-ink-amount', '--paper-font-body1_-_font-family'];

class GlowRoomCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._built = false;
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

  /* ---- welke lampen horen bij de kamer ---- */

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
      const area = c.area || this._areaOf(c.entity);
      if (area && this._hass.entities) {
        Object.values(this._hass.entities).forEach((ent) => {
          const id = ent.entity_id;
          if (!id.startsWith('light.') || id === c.entity || ent.hidden || ent.entity_category) return;
          const a = ent.area_id || (ent.device_id && this._hass.devices && this._hass.devices[ent.device_id] && this._hass.devices[ent.device_id].area_id);
          if (a !== area || !st[id]) return;
          if (Array.isArray(st[id].attributes.entity_id) || Array.isArray(st[id].attributes.group_entities) || st[id].attributes.is_hue_group) return; // geen groepen
          if (!out.includes(id)) out.push(id);
        });
      }
    }
    return out;
  }

  _areaOf(entity) {
    const ent = entity && this._hass.entities && this._hass.entities[entity];
    if (!ent) return null;
    return ent.area_id || (ent.device_id && this._hass.devices && this._hass.devices[ent.device_id] && this._hass.devices[ent.device_id].area_id) || null;
  }

  _colorOf(s) {
    const a = s && s.attributes;
    if (a && Array.isArray(a.rgb_color)) return grcSoft(a.rgb_color);
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
    const t = (k, v) => this._t(k, v);
    const icon = c.icon ? `<ha-icon icon="${grcEsc(c.icon)}"></ha-icon>` : GRC_BULB;

    root.innerHTML = `
      <style>${GRC_POP_STYLE}</style>
      <div class="backdrop">
        <div class="panel" role="dialog" aria-modal="true">
          <div class="halo"></div>
          <div class="head">
            <div class="icon">${icon}</div>
            <div class="t"><h2></h2><span class="sub"></span></div>
            <button class="round close" type="button" aria-label="${grcEsc(t('close'))}">${GRC_X}</button>
          </div>
          <div class="bar">
            <button class="pill all-on" type="button">${grcEsc(t('all_on_btn'))}</button>
            <button class="pill all-off" type="button">${grcEsc(t('all_off_btn'))}</button>
            <div class="slider room-slider" data-room="1"><div class="fill"></div><span class="lab">${grcEsc(t('brightness'))}</span></div>
          </div>
          <div class="bar">
            ${GRC_PRESETS.map((p) => `<button class="pill preset" type="button" data-kelvin="${p.kelvin}"><span class="sw" style="background:${p.css}"></span>${grcEsc(t(p.k))}</button>`).join('')}
            <span class="spacer"></span>
            ${GRC_COLORS.map((col) => `<button class="chip color" type="button" data-color="${col}" style="background:${col}" aria-label="${col}"></button>`).join('')}
          </div>
          <div class="list"></div>
        </div>
      </div>`;

    document.body.appendChild(host);
    this._pop = host;
    this._popRoot = root;
    this._listKey = null;

    const close = () => this._closePopup();
    root.querySelector('.backdrop').addEventListener('pointerdown', (e) => { if (e.target.classList.contains('backdrop')) close(); });
    root.querySelector('.close').addEventListener('click', close);
    this._onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', this._onKey);
    root.querySelector('.panel').addEventListener('pointerdown', () => this._resetAutoClose());

    const roomTarget = () => (c.entity ? { entity_id: c.entity } : { entity_id: this._lights() });
    root.querySelector('.all-on').addEventListener('click', () => this._call('turn_on', roomTarget()));
    root.querySelector('.all-off').addEventListener('click', () => this._call('turn_off', roomTarget()));
    root.querySelectorAll('.preset').forEach((b) => b.addEventListener('click', () => {
      const on = this._lights().filter((e) => this._hass.states[e].state === 'on');
      this._call('turn_on', { entity_id: on.length ? on : this._lights(), color_temp_kelvin: parseInt(b.dataset.kelvin, 10) });
    }));
    root.querySelectorAll('.color').forEach((b) => b.addEventListener('click', () => {
      const on = this._lights().filter((e) => this._hass.states[e].state === 'on');
      const targets = (on.length ? on : this._lights()).filter((e) => {
        const modes = this._hass.states[e].attributes.supported_color_modes || [];
        return modes.some((m) => ['hs', 'xy', 'rgb', 'rgbw', 'rgbww'].includes(m));
      });
      if (targets.length) this._call('turn_on', { entity_id: targets, rgb_color: grcHexRgb(b.dataset.color) });
    }));
    this._bindSlider(root.querySelector('.room-slider'), (pct) => {
      const lights = this._lights();
      if (pct <= 0) this._call('turn_off', { entity_id: lights });
      else this._call('turn_on', { entity_id: lights, brightness_pct: pct });
    });

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
  _bindSlider(el, onSet) {
    const fill = el.querySelector('.fill');
    const pctOf = (e) => {
      const r = el.getBoundingClientRect();
      return Math.round(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * 100);
    };
    let active = false;
    el.addEventListener('pointerdown', (e) => {
      active = true;
      el._dragging = true;
      try { el.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      fill.style.width = pctOf(e) + '%';
      e.stopPropagation();
      this._resetAutoClose();
    });
    el.addEventListener('pointermove', (e) => {
      if (!active) return;
      const p = pctOf(e);
      fill.style.width = p + '%';
      const lab = el.closest('.light') && el.closest('.light').querySelector('.lpct');
      if (lab) lab.textContent = p + '%';
    });
    const end = (e, apply) => {
      if (!active) return;
      active = false;
      el._dragging = false;
      if (apply) onSet(pctOf(e));
    };
    el.addEventListener('pointerup', (e) => end(e, true));
    el.addEventListener('pointercancel', (e) => end(e, false));
  }

  _updatePopup() {
    const root = this._popRoot;
    if (!root || !this._hass) return;
    const c = this._config;
    const st = this._hass.states;
    const lights = this._lights();
    const on = lights.filter((e) => st[e].state === 'on');
    const main = c.entity && st[c.entity];
    const rgb = this._colorOf((main && main.state === 'on' && main) || (on[0] && st[on[0]]));
    const panel = root.querySelector('.panel');
    panel.style.setProperty('--l', rgb.join(', '));
    root.querySelector('.head .icon').classList.toggle('on', on.length > 0);
    root.querySelector('h2').textContent = c.name || (main && main.attributes.friendly_name) || c.area || '';
    root.querySelector('.sub').textContent = on.length === 0 ? this._t('off') : (lights.length > 1 ? this._t('n_on', { n: on.length, t: lights.length }) : this._t('on_one'));

    // gemiddelde helderheid voor de kamerregelaar
    const rs = root.querySelector('.room-slider');
    rs.style.setProperty('--c', rgb.join(', '));
    if (!rs._dragging) {
      const bris = on.map((e) => st[e].attributes.brightness || 0).filter((b) => b > 0);
      const avg = bris.length ? Math.round(bris.reduce((a, b) => a + b, 0) / bris.length / 2.55) : 0;
      rs.querySelector('.fill').style.width = avg + '%';
    }

    // lijst met lampen (alleen opnieuw opbouwen als de samenstelling wijzigt)
    const list = root.querySelector('.list');
    const key = lights.join(',');
    if (key !== this._listKey) {
      this._listKey = key;
      list.innerHTML = lights.length ? lights.map((e) => `
        <div class="light" data-e="${grcEsc(e)}">
          <div class="lrow">
            <button class="lbtn" type="button">${GRC_BULB}</button>
            <span class="lname"></span>
            <span class="lpct"></span>
          </div>
          <div class="slider"><div class="fill"></div></div>
        </div>`).join('') : `<div class="empty">${grcEsc(this._t('no_lights'))}</div>`;
      list.querySelectorAll('.light').forEach((el) => {
        const e = el.dataset.e;
        el.querySelector('.lbtn').addEventListener('click', () => { this._resetAutoClose(); this._call('toggle', { entity_id: e }); });
        el.querySelector('.lname').addEventListener('click', () => { this._closePopup(); this._moreInfo(e); });
        this._bindSlider(el.querySelector('.slider'), (pct) => {
          if (pct <= 0) this._call('turn_off', { entity_id: e });
          else this._call('turn_on', { entity_id: e, brightness_pct: pct });
        });
      });
    }
    list.querySelectorAll('.light').forEach((el) => {
      const s = st[el.dataset.e];
      if (!s) return;
      const isOn = s.state === 'on';
      const modes = s.attributes.supported_color_modes || [];
      const dimmable = modes.some((m) => m !== 'onoff');
      el.style.setProperty('--c', this._colorOf(isOn ? s : null).join(', '));
      el.classList.toggle('on', isOn);
      el.classList.toggle('unavailable', s.state === 'unavailable');
      el.querySelector('.lname').textContent = s.attributes.friendly_name || el.dataset.e;
      const sl = el.querySelector('.slider');
      sl.classList.toggle('off', !isOn);
      sl.classList.toggle('nodim', !dimmable);
      if (!sl._dragging) {
        const pct = isOn ? (s.attributes.brightness ? Math.round(s.attributes.brightness / 2.55) : 100) : 0;
        sl.querySelector('.fill').style.width = pct + '%';
        el.querySelector('.lpct').textContent = s.state === 'unavailable' ? '–' : (isOn ? pct + '%' : this._t('off'));
      }
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
      { name: 'lights', selector: { entity: { domain: 'light', multiple: true } } },
      { type: 'grid', name: '', schema: [
        { name: 'glow', selector: { number: { min: 0, max: 60, step: 2, mode: 'slider', unit_of_measurement: 'px' } } },
        { name: 'auto_close', selector: { number: { min: 0, max: 600, step: 5, mode: 'box', unit_of_measurement: 's' } } },
      ] },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GRC_LANG_NAMES).map((k) => ({ value: k, label: GRC_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 22, auto_close: 30, language: 'auto', ...this._config };
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
    border-radius: 24px; padding: 14px 16px; cursor: pointer; user-select: none; -webkit-user-select: none;
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

console.info('%c GLOW-CARDS %c v1.3.0 ', 'color:#1C1730;background:#FFE08A;font-weight:700;border-radius:4px 0 0 4px;padding:2px 4px', 'color:#FFE08A;background:#1C1730;font-weight:700;border-radius:0 4px 4px 0;padding:2px 4px');
