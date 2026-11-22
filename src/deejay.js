/*
 * Glow Deejay Card
 * Volg een UrDeejay-feest: wat er speelt, de stemlijst, wie meedoet en de QR-code.
 * Voeg nummers toe en stem namens een gast. Praat rechtstreeks met de UrDeejay-API (met de ha_key).
 */
const GDJ = window.GlowKit;
const GDJ_T = GDJ.table({
  nl: { title: 'UrDeejay', live: 'Feest bezig', paused: 'Gepauzeerd', idle: 'Geen muziek', sub: '{g} gasten · {l} voorstellen · {p} gespeeld', now_on: 'Nu op {d}', now_on_any: 'Nu', by: 'voorgesteld door {n}', fallback: 'terugvallijst: {n}', nothing: 'Er speelt nog niets. De muziek start zodra er een voorstel is.',
    skip: '{v} van {n} wil overslaan', next: 'Hierna', next_fb: 'Terugvallijst', list: 'Stemlijst', list_hint: 'meeste stemmen speelt eerst', empty: 'Nog geen voorstellen. De terugvallijst speelt.', door: 'door {n}',
    scan: 'Scan om mee te doen', guests: 'Gasten', no_guests: 'Nog niemand doet mee.', dj: 'DJ van de avond', dj_votes: '{n} stemmen', dj_vote: '1 stem', add: 'Nummer toevoegen namens', pick_guest: 'Kies eerst een gast hierboven.', need_guest: 'Laat eerst een gast de QR-code scannen, dan kan je namens die gast toevoegen.',
    search: 'Zoek een nummer of artiest…', add_btn: 'Toevoegen', vote_btn: 'Stem erbij', voted_btn: 'Gestemd', no_results: 'Niets gevonden.', searching: 'Zoeken…', recent: 'Net gespeeld',
    vote_as: 'Stem van {n}', remove: 'Verwijderen', play: 'Afspelen', pause: 'Pauzeren', skip_btn: 'Overslaan',
    e_config: 'Vul url en key in (de ha_key uit config.php van UrDeejay).', e_key: 'De sleutel klopt niet. Kijk ha_key na in config.php van UrDeejay.', e_net: 'UrDeejay is niet bereikbaar. Is het adres juist en is ha_key ingevuld in config.php?', e_spotify: 'Spotify is nog niet gekoppeld. Open het hostscherm om te koppelen.',
    err_no_device: 'Spotify vindt geen toestel. Zet de soundbar aan of start iets in de Spotify-app.', err_premium: 'Spotify weigert de bediening: dit account heeft geen Premium.', err_forbidden: 'Spotify weigert dit. Staat je account in User Management?', err_auth: 'De koppeling met Spotify is verlopen. Open het hostscherm.', err_spotify_down: 'Spotify antwoordt even niet.', err_rate_limited: 'Spotify vraagt even te wachten.',
    l_url: 'Adres van UrDeejay', h_url: 'bv. https://urdeejay.drasticdesigns.be', l_key: 'Sleutel (ha_key uit config.php)', l_qr: 'QR-code tonen', l_compact: 'Compact (zonder stemlijst en gasten)',
    description: 'Volg een UrDeejay-feest en voeg nummers toe namens een gast.' },
  en: { title: 'UrDeejay', live: 'Party on', paused: 'Paused', idle: 'No music', sub: '{g} guests · {l} suggestions · {p} played', now_on: 'Now on {d}', now_on_any: 'Now', by: 'suggested by {n}', fallback: 'fallback list: {n}', nothing: 'Nothing is playing yet. Music starts as soon as there is a suggestion.',
    skip: '{v} of {n} want to skip', next: 'Up next', next_fb: 'Fallback list', list: 'Vote list', list_hint: 'most votes plays first', empty: 'No suggestions yet. The fallback list is playing.', door: 'by {n}',
    scan: 'Scan to join', guests: 'Guests', no_guests: 'Nobody has joined yet.', dj: 'DJ of the night', dj_votes: '{n} votes', dj_vote: '1 vote', add: 'Add a song for', pick_guest: 'Pick a guest above first.', need_guest: 'Let a guest scan the QR code first, then you can add songs for them.',
    search: 'Search a song or artist…', add_btn: 'Add', vote_btn: 'Vote too', voted_btn: 'Voted', no_results: 'Nothing found.', searching: 'Searching…', recent: 'Just played',
    vote_as: 'Vote of {n}', remove: 'Remove', play: 'Play', pause: 'Pause', skip_btn: 'Skip',
    e_config: 'Fill in url and key (the ha_key from UrDeejay config.php).', e_key: 'The key is wrong. Check ha_key in UrDeejay config.php.', e_net: 'UrDeejay is not reachable. Is the address right and ha_key set in config.php?', e_spotify: 'Spotify is not linked yet. Open the host screen to link it.',
    err_no_device: 'Spotify finds no device. Turn on the speaker or start something in the Spotify app.', err_premium: 'Spotify refuses: this account has no Premium.', err_forbidden: 'Spotify refuses this. Is your account in User Management?', err_auth: 'The Spotify link expired. Open the host screen.', err_spotify_down: 'Spotify is not answering right now.', err_rate_limited: 'Spotify asks to wait a moment.',
    l_url: 'UrDeejay address', h_url: 'e.g. https://urdeejay.example.com', l_key: 'Key (ha_key from config.php)', l_qr: 'Show QR code', l_compact: 'Compact (no vote list or guests)',
    description: 'Follow an UrDeejay party and add songs for a guest.' },
  fr: { live: 'La fête bat son plein', paused: 'En pause', next: 'Ensuite', list: 'Liste des votes', scan: 'Scannez pour participer', guests: 'Invités', dj: 'DJ de la soirée', add: 'Ajouter un titre pour', search: 'Chercher un titre ou un artiste…', add_btn: 'Ajouter', vote_btn: 'Voter aussi', voted_btn: 'Voté', recent: 'Joué à l’instant', description: 'Suivez une fête UrDeejay et ajoutez des titres pour un invité.' },
  de: { live: 'Party läuft', paused: 'Pausiert', next: 'Als Nächstes', list: 'Abstimmungsliste', scan: 'Scannen zum Mitmachen', guests: 'Gäste', dj: 'DJ des Abends', add: 'Titel hinzufügen für', search: 'Titel oder Künstler suchen…', add_btn: 'Hinzufügen', vote_btn: 'Mitstimmen', voted_btn: 'Gestimmt', recent: 'Gerade gespielt', description: 'Verfolge eine UrDeejay-Party und füge Titel für einen Gast hinzu.' },
  es: { live: 'Fiesta en marcha', paused: 'En pausa', next: 'A continuación', list: 'Lista de votos', scan: 'Escanea para unirte', guests: 'Invitados', dj: 'DJ de la noche', add: 'Añadir canción para', search: 'Busca una canción o artista…', add_btn: 'Añadir', vote_btn: 'Votar también', voted_btn: 'Votado', recent: 'Recién sonado', description: 'Sigue una fiesta UrDeejay y añade canciones para un invitado.' },
  it: { live: 'Festa in corso', paused: 'In pausa', next: 'Prossimo', list: 'Lista dei voti', scan: 'Scansiona per partecipare', guests: 'Ospiti', dj: 'DJ della serata', add: 'Aggiungi un brano per', search: 'Cerca un brano o artista…', add_btn: 'Aggiungi', vote_btn: 'Vota anche tu', voted_btn: 'Votato', recent: 'Appena suonato', description: 'Segui una festa UrDeejay e aggiungi brani per un ospite.' },
});
const GDJ_ACC = '110, 231, 240';
const GDJ_OK = '143, 227, 184', GDJ_WARN = '255, 214, 112', GDJ_BAD = '255, 143, 143';
const GDJ_ICON = 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z';
const GDJ_PLAY = 'M7 4l13 8-13 8z', GDJ_PAUSE = 'M6 5h4v14H6zM14 5h4v14h-4z', GDJ_SKIP = 'M5 5l10 7-10 7zM17 5h2v14h-2z';

