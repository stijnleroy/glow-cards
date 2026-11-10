/*
 * Glow Media Card
 * Wat er speelt, met de hoes, een gloed in de kleur van de hoes, bediening,
 * volume en voortgang. Wisselen tussen meerdere spelers (tv, soundbar, …).
 */

const GMED_I18N = {
  nl: {
    idle: 'Niets aan het spelen', off: 'Uit', unavailable: 'Niet beschikbaar', paused: 'Gepauzeerd', turn_on: 'Aanzetten', turn_off: 'Uitzetten',
    prev: 'Vorige', next: 'Volgende', play: 'Afspelen', pause: 'Pauzeren', mute: 'Geluid uit', volume: 'Volume',
    err: 'Vul "entity" of "entities" in met een mediaspeler.',
    l_entities: 'Mediaspelers', l_name: 'Naam', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Mediakaart met de hoes, een gloed in de kleur van de hoes, bediening en volume.',
  },
  en: {
    idle: 'Nothing playing', off: 'Off', unavailable: 'Unavailable', paused: 'Paused', turn_on: 'Turn on', turn_off: 'Turn off',
    prev: 'Previous', next: 'Next', play: 'Play', pause: 'Pause', mute: 'Mute', volume: 'Volume',
    err: 'Fill in "entity" or "entities" with a media player.',
    l_entities: 'Media players', l_name: 'Name', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Media card with the artwork, a glow in its colour, controls and volume.',
  },
  fr: {
    idle: 'Rien en lecture', off: 'Éteint', unavailable: 'Indisponible', paused: 'En pause', turn_on: 'Allumer', turn_off: 'Éteindre',
    prev: 'Précédent', next: 'Suivant', play: 'Lecture', pause: 'Pause', mute: 'Muet', volume: 'Volume',
    err: 'Renseignez "entity" ou "entities" avec un lecteur multimédia.',
    l_entities: 'Lecteurs multimédia', l_name: 'Nom', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Carte multimédia avec pochette, lueur assortie, commandes et volume.',
  },
  de: {
    idle: 'Es läuft nichts', off: 'Aus', unavailable: 'Nicht verfügbar', paused: 'Pausiert', turn_on: 'Einschalten', turn_off: 'Ausschalten',
    prev: 'Zurück', next: 'Weiter', play: 'Abspielen', pause: 'Pause', mute: 'Stumm', volume: 'Lautstärke',
    err: 'Gib "entity" oder "entities" mit einem Mediaplayer an.',
    l_entities: 'Mediaplayer', l_name: 'Name', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Medienkarte mit Cover, Leuchten in dessen Farbe, Steuerung und Lautstärke.',
  },
  es: {
    idle: 'No se reproduce nada', off: 'Apagado', unavailable: 'No disponible', paused: 'En pausa', turn_on: 'Encender', turn_off: 'Apagar',
    prev: 'Anterior', next: 'Siguiente', play: 'Reproducir', pause: 'Pausa', mute: 'Silencio', volume: 'Volumen',
    err: 'Indica "entity" o "entities" con un reproductor.',
    l_entities: 'Reproductores', l_name: 'Nombre', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Tarjeta multimedia con carátula, brillo de su color, controles y volumen.',
  },
  it: {
    idle: 'Niente in riproduzione', off: 'Spento', unavailable: 'Non disponibile', paused: 'In pausa', turn_on: 'Accendi', turn_off: 'Spegni',
    prev: 'Precedente', next: 'Successivo', play: 'Riproduci', pause: 'Pausa', mute: 'Muto', volume: 'Volume',
    err: 'Indica "entity" o "entities" con un lettore multimediale.',
    l_entities: 'Lettori multimediali', l_name: 'Nome', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Scheda multimediale con copertina, bagliore del suo colore, comandi e volume.',
  },
};
const GMED_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
function gmedLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GMED_I18N[l] ? l : 'en';
}
function gmedT(lang, key) { return (GMED_I18N[lang] && GMED_I18N[lang][key]) || GMED_I18N.en[key] || key; }
function gmedEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
const gmedTime = (s) => { s = Math.max(0, Math.floor(s || 0)); const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const x = String(s % 60).padStart(2, '0'); return h ? h + ':' + String(m).padStart(2, '0') + ':' + x : m + ':' + x; };

