/*
 * Glow Lights Card
 * Verlichting voor de gsm: één regel per kamer met een lichtbol om te schakelen en een balk om
 * de helderheid te slepen. Tik op de naam om de lampen van die kamer open te klappen.
 */

const GLT_I18N = {
  nl: { title: 'Verlichting', all_off: 'Alles uit', off: 'uit', on: 'aan', lamps: '{n} lampen', lamp: '1 lamp', na: 'niet bereikbaar', description: 'Verlichting voor de gsm: één regel per kamer, helderheid slepen, lampen openklappen.' },
  en: { title: 'Lights', all_off: 'All off', off: 'off', on: 'on', lamps: '{n} lights', lamp: '1 light', na: 'unavailable', description: 'Lights for phones: one row per room, drag brightness, expand the lights.' },
  fr: { title: 'Éclairage', all_off: 'Tout éteindre', off: 'éteint', on: 'allumé', lamps: '{n} lampes', lamp: '1 lampe', na: 'injoignable', description: 'Éclairage pour téléphone : une ligne par pièce, luminosité à glisser, lampes à déplier.' },
  de: { title: 'Licht', all_off: 'Alles aus', off: 'aus', on: 'an', lamps: '{n} Lampen', lamp: '1 Lampe', na: 'nicht erreichbar', description: 'Licht fürs Handy: eine Zeile pro Raum, Helligkeit ziehen, Lampen aufklappen.' },
  es: { title: 'Iluminación', all_off: 'Apagar todo', off: 'apagado', on: 'encendido', lamps: '{n} luces', lamp: '1 luz', na: 'no disponible', description: 'Luces para el móvil: una fila por habitación, arrastra el brillo, despliega las luces.' },
  it: { title: 'Luci', all_off: 'Spegni tutto', off: 'spento', on: 'acceso', lamps: '{n} luci', lamp: '1 luce', na: 'non raggiungibile', description: 'Luci per il telefono: una riga per stanza, trascina la luminosità, apri le luci.' },
};
function gltLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GLT_I18N[l] ? l : 'en';
}
function gltT(lang, key, vars) {
  let s = (GLT_I18N[lang] && GLT_I18N[lang][key]) ?? GLT_I18N.en[key] ?? key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gltEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
const GLT_PAL = ['255, 224, 138', '185, 168, 255', '255, 184, 153', '142, 197, 255', '143, 227, 184', '255, 159, 191'];
function gltHex(h) {
  if (!h) return null;
  const m = String(h).trim().match(/^#?([0-9a-f]{6})$/i);
  if (m) { const n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(', '); }
  return /^\d+\s*,\s*\d+\s*,\s*\d+$/.test(String(h)) ? String(h) : null;
}
function gltRgb(s) {
  const a = (s && s.attributes) || {};
  if (Array.isArray(a.rgb_color) && a.color_mode && !/color_temp|white|brightness|onoff/.test(a.color_mode)) {
    const [r, g, b] = a.rgb_color;
    if (Math.max(r, g, b) - Math.min(r, g, b) > 40) return [r, g, b].join(', ');
  }
  return null;
}

const GLT_STYLE = `
  :host { display: block; }
  ha-card { background: none; border: 0; box-shadow: none; color: var(--glow-text, #F3F1FA); display: flex; flex-direction: column; gap: 6px; user-select: none; -webkit-user-select: none; }
  button { font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .ink { color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 4px; }
  .head b { font-size: 1.55rem; font-weight: 900; }
  .alloff { height: 36px; padding: 0 14px; border-radius: 18px; border: 1px solid var(--glow-border, rgba(255,255,255,0.12)); background: var(--glow-surface, rgba(255,255,255,0.07)); font-size: 0.8rem; font-weight: 800; }
  .rm { padding: 7px 10px; border-radius: 18px; border: 1px solid var(--glow-border, rgba(255,255,255,0.06)); background: var(--glow-surface, rgba(255,255,255,0.04)); transition: background 0.35s, border-color 0.35s; }
  .rm.on { border-color: rgba(var(--c), 0.4); background: linear-gradient(90deg, rgba(var(--c), 0.16), rgba(var(--c), 0.04)); }
  .row { display: flex; align-items: center; gap: 10px; }
  .orb { width: 36px; height: 36px; flex-shrink: 0; padding: 0; border: 0; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--glow-surface, rgba(255,255,255,0.06)); color: var(--glow-muted, #A39FB8); box-shadow: inset 0 0 0 1px var(--glow-border, rgba(255,255,255,0.1)); transition: background 0.35s, box-shadow 0.35s, transform 0.15s; --mdc-icon-size: 20px; }
  .on > .row .orb, .lamp.on .orb { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), rgb(var(--c)) 58%); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.85); }
  .orb:active { transform: scale(0.92); }
  .nm { flex: 1; min-width: 0; border: 0; background: none; padding: 0; text-align: left; display: flex; flex-direction: column; }
  .nm b { font-size: 0.95rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nm span { font-size: 0.75rem; font-weight: 800; opacity: 0.55; white-space: nowrap; }
  .on > .row .nm span { opacity: 1; }
  .tr { position: relative; width: 84px; height: 30px; flex-shrink: 0; display: flex; align-items: center; touch-action: none; cursor: ew-resize; }
  .tr::before { content: ''; position: absolute; left: 0; right: 0; top: 11px; height: 8px; border-radius: 4px; background: var(--glow-surface, rgba(255,255,255,0.08)); }
  .tr i { position: absolute; left: 0; top: 11px; height: 8px; border-radius: 4px; background: rgb(var(--c)); box-shadow: 0 0 8px rgba(var(--c), 0.8); }
  .lamps { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 0 2px 46px; }
  .lamp { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 11px 0 4px; border-radius: 16px; font-size: 0.75rem; font-weight: 800; border: 1px solid var(--glow-border, rgba(255,255,255,0.08)); background: var(--glow-surface, rgba(255,255,255,0.06)); }
  .lamp .orb { width: 24px; height: 24px; --mdc-icon-size: 14px; box-shadow: none; }
  .lamp.on { border-color: rgba(var(--c), 0.5); background: rgba(var(--c), 0.14); }
  .na { opacity: 0.4; }
`;

class GlowLightsCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._open = null; this._drag = null; this._bound = false; }
  static getStubConfig() { return { rooms: [] }; }
  setConfig(config) {
    this._config = { glow: 14, ...(config || {}) };
    this._open = this._config.open ?? null;
    this._key = null; this._render();
  }
  set hass(hass) { this._hass = hass; if (!this._drag) this._render(); }
  getCardSize() { return 10; }
  getGridOptions() { return { columns: 'full', rows: 'auto' }; }
  _lang() { return gltLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gltT(this._lang(), k, v); }

  _rooms() {
    const st = this._hass.states;
    return (this._config.rooms || []).map((r, i) => {
      const x = typeof r === 'string' ? { entity: r } : r;
      const s = st[x.entity];
      const members = Array.isArray(x.lights) && x.lights.length ? x.lights
        : s ? [].concat(s.attributes.entity_id || s.attributes.group_entities || [x.entity]) : [];
      const lamps = members.filter((e) => st[e]).map((e) => ({ id: e, name: (st[e].attributes.friendly_name || e).replace(new RegExp('^' + (x.name || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s+', 'i'), ''), on: st[e].state === 'on', na: st[e].state === 'unavailable', c: gltRgb(st[e]) }));
      const on = !!s && s.state === 'on';
      const bri = on && s.attributes.brightness != null ? Math.round(s.attributes.brightness / 2.55) : on ? 100 : 0;
      const c = (on && x.light_color !== false && gltRgb(s)) || gltHex(x.color) || GLT_PAL[i % GLT_PAL.length];
      const nOn = lamps.filter((l) => l.on).length;
      const count = lamps.length === 1 ? this._t('lamp') : this._t('lamps', { n: lamps.length });
      return { i, id: x.entity, name: x.name || (s && s.attributes.friendly_name) || x.entity, icon: x.icon || (s && s.attributes.icon) || 'mdi:lightbulb-group', on, bri, c, lamps, na: !s || s.state === 'unavailable',
        sub: !s || s.state === 'unavailable' ? this._t('na') : on ? (lamps.length > 1 ? nOn + '/' + lamps.length + ' · ' : '') + bri + ' %' : this._t('off') + (lamps.length > 1 ? ' · ' + count : '') };
    });
  }

  _render() {
    if (!this._hass || !this._config) return;
    const rooms = this._rooms();
    const key = JSON.stringify([rooms, this._open, this._lang()]);
    if (key === this._key) return;
    this._key = key;
    this._rm = rooms;
    const c = this._config, E = gltEsc;
    this.shadowRoot.innerHTML = `<style>${GLT_STYLE}</style><ha-card style="--glow:${parseInt(c.glow, 10) || 0}px">
      ${c.title === false ? '' : `<div class="head"><b>${E(c.title || this._t('title'))}</b><button type="button" class="alloff" data-alloff="1">${E(this._t('all_off'))}</button></div>`}
      ${rooms.map((r) => `<div class="rm${r.on ? ' on' : ''}${r.na ? ' na' : ''}" style="--c:${r.c}">
        <div class="row"><button type="button" class="orb" data-t="${E(r.id)}" aria-label="${E(r.name)}"><ha-icon icon="${E(r.icon)}"></ha-icon></button>
          <button type="button" class="nm" data-open="${r.i}"><b>${E(r.name)}</b><span class="${r.on ? 'ink' : ''}">${E(r.sub)}</span></button>
          <div class="tr" data-dim="${r.i}"><i style="width:${r.bri}%"></i></div></div>
        ${this._open === r.i && r.lamps.length > 1 ? `<div class="lamps">${r.lamps.map((l) => `<button type="button" class="lamp${l.on ? ' on' : ''}${l.na ? ' na' : ''}" data-t="${E(l.id)}" style="--c:${(l.on && l.c) || r.c}"><span class="orb"><ha-icon icon="mdi:lightbulb"></ha-icon></span>${E(l.name)}</button>`).join('')}</div>` : ''}
      </div>`).join('')}
    </ha-card>`;
    if (!this._bound) this._bind();
  }

  _bind() {
    this._bound = true;
    const root = this.shadowRoot;
    let holdT = null, held = false;
    const pct = (tr, x) => { const r = tr.getBoundingClientRect(); return Math.max(1, Math.min(100, Math.round((x - r.left) / r.width * 100))); };
    root.addEventListener('pointerdown', (ev) => {
      held = false;
      const tr = ev.target.closest('[data-dim]');
      if (tr) {
        ev.preventDefault();
        tr.setPointerCapture(ev.pointerId);
        this._drag = { tr, room: this._rm[+tr.dataset.dim], v: pct(tr, ev.clientX) };
        tr.querySelector('i').style.width = this._drag.v + '%';
        return;
      }
      const t = ev.target.closest('[data-t]');
      if (t) holdT = setTimeout(() => { held = true; this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: t.dataset.t }, bubbles: true, composed: true })); }, 550);
    });
    root.addEventListener('pointermove', (ev) => {
      if (!this._drag) return;
      this._drag.v = pct(this._drag.tr, ev.clientX);
      this._drag.tr.querySelector('i').style.width = this._drag.v + '%';
    });
    const end = () => {
      clearTimeout(holdT);
      if (!this._drag) return;
      const { room, v } = this._drag;
      this._drag = null;
      if (room && !room.na) this._hass.callService('light', 'turn_on', { entity_id: room.id, brightness_pct: v });
      this._key = null;
    };
    root.addEventListener('pointerup', end);
    root.addEventListener('pointercancel', end);
    root.addEventListener('click', (ev) => {
      const b = ev.target.closest('button');
      if (!b) return;
      if (b.dataset.alloff) { const ids = this._rm.map((r) => r.id).filter(Boolean); if (ids.length) this._hass.callService('light', 'turn_off', { entity_id: ids }); return; }
      if (b.dataset.open !== undefined) { const i = +b.dataset.open; this._open = this._open === i ? null : i; this._key = null; this._render(); return; }
      if (b.dataset.t) { if (held) { held = false; return; } this._hass.callService('homeassistant', 'toggle', { entity_id: b.dataset.t }); }
    });
  }
}

if (!customElements.get('glow-lights-card')) customElements.define('glow-lights-card', GlowLightsCard);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-lights-card')) {
  window.customCards.push({ type: 'glow-lights-card', name: 'Glow Lights Card', description: gltT(gltLang(null), 'description'), preview: false, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}
