/*
 * Glow Kit: gedeelde hulpjes voor de nieuwere Glow-kaarten (taal, escapen, kaarteditor, registratie).
 * Elke kaart staat in een eigen blok, dus alles hier hangt aan window.GlowKit.
 */
window.GlowKit = window.GlowKit || (() => {
  const LANGS = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
  const lang = (hass, wanted, table) => {
    let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
    l = String(l).toLowerCase().split(/[-_]/)[0];
    return table[l] ? l : 'en';
  };
  const t = (table, l, key, vars) => {
    let s = (table[l] && table[l][key]) ?? table.en[key] ?? key;
    if (vars && typeof s === 'string') Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (hass, id) => { const s = id && hass.states[id]; const v = s ? parseFloat(s.state) : NaN; return isNaN(v) ? null : v; };
  const fmt = (l, v, d = 1) => (v === null || v === undefined || isNaN(v) ? '–' : Number(v).toLocaleString(l, { minimumFractionDigits: d, maximumFractionDigits: d }));
  const name = (hass, id) => { const s = hass.states[id]; return (s && s.attributes.friendly_name) || id; };
  const moreInfo = (el, id) => el.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: id }, bubbles: true, composed: true }));
  const navigate = (path) => { history.pushState(null, '', path); window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } })); };
  // tijd geleden in gewone taal
  const ago = (l, iso, T) => {
    const d = (Date.now() - new Date(iso).getTime()) / 60000;
    if (d < 1) return T('just_now');
    if (d < 60) return T('min_ago', { n: Math.round(d) });
    if (d < 60 * 24) return T('h_ago', { n: Math.round(d / 60) });
    return T('d_ago', { n: Math.round(d / 1440) });
  };
  const hm = (date) => String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');

  // basis-CSS die alle nieuwe kaarten delen (zelfde stijl als de schemakaart)
  const CSS = `
  :host { display: block; }
  ha-card { position: relative; overflow: hidden; box-sizing: border-box; padding: 22px; border-radius: var(--ha-card-border-radius, 26px); display: flex; flex-direction: column; gap: 16px;
    background: var(--glow-card-background, #15121F); border: 1px solid var(--glow-card-border, rgba(255,255,255,0.08)); color: var(--glow-text, #F3F1FA); box-shadow: none; container-type: inline-size; height: 100%; }
  button { font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .halo { position: absolute; left: -60px; top: -70px; width: 220px; height: 220px; border-radius: 50%; filter: blur(60px); opacity: 0.3; background: rgb(var(--a)); pointer-events: none; }
  .ink { color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .head { position: relative; display: flex; align-items: center; gap: 16px; }
  .hi { width: 56px; height: 56px; border-radius: 28px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgb(var(--a)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--a), 0.85); }
  .ht { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .ht b { font-size: 1.6rem; font-weight: 800; line-height: 1.1; }
  .ht span { font-size: 1rem; font-weight: 700; color: color-mix(in srgb, rgb(var(--a)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .lab { font-size: 0.8rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .note { position: relative; font-size: 0.8rem; font-weight: 700; opacity: 0.5; }
  .dot { width: 10px; height: 10px; border-radius: 5px; flex-shrink: 0; background: rgb(var(--c)); box-shadow: 0 0 8px rgba(var(--c), 0.9); }
  .chip { height: 36px; padding: 0 14px; border-radius: 18px; display: inline-flex; align-items: center; gap: 8px; font-size: 0.88rem; font-weight: 800; background: transparent; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .chip.on { background: rgba(var(--c), 0.18); border-color: rgba(var(--c), 0.6); color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .empty { position: relative; font-weight: 700; opacity: 0.6; }
  @container (max-width: 520px) { ha-card { padding: 16px; gap: 12px; } .hi { width: 46px; height: 46px; } .ht b { font-size: 1.35rem; } .ht span { font-size: 0.88rem; } }
  `;
  const head = (icon, title, sub) => `<div class="head"><span class="hi"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="${icon}"/></svg></span><span class="ht"><b>${esc(title)}</b>${sub ? `<span>${esc(sub)}</span>` : ''}</span></div>`;

  // kaarteditor op basis van ha-form; schema(hass, config, T) geeft de velden
  const editor = (tag, table, schema, defaults = {}) => {
    if (customElements.get(tag)) return;
    customElements.define(tag, class extends HTMLElement {
      setConfig(config) { this._config = { ...config }; this._render(); }
      set hass(hass) { this._hass = hass; if (this._form) { this._form.hass = hass; } else this._render(); }
      _render() {
        if (!this._config || !this._hass) return;
        const l = lang(this._hass, this._config.language, table);
        const T = (k, v) => t(table, l, k, v);
        if (!this._form || this._formLang !== l) {
          this.innerHTML = '';
          this._form = document.createElement('ha-form');
          this._formLang = l;
          this._form.computeLabel = (s) => T('l_' + s.name);
          this._form.computeHelper = (s) => { const h = t(table, l, 'h_' + s.name); return h === 'h_' + s.name ? undefined : h; };
          this._form.addEventListener('value-changed', (e) => {
            const v = { ...e.detail.value };
            Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length) || defaults[k] === v[k]) delete v[k]; });
            if (v.language === 'auto') delete v.language;
            this._config = { type: this._config.type, ...v };
            this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
          });
          this.appendChild(this._form);
        }
        this._form.hass = this._hass;
        this._form.schema = schema(this._hass, this._config, T).concat([
          { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
          { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: T('lang_auto') }].concat(Object.keys(LANGS).map((k) => ({ value: k, label: LANGS[k] }))) } } },
        ]);
        this._form.data = { glow: 15, language: 'auto', ...defaults, ...this._config };
      }
    });
  };
  const register = (type, name, table, cls) => {
    if (!customElements.get(type)) customElements.define(type, cls);
    window.customCards = window.customCards || [];
    if (!window.customCards.some((x) => x.type === type)) {
      window.customCards.push({ type, name, description: t(table, lang(null, null, table), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
    }
  };
  // gedeelde vertalingen voor tijd en editor
  const COMMON = {
    nl: { just_now: 'net nu', min_ago: '{n} min geleden', h_ago: '{n} u geleden', d_ago: '{n} dagen geleden', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)', l_title: 'Titel' },
    en: { just_now: 'just now', min_ago: '{n} min ago', h_ago: '{n} h ago', d_ago: '{n} days ago', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)', l_title: 'Title' },
    fr: { just_now: "à l'instant", min_ago: 'il y a {n} min', h_ago: 'il y a {n} h', d_ago: 'il y a {n} jours', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)', l_title: 'Titre' },
    de: { just_now: 'gerade eben', min_ago: 'vor {n} Min.', h_ago: 'vor {n} Std.', d_ago: 'vor {n} Tagen', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)', l_title: 'Titel' },
    es: { just_now: 'ahora mismo', min_ago: 'hace {n} min', h_ago: 'hace {n} h', d_ago: 'hace {n} días', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)', l_title: 'Título' },
    it: { just_now: 'adesso', min_ago: '{n} min fa', h_ago: '{n} h fa', d_ago: '{n} giorni fa', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)', l_title: 'Titolo' },
  };
  const table = (own) => { const out = {}; Object.keys(COMMON).forEach((l) => { out[l] = { ...COMMON[l], ...(own[l] || {}) }; }); return out; };
  return { LANGS, lang, t, esc, num, fmt, name, moreInfo, navigate, ago, hm, CSS, head, editor, register, table };
})();
