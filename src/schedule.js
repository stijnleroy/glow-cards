/*
 * Glow Schedule Card
 * Alle schema's van het huis in één kaart: de schema's van Scheduler (HACS) en de schema-helpers van
 * Home Assistant, waaronder het schema van de Glow Thermostat Card. Per schema een tijdbalk van vandaag,
 * een schakelaar, en openklappen om dagen, blokken en het gestuurde toestel aan te passen.
 * Alles wordt in Home Assistant bewaard, dus de schema's lopen ook als het scherm uit staat.
 */

const GSD_I18N = {
  nl: {
    title: "Schema's", n_active: '{n} van {t} actief', next: ' · volgende: {name} om {t}', new: '+ Nieuw', p_active: '{n} actief',
    k_climate: 'Verwarming', k_light: 'Verlichting', k_switch: 'Stopcontacten', k_fan: 'Ventilatie', k_cover: 'Rolluiken', k_other: 'Overige',
    st_disabled: 'Staat uit · {d}', st_notoday: 'Vandaag niet · {d}', st_on_until: 'Nu {a} tot {t}', st_off_next: 'Uit · {a} om {t}', st_manual: "Met de hand tot {t}", st_none: 'Vandaag niets meer', st_helper_on: 'Nu aan tot {t}', st_helper_off: 'Uit · aan om {t}',
    d_daily: 'elke dag', d_workday: 'werkdagen', d_weekend: 'weekend', d_custom: 'eigen dagen',
    c_daily: 'Elke dag', c_workday: 'Werkdagen', c_weekend: 'Weekend', c_custom: 'Zelf kiezen',
    days: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'], days_long: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'],
    lab_days: 'Dagen', lab_blocks: 'Blokken', until: 'tot', add_block: '+ Blok toevoegen', add_sun: '+ Vanaf zonsondergang',
    sunset: 'zonsondergang', sunrise: 'zonsopgang', at_sun: '{t} (zon)',
    outside_off: 'Buiten de blokken: uit', outside_none: 'Buiten de blokken: niets', outside_eco: 'Buiten de blokken: spaarstand {v}', outside_helper: 'Buiten de blokken: schema uit',
    drives: 'Stuurt', src_scheduler: 'Scheduler', src_thermo: 'zelfde schema als de thermostaatkaart', src_helper: 'schema-helper',
    del: 'Verwijderen', del_sure: 'Zeker? Tik nog eens', saving: 'Bewaren…', saved: 'Bewaard', err: 'Dat lukte niet: {e}',
    act_on: 'aan', act_off: 'uit', act_open: 'open', act_close: 'dicht', comfort: 'Comfort', eco: 'Spaarstand',
    copy_week: 'Kopieer naar werkdagen', copy_weekend: 'Kopieer naar weekend',
    ro: 'Dit schema heeft acties die deze kaart niet kan aanpassen. Aan- en uitzetten kan wel; de rest pas je aan in Scheduler.',
    no_scheduler: 'Installeer Scheduler (via HACS) om zelf schema\'s te maken.', none: "Geen schema's gevonden.",
    nw_title: 'Nieuw schema', nw_name: 'Naam', nw_device: 'Wat moet het schema sturen?', nw_pick: 'Kies een toestel', nw_create: 'Aanmaken', nw_cancel: 'Annuleren',
    l_title: 'Titel', l_entities: "Alleen deze schema's (leeg = alle)", l_exclude: 'Niet tonen', l_helpers: 'Schema-helpers tonen', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    sh_early: "Vroeg", sh_late: "Laat", sh_free: "Vrij", shift_early: "Vroege ploeg", shift_late: "Late ploeg", shift_free: "Vrij", this_week: "Deze week", next_week: "Volgende week: {s}", swap: "Week omwisselen", vac: "Vakantie", vac_off: "Vakantie uit", vac_sub: "Alles loopt als een vrije dag tot je de vakantie uitzet", shift_hint: "Tik op een dag om die te wisselen (bv. bij een ruil). Elke maandag wisselt de ploeg vanzelf.", follows: "Volgt", m_shift: "De ploeg", m_fixed: "Elke dag hetzelfde", lab_outside: "Buiten de blokken", o_eco: "Spaarstand {v}", o_value: "Waarde", o_off: "Uit", o_none: "Niets doen", copy_from: "Kopieer van {s}", no_blocks: "geen blokken", src_glow: "Glow Schedules", blocks_of: "Blokken · {s}", every_day: "Blokken · elke dag",
    description: "Alle schema's in één kaart: Scheduler en schema-helpers, met tijdbalken en bewerken.",
  },
  en: {
    title: 'Schedules', n_active: '{n} of {t} active', next: ' · next: {name} at {t}', new: '+ New', p_active: '{n} active',
    k_climate: 'Heating', k_light: 'Lights', k_switch: 'Plugs', k_fan: 'Ventilation', k_cover: 'Blinds', k_other: 'Other',
    st_disabled: 'Off · {d}', st_notoday: 'Not today · {d}', st_on_until: 'Now {a} until {t}', st_off_next: 'Off · {a} at {t}', st_manual: "Manual until {t}", st_none: 'Nothing more today', st_helper_on: 'On until {t}', st_helper_off: 'Off · on at {t}',
    d_daily: 'every day', d_workday: 'workdays', d_weekend: 'weekend', d_custom: 'own days',
    c_daily: 'Every day', c_workday: 'Workdays', c_weekend: 'Weekend', c_custom: 'Choose',
    days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], days_long: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    lab_days: 'Days', lab_blocks: 'Blocks', until: 'to', add_block: '+ Add block', add_sun: '+ From sunset',
    sunset: 'sunset', sunrise: 'sunrise', at_sun: '{t} (sun)',
    outside_off: 'Outside the blocks: off', outside_none: 'Outside the blocks: nothing', outside_eco: 'Outside the blocks: eco {v}', outside_helper: 'Outside the blocks: schedule off',
    drives: 'Controls', src_scheduler: 'Scheduler', src_thermo: 'same schedule as the thermostat card', src_helper: 'schedule helper',
    del: 'Delete', del_sure: 'Sure? Tap again', saving: 'Saving…', saved: 'Saved', err: 'That did not work: {e}',
    act_on: 'on', act_off: 'off', act_open: 'open', act_close: 'closed', comfort: 'Comfort', eco: 'Eco',
    copy_week: 'Copy to workdays', copy_weekend: 'Copy to weekend',
    ro: 'This schedule has actions this card cannot edit. You can switch it on and off; change the rest in Scheduler.',
    no_scheduler: 'Install Scheduler (via HACS) to create schedules.', none: 'No schedules found.',
    nw_title: 'New schedule', nw_name: 'Name', nw_device: 'What should it control?', nw_pick: 'Pick a device', nw_create: 'Create', nw_cancel: 'Cancel',
    l_title: 'Title', l_entities: 'Only these schedules (empty = all)', l_exclude: 'Hide', l_helpers: 'Show schedule helpers', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    sh_early: "Early", sh_late: "Late", sh_free: "Off", shift_early: "Early shift", shift_late: "Late shift", shift_free: "Day off", this_week: "This week", next_week: "Next week: {s}", swap: "Swap week", vac: "Vacation", vac_off: "End vacation", vac_sub: "Every day runs as a day off until you end the vacation", shift_hint: "Tap a day to change it (e.g. after a swap). The shift changes by itself every Monday.", follows: "Follows", m_shift: "The shift", m_fixed: "Same every day", lab_outside: "Outside the blocks", o_eco: "Eco {v}", o_value: "Value", o_off: "Off", o_none: "Do nothing", copy_from: "Copy from {s}", no_blocks: "no blocks", src_glow: "Glow Schedules", blocks_of: "Blocks · {s}", every_day: "Blocks · every day",
    description: 'All schedules in one card: Scheduler and schedule helpers, with timelines and editing.',
  },
  fr: {
    title: 'Programmes', n_active: '{n} sur {t} actifs', next: ' · suivant : {name} à {t}', new: '+ Nouveau', p_active: '{n} actifs',
    k_climate: 'Chauffage', k_light: 'Éclairage', k_switch: 'Prises', k_fan: 'Ventilation', k_cover: 'Volets', k_other: 'Autres',
    st_disabled: 'Désactivé · {d}', st_notoday: "Pas aujourd'hui · {d}", st_on_until: "{a} jusqu'à {t}", st_off_next: 'Arrêt · {a} à {t}', st_manual: "Manuel jusqu'à {t}", st_none: "Plus rien aujourd'hui", st_helper_on: "Actif jusqu'à {t}", st_helper_off: 'Arrêt · actif à {t}',
    d_daily: 'tous les jours', d_workday: 'jours ouvrables', d_weekend: 'week-end', d_custom: 'jours choisis',
    c_daily: 'Tous les jours', c_workday: 'Ouvrables', c_weekend: 'Week-end', c_custom: 'Choisir',
    days: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'], days_long: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    lab_days: 'Jours', lab_blocks: 'Plages', until: 'à', add_block: '+ Ajouter une plage', add_sun: '+ Dès le coucher du soleil',
    sunset: 'coucher du soleil', sunrise: 'lever du soleil', at_sun: '{t} (soleil)',
    outside_off: 'Hors plages : arrêt', outside_none: 'Hors plages : rien', outside_eco: 'Hors plages : éco {v}', outside_helper: 'Hors plages : programme inactif',
    drives: 'Commande', src_scheduler: 'Scheduler', src_thermo: 'même programme que la carte thermostat', src_helper: 'programme',
    del: 'Supprimer', del_sure: 'Sûr ? Touchez encore', saving: 'Enregistrement…', saved: 'Enregistré', err: 'Échec : {e}',
    act_on: 'allumé', act_off: 'éteint', act_open: 'ouvert', act_close: 'fermé', comfort: 'Confort', eco: 'Éco',
    copy_week: 'Copier aux jours ouvrables', copy_weekend: 'Copier au week-end',
    ro: 'Ce programme contient des actions que cette carte ne peut pas modifier. Vous pouvez l\'activer ou le désactiver ; le reste se modifie dans Scheduler.',
    no_scheduler: 'Installez Scheduler (via HACS) pour créer des programmes.', none: 'Aucun programme trouvé.',
    nw_title: 'Nouveau programme', nw_name: 'Nom', nw_device: 'Que doit-il commander ?', nw_pick: 'Choisir un appareil', nw_create: 'Créer', nw_cancel: 'Annuler',
    l_title: 'Titre', l_entities: 'Seulement ces programmes (vide = tous)', l_exclude: 'Masquer', l_helpers: 'Afficher les programmes HA', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    sh_early: "Matin", sh_late: "Soir", sh_free: "Libre", shift_early: "Équipe du matin", shift_late: "Équipe du soir", shift_free: "Jour libre", this_week: "Cette semaine", next_week: "Semaine prochaine : {s}", swap: "Inverser la semaine", vac: "Vacances", vac_off: "Fin des vacances", vac_sub: "Chaque jour est un jour libre jusqu'à la fin des vacances", shift_hint: "Touchez un jour pour le changer (p. ex. après un échange). L'équipe change seule chaque lundi.", follows: "Suit", m_shift: "L'équipe", m_fixed: "Chaque jour pareil", lab_outside: "Hors plages", o_eco: "Éco {v}", o_value: "Valeur", o_off: "Arrêt", o_none: "Rien", copy_from: "Copier de {s}", no_blocks: "aucune plage", src_glow: "Glow Schedules", blocks_of: "Plages · {s}", every_day: "Plages · chaque jour",
    description: 'Tous les programmes dans une carte : Scheduler et programmes HA, avec frises et modification.',
  },
  de: {
    title: 'Zeitpläne', n_active: '{n} von {t} aktiv', next: ' · nächster: {name} um {t}', new: '+ Neu', p_active: '{n} aktiv',
    k_climate: 'Heizung', k_light: 'Licht', k_switch: 'Steckdosen', k_fan: 'Lüftung', k_cover: 'Rollos', k_other: 'Sonstige',
    st_disabled: 'Aus · {d}', st_notoday: 'Heute nicht · {d}', st_on_until: 'Jetzt {a} bis {t}', st_off_next: 'Aus · {a} um {t}', st_manual: "Manuell bis {t}", st_none: 'Heute nichts mehr', st_helper_on: 'An bis {t}', st_helper_off: 'Aus · an um {t}',
    d_daily: 'täglich', d_workday: 'Werktage', d_weekend: 'Wochenende', d_custom: 'eigene Tage',
    c_daily: 'Täglich', c_workday: 'Werktage', c_weekend: 'Wochenende', c_custom: 'Wählen',
    days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'], days_long: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    lab_days: 'Tage', lab_blocks: 'Blöcke', until: 'bis', add_block: '+ Block hinzufügen', add_sun: '+ Ab Sonnenuntergang',
    sunset: 'Sonnenuntergang', sunrise: 'Sonnenaufgang', at_sun: '{t} (Sonne)',
    outside_off: 'Außerhalb der Blöcke: aus', outside_none: 'Außerhalb der Blöcke: nichts', outside_eco: 'Außerhalb der Blöcke: Spar {v}', outside_helper: 'Außerhalb der Blöcke: Zeitplan aus',
    drives: 'Steuert', src_scheduler: 'Scheduler', src_thermo: 'derselbe Zeitplan wie die Thermostatkarte', src_helper: 'Zeitplan-Helfer',
    del: 'Löschen', del_sure: 'Sicher? Nochmal tippen', saving: 'Speichern…', saved: 'Gespeichert', err: 'Das hat nicht geklappt: {e}',
    act_on: 'an', act_off: 'aus', act_open: 'offen', act_close: 'zu', comfort: 'Komfort', eco: 'Spar',
    copy_week: 'Auf Werktage kopieren', copy_weekend: 'Aufs Wochenende kopieren',
    ro: 'Dieser Zeitplan hat Aktionen, die diese Karte nicht bearbeiten kann. Ein- und Ausschalten geht; den Rest änderst du in Scheduler.',
    no_scheduler: 'Installiere Scheduler (über HACS), um Zeitpläne anzulegen.', none: 'Keine Zeitpläne gefunden.',
    nw_title: 'Neuer Zeitplan', nw_name: 'Name', nw_device: 'Was soll er steuern?', nw_pick: 'Gerät wählen', nw_create: 'Anlegen', nw_cancel: 'Abbrechen',
    l_title: 'Titel', l_entities: 'Nur diese Zeitpläne (leer = alle)', l_exclude: 'Ausblenden', l_helpers: 'Zeitplan-Helfer zeigen', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    sh_early: "Früh", sh_late: "Spät", sh_free: "Frei", shift_early: "Frühschicht", shift_late: "Spätschicht", shift_free: "Frei", this_week: "Diese Woche", next_week: "Nächste Woche: {s}", swap: "Woche tauschen", vac: "Urlaub", vac_off: "Urlaub beenden", vac_sub: "Jeder Tag läuft wie ein freier Tag, bis du den Urlaub beendest", shift_hint: "Tippe auf einen Tag, um ihn zu ändern (z. B. nach einem Tausch). Jeden Montag wechselt die Schicht von selbst.", follows: "Folgt", m_shift: "Der Schicht", m_fixed: "Jeden Tag gleich", lab_outside: "Außerhalb der Blöcke", o_eco: "Spar {v}", o_value: "Wert", o_off: "Aus", o_none: "Nichts tun", copy_from: "Von {s} kopieren", no_blocks: "keine Blöcke", src_glow: "Glow Schedules", blocks_of: "Blöcke · {s}", every_day: "Blöcke · jeden Tag",
    description: 'Alle Zeitpläne in einer Karte: Scheduler und Zeitplan-Helfer, mit Zeitleisten und Bearbeiten.',
  },
  es: {
    title: 'Horarios', n_active: '{n} de {t} activos', next: ' · siguiente: {name} a las {t}', new: '+ Nuevo', p_active: '{n} activos',
    k_climate: 'Calefacción', k_light: 'Luces', k_switch: 'Enchufes', k_fan: 'Ventilación', k_cover: 'Persianas', k_other: 'Otros',
    st_disabled: 'Apagado · {d}', st_notoday: 'Hoy no · {d}', st_on_until: 'Ahora {a} hasta {t}', st_off_next: 'Apagado · {a} a las {t}', st_manual: "Manual hasta las {t}", st_none: 'Nada más hoy', st_helper_on: 'Activo hasta {t}', st_helper_off: 'Apagado · activo a las {t}',
    d_daily: 'cada día', d_workday: 'laborables', d_weekend: 'fin de semana', d_custom: 'días propios',
    c_daily: 'Cada día', c_workday: 'Laborables', c_weekend: 'Fin de semana', c_custom: 'Elegir',
    days: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'], days_long: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    lab_days: 'Días', lab_blocks: 'Bloques', until: 'a', add_block: '+ Añadir bloque', add_sun: '+ Desde el atardecer',
    sunset: 'atardecer', sunrise: 'amanecer', at_sun: '{t} (sol)',
    outside_off: 'Fuera de los bloques: apagado', outside_none: 'Fuera de los bloques: nada', outside_eco: 'Fuera de los bloques: ahorro {v}', outside_helper: 'Fuera de los bloques: horario inactivo',
    drives: 'Controla', src_scheduler: 'Scheduler', src_thermo: 'mismo horario que la tarjeta del termostato', src_helper: 'ayudante de horario',
    del: 'Eliminar', del_sure: '¿Seguro? Toca otra vez', saving: 'Guardando…', saved: 'Guardado', err: 'No funcionó: {e}',
    act_on: 'encendido', act_off: 'apagado', act_open: 'abierto', act_close: 'cerrado', comfort: 'Confort', eco: 'Ahorro',
    copy_week: 'Copiar a laborables', copy_weekend: 'Copiar al fin de semana',
    ro: 'Este horario tiene acciones que esta tarjeta no puede editar. Puedes activarlo y desactivarlo; el resto se cambia en Scheduler.',
    no_scheduler: 'Instala Scheduler (vía HACS) para crear horarios.', none: 'No se encontraron horarios.',
    nw_title: 'Nuevo horario', nw_name: 'Nombre', nw_device: '¿Qué debe controlar?', nw_pick: 'Elige un dispositivo', nw_create: 'Crear', nw_cancel: 'Cancelar',
    l_title: 'Título', l_entities: 'Solo estos horarios (vacío = todos)', l_exclude: 'Ocultar', l_helpers: 'Mostrar ayudantes de horario', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    sh_early: "Mañana", sh_late: "Tarde", sh_free: "Libre", shift_early: "Turno de mañana", shift_late: "Turno de tarde", shift_free: "Libre", this_week: "Esta semana", next_week: "Próxima semana: {s}", swap: "Cambiar semana", vac: "Vacaciones", vac_off: "Terminar vacaciones", vac_sub: "Cada día funciona como día libre hasta que termines las vacaciones", shift_hint: "Toca un día para cambiarlo (p. ej. tras un cambio). El turno cambia solo cada lunes.", follows: "Sigue", m_shift: "El turno", m_fixed: "Igual cada día", lab_outside: "Fuera de los bloques", o_eco: "Ahorro {v}", o_value: "Valor", o_off: "Apagado", o_none: "Nada", copy_from: "Copiar de {s}", no_blocks: "sin bloques", src_glow: "Glow Schedules", blocks_of: "Bloques · {s}", every_day: "Bloques · cada día",
    description: 'Todos los horarios en una tarjeta: Scheduler y ayudantes de horario, con líneas de tiempo y edición.',
  },
  it: {
    title: 'Programmi', n_active: '{n} di {t} attivi', next: ' · prossimo: {name} alle {t}', new: '+ Nuovo', p_active: '{n} attivi',
    k_climate: 'Riscaldamento', k_light: 'Luci', k_switch: 'Prese', k_fan: 'Ventilazione', k_cover: 'Tapparelle', k_other: 'Altro',
    st_disabled: 'Spento · {d}', st_notoday: 'Non oggi · {d}', st_on_until: 'Ora {a} fino alle {t}', st_off_next: 'Spento · {a} alle {t}', st_manual: "Manuale fino alle {t}", st_none: 'Niente più oggi', st_helper_on: 'Attivo fino alle {t}', st_helper_off: 'Spento · attivo alle {t}',
    d_daily: 'ogni giorno', d_workday: 'feriali', d_weekend: 'fine settimana', d_custom: 'giorni scelti',
    c_daily: 'Ogni giorno', c_workday: 'Feriali', c_weekend: 'Weekend', c_custom: 'Scegli',
    days: ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'], days_long: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
    lab_days: 'Giorni', lab_blocks: 'Fasce', until: 'alle', add_block: '+ Aggiungi fascia', add_sun: '+ Dal tramonto',
    sunset: 'tramonto', sunrise: 'alba', at_sun: '{t} (sole)',
    outside_off: 'Fuori dalle fasce: spento', outside_none: 'Fuori dalle fasce: niente', outside_eco: 'Fuori dalle fasce: eco {v}', outside_helper: 'Fuori dalle fasce: programma spento',
    drives: 'Comanda', src_scheduler: 'Scheduler', src_thermo: 'stesso programma della scheda termostato', src_helper: 'programma HA',
    del: 'Elimina', del_sure: 'Sicuro? Tocca ancora', saving: 'Salvataggio…', saved: 'Salvato', err: 'Non è riuscito: {e}',
    act_on: 'acceso', act_off: 'spento', act_open: 'aperto', act_close: 'chiuso', comfort: 'Comfort', eco: 'Eco',
    copy_week: 'Copia sui feriali', copy_weekend: 'Copia sul weekend',
    ro: 'Questo programma ha azioni che questa scheda non può modificare. Puoi attivarlo e disattivarlo; il resto si cambia in Scheduler.',
    no_scheduler: 'Installa Scheduler (tramite HACS) per creare programmi.', none: 'Nessun programma trovato.',
    nw_title: 'Nuovo programma', nw_name: 'Nome', nw_device: 'Cosa deve comandare?', nw_pick: 'Scegli un dispositivo', nw_create: 'Crea', nw_cancel: 'Annulla',
    l_title: 'Titolo', l_entities: 'Solo questi programmi (vuoto = tutti)', l_exclude: 'Nascondi', l_helpers: 'Mostra i programmi HA', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    sh_early: "Mattina", sh_late: "Sera", sh_free: "Libero", shift_early: "Turno del mattino", shift_late: "Turno serale", shift_free: "Libero", this_week: "Questa settimana", next_week: "Prossima settimana: {s}", swap: "Inverti settimana", vac: "Vacanza", vac_off: "Fine vacanza", vac_sub: "Ogni giorno vale come giorno libero finché non termini la vacanza", shift_hint: "Tocca un giorno per cambiarlo (es. dopo uno scambio). Il turno cambia da solo ogni lunedì.", follows: "Segue", m_shift: "Il turno", m_fixed: "Uguale ogni giorno", lab_outside: "Fuori dalle fasce", o_eco: "Eco {v}", o_value: "Valore", o_off: "Spento", o_none: "Niente", copy_from: "Copia da {s}", no_blocks: "nessuna fascia", src_glow: "Glow Schedules", blocks_of: "Fasce · {s}", every_day: "Fasce · ogni giorno",
    description: 'Tutti i programmi in una scheda: Scheduler e programmi HA, con linee temporali e modifica.',
  },
};
const GSD_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
function gsdLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GSD_I18N[l] ? l : 'en';
}
function gsdT(lang, key, vars) {
  let s = (GSD_I18N[lang] && GSD_I18N[lang][key]) ?? GSD_I18N.en[key] ?? key;
  if (vars && typeof s === 'string') Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function gsdEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const GSD_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const GSD_HDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const GSD_KIND = {
  climate: { c: '255, 166, 107', p: 'M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z' },
  light: { c: '255, 214, 112', p: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z' },
  switch: { c: '143, 227, 184', p: 'M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4' },
  fan: { c: '142, 197, 255', p: 'M12 12a1.5 1.5 0 1 0 0 .01M12 10.5c0-4 1-7 3.5-7s2 4.5-3.5 7zM13.5 12c4 0 7 1 7 3.5s-4.5 2-7-3.5zM12 13.5c0 4-1 7-3.5 7s-2-4.5 3.5-7zM10.5 12c-4 0-7-1-7-3.5s4.5-2 7 3.5z' },
  cover: { c: '185, 168, 255', p: 'M4 4h16M5 4v10h14V4M5 8h14M5 11h14M12 14v3M11 19h2' },
  other: { c: '201, 196, 221', p: 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4' },
};
const GSD_MINT = '143, 227, 184';
const GSD_SHIFT = { early: '255, 214, 112', late: '185, 168, 255', free: '143, 227, 184' };
const GSD_SHIFT_ICON = { early: 'M12 3v3M5.6 5.6l2.1 2.1M3 12h3M18 12h3M16.3 7.7l2.1-2.1M7 17a5 5 0 0 1 10 0M3 20h18', late: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z', free: 'M4 20h16M6 20v-6a6 6 0 0 1 12 0v6M12 4v2', vac: 'M2 20h20M6 20l6-14 6 14M12 6V3' };
// Glow Schedules-tijd ("06:30", "24:00", "sunset+30") naar minuten, en een tijd verschuiven
function gsdGMin(t, sun, end) {
  const s = String(t || '').trim().toLowerCase();
  const m = /^(sunrise|sunset)\s*(?:([+-])\s*(\d+))?$/.exec(s);
  if (m) { const base = (sun && sun[m[1]]) ?? (m[1] === 'sunset' ? 1080 : 450); return Math.max(0, Math.min(1440, base + (m[2] === '-' ? -1 : 1) * parseInt(m[3] || '0', 10))); }
  const p = s.split(':').map((x) => parseInt(x, 10) || 0);
  const v = p[0] * 60 + (p[1] || 0);
  return end && v === 0 ? 1440 : Math.min(1440, v);
}
function gsdGStep(t, d) {
  const s = String(t || '').trim().toLowerCase();
  const m = /^(sunrise|sunset)\s*(?:([+-])\s*(\d+))?$/.exec(s);
  if (m) { const o = Math.max(-240, Math.min(240, (m[2] === '-' ? -1 : 1) * parseInt(m[3] || '0', 10) + d)); return m[1] + (o ? (o > 0 ? '+' : '-') + Math.abs(o) : ''); }
  const v = Math.max(0, Math.min(1440, gsdGMin(s, null, false) + d));
  return v >= 1440 ? '24:00' : String(Math.floor(v / 60)).padStart(2, '0') + ':' + String(v % 60).padStart(2, '0');
}
const gsdIsSun = (t) => /^(sunrise|sunset)/.test(String(t || ''));

const GSD_THEME_VARS = ['--glow-card-background', '--glow-text', '--glow-surface', '--glow-border', '--glow-ink-amount'];
const GSD_NEW_DOMAINS = ['light', 'switch', 'fan', 'cover', 'climate', 'input_boolean'];

const gsdKind = (d) => (d === 'input_boolean' ? 'switch' : GSD_KIND[d] ? d : 'other');
const gsdHM = (h) => { const m = Math.round(h * 60) % 1440; return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
// "06:30:00" → 6.5 ; "sunset+00:30:00" → { sun: 'sunset', m: 30 }
function gsdParseT(s) {
  if (s === null || s === undefined || s === '') return null;
  const m = /^(sunrise|sunset)\s*([+-])\s*(\d+):(\d+)(?::\d+)?$/.exec(String(s));
  if (m) return { sun: m[1], m: (m[2] === '-' ? -1 : 1) * (parseInt(m[3], 10) * 60 + parseInt(m[4], 10)) };
  if (/^(sunrise|sunset)$/.test(String(s))) return { sun: String(s), m: 0 };
  const p = String(s).split(':').map((x) => parseInt(x, 10) || 0);
  return p[0] + p[1] / 60;
}
function gsdFmtT(t, isStop) {
  if (t && typeof t === 'object') {
    const a = Math.abs(t.m);
    return t.sun + (t.m < 0 ? '-' : '+') + String(Math.floor(a / 60)).padStart(2, '0') + ':' + String(a % 60).padStart(2, '0') + ':00';
  }
  if (isStop && t >= 24) return '00:00:00';
  return gsdHM(Math.min(t, 23.99)) + ':00';
}
// een actie die iets uitzet of sluit; al de rest telt als "aan"
function gsdIsOff(a) {
  const s = String(a.service || a.action || '');
  const d = a.service_data || a.data || {};
  if (/\.(turn_off|close_cover|close_valve)$/.test(s)) return true;
  if (/^climate\.set_hvac_mode$/.test(s) && d.hvac_mode === 'off') return true;
  if (/^climate\.set_temperature$/.test(s) && d.hvac_mode === 'off') return true;
  return false;
}

const GSD_STYLE = `
  :host { display: block; }
  ha-card { position: relative; overflow: hidden; box-sizing: border-box; padding: 22px; border-radius: var(--ha-card-border-radius, 26px); display: flex; flex-direction: column; gap: 18px;
    background: linear-gradient(rgba(${GSD_MINT}, 0.05), rgba(${GSD_MINT}, 0.05)), var(--glow-card-background, #15121F); border: 1px solid rgba(${GSD_MINT}, 0.35); color: var(--glow-text, #F3F1FA); box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(${GSD_MINT}, 0.22); container-type: inline-size; user-select: none; -webkit-user-select: none; }
  button, select, input { font: inherit; color: inherit; -webkit-tap-highlight-color: transparent; }
  button { cursor: pointer; touch-action: manipulation; }
  .halo { position: absolute; left: -60px; top: -70px; width: 220px; height: 220px; border-radius: 50%; filter: blur(60px); opacity: 0.3; background: rgb(${GSD_MINT}); pointer-events: none; }
  .ink { color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .head { position: relative; display: flex; align-items: center; gap: 16px; }
  .hi { width: 56px; height: 56px; border-radius: 28px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgb(${GSD_MINT}); color: #1C1730; box-shadow: 0 0 var(--glow) rgba(${GSD_MINT}, 0.85); }
  .ht { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .ht b { font-size: 1.6rem; font-weight: 800; line-height: 1.1; }
  .ht span { font-size: 1rem; font-weight: 700; }
  .nb { flex-shrink: 0; height: 44px; padding: 0 18px; border-radius: 22px; font-size: 0.95rem; font-weight: 800; color: #1C1730; border: 0; background: rgb(${GSD_MINT}); box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(${GSD_MINT}, 0.6); }
  .pills { position: relative; display: flex; gap: 10px; flex-wrap: wrap; }
  .pill { height: 42px; padding: 0 16px; border-radius: 21px; display: inline-flex; align-items: center; gap: 9px; font-size: 0.95rem; font-weight: 800;
    background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .pill.on { background: rgba(var(--c), 0.18); border-color: rgba(var(--c), 0.6); }
  .pill i { width: 10px; height: 10px; border-radius: 5px; background: rgb(var(--c)); box-shadow: 0 0 8px rgba(var(--c), 0.9); }
  .list { position: relative; display: flex; flex-direction: column; gap: 10px; }
  .scale, .top { display: grid; grid-template-columns: 44px minmax(0, 0.95fr) minmax(0, 1.35fr) 56px; gap: 14px; align-items: center; }
  .scale { margin-bottom: -4px; }
  .scale span { grid-column: 3; display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 800; opacity: 0.5; }
  .scale em { font-style: normal; }
  .item { display: flex; flex-direction: column; gap: 12px; padding: 12px 16px; border-radius: 20px; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .item.open { background: linear-gradient(rgba(var(--c), 0.09), rgba(var(--c), 0.09)), var(--glow-card-background, #1A1726); border-color: rgba(var(--c), 0.5); box-shadow: 0 0 var(--glow) rgba(var(--c), 0.22); }
  .top { cursor: pointer; }
  .ic { width: 44px; height: 44px; border-radius: 22px; display: flex; align-items: center; justify-content: center; box-sizing: border-box; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid rgba(var(--c), 0.4); }
  .ic svg { color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .on .ic { background: rgb(var(--c)); border: 0; box-shadow: 0 0 calc(var(--glow) * 0.8) rgba(var(--c), 0.8); }
  .on .ic svg { color: #1C1730; }
  .tx { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .tx b { font-size: 1.1rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tx span { font-size: 0.88rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; opacity: 0.6; }
  .tx span.ink { opacity: 1; }
  .bar { position: relative; height: 24px; border-radius: 8px; overflow: hidden; background: var(--glow-surface, rgba(255,255,255,0.06)); }
  .bar.dim { opacity: 0.4; }
  .bar i, .col i { position: absolute; border-radius: 6px; background: rgb(var(--c)); opacity: 0.35; }
  .bar i { top: 0; bottom: 0; }
  .on .bar i, .on .col i { opacity: 0.95; box-shadow: 0 0 8px rgba(var(--c), 0.55); }
  .bar u { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--glow-text, #F3F1FA); opacity: 0.08; }
  .bar b { position: absolute; top: -2px; bottom: -2px; width: 2px; background: var(--glow-text, #F3F1FA); }
  .tog { width: 56px; height: 32px; border-radius: 16px; border: 0; padding: 0; position: relative; background: var(--glow-surface, rgba(255,255,255,0.14)); }
  .tog::after { content: ''; position: absolute; top: 4px; left: 4px; width: 24px; height: 24px; border-radius: 12px; background: #fff; transition: left 0.2s; }
  .tog.on { background: rgb(var(--c)); box-shadow: 0 0 calc(var(--glow) * 0.7) rgba(var(--c), 0.6); }
  .tog.on::after { left: 28px; }
  .tog.none { visibility: hidden; }
  .ed { display: flex; flex-direction: column; gap: 16px; }
  .lab { font-size: 0.8rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; margin-right: 4px; }
  .chips { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .ch { height: 36px; padding: 0 14px; border-radius: 18px; font-size: 0.88rem; font-weight: 800; background: transparent; border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .ch.sel { background: rgba(var(--c), 0.18); border-color: rgba(var(--c), 0.6); color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .week { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px; }
  .wd { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 0; background: none; border: 0; }
  .wd > span { font-size: 0.82rem; font-weight: 800; opacity: 0.6; }
  .wd.today > span { opacity: 1; color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .col { position: relative; width: 100%; height: 110px; border-radius: 10px; overflow: hidden; box-sizing: border-box; background: var(--glow-surface, rgba(255,255,255,0.06)); border: 1px solid transparent; }
  .col i { left: 0; right: 0; }
  .wd.off .col { opacity: 0.3; }
  .wd.today .col { border-color: rgba(var(--c), 0.6); }
  .wd.sel .col { border-color: rgb(var(--c)); border-width: 2px; }
  .blks { display: flex; flex-direction: column; gap: 8px; }
  .blk { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 8px 10px; border-radius: 16px; background: var(--glow-surface, rgba(255,255,255,0.07)); }
  .tp { display: flex; align-items: center; gap: 6px; }
  .tm { min-width: 54px; text-align: center; font-size: 1.1rem; font-weight: 800; font-variant-numeric: tabular-nums; }
  .tm.sun { min-width: 0; font-size: 0.92rem; color: color-mix(in srgb, rgb(185, 168, 255), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .to { font-weight: 800; opacity: 0.5; }
  .gap { flex: 1; }
  .mini { width: 36px; height: 36px; border-radius: 12px; font-size: 1.1rem; font-weight: 800; flex-shrink: 0; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .mini:active { background: rgba(var(--c), 0.3); }
  .act { height: 32px; padding: 0 12px; border-radius: 16px; display: inline-flex; align-items: center; font-size: 0.82rem; font-weight: 800; color: #1C1730; background: rgb(var(--c)); }
  .adds { display: flex; gap: 8px; }
  .add { flex: 1; height: 42px; border-radius: 16px; font-size: 0.88rem; font-weight: 800; background: transparent; border: 1px dashed var(--glow-border, rgba(255,255,255,0.2)); }
  .note { font-size: 0.82rem; font-weight: 700; opacity: 0.6; }
  .temps { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .tb { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 16px; background: rgba(var(--k), 0.12); border: 1px solid rgba(var(--k), 0.4); }
  .tb .l { flex: 1; font-size: 0.92rem; font-weight: 800; }
  .tb .v { min-width: 54px; text-align: center; font-size: 1.1rem; font-weight: 800; }
  .foot { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding-top: 12px; border-top: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .tg { height: 34px; padding: 0 14px; border-radius: 17px; display: inline-flex; align-items: center; font-size: 0.88rem; font-weight: 800; background: rgba(var(--c), 0.16); border: 1px solid rgba(var(--c), 0.5); color: color-mix(in srgb, rgb(var(--c)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  select.tg { appearance: none; -webkit-appearance: none; padding-right: 30px; max-width: 100%; background-image: linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%); background-position: right 15px center, right 10px center; background-size: 5px 5px; background-repeat: no-repeat; }
  select option { color: #1C1730; }
  .src { font-size: 0.8rem; font-weight: 700; opacity: 0.55; }
  .del { height: 34px; padding: 0 14px; border-radius: 17px; font-size: 0.82rem; font-weight: 800; background: transparent; border: 1px solid rgba(255, 143, 143, 0.5); color: #FF8F8F; }
  .del.sure { background: #FF8F8F; color: #1C1730; }
  .msg { font-size: 0.82rem; font-weight: 700; opacity: 0.6; text-align: right; min-height: 1em; }
  .msg.err { color: #FF8F8F; opacity: 1; }
  .empty { font-weight: 700; opacity: 0.6; padding: 8px 0; }
  .nw { position: relative; display: flex; flex-direction: column; gap: 12px; padding: 16px; border-radius: 20px; background: linear-gradient(rgba(${GSD_MINT}, 0.08), rgba(${GSD_MINT}, 0.08)), var(--glow-card-background, #1A1726); border: 1px solid rgba(${GSD_MINT}, 0.5); }
  .nw b { font-size: 1.15rem; font-weight: 800; }
  .nw input, .nw select { height: 44px; border-radius: 14px; padding: 0 14px; font-size: 1rem; font-weight: 700; box-sizing: border-box; width: 100%; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.12)); }
  .nw label { display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; font-weight: 800; opacity: 0.85; }
  .nwb { display: flex; gap: 10px; justify-content: flex-end; }
  .go { height: 44px; padding: 0 20px; border-radius: 22px; font-weight: 800; border: 0; color: #1C1730; background: rgb(${GSD_MINT}); }
  .go[disabled] { opacity: 0.5; }
  .cancel { height: 44px; padding: 0 18px; border-radius: 22px; font-weight: 800; background: transparent; border: 1px solid var(--glow-border, rgba(255,255,255,0.15)); }
  .shift { position: relative; display: flex; flex-direction: column; gap: 14px; padding: 16px; border-radius: 22px; background: linear-gradient(rgba(var(--s), 0.10), rgba(var(--s), 0.10)), var(--glow-card-background, #1A1726); border: 1px solid rgba(var(--s), 0.5); box-shadow: 0 0 var(--glow) rgba(var(--s), 0.2); }
  .sh { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .so { width: 50px; height: 50px; border-radius: 25px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: #1C1730; background: rgb(var(--s)); box-shadow: 0 0 var(--glow) rgba(var(--s), 0.8); }
  .st { flex: 1; min-width: 160px; display: flex; flex-direction: column; gap: 2px; }
  .st b { font-size: 1.4rem; font-weight: 800; line-height: 1.15; color: color-mix(in srgb, rgb(var(--s)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .st > span:last-child { font-size: 0.88rem; font-weight: 700; opacity: 0.65; }
  .sb { display: flex; gap: 8px; flex-wrap: wrap; }
  .ghost { height: 40px; padding: 0 14px; border-radius: 20px; font-size: 0.88rem; font-weight: 800; background: transparent; border: 1px solid var(--glow-border, rgba(255,255,255,0.12)); }
  .ghost[disabled] { opacity: 0.4; }
  .ghost.vac { border-color: rgba(255, 143, 143, 0.45); color: #FF8F8F; }
  .ghost.vac.on { background: rgba(255, 143, 143, 0.2); border-color: rgba(255, 143, 143, 0.8); }
  .sds { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 8px; }
  .sd { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 10px 0 8px; border-radius: 16px; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); min-width: 0; }
  .sd.today { background: rgba(var(--s), 0.14); border-color: rgba(var(--s), 0.6); }
  .sd .dn { font-size: 0.8rem; font-weight: 800; opacity: 0.7; }
  .sd .sc { height: 28px; padding: 0 10px; border-radius: 14px; display: inline-flex; align-items: center; font-size: 0.8rem; font-weight: 800; color: #1C1730; background: rgb(var(--s)); box-shadow: 0 0 calc(var(--glow) * 0.6) rgba(var(--s), 0.5); max-width: calc(100% - 8px); box-sizing: border-box; overflow: hidden; }
  .sd i { width: 6px; height: 6px; border-radius: 3px; }
  .sd i.ov { background: var(--glow-text, #F3F1FA); }
  .tag { font-style: normal; display: inline-flex; align-items: center; height: 20px; padding: 0 8px; margin-right: 6px; border-radius: 10px; font-size: 0.75rem; font-weight: 800; color: #1C1730; background: rgb(var(--s)); vertical-align: 1px; }
  .vts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
  .vt { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 16px; text-align: left; min-width: 0; overflow: hidden; background: var(--glow-surface, rgba(255,255,255,0.07)); border: 1px solid var(--glow-border, rgba(255,255,255,0.1)); }
  .vt.sel { background: rgba(var(--s), 0.18); border-color: rgba(var(--s), 0.7); box-shadow: 0 0 calc(var(--glow) * 0.6) rgba(var(--s), 0.3); }
  .vt i { flex-shrink: 0; width: 12px; height: 12px; border-radius: 6px; background: rgb(var(--s)); box-shadow: 0 0 8px rgba(var(--s), 0.9); }
  .vt > span { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .vt b { font-size: 0.92rem; font-weight: 800; }
  .vt > span > span { font-size: 0.75rem; font-weight: 700; opacity: 0.65; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .wd .wv { font-size: 0.7rem; font-weight: 800; color: color-mix(in srgb, rgb(var(--s)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .wd.off .wv { opacity: 0.5; }
  @container (max-width: 560px) {
    .sds { gap: 4px; }
    .sd { padding: 8px 0 6px; border-radius: 12px; }
    .sd .sc { padding: 0 4px; height: 22px; font-size: 0.66rem; max-width: calc(100% - 4px); }
    .vts { grid-template-columns: minmax(0, 1fr); }
    .sb { width: 100%; }
    .sb .ghost { flex: 1; }
  }
  @container (max-width: 560px) {
    ha-card { padding: 16px; gap: 14px; }
    .scale { display: none; }
    .top { grid-template-columns: 44px minmax(0, 1fr) 56px; row-gap: 10px; }
    .top .bar { grid-column: 1 / -1; grid-row: 2; height: 18px; }
    .temps { grid-template-columns: minmax(0, 1fr); }
    .col { height: 84px; }
    .hi { width: 46px; height: 46px; }
    .ht b { font-size: 1.35rem; }
    .ht span { font-size: 0.88rem; }
    .tx b { white-space: normal; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: 1rem; line-height: 1.2; }
    .tx span { white-space: normal; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: 0.82rem; }
    .blk { gap: 6px; }
  }
`;

const GSD_DEF = { glow: 15, helpers: true };

class GlowScheduleCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._filter = 'all';
    this._open = null;
    this._day = (new Date().getDay() + 6) % 7;
    this._sched = null; // ruwe Scheduler-lijst
    this._helpers = null; // schema-helpers: { entity_id: item }
    this._edits = {}; // lokaal aangepaste schema's die nog bewaard moeten worden
    this._gtab = {}; // gekozen ploeg per Glow-schema in de editor
    this._glow = null;
    this._onExt = (e) => { if (!e.detail || e.detail.from !== this) { this._helpers = null; this._fetch(true); } };
  }
  static getConfigElement() { return document.createElement('glow-schedule-card-editor'); }
  static getStubConfig() { return {}; }
  setConfig(config) {
    this._config = { ...GSD_DEF, ...(config || {}) };
    this._key = null;
    if (this._hass) this._render();
  }
  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    const sig = this._sig();
    if (first || sig !== this._lastSig) { this._lastSig = sig; this._fetch(!first); }
    if (!this._typing) this._render();
  }
  connectedCallback() {
    window.addEventListener('glow-schedule-changed', this._onExt);
    this._tick = setInterval(() => { this._key = null; if (!this._typing) this._render(); }, 60000);
  }
  disconnectedCallback() { window.removeEventListener('glow-schedule-changed', this._onExt); clearInterval(this._tick); }
  getCardSize() { return 8; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }
  _lang() { return gsdLang(this._hass, this._config && this._config.language); }
  _t(k, v) { return gsdT(this._lang(), k, v); }

  // verandert er iets aan een schema in Home Assistant, dan opnieuw ophalen
  _sig() {
    const st = this._hass.states;
    const g = Object.keys(st).find((e) => e.startsWith('sensor.glow_schedules') && st[e].attributes.rotation);
    return (g ? g + st[g].state + st[g].attributes.revision + JSON.stringify(st[g].attributes.week) : '') + Object.keys(st).filter((e) => e.startsWith('switch.schedule_') || e.startsWith('schedule.')).sort()
      .map((e) => e + st[e].state + JSON.stringify(st[e].attributes.timeslots || '') + (st[e].attributes.weekdays || '') + (st[e].attributes.entities || '') + (st[e].attributes.friendly_name || '')).join('|');
  }

  async _fetch(force) {
    if (this._fetching) { this._refetch = true; return; }
    this._fetching = true;
    try {
      try { this._glow = await this._hass.callWS({ type: 'glow_schedules/get' }); } catch (e) { this._glow = null; }
      if (this._sched === null || force) {
        try { this._sched = await this._hass.callWS({ type: 'scheduler' }); this._noScheduler = false; } catch (e) { this._sched = []; this._noScheduler = true; }
      }
      if (this._config.helpers !== false && (this._helpers === null || force)) {
        try {
          const [list, reg] = await Promise.all([this._hass.callWS({ type: 'schedule/list' }), this._hass.callWS({ type: 'config/entity_registry/list' })]);
          const byUid = {};
          reg.filter((r) => r.platform === 'schedule').forEach((r) => { byUid[r.unique_id] = r.entity_id; });
          const h = {};
          list.forEach((it) => { const id = byUid[it.id]; if (id) h[id] = it; });
          this._helpers = h;
        } catch (e) { this._helpers = {}; }
      }
    } finally {
      this._fetching = false;
      this._key = null;
      if (!this._typing) this._render();
      if (this._refetch) { this._refetch = false; this._fetch(true); }
    }
  }

  /* ---------- omzetten naar één model ---------- */

  _sun(kind) {
    const s = this._hass.states['sun.sun'];
    const iso = s && s.attributes[kind === 'sunrise' ? 'next_rising' : 'next_setting'];
    if (!iso) return kind === 'sunrise' ? 7.5 : 18;
    const d = new Date(iso);
    return d.getHours() + d.getMinutes() / 60;
  }
  _h(t) { if (t && typeof t === 'object') return Math.max(0, Math.min(24, this._sun(t.sun) + t.m / 60)); return t; }

  _fromScheduler(raw) {
    const st = this._hass.states[raw.entity_id];
    const slots = raw.timeslots || [];
    const acts = [].concat(...slots.map((s) => s.actions || []));
    const targets = [...new Set(acts.map((a) => a.entity_id).filter(Boolean))];
    const dom = targets.length ? targets[0].split('.')[0] : String((acts[0] && acts[0].service) || '').split('.')[0];
    let ro = slots.some((s) => !s.stop) || !acts.length;
    const blocks = [];
    let onTpl = null, offTpl = null, fill = false;
    slots.forEach((s) => {
      const off = (s.actions || []).length && (s.actions || []).every(gsdIsOff);
      if (off) { fill = true; if (!offTpl) offTpl = s.actions; return; }
      if (!onTpl) onTpl = s.actions;
      blocks.push({ a: gsdParseT(s.start), b: gsdParseT(s.stop) || 24, acts: s.actions });
    });
    // aaneensluitende "aan"-blokken met dezelfde actie samenvoegen
    blocks.sort((x, y) => this._h(x.a) - this._h(y.a));
    const wd = raw.weekdays || ['daily'];
    let days = 'custom';
    if (wd.includes('daily')) days = 'daily'; else if (wd.length === 1 && wd[0] === 'workday') days = 'workday'; else if (wd.length === 1 && wd[0] === 'weekend') days = 'weekend';
    if (wd.some((d) => !GSD_DAYS.includes(d) && !['daily', 'workday', 'weekend'].includes(d))) ro = true;
    const s0 = slots[0] || {};
    return {
      key: raw.entity_id, src: 'scheduler', id: raw.schedule_id, raw,
      name: raw.name || (st && st.attributes.friendly_name) || raw.entity_id,
      targets, dom, kind: gsdKind(dom),
      enabled: st ? st.state !== 'off' : !!raw.enabled,
      days, dset: GSD_DAYS.map((d) => wd.includes(d)), blocks, fill, onTpl, offTpl, ro,
      cond: (s0.conditions || []).length ? { conditions: s0.conditions, condition_type: s0.condition_type || 'or', track_conditions: !!s0.track_conditions } : null,
      repeat: raw.repeat_type || 'repeat', tags: raw.tags || [],
    };
  }

  _fromHelper(eid, it) {
    const st = this._hass.states;
    const obj = eid.split('.')[1];
    const thermo = obj.endsWith('_schema') && st['climate.' + obj.slice(0, -7)] ? 'climate.' + obj.slice(0, -7) : null;
    const base = thermo ? thermo.split('.')[1] : null;
    const ids = thermo ? { comfort: 'input_number.' + base + '_comfort', eco: 'input_number.' + base + '_spaarstand', active: 'input_boolean.' + base + '_schema_actief' } : null;
    const week = GSD_HDAYS.map((d) => (it[d] || []).map((b) => [gsdParseT(b.from), gsdParseT(b.to) || 24]).sort((x, y) => x[0] - y[0]));
    return {
      key: eid, src: 'helper', id: it.id, raw: it, thermo, ids,
      name: thermo ? ((st[thermo].attributes.friendly_name || 'Thermostaat') + ' · ' + this._t('comfort').toLowerCase()) : (it.name || (st[eid] && st[eid].attributes.friendly_name) || eid),
      targets: thermo ? [thermo] : [], dom: thermo ? 'climate' : 'schedule', kind: thermo ? 'climate' : 'other',
      enabled: ids && st[ids.active] ? st[ids.active].state === 'on' : null,
      week,
    };
  }

  _items() {
    const c = this._config;
    const out = [];
    ((this._glow && this._glow.schedules) || []).forEach((g) => { out.push(this._edits['glow:' + g.id] || this._fromGlow(g)); });
    (this._sched || []).forEach((r) => { out.push(this._edits[r.entity_id] || this._fromScheduler(r)); });
    if (c.helpers !== false) Object.keys(this._helpers || {}).forEach((eid) => { out.push(this._edits[eid] || this._fromHelper(eid, this._helpers[eid])); });
    const only = [].concat(c.entities || []).map((x) => (typeof x === 'string' ? x : x.entity));
    const ex = new Set([].concat(c.exclude || []));
    return out.filter((x) => (!only.length || only.includes(x.key)) && !ex.has(x.key))
      .sort((a, b) => (only.length ? only.indexOf(a.key) - only.indexOf(b.key) : 0) || (a.kind === b.kind ? 0 : a.kind === 'climate' ? -1 : b.kind === 'climate' ? 1 : a.kind.localeCompare(b.kind)) || a.name.localeCompare(b.name));
  }

  _fromGlow(g) {
    const dom = (g.targets[0] || 'x.x').split('.')[0];
    return {
      key: 'glow:' + g.id, src: 'glow', id: g.id, raw: g, name: g.name, targets: g.targets.slice(), dom, kind: gsdKind(dom),
      enabled: g.enabled !== false, mode: g.mode, gb: JSON.parse(JSON.stringify(g.blocks || {})),
      outside: g.outside || 'off', outside_value: g.outside_value ?? null, value: g.value ?? null, icon: g.icon,
    };
  }
  _shiftOf(d) { const w = this._glow && this._glow.week && this._glow.week[d]; return w ? w.shift : 'free'; }
  _variant(x, d) { return x.mode === 'shift' ? this._shiftOf(d) : 'all'; }
  _gBlocks(x, v) {
    const sun = this._glow && this._glow.sun;
    return (x.gb[v] || []).map((b, j) => ({ j, a: gsdGMin(b.from, sun) / 60, b: gsdGMin(b.to, sun, true) / 60, v: b.value ?? null, from: b.from, to: b.to }))
      .filter((b) => b.b > b.a).sort((p, q) => p.a - q.a);
  }
  _gVal(x, v) {
    const val = v ?? x.value;
    if (val === null || val === undefined || val === '') return null;
    if (typeof val === 'string' && val.includes('.') && isNaN(Number(val))) return this._num(val);
    return parseFloat(val);
  }
  _gAct(x, v) {
    const raw = v ?? x.value;
    const n = this._gVal(x, v);
    if (x.dom === 'climate') {
      if (n === null || isNaN(n)) return this._t('act_on');
      return (typeof raw === 'string' && /comfort/.test(raw) ? this._t('comfort') + ' ' : '') + this._fmtTemp(n);
    }
    if (x.dom === 'cover') return n === null || isNaN(n) ? this._t('act_open') : n + ' %';
    if (x.dom === 'light' && n !== null && !isNaN(n)) return this._t('act_on') + ' ' + Math.round(n) + ' %';
    return this._t('act_on');
  }
  _inc(x, d) {
    if (x.src === 'glow') return true;
    if (x.src === 'helper') return x.week[d].length > 0;

    return x.days === 'daily' ? true : x.days === 'workday' ? d < 5 : x.days === 'weekend' ? d >= 5 : !!x.dset[d];
  }
  _dayBlocks(x, d) {
    if (x.src === 'glow') return this._gBlocks(x, this._variant(x, d)).map((b) => ({ a: b.a, b: b.b, v: b.v, glow: true }));
    if (x.src === 'helper') return x.week[d].map((b) => ({ a: b[0], b: b[1] }));
    return this._inc(x, d) ? x.blocks : [];
  }

  _actLabel(x, acts) {
    const a = (acts || [])[0] || {};
    const s = String(a.service || '');
    const d = a.service_data || {};
    if (x.thermo) return this._t('comfort') + ' ' + this._fmtTemp(this._num(x.ids.comfort));
    if (/set_temperature$/.test(s) && d.temperature !== undefined) return this._fmtTemp(d.temperature);
    if (/open_cover$/.test(s)) return this._t('act_open');
    if (/set_cover_position$/.test(s)) return (d.position ?? '') + ' %';
    if (/turn_on$/.test(s) && d.brightness_pct !== undefined) return this._t('act_on') + ' ' + d.brightness_pct + ' %';
    if (/turn_on$/.test(s) || !s) return this._t('act_on');
    return s.split('.')[1].replace(/_/g, ' ');
  }
  _fmtTemp(v) { const n = parseFloat(v); return isNaN(n) ? '–' : n.toLocaleString(this._lang(), { minimumFractionDigits: n % 1 ? 1 : 0, maximumFractionDigits: 1 }) + ' °C'; }
  _num(id) { const s = this._hass.states[id]; return s ? parseFloat(s.state) : NaN; }
  _tLabel(t) { if (t && typeof t === 'object') return this._t(t.sun) + (t.m ? (t.m > 0 ? ' +' : ' −') + Math.abs(t.m) : ''); return gsdHM(t); }

  _status(x, now) {
    const today = (now.getDay() + 6) % 7;
    const h = now.getHours() + now.getMinutes() / 60;
    const dTxt = x.src === 'glow' ? (x.mode === 'shift' ? this._t('shift_' + this._shiftOf(today)) : this._t('d_daily')) : x.src === 'helper' ? '' : this._t('d_' + x.days);
    if (x.enabled === false) return { text: this._t('st_disabled', { d: dTxt || this._t('d_custom') }).replace(/ · $/, ''), on: false };
    if (x.src === 'glow' && x.raw.manual && x.raw.now) return { text: this._t('st_manual', { t: gsdHM((x.raw.now.end % 1440) / 60) }), on: true };
    if (!this._inc(x, today)) return { text: this._t('st_notoday', { d: dTxt }), on: false };
    const bl = this._dayBlocks(x, today).map((b) => ({ a: this._h(b.a), b: this._h(b.b), ra: b.a, acts: b.acts, v: b.v })).sort((p, q) => p.a - q.a);
    const cur = bl.find((b) => h >= b.a && h < b.b);
    const act = (b) => { const l = x.src === 'glow' ? this._gAct(x, b && b.v) : this._actLabel(x, b && b.acts); return l.charAt(0).toLowerCase() + l.slice(1); };
    if (cur) return { text: x.src === 'helper' && !x.thermo ? this._t('st_helper_on', { t: gsdHM(cur.b) }) : this._t('st_on_until', { a: act(cur), t: gsdHM(cur.b % 24) }), on: true };
    const nx = bl.find((b) => b.a > h);
    if (!nx) return { text: this._t('st_none'), on: false, next: null };
    const tt = nx.ra && typeof nx.ra === 'object' ? this._t('at_sun', { t: gsdHM(nx.a) }) : gsdHM(nx.a);
    return { text: x.src === 'helper' && !x.thermo ? this._t('st_helper_off', { t: tt }) : this._t('st_off_next', { a: act(nx), t: tt }), on: false, next: nx.a };
  }

  /* ---------- tekenen ---------- */

  _render() {
    if (!this._hass || !this._config) return;
    const c = this._config;
    const now = new Date();
    const items = this._items();
    const key = JSON.stringify([this._filter, this._open, this._day, this._new, this._sure, this._msg, this._lang(), now.getHours(), now.getMinutes(), items.map((x) => [x.key, x.enabled, x.name, x.targets, x.days, x.dset, x.blocks, x.week, x.thermo && [this._num(x.ids.comfort), this._num(x.ids.eco)]]), this._noScheduler, this._glow && [this._glow.revision, this._glow.week, this._glow.next_week, this._glow.shifts], this._gtab, items.map((x) => x.src === 'glow' ? [x.mode, x.gb, x.outside, x.outside_value] : 0), c]);
    if (key === this._key) return;
    this._key = key;
    const today = (now.getDay() + 6) % 7;
    const nowH = now.getHours() + now.getMinutes() / 60;
    const nowPct = (nowH / 24 * 100).toFixed(2);
    const f = this._filter;
    const st = items.map((x) => this._status(x, now));
    const nAct = items.filter((x) => x.enabled !== false).length;
    // wat gebeurt er straks als eerste?
    let next = null;
    items.forEach((x, i) => { if (st[i].next !== undefined && st[i].next !== null && (!next || st[i].next < next.t)) next = { t: st[i].next, name: x.name }; });
    const sub = this._t('n_active', { n: nAct, t: items.length }) + (next ? this._t('next', { name: next.name, t: gsdHM(next.t) }) : '');

    const kinds = [...new Set(items.map((x) => x.kind))];
    let pills = `<button type="button" class="pill${f === 'on' ? ' on ink' : ''}" style="--c:${GSD_MINT}" data-a="filter" data-v="on"><i></i>${gsdEsc(this._t('p_active', { n: nAct }))}</button>`;
    if (kinds.length > 1) kinds.forEach((k) => { pills += `<button type="button" class="pill${f === k ? ' on ink' : ''}" style="--c:${GSD_KIND[k].c}" data-a="filter" data-v="${k}"><i></i>${gsdEsc(this._t('k_' + k))}</button>`; });

    const seg = (b, vertical) => {
      const a = this._h(b.a), e = this._h(b.b);
      if (e <= a) return '';
      const p = (a / 24 * 100).toFixed(2), w = ((e - a) / 24 * 100).toFixed(2);
      return vertical ? `<i style="top:${p}%;height:${w}%"></i>` : `<i style="left:${p}%;width:${w}%"></i>`;
    };
    const shown = items.map((x, i) => [x, st[i]]).filter(([x]) => f === 'all' || (f === 'on' ? x.enabled !== false : x.kind === f));
    const rows = shown.map(([x, s]) => {
      const k = GSD_KIND[x.kind];
      const open = this._open === x.key;
      const on = x.enabled !== false;
      const incToday = this._inc(x, today);
      return `<div class="item${open ? ' open' : ''}${on ? ' on' : ''}" style="--c:${k.c}">
        <div class="top" data-a="open" data-k="${gsdEsc(x.key)}">
          <span class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${k.p}"/></svg></span>
          <span class="tx"><b>${gsdEsc(x.name)}</b><span class="${s.on ? 'ink' : ''}">${x.src === 'glow' && x.mode === 'shift' ? `<em class="tag" style="--s:${GSD_SHIFT[this._shiftOf(today)]}">${gsdEsc(this._t('sh_' + this._shiftOf(today)))}</em>` : ''}${gsdEsc(s.text)}</span></span>
          <span class="bar${incToday ? '' : ' dim'}"><u style="left:25%"></u><u style="left:50%"></u><u style="left:75%"></u>${this._dayBlocks(x, today).map((b) => seg(b)).join('')}${incToday && on ? `<b style="left:${nowPct}%"></b>` : ''}</span>
          <button type="button" class="tog${on ? ' on' : ''}${x.enabled === null ? ' none' : ''}" data-a="toggle" data-k="${gsdEsc(x.key)}" aria-label="${gsdEsc(x.name)}"></button>
        </div>
        ${open ? (x.src === 'glow' ? this._editorGlow(x, seg, today) : this._editor(x, seg, today)) : ''}
      </div>`;
    }).join('');

    const empty = !items.length && this._sched !== null ? `<div class="empty">${gsdEsc(this._t(this._noScheduler && !this._glow ? 'no_scheduler' : 'none'))}</div>` : '';
    this.shadowRoot.innerHTML = `<style>${GSD_STYLE}</style>
      <ha-card style="--glow:${parseInt(c.glow, 10) || 0}px">
        <div class="halo"></div>
        <div class="head"><span class="hi"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4M12 13v3l2 1"/></svg></span>
          <span class="ht"><b>${gsdEsc(c.title || this._t('title'))}</b><span class="ink" style="--c:${GSD_MINT}">${gsdEsc(sub)}</span></span>
          ${this._noScheduler && !this._glow ? '' : `<button type="button" class="nb" data-a="new">${gsdEsc(this._t('new'))}</button>`}</div>
        ${this._new ? this._newPanel() : ''}
        ${this._glow && this._glow.week ? this._shiftPanel() : ''}
        ${items.length > 1 ? `<div class="pills">${pills}</div>` : ''}
        <div class="list">
          ${shown.length ? '<div class="scale"><span><em>0</em><em>6</em><em>12</em><em>18</em><em>24</em></span></div>' : ''}
          ${rows}${empty}
        </div>
      </ha-card>`;
    const card = this.shadowRoot.querySelector('ha-card');
    card.addEventListener('click', (e) => this._click(e));
    card.querySelectorAll('select[data-a="target"]').forEach((s) => s.addEventListener('change', () => this._setTarget(s.dataset.k, s.value)));
    const nw = card.querySelector('.nw');
    if (nw) {
      const inp = nw.querySelector('input');
      inp.addEventListener('focus', () => { this._typing = true; });
      inp.addEventListener('blur', () => { this._typing = false; });
      inp.addEventListener('input', () => { this._new.name = inp.value; nw.querySelector('.go').disabled = !(this._new.name.trim() && this._new.entity); });
      nw.querySelector('select').addEventListener('change', (e) => { this._new.entity = e.target.value; this._key = null; this._render(); });
    }
  }

  _editor(x, seg, today) {
    const k = GSD_KIND[x.kind];
    const t = this._t.bind(this);
    const days = t('days');
    let html = '<div class="ed">';
    if (x.src === 'scheduler' && x.ro) html += `<span class="note">${gsdEsc(t('ro'))}</span>`;
    if (x.thermo) {
      const temp = (key, id, col) => `<div class="tb" style="--k:${col}"><span class="l">${gsdEsc(t(key))}</span><button type="button" class="mini" data-a="temp" data-k="${gsdEsc(x.key)}" data-id="${id}" data-d="-1">−</button><span class="v">${gsdEsc(this._fmtTemp(this._num(id)))}</span><button type="button" class="mini" data-a="temp" data-k="${gsdEsc(x.key)}" data-id="${id}" data-d="1">+</button></div>`;
      html += `<div class="temps">${temp('comfort', x.ids.comfort, GSD_KIND.climate.c)}${temp('eco', x.ids.eco, GSD_KIND.fan.c)}</div>`;
    }
    const editable = !(x.src === 'scheduler' && x.ro);
    if (x.src === 'scheduler') {
      html += `<div class="chips"><span class="lab">${gsdEsc(t('lab_days'))}</span>` + ['daily', 'workday', 'weekend', 'custom'].map((v) => `<button type="button" class="ch${x.days === v ? ' sel' : ''}" data-a="days" data-k="${gsdEsc(x.key)}" data-v="${v}"${editable ? '' : ' disabled'}>${gsdEsc(t('c_' + v))}</button>`).join('') + '</div>';
    }
    // weekoverzicht; bij helpers en "zelf kiezen" kan je op een dag tikken
    const sel = x.src === 'helper' ? this._day : -1;
    html += '<div class="week">' + days.map((n, d) => {
      const inc = this._inc(x, d);
      return `<button type="button" class="wd${d === today ? ' today' : ''}${inc ? '' : ' off'}${d === sel ? ' sel' : ''}" data-a="wd" data-k="${gsdEsc(x.key)}" data-d="${d}"><span>${gsdEsc(n)}</span><span class="col">${this._dayBlocks(x, d).map((b) => seg(b, true)).join('')}</span></button>`;
    }).join('') + '</div>';

    const blocks = x.src === 'helper' ? x.week[this._day].map((b) => ({ a: b[0], b: b[1] })) : x.blocks;
    const title = x.src === 'helper' ? t('days_long')[this._day] : t('lab_blocks');
    html += `<div class="blks"><div class="chips" style="justify-content:space-between"><span class="lab">${gsdEsc(title)}</span>${x.src === 'helper' ? `<button type="button" class="ch sel" data-a="copy" data-k="${gsdEsc(x.key)}">${gsdEsc(t(this._day < 5 ? 'copy_week' : 'copy_weekend'))}</button>` : ''}</div>`;
    blocks.forEach((b, j) => {
      const tp = (end) => {
        const v = end ? b.b : b.a;
        const sun = v && typeof v === 'object';
        return `<span class="tp"><button type="button" class="mini" data-a="mv" data-k="${gsdEsc(x.key)}" data-j="${j}" data-e="${end ? 1 : 0}" data-d="-1"${editable ? '' : ' disabled'}>−</button><span class="tm${sun ? ' sun' : ''}">${gsdEsc(this._tLabel(v))}</span><button type="button" class="mini" data-a="mv" data-k="${gsdEsc(x.key)}" data-j="${j}" data-e="${end ? 1 : 0}" data-d="1"${editable ? '' : ' disabled'}>+</button></span>`;
      };
      const isTemp = x.src === 'scheduler' && b.acts && b.acts.some((a) => /set_temperature$/.test(a.service || '') && (a.service_data || {}).temperature !== undefined);
      const actChip = isTemp
        ? `<span class="tp"><button type="button" class="mini" data-a="val" data-k="${gsdEsc(x.key)}" data-j="${j}" data-d="-1"${editable ? '' : ' disabled'}>−</button><span class="act">${gsdEsc(this._actLabel(x, b.acts))}</span><button type="button" class="mini" data-a="val" data-k="${gsdEsc(x.key)}" data-j="${j}" data-d="1"${editable ? '' : ' disabled'}>+</button></span>`
        : `<span class="act">${gsdEsc(this._actLabel(x, b.acts))}</span>`;
      html += `<div class="blk">${tp(false)}<span class="to">${gsdEsc(t('until'))}</span>${tp(true)}<span class="gap"></span>${actChip}${editable ? `<button type="button" class="mini" data-a="rm" data-k="${gsdEsc(x.key)}" data-j="${j}" aria-label="✕">✕</button>` : ''}</div>`;
    });
    if (editable) {
      html += `<div class="adds"><button type="button" class="add" data-a="add" data-k="${gsdEsc(x.key)}">${gsdEsc(t('add_block'))}</button>${x.src === 'scheduler' ? `<button type="button" class="add" data-a="addsun" data-k="${gsdEsc(x.key)}">${gsdEsc(t('add_sun'))}</button>` : ''}</div>`;
    }
    const outside = x.thermo ? t('outside_eco', { v: this._fmtTemp(this._num(x.ids.eco)) }) : x.src === 'helper' ? t('outside_helper') : x.fill ? t('outside_off') : t('outside_none');
    html += `<span class="note">${gsdEsc(outside)}</span></div>`;

    // wat stuurt het schema
    html += '<div class="foot">';
    if (x.targets.length) {
      html += `<span class="lab">${gsdEsc(t('drives'))}</span>`;
      if (x.src === 'scheduler' && editable && x.targets.length === 1) {
        const dom = x.targets[0].split('.')[0];
        const st = this._hass.states;
        const opts = Object.keys(st).filter((e) => e.split('.')[0] === dom).sort((a, b) => this._fn(a).localeCompare(this._fn(b)));
        if (!st[x.targets[0]]) opts.unshift(x.targets[0]);
        html += `<select class="tg" data-a="target" data-k="${gsdEsc(x.key)}">${opts.map((e) => `<option value="${gsdEsc(e)}"${e === x.targets[0] ? ' selected' : ''}>${gsdEsc(this._fn(e))}${st[e] ? '' : ' (?)'}</option>`).join('')}</select>`;
      } else x.targets.forEach((e) => { html += `<span class="tg">${gsdEsc(this._fn(e))}</span>`; });
    }
    html += `<span class="gap"></span><span class="src">${gsdEsc(x.thermo ? t('src_thermo') : x.src === 'helper' ? t('src_helper') : t('src_scheduler'))}</span>`;
    if (x.src === 'scheduler') html += `<button type="button" class="del${this._sure === x.key ? ' sure' : ''}" data-a="del" data-k="${gsdEsc(x.key)}">${gsdEsc(t(this._sure === x.key ? 'del_sure' : 'del'))}</button>`;
    html += '</div>';
    const m = this._msg && this._msg.k === x.key ? this._msg : null;
    html += `<span class="msg${m && m.err ? ' err' : ''}">${gsdEsc(m ? m.text : '')}</span></div>`;
    return html;
  }

  _fn(e) { const s = this._hass.states[e]; return (s && s.attributes.friendly_name) || e; }

  _newPanel() {
    const t = this._t.bind(this);
    const n = this._new;
    const st = this._hass.states;
    const ents = Object.keys(st).filter((e) => GSD_NEW_DOMAINS.includes(e.split('.')[0]) && !e.startsWith('switch.schedule_') && !e.startsWith('switch.glow_schedules')).sort((a, b) => this._fn(a).localeCompare(this._fn(b)));
    return `<div class="nw"><b>${gsdEsc(t('nw_title'))}</b>
      <label>${gsdEsc(t('nw_name'))}<input type="text" value="${gsdEsc(n.name)}" autocomplete="off"></label>
      <label>${gsdEsc(t('nw_device'))}<select><option value="">${gsdEsc(t('nw_pick'))}</option>${ents.map((e) => `<option value="${gsdEsc(e)}"${e === n.entity ? ' selected' : ''}>${gsdEsc(this._fn(e))}</option>`).join('')}</select></label>
      ${n.err ? `<span class="msg err" style="text-align:left">${gsdEsc(t('err', { e: n.err }))}</span>` : ''}
      <div class="nwb"><button type="button" class="cancel" data-a="nwcancel">${gsdEsc(t('nw_cancel'))}</button><button type="button" class="go" data-a="nwcreate"${n.name.trim() && n.entity && !n.busy ? '' : ' disabled'}>${gsdEsc(t('nw_create'))}</button></div></div>`;
  }

  /* ---------- Glow Schedules: ploegpaneel en editor ---------- */

  _shiftPanel() {
    const g = this._glow;
    const t = this._t.bind(this);
    const today = (new Date().getDay() + 6) % 7;
    const vac = !!(g.shifts && g.shifts.vacation && g.shifts.vacation.on);
    const base = (g.week[0] && g.week[0].base) || 'late';
    const cur = vac ? 'vac' : base;
    const col = vac ? '255, 143, 143' : GSD_SHIFT[base];
    const days = t('days');
    const chips = g.week.map((w, d) => `<button type="button" class="sd${d === today ? ' today' : ''}" style="--s:${GSD_SHIFT[w.shift]}" data-a="sday" data-d="${d}">
        <span class="dn">${gsdEsc(days[d])}</span><span class="sc">${gsdEsc(t('sh_' + w.shift))}</span><i class="${w.override ? 'ov' : ''}"></i></button>`).join('');
    return `<div class="shift" style="--s:${col}">
      <div class="sh">
        <span class="so"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="${GSD_SHIFT_ICON[cur]}"/></svg></span>
        <span class="st"><span class="lab">${gsdEsc(t('this_week'))}</span><b>${gsdEsc(vac ? t('vac') : t('shift_' + base))}</b><span>${gsdEsc(vac ? t('vac_sub') : t('next_week', { s: t('shift_' + g.next_week).toLowerCase() }))}</span></span>
        <span class="sb"><button type="button" class="ghost" data-a="swap"${vac ? ' disabled' : ''}>${gsdEsc(t('swap'))}</button><button type="button" class="ghost vac${vac ? ' on' : ''}" data-a="vac">${gsdEsc(t(vac ? 'vac_off' : 'vac'))}</button></span>
      </div>
      <div class="sds">${chips}</div>
      <span class="note">${gsdEsc(t('shift_hint'))}</span>
    </div>`;
  }

  _editorGlow(x, seg, today) {
    const t = this._t.bind(this);
    const k = gsdEsc(x.key);
    const days = t('days');
    const tab = x.mode === 'shift' ? (this._gtab[x.key] || this._shiftOf(today)) : 'all';
    let html = '<div class="ed">';
    html += `<div class="chips"><span class="lab">${gsdEsc(t('follows'))}</span>` + ['shift', 'fixed'].map((m) => `<button type="button" class="ch${x.mode === m ? ' sel' : ''}" data-a="gmode" data-k="${k}" data-v="${m}">${gsdEsc(t('m_' + m))}</button>`).join('') + '</div>';
    if (x.mode === 'shift') {
      html += '<div class="vts">' + ['early', 'late', 'free'].map((v) => {
        const sum = this._gBlocks(x, v).map((b) => gsdHM(b.a) + '–' + gsdHM(b.b % 24)).join(', ') || t('no_blocks');
        return `<button type="button" class="vt${tab === v ? ' sel' : ''}" style="--s:${GSD_SHIFT[v]}" data-a="gtab" data-k="${k}" data-v="${v}"><i></i><span><b>${gsdEsc(t('shift_' + v))}</b><span>${gsdEsc(sum)}</span></span></button>`;
      }).join('') + '</div>';
    }
    html += '<div class="week">' + days.map((n, d) => {
      const v = this._variant(x, d);
      const dim = x.mode === 'shift' && v !== tab;
      return `<div class="wd${d === today ? ' today' : ''}${dim ? ' off' : ''}"><span>${gsdEsc(n)}</span><span class="col">${this._dayBlocks(x, d).map((b) => seg(b, true)).join('')}</span>${x.mode === 'shift' ? `<span class="wv" style="--s:${GSD_SHIFT[v]}">${gsdEsc(t('sh_' + v))}</span>` : ''}</div>`;
    }).join('') + '</div>';
    const list = x.gb[tab] || [];
    html += `<div class="blks"><span class="lab">${gsdEsc(x.mode === 'shift' ? t('blocks_of', { s: t('shift_' + tab) }) : t('every_day'))}</span>`;
    const sun = this._glow && this._glow.sun;
    list.forEach((b, j) => {
      const tp = (f) => {
        const v = b[f];
        const isSun = gsdIsSun(v);
        const lbl = isSun ? (() => { const m = /([+-])(\d+)/.exec(v); return t(v.startsWith('sunrise') ? 'sunrise' : 'sunset') + (m ? (m[1] === '-' ? ' −' : ' +') + m[2] : ''); })() : gsdHM(gsdGMin(v, sun, f === 'to') / 60);
        return `<span class="tp"><button type="button" class="mini" data-a="gmv" data-k="${k}" data-j="${j}" data-f="${f}" data-d="-15">−</button><span class="tm${isSun ? ' sun' : ''}">${gsdEsc(f === 'to' && !isSun && gsdGMin(v, sun, true) >= 1440 ? '24:00' : lbl)}</span><button type="button" class="mini" data-a="gmv" data-k="${k}" data-j="${j}" data-f="${f}" data-d="15">+</button></span>`;
      };
      const num = x.dom === 'climate' || x.dom === 'light' || x.dom === 'cover';
      const chip = num
        ? `<span class="tp"><button type="button" class="mini" data-a="gval" data-k="${k}" data-j="${j}" data-d="-1">−</button><span class="act">${gsdEsc(this._gAct(x, b.value))}</span><button type="button" class="mini" data-a="gval" data-k="${k}" data-j="${j}" data-d="1">+</button></span>`
        : `<span class="act">${gsdEsc(this._gAct(x, b.value))}</span>`;
      html += `<div class="blk">${tp('from')}<span class="to">${gsdEsc(t('until'))}</span>${tp('to')}<span class="gap"></span>${chip}<button type="button" class="mini" data-a="grm" data-k="${k}" data-j="${j}" aria-label="✕">✕</button></div>`;
    });
    const other = tab === 'early' ? 'late' : 'early';
    html += `<div class="adds"><button type="button" class="add" data-a="gadd" data-k="${k}">${gsdEsc(t('add_block'))}</button><button type="button" class="add" data-a="gaddsun" data-k="${k}">${gsdEsc(t('add_sun'))}</button>${x.mode === 'shift' ? `<button type="button" class="add" data-a="gcopy" data-k="${k}" data-v="${other}">${gsdEsc(t('copy_from', { s: t('sh_' + other).toLowerCase() }))}</button>` : ''}</div></div>`;
    // buiten de blokken
    const outs = x.dom === 'climate' || x.dom === 'light' || x.dom === 'cover' ? ['value', 'off', 'none'] : ['off', 'none'];
    const ov = this._gVal(x, x.outside_value ?? (x.dom === 'climate' ? 17 : null));
    const ol = (o) => o === 'value' ? (x.dom === 'climate' ? t('o_eco', { v: this._fmtTemp(ov) }) : t('o_value') + (ov !== null && !isNaN(ov) ? ' ' + Math.round(ov) + ' %' : '')) : t('o_' + o);
    html += `<div class="chips"><span class="lab">${gsdEsc(t('lab_outside'))}</span>` + outs.map((o) => `<button type="button" class="ch${x.outside === o ? ' sel' : ''}" data-a="gout" data-k="${k}" data-v="${o}">${gsdEsc(ol(o))}</button>`).join('');
    if (x.outside === 'value' && typeof x.outside_value !== 'string') html += `<button type="button" class="mini" data-a="goval" data-k="${k}" data-d="-1">−</button><button type="button" class="mini" data-a="goval" data-k="${k}" data-d="1">+</button>`;
    html += '</div>';
    // stuurt + verwijderen
    html += '<div class="foot">';
    html += `<span class="lab">${gsdEsc(t('drives'))}</span>`;
    if (x.targets.length === 1) {
      const dom = x.targets[0].split('.')[0];
      const st = this._hass.states;
      const opts = Object.keys(st).filter((e) => e.split('.')[0] === dom).sort((a, b) => this._fn(a).localeCompare(this._fn(b)));
      if (!st[x.targets[0]]) opts.unshift(x.targets[0]);
      html += `<select class="tg" data-a="target" data-k="${k}">${opts.map((e) => `<option value="${gsdEsc(e)}"${e === x.targets[0] ? ' selected' : ''}>${gsdEsc(this._fn(e))}${st[e] ? '' : ' (?)'}</option>`).join('')}</select>`;
    } else x.targets.forEach((e) => { html += `<span class="tg">${gsdEsc(this._fn(e))}</span>`; });
    html += `<span class="gap"></span><span class="src">${gsdEsc(t('src_glow'))}</span><button type="button" class="del${this._sure === x.key ? ' sure' : ''}" data-a="del" data-k="${k}">${gsdEsc(t(this._sure === x.key ? 'del_sure' : 'del'))}</button></div>`;
    const m = this._msg && this._msg.k === x.key ? this._msg : null;
    html += `<span class="msg${m && m.err ? ' err' : ''}">${gsdEsc(m ? m.text : '')}</span></div>`;
    return html;
  }

  // klikken binnen de Glow Schedules-delen; true als het afgehandeld is
  _clickGlow(a, b, k) {
    const ws = (m) => this._hass.callWS(m).then((r) => { if (r && r.week) this._glow = { ...this._glow, ...r }; this._fetch(true); }).catch((err) => this._setMsg(k || '', err));
    if (a === 'sday') {
      const d = +b.dataset.d;
      const w = this._glow.week[d];
      if (this._glow.shifts.vacation && this._glow.shifts.vacation.on) return true;
      const cyc = ['early', 'late', 'free'];
      const nx = cyc[(cyc.indexOf(w.shift) + 1) % 3];
      w.shift = nx; w.override = nx === w.base ? null : nx;
      this._rerender();
      ws({ type: 'glow_schedules/shift', action: 'set_day', date: w.date, shift: nx === w.base ? 'auto' : nx });
      return true;
    }
    if (a === 'swap') { ws({ type: 'glow_schedules/shift', action: 'swap_week' }); return true; }
    if (a === 'vac') { ws({ type: 'glow_schedules/shift', action: 'vacation', on: !(this._glow.shifts.vacation && this._glow.shifts.vacation.on) }); return true; }
    if (!a.startsWith('g')) return false;
    if (a === 'gtab') { this._gtab[k] = b.dataset.v; this._rerender(); return true; }
    const y = this._edit(k);
    if (!y) return true;
    const today = (new Date().getDay() + 6) % 7;
    const tab = y.mode === 'shift' ? (this._gtab[k] || this._shiftOf(today)) : 'all';
    const list = (y.gb[tab] = y.gb[tab] || []);
    const j = +b.dataset.j;
    const step = y.dom === 'climate' ? 0.5 : y.dom === 'light' || y.dom === 'cover' ? 10 : 1;
    const def = y.dom === 'climate' ? 21 : y.dom === 'cover' ? 100 : 100;
    if (a === 'gmode') {
      const v = b.dataset.v;
      if (v === y.mode) return true;
      if (v === 'shift') { const src = (y.gb.all || []); y.gb = { early: JSON.parse(JSON.stringify(src)), late: JSON.parse(JSON.stringify(src)), free: JSON.parse(JSON.stringify(src)) }; }
      else { y.gb = { all: JSON.parse(JSON.stringify(y.gb[this._shiftOf(today)] || [])) }; }
      y.mode = v;
    } else if (a === 'gmv') {
      const f = b.dataset.f;
      const blk = list[j];
      const nv = gsdGStep(blk[f], +b.dataset.d);
      const sun = this._glow && this._glow.sun;
      const test = { ...blk, [f]: nv };
      if (gsdGMin(test.to, sun, true) <= gsdGMin(test.from, sun)) return true;
      blk[f] = nv;
    } else if (a === 'gval') {
      const blk = list[j];
      let cur = this._gVal(y, blk.value);
      if (cur === null || isNaN(cur)) cur = def;
      cur = Math.round((cur + (+b.dataset.d) * step) * 10) / 10;
      if (y.dom === 'climate') cur = Math.max(5, Math.min(30, cur)); else cur = Math.max(y.dom === 'cover' ? 0 : 1, Math.min(100, cur));
      blk.value = cur;
    } else if (a === 'grm') {
      list.splice(j, 1);
    } else if (a === 'gadd' || a === 'gaddsun') {
      const last = list.map((x2) => gsdGMin(x2.to, this._glow.sun, true)).sort((p, q) => p - q).pop();
      const st = last !== undefined ? Math.min(22 * 60, last + 60) : 7 * 60;
      const hm = (mm) => (mm >= 1440 ? '24:00' : gsdHM(mm / 60));
      list.push(a === 'gaddsun' ? { from: 'sunset', to: '23:00' } : { from: hm(st), to: hm(Math.min(1440, st + 120)) });
      list.sort((p, q) => gsdGMin(p.from, this._glow.sun) - gsdGMin(q.from, this._glow.sun));
    } else if (a === 'gcopy') {
      y.gb[tab] = JSON.parse(JSON.stringify(y.gb[b.dataset.v] || []));
    } else if (a === 'gout') {
      y.outside = b.dataset.v;
      if (y.outside === 'value' && (y.outside_value === null || y.outside_value === undefined)) y.outside_value = y.dom === 'climate' ? 17 : y.dom === 'cover' ? 0 : 20;
    } else if (a === 'goval') {
      let cur = parseFloat(y.outside_value);
      if (isNaN(cur)) cur = y.dom === 'climate' ? 17 : 20;
      cur = Math.round((cur + (+b.dataset.d) * step) * 10) / 10;
      y.outside_value = y.dom === 'climate' ? Math.max(5, Math.min(30, cur)) : Math.max(0, Math.min(100, cur));
    } else return true;
    this._changed(k);
    return true;
  }

  _glowPayload(y) {
    const out = { id: y.id, name: y.name, enabled: y.enabled !== false, mode: y.mode, targets: y.targets, blocks: y.gb, outside: y.outside };
    if (y.value !== null && y.value !== undefined && y.value !== '') out.value = y.value;
    if (y.outside === 'value' && y.outside_value !== null && y.outside_value !== undefined) out.outside_value = y.outside_value;
    if (y.icon) out.icon = y.icon;
    return out;
  }

  /* ---------- bediening ---------- */

  _item(k) { return this._items().find((x) => x.key === k) || this._edits[k]; }
  _edit(k) {
    if (!this._edits[k]) { const x = this._item(k); if (!x) return null; this._edits[k] = JSON.parse(JSON.stringify(x)); }
    return this._edits[k];
  }

  _click(e) {
    const b = e.target.closest('[data-a]');
    if (!b || b.disabled || b.tagName === 'SELECT') return;
    const a = b.dataset.a;
    const k = b.dataset.k;
    if (a !== 'del') this._sure = null;
    if (a === 'filter') { this._filter = this._filter === b.dataset.v ? 'all' : b.dataset.v; return this._rerender(); }
    if (a === 'open') { this._open = this._open === k ? null : k; this._day = (new Date().getDay() + 6) % 7; return this._rerender(); }
    if (a === 'new') { this._new = this._new ? null : { name: '', entity: '' }; return this._rerender(); }
    if (a === 'nwcancel') { this._new = null; this._typing = false; return this._rerender(); }
    if (a === 'nwcreate') return this._create();
    e.stopPropagation();
    if (this._glow && this._clickGlow(a, b, k)) return;
    const x = this._item(k);
    if (!x) return;
    if (a === 'toggle') return this._toggle(x);
    if (a === 'temp') {
      const s = this._hass.states[b.dataset.id];
      if (!s) return;
      const step = parseFloat(s.attributes.step) || 0.5;
      const v = Math.max(s.attributes.min ?? 5, Math.min(s.attributes.max ?? 30, (parseFloat(s.state) || 0) + (+b.dataset.d) * step));
      this._hass.callService('input_number', 'set_value', { entity_id: b.dataset.id, value: v });
      return;
    }
    if (a === 'del') {
      if (this._sure !== k) { this._sure = k; return this._rerender(); }
      this._sure = null;
      (x.src === 'glow' ? this._hass.callWS({ type: 'glow_schedules/delete', schedule_id: x.id }) : this._hass.callService('scheduler', 'remove', { entity_id: k })).then(() => { this._open = null; this._fetch(true); }).catch((err) => this._setMsg(k, err));
      return;
    }
    if (a === 'wd') {
      const d = +b.dataset.d;
      if (x.src === 'helper') { this._day = d; return this._rerender(); }
      if (x.days !== 'custom' || x.ro) return;
      const y = this._edit(k);
      y.dset[d] = !y.dset[d];
      if (!y.dset.some(Boolean)) y.dset[d] = true;
      return this._changed(k);
    }
    if (a === 'copy') {
      const y = this._edit(k);
      const src = y.week[this._day].map((p) => p.slice());
      (this._day < 5 ? [0, 1, 2, 3, 4] : [5, 6]).forEach((d) => { y.week[d] = src.map((p) => p.slice()); });
      return this._changed(k);
    }
    if (x.src === 'scheduler' && x.ro) return;
    const y = this._edit(k);
    const list = y.src === 'helper' ? y.week[this._day] : y.blocks;
    const j = +b.dataset.j;
    if (a === 'days') {
      y.days = b.dataset.v;
      if (y.days === 'custom' && !y.dset.some(Boolean)) y.dset = [true, true, true, true, true, false, false];
    } else if (a === 'mv') {
      const end = b.dataset.e === '1';
      const d = +b.dataset.d;
      if (y.src === 'helper') {
        const p = list[j];
        const i = end ? 1 : 0;
        p[i] = Math.max(0, Math.min(24, p[i] + d * 0.25));
        if (p[0] >= p[1]) { if (i === 0) p[0] = p[1] - 0.25; else p[1] = p[0] + 0.25; }
      } else {
        const bl = list[j];
        const f = end ? 'b' : 'a';
        const v = bl[f];
        if (v && typeof v === 'object') v.m = Math.max(-240, Math.min(240, v.m + d * 15));
        else bl[f] = Math.max(0, Math.min(24, v + d * 0.25));
        if (this._h(bl.a) >= this._h(bl.b)) {
          if (typeof bl[f] === 'object') bl[f].m -= d * 15;
          else bl[f] = f === 'a' ? Math.max(0, this._h(bl.b) - 0.25) : Math.min(24, this._h(bl.a) + 0.25);
        }
      }
    } else if (a === 'val') {
      list[j].acts.forEach((ac) => {
        if (ac.service_data && ac.service_data.temperature !== undefined) ac.service_data.temperature = Math.max(5, Math.min(30, parseFloat(ac.service_data.temperature) + (+b.dataset.d) * 0.5));
      });
    } else if (a === 'rm') {
      list.splice(j, 1);
    } else if (a === 'add' || a === 'addsun') {
      if (y.src === 'helper') {
        const last = list[list.length - 1];
        const s = last ? Math.min(22, last[1] + 1) : 7;
        list.push([s, Math.min(24, s + 2)]);
      } else {
        const last = list[list.length - 1];
        const tpl = JSON.parse(JSON.stringify((last && last.acts) || y.onTpl || this._defaultActs(y.targets, true)));
        if (a === 'addsun') list.push({ a: { sun: 'sunset', m: 0 }, b: 23, acts: tpl });
        else { const s = last ? Math.min(22, this._h(last.b) + 1) : 7; list.push({ a: s, b: Math.min(24, s + 2), acts: tpl }); }
      }
    } else return;
    if (y.src === 'scheduler') y.blocks.sort((p, q) => this._h(p.a) - this._h(q.a));
    this._changed(k);
  }

  _rerender() { this._key = null; this._render(); }
  _setMsg(k, err) { this._msg = { k, text: err ? this._t('err', { e: (err && (err.message || err.body && err.body.message)) || String(err) }) : this._t('saved'), err: !!err }; this._rerender(); }

  _toggle(x) {
    if (x.src === 'glow') this._hass.callWS({ type: 'glow_schedules/enable', schedule_id: x.id, enabled: !x.enabled }).then(() => this._fetch(true)).catch((err) => this._setMsg(x.key, err));
    else if (x.src === 'scheduler') this._hass.callService('switch', x.enabled ? 'turn_off' : 'turn_on', { entity_id: x.key });
    else if (x.ids && this._hass.states[x.ids.active]) this._hass.callService('input_boolean', x.enabled ? 'turn_off' : 'turn_on', { entity_id: x.ids.active });
  }

  _changed(k) {
    this._msg = { k, text: this._t('saving') };
    this._rerender();
    clearTimeout(this._saveT);
    this._saveT = setTimeout(() => this._saveAll(), 1200);
  }

  async _saveAll() {
    const keys = Object.keys(this._edits);
    for (const k of keys) {
      const y = this._edits[k];
      try {
        if (y.src === 'glow') await this._hass.callWS({ type: 'glow_schedules/save', schedule: this._glowPayload(y) });
        else if (y.src === 'helper') await this._saveHelper(y);
        else await this._saveScheduler(y);
        delete this._edits[k];
        this._setMsg(k, null);
      } catch (err) { delete this._edits[k]; this._setMsg(k, err); }
    }
    window.dispatchEvent(new CustomEvent('glow-schedule-changed', { detail: { from: this } }));
    this._fetch(true);
  }

  _defaultActs(targets, on) {
    return targets.map((e) => {
      const d = e.split('.')[0];
      if (d === 'cover') return { service: on ? 'cover.open_cover' : 'cover.close_cover', entity_id: e, service_data: {} };
      if (d === 'climate') return on ? { service: 'climate.set_temperature', entity_id: e, service_data: { hvac_mode: 'heat', temperature: 21 } } : { service: 'climate.turn_off', entity_id: e, service_data: {} };
      return { service: d + (on ? '.turn_on' : '.turn_off'), entity_id: e, service_data: {} };
    });
  }

  // blokken terug naar tijdsloten van Scheduler; bij "buiten de blokken: uit" ook de tussenstukken
  _slots(y) {
    const offActs = y.offTpl || this._defaultActs(y.targets, false);
    const blocks = y.blocks.filter((b) => this._h(b.b) > this._h(b.a)).sort((p, q) => this._h(p.a) - this._h(q.a));
    const mk = (a, b, acts) => {
      const s = { start: gsdFmtT(a), stop: gsdFmtT(b, true), actions: acts };
      if (y.cond) Object.assign(s, JSON.parse(JSON.stringify(y.cond)));
      return s;
    };
    const out = [];
    let cur = 0, curT = 0;
    blocks.forEach((b) => {
      const ha = this._h(b.a);
      if (y.fill && ha > cur + 0.01) out.push(mk(curT, b.a, offActs));
      out.push(mk(b.a, b.b, b.acts));
      cur = this._h(b.b); curT = b.b;
    });
    if (y.fill && cur < 23.99) out.push(mk(curT, 24, offActs));
    return out;
  }

  async _saveScheduler(y) {
    const weekdays = y.days === 'custom' ? GSD_DAYS.filter((d, i) => y.dset[i]) : [y.days];
    const data = { entity_id: y.key, name: y.name, weekdays, repeat_type: y.repeat, timeslots: this._slots(y) };
    if (!data.timeslots.length) data.timeslots = [{ start: '00:00:00', stop: '00:01:00', actions: y.offTpl || this._defaultActs(y.targets, false) }];
    await this._hass.callService('scheduler', 'edit', data);
  }

  async _saveHelper(y) {
    const it = y.raw;
    const data = { type: 'schedule/update', schedule_id: it.id, name: it.name };
    if (it.icon) data.icon = it.icon;
    GSD_HDAYS.forEach((d, i) => {
      const out = [];
      y.week[i].filter((b) => b[1] > b[0]).sort((p, q) => p[0] - q[0]).forEach((b) => { const l = out[out.length - 1]; if (l && b[0] <= l[1]) l[1] = Math.max(l[1], b[1]); else out.push(b.slice()); });
      data[d] = out.map((b) => ({ from: gsdHM(b[0]) + ':00', to: b[1] >= 24 ? '24:00:00' : gsdHM(b[1]) + ':00' }));
    });
    await this._hass.callWS(data);
  }

  _setTarget(k, ent) {
    const y = this._edit(k);
    if (!y || !ent) return;
    if (y.src === 'glow') { y.targets = [ent]; this._changed(k); return; }
    const old = y.targets[0];
    const swap = (acts) => (acts || []).forEach((a) => { if (a.entity_id === old) a.entity_id = ent; });
    y.blocks.forEach((b) => swap(b.acts));
    swap(y.onTpl); swap(y.offTpl);
    y.targets = [ent];
    this._changed(k);
  }

  async _create() {
    const n = this._new;
    if (!n || !n.name.trim() || !n.entity || n.busy) return;
    n.busy = true; n.err = null;
    this._typing = false;
    this._rerender();
    const dom = n.entity.split('.')[0];
    if (this._glow) {
      const blk = dom === 'climate' ? [{ from: '07:00', to: '22:00' }] : dom === 'cover' ? [{ from: '08:00', to: '21:00' }] : [{ from: '18:00', to: '23:00' }];
      const sched = { name: n.name.trim(), mode: dom === 'climate' ? 'shift' : 'fixed', targets: [n.entity], outside: dom === 'climate' ? 'value' : 'off', blocks: dom === 'climate' ? { early: JSON.parse(JSON.stringify(blk)), late: JSON.parse(JSON.stringify(blk)), free: JSON.parse(JSON.stringify(blk)) } : { all: blk } };
      if (dom === 'climate') { sched.value = 21; sched.outside_value = 17; }
      try {
        const r = await this._hass.callWS({ type: 'glow_schedules/save', schedule: sched });
        this._new = null;
        await this._fetch(true);
        this._open = 'glow:' + r.id;
        this._rerender();
      } catch (err) {
        n.busy = false;
        n.err = (err && (err.message || err.body && err.body.message)) || String(err);
        this._rerender();
      }
      return;
    }
    const on = this._defaultActs([n.entity], true);
    const off = this._defaultActs([n.entity], false);
    const blocks = dom === 'climate' ? [[7, 22]] : dom === 'cover' ? [[8, 21]] : [[18, 23]];
    const timeslots = [];
    let cur = 0;
    blocks.forEach(([a, b]) => {
      if (a > cur) timeslots.push({ start: gsdFmtT(cur), stop: gsdFmtT(a, true), actions: off });
      timeslots.push({ start: gsdFmtT(a), stop: gsdFmtT(b, true), actions: on });
      cur = b;
    });
    if (cur < 24) timeslots.push({ start: gsdFmtT(cur), stop: '00:00:00', actions: off });
    try {
      await this._hass.callService('scheduler', 'add', { name: n.name.trim(), weekdays: ['daily'], repeat_type: 'repeat', timeslots });
      const name = n.name.trim();
      this._new = null;
      await this._fetch(true);
      const made = (this._sched || []).find((r) => r.name === name);
      if (made) this._open = made.entity_id;
      this._rerender();
    } catch (err) {
      n.busy = false;
      n.err = (err && (err.message || err.body && err.body.message)) || String(err);
      this._rerender();
    }
  }
}

class GlowScheduleCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._render(); }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = gsdLang(this._hass, this._config.language);
    const t = (k) => gsdT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gsdT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        const def = { glow: 15, helpers: true, language: 'auto' };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined || (Array.isArray(v[k]) && !v[k].length) || def[k] === v[k]) delete v[k]; });
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    const ids = Object.keys(this._hass.states).filter((e) => e.startsWith('switch.schedule_') || e.startsWith('schedule.'));
    this._form.hass = this._hass;
    this._form.schema = [
      { name: 'title', selector: { text: {} } },
      { name: 'entities', selector: { entity: { multiple: true, include_entities: ids } } },
      { name: 'exclude', selector: { entity: { multiple: true, include_entities: ids } } },
      { name: 'helpers', selector: { boolean: {} } },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GSD_LANG_NAMES).map((k) => ({ value: k, label: GSD_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, helpers: true, language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-schedule-card')) customElements.define('glow-schedule-card', GlowScheduleCard);
if (!customElements.get('glow-schedule-card-editor')) customElements.define('glow-schedule-card-editor', GlowScheduleCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-schedule-card')) {
  window.customCards.push({ type: 'glow-schedule-card', name: 'Glow Schedule Card', description: gsdT(gsdLang(null), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}
