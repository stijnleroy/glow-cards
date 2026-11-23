/*
 * Glow Panel Card
 * Eén vierkant scherm voor een wandpaneel (bv. NSPanel Pro): licht met scènes en kleur, ventilatie, radio.
 * Alles wat je aanraakt staat bovenaan; onderaan staat alleen informatie.
 */
const GPN = window.GlowKit;
const GPN_T = GPN.table({
  nl: { light_tab: 'Licht', radio_tab: 'Radio', on: 'aan', off: 'Uit', hint_dim: 'Tik of veeg om te dimmen', hint_on: 'Tik op de lamp om aan te zetten', color: 'Kleur…', pick: 'Kleur kiezen', pick_sub: 'Tik een kleur, het licht volgt meteen', done: 'Klaar', white: 'Wit', colors: 'Kleur',
    w_candle: 'Kaars', w_warm: 'Warm', w_neutral: 'Neutraal', w_cool: 'Koel', w_day: 'Daglicht', fan_on: 'Aan', fan_off: 'Uit', fan_humid: 'Vochtig! Tik om aan te zetten', playing: 'Speelt nu', silent: 'Stil', choose: 'Kies een zender', humid: 'vochtig', hum: 'vocht',
    c_red: 'Rood', c_orange: 'Oranje', c_yellow: 'Geel', c_green: 'Groen', c_teal: 'Turkoois', c_sky: 'Lichtblauw', c_blue: 'Blauw', c_purple: 'Paars', c_lilac: 'Lila', c_pink: 'Roze', c_magenta: 'Magenta', c_salmon: 'Zalm', custom: 'Eigen kleur',
    l_light: 'Lamp', l_scenes: 'Scènes', l_fan: 'Ventilator', l_temperature: 'Temperatuursensor', l_humidity: 'Vochtsensor', l_media: 'Mediaspeler (radio)', l_area: 'Naam onderaan', l_threshold: 'Vochtig vanaf (%)',
    description: 'Vierkant wandpaneel: licht met scènes en kleur, ventilatie en radio, met alle knoppen bovenaan.' },
  en: { light_tab: 'Light', radio_tab: 'Radio', on: 'on', off: 'Off', hint_dim: 'Tap or swipe to dim', hint_on: 'Tap the lamp to turn it on', color: 'Colour…', pick: 'Pick a colour', pick_sub: 'Tap a colour, the light follows', done: 'Done', white: 'White', colors: 'Colour',
    w_candle: 'Candle', w_warm: 'Warm', w_neutral: 'Neutral', w_cool: 'Cool', w_day: 'Daylight', fan_on: 'On', fan_off: 'Off', fan_humid: 'Humid! Tap to turn on', playing: 'Now playing', silent: 'Silent', choose: 'Pick a station', humid: 'humid', hum: 'humidity',
    c_red: 'Red', c_orange: 'Orange', c_yellow: 'Yellow', c_green: 'Green', c_teal: 'Turquoise', c_sky: 'Light blue', c_blue: 'Blue', c_purple: 'Purple', c_lilac: 'Lilac', c_pink: 'Pink', c_magenta: 'Magenta', c_salmon: 'Salmon', custom: 'Custom colour',
    l_light: 'Light', l_scenes: 'Scenes', l_fan: 'Fan', l_temperature: 'Temperature sensor', l_humidity: 'Humidity sensor', l_media: 'Media player (radio)', l_area: 'Name at the bottom', l_threshold: 'Humid from (%)',
    description: 'Square wall panel: light with scenes and colour, fan and radio, with every button at the top.' },
  fr: { light_tab: 'Lumière', radio_tab: 'Radio', off: 'Éteinte', color: 'Couleur…', done: 'OK', description: 'Panneau mural carré : lumière, scènes, couleur, ventilation et radio.' },
  de: { light_tab: 'Licht', radio_tab: 'Radio', off: 'Aus', color: 'Farbe…', done: 'Fertig', description: 'Quadratisches Wandpanel: Licht mit Szenen und Farbe, Lüftung und Radio.' },
  es: { light_tab: 'Luz', radio_tab: 'Radio', off: 'Apagada', color: 'Color…', done: 'Listo', description: 'Panel de pared cuadrado: luz con escenas y color, ventilación y radio.' },
  it: { light_tab: 'Luce', radio_tab: 'Radio', off: 'Spenta', color: 'Colore…', done: 'Fatto', description: 'Pannello a parete quadrato: luce con scene e colore, ventilazione e radio.' },
});
const GPN_WHITES = [['w_candle', 2200, '255, 160, 80'], ['w_warm', 2700, '255, 190, 130'], ['w_neutral', 3500, '255, 225, 190'], ['w_cool', 4500, '240, 240, 255'], ['w_day', 6000, '215, 230, 255']];
const GPN_COLORS = [['c_red', '255, 70, 70'], ['c_orange', '255, 140, 50'], ['c_yellow', '255, 214, 70'], ['c_green', '90, 220, 120'], ['c_teal', '60, 220, 210'], ['c_sky', '90, 180, 255'],
  ['c_blue', '60, 100, 255'], ['c_purple', '120, 70, 255'], ['c_lilac', '200, 150, 255'], ['c_pink', '255, 120, 200'], ['c_magenta', '240, 60, 180'], ['c_salmon', '255, 150, 120']];
