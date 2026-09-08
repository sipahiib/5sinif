# Hücre render QA noktaları

Ses üretiminden sonra `src/hucre/timings.json` değerleri esas alınır.

- Ana video: kare 0; her sahnenin başlangıcı, +15 ve son -1 karesi; 00:30–00:35 kanal kartı; CTA'nın ilk, orta ve son karesi.
- Kurz: yedi sahnenin başlangıcı, +30, orta ve son -1 karesi; özellikle Lumi yörüngelerinin bütün hareket aralığı.
- Her Shorts: kare 0; `qEnd-1`; `qEnd`; beş sayaç durumunun ortası; `reveal-1`; `reveal`; `aEnd-1`; `congrats`; son kare.
- Shorts bölgeleri: soru kartı 125–445, animasyon 475–805, seçenekler 835–1288, İbrahim sağ güvenli alan 772–1064 / 900–1410, sayaç 1530–1810, başarı kartı 1450–1845. Yatay ayrışma nedeniyle karakter ve seçenekler birleşmez; başarı durumunda görünür karakter başarı kartının üst sınırında kalır.
- Bütün karelerde metin kırpılması, ok/nesne ayrılması, karakter-şık çakışması, titreme ve alttaki güvenli alan ayrıca kontrol edilir.
