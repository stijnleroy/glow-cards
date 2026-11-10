# Glow Usage Card

🇬🇧 [English](usage.md) · 🇳🇱 Nederlands

![Verbruikskaart](../images/usage.png)

Het verbruik van gas, water en elektriciteit (of eender welke meter) in één kaart.

- **Vandaag** groot, met een pijltje hoeveel meer of minder dan gisteren: groen als je minder verbruikt, perzik als het meer is.
- **Gisteren, deze week en deze maand** in drie vakjes, met de kosten als je een prijs opgeeft.
- **Staafjes** voor de laatste 7 dagen (instelbaar tot 31), met een stippellijn voor het gemiddelde en de dag van vandaag gloeiend.
- **Meerdere meters**: bovenaan wissel je met knopjes tussen bv. gas, water en elektriciteit. Gas kleurt perzik, water blauw, elektriciteit geel.
- **Dag- en nachttarief samen**: geef een lijst sensoren op voor één meter, dan telt de kaart ze op.

De cijfers komen uit de langetermijnstatistieken van Home Assistant, dezelfde als in het energiedashboard. Gebruik daarom de **totale meterstand** (een sensor met `state_class: total_increasing`, bv. van je digitale meter of P1-lezer).

```yaml
type: custom:glow-usage-card
meters:
  - sensor.gas_verbruik
  - sensor.water_verbruik
  - entity:                      # dag + nacht opgeteld
      - sensor.afname_dag
      - sensor.afname_nacht
    name: Elektriciteit
gas_price: 1.15
water_price: 5.2
energy_price: 0.32
```

| Optie | Standaard | Uitleg |
|---|---|---|
| `meters` | – | Lijst met meters. Ook `{ entity: sensor.water, name: Water, color: '#8EC5FF', price: 5.2 }` kan. `entity` mag ook een lijst sensoren zijn die opgeteld worden. |
| `name` | – | Titel boven de kaart. |
| `gas_price` | – | Prijs per eenheid gas (bv. per m³). |
| `water_price` | – | Prijs per eenheid water. |
| `energy_price` | – | Prijs per kWh elektriciteit. |
| `days` | `7` | Aantal dagen in de grafiek (3 tot 31). |
| `glow` | `15` | Sterkte van de gloed. |
| `language` | automatisch | `nl`, `en`, `fr`, `de`, `es` of `it`. |
