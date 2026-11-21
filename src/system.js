/*
 * Glow System Card
 * Hoe gaat het met Home Assistant? Processor, geheugen en schijf als meters, daaronder
 * back-up, updates, internet, Zigbee, je schermen en de inkt van de printer. Vindt alles zelf.
 */
const GSY = window.GlowKit;
const GSY_T = GSY.table({
  nl: { title: 'Systeem', all_ok: 'Alles in orde', n_upd: '{n} updates klaar', one_upd: '1 update klaar', n_warn: '{n} aandachtspunten', one_warn: '1 aandachtspunt', cpu: 'Processor', mem: 'Geheugen', disk: 'Schijf', mem_sub: '{a} van {b} GB', disk_sub: '{f} GB vrij',
    ha: 'Home Assistant', ha_sub: 'Versie {v}', ha_boot: 'Versie {v} · draait sinds {d}', online: 'Online', offline: 'Offline', backup: 'Back-up', bk_sub: 'Laatst {a} · volgende {n}', bk_old: 'Laatste back-up is {a}', ok: 'OK', old: 'Te oud', updates: 'Updates', no_upd: 'Alles is bijgewerkt', upd_n: '{n} klaar', none: 'Geen',
    internet: 'Internet', net_sub: '↓ {d} · ↑ {u}', up_days: '{n} dagen online', zigbee: 'Zigbee', connected: 'Verbonden', disconnected: 'Niet verbonden', devices: 'Schermen en toestellen', charging: 'laadt', printer: 'Printer', ink_low: 'Inkt bijna op', today: 'vandaag', tomorrow: 'morgen',
    l_cpu: 'Processor (%)', l_memory: 'Geheugen (%)', l_disk: 'Schijf (%)', l_internet: 'Internet (verbonden)', l_download: 'Downloadsnelheid', l_upload: 'Uploadsnelheid', l_zigbee: 'Zigbee (verbonden)', l_devices: 'Toestellen met batterij', l_inks: 'Inktsensoren', l_printer_name: 'Naam printer', description: 'Home Assistant, back-up, updates, internet, Zigbee, schermen en printer.' },
  en: { title: 'System', all_ok: 'All good', n_upd: '{n} updates ready', one_upd: '1 update ready', n_warn: '{n} things to check', one_warn: '1 thing to check', cpu: 'Processor', mem: 'Memory', disk: 'Disk', mem_sub: '{a} of {b} GB', disk_sub: '{f} GB free',
    ha: 'Home Assistant', ha_sub: 'Version {v}', ha_boot: 'Version {v} · running since {d}', online: 'Online', offline: 'Offline', backup: 'Backup', bk_sub: 'Last {a} · next {n}', bk_old: 'Last backup was {a}', ok: 'OK', old: 'Too old', updates: 'Updates', no_upd: 'Everything is up to date', upd_n: '{n} ready', none: 'None',
    internet: 'Internet', net_sub: '↓ {d} · ↑ {u}', up_days: 'online for {n} days', zigbee: 'Zigbee', connected: 'Connected', disconnected: 'Disconnected', devices: 'Screens and devices', charging: 'charging', printer: 'Printer', ink_low: 'Ink running low', today: 'today', tomorrow: 'tomorrow',
    l_cpu: 'Processor (%)', l_memory: 'Memory (%)', l_disk: 'Disk (%)', l_internet: 'Internet (connected)', l_download: 'Download speed', l_upload: 'Upload speed', l_zigbee: 'Zigbee (connected)', l_devices: 'Devices with a battery', l_inks: 'Ink sensors', l_printer_name: 'Printer name', description: 'Home Assistant, backup, updates, internet, Zigbee, screens and printer.' },
  fr: { title: 'Système', all_ok: 'Tout va bien', n_upd: '{n} mises à jour prêtes', one_upd: '1 mise à jour prête', n_warn: '{n} points d’attention', one_warn: '1 point d’attention', cpu: 'Processeur', mem: 'Mémoire', disk: 'Disque', mem_sub: '{a} sur {b} Go', disk_sub: '{f} Go libres',
    ha: 'Home Assistant', ha_sub: 'Version {v}', ha_boot: 'Version {v} · actif depuis {d}', online: 'En ligne', offline: 'Hors ligne', backup: 'Sauvegarde', bk_sub: 'Dernière {a} · prochaine {n}', bk_old: 'Dernière sauvegarde {a}', ok: 'OK', old: 'Trop ancienne', updates: 'Mises à jour', no_upd: 'Tout est à jour', upd_n: '{n} prêtes', none: 'Aucune',
    internet: 'Internet', net_sub: '↓ {d} · ↑ {u}', up_days: 'en ligne depuis {n} jours', zigbee: 'Zigbee', connected: 'Connecté', disconnected: 'Déconnecté', devices: 'Écrans et appareils', charging: 'en charge', printer: 'Imprimante', ink_low: 'Encre presque vide', today: "aujourd'hui", tomorrow: 'demain',
    l_cpu: 'Processeur (%)', l_memory: 'Mémoire (%)', l_disk: 'Disque (%)', l_internet: 'Internet (connecté)', l_download: 'Débit descendant', l_upload: 'Débit montant', l_zigbee: 'Zigbee (connecté)', l_devices: 'Appareils avec batterie', l_inks: "Capteurs d'encre", l_printer_name: "Nom de l'imprimante", description: 'Home Assistant, sauvegarde, mises à jour, internet, Zigbee, écrans et imprimante.' },
  de: { title: 'System', all_ok: 'Alles in Ordnung', n_upd: '{n} Updates bereit', one_upd: '1 Update bereit', n_warn: '{n} Hinweise', one_warn: '1 Hinweis', cpu: 'Prozessor', mem: 'Speicher', disk: 'Festplatte', mem_sub: '{a} von {b} GB', disk_sub: '{f} GB frei',
    ha: 'Home Assistant', ha_sub: 'Version {v}', ha_boot: 'Version {v} · läuft seit {d}', online: 'Online', offline: 'Offline', backup: 'Backup', bk_sub: 'Zuletzt {a} · nächstes {n}', bk_old: 'Letztes Backup {a}', ok: 'OK', old: 'Zu alt', updates: 'Updates', no_upd: 'Alles aktuell', upd_n: '{n} bereit', none: 'Keine',
    internet: 'Internet', net_sub: '↓ {d} · ↑ {u}', up_days: 'seit {n} Tagen online', zigbee: 'Zigbee', connected: 'Verbunden', disconnected: 'Getrennt', devices: 'Bildschirme und Geräte', charging: 'lädt', printer: 'Drucker', ink_low: 'Tinte fast leer', today: 'heute', tomorrow: 'morgen',
    l_cpu: 'Prozessor (%)', l_memory: 'Speicher (%)', l_disk: 'Festplatte (%)', l_internet: 'Internet (verbunden)', l_download: 'Download', l_upload: 'Upload', l_zigbee: 'Zigbee (verbunden)', l_devices: 'Geräte mit Akku', l_inks: 'Tintensensoren', l_printer_name: 'Druckername', description: 'Home Assistant, Backup, Updates, Internet, Zigbee, Bildschirme und Drucker.' },
  es: { title: 'Sistema', all_ok: 'Todo bien', n_upd: '{n} actualizaciones listas', one_upd: '1 actualización lista', n_warn: '{n} avisos', one_warn: '1 aviso', cpu: 'Procesador', mem: 'Memoria', disk: 'Disco', mem_sub: '{a} de {b} GB', disk_sub: '{f} GB libres',
    ha: 'Home Assistant', ha_sub: 'Versión {v}', ha_boot: 'Versión {v} · activo desde {d}', online: 'En línea', offline: 'Sin conexión', backup: 'Copia de seguridad', bk_sub: 'Última {a} · próxima {n}', bk_old: 'Última copia {a}', ok: 'OK', old: 'Demasiado antigua', updates: 'Actualizaciones', no_upd: 'Todo actualizado', upd_n: '{n} listas', none: 'Ninguna',
    internet: 'Internet', net_sub: '↓ {d} · ↑ {u}', up_days: 'en línea hace {n} días', zigbee: 'Zigbee', connected: 'Conectado', disconnected: 'Desconectado', devices: 'Pantallas y dispositivos', charging: 'cargando', printer: 'Impresora', ink_low: 'Queda poca tinta', today: 'hoy', tomorrow: 'mañana',
    l_cpu: 'Procesador (%)', l_memory: 'Memoria (%)', l_disk: 'Disco (%)', l_internet: 'Internet (conectado)', l_download: 'Velocidad de bajada', l_upload: 'Velocidad de subida', l_zigbee: 'Zigbee (conectado)', l_devices: 'Dispositivos con batería', l_inks: 'Sensores de tinta', l_printer_name: 'Nombre de la impresora', description: 'Home Assistant, copias, actualizaciones, internet, Zigbee, pantallas e impresora.' },
  it: { title: 'Sistema', all_ok: 'Tutto ok', n_upd: '{n} aggiornamenti pronti', one_upd: '1 aggiornamento pronto', n_warn: '{n} avvisi', one_warn: '1 avviso', cpu: 'Processore', mem: 'Memoria', disk: 'Disco', mem_sub: '{a} di {b} GB', disk_sub: '{f} GB liberi',
    ha: 'Home Assistant', ha_sub: 'Versione {v}', ha_boot: 'Versione {v} · attivo dal {d}', online: 'Online', offline: 'Offline', backup: 'Backup', bk_sub: 'Ultimo {a} · prossimo {n}', bk_old: 'Ultimo backup {a}', ok: 'OK', old: 'Troppo vecchio', updates: 'Aggiornamenti', no_upd: 'Tutto aggiornato', upd_n: '{n} pronti', none: 'Nessuno',
    internet: 'Internet', net_sub: '↓ {d} · ↑ {u}', up_days: 'online da {n} giorni', zigbee: 'Zigbee', connected: 'Connesso', disconnected: 'Disconnesso', devices: 'Schermi e dispositivi', charging: 'in carica', printer: 'Stampante', ink_low: 'Inchiostro quasi finito', today: 'oggi', tomorrow: 'domani',
    l_cpu: 'Processore (%)', l_memory: 'Memoria (%)', l_disk: 'Disco (%)', l_internet: 'Internet (connesso)', l_download: 'Velocità download', l_upload: 'Velocità upload', l_zigbee: 'Zigbee (connesso)', l_devices: 'Dispositivi con batteria', l_inks: 'Sensori inchiostro', l_printer_name: 'Nome stampante', description: 'Home Assistant, backup, aggiornamenti, internet, Zigbee, schermi e stampante.' },
});
const GSY_OK = '143, 227, 184', GSY_WARN = '255, 214, 112', GSY_BAD = '255, 143, 143', GSY_INFO = '142, 197, 255';
const GSY_P = { ha: 'M3 11l9-7 9 7v9H3z', backup: 'M12 3v12M7 10l5 5 5-5M4 19h16', upd: 'M21 12a9 9 0 1 1-3-6.7M21 4v5h-5', net: 'M2 9a15 15 0 0 1 20 0M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M12 20h.01', zig: 'M4 6h16L4 18h16', dev: 'M6 3h12v18H6zM11 18h2', printer: 'M6 9V3h12v6M6 18H4v-7h16v7h-2M7 14h10v7H7z' };
const gsyInk = (id) => (/black|zwart|_bk|_k\b/i.test(id) ? '90, 90, 105' : /cyan/i.test(id) ? '80, 200, 230' : /magenta/i.test(id) ? '230, 90, 170' : /yellow|geel/i.test(id) ? '245, 215, 70' : '201, 196, 221');

