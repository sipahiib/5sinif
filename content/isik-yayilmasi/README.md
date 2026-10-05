# Işığın yayılması

Kaynak: `public/pages/fen/ısik-yayilmasi/IMG_4177.jpg`–`IMG_4180.jpg`, kitap sayfa109–112. Dört sayfanın tamamı ana videoda kapsanır. Açık NOT yok; EK BİLGİ görünür ve seslendirilir. Anahtar kavramlar kutusundaki sonraki konu başlıkları için ek ders üretilmez.

Doğal/yapay kaynaklar, doğrusal yayılma, ışın modeli, demet, opak engel, düz/kıvrımlı boru ve boşlukta ışık işlenir. Bilimsel açıklama aynı homojen ortam ve aynasız boru deneyiyle sınırlandırılır. Kaynak fotoğrafları videoya gömülmez. Inter açık font lisansı public/fonts/inter/OFL.txt içinde.

## Teslimatlar

- `out/fen/isik-yayilmasi/isik-yayilmasi.mp4`
- `out/fen/isik-yayilmasi/isik-yayilmasi_kurz.mp4`
- `out/shorts/fen/isik-yayilmasi_shorts/isik-yayilmasi_shorts.mp4`

Ana beyaz; Kurz ayrı, doygun renkli altı sahne; Short beyaz zemin. Dolu üçgen oklar aynı doğrultuda çizgiye bağlı; uç tam hedef koordinatında. MP3/MP4 Git’e eklenmez, yayınlama yapılmaz.

## Yeniden üretim

```sh
.venv/bin/python generate_py/isik-yayilmasi/generate.py
node scripts/render-isik-qa.cjs
node scripts/render-isik-final.cjs
```

Gerçek ses sürelerine göre zaman çizelgesi; Edge TTS -2%. Ana video üst süre sınırı yok. Kurz %50–70; 1 Short beş saniyelik düşünme süresi ve mevcut seçenek kartında cevap kullanır.
