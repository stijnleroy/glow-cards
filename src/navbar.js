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
