/*
 * Glow Batteries Card
 * Overzicht van de batterijen van al je toestellen: wat nu vervangen moet, wat binnenkort zwak wordt,
 * en welke toestellen niets meer melden (dan klopt het percentage ook niet meer).
 * Zoekt alle batterijsensoren vanzelf; telefoons en tablets komen in een eigen groep.
 */

const GBS_I18N = {
  nl: {
    title: 'Batterijen', all_ok: 'Alle batterijen in orde', n_empty: '{n} batterijen zijn (bijna) leeg', n_silent: '{n} toestellen melden niets meer', n_weak: '{n} batterijen worden zwak',
    and_silent: ' · {n} zonder contact',
    p_stale: '{n} geen contact', p_crit: '{n} vervangen', p_low: '{n} binnenkort', p_ok: '{n} in orde', p_phone: 'Telefoons',
    g_stale: 'Geen contact', g_crit: 'Nu vervangen', g_low: 'Binnenkort', g_ok: 'In orde', g_phone: 'Telefoons en tablets', devices: '{n} toestellen', device: '1 toestel',
    replace: 'batterij vervangen', charge: 'oplaadbaar, opladen', charge_chip: 'Opladen', silent: 'stil sinds {t} · laatst {p} %', silent_boot: 'stil sinds de herstart, {t} geleden · laatst {p} %',
    unreachable: 'niet bereikbaar', now: 'zonet', h: '{n} uur', d1: '1 dag', d: '{n} dagen', none: 'Geen batterijsensoren gevonden.',
    l_title: 'Titel', l_exclude: 'Niet tonen', l_phones: 'Telefoons en tablets tonen', l_critical: 'Vervangen vanaf (%)', l_low: 'Binnenkort vanaf (%)',
    l_stale_hours: 'Geen contact na (uur) voor sensoren', l_stale_hours_remote: 'Geen contact na (uur) voor afstandsbedieningen en schakelaars',
    l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Batterijen van al je toestellen: vervangen, binnenkort, en toestellen die niets meer melden.',
  },
  en: {
    title: 'Batteries', all_ok: 'All batteries are fine', n_empty: '{n} batteries are (almost) empty', n_silent: '{n} devices stopped reporting', n_weak: '{n} batteries are getting weak',
    and_silent: ' · {n} without contact',
    p_stale: '{n} no contact', p_crit: '{n} replace', p_low: '{n} soon', p_ok: '{n} fine', p_phone: 'Phones',
    g_stale: 'No contact', g_crit: 'Replace now', g_low: 'Soon', g_ok: 'Fine', g_phone: 'Phones and tablets', devices: '{n} devices', device: '1 device',
    replace: 'replace battery', charge: 'rechargeable, charge it', charge_chip: 'Charge', silent: 'silent for {t} · last {p} %', silent_boot: 'nothing since the restart ({t}) · last {p} %',
    unreachable: 'unreachable', now: 'just now', h: '{n} h', d1: '1 day', d: '{n} days', none: 'No battery sensors found.',
    l_title: 'Title', l_exclude: 'Hide', l_phones: 'Show phones and tablets', l_critical: 'Replace from (%)', l_low: 'Soon from (%)',
    l_stale_hours: 'No contact after (hours) for sensors', l_stale_hours_remote: 'No contact after (hours) for remotes and switches',
    l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Batteries of all your devices: replace, soon, and devices that stopped reporting.',
  },
  fr: {
    title: 'Piles', all_ok: 'Toutes les piles sont bonnes', n_empty: '{n} piles sont (presque) vides', n_silent: '{n} appareils ne répondent plus', n_weak: '{n} piles faiblissent',
    and_silent: ' · {n} sans contact',
    p_stale: '{n} sans contact', p_crit: '{n} à remplacer', p_low: '{n} bientôt', p_ok: '{n} bonnes', p_phone: 'Téléphones',
    g_stale: 'Sans contact', g_crit: 'À remplacer', g_low: 'Bientôt', g_ok: 'Bonnes', g_phone: 'Téléphones et tablettes', devices: '{n} appareils', device: '1 appareil',
    replace: 'remplacer la pile', charge: 'rechargeable, à recharger', charge_chip: 'Recharger', silent: 'silencieux depuis {t} · dernier {p} %', silent_boot: 'rien depuis le redémarrage ({t}) · dernier {p} %',
    unreachable: 'injoignable', now: 'à l\'instant', h: '{n} h', d1: '1 jour', d: '{n} jours', none: 'Aucun capteur de pile trouvé.',
    l_title: 'Titre', l_exclude: 'Masquer', l_phones: 'Afficher téléphones et tablettes', l_critical: 'Remplacer à partir de (%)', l_low: 'Bientôt à partir de (%)',
    l_stale_hours: 'Sans contact après (heures) pour les capteurs', l_stale_hours_remote: 'Sans contact après (heures) pour télécommandes et interrupteurs',
    l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Les piles de tous vos appareils : à remplacer, bientôt, et appareils muets.',
  },
  de: {
    title: 'Batterien', all_ok: 'Alle Batterien in Ordnung', n_empty: '{n} Batterien sind (fast) leer', n_silent: '{n} Geräte melden sich nicht mehr', n_weak: '{n} Batterien werden schwach',
    and_silent: ' · {n} ohne Kontakt',
    p_stale: '{n} ohne Kontakt', p_crit: '{n} wechseln', p_low: '{n} bald', p_ok: '{n} in Ordnung', p_phone: 'Telefone',
    g_stale: 'Kein Kontakt', g_crit: 'Jetzt wechseln', g_low: 'Bald', g_ok: 'In Ordnung', g_phone: 'Telefone und Tablets', devices: '{n} Geräte', device: '1 Gerät',
    replace: 'Batterie wechseln', charge: 'Akku, aufladen', charge_chip: 'Aufladen', silent: 'still seit {t} · zuletzt {p} %', silent_boot: 'nichts seit dem Neustart ({t}) · zuletzt {p} %',
    unreachable: 'nicht erreichbar', now: 'gerade eben', h: '{n} Std.', d1: '1 Tag', d: '{n} Tagen', none: 'Keine Batteriesensoren gefunden.',
    l_title: 'Titel', l_exclude: 'Ausblenden', l_phones: 'Telefone und Tablets zeigen', l_critical: 'Wechseln ab (%)', l_low: 'Bald ab (%)',
    l_stale_hours: 'Kein Kontakt nach (Stunden) für Sensoren', l_stale_hours_remote: 'Kein Kontakt nach (Stunden) für Fernbedienungen und Schalter',
    l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Batterien aller Geräte: wechseln, bald, und Geräte ohne Meldung.',
  },
  es: {
    title: 'Pilas', all_ok: 'Todas las pilas están bien', n_empty: '{n} pilas están (casi) vacías', n_silent: '{n} dispositivos ya no informan', n_weak: '{n} pilas se están agotando',
    and_silent: ' · {n} sin contacto',
    p_stale: '{n} sin contacto', p_crit: '{n} cambiar', p_low: '{n} pronto', p_ok: '{n} bien', p_phone: 'Teléfonos',
    g_stale: 'Sin contacto', g_crit: 'Cambiar ya', g_low: 'Pronto', g_ok: 'Bien', g_phone: 'Teléfonos y tabletas', devices: '{n} dispositivos', device: '1 dispositivo',
    replace: 'cambiar la pila', charge: 'recargable, cargar', charge_chip: 'Cargar', silent: 'en silencio desde hace {t} · último {p} %', silent_boot: 'nada desde el reinicio ({t}) · último {p} %',
    unreachable: 'no disponible', now: 'ahora', h: '{n} h', d1: '1 día', d: '{n} días', none: 'No se encontraron sensores de pila.',
    l_title: 'Título', l_exclude: 'Ocultar', l_phones: 'Mostrar teléfonos y tabletas', l_critical: 'Cambiar desde (%)', l_low: 'Pronto desde (%)',
    l_stale_hours: 'Sin contacto tras (horas) para sensores', l_stale_hours_remote: 'Sin contacto tras (horas) para mandos e interruptores',
    l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Pilas de todos tus dispositivos: cambiar, pronto, y dispositivos que ya no informan.',
  },
  it: {
    title: 'Batterie', all_ok: 'Tutte le batterie sono a posto', n_empty: '{n} batterie sono (quasi) scariche', n_silent: '{n} dispositivi non comunicano più', n_weak: '{n} batterie si stanno scaricando',
    and_silent: ' · {n} senza contatto',
    p_stale: '{n} senza contatto', p_crit: '{n} da cambiare', p_low: '{n} presto', p_ok: '{n} a posto', p_phone: 'Telefoni',
    g_stale: 'Senza contatto', g_crit: 'Da cambiare', g_low: 'Presto', g_ok: 'A posto', g_phone: 'Telefoni e tablet', devices: '{n} dispositivi', device: '1 dispositivo',
    replace: 'cambiare la batteria', charge: 'ricaricabile, ricaricare', charge_chip: 'Ricarica', silent: 'silenzioso da {t} · ultimo {p} %', silent_boot: 'niente dal riavvio ({t}) · ultimo {p} %',
    unreachable: 'non raggiungibile', now: 'ora', h: '{n} h', d1: '1 giorno', d: '{n} giorni', none: 'Nessun sensore di batteria trovato.',
    l_title: 'Titolo', l_exclude: 'Nascondi', l_phones: 'Mostra telefoni e tablet', l_critical: 'Cambiare da (%)', l_low: 'Presto da (%)',
    l_stale_hours: 'Senza contatto dopo (ore) per i sensori', l_stale_hours_remote: 'Senza contatto dopo (ore) per telecomandi e interruttori',
    l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Batterie di tutti i dispositivi: da cambiare, presto, e dispositivi silenziosi.',
  },
};
const GBS_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
function gbsLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GBS_I18N[l] ? l : 'en';
}
function gbsT(lang, key, vars) {
  let s = (GBS_I18N[lang] && GBS_I18N[lang][key]) ?? GBS_I18N.en[key] ?? key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gbsEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

// welke batterij erin zit, afgeleid uit het model (pas aan met `types`)
const GBS_TYPES = [
  [/fyrtur|kadrilj|tredansen|praktlysing|roller blind/i, 'charge'],
  [/hue motion|SML00/i, '2× AAA'],
  [/vallhorn/i, '3× AAA'],
  [/rodret/i, '1× AAA'],
  [/styrbar/i, '2× AAA'],
  [/tradfri motion|E1525|E1745/i, '2× CR2032'],
  [/hue dimmer switch gen ?1|RWL02[01]/i, 'CR2450'],
  [/hue dimmer|hue smart button|tap dial|RWL022|ROM001|RDM00/i, 'CR2032'],
  [/somrig|tradfri|open\/close remote|on\/off switch|shortcut button/i, 'CR2032'],
  [/door.*window|window.*door|contact sensor|MCCGQ/i, 'CR1632'],
  [/cube|MFKZQ/i, 'CR2450'],
  [/temperature|humidity|WSDCGQ/i, 'CR2032'],
  [/^motion sensor$|RTCGQ/i, 'CR2450'],
  [/wireless (mini )?switch|WXKG/i, 'CR2032'],
];
const GBS_PATHS = {
  motion: 'M12 4a2 2 0 1 0 0 .01M8 21l2-6 2 2v4M10 15l1-5 4 2 2 3M11 10l-3 1-1 3',
  door: 'M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M4 21h16M14 12h.01',
  remote: 'M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM12 8v4M10 10l2-2 2 2M10 15l2 2 2-2',
  blind: 'M4 4h16M5 4v10h14V4M12 14v3M11 19h2',
  cube: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  temp: 'M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z',
  phone: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2',
  sensor: 'M7 7h10v10H7zM12 3v4M12 17v4M3 12h4M17 12h4',
};
const GBS_C = { stale: '185, 168, 255', crit: '255, 143, 143', low: '255, 184, 153', ok: '143, 227, 184', phone: '142, 197, 255' };

const GBS_STYLE = `
  :host { display: block; }
  ha-card { position: relative; overflow: hidden; box-sizing: border-box; padding: 22px; border-radius: var(--ha-card-border-radius, 26px); display: flex; flex-direction: column; gap: 20px;
    background: var(--glow-card-background, #15121F); border: 1px solid var(--glow-card-border, rgba(255,255,255,0.08)); color: var(--glow-text, #F3F1FA); box-shadow: none; container-type: inline-size; user-select: none; -webkit-user-select: none; }
  button { font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .halo { position: absolute; left: -60px; top: -70px; width: 220px; height: 220px; border-radius: 50%; filter: blur(60px); opacity: 0.32; background: rgb(var(--w)); pointer-events: none; }
  .head { position: relative; display: flex; align-items: center; gap: 16px; }
  .hi { width: 56px; height: 56px; border-radius: 28px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgb(var(--w)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--w), 0.85); }
  .ht { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .ht b { font-size: 1.6rem; font-weight: 800; line-height: 1.1; }
  .ink { color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .ht span { font-size: 1rem; font-weight: 700; }
  .pills { position: relative; display: flex; gap: 10px; flex-wrap: wrap; }
  .pill { height: 42px; padding: 0 16px; border-radius: 21px; display: inline-flex; align-items: center; gap: 9px; font-size: 0.95rem; font-weight: 800;
    background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .pill.on { background: rgba(var(--c), 0.18); border-color: rgba(var(--c), 0.6); }
  .pill i { width: 10px; height: 10px; border-radius: 5px; background: rgb(var(--c)); box-shadow: 0 0 8px rgba(var(--c), 0.9); }
  .grp { position: relative; display: flex; flex-direction: column; gap: 10px; }
  .gh { display: flex; justify-content: space-between; align-items: baseline; }
  .gh b { font-size: 0.8rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .gh span { font-size: 0.85rem; font-weight: 800; }
  .rows { display: flex; flex-direction: column; gap: 8px; }
  .row { display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-radius: 20px; text-align: left; width: 100%; box-sizing: border-box;
    background: linear-gradient(rgba(var(--c), 0.13), rgba(var(--c), 0.13)), var(--glow-card-background, #1A1726); border: 1px solid rgba(var(--c), 0.5); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.28); }
  .ic { width: 44px; height: 44px; border-radius: 22px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(var(--c), 0.8); }
  .tx { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .tx b { font-size: 1.1rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tx span { font-size: 0.88rem; font-weight: 700; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .chip { flex-shrink: 0; height: 30px; padding: 0 12px; border-radius: 15px; display: inline-flex; align-items: center; font-size: 0.8rem; font-weight: 800;
    background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .cell { flex-shrink: 0; width: 46px; height: 22px; border-radius: 6px; border: 2px solid rgba(var(--c), 0.85); box-sizing: border-box; padding: 2px; }
  .cell i { display: block; height: 100%; border-radius: 3px; background: rgb(var(--c)); }
  .hatch { background: repeating-linear-gradient(135deg, rgba(var(--c), 0.75) 0 4px, transparent 4px 8px) !important; box-shadow: none !important; }
  .pct { flex-shrink: 0; min-width: 58px; text-align: right; font-size: 1.35rem; font-weight: 800; }
  .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
  .tile { display: flex; flex-direction: column; gap: 8px; padding: 11px 12px; border-radius: 16px; text-align: left; min-width: 0;
    background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .tt { display: flex; align-items: flex-start; gap: 8px; min-width: 0; min-height: 34px; }
  .tt b { flex: 1; min-width: 0; font-size: 0.88rem; font-weight: 800; line-height: 1.2; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .tt span { flex-shrink: 0; font-size: 0.88rem; font-weight: 800; }
  .bar { height: 6px; border-radius: 3px; background: var(--glow-surface, rgba(255,255,255,0.08)); overflow: hidden; }
  .bar i { display: block; height: 100%; border-radius: 3px; background: rgb(var(--c)); box-shadow: 0 0 6px rgba(var(--c), 0.7); }
  .msg { padding: 10px 0; font-weight: 700; opacity: 0.6; }
  @container (max-width: 560px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .chip { display: none; } }
  @container (max-width: 380px) { .grid { grid-template-columns: minmax(0, 1fr); } .cell { display: none; } }
`;

// last_reported zit niet in de live toestanden van de frontend; één keer per 5 minuten ophalen, gedeeld
const GBS_REP = { r: {}, boot: 0, at: 0, subs: new Set() };
function gbsFetch(hass) {
  if (!hass || !hass.callApi || Date.now() - GBS_REP.at < 300000) return;
  GBS_REP.at = Date.now();
  hass.callApi('GET', 'states').then((list) => {
    const r = {};
    let boot = Infinity;
    (list || []).forEach((s) => {
      const t = Date.parse(s.last_reported || s.last_updated || '');
      if (!isNaN(t)) { r[s.entity_id] = t; if (t < boot) boot = t; }
    });
    GBS_REP.r = r;
    GBS_REP.boot = isFinite(boot) ? boot : 0;
    GBS_REP.subs.forEach((f) => f());
  }).catch(() => { GBS_REP.at = Date.now() - 240000; });
}
const GBS_DEF = { glow: 15, critical: 10, low: 25, phones: true, stale_hours: 24, stale_hours_remote: 168 };

function gbsCollect(hass, c) {
  const h = hass;
  const st = h.states, ents = h.entities || {}, devs = h.devices || {}, areas = h.areas || {};
  const ex = new Set([].concat(c.exclude || []));
  const types = c.types || {};
  const byDev = {};
  Object.keys(ents).forEach((e) => { const d = ents[e].device_id; if (d) (byDev[d] = byDev[d] || []).push(e); });
  const ids = Array.isArray(c.entities) && c.entities.length ? c.entities.map((x) => (typeof x === 'string' ? x : x.entity))
    : Object.keys(st).filter((e) => e.startsWith('sensor.') && st[e].attributes.device_class === 'battery' && (st[e].attributes.unit_of_measurement || '%') === '%');
  const out = [];
  ids.forEach((id) => {
    if (ex.has(id) || !st[id]) return;
    const s = st[id];
    const reg = ents[id] || {};
    if (!c.entities && /battery_state_of_capacity|_soc$/.test(id)) return; // thuisbatterij heeft een eigen kaart
    const dev = reg.device_id ? devs[reg.device_id] : null;
    if (!c.entities && dev && /^(batteries|luna|powerwall)/i.test(dev.model || '')) return;
    const sib = (reg.device_id && byDev[reg.device_id]) || [id];
    const model = ((dev && dev.model) || '') + ' ' + ((dev && dev.name) || '');
    const phone = ['mobile_app', 'fully_kiosk'].includes(reg.platform);
    if (phone && c.phones === false) return;
    const dc = sib.map((x) => st[x] && st[x].attributes.device_class).filter(Boolean);
    const kind = phone ? 'phone'
      : sib.some((x) => x.startsWith('cover.')) ? 'blind'
      : /cube/i.test(model) ? 'cube'
      : dc.some((d) => d === 'motion' || d === 'occupancy') ? 'motion'
      : dc.some((d) => ['door', 'window', 'opening', 'garage_door'].includes(d)) ? 'door'
      : sib.some((x) => /_action$/.test(x) || x.startsWith('event.')) || /remote|switch|dimmer|button|rodret|somrig|styrbar/i.test(model) ? 'remote'
      : dc.includes('temperature') || dc.includes('humidity') ? 'temp' : 'sensor';
    const found = GBS_TYPES.find(([re]) => re.test(model));
    const type = types[id] || (found ? found[1] : '');
    // laatste melding: last_seen van Zigbee2MQTT als die er is, anders de jongste melding van een van zijn entiteiten
    let last = 0;
    const seen = sib.find((x) => /_last_seen$/.test(x) && st[x] && !isNaN(Date.parse(st[x].state)));
    if (seen) last = Date.parse(st[seen].state);
    else sib.forEach((x) => {
      const xs = st[x];
      if (!xs || ['unavailable', 'unknown'].includes(xs.state)) return;
      const t = GBS_REP.r[x] || Date.parse(xs.last_updated);
      if (t > last) last = t;
    });
    const unavailable = s.state === 'unavailable' || s.state === 'unknown';
    const p = unavailable ? NaN : Math.round(parseFloat(s.state));
    const remoteLike = kind === 'remote' || kind === 'cube';
    const limit = (remoteLike ? c.stale_hours_remote : c.stale_hours) * 3600000;
    const age = last ? Date.now() - last : Infinity;
    const stale = unavailable || age > limit;
    const areaId = reg.area_id || (dev && dev.area_id);
    let name = (dev && (dev.name_by_user || dev.name)) || s.attributes.friendly_name || id;
    if (!dev) name = String(name).replace(/\s*(batterij(niveau)?|battery( level)?|niveau de batterie|batterie(stand)?|bater[ií]a|batteria)\s*$/i, '');
    out.push({ id, name, area: (areaId && areas[areaId] && areas[areaId].name) || '', p, kind, type, last, age, unavailable, phone,
      l: stale || isNaN(p) ? 'stale' : p <= c.critical ? 'crit' : p <= c.low ? 'low' : 'ok' });
  });
  return out.sort((a, b) => (isNaN(a.p) ? -1 : a.p) - (isNaN(b.p) ? -1 : b.p) || a.name.localeCompare(b.name));
}

// voor de navigatiebalk: hoeveel toestellen nu aandacht vragen (vervangen of geen contact)
let GBS_ALERT = { at: 0, n: 0 };
window.glowBatteryAlerts = (hass, cfg) => {
  if (!hass) return 0;
  gbsFetch(hass);
  if (Date.now() - GBS_ALERT.at < 10000) return GBS_ALERT.n;
  const n = gbsCollect(hass, { ...GBS_DEF, ...(cfg || {}) }).filter((x) => !x.phone && (x.l === 'crit' || x.l === 'stale')).length;
  GBS_ALERT = { at: Date.now(), n };
  return n;
};

class GlowBatteriesCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._filter = 'all';
    this._onRep = () => { this._key = null; this._render(); };
  }
  static getConfigElement() { return document.createElement('glow-batteries-card-editor'); }
  static getStubConfig() { return {}; }
  setConfig(config) {
    this._config = { ...GBS_DEF, ...(config || {}) };
    this._key = null;
    if (this._hass) this._render();
  }
  set hass(hass) {
    this._hass = hass;
    gbsFetch(hass);
    this._render();
  }
  connectedCallback() {
    GBS_REP.subs.add(this._onRep);
    this._tick = setInterval(() => { gbsFetch(this._hass); this._key = null; this._render(); }, 60000);
  }
  disconnectedCallback() { GBS_REP.subs.delete(this._onRep); clearInterval(this._tick); }
  getCardSize() { return 10; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }
  _lang() { return gbsLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gbsT(this._lang(), k, v); }

  _collect() { return gbsCollect(this._hass, this._config); }

  _ago(ms) {
    const h = ms / 3600000;
    if (h < 1) return this._t('now');
    if (h < 24) return this._t('h', { n: Math.round(h) });
    const d = Math.round(h / 24);
    return d === 1 ? this._t('d1') : this._t('d', { n: d });
  }

  _render() {
    if (!this._hass || !this._config) return;
    const items = this._collect();
    const key = JSON.stringify([this._filter, this._lang(), items.map((x) => [x.id, x.p, x.l, Math.round(x.age / 3600000)])]);
    if (key === this._key) return;
    this._key = key;
    const c = this._config;
    const dev = items.filter((x) => !x.phone);
    const phones = items.filter((x) => x.phone);
    const n = { stale: 0, crit: 0, low: 0, ok: 0 };
    dev.forEach((x) => { n[x.l]++; });
    const f = this._filter;
    const worst = n.crit ? 'crit' : n.stale ? 'stale' : n.low ? 'low' : 'ok';
    const sub = n.crit ? this._t('n_empty', { n: n.crit }) + (n.stale ? this._t('and_silent', { n: n.stale }) : '')
      : n.stale ? this._t('n_silent', { n: n.stale }) : n.low ? this._t('n_weak', { n: n.low }) : this._t('all_ok');
    const cnt = (k) => (k === 1 ? this._t('device') : this._t('devices', { n: k }));
    const pct = (x) => (isNaN(x.p) ? '?' : x.p + ' %');

    const row = (x) => {
      const col = GBS_C[x.l];
      const stale = x.l === 'stale';
      const charge = x.type === 'charge';
      let meta;
      if (stale) {
        if (x.unavailable) meta = this._t('unreachable');
        else {
          const sinceBoot = GBS_REP.boot && x.last && x.last - GBS_REP.boot < 180000;
          meta = this._t(sinceBoot ? 'silent_boot' : 'silent', { t: this._ago(x.age), p: isNaN(x.p) ? '?' : x.p });
        }
      } else meta = charge ? this._t('charge') : this._t('replace');
      const typeTxt = charge ? this._t('charge_chip') : x.type;
      return `<button type="button" class="row" style="--c:${col}" data-id="${gbsEsc(x.id)}">
        <span class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${GBS_PATHS[x.kind] || GBS_PATHS.sensor}"/></svg></span>
        <span class="tx"><b>${gbsEsc(x.name)}</b><span class="ink">${gbsEsc((x.area ? x.area + ' · ' : '') + meta)}</span></span>
        ${typeTxt ? `<span class="chip">${gbsEsc(typeTxt)}</span>` : ''}
        <span class="cell"><i class="${stale ? 'hatch' : ''}" style="width:${stale ? 100 : Math.max(6, x.p)}%"></i></span>
        <span class="pct ink">${stale ? '?' : pct(x)}</span></button>`;
    };
    const tile = (x, phone) => {
      const stale = phone ? x.l === 'stale' : false;
      const col = stale ? GBS_C.stale : x.p <= c.critical ? GBS_C.crit : x.p <= c.low ? GBS_C.low : GBS_C.ok;
      return `<button type="button" class="tile" style="--c:${col}" data-id="${gbsEsc(x.id)}">
        <span class="tt"><b>${gbsEsc(x.name)}</b><span class="ink">${stale ? gbsEsc(x.unavailable ? '?' : this._ago(x.age)) : pct(x)}</span></span>
        <span class="bar"><i class="${stale ? 'hatch' : ''}" style="width:${Math.max(4, isNaN(x.p) ? 100 : x.p)}%"></i></span></button>`;
    };
    const grp = (k, title, list, big) => `<div class="grp"><div class="gh"><b>${gbsEsc(title)}</b><span class="ink" style="--c:${GBS_C[k]}">${gbsEsc(cnt(list.length))}</span></div>`
      + (big ? `<div class="rows">${list.map(row).join('')}</div>` : `<div class="grid">${list.map((x) => tile(x, k === 'phone')).join('')}</div>`) + '</div>';
    const show = (k) => f === 'all' || f === k;
    let body = '';
    ['stale', 'crit', 'low'].forEach((k) => { if (show(k) && n[k]) body += grp(k, this._t('g_' + k), dev.filter((x) => x.l === k), true); });
    if (show('ok') && n.ok) body += grp('ok', this._t('g_ok'), dev.filter((x) => x.l === 'ok'), false);
    if (phones.length && (f === 'all' || f === 'phone')) body += grp('phone', this._t('g_phone'), phones, false);
    if (!items.length) body = `<div class="msg">${gbsEsc(this._t('none'))}</div>`;
    const pill = (k, label) => `<button type="button" class="pill${f === k ? ' on ink' : ''}" style="--c:${GBS_C[k]}" data-f="${k}"><i></i>${gbsEsc(label)}</button>`;
    let pills = '';
    if (n.stale) pills += pill('stale', this._t('p_stale', { n: n.stale }));
    if (n.crit) pills += pill('crit', this._t('p_crit', { n: n.crit }));
    if (n.low) pills += pill('low', this._t('p_low', { n: n.low }));
    pills += pill('ok', this._t('p_ok', { n: n.ok }));
    if (phones.length) pills += pill('phone', this._t('p_phone'));

    this.shadowRoot.innerHTML = `<style>${GBS_STYLE}</style>
      <ha-card style="--w:${GBS_C[worst]};--glow:${parseInt(c.glow, 10) || 0}px">
        <div class="halo"></div>
        <div class="head"><span class="hi"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="17" height="10" rx="2.5"/><path d="M22 11v2"/><path d="M5.5 10.5v3"/></svg></span>
          <span class="ht"><b>${gbsEsc(c.title || this._t('title'))}</b><span class="ink" style="--c:${GBS_C[worst]}">${gbsEsc(sub)}</span></span></div>
        <div class="pills">${pills}</div>
        ${body}
      </ha-card>`;
    this.shadowRoot.querySelectorAll('[data-f]').forEach((b) => b.addEventListener('click', () => {
      this._filter = this._filter === b.dataset.f ? 'all' : b.dataset.f; this._key = null; this._render();
    }));
    this.shadowRoot.querySelectorAll('[data-id]').forEach((b) => b.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: b.dataset.id }, bubbles: true, composed: true }));
    }));
  }
}

class GlowBatteriesCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._render(); }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = gbsLang(this._hass, this._config.language);
    const t = (k) => gbsT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gbsT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        const def = { glow: 15, critical: 10, low: 25, phones: true, stale_hours: 24, stale_hours_remote: 168, language: 'auto' };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length) || def[k] === v[k]) delete v[k]; });
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      { name: 'title', selector: { text: {} } },
      { name: 'exclude', selector: { entity: { multiple: true, filter: { domain: 'sensor', device_class: 'battery' } } } },
      { name: 'phones', selector: { boolean: {} } },
      { type: 'grid', name: '', schema: [
        { name: 'critical', selector: { number: { min: 1, max: 50, step: 1, mode: 'box', unit_of_measurement: '%' } } },
        { name: 'low', selector: { number: { min: 5, max: 80, step: 1, mode: 'box', unit_of_measurement: '%' } } },
      ] },
      { type: 'grid', name: '', schema: [
        { name: 'stale_hours', selector: { number: { min: 1, max: 720, step: 1, mode: 'box', unit_of_measurement: 'h' } } },
        { name: 'stale_hours_remote', selector: { number: { min: 1, max: 2160, step: 1, mode: 'box', unit_of_measurement: 'h' } } },
      ] },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GBS_LANG_NAMES).map((k) => ({ value: k, label: GBS_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, critical: 10, low: 25, phones: true, stale_hours: 24, stale_hours_remote: 168, language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-batteries-card')) customElements.define('glow-batteries-card', GlowBatteriesCard);
if (!customElements.get('glow-batteries-card-editor')) customElements.define('glow-batteries-card-editor', GlowBatteriesCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-batteries-card')) {
  window.customCards.push({ type: 'glow-batteries-card', name: 'Glow Batteries Card', description: gbsT(gbsLang(null), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}
