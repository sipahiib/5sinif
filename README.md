# 5. Sınıf Türkçe

Bu proje Remotion ile 60 saniyelik, 960x540 eğitim videosu üretir.

## Çalıştırma
```bash
npm install
npx remotion studio src/index.tsx
npx remotion render src/index.tsx ZitAnlam out/zit-anlamli-sozcukler.mp4
```

## Yeni JPG ile ders videosu üretme

Yeni bir görsel için ayrı TSX, Python veya MP3 dosyası oluşturulmaz:

1. JPG dosyasını `public/pages/` altındaki uygun klasöre koyun.
2. `content/lessons.json` içindeki ilgili derse bir `scene` ekleyin. `image`, `title`, `focus`, `points`, `firstSpeaker` ve iki konuşmacının `dialogue` metinlerini doldurun.
3. Sesleri ve ölçülmüş süreleri üretin:

```bash
python3 -m pip install -r requirements.txt
npm run generate:lesson -- --lesson ay
```

4. Videoyu render edin:

```bash
npm run build:lesson
```

Sesler `public/audio/lessons/<ders-id>/`, timing dosyaları ise `content/timings/` altına otomatik yazılır. Yeni dersler aynı merkezi `Lesson` composition üzerinden çalışır.

Şu an merkezi manifestte örnek olarak Ay dersi tanımlıdır; diğer konu sahneleri de aynı JSON sözleşmesine taşınarak bu akışı kullanır.