const GPN_PALETTE = ['255, 143, 175', '142, 197, 255', '255, 110, 110', '143, 227, 184', '255, 214, 112', '185, 168, 255'];
const GPN_BULB = 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z';
const GPN_RADIO = 'M4 10h16v10H4zM8 10l9-5M8 15h.01M14 15h3';
const GPN_FAN = 'M12 12c-3-5 0-9 3-8s2 5-3 8zM12 12c5-3 9 0 8 3s-5 2-8-3zM12 12c3 5 0 9-3 8s-2-5 3-8zM12 12c-5 3-9 0-8-3s5-2 8 3z';

const GPN_CSS = `
  :host { display: block; height: 100%; }
  * { box-sizing: border-box; }
  button { font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  button:active { transform: scale(0.97); }
  ha-card { position: relative; overflow: hidden; height: var(--gpn-h, 100%); min-height: 420px; padding: 14px 16px; display: flex; flex-direction: column; gap: 12px; border-radius: var(--gpn-r, 0);
    background: radial-gradient(circle at 8% 4%, rgba(var(--l), 0.16), transparent 45%), var(--lovelace-background, var(--primary-background-color, #13111F));
    color: var(--primary-text-color, #F3F1FA); font-family: var(--glow-font, Nunito, system-ui, sans-serif); border: none; box-shadow: none; transition: background 0.6s; user-select: none; }
  .top { display: flex; align-items: center; justify-content: space-between; height: 48px; flex-shrink: 0; }
  .tabs { display: flex; gap: 8px; }
  .tab { height: 48px; padding: 0 18px; border-radius: 24px; display: inline-flex; align-items: center; gap: 8px; font-size: 17px; font-weight: 800; background: transparent; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .tab.on { border-color: rgba(var(--l), 0.6); background: rgba(var(--l), 0.2); color: color-mix(in srgb, rgb(var(--l)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .clock { display: flex; flex-direction: column; align-items: flex-end; line-height: 1; }
  .clock b { font-size: 26px; font-weight: 800; } .clock span { font-size: 12px; font-weight: 700; opacity: 0.55; margin-top: 3px; }
  .bar { position: relative; height: 150px; flex-shrink: 0; border-radius: 34px; overflow: hidden; display: flex; align-items: center; gap: 16px; padding: 0 22px 0 18px; touch-action: none;
    background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .bar.on { border-color: rgba(var(--l), 0.55); box-shadow: 0 0 calc(var(--glow) * 1.6) rgba(var(--l), 0.35); }
  .fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: linear-gradient(90deg, rgba(var(--l), 0.55), rgba(var(--l), 0.3)); transition: width 0.25s; pointer-events: none; }
  .bar.drag .fill { transition: none; }
  .pw { position: relative; width: 104px; height: 104px; border-radius: 52px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .bar.on .pw { border: none; color: #1C1730; background: rgb(var(--l)); box-shadow: 0 0 calc(var(--glow) * 1.5) rgba(var(--l), 0.9); }
  .bt { position: relative; flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; pointer-events: none; }
  .bt b { font-size: 24px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .bt .st { font-size: 17px; font-weight: 800; opacity: 0.6; }
  .bar.on .bt .st { opacity: 1; color: color-mix(in srgb, color-mix(in srgb, rgb(var(--l)) 75%, #fff), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .bt .h { font-size: 13px; font-weight: 700; opacity: 0.6; }
  .pct { position: relative; font-size: 34px; font-weight: 800; pointer-events: none; flex-shrink: 0; }
  .pre { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 10px; flex-shrink: 0; }
  .p { height: 92px; border-radius: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; font-size: 16px; font-weight: 800; min-width: 0;
    background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .p span:last-child { max-width: 100%; padding: 0 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .p.on { background: rgba(var(--c), 0.22); border-color: rgba(var(--c), 0.7); color: color-mix(in srgb, color-mix(in srgb, rgb(var(--c)) 70%, #fff), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .sw { width: 34px; height: 34px; border-radius: 17px; background: rgb(var(--c)); box-shadow: 0 0 4px rgba(var(--c), 0.8); }
  .p.on .sw { box-shadow: 0 0 var(--glow) rgba(var(--c), 0.8); }
  .sw.rb { background: conic-gradient(#ff6b6b, #ffd66b, #8fe3b8, #6bc8ff, #a78bff, #ff8fc8, #ff6b6b); }
  .fan { height: 72px; flex-shrink: 0; border-radius: 24px; display: flex; align-items: center; gap: 14px; padding: 0 16px 0 12px; text-align: left; width: 100%;
    background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .fan.on { background: rgba(143, 227, 184, 0.16); border-color: rgba(143, 227, 184, 0.55); }
  .fan.humid { border-color: rgba(255, 143, 143, 0.6); }
  .fi { width: 48px; height: 48px; border-radius: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .fan.on .fi { color: #1C1730; background: rgb(143, 227, 184); }
  .fan.on .fi svg { animation: gpnspin 2s linear infinite; }
  @keyframes gpnspin { to { transform: rotate(360deg); } }
  .ft { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .ft b { font-size: 18px; font-weight: 800; } .ft span { font-size: 13px; font-weight: 700; opacity: 0.65; }
  .fan.humid .ft span { opacity: 1; color: color-mix(in srgb, rgb(255, 143, 143), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .tg { margin-left: auto; width: 64px; height: 36px; border-radius: 18px; flex-shrink: 0; position: relative; background: rgba(150, 150, 160, 0.45); }
  .tg i { position: absolute; top: 4px; left: 4px; width: 28px; height: 28px; border-radius: 14px; background: #fff; transition: left 0.2s; }
  .fan.on .tg { background: rgb(143, 227, 184); } .fan.on .tg i { left: 32px; }
  .foot { margin-top: auto; flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 0 6px; height: 40px; border-top: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .foot .a { font-size: 11px; font-weight: 800; letter-spacing: 0.08em; opacity: 0.45; text-transform: uppercase; }
  .foot b { font-size: 26px; font-weight: 800; }
  .foot .t { color: color-mix(in srgb, rgb(255, 166, 107), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .foot .hm { color: color-mix(in srgb, rgb(var(--hc)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .foot small { font-size: 12px; font-weight: 700; opacity: 0.55; margin-left: 6px; }
  .sheet { position: absolute; left: 0; right: 0; top: 0; padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 10px; z-index: 5;
    background: color-mix(in srgb, var(--primary-background-color, #13111F) 97%, transparent); border-bottom: 1px solid var(--glow-border, rgba(255,255,255,0.1)); box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
  .sh { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 52px; }
  .sh > span { display: flex; align-items: center; gap: 12px; min-width: 0; }
  .cur { width: 44px; height: 44px; border-radius: 22px; flex-shrink: 0; background: rgb(var(--l)); box-shadow: 0 0 var(--glow) rgba(var(--l), 0.8); }
  .sh b { display: block; font-size: 22px; font-weight: 800; } .sh small { font-size: 13px; font-weight: 700; opacity: 0.6; }
  .done { height: 52px; padding: 0 22px; border-radius: 26px; border: none; font-size: 17px; font-weight: 800; color: #1C1730; background: rgb(var(--l)); flex-shrink: 0; }
  .lab { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; opacity: 0.55; text-transform: uppercase; }
  .wh { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
  .cl { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
  .k { height: 64px; border-radius: 20px; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); background: rgb(var(--c)); font-size: 14px; font-weight: 800; color: #1C1730; padding: 0 2px; }
  .k.on { border: 3px solid var(--primary-text-color, #fff); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.8); }
  .play { flex-shrink: 0; display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: 26px; background: linear-gradient(120deg, rgba(var(--c), 0.2), var(--glow-surface, rgba(255,255,255,0.07))); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .play.on { border-color: rgba(var(--c), 0.5); }
  .logo { flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #1C1730; background: rgb(var(--c)) center / cover no-repeat; overflow: hidden; }
  .logo.img { background-color: #fff; background-size: contain; background-origin: content-box; padding: 4px; }
  .play .logo { width: 64px; height: 64px; border-radius: 18px; font-size: 22px; }
  .pn { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
  .pn span { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; opacity: 0.55; text-transform: uppercase; }
  .pn b { font-size: 20px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .rb { width: 52px; height: 52px; border-radius: 26px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: transparent; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .vol { font-size: 17px; font-weight: 800; width: 34px; text-align: center; flex-shrink: 0; }
  .stop { width: 52px; height: 52px; border-radius: 26px; flex-shrink: 0; border: none; display: flex; align-items: center; justify-content: center; color: #1C1730; background: rgb(var(--c)); }
  .stations { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .s { height: 100px; border-radius: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; min-width: 0;
    background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .s .logo { width: 44px; height: 44px; border-radius: 14px; font-size: 16px; }
  .s span:last-child { font-size: 14px; font-weight: 800; max-width: 100%; padding: 0 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .s.on { background: rgba(var(--c), 0.2); border-color: rgba(var(--c), 0.7); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.4); color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .warn { padding: 14px; border-radius: 18px; font-weight: 800; background: rgba(255, 143, 143, 0.12); border: 1px solid rgba(255, 143, 143, 0.45); }
`;

class GlowPanelCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._tab = 'light'; this._picker = false; this._key = ''; }
  static getConfigElement() { return document.createElement('glow-panel-card-editor'); }
  static getStubConfig(hass) {
    const ids = Object.keys((hass && hass.states) || {});
    return { light: ids.find((e) => e.startsWith('light.')) || '' };
  }
  setConfig(config) {
    if (!config || !config.light) throw new Error('light is required');
    this._config = { glow: 15, humidity_threshold: 65, ...config };
    this._key = '';
    this._render();
  }
  set hass(hass) { this._hass = hass; this._render(); }
  connectedCallback() { clearInterval(this._clock); this._clock = setInterval(() => { this._key = ''; this._render(); }, 30000); }
  disconnectedCallback() { clearInterval(this._clock); }
  getCardSize() { return 9; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }
  _lang() { return GPN.lang(this._hass, this._config.language, GPN_T); }
  _t(k, v) { return GPN.t(GPN_T, this._lang(), k, v); }
  _st(id) { return id && this._hass ? this._hass.states[id] : undefined; }
  _call(domain, service, data) { return this._hass.callService(domain, service, data); }
  _store(k, v) { const key = 'glow-panel-' + this._config.light + '-' + k; try { if (v === undefined) return localStorage.getItem(key); localStorage.setItem(key, v); } catch (e) { /* geen opslag */ } return null; }

  // De kleur van de lamp zoals ze nu brandt (rgb), of null als ze uit is.
  _lightRgb(s) {
    if (!s || s.state !== 'on') return null;
    const a = s.attributes;
    if (Array.isArray(a.rgb_color)) {
      const [r, g, b] = a.rgb_color, m = Math.max(r, g, b, 1);
      return [r, g, b].map((x) => Math.round(80 + (x / m) * 175)).join(', ');
    }
    if (a.color_temp_kelvin) { const w = GPN_WHITES.reduce((best, x) => Math.abs(x[1] - a.color_temp_kelvin) < Math.abs(best[1] - a.color_temp_kelvin) ? x : best); return w[2]; }
    return '255, 214, 160';
  }

  _scenes() {
    const def = ['255, 184, 125', '108, 29, 255', '143, 227, 184', '255, 143, 175'];
    return (this._config.scenes || []).map((x) => (typeof x === 'string' ? { entity: x } : x)).map((x, i) => {
      const s = this._st(x.entity);
      return { ...x, name: x.name || (s ? (s.attributes.friendly_name || x.entity).trim() : x.entity), rgb: x.color || def[i % def.length] };
    });
  }

  _stations() {
    return (this._config.stations || []).map((x, i) => ({ ...x, rgb: x.color || GPN_PALETTE[i % GPN_PALETTE.length] }));
  }

  _render() {
    if (!this._config || !this._hass) return;
    const c = this._config, E = GPN.esc;
    const light = this._st(c.light), fan = this._st(c.fan), temp = this._st(c.temperature), hum = this._st(c.humidity), mp = this._st(c.media_player);
    const on = light && light.state === 'on';
    const bri = on ? Math.max(1, Math.round(((light.attributes.brightness || 255) / 255) * 100)) : 0;
    const scene = this._store('scene');
    const custom = this._store('custom');
    const lrgb = this._lightRgb(light) || '150, 150, 160';
    const humV = hum ? parseFloat(hum.state) : NaN;
    const humid = !isNaN(humV) && humV >= (parseFloat(c.humidity_threshold) || 65);
    const fanOn = fan && fan.state === 'on';
    const now = new Date();
    const key = JSON.stringify([this._tab, this._picker, light && [light.state, light.attributes.brightness, light.attributes.rgb_color, light.attributes.color_temp_kelvin], fan && fan.state, temp && temp.state, hum && hum.state, mp && [mp.state, mp.attributes.volume_level], scene, custom, this._store('station'), this._vol, now.getMinutes(), this._lang()]);
    if (key === this._key && !this._dragging) return;
    this._key = key;

    const loc = (this._hass.locale && this._hass.locale.language) || this._lang();
    const time = now.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'short' });
    const scenes = this._scenes(), stations = this._stations();
    const hasRadio = !!c.media_player && stations.length;
    if (!hasRadio) this._tab = 'light';
    const tab = (k, label, icon) => `<button type="button" class="tab${this._tab === k ? ' on' : ''}" data-a="tab" data-v="${k}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${icon}"/></svg>${E(label)}</button>`;

    let body = '';
    if (!light) {
      body = `<div class="warn">${E(c.light)} ?</div>`;
    } else if (this._tab === 'light') {
      const lname = c.name || (light.attributes.friendly_name || c.light);
      const activeScene = on ? scenes.find((s) => s.entity === scene) : null;
      const state = !on ? this._t('off') : (activeScene ? activeScene.name : custom ? JSON.parse(custom).n : '') + (activeScene || custom ? ' · ' : '') + this._t('on');
      const pre = scenes.map((s) => `<button type="button" class="p${activeScene === s ? ' on' : ''}" style="--c:${s.rgb}" data-a="scene" data-v="${E(s.entity)}"><span class="sw"></span><span>${E(s.name)}</span></button>`).join('')
        + `<button type="button" class="p${on && !activeScene && custom ? ' on' : ''}" style="--c:${custom ? JSON.parse(custom).c : '255, 255, 255'}" data-a="picker"><span class="sw${custom ? '' : ' rb'}"></span><span>${E(custom ? this._t(JSON.parse(custom).k) : this._t('color'))}</span></button>`;
      body = `<div class="bar${on ? ' on' : ''}" id="bar"><div class="fill" id="fill" style="width:${bri}%"></div>
          <button type="button" class="pw" data-a="toggle" aria-label="${E(lname)}"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="${GPN_BULB}"/></svg></button>
          <div class="bt"><b>${E(lname)}</b><span class="st">${E(state)}</span><span class="h">${E(this._t(on ? 'hint_dim' : 'hint_on'))}</span></div>
          <span class="pct" id="pct">${on ? bri + '%' : ''}</span></div>
        <div class="pre">${pre}</div>
        ${fan ? `<button type="button" class="fan${fanOn ? ' on' : ''}${humid && !fanOn ? ' humid' : ''}" data-a="fan"><span class="fi"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="${GPN_FAN}"/></svg></span>
          <span class="ft"><b>${E(c.fan_name || fan.attributes.friendly_name || c.fan)}</b><span>${E(this._t(fanOn ? 'fan_on' : humid ? 'fan_humid' : 'fan_off'))}</span></span><span class="tg"><i></i></span></button>` : ''}`;
    } else {
      const cur = stations.find((s) => s.name === this._store('station'));
      const playing = mp && (mp.state === 'playing' || mp.state === 'on' || mp.state === 'buffering');
      const sc = playing && cur ? cur.rgb : '150, 150, 160';
      const vol = mp && typeof mp.attributes.volume_level === 'number' ? Math.round(mp.attributes.volume_level * 100) : (this._vol != null ? this._vol : parseInt(this._store('vol'), 10) || 30);
      const logo = (s, cls) => s && s.image ? `<span class="logo img ${cls || ''}" style="--c:${s.rgb};background-image:url('${E(s.image)}')"></span>` : `<span class="logo ${cls || ''}" style="--c:${s ? s.rgb : sc}">${E(s ? s.name.replace(/^radio\s+/i, '').slice(0, 2) : '–')}</span>`;
      body = `<div class="play${playing ? ' on' : ''}" style="--c:${sc}">${logo(playing ? cur : null)}
          <div class="pn"><span>${E(this._t(playing ? 'playing' : 'silent'))}</span><b>${E(playing && cur ? cur.name : playing ? (mp.attributes.media_title || '') : this._t('choose'))}</b></div>
          <button type="button" class="rb" data-a="vol" data-v="-5" aria-label="-"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 12h12"/></svg></button>
          <span class="vol">${vol}</span>
          <button type="button" class="rb" data-a="vol" data-v="5" aria-label="+"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 12h12M12 6v12"/></svg></button>
          <button type="button" class="stop" data-a="${playing ? 'stop' : 'replay'}" aria-label="${playing ? 'stop' : 'play'}"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="${playing ? 'M6 6h12v12H6z' : 'M7 4l13 8-13 8z'}"/></svg></button></div>
        <div class="stations">${stations.map((s, i) => `<button type="button" class="s${playing && cur === s ? ' on' : ''}" style="--c:${s.rgb}" data-a="station" data-v="${i}">${logo(s)}<span>${E(s.name)}</span></button>`).join('')}</div>`;
    }

    let sheet = '';
    if (this._picker && light) {
      const cu = custom ? JSON.parse(custom) : null;
      sheet = `<div class="sheet"><div class="sh"><span><span class="cur"></span><span><b>${E(this._t('pick'))}</b><small>${E(this._t('pick_sub'))}</small></span></span><button type="button" class="done" data-a="close">${E(this._t('done'))}</button></div>
        <span class="lab">${E(this._t('white'))}</span><div class="wh">${GPN_WHITES.map(([k, kel, rgb]) => `<button type="button" class="k${cu && cu.k === k ? ' on' : ''}" style="--c:${rgb}" data-a="white" data-v="${k}">${E(this._t(k))}</button>`).join('')}</div>
        <span class="lab">${E(this._t('colors'))}</span><div class="cl">${GPN_COLORS.map(([k, rgb]) => `<button type="button" class="k${cu && cu.k === k ? ' on' : ''}" style="--c:${rgb}" data-a="color" data-v="${k}" aria-label="${E(this._t(k))}"></button>`).join('')}</div></div>`;
    }

    const hc = humid ? '255, 143, 143' : '142, 197, 255';
    const fmt = (s, d) => { const v = parseFloat(s.state); return isNaN(v) ? s.state : v.toLocaleString(loc, { maximumFractionDigits: d }); };
    const foot = (temp || hum || c.area) ? `<div class="foot"><span class="a">${E(c.area || '')}</span>
      ${temp ? `<b class="t">${E(fmt(temp, 1))}°</b>` : ''}
      ${hum ? `<span><b class="hm" style="--hc:${hc}">${E(fmt(hum, 1))} %</b><small>${E(this._t(humid ? 'humid' : 'hum'))}</small></span>` : ''}</div>` : '';

    this.shadowRoot.innerHTML = `<style>${GPN_CSS}</style><ha-card style="--l:${lrgb};--glow:${parseInt(c.glow, 10) || 0}px${c.height ? ';--gpn-h:' + E(c.height) : ''}${c.radius != null ? ';--gpn-r:' + parseInt(c.radius, 10) + 'px' : ''}">
      <div class="top"><div class="tabs">${hasRadio ? tab('light', this._t('light_tab'), GPN_BULB) + tab('radio', this._t('radio_tab'), GPN_RADIO) : ''}</div><div class="clock"><b>${E(time)}</b><span>${E(date)}</span></div></div>
      ${body}${sheet}${foot}</ha-card>`;
    this._wire();
  }

  _wire() {
    const root = this.shadowRoot;
    root.querySelectorAll('[data-a]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); this._act(b.dataset.a, b.dataset.v); }));
    const bar = root.getElementById('bar');
    if (!bar) return;
    // dimmen: tik of veeg over de balk (niet op de lampknop)
    const pct = (e) => { const r = bar.getBoundingClientRect(); return Math.max(1, Math.min(100, Math.round(((e.clientX - r.left) / r.width) * 100))); };
    bar.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.pw')) return;
      this._dragging = true; bar.classList.add('drag'); bar.setPointerCapture(e.pointerId); this._show(pct(e));
    });
    bar.addEventListener('pointermove', (e) => { if (this._dragging) this._show(pct(e)); });
    const end = (e) => {
      if (!this._dragging) return;
      this._dragging = false; bar.classList.remove('drag');
      const v = Math.max(5, Math.round(pct(e) / 5) * 5);
      this._show(v);
      this._call('light', 'turn_on', { entity_id: this._config.light, brightness_pct: v });
    };
    bar.addEventListener('pointerup', end);
    bar.addEventListener('pointercancel', () => { this._dragging = false; bar.classList.remove('drag'); this._key = ''; this._render(); });
  }

  _show(v) {
    const f = this.shadowRoot.getElementById('fill'), p = this.shadowRoot.getElementById('pct');
    if (f) f.style.width = v + '%';
    if (p) p.textContent = v + '%';
  }

  _act(a, v) {
    const c = this._config;
    if (a === 'tab') { this._tab = v; this._picker = false; }
    if (a === 'toggle') this._call('light', 'toggle', { entity_id: c.light });
    if (a === 'scene') { this._store('scene', v); this._store('custom', ''); this._call('scene', 'turn_on', { entity_id: v }); }
    if (a === 'picker') this._picker = true;
    if (a === 'close') this._picker = false;
    if (a === 'white') {
      const w = GPN_WHITES.find((x) => x[0] === v);
      this._store('custom', JSON.stringify({ k: v, c: w[2], n: this._t(v) })); this._store('scene', '');
      this._call('light', 'turn_on', { entity_id: c.light, color_temp_kelvin: w[1] });
    }
    if (a === 'color') {
      const col = GPN_COLORS.find((x) => x[0] === v);
      this._store('custom', JSON.stringify({ k: v, c: col[1], n: this._t(v) })); this._store('scene', '');
      this._call('light', 'turn_on', { entity_id: c.light, rgb_color: col[1].split(',').map((x) => parseInt(x, 10)) });
    }
    if (a === 'fan') this._call('homeassistant', 'toggle', { entity_id: c.fan });
    if (a === 'station' || a === 'replay') {
      const list = this._stations();
      const s = a === 'station' ? list[parseInt(v, 10)] : list.find((x) => x.name === this._store('station')) || list[0];
      if (s) {
        this._store('station', s.name);
        if (s.script) this._call('script', 'turn_on', { entity_id: s.script });
        else if (s.media_content_id) this._call('media_player', 'play_media', { entity_id: c.media_player, media_content_id: s.media_content_id, media_content_type: s.media_content_type || 'music' });
      }
    }
    if (a === 'stop') this._call('media_player', 'media_stop', { entity_id: c.media_player });
    if (a === 'vol') {
      const mp = this._st(c.media_player);
      const curV = mp && typeof mp.attributes.volume_level === 'number' ? Math.round(mp.attributes.volume_level * 100) : (this._vol != null ? this._vol : parseInt(this._store('vol'), 10) || 30);
      this._vol = Math.max(0, Math.min(100, curV + parseInt(v, 10)));
      this._store('vol', String(this._vol));
      this._call('media_player', 'volume_set', { entity_id: c.media_player, volume_level: this._vol / 100 });
    }
    this._key = '';
    this._render();
  }
}

GPN.editor('glow-panel-card-editor', GPN_T, () => [
  { name: 'light', required: true, selector: { entity: { domain: 'light' } } },
  { name: 'scenes', selector: { entity: { domain: 'scene', multiple: true } } },
  { name: 'fan', selector: { entity: { domain: ['fan', 'switch'] } } },
  { name: 'temperature', selector: { entity: { domain: 'sensor', device_class: 'temperature' } } },
  { name: 'humidity', selector: { entity: { domain: 'sensor', device_class: 'humidity' } } },
  { name: 'humidity_threshold', selector: { number: { min: 30, max: 100, step: 1, mode: 'box' } } },
  { name: 'media_player', selector: { entity: { domain: 'media_player' } } },
  { name: 'area', selector: { text: {} } },
], { glow: 15, humidity_threshold: 65 });
GPN.register('glow-panel-card', 'Glow Panel Card', GPN_T, GlowPanelCard);
