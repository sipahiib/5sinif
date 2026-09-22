# 5. Sınıf Eğitim Videoları

Bu depo Türkçe, matematik, fen bilimleri ve sosyal bilgiler konuları için Remotion tabanlı eğitim videoları üretir. Bir konu; yatay ana video, Kurz/Lumi eşlikçisi ve dikey Shorts/Reels çıktıları içerebilir.

## Kurulum ve önizleme

```bash
npm install
npm run start
```

Merkezi/erken dönem composition'lar `src/index.tsx` üzerinden, yeni konu aileleri ise çoğunlukla kendi `src/<konu>/entry.tsx` dosyaları üzerinden açılır. Render işleminden önce ilgili entry dosyasındaki composition kimliğini doğrulayın.

Örnek merkezi render:

```bash
npx remotion render src/index.tsx ZitAnlam out/zit-anlamli-sozcukler.mp4 --scale=1.3333333333
```

Konuya özel üretimler için `generate_py/<konu>/` altındaki ses, zamanlama ve render yardımcılarını; uygulama kodu için `src/<konu>/` klasörünü kullanın.

## Proje yapısı

- `src/`: Remotion composition ve ortak bileşenler
- `generate_py/`: ses, zamanlama ve konuya özel üretim yardımcıları
- `public/images/`: ortak karakter ve görsel varlıklar
- `public/pages/`: yalnızca ders içeriğini anlamak için kaynak sayfalar
- `public/audio/`: yerel üretilen anlatım sesleri
- `content/`: ders verileri, zamanlamalar ve metadata
- `out/`: yerel final video ve Kurz kapak çıktıları
- `docs/agent-rules/`: formata göre ajan üretim standartları

Kaynak ders sayfaları final videoya fotoğraf olarak gömülmez; içerikleri özgün kod tabanlı diyagram ve animasyonlarla yeniden oluşturulur.

## Teslimat biçimleri

- Ana video, Kurz/Lumi ve yatay kapaklar: `1280 × 720`
- Shorts ve Reels: `720 × 1280`

MP3 ve MP4 dosyaları yerel tutulur ve Git'e eklenmez. Ayrıntılı üretim kuralları için kök `AGENTS.md` yönlendirmesini izleyin.

Eski composition'ların mantıksal tuvali 960×540 veya 1920×1080 kalabilir. Teslimat çözünürlüğü render sırasında `--scale` ile ayarlanır: 960×540 yatay tuval için `1.3333333333`, 1920×1080 veya 1080×1920 tuval için `0.6666666667` kullanılır.
