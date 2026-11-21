/*
 * Glow People Card
 * Wie is waar: per persoon thuis, in een zone of onderweg, sinds wanneer, en de batterij van de gsm.
 */
const GPE = window.GlowKit;
const GPE_T = GPE.table({
  nl: { title: 'Wie is waar', all_home: 'Iedereen is thuis', none_home: 'Niemand is thuis', n_home: '{n} van {t} thuis', home: 'Thuis', away: 'Onderweg', unknown: 'Onbekend', since: 'sinds {t}', since_day: 'sinds {d}', km: '{k} km van thuis', charge: 'opladen', charging: 'laadt', updated: 'gezien {a}',
    l_entities: 'Personen (leeg = iedereen)', l_low: 'Batterij laag onder', description: 'Wie is waar: thuis, zone of onderweg, met de batterij van de gsm.' },
  en: { title: 'Who is where', all_home: 'Everyone is home', none_home: 'Nobody is home', n_home: '{n} of {t} home', home: 'Home', away: 'Away', unknown: 'Unknown', since: 'since {t}', since_day: 'since {d}', km: '{k} km from home', charge: 'charge', charging: 'charging', updated: 'seen {a}',
    l_entities: 'People (empty = everyone)', l_low: 'Battery low below', description: 'Who is where: home, zone or away, with phone battery.' },
  fr: { title: 'Qui est où', all_home: 'Tout le monde est là', none_home: "Personne n'est là", n_home: '{n} sur {t} à la maison', home: 'Maison', away: 'En route', unknown: 'Inconnu', since: 'depuis {t}', since_day: 'depuis {d}', km: 'à {k} km', charge: 'à charger', charging: 'en charge', updated: 'vu {a}',
    l_entities: 'Personnes (vide = tout le monde)', l_low: 'Batterie faible sous', description: 'Qui est où : maison, zone ou en route, avec la batterie du téléphone.' },
  de: { title: 'Wer ist wo', all_home: 'Alle sind zu Hause', none_home: 'Niemand ist zu Hause', n_home: '{n} von {t} zu Hause', home: 'Zuhause', away: 'Unterwegs', unknown: 'Unbekannt', since: 'seit {t}', since_day: 'seit {d}', km: '{k} km von zu Hause', charge: 'laden', charging: 'lädt', updated: 'gesehen {a}',
    l_entities: 'Personen (leer = alle)', l_low: 'Akku niedrig unter', description: 'Wer ist wo: zu Hause, Zone oder unterwegs, mit Handy-Akku.' },
  es: { title: 'Quién está dónde', all_home: 'Todos están en casa', none_home: 'No hay nadie en casa', n_home: '{n} de {t} en casa', home: 'Casa', away: 'Fuera', unknown: 'Desconocido', since: 'desde {t}', since_day: 'desde {d}', km: 'a {k} km de casa', charge: 'cargar', charging: 'cargando', updated: 'visto {a}',
    l_entities: 'Personas (vacío = todas)', l_low: 'Batería baja por debajo de', description: 'Quién está dónde: casa, zona o fuera, con la batería del móvil.' },
  it: { title: 'Chi è dove', all_home: 'Tutti sono a casa', none_home: 'Nessuno è a casa', n_home: '{n} di {t} a casa', home: 'Casa', away: 'Fuori', unknown: 'Sconosciuto', since: 'dalle {t}', since_day: 'dal {d}', km: 'a {k} km da casa', charge: 'da caricare', charging: 'in carica', updated: 'visto {a}',
    l_entities: 'Persone (vuoto = tutti)', l_low: 'Batteria bassa sotto', description: 'Chi è dove: casa, zona o fuori, con la batteria del telefono.' },
});
const GPE_ACC = '255, 214, 112';
const GPE_COLORS = ['142, 197, 255', '255, 166, 107', '185, 168, 255', '143, 227, 184', '255, 143, 190', '255, 214, 112'];
const GPE_HOME = '143, 227, 184', GPE_AWAY = '185, 168, 255', GPE_ZONE = '142, 197, 255', GPE_LOW = '255, 143, 143';

