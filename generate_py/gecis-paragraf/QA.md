# Geçiş–Paragraf üretim QA planı

## İçerik

- Kaynak sırası: IMG_4185 → IMG_4186 → IMG_4187 → IMG_4188.
- Sonuç ve sebep ayrı anlatılır; “bu yüzden/bunun sonucunda” sonuç tarafında değerlendirilir.
- “Yani” sözcüğünün işlevinin bağlama bağlı olduğu açıkça belirtilir.
- Yardımcı düşünce sorularının **çoğu zaman** olumsuz olduğu, bunun mutlak olmadığı söylenir.
- Bağımsız paragrafta görünür başlığın zorunlu olmadığı düzeltilmiştir.

## Render öncesi görsel kontrol

- Main: 8 sahnenin giriş/orta/çıkış kareleri; karakter, ad etiketi, başlık, diyagram, çip ve NOT kartı arasında temas/taşma yok.
- Kurz: 7 sahnenin tüm Lumi hareket koridoru izlenir. Lumi, gölgesi ve hareket yolu soldaki metin bölgesiyle ve sağdaki ana grafikle temas etmez.
- Her iki Short: frame 0, soru bitişi, 5–1 sayaç kareleri, reveal ve Tebrikler kareleri 1080×1920 kontrol edilir.
- Short animasyon bölgesinin alt sınırı 880 px, seçenek A'nın üst sınırı 930 px; en az 50 px görsel boşluk vardır. Nihai önizlemede tam hareket aralığı yeniden ölçülmelidir.
- İbrahim iki Short'ta da frame 0’dan sona kadar görünür, tam gövdesi güvenli alandadır ve şıkların üstüne gelmez.

## Teknik kabul

- Main/Kurz 1920×1080; Short 1080×1920.
- Main ≤300 sn; Kurz süresi nihai ana videonun en az %70’i.
- 30–35 sn kanal kartı; CTA yalnız ana videoda.
- Final MP4 öncesi tam hareketli preview ve temsilî tam çözünürlük kareleri bağımsız gözle incelenir.
