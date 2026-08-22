const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 4000;
const AUDIO_DIR = path.join(__dirname, 'public', 'audio');

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

const scenes = [
  // 1. DERS: ZIT ANLAM
  {
    id: '01',
    chapter: '1. BÖLÜM: ZIT ANLAM',
    title: '1. Sahne: Zıt Anlam Tanımı & Kuralı',
    duration: '~12 - 14 sn',
    text: 'Birbirinin tersi durumları ve anlamları karşılayan sözcüklere karşıt, yani zıt anlamlı sözcükler denir. Karşıt anlamlı sözcükler yer değiştirdiğinde, cümlenin anlamı tam tersi yönünde değişir.'
  },
  {
    id: '02',
    chapter: '1. BÖLÜM: ZIT ANLAM',
    title: '2. Sahne: Zıt Anlamlı Sözcük Çiftleri',
    duration: '~8 - 10 sn',
    text: 'Ders sayfamızdaki zıt anlamlı sözcük çiftleri: Kalın ile ince, zayıf ile şişman, akıllı ile deli, gül ile ağla, yaz ile kış.'
  },
  {
    id: '03',
    chapter: '1. BÖLÜM: ZIT ANLAM',
    title: '3. Sahne: Cümle Örnekleri',
    duration: '~13 - 15 sn',
    text: 'Cümle örneklerimizi inceleyelim: Bu kış çok soğuk geçti. Bu yaz çok sıcak geçti. Kış ile yaz, soğuk ile sıcak zıttır. Akıllı köprü arayıncaya dek, deli suyu geçer.'
  },
  {
    id: '04',
    chapter: '1. BÖLÜM: ZIT ANLAM',
    title: '4. Sahne: Zıt Anlam Uyarısı & Tablo',
    duration: '~15 - 18 sn',
    text: 'Önemli uyarı! Bir sözcüğün zıt anlamı ile olumsuz anlamı farklıdır: Güzelin olumsuzu güzel değil, zıttı çirkindir. Sulu - susuz - kuru, tatlı - tatsız - acı, çıkmak - çıkmamak - inmek, gülmek - gülmemek - ağlamak.'
  },

  // 2. DERS: EŞ ANLAM
  {
    id: '05',
    chapter: '2. BÖLÜM: EŞ ANLAM',
    title: '5. Sahne: Eş Anlam (Anlamdaş) Tanımı',
    duration: '~12 - 14 sn',
    text: 'Şimdi ikinci dersimiz: Eş Anlamlı, yani Anlamdaş Sözcükler! Yazılışları ve okunuşları farklı olmasına rağmen aynı anlamı taşıyan sözcüklere eş anlamlı sözcükler denir ve birbirlerinin yerine kullanılabilirler.'
  },
  {
    id: '06',
    chapter: '2. BÖLÜM: EŞ ANLAM',
    title: '6. Sahne: Eş Anlamlı Örnekler',
    duration: '~10 - 12 sn',
    text: 'Kitabımızdaki eş anlamlı örneklere bakalım: Kalp, yürek ve gönül! Ev ile hane! Yaşlı ile ihtiyar! Bu sözcükler aynı anlamı ifade eder.'
  },
  {
    id: '07',
    chapter: '2. BÖLÜM: EŞ ANLAM',
    title: '7. Sahne: Eş Anlam Uyarısı',
    duration: '~13 - 15 sn',
    text: 'Eş anlam uyarısı! Bir kelimenin eş anlamlısı belirlenirken cümledeki anlamı dikkate alınmalıdır. Örneğin beyaz peynir yerine ak peynir veya kafam bozuldu yerine başım bozuldu diyemeyiz.'
  },
  {
    id: '08',
    chapter: 'BİTİŞ',
    title: '8. Sahne: 🎉 Tebrikler!',
    duration: '~5 - 10 sn',
    text: 'Tebrikler! Zıt ve eş anlamlı sözcükleri öğrendiniz. Artık cümlelerdeki anlam farklarını daha kolay fark edebilirsiniz. Çok iyi çalıştınız!'
  }
];

