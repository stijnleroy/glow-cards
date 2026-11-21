/*
 * Glow Fridge Card
 * Een tegel voor de koelkast: temperatuur van koel- en vriesvak in een getekende koelkast,
 * waarschuwing als een deur te lang openstaat of het te warm wordt, en de waterfilter.
 */
const GFR = window.GlowKit;
const GFR_T = GFR.table({
  nl: { title: 'Koelkast', cool: 'KOEL', freeze: 'VRIES', open: 'OPEN', ok: 'Alles dicht · temperaturen goed', door_cool: 'Koelkastdeur staat al {m} open!', door_freeze: 'Diepvriesdeur staat al {m} open!', door_now: 'Deur staat open', warm_cool: 'Koelkast is te warm ({t})', warm_freeze: 'Diepvries is te warm ({t})', filter: 'Waterfilter', used: '{p} % gebruikt', left: 'nog {p} %', replace: 'Bijna op — nieuwe filter bestellen', replace_now: 'Filter vervangen', power: 'Nu {w} W', energy: '{k} kWh in totaal', min: '{n} min',
    l_name: 'Naam', l_fridge: 'Temperatuur koelvak', l_freezer: 'Temperatuur vriesvak', l_fridge_door: 'Deur koelvak', l_freezer_door: 'Deur vriesvak', l_filter: 'Waterfilter (%)', l_filter_used: 'Filterwaarde is "gebruikt" (niet "over")', l_power: 'Vermogen', l_energy: 'Energie', l_door_minutes: 'Waarschuwen na (min open)', l_fridge_max: 'Koelvak te warm boven', l_freezer_max: 'Vriesvak te warm boven', description: 'Koelkast als tegel: temperaturen, deuren en waterfilter.' },
  en: { title: 'Fridge', cool: 'FRIDGE', freeze: 'FREEZER', open: 'OPEN', ok: 'All closed · temperatures fine', door_cool: 'Fridge door open for {m}!', door_freeze: 'Freezer door open for {m}!', door_now: 'Door is open', warm_cool: 'Fridge is too warm ({t})', warm_freeze: 'Freezer is too warm ({t})', filter: 'Water filter', used: '{p} % used', left: '{p} % left', replace: 'Almost used up — order a new filter', replace_now: 'Replace the filter', power: 'Now {w} W', energy: '{k} kWh in total', min: '{n} min',
    l_name: 'Name', l_fridge: 'Fridge temperature', l_freezer: 'Freezer temperature', l_fridge_door: 'Fridge door', l_freezer_door: 'Freezer door', l_filter: 'Water filter (%)', l_filter_used: 'Filter value is "used" (not "left")', l_power: 'Power', l_energy: 'Energy', l_door_minutes: 'Warn after (min open)', l_fridge_max: 'Fridge too warm above', l_freezer_max: 'Freezer too warm above', description: 'Fridge as a tile: temperatures, doors and water filter.' },
  fr: { title: 'Frigo', cool: 'FRIGO', freeze: 'CONGÉL.', open: 'OUVERT', ok: 'Tout est fermé · températures OK', door_cool: 'Porte du frigo ouverte depuis {m} !', door_freeze: 'Porte du congélateur ouverte depuis {m} !', door_now: 'Porte ouverte', warm_cool: 'Frigo trop chaud ({t})', warm_freeze: 'Congélateur trop chaud ({t})', filter: 'Filtre à eau', used: '{p} % utilisé', left: '{p} % restant', replace: 'Presque usé — commander un filtre', replace_now: 'Remplacer le filtre', power: 'Maintenant {w} W', energy: '{k} kWh au total', min: '{n} min',
    l_name: 'Nom', l_fridge: 'Température frigo', l_freezer: 'Température congélateur', l_fridge_door: 'Porte frigo', l_freezer_door: 'Porte congélateur', l_filter: 'Filtre à eau (%)', l_filter_used: 'Valeur du filtre = "utilisé"', l_power: 'Puissance', l_energy: 'Énergie', l_door_minutes: 'Alerter après (min ouvert)', l_fridge_max: 'Frigo trop chaud au-dessus de', l_freezer_max: 'Congélateur trop chaud au-dessus de', description: 'Frigo en tuile : températures, portes et filtre à eau.' },
  de: { title: 'Kühlschrank', cool: 'KÜHL', freeze: 'GEFRIER', open: 'OFFEN', ok: 'Alles zu · Temperaturen gut', door_cool: 'Kühlschranktür seit {m} offen!', door_freeze: 'Gefriertür seit {m} offen!', door_now: 'Tür ist offen', warm_cool: 'Kühlschrank zu warm ({t})', warm_freeze: 'Gefrierfach zu warm ({t})', filter: 'Wasserfilter', used: '{p} % verbraucht', left: 'noch {p} %', replace: 'Fast verbraucht — neuen Filter bestellen', replace_now: 'Filter wechseln', power: 'Jetzt {w} W', energy: '{k} kWh insgesamt', min: '{n} Min.',
    l_name: 'Name', l_fridge: 'Temperatur Kühlfach', l_freezer: 'Temperatur Gefrierfach', l_fridge_door: 'Tür Kühlfach', l_freezer_door: 'Tür Gefrierfach', l_filter: 'Wasserfilter (%)', l_filter_used: 'Filterwert ist "verbraucht"', l_power: 'Leistung', l_energy: 'Energie', l_door_minutes: 'Warnen nach (Min. offen)', l_fridge_max: 'Kühlfach zu warm über', l_freezer_max: 'Gefrierfach zu warm über', description: 'Kühlschrank als Kachel: Temperaturen, Türen und Wasserfilter.' },
  es: { title: 'Nevera', cool: 'NEVERA', freeze: 'CONGEL.', open: 'ABIERTA', ok: 'Todo cerrado · temperaturas bien', door_cool: '¡Puerta de la nevera abierta hace {m}!', door_freeze: '¡Puerta del congelador abierta hace {m}!', door_now: 'Puerta abierta', warm_cool: 'Nevera demasiado caliente ({t})', warm_freeze: 'Congelador demasiado caliente ({t})', filter: 'Filtro de agua', used: '{p} % usado', left: 'queda {p} %', replace: 'Casi gastado — pedir filtro nuevo', replace_now: 'Cambiar el filtro', power: 'Ahora {w} W', energy: '{k} kWh en total', min: '{n} min',
    l_name: 'Nombre', l_fridge: 'Temperatura nevera', l_freezer: 'Temperatura congelador', l_fridge_door: 'Puerta nevera', l_freezer_door: 'Puerta congelador', l_filter: 'Filtro de agua (%)', l_filter_used: 'El valor del filtro es "usado"', l_power: 'Potencia', l_energy: 'Energía', l_door_minutes: 'Avisar tras (min abierta)', l_fridge_max: 'Nevera caliente por encima de', l_freezer_max: 'Congelador caliente por encima de', description: 'Nevera como mosaico: temperaturas, puertas y filtro de agua.' },
  it: { title: 'Frigorifero', cool: 'FRIGO', freeze: 'FREEZER', open: 'APERTO', ok: 'Tutto chiuso · temperature ok', door_cool: 'Porta del frigo aperta da {m}!', door_freeze: 'Porta del freezer aperta da {m}!', door_now: 'Porta aperta', warm_cool: 'Frigo troppo caldo ({t})', warm_freeze: 'Freezer troppo caldo ({t})', filter: 'Filtro acqua', used: '{p} % usato', left: '{p} % rimasto', replace: 'Quasi esaurito — ordina un filtro nuovo', replace_now: 'Sostituisci il filtro', power: 'Ora {w} W', energy: '{k} kWh in totale', min: '{n} min',
    l_name: 'Nome', l_fridge: 'Temperatura frigo', l_freezer: 'Temperatura freezer', l_fridge_door: 'Porta frigo', l_freezer_door: 'Porta freezer', l_filter: 'Filtro acqua (%)', l_filter_used: 'Il valore del filtro è "usato"', l_power: 'Potenza', l_energy: 'Energia', l_door_minutes: 'Avvisa dopo (min aperta)', l_fridge_max: 'Frigo caldo sopra', l_freezer_max: 'Freezer caldo sopra', description: 'Frigorifero come riquadro: temperature, porte e filtro acqua.' },
});
const GFR_COOL = '142, 197, 255', GFR_FRZ = '185, 168, 255', GFR_WARN = '255, 143, 143', GFR_OK = '143, 227, 184', GFR_PEACH = '255, 166, 107';

