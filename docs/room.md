# Glow Room Card

🇬🇧 English · 🇳🇱 [Nederlands](room.nl.md)

![Popup](../images/room.png)

A room tile in the Glow style. It glows in the colour of the lights that are on.

- **Tap**: toggle the room's lights.
- **Double tap**: open a popup with everything in the room (see below).
- **Hold**: open the standard details of the light or group.
- The popup closes when you tap outside it, with the ✕, or automatically after 30 seconds without touching it.

## The popup

The popup always keeps the same warm glow. Only the light tiles take on the colour of their light.

- **Climate**: temperature and humidity next to the name. The temperature chip glows while the room's thermostat is heating.
- **Scenes**: a row of buttons at the top. The scene that still matches glows.
- **Lights**: on/off and a slider per light. The small buttons next to it switch, like in Mushroom, between brightness ☀, colour temperature 🌡 and colour 🎨. Only the modes the light supports are shown. **All on** and **All off** sit at the top.
- **Covers**: a position slider and open, stop and close buttons.
- **Switches**: plugs, fans, helpers (`switch`, `fan`, `input_boolean`).

Everything is found automatically in the card's area: the area you set with `area`, or otherwise the area of the light or group. Hidden and configuration entities are skipped. Lights come from the light group first (Home Assistant groups, Zigbee2MQTT groups), otherwise from the area.

To choose yourself, fill in the lists. `sections` sets which parts appear in the popup, and in which order.

```yaml
type: custom:glow-room-card
entity: light.verlichting_living
name: Living
icon: hue:room-living
sections: [climate, scenes, lights, covers, switches]
scenes:
  - scene.tv_kijken
  - scene.eten
covers:
  - cover.schuifraam_links
  - cover.schuifraam_rechts
switches:
  - switch.ambilight
temperature: sensor.living_temperatuur
```

| Option | Default | Description |
|---|---|---|
| `entity` | – | Light or light group of the room (tap toggles it). |
| `name` | entity name | Name on the tile. |
| `icon` | bulb | Any icon, also `hue:` or `fas:` icons. |
| `area` | area of `entity` | Area the popup takes its content from. |
| `sections` | all | Parts of the popup: `climate`, `scenes`, `lights`, `covers`, `switches`. |
| `lights` | automatic | Your own list of lights. |
| `scenes` | from the area | Your own list of scenes. |
| `covers` | from the area | Your own list of covers. |
| `switches` | from the area | Your own list of switches. |
| `temperature` | from the area | Temperature sensor. |
| `humidity` | from the area | Humidity sensor. |
| `color` | `#FFD27A` | Tile glow colour when the lights report no colour. |
| `glow` | `22` | Glow strength in pixels. |
| `auto_close` | `30` | Close the popup after this many seconds (0 = never). |
| `language` | automatic | `en`, `nl`, `fr`, `de`, `es` or `it`. |

Everything is also available in the visual editor, under **Popup content**.

### Which scene glows?

Like the Glow Scene Card, the popup compares the saved scene with the current state of the lights (with a 10% brightness margin). This needs the dashboard to be open with an administrator account. Without admin rights, the most recently started scene glows as long as its lights have not changed since.

## Coming from version 1.5.0 or older?

The warm/neutral/cool row, the colour dots and the whole-room brightness slider are gone. Colour temperature and colour are now set per light. Your configuration does not need any changes.
