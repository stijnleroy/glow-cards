# Glow Media Card

🇬🇧 English · 🇳🇱 [Nederlands](media.nl.md)

![Media card](../images/media.png)

What is playing on your TV, soundbar or speaker, in the Glow style.

- **Artwork**: large on the left, and blurred as the card background.
- **Glow in the colour of the artwork**: the card picks the most striking colour from the artwork and makes it pastel. Border, button and bars glow in that colour.
- **Controls**: previous, play/pause and next, a draggable volume bar and mute. Only the buttons the player supports are shown.
- **Progress**: a bar with elapsed and total time.
- **Several players**: list more and you get buttons at the top to switch. The card picks the player that is playing, marked with a glowing dot.
- **Off**: when nothing is playing, a power button is shown.
- **Tap the artwork**: the standard details of the player.

```yaml
type: custom:glow-media-card
entities:
  - media_player.soundbar
  - media_player.android_tv
```

| Option | Default | Description |
|---|---|---|
| `entities` | – | List of media players. `{ entity: media_player.tv, name: TV }` works too. |
| `glow` | `15` | Glow strength. |
| `language` | automatic | `en`, `nl`, `fr`, `de`, `es` or `it`. |
