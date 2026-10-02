# Türkçe: sözcük türleri, noktalama, atasözü ve deyim

Kullanıcı, `atasozu-deyim` klasöründeki dört sayfanın tamamını istedi. Kaynak sırası: IMG_4189.jpg (s52 isim/fiil), IMG_4190.jpg (s54 soru/ünlem), IMG_4191.jpg (s60 atasözleri), IMG_4192.jpg (s62 deyim). Sayfa fotoğrafları videoya gömülmez; özgün kod tabanlı illüstrasyonlar kullanılır.

Ana video için sabit üst süre sınırı kaldırılmıştır. Anlatım bütün kaynak kapsamını içerir. Kaynakta NOT etiketi yoktur; soru işaretiyle ilgili UYARI eşzamanlı gösterilir. Deyimlerde “yargı bildirmez” genellemesi, “genel kural veya öğüt vermez, belirli durumu anlatır” şeklinde eğitim doğruluğuyla açıklanır. -mak/-mek testi bir yardımcı yöntem olarak verilir. “Ya bu deveyi gütmeli ya bu diyardan gitmeli” örneğinin kaynakta eksik basılmış son sözcüğü tamamlanır.

## Çıktılar

- Ana: `out/turkce/atasozu-deyim/atasozu-deyim.mp4`
- Kurz: `out/turkce/atasozu-deyim/atasozu-deyim_kurz.mp4`
- Short 1: `out/shorts/turkce/atasozu-deyim_shorts/atasozu-deyim_shorts_1.mp4`
- Short 2: `out/shorts/turkce/atasozu-deyim_shorts/atasozu-deyim_shorts_2.mp4`

Yatay: 1280×720. Dikey: 720×1280. Bütün videolar 30 fps. Ana ve Shorts beyaz arka plan; Kurz sahneye göre doygun lacivert, petrol ve mor arka planlar kullanır. Sesler Filiz/EmelNeural ve İbrahim/AhmetNeural, Edge TTS `rate=-2%`; gerçek MP3 süreleri `src/atasozu-deyim/timeline.json` içinde ölçülür. Kurz ekran dışı sesleri Filiz → İbrahim sırasıyla değişir ve özgün tam gövdeli Lumi gösterilir. Shorts yalnız İbrahim ile dört seçenek, beş saniye sayaç, mevcut kartta cevap ve alt alanda Tebrikler kullanır.

## Yeniden üretim

```sh
.venv/bin/python generate_py/atasozu-deyim/generate.py
node scripts/render-atasozu-qa.cjs
npx remotion studio src/atasozu-deyim/entry.tsx --no-open
npx remotion render src/atasozu-deyim/entry.tsx AtasozuDeyimMain out/turkce/atasozu-deyim/atasozu-deyim.mp4 --codec=h264 --crf=18 --concurrency=4
npx remotion render src/atasozu-deyim/entry.tsx AtasozuDeyimKurz out/turkce/atasozu-deyim/atasozu-deyim_kurz.mp4 --codec=h264 --crf=18 --concurrency=4
npx remotion render src/atasozu-deyim/entry.tsx AtasozuDeyimShort1 out/shorts/turkce/atasozu-deyim_shorts/atasozu-deyim_shorts_1.mp4 --codec=h264 --crf=18 --concurrency=4
npx remotion render src/atasozu-deyim/entry.tsx AtasozuDeyimShort2 out/shorts/turkce/atasozu-deyim_shorts/atasozu-deyim_shorts_2.mp4 --codec=h264 --crf=18 --concurrency=4
```

Sesler metin/ses/hız karmasıyla adlandırılır. Eski üretimler korunur. MP3/MP4 Git’e eklenmez. Üretim kalite kaydı `QA.md` içinde tutulur.
