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
    const rate = this._isWeight() && step && rd > 0 && cap ? step / cap * 100 / rd : this._rate;
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
