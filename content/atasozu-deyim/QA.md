# Üretim kalite kaydı

Kaynak: IMG_4189–IMG_4192, dört sayfanın tamamı. Eğitim kapsamı ve kaynak genellemelerinin düzeltmeleri içerik uzmanı tarafından kontrol edildi.

- Ana: 12516 kare, 417,2 sn; 1280×720, 30 fps.
- Kurz: 6548 kare, 218,27 sn; 1280×720, 30 fps. Ana video oranı %52,32.
- Short 1: 744 kare, 24,8 sn; 720×1280, 30 fps.
- Short 2: 639 kare, 21,3 sn; 720×1280, 30 fps.
- Sesler: Edge TTS EmelNeural/AhmetNeural, -2%; zaman çizelgesi gerçek MP3 sürelerinden üretildi.
- Ana ve Shorts arka planları beyaz. Kurz renkli arka plan revizyonu aşağıda kayıtlı. Ana video süre üst sınırı kaldırıldı. Shorts ders/konu klasöründe.

## Görsel inceleme

Ana için 77, Kurz için 28, her Short için 15 temsilî render karesi incelendi. Frame 0, sahne/konuşma sınırları, kanal kartı, CTA ve Shorts sayaç/reveal/tebrikler kontrol edildi. Bağımsız eğitim ve görsel QA: Shorts PASS; ana görsellerinin anlam eşleşmesi ve ok boşluğu düzeltildikten sonra PASS; Kurz sekiz ayrı görsel olayla yeniden tasarlanıp kilit yayı kırpılması düzeltildikten sonra PASS.

SVG kitap çizgilerindeki sayı ayırıcı hatası giderildi; ilgili sahneler yeniden render edildi. Kilit sahnesi 4789,4864,4989 karelerinde bağımsız yeniden kontrol edildi.

Hareketli oynatma bilgisayar erişimi olmadan gerçekleştirilemedi. Kullanıcının önceki “bu şekilde devam et” talimatıyla gerçek render kareleri, hareket sınırları ve dosya doğrulaması üzerinden devam edildi; hareketli izleme yapılmış olarak raporlanmaz.

## Final doğrulaması

Final dosyaları ffprobe ile video/ses akışları, çözünürlük, 30 fps ve süre açısından; ffmpeg tam decode ile dosya bütünlüğü açısından doğrulanır. Temsilî kareler final MP4lerden çıkarılıp incelenir. Sonuçlar aşağıya kaydedilir.

Final doğrulaması: **PASS**. Dört dosyanın tam decode kontrolü hatasız, H.264 + AAC 48 kHz, 30 fps; çözünürlükler kuralla uyumlu. Ana, Kurz ve iki Short’un final MP4 kareleri ayrıca incelendi.

- `out/turkce/atasozu-deyim/atasozu-deyim.mp4`: 417.259 sn; SHA-256 `54eeb03502ac9ed02957233b8e0c87beee0ef22c2ff8f5850f424981b44cad81`.
- `out/turkce/atasozu-deyim/atasozu-deyim_kurz.mp4`: 218.325 sn; SHA-256 `d23801c88d9df274ad22b2f8f1f6da033c35ef3c498d0cbb06a46b800b6c248e`.
- `out/shorts/turkce/atasozu-deyim_shorts/atasozu-deyim_shorts_1.mp4`: 24.853 sn; SHA-256 `c8b7119348e3207699c57504e862f500cbe4bc624eaa544af768dd855b2bf36f`.
- `out/shorts/turkce/atasozu-deyim_shorts/atasozu-deyim_shorts_2.mp4`: 21.355 sn; SHA-256 `fb4a50243993a67394aabf0453ae2ee08ff786b0f3c04fd006bab0ea3aecde7d`.

Geçici QA kare klasörleri final doğrulamasından sonra temizlendi. Yeniden üretim betikleri ve doğrulama JSON kaydı korunuyor.

## Kurz renkli arka plan revizyonu — 2026-10-02

KURZ_LUMI.md güncellendi: ana videonun beyaz zemin kuralı Kurz için geçerli değil; sahneye göre doygun renkli tam ekran zemin zorunlu. Sekiz sahne lacivert/petrol/mor zeminlere geçti, başlıklar ve dış etiketler açık renk oldu. 28 gerçek render karesi bağımsız incelendi; renk/kontrast, Lumi, kanal kartı, sahne sınırları PASS. Bütçe sayacı tamamlanan transferlerle eşzamanlı düzeltildi; 2737 karesi yeniden bağımsız PASS. Final MP4 temsilî karesi incelendi, tam decode ve teknik kontroller PASS. Hareketli oynatma yapılmadı.

Yeni final: 218.325333 sn, SHA-256 `ecb5e018b12c520fd120f60ed774eb70c61a07eff2b1216fd96caa685d72f701`. Önceki beyaz sürüm `atasozu-deyim_kurz_onceki_beyaz.mp4` adıyla korundu.
