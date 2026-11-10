# Glow Salt Card

🇬🇧 [English](salt.md) · 🇳🇱 Nederlands

![Zoutkaart](../images/salt.png)

Het zoutniveau van je waterontharder als tegel, even groot als een kamertegel.

- **Vat met zout**: het vat loopt leeg met het niveau, met een gloeiend lijntje bovenaan het zout.
- **Kleur**: mint zolang er genoeg zout is, perzik met "Bijvullen" onder de waarschuwingsgrens (standaard 25%), rood met "Bijna leeg" onder de helft daarvan.
- **Schatting**: de kaart kijkt in de geschiedenis van de sensor hoeveel zout er sinds de laatste keer bijvullen per dag verdwijnt, en toont "Nog ongeveer 3 weken". Is er nog te weinig geschiedenis, dan staat er wanneer je het laatst bijvulde.
- **Tik**: de gewone details met de grafiek.

Werkt met een sensor in **%** of met een **afstand** (cm, mm, m) van de sensor tot het zout. Bij een afstand stel je in welke afstand "leeg" en welke "vol" is.

```yaml
type: custom:glow-salt-card
entity: sensor.zout_niveau
```

| Optie | Standaard | Uitleg |
|---|---|---|
| `entity` | – | De zoutsensor. |
| `name` | naam van de entiteit | Naam op de tegel. |
| `low` | `25` | Waarschuwen onder dit percentage. |
| `empty_distance` | `50` | Afstand (cm) als het vat leeg is, alleen bij een afstandssensor. |
| `full_distance` | `5` | Afstand (cm) als het vat vol is. |
| `glow` | `15` | Sterkte van de gloed. |
| `language` | automatisch | `nl`, `en`, `fr`, `de`, `es` of `it`. |
