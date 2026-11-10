/*
 * Glow Security Card
 * Een grote beveiligingskaart voor Alarmo (of een ander alarmpaneel): altijd een
 * klavier, grote standknoppen, de openingen en de camera's die je zelf kiest.
 */

const GSEC_I18N = {
  nl: {
    title: 'Beveiliging', disarmed: 'Uitgeschakeld', armed_home: 'Ingeschakeld · thuis', armed_away: 'Ingeschakeld · afwezig', armed_night: 'Ingeschakeld · nacht', armed_vacation: 'Ingeschakeld · vakantie', armed_custom_bypass: 'Ingeschakeld · aangepast',
    arming: 'Inschakelen… {m}', arming_s: 'Inschakelen… {m} over {s} s', pending: 'Ingangsvertraging, typ je code', pending_s: 'Ingangsvertraging, typ je code ({s} s)', triggered: 'Alarm!', unavailable: 'Niet beschikbaar',
    m_disarmed: 'Uit', m_armed_home: 'Thuis', m_armed_night: 'Nacht', m_armed_away: 'Afwezig', m_armed_vacation: 'Vakantie', m_armed_custom_bypass: 'Aangepast',
    d_disarmed: 'Uitschakelen', d_armed_home: 'Buitenkant bewaakt', d_armed_night: 'Voor de nacht', d_armed_away: 'Alles bewaakt', d_armed_vacation: 'Lang weg', d_armed_custom_bypass: 'Eigen keuze',
    active: 'Actief', busy: 'Bezig…', since: 'Sinds {t}', hint: 'Typ je code en kies een stand', hint_ready: 'Kies een stand', hint_code: 'Typ eerst je code', wrong: 'Dat lukte niet. Klopt de code?',
    openings: 'Openingen', cameras: 'Camera\'s', all_closed: 'Alles dicht', n_open: '{n} open', open: 'Open', closed: 'Dicht', locked: 'Op slot', unlocked: 'Niet op slot', motion: 'Beweging', motion_now: 'Beweging nu',
    ago: '{t} geleden', just_now: 'Zojuist', min: '{n} min', hours: '{n} u', yesterday: 'Gisteren', live: 'LIVE',
    err: 'Vul "entity" in met een alarmpaneel (bv. Alarmo).',
    l_entity: 'Alarm (bv. Alarmo)', l_openings: 'Openingen', l_cameras: 'Camera\'s', l_modes: 'Standen', l_live: 'Live beeld (anders om de paar seconden een foto)', l_refresh: 'Foto vernieuwen om de (seconden)', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)', descriptions: 'Uitleg per stand',
    description: 'Grote beveiligingskaart voor Alarmo: klavier, standen, openingen en camera\'s.',
  },
  en: {
    title: 'Security', disarmed: 'Disarmed', armed_home: 'Armed · home', armed_away: 'Armed · away', armed_night: 'Armed · night', armed_vacation: 'Armed · vacation', armed_custom_bypass: 'Armed · custom',
    arming: 'Arming… {m}', arming_s: 'Arming… {m} in {s} s', pending: 'Entry delay, enter your code', pending_s: 'Entry delay, enter your code ({s} s)', triggered: 'Alarm!', unavailable: 'Unavailable',
    m_disarmed: 'Off', m_armed_home: 'Home', m_armed_night: 'Night', m_armed_away: 'Away', m_armed_vacation: 'Vacation', m_armed_custom_bypass: 'Custom',
    d_disarmed: 'Disarm', d_armed_home: 'Perimeter guarded', d_armed_night: 'For the night', d_armed_away: 'Everything guarded', d_armed_vacation: 'Away for long', d_armed_custom_bypass: 'Your choice',
    active: 'Active', busy: 'Working…', since: 'Since {t}', hint: 'Enter your code and pick a mode', hint_ready: 'Pick a mode', hint_code: 'Enter your code first', wrong: 'That did not work. Is the code right?',
    openings: 'Openings', cameras: 'Cameras', all_closed: 'All closed', n_open: '{n} open', open: 'Open', closed: 'Closed', locked: 'Locked', unlocked: 'Unlocked', motion: 'Motion', motion_now: 'Motion now',
    ago: '{t} ago', just_now: 'Just now', min: '{n} min', hours: '{n} h', yesterday: 'Yesterday', live: 'LIVE',
    err: 'Fill in "entity" with an alarm panel (e.g. Alarmo).',
    l_entity: 'Alarm (e.g. Alarmo)', l_openings: 'Openings', l_cameras: 'Cameras', l_modes: 'Modes', l_live: 'Live video (otherwise a snapshot every few seconds)', l_refresh: 'Refresh snapshot every (seconds)', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)', descriptions: 'Text per mode',
    description: 'Large security card for Alarmo: keypad, modes, openings and cameras.',
  },
  fr: {
    title: 'Sécurité', disarmed: 'Désactivée', armed_home: 'Activée · maison', armed_away: 'Activée · absent', armed_night: 'Activée · nuit', armed_vacation: 'Activée · vacances', armed_custom_bypass: 'Activée · personnalisé',
    arming: 'Activation… {m}', arming_s: 'Activation… {m} dans {s} s', pending: 'Délai d\'entrée, tapez votre code', pending_s: 'Délai d\'entrée, tapez votre code ({s} s)', triggered: 'Alarme !', unavailable: 'Indisponible',
    m_disarmed: 'Arrêt', m_armed_home: 'Maison', m_armed_night: 'Nuit', m_armed_away: 'Absent', m_armed_vacation: 'Vacances', m_armed_custom_bypass: 'Perso',
    d_disarmed: 'Désactiver', d_armed_home: 'Extérieur surveillé', d_armed_night: 'Pour la nuit', d_armed_away: 'Tout surveillé', d_armed_vacation: 'Longue absence', d_armed_custom_bypass: 'Votre choix',
    active: 'Actif', busy: 'En cours…', since: 'Depuis {t}', hint: 'Tapez votre code et choisissez un mode', hint_ready: 'Choisissez un mode', hint_code: 'Tapez d\'abord votre code', wrong: 'Échec. Le code est-il correct ?',
    openings: 'Ouvertures', cameras: 'Caméras', all_closed: 'Tout est fermé', n_open: '{n} ouvert(s)', open: 'Ouvert', closed: 'Fermé', locked: 'Verrouillé', unlocked: 'Déverrouillé', motion: 'Mouvement', motion_now: 'Mouvement',
    ago: 'il y a {t}', just_now: 'À l\'instant', min: '{n} min', hours: '{n} h', yesterday: 'Hier', live: 'LIVE',
    err: 'Renseignez "entity" avec un panneau d\'alarme (p. ex. Alarmo).',
    l_entity: 'Alarme (p. ex. Alarmo)', l_openings: 'Ouvertures', l_cameras: 'Caméras', l_modes: 'Modes', l_live: 'Vidéo en direct (sinon une image toutes les quelques secondes)', l_refresh: 'Rafraîchir l\'image toutes les (secondes)', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)', descriptions: 'Texte par mode',
    description: 'Grande carte de sécurité pour Alarmo : clavier, modes, ouvertures et caméras.',
  },
  de: {
    title: 'Sicherheit', disarmed: 'Unscharf', armed_home: 'Scharf · zuhause', armed_away: 'Scharf · abwesend', armed_night: 'Scharf · Nacht', armed_vacation: 'Scharf · Urlaub', armed_custom_bypass: 'Scharf · benutzerdefiniert',
    arming: 'Wird scharf geschaltet… {m}', arming_s: 'Scharf… {m} in {s} s', pending: 'Eingangsverzögerung, Code eingeben', pending_s: 'Eingangsverzögerung, Code eingeben ({s} s)', triggered: 'Alarm!', unavailable: 'Nicht verfügbar',
    m_disarmed: 'Aus', m_armed_home: 'Zuhause', m_armed_night: 'Nacht', m_armed_away: 'Abwesend', m_armed_vacation: 'Urlaub', m_armed_custom_bypass: 'Eigene',
    d_disarmed: 'Unscharf schalten', d_armed_home: 'Außenhaut gesichert', d_armed_night: 'Für die Nacht', d_armed_away: 'Alles gesichert', d_armed_vacation: 'Lange weg', d_armed_custom_bypass: 'Eigene Wahl',
    active: 'Aktiv', busy: 'Läuft…', since: 'Seit {t}', hint: 'Code eingeben und Modus wählen', hint_ready: 'Modus wählen', hint_code: 'Zuerst den Code eingeben', wrong: 'Hat nicht geklappt. Stimmt der Code?',
    openings: 'Öffnungen', cameras: 'Kameras', all_closed: 'Alles zu', n_open: '{n} offen', open: 'Offen', closed: 'Zu', locked: 'Verriegelt', unlocked: 'Entriegelt', motion: 'Bewegung', motion_now: 'Bewegung jetzt',
    ago: 'vor {t}', just_now: 'Gerade eben', min: '{n} Min.', hours: '{n} Std.', yesterday: 'Gestern', live: 'LIVE',
    err: 'Gib unter "entity" ein Alarmpanel an (z. B. Alarmo).',
    l_entity: 'Alarm (z. B. Alarmo)', l_openings: 'Öffnungen', l_cameras: 'Kameras', l_modes: 'Modi', l_live: 'Livebild (sonst alle paar Sekunden ein Foto)', l_refresh: 'Foto erneuern alle (Sekunden)', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)', descriptions: 'Text pro Modus',
    description: 'Große Sicherheitskarte für Alarmo: Tastenfeld, Modi, Öffnungen und Kameras.',
  },
  es: {
    title: 'Seguridad', disarmed: 'Desactivada', armed_home: 'Activada · en casa', armed_away: 'Activada · fuera', armed_night: 'Activada · noche', armed_vacation: 'Activada · vacaciones', armed_custom_bypass: 'Activada · personalizada',
    arming: 'Activando… {m}', arming_s: 'Activando… {m} en {s} s', pending: 'Retardo de entrada, introduce tu código', pending_s: 'Retardo de entrada, introduce tu código ({s} s)', triggered: '¡Alarma!', unavailable: 'No disponible',
    m_disarmed: 'Apagada', m_armed_home: 'En casa', m_armed_night: 'Noche', m_armed_away: 'Fuera', m_armed_vacation: 'Vacaciones', m_armed_custom_bypass: 'Propia',
    d_disarmed: 'Desactivar', d_armed_home: 'Exterior vigilado', d_armed_night: 'Para la noche', d_armed_away: 'Todo vigilado', d_armed_vacation: 'Ausencia larga', d_armed_custom_bypass: 'A tu elección',
    active: 'Activa', busy: 'En curso…', since: 'Desde las {t}', hint: 'Introduce tu código y elige un modo', hint_ready: 'Elige un modo', hint_code: 'Primero introduce tu código', wrong: 'No ha funcionado. ¿Es correcto el código?',
    openings: 'Aberturas', cameras: 'Cámaras', all_closed: 'Todo cerrado', n_open: '{n} abiertas', open: 'Abierta', closed: 'Cerrada', locked: 'Cerrada con llave', unlocked: 'Sin llave', motion: 'Movimiento', motion_now: 'Movimiento ahora',
    ago: 'hace {t}', just_now: 'Ahora mismo', min: '{n} min', hours: '{n} h', yesterday: 'Ayer', live: 'EN VIVO',
    err: 'Indica en "entity" un panel de alarma (p. ej. Alarmo).',
    l_entity: 'Alarma (p. ej. Alarmo)', l_openings: 'Aberturas', l_cameras: 'Cámaras', l_modes: 'Modos', l_live: 'Vídeo en directo (si no, una foto cada pocos segundos)', l_refresh: 'Actualizar foto cada (segundos)', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)', descriptions: 'Texto por modo',
    description: 'Tarjeta de seguridad grande para Alarmo: teclado, modos, aberturas y cámaras.',
  },
  it: {
    title: 'Sicurezza', disarmed: 'Disattivato', armed_home: 'Attivo · in casa', armed_away: 'Attivo · fuori', armed_night: 'Attivo · notte', armed_vacation: 'Attivo · vacanza', armed_custom_bypass: 'Attivo · personalizzato',
    arming: 'Attivazione… {m}', arming_s: 'Attivazione… {m} tra {s} s', pending: 'Ritardo d\'ingresso, inserisci il codice', pending_s: 'Ritardo d\'ingresso, inserisci il codice ({s} s)', triggered: 'Allarme!', unavailable: 'Non disponibile',
    m_disarmed: 'Spento', m_armed_home: 'In casa', m_armed_night: 'Notte', m_armed_away: 'Fuori', m_armed_vacation: 'Vacanza', m_armed_custom_bypass: 'Personale',
    d_disarmed: 'Disattiva', d_armed_home: 'Perimetro sorvegliato', d_armed_night: 'Per la notte', d_armed_away: 'Tutto sorvegliato', d_armed_vacation: 'Assenza lunga', d_armed_custom_bypass: 'A tua scelta',
    active: 'Attivo', busy: 'In corso…', since: 'Dalle {t}', hint: 'Inserisci il codice e scegli una modalità', hint_ready: 'Scegli una modalità', hint_code: 'Prima inserisci il codice', wrong: 'Non è riuscito. Il codice è giusto?',
    openings: 'Aperture', cameras: 'Telecamere', all_closed: 'Tutto chiuso', n_open: '{n} aperte', open: 'Aperta', closed: 'Chiusa', locked: 'Bloccata', unlocked: 'Sbloccata', motion: 'Movimento', motion_now: 'Movimento ora',
    ago: '{t} fa', just_now: 'Adesso', min: '{n} min', hours: '{n} h', yesterday: 'Ieri', live: 'LIVE',
    err: 'Indica in "entity" un pannello d\'allarme (es. Alarmo).',
    l_entity: 'Allarme (es. Alarmo)', l_openings: 'Aperture', l_cameras: 'Telecamere', l_modes: 'Modalità', l_live: 'Video dal vivo (altrimenti una foto ogni pochi secondi)', l_refresh: 'Aggiorna la foto ogni (secondi)', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)', descriptions: 'Testo per modalità',
    description: 'Grande scheda di sicurezza per Alarmo: tastierino, modalità, aperture e telecamere.',
  },
};
const GSEC_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };

function gsecLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GSEC_I18N[l] ? l : 'en';
}
function gsecT(lang, key, vars) {
  let s = (GSEC_I18N[lang] && GSEC_I18N[lang][key]) || GSEC_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gsecEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

// standen in volgorde, met de functie-bit van het alarmpaneel en de dienst
const GSEC_MODES = [
  { k: 'disarmed', bit: 0, svc: 'alarm_disarm', c: '143, 227, 184' },
  { k: 'armed_home', bit: 1, svc: 'alarm_arm_home', c: '142, 197, 255' },
  { k: 'armed_night', bit: 4, svc: 'alarm_arm_night', c: '185, 168, 255' },
  { k: 'armed_away', bit: 2, svc: 'alarm_arm_away', c: '255, 184, 153' },
  { k: 'armed_vacation', bit: 32, svc: 'alarm_arm_vacation', c: '255, 224, 138' },
  { k: 'armed_custom_bypass', bit: 16, svc: 'alarm_arm_custom_bypass', c: '142, 227, 214' },
];
const GSEC_BUSY = '255, 224, 138';
const GSEC_ALARM = '255, 128, 140';
const GSEC_OPEN = '255, 184, 153';
const GSEC_SHUT = '143, 227, 184';
const GSEC_MOTION = '255, 159, 191';

const GSEC_SHIELD = (inner) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/>${inner}</svg>`;
const GSEC_CHECK = '<path d="M9 12l2 2 4-4"/>';
const GSEC_BANG = '<path d="M12 8v4M12 15.5h.01"/>';
const GSEC_CAM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="3"/><path d="M16 10l5-3v10l-5-3"/></svg>';

const GSEC_INK = (v) => `color-mix(in srgb, rgb(var(${v})), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%))`;
const GSEC_LINE = 'var(--glow-border, rgba(255, 255, 255, 0.1))';

const GSEC_STYLE = `
  :host { display: block; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: column; gap: 22px; padding: 22px;
    border-radius: var(--ha-card-border-radius, 24px); container-type: inline-size;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.3); box-shadow: 0 0 calc(var(--glow) * 0.5) rgba(var(--c), 0.15);
    transition: border-color 0.4s, box-shadow 0.4s; user-select: none; -webkit-user-select: none;
  }
  ha-card.armed { border-color: rgba(var(--c), 0.55); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); }
  ha-card.alarm { border-color: rgba(var(--c), 0.8); box-shadow: 0 0 calc(var(--glow) * 2) rgba(var(--c), 0.6); }
  .halo { position: absolute; right: -80px; top: -100px; width: 300px; height: 300px; border-radius: 50%; filter: blur(70px); background: rgb(var(--c)); opacity: 0.15; transition: background 0.4s, opacity 0.4s; pointer-events: none; }
  ha-card.armed .halo { opacity: 0.3; }
  ha-card.alarm .halo { opacity: 0.45; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }

  .head { position: relative; display: flex; align-items: center; gap: 18px; }
  .shield { width: 72px; height: 72px; border-radius: 36px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgb(var(--c)); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(var(--c), 0.8); transition: background 0.4s, box-shadow 0.4s; cursor: pointer; }
  .shield svg { width: 38px; height: 38px; }
  .ht { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
  .ht .t { font-size: 26px; font-weight: 800; line-height: 1.1; }
  .ht .s { font-size: 17px; font-weight: 800; color: ${GSEC_INK('--c')}; }
  .since { font-size: 14px; font-weight: 700; opacity: 0.65; white-space: nowrap; }

  .ctl { position: relative; display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 18px; }
  .pad { display: flex; flex-direction: column; gap: 16px; padding: 18px; border-radius: 22px; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .dots { display: flex; gap: 12px; height: 16px; align-items: center; justify-content: center; }
  .dots span { width: 14px; height: 14px; border-radius: 7px; background: ${GSEC_LINE}; transition: background 0.2s, box-shadow 0.2s; }
  .dots span.on { background: rgb(var(--c)); box-shadow: 0 0 8px rgba(var(--c), 0.9); }
  .dots.wrong span { background: rgba(${GSEC_ALARM}, 0.55); }
  .keys { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
  .key { height: 64px; border-radius: 20px; font-size: 26px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GSEC_LINE}; }
  .key.fn { font-size: 20px; opacity: 0.65; }
  .key:active { background: rgba(var(--c), 0.25); }
  .modes { display: flex; flex-direction: column; gap: 10px; }
  .hint { font-size: 14px; font-weight: 700; min-height: 20px; opacity: 0.65; }
  .hint.bad { opacity: 1; color: ${GSEC_INK('--bad')}; }
  .mode { height: 62px; padding: 0 18px; border-radius: 20px; display: flex; align-items: center; gap: 12px; border: 1px solid ${GSEC_LINE}; background: var(--glow-surface, rgba(255,255,255,0.07)); transition: background 0.3s, border-color 0.3s, box-shadow 0.3s, opacity 0.3s; opacity: 0.75; }
  .modes.ready .mode { opacity: 1; }
  .mode .dot { width: 14px; height: 14px; border-radius: 7px; flex-shrink: 0; box-sizing: border-box; border: 2px solid rgba(var(--m), 0.7); }
  .mode .n { flex: 1; text-align: left; font-size: 18px; font-weight: 800; }
  .mode .d { font-size: 13px; font-weight: 700; opacity: 0.65; white-space: nowrap; }
  .mode.on { opacity: 1; border-color: rgba(var(--m), 0.6); background: rgba(var(--m), 0.16); box-shadow: 0 0 var(--glow) rgba(var(--m), 0.35); }
  .mode.on .dot { border: 0; background: rgb(var(--m)); box-shadow: 0 0 10px rgba(var(--m), 0.9); }
  .mode.on .d { opacity: 1; color: ${GSEC_INK('--m')}; }
  .mode:active { transform: scale(0.98); }

  .sec { position: relative; display: flex; flex-direction: column; gap: 10px; }
  .sh { display: flex; justify-content: space-between; align-items: baseline; }
  .lab { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .cnt { font-size: 13px; font-weight: 800; color: ${GSEC_INK('--k')}; }
  .doors { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
  .door { display: flex; align-items: center; gap: 9px; height: 46px; padding: 0 14px 0 12px; border-radius: 16px; box-sizing: border-box; min-width: 0; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid transparent; cursor: pointer; }
  .door .dot { width: 10px; height: 10px; border-radius: 5px; flex-shrink: 0; background: rgba(${GSEC_SHUT}, 0.85); }
  .door .n { flex: 1; min-width: 0; font-size: 15px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .door .v { font-size: 13px; font-weight: 700; opacity: 0.65; white-space: nowrap; }
  .door.open { background: rgba(${GSEC_OPEN}, 0.16); border-color: rgba(${GSEC_OPEN}, 0.55); box-shadow: 0 0 var(--glow) rgba(${GSEC_OPEN}, 0.3); --o: ${GSEC_OPEN}; }
  .door.open .dot { background: rgb(${GSEC_OPEN}); box-shadow: 0 0 8px rgba(${GSEC_OPEN}, 0.9); }
  .door.open .v { opacity: 1; color: ${GSEC_INK('--o')}; }
  .door.na { opacity: 0.45; }
  .door.na .dot { background: ${GSEC_LINE}; }

  .cams { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .cam { position: relative; aspect-ratio: 16 / 9; border-radius: 20px; overflow: hidden; background: #0F0D18; border: 1px solid transparent; cursor: pointer; transition: border-color 0.3s, box-shadow 0.3s; }
  .cam img, .cam ha-camera-stream { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
  .cam ha-camera-stream { --video-max-height: 100%; }
  .cam .ph { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: rgba(243, 241, 250, 0.3); }
  .cam .ph svg { width: 36px; height: 36px; }
  .cam .shade { position: absolute; inset: 0; background: linear-gradient(transparent 50%, rgba(8, 6, 16, 0.78)); pointer-events: none; }
  .cam .live { position: absolute; top: 10px; right: 12px; display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 800; letter-spacing: 0.06em; color: #F3F1FA; opacity: 0.85; }
  .cam .live i { width: 7px; height: 7px; border-radius: 4px; background: #FF8F8F; }
  .cam .badge { position: absolute; top: 10px; left: 10px; display: none; align-items: center; gap: 6px; height: 26px; padding: 0 11px; border-radius: 13px; font-size: 12px; font-weight: 800; color: #1C1730; background: rgb(${GSEC_MOTION}); box-shadow: 0 0 10px rgba(${GSEC_MOTION}, 0.8); }
  .cam .badge i { width: 6px; height: 6px; border-radius: 3px; background: #1C1730; }
  .cam .foot { position: absolute; left: 14px; right: 14px; bottom: 12px; display: flex; justify-content: space-between; align-items: baseline; gap: 8px; color: #F3F1FA; pointer-events: none; }
  .cam .foot .n { font-size: 16px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cam .foot .w { font-size: 13px; font-weight: 700; opacity: 0.75; white-space: nowrap; }
  .cam.motion { border-color: rgba(${GSEC_MOTION}, 0.6); box-shadow: 0 0 var(--glow) rgba(${GSEC_MOTION}, 0.35); }
  .cam.motion .badge { display: flex; }

  @container (max-width: 640px) {
    .ctl { grid-template-columns: minmax(0, 1fr); }
    .doors { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @container (max-width: 420px) {
    .cams { grid-template-columns: minmax(0, 1fr); }
    .since { display: none; }
  }
`;

class GlowSecurityCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._built = false;
    this._code = '';
  }

  static getConfigElement() { return document.createElement('glow-security-card-editor'); }

  static getStubConfig(hass) {
    const ids = Object.keys((hass && hass.states) || {});
    const alarm = ids.find((e) => e.startsWith('alarm_control_panel.') && /alarmo/i.test(e)) || ids.find((e) => e.startsWith('alarm_control_panel.'));
    return { entity: alarm || '' };
  }

  setConfig(config) {
    if (!config || !config.entity) throw new Error(gsecT(gsecLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, live: false, refresh: 10, ...config };
    this._built = false;
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._config) this._render();
  }
  get hass() { return this._hass; }

  getCardSize() { return 12; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }

  connectedCallback() {
    // elke seconde: aftellen bij in- of uitloopvertraging, en de camerafoto's vernieuwen
    clearInterval(this._tick);
    this._tick = setInterval(() => this._onTick(), 1000);
  }

  disconnectedCallback() {
    clearInterval(this._tick);
    clearTimeout(this._codeTimer);
  }

  _lang() { return gsecLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gsecT(this._lang(), k, v); }
  _locale() { return (this._hass && this._hass.locale && this._hass.locale.language) || this._lang(); }

  _fmtTime(d) {
    try { return d.toLocaleTimeString(this._locale(), { hour: '2-digit', minute: '2-digit' }); } catch (e) { return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
  }

  _ago(iso) {
    const t = Date.parse(iso);
    if (!t) return '';
    const s = (Date.now() - t) / 1000;
    if (s < 60) return this._t('just_now');
    if (s < 3600) return this._t('ago', { t: this._t('min', { n: Math.floor(s / 60) }) });
    if (s < 86400) return this._t('ago', { t: this._t('hours', { n: Math.floor(s / 3600) }) });
    if (s < 172800) return this._t('yesterday');
    try { return new Date(t).toLocaleDateString(this._locale(), { day: 'numeric', month: 'short' }); } catch (e) { return ''; }
  }

  /* ---- gegevens ---- */

  _alarm() { return this._hass.states[this._config.entity]; }

  _modes() {
    const s = this._alarm();
    const f = (s && s.attributes.supported_features) || 0;
    const wanted = Array.isArray(this._config.modes) && this._config.modes.length ? this._config.modes : ['disarmed', 'armed_home', 'armed_night', 'armed_away'];
    return GSEC_MODES.filter((m) => wanted.includes(m.k) && (m.bit === 0 || !f || f & m.bit));
  }

  _modeColor(k) { const m = GSEC_MODES.find((x) => x.k === k); return m ? m.c : GSEC_BUSY; }

  _openings() {
    const st = this._hass.states;
    if (Array.isArray(this._config.openings) && this._config.openings.length) return this._config.openings.filter((e) => st[e]);
    return Object.keys(st).filter((e) => e.startsWith('binary_sensor.') && ['door', 'window', 'garage_door', 'opening'].includes(st[e].attributes.device_class))
      .sort((a, b) => (st[a].attributes.friendly_name || a).localeCompare(st[b].attributes.friendly_name || b));
  }

  _openState(s, id) {
    const d = String(s.entity_id || id || '').split('.')[0];
    if (s.state === 'unavailable' || s.state === 'unknown') return { open: false, na: true, label: '–' };
    if (d === 'lock') return { open: s.state !== 'locked', label: this._t(s.state === 'locked' ? 'locked' : 'unlocked') };
    if (d === 'cover') { const o = s.state !== 'closed'; return { open: o, label: this._t(o ? 'open' : 'closed') }; }
    if (s.attributes.device_class === 'motion' || s.attributes.device_class === 'occupancy' || s.attributes.device_class === 'presence') {
      return { open: s.state === 'on', label: s.state === 'on' ? this._t('motion') : this._ago(s.last_changed) };
    }
    const o = s.state === 'on' || s.state === 'open';
    return { open: o, label: this._t(o ? 'open' : 'closed') };
  }

  // camera's: tekst ("camera.oprit") of { entity, name, motion }
  _cameras() {
    const st = this._hass.states;
    const list = Array.isArray(this._config.cameras) ? this._config.cameras : [];
    return list.map((c) => (typeof c === 'string' ? { entity: c } : c)).filter((c) => c && st[c.entity]).map((c) => ({ ...c, motion: c.motion || this._findMotion(c.entity) }));
  }

  // bewegingssensor van hetzelfde toestel (bv. Reolink: binary_sensor.oprit_motion / _person)
  _findMotion(cam) {
    const ents = this._hass.entities;
    const st = this._hass.states;
    const dev = ents && ents[cam] && ents[cam].device_id;
    if (!dev) return null;
    const mine = Object.values(ents).filter((e) => e.device_id === dev && e.entity_id.startsWith('binary_sensor.') && st[e.entity_id]);
    const pick = (re) => mine.find((e) => re.test(e.entity_id) || re.test(st[e.entity_id].attributes.device_class || ''));
    const hit = pick(/motion/) || pick(/person/) || pick(/occupancy|presence/);
    return hit ? hit.entity_id : null;
  }

  /* ---- opbouw ---- */

  _build() {
    this.shadowRoot.innerHTML = `
      <style>${GSEC_STYLE}</style>
      <ha-card>
        <div class="halo"></div>
        <div class="head">
          <div class="shield"></div>
          <div class="ht"><span class="t"></span><span class="s"></span></div>
          <span class="since"></span>
        </div>
        <div class="ctl">
          <div class="pad">
            <div class="dots"></div>
            <div class="keys">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '✕', '0', '⌫'].map((k) => `<button class="key${k === '✕' || k === '⌫' ? ' fn' : ''}" type="button" data-k="${k}">${k}</button>`).join('')}</div>
          </div>
          <div class="modes"><span class="hint"></span></div>
        </div>
        <div class="sec openings"><div class="sh"><span class="lab"></span><span class="cnt"></span></div><div class="doors"></div></div>
        <div class="sec cameras"><div class="sh"><span class="lab"></span></div><div class="cams"></div></div>
      </ha-card>`;
    const r = this.shadowRoot;
    this._card = r.querySelector('ha-card');
    r.querySelector('.shield').addEventListener('click', () => this._moreInfo(this._config.entity));
    r.querySelectorAll('.key').forEach((b) => b.addEventListener('click', () => this._press(b.dataset.k)));
    r.querySelector('.modes').addEventListener('click', (e) => {
      const b = e.target.closest('.mode');
      if (b) this._choose(b.dataset.k);
    });
    r.querySelector('.doors').addEventListener('click', (e) => {
      const d = e.target.closest('.door');
      if (d) this._moreInfo(d.dataset.e);
    });
    r.querySelector('.cams').addEventListener('click', (e) => {
      const c = e.target.closest('.cam');
      if (c) this._moreInfo(c.dataset.e);
    });
    this._keys = {};
    this._built = true;
    this._builtLang = this._lang();
  }

  _moreInfo(entity) {
    if (!entity) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: entity }, bubbles: true, composed: true }));
  }

  /* ---- klavier en standen ---- */

  _press(k) {
    if (k === '✕') this._code = '';
    else if (k === '⌫') this._code = this._code.slice(0, -1);
    else if (this._code.length < 12) this._code += k;
    this._error = null;
    // een half ingetypte code niet laten staan
    clearTimeout(this._codeTimer);
    this._codeTimer = setTimeout(() => { this._code = ''; this._renderPad(); }, 30000);
    this._renderPad();
  }

  _needsCode(k) {
    const a = this._alarm();
    if (!a || !a.attributes.code_format) return false;
    if (k === 'disarmed') return true;
    return a.attributes.code_arm_required !== false;
  }

  _choose(k) {
    const a = this._alarm();
    if (!a) return;
    const m = GSEC_MODES.find((x) => x.k === k);
    if (!m) return;
    if (a.state === k) return;
    if (this._needsCode(k) && !this._code) {
      this._error = 'hint_code';
      this._renderPad();
      clearTimeout(this._errTimer);
      this._errTimer = setTimeout(() => { this._error = null; this._renderPad(); }, 2000);
      return;
    }
    const data = { entity_id: this._config.entity };
    if (this._code) data.code = this._code;
    this._code = '';
    this._error = null;
    this._sentAt = Date.now();
    this._renderPad();
    Promise.resolve(this._hass.callService('alarm_control_panel', m.svc, data)).catch(() => {
      this._error = 'wrong';
      this._renderPad();
      clearTimeout(this._errTimer);
      this._errTimer = setTimeout(() => { this._error = null; this._renderPad(); }, 4000);
    });
  }

  _renderPad() {
    if (!this._built) return;
    const r = this.shadowRoot;
    const n = this._code.length;
    const dots = r.querySelector('.dots');
    dots.innerHTML = Array.from({ length: Math.max(4, n) }, (_, i) => `<span class="${i < n ? 'on' : ''}"></span>`).join('');
    dots.classList.toggle('wrong', !!this._error);
    const hint = r.querySelector('.hint');
    hint.textContent = this._t(this._error || (n ? 'hint_ready' : 'hint'));
    hint.classList.toggle('bad', !!this._error);
    hint.style.setProperty('--bad', GSEC_ALARM);
    r.querySelector('.modes').classList.toggle('ready', n > 0);
  }

  /* ---- tekenen ---- */

  _status(a) {
    const st = a.state;
    const attr = a.attributes;
    const left = () => {
      const d = +attr.delay || 0;
      if (!d) return 0;
      return Math.max(0, Math.ceil(d - (Date.now() - Date.parse(a.last_changed)) / 1000));
    };
    if (st === 'unavailable' || st === 'unknown') return { text: this._t('unavailable'), c: '201, 196, 221', armed: false };
    if (st === 'triggered') {
      const open = attr.open_sensors && typeof attr.open_sensors === 'object' ? Object.keys(attr.open_sensors) : [];
      const names = open.map((e) => (this._hass.states[e] && this._hass.states[e].attributes.friendly_name) || e).join(', ');
      return { text: this._t('triggered') + (names ? ' ' + names : ''), c: GSEC_ALARM, armed: true, alarm: true };
    }
    if (st === 'arming') {
      const mode = attr.arm_mode || attr.next_state;
      const name = mode ? this._t('m_' + mode).toLowerCase() : '';
      const s = left();
      return { text: s ? this._t('arming_s', { m: name, s }) : this._t('arming', { m: name }), c: GSEC_BUSY, armed: true, pending: mode };
    }
    if (st === 'pending') {
      const s = left();
      return { text: s ? this._t('pending_s', { s }) : this._t('pending'), c: GSEC_ALARM, armed: true, alarm: true };
    }
    return { text: this._t(st), c: this._modeColor(st), armed: st !== 'disarmed' };
  }

  _set(el, key, html) {
    if (this._keys[key] === html) return false;
    this._keys[key] = html;
    el.innerHTML = html;
    return true;
  }

  _onTick() {
    if (!this._hass || !this._built) return;
    const a = this._alarm();
    if (a && (a.state === 'arming' || a.state === 'pending')) this._renderHead();
    // camerafoto's om de zoveel seconden
    const every = Math.max(2, parseInt(this._config.refresh, 10) || 10) * 1000;
    if (!this._config.live && (!this._lastSnap || Date.now() - this._lastSnap >= every)) this._refreshSnaps();
    if (!this._lastAgo || Date.now() - this._lastAgo > 30000) { this._lastAgo = Date.now(); this._renderLists(); }
  }

  _renderHead() {
    const a = this._alarm();
    const r = this.shadowRoot;
    if (!a) return;
    const s = this._status(a);
    this._card.style.setProperty('--c', s.c);
    this._card.classList.toggle('armed', !!s.armed);
    this._card.classList.toggle('alarm', !!s.alarm);
    this._set(r.querySelector('.shield'), 'shield', GSEC_SHIELD(s.alarm ? GSEC_BANG : s.armed && !s.pending ? GSEC_CHECK : ''));
    r.querySelector('.ht .t').textContent = this._config.name || this._t('title');
    r.querySelector('.ht .s').textContent = s.text;
    r.querySelector('.since').textContent = a.last_changed ? this._t('since', { t: this._fmtTime(new Date(a.last_changed)) }) : '';

    // standknoppen
    const desc = this._config.descriptions || {};
    const html = this._modes().map((m) => {
      const on = a.state === m.k || s.pending === m.k;
      const d = on ? this._t(s.pending === m.k ? 'busy' : 'active') : (desc[m.k] !== undefined ? desc[m.k] : this._t('d_' + m.k));
      return `<button class="mode${on ? ' on' : ''}" type="button" data-k="${m.k}" style="--m:${m.c}"><span class="dot"></span><span class="n">${gsecEsc(this._t('m_' + m.k))}</span><span class="d">${gsecEsc(d)}</span></button>`;
    }).join('');
    const box = r.querySelector('.modes');
    if (this._keys.modes !== html) {
      this._keys.modes = html;
      box.querySelectorAll('.mode').forEach((b) => b.remove());
      box.insertAdjacentHTML('beforeend', html);
    }
  }

  _renderLists() {
    const r = this.shadowRoot;
    const st = this._hass.states;

    // openingen
    const ops = this._openings();
    const sec = r.querySelector('.openings');
    sec.style.display = ops.length ? '' : 'none';
    sec.querySelector('.lab').textContent = this._t('openings');
    let nOpen = 0;
    const doors = ops.map((e) => {
      const s = st[e];
      const o = this._openState(s, e);
      if (o.open) nOpen++;
      return `<div class="door${o.open ? ' open' : ''}${o.na ? ' na' : ''}" data-e="${gsecEsc(e)}"><span class="dot"></span><span class="n">${gsecEsc(s.attributes.friendly_name || e)}</span><span class="v">${gsecEsc(o.label)}</span></div>`;
    }).join('');
    this._set(sec.querySelector('.doors'), 'doors', doors);
    const cnt = sec.querySelector('.cnt');
    cnt.textContent = nOpen ? this._t('n_open', { n: nOpen }) : this._t('all_closed');
    cnt.style.setProperty('--k', nOpen ? GSEC_OPEN : GSEC_SHUT);

    // camera's: de tegels alleen opnieuw opbouwen als de lijst verandert
    const cams = this._cameras();
    const csec = r.querySelector('.cameras');
    csec.style.display = cams.length ? '' : 'none';
    csec.querySelector('.lab').textContent = this._t('cameras');
    const grid = csec.querySelector('.cams');
    const key = JSON.stringify([cams.map((c) => c.entity), !!this._config.live, this._lang()]);
    if (this._keys.cams !== key) {
      this._keys.cams = key;
      grid.innerHTML = cams.map((c) => `
        <div class="cam" data-e="${gsecEsc(c.entity)}">
          <div class="ph">${GSEC_CAM}</div>
          <div class="media"></div>
          <div class="shade"></div>
          <span class="live"><i></i>${gsecEsc(this._t('live'))}</span>
          <span class="badge"><i></i>${gsecEsc(this._t('motion'))}</span>
          <div class="foot"><span class="n"></span><span class="w"></span></div>
        </div>`).join('');
      this._lastSnap = 0;
      if (this._config.live) this._mountStreams();
    }
    cams.forEach((c) => {
      const el = grid.querySelector(`.cam[data-e="${CSS.escape(c.entity)}"]`);
      if (!el) return;
      const s = st[c.entity];
      el.querySelector('.n').textContent = c.name || s.attributes.friendly_name || c.entity;
      const m = c.motion && st[c.motion];
      const moving = !!(m && m.state === 'on');
      el.classList.toggle('motion', moving);
      el.querySelector('.w').textContent = !m ? '' : moving ? this._t('motion_now') : this._ago(m.last_changed);
      const live = el.querySelector('.live');
      live.style.display = s.state === 'unavailable' ? 'none' : '';
      if (this._config.live) {
        const stream = el.querySelector('ha-camera-stream');
        if (stream) { stream.hass = this._hass; stream.stateObj = s; }
      }
    });
    if (!this._config.live && !this._lastSnap) this._refreshSnaps();
  }

  // live beeld via het eigen camera-element van Home Assistant
  _mountStreams() {
    const r = this.shadowRoot;
    r.querySelectorAll('.cam').forEach((el) => {
      const s = this._hass.states[el.dataset.e];
      const media = el.querySelector('.media');
      if (!s || !customElements.get('ha-camera-stream')) { this._snapInto(el); return; }
      const v = document.createElement('ha-camera-stream');
      v.hass = this._hass;
      v.stateObj = s;
      v.muted = true;
      v.controls = false;
      v.allowExoPlayer = false;
      media.appendChild(v);
      el.querySelector('.ph').style.display = 'none';
    });
  }

  _refreshSnaps() {
    this._lastSnap = Date.now();
    this.shadowRoot.querySelectorAll('.cam').forEach((el) => this._snapInto(el));
  }

  // nieuwe foto eerst laden en pas dan wisselen, zodat het beeld niet flikkert
  _snapInto(el) {
    const s = this._hass.states[el.dataset.e];
    const pic = s && s.attributes.entity_picture;
    if (!pic || s.state === 'unavailable') return;
    const url = pic + (pic.includes('?') ? '&' : '?') + '_t=' + Date.now();
    const img = new Image();
    img.onload = () => {
      const media = el.querySelector('.media');
      media.innerHTML = '';
      img.alt = '';
      media.appendChild(img);
      el.querySelector('.ph').style.display = 'none';
    };
    img.src = url;
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    this._card.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');
    this._renderHead();
    this._renderPad();
    this._renderLists();
  }
}

/* ---------------- editor ---------------- */

class GlowSecurityCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    this._render();
  }
  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    else this._render();
  }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = gsecLang(this._hass, this._config.language);
    const t = (k) => gsecT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => (s.name.startsWith('desc_') ? gsecT(lang, 'm_' + s.name.slice(5)) : gsecT(lang, 'l_' + s.name));
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        // uitleg per stand samenvoegen tot "descriptions"
        const desc = {};
        Object.keys(v).filter((k) => k.startsWith('desc_')).forEach((k) => {
          if (v[k] !== undefined && v[k] !== null && v[k] !== '' && v[k] !== gsecT(lang, 'd_' + k.slice(5))) desc[k.slice(5)] = v[k];
          delete v[k];
        });
        if (Object.keys(desc).length) v.descriptions = desc; else delete v.descriptions;
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length)) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.live === false) delete v.live;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    const camEntities = (this._config.cameras || []).map((c) => (typeof c === 'string' ? c : c && c.entity)).filter(Boolean);
    const camsAreSimple = (this._config.cameras || []).every((c) => typeof c === 'string');
    const schema = [
      { name: 'entity', selector: { entity: { domain: 'alarm_control_panel' } } },
      { name: 'modes', selector: { select: { multiple: true, mode: 'list', options: GSEC_MODES.map((m) => ({ value: m.k, label: t('m_' + m.k) })) } } },
      { name: 'openings', selector: { entity: { domain: ['binary_sensor', 'cover', 'lock'], multiple: true } } },
    ];
    // camera's met eigen naam of bewegingssensor blijven in YAML
    if (camsAreSimple) schema.push({ name: 'cameras', selector: { entity: { domain: 'camera', multiple: true } } });
    schema.push(
      { type: 'grid', name: '', schema: [
        { name: 'live', selector: { boolean: {} } },
        { name: 'refresh', selector: { number: { min: 2, max: 120, step: 1, mode: 'box', unit_of_measurement: 's' } } },
      ] },
      { type: 'expandable', name: '', flatten: true, title: t('descriptions'), schema: GSEC_MODES.map((m) => ({ name: 'desc_' + m.k, selector: { text: {} } })) },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GSEC_LANG_NAMES).map((k) => ({ value: k, label: GSEC_LANG_NAMES[k] }))) } } },
    );
    this._form.schema = schema;
    const data = { glow: 15, refresh: 10, live: false, language: 'auto', modes: ['disarmed', 'armed_home', 'armed_night', 'armed_away'], ...this._config };
    if (camsAreSimple) data.cameras = camEntities;
    const desc = this._config.descriptions || {};
    GSEC_MODES.forEach((m) => { data['desc_' + m.k] = desc[m.k] !== undefined ? desc[m.k] : t('d_' + m.k); });
    delete data.descriptions;
    this._form.data = data;
  }
}

if (!customElements.get('glow-security-card')) customElements.define('glow-security-card', GlowSecurityCard);
if (!customElements.get('glow-security-card-editor')) customElements.define('glow-security-card-editor', GlowSecurityCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-security-card')) {
  window.customCards.push({
    type: 'glow-security-card',
    name: 'Glow Security Card',
    description: gsecT(gsecLang(null), 'description'),
    preview: false,
    documentationURL: 'https://github.com/stijnleroy/glow-cards',
  });
}
