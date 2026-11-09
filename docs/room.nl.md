# Glow Room Card

🇬🇧 [English](room.md) · 🇳🇱 Nederlands

![Popup](../images/room.png)

Een kamertegel in de Glow-stijl. Hij gloeit in de kleur van de lampen die aan staan.

- **Tik**: licht van de kamer aan/uit.
- **Dubbeltik**: popup met alle lampen van de kamer: aan/uit, een helderheidsregelaar per lamp, een regelaar voor de hele kamer, warm/neutraal/koel en zes pastelkleuren.
- **Lang drukken**: de gewone details van de lamp of groep.
- De popup sluit als je ernaast tikt, met het ✕, of vanzelf na 30 seconden zonder aanraking.

De lampen in de popup worden automatisch gezocht: de leden van de lampgroep (Home Assistant-groepen, Zigbee2MQTT-groepen) of de lampen in dezelfde ruimte (bv. een Hue-ruimte). Je kunt ze ook zelf opgeven.

```yaml
type: custom:glow-room-card
entity: light.verlichting_living
name: Living
icon: hue:room-living
```

| Optie | Standaard | Uitleg |
|---|---|---|
| `entity` | – | Lamp of lampgroep van de kamer (tik schakelt die). |
| `name` | naam van de entiteit | Naam op de tegel. |
| `icon` | lampje | Eender welk icoon, ook `hue:`- of `fas:`-iconen. |
| `area` | – | Ruimte waarvan de lampen in de popup komen. |
| `lights` | automatisch | Eigen lijst met lampen voor de popup. |
| `color` | `#FFD27A` | Gloedkleur als de lampen geen kleur doorgeven. |
| `glow` | `22` | Sterkte van de gloed in pixels. |
| `auto_close` | `30` | Popup sluiten na zoveel seconden (0 = nooit). |
| `language` | automatisch | `nl`, `en`, `fr`, `de`, `es` of `it`. |
