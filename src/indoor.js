/*
 * Glow Indoor Card
 * Temperatuur en luchtvochtigheid van alle ruimtes in één kaart, gekleurd van koud naar warm,
 * met waarschuwingen (vochtig, droog, bijna vorst) en het verloop van de laatste 24 uur.
 */
const GIN = window.GlowKit;
const GIN_T = GIN.table({
  nl: { title: 'Binnenklimaat', sub: 'Binnen gemiddeld {t} · buiten {o}', sub_in: 'Binnen gemiddeld {t}', alerts: '{n} aandachtspunten', alert1: '1 aandachtspunt', all_ok: 'alles in orde', wet: 'Vochtig — even verluchten', very_wet: 'Erg vochtig — verluchten', dry: 'Droge lucht', frost: 'Bijna vorst', cold: 'Koud', hot: 'Warm', range: 'min {a} · max {b} (24 u)', hint: 'Tik op een ruimte voor het verloop van de laatste 24 uur.', details: 'Details', err: 'Vul "rooms" in met minstens één ruimte.',
    l_rooms: 'Ruimtes', l_humid_high: 'Vochtig vanaf', l_humid_low: 'Droog onder', l_frost: 'Vorstwaarschuwing onder', l_columns: 'Kolommen', description: 'Temperatuur en vochtigheid van alle ruimtes, met waarschuwingen.' },
  en: { title: 'Indoor climate', sub: 'Indoors {t} on average · outside {o}', sub_in: 'Indoors {t} on average', alerts: '{n} things to check', alert1: '1 thing to check', all_ok: 'all fine', wet: 'Humid — air the room', very_wet: 'Very humid — air the room', dry: 'Dry air', frost: 'Near freezing', cold: 'Cold', hot: 'Warm', range: 'min {a} · max {b} (24 h)', hint: 'Tap a room for the last 24 hours.', details: 'Details', err: 'Add at least one room under "rooms".',
    l_rooms: 'Rooms', l_humid_high: 'Humid from', l_humid_low: 'Dry below', l_frost: 'Frost warning below', l_columns: 'Columns', description: 'Temperature and humidity of every room, with warnings.' },
  fr: { title: 'Climat intérieur', sub: 'Intérieur {t} en moyenne · extérieur {o}', sub_in: 'Intérieur {t} en moyenne', alerts: '{n} points d’attention', alert1: '1 point d’attention', all_ok: 'tout va bien', wet: 'Humide — aérer', very_wet: 'Très humide — aérer', dry: 'Air sec', frost: 'Proche du gel', cold: 'Froid', hot: 'Chaud', range: 'min {a} · max {b} (24 h)', hint: 'Touchez une pièce pour les dernières 24 heures.', details: 'Détails', err: 'Ajoutez au moins une pièce sous "rooms".',
    l_rooms: 'Pièces', l_humid_high: 'Humide dès', l_humid_low: 'Sec sous', l_frost: 'Alerte gel sous', l_columns: 'Colonnes', description: 'Température et humidité de chaque pièce, avec alertes.' },
  de: { title: 'Raumklima', sub: 'Innen im Schnitt {t} · außen {o}', sub_in: 'Innen im Schnitt {t}', alerts: '{n} Hinweise', alert1: '1 Hinweis', all_ok: 'alles in Ordnung', wet: 'Feucht — lüften', very_wet: 'Sehr feucht — lüften', dry: 'Trockene Luft', frost: 'Frostgefahr', cold: 'Kalt', hot: 'Warm', range: 'min {a} · max {b} (24 h)', hint: 'Tippe auf einen Raum für die letzten 24 Stunden.', details: 'Details', err: 'Trage unter "rooms" mindestens einen Raum ein.',
    l_rooms: 'Räume', l_humid_high: 'Feucht ab', l_humid_low: 'Trocken unter', l_frost: 'Frostwarnung unter', l_columns: 'Spalten', description: 'Temperatur und Feuchte aller Räume, mit Warnungen.' },
  es: { title: 'Clima interior', sub: 'Dentro {t} de media · fuera {o}', sub_in: 'Dentro {t} de media', alerts: '{n} avisos', alert1: '1 aviso', all_ok: 'todo bien', wet: 'Húmedo — ventilar', very_wet: 'Muy húmedo — ventilar', dry: 'Aire seco', frost: 'Casi helada', cold: 'Frío', hot: 'Calor', range: 'mín {a} · máx {b} (24 h)', hint: 'Toca una estancia para ver las últimas 24 horas.', details: 'Detalles', err: 'Añade al menos una estancia en "rooms".',
    l_rooms: 'Estancias', l_humid_high: 'Húmedo desde', l_humid_low: 'Seco por debajo de', l_frost: 'Aviso de helada por debajo de', l_columns: 'Columnas', description: 'Temperatura y humedad de cada estancia, con avisos.' },
  it: { title: 'Clima interno', sub: 'Dentro {t} in media · fuori {o}', sub_in: 'Dentro {t} in media', alerts: '{n} avvisi', alert1: '1 avviso', all_ok: 'tutto ok', wet: 'Umido — arieggiare', very_wet: 'Molto umido — arieggiare', dry: 'Aria secca', frost: 'Quasi gelo', cold: 'Freddo', hot: 'Caldo', range: 'min {a} · max {b} (24 h)', hint: 'Tocca una stanza per le ultime 24 ore.', details: 'Dettagli', err: 'Aggiungi almeno una stanza in "rooms".',
    l_rooms: 'Stanze', l_humid_high: 'Umido da', l_humid_low: 'Secco sotto', l_frost: 'Avviso gelo sotto', l_columns: 'Colonne', description: 'Temperatura e umidità di ogni stanza, con avvisi.' },
});
const GIN_ACC = '255, 166, 107';
const GIN_WET = '255, 166, 107', GIN_DRY = '255, 214, 112', GIN_ICE = '142, 197, 255';
const ginCol = (t) => (t === null ? '201, 196, 221' : t < 8 ? '142, 197, 255' : t < 17 ? '160, 210, 235' : t < 20 ? '143, 227, 184' : t < 23 ? '255, 214, 112' : '255, 166, 107');

