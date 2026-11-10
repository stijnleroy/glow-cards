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