const GSY_CSS = GSY.CSS + `
  .gs { position: relative; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  .g { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 14px 8px; border-radius: 20px; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); text-align: center; }
  .g svg { width: 120px; max-width: 100%; height: 72px; }
  .g .tk { stroke: var(--glow-border, rgba(255,255,255,0.12)); }
  .g .vl { stroke: rgb(var(--c)); filter: drop-shadow(0 0 4px rgba(var(--c), 0.6)); }
  .g b { font-size: 1.5rem; font-weight: 800; margin-top: -26px; }
  .g .n { font-size: 0.8rem; font-weight: 800; opacity: 0.65; }
  .g .s { font-size: 0.75rem; font-weight: 700; opacity: 0.5; }
  .rows { position: relative; display: flex; flex-direction: column; gap: 8px; }
  .r { display: flex; align-items: center; gap: 14px; padding: 12px 14px; border-radius: 18px; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); text-align: left; width: 100%; box-sizing: border-box; }
  .r .ic { width: 40px; height: 40px; border-radius: 20px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: #1C1730; background: rgb(var(--c)); box-shadow: 0 0 calc(var(--glow) * 0.7) rgba(var(--c), 0.6); }
  .r .tx { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
  .r .tx b { font-size: 1rem; font-weight: 800; }
  .r .tx span { font-size: 0.8rem; font-weight: 700; opacity: 0.65; }
  .r .bd { flex-shrink: 0; height: 30px; padding: 0 12px; border-radius: 15px; display: inline-flex; align-items: center; font-size: 0.8rem; font-weight: 800; background: rgba(var(--c), 0.15); border: 1px solid rgba(var(--c), 0.5); color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .inkb { position: relative; display: flex; flex-direction: column; gap: 10px; padding: 14px; border-radius: 18px; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .tanks { display: flex; gap: 14px; }
  .tk2 { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .tank { position: relative; width: 100%; max-width: 64px; height: 46px; border-radius: 10px; overflow: hidden; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .tank i { position: absolute; left: 0; right: 0; bottom: 0; background: rgb(var(--c)); }
  .tank.low { border-color: rgb(${GSY_BAD}); }
  .tk2 span { font-size: 0.75rem; font-weight: 800; opacity: 0.75; }
  @container (max-width: 520px) { .gs { gap: 6px; } .g { padding: 10px 4px; } .g svg { height: 56px; } .g b { font-size: 1.15rem; margin-top: -20px; } .g .s { display: none; } .r .ic { width: 34px; height: 34px; } }
`;

class GlowSystemCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  static getConfigElement() { return document.createElement('glow-system-card-editor'); }
  static getStubConfig() { return {}; }
  setConfig(config) { this._config = { glow: 15, ...(config || {}) }; this._key = null; if (this._hass) this._render(); }
  set hass(hass) { this._hass = hass; if (this._config) this._render(); }
  getCardSize() { return 8; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }
  _lang() { return GSY.lang(this._hass, this._config.language, GSY_T); }
  _t(k, v) { return GSY.t(GSY_T, this._lang(), k, v); }
  _find(key, re) { const c = this._config[key]; if (c) return c; return Object.keys(this._hass.states).find((e) => re.test(e)); }

  _render() {
    if (!this._hass || !this._config) return;
    const c = this._config, h = this._hass, st = h.states, l = this._lang(), E = GSY.esc;
    const ids = {
      cpu: this._find('cpu', /^sensor\.system_monitor_processor_use$/), mem: this._find('memory', /^sensor\.system_monitor_memory_use_percent$/), disk: this._find('disk', /^sensor\.system_monitor_disk_use_percent$/),
      memUse: 'sensor.system_monitor_memory_use', memFree: 'sensor.system_monitor_memory_free', diskFree: 'sensor.system_monitor_disk_free', boot: 'sensor.system_monitor_last_boot',
      bkLast: 'sensor.backup_last_successful_automatic_backup', bkNext: 'sensor.backup_next_scheduled_automatic_backup',
      net: this._find('internet', /^binary_sensor\..*(wan_status|internet|wan)(_|$)/), down: this._find('download', /^sensor\..*(downloadsnelheid|download_speed|download)$/), up: this._find('upload', /^sensor\..*(uploadsnelheid|upload_speed|upload)$/),
      zig: this._find('zigbee', /^binary_sensor\.zigbee2mqtt_bridge_connection_state$/),
    };
    const inks = [].concat(c.inks || []).length ? [].concat(c.inks) : Object.keys(st).filter((e) => /^sensor\..*_ink$/.test(e)).sort((a, b) => ['black', 'cyan', 'magenta', 'yellow'].findIndex((x) => a.includes(x)) - ['black', 'cyan', 'magenta', 'yellow'].findIndex((x) => b.includes(x)));
    const devs = [].concat(c.devices || []).map((d) => (typeof d === 'string' ? { entity: d } : d));
    const upd = Object.keys(st).filter((e) => e.startsWith('update.') && st[e].state === 'on');
    const key = JSON.stringify([Object.values(ids).map((e) => e && st[e] && st[e].state), inks.map((e) => st[e] && st[e].state), devs.map((d) => st[d.entity] && st[d.entity].state), upd, l, c, h.config && h.config.version]);
    if (key === this._key) return;
    this._key = key;
    const n = (e) => GSY.num(h, e);
    const when = (iso) => {
      if (!iso || isNaN(new Date(iso))) return '–';
      const d = new Date(iso), now = new Date();
      const t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const diff = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - t0) / 864e5);
      const tm = GSY.hm(d);
      if (diff === 0) return this._t('today') + ' ' + tm;
      if (diff === 1) return this._t('tomorrow') + ' ' + tm;
      return new Intl.DateTimeFormat(l, { day: 'numeric', month: 'short' }).format(d) + ' ' + tm;
    };
    let warns = 0;
    // meters
    const gauge = (name, v, sub) => {
      if (v === null) return '';
      const col = v > 85 ? GSY_BAD : v > 70 ? GSY_WARN : GSY_OK;
      if (v > 85) warns++;
      return `<div class="g" style="--c:${col}"><svg viewBox="0 0 100 60"><path class="tk" d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke-width="9" stroke-linecap="round"/><path class="vl" d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke-width="9" stroke-linecap="round" pathLength="100" stroke-dasharray="${Math.max(0.5, Math.min(100, v))} 100"/></svg><b>${Math.round(v)} %</b><span class="n">${E(name)}</span><span class="s">${E(sub || '')}</span></div>`;
    };
    const mu = n(ids.memUse), mf = n(ids.memFree), df = n(ids.diskFree);
    const gauges = [gauge(this._t('cpu'), n(ids.cpu), ''), gauge(this._t('mem'), n(ids.mem), mu !== null && mf !== null ? this._t('mem_sub', { a: GSY.fmt(l, mu / 1024, 1), b: GSY.fmt(l, (mu + mf) / 1024, 1) }) : ''), gauge(this._t('disk'), n(ids.disk), df !== null ? this._t('disk_sub', { f: GSY.fmt(l, df, 0) }) : '')].join('');
    // rijen
    const row = (p, name, sub, badge, col, act) => `<button type="button" class="r" style="--c:${col}" ${act}><span class="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="${p}"/></svg></span><span class="tx"><b>${E(name)}</b><span>${E(sub)}</span></span><span class="bd">${E(badge)}</span></button>`;
    const rows = [];
    const ver = (h.config && h.config.version) || '';
    const boot = st[ids.boot] ? new Intl.DateTimeFormat(l, { day: 'numeric', month: 'long' }).format(new Date(st[ids.boot].state)) : null;
    rows.push(row(GSY_P.ha, this._t('ha'), boot ? this._t('ha_boot', { v: ver, d: boot }) : this._t('ha_sub', { v: ver }), this._t('online'), GSY_OK, 'data-nav="/config/system"'));
    if (st[ids.bkLast]) {
      const last = st[ids.bkLast].state;
      const old = !last || isNaN(new Date(last)) || Date.now() - new Date(last).getTime() > 2 * 864e5;
      if (old) warns++;
      rows.push(row(GSY_P.backup, this._t('backup'), old ? this._t('bk_old', { a: when(last) }) : this._t('bk_sub', { a: when(last), n: st[ids.bkNext] ? when(st[ids.bkNext].state) : '–' }), old ? this._t('old') : this._t('ok'), old ? GSY_BAD : GSY_OK, 'data-nav="/config/backup"'));
    }
    const updNames = upd.map((e) => (st[e].attributes.title || st[e].attributes.friendly_name || e).replace(/\s*(update|firmware)$/i, ''));
    rows.push(row(GSY_P.upd, this._t('updates'), upd.length ? updNames.slice(0, 4).join(', ') + (upd.length > 4 ? ' …' : '') : this._t('no_upd'), upd.length ? this._t('upd_n', { n: upd.length }) : this._t('none'), upd.length ? GSY_INFO : GSY_OK, 'data-nav="/config/updates"'));
    if (ids.net && st[ids.net]) {
      const on = st[ids.net].state === 'on';
      if (!on) warns++;
      const sp = (e) => { const v = n(e); if (v === null) return '–'; const u = (st[e].attributes.unit_of_measurement || '').toLowerCase(); const mbit = u.includes('kbit') ? v / 1000 : u.includes('byte') || u === 'mb/s' ? v * 8 : v; return GSY.fmt(l, mbit, mbit < 10 ? 1 : 0) + ' Mbit/s'; };
      const upS = Object.keys(st).find((e) => e.startsWith(ids.net.replace('binary_sensor.', 'sensor.').replace(/_wan_status$/, '')) && /uptime$/.test(e));
      let upTxt = '';
      if (upS && n(upS) !== null) { const u = (st[upS].attributes.unit_of_measurement || 'h').toLowerCase(); const hrs = u.startsWith('d') ? n(upS) * 24 : u.startsWith('min') ? n(upS) / 60 : u === 's' ? n(upS) / 3600 : n(upS); if (hrs >= 24) upTxt = ' · ' + this._t('up_days', { n: Math.floor(hrs / 24) }); }
      rows.push(row(GSY_P.net, this._t('internet'), (ids.down || ids.up ? this._t('net_sub', { d: sp(ids.down), u: sp(ids.up) }) : GSY.name(h, ids.net)) + upTxt, on ? this._t('online') : this._t('offline'), on ? GSY_OK : GSY_BAD, `data-more="${E(ids.net)}"`));
    }
    if (ids.zig && st[ids.zig]) {
      const on = st[ids.zig].state === 'on';
      if (!on) warns++;
      rows.push(row(GSY_P.zig, this._t('zigbee'), GSY.name(h, ids.zig).replace(/\s*connection state$/i, ''), on ? this._t('connected') : this._t('disconnected'), on ? GSY_OK : GSY_BAD, `data-more="${E(ids.zig)}"`));
    }
    if (devs.length) {
      let low = 100;
      const parts = devs.map((d) => {
        const v = n(d.entity); if (v === null) return null;
        const chg = d.charging ? st[d.charging] && st[d.charging].state === 'on' : false;
        if (!chg) low = Math.min(low, v);
        return (d.name || GSY.name(h, d.entity).replace(/\s*(batterij|battery|batterijniveau|battery level)$/i, '')) + ' ' + Math.round(v) + ' %' + (chg ? ' (' + this._t('charging') + ')' : '');
      }).filter(Boolean);
      if (low < 20) warns++;
      rows.push(row(GSY_P.dev, this._t('devices'), parts.join(' · '), low === 100 ? '100 %' : Math.round(low) + ' %', low < 20 ? GSY_BAD : low < 40 ? GSY_WARN : GSY_OK, devs[0] ? `data-more="${E(devs[0].entity)}"` : ''));
    }
    let ink = '';
    if (inks.length) {
      const vals = inks.map((e) => ({ e, v: n(e) })).filter((x) => x.v !== null);
      const lowInk = vals.some((x) => x.v < 15);
      if (lowInk) warns++;
      const pn = c.printer_name || (GSY.name(h, inks[0]).replace(/\s*(black|zwart|cyan|magenta|yellow|geel)?\s*(ink|inkt)$/i, '').trim()) || this._t('printer');
      ink = `<div class="inkb"><span class="lab">${E(this._t('printer'))} · ${E(pn)}${lowInk ? ' · ' + E(this._t('ink_low')) : ''}</span><div class="tanks">${vals.map((x) => `<div class="tk2"><div class="tank${x.v < 15 ? ' low' : ''}" style="--c:${gsyInk(x.e)}"><i style="height:${Math.max(0, Math.min(100, x.v))}%"></i></div><span>${E(({ black: 'K', cyan: 'C', magenta: 'M', yellow: 'Y' })[((x.e.match(/(black|cyan|magenta|yellow)/i) || ['', ''])[1]).toLowerCase()] || '•')} ${Math.round(x.v)}%</span></div>`).join('')}</div></div>`;
    }
    const sub = warns ? (warns === 1 ? this._t('one_warn') : this._t('n_warn', { n: warns })) : this._t('all_ok') + (upd.length ? ' · ' + (upd.length === 1 ? this._t('one_upd') : this._t('n_upd', { n: upd.length })) : '');
    const acc = warns ? GSY_WARN : GSY_OK;
    this.shadowRoot.innerHTML = `<style>${GSY_CSS}</style><ha-card style="--a:${acc};--glow:${parseInt(c.glow, 10) || 0}px"><div class="halo"></div>
      ${GSY.head('M4 5h16v10H4zM8 19h8M12 15v4', c.title || this._t('title'), sub)}
      ${gauges ? `<div class="gs">${gauges}</div>` : ''}<div class="rows">${rows.join('')}</div>${ink}</ha-card>`;
    this.shadowRoot.querySelectorAll('[data-nav]').forEach((b) => b.addEventListener('click', () => GSY.navigate(b.dataset.nav)));
    this.shadowRoot.querySelectorAll('[data-more]').forEach((b) => b.addEventListener('click', () => GSY.moreInfo(this, b.dataset.more)));
  }
}

GSY.editor('glow-system-card-editor', GSY_T, () => [
  { name: 'title', selector: { text: {} } },
  { name: 'devices', selector: { entity: { multiple: true, domain: 'sensor', device_class: 'battery' } } },
  { name: 'inks', selector: { entity: { multiple: true, domain: 'sensor' } } },
  { name: 'printer_name', selector: { text: {} } },
  { type: 'grid', name: '', schema: [
    { name: 'cpu', selector: { entity: { domain: 'sensor' } } },
    { name: 'memory', selector: { entity: { domain: 'sensor' } } },
    { name: 'disk', selector: { entity: { domain: 'sensor' } } },
    { name: 'internet', selector: { entity: { domain: 'binary_sensor' } } },
    { name: 'download', selector: { entity: { domain: 'sensor' } } },
    { name: 'upload', selector: { entity: { domain: 'sensor' } } },
    { name: 'zigbee', selector: { entity: { domain: 'binary_sensor' } } },
  ] },
], { glow: 15 });
GSY.register('glow-system-card', 'Glow System Card', GSY_T, GlowSystemCard);
