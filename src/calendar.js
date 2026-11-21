/*
 * Glow Calendar Card
 * De komende dagen uit je agenda's in één overzicht: afspraken per dag, de afvalophaling als
 * gekleurde tag en, met Glow Schedules, de ploeg van elke dag.
 */
const GCAL = window.GlowKit;
const GCAL_T = GCAL.table({
  nl: { title: 'Agenda', today: 'Vandaag', tomorrow: 'Morgen', allday: 'Hele dag', nothing: 'Niets gepland', loading: 'Agenda laden…', waste_on: '{w} {d}', waste_sub: '{w} buiten zetten', none_sub: 'Niets bijzonders de komende dagen', events_sub: '{n} afspraken deze week', sh_early: 'Vroeg', sh_late: 'Laat', sh_free: 'Vrij', more: '+{n} meer', err: 'Kon de agenda niet laden: {e}',
    l_calendars: "Agenda's (leeg = alle)", l_waste: 'Agenda met afvalophaling', l_days: 'Aantal dagen', l_shifts: 'Ploeg van Glow Schedules tonen', l_max: 'Afspraken per dag', description: 'De komende dagen uit je agenda’s, met afvalophaling en ploeg.' },
  en: { title: 'Calendar', today: 'Today', tomorrow: 'Tomorrow', allday: 'All day', nothing: 'Nothing planned', loading: 'Loading calendar…', waste_on: '{w} {d}', waste_sub: 'Put out {w}', none_sub: 'Nothing special in the coming days', events_sub: '{n} events this week', sh_early: 'Early', sh_late: 'Late', sh_free: 'Off', more: '+{n} more', err: 'Could not load the calendar: {e}',
    l_calendars: 'Calendars (empty = all)', l_waste: 'Waste collection calendar', l_days: 'Number of days', l_shifts: 'Show Glow Schedules shift', l_max: 'Events per day', description: 'The coming days from your calendars, with waste collection and shifts.' },
  fr: { title: 'Agenda', today: "Aujourd'hui", tomorrow: 'Demain', allday: 'Toute la journée', nothing: 'Rien de prévu', loading: "Chargement de l'agenda…", waste_on: '{w} {d}', waste_sub: 'Sortir : {w}', none_sub: 'Rien de spécial ces prochains jours', events_sub: '{n} rendez-vous cette semaine', sh_early: 'Matin', sh_late: 'Soir', sh_free: 'Libre', more: '+{n} de plus', err: "Impossible de charger l'agenda : {e}",
    l_calendars: 'Agendas (vide = tous)', l_waste: 'Agenda des collectes', l_days: 'Nombre de jours', l_shifts: "Afficher l'équipe de Glow Schedules", l_max: 'Rendez-vous par jour', description: 'Les prochains jours de vos agendas, avec collectes et équipes.' },
  de: { title: 'Kalender', today: 'Heute', tomorrow: 'Morgen', allday: 'Ganztägig', nothing: 'Nichts geplant', loading: 'Kalender wird geladen…', waste_on: '{w} {d}', waste_sub: '{w} rausstellen', none_sub: 'Nichts Besonderes in den nächsten Tagen', events_sub: '{n} Termine diese Woche', sh_early: 'Früh', sh_late: 'Spät', sh_free: 'Frei', more: '+{n} weitere', err: 'Kalender konnte nicht geladen werden: {e}',
    l_calendars: 'Kalender (leer = alle)', l_waste: 'Müllabfuhr-Kalender', l_days: 'Anzahl Tage', l_shifts: 'Schicht von Glow Schedules zeigen', l_max: 'Termine pro Tag', description: 'Die nächsten Tage aus deinen Kalendern, mit Müllabfuhr und Schicht.' },
  es: { title: 'Agenda', today: 'Hoy', tomorrow: 'Mañana', allday: 'Todo el día', nothing: 'Nada previsto', loading: 'Cargando agenda…', waste_on: '{w} {d}', waste_sub: 'Sacar {w}', none_sub: 'Nada especial en los próximos días', events_sub: '{n} citas esta semana', sh_early: 'Mañana', sh_late: 'Tarde', sh_free: 'Libre', more: '+{n} más', err: 'No se pudo cargar la agenda: {e}',
    l_calendars: 'Calendarios (vacío = todos)', l_waste: 'Calendario de recogida', l_days: 'Número de días', l_shifts: 'Mostrar turno de Glow Schedules', l_max: 'Citas por día', description: 'Los próximos días de tus calendarios, con recogida de basura y turnos.' },
  it: { title: 'Agenda', today: 'Oggi', tomorrow: 'Domani', allday: 'Tutto il giorno', nothing: 'Niente in programma', loading: 'Caricamento agenda…', waste_on: '{w} {d}', waste_sub: 'Portare fuori {w}', none_sub: 'Niente di speciale nei prossimi giorni', events_sub: '{n} appuntamenti questa settimana', sh_early: 'Mattina', sh_late: 'Sera', sh_free: 'Libero', more: '+{n} altri', err: "Impossibile caricare l'agenda: {e}",
    l_calendars: 'Calendari (vuoto = tutti)', l_waste: 'Calendario raccolta rifiuti', l_days: 'Numero di giorni', l_shifts: 'Mostra turno di Glow Schedules', l_max: 'Appuntamenti al giorno', description: 'I prossimi giorni dai tuoi calendari, con raccolta rifiuti e turni.' },
});
const GCAL_ACC = '142, 197, 255';
const GCAL_COLORS = ['255, 166, 107', '185, 168, 255', '142, 197, 255', '255, 143, 190', '255, 214, 112', '143, 227, 184'];
const GCAL_SHIFT = { early: '255, 214, 112', late: '185, 168, 255', free: '143, 227, 184' };
// kleur van een afvalsoort, op naam
const gcalWaste = (s) => {
  const n = String(s).toLowerCase();
  if (/pmd|plastic|blik/.test(n)) return '142, 197, 255';
  if (/gft|groen|tuin|bio|organic/.test(n)) return '143, 227, 184';
  if (/papier|karton|paper/.test(n)) return '255, 214, 112';
  if (/glas|glass/.test(n)) return '120, 220, 210';
  if (/rest|huisvuil|general/.test(n)) return '201, 196, 221';
  return '255, 166, 107';
};
// ploeg van een dag, zelfde regels als Glow Schedules
const gcalMonday = (d) => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
const gcalIso = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
function gcalShift(d, sh) {
  if (!sh) return null;
  const iso = gcalIso(d);
  const v = sh.vacation || {};
  if (v.on && (!v.from || iso >= v.from) && (!v.until || iso <= v.until)) return 'free';
  const o = (sh.overrides || {})[iso];
  if (o) return o;
  if (sh.weekend_free !== false && (d.getDay() === 0 || d.getDay() === 6)) return 'free';
  const rot = (sh.rotation && sh.rotation.length) ? sh.rotation : ['late', 'early'];
  const a = sh.anchor ? new Date(sh.anchor + 'T12:00:00') : d;
  const w = Math.round((gcalMonday(d) - gcalMonday(a)) / (7 * 864e5));
  return rot[((w % rot.length) + rot.length) % rot.length];
}

