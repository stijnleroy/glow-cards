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