const GMED_DEFAULT = '185, 168, 255';
const GMED_SVG = (d, fill) => `<svg viewBox="0 0 24 24" ${fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"'}>${d}</svg>`;
const GMED_ICON = {
  prev: GMED_SVG('<path d="M6 5h2v14H6z"/><path d="M20 5v14L9 12z"/>', true),
  next: GMED_SVG('<path d="M16 5h2v14h-2z"/><path d="M4 5v14l11-7z"/>', true),
  play: GMED_SVG('<path d="M7 4.5v15l13-7.5z"/>', true),
  pause: GMED_SVG('<rect x="6" y="4.5" width="4.5" height="15" rx="1.2"/><rect x="13.5" y="4.5" width="4.5" height="15" rx="1.2"/>', true),
  vol: GMED_SVG('<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/>'),
  mute: GMED_SVG('<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/>'),
  power: GMED_SVG('<path d="M12 3v9"/><path d="M6.3 7.2a8 8 0 1 0 11.4 0"/>'),
  note: GMED_SVG('<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>'),
  tv: GMED_SVG('<rect x="3" y="5" width="18" height="12" rx="2.5"/><path d="M8 21h8"/>'),
};

const GMED_STYLE = `
  :host { display: block; }
  ha-card {
    display: block; position: relative; overflow: hidden; box-sizing: border-box; padding: 16px; border-radius: var(--ha-card-border-radius, 24px); container-type: inline-size;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid var(--glow-card-border, rgba(255, 255, 255, 0.08)); user-select: none; -webkit-user-select: none;
    transition: border-color 0.6s, box-shadow 0.6s;
  }
  ha-card.playing { border-color: rgba(var(--c), 0.5); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); }
  .bg { position: absolute; inset: -40px; background-size: cover; background-position: center; filter: blur(40px) saturate(1.3); opacity: 0; transition: opacity 0.8s; pointer-events: none; }
  ha-card.has-art .bg { opacity: 0.28; }
  .tint { position: absolute; inset: 0; background: linear-gradient(120deg, rgba(var(--c), 0.18), transparent 60%); opacity: 0; transition: opacity 0.6s; pointer-events: none; }
  ha-card.playing .tint { opacity: 1; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .players { position: relative; display: flex; gap: 6px; margin-bottom: 12px; overflow-x: auto; scrollbar-width: none; }
  .players:empty { display: none; }
  .players::-webkit-scrollbar { display: none; }
  .pl { height: 30px; padding: 0 12px; border-radius: 15px; flex-shrink: 0; display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid transparent; }
  .pl i { width: 7px; height: 7px; border-radius: 4px; background: var(--glow-border, rgba(255,255,255,0.2)); }
  .pl.live i { background: rgb(var(--c)); box-shadow: 0 0 6px rgba(var(--c), 0.9); }
  .pl.sel { border-color: rgba(var(--c), 0.55); background: rgba(var(--c), 0.16); }
  .main { position: relative; display: flex; gap: 16px; align-items: center; }
  .art { position: relative; width: 112px; height: 112px; flex-shrink: 0; border-radius: 20px; overflow: hidden; cursor: pointer;
    background: var(--glow-surface, rgba(255,255,255,0.07)); display: flex; align-items: center; justify-content: center; transition: box-shadow 0.6s; }
  ha-card.playing .art { box-shadow: 0 0 var(--glow) rgba(var(--c), 0.7), 0 10px 26px rgba(0, 0, 0, 0.35); }
  .art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .art svg { width: 44px; height: 44px; opacity: 0.4; }
  .info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
  .title { font-size: 1.25rem; font-weight: 800; line-height: 1.2; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .artist { font-size: 0.95rem; font-weight: 700; opacity: 0.7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: -6px; }
  .prog { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 800; opacity: 0.85; font-variant-numeric: tabular-nums; }
  .prog .rail { flex: 1; height: 6px; border-radius: 3px; background: var(--glow-border, rgba(255,255,255,0.14)); overflow: hidden; }
  .prog .fill { height: 100%; width: 0; border-radius: 3px; background: rgb(var(--c)); box-shadow: 0 0 8px rgba(var(--c), 0.8); }
  .prog[hidden] { display: none; }
  .ctl { display: flex; align-items: center; gap: 10px; }
  .b { width: 44px; height: 44px; border-radius: 22px; padding: 0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border: 0; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .b svg { width: 20px; height: 20px; }
  .b.big { width: 56px; height: 56px; border-radius: 28px; color: #1C1730; background: rgb(var(--c)); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.7); }
  .b.big svg { width: 26px; height: 26px; }
  .b[hidden] { display: none; }
  .b:active { transform: scale(0.94); }
  .vol { flex: 1; min-width: 80px; display: flex; align-items: center; gap: 8px; }
  .vol .b { width: 38px; height: 38px; background: transparent; }
  .vol .track { flex: 1; height: 32px; display: flex; align-items: center; touch-action: none; cursor: pointer; }
  .vol .rail { position: relative; width: 100%; height: 10px; border-radius: 5px; background: var(--glow-border, rgba(255,255,255,0.14)); }
  .vol .fill { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 5px; background: rgba(var(--c), 0.9); }
  .vol[hidden] { display: none; }
  ha-card.idle .ctl .b:not(.pw), ha-card.idle .vol { display: none; }
  .pw[hidden] { display: none; }
  @container (max-width: 420px) {
    .art { width: 84px; height: 84px; border-radius: 16px; }
    .ctl { flex-wrap: wrap; }
    .vol { flex-basis: 100%; }
  }
`;

