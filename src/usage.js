/*
 * Glow Usage Card
 * Verbruik van gas en water (of eender welke meterstand): vandaag, gisteren,
 * deze week en deze maand uit de statistieken van Home Assistant, met staafjes
 * voor de laatste dagen en optioneel de kosten.
 */

const GUSE_I18N = {
  nl: {
    today: 'Vandaag', yesterday: 'Gisteren', week: 'Deze week', month: 'Deze maand', vs: '{d} t.o.v. gisteren', same: 'Zelfde als gisteren', days: 'Laatste {n} dagen', cost: 'Kosten', loading: 'Gegevens laden…', none: 'Nog geen statistieken voor deze meter.',
    gas: 'Gas', water: 'Water', energy: 'Elektriciteit', imp: 'Afname', exp: 'Injectie', net: 'netto',
    err: 'Vul "meters" in met minstens één meter (gas, water, …).',
    l_meters: 'Meters (totale meterstand, bv. gas, water en elektriciteit)', l_name: 'Titel', l_days: 'Aantal dagen in de grafiek', l_gas_price: 'Prijs gas per eenheid (€)', l_water_price: 'Prijs water per eenheid (€)', l_energy_price: 'Prijs elektriciteit per kWh (€)', l_export_price: 'Vergoeding injectie per kWh (€)', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Verbruik van gas en water: vandaag, week, maand en een grafiek van de laatste dagen.',
  },
  en: {
    today: 'Today', yesterday: 'Yesterday', week: 'This week', month: 'This month', vs: '{d} vs yesterday', same: 'Same as yesterday', days: 'Last {n} days', cost: 'Cost', loading: 'Loading data…', none: 'No statistics for this meter yet.',
    gas: 'Gas', water: 'Water', energy: 'Electricity', imp: 'Import', exp: 'Export', net: 'net',
    err: 'Fill in "meters" with at least one meter (gas, water, …).',
    l_meters: 'Meters (total meter reading, e.g. gas, water and electricity)', l_name: 'Title', l_days: 'Days in the chart', l_gas_price: 'Gas price per unit', l_water_price: 'Water price per unit', l_energy_price: 'Electricity price per kWh', l_export_price: 'Export compensation per kWh', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Gas and water usage: today, week, month and a chart of the last days.',
  },
  fr: {
    today: 'Aujourd\'hui', yesterday: 'Hier', week: 'Cette semaine', month: 'Ce mois', vs: '{d} par rapport à hier', same: 'Comme hier', days: '{n} derniers jours', cost: 'Coût', loading: 'Chargement…', none: 'Pas encore de statistiques pour ce compteur.',
    gas: 'Gaz', water: 'Eau', energy: 'Électricité', imp: 'Prélèvement', exp: 'Injection', net: 'net',
    err: 'Renseignez "meters" avec au moins un compteur.',
    l_meters: 'Compteurs (index total, p. ex. gaz et eau)', l_name: 'Titre', l_days: 'Jours dans le graphique', l_gas_price: 'Prix du gaz par unité', l_water_price: 'Prix de l\'eau par unité', l_energy_price: 'Prix de l\'électricité par kWh', l_export_price: 'Rémunération de l\'injection par kWh', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Consommation de gaz et d\'eau : jour, semaine, mois et graphique.',
  },
  de: {
    today: 'Heute', yesterday: 'Gestern', week: 'Diese Woche', month: 'Dieser Monat', vs: '{d} gegenüber gestern', same: 'Wie gestern', days: 'Letzte {n} Tage', cost: 'Kosten', loading: 'Daten laden…', none: 'Noch keine Statistiken für diesen Zähler.',
    gas: 'Gas', water: 'Wasser', energy: 'Strom', imp: 'Bezug', exp: 'Einspeisung', net: 'netto',
    err: 'Gib unter "meters" mindestens einen Zähler an.',
    l_meters: 'Zähler (Gesamtstand, z. B. Gas und Wasser)', l_name: 'Titel', l_days: 'Tage im Diagramm', l_gas_price: 'Gaspreis pro Einheit', l_water_price: 'Wasserpreis pro Einheit', l_energy_price: 'Strompreis pro kWh', l_export_price: 'Einspeisevergütung pro kWh', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Gas- und Wasserverbrauch: heute, Woche, Monat und Diagramm.',
  },
  es: {
    today: 'Hoy', yesterday: 'Ayer', week: 'Esta semana', month: 'Este mes', vs: '{d} respecto a ayer', same: 'Igual que ayer', days: 'Últimos {n} días', cost: 'Coste', loading: 'Cargando datos…', none: 'Aún no hay estadísticas para este contador.',
    gas: 'Gas', water: 'Agua', energy: 'Electricidad', imp: 'Consumo de red', exp: 'Vertido', net: 'neto',
    err: 'Indica en "meters" al menos un contador.',
    l_meters: 'Contadores (lectura total, p. ej. gas y agua)', l_name: 'Título', l_days: 'Días en el gráfico', l_gas_price: 'Precio del gas por unidad', l_water_price: 'Precio del agua por unidad', l_energy_price: 'Precio de la electricidad por kWh', l_export_price: 'Compensación por vertido por kWh', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Consumo de gas y agua: hoy, semana, mes y gráfico.',
  },
  it: {
    today: 'Oggi', yesterday: 'Ieri', week: 'Questa settimana', month: 'Questo mese', vs: '{d} rispetto a ieri', same: 'Come ieri', days: 'Ultimi {n} giorni', cost: 'Costo', loading: 'Caricamento…', none: 'Ancora nessuna statistica per questo contatore.',
    gas: 'Gas', water: 'Acqua', energy: 'Elettricità', imp: 'Prelievo', exp: 'Immissione', net: 'netto',
    err: 'Indica in "meters" almeno un contatore.',
    l_meters: 'Contatori (lettura totale, es. gas e acqua)', l_name: 'Titolo', l_days: 'Giorni nel grafico', l_gas_price: 'Prezzo del gas per unità', l_water_price: 'Prezzo dell\'acqua per unità', l_energy_price: 'Prezzo dell\'elettricità per kWh', l_export_price: 'Compenso per l\'immissione per kWh', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Consumi di gas e acqua: oggi, settimana, mese e grafico.',
  },
};
const GUSE_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
function guseLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GUSE_I18N[l] ? l : 'en';
}
function guseT(lang, key, vars) {
  let s = (GUSE_I18N[lang] && GUSE_I18N[lang][key]) || GUSE_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function guseEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function guseRgb(hex) {
  let h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const v = parseInt(h.slice(0, 6), 16);
  return h.length >= 6 && !isNaN(v) ? ((v >> 16) & 255) + ', ' + ((v >> 8) & 255) + ', ' + (v & 255) : null;
}

const GUSE_KIND = {
  gas: { c: '255, 184, 153', icon: '<path d="M12 3c1 3.5 5 6 5 10.5A5 5 0 0 1 7 13.5C7 11 8.5 9.5 9.5 8c.3 2 1.2 3 2.3 3.4C11.4 8.5 12 5.5 12 3z"/>' },
  water: { c: '142, 197, 255', icon: '<path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.4 0z"/>' },
  energy: { c: '255, 224, 138', icon: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>' },
  other: { c: '185, 168, 255', icon: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>' },
};
const GUSE_SVG = (b) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`;

const GUSE_STYLE = `
  :host { display: block; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: column; gap: 14px; padding: 18px;
    border-radius: var(--ha-card-border-radius, 24px); container-type: inline-size;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.35); box-shadow: 0 0 calc(var(--glow) * 0.7) rgba(var(--c), 0.2); transition: border-color 0.4s, box-shadow 0.4s;
  }
  .halo { position: absolute; right: -70px; top: -80px; width: 220px; height: 220px; border-radius: 50%; filter: blur(60px); background: rgb(var(--c)); opacity: 0.22; pointer-events: none; transition: background 0.4s; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .tabs { position: relative; display: flex; gap: 6px; flex-wrap: wrap; }
  .tab { height: 36px; padding: 0 14px 0 10px; border-radius: 18px; display: flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid transparent; transition: background 0.3s, border-color 0.3s; }
  .tab svg { width: 17px; height: 17px; color: color-mix(in srgb, rgb(var(--k)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .tab.sel { border-color: rgba(var(--k), 0.6); background: rgba(var(--k), 0.16); box-shadow: 0 0 calc(var(--glow) * 0.7) rgba(var(--k), 0.3); }
  .title { position: relative; font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .top { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 14px; align-items: end; }
  .big { display: flex; align-items: center; gap: 14px; min-width: 0; }
  .big .ic { width: 56px; height: 56px; border-radius: 28px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.7); }
  .big .ic svg { width: 28px; height: 28px; }
  .big .tx { display: flex; flex-direction: column; min-width: 0; }
  .big .l { font-size: 13px; font-weight: 800; opacity: 0.65; }
  .big .v { font-size: 38px; font-weight: 800; line-height: 1.05; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .big .v small { font-size: 17px; font-weight: 800; opacity: 0.7; margin-left: 4px; letter-spacing: 0; }
  .big .cmp { font-size: 13px; font-weight: 800; color: color-mix(in srgb, rgb(var(--q)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); white-space: nowrap; }
  .tiles { display: flex; gap: 8px; }
  .tile { display: flex; flex-direction: column; gap: 1px; padding: 10px 14px; border-radius: 16px; background: var(--glow-surface, rgba(255,255,255,0.07)); min-width: 96px; }
  .tile .l { font-size: 11px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; opacity: 0.6; white-space: nowrap; }
  .tile .v { font-size: 18px; font-weight: 800; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .tile .e { font-size: 12px; font-weight: 800; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); white-space: nowrap; }
  .chart { position: relative; display: flex; flex-direction: column; gap: 6px; }
  .bars { position: relative; display: flex; align-items: flex-end; gap: 8px; height: 140px; padding-top: 18px; }
  .col { flex: 1; min-width: 0; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 6px; }
  .col .val { font-size: 11px; font-weight: 800; opacity: 0; transition: opacity 0.2s; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .col .bar { width: 100%; max-width: 46px; min-height: 4px; border-radius: 10px 10px 6px 6px; background: linear-gradient(180deg, rgba(var(--c), 0.75), rgba(var(--c), 0.35)); transition: height 0.6s cubic-bezier(.2, .9, .3, 1); }
  .col.today .bar { background: rgb(var(--c)); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.6); }
  .col.today .val, .col.peak .val, .bars:hover .col .val { opacity: 0.85; }
  .col .dn { font-size: 12px; font-weight: 800; opacity: 0.6; }
  .col.today .dn { opacity: 1; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .avg { position: absolute; left: 0; right: 0; border-top: 2px dashed rgba(var(--c), 0.45); pointer-events: none; }
  .big .xp, .tile .x { font-weight: 800; white-space: nowrap; color: color-mix(in srgb, rgb(var(--x)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .big .xp { font-size: 13px; }
  .tile .x { font-size: 13px; }
  .tile .e.gain { color: color-mix(in srgb, rgb(var(--x)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .pair { width: 100%; max-width: 52px; display: flex; align-items: flex-end; justify-content: center; gap: 3px; }
  .pair .bar { flex: 1; }
  .pair .bar.x { background: linear-gradient(180deg, rgba(var(--x), 0.75), rgba(var(--x), 0.35)); }
  .col.today .pair .bar.x { background: rgb(var(--x)); box-shadow: 0 0 var(--glow) rgba(var(--x), 0.6); }
  .legend { display: inline-flex; gap: 12px; margin-left: 10px; text-transform: none; letter-spacing: 0; }
  .legend i { display: inline-block; width: 9px; height: 9px; border-radius: 3px; margin-right: 5px; background: rgb(var(--c)); }
  .legend i.x { background: rgb(var(--x)); }
  .msg { padding: 24px 8px; text-align: center; font-weight: 700; opacity: 0.6; }
  @container (max-width: 520px) {
    .top { grid-template-columns: minmax(0, 1fr); }
    .tiles { flex-wrap: wrap; }
    .tile { flex: 1; }
    .big .v { font-size: 32px; }
    .bars { gap: 5px; }
  }
`;

class GlowUsageCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._built = false; this._data = {}; this._sel = 0; }
  static getConfigElement() { return document.createElement('glow-usage-card-editor'); }
  static getStubConfig(hass) {
    const st = (hass && hass.states) || {};
    const ids = Object.keys(st).filter((e) => e.startsWith('sensor.') && ['gas', 'water', 'energy'].includes(st[e].attributes.device_class) && st[e].attributes.state_class === 'total_increasing');
    return { meters: ids.slice(0, 3) };
  }
  setConfig(config) {
    const m = Array.isArray(config && config.meters) ? config.meters : config && config.entity ? [config.entity] : [];
    if (!m.length) throw new Error(guseT(guseLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, days: 7, ...config };
    this._meters = m.map((x) => (typeof x === 'string' || Array.isArray(x) ? { entity: x } : x)).filter((x) => x && x.entity && [].concat(x.entity).filter(Boolean).length);
    this._built = false;
    this._data = {};
    this._loadedAt = 0;
    if (this._hass) this._render();
  }
  set hass(hass) { this._hass = hass; if (this._config) this._render(); }
  get hass() { return this._hass; }
  getCardSize() { return 5; }
  getGridOptions() { return { columns: 12, rows: 'auto', min_columns: 6 }; }
  connectedCallback() { clearInterval(this._tick); this._tick = setInterval(() => { this._loadedAt = 0; this._render(); }, 600000); }
  disconnectedCallback() { clearInterval(this._tick); }

  _lang() { return guseLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return guseT(this._lang(), k, v); }
  _loc() { return (this._hass && this._hass.locale && this._hass.locale.language) || this._lang(); }

  // een meter kan uit meerdere sensoren bestaan (bv. dag- en nachttarief), die worden opgeteld
  _ids(m) { return [].concat(m.entity).filter(Boolean); }
  _main(m) { return this._ids(m)[0]; }
  _xids(m) { return [].concat(m.export || []).filter(Boolean); }
  _mkey(m) { return this._ids(m).join(',') + (this._xids(m).length ? '|' + this._xids(m).join(',') : ''); }
  _xprice(m) { const p = typeof m.export_price === 'number' ? m.export_price : this._config.export_price; return typeof p === 'number' ? p : parseFloat(p) || 0; }

  _kind(m) {
    const s = this._hass.states[this._main(m)];
    const dc = s && s.attributes.device_class;
    if (m.kind) return m.kind;
    if (dc === 'gas' || /gas/i.test(this._main(m))) return 'gas';
    if (dc === 'water' || /water/i.test(this._main(m))) return 'water';
    if (dc === 'energy') return 'energy';
    return 'other';
  }
  _unit(m) { const s = this._hass.states[this._main(m)]; return m.unit || (s && s.attributes.unit_of_measurement) || ''; }
  _price(m) {
    if (typeof m.price === 'number') return m.price;
    const k = this._kind(m);
    const p = k === 'gas' ? this._config.gas_price : k === 'water' ? this._config.water_price : k === 'energy' ? this._config.energy_price : null;
    return typeof p === 'number' ? p : parseFloat(p) || null;
  }

  _fmt(v, m) {
    if (typeof v !== 'number' || isNaN(v)) return '–';
    const u = this._unit(m).toLowerCase();
    const d = u === 'l' || u === 'wh' ? 0 : Math.abs(v) < 10 ? 2 : 1;
    try { return v.toLocaleString(this._loc(), { minimumFractionDigits: d, maximumFractionDigits: d }); } catch (e) { return v.toFixed(d); }
  }
  _money(v) {
    try { return v.toLocaleString(this._loc(), { style: 'currency', currency: (this._hass.config && this._hass.config.currency) || 'EUR' }); } catch (e) { return '€ ' + v.toFixed(2); }
  }

  // dagtotalen en maandtotaal uit de langetermijnstatistieken
  _load() {
    if (this._loading || (this._loadedAt && Date.now() - this._loadedAt < 600000)) return;
    if (!this._hass.callWS) return;
    this._loading = true;
    this._loadedAt = Date.now();
    const n = Math.max(7, parseInt(this._config.days, 10) || 7);
    const now = new Date();
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const from = new Date(dayStart.getTime() - (Math.max(n, 8) - 1) * 86400000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const ids = [...new Set([].concat(...this._meters.map((m) => this._ids(m).concat(this._xids(m)))))];
    const ws = (period, start) => this._hass.callWS({ type: 'recorder/statistics_during_period', start_time: start.toISOString(), statistic_ids: ids, period, types: ['change'] });
    Promise.all([ws('day', from < monthStart ? from : monthStart), ws('month', monthStart)])
      .then(([days, months]) => {
        const agg = (list) => {
          const sum = new Map();
          let month = null;
          list.forEach((id) => {
            (days[id] || []).forEach((r) => {
              const t = typeof r.start === 'number' ? r.start : Date.parse(r.start);
              sum.set(t, (sum.get(t) || 0) + (r.change || 0));
            });
            const mc = ((months[id] || [])[0] || {}).change;
            if (typeof mc === 'number') month = (month || 0) + mc;
          });
          return { days: [...sum.entries()].sort((a, b) => a[0] - b[0]).map(([t, v]) => ({ t, v })), month };
        };
        this._meters.forEach((m) => {
          const d = agg(this._ids(m));
          if (this._xids(m).length) d.x = agg(this._xids(m));
          this._data[this._mkey(m)] = d;
        });
      })
      .catch(() => { this._meters.forEach((m) => { const k = this._mkey(m); this._data[k] = this._data[k] || { days: [], month: null, error: true }; }); })
      .finally(() => { this._loading = false; this._render(); });
  }

  _build() {
    this.shadowRoot.innerHTML = `<style>${GUSE_STYLE}</style><ha-card><div class="halo"></div><div class="body"></div></ha-card>`;
    this._card = this.shadowRoot.querySelector('ha-card');
    this._body = this.shadowRoot.querySelector('.body');
    this._body.style.cssText = 'position:relative;display:flex;flex-direction:column;gap:14px';
    this._body.addEventListener('click', (e) => {
      const t = e.target.closest('.tab');
      if (t) { this._sel = +t.dataset.i; this._render(); return; }
      if (e.target.closest('.big .ic')) this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._main(this._meters[this._sel]) }, bubbles: true, composed: true }));
    });
    this._built = true;
    this._builtLang = this._lang();
    this._key = null;
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    this._load();
    const c = this._config;
    if (this._sel >= this._meters.length) this._sel = 0;
    const m = this._meters[this._sel];
    const kind = this._kind(m);
    const col = guseRgb(m.color) || GUSE_KIND[kind].c;
    this._card.style.setProperty('--c', col);
    this._card.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');
    const unit = this._unit(m);
    const st = this._hass.states;

    let html = '';
    if (c.name) html += `<span class="title">${guseEsc(c.name)}</span>`;
    if (this._meters.length > 1) {
      html += `<div class="tabs">${this._meters.map((x, i) => {
        const k = this._kind(x);
        const s = st[this._main(x)];
        return `<button class="tab${i === this._sel ? ' sel' : ''}" type="button" data-i="${i}" style="--k:${guseRgb(x.color) || GUSE_KIND[k].c}">${GUSE_SVG(GUSE_KIND[k].icon)}${guseEsc(x.name || (k !== 'other' ? this._t(k) : (s && s.attributes.friendly_name) || this._main(x)))}</button>`;
      }).join('')}</div>`;
    }
    const data = this._data[this._mkey(m)];
    if (!data) {
      html += `<div class="msg">${guseEsc(this._t('loading'))}</div>`;
    } else if (!data.days.length) {
      html += `<div class="msg">${guseEsc(this._t('none'))}</div>`;
    } else {
      const now = new Date();
      const d0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const dayMap = (list) => new Map(list.map((x) => [new Date(new Date(x.t).getFullYear(), new Date(x.t).getMonth(), new Date(x.t).getDate()).getTime(), x.v]));
      const byDay = dayMap(data.days);
      const val = (t) => byDay.get(t) || 0;
      const X = data.x;
      const xDay = X ? dayMap(X.days) : null;
      const xval = (t) => (xDay && xDay.get(t)) || 0;
      const XC = '143, 227, 184';
      this._card.style.setProperty('--x', XC);
      const today = val(d0);
      const yest = val(d0 - 86400000);
      // week vanaf maandag
      const dow = (now.getDay() + 6) % 7;
      let week = 0;
      for (let i = 0; i <= dow; i++) week += val(d0 - i * 86400000);
      const mStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
      const month = data.month !== null ? data.month : [...byDay.entries()].filter(([t]) => t >= mStart).reduce((a, [, v]) => a + v, 0);
      let xw = 0;
      for (let i = 0; i <= dow; i++) xw += xval(d0 - i * 86400000);
      const xs = X ? { today: xval(d0), yest: xval(d0 - 86400000), week: xw, month: X.month !== null ? X.month : [...xDay.entries()].filter(([t]) => t >= mStart).reduce((a, [, v]) => a + v, 0) } : null;
      const diff = today - yest;
      const up = diff > 0;
      const q = Math.abs(diff) < 1e-9 ? '201, 196, 221' : up ? '255, 184, 153' : '143, 227, 184';
      const cmp = Math.abs(diff) < 1e-9 ? this._t('same') : this._t('vs', { d: (up ? '▲ +' : '▼ −') + this._fmt(Math.abs(diff), m) + ' ' + unit });
      const price = this._price(m);
      const xprice = X ? this._xprice(m) : 0;
      const money = (v, xv) => {
        if (!price && !xprice) return '';
        const net = v * (price || 0) - (xv || 0) * xprice;
        return `<span class="e${net < 0 ? ' gain' : ''}">${net < 0 ? '+ ' : ''}${guseEsc(this._money(Math.abs(net)))}${X ? ' ' + guseEsc(this._t('net')) : ''}</span>`;
      };
      const xline = (v, cls) => (X ? `<span class="${cls}">↑ ${guseEsc(this._fmt(v, m))} ${guseEsc(unit)}</span>` : '');
      html += `
        <div class="top">
          <div class="big">
            <span class="ic">${GUSE_SVG(GUSE_KIND[kind].icon)}</span>
            <span class="tx">
              <span class="l">${guseEsc(this._t('today'))}${X ? ' · ' + guseEsc(this._t('imp')) : ''}</span>
              <span class="v">${guseEsc(this._fmt(today, m))}<small>${guseEsc(unit)}</small></span>
              <span class="cmp" style="--q:${q}">${guseEsc(cmp)}</span>
              ${X ? `<span class="xp">↑ ${guseEsc(this._t('exp'))} ${guseEsc(this._fmt(xs.today, m))} ${guseEsc(unit)}</span>` : ''}
            </span>
          </div>
          <div class="tiles">
            <div class="tile"><span class="l">${guseEsc(this._t('yesterday'))}</span><span class="v">${guseEsc(this._fmt(yest, m))} ${guseEsc(unit)}</span>${xline(xs && xs.yest, 'x')}${money(yest, xs && xs.yest)}</div>
            <div class="tile"><span class="l">${guseEsc(this._t('week'))}</span><span class="v">${guseEsc(this._fmt(week, m))} ${guseEsc(unit)}</span>${xline(xs && xs.week, 'x')}${money(week, xs && xs.week)}</div>
            <div class="tile"><span class="l">${guseEsc(this._t('month'))}</span><span class="v">${guseEsc(this._fmt(month, m))} ${guseEsc(unit)}</span>${xline(xs && xs.month, 'x')}${money(month, xs && xs.month)}</div>
          </div>
        </div>`;
      // staafjes
      const n = Math.max(3, Math.min(31, parseInt(c.days, 10) || 7));
      const cols = [];
      for (let i = n - 1; i >= 0; i--) cols.push({ t: d0 - i * 86400000, v: val(d0 - i * 86400000), x: xval(d0 - i * 86400000) });
      const max = Math.max(...cols.map((x) => Math.max(x.v, X ? x.x : 0)), 1e-9);
      const past = cols.slice(0, -1).filter((x) => x.v > 0);
      const avg = past.length ? past.reduce((a, x) => a + x.v, 0) / past.length : 0;
      const peak = cols.reduce((a, x, i) => (x.v > cols[a].v ? i : a), 0);
      const H = 140 - 18 - 22;
      html += `<div class="chart"><span class="title">${guseEsc(this._t('days', { n }))}${X ? `<span class="legend"><span><i></i>${guseEsc(this._t('imp'))}</span><span><i class="x"></i>${guseEsc(this._t('exp'))}</span></span>` : ''}</span><div class="bars">
        ${avg ? `<span class="avg" style="bottom:${(22 + avg / max * H).toFixed(1)}px"></span>` : ''}
        ${cols.map((x, i) => {
          let dn;
          try { dn = new Date(x.t).toLocaleDateString(this._loc(), n > 10 ? { day: 'numeric' } : { weekday: 'short' }); } catch (e) { dn = ''; }
          return `<div class="col${i === cols.length - 1 ? ' today' : ''}${i === peak ? ' peak' : ''}"><span class="val">${guseEsc(this._fmt(x.v, m))}</span>${X ? `<span class="pair"><span class="bar" style="height:${Math.max(4, x.v / max * H).toFixed(1)}px"></span><span class="bar x" style="height:${Math.max(4, x.x / max * H).toFixed(1)}px"></span></span>` : `<span class="bar" style="height:${Math.max(4, x.v / max * H).toFixed(1)}px"></span>`}<span class="dn">${guseEsc(dn.replace('.', ''))}</span></div>`;
        }).join('')}
      </div></div>`;
    }
    if (html !== this._key) { this._key = html; this._body.innerHTML = html; }
  }
}

class GlowUsageCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._render(); }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = guseLang(this._hass, this._config.language);
    const t = (k) => guseT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => guseT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length)) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.glow === 15) delete v.glow;
        if (v.days === 7) delete v.days;
        delete v.entity;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    const simple = (this._config.meters || []).every((x) => typeof x === 'string');
    this._form.schema = [
      ...(simple ? [{ name: 'meters', selector: { entity: { domain: 'sensor', multiple: true } } }] : []),
      { name: 'name', selector: { text: {} } },
      { type: 'grid', name: '', schema: [
        { name: 'gas_price', selector: { number: { min: 0, max: 20, step: 0.0001, mode: 'box' } } },
        { name: 'water_price', selector: { number: { min: 0, max: 20, step: 0.0001, mode: 'box' } } },
        { name: 'energy_price', selector: { number: { min: 0, max: 20, step: 0.0001, mode: 'box' } } },
        { name: 'export_price', selector: { number: { min: 0, max: 20, step: 0.0001, mode: 'box' } } },
      ] },
      { name: 'days', selector: { number: { min: 3, max: 31, step: 1, mode: 'box' } } },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GUSE_LANG_NAMES).map((k) => ({ value: k, label: GUSE_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, days: 7, language: 'auto', ...this._config, meters: this._config.meters || (this._config.entity ? [this._config.entity] : []) };
  }
}

if (!customElements.get('glow-usage-card')) customElements.define('glow-usage-card', GlowUsageCard);
if (!customElements.get('glow-usage-card-editor')) customElements.define('glow-usage-card-editor', GlowUsageCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-usage-card')) {
  window.customCards.push({ type: 'glow-usage-card', name: 'Glow Usage Card', description: guseT(guseLang(null), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}
