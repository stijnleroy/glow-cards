# Glow Media Card

🇬🇧 [English](media.md) · 🇳🇱 Nederlands

![Mediakaart](../images/media.png)

Een grote mediakaart voor een eigen view op je tablet: wat er speelt, internetradio, Spotify en je speakers, in de Glow-stijl.

- **Nu bezig**: grote hoes, titel, artiest en voortgang. De hele kaart gloeit in de opvallendste kleur van de hoes, of in de kleur van de zender.
- **Bediening**: grote afspeelknop, vorige en volgende, shuffle en herhalen (één keer of alles), volume en dempen. Bij radio springen vorige en volgende naar de vorige of volgende favoriete zender.
- **Radio**: je favoriete zenders als tegels. Eén tik speelt de zender af op de gekozen speaker, met een LIVE-label en wat er nu speelt. Met het zoekveld vind je elke zender; tik op de ster om ze bij je favorieten te zetten.
- **Spotify**: je afspeellijsten. Tik er een aan en ze speelt op de gekozen speaker, als Spotify die speaker kent (bv. tv of soundbar).
- **Speakers**: kies onderaan waarop je afspeelt. Met **Samen afspelen** vink je meerdere speakers aan: spelers die kunnen groeperen worden gegroepeerd, anders start dezelfde zender ook op de andere speakers.
- **Slaaptimer**: na 15, 30, 45 of 60 minuten stopt de muziek vanzelf.
- **Geluid en bron**: geluidsmodus of ingang kiezen, als de speler dat kan.

Zenders zoekt de kaart op in [Radio Browser](https://www.radio-browser.info), dezelfde open zenderlijst die Home Assistant zelf gebruikt. Je hoeft dus alleen de naam van een zender op te geven. Zenders die je met de ster bewaart en de slaaptimer worden op het toestel zelf bewaard (de tablet).

```yaml
type: custom:glow-media-card
entities:
  - media_player.soundbar
  - media_player.nesthub9ad1
  - media_player.slaapkamer
  - media_player.philips_tv
stations:
  - Studio Brussel
  - MNM
  - Radio 1
  - name: Mijn zender
    url: https://stream.example.com/live.mp3
    logo: https://example.com/logo.png
```

| Optie | Standaard | Uitleg |
|---|---|---|
| `entities` | – | Je speakers en spelers. Ook `{ entity: media_player.tv, name: Tv, spotify_source: '65PUS8837/12' }` kan. |
| `stations` | – | Favoriete zenders: een naam, een link of `{ name, url, logo }`. |
| `spotify` | automatisch | De Spotify-speler (`media_player.spotify_…`). `false` om Spotify te verbergen. |
| `layout` | `full` | `compact` voor een kleine kaart met alleen wat er speelt. |
| `glow` | `15` | Sterkte van de gloed. |
| `language` | automatisch | `nl`, `en`, `fr`, `de`, `es` of `it`. |