const GDJ_CSS = GDJ.CSS + `
  .live { height: 34px; padding: 0 14px; border-radius: 17px; display: inline-flex; align-items: center; gap: 8px; font-size: 0.88rem; font-weight: 800; flex-shrink: 0;
    color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); background: rgba(var(--c), 0.15); border: 1px solid rgba(var(--c), 0.5); }
  .err { position: relative; padding: 12px 14px; border-radius: 16px; font-weight: 800; font-size: 0.92rem; color: color-mix(in srgb, rgb(${GDJ_BAD}), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); background: rgba(${GDJ_BAD}, 0.12); border: 1px solid rgba(${GDJ_BAD}, 0.45); }
  .now { position: relative; display: flex; align-items: center; gap: 18px; padding: 16px; border-radius: 24px; background: linear-gradient(120deg, rgba(var(--n), 0.2), rgba(var(--a), 0.06)); border: 1px solid rgba(var(--n), 0.45); transition: background 0.8s, border-color 0.8s; }
  .cov { flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-weight: 800; color: rgba(28, 23, 48, 0.75); background: linear-gradient(135deg, rgb(var(--n, var(--a))), rgba(var(--n, var(--a)), 0.45)) center / cover no-repeat; }
  .now .cov { width: 132px; height: 132px; border-radius: 22px; font-size: 3rem; box-shadow: 0 0 calc(var(--glow) * 2) rgba(var(--n), 0.55); }
  .nt { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
  .nt b { font-size: 1.5rem; font-weight: 800; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nt .ar { font-size: 1rem; font-weight: 700; opacity: 0.7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nt .by { font-size: 0.88rem; font-weight: 800; color: color-mix(in srgb, rgb(var(--a)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .trk { height: 8px; border-radius: 4px; margin-top: 6px; overflow: hidden; background: var(--glow-border, rgba(255,255,255,0.12)); }
  .bar { height: 100%; width: 0; border-radius: 4px; background: rgb(var(--a)); box-shadow: 0 0 10px rgba(var(--a), 0.8); }
  .now.off .bar { opacity: 0.45; }
  .tm { display: flex; justify-content: space-between; gap: 8px; font-size: 0.8rem; font-weight: 700; opacity: 0.6; }
  .ctl { display: flex; flex-direction: column; gap: 10px; }
  .pb { width: 58px; height: 58px; border-radius: 29px; border: none; display: flex; align-items: center; justify-content: center; color: #1C1730; background: rgb(var(--a)); box-shadow: 0 0 var(--glow) rgba(var(--a), 0.8); }
  .sk { width: 58px; height: 46px; border-radius: 23px; display: flex; align-items: center; justify-content: center; background: transparent; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .nx { position: relative; display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 18px; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px dashed rgba(var(--a), 0.45); min-width: 0; }
  .nx .lk { width: 30px; height: 30px; border-radius: 15px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: color-mix(in srgb, rgb(var(--a)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); background: rgba(var(--a), 0.15); }
  .nx .l { font-size: 0.92rem; font-weight: 800; opacity: 0.65; flex-shrink: 0; }
  .nx .x { flex: 1; min-width: 0; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nx .w { font-size: 0.88rem; font-weight: 700; opacity: 0.6; flex-shrink: 0; }
  .grid { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) 236px; gap: 16px; align-items: start; }
  .col { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
  .lh { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .lh span:last-child { font-size: 0.8rem; font-weight: 700; opacity: 0.5; }
  .row { display: flex; align-items: center; gap: 12px; padding: 8px 10px 8px 12px; border-radius: 18px; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); min-width: 0; }
  .row.top { background: rgba(var(--a), 0.1); border-color: rgba(var(--a), 0.45); }
  .rk { width: 20px; text-align: center; font-size: 0.92rem; font-weight: 800; opacity: 0.5; flex-shrink: 0; }
  .row.top .rk { opacity: 1; color: color-mix(in srgb, rgb(var(--a)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .row .cov { width: 44px; height: 44px; border-radius: 12px; font-size: 1.1rem; }
  .rt { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .rt b { font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .rt span { font-size: 0.8rem; font-weight: 700; opacity: 0.6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vt { height: 34px; min-width: 52px; padding: 0 10px; border-radius: 17px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 0.92rem; font-weight: 800; flex-shrink: 0; background: transparent; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .vt.on { background: rgb(var(--a)); border-color: rgba(var(--a), 0.7); color: #1C1730; box-shadow: 0 0 calc(var(--glow) * 0.6) rgba(var(--a), 0.6); }
  .vt:disabled { cursor: default; opacity: 0.6; }
  .rm { width: 34px; height: 34px; border-radius: 17px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; background: transparent; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); opacity: 0.6; }
  .qr { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px 12px 12px; border-radius: 22px; background: #fff; color: #24262B; box-shadow: 0 0 calc(var(--glow) * 1.5) rgba(var(--a), 0.5); text-align: center; }
  .qr svg { width: 168px; height: 168px; }
  .qr span { font-size: 0.8rem; font-weight: 700; opacity: 0.7; }
  .qr b { font-size: 1.5rem; font-weight: 800; letter-spacing: 0.18em; }
  .box { display: flex; flex-direction: column; gap: 10px; padding: 14px; border-radius: 20px; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .gs { display: flex; flex-wrap: wrap; gap: 6px; }
  .g { height: 28px; padding: 0 10px; border-radius: 14px; display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .g i { width: 7px; height: 7px; border-radius: 4px; background: rgb(${GDJ_OK}); }
  .g.idle { opacity: 0.55; } .g.idle i { background: rgba(150, 150, 160, 0.8); }
  .dj { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 20px; background: linear-gradient(120deg, rgba(${GDJ_WARN}, 0.2), rgba(${GDJ_WARN}, 0.04)); border: 1px solid rgba(${GDJ_WARN}, 0.45); }
  .dj em { font-style: normal; font-size: 1.6rem; } .dj div { display: flex; flex-direction: column; } .dj b { font-weight: 800; }
  .rc { display: flex; flex-direction: column; gap: 4px; font-size: 0.8rem; font-weight: 700; }
  .rc span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; opacity: 0.7; }
  .add { position: relative; display: flex; flex-direction: column; gap: 12px; padding: 16px; border-radius: 22px; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .as { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .as .chip { height: 32px; padding: 0 12px; --c: var(--a); }
  .sb { display: flex; align-items: center; gap: 10px; height: 52px; padding: 0 16px; border-radius: 26px; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid rgba(var(--a), 0.5); }
  .sb svg { opacity: 0.6; flex-shrink: 0; }
  .sb input { flex: 1; min-width: 0; border: none; outline: none; background: transparent; font: inherit; font-size: 1.05rem; font-weight: 700; color: inherit; }
  .res { display: flex; flex-direction: column; gap: 8px; }
  .ad { height: 36px; padding: 0 16px; border-radius: 18px; font-size: 0.88rem; font-weight: 800; border: none; flex-shrink: 0; color: #1C1730; background: rgb(var(--a)); box-shadow: 0 0 calc(var(--glow) * 0.7) rgba(var(--a), 0.6); }
  .ad:disabled { cursor: default; background: var(--glow-border, rgba(255,255,255,0.12)); color: inherit; box-shadow: none; opacity: 0.7; }
  .msg { font-size: 0.92rem; font-weight: 800; color: color-mix(in srgb, rgb(var(--m)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .hint { font-size: 0.88rem; font-weight: 700; opacity: 0.55; }
  @container (max-width: 620px) {
    .grid { grid-template-columns: minmax(0, 1fr); }
    .side { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 10px; align-items: start; }
    .side .qr { grid-row: span 3; padding: 10px; } .side .qr svg { width: 120px; height: 120px; } .side .qr b { font-size: 1.1rem; }
    .now { gap: 12px; padding: 12px; } .now .cov { width: 84px; height: 84px; border-radius: 16px; font-size: 2rem; }
    .nt b { font-size: 1.15rem; } .nt .ar { font-size: 0.88rem; } .pb { width: 48px; height: 48px; } .sk { width: 48px; height: 40px; }
    .row { gap: 8px; padding: 6px 8px; } .row .cov { width: 38px; height: 38px; } .rk { width: 14px; }
    .add { padding: 12px; } .nx .w { display: none; }
  }
`;

class GlowDeejayCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._st = null; this._err = null; this._q = ''; this._res = null; this._msg = null; }
  static getConfigElement() { return document.createElement('glow-deejay-card-editor'); }
  static getStubConfig() { return { url: 'https://urdeejay.drasticdesigns.be', key: '' }; }
  setConfig(config) {
    this._config = { glow: 15, qr: true, compact: false, ...(config || {}) };
    this._base = String(this._config.url || '').replace(/\/+$/, '');
    this._built = false;
    if (this.isConnected) this._start();
  }
  set hass(hass) { const first = !this._hass; this._hass = hass; if (first || !this._built) this._build(); }
  connectedCallback() { this._start(); this._vis = () => { if (!document.hidden) this._poll(); }; document.addEventListener('visibilitychange', this._vis); }
  disconnectedCallback() { clearTimeout(this._timer); clearInterval(this._tick); document.removeEventListener('visibilitychange', this._vis); this._running = false; }
  getCardSize() { return this._config && this._config.compact ? 4 : 10; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }
  _lang() { return GDJ.lang(this._hass, this._config.language, GDJ_T); }
  _t(k, v) { return GDJ.t(GDJ_T, this._lang(), k, v); }
  get _guest() { try { return localStorage.getItem('glow-deejay-guest') || ''; } catch (e) { return this._g || ''; } }
  set _guest(v) { this._g = v; try { localStorage.setItem('glow-deejay-guest', v); } catch (e) { /* geen opslag */ } }

  _start() {
    if (!this._config || this._running) return;
    this._running = true;
    this._build();
    this._poll();
    clearInterval(this._tick);
    this._tick = setInterval(() => this._progress(), 1000);
  }

  async _api(action, body) {
    const r = await fetch(this._base + '/api.php?a=' + action, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-UrDeejay-Key': String(this._config.key || '') }, body: JSON.stringify(body || {}), cache: 'no-store' });
    let js = null;
    try { js = await r.json(); } catch (e) { /* geen json */ }
    if (!r.ok) { const e = new Error((js && js.error) || 'HTTP ' + r.status); e.status = r.status; e.code = js && js.code; throw e; }
    return js;
  }

  // Elke paar seconden de toestand ophalen, trager als er geen feest bezig is of het tabblad verborgen is.
  async _poll() {
    clearTimeout(this._timer);
    if (!this._running) return;
    if (!this._base || !this._config.key) { this._err = this._t('e_config'); this._renderAll(); return; }
    if (!document.hidden) {
      try {
        const s = await this._api('host_state');
        this._st = s; this._err = s.connected === false ? this._t('e_spotify') : null;
        this._offset = (s.now || Date.now()) - Date.now();
      } catch (e) {
        this._err = e.status === 401 ? this._t('e_key') : e.status ? e.message : this._t('e_net');
      }
      this._renderAll();
    }
    const s = this._st;
    const busy = s && ((s.player && s.player.is_playing) || (s.guest_list && s.guest_list.length));
    const every = (parseFloat(this._config.poll) || 3) * 1000;
    this._timer = setTimeout(() => this._poll(), document.hidden ? 30000 : busy ? every : Math.max(every, 15000));
  }

  _build() {
    if (!this._config || !this._hass || this._built) return;
    this._built = true;
    const c = this._config;
    this.shadowRoot.innerHTML = `<style>${GDJ_CSS}</style><ha-card style="--a:${GDJ_ACC};--glow:${parseInt(c.glow, 10) || 0}px"><div class="halo"></div>
      <div class="head" id="head"></div><div id="err"></div><div id="now"></div><div id="next"></div>
      ${c.compact ? '' : '<div class="grid"><div class="col" id="list"></div><div class="col side" id="side"></div></div>'}
      <div class="add" id="add"><div class="as" id="as"></div>
        <div class="sb"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="q" type="search" autocomplete="off" enterkeyhint="search"></div>
        <div class="res" id="res"></div></div></ha-card>`;
    const root = this.shadowRoot;
    const q = root.getElementById('q');
    q.placeholder = this._t('search');
    q.addEventListener('input', () => { this._q = q.value; this._msg = null; clearTimeout(this._deb); this._deb = setTimeout(() => this._search(), 400); });
    q.addEventListener('keydown', (e) => { if (e.key === 'Enter') { clearTimeout(this._deb); this._search(); q.blur(); } });
    // één klikhandler voor alle knoppen
    root.querySelector('ha-card').addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]');
      if (!b || b.disabled) return;
      this._act(b.dataset.act, b.dataset.id, b.dataset.n);
    });
    this._renderAll();
  }

  async _act(act, id, n) {
    const msg = (text, col) => { this._msg = { text, col }; this._renderRes(); };
    try {
      if (act === 'guest') { this._guest = n; this._renderAdd(); this._renderList(); this._renderRes(); return; }
      if (act === 'pp') { const playing = this._st && this._st.player.is_playing; this._st.player.is_playing = !playing; this._renderNow(); await this._api('playback', { what: playing ? 'pause' : 'play' }); }
      if (act === 'skip') await this._api('playback', { what: 'skip' });
      if (act === 'rm') { this._st.list = this._st.list.filter((x) => x.id !== id); this._renderList(); await this._api('remove', { id }); }
      if (act === 'vote') { if (!this._guest) return msg(this._t('pick_guest'), GDJ_WARN); await this._api('ha_vote', { id, guest: this._guest }); }
      if (act === 'add') {
        if (!this._guest) return msg(this._t('pick_guest'), GDJ_WARN);
        const r = await this._api('ha_suggest', { id, guest: this._guest });
        this._q = ''; this._res = null; this.shadowRoot.getElementById('q').value = '';
        const t = this._lastRes && this._lastRes.find((x) => x.id === id);
        msg((t ? t.name + ' — ' : '') + (r.message || ''), GDJ_OK);
      }
    } catch (e) { msg(e.status === 401 ? this._t('e_key') : e.status ? e.message : this._t('e_net'), GDJ_BAD); }
    this._poll();
  }

  async _search() {
    const q = this._q.trim();
    if (q.length < 2) { this._res = null; this._renderRes(); return; }
    this._res = 'busy'; this._renderRes();
    try {
      const r = await this._api('ha_search', { q });
      if (q !== this._q.trim()) return;
      this._res = r.results || []; this._lastRes = this._res;
    } catch (e) { this._res = null; this._msg = { text: e.status ? e.message : this._t('e_net'), col: GDJ_BAD }; }
    this._renderRes();
  }

  _renderAll() {
    if (!this._built) return;
    this._renderHead(); this._renderNow(); this._renderList(); this._renderSide(); this._renderAdd(); this._renderRes();
  }

  _renderHead() {
    const s = this._st, E = GDJ.esc, root = this.shadowRoot;
    const p = s && s.player;
    const playing = p && p.is_playing && p.track;
    const col = playing ? GDJ_OK : p && p.track ? GDJ_WARN : '150, 150, 160';
    const sub = s ? this._t('sub', { g: (s.guest_list || []).length, l: (s.list || []).length, p: s.played_count || 0 }) : '';
    root.getElementById('head').outerHTML = `<div class="head" id="head"><span class="hi"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="${GDJ_ICON}"/></svg></span>
      <span class="ht"><b>${E(this._config.title || this._t('title'))}</b>${sub ? `<span>${E(sub)}</span>` : ''}</span>
      ${s ? `<span class="live" style="--c:${col}"><span class="dot"></span>${E(this._t(playing ? 'live' : p && p.track ? 'paused' : 'idle'))}</span>` : ''}</div>`;
    const errText = this._err || (s && s.error ? this._t('err_' + s.error) : '');
    root.getElementById('err').innerHTML = errText ? `<div class="err">${E(errText)}</div>` : '';
  }

  _cover(t, initial) {
    const E = GDJ.esc;
    return t && t.image ? ` style="background-image:url('${E(t.image)}')">` : `>${E(initial || '♪')}`;
  }

  _renderNow() {
    const s = this._st, E = GDJ.esc, root = this.shadowRoot;
    const nowEl = root.getElementById('now'), nextEl = root.getElementById('next');
    if (!s) { nowEl.innerHTML = ''; nextEl.innerHTML = ''; return; }
    const p = s.player, t = p.track;
    const fmt = (ms) => { const x = Math.max(0, Math.round(ms / 1000)); return Math.floor(x / 60) + ':' + String(x % 60).padStart(2, '0'); };
    if (!t) {
      nowEl.innerHTML = `<div class="now off" style="--n:${GDJ_ACC}"><span class="hint">${E(this._t('nothing'))}</span></div>`;
    } else {
      const who = t.by ? this._t('by', { n: t.by }) : p.fallback ? this._t('fallback', { n: p.fallback }) : (p.note || '');
      const skip = s.skip && s.skip.votes ? this._t('skip', { v: s.skip.votes, n: s.skip.needed }) : '';
      const col = this._coverCol(t.image) || GDJ_ACC;
      nowEl.innerHTML = `<div class="now${p.is_playing ? '' : ' off'}" style="--n:${col}"><span class="cov"${this._cover(t, t.name.charAt(0))}</span>
        <div class="nt"><span class="lab">${E(p.device ? this._t('now_on', { d: p.device }) : this._t('now_on_any'))}</span><b>${E(t.name)}</b><span class="ar">${E(t.artists)}</span>${who ? `<span class="by">${E(who)}</span>` : ''}
          <div class="trk"><div class="bar" id="bar"></div></div><div class="tm"><span id="pos"></span><span>${E(skip)}</span><span>${fmt(t.duration_ms)}</span></div></div>
        <div class="ctl"><button type="button" class="pb" data-act="pp" aria-label="${E(this._t(p.is_playing ? 'pause' : 'play'))}"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="${p.is_playing ? GDJ_PAUSE : GDJ_PLAY}"/></svg></button>
          <button type="button" class="sk" data-act="skip" aria-label="${E(this._t('skip_btn'))}"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="${GDJ_SKIP}"/></svg></button></div></div>`;
      this._progress();
    }
    const up = s.upcoming;
    const lock = '<span class="lk"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></span>';
    const top = up || (s.list && s.list[0]);
    nextEl.innerHTML = top ? `<div class="nx">${up ? lock : ''}<span class="l">${E(this._t('next'))}</span><span class="x">${E(top.name + ' — ' + top.artists)}</span>${top.by ? `<span class="w">${E(this._t('door', { n: top.by }))}</span>` : ''}</div>` : '';
  }

  // De kleur van de hoes: UrDeejay rekent ze zelf uit (cover_color); één keer per hoes opvragen.
  _coverCol(url) {
    if (!url) return null;
    this._cols = this._cols || {};
    if (url in this._cols) return this._cols[url];
    this._cols[url] = null;
    this._api('cover_color', { url }).then((r) => { if (r && r.rgb) { this._cols[url] = r.rgb.join(', '); this._renderNow(); } }).catch(() => {});
    return null;
  }

  _progress() {
    const s = this._st, bar = this.shadowRoot.getElementById('bar'), pos = this.shadowRoot.getElementById('pos');
    if (!s || !bar || !s.player.track) return;
    const p = s.player, dur = p.track.duration_ms || 1;
    let ms = p.progress_ms || 0;
    if (p.is_playing && p.fetched_at) ms += Date.now() + (this._offset || 0) - p.fetched_at;
    ms = Math.min(dur, Math.max(0, ms));
    bar.style.width = (100 * ms / dur).toFixed(1) + '%';
    const x = Math.round(ms / 1000);
    pos.textContent = Math.floor(x / 60) + ':' + String(x % 60).padStart(2, '0');
  }

  _renderList() {
    const el = this.shadowRoot.getElementById('list');
    if (!el) return;
    const s = this._st, E = GDJ.esc, me = this._guest;
    if (!s) { el.innerHTML = ''; return; }
    const rows = (s.list || []).map((t, i) => {
      const mine = me && (t.voters || []).some((v) => v.toLowerCase() === me.toLowerCase());
      return `<div class="row${i === 0 ? ' top' : ''}"><span class="rk">${i + 1}</span><span class="cov"${this._cover(t, t.name.charAt(0))}</span>
        <span class="rt"><b>${E(t.name)}</b><span>${E(t.artists + (t.by ? ' · ' + this._t('door', { n: t.by }) : ''))}</span></span>
        <button type="button" class="vt${mine ? ' on' : ''}" data-act="vote" data-id="${E(t.id)}" title="${E((t.voters || []).join(', '))}" aria-label="${E(this._t('vote_as', { n: me || '?' }))}"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 10H4z"/></svg>${t.votes}</button>
        <button type="button" class="rm" data-act="rm" data-id="${E(t.id)}" aria-label="${E(this._t('remove'))}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>`;
    }).join('');
    el.innerHTML = `<div class="lh"><span class="lab">${E(this._t('list'))} · ${(s.list || []).length}</span><span>${E(this._t('list_hint'))}</span></div>${rows || `<span class="hint">${E(this._t('empty'))}</span>`}`;
  }

  _renderSide() {
    const el = this.shadowRoot.getElementById('side');
    if (!el) return;
    const s = this._st, E = GDJ.esc;
    if (!s) { el.innerHTML = ''; return; }
    const gl = (s.guest_list || []).slice().sort((a, b) => (b.active - a.active) || a.name.localeCompare(b.name));
    const qr = this._config.qr === false ? '' : `<div class="qr">${this._qrSvg(s.join_url)}<span>${E(this._t('scan'))}</span><b>${E(s.code)}</b></div>`;
    const cur = s.player && s.player.track && s.player.track.id;
    const recent = (s.played_recent || []).filter((r) => r.id !== cur).slice(0, 3);
    el.innerHTML = `${qr}
      <div class="box"><span class="lab">${E(this._t('guests'))} · ${gl.length}</span>${gl.length ? `<div class="gs">${gl.map((g) => `<span class="g${g.active ? '' : ' idle'}"><i></i>${E(g.name)}</span>`).join('')}</div>` : `<span class="hint">${E(this._t('no_guests'))}</span>`}</div>
      ${s.dj ? `<div class="dj"><em>🏆</em><div><span class="lab">${E(this._t('dj'))}</span><b>${E(s.dj.name)} · ${E(this._t(s.dj.votes === 1 ? 'dj_vote' : 'dj_votes', { n: s.dj.votes }))}</b></div></div>` : ''}
      ${recent.length ? `<div class="box rc"><span class="lab">${E(this._t('recent'))}</span>${recent.map((r) => `<span>${E(r.name + ' — ' + r.artists)}</span>`).join('')}</div>` : ''}`;
  }

  // QR-code met de bibliotheek die UrDeejay zelf aanbiedt (assets/qrcode.js), één keer geladen.
  _qrSvg(text) {
    if (!text) return '';
    if (typeof window.qrcode !== 'function') {
      if (!GlowDeejayCard._qrLoading) {
        GlowDeejayCard._qrLoading = true;
        const sc = document.createElement('script');
        sc.src = this._base + '/assets/qrcode.js';
        sc.onload = () => this._renderSide();
        document.head.appendChild(sc);
      }
      return '<svg viewBox="0 0 29 29"><rect width="29" height="29" fill="#eee"/></svg>';
    }
    if (this._qrFor !== text) {
      const qr = window.qrcode(0, 'M'); qr.addData(text); qr.make();
      const n = qr.getModuleCount();
      let d = '';
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c + 2} ${r + 2}h1v1h-1z`;
      this._qrFor = text;
      this._qr = `<svg viewBox="0 0 ${n + 4} ${n + 4}" shape-rendering="crispEdges"><rect width="${n + 4}" height="${n + 4}" fill="#fff"/><path d="${d}" fill="#15121F"/></svg>`;
    }
    return this._qr;
  }

  _renderAdd() {
    const el = this.shadowRoot.getElementById('as');
    if (!el) return;
    const s = this._st, E = GDJ.esc;
    const gl = (s && s.guest_list) || [];
    if (this._guest && s && !gl.some((g) => g.name.toLowerCase() === this._guest.toLowerCase())) this._guest = '';
    if (!this._guest && gl.length === 1) this._guest = gl[0].name;
    el.innerHTML = gl.length ? `<span class="lab">${E(this._t('add'))}</span>${gl.map((g) => `<button type="button" class="chip${g.name === this._guest ? ' on' : ''}" data-act="guest" data-n="${E(g.name)}">${E(g.name)}</button>`).join('')}`
      : `<span class="hint">${E(this._t('need_guest'))}</span>`;
  }

  _renderRes() {
    const el = this.shadowRoot.getElementById('res');
    if (!el) return;
    const E = GDJ.esc, st = this._st;
    let html = '';
    if (this._res === 'busy') html = `<span class="hint">${E(this._t('searching'))}</span>`;
    else if (Array.isArray(this._res)) {
      html = this._res.length ? this._res.map((t) => {
        const inList = st && (st.list || []).find((x) => x.id === t.id);
        const mine = inList && this._guest && (inList.voters || []).some((v) => v.toLowerCase() === this._guest.toLowerCase());
        const label = t.blocked ? t.blocked : mine ? this._t('voted_btn') : inList || t.in_list ? this._t('vote_btn') : this._t('add_btn');
        return `<div class="row"><span class="cov"${this._cover(t, t.name.charAt(0))}</span><span class="rt"><b>${E(t.name)}</b><span>${E(t.artists)}</span></span>
          <button type="button" class="ad" data-act="add" data-id="${E(t.id)}"${t.blocked || mine ? ' disabled' : ''}>${E(label)}</button></div>`;
      }).join('') : `<span class="hint">${E(this._t('no_results'))}</span>`;
    }
    if (this._msg) html += `<span class="msg" style="--m:${this._msg.col}">${E(this._msg.text)}</span>`;
    el.innerHTML = html;
  }
}

GDJ.editor('glow-deejay-card-editor', GDJ_T, () => [
  { name: 'url', selector: { text: { type: 'url' } } },
  { name: 'key', selector: { text: { type: 'password' } } },
  { name: 'title', selector: { text: {} } },
  { name: 'qr', selector: { boolean: {} } },
  { name: 'compact', selector: { boolean: {} } },
], { qr: true, compact: false, glow: 15 });
GDJ.register('glow-deejay-card', 'Glow Deejay Card', GDJ_T, GlowDeejayCard);
