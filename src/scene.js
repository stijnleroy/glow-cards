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