const GPE_CSS = GPE.CSS + `
  .ps { position: relative; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 12px; }
  .p { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 18px 12px 14px; border-radius: 22px; text-align: center; min-width: 0;
    background: linear-gradient(170deg, rgba(var(--c), 0.18), rgba(var(--c), 0.03)); border: 1px solid rgba(var(--c), 0.4); }
  .av { position: relative; width: 74px; height: 74px; border-radius: 37px; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; color: #1C1730;
    background: rgb(var(--c)) center / cover no-repeat; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.7); }
  .p.out .av { filter: saturate(0.6); opacity: 0.85; }
  .av i { position: absolute; right: 0; bottom: 2px; width: 22px; height: 22px; border-radius: 50%; box-sizing: border-box; background: rgb(var(--z)); border: 3px solid var(--glow-card-background, #15121F); }
  .p b { font-size: 1.25rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
  .wh { max-width: 100%; height: 28px; line-height: 28px; padding: 0 12px; border-radius: 14px; display: inline-block; font-size: 0.88rem; font-weight: 800; color: #1C1730; background: rgb(var(--z)); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; box-sizing: border-box; }
  .sn { font-size: 0.8rem; font-weight: 700; opacity: 0.6; }
  .bt { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin-top: 4px; font-size: 0.8rem; font-weight: 800; opacity: 0.75; }
  .bt.low { opacity: 1; color: color-mix(in srgb, rgb(${GPE_LOW}), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .bt svg rect.f { fill: rgb(var(--b)); }
  @container (max-width: 520px) { .ps { gap: 8px; } .p { padding: 12px 6px 10px; } .av { width: 54px; height: 54px; font-size: 1.5rem; } .p b { font-size: 1rem; } .wh { font-size: 0.75rem; padding: 0 8px; height: 24px; line-height: 24px; } .bt { font-size: 0.72rem; gap: 4px; } .sn { font-size: 0.7rem; } }
`;

class GlowPeopleCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  static getConfigElement() { return document.createElement('glow-people-card-editor'); }
  static getStubConfig() { return {}; }
  setConfig(config) { this._config = { glow: 15, low: 20, ...(config || {}) }; this._key = null; if (this._hass) this._render(); }
  set hass(hass) { this._hass = hass; if (this._config) this._render(); }
  connectedCallback() { this._timer = setInterval(() => { this._key = null; this._render(); }, 60000); }
  disconnectedCallback() { clearInterval(this._timer); }
  getCardSize() { return 4; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }
  _lang() { return GPE.lang(this._hass, this._config.language, GPE_T); }
  _t(k, v) { return GPE.t(GPE_T, this._lang(), k, v); }
  _people() {
    const c = [].concat(this._config.entities || []).map((x) => (typeof x === 'string' ? { entity: x } : x));
    return c.length ? c : Object.keys(this._hass.states).filter((e) => e.startsWith('person.')).sort().map((e) => ({ entity: e }));
  }
  // batterij, laden en adres van de gsm achter de persoon
  _phone(p) {
    const st = this._hass.states;
    const s = st[p.entity];
    const src = (s && s.attributes.source) || '';
    const obj = src.split('.')[1] || '';
    const find = (re) => Object.keys(st).find((e) => e.startsWith('sensor.' + obj + '_') && re.test(e));
    const bat = p.battery || (obj && find(/_(battery_level|batterijniveau|batterij)$/));
    const chg = p.charging || (obj && find(/_(battery_state|batterijstatus)$/));
    const geo = obj && find(/_geocoded_location$/);
    return { bat, chg, geo };
  }

  _render() {
    if (!this._hass || !this._config) return;
    const c = this._config, st = this._hass.states, l = this._lang(), E = GPE.esc;
    const ppl = this._people().filter((p) => st[p.entity]);
    const now = new Date();
    const key = JSON.stringify([ppl.map((p) => { const s = st[p.entity]; const ph = this._phone(p); return [s.state, s.last_changed, s.attributes.latitude, ph.bat && st[ph.bat] && st[ph.bat].state, ph.chg && st[ph.chg] && st[ph.chg].state, ph.geo && st[ph.geo] && st[ph.geo].state]; }), now.getHours(), now.getMinutes(), l, c]);
    if (key === this._key) return;
    this._key = key;
    const home = st['zone.home'];
    const dist = (s) => {
      if (!home || s.attributes.latitude === undefined) return null;
      const R = 6371, rad = (x) => x * Math.PI / 180;
      const a = rad(s.attributes.latitude - home.attributes.latitude), b = rad(s.attributes.longitude - home.attributes.longitude);
      const q = Math.sin(a / 2) ** 2 + Math.cos(rad(home.attributes.latitude)) * Math.cos(rad(s.attributes.latitude)) * Math.sin(b / 2) ** 2;
      return 2 * R * Math.asin(Math.sqrt(q));
    };
    let nHome = 0;
    const cards = ppl.map((p, i) => {
      const s = st[p.entity];
      const col = p.color || GPE_COLORS[i % GPE_COLORS.length];
      const isHome = s.state === 'home';
      if (isHome) nHome++;
      const zoneName = isHome ? this._t('home') : s.state === 'not_home' ? this._t('away') : s.state === 'unknown' || s.state === 'unavailable' ? this._t('unknown') : s.state;
      const z = isHome ? GPE_HOME : s.state === 'not_home' ? GPE_AWAY : GPE_ZONE;
      const ch = new Date(s.last_changed);
      const sameDay = ch.toDateString() === now.toDateString();
      let sub = sameDay ? this._t('since', { t: GPE.hm(ch) }) : this._t('since_day', { d: new Intl.DateTimeFormat(l, { weekday: 'short', day: 'numeric', month: 'short' }).format(ch) });
      const ph = this._phone(p);
      if (!isHome) {
        const km = dist(s);
        if (s.state === 'not_home' && ph.geo && st[ph.geo] && st[ph.geo].state && st[ph.geo].state !== 'unknown') sub = String(st[ph.geo].state).split('\n').slice(-2, -1)[0] || sub;
        if (km !== null && km >= 1) sub += ' · ' + this._t('km', { k: GPE.fmt(l, km, km < 10 ? 1 : 0) });
      }
      const bv = GPE.num(this._hass, ph.bat);
      const charging = ph.chg && st[ph.chg] && /charging|full|laden|opladen/i.test(st[ph.chg].state) && !/not/i.test(st[ph.chg].state);
      const low = bv !== null && bv <= c.low && !charging;
      const bc = low ? GPE_LOW : bv !== null && bv < 40 ? '255, 214, 112' : '143, 227, 184';
      const bat = bv === null ? '' : `<span class="bt${low ? ' low' : ''}" style="--b:${bc}"><svg width="22" height="14" viewBox="0 0 22 14"><rect x="1" y="1" width="17" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.6"/><rect x="19" y="4.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.6"/><rect class="f" x="3" y="3" width="${Math.max(1, Math.round(13 * bv / 100))}" height="8" rx="1.5"/></svg>${Math.round(bv)} %${charging ? ' · ' + E(this._t('charging')) : low ? ' — ' + E(this._t('charge')) : ''}</span>`;
      const pic = p.picture || s.attributes.entity_picture;
      const name = p.name || s.attributes.friendly_name || p.entity;
      return `<button type="button" class="p${isHome ? '' : ' out'}" style="--c:${col};--z:${z}" data-e="${E(p.entity)}">
        <span class="av"${pic ? ` style="background-image:url('${E(pic)}')"` : ''}>${pic ? '' : E(name.charAt(0).toUpperCase())}<i></i></span>
        <b>${E(name)}</b><span class="wh">${E(zoneName)}</span><span class="sn">${E(sub)}</span>${bat}</button>`;
    }).join('');
    const tot = ppl.length;
    const sub = nHome === tot ? this._t('all_home') : nHome === 0 ? this._t('none_home') : this._t('n_home', { n: nHome, t: tot });
    this.shadowRoot.innerHTML = `<style>${GPE_CSS}</style><ha-card style="--a:${GPE_ACC};--glow:${parseInt(c.glow, 10) || 0}px;--n:${Math.min(Math.max(tot, 1), parseInt(c.columns, 10) || 4)}"><div class="halo"></div>
      ${GPE.head('M16 11a4 4 0 1 0-8 0M4 21a8 8 0 0 1 16 0', c.title || this._t('title'), sub)}<div class="ps">${cards}</div></ha-card>`;
    this.shadowRoot.querySelectorAll('[data-e]').forEach((b) => b.addEventListener('click', () => GPE.moreInfo(this, b.dataset.e)));
  }
}

GPE.editor('glow-people-card-editor', GPE_T, () => [
  { name: 'title', selector: { text: {} } },
  { name: 'entities', selector: { entity: { multiple: true, domain: 'person' } } },
  { name: 'low', selector: { number: { min: 5, max: 50, step: 5, mode: 'box', unit_of_measurement: '%' } } },
], { low: 20, glow: 15 });
GPE.register('glow-people-card', 'Glow People Card', GPE_T, GlowPeopleCard);
