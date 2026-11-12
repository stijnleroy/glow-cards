/*
 * Glow Battery Card
 * Thuisbatterij en omvormer in de Glow-stijl: een tegel met batterijpercentage,
 * werkmodus en grenzen, en een popup met alle instellingen (werkmodus, grenzen,
 * laden van het net, vermogen, piekbeperking, omvormer, winterregeling).
 * Herkent de entiteiten van Huawei Solar vanzelf; andere entiteiten kun je toevoegen.
 */

const GBAT_I18N = {
  nl: {
    title: 'Thuisbatterij', settings: 'Instellingen', unavailable: 'Niet beschikbaar',
    charging: 'laadt {p}', discharging: 'levert {p}', idle: 'rust',
    min: 'min', max: 'max', reserve: 'reserve',
    grid_on: 'Laden van net', winter_on: 'Winterregeling',
    confirm: 'Tik nog eens om te bevestigen', saving: 'wordt opgeslagen…', on: 'Aan', off: 'Uit',
    s_mode: 'Werkmodus', s_winter: 'Winterregeling', s_limits: 'Grenzen van de batterij', s_grid: 'Laden van het net',
    s_power: 'Vermogen', s_peak: 'Piekbeperking (capaciteitstarief)', s_inverter: 'Omvormer', s_actions: 'Nu', s_extra: 'Extra',
    k_eod: 'Minimum batterij', k_eoc: 'Maximum batterij', k_backup: 'Noodreserve', k_grid_charge: 'Laden van het net toestaan',
    k_grid_power: 'Maximaal laadvermogen van het net', k_grid_cutoff: 'Van het net laden tot', k_excess: 'Overschot zon in gebruikstijdmodus',
    k_max_charge: 'Maximaal laadvermogen', k_max_discharge: 'Maximaal ontlaadvermogen', k_cap_mode: 'Piekbeperking', k_peak_soc: 'Reserve voor pieken',
    k_inv_limit: 'Maximale teruglevering', k_inv_switch: 'Omvormer aan', k_stop_forcible: 'Geforceerd laden stoppen', k_winter: 'Winterregeling actief',
    k_charge_now: 'Nu laden tot {n} %',
    m_adaptive: 'Adaptief', m_fixed_charge_discharge: 'Vast laden/ontladen', m_maximise_self_consumption: 'Eigenverbruik',
    m_fully_fed_to_grid: 'Alles naar het net', m_time_of_use_luna2000: 'Gebruikstijd (TOU)', m_third_party_control: 'Externe sturing',
    h_maximise_self_consumption: 'Zon eerst naar het huis, overschot naar de batterij. De batterij levert zodra je meer verbruikt dan de zon opwekt.',
    h_time_of_use_luna2000: 'Laadt en ontlaadt volgens tijdsperiodes, bv. \'s nachts goedkoop laden in de winter.',
    h_adaptive: 'De omvormer kiest zelf op basis van je verbruikspatroon.',
    h_fixed_charge_discharge: 'Laadt en ontlaadt op vaste tijden met een vast vermogen.',
    h_fully_fed_to_grid: 'Alle zonnestroom gaat naar het net. Niet interessant met een laag injectietarief.',
    h_third_party_control: 'Een ander systeem stuurt de batterij aan.',
    o_fed_to_grid: 'Naar het net', o_charge: 'Batterij laden',
    o_disable: 'Uit', o_active_capacity_control: 'Aan', o_apparent_power_limit: 'Limiet schijnbaar vermogen',
    h_winter: 'Op weekdagen \'s nachts goedkoop bijladen, overdag en \'s avonds gebruiken. Gaat vanzelf aan en uit.',
    h_peak: 'Houdt een deel van de batterij vrij om pieken van het net af te vlakken.',
    err: 'Geen batterij gevonden. Vul "soc" in of voeg "sections" toe.',
    l_name: 'Naam', l_soc: 'Batterijpercentage', l_power: 'Laad/ontlaadvermogen (positief = laden)', l_invert: 'Teken omkeren',
    l_winter: 'Winterregeling (input_boolean, optioneel)', l_battery_device: 'Batterij-apparaat (voor "Nu laden", optioneel)', l_charge_targets: 'Knoppen "Nu laden tot" (%, gescheiden door komma\'s)',
    l_color: 'Kleur', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    ed_note: 'De instellingen van Huawei Solar worden vanzelf gevonden. Eigen secties en extra entiteiten voeg je toe in YAML (zie documentatie).',
    description: 'Thuisbatterij en omvormer: percentage, werkmodus en alle instellingen in een gloeiende popup.',
  },
  en: {
    title: 'Home battery', settings: 'Settings', unavailable: 'Unavailable',
    charging: 'charging {p}', discharging: 'supplying {p}', idle: 'idle',
    min: 'min', max: 'max', reserve: 'reserve',
    grid_on: 'Grid charging', winter_on: 'Winter mode',
    confirm: 'Tap again to confirm', saving: 'saving…', on: 'On', off: 'Off',
    s_mode: 'Working mode', s_winter: 'Winter mode', s_limits: 'Battery limits', s_grid: 'Charging from the grid',
    s_power: 'Power', s_peak: 'Peak shaving', s_inverter: 'Inverter', s_actions: 'Now', s_extra: 'Extra',
    k_eod: 'Minimum charge', k_eoc: 'Maximum charge', k_backup: 'Backup reserve', k_grid_charge: 'Allow charging from the grid',
    k_grid_power: 'Maximum grid charging power', k_grid_cutoff: 'Charge from the grid up to', k_excess: 'Excess solar in time-of-use mode',
    k_max_charge: 'Maximum charging power', k_max_discharge: 'Maximum discharging power', k_cap_mode: 'Peak shaving', k_peak_soc: 'Reserve for peaks',
    k_inv_limit: 'Maximum feed-in', k_inv_switch: 'Inverter on', k_stop_forcible: 'Stop forced charging', k_winter: 'Winter mode active',
    k_charge_now: 'Charge to {n} % now',
    m_adaptive: 'Adaptive', m_fixed_charge_discharge: 'Fixed charge/discharge', m_maximise_self_consumption: 'Self-consumption',
    m_fully_fed_to_grid: 'All to the grid', m_time_of_use_luna2000: 'Time of use (TOU)', m_third_party_control: 'Third-party control',
    h_maximise_self_consumption: 'Solar powers the house first, the surplus charges the battery. The battery supplies when you use more than the sun makes.',
    h_time_of_use_luna2000: 'Charges and discharges by time periods, e.g. cheap night charging in winter.',
    h_adaptive: 'The inverter decides based on your usage pattern.',
    h_fixed_charge_discharge: 'Charges and discharges at fixed times with fixed power.',
    h_fully_fed_to_grid: 'All solar goes to the grid.',
    h_third_party_control: 'Another system controls the battery.',
    o_fed_to_grid: 'To the grid', o_charge: 'Charge battery',
    o_disable: 'Off', o_active_capacity_control: 'On', o_apparent_power_limit: 'Apparent power limit',
    h_winter: 'Cheap night charging on weekdays, used during the day and evening. Switches on and off by itself.',
    h_peak: 'Keeps part of the battery free to shave peaks from the grid.',
    err: 'No battery found. Fill in "soc" or add "sections".',
    l_name: 'Name', l_soc: 'Battery level', l_power: 'Charge/discharge power (positive = charging)', l_invert: 'Invert sign',
    l_winter: 'Winter mode (input_boolean, optional)', l_battery_device: 'Battery device (for "Charge now", optional)', l_charge_targets: '"Charge to" buttons (%, comma separated)',
    l_color: 'Colour', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    ed_note: 'Huawei Solar settings are found automatically. Add your own sections and extra entities in YAML (see docs).',
    description: 'Home battery and inverter: level, working mode and all settings in a glowing popup.',
  },
  fr: {
    title: 'Batterie domestique', settings: 'Réglages', unavailable: 'Indisponible',
    charging: 'charge {p}', discharging: 'fournit {p}', idle: 'au repos',
    min: 'min', max: 'max', reserve: 'réserve',
    grid_on: 'Charge réseau', winter_on: 'Mode hiver',
    confirm: 'Touchez encore pour confirmer', saving: 'enregistrement…', on: 'Marche', off: 'Arrêt',
    s_mode: 'Mode de fonctionnement', s_winter: 'Mode hiver', s_limits: 'Limites de la batterie', s_grid: 'Charge depuis le réseau',
    s_power: 'Puissance', s_peak: 'Écrêtage des pointes', s_inverter: 'Onduleur', s_actions: 'Maintenant', s_extra: 'Extra',
    k_eod: 'Charge minimale', k_eoc: 'Charge maximale', k_backup: 'Réserve de secours', k_grid_charge: 'Autoriser la charge depuis le réseau',
    k_grid_power: 'Puissance max. de charge réseau', k_grid_cutoff: 'Charger depuis le réseau jusqu\'à', k_excess: 'Surplus solaire en mode heures',
    k_max_charge: 'Puissance de charge max.', k_max_discharge: 'Puissance de décharge max.', k_cap_mode: 'Écrêtage des pointes', k_peak_soc: 'Réserve pour les pointes',
    k_inv_limit: 'Injection maximale', k_inv_switch: 'Onduleur en marche', k_stop_forcible: 'Arrêter la charge forcée', k_winter: 'Mode hiver actif',
    k_charge_now: 'Charger à {n} % maintenant',
    m_adaptive: 'Adaptatif', m_fixed_charge_discharge: 'Charge/décharge fixe', m_maximise_self_consumption: 'Autoconsommation',
    m_fully_fed_to_grid: 'Tout vers le réseau', m_time_of_use_luna2000: 'Heures (TOU)', m_third_party_control: 'Contrôle externe',
    h_maximise_self_consumption: 'Le solaire alimente d\'abord la maison, le surplus charge la batterie. La batterie fournit dès que vous consommez plus que le soleil ne produit.',
    h_time_of_use_luna2000: 'Charge et décharge selon des plages horaires, p. ex. charge de nuit en hiver.',
    h_adaptive: 'L\'onduleur décide selon votre consommation.',
    h_fixed_charge_discharge: 'Charge et décharge à heures fixes avec une puissance fixe.',
    h_fully_fed_to_grid: 'Tout le solaire part vers le réseau.',
    h_third_party_control: 'Un autre système pilote la batterie.',
    o_fed_to_grid: 'Vers le réseau', o_charge: 'Charger la batterie',
    o_disable: 'Arrêt', o_active_capacity_control: 'Marche', o_apparent_power_limit: 'Limite de puissance apparente',
    h_winter: 'Charge de nuit bon marché en semaine, utilisée le jour et le soir. S\'active et se désactive tout seul.',
    h_peak: 'Garde une partie de la batterie libre pour écrêter les pointes du réseau.',
    err: 'Aucune batterie trouvée. Renseignez "soc" ou ajoutez "sections".',
    l_name: 'Nom', l_soc: 'Niveau de la batterie', l_power: 'Puissance charge/décharge (positif = charge)', l_invert: 'Inverser le signe',
    l_winter: 'Mode hiver (input_boolean, facultatif)', l_battery_device: 'Appareil batterie (pour « Charger », facultatif)', l_charge_targets: 'Boutons « Charger à » (%, séparés par des virgules)',
    l_color: 'Couleur', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    ed_note: 'Les réglages Huawei Solar sont trouvés automatiquement. Ajoutez vos sections et entités en YAML (voir la doc).',
    description: 'Batterie et onduleur : niveau, mode et tous les réglages dans un popup lumineux.',
  },
  de: {
    title: 'Hausbatterie', settings: 'Einstellungen', unavailable: 'Nicht verfügbar',
    charging: 'lädt {p}', discharging: 'liefert {p}', idle: 'Ruhe',
    min: 'min', max: 'max', reserve: 'Reserve',
    grid_on: 'Netzladen', winter_on: 'Wintermodus',
    confirm: 'Zum Bestätigen erneut tippen', saving: 'wird gespeichert…', on: 'An', off: 'Aus',
    s_mode: 'Betriebsmodus', s_winter: 'Wintermodus', s_limits: 'Grenzen der Batterie', s_grid: 'Laden aus dem Netz',
    s_power: 'Leistung', s_peak: 'Spitzenkappung', s_inverter: 'Wechselrichter', s_actions: 'Jetzt', s_extra: 'Extra',
    k_eod: 'Minimaler Ladestand', k_eoc: 'Maximaler Ladestand', k_backup: 'Notstromreserve', k_grid_charge: 'Laden aus dem Netz erlauben',
    k_grid_power: 'Max. Ladeleistung aus dem Netz', k_grid_cutoff: 'Aus dem Netz laden bis', k_excess: 'Solarüberschuss im Zeitmodus',
    k_max_charge: 'Max. Ladeleistung', k_max_discharge: 'Max. Entladeleistung', k_cap_mode: 'Spitzenkappung', k_peak_soc: 'Reserve für Spitzen',
    k_inv_limit: 'Max. Einspeisung', k_inv_switch: 'Wechselrichter an', k_stop_forcible: 'Zwangsladen stoppen', k_winter: 'Wintermodus aktiv',
    k_charge_now: 'Jetzt auf {n} % laden',
    m_adaptive: 'Adaptiv', m_fixed_charge_discharge: 'Fest laden/entladen', m_maximise_self_consumption: 'Eigenverbrauch',
    m_fully_fed_to_grid: 'Alles ins Netz', m_time_of_use_luna2000: 'Zeitsteuerung (TOU)', m_third_party_control: 'Fremdsteuerung',
    h_maximise_self_consumption: 'Solarstrom zuerst ins Haus, Überschuss in die Batterie. Die Batterie liefert, sobald du mehr verbrauchst als die Sonne erzeugt.',
    h_time_of_use_luna2000: 'Lädt und entlädt nach Zeitfenstern, z. B. günstig nachts im Winter.',
    h_adaptive: 'Der Wechselrichter entscheidet anhand deines Verbrauchs.',
    h_fixed_charge_discharge: 'Lädt und entlädt zu festen Zeiten mit fester Leistung.',
    h_fully_fed_to_grid: 'Der ganze Solarstrom geht ins Netz.',
    h_third_party_control: 'Ein anderes System steuert die Batterie.',
    o_fed_to_grid: 'Ins Netz', o_charge: 'Batterie laden',
    o_disable: 'Aus', o_active_capacity_control: 'An', o_apparent_power_limit: 'Scheinleistungsgrenze',
    h_winter: 'Werktags nachts günstig laden, tagsüber und abends nutzen. Schaltet sich selbst ein und aus.',
    h_peak: 'Hält einen Teil der Batterie frei, um Netzspitzen zu kappen.',
    err: 'Keine Batterie gefunden. Gib "soc" an oder füge "sections" hinzu.',
    l_name: 'Name', l_soc: 'Ladestand', l_power: 'Lade-/Entladeleistung (positiv = laden)', l_invert: 'Vorzeichen umkehren',
    l_winter: 'Wintermodus (input_boolean, optional)', l_battery_device: 'Batteriegerät (für „Jetzt laden“, optional)', l_charge_targets: 'Tasten „Laden auf“ (%, durch Kommas getrennt)',
    l_color: 'Farbe', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    ed_note: 'Huawei-Solar-Einstellungen werden automatisch gefunden. Eigene Abschnitte und Entitäten fügst du in YAML hinzu (siehe Doku).',
    description: 'Hausbatterie und Wechselrichter: Ladestand, Modus und alle Einstellungen in einem leuchtenden Popup.',
  },
  es: {
    title: 'Batería doméstica', settings: 'Ajustes', unavailable: 'No disponible',
    charging: 'cargando {p}', discharging: 'suministrando {p}', idle: 'en reposo',
    min: 'mín', max: 'máx', reserve: 'reserva',
    grid_on: 'Carga desde red', winter_on: 'Modo invierno',
    confirm: 'Toca otra vez para confirmar', saving: 'guardando…', on: 'Encendido', off: 'Apagado',
    s_mode: 'Modo de trabajo', s_winter: 'Modo invierno', s_limits: 'Límites de la batería', s_grid: 'Carga desde la red',
    s_power: 'Potencia', s_peak: 'Recorte de picos', s_inverter: 'Inversor', s_actions: 'Ahora', s_extra: 'Extra',
    k_eod: 'Carga mínima', k_eoc: 'Carga máxima', k_backup: 'Reserva de emergencia', k_grid_charge: 'Permitir carga desde la red',
    k_grid_power: 'Potencia máx. de carga desde la red', k_grid_cutoff: 'Cargar desde la red hasta', k_excess: 'Excedente solar en modo horario',
    k_max_charge: 'Potencia de carga máx.', k_max_discharge: 'Potencia de descarga máx.', k_cap_mode: 'Recorte de picos', k_peak_soc: 'Reserva para picos',
    k_inv_limit: 'Inyección máxima', k_inv_switch: 'Inversor encendido', k_stop_forcible: 'Detener carga forzada', k_winter: 'Modo invierno activo',
    k_charge_now: 'Cargar al {n} % ahora',
    m_adaptive: 'Adaptativo', m_fixed_charge_discharge: 'Carga/descarga fija', m_maximise_self_consumption: 'Autoconsumo',
    m_fully_fed_to_grid: 'Todo a la red', m_time_of_use_luna2000: 'Horario (TOU)', m_third_party_control: 'Control externo',
    h_maximise_self_consumption: 'El sol alimenta primero la casa y el excedente carga la batería. La batería suministra cuando consumes más de lo que produce el sol.',
    h_time_of_use_luna2000: 'Carga y descarga por franjas horarias, p. ej. carga nocturna en invierno.',
    h_adaptive: 'El inversor decide según tu consumo.',
    h_fixed_charge_discharge: 'Carga y descarga a horas fijas con potencia fija.',
    h_fully_fed_to_grid: 'Toda la energía solar va a la red.',
    h_third_party_control: 'Otro sistema controla la batería.',
    o_fed_to_grid: 'A la red', o_charge: 'Cargar batería',
    o_disable: 'Apagado', o_active_capacity_control: 'Encendido', o_apparent_power_limit: 'Límite de potencia aparente',
    h_winter: 'Carga nocturna barata entre semana, usada de día y por la tarde. Se activa y desactiva sola.',
    h_peak: 'Mantiene parte de la batería libre para recortar picos de la red.',
    err: 'No se encontró batería. Indica "soc" o añade "sections".',
    l_name: 'Nombre', l_soc: 'Nivel de batería', l_power: 'Potencia de carga/descarga (positivo = carga)', l_invert: 'Invertir signo',
    l_winter: 'Modo invierno (input_boolean, opcional)', l_battery_device: 'Dispositivo batería (para «Cargar ahora», opcional)', l_charge_targets: 'Botones «Cargar al» (%, separados por comas)',
    l_color: 'Color', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    ed_note: 'Los ajustes de Huawei Solar se encuentran solos. Añade tus secciones y entidades en YAML (ver docs).',
    description: 'Batería e inversor: nivel, modo y todos los ajustes en un popup luminoso.',
  },
  it: {
    title: 'Batteria domestica', settings: 'Impostazioni', unavailable: 'Non disponibile',
    charging: 'in carica {p}', discharging: 'fornisce {p}', idle: 'a riposo',
    min: 'min', max: 'max', reserve: 'riserva',
    grid_on: 'Carica da rete', winter_on: 'Modalità inverno',
    confirm: 'Tocca di nuovo per confermare', saving: 'salvataggio…', on: 'Acceso', off: 'Spento',
    s_mode: 'Modalità di lavoro', s_winter: 'Modalità inverno', s_limits: 'Limiti della batteria', s_grid: 'Carica dalla rete',
    s_power: 'Potenza', s_peak: 'Taglio dei picchi', s_inverter: 'Inverter', s_actions: 'Adesso', s_extra: 'Extra',
    k_eod: 'Carica minima', k_eoc: 'Carica massima', k_backup: 'Riserva di emergenza', k_grid_charge: 'Consenti carica dalla rete',
    k_grid_power: 'Potenza max di carica dalla rete', k_grid_cutoff: 'Carica dalla rete fino a', k_excess: 'Surplus solare in modalità oraria',
    k_max_charge: 'Potenza di carica max', k_max_discharge: 'Potenza di scarica max', k_cap_mode: 'Taglio dei picchi', k_peak_soc: 'Riserva per i picchi',
    k_inv_limit: 'Immissione massima', k_inv_switch: 'Inverter acceso', k_stop_forcible: 'Ferma carica forzata', k_winter: 'Modalità inverno attiva',
    k_charge_now: 'Carica al {n} % ora',
    m_adaptive: 'Adattivo', m_fixed_charge_discharge: 'Carica/scarica fissa', m_maximise_self_consumption: 'Autoconsumo',
    m_fully_fed_to_grid: 'Tutto in rete', m_time_of_use_luna2000: 'Fasce orarie (TOU)', m_third_party_control: 'Controllo esterno',
    h_maximise_self_consumption: 'Il sole alimenta prima la casa, il surplus carica la batteria. La batteria fornisce quando consumi più di quanto produce il sole.',
    h_time_of_use_luna2000: 'Carica e scarica per fasce orarie, p. es. carica notturna in inverno.',
    h_adaptive: 'L\'inverter decide in base ai tuoi consumi.',
    h_fixed_charge_discharge: 'Carica e scarica a orari fissi con potenza fissa.',
    h_fully_fed_to_grid: 'Tutta l\'energia solare va in rete.',
    h_third_party_control: 'Un altro sistema controlla la batteria.',
    o_fed_to_grid: 'In rete', o_charge: 'Carica batteria',
    o_disable: 'Spento', o_active_capacity_control: 'Acceso', o_apparent_power_limit: 'Limite di potenza apparente',
    h_winter: 'Carica notturna economica nei giorni feriali, usata di giorno e di sera. Si attiva e disattiva da sola.',
    h_peak: 'Tiene libera parte della batteria per tagliare i picchi della rete.',
    err: 'Nessuna batteria trovata. Indica "soc" o aggiungi "sections".',
    l_name: 'Nome', l_soc: 'Livello batteria', l_power: 'Potenza carica/scarica (positivo = carica)', l_invert: 'Inverti segno',
    l_winter: 'Modalità inverno (input_boolean, facoltativo)', l_battery_device: 'Dispositivo batteria (per «Carica ora», facoltativo)', l_charge_targets: 'Pulsanti «Carica al» (%, separati da virgole)',
    l_color: 'Colore', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    ed_note: 'Le impostazioni Huawei Solar vengono trovate da sole. Aggiungi sezioni ed entità in YAML (vedi doc).',
    description: 'Batteria e inverter: livello, modalità e tutte le impostazioni in un popup luminoso.',
  },
};
const GBAT_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };

function gbatLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GBAT_I18N[l] ? l : 'en';
}
function gbatT(lang, key, vars) {
  let s = (GBAT_I18N[lang] && GBAT_I18N[lang][key]) ?? GBAT_I18N.en[key] ?? key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gbatEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function gbatRgb(hex) {
  let h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const v = parseInt(h.slice(0, 6), 16);
  return h.length >= 6 && !isNaN(v) ? ((v >> 16) & 255) + ', ' + ((v >> 8) & 255) + ', ' + (v & 255) : null;
}
function gbatList(v, def) {
  if (v === undefined || v === null) return def;
  const arr = Array.isArray(v) ? v : String(v).split(/[,;\s]+/);
  return arr.map((x) => parseInt(x, 10)).filter((x) => x > 0 && x <= 100);
}

// Huawei Solar: sleutel → herkenning op entity_id
const GBAT_DETECT = {
  soc: /^sensor\..*battery_state_of_capacity$/,
  power: /^sensor\..*battery_charge_discharge_power$/,
  mode: /^select\..*battery_working_mode$/,
  excess: /^select\..*excess_pv_energy_use_in_tou$/,
  cap_mode: /^select\..*capacity_control_mode$/,
  grid_charge: /^switch\..*battery_charge_from_grid$/,
  eod: /^number\..*end_of_discharge_soc$/,
  eoc: /^number\..*end_of_charge_soc$/,
  backup: /^number\..*backup_power_soc$/,
  peak_soc: /^number\..*peak_shaving_soc$/,
  grid_cutoff: /^number\..*grid_charge_cutoff_soc$/,
  grid_power: /^number\..*grid_charge_maximum_power$/,
  max_charge: /^number\..*battery_maximum_charging_power$/,
  max_discharge: /^number\..*battery_maximum_discharging_power$/,
  inv_limit: /^number\..*(active_power_control|power_limit|vermogensbeperking)$/,
  inv_switch: /^switch\..*inverter_on_off$/,
  stop_forcible: /^button\..*(stop_forcible_charge|stop_geforceerd_laden)$/,
};
// standaardsecties (sleutels uit GBAT_DETECT of de winter-helper)
const GBAT_SECTIONS = [
  { key: 's_mode', col: '143, 227, 184', items: ['mode'] },
  { key: 's_winter', col: '142, 197, 255', items: ['winter'], help: 'h_winter' },
  { key: 's_limits', col: '143, 227, 184', items: ['eod', 'eoc', 'backup'] },
  { key: 's_grid', col: '142, 197, 255', items: ['grid_charge', 'grid_power', 'grid_cutoff', 'excess'] },
  { key: 's_power', col: '255, 224, 138', items: ['max_charge', 'max_discharge'] },
  { key: 's_peak', col: '255, 184, 153', items: ['cap_mode', 'peak_soc'], help: 'h_peak' },
  { key: 's_inverter', col: '185, 168, 255', items: ['inv_limit', 'inv_switch'] },
  { key: 's_actions', col: '255, 159, 191', items: ['charge_now', 'stop_forcible'] },
];
// wijzigingen die eerst bevestigd moeten worden
const GBAT_CONFIRM = ['mode', 'inv_switch', 'cap_mode'];
const GBAT_DEFAULT_C = '143, 227, 184';

const GBAT_BATT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="17" height="10" rx="2.5"/><path d="M22 10.5v3"/><path d="M11.5 9l-2.5 3.2h3.2L9.8 15.3"/></svg>';
const GBAT_GEAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
const GBAT_INK = (v) => `color-mix(in srgb, rgb(var(${v})), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%))`;
const GBAT_LINE = 'var(--glow-border, rgba(255, 255, 255, 0.1))';

const GBAT_STYLE = `
  :host { display: block; height: 100%; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; height: 100%; min-height: 150px;
    border-radius: var(--ha-card-border-radius, 24px); padding: 14px 16px; cursor: pointer; user-select: none; -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent; touch-action: manipulation;
    color: var(--glow-text, #F3F1FA);
    background: linear-gradient(rgba(var(--c), 0.10), rgba(var(--c), 0.10)), var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.35); box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(var(--c), 0.22);
    display: flex; flex-direction: column; justify-content: space-between; gap: 10px;
    transition: border-color 0.4s, box-shadow 0.4s, transform 0.12s;
  }
  ha-card:active { transform: scale(0.98); }
  ha-card.unavailable { opacity: 0.5; }
  .halo { position: absolute; right: -50px; top: -60px; width: 170px; height: 170px; border-radius: 50%; background: rgb(var(--c)); opacity: 0.35; filter: blur(50px); pointer-events: none; animation: gbat-breathe 3.2s ease-in-out infinite; }
  .top { position: relative; display: flex; align-items: center; gap: 12px; }
  .icon { width: 52px; height: 52px; border-radius: 26px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: #1C1730; background: rgb(var(--c)); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.8); }
  .icon svg { width: 30px; height: 30px; }
  .txt { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .name { font-size: 1.3rem; font-weight: 800; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .state { font-size: 0.95rem; font-weight: 700; color: ${GBAT_INK('--c')}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-variant-numeric: tabular-nums; }
  .pct { font-size: 2.1rem; font-weight: 800; line-height: 1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .pct small { font-size: 1.1rem; font-weight: 800; opacity: 0.7; margin-left: 1px; }
  .bar { position: relative; height: 14px; border-radius: 7px; background: var(--glow-surface, rgba(255, 255, 255, 0.1)); }
  .fill { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 7px; background: rgb(var(--c)); box-shadow: 0 0 calc(var(--glow) * 0.7) rgba(var(--c), 0.8); transition: width 0.8s; }
  .zone { position: absolute; top: 0; bottom: 0; background: repeating-linear-gradient(135deg, rgba(255,255,255,0.10) 0 4px, transparent 4px 8px); }
  .zone.lo { left: 0; border-radius: 7px 0 0 7px; }
  .zone.hi { right: 0; border-radius: 0 7px 7px 0; }
  .mark { position: absolute; top: -4px; bottom: -4px; width: 3px; margin-left: -1.5px; border-radius: 2px; background: var(--glow-text, #F3F1FA); opacity: 0.8; }
  .mark.res { background: rgb(255, 184, 153); opacity: 1; }
  .chips { position: relative; display: flex; gap: 8px; align-items: center; }
  .cl { flex: 1; min-width: 0; display: flex; flex-wrap: wrap; gap: 6px; height: 30px; overflow: hidden; }
  .chip { flex-shrink: 0; }
  .bar { flex-shrink: 0; }
  .chip { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 11px; border-radius: 14px; font-size: 13px; font-weight: 800; white-space: nowrap;
    background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GBAT_LINE}; }
  .chip.hot { color: ${GBAT_INK('--k')}; background: rgba(var(--k), 0.16); border-color: rgba(var(--k), 0.55); }
  .chip .d { width: 7px; height: 7px; border-radius: 50%; background: rgb(var(--k, 255,255,255)); box-shadow: 0 0 6px rgba(var(--k, 255,255,255), 0.9); }
  .chip.gear { padding: 0 9px; }
  .chip.gear svg { width: 16px; height: 16px; }
  .err { padding: 16px; font-weight: 700; }
  @keyframes gbat-breathe { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.45; } }
`;

const GBAT_POP_STYLE = `
  :host { all: initial; }
  .backdrop { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;
    background: rgba(8, 6, 16, 0.55); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    font-family: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif); animation: gbat-fade 0.2s ease-out; }
  .panel { width: 100%; max-width: 460px; max-height: 100%; box-sizing: border-box; display: flex; flex-direction: column; border-radius: 28px; overflow: hidden;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.5); box-shadow: 0 0 40px rgba(var(--c), 0.25), 0 20px 50px rgba(0, 0, 0, 0.4); animation: gbat-pop 0.25s cubic-bezier(.2, .9, .3, 1.2); }
  .head { display: flex; align-items: center; gap: 14px; padding: 20px 20px 14px; }
  .head .ic { width: 52px; height: 52px; border-radius: 26px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: #1C1730; background: rgb(var(--c)); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.8); }
  .head .ic svg { width: 30px; height: 30px; }
  .head .t { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .head .n { font-size: 22px; font-weight: 800; line-height: 1.15; }
  .head .s { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 15px; font-weight: 700; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); font-variant-numeric: tabular-nums; }
  .head .p { font-size: 34px; font-weight: 800; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .close { width: 40px; height: 40px; border-radius: 20px; font-size: 22px; line-height: 1; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GBAT_LINE}; }
  .body { overflow-y: auto; padding: 0 20px 20px; display: flex; flex-direction: column; gap: 14px; overscroll-behavior: contain; }
  .sec { border-radius: 22px; padding: 14px; background: rgba(var(--k), 0.07); border: 1px solid rgba(var(--k), 0.22); display: flex; flex-direction: column; gap: 12px; }
  .sec-t { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: color-mix(in srgb, rgb(var(--k)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .help { font-size: 13px; font-weight: 600; opacity: 0.7; line-height: 1.35; margin-top: -4px; }
  .row { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 44px; }
  .row .l { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .row .l b { font-size: 15px; font-weight: 800; line-height: 1.2; }
  .row .l span { font-size: 12.5px; font-weight: 700; opacity: 0.6; }
  .row .l span.warn { opacity: 1; color: rgb(255, 210, 122); }
  .step { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .step .v { min-width: 78px; text-align: center; font-size: 18px; font-weight: 800; font-variant-numeric: tabular-nums; }
  .step .v.pend { color: color-mix(in srgb, rgb(var(--k)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .sb { width: 44px; height: 44px; border-radius: 22px; font-size: 22px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GBAT_LINE}; }
  .sb:active { background: rgba(var(--k), 0.25); }
  .sb:disabled { opacity: 0.3; }
  .tg { position: relative; width: 58px; height: 34px; border-radius: 17px; flex-shrink: 0; background: var(--glow-surface, rgba(255,255,255,0.1)); border: 1px solid ${GBAT_LINE}; transition: background 0.3s, box-shadow 0.3s; }
  .tg::after { content: ''; position: absolute; top: 3px; left: 3px; width: 26px; height: 26px; border-radius: 13px; background: var(--glow-text, #F3F1FA); opacity: 0.6; transition: transform 0.25s, opacity 0.25s, background 0.25s; }
  .tg.on { background: rgb(var(--k)); box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(var(--k), 0.6); border-color: transparent; }
  .tg.on::after { transform: translateX(24px); background: #1C1730; opacity: 1; }
  .tg.ask { box-shadow: 0 0 0 2px rgb(255, 210, 122); }
  .opts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .opts.n3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .o { min-height: 46px; padding: 6px 10px; border-radius: 16px; font-size: 14px; font-weight: 800; line-height: 1.15; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GBAT_LINE}; transition: background 0.3s, border-color 0.3s, box-shadow 0.3s; }
  .o.sel { color: color-mix(in srgb, rgb(var(--k)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); border-color: rgba(var(--k), 0.7); background: rgba(var(--k), 0.18); box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(var(--k), 0.35); }
  .o.ask { border-color: rgb(255, 210, 122); color: rgb(255, 210, 122); }
  .o.pend { opacity: 0.7; }
  .act { height: 46px; padding: 0 16px; border-radius: 23px; font-size: 15px; font-weight: 800; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid ${GBAT_LINE}; }
  .act.go { color: #1C1730; background: rgb(var(--k)); border: 0; box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(var(--k), 0.6); }
  .acts { display: flex; gap: 8px; flex-wrap: wrap; }
  .acts .act { flex: 1; }
  .ro { font-size: 16px; font-weight: 800; font-variant-numeric: tabular-nums; }
  button { font: inherit; cursor: pointer; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  @keyframes gbat-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes gbat-pop { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: none; } }
`;
const GBAT_THEME_VARS = ['--glow-card-background', '--glow-text', '--glow-surface', '--glow-border', '--glow-ink', '--glow-ink-amount', '--paper-font-body1_-_font-family'];

class GlowBatteryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._pending = {};
    this._ask = null;
    this._timers = {};
  }

  static getConfigElement() { return document.createElement('glow-battery-card-editor'); }
  static getStubConfig() { return {}; }

  setConfig(config) {
    this._config = { glow: 18, ...(config || {}) };
    this._built = false;
    this._ents = null;
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    this._render();
  }
  get hass() { return this._hass; }

  getCardSize() { return 3; }
  getGridOptions() { return { columns: 6, rows: 3, min_columns: 4, min_rows: 3 }; }

  disconnectedCallback() { this._closePopup(); }

  _lang() { return gbatLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gbatT(this._lang(), k, v); }
  _locale() { return (this._hass && this._hass.locale && this._hass.locale.language) || this._lang(); }
  _color() { return gbatRgb(this._config.color) || GBAT_DEFAULT_C; }
  _fmt(n, d) { return Number(n).toLocaleString(this._locale(), { maximumFractionDigits: d ?? 0 }); }

  /* ---- entiteiten zoeken ---- */

  _entities() {
    if (this._ents) return this._ents;
    const c = this._config;
    const ids = Object.keys(this._hass.states);
    const e = {};
    Object.keys(GBAT_DETECT).forEach((k) => {
      if (c[k] !== undefined) { if (c[k]) e[k] = c[k]; return; }
      const re = GBAT_DETECT[k];
      // eerst een niet-procentuele match (bv. vermogensbeperking in W, niet in %)
      const hits = ids.filter((id) => re.test(id));
      if (hits.length) e[k] = hits.find((id) => !/percent/.test(id)) || hits[0];
    });
    if (c.winter) e.winter = c.winter;
    if (c.battery_device) e.charge_now = '__charge_now';
    this._ents = e;
    return e;
  }

  _st(id) { return id ? this._hass.states[id] : undefined; }
  _ok(id) { const s = this._st(id); return !!s && s.state !== 'unavailable' && s.state !== 'unknown'; }
  _num(id) { const s = this._st(id); const v = s ? parseFloat(s.state) : NaN; return isNaN(v) ? null : v; }

  _sections() {
    const c = this._config;
    const e = this._entities();
    const base = c.sections || GBAT_SECTIONS.map((s) => ({ ...s, items: s.items.map((k) => e[k] ? { key: k, entity: e[k] } : null).filter(Boolean) }));
    const secs = base.map((s, i) => ({
      title: s.title || (s.key ? this._t(s.key) : ''),
      col: gbatRgb(s.color) || s.col || ['143, 227, 184', '142, 197, 255', '255, 224, 138', '255, 184, 153', '185, 168, 255', '255, 159, 191'][i % 6],
      help: s.help ? (GBAT_I18N.en[s.help] ? this._t(s.help) : s.help) : '',
      items: (s.items || s.entities || []).map((x) => (typeof x === 'string' ? { entity: x } : x))
        .filter((x) => x.entity === '__charge_now' || this._ok(x.entity) || (x.entity && this._st(x.entity) && c.show_unavailable)),
    }));
    if (c.extra && c.extra.length) {
      secs.push({ title: this._t('s_extra'), col: '255, 159, 191', help: '', items: c.extra.map((x) => (typeof x === 'string' ? { entity: x } : x)).filter((x) => this._st(x.entity)) });
    }
    return secs.filter((s) => s.items.length);
  }

  /* ---- tegel ---- */

  _build() {
    this.shadowRoot.innerHTML = `
      <style>${GBAT_STYLE}</style>
      <ha-card>
        <div class="halo"></div>
        <div class="top">
          <div class="icon">${GBAT_BATT}</div>
          <div class="txt"><span class="name"></span><span class="state"></span></div>
          <div class="pct"></div>
        </div>
        <div class="bar"></div>
        <div class="chips"></div>
      </ha-card>`;
    this._card = this.shadowRoot.querySelector('ha-card');
    let hold = null;
    let held = false;
    this._card.addEventListener('pointerdown', () => {
      held = false;
      hold = setTimeout(() => {
        held = true;
        const id = this._entities().soc;
        if (id) this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: id }, bubbles: true, composed: true }));
      }, 600);
    });
    const cancel = () => clearTimeout(hold);
    this._card.addEventListener('pointerleave', cancel);
    this._card.addEventListener('pointercancel', cancel);
    this._card.addEventListener('pointerup', () => { clearTimeout(hold); if (!held) this._openPopup(); });
    this._card.addEventListener('contextmenu', (ev) => ev.preventDefault());
    this._built = true;
    this._builtLang = this._lang();
  }

  _powerText() {
    const e = this._entities();
    let p = this._num(e.power);
    if (p === null) return '';
    if (this._config.invert) p = -p;
    const abs = Math.abs(p);
    const txt = abs >= 1000 ? this._fmt(abs / 1000, 1) + ' kW' : this._fmt(abs) + ' W';
    if (abs < 15) return this._t('idle');
    return this._t(p > 0 ? 'charging' : 'discharging', { p: txt });
  }

  _optLabel(key, opt) {
    const k = (key === 'mode' ? 'm_' : 'o_') + opt;
    const s = gbatT(this._lang(), k);
    return s === k ? String(opt).replace(/_/g, ' ').replace(/^./, (x) => x.toUpperCase()) : s;
  }

  _render() {
    if (!this._hass) return;
    if (!this._built || this._builtLang !== this._lang()) this._build();
    const c = this._config;
    const e = this._entities();
    const col = this._color();
    this._card.style.setProperty('--c', col);
    this._card.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');
    const soc = this._num(e.soc);
    this._card.classList.toggle('unavailable', soc === null);
    this.shadowRoot.querySelector('.name').textContent = c.name || this._t('title');
    const mode = this._st(e.mode);
    const parts = [];
    if (mode && this._ok(e.mode)) parts.push(this._optLabel('mode', mode.state));
    const pw = this._powerText();
    this.shadowRoot.querySelector('.state').textContent = soc === null ? this._t('unavailable') : (parts.join(' · ') || pw);
    this._stateFull = soc === null ? this._t('unavailable') : parts.concat(pw ? [pw] : []).join(' · ');
    this.shadowRoot.querySelector('.pct').innerHTML = soc === null ? '' : `${this._fmt(soc)}<small>%</small>`;

    // balk met min/max en reserve
    const lo = this._num(e.eod);
    const hi = this._num(e.eoc);
    const peakOn = this._ok(e.cap_mode) && this._st(e.cap_mode).state !== 'disable';
    const res = peakOn ? this._num(e.peak_soc) : null;
    const pct = Math.max(0, Math.min(100, soc || 0));
    this.shadowRoot.querySelector('.bar').innerHTML =
      `<div class="fill" style="width:${pct}%"></div>`
      + (lo ? `<div class="zone lo" style="width:${lo}%"></div><div class="mark" style="left:${lo}%" title="${this._t('min')} ${lo}%"></div>` : '')
      + (hi !== null && hi < 100 ? `<div class="zone hi" style="width:${100 - hi}%"></div><div class="mark" style="left:${hi}%"></div>` : '')
      + (res ? `<div class="mark res" style="left:${res}%"></div>` : '');

    // chips
    const chips = [];
    let p = this._num(e.power);
    if (p !== null && parts.length) {
      if (c.invert) p = -p;
      const k = Math.abs(p) < 15 ? null : p > 0 ? '143, 227, 184' : '255, 184, 153';
      chips.push(k ? `<span class="chip hot" style="--k:${k}"><span class="d"></span>${gbatEsc(pw)}</span>` : `<span class="chip">${gbatEsc(pw)}</span>`);
    }
    if (e.winter && this._st(e.winter) && this._st(e.winter).state === 'on') chips.push(`<span class="chip hot" style="--k:142, 197, 255"><span class="d"></span>${gbatEsc(this._t('winter_on'))}</span>`);
    else if (this._ok(e.grid_charge) && this._st(e.grid_charge).state === 'on' && mode && mode.state === 'time_of_use_luna2000') chips.push(`<span class="chip hot" style="--k:142, 197, 255"><span class="d"></span>${gbatEsc(this._t('grid_on'))}</span>`);
    if (res) chips.push(`<span class="chip hot" style="--k:255, 184, 153"><span class="d"></span>${gbatEsc(this._t('reserve'))} ${this._fmt(res)} %</span>`);
    if (lo !== null || hi !== null) chips.push(`<span class="chip">${lo !== null ? this._fmt(lo) : '?'} – ${hi !== null ? this._fmt(hi) : '?'} %</span>`);
    const html = `<div class="cl">${chips.join('')}</div><span class="chip gear">${GBAT_GEAR}</span>`;
    if (html !== this._chipsKey) { this._chipsKey = html; this.shadowRoot.querySelector('.chips').innerHTML = html; }

    if (this._pop) this._renderPopup();
  }

  /* ---- popup met instellingen ---- */

  _openPopup() {
    if (this._pop) return;
    const host = document.createElement('div');
    host.className = 'glow-battery-popup';
    const root = host.attachShadow({ mode: 'open' });
    const cs = getComputedStyle(this);
    GBAT_THEME_VARS.forEach((v) => { const val = cs.getPropertyValue(v); if (val) host.style.setProperty(v, val.trim()); });
    host.style.setProperty('--c', this._color());
    host.style.setProperty('--glow', (parseInt(this._config.glow, 10) || 0) + 'px');
    root.innerHTML = `
      <style>${GBAT_POP_STYLE}</style>
      <div class="backdrop">
        <div class="panel" role="dialog" aria-modal="true">
          <div class="head"><div class="ic">${GBAT_BATT}</div><div class="t"><span class="n"></span><span class="s"></span></div><span class="p"></span><button class="close" type="button" aria-label="close">×</button></div>
          <div class="body"></div>
        </div>
      </div>`;
    document.body.appendChild(host);
    this._pop = host;
    this._popKey = null;
    root.querySelector('.backdrop').addEventListener('pointerdown', (ev) => { if (ev.target.classList.contains('backdrop')) this._closePopup(); });
    root.querySelector('.close').addEventListener('click', () => this._closePopup());
    root.querySelector('.body').addEventListener('click', (ev) => this._onPopClick(ev));
    this._onKey = (ev) => { if (ev.key === 'Escape') this._closePopup(); };
    document.addEventListener('keydown', this._onKey);
    this._renderPopup();
  }

  _closePopup() {
    if (this._onKey) document.removeEventListener('keydown', this._onKey);
    if (this._pop) this._pop.remove();
    this._pop = null;
    this._ask = null;
  }

  _numMeta(id, item) {
    const s = this._st(id);
    const a = (s && s.attributes) || {};
    const unit = a.unit_of_measurement || '';
    const step = item.step || (unit === 'W' ? 100 : unit === '%' ? 1 : (a.step || 1));
    return { min: a.min ?? 0, max: a.max ?? 100, step, unit };
  }

  _valText(v, unit) {
    if (unit === 'W' && Math.abs(v) >= 1000) return this._fmt(v / 1000, 2) + ' kW';
    return this._fmt(v, 1) + (unit ? (unit === '%' ? ' %' : ' ' + unit) : '');
  }

  _itemHtml(it) {
    const id = it.entity;
    const key = it.key || '';
    const ask = this._ask && this._ask.id === id;
    if (id === '__charge_now') {
      const targets = gbatList(this._config.charge_targets, [60, 100]);
      return `<div class="acts">${targets.map((n) => `<button class="act" type="button" data-a="charge" data-n="${n}">${gbatEsc(this._t('k_charge_now', { n }))}</button>`).join('')}</div>`;
    }
    const s = this._st(id);
    const dom = id.split('.')[0];
    const name = it.name || (key && GBAT_I18N.en['k_' + key] ? this._t('k_' + key) : (s.attributes.friendly_name || id));
    const pend = this._pending[id];
    if (dom === 'select' || dom === 'input_select') {
      const opts = s.attributes.options || [];
      const cur = pend !== undefined ? pend.v : s.state;
      const help = key === 'mode' ? gbatT(this._lang(), 'h_' + cur) : '';
      return `${key === 'mode' ? '' : `<div class="row" style="min-height:0"><div class="l"><b>${gbatEsc(name)}</b></div></div>`}
        <div class="opts${opts.length === 3 ? ' n3' : ''}">${opts.map((o) => `<button class="o${o === cur ? ' sel' : ''}${pend !== undefined && o === cur ? ' pend' : ''}${ask && this._ask.v === o ? ' ask' : ''}" type="button" data-sel="${gbatEsc(id)}" data-v="${gbatEsc(o)}" data-k="${gbatEsc(key)}">${gbatEsc(this._optLabel(key, o))}</button>`).join('')}</div>
        ${ask ? `<div class="help" style="color:rgb(255,210,122);opacity:1">${gbatEsc(this._t('confirm'))}</div>` : (help && help !== 'h_' + cur ? `<div class="help">${gbatEsc(help)}</div>` : '')}`;
    }
    if (dom === 'number' || dom === 'input_number') {
      const m = this._numMeta(id, it);
      const v = pend !== undefined ? pend.v : parseFloat(s.state);
      return `<div class="row"><div class="l"><b>${gbatEsc(name)}</b><span>${gbatEsc(pend !== undefined ? this._t('saving') : this._valText(m.min, m.unit) + ' – ' + this._valText(m.max, m.unit))}</span></div>
        <div class="step"><button class="sb" type="button" data-num="${gbatEsc(id)}" data-d="-1"${v <= m.min ? ' disabled' : ''}>−</button><span class="v${pend !== undefined ? ' pend' : ''}">${gbatEsc(this._valText(v, m.unit))}</span><button class="sb" type="button" data-num="${gbatEsc(id)}" data-d="1"${v >= m.max ? ' disabled' : ''}>+</button></div></div>`;
    }
    if (dom === 'switch' || dom === 'input_boolean' || dom === 'automation') {
      const on = pend !== undefined ? pend.v === 'on' : s.state === 'on';
      return `<div class="row"><div class="l"><b>${gbatEsc(name)}</b><span${ask ? ' class="warn"' : ''}>${gbatEsc(ask ? this._t('confirm') : this._t(on ? 'on' : 'off'))}</span></div>
        <button class="tg${on ? ' on' : ''}${ask ? ' ask' : ''}" type="button" data-sw="${gbatEsc(id)}" data-k="${gbatEsc(key)}" aria-pressed="${on}"></button></div>`;
    }
    if (dom === 'button' || dom === 'input_button' || dom === 'script') {
      return `<div class="acts"><button class="act" type="button" data-btn="${gbatEsc(id)}">${gbatEsc(name)}</button></div>`;
    }
    const unit = s.attributes.unit_of_measurement || '';
    const v = parseFloat(s.state);
    return `<div class="row"><div class="l"><b>${gbatEsc(name)}</b></div><span class="ro">${gbatEsc(isNaN(v) ? s.state : this._valText(v, unit))}</span></div>`;
  }

  _renderPopup() {
    const root = this._pop && this._pop.shadowRoot;
    if (!root) return;
    // verlopen of bevestigde wijzigingen opruimen
    Object.keys(this._pending).forEach((id) => {
      const p = this._pending[id];
      const s = this._st(id);
      const same = s && (String(s.state) === String(p.v) || parseFloat(s.state) === parseFloat(p.v));
      if ((same && !p.timer) || Date.now() - p.t > 15000) delete this._pending[id];
    });
    root.querySelector('.head .n').textContent = this.shadowRoot.querySelector('.name').textContent;
    root.querySelector('.head .s').textContent = this._stateFull || '';
    root.querySelector('.head .p').textContent = this.shadowRoot.querySelector('.pct').textContent;
    const html = this._sections().map((s) => `
      <div class="sec" style="--k:${s.col}">
        <span class="sec-t">${gbatEsc(s.title)}</span>
        ${s.help ? `<div class="help">${gbatEsc(s.help)}</div>` : ''}
        ${s.items.map((it) => this._itemHtml(it)).join('')}
      </div>`).join('');
    if (html !== this._popKey) {
      const body = root.querySelector('.body');
      const top = body.scrollTop;
      body.innerHTML = html;
      body.scrollTop = top;
      this._popKey = html;
    }
  }

  _needsConfirm(key) { return this._config.confirm !== false && GBAT_CONFIRM.includes(key); }

  _askOrRun(id, key, v, run) {
    if (this._needsConfirm(key) && !(this._ask && this._ask.id === id && this._ask.v === v)) {
      this._ask = { id, v };
      clearTimeout(this._askTimer);
      this._askTimer = setTimeout(() => { this._ask = null; this._renderPopup(); }, 4000);
      this._renderPopup();
      return;
    }
    this._ask = null;
    run();
  }

  _setPending(id, v, timer) {
    this._pending[id] = { v, t: Date.now(), timer };
    this._renderPopup();
  }

  _onPopClick(ev) {
    const b = ev.target.closest('button');
    if (!b || b.disabled) return;
    const h = this._hass;
    if (b.dataset.sel) {
      const id = b.dataset.sel;
      const v = b.dataset.v;
      const s = this._st(id);
      if (s && s.state === v && this._pending[id] === undefined) return;
      this._askOrRun(id, b.dataset.k, v, () => {
        this._setPending(id, v);
        h.callService(id.split('.')[0], 'select_option', { entity_id: id, option: v });
      });
    } else if (b.dataset.sw) {
      const id = b.dataset.sw;
      const s = this._st(id);
      const cur = this._pending[id] !== undefined ? this._pending[id].v : s.state;
      const nv = cur === 'on' ? 'off' : 'on';
      this._askOrRun(id, b.dataset.k, nv, () => {
        this._setPending(id, nv);
        h.callService('homeassistant', nv === 'on' ? 'turn_on' : 'turn_off', { entity_id: id });
      });
    } else if (b.dataset.num) {
      const id = b.dataset.num;
      const it = this._sections().flatMap((s) => s.items).find((x) => x.entity === id) || {};
      const m = this._numMeta(id, it);
      const cur = this._pending[id] !== undefined ? this._pending[id].v : parseFloat(this._st(id).state);
      const nv = Math.max(m.min, Math.min(m.max, Math.round((cur + m.step * (+b.dataset.d)) / m.step) * m.step));
      // pas na een korte pauze versturen, zodat je meerdere keren kunt tikken
      clearTimeout(this._timers[id]);
      this._setPending(id, nv, true);
      this._timers[id] = setTimeout(() => {
        if (this._pending[id]) this._pending[id] = { v: nv, t: Date.now() };
        h.callService(id.split('.')[0], 'set_value', { entity_id: id, value: nv });
        this._renderPopup();
      }, 1200);
    } else if (b.dataset.btn) {
      const id = b.dataset.btn;
      const dom = id.split('.')[0];
      if (dom === 'script') h.callService('script', 'turn_on', { entity_id: id });
      else h.callService(dom, 'press', { entity_id: id });
    } else if (b.dataset.a === 'charge') {
      const p = this._num(this._entities().grid_power) || 1500;
      h.callService('huawei_solar', 'forcible_charge_soc', { device_id: this._config.battery_device, target_soc: +b.dataset.n, power: String(p) });
    }
  }
}

