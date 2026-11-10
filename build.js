// Voegt alle kaarten in src/ samen tot dist/glow-cards.js (het bestand dat HACS laadt).
// Gebruik: node build.js
const fs = require('fs');
const path = require('path');
const version = fs.readFileSync(path.join(__dirname, 'VERSION'), 'utf8').trim();
const cards = ['blinds.js', 'energy.js', 'room.js', 'scene.js', 'navbar.js', 'welcome.js', 'security.js', 'fan.js', 'garage.js'];
let out = `/*! Glow Cards v${version} – https://github.com/stijnleroy/glow-cards – MIT */\n`;
for (const f of cards) {
  const src = fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');
  // elke kaart in een eigen blok, zodat namen elkaar niet in de weg zitten
  out += `\n/* ---- ${f} ---- */\n{\n${src}\n}\n`;
}
out += `\nconsole.info('%c GLOW-CARDS %c v${version} ', 'color:#1C1730;background:#FFE08A;font-weight:700;border-radius:4px 0 0 4px;padding:2px 4px', 'color:#FFE08A;background:#1C1730;font-weight:700;border-radius:0 4px 4px 0;padding:2px 4px');\n`;
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist', 'glow-cards.js'), out);
console.log('dist/glow-cards.js', (out.length / 1024).toFixed(1) + ' kB');
