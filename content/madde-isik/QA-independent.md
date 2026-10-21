# Bağımsız görsel QA

2026-10-21. Kaynak: gerçek ses sürelerinden üretilen `qa-main`, `qa-kurz`, `qa-short1` PNG kareleri. Temas sayfaları ve şüpheli/önemli tam çözünürlük kareleri `view_image` ile gerçekten incelendi. Bu rapor hareketli preview veya final MP4 doğrulaması değildir.

- **PASS — Düzeltilen ana kare gölgesi:** CSS `transformOrigin` kaldırıldıktan sonra yeniden render edilen 10863 ve 10938 kareleri tam çözünürlükte incelendi. Kare gölgesi artık perdenin içinde, üst sağ kırpılma yok. Sahne sonu 12162 ve sonraki sahne başlangıcı 12163 de temiz.
- **PASS — Ana diğer örneklenen kareler:** Frame 0’da tam Filiz, dönüşümlü karakter yerleşimi, beyaz zemin, NOT/X ışını sahnesi (8211), el kuklası, berrak kalın cam ve zayıf gölge görselleri okunaklı. Kanal kartı içerikle çakışmıyor; CTA 13775/13824 tam tuvali dolduruyor.
- **PASS — Kurz örneklenen yerleşimler:** Altı sahnede doygun zemin, tam gövdeli Lumi, ayrı metin/diyagram alanları; k0 yıldızlar, k1 bant, k2 gemi ve sisle kaybolan işaret, k3 iki ışınım bileti anlatımla eşleşiyor. k4 daire/kare/zayıf gölge, k5 başlangıç ve perdeye yaklaşma son durumları güvenli.
- **PASS — Kurz ek ara durumlar:** 5630 el kuklası, 6545 kaynak yaklaşması, 6730 cismin kaynağa yaklaşması tam çözünürlükte `view_image` ile incelendi. Şekiller, dolu üçgen oklar, metin ve Lumi ayrı alanlarda; kaynak/cisim hareketi ile büyüyen gölge durumu eşleşiyor.
- **PASS — Short örneklenen kareler:** 0’da tam İbrahim ve okunaklı soru; 281’de dört seçenek ve sayaç birlikte; 311/341/371/401’de 4/3/2/1; 430’da işaretsiz seçenekler; 431’de mevcut B kartı üzerinde doğru cevap; 841’de tam Tebrikler. Diyagram, seçenekler, karakter ve başarı kartı arasında açık boşluk var. Reveal öncesinde cevap işaretlenmiyor.

- **PASS — Etiket boşluğu yeniden kontrolü:** Label baseline 254 değişikliğinden sonra ana 10938/12162/12163 ve Short 0/476/841 karelerinde etiketler perde altından ayrılmış; metinler kendi bölgelerinde kalıyor.

Genel durum: **PASS — incelenen statik QA kareleri**. Önceki RED kapatıldı. Hareketli preview ve final MP4 teknik doğrulaması ana ajan tarafından ayrıca tamamlanmalıdır.

## Kurz k5 kaynak geri dönüşü yeniden kontrolü

**PASS — statik sınır ve yerleşim kontrolü.** `6497, 6545, 6590, 6610, 6640, 6685, 6730, 6789` global kareleri yeni renderdan tam çözünürlükte `view_image` ile incelendi. Kaynak yaklaşma sonundan başlangıç konumuna ara konumlar üzerinden dönüyor; 6610/6640 karelerinde “Kaynak başlangıca döner.” / “Yeni deneme” etiketleri ve sola yönelen dolu üçgen ok açık. 6685’te kaynak başlangıç konumunda, cisim hareketi başlıyor; 6730/6789’da kaynak sabit ve cisim yaklaşırken gölge büyüyor. Yazı, Lumi ve ok bölgelerinde yeni çakışma/kırpılma görülmedi. Kodda geri dönüş `reset..objectMove-8` aralığında easing ile hesaplanıyor. Hareketin akıcılığının Studio üzerinden tekrar izlenmesi ana ajana aittir; bu ek statik kare onayıdır.
