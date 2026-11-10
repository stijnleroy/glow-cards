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
    description: 'Ventilatortegel met gloed: tik schakelt, met timerknoppen en een eigen tijd.',
  },
  en: {
    off: 'Off', on: 'On', on_since: 'On since {t}', left: 'On · {t} left', unavailable: 'Unavailable', other: 'Other', on_for: 'On for', start: 'Start', stop: 'Stop', min: '{n} min', h: '{h} h', hm: '{h} h {m}',
    err: 'Fill in "entity" (e.g. a fan or switch).',
    l_entity: 'Fan (fan, switch, …)', l_name: 'Name', l_icon: 'Icon', l_timers: 'Timer buttons (minutes, comma separated; empty = no timer)', l_custom: '"Other" button for your own time', l_timer_entity: 'Timer helper (recommended, see docs)', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Glowing fan tile: tap toggles, with timer buttons and your own time.',
  },
  fr: {
    off: 'Arrêt', on: 'Marche', on_since: 'En marche depuis {t}', left: 'Marche · encore {t}', unavailable: 'Indisponible', other: 'Autre', on_for: 'En marche pendant', start: 'Démarrer', stop: 'Arrêter', min: '{n} min', h: '{h} h', hm: '{h} h {m}',
    err: 'Renseignez "entity" (p. ex. un ventilateur ou un interrupteur).',
    l_entity: 'Ventilateur (fan, switch, …)', l_name: 'Nom', l_icon: 'Icône', l_timers: 'Boutons minuterie (minutes, séparées par des virgules ; vide = pas de minuterie)', l_custom: 'Bouton « Autre » pour une durée libre', l_timer_entity: 'Minuteur (recommandé, voir la doc)', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Tuile de ventilateur lumineuse : un toucher allume, avec minuterie.',
  },
  de: {
    off: 'Aus', on: 'An', on_since: 'An seit {t}', left: 'An · noch {t}', unavailable: 'Nicht verfügbar', other: 'Andere', on_for: 'An für', start: 'Starten', stop: 'Stoppen', min: '{n} Min.', h: '{h} Std.', hm: '{h} Std. {m}',
    err: 'Gib "entity" an (z. B. einen Lüfter oder Schalter).',
    l_entity: 'Lüfter (fan, switch, …)', l_name: 'Name', l_icon: 'Symbol', l_timers: 'Timer-Tasten (Minuten, durch Kommas getrennt; leer = kein Timer)', l_custom: 'Taste „Andere“ für eine eigene Zeit', l_timer_entity: 'Timer-Helfer (empfohlen, siehe Doku)', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Leuchtende Lüfterkachel: Tippen schaltet, mit Timer-Tasten und eigener Zeit.',
  },
  es: {
    off: 'Apagado', on: 'Encendido', on_since: 'Encendido desde las {t}', left: 'Encendido · quedan {t}', unavailable: 'No disponible', other: 'Otro', on_for: 'Encendido durante', start: 'Iniciar', stop: 'Parar', min: '{n} min', h: '{h} h', hm: '{h} h {m}',
    err: 'Indica "entity" (p. ej. un ventilador o interruptor).',
    l_entity: 'Ventilador (fan, switch, …)', l_name: 'Nombre', l_icon: 'Icono', l_timers: 'Botones de temporizador (minutos separados por comas; vacío = sin temporizador)', l_custom: 'Botón «Otro» para un tiempo propio', l_timer_entity: 'Temporizador auxiliar (recomendado, ver docs)', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Mosaico de ventilador con brillo: un toque enciende, con temporizador.',
  },
  it: {
    off: 'Spento', on: 'Acceso', on_since: 'Acceso dalle {t}', left: 'Acceso · ancora {t}', unavailable: 'Non disponibile', other: 'Altro', on_for: 'Acceso per', start: 'Avvia', stop: 'Ferma', min: '{n} min', h: '{h} h', hm: '{h} h {m}',
    err: 'Indica "entity" (es. un ventilatore o interruttore).',
    l_entity: 'Ventilatore (fan, switch, …)', l_name: 'Nome', l_icon: 'Icona', l_timers: 'Pulsanti timer (minuti separati da virgole; vuoto = nessun timer)', l_custom: 'Pulsante «Altro» per un tempo a scelta', l_timer_entity: 'Timer helper (consigliato, vedi doc)', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
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
  .row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .val { flex: 1; text-align: center; font-size: 40px; font-weight: 800; font-variant-numeric: tabular-nums; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .step { width: 64px; height: 64px; border-radius: 32px; font-size: 30px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GFAN_LINE}; }
  .step:active { background: rgba(var(--c), 0.25); }
  .quick { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
  .q { height: 40px; border-radius: 14px; font-size: 14px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GFAN_LINE}; }
  .go { height: 54px; border-radius: 27px; font-size: 17px; font-weight: 800; color: #1C1730; background: rgb(var(--c)); border: 0; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.6); }
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

  getCardSize() { return 3; }
  getGridOptions() { return { columns: 6, rows: 'auto', min_columns: 3 }; }

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
    const icon = c.icon ? `<ha-icon icon="${gfanEsc(c.icon)}"></ha-icon>` : `<span class="spin" style="display:block;width:30px;height:30px">${GFAN_FAN}</span>`;
    this.shadowRoot.innerHTML = `
      <style>${GFAN_STYLE}</style>
      <div class="wrap">
        <ha-card>
          <div class="halo"></div>
          <div class="icon">${icon}</div>
          <div class="txt"><span class="name"></span><span class="state"></span></div>
        </ha-card>
        <div class="timers"></div>
      </div>`;
    this._card = this.shadowRoot.querySelector('ha-card');
    this._timers = this.shadowRoot.querySelector('.timers');
    let hold = null;
    let held = false;
    this._card.addEventListener('pointerdown', () => {
      held = false;
      hold = setTimeout(() => { held = true; this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._config.entity }, bubbles: true, composed: true })); }, 600);
    });
    const cancel = () => clearTimeout(hold);
    this._card.addEventListener('pointerleave', cancel);
    this._card.addEventListener('pointercancel', cancel);
    this._card.addEventListener('pointerup', () => {
      clearTimeout(hold);
      if (held) return;
      const s = this._hass.states[this._config.entity];
      if (!s || s.state === 'unavailable') return;
      if (s.state === 'on') this._stopTimer(true);
      else this._turn(true);
    });
    this._card.addEventListener('contextmenu', (e) => e.preventDefault());
    this._timers.addEventListener('click', (e) => {
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
    this._timers.style.setProperty('--c', this._color());
    this._timers.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');
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
    if (html !== this._timersKey) {
      this._timersKey = html;
      this._timers.innerHTML = html;
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
    root.innerHTML = `
      <style>${GFAN_POP_STYLE}</style>
      <div class="backdrop">
        <div class="panel" role="dialog" aria-modal="true">
          <span class="lab">${gfanEsc(this._t('on_for'))}</span>
          <div class="row">
            <button class="step" type="button" data-d="-5">−</button>
            <span class="val"></span>
            <button class="step" type="button" data-d="5">+</button>
          </div>
          <div class="quick">${[10, 45, 90, 120].map((m) => `<button class="q" type="button" data-m="${m}">${gfanEsc(this._fmtMin(m))}</button>`).join('')}</div>
          <button class="go" type="button">${gfanEsc(this._t('start'))}</button>
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
    root.querySelectorAll('.q').forEach((b) => b.addEventListener('click', () => { this._custom = +b.dataset.m; show(); }));
    root.querySelector('.go').addEventListener('click', () => { this._startTimer(this._custom); this._closePopup(); });
    this._onKey = (e) => { if (e.key === 'Escape') this._closePopup(); };
    document.addEventListener('keydown', this._onKey);
    this._autoTimer = setTimeout(() => this._closePopup(), 60000);
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
      { name: 'timer_entity', selector: { entity: { domain: 'timer' } } },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GFAN_LANG_NAMES).map((k) => ({ value: k, label: GFAN_LANG_NAMES[k] }))) } } },
    ];
    const timers = this._config.timers === undefined ? '15, 30, 60' : gfanList(this._config.timers).join(', ');
    this._form.data = { glow: 15, custom: true, language: 'auto', ...this._config, timers };
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
