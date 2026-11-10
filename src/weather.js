/*
 * Glow Weather Card
 * Het weer in de Glow-stijl: een lucht die het weer en het dagdeel volgt,
 * een zonneboog, details, een temperatuurcurve per uur en dagbalken.
 */

const GWX_I18N = {
  nl: {
    feels: 'Voelt als', wind: 'Wind', humidity: 'Vochtigheid', pressure: 'Luchtdruk', precipitation: 'Neerslag', uv: 'UV-index', clouds: 'Bewolking', visibility: 'Zicht', dew: 'Dauwpunt',
    hourly: 'Per uur', daily: 'Komende dagen', today: 'Vandaag', now: 'Nu', sunrise: 'Zonsopgang', sunset: 'Zonsondergang', unavailable: 'Niet beschikbaar',
    c: { 'clear-night': 'Helder', cloudy: 'Bewolkt', exceptional: 'Uitzonderlijk', fog: 'Mist', hail: 'Hagel', lightning: 'Onweer', 'lightning-rainy': 'Onweer met regen', partlycloudy: 'Halfbewolkt', pouring: 'Hevige regen', rainy: 'Regen', snowy: 'Sneeuw', 'snowy-rainy': 'Natte sneeuw', sunny: 'Zonnig', windy: 'Winderig', 'windy-variant': 'Winderig en bewolkt' },
    err: 'Vul "entity" in met een weer-entiteit.',
    l_entity: 'Weer', l_name: 'Naam', l_show_hourly: 'Verwachting per uur', l_show_daily: 'Verwachting per dag', l_show_details: 'Details', l_days: 'Aantal dagen', l_glow: 'Sterkte van de gloed', l_language: 'Taal', lang_auto: 'Automatisch (taal van Home Assistant)',
    description: 'Weerkaart met een lucht die het weer volgt, zonneboog, details en verwachting.',
  },
  en: {
    feels: 'Feels like', wind: 'Wind', humidity: 'Humidity', pressure: 'Pressure', precipitation: 'Precipitation', uv: 'UV index', clouds: 'Clouds', visibility: 'Visibility', dew: 'Dew point',
    hourly: 'Hourly', daily: 'Next days', today: 'Today', now: 'Now', sunrise: 'Sunrise', sunset: 'Sunset', unavailable: 'Unavailable',
    c: { 'clear-night': 'Clear', cloudy: 'Cloudy', exceptional: 'Exceptional', fog: 'Fog', hail: 'Hail', lightning: 'Thunderstorm', 'lightning-rainy': 'Thunderstorm and rain', partlycloudy: 'Partly cloudy', pouring: 'Heavy rain', rainy: 'Rain', snowy: 'Snow', 'snowy-rainy': 'Sleet', sunny: 'Sunny', windy: 'Windy', 'windy-variant': 'Windy and cloudy' },
    err: 'Fill in "entity" with a weather entity.',
    l_entity: 'Weather', l_name: 'Name', l_show_hourly: 'Hourly forecast', l_show_daily: 'Daily forecast', l_show_details: 'Details', l_days: 'Number of days', l_glow: 'Glow strength', l_language: 'Language', lang_auto: 'Automatic (Home Assistant language)',
    description: 'Weather card with a sky that follows the weather, a sun arc, details and forecast.',
  },
  fr: {
    feels: 'Ressenti', wind: 'Vent', humidity: 'Humidité', pressure: 'Pression', precipitation: 'Précipitations', uv: 'Indice UV', clouds: 'Nuages', visibility: 'Visibilité', dew: 'Point de rosée',
    hourly: 'Par heure', daily: 'Prochains jours', today: 'Aujourd\'hui', now: 'Maint.', sunrise: 'Lever', sunset: 'Coucher', unavailable: 'Indisponible',
    c: { 'clear-night': 'Dégagé', cloudy: 'Nuageux', exceptional: 'Exceptionnel', fog: 'Brouillard', hail: 'Grêle', lightning: 'Orage', 'lightning-rainy': 'Orage et pluie', partlycloudy: 'Partiellement nuageux', pouring: 'Forte pluie', rainy: 'Pluie', snowy: 'Neige', 'snowy-rainy': 'Neige fondue', sunny: 'Ensoleillé', windy: 'Venteux', 'windy-variant': 'Venteux et nuageux' },
    err: 'Renseignez "entity" avec une entité météo.',
    l_entity: 'Météo', l_name: 'Nom', l_show_hourly: 'Prévision horaire', l_show_daily: 'Prévision journalière', l_show_details: 'Détails', l_days: 'Nombre de jours', l_glow: 'Intensité de la lueur', l_language: 'Langue', lang_auto: 'Automatique (langue de Home Assistant)',
    description: 'Carte météo avec ciel animé, arc solaire, détails et prévisions.',
  },
  de: {
    feels: 'Gefühlt', wind: 'Wind', humidity: 'Luftfeuchte', pressure: 'Luftdruck', precipitation: 'Niederschlag', uv: 'UV-Index', clouds: 'Bewölkung', visibility: 'Sicht', dew: 'Taupunkt',
    hourly: 'Stündlich', daily: 'Nächste Tage', today: 'Heute', now: 'Jetzt', sunrise: 'Sonnenaufgang', sunset: 'Sonnenuntergang', unavailable: 'Nicht verfügbar',
    c: { 'clear-night': 'Klar', cloudy: 'Bewölkt', exceptional: 'Außergewöhnlich', fog: 'Nebel', hail: 'Hagel', lightning: 'Gewitter', 'lightning-rainy': 'Gewitter mit Regen', partlycloudy: 'Teilweise bewölkt', pouring: 'Starkregen', rainy: 'Regen', snowy: 'Schnee', 'snowy-rainy': 'Schneeregen', sunny: 'Sonnig', windy: 'Windig', 'windy-variant': 'Windig und bewölkt' },
    err: 'Gib unter "entity" eine Wetter-Entität an.',
    l_entity: 'Wetter', l_name: 'Name', l_show_hourly: 'Stündliche Vorhersage', l_show_daily: 'Tägliche Vorhersage', l_show_details: 'Details', l_days: 'Anzahl Tage', l_glow: 'Leuchtstärke', l_language: 'Sprache', lang_auto: 'Automatisch (Sprache von Home Assistant)',
    description: 'Wetterkarte mit Himmel, Sonnenbogen, Details und Vorhersage.',
  },
  es: {
    feels: 'Sensación', wind: 'Viento', humidity: 'Humedad', pressure: 'Presión', precipitation: 'Precipitación', uv: 'Índice UV', clouds: 'Nubes', visibility: 'Visibilidad', dew: 'Punto de rocío',
    hourly: 'Por horas', daily: 'Próximos días', today: 'Hoy', now: 'Ahora', sunrise: 'Amanecer', sunset: 'Atardecer', unavailable: 'No disponible',
    c: { 'clear-night': 'Despejado', cloudy: 'Nublado', exceptional: 'Excepcional', fog: 'Niebla', hail: 'Granizo', lightning: 'Tormenta', 'lightning-rainy': 'Tormenta con lluvia', partlycloudy: 'Parcialmente nublado', pouring: 'Lluvia intensa', rainy: 'Lluvia', snowy: 'Nieve', 'snowy-rainy': 'Aguanieve', sunny: 'Soleado', windy: 'Ventoso', 'windy-variant': 'Ventoso y nublado' },
    err: 'Indica en "entity" una entidad del tiempo.',
    l_entity: 'Tiempo', l_name: 'Nombre', l_show_hourly: 'Previsión por horas', l_show_daily: 'Previsión diaria', l_show_details: 'Detalles', l_days: 'Número de días', l_glow: 'Intensidad del brillo', l_language: 'Idioma', lang_auto: 'Automático (idioma de Home Assistant)',
    description: 'Tarjeta del tiempo con cielo, arco solar, detalles y previsión.',
  },
  it: {
    feels: 'Percepita', wind: 'Vento', humidity: 'Umidità', pressure: 'Pressione', precipitation: 'Precipitazioni', uv: 'Indice UV', clouds: 'Nuvolosità', visibility: 'Visibilità', dew: 'Punto di rugiada',
    hourly: 'Ogni ora', daily: 'Prossimi giorni', today: 'Oggi', now: 'Ora', sunrise: 'Alba', sunset: 'Tramonto', unavailable: 'Non disponibile',
    c: { 'clear-night': 'Sereno', cloudy: 'Nuvoloso', exceptional: 'Eccezionale', fog: 'Nebbia', hail: 'Grandine', lightning: 'Temporale', 'lightning-rainy': 'Temporale con pioggia', partlycloudy: 'Parzialmente nuvoloso', pouring: 'Pioggia forte', rainy: 'Pioggia', snowy: 'Neve', 'snowy-rainy': 'Nevischio', sunny: 'Soleggiato', windy: 'Ventoso', 'windy-variant': 'Ventoso e nuvoloso' },
    err: 'Indica in "entity" un\'entità meteo.',
    l_entity: 'Meteo', l_name: 'Nome', l_show_hourly: 'Previsione oraria', l_show_daily: 'Previsione giornaliera', l_show_details: 'Dettagli', l_days: 'Numero di giorni', l_glow: 'Intensità del bagliore', l_language: 'Lingua', lang_auto: 'Automatico (lingua di Home Assistant)',
    description: 'Scheda meteo con cielo, arco solare, dettagli e previsioni.',
  },
};
const GWX_LANG_NAMES = { nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano' };
function gwxLang(hass, wanted) {
  let l = wanted && wanted !== 'auto' ? wanted : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GWX_I18N[l] ? l : 'en';
}
function gwxT(lang, key) { return (GWX_I18N[lang] && GWX_I18N[lang][key]) || GWX_I18N.en[key] || key; }
function gwxEsc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

/* ---- iconen ---- */
const GWX_S = (b) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`;
const GWX_CLOUD = '<path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4 1.6A3.3 3.3 0 0 0 7 18z"/>';
const GWX_CLOUD_HI = '<path d="M7 15h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4 1.6A3.3 3.3 0 0 0 7 15z"/>';
const GWX_ICONS = {
  sun: { c: '255, 214, 120', s: GWX_S('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>') },
  moon: { c: '185, 168, 255', s: GWX_S('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>') },
  partly: { c: '255, 214, 120', s: GWX_S('<path d="M8 3.5v1.2M3.5 8h1.2M4.8 4.8l.9.9M11.2 4.8l-.9.9"/><path d="M5.3 10.4A3.2 3.2 0 0 1 10.6 7"/><path d="M9 20h8a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.5 1.3A2.9 2.9 0 0 0 9 20z"/>') },
  partlynight: { c: '185, 168, 255', s: GWX_S('<path d="M10.5 4.2A3.6 3.6 0 0 0 5 9.4"/><path d="M9 20h8a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.5 1.3A2.9 2.9 0 0 0 9 20z"/>') },
  cloud: { c: '201, 196, 221', s: GWX_S(GWX_CLOUD) },
  rain: { c: '142, 197, 255', s: GWX_S(GWX_CLOUD_HI + '<path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3"/>') },
  pour: { c: '142, 197, 255', s: GWX_S(GWX_CLOUD_HI + '<path d="M8 17.5l-1.5 4M12 17.5l-1.5 4M16 17.5l-1.5 4M10 17.5l-1.5 4"/>') },
  storm: { c: '185, 168, 255', s: GWX_S(GWX_CLOUD_HI + '<path d="M13 15l-2 3.5h3L12 22"/>') },
  snow: { c: '207, 227, 255', s: GWX_S(GWX_CLOUD_HI + '<path d="M9 19h.01M13 19h.01M17 19h.01M11 22h.01M15 22h.01"/>') },
  fog: { c: '201, 196, 221', s: GWX_S('<path d="M4 9h16M3 13h18M5 17h14"/>') },
  wind: { c: '142, 227, 214', s: GWX_S('<path d="M3 9h11a3 3 0 1 0-3-3"/><path d="M3 15h15a3 3 0 1 1-3 3"/>') },
};
function gwxIcon(cond, night) {
  const m = { sunny: night ? 'moon' : 'sun', 'clear-night': 'moon', partlycloudy: night ? 'partlynight' : 'partly', cloudy: 'cloud', rainy: 'rain', pouring: 'pour', lightning: 'storm', 'lightning-rainy': 'storm', snowy: 'snow', 'snowy-rainy': 'snow', hail: 'snow', fog: 'fog', windy: 'wind', 'windy-variant': 'wind', exceptional: 'cloud' };
  return GWX_ICONS[m[cond] || 'cloud'];
}
const GWX_SMALL = {
  feels: GWX_S('<path d="M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0z"/>'),
  humidity: GWX_S('<path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.4 0z"/>'),
  precipitation: GWX_S('<path d="M8 4l-2 5M13 4l-2 5M18 4l-2 5M8 13l-2 5M13 13l-2 5M18 13l-2 5"/>'),
  pressure: GWX_S('<circle cx="12" cy="13" r="8"/><path d="M12 13l3.5-3.5M8 5.5L6.5 4M16 5.5L17.5 4"/>'),
  uv: GWX_S('<circle cx="12" cy="12" r="3.5"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>'),
  clouds: GWX_S(GWX_CLOUD),
  visibility: GWX_S('<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  dew: GWX_S('<path d="M12 3c3 4 6 7 6 10a6 6 0 0 1-12 0c0-3 3-6 6-10z"/><path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5"/>'),
};

// temperatuur als kleur: koud blauw → mild geel → warm perzik
function gwxTempColor(t) {
  const stops = [[-5, [142, 197, 255]], [8, [185, 168, 255]], [16, [255, 224, 138]], [26, [255, 184, 153]], [34, [255, 128, 140]]];
  if (t <= stops[0][0]) return stops[0][1].join(', ');
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [t0, c0] = stops[i - 1];
      const [t1, c1] = stops[i];
      const k = (t - t0) / (t1 - t0);
      return c0.map((v, j) => Math.round(v + (c1[j] - v) * k)).join(', ');
    }
  }
  return stops[stops.length - 1][1].join(', ');
}

/* ---- lucht ---- */
function gwxSky(cond, phase) {
  const clear = cond === 'sunny' || cond === 'clear-night' || cond === 'partlycloudy';
  const grim = /rain|pour|lightning|hail/.test(cond);
  const snow = /snow/.test(cond);
  const fog = cond === 'fog';
  const g = {
    day: clear ? ['#5FB3F0', '#BFE3FB'] : grim ? ['#5E6E82', '#9AA8B6'] : snow ? ['#AEBDCC', '#E3EAF1'] : fog ? ['#B6BEC6', '#DCE0E4'] : ['#8B9DB1', '#C4CED8'],
    dusk: clear ? ['#4E4592', '#F29E76'] : ['#55506A', '#AD8F89'],
    night: clear ? ['#070D24', '#22305E'] : ['#12161F', '#2B3244'],
  }[phase];
  let html = `<div class="sky-bg" style="background:linear-gradient(170deg,${g[0]},${g[1]})"></div>`;
  if (phase === 'night' && clear) {
    [[8, 20], [22, 55], [36, 18], [55, 40], [68, 14], [82, 48], [92, 24], [46, 70]].forEach(([x, y], i) => {
      html += `<i class="star" style="left:${x}%;top:${y}%;animation-delay:${(i * 0.7) % 3}s"></i>`;
    });
  }
  if (clear || cond === 'cloudy') {
    if (phase === 'day' && clear) html += '<i class="orb sun"></i>';
    else if (phase === 'dusk' && clear) html += '<i class="orb dusk"></i>';
    else if (phase === 'night' && clear) html += '<i class="orb moon"></i>';
  }
  const clouds = { sunny: 0, 'clear-night': 0, partlycloudy: 2, cloudy: 4, fog: 1, windy: 2, 'windy-variant': 4 }[cond] ?? 4;
  // wolken vooral rechts, zodat de temperatuur links leesbaar blijft
  const pos = [[58, 10, 24], [40, 42, 18], [76, 44, 20], [46, 4, 20], [68, 28, 16]];
  const dark = grim || phase === 'night';
  for (let i = 0; i < clouds; i++) {
    const [x, y, w] = pos[i];
    html += `<span class="cloud${dark ? ' dark' : ''}" style="left:${x}%;top:${y}%;width:${w}%;animation-delay:${-i * 2}s"><svg viewBox="0 0 64 30"><path d="M14 28h38a10 10 0 0 0 1-20 14 14 0 0 0-27-2A10 10 0 0 0 14 28z"/></svg></span>`;
  }
  if (grim || snow) {
    for (let i = 0; i < 14; i++) html += `<i class="${snow ? 'flake' : 'drop'}" style="left:${(i * 7.3 + 3) % 100}%;animation-delay:${(i * 0.37) % 1.6}s"></i>`;
  }
  if (fog) html += '<i class="mist" style="top:55%"></i><i class="mist" style="top:72%;animation-delay:-3s"></i>';
  if (/lightning/.test(cond)) html += '<i class="flash"></i>';
  return html;
}

const GWX_STYLE = `
  :host { display: block; }
  ha-card {
    position: relative; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; padding: 16px;
    border-radius: var(--ha-card-border-radius, 24px); container-type: inline-size;
    color: var(--glow-text, #F3F1FA); background: var(--glow-card-background, #15121F);
    border: 1px solid rgba(var(--c), 0.35); box-shadow: 0 0 calc(var(--glow) * 0.7) rgba(var(--c), 0.2);
  }
  .sky { position: relative; height: 190px; border-radius: 20px; overflow: hidden; color: #FFFFFF; flex-shrink: 0; cursor: pointer; }
  .sky-bg { position: absolute; inset: 0; }
  .star { position: absolute; width: 2px; height: 2px; border-radius: 1px; background: #fff; opacity: 0.8; animation: gwx-twinkle 3s ease-in-out infinite; }
  .orb { position: absolute; border-radius: 50%; }
  .orb.sun { right: 10%; top: 18%; width: 46px; height: 46px; background: #FFE58A; box-shadow: 0 0 40px 14px rgba(255, 229, 138, 0.6); }
  .orb.dusk { right: 14%; top: 58%; width: 50px; height: 50px; background: #FFB46B; box-shadow: 0 0 44px 16px rgba(255, 180, 107, 0.55); }
  .orb.moon { right: 12%; top: 16%; width: 34px; height: 34px; background: #FFF4D6; box-shadow: 0 0 30px 8px rgba(255, 244, 214, 0.45); }
  .cloud { position: absolute; animation: gwx-drift 9s ease-in-out infinite alternate; }
  .cloud svg { display: block; width: 100%; height: auto; fill: rgba(255, 255, 255, 0.92); }
  .cloud.dark svg { fill: rgba(196, 204, 218, 0.75); }
  .drop { position: absolute; top: -10%; width: 2px; height: 14px; border-radius: 1px; background: rgba(214, 232, 255, 0.75); animation: gwx-fall 1.1s linear infinite; }
  .flake { position: absolute; top: -10%; width: 5px; height: 5px; border-radius: 50%; background: #fff; opacity: 0.9; animation: gwx-fall 3.2s linear infinite; }
  .mist { position: absolute; left: -20%; right: -20%; height: 26px; border-radius: 13px; background: rgba(255, 255, 255, 0.45); filter: blur(6px); animation: gwx-drift 8s ease-in-out infinite alternate; }
  .flash { position: absolute; inset: 0; background: #fff; opacity: 0; animation: gwx-flash 7s infinite; }
  .shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(10, 12, 28, 0.45), transparent 70%); }
  .now { position: absolute; left: 20px; top: 16px; bottom: 16px; display: flex; flex-direction: column; justify-content: space-between; text-shadow: 0 1px 10px rgba(0, 0, 0, 0.35); }
  .now .loc { font-size: 15px; font-weight: 800; opacity: 0.9; }
  .now .temp { font-size: 64px; font-weight: 800; line-height: 1; letter-spacing: -0.03em; }
  .now .cond { font-size: 18px; font-weight: 800; }
  .now .hl { font-size: 14px; font-weight: 700; opacity: 0.9; }
  .mid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 14px; align-items: stretch; }
  .arc { position: relative; padding: 12px 14px 10px; border-radius: 20px; background: var(--glow-surface, rgba(255,255,255,0.07)); display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .arc svg { width: 100%; max-width: 260px; height: auto; overflow: visible; }
  .arc .times { width: 100%; max-width: 260px; display: flex; justify-content: space-between; font-size: 13px; font-weight: 800; margin-top: 4px; }
  .arc .times span { display: flex; flex-direction: column; align-items: center; gap: 1px; }
  .arc .times small { font-size: 11px; font-weight: 700; opacity: 0.6; }
  .det { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .d { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 16px; background: var(--glow-surface, rgba(255,255,255,0.07)); min-width: 0; }
  .d .ic { width: 32px; height: 32px; border-radius: 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgba(var(--k), 0.18); color: color-mix(in srgb, rgb(var(--k)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .d .ic svg { width: 17px; height: 17px; }
  .d .tx { display: flex; flex-direction: column; min-width: 0; }
  .d .l { font-size: 11px; font-weight: 800; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .d .v { font-size: 16px; font-weight: 800; white-space: nowrap; font-variant-numeric: tabular-nums; display: flex; align-items: center; gap: 6px; }
  .d .v svg.arrow { width: 14px; height: 14px; }
  .sec { display: flex; flex-direction: column; gap: 8px; }
  .lab { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; }
  .hours { overflow-x: auto; scrollbar-width: none; margin: 0 -16px; padding: 0 16px; touch-action: pan-x; }
  .hours::-webkit-scrollbar { display: none; }
  .hours svg { display: block; overflow: visible; }
  .hours .hl { font-size: 12px; font-weight: 800; fill: var(--glow-text, #F3F1FA); opacity: 0.6; }
  .hours .ht { font-size: 14px; font-weight: 800; fill: var(--glow-text, #F3F1FA); }
  .hours .hp { font-size: 11px; font-weight: 800; fill: color-mix(in srgb, rgb(142, 197, 255), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .hours .rain { fill: rgba(142, 197, 255, 0.35); }
  .days { display: flex; flex-direction: column; gap: 4px; }
  .day { display: grid; grid-template-columns: 76px 30px 44px 40px minmax(0, 1fr) 40px; align-items: center; gap: 8px; padding: 6px 4px; border-radius: 12px; }
  .day:first-child { background: var(--glow-surface, rgba(255,255,255,0.05)); }
  .day .dn { font-size: 15px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .day .di { width: 26px; height: 26px; color: color-mix(in srgb, rgb(var(--k)), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); }
  .day .di svg { width: 26px; height: 26px; }
  .day .dp { font-size: 12px; font-weight: 800; color: color-mix(in srgb, rgb(142, 197, 255), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%)); text-align: right; }
  .day .lo, .day .hi { font-size: 15px; font-weight: 800; font-variant-numeric: tabular-nums; text-align: right; }
  .day .lo { opacity: 0.6; }
  .day .bar { position: relative; height: 8px; border-radius: 4px; background: var(--glow-surface, rgba(255,255,255,0.08)); }
  .day .bar i { position: absolute; top: 0; bottom: 0; border-radius: 4px; }
  .day .bar b { position: absolute; top: -3px; width: 14px; height: 14px; margin-left: -7px; border-radius: 7px; background: #fff; border: 3px solid var(--glow-card-background, #15121F); box-sizing: border-box; }
  .na { padding: 30px; text-align: center; opacity: 0.6; font-weight: 700; }
  @container (max-width: 520px) {
    .mid { grid-template-columns: minmax(0, 1fr); }
    .day { grid-template-columns: 52px 26px 36px 34px minmax(0, 1fr) 34px; gap: 6px; }
    .now .temp { font-size: 52px; }
  }
  @keyframes gwx-drift { from { transform: translateX(-6px); } to { transform: translateX(10px); } }
  @keyframes gwx-fall { from { transform: translateY(0); } to { transform: translateY(230px); } }
  @keyframes gwx-twinkle { 0%, 100% { opacity: 0.85; } 50% { opacity: 0.3; } }
  @keyframes gwx-flash { 0%, 92%, 96%, 100% { opacity: 0; } 94% { opacity: 0.55; } }
`;

class GlowWeatherCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._built = false; this._fc = { hourly: null, daily: null }; this._subs = {}; }
  static getConfigElement() { return document.createElement('glow-weather-card-editor'); }
  static getStubConfig(hass) { return { entity: Object.keys((hass && hass.states) || {}).find((e) => e.startsWith('weather.')) || '' }; }
  setConfig(config) {
    if (!config || !config.entity) throw new Error(gwxT(gwxLang(this._hass, config && config.language), 'err'));
    const changed = !this._config || this._config.entity !== config.entity;
    this._config = { glow: 15, days: 7, show_hourly: true, show_daily: true, show_details: true, ...config };
    this._built = false;
    if (changed) { this._unsub(); this._fc = { hourly: null, daily: null }; }
    if (this._hass) { this._subscribe(); this._render(); }
  }
  set hass(hass) { this._hass = hass; if (!this._config) return; this._subscribe(); this._render(); }
  get hass() { return this._hass; }
  getCardSize() { return 10; }
  getGridOptions() { return { columns: 'full', rows: 'auto', min_columns: 6 }; }
  connectedCallback() { if (this._hass && this._config) this._subscribe(); clearInterval(this._tick); this._tick = setInterval(() => this._render(), 60000); }
  disconnectedCallback() { this._unsub(); clearInterval(this._tick); }

  _lang() { return gwxLang(this._hass, this._config && this._config.language); }
  _t(k) { return gwxT(this._lang(), k); }
  _loc() { return (this._hass && this._hass.locale && this._hass.locale.language) || this._lang(); }

  // verwachting via een abonnement (moderne Home Assistant), anders uit de attributen
  _subscribe() {
    const conn = this._hass && this._hass.connection;
    if (!conn || !conn.subscribeMessage) return;
    ['hourly', 'daily'].forEach((type) => {
      if (this._subs[type]) return;
      this._subs[type] = conn.subscribeMessage((msg) => { this._fc[type] = msg.forecast || []; this._render(); }, { type: 'weather/subscribe_forecast', entity_id: this._config.entity, forecast_type: type })
        .catch(() => { this._fc[type] = this._fc[type] || []; return null; });
    });
  }
  _unsub() {
    Object.values(this._subs).forEach((p) => p && p.then && p.then((u) => typeof u === 'function' && u()).catch(() => {}));
    this._subs = {};
  }

  _phase() {
    const sun = this._hass.states['sun.sun'];
    if (!sun) { const h = new Date().getHours(); return h >= 7 && h < 18 ? 'day' : h >= 18 && h < 20 ? 'dusk' : 'night'; }
    const el = sun.attributes.elevation;
    if (typeof el === 'number') return el > 6 ? 'day' : el > -4 ? 'dusk' : 'night';
    return sun.state === 'above_horizon' ? 'day' : 'night';
  }

  _num(v, d = 0) {
    if (typeof v !== 'number' || isNaN(v)) return '–';
    try { return v.toLocaleString(this._loc(), { maximumFractionDigits: d, minimumFractionDigits: 0 }); } catch (e) { return String(Math.round(v)); }
  }

  _sunTimes() {
    const sun = this._hass.states['sun.sun'];
    if (!sun) return null;
    const nr = Date.parse(sun.attributes.next_rising);
    const ns = Date.parse(sun.attributes.next_setting);
    if (!nr || !ns) return null;
    // vandaag: als de zon op is, dan was de opgang ~een dag voor de volgende opgang
    const up = sun.state === 'above_horizon';
    return up ? { rise: nr - 86400000, set: ns, up } : (ns < nr ? { rise: nr - 86400000, set: ns, up } : { rise: nr, set: ns, up });
  }

  _build() {
    this.shadowRoot.innerHTML = `<style>${GWX_STYLE}</style><ha-card></ha-card>`;
    this._card = this.shadowRoot.querySelector('ha-card');
    this._card.addEventListener('click', (e) => {
      if (e.target.closest('.sky')) this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: this._config.entity }, bubbles: true, composed: true }));
    });
    this._built = true;
    this._builtLang = this._lang();
    this._key = null;
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._built || this._builtLang !== this._lang()) this._build();
    const c = this._config;
    const s = this._hass.states[c.entity];
    this._card.style.setProperty('--glow', (parseInt(c.glow, 10) || 0) + 'px');
    if (!s || s.state === 'unavailable') {
      this._card.style.setProperty('--c', '201, 196, 221');
      const html = `<div class="na">${gwxEsc(this._t('unavailable'))}</div>`;
      if (html !== this._key) { this._key = html; this._card.innerHTML = html; }
      return;
    }
    const a = s.attributes;
    const phase = this._phase();
    const night = phase === 'night';
    const tu = a.temperature_unit || '°C';
    const deg = (v) => (typeof v === 'number' ? this._num(v, 0) + '°' : '–');
    const daily = (this._fc.daily || a.forecast || []).slice(0, Math.max(1, parseInt(c.days, 10) || 7));
    const hourly = (this._fc.hourly || []).filter((h) => Date.parse(h.datetime) > Date.now() - 3600000).slice(0, 24);
    const today = daily[0];
    const cond = this._t('c')[s.state] || s.state;
    const icon = gwxIcon(s.state, night);
    this._card.style.setProperty('--c', typeof a.temperature === 'number' ? gwxTempColor(a.temperature) : icon.c);

    // lucht met de huidige toestand
    const hl = today && typeof today.temperature === 'number' ? `↑ ${deg(today.temperature)}  ↓ ${deg(today.templow)}` : '';
    let html = `
      <div class="sky">${gwxSky(s.state, phase)}<div class="shade"></div>
        <div class="now">
          <span class="loc">${gwxEsc(c.name || a.friendly_name || '')}</span>
          <span class="temp">${deg(a.temperature)}</span>
          <div><div class="cond">${gwxEsc(cond)}</div><div class="hl">${gwxEsc(hl)}</div></div>
        </div>
      </div>`;

    // zonneboog en details
    if (c.show_details !== false) {
      const st = this._sunTimes();
      let arc = '';
      if (st) {
        const now = Date.now();
        const k = Math.max(0, Math.min(1, (now - st.rise) / (st.set - st.rise)));
        const ang = Math.PI * (1 - k);
        const cx = 120, cy = 100, r = 86;
        const sx = cx + r * Math.cos(ang), sy = cy - r * Math.sin(ang);
        const tm = (t) => { try { return new Date(t).toLocaleTimeString(this._loc(), { hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } };
        const up = now > st.rise && now < st.set;
        arc = `<div class="arc">
          <svg viewBox="0 0 240 112" aria-hidden="true">
            <defs><linearGradient id="gwx-sun" x1="0" x2="1"><stop offset="0" stop-color="#FFB46B"/><stop offset="0.5" stop-color="#FFE58A"/><stop offset="1" stop-color="#FFB46B"/></linearGradient></defs>
            <path d="M34 100 A86 86 0 0 1 206 100" fill="none" stroke="var(--glow-border, rgba(255,255,255,0.15))" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>
            ${up ? `<path d="M34 100 A86 86 0 0 1 ${sx.toFixed(1)} ${sy.toFixed(1)}" fill="none" stroke="url(#gwx-sun)" stroke-width="4" stroke-linecap="round"/>` : ''}
            <line x1="14" x2="226" y1="100" y2="100" stroke="var(--glow-border, rgba(255,255,255,0.15))" stroke-width="1.5"/>
            ${up ? `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="11" fill="#FFE58A" style="filter:drop-shadow(0 0 10px rgba(255,229,138,0.9))"/>` : `<circle cx="120" cy="100" r="8" fill="#FFF4D6" opacity="0.7"/>`}
          </svg>
          <div class="times"><span>${gwxEsc(tm(st.rise))}<small>${gwxEsc(this._t('sunrise'))}</small></span><span>${gwxEsc(tm(st.set))}<small>${gwxEsc(this._t('sunset'))}</small></span></div>
        </div>`;
      }
      const det = [];
      const add = (k, v, col, extra) => { if (v !== null && v !== undefined && v !== '–') det.push(`<div class="d" style="--k:${col}"><span class="ic">${GWX_SMALL[k] || ''}</span><span class="tx"><span class="l">${gwxEsc(this._t(k))}</span><span class="v">${extra || ''}${gwxEsc(v)}</span></span></div>`); };
      if (typeof a.apparent_temperature === 'number') add('feels', deg(a.apparent_temperature), gwxTempColor(a.apparent_temperature));
      if (typeof a.wind_speed === 'number') {
        const arrow = typeof a.wind_bearing === 'number' ? `<svg class="arrow" viewBox="0 0 24 24" style="transform:rotate(${a.wind_bearing + 180}deg)"><path d="M12 3l6 16-6-4-6 4z" fill="currentColor"/></svg>` : '';
        det.push(`<div class="d" style="--k:142, 227, 214"><span class="ic">${GWX_ICONS.wind.s}</span><span class="tx"><span class="l">${gwxEsc(this._t('wind'))}</span><span class="v">${arrow}${gwxEsc(this._num(a.wind_speed, 0) + ' ' + (a.wind_speed_unit || 'km/h'))}</span></span></div>`);
      }
      if (typeof a.humidity === 'number') add('humidity', this._num(a.humidity, 0) + '%', '142, 197, 255');
      const prec = today && typeof today.precipitation === 'number' ? today.precipitation : null;
      if (prec !== null) add('precipitation', this._num(prec, 1) + ' ' + (a.precipitation_unit || 'mm'), '142, 197, 255');
      if (typeof a.pressure === 'number') add('pressure', this._num(a.pressure, 0) + ' ' + (a.pressure_unit || 'hPa'), '185, 168, 255');
      if (typeof a.uv_index === 'number') add('uv', this._num(a.uv_index, 1), a.uv_index >= 6 ? '255, 184, 153' : '255, 224, 138');
      if (typeof a.cloud_coverage === 'number') add('clouds', this._num(a.cloud_coverage, 0) + '%', '201, 196, 221');
      if (typeof a.dew_point === 'number' && det.length < 8) add('dew', deg(a.dew_point), '142, 197, 255');
      if (arc || det.length) html += `<div class="mid">${arc}<div class="det">${det.slice(0, 6).join('')}</div></div>`;
    }

    // per uur: temperatuurcurve met icoontjes en regenkans
    if (c.show_hourly !== false && hourly.length > 1) {
      const step = 58;
      const w = step * hourly.length;
      const temps = hourly.map((h) => h.temperature);
      const lo = Math.min(...temps), hi = Math.max(...temps);
      const y = (t) => 74 - (hi === lo ? 0.5 : (t - lo) / (hi - lo)) * 34;
      const pts = hourly.map((h, i) => [i * step + step / 2, y(h.temperature)]);
      let d = `M${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1]; const [x1, y1] = pts[i];
        const mx = (x0 + x1) / 2;
        d += ` C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
      }
      const area = d + ` L${pts[pts.length - 1][0]} 96 L${pts[0][0]} 96 Z`;
      const stops = hourly.map((h, i) => `<stop offset="${(i / (hourly.length - 1)).toFixed(3)}" stop-color="rgb(${gwxTempColor(h.temperature)})"/>`).join('');
      const sunMs = this._sunTimes();
      const items = hourly.map((h, i) => {
        const t = new Date(h.datetime);
        const x = i * step + step / 2;
        let label;
        try { label = i === 0 ? this._t('now') : t.toLocaleTimeString(this._loc(), { hour: '2-digit' }).replace(/\s?u$/, ''); } catch (e) { label = String(t.getHours()); }
        const isNight = sunMs ? (() => { const hh = t.getHours() + t.getMinutes() / 60; const r = new Date(sunMs.rise); const st = new Date(sunMs.set); return hh < r.getHours() + r.getMinutes() / 60 || hh > st.getHours() + st.getMinutes() / 60; })() : (t.getHours() < 7 || t.getHours() > 19);
        const ic = gwxIcon(h.condition, isNight);
        const p = typeof h.precipitation_probability === 'number' ? h.precipitation_probability : null;
        const rainH = p ? Math.max(2, p / 100 * 26) : 0;
        return `
          <text class="hl" x="${x}" y="14" text-anchor="middle">${gwxEsc(label)}</text>
          <svg x="${x - 11}" y="20" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: color-mix(in srgb, rgb(${ic.c}), var(--glow-ink, #24262B) var(--glow-ink-amount, 0%))">${ic.s.replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>
          <text class="ht" x="${x}" y="${(pts[i][1] - 10).toFixed(1) * 1 + 44}" text-anchor="middle">${gwxEsc(deg(h.temperature))}</text>
          <circle cx="${x}" cy="${(pts[i][1] + 44).toFixed(1)}" r="3.5" fill="rgb(${gwxTempColor(h.temperature)})"/>
          ${rainH ? `<rect class="rain" x="${x - 12}" y="${166 - rainH}" width="24" height="${rainH}" rx="4"/>` : ''}
          ${p ? `<text class="hp" x="${x}" y="182" text-anchor="middle">${p}%</text>` : ''}`;
      }).join('');
      html += `<div class="sec"><span class="lab">${gwxEsc(this._t('hourly'))}</span><div class="hours"><svg width="${w}" height="188" viewBox="0 0 ${w} 188">
        <defs><linearGradient id="gwx-temp" x1="0" x2="1">${stops}</linearGradient>
        <linearGradient id="gwx-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
        <g transform="translate(0 44)"><path d="${area}" fill="url(#gwx-area)"/><path d="${d}" fill="none" stroke="url(#gwx-temp)" stroke-width="3.5" stroke-linecap="round"/></g>
        ${items}</svg></div></div>`;
    }

    // per dag: temperatuurbalken op één gemeenschappelijke schaal
    if (c.show_daily !== false && daily.length) {
      const los = daily.map((d) => (typeof d.templow === 'number' ? d.templow : d.temperature));
      const his = daily.map((d) => d.temperature);
      const min = Math.min(...los), max = Math.max(...his);
      const span = Math.max(1, max - min);
      const rows = daily.map((d, i) => {
        const t = new Date(d.datetime);
        let name;
        try { name = i === 0 ? this._t('today') : t.toLocaleDateString(this._loc(), { weekday: 'short' }); } catch (e) { name = String(i); }
        const ic = gwxIcon(d.condition, false);
        const lo = typeof d.templow === 'number' ? d.templow : d.temperature;
        const x0 = (lo - min) / span * 100;
        const x1 = (d.temperature - min) / span * 100;
        const p = typeof d.precipitation_probability === 'number' && d.precipitation_probability >= 10 ? d.precipitation_probability + '%' : '';
        const nowMark = i === 0 && typeof a.temperature === 'number' ? `<b style="left:${Math.max(0, Math.min(100, (a.temperature - min) / span * 100)).toFixed(1)}%"></b>` : '';
        return `<div class="day"><span class="dn">${gwxEsc(name.charAt(0).toUpperCase() + name.slice(1))}</span><span class="di" style="--k:${ic.c}">${ic.s}</span><span class="dp">${gwxEsc(p)}</span><span class="lo">${deg(lo)}</span><span class="bar"><i style="left:${x0.toFixed(1)}%;width:${Math.max(3, x1 - x0).toFixed(1)}%;background:linear-gradient(90deg, rgb(${gwxTempColor(lo)}), rgb(${gwxTempColor(d.temperature)}));box-shadow:0 0 8px rgba(${gwxTempColor(d.temperature)}, 0.5)"></i>${nowMark}</span><span class="hi">${deg(d.temperature)}</span></div>`;
      }).join('');
      html += `<div class="sec"><span class="lab">${gwxEsc(this._t('daily'))}</span><div class="days">${rows}</div></div>`;
    }
    void tu;
    if (html !== this._key) {
      const sc = this.shadowRoot.querySelector('.hours');
      const keep = sc ? sc.scrollLeft : 0;
      this._key = html;
      this._card.innerHTML = html;
      const ns = this.shadowRoot.querySelector('.hours');
      if (ns) ns.scrollLeft = keep;
    }
  }
}

class GlowWeatherCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) { this._hass = hass; if (this._form) this._form.hass = hass; else this._render(); }
  _render() {
    if (!this._config || !this._hass) return;
    const lang = gwxLang(this._hass, this._config.language);
    const t = (k) => gwxT(lang, k);
    if (!this._form || this._formLang !== lang) {
      this.innerHTML = '';
      this._form = document.createElement('ha-form');
      this._formLang = lang;
      this._form.computeLabel = (s) => gwxT(lang, 'l_' + s.name);
      this._form.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        Object.keys(v).forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined) delete v[k]; });
        if (v.language === 'auto') delete v.language;
        [['glow', 15], ['days', 7], ['show_hourly', true], ['show_daily', true], ['show_details', true]].forEach(([k, d]) => { if (v[k] === d) delete v[k]; });
        this._config = { type: this._config.type, ...v };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = [
      { name: 'entity', selector: { entity: { domain: 'weather' } } },
      { name: 'name', selector: { text: {} } },
      { type: 'grid', name: '', schema: [
        { name: 'show_details', selector: { boolean: {} } },
        { name: 'show_hourly', selector: { boolean: {} } },
        { name: 'show_daily', selector: { boolean: {} } },
        { name: 'days', selector: { number: { min: 1, max: 10, step: 1, mode: 'box' } } },
      ] },
      { name: 'glow', selector: { number: { min: 0, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } } },
      { name: 'language', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }].concat(Object.keys(GWX_LANG_NAMES).map((k) => ({ value: k, label: GWX_LANG_NAMES[k] }))) } } },
    ];
    this._form.data = { glow: 15, days: 7, show_hourly: true, show_daily: true, show_details: true, language: 'auto', ...this._config };
  }
}

if (!customElements.get('glow-weather-card')) customElements.define('glow-weather-card', GlowWeatherCard);
if (!customElements.get('glow-weather-card-editor')) customElements.define('glow-weather-card-editor', GlowWeatherCardEditor);
window.customCards = window.customCards || [];
if (!window.customCards.some((x) => x.type === 'glow-weather-card')) {
  window.customCards.push({ type: 'glow-weather-card', name: 'Glow Weather Card', description: gwxT(gwxLang(null), 'description'), preview: true, documentationURL: 'https://github.com/stijnleroy/glow-cards' });
}