const GCAL_CSS = GCAL.CSS + `
  .cals { position: relative; display: flex; gap: 8px; flex-wrap: wrap; }
  .days { position: relative; display: flex; flex-direction: column; gap: 10px; }
  .day { display: flex; gap: 16px; padding: 14px 16px; border-radius: 20px; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .day.today { background: rgba(var(--a), 0.12); border-color: rgba(var(--a), 0.5); }
  .dl { display: flex; flex-direction: column; align-items: center; gap: 4px; width: 64px; flex-shrink: 0; }
  .dl .wd { font-size: 0.8rem; font-weight: 800; opacity: 0.65; text-align: center; }
  .day.today .dl .wd { opacity: 1; color: color-mix(in srgb, rgb(var(--a)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .dl .n { font-size: 1.75rem; font-weight: 800; line-height: 1; }
  .sh { height: 22px; padding: 0 9px; border-radius: 11px; display: inline-flex; align-items: center; font-size: 0.75rem; font-weight: 800; color: #1C1730; background: rgb(var(--c)); }
  .dr { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; justify-content: center; }
  .ws { display: flex; gap: 8px; flex-wrap: wrap; }
  .w { height: 30px; padding: 0 12px; border-radius: 15px; display: inline-flex; align-items: center; gap: 6px; font-size: 0.88rem; font-weight: 800; color: #1C1730; background: rgb(var(--c)); box-shadow: 0 0 calc(var(--glow) * 0.6) rgba(var(--c), 0.6); }
  .ev { display: flex; align-items: center; gap: 12px; min-width: 0; }
  .ev i { width: 4px; height: 28px; border-radius: 2px; flex-shrink: 0; background: rgb(var(--c)); box-shadow: 0 0 8px rgba(var(--c), 0.7); }
  .ev .tm { font-size: 0.92rem; font-weight: 800; font-variant-numeric: tabular-nums; min-width: 46px; opacity: 0.75; }
  .ev .tm.ad { font-size: 0.75rem; min-width: 46px; }
  .ev b { font-size: 1.05rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ev .gap { flex: 1; }
  .ev .cn { font-size: 0.75rem; font-weight: 800; opacity: 0.85; white-space: nowrap; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .nothing { font-size: 0.92rem; font-weight: 700; opacity: 0.45; }
  .more { font-size: 0.8rem; font-weight: 800; opacity: 0.55; }
  @container (max-width: 520px) {
    .day { gap: 10px; padding: 10px 12px; }
    .dl { width: 50px; }
    .dl .n { font-size: 1.4rem; }
    .ev { gap: 8px; }
    .ev .cn { display: none; }
    .ev b { font-size: 0.95rem; }
  }
`;

class GlowCalendarCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._hide = {}; this._events = null; }
  static getConfigElement() { return document.createElement('glow-calendar-card-editor'); }
  static getStubConfig() { return {}; }
  setConfig(config) { this._config = { glow: 15, days: 7, max: 4, shifts: true, ...(config || {}) }; this._events = null; this._key = null; if (this._hass) this._load(); }
  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    const sig = this._cals().map((e) => e + (hass.states[e] ? hass.states[e].state + hass.states[e].attributes.message : '')).join('|') + this._glowSig();
    if (first || sig !== this._sig) { this._sig = sig; this._load(); }
    this._render();
  }
  connectedCallback() { this._timer = setInterval(() => this._load(), 15 * 60000); }
  disconnectedCallback() { clearInterval(this._timer); }
  getCardSize() { return 8; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }
  _lang() { return GCAL.lang(this._hass, this._config.language, GCAL_T); }
  _t(k, v) { return GCAL.t(GCAL_T, this._lang(), k, v); }
  _cals() {
    const c = [].concat(this._config.calendars || []).map((x) => (typeof x === 'string' ? x : x.entity));
    return c.length ? c : Object.keys((this._hass && this._hass.states) || {}).filter((e) => e.startsWith('calendar.')).sort();
  }
  _wasteCals() {
    const w = [].concat(this._config.waste || []);
    if (w.length) return w;
    return this._cals().filter((e) => /afval|waste|recycle|ophaling|garbage|trash/i.test(e + ' ' + GCAL.name(this._hass, e)));
  }
  _glowSig() { const st = this._hass.states; const g = Object.keys(st).find((e) => e.startsWith('sensor.glow_schedules') && st[e].attributes.rotation); return g ? String(st[g].attributes.revision) : ''; }

  async _load() {
    if (!this._hass || this._loading) return;
    this._loading = true;
    const days = Math.max(1, Math.min(14, parseInt(this._config.days, 10) || 7));
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const end = new Date(start); end.setDate(end.getDate() + days);
    try {
      const r = await this._hass.callWS({ type: 'call_service', domain: 'calendar', service: 'get_events', service_data: { start_date_time: start.toISOString(), end_date_time: end.toISOString() }, target: { entity_id: this._cals() }, return_response: true });
      this._events = (r && r.response) || {};
      this._err = null;
    } catch (e) { this._err = (e && e.message) || String(e); this._events = this._events || {}; }
    if (this._config.shifts !== false && this._glowSig()) {
      try { this._shifts = (await this._hass.callWS({ type: 'glow_schedules/get' })).shifts; } catch (e) { this._shifts = null; }
    } else this._shifts = null;
    this._loading = false;
    this._key = null;
    this._render();
  }

  _days() {
    const n = Math.max(1, Math.min(14, parseInt(this._config.days, 10) || 7));
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const cals = this._cals();
    const waste = new Set(this._wasteCals());
    const colorOf = {};
    const own = [].concat(this._config.calendars || []).filter((x) => typeof x === 'object');
    let ci = 0;
    cals.forEach((e) => { const o = own.find((x) => x.entity === e); colorOf[e] = o && o.color ? o.color : waste.has(e) ? '143, 227, 184' : GCAL_COLORS[ci++ % GCAL_COLORS.length]; });
    const out = [];
    for (let i = 0; i < n; i++) {
      const d = new Date(start); d.setDate(d.getDate() + i);
      const dEnd = new Date(d); dEnd.setDate(dEnd.getDate() + 1);
      const evs = [], ws = [];
      cals.forEach((cal) => {
        if (this._hide[cal]) return;
        ((this._events && this._events[cal] && this._events[cal].events) || []).forEach((ev) => {
          const allDay = !String(ev.start).includes('T');
          const s = allDay ? new Date(ev.start + 'T00:00:00') : new Date(ev.start);
          const e = allDay ? new Date(ev.end + 'T00:00:00') : new Date(ev.end);
          if (!(s < dEnd && (e > d || (+e === +s && s >= d)))) return;
          if (waste.has(cal)) ws.push(ev.summary);
          else evs.push({ cal, title: ev.summary, allDay: allDay || (s <= d && e >= dEnd), t: s < d ? null : s, c: colorOf[cal] });
        });
      });
      evs.sort((a, b) => (a.allDay === b.allDay ? (a.t || 0) - (b.t || 0) : a.allDay ? -1 : 1));
      out.push({ d, evs, ws, shift: this._shifts ? gcalShift(d, this._shifts) : null });
    }
    return { out, colorOf };
  }

  _render() {
    if (!this._hass || !this._config) return;
    const c = this._config;
    const { out, colorOf } = this._days();
    const key = JSON.stringify([out.map((x) => [x.evs.map((e) => [e.title, e.t]), x.ws, x.shift]), this._hide, this._err, this._lang(), this._events === null, new Date().getDate(), c]);
    if (key === this._key) return;
    this._key = key;
    const l = this._lang();
    const E = GCAL.esc;
    const wdFmt = new Intl.DateTimeFormat(l, { weekday: 'short' });
    const longFmt = new Intl.DateTimeFormat(l, { weekday: 'long', day: 'numeric', month: 'long' });
    // ondertitel: eerstvolgende afvalophaling, anders aantal afspraken
    const nextW = out.findIndex((x) => x.ws.length);
    const nEv = out.reduce((a, x) => a + x.evs.length, 0);
    const dayName = (i) => (i === 0 ? this._t('today').toLowerCase() : i === 1 ? this._t('tomorrow').toLowerCase() : new Intl.DateTimeFormat(l, { weekday: 'long' }).format(out[i].d));
    const sub = longFmt.format(new Date()).replace(/^./, (m) => m.toUpperCase()) + ' · ' + (nextW >= 0 ? this._t('waste_on', { w: out[nextW].ws.join(', '), d: dayName(nextW) }) : nEv ? this._t('events_sub', { n: nEv }) : this._t('none_sub'));
    const max = Math.max(1, parseInt(c.max, 10) || 4);
    const days = out.map((x, i) => {
      const evs = x.evs.slice(0, max).map((e) => `<div class="ev" style="--c:${e.c}"><i></i>${e.allDay || !e.t ? `<span class="tm ad">${E(this._t('allday'))}</span>` : `<span class="tm">${GCAL.hm(e.t)}</span>`}<b>${E(e.title)}</b><span class="gap"></span><span class="cn">${E(GCAL.name(this._hass, e.cal))}</span></div>`).join('');
      const more = x.evs.length > max ? `<span class="more">${E(this._t('more', { n: x.evs.length - max }))}</span>` : '';
      const ws = x.ws.length ? `<div class="ws">${x.ws.map((w) => `<span class="w" style="--c:${gcalWaste(w)}">🗑 ${E(w)}</span>`).join('')}</div>` : '';
      const wd = i === 0 ? this._t('today') : i === 1 ? this._t('tomorrow') : wdFmt.format(x.d).replace('.', '').replace(/^./, (m) => m.toUpperCase());
      return `<div class="day${i === 0 ? ' today' : ''}"><div class="dl"><span class="wd">${E(wd)}</span><span class="n">${x.d.getDate()}</span>${x.shift ? `<span class="sh" style="--c:${GCAL_SHIFT[x.shift]}">${E(this._t('sh_' + x.shift))}</span>` : ''}</div>
        <div class="dr">${ws}${evs}${more}${!x.evs.length && !x.ws.length ? `<span class="nothing">${E(this._t('nothing'))}</span>` : ''}</div></div>`;
    }).join('');
    const cals = this._cals();
    const chips = cals.length > 1 ? `<div class="cals">${cals.map((e) => `<button type="button" class="chip${this._hide[e] ? '' : ' on'}" style="--c:${colorOf[e]}" data-c="${E(e)}"><span class="dot"></span>${E(((c.calendars || []).find((x) => x && x.entity === e) || {}).name || GCAL.name(this._hass, e))}</button>`).join('')}</div>` : '';
    this.shadowRoot.innerHTML = `<style>${GCAL_CSS}</style><ha-card style="--a:${GCAL_ACC};--glow:${parseInt(c.glow, 10) || 0}px"><div class="halo"></div>
      ${GCAL.head('M3 5h18v16H3zM3 10h18M8 3v4M16 3v4', c.title || this._t('title'), sub)}
      ${chips}
      ${this._events === null ? `<span class="empty">${E(this._t('loading'))}</span>` : `<div class="days">${days}</div>`}
      ${this._err ? `<span class="note">${E(this._t('err', { e: this._err }))}</span>` : ''}</ha-card>`;
    this.shadowRoot.querySelectorAll('[data-c]').forEach((b) => b.addEventListener('click', () => { this._hide[b.dataset.c] = !this._hide[b.dataset.c]; this._key = null; this._render(); }));
  }
}

GCAL.editor('glow-calendar-card-editor', GCAL_T, () => [
  { name: 'title', selector: { text: {} } },
  { name: 'calendars', selector: { entity: { multiple: true, domain: 'calendar' } } },
  { name: 'waste', selector: { entity: { multiple: true, domain: 'calendar' } } },
  { type: 'grid', name: '', schema: [
    { name: 'days', selector: { number: { min: 1, max: 14, step: 1, mode: 'box' } } },
    { name: 'max', selector: { number: { min: 1, max: 10, step: 1, mode: 'box' } } },
  ] },
  { name: 'shifts', selector: { boolean: {} } },
], { days: 7, max: 4, shifts: true, glow: 15 });
GCAL.register('glow-calendar-card', 'Glow Calendar Card', GCAL_T, GlowCalendarCard);