const GFR_CSS = GFR.CSS + `
  ha-card { padding: 18px; }
  .halo { left: auto; right: -50px; top: auto; bottom: -70px; width: 170px; height: 170px; filter: blur(46px); }
  .wrap { position: relative; display: flex; gap: 16px; align-items: stretch; height: 100%; }
  .fr { width: 112px; flex-shrink: 0; border-radius: 20px; padding: 8px; box-sizing: border-box; display: flex; flex-direction: column; gap: 8px; min-height: 200px;
    background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .door { flex: 1; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding: 0;
    border: 2px solid rgba(var(--c), 0.5); background: linear-gradient(160deg, rgba(var(--c), 0.28), rgba(var(--c), 0.06)); box-shadow: inset 0 0 18px rgba(var(--c), 0.25); }
  .door.big { flex: 1.4; }
  .door.alarm { --c: ${GFR_WARN}; border-color: rgb(var(--c)); background: rgba(var(--c), 0.25); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.7); animation: gfr 1.6s ease-in-out infinite; }
  @keyframes gfr { 50% { box-shadow: 0 0 calc(var(--glow) * 0.3) rgba(var(--c), 0.3); } }
  .door b { font-size: 1.8rem; font-weight: 800; line-height: 1; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .door:not(.big) b { font-size: 1.55rem; }
  .door span { font-size: 0.7rem; font-weight: 800; opacity: 0.7; }
  .info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
  .info > b { font-size: 1.25rem; font-weight: 800; }
  .st { font-size: 0.95rem; font-weight: 800; }
  .gap { flex: 1; }
  .fl { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 800; }
  .fl span:first-child { opacity: 0.7; }
  .bar { height: 10px; border-radius: 5px; overflow: hidden; position: relative; background: var(--glow-surface, rgba(255,255,255,0.08)); }
  .bar i { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 5px; background: rgb(var(--c)); box-shadow: 0 0 10px rgba(var(--c), 0.7); }
  .fn { font-size: 0.75rem; font-weight: 800; }
  .pw { font-size: 0.8rem; font-weight: 700; opacity: 0.6; }
`;

class GlowFridgeCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  static getConfigElement() { return document.createElement('glow-fridge-card-editor'); }
  static getStubConfig(hass) {
    const k = Object.keys((hass && hass.states) || {});
    const f = (re) => k.find((e) => re.test(e)) || undefined;
    return { fridge: f(/^sensor\..*(koelkast|fridge|cooler).*temp/), freezer: f(/^sensor\..*(freezer|diepvries|vries).*temp/), fridge_door: f(/^binary_sensor\..*(cooler|fridge|koel).*door/), freezer_door: f(/^binary_sensor\..*(freezer|vries).*door/), filter: f(/^sensor\..*water_filter/) };
  }
  setConfig(config) { this._config = { glow: 15, door_minutes: 2, fridge_max: 7, freezer_max: -15, filter_used: true, ...(config || {}) }; this._key = null; if (this._hass) this._render(); }
  set hass(hass) { this._hass = hass; if (this._config) this._render(); }
  connectedCallback() { this._timer = setInterval(() => { this._key = null; this._render(); }, 30000); }
  disconnectedCallback() { clearInterval(this._timer); }
  getCardSize() { return 3; }
  getGridOptions() { return { columns: 6, rows: 3, min_columns: 6, min_rows: 3 }; }
  _lang() { return GFR.lang(this._hass, this._config.language, GFR_T); }
  _t(k, v) { return GFR.t(GFR_T, this._lang(), k, v); }
  _door(id) {
    const s = id && this._hass.states[id];
    if (!s || s.state !== 'on') return null;
    return (Date.now() - new Date(s.last_changed).getTime()) / 60000;
  }

  _render() {
    if (!this._hass || !this._config) return;
    const c = this._config;
    const l = this._lang();
    const E = GFR.esc;
    const tc = GFR.num(this._hass, c.fridge), tf = GFR.num(this._hass, c.freezer);
    const dc = this._door(c.fridge_door), df = this._door(c.freezer_door);
    const fil = GFR.num(this._hass, c.filter);
    const pw = GFR.num(this._hass, c.power), en = GFR.num(this._hass, c.energy);
    const key = JSON.stringify([tc, tf, dc !== null && Math.floor(dc), df !== null && Math.floor(df), fil, pw, en, l, c]);
    if (key === this._key) return;
    this._key = key;
    const lim = parseFloat(c.door_minutes) || 2;
    const deg = (v) => (v === null ? '–' : GFR.fmt(l, v, Math.abs(v) < 10 && v % 1 ? 1 : 0).replace('-', '−') + '°');
    const mins = (m) => this._t('min', { n: Math.max(1, Math.round(m)) });
    const warmC = tc !== null && tc > c.fridge_max, warmF = tf !== null && tf > c.freezer_max;
    let st = this._t('ok'), sc = GFR_OK;
    if (dc !== null && dc >= lim) { st = this._t('door_cool', { m: mins(dc) }); sc = GFR_WARN; }
    else if (df !== null && df >= lim) { st = this._t('door_freeze', { m: mins(df) }); sc = GFR_WARN; }
    else if (warmF) { st = this._t('warm_freeze', { t: deg(tf) }); sc = GFR_WARN; }
    else if (warmC) { st = this._t('warm_cool', { t: deg(tc) }); sc = GFR_WARN; }
    else if (dc !== null || df !== null) { st = this._t('door_now'); sc = GFR_PEACH; }
    let filter = '';
    if (fil !== null) {
      const used = c.filter_used !== false ? fil : 100 - fil;
      const fc = used >= 95 ? GFR_WARN : used >= 85 ? GFR_PEACH : GFR_OK;
      const note = used >= 100 ? this._t('replace_now') : used >= 85 ? this._t('replace') : '';
      filter = `<div class="fl"><span>${E(this._t('filter'))}</span><span class="ink" style="--c:${fc}">${E(c.filter_used !== false ? this._t('used', { p: Math.round(fil) }) : this._t('left', { p: Math.round(fil) }))}</span></div>
        <div class="bar" style="--c:${fc}"><i style="width:${Math.max(0, Math.min(100, used))}%"></i></div>${note ? `<span class="fn ink" style="--c:${fc}">${E(note)}</span>` : ''}`;
    }
    const pwTxt = [pw !== null ? this._t('power', { w: Math.round(pw) }) : '', en !== null ? this._t('energy', { k: GFR.fmt(l, en, 0) }) : ''].filter(Boolean).join(' · ');
    const door = (cls, t, lab, d, id, col) => `<button type="button" class="door${cls}${d !== null && d >= lim ? ' alarm' : ''}" style="--c:${d !== null ? GFR_WARN : col}" data-e="${E(id || '')}"><b>${deg(t)}</b><span>${E(d !== null ? this._t('open') : lab)}</span></button>`;
    this.shadowRoot.innerHTML = `<style>${GFR_CSS}</style><ha-card style="--a:${sc === GFR_OK ? GFR_COOL : sc};--glow:${parseInt(c.glow, 10) || 0}px"><div class="halo"></div><div class="wrap">
      <div class="fr">${c.fridge ? door(' big', tc, this._t('cool'), dc, c.fridge, GFR_COOL) : ''}${c.freezer ? door('', tf, this._t('freeze'), df, c.freezer, GFR_FRZ) : ''}</div>
      <div class="info"><b>${E(c.name || this._t('title'))}</b><span class="st ink" style="--c:${sc}">${E(st)}</span><span class="gap"></span>${filter}${pwTxt ? `<span class="pw">${E(pwTxt)}</span>` : ''}</div></div></ha-card>`;
    this.shadowRoot.querySelectorAll('[data-e]').forEach((b) => b.addEventListener('click', () => { if (b.dataset.e) GFR.moreInfo(this, b.dataset.e); }));
  }
}