// opvallende kleur uit de hoes halen (zelfde bron, dus het canvas mag gelezen worden)
function gmedColor(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const cv = document.createElement('canvas');
        cv.width = 24; cv.height = 24;
        const ctx = cv.getContext('2d');
        ctx.drawImage(img, 0, 0, 24, 24);
        const d = ctx.getImageData(0, 0, 24, 24).data;
        let best = null;
        let bestScore = -1;
        let sum = [0, 0, 0];
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          sum[0] += r; sum[1] += g; sum[2] += b;
          const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
          const sat = mx ? (mx - mn) / mx : 0;
          const score = sat * (mx / 255) * (mx > 40 ? 1 : 0.2);
          if (score > bestScore) { bestScore = score; best = [r, g, b]; }
        }
        let c = bestScore > 0.2 ? best : sum.map((x) => Math.round(x / (d.length / 4)));
        // pastel maken, zoals de rest van de Glow-kaarten
        c = c.map((x) => Math.round(x + (255 - x) * 0.35));
        resolve(c.join(', '));
      } catch (e) { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

class GlowMediaCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._built = false; this._sel = null; this._colors = {}; }
  static getConfigElement() { return document.createElement('glow-media-card-editor'); }
  static getStubConfig(hass) {
    const ids = Object.keys((hass && hass.states) || {}).filter((e) => e.startsWith('media_player.'));
    return { entities: ids.slice(0, 2) };
  }
  setConfig(config) {
    const list = Array.isArray(config && config.entities) ? config.entities : config && config.entity ? [config.entity] : [];
    if (!list.length) throw new Error(gmedT(gmedLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, ...config };
    this._list = list.map((e) => (typeof e === 'string' ? { entity: e } : e)).filter((e) => e && e.entity);
    this._built = false;
    if (this._hass) this._render();
  }
  set hass(hass) { this._hass = hass; if (this._config) this._render(); }
  get hass() { return this._hass; }
  getCardSize() { return 3; }
  getGridOptions() { return { columns: 12, rows: 'auto', min_columns: 6 }; }
  connectedCallback() { clearInterval(this._tick); this._tick = setInterval(() => this._progress(), 1000); }
  disconnectedCallback() { clearInterval(this._tick); }

  _lang() { return gmedLang(this._hass, this._config && this._config.language); }
  _t(k) { return gmedT(this._lang(), k); }

  // de gekozen speler, of anders de eerste die speelt
  _current() {
    const st = this._hass.states;
    const ok = this._list.filter((x) => st[x.entity]);
    if (this._sel && ok.some((x) => x.entity === this._sel)) return this._sel;
    const playing = ok.find((x) => st[x.entity].state === 'playing') || ok.find((x) => st[x.entity].state === 'paused') || ok.find((x) => !['off', 'unavailable', 'standby'].includes(st[x.entity].state));
    return (playing || ok[0] || {}).entity;
  }

  _call(svc, data) { this._hass.callService('media_player', svc, { entity_id: this._cur, ...(data || {}) }); }

  _build() {
    this.shadowRoot.innerHTML = `
      <style>${GMED_STYLE}</style>
      <ha-card>
        <div class="bg"></div><div class="tint"></div>
        <div class="players"></div>
        <div class="main">
          <div class="art"></div>
          <div class="info">
            <span class="title"></span>
            <span class="artist"></span>
            <div class="prog" hidden><span class="pos"></span><div class="rail"><div class="fill"></div></div><span class="dur"></span></div>
            <div class="ctl">
              <button class="b pw" type="button" data-a="power">${GMED_ICON.power}</button>
              <button class="b" type="button" data-a="prev" aria-label="${gmedEsc(this._t('prev'))}">${GMED_ICON.prev}</button>
              <button class="b big" type="button" data-a="play"></button>
              <button class="b" type="button" data-a="next" aria-label="${gmedEsc(this._t('next'))}">${GMED_ICON.next}</button>
              <div class="vol">
                <button class="b" type="button" data-a="mute" aria-label="${gmedEsc(this._t('mute'))}"></button>
                <div class="track" aria-label="${gmedEsc(this._t('volume'))}"><div class="rail"><div class="fill"></div></div></div>
              </div>
            </div>
          </div>
        </div>
      </ha-card>`;
    const r = this.shadowRoot;
    this._card = r.querySelector('ha-card');
    r.querySelector('.players').addEventListener('click', (e) => { const b = e.target.closest('.pl'); if (b) { this._sel = b.dataset.e; this._render(); } });
    r.querySelector('.art').addEventListener('click', () => this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._cur }, bubbles: true, composed: true })));
    r.querySelector('.ctl').addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || !this._cur) return;
      const s = this._hass.states[this._cur];
      const a = b.dataset.a;
      if (a === 'play') this._call(s.state === 'playing' ? 'media_pause' : 'media_play');
      else if (a === 'prev') this._call('media_previous_track');
      else if (a === 'next') this._call('media_next_track');
      else if (a === 'mute') this._call('volume_mute', { is_volume_muted: !s.attributes.is_volume_muted });
      else if (a === 'power') this._call(['off', 'standby'].includes(s.state) ? 'turn_on' : 'turn_off');
    });
    // volume: slepen, versturen bij loslaten
    const track = r.querySelector('.vol .track');
    const fill = r.querySelector('.vol .fill');
    const pct = (e) => { const b = track.getBoundingClientRect(); return Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)); };
    let drag = false;
    track.addEventListener('pointerdown', (e) => { drag = true; this._volDrag = true; try { track.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ } fill.style.width = pct(e) * 100 + '%'; });
    track.addEventListener('pointermove', (e) => { if (drag) fill.style.width = pct(e) * 100 + '%'; });
    track.addEventListener('pointerup', (e) => { if (!drag) return; drag = false; const v = Math.round(pct(e) * 100) / 100; this._call('volume_set', { volume_level: v }); setTimeout(() => { this._volDrag = false; }, 1500); });
    track.addEventListener('pointercancel', () => { drag = false; this._volDrag = false; });
    this._built = true;
    this._builtLang = this._lang();
    this._keys = {};
  }

  _progress() {
    if (!this._built || !this._hass || !this._cur) return;
    const s = this._hass.states[this._cur];
    const r = this.shadowRoot;
    const prog = r.querySelector('.prog');
    const a = s && s.attributes;
    if (!a || !a.media_duration || a.media_position === undefined) { prog.hidden = true; return; }
    let pos = a.media_position;
    if (s.state === 'playing' && a.media_position_updated_at) pos += (Date.now() - Date.parse(a.media_position_updated_at)) / 1000;
    pos = Math.min(pos, a.media_duration);
    prog.hidden = false;
    r.querySelector('.pos').textContent = gmedTime(pos);
    r.querySelector('.dur').textContent = gmedTime(a.media_duration);
    r.querySelector('.prog .fill').style.width = (pos / a.media_duration * 100).toFixed(2) + '%';
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    const st = this._hass.states;
    const r = this.shadowRoot;
    this._cur = this._current();
    const s = this._cur && st[this._cur];
    const a = (s && s.attributes) || {};
    const state = s ? s.state : 'unavailable';
    const active = state === 'playing' || state === 'paused' || state === 'buffering';
    const f = a.supported_features || 0;
    this._card.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');

    // spelers
    const chips = this._list.length > 1 ? this._list.filter((x) => st[x.entity]).map((x) => {
      const ps = st[x.entity];
      return `<button class="pl${x.entity === this._cur ? ' sel' : ''}${ps.state === 'playing' ? ' live' : ''}" type="button" data-e="${gmedEsc(x.entity)}"><i></i>${gmedEsc(x.name || ps.attributes.friendly_name || x.entity)}</button>`;
    }).join('') : '';
    if (this._keys.chips !== chips) { this._keys.chips = chips; r.querySelector('.players').innerHTML = chips; }

    // hoes en kleur
    const pic = active ? (a.entity_picture_local || a.entity_picture) : null;
    const artKey = pic || (/tv|android|chromecast|shield/i.test(this._cur || '') ? 'tv' : 'note');
    if (this._keys.art !== artKey) {
      this._keys.art = artKey;
      r.querySelector('.art').innerHTML = pic ? `<img alt="" src="${gmedEsc(pic)}">` : GMED_ICON[artKey];
      r.querySelector('.bg').style.backgroundImage = pic ? `url("${pic.replace(/"/g, '%22')}")` : 'none';
      this._card.classList.toggle('has-art', !!pic);
      if (pic && !this._colors[pic]) gmedColor(pic).then((c) => { this._colors[pic] = c || GMED_DEFAULT; this._render(); });
    }
    const col = (pic && this._colors[pic]) || GMED_DEFAULT;
    this._card.style.setProperty('--c', col);
    this._card.classList.toggle('playing', state === 'playing');
    this._card.classList.toggle('idle', !active);

    // tekst
    const name = (this._list.find((x) => x.entity === this._cur) || {}).name || a.friendly_name || this._cur || '';
    let title;
    let sub;
    if (active) {
      title = a.media_title || a.app_name || a.source || name;
      sub = [a.media_artist || a.media_series_title || a.media_album_artist, a.media_artist ? null : a.app_name].filter(Boolean).join(' · ') || name;
      if (state === 'paused') sub = this._t('paused') + ' · ' + sub;
    } else {
      title = name;
      sub = state === 'unavailable' ? this._t('unavailable') : ['off', 'standby'].includes(state) ? this._t('off') : this._t('idle');
    }
    r.querySelector('.title').textContent = title;
    r.querySelector('.artist').textContent = sub;

    // knoppen volgens wat de speler kan
    const play = r.querySelector('[data-a="play"]');
    const playIcon = state === 'playing' ? 'pause' : 'play';
    if (this._keys.play !== playIcon) { this._keys.play = playIcon; play.innerHTML = GMED_ICON[playIcon]; play.setAttribute('aria-label', this._t(playIcon)); }
    play.hidden = !(f & 1 || f & 16384);
    r.querySelector('[data-a="prev"]').hidden = !(f & 16);
    r.querySelector('[data-a="next"]').hidden = !(f & 32);
    const pw = r.querySelector('[data-a="power"]');
    pw.hidden = !(f & 128 || f & 256) || active;
    pw.setAttribute('aria-label', this._t(['off', 'standby'].includes(state) ? 'turn_on' : 'turn_off'));
    const vol = r.querySelector('.vol');
    vol.hidden = !(f & 4);
    const muted = !!a.is_volume_muted;
    const mi = muted ? 'mute' : 'vol';
    if (this._keys.mute !== mi) { this._keys.mute = mi; r.querySelector('[data-a="mute"]').innerHTML = GMED_ICON[mi]; }
    r.querySelector('[data-a="mute"]').hidden = !(f & 8);
    if (!this._volDrag) r.querySelector('.vol .fill').style.width = (muted ? 0 : (a.volume_level || 0) * 100) + '%';
    this._progress();
  }
}

class GlowMediaCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._render(); }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = gmedLang(this._hass, this._config.language);
    const t = (k) => gmedT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gmedT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length)) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.glow === 15) delete v.glow;
        delete v.entity;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    const simple = (this._config.entities || []).every((x) => typeof x === 'string');
    const ents = this._config.entities || (this._config.entity ? [this._config.entity] : []);
    this._form.schema = [
      ...(simple ? [{ name: 'entities', selector: { entity: { domain: 'media_player', multiple: true } } }] : []),
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GMED_LANG_NAMES).map((k) => ({ value: k, label: GMED_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, language: 'auto', ...this._config, entities: ents };
  }
}

if (!customElements.get('glow-media-card')) customElements.define('glow-media-card', GlowMediaCard);
if (!customElements.get('glow-media-card-editor')) customElements.define('glow-media-card-editor', GlowMediaCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-media-card')) {
  window.customCards.push({ type: 'glow-media-card', name: 'Glow Media Card', description: gmedT(gmedLang(null), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}
