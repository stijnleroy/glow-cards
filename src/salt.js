/*
 * Glow Salt Card
 * Het zoutniveau van de waterontharder: een vat met zout dat leegloopt,
 * een waarschuwing om bij te vullen en een schatting wanneer het op is.
 */

const GSALT_I18N = {
  nl: {
    name: 'Zout', ok: 'Voldoende zout', low: 'Bijvullen', empty: 'Bijna leeg, vul bij', unavailable: 'Niet beschikbaar',
    days_left: 'Nog ongeveer {n} dagen', day_left: 'Nog ongeveer 1 dag', weeks_left: 'Nog ongeveer {n} weken', refilled: 'Bijgevuld op {d}',
    err: 'Vul "entity" in met de zoutsensor.',
    l_entity: 'Zoutsensor (% of afstand)', l_name: 'Naam', l_low: 'Waarschuwen onder (%)', l_empty_distance: 'Afstand als het vat leeg is (cm)', l_full_distance: 'Afstand als het vat vol is (cm)', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Zoutniveau van de waterontharder met waarschuwing en schatting wanneer het op is.',
  },
  en: {
    name: 'Salt', ok: 'Enough salt', low: 'Refill', empty: 'Almost empty, refill', unavailable: 'Unavailable',
    days_left: 'About {n} days left', day_left: 'About 1 day left', weeks_left: 'About {n} weeks left', refilled: 'Refilled on {d}',
    err: 'Fill in "entity" with the salt sensor.',
    l_entity: 'Salt sensor (% or distance)', l_name: 'Name', l_low: 'Warn below (%)', l_empty_distance: 'Distance when empty (cm)', l_full_distance: 'Distance when full (cm)', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Water softener salt level with a warning and an estimate of when it runs out.',
  },
  fr: {
    name: 'Sel', ok: 'Assez de sel', low: 'À remplir', empty: 'Presque vide, remplissez', unavailable: 'Indisponible',
    days_left: 'Encore environ {n} jours', day_left: 'Encore environ 1 jour', weeks_left: 'Encore environ {n} semaines', refilled: 'Rempli le {d}',
    err: 'Renseignez "entity" avec le capteur de sel.',
    l_entity: 'Capteur de sel (% ou distance)', l_name: 'Nom', l_low: 'Alerter sous (%)', l_empty_distance: 'Distance à vide (cm)', l_full_distance: 'Distance à plein (cm)', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Niveau de sel de l\'adoucisseur avec alerte et estimation.',
  },
  de: {
    name: 'Salz', ok: 'Genug Salz', low: 'Nachfüllen', empty: 'Fast leer, nachfüllen', unavailable: 'Nicht verfügbar',
    days_left: 'Noch etwa {n} Tage', day_left: 'Noch etwa 1 Tag', weeks_left: 'Noch etwa {n} Wochen', refilled: 'Nachgefüllt am {d}',
    err: 'Gib unter "entity" den Salzsensor an.',
    l_entity: 'Salzsensor (% oder Abstand)', l_name: 'Name', l_low: 'Warnen unter (%)', l_empty_distance: 'Abstand, wenn leer (cm)', l_full_distance: 'Abstand, wenn voll (cm)', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Salzstand der Enthärtungsanlage mit Warnung und Schätzung.',
  },
  es: {
    name: 'Sal', ok: 'Sal suficiente', low: 'Rellenar', empty: 'Casi vacío, rellena', unavailable: 'No disponible',
    days_left: 'Quedan unos {n} días', day_left: 'Queda aproximadamente 1 día', weeks_left: 'Quedan unas {n} semanas', refilled: 'Rellenado el {d}',
    err: 'Indica en "entity" el sensor de sal.',
    l_entity: 'Sensor de sal (% o distancia)', l_name: 'Nombre', l_low: 'Avisar por debajo de (%)', l_empty_distance: 'Distancia vacío (cm)', l_full_distance: 'Distancia lleno (cm)', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Nivel de sal del descalcificador con aviso y estimación.',
  },
  it: {
    name: 'Sale', ok: 'Sale sufficiente', low: 'Da riempire', empty: 'Quasi vuoto, riempi', unavailable: 'Non disponibile',
    days_left: 'Ancora circa {n} giorni', day_left: 'Ancora circa 1 giorno', weeks_left: 'Ancora circa {n} settimane', refilled: 'Riempito il {d}',
    err: 'Indica in "entity" il sensore del sale.',
    l_entity: 'Sensore sale (% o distanza)', l_name: 'Nome', l_low: 'Avvisa sotto (%)', l_empty_distance: 'Distanza a vuoto (cm)', l_full_distance: 'Distanza a pieno (cm)', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
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
    border: 1px solid var(--glow-card-border, rgba(255, 255, 255, 0.08));
    display: flex; align-items: center; gap: 14px; transition: border-color 0.4s, box-shadow 0.4s;
  }
  ha-card.warn { border-color: rgba(var(--c), 0.55); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); background: linear-gradient(rgba(var(--c), 0.12), rgba(var(--c), 0.12)), var(--glow-card-background, #15121F); }
  ha-card.unavailable { opacity: 0.5; }
  .halo { position: absolute; right: -50px; top: -60px; width: 160px; height: 160px; border-radius: 50%; background: rgb(var(--c)); opacity: 0.12; filter: blur(46px); pointer-events: none; transition: opacity 0.5s, background 0.4s; }
  ha-card.warn .halo { opacity: 0.4; }
  .tank { position: relative; flex-shrink: 0; width: 64px; height: 88px; }
  .tank svg { width: 100%; height: 100%; display: block; overflow: visible; }
  .tank .body { fill: var(--glow-surface, rgba(255,255,255,0.07)); stroke: var(--glow-border, rgba(255,255,255,0.14)); stroke-width: 1.5; }
  .tank .lid { fill: var(--glow-border, rgba(255,255,255,0.18)); }
  .tank .salt { transition: y 0.8s ease, height 0.8s ease; }
  .tank .line { stroke: rgb(var(--c)); stroke-width: 2.5; stroke-linecap: round; filter: drop-shadow(0 0 4px rgba(var(--c), 0.9)); transition: y1 0.8s ease, y2 0.8s ease; }
  .txt { position: relative; flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
  .name { font-size: 1.05rem; font-weight: 800; opacity: 0.8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pct { font-size: 2rem; font-weight: 800; line-height: 1.05; font-variant-numeric: tabular-nums; }
  .state { font-size: 0.92rem; font-weight: 800; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .est { font-size: 0.85rem; font-weight: 700; opacity: 0.65; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
`;

class GlowSaltCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._built = false; }
  static getConfigElement() { return document.createElement('glow-salt-card-editor'); }
  static getStubConfig(hass) {
    const e = Object.keys((hass && hass.states) || {}).find((x) => x.startsWith('sensor.') && /salt|zout/i.test(x));
    return { entity: e || '' };
  }
  setConfig(config) {
    if (!config || !config.entity) throw new Error(gsaltT(gsaltLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, low: 25, empty_distance: 50, full_distance: 5, ...config };
    this._built = false;
    this._est = undefined;
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
    let cm = v;
    if (u === 'mm') cm = v / 10;
    else if (u === 'm') cm = v * 100;
    else if (u === 'in') cm = v * 2.54;
    const e = parseFloat(this._config.empty_distance);
    const f = parseFloat(this._config.full_distance);
    if (!(e > f)) return null;
    return Math.max(0, Math.min(100, (e - cm) / (e - f) * 100));
  }

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
        if (pts.length < 3) { this._est = null; return; }
        // laatste bijvulling: een sprong van meer dan 15% omhoog
        let from = 0;
        for (let i = 1; i < pts.length; i++) if (pts[i].v - pts[i - 1].v > 15) from = i;
        this._refill = from > 0 ? pts[from].t : null;
        const seg = pts.slice(from);
        const first = seg[0];
        const last = seg[seg.length - 1];
        const days = (last.t - first.t) / 86400000;
        const used = first.v - last.v;
        this._est = days >= 2 && used > 1 ? Math.max(0, (last.v - 3) / (used / days)) : null;
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
        <div class="txt"><span class="name"></span><span class="pct"></span><span class="state"></span><span class="est"></span></div>
      </ha-card>`;
    this._card = this.shadowRoot.querySelector('ha-card');
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
    r.querySelector('.pct').textContent = p === null ? '–' : Math.round(p) + '%';
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
    if (typeof this._est === 'number' && p !== null && this._est >= 1) {
      const d = Math.round(this._est);
      est = d > 27 ? this._t('weeks_left', { n: Math.round(d / 7) }) : d === 1 ? this._t('day_left') : this._t('days_left', { n: Math.max(0, d) });
    } else if (this._refill) {
      try { est = this._t('refilled', { d: new Date(this._refill).toLocaleDateString(this._lang(), { day: 'numeric', month: 'short' }) }); } catch (e) { est = ''; }
    }
    r.querySelector('.est').textContent = est;
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
    const distance = !!unit && unit !== '%';
    const schema = [
      { name: 'entity', selector: { entity: { domain: 'sensor' } } },
      { name: 'name', selector: { text: {} } },
      { name: 'low', selector: { number: { min: 5, max: 60, step: 1, mode: 'slider', unit_of_measurement: '%' } } },
    ];
    if (distance) schema.push({ type: 'grid', name: '', schema: [
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