const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ses Kayıt Stüdyosu - Zıt & Eş Anlamlı Sözcükler</title>
  <style>
    :root {
      --primary: #0D9488;
      --primary-dark: #0F766E;
      --accent: #F43F5E;
      --bg: #F8FAFC;
      --card: #FFFFFF;
      --text: #1E293B;
    }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      margin: 0;
      padding: 30px 20px;
    }
    .container {
      max-width: 880px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      margin-bottom: 25px;
    }
    h1 {
      color: var(--primary-dark);
      font-size: 28px;
      margin-bottom: 6px;
    }
    p.subtitle {
      color: #64748B;
      font-size: 15px;
      margin: 0;
    }
    .chapter-badge {
      display: inline-block;
      background: #0D9488;
      color: white;
      font-size: 13px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 8px;
      margin-bottom: 8px;
    }
    .scene-card {
      background: var(--card);
      border-radius: 18px;
      padding: 20px;
      margin-bottom: 18px;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
      border: 2px solid #E2E8F0;
      transition: all 0.2s;
    }
    .scene-card.recording {
      border-color: var(--accent);
      box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.15);
    }
    .scene-card.saved {
      border-color: #10B981;
      background: #F0FDF4;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .card-title {
      font-size: 17px;
      font-weight: 800;
      color: var(--primary-dark);
    }
    .card-dur {
      font-size: 13px;
      font-weight: 700;
      color: #64748B;
      background: #F1F5F9;
      padding: 4px 10px;
      border-radius: 8px;
    }
    .script-box {
      background: #FEF3C7;
      border: 2px solid #F59E0B;
      border-radius: 12px;
      padding: 14px 18px;
      font-size: 16.5px;
      line-height: 1.5;
      font-weight: 700;
      color: #78350F;
      margin-bottom: 16px;
    }
    .controls {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }
    button {
      font-family: inherit;
      font-weight: 800;
      font-size: 14px;
      padding: 9px 18px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn-record {
      background: #EF4444;
      color: white;
    }
    .btn-record:hover:not(:disabled) {
      background: #DC2626;
    }
    .btn-stop {
      background: #1E293B;
      color: white;
    }
    .btn-listen {
      background: #0284C7;
      color: white;
    }
    .btn-listen:hover:not(:disabled) {
      background: #0369A1;
    }
    .status-text {
      font-size: 13px;
      font-weight: 700;
      margin-left: auto;
    }
    .status-text.ok {
      color: #059669;
    }
    .status-text.rec {
      color: #DC2626;
      animation: pulse 1s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .render-section {
      text-align: center;
      margin-top: 30px;
      padding: 24px;
      background: white;
      border-radius: 20px;
      border: 2px dashed #0D9488;
    }
    .btn-render-all {
      background: var(--primary);
      color: white;
      font-size: 17px;
      padding: 14px 32px;
      border-radius: 12px;
    }
    .btn-render-all:hover {
      background: var(--primary-dark);
    }
    #renderMsg {
      margin-top: 14px;
      font-weight: 800;
      font-size: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🎙️ Ses Kayıt Stüdyosu (2 Ders Tek Video)</h1>
      <p class="subtitle">1. Ders (Zıt Anlam) ve 2. Ders (Eş Anlam) sahnelerini mikrofonunuzla kaydedin!</p>
    </header>

    <div id="scenes-container">
      ${scenes.map((s, i) => `
        <div class="scene-card" id="card-${s.id}">
          <div class="chapter-badge">${s.chapter}</div>
          <div class="card-header">
            <div class="card-title">${s.title}</div>
            <div class="card-dur">Hedef Süre: ${s.duration}</div>
          </div>
          <div class="script-box">
            📢 "${s.text}"
          </div>
          <div class="controls">
            <button class="btn-record" id="btn-rec-${s.id}" onclick="startRecording('${s.id}')">
              🔴 Kaydı Başlat
            </button>
            <button class="btn-stop" id="btn-stop-${s.id}" onclick="stopRecording('${s.id}')" disabled>
              ⏹️ Durdur & Kaydet
            </button>
            <button class="btn-listen" id="btn-play-${s.id}" onclick="playRecording('${s.id}')">
              ▶️ Dinle
            </button>
            <span class="status-text" id="status-${s.id}">Mevcut ses hazır</span>
          </div>
          <audio id="audio-${s.id}" src="/audio/${s.id}.mp3" style="display:none"></audio>
        </div>
      `).join('')}
    </div>

    <div class="render-section">
      <h3 style="margin-top:0; color: #0F766E;">✨ Sesleri Videoya Aktar</h3>
      <p style="color: #64748B; font-size: 14px; margin-bottom: 16px;">
        Seslerinizi kaydettikten sonra aşağıdaki butona tıklayarak 120 saniyelik birleşik videonuzu oluşturun.
      </p>
      <button class="btn-render-all" onclick="renderVideo()">
        🎬 Videoyu Oluştur (Render Et)
      </button>
      <div id="renderMsg"></div>
    </div>
  </div>

  <script>
    let mediaRecorder = null;
    let audioChunks = [];
    let activeSceneId = null;

    async function startRecording(sceneId) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        activeSceneId = sceneId;

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunks.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
          const formData = new FormData();
          formData.append('audio', audioBlob, sceneId + '.mp3');
          formData.append('sceneId', sceneId);

          document.getElementById('status-' + sceneId).textContent = '⏳ Kaydediliyor...';

          const res = await fetch('/upload-audio', {
            method: 'POST',
            body: formData
          });

          if (res.ok) {
            const card = document.getElementById('card-' + sceneId);
            card.classList.add('saved');
            document.getElementById('status-' + sceneId).className = 'status-text ok';
            document.getElementById('status-' + sceneId).textContent = '✅ Sesiniz Kaydedildi!';
            
            const audioElem = document.getElementById('audio-' + sceneId);
            audioElem.src = '/audio/' + sceneId + '.mp3?t=' + Date.now();
          } else {
            document.getElementById('status-' + sceneId).textContent = '❌ Hata oluştu!';
          }

          stream.getTracks().forEach(t => t.stop());
        };

        mediaRecorder.start();

        document.getElementById('btn-rec-' + sceneId).disabled = true;
        document.getElementById('btn-stop-' + sceneId).disabled = false;
        document.getElementById('card-' + sceneId).classList.add('recording');
        document.getElementById('status-' + sceneId).className = 'status-text rec';
        document.getElementById('status-' + sceneId).textContent = '🔴 Kaydediliyor...';
      } catch (err) {
        alert('Mikrofon erişim hatası: ' + err.message);
      }
    }

    function stopRecording(sceneId) {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        document.getElementById('btn-rec-' + sceneId).disabled = false;
        document.getElementById('btn-stop-' + sceneId).disabled = true;
        document.getElementById('card-' + sceneId).classList.remove('recording');
      }
    }

    function playRecording(sceneId) {
      const audioElem = document.getElementById('audio-' + sceneId);
      audioElem.currentTime = 0;
      audioElem.play();
    }

    async function renderVideo() {
      const msg = document.getElementById('renderMsg');
      msg.style.color = '#0284C7';
      msg.textContent = '⏳ Video oluşturuluyor, lütfen bekleyin (yaklaşık 20-25 saniye)...';

      try {
        const res = await fetch('/render');
        const data = await res.json();
        if (data.success) {
          msg.style.color = '#059669';
          msg.innerHTML = '🎉 Tebrikler! 120 saniyelik birleşik videonuz başarıyla oluşturuldu.<br>📁 Konum: <b>out/zit-anlamli-sozcukler.mp4</b>';
        } else {
          msg.style.color = '#DC2626';
          msg.textContent = '❌ Render hatası: ' + data.error;
        }
      } catch (e) {
        msg.style.color = '#DC2626';
        msg.textContent = '❌ Bağlantı hatası: ' + e.message;
      }
    }
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  if (req.url.startsWith('/audio/')) {
    const filename = req.url.split('?')[0].replace('/audio/', '');
    const filepath = path.join(AUDIO_DIR, filename);
    if (fs.existsSync(filepath)) {
      res.writeHead(200, { 'Content-Type': 'audio/mp3' });
      fs.createReadStream(filepath).pipe(res);
      return;
    }
  }

  if (req.url === '/upload-audio' && req.method === 'POST') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(body);
      const sceneMatch = buffer.toString('latin1').match(/name="sceneId"\r\n\r\n([0-9]+)/);
      const sceneId = sceneMatch ? sceneMatch[1] : '01';
      
      const fileHeader = `name="audio"; filename="${sceneId}.mp3"\r\nContent-Type: audio/`;
      const headerIndex = buffer.indexOf(Buffer.from(fileHeader));
      
      if (headerIndex !== -1) {
        const bodyStart = buffer.indexOf(Buffer.from('\r\n\r\n'), headerIndex) + 4;
        const boundaryIndex = buffer.indexOf(Buffer.from('\r\n--'), bodyStart);
        const audioData = buffer.subarray(bodyStart, boundaryIndex);
        
        const targetPath = path.join(AUDIO_DIR, `${sceneId}.mp3`);
        fs.writeFileSync(targetPath, audioData);
        console.log(`[Recorder] Saved: ${targetPath} (${audioData.length} bytes)`);
      }
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    });
    return;
  }

  if (req.url === '/render') {
    console.log('[Recorder] Rendering video...');
    const cmd = 'export PATH="/opt/homebrew/bin:$PATH"; npx remotion render src/index.tsx ZitAnlam out/zit-anlamli-sozcukler.mp4 --overwrite';
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error('[Recorder] Render error:', stderr);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: stderr || err.message }));
      } else {
        console.log('[Recorder] Render success!');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`🎙️ Ses Kayıt Stüdyosu güncellendi ve çalışıyor: http://localhost:${PORT}`);
});
