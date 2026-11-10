/*
 * Glow Thermostat Card
 * Een thermostaatkaart in de Glow-stijl met draaiknop, standen en een weekschema
 * (comfort/spaarstand) dat volledig in Home Assistant draait: een schedule-helper,
 * twee input_numbers, een input_boolean en één automatisering.
 */

const GTH_I18N = {
  nl: {
    off: 'Uit', heating: 'Verwarmt naar {t}', idle: 'Op temperatuur', cooling: 'Koelt naar {t}', unavailable: 'Niet beschikbaar', now: 'Nu {t}',
    m_off: 'Uit', m_heat: 'Verwarmen', m_auto: 'Schema', schedule: 'Schema', colder: 'Kouder', warmer: 'Warmer',
    comfort: 'Comfort', eco: 'Spaarstand', on: 'Aan', sched_off: 'Schema staat uit', comfort_until: 'Nu comfort tot {t}, daarna {e}', eco_until: 'Nu spaarstand tot {t}, daarna {c}', eco_all: 'Vandaag geen comfortblokken',
    days: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'], days_long: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'],
    until: 'tot', add_block: '+ Blok toevoegen', remove: 'Verwijderen', copy_week: 'Kopieer naar alle weekdagen', copy_weekend: 'Kopieer naar het weekend', saved: 'Opgeslagen', saving: 'Opslaan…',
    setup_title: 'Schema nog niet ingesteld', setup_text: 'De kaart maakt in Home Assistant een schema, twee temperaturen (comfort en spaarstand), een schakelaar "schema actief" en één automatisering aan. Daarna loopt het schema ook als de tablet uit staat.', setup_btn: 'Schema instellen', setup_busy: 'Bezig met instellen…', setup_err: 'Dat lukte niet: {e}. Dit vraagt een beheerdersaccount.',
    err: 'Vul "entity" in met een thermostaat (climate).',
    l_entity: 'Thermostaat', l_name: 'Naam', l_schedule: 'Schema-helper (leeg = automatisch)', l_comfort: 'Comforttemperatuur (input_number)', l_eco: 'Spaartemperatuur (input_number)', l_active: 'Schema actief (input_boolean)', l_humidity: 'Vochtigheidssensor (optioneel)', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    l_layout: 'Weergave', lay_full: 'Groot, met het schema erbij', lay_compact: 'Klein, schema in een popup',
    description: 'Thermostaat met draaiknop en een weekschema met comfort- en spaartemperatuur.',
  },
  en: {
    off: 'Off', heating: 'Heating to {t}', idle: 'At temperature', cooling: 'Cooling to {t}', unavailable: 'Unavailable', now: 'Now {t}',
    m_off: 'Off', m_heat: 'Heat', m_auto: 'Schedule', schedule: 'Schedule', colder: 'Colder', warmer: 'Warmer',
    comfort: 'Comfort', eco: 'Eco', on: 'On', sched_off: 'Schedule is off', comfort_until: 'Comfort until {t}, then {e}', eco_until: 'Eco until {t}, then {c}', eco_all: 'No comfort blocks today',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], days_long: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    until: 'to', add_block: '+ Add block', remove: 'Remove', copy_week: 'Copy to all weekdays', copy_weekend: 'Copy to the weekend', saved: 'Saved', saving: 'Saving…',
    setup_title: 'Schedule not set up yet', setup_text: 'The card creates a schedule, two temperatures (comfort and eco), a "schedule active" switch and one automation in Home Assistant. The schedule then runs even when the tablet is off.', setup_btn: 'Set up schedule', setup_busy: 'Setting up…', setup_err: 'That did not work: {e}. This needs an administrator account.',
    err: 'Fill in "entity" with a thermostat (climate).',
    l_entity: 'Thermostat', l_name: 'Name', l_schedule: 'Schedule helper (empty = automatic)', l_comfort: 'Comfort temperature (input_number)', l_eco: 'Eco temperature (input_number)', l_active: 'Schedule active (input_boolean)', l_humidity: 'Humidity sensor (optional)', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    l_layout: 'Layout', lay_full: 'Large, with the schedule', lay_compact: 'Small, schedule in a popup',
    description: 'Thermostat with a dial and a weekly comfort/eco schedule.',
  },
  fr: {
    off: 'Arrêt', heating: 'Chauffe à {t}', idle: 'À température', cooling: 'Refroidit à {t}', unavailable: 'Indisponible', now: 'Actuel {t}',
    m_off: 'Arrêt', m_heat: 'Chauffer', m_auto: 'Programme', schedule: 'Programme', colder: 'Plus froid', warmer: 'Plus chaud',
    comfort: 'Confort', eco: 'Éco', on: 'Activé', sched_off: 'Programme désactivé', comfort_until: 'Confort jusqu\'à {t}, puis {e}', eco_until: 'Éco jusqu\'à {t}, puis {c}', eco_all: 'Pas de confort aujourd\'hui',
    days: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'], days_long: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    until: 'à', add_block: '+ Ajouter un bloc', remove: 'Supprimer', copy_week: 'Copier sur la semaine', copy_weekend: 'Copier sur le week-end', saved: 'Enregistré', saving: 'Enregistrement…',
    setup_title: 'Programme pas encore configuré', setup_text: 'La carte crée dans Home Assistant un programme, deux températures (confort et éco), un interrupteur « programme actif » et une automatisation. Le programme tourne ensuite même si la tablette est éteinte.', setup_btn: 'Configurer le programme', setup_busy: 'Configuration…', setup_err: 'Échec : {e}. Un compte administrateur est nécessaire.',
    err: 'Renseignez "entity" avec un thermostat (climate).',
    l_entity: 'Thermostat', l_name: 'Nom', l_schedule: 'Programme (vide = automatique)', l_comfort: 'Température confort (input_number)', l_eco: 'Température éco (input_number)', l_active: 'Programme actif (input_boolean)', l_humidity: 'Capteur d\'humidité (optionnel)', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    l_layout: 'Affichage', lay_full: 'Grand, avec le programme', lay_compact: 'Petit, programme dans un popup',
    description: 'Thermostat avec molette et programme hebdomadaire confort/éco.',
  },
  de: {
    off: 'Aus', heating: 'Heizt auf {t}', idle: 'Temperatur erreicht', cooling: 'Kühlt auf {t}', unavailable: 'Nicht verfügbar', now: 'Jetzt {t}',
    m_off: 'Aus', m_heat: 'Heizen', m_auto: 'Zeitplan', schedule: 'Zeitplan', colder: 'Kälter', warmer: 'Wärmer',
    comfort: 'Komfort', eco: 'Spar', on: 'An', sched_off: 'Zeitplan ist aus', comfort_until: 'Komfort bis {t}, dann {e}', eco_until: 'Spar bis {t}, dann {c}', eco_all: 'Heute keine Komfortblöcke',
    days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'], days_long: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    until: 'bis', add_block: '+ Block hinzufügen', remove: 'Entfernen', copy_week: 'Auf alle Werktage kopieren', copy_weekend: 'Aufs Wochenende kopieren', saved: 'Gespeichert', saving: 'Speichern…',
    setup_title: 'Zeitplan noch nicht eingerichtet', setup_text: 'Die Karte legt in Home Assistant einen Zeitplan, zwei Temperaturen (Komfort und Spar), einen Schalter „Zeitplan aktiv“ und eine Automatisierung an. Der Zeitplan läuft dann auch, wenn das Tablet aus ist.', setup_btn: 'Zeitplan einrichten', setup_busy: 'Wird eingerichtet…', setup_err: 'Hat nicht geklappt: {e}. Dafür ist ein Administratorkonto nötig.',
    err: 'Gib unter "entity" einen Thermostat (climate) an.',
    l_entity: 'Thermostat', l_name: 'Name', l_schedule: 'Zeitplan-Helfer (leer = automatisch)', l_comfort: 'Komforttemperatur (input_number)', l_eco: 'Spartemperatur (input_number)', l_active: 'Zeitplan aktiv (input_boolean)', l_humidity: 'Feuchtesensor (optional)', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    l_layout: 'Darstellung', lay_full: 'Groß, mit Zeitplan', lay_compact: 'Klein, Zeitplan im Popup',
    description: 'Thermostat mit Drehregler und Wochenplan für Komfort/Spar.',
  },
  es: {
    off: 'Apagado', heating: 'Calentando a {t}', idle: 'A temperatura', cooling: 'Enfriando a {t}', unavailable: 'No disponible', now: 'Ahora {t}',
    m_off: 'Apagado', m_heat: 'Calentar', m_auto: 'Horario', schedule: 'Horario', colder: 'Más frío', warmer: 'Más calor',
    comfort: 'Confort', eco: 'Ahorro', on: 'Activo', sched_off: 'Horario desactivado', comfort_until: 'Confort hasta las {t}, luego {e}', eco_until: 'Ahorro hasta las {t}, luego {c}', eco_all: 'Hoy sin bloques de confort',
    days: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'], days_long: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    until: 'a', add_block: '+ Añadir bloque', remove: 'Eliminar', copy_week: 'Copiar a días laborables', copy_weekend: 'Copiar al fin de semana', saved: 'Guardado', saving: 'Guardando…',
    setup_title: 'Horario aún no configurado', setup_text: 'La tarjeta crea en Home Assistant un horario, dos temperaturas (confort y ahorro), un interruptor «horario activo» y una automatización. El horario funciona aunque la tableta esté apagada.', setup_btn: 'Configurar horario', setup_busy: 'Configurando…', setup_err: 'No ha funcionado: {e}. Hace falta una cuenta de administrador.',
    err: 'Indica en "entity" un termostato (climate).',
    l_entity: 'Termostato', l_name: 'Nombre', l_schedule: 'Horario (vacío = automático)', l_comfort: 'Temperatura confort (input_number)', l_eco: 'Temperatura ahorro (input_number)', l_active: 'Horario activo (input_boolean)', l_humidity: 'Sensor de humedad (opcional)', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    l_layout: 'Vista', lay_full: 'Grande, con el horario', lay_compact: 'Pequeña, horario en un popup',
    description: 'Termostato con dial y horario semanal de confort/ahorro.',
  },
  it: {
    off: 'Spento', heating: 'Riscalda a {t}', idle: 'In temperatura', cooling: 'Raffredda a {t}', unavailable: 'Non disponibile', now: 'Ora {t}',
    m_off: 'Spento', m_heat: 'Riscalda', m_auto: 'Programma', schedule: 'Programma', colder: 'Più freddo', warmer: 'Più caldo',
    comfort: 'Comfort', eco: 'Eco', on: 'Attivo', sched_off: 'Programma spento', comfort_until: 'Comfort fino alle {t}, poi {e}', eco_until: 'Eco fino alle {t}, poi {c}', eco_all: 'Oggi nessun blocco comfort',
    days: ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'], days_long: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
    until: 'a', add_block: '+ Aggiungi blocco', remove: 'Rimuovi', copy_week: 'Copia sui giorni feriali', copy_weekend: 'Copia sul weekend', saved: 'Salvato', saving: 'Salvataggio…',
    setup_title: 'Programma non ancora configurato', setup_text: 'La scheda crea in Home Assistant un programma, due temperature (comfort ed eco), un interruttore «programma attivo» e un\'automazione. Il programma funziona anche a tablet spento.', setup_btn: 'Configura programma', setup_busy: 'Configurazione…', setup_err: 'Non è riuscito: {e}. Serve un account amministratore.',
    err: 'Indica in "entity" un termostato (climate).',
    l_entity: 'Termostato', l_name: 'Nome', l_schedule: 'Programma (vuoto = automatico)', l_comfort: 'Temperatura comfort (input_number)', l_eco: 'Temperatura eco (input_number)', l_active: 'Programma attivo (input_boolean)', l_humidity: 'Sensore di umidità (opzionale)', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    l_layout: 'Vista', lay_full: 'Grande, con il programma', lay_compact: 'Piccola, programma in un popup',
    description: 'Termostato con manopola e programma settimanale comfort/eco.',
  },
};
const GTH_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };

function gthLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GTH_I18N[l] ? l : 'en';
}
function gthT(lang, key, vars) {
  let s = (GTH_I18N[lang] && GTH_I18N[lang][key]) || GTH_I18N.en[key] || key;
  if (vars && typeof s === 'string') Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gthEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const GTH_DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const GTH_HEAT = '255, 184, 153';
const GTH_CALM = '185, 168, 255';
const GTH_COOL = '142, 197, 255';
const GTH_OFF = '201, 196, 221';
const GTH_INK = (v) => `color-mix(in srgb, rgb(var(${v})), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%))`;
const GTH_LINE = 'var(--glow-border, rgba(255, 255, 255, 0.1))';
const GTH_CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';

// "06:30:00" → 6.5 ; 6.5 → "06:30:00"
const gthH = (s) => { const p = String(s || '0:0').split(':').map((x) => parseInt(x, 10) || 0); return p[0] + p[1] / 60; };
const gthS = (h) => String(Math.floor(h)).padStart(2, '0') + ':' + String(Math.round((h % 1) * 60)).padStart(2, '0') + ':00';
const gthHM = (h) => String(Math.floor(h)).padStart(2, '0') + ':' + String(Math.round((h % 1) * 60)).padStart(2, '0');

const GTH_SCHED_STYLE = `
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .top { display: flex; align-items: center; gap: 12px; }
  .top .t { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .top .n { font-size: 22px; font-weight: 800; }
  .top .s { font-size: 14px; font-weight: 700; opacity: 0.65; }
  .top .s.on { opacity: 1; color: color-mix(in srgb, rgb(${GTH_HEAT}), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .tog { height: 40px; padding: 0 18px; border-radius: 20px; font-size: 14px; font-weight: 800; border: 0; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .tog.on { color: #1C1730; background: rgb(${GTH_HEAT}); box-shadow: 0 0 var(--glow) rgba(${GTH_HEAT}, 0.5); }
  .x { width: 40px; height: 40px; border-radius: 20px; font-size: 18px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GTH_LINE}; }
  .temps { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .tb { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 18px; background: rgba(var(--k), 0.12); border: 1px solid rgba(var(--k), 0.4); }
  .tb .dot { width: 12px; height: 12px; border-radius: 6px; background: rgb(var(--k)); box-shadow: 0 0 8px rgba(var(--k), 0.8); }
  .tb .l { flex: 1; font-size: 15px; font-weight: 800; }
  .tb .v { min-width: 54px; text-align: center; font-size: 18px; font-weight: 800; font-variant-numeric: tabular-nums; }
  .mini { width: 36px; height: 36px; border-radius: 12px; font-size: 18px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GTH_LINE}; flex-shrink: 0; }
  .mini:active { background: rgba(${GTH_HEAT}, 0.3); }
  .scale { display: flex; padding-left: 50px; justify-content: space-between; font-size: 11px; font-weight: 800; opacity: 0.55; }
  .week { display: flex; flex-direction: column; gap: 6px; }
  .day { display: flex; align-items: center; gap: 10px; padding: 4px 6px; border-radius: 12px; border: 1px solid transparent; background: transparent; }
  .day.sel { border-color: rgba(${GTH_HEAT}, 0.5); background: rgba(${GTH_HEAT}, 0.08); }
  .day .dn { width: 34px; text-align: left; font-size: 14px; font-weight: 800; }
  .bar { position: relative; flex: 1; height: 22px; border-radius: 8px; overflow: hidden; background: rgba(${GTH_COOL}, 0.22); }
  .bar i { position: absolute; top: 0; bottom: 0; border-radius: 6px; background: rgb(${GTH_HEAT}); opacity: 0.9; box-shadow: 0 0 8px rgba(${GTH_HEAT}, 0.5); }
  .bar b { position: absolute; top: -2px; bottom: -2px; width: 2px; background: var(--glow-text, #F3F1FA); }
  .inactive .bar { background: rgba(${GTH_COOL}, 0.1); }
  .inactive .bar i { opacity: 0.35; }
  .edit { display: flex; flex-direction: column; gap: 10px; padding: 14px; border-radius: 20px; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .eh { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; }
  .eh .dn { font-size: 16px; font-weight: 800; }
  .link { height: 32px; padding: 0 12px; border-radius: 16px; font-size: 13px; font-weight: 800; background: transparent; border: 1px solid rgba(${GTH_HEAT}, 0.45); color: color-mix(in srgb, rgb(${GTH_HEAT}), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .blk { display: flex; align-items: center; gap: 8px; }
  .blk .tm { min-width: 52px; text-align: center; font-size: 17px; font-weight: 800; font-variant-numeric: tabular-nums; }
  .blk .to { opacity: 0.55; font-weight: 800; }
  .blk .gap { flex: 1; }
  .add { height: 42px; border-radius: 16px; font-size: 14px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px dashed ${GTH_LINE}; }
  .msg { font-size: 13px; font-weight: 700; opacity: 0.6; text-align: right; min-height: 18px; }
  .setup { display: flex; flex-direction: column; gap: 14px; }
  .setup p { margin: 0; font-size: 15px; line-height: 1.45; opacity: 0.8; }
  .go { height: 52px; border-radius: 26px; font-size: 16px; font-weight: 800; color: #1C1730; background: rgb(${GTH_HEAT}); border: 0; box-shadow: 0 0 var(--glow) rgba(${GTH_HEAT}, 0.5); }
  .go[disabled] { opacity: 0.6; }
  .err { font-size: 14px; font-weight: 700; color: #FF8F8F; }
`;

const GTH_STYLE = `
  :host { display: block; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px; padding: 18px; container-type: inline-size;
    border-radius: var(--ha-card-border-radius, 24px); user-select: none; -webkit-user-select: none;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.3); box-shadow: 0 0 calc(var(--glow) * 0.4) rgba(var(--c), 0.15);
    transition: border-color 0.4s, box-shadow 0.4s;
  }
  ha-card.hot { border-color: rgba(var(--c), 0.55); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.35); }
  .halo { position: absolute; right: -60px; top: -70px; width: 200px; height: 200px; border-radius: 50%; filter: blur(55px); background: rgb(var(--c)); opacity: 0.12; transition: background 0.4s, opacity 0.4s; pointer-events: none; }
  ha-card.hot .halo { opacity: 0.35; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .head { position: relative; display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
  .ht { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .ht .n { font-size: 20px; font-weight: 800; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; }
  .ht .s { font-size: 15px; font-weight: 800; color: ${GTH_INK('--c')}; }
  ha-card.off .ht .s { color: inherit; opacity: 0.65; }
  .sbtn { height: 36px; padding: 0 12px; border-radius: 18px; display: flex; align-items: center; gap: 6px; flex-shrink: 0; font-size: 13px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GTH_LINE}; }
  .sbtn svg { width: 16px; height: 16px; }
  .dial { position: relative; align-self: center; width: 240px; height: 220px; touch-action: none; }
  .dial svg { position: absolute; left: 0; top: 0; width: 240px; height: 240px; overflow: visible; }
  .dial .track { stroke: ${GTH_LINE}; }
  .dial .arc { filter: drop-shadow(0 0 calc(var(--glow) * 0.5) rgba(var(--c), 0.6)); transition: opacity 0.3s; }
  ha-card.off .dial .arc { opacity: 0.25; }
  .dial .knob { fill: #FFFFFF; filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4)); cursor: grab; }
  .dial .cur { fill: var(--glow-text, #F3F1FA); }
  .mid { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding-top: 6px; pointer-events: none; }
  .big { font-size: 48px; font-weight: 800; line-height: 1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  ha-card.off .big { opacity: 0.6; }
  .now { font-size: 14px; font-weight: 700; opacity: 0.65; }
  .steps { position: relative; display: flex; justify-content: center; gap: 18px; margin-top: -10px; }
  .step { width: 56px; height: 56px; border-radius: 28px; font-size: 28px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GTH_LINE}; }
  .step:active { background: rgba(var(--c), 0.25); }
  .seg { position: relative; display: flex; gap: 4px; padding: 4px; border-radius: 19px; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .seg button { flex: 1; height: 42px; border-radius: 15px; border: 0; font-size: 14px; font-weight: 800; background: transparent; transition: background 0.3s, box-shadow 0.3s; }
  .seg button.sel { color: #1C1730; background: rgb(var(--c)); box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(var(--c), 0.6); }
  ha-card.full { padding: 22px; gap: 18px; }
  .cols { position: relative; display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 22px; align-items: start; }
  .lcol { display: flex; flex-direction: column; gap: 12px; }
  .rcol, .sbody { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
  ha-card.full .temps { grid-template-columns: minmax(0, 1fr); }
  ha-card.full .tb { padding: 14px 16px; }
  ha-card.full .tb .v { font-size: 22px; }
  .sbody { position: relative; }
  .sbody .day { padding: 6px; }
  .sbody .bar { height: 28px; }
  .rcol .x, .sbody .x { display: none; }
  @container (max-width: 640px) { .cols { grid-template-columns: minmax(0, 1fr); } }
  @container (max-width: 480px) { .blk { flex-wrap: wrap; row-gap: 6px; } .blk .gap { display: none; } .sbody .bar { height: 24px; } }
  ${GTH_SCHED_STYLE}
  .seg button.sel.offsel { color: inherit; background: color-mix(in srgb, var(--glow-text, #F3F1FA) 16%, transparent); box-shadow: none; }
`;


const GTH_POP_STYLE = `
  :host { all: initial; }
  .backdrop { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;
    background: rgba(8, 6, 16, 0.55); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    font-family: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif); animation: gth-fade 0.2s ease-out; }
  .panel { width: 100%; max-width: 640px; max-height: calc(100vh - 40px); overflow-y: auto; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; padding: 22px; border-radius: 28px;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(${GTH_HEAT}, 0.45); box-shadow: 0 0 50px rgba(${GTH_HEAT}, 0.2), 0 20px 50px rgba(0, 0, 0, 0.4); animation: gth-pop 0.25s cubic-bezier(.2, .9, .3, 1.2); }
${GTH_SCHED_STYLE}
  @media (max-width: 520px) { .temps { grid-template-columns: 1fr; } .blk { flex-wrap: wrap; } }
  .sched { display: flex; flex-direction: column; gap: 16px; }
  @keyframes gth-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes gth-pop { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: none; } }
`;
const GTH_THEME_VARS = ['--glow-card-background', '--glow-text', '--glow-surface', '--glow-border', '--glow-ink-amount', '--paper-font-body1_-_font-family'];

class GlowThermostatCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._built = false;
    this._pending = null;
  }

  static getConfigElement() { return document.createElement('glow-thermostat-card-editor'); }
  static getStubConfig(hass) {
    const c = Object.keys((hass && hass.states) || {}).find((e) => e.startsWith('climate.'));
    return { entity: c || '' };
  }

  setConfig(config) {
    if (!config || !config.entity) throw new Error(gthT(gthLang(this._hass, config && config.language), 'err'));
    this._config = { glow: 15, ...config };
    this._built = false;
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    this._render();
    if (this._pop) this._renderPopup();
  }
  get hass() { return this._hass; }

  getCardSize() { return this._config && this._config.layout === 'compact' ? 6 : 12; }
  getGridOptions() { return this._config && this._config.layout === 'compact' ? { columns: 6, rows: 'auto', min_columns: 6 } : { columns: 'full', rows: 'auto', min_columns: 6 }; }
  disconnectedCallback() { this._closePopup(); }

  _lang() { return gthLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gthT(this._lang(), k, v); }
  _fmt(v) {
    if (typeof v !== 'number' || isNaN(v)) return '–';
    try { return v.toLocaleString(this._lang(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '°'; } catch (e) { return v.toFixed(1) + '°'; }
  }

  /* ---- helpers van het schema: standaardnamen afgeleid van de thermostaat ---- */

  _ids() {
    const c = this._config;
    const obj = c.entity.split('.')[1];
    return {
      schedule: c.schedule || 'schedule.' + obj + '_schema',
      comfort: c.comfort || 'input_number.' + obj + '_comfort',
      eco: c.eco || 'input_number.' + obj + '_spaarstand',
      active: c.active || 'input_boolean.' + obj + '_schema_actief',
    };
  }
  _hasSchedule() { const i = this._ids(); const st = this._hass.states; return !!(st[i.schedule] && st[i.comfort] && st[i.eco] && st[i.active]); }
  _num(id) { const s = this._hass.states[id]; const v = s ? parseFloat(s.state) : NaN; return isNaN(v) ? null : v; }

  /* ---- kaart ---- */

  _full() { return this._config.layout !== 'compact'; }

  _build() {
    const full = this._full();
    const dial = `
          <div class="head">
            <div class="ht"><span class="n"></span><span class="s"></span></div>
            ${full ? '' : `<button class="sbtn" type="button">${GTH_CAL}<span></span></button>`}
          </div>
          <div class="dial">
            <svg viewBox="0 0 240 240" aria-hidden="true">
              <defs><linearGradient id="gth-arc" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#8EC5FF"/><stop offset="55%" stop-color="#FFE08A"/><stop offset="100%" stop-color="#FFB899"/></linearGradient></defs>
              <path class="track" fill="none" stroke-width="14" stroke-linecap="round"/>
              <path class="arc" fill="none" stroke="url(#gth-arc)" stroke-width="14" stroke-linecap="round"/>
              <circle class="cur" r="4"/>
              <circle class="knob" r="13"/>
            </svg>
            <div class="mid"><span class="big"></span><span class="now"></span></div>
          </div>
          <div class="steps">
            <button class="step" type="button" data-d="-1"></button>
            <button class="step" type="button" data-d="1"></button>
          </div>
          <div class="seg"></div>`;
    this.shadowRoot.innerHTML = `
      <style>${GTH_STYLE}</style>
      <ha-card class="${full ? 'full' : ''}">
        <div class="halo"></div>
        ${full ? `<div class="cols"><div class="lcol">${dial}</div><div class="rcol"></div></div><div class="sbody"></div>` : dial}
      </ha-card>`;
    const r = this.shadowRoot;
    this._card = r.querySelector('ha-card');
    const steps = r.querySelectorAll('.step');
    steps[0].textContent = '−'; steps[0].setAttribute('aria-label', this._t('colder'));
    steps[1].textContent = '+'; steps[1].setAttribute('aria-label', this._t('warmer'));
    steps.forEach((b) => b.addEventListener('click', () => this._nudge(+b.dataset.d)));
    if (r.querySelector('.sbtn')) {
      r.querySelector('.sbtn span').textContent = this._t('schedule');
      r.querySelector('.sbtn').addEventListener('click', () => this._openPopup());
    } else {
      // schema in de kaart zelf
      r.querySelectorAll('.rcol, .sbody').forEach((el) => el.addEventListener('click', (e) => this._popClick(e)));
      this._day = (new Date().getDay() + 6) % 7;
      this._week = null;
    }
    r.querySelector('.ht .n').addEventListener('click', () => this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._config.entity }, bubbles: true, composed: true })));
    r.querySelector('.seg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) this._setMode(b.dataset.m); });
    this._bindDial(r.querySelector('.dial'));
    this._built = true;
    this._builtLang = this._lang();
    this._segKey = null;
    this._popKey = null;
  }

  _range() {
    const a = this._hass.states[this._config.entity].attributes;
    return { min: typeof a.min_temp === 'number' ? a.min_temp : 7, max: typeof a.max_temp === 'number' ? a.max_temp : 30, step: a.target_temp_step || 0.5 };
  }
  _target() {
    if (this._pending !== null) return this._pending;
    const a = this._hass.states[this._config.entity].attributes;
    return typeof a.temperature === 'number' ? a.temperature : null;
  }

  // temperatuur pas na een korte pauze versturen, zodat snel tikken één opdracht wordt
  _setTarget(v) {
    const { min, max, step } = this._range();
    v = Math.round(Math.max(min, Math.min(max, v)) / step) * step;
    this._pending = v;
    this._render();
    clearTimeout(this._sendTimer);
    this._sendTimer = setTimeout(() => {
      this._hass.callService('climate', 'set_temperature', { entity_id: this._config.entity, temperature: v });
      setTimeout(() => { this._pending = null; this._render(); }, 2500);
    }, 800);
  }
  _nudge(d) {
    const t = this._target();
    if (t === null) return;
    this._setTarget(t + d * this._range().step);
  }

  _bindDial(el) {
    const angleTo = (e) => {
      const r = el.querySelector('svg').getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      let a = Math.atan2(y, x) * 180 / Math.PI; // -180..180, 0 = rechts
      a = (a - 135 + 360) % 360; // 0 = begin van de boog
      if (a > 270) a = a > 315 ? 0 : 270;
      const { min, max } = this._range();
      return min + (a / 270) * (max - min);
    };
    let active = false;
    el.addEventListener('pointerdown', (e) => {
      const s = this._hass.states[this._config.entity];
      if (!s || s.state === 'off' || s.state === 'unavailable') return;
      active = true;
      try { el.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      this._setTarget(angleTo(e));
    });
    el.addEventListener('pointermove', (e) => { if (active) this._setTarget(angleTo(e)); });
    const end = () => { active = false; };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  _heatMode() {
    const modes = this._hass.states[this._config.entity].attributes.hvac_modes || ['heat'];
    return modes.includes('heat') ? 'heat' : (modes.find((m) => m !== 'off') || 'heat');
  }

  _schedOn() {
    const i = this._ids();
    return this._hasSchedule() && this._hass.states[i.active].state === 'on';
  }

  _setMode(m) {
    const id = this._config.entity;
    const i = this._ids();
    if (m === 'off') {
      if (this._hasSchedule()) this._hass.callService('input_boolean', 'turn_off', { entity_id: i.active });
      this._hass.callService('climate', 'set_hvac_mode', { entity_id: id, hvac_mode: 'off' });
    } else if (m === 'heat') {
      if (this._hasSchedule()) this._hass.callService('input_boolean', 'turn_off', { entity_id: i.active });
      this._hass.callService('climate', 'set_hvac_mode', { entity_id: id, hvac_mode: this._heatMode() });
    } else if (m === 'auto') {
      if (!this._hasSchedule()) { if (!this._full()) this._openPopup(); return; }
      this._hass.callService('climate', 'set_hvac_mode', { entity_id: id, hvac_mode: this._heatMode() });
      this._hass.callService('input_boolean', 'turn_on', { entity_id: i.active });
    }
  }

  _render() {
    if (!this._built || this._builtLang !== this._lang()) this._build();
    const c = this._config;
    const s = this._hass.states[c.entity];
    const r = this.shadowRoot;
    const una = !s || s.state === 'unavailable';
    const off = !una && s.state === 'off';
    const a = (s && s.attributes) || {};
    const action = a.hvac_action;
    const heating = !off && !una && (action === 'heating' || action === 'preheating');
    const cooling = !off && !una && action === 'cooling';
    const col = una || off ? GTH_OFF : heating ? GTH_HEAT : cooling ? GTH_COOL : GTH_CALM;
    this._card.style.setProperty('--c', col);
    this._card.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');
    this._card.classList.toggle('hot', heating || cooling);
    this._card.classList.toggle('off', off || una);
    const target = una ? null : this._target();
    const sched = !una && !off && this._schedOn();
    r.querySelector('.ht .n').textContent = c.name || a.friendly_name || c.entity;
    let st;
    if (una) st = this._t('unavailable');
    else if (off) st = this._t('off');
    else if (heating) st = this._t('heating', { t: this._fmt(target) });
    else if (cooling) st = this._t('cooling', { t: this._fmt(target) });
    else st = this._t('idle');
    if (sched) st += ' · ' + this._t('schedule').toLowerCase();
    r.querySelector('.ht .s').textContent = st;

    // draaiknop
    const { min, max } = una ? { min: 7, max: 30 } : this._range();
    const cx = 120, cy = 120, rad = 96;
    const ang = (v) => (135 + (Math.max(min, Math.min(max, v)) - min) / (max - min) * 270) * Math.PI / 180;
    const pt = (an) => [cx + rad * Math.cos(an), cy + rad * Math.sin(an)];
    const arc = (a0, a1) => { const [x0, y0] = pt(a0); const [x1, y1] = pt(a1); return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${rad} ${rad} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`; };
    const a0 = 135 * Math.PI / 180;
    r.querySelector('.track').setAttribute('d', arc(a0, a0 + 1.5 * Math.PI));
    const tv = target === null ? min : target;
    r.querySelector('.arc').setAttribute('d', arc(a0, Math.max(a0 + 0.01, ang(tv))));
    const [kx, ky] = pt(ang(tv));
    const knob = r.querySelector('.knob');
    knob.setAttribute('cx', kx.toFixed(1)); knob.setAttribute('cy', ky.toFixed(1));
    knob.style.opacity = off || una ? 0.35 : 1;
    const cur = typeof a.current_temperature === 'number' ? a.current_temperature : null;
    const curDot = r.querySelector('.cur');
    if (cur !== null) { const [ux, uy] = pt(ang(cur)); curDot.setAttribute('cx', ux.toFixed(1)); curDot.setAttribute('cy', uy.toFixed(1)); curDot.style.display = ''; } else curDot.style.display = 'none';
    r.querySelector('.big').textContent = off ? this._t('off') : this._fmt(target);
    let hum = typeof a.current_humidity === 'number' ? a.current_humidity : null;
    if (c.humidity && this._hass.states[c.humidity]) { const h = parseFloat(this._hass.states[c.humidity].state); if (!isNaN(h)) hum = h; }
    r.querySelector('.now').textContent = cur === null ? '' : this._t('now', { t: this._fmt(cur) }) + (hum !== null ? ' · ' + Math.round(hum) + '%' : '');

    // standen
    const mode = una ? '' : off ? 'off' : sched ? 'auto' : 'heat';
    const seg = ['off', 'heat', 'auto'].map((m) => `<button type="button" data-m="${m}" class="${mode === m ? 'sel' + (m === 'off' ? ' offsel' : '') : ''}">${gthEsc(this._t('m_' + m))}</button>`).join('');
    if (seg !== this._segKey) { this._segKey = seg; r.querySelector('.seg').innerHTML = seg; }
    if (this._full() && !una) this._renderPopup();
  }

  /* ---- schemapopup ---- */

  _openPopup() {
    if (this._pop) return;
    const host = document.createElement('div');
    host.className = 'glow-thermostat-popup';
    const root = host.attachShadow({ mode: 'open' });
    const cs = getComputedStyle(this);
    GTH_THEME_VARS.forEach((v) => { const val = cs.getPropertyValue(v); if (val) host.style.setProperty(v, val.trim()); });
    host.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');
    root.innerHTML = `<style>${GTH_POP_STYLE}</style><div class="backdrop"><div class="panel" role="dialog" aria-modal="true"></div></div>`;
    document.body.appendChild(host);
    this._pop = host;
    this._week = null;
    this._day = (new Date().getDay() + 6) % 7;
    root.querySelector('.backdrop').addEventListener('pointerdown', (e) => { if (e.target.classList.contains('backdrop')) this._closePopup(); });
    root.querySelector('.panel').addEventListener('click', (e) => this._popClick(e));
    this._onKey = (e) => { if (e.key === 'Escape') this._closePopup(); };
    document.addEventListener('keydown', this._onKey);
    this._renderPopup(true);
  }

  _closePopup() {
    if (this._saveTimer) { clearTimeout(this._saveTimer); this._saveWeek(); }
    if (this._onKey) document.removeEventListener('keydown', this._onKey);
    if (this._pop) this._pop.remove();
    this._pop = null;
  }

  // het schema uit Home Assistant halen
  async _loadWeek() {
    try {
      const reg = await this._hass.callWS({ type: 'config/entity_registry/get', entity_id: this._ids().schedule });
      const list = await this._hass.callWS({ type: 'schedule/list' });
      const item = list.find((x) => x.id === reg.unique_id);
      if (!item) throw new Error('schedule not found');
      this._schedItem = item;
      this._week = GTH_DAYS.map((d) => (item[d] || []).map((b) => [gthH(b.from), gthH(b.to) || 24]).sort((x, y) => x[0] - y[0]));
    } catch (e) {
      this._error = e && e.message ? e.message : String(e);
      this._week = GTH_DAYS.map(() => []);
    }
    this._renderPopup(true);
  }

  // blokken sorteren, overlappingen samenvoegen
  _clean(blocks) {
    const out = [];
    blocks.map((b) => [Math.max(0, Math.min(24, b[0])), Math.max(0, Math.min(24, b[1]))]).filter((b) => b[1] > b[0]).sort((x, y) => x[0] - y[0]).forEach((b) => {
      const last = out[out.length - 1];
      if (last && b[0] <= last[1]) last[1] = Math.max(last[1], b[1]);
      else out.push(b.slice());
    });
    return out;
  }

  _queueSave() {
    this._msg = this._t('saving');
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this._saveWeek(), 1200);
  }

  async _saveWeek() {
    this._saveTimer = null;
    if (!this._schedItem || !this._week) return;
    const data = { type: 'schedule/update', schedule_id: this._schedItem.id, name: this._schedItem.name };
    if (this._schedItem.icon) data.icon = this._schedItem.icon;
    GTH_DAYS.forEach((d, i) => { data[d] = this._clean(this._week[i]).map((b) => ({ from: gthS(b[0]), to: b[1] >= 24 ? '24:00:00' : gthS(b[1]) })); });
    try {
      await this._hass.callWS(data);
      this._msg = this._t('saved');
    } catch (e) {
      this._msg = '';
      this._error = e && e.message ? e.message : String(e);
    }
    if (this._pop || this._full()) this._renderPopup(true);
  }

  _popClick(e) {
    const b = e.target.closest('button');
    if (!b) return;
    const act = b.dataset.a;
    const i = this._ids();
    const d = this._day;
    if (act === 'close') { this._closePopup(); return; }
    if (act === 'setup') { this._setup(); return; }
    if (act === 'toggle') {
      const on = this._hass.states[i.active].state === 'on';
      if (!on) this._setMode('auto'); else this._hass.callService('input_boolean', 'turn_off', { entity_id: i.active });
      return;
    }
    if (act === 'temp') {
      const id = b.dataset.k === 'comfort' ? i.comfort : i.eco;
      const s = this._hass.states[id];
      const step = parseFloat(s.attributes.step) || 0.5;
      const v = Math.max(s.attributes.min ?? 5, Math.min(s.attributes.max ?? 30, (this._num(id) || 0) + (+b.dataset.d) * step));
      this._hass.callService('input_number', 'set_value', { entity_id: id, value: v });
      return;
    }
    if (act === 'day') { this._day = +b.dataset.i; this._renderPopup(true); return; }
    if (!this._week) return;
    if (act === 'mv') {
      const blk = this._week[d][+b.dataset.j];
      const k = +b.dataset.k;
      blk[k] = Math.max(0, Math.min(24, blk[k] + (+b.dataset.d) * 0.5));
      if (blk[0] >= blk[1]) { if (k === 0) blk[0] = blk[1] - 0.5; else blk[1] = blk[0] + 0.5; }
    } else if (act === 'rm') this._week[d].splice(+b.dataset.j, 1);
    else if (act === 'add') {
      const last = this._week[d][this._week[d].length - 1];
      const f = last ? Math.min(22, last[1] + 1) : 7;
      this._week[d].push([f, Math.min(24, f + 2)]);
    } else if (act === 'copy') {
      const src = this._clean(this._week[d]);
      (d < 5 ? [0, 1, 2, 3, 4] : [5, 6]).forEach((k) => { this._week[k] = src.map((x) => x.slice()); });
    } else return;
    this._queueSave();
    this._renderPopup(true);
  }

  // huidige toestand van het schema in één zin
  _schedText() {
    const i = this._ids();
    if (this._hass.states[i.active].state !== 'on') return { text: this._t('sched_off'), on: false };
    const now = new Date();
    const h = now.getHours() + now.getMinutes() / 60;
    const blocks = this._week ? this._clean(this._week[(now.getDay() + 6) % 7]) : [];
    const c = this._fmt(this._num(i.comfort));
    const e = this._fmt(this._num(i.eco));
    const inB = blocks.find((b) => h >= b[0] && h < b[1]);
    if (inB) return { text: this._t('comfort_until', { t: gthHM(inB[1] % 24), e }), on: true };
    const next = blocks.find((b) => b[0] > h);
    if (next) return { text: this._t('eco_until', { t: gthHM(next[0]), c }), on: true };
    return { text: this._t('eco_all'), on: true };
  }

  _renderPopup(force) {
    let panel;
    let body = null;
    if (this._full()) {
      if (!this._built) return;
      panel = this.shadowRoot.querySelector('.rcol');
      body = this.shadowRoot.querySelector('.sbody');
    } else {
      const root = this._pop && this._pop.shadowRoot;
      if (!root) return;
      panel = root.querySelector('.panel');
    }
    const name = this._config.name || (this._hass.states[this._config.entity] || { attributes: {} }).attributes.friendly_name || '';
    const close = '<button class="x" type="button" data-a="close" aria-label="×">✕</button>';

    if (!this._hasSchedule()) {
      const html = `
        <div class="top"><div class="t"><span class="n">${gthEsc(this._t('schedule'))} · ${gthEsc(name)}</span></div>${close}</div>
        <div class="setup">
          <span class="n" style="font-size:18px;font-weight:800">${gthEsc(this._t('setup_title'))}</span>
          <p>${gthEsc(this._t('setup_text'))}</p>
          ${this._error ? `<span class="err">${gthEsc(this._t('setup_err', { e: this._error }))}</span>` : ''}
          <button class="go" type="button" data-a="setup"${this._busy ? ' disabled' : ''}>${gthEsc(this._t(this._busy ? 'setup_busy' : 'setup_btn'))}</button>
        </div>`;
      if (html !== this._popKey) { this._popKey = html; panel.innerHTML = html; if (body) body.innerHTML = ''; }
      return;
    }
    if (!this._week && !this._loadingWeek) { this._loadingWeek = true; this._loadWeek().finally(() => { this._loadingWeek = false; }); }

    const i = this._ids();
    const st = this._schedText();
    panel.classList.toggle('inactive', !st.on);
    if (body) body.classList.toggle('inactive', !st.on);
    const days = this._t('days');
    const long = this._t('days_long');
    const today = (new Date().getDay() + 6) % 7;
    const nowPct = ((new Date().getHours() + new Date().getMinutes() / 60) / 24 * 100).toFixed(2);
    const week = this._week || GTH_DAYS.map(() => []);
    const d = this._day;
    const temp = (k, col) => `<div class="tb" style="--k:${col}"><span class="dot"></span><span class="l">${gthEsc(this._t(k))}</span><button class="mini" type="button" data-a="temp" data-k="${k}" data-d="-1">−</button><span class="v">${gthEsc(this._fmt(this._num(k === 'comfort' ? i.comfort : i.eco)))}</span><button class="mini" type="button" data-a="temp" data-k="${k}" data-d="1">+</button></div>`;
    const head = `
      <div class="top">
        <div class="t"><span class="n">${gthEsc(this._t('schedule'))} · ${gthEsc(name)}</span><span class="s${st.on ? ' on' : ''}">${gthEsc(st.text)}</span></div>
        <button class="tog${st.on ? ' on' : ''}" type="button" data-a="toggle">${gthEsc(this._t(st.on ? 'on' : 'off'))}</button>
        ${close}
      </div>
      <div class="temps">${temp('comfort', GTH_HEAT)}${temp('eco', GTH_COOL)}</div>`;
    const rest = `
      <div class="week">
        <div class="scale"><span>0</span><span>6</span><span>12</span><span>18</span><span>24</span></div>
        ${week.map((blocks, k) => `<button class="day${k === d ? ' sel' : ''}" type="button" data-a="day" data-i="${k}"><span class="dn">${gthEsc(days[k])}</span><span class="bar">${this._clean(blocks).map((b) => `<i style="left:${(b[0] / 24 * 100).toFixed(2)}%;width:${((b[1] - b[0]) / 24 * 100).toFixed(2)}%"></i>`).join('')}${k === today ? `<b style="left:${nowPct}%"></b>` : ''}</span></button>`).join('')}
      </div>
      <div class="edit">
        <div class="eh"><span class="dn">${gthEsc(long[d])} · ${gthEsc(this._t('comfort').toLowerCase())}</span><button class="link" type="button" data-a="copy">${gthEsc(this._t(d < 5 ? 'copy_week' : 'copy_weekend'))}</button></div>
        ${week[d].map((b, j) => `<div class="blk">
          <button class="mini" type="button" data-a="mv" data-j="${j}" data-k="0" data-d="-1">−</button><span class="tm">${gthHM(b[0])}</span><button class="mini" type="button" data-a="mv" data-j="${j}" data-k="0" data-d="1">+</button>
          <span class="to">${gthEsc(this._t('until'))}</span>
          <button class="mini" type="button" data-a="mv" data-j="${j}" data-k="1" data-d="-1">−</button><span class="tm">${gthHM(b[1])}</span><button class="mini" type="button" data-a="mv" data-j="${j}" data-k="1" data-d="1">+</button>
          <span class="gap"></span><button class="mini" type="button" data-a="rm" data-j="${j}" aria-label="${gthEsc(this._t('remove'))}">✕</button></div>`).join('')}
        <button class="add" type="button" data-a="add">${gthEsc(this._t('add_block'))}</button>
      </div>
      <span class="msg">${gthEsc(this._error || this._msg || '')}</span>`;
    const html = body ? head + '\u0000' + rest : head + rest;
    if (force || html !== this._popKey) {
      this._popKey = html;
      if (body) { panel.innerHTML = head; body.innerHTML = rest; } else panel.innerHTML = head + rest;
    }
  }

  /* ---- eenmalig instellen ---- */

  async _setup() {
    if (this._busy) return;
    this._busy = true;
    this._error = null;
    this._renderPopup(true);
    const ids = this._ids();
    const obj = this._config.entity.split('.')[1];
    const base = obj.replace(/_/g, ' ');
    const st = this._hass.states;
    const ws = (m) => this._hass.callWS(m);
    try {
      const a = st[this._config.entity].attributes;
      const cur = typeof a.temperature === 'number' ? a.temperature : 20;
      // namen zo kiezen dat Home Assistant de verwachte entiteit-id's maakt
      if (!st[ids.schedule]) {
        const week = {};
        GTH_DAYS.forEach((d, i) => { week[d] = i < 5 ? [{ from: '06:30:00', to: '08:00:00' }, { from: '17:00:00', to: '22:30:00' }] : [{ from: '08:00:00', to: '23:00:00' }]; });
        await ws({ type: 'schedule/create', name: base + ' schema', icon: 'mdi:calendar-clock', ...week });
      }
      if (!st[ids.comfort]) await ws({ type: 'input_number/create', name: base + ' comfort', min: 5, max: 30, step: 0.5, mode: 'box', unit_of_measurement: '°C', icon: 'mdi:sofa', initial: Math.max(cur, 20.5) });
      if (!st[ids.eco]) await ws({ type: 'input_number/create', name: base + ' spaarstand', min: 5, max: 30, step: 0.5, mode: 'box', unit_of_measurement: '°C', icon: 'mdi:leaf', initial: 17 });
      if (!st[ids.active]) await ws({ type: 'input_boolean/create', name: base + ' schema actief', icon: 'mdi:calendar-check' });
      const autoId = 'glow_thermostat_' + obj;
      const tpl = "{{ states('" + ids.comfort + "') | float(20) if is_state('" + ids.schedule + "', 'on') else states('" + ids.eco + "') | float(17) }}";
      await this._hass.callApi('POST', 'config/automation/config/' + autoId, {
        id: autoId,
        alias: 'Glow thermostaat schema (' + this._config.entity + ')',
        description: 'Aangemaakt door de Glow Thermostat Card: zet de comfort- of spaartemperatuur volgens het schema.',
        mode: 'restart',
        triggers: [
          { trigger: 'state', entity_id: ids.schedule },
          { trigger: 'state', entity_id: [ids.comfort, ids.eco] },
          { trigger: 'state', entity_id: ids.active, to: 'on' },
          { trigger: 'homeassistant', event: 'start' },
        ],
        conditions: [
          { condition: 'state', entity_id: ids.active, state: 'on' },
          { condition: 'not', conditions: [{ condition: 'state', entity_id: this._config.entity, state: 'off' }] },
        ],
        actions: [{ action: 'climate.set_temperature', target: { entity_id: this._config.entity }, data: { temperature: tpl } }],
      });
    } catch (e) {
      this._error = (e && (e.message || e.body && e.body.message)) || String(e);
    }
    this._busy = false;
    this._week = null;
    this._renderPopup(true);
  }
}

/* ---------------- editor ---------------- */

class GlowThermostatCardEditor extends HTMLElement {
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
    const lang = gthLang(this._hass, this._config.language);
    const t = (k) => gthT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gthT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.glow === 15) delete v.glow;
        if (v.layout === 'full') delete v.layout;
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      { name: 'entity', selector: { entity: { domain: 'climate' } } },
      { name: 'name', selector: { text: {} } },
      { name: 'humidity', selector: { entity: { domain: 'sensor', device_class: 'humidity' } } },
      { name: 'layout', selector: { select: { mode: 'dropdown', options: [{ value: 'full', label: t('lay_full') }, { value: 'compact', label: t('lay_compact') }] } } },
      { type: 'expandable', name: '', flatten: true, title: t('schedule'), schema: [
        { name: 'schedule', selector: { entity: { domain: 'schedule' } } },
        { name: 'comfort', selector: { entity: { domain: 'input_number' } } },
        { name: 'eco', selector: { entity: { domain: 'input_number' } } },
        { name: 'active', selector: { entity: { domain: 'input_boolean' } } },
      ] },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GTH_LANG_NAMES).map((k) => ({ value: k, label: GTH_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, layout: 'full', language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-thermostat-card')) customElements.define('glow-thermostat-card', GlowThermostatCard);
if (!customElements.get('glow-thermostat-card-editor')) customElements.define('glow-thermostat-card-editor', GlowThermostatCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-thermostat-card')) {
  window.customCards.push({
    type: 'glow-thermostat-card',
    name: 'Glow Thermostat Card',
    description: gthT(gthLang(null), 'description'),
    preview: true,
    documentationURL: 'https://github.com/stijnleroy/glow-cards',
  });
}
