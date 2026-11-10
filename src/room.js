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