const GIN_CSS = GIN.CSS + `
  .alerts { position: relative; display: flex; flex-direction: column; gap: 8px; }
  .al { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 16px; font-size: 0.95rem; font-weight: 700; background: rgba(var(--c), 0.12); border: 1px solid rgba(var(--c), 0.45); text-align: left; }
  .al b { font-weight: 800; }
  .al span:last-child { opacity: 0.8; }
  .grid { position: relative; display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); gap: 12px; }
  .rm { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 14px; border-radius: 20px; text-align: left; min-width: 0;
    background: linear-gradient(160deg, rgba(var(--c), 0.22), rgba(var(--c), 0.05)); border: 1px solid rgba(var(--c), 0.35); }
  .rm.warn { border-color: rgba(var(--w), 0.75); box-shadow: 0 0 var(--glow) rgba(var(--w), 0.3); }
  .rm.out { border-style: dashed; }
  .rm.open { grid-column: span 2; }
  .rt { display: flex; align-items: center; justify-content: space-between; gap: 6px; width: 100%; }
  .rt span:first-child { font-size: 0.95rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .rt .dot { --c: var(--w); }
  .tv { font-size: 2.1rem; font-weight: 800; line-height: 1; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .hu { display: flex; align-items: center; gap: 8px; width: 100%; }
  .hu span { font-size: 0.8rem; font-weight: 800; opacity: 0.75; min-width: 38px; }
  .tr { flex: 1; height: 8px; border-radius: 4px; overflow: hidden; position: relative; background: var(--glow-surface, rgba(255,255,255,0.08)); }
  .tr i { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 4px; background: rgb(var(--h)); }
  .sp { width: 100%; height: 48px; }
  .sp path { fill: none; stroke: rgb(var(--c)); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
  .rg { display: flex; justify-content: space-between; width: 100%; font-size: 0.75rem; font-weight: 700; opacity: 0.65; }
  .rg a { font-weight: 800; text-decoration: underline; cursor: pointer; }
  @container (max-width: 520px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; } .tv { font-size: 1.7rem; } .rm { padding: 12px; } }
`;

class GlowIndoorCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._open = null; this._hist = {}; }
  static getConfigElement() { return document.createElement('glow-indoor-card-editor'); }
  static getStubConfig(hass) {
    const st = (hass && hass.states) || {};
    const temps = Object.keys(st).filter((e) => e.startsWith('sensor.') && st[e].attributes.device_class === 'temperature' && !/device_temperature|battery|batterij|cpu|processor|inverter|internal/.test(e)).slice(0, 6);
    return { rooms: temps.map((t) => { const h = t.replace(/temperatu(re|ur)$/, 'humidity'); return st[h] ? { temperature: t, humidity: h } : { temperature: t }; }) };
  }
  setConfig(config) {
    if (!config || !Array.isArray(config.rooms) || !config.rooms.length) throw new Error(GIN.t(GIN_T, GIN.lang(this._hass, config && config.language, GIN_T), 'err'));
    this._config = { glow: 15, humid_high: 65, humid_low: 30, frost: 5, ...config };
    this._key = null;
    if (this._hass) this._render();
  }
  set hass(hass) { this._hass = hass; if (this._config) this._render(); }
  getCardSize() { return 6; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }
  _lang() { return GIN.lang(this._hass, this._config.language, GIN_T); }
  _t(k, v) { return GIN.t(GIN_T, this._lang(), k, v); }

  _rooms() {
    const c = this._config;
    return c.rooms.map((r, i) => {
      const t = GIN.num(this._hass, r.temperature);
      const h = GIN.num(this._hass, r.humidity);
      const out = !!r.outside;
      let w = null;
      if (!out) {
        if (t !== null && t < (r.frost ?? c.frost)) w = [this._t('frost'), GIN_ICE];
        else if (h !== null && h >= (r.humid_high ?? c.humid_high) + 10) w = [this._t('very_wet'), GIN_WET];
        else if (h !== null && h >= (r.humid_high ?? c.humid_high)) w = [this._t('wet'), GIN_WET];
        else if (h !== null && h < (r.humid_low ?? c.humid_low)) w = [this._t('dry'), GIN_DRY];
      }
      const name = r.name || (r.temperature && GIN.name(this._hass, r.temperature).replace(/\s*(temperatu(re|ur)|temp)\s*$/i, '')) || '?';
      return { i, r, t, h, out, w, name };
    });
  }

  async _loadHist(i) {
    const r = this._config.rooms[i];
    if (!r || !r.temperature) return;
    const start = new Date(Date.now() - 24 * 3600e3).toISOString();
    try {
      const res = await this._hass.callWS({ type: 'history/history_during_period', start_time: start, entity_ids: [r.temperature], minimal_response: true, no_attributes: true });
      const rows = (res[r.temperature] || []).map((x) => parseFloat(x.s)).filter((v) => !isNaN(v));
      this._hist[i] = { at: Date.now(), v: rows };
    } catch (e) { this._hist[i] = { at: Date.now(), v: [] }; }
    this._key = null;
    this._render();
  }

  _render() {
    if (!this._hass || !this._config) return;
    const c = this._config;
    const rooms = this._rooms();
    const key = JSON.stringify([rooms.map((x) => [x.t, x.h, x.w]), this._open, this._hist[this._open] && this._hist[this._open].at, this._lang(), c]);
    if (key === this._key) return;
    this._key = key;
    const l = this._lang();
    const E = GIN.esc;
    const deg = (v) => GIN.fmt(l, v, 1) + '°';
    const ins = rooms.filter((x) => !x.out && x.t !== null && x.r.average !== false);
    const avg = ins.length ? ins.reduce((a, x) => a + x.t, 0) / ins.length : null;
    const outR = rooms.find((x) => x.out && x.t !== null);
    const alerts = rooms.filter((x) => x.w);
    let sub = avg === null ? '' : outR ? this._t('sub', { t: deg(avg), o: deg(outR.t) }) : this._t('sub_in', { t: deg(avg) });
    sub += (sub ? ' · ' : '') + (alerts.length ? (alerts.length === 1 ? this._t('alert1') : this._t('alerts', { n: alerts.length })) : this._t('all_ok'));
    const cols = parseInt(c.columns, 10) || 3;
    const tiles = rooms.map((x) => {
      const col = ginCol(x.t);
      const open = this._open === x.i;
      let extra = '';
      if (open) {
        const hv = this._hist[x.i];
        if (hv && hv.v.length > 1) {
          const v = hv.v;
          const mn = Math.min(...v), mx = Math.max(...v);
          const step = Math.max(1, Math.floor(v.length / 120));
          const pts = v.filter((_, k) => k % step === 0 || k === v.length - 1);
          const d = pts.map((p, k) => (k ? 'L' : 'M') + (k / (pts.length - 1) * 100).toFixed(2) + ' ' + (44 - (p - mn) / Math.max(0.1, mx - mn) * 40).toFixed(1)).join(' ');
          extra = `<svg class="sp" viewBox="0 0 100 48" preserveAspectRatio="none"><path d="${d}"/></svg><span class="rg"><span>${E(this._t('range', { a: deg(mn), b: deg(mx) }))}</span><a data-more="${E(x.r.temperature)}">${E(this._t('details'))}</a></span>`;
        } else extra = `<span class="rg"><span>…</span></span>`;
      }
      const hc = x.h === null ? '' : x.h >= c.humid_high ? GIN_WET : x.h < c.humid_low ? GIN_DRY : '142, 197, 255';
      return `<button type="button" class="rm${x.w ? ' warn' : ''}${x.out ? ' out' : ''}${open ? ' open' : ''}" style="--c:${col}${x.w ? ';--w:' + x.w[1] : ''}" data-i="${x.i}">
        <span class="rt"><span>${E(x.name)}</span>${x.w ? '<span class="dot"></span>' : ''}</span>
        <span class="tv">${x.t === null ? '–' : deg(x.t)}</span>${extra}
        ${x.h !== null ? `<span class="hu"><span>${Math.round(x.h)} %</span><span class="tr" style="--h:${hc}"><i style="width:${Math.max(0, Math.min(100, x.h))}%"></i></span></span>` : ''}</button>`;
    }).join('');
    const al = alerts.length ? `<div class="alerts">${alerts.map((x) => `<div class="al" style="--c:${x.w[1]}"><span class="dot"></span><b>${E(x.name)}</b><span>${E(x.w[0])}</span></div>`).join('')}</div>` : '';
    this.shadowRoot.innerHTML = `<style>${GIN_CSS}</style><ha-card style="--a:${GIN_ACC};--glow:${parseInt(c.glow, 10) || 0}px;--cols:${cols}"><div class="halo"></div>
      ${GIN.head('M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z', c.title || this._t('title'), sub)}${al}<div class="grid">${tiles}</div>
      <span class="note">${E(this._t('hint'))}</span></ha-card>`;
    this.shadowRoot.querySelectorAll('[data-i]').forEach((b) => b.addEventListener('click', (e) => {
      const m = e.target.closest('[data-more]');
      if (m) { e.stopPropagation(); GIN.moreInfo(this, m.dataset.more); return; }
      const i = +b.dataset.i;
      this._open = this._open === i ? null : i;
      if (this._open !== null && (!this._hist[i] || Date.now() - this._hist[i].at > 10 * 60000)) this._loadHist(i);
      this._key = null;
      this._render();
    }));
  }
}

GIN.editor('glow-indoor-card-editor', GIN_T, () => [
  { name: 'title', selector: { text: {} } },
  { name: 'rooms', selector: { object: {} } },
  { type: 'grid', name: '', schema: [
    { name: 'humid_high', selector: { number: { min: 40, max: 90, step: 1, mode: 'box', unit_of_measurement: '%' } } },
    { name: 'humid_low', selector: { number: { min: 10, max: 50, step: 1, mode: 'box', unit_of_measurement: '%' } } },
    { name: 'frost', selector: { number: { min: -10, max: 15, step: 0.5, mode: 'box', unit_of_measurement: '°C' } } },
    { name: 'columns', selector: { number: { min: 1, max: 4, step: 1, mode: 'box' } } },
  ] },
], { humid_high: 65, humid_low: 30, frost: 5, glow: 15 });
GIN.register('glow-indoor-card', 'Glow Indoor Card', GIN_T, GlowIndoorCard);
