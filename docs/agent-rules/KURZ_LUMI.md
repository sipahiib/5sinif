# Kurz/Lumi Profili

## Süre ve teslimat

- Final Kurz videosu `1280 × 720` teslim edilir.
- Önce tamamlanmış ana videonun gerçek süresini ölç. Kurz süresi `ana süre × 0,70` değerini geçemez.
- Kurz anlatımını bu süre bütçesine göre yaz; bütün sahne zamanlarını gerçek Kurz seslerinden türet ve final oranını ölçerek doğrula.
- Kurz çıktısını `<ana-video-adı>_kurz.mp4` olarak ana videonun yanında sakla.

## Yaratıcı yapı

- Ana videodan farklı anlatım, örnek, açıklama sırası, görsel metafor, diyagram, geçiş ve hareket dili kullan.
- Canlı renkler, katmanlı sahneler, belirgin karakter hareketleri, organik geçişler ve konuya özgü görsel metaforlarla zengin bir bilim animasyonu dili kur. Lumi'nin özgün tasarımını ve projenin kendi görsel kimliğini koru.
- Filiz ve İbrahim'i gösterme. Yalnızca projenin özgün Lumi maskotunu ve kod tabanlı geometrik görsel dilini kullan.
- Filiz ve İbrahim seslerini sahneler arasında ekran dışından dönüşümlü kullan: Filiz, İbrahim, Filiz, İbrahim…
- Katmanlı animasyon, kamera hareketi, derinlik ve ölçülü parçacıklar kullan.
- Her sahnede ana kavramı taşıyan büyük ve okunabilir bir görsel olay kur; yalnızca başlık, birkaç daire, düz çizgi ve küçük maskottan oluşan durağan infografik düzeniyle yetinme. Renk, ölçek, dönüşüm ve hareket çeşitliliğini anlatımın anlamına göre artır.
- Lumi'yi yalnız yüz/küre olarak değil; antenli kafa, gövde, kol ve elleri olan projenin özgün robot biçiminde göster. Mirasımız üretimindeki tercih gibi belirgin görünmesi gereken Kurz'larda küçük eski Lumi ölçüsünün yaklaşık iki katını kullan.
- Her sahneye anlatılan kavramı akılda kalıcı kılan ayrı görsel metafor ve animasyon sistemi kur. Aynı merkez ikonunu ve düz bağlayıcı çizgileri bütün sahnelerde tekrarlama; katmanlı reveal, çizim, dönüşüm, parallax ve ölçülü ikincil hareketlerle profesyonel görselleştirme yap.

## Lumi hareket güvenliği

- Bir sahnede en fazla bir ana yönsel Lumi geçişi kullan; sahne gerektirmiyorsa Lumi sabit kalabilir ve yalnızca küçük ikincil hareket yapabilir.
- Lumi'nin ilk konumundan son konumuna kadar açık bir hareket koridoru ayır. Maskot, gölge, parıltı, iz ve ikincil hareket hiçbir karede metin, kart, diyagram, etiket, bağlayıcı veya başka grafikle temas etmemelidir.
- Kurz diyagramlarındaki ok ve bağlayıcılar için de ayrı hareket/görünürlük koridorları ayır. Çizgiler ana görselin veya ikonların içinden geçmemeli; hedef sınırında bitmeli ve animasyon boyunca başka çizgi ya da şekillerle çakışmamalıdır.
- Lumi'nin ana yönsel hareketini sahnenin ilk yarısında tamamlayacak hızda kur; hızlı ikincil hareket gerekiyorsa genliği küçük tut. Uygun boş kenar koridorlarında sahneler arasında sağ-sol ve yukarı-aşağı rotaları çeşitlendir.
- Hareket koridorunu yalnızca durağan karelerle değil, tam hareketli preview içinde incele.

## Kanal kartı ve bitiş

- Kurz en az 35 saniyeyse `src/previews/channel-lower-third/ChannelLowerThirdPreview.tsx` bileşenini `00:30–00:35` arasında anlatımı kesmeden göster. Karttaki onaylı metinleri ve hareketleri koru; temel içeriği kapatma.
- Normal ana video CTA'sı, kapanış ekranı, trailing end card veya görünür Filiz/İbrahim sahnesi ekleme. Ders anlatımı bittiğinde video biter.
