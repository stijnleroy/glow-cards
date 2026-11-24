# Glow Panel Card

🇬🇧 [English](panel.md) · 🇳🇱 Nederlands

![Glow Panel Card](../images/panel.png)

Eén vierkant scherm voor een wandpaneel, zoals een NSPanel Pro (480×480). Alles wat je aanraakt staat bovenaan, onderaan staat alleen informatie. Handig als het scherm onderaan minder goed reageert.

- **Licht:** een grote balk. Tik op de lamp voor aan/uit, tik of veeg over de balk om te dimmen.
- **Scènes:** grote knoppen met naam, en **Kleur…** om zelf een wittint of kleur te kiezen. Het licht volgt meteen.
- **Ventilatie:** brede schakelaar, met een waarschuwing als het vochtig is.
- **Vandaag:** het weer van vandaag (met regen), de volgende afspraken en de afvalophaling van morgen.
- **Radio** (optioneel): wat er speelt, volume, stop en tot 6 zenders.
- **Onderaan:** temperatuur en vochtigheid.

```yaml
type: custom:glow-panel-card
light: light.badkamerlicht
scenes:
  - entity: scene.badkamer_helder
    name: Helder
    color: 255, 184, 125
  - scene.badkamer_blauw
fan: fan.ventilatie
temperature: sensor.badkamer_temperatuur
humidity: sensor.badkamer_vochtigheid
area: Badkamer
media_player: media_player.paneel
stations:
  - name: MNM
    script: script.radio_mnm
  - name: Top Radio
    image: /local/topradio.jpeg
    media_content_id: media-source://radio_browser/…
    media_content_type: audio/mpeg
```

Zet de kaart in een view van het type **Paneel** zodat ze het hele scherm vult.

| Optie | Uitleg |
|---|---|
| `light` | De lamp (verplicht). |
| `scenes` | Scènes als knoppen: een entiteit, of `entity`, `name` en `color` (`r, g, b`). |
| `fan` | Ventilator of schakelaar. |
| `temperature`, `humidity` | Sensoren onderaan. |
| `humidity_threshold` | Vanaf welk vochtpercentage de kaart waarschuwt (standaard 65). |
| `area` | Naam links onderaan. |
| `media_player`, `stations` | Radio: per zender `name`, eventueel `image` of `color`, en `script` of `media_content_id` (+ `media_content_type`). |
| `dark` | Altijd donker tonen, ook als het toestel in lichte modus staat. |
| `today` | Tab **Vandaag** tonen (standaard aan als er een weer- of agenda-entiteit is). |
| `weather` | Weerentiteit (standaard de eerste). |
| `calendars` | Agenda's (standaard alle, behalve de afvalkalender). |
| `waste` | Afvalkalender (standaard automatisch gezocht). |
| `exclude` | Afspraken met deze titels verbergen, met komma's (bv. `Werken`). |
| `name` | Andere naam voor de lamp. |
| `height`, `radius` | Hoogte (standaard 100 %) en afgeronde hoeken. |
| `glow`, `language` | Gloed en taal. |
