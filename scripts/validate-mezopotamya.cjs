const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const content = JSON.parse(fs.readFileSync(path.join(root, 'content/mezopotamya.json'), 'utf8'));
const timings = JSON.parse(fs.readFileSync(path.join(root, 'src/mezopotamya/timings.json'), 'utf8'));

const requiredPages = ['4244', '4245', '4246', '4247', '4248'];
if (JSON.stringify(content.sourcePages) !== JSON.stringify(requiredPages)) {
  throw new Error('Kaynak sayfa sırası 4244→4248 olmalıdır.');
}
if (content.main.length !== timings.main.length || content.kurz.length !== timings.kurz.length) {
  throw new Error('Ana/Kurz sahne sayıları ile zamanlamalar eşleşmelidir.');
}
if (content.shorts[0].correct !== 2 || content.shorts[0].options[2] !== 'Asurlar') {
  throw new Error('Short doğru cevabı Asurlar olmalıdır.');
}
for (const group of ['main', 'kurz']) {
  for (const item of timings[group]) {
    if (!(item.audioFrames > 0 && item.frames >= item.audioFrames)) {
      throw new Error(`${group} için geçersiz ses zamanlaması.`);
    }
  }
}
console.log('Mezopotamya kaynak ve zamanlama doğrulaması geçti.');
