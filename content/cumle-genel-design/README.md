# Cümle: yeni tasarım ana videosu

Kaynaklar, görselde sayfa numarası bulunmadığından şu sırayla işlendi:
1. `public/pages/turkce/cumle-genel/cumle-genel.jpg`: tamamlama, konu, ana düşünce.
2. `public/pages/turkce/cumle-genel/cumle-olustur.jpg`: oluşturma ve üç sıralama uygulaması.

Kaynaklarda açık NOT etiketi yok. Sayfa fotoğrafları videoda kullanılmadı. Kaynağın ampul örneği bir dil bilgisi alıştırması olarak sunuldu; tarihsel bir kişiye icat atfı yapılmadı. İlk sıralama III–IV–V–II–I, son sıralama II–I–III–IV şeklinde düzeltildi.

- Tasarım: `design.md`; lisanslı Inter: `public/fonts/inter/OFL.txt`.
- Anlatım: Filiz / tr-TR-EmelNeural, İbrahim / tr-TR-AhmetNeural, Edge TTS `rate=-2%`.
- Gerçek MP3 süreleriyle ölçülmüş timeline: `src/cumle-genel-design/timeline.json`.
- 1280×720, 30 fps; 8982 kare / 299,4 saniye; 7 saniyelik onaylı kapanış dahil.
- Sadece ana video; eski üretim kodu ve eski sesler korunur.

## Yeniden üretim

```sh
.venv/bin/python generate_py/cumle-genel/generate_design.py
npx remotion studio src/cumle-genel-design/entry.tsx --no-open --port=3025
node scripts/render-cumle-design-qa.cjs
npx remotion render src/cumle-genel-design/entry.tsx CumleGenelDesign out/turkce/cumle-genel-design/cumle-genel.mp4 --codec=h264 --crf=18 --concurrency=4
```

Her ses parçasının adı metin, ses ve hız karmasını içerir. Metin değişirse yeni dosya üretilir. Üretilen MP3 ve MP4 dosyaları Git'e eklenmez.
