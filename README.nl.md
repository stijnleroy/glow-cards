# Glow Cards

🇬🇧 [English](README.md) · 🇳🇱 Nederlands

Een familie van gloeiende dashboardkaarten voor Home Assistant, samen te installeren via HACS.

| Kaart | | Documentatie |
|---|---|---|
| **Glow Blinds Card** – rolgordijnen als verticale ramen: slepen, stop, live positie en een lucht die het weer volgt. | ![](images/blinds.png) | [Nederlands](docs/blinds.nl.md) · [English](docs/blinds.md) |
| **Glow Energy Card** – zon, batterij en net met een advies dat je van ver ziet. | ![](images/energy.png) | [Nederlands](docs/energy.nl.md) · [English](docs/energy.md) |

Alle kaarten delen dezelfde stijl, spreken zes talen (Nederlands, Engels, Frans, Duits, Spaans, Italiaans) en hebben een visuele editor.

## Installeren via HACS

1. Open **HACS** → drie puntjes rechtsboven → **Custom repositories**.
2. Repository: `https://github.com/stijnleroy/glow-cards`, type **Dashboard** → **Add**.
3. Zoek **Glow Cards** → **Download** en herlaad je browser.

Alle kaarten staan daarna bij **Kaart toevoegen**.

### Kom je van de losse repo's?

De namen van de kaarten blijven dezelfde (`custom:glow-blinds-card`, `custom:glow-energy-card`), dus je dashboards blijven werken.

1. **Verwijder** in HACS Glow Blinds Card en Glow Energy Card. Een kaart mag maar één keer geladen worden.
2. Kijk bij **Instellingen → Dashboards → Resources** of er nog een `glow-blinds-card.js` of `glow-energy-card.js` staat, en verwijder die.
3. Installeer **Glow Cards** zoals hierboven en herlaad de browser.

## Ontwikkeling

Elke kaart staat in `src/`. `node build.js` voegt ze samen tot `dist/glow-cards.js`, het bestand dat HACS installeert. Het versienummer staat in `VERSION`.

## Licentie

MIT
