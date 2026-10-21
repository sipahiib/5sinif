# Madde ve Işık

Kaynaklar: `public/pages/fen/madde-ışık/IMG_4181.jpg`–`IMG_4184.jpg`, kitap sayfaları 113–116. Kapsam haritası `SOURCE_MAP.md`; özgün anlatım `lesson.json` içindedir. Kaynak fotoğrafları videoya gömülmez.

Ana video: saydam/yarı saydam/opak maddeler, örneklerin tür ve yapısına bağlılık, sis, görünür ışık/X ışınları NOT'u, tam gölge, gölgenin biçimi ve uzaklık deneyleri. Beyaz zemin, dönüşümlü Filiz/İbrahim, ortak kanal kartı ve kapanış.

Kurz: Lumi'nin ışık gümrüğü, örnek bandı, sis gemisi, ışınım bileti, gölge tiyatrosu ve hareketli istasyonlar. Doygun renkler, ekran dışı dönüşümlü anlatım; ana sürenin %50–70'i.

Short: kaynak ve perde sabitken cismin kaynağa yaklaşması. Dört seçenek, tam beş saniye sayaç, cevap kartı üzerinde B işaretleme, Tebrikler bitişi. İbrahim kesintisiz görünür.

## Üretim

```sh
.venv/bin/python -m pip install -r generate_py/madde-isik/requirements.txt
.venv/bin/python generate_py/madde-isik/generate.py
npm run typecheck
node scripts/render-madde-isik-qa.cjs
node scripts/render-madde-isik-final.cjs
```

Edge TTS Filiz `tr-TR-EmelNeural`, İbrahim `tr-TR-AhmetNeural`, hız `-2%`. WordBoundary sözcük zamanları kaydedilir; MP3 süreleri ölçülerek `src/madde-isik/timeline.json` oluşturulur. Başarılı sesler içerik özetiyle önbelleklenir; yeni sesler geçici dosyaya yazılıp doğrulandıktan sonra yerlerine taşınır. Ekim 2026 servis bağlantı değişikliğinden sonra bu üretimde Edge TTS 7.3.1 kullanıldı: [resmi sürüm notları](https://github.com/rany2/edge-tts/releases/tag/7.3.0).

## Çıktılar

- `out/fen/madde-isik/madde-isik.mp4` — 1280×720
- `out/fen/madde-isik/madde-isik_kurz.mp4` — 1280×720
- `out/shorts/fen/madde-isik_shorts/madde-isik_shorts.mp4` — 720×1280

MP3/MP4 Git'e eklenmez. Üretim kendi konu klasörlerinde yalıtılmıştır; mevcut ders dosyaları değiştirilmez.