/* ---------------- editor ---------------- */

class GlowBatteryCardEditor extends HTMLElement {
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
    const lang = gbatLang(this._hass, this._config.language);
    const t = (k) => gbatT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = `<p style="margin:0 0 12px;opacity:.75">${gbatEsc(t('ed_note'))}</p>`;
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gbatT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (ev) => {
        const v = { ...this._config, ...ev.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        if (v.invert === false) delete v.invert;
        if (v.glow === 18) delete v.glow;
        this._config = v;
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      { name: 'name', selector: { text: {} } },
      { name: 'soc', selector: { entity: { domain: 'sensor' } } },
      { name: 'power', selector: { entity: { domain: 'sensor' } } },
      { name: 'invert', selector: { boolean: {} } },
      { name: 'winter', selector: { entity: { domain: ['input_boolean', 'automation'] } } },
      { name: 'battery_device', selector: { device: { integration: 'huawei_solar' } } },
      { name: 'charge_targets', selector: { text: {} } },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GBAT_LANG_NAMES).map((k) => ({ value: k, label: GBAT_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 18, language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-battery-card')) customElements.define('glow-battery-card', GlowBatteryCard);
if (!customElements.get('glow-battery-card-editor')) customElements.define('glow-battery-card-editor', GlowBatteryCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-battery-card')) {
  window.customCards.push({
    type: 'glow-battery-card',
    name: 'Glow Battery Card',
    description: gbatT(gbatLang(null), 'description'),
    preview: true,
    documentationURL: 'https://github.com/stijnleroy/glow-cards',
  });
}