GFR.editor('glow-fridge-card-editor', GFR_T, () => [
  { name: 'name', selector: { text: {} } },
  { type: 'grid', name: '', schema: [
    { name: 'fridge', selector: { entity: { domain: 'sensor' } } },
    { name: 'freezer', selector: { entity: { domain: 'sensor' } } },
    { name: 'fridge_door', selector: { entity: { domain: 'binary_sensor' } } },
    { name: 'freezer_door', selector: { entity: { domain: 'binary_sensor' } } },
  ] },
  { name: 'filter', selector: { entity: { domain: 'sensor' } } },
  { name: 'filter_used', selector: { boolean: {} } },
  { type: 'grid', name: '', schema: [
    { name: 'power', selector: { entity: { domain: 'sensor' } } },
    { name: 'energy', selector: { entity: { domain: 'sensor' } } },
    { name: 'door_minutes', selector: { number: { min: 1, max: 30, step: 1, mode: 'box' } } },
    { name: 'fridge_max', selector: { number: { min: 0, max: 15, step: 0.5, mode: 'box', unit_of_measurement: '°C' } } },
    { name: 'freezer_max', selector: { number: { min: -30, max: 0, step: 0.5, mode: 'box', unit_of_measurement: '°C' } } },
  ] },
], { door_minutes: 2, fridge_max: 7, freezer_max: -15, filter_used: true, glow: 15 });
GFR.register('glow-fridge-card', 'Glow Fridge Card', GFR_T, GlowFridgeCard);
