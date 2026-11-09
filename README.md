# Glow Cards

🇬🇧 English · 🇳🇱 [Nederlands](README.nl.md)

A family of glowing Home Assistant dashboard cards, installed together through HACS.

| Card | | Documentation |
|---|---|---|
| **Glow Blinds Card** – roller blinds as vertical windows: drag, stop, live position and a sky that follows the weather. | ![](images/blinds.png) | [English](docs/blinds.md) · [Nederlands](docs/blinds.nl.md) |
| **Glow Energy Card** – solar, battery and grid with advice you can see from across the room. | ![](images/energy.png) | [English](docs/energy.md) · [Nederlands](docs/energy.nl.md) |

All cards share the same look, support six languages (English, Dutch, French, German, Spanish, Italian) and have a visual editor.

## Installation via HACS

1. Open **HACS** → three dots top right → **Custom repositories**.
2. Repository: `https://github.com/stijnleroy/glow-cards`, type **Dashboard** → **Add**.
3. Search **Glow Cards** → **Download**, then reload your browser.

All cards are now available under **Add card**.

### Coming from the separate repositories?

The card types did not change (`custom:glow-blinds-card`, `custom:glow-energy-card`), so your dashboards keep working.

1. In HACS, **remove** Glow Blinds Card and Glow Energy Card. A card may only be loaded once.
2. Check **Settings → Dashboards → Resources** and delete any leftover `glow-blinds-card.js` or `glow-energy-card.js`.
3. Install **Glow Cards** as above and reload the browser.

## Development

Each card lives in `src/`. `node build.js` combines them into `dist/glow-cards.js`, the file HACS installs. The version is in `VERSION`.

## License

MIT
