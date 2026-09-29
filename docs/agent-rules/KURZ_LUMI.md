# Kurz/Lumi Profili

## Süre ve teslimat

- Final Kurz videosu `1280 × 720` teslim edilir.
- Önce tamamlanmış ana videonun gerçek süresini ölç. Kurz süresi `ana süre × 0,70` değerini geçemez.
- Kurz anlatımını bu süre bütçesine göre yaz; bütün sahne zamanlarını gerçek Kurz seslerinden türet ve final oranını ölçerek doğrula.
- Kurz çıktısını `<ana-video-adı>_kurz.mp4` olarak ana videonun yanında sakla.

## Yaratıcı yapı

- Ana videodan farklı anlatım, örnek, açıklama sırası, görsel metafor, diyagram, geçiş ve hareket dili kullan.
- Filiz ve İbrahim'i gösterme. Yalnızca projenin özgün Lumi maskotunu ve kod tabanlı geometrik görsel dilini kullan.
- Filiz ve İbrahim seslerini sahneler arasında ekran dışından dönüşümlü kullan: Filiz, İbrahim, Filiz, İbrahim…
- Katmanlı animasyon, kamera hareketi, örtüşme, ölçek ve parallax ile derinlik kur; hacimsel veya gerçekçi gölgelendirme kullanma. Parçacıkları ölçülü tut.
- Her sahnede ana kavramı taşıyan büyük ve okunabilir bir görsel olay kur; yalnızca başlık, birkaç daire, düz çizgi ve küçük maskottan oluşan durağan infografik düzeniyle yetinme. Renk, ölçek, dönüşüm ve hareket çeşitliliğini anlatımın anlamına göre artır.
- Lumi'yi yalnız yüz/küre olarak değil; antenli kafa, gövde, kol ve elleri olan projenin özgün robot biçiminde göster. Mirasımız üretimindeki tercih gibi belirgin görünmesi gereken Kurz'larda küçük eski Lumi ölçüsünün yaklaşık iki katını kullan.
- Her sahneye anlatılan kavramı akılda kalıcı kılan ayrı görsel metafor ve animasyon sistemi kur. Aynı merkez ikonunu ve düz bağlayıcı çizgileri bütün sahnelerde tekrarlama; katmanlı reveal, çizim, dönüşüm, parallax ve ölçülü ikincil hareketlerle profesyonel görselleştirme yap.

## Zorunlu görsel dil

- Bu bölüm bütün Kurz/Lumi videolarında önceliklidir. Ortak veya eski bir görsel tercih bununla çelişirse bu bölüm uygulanır.
- Create in the style of Kurzgesagt with flat vector illustration using rounded geometric shapes and smooth curves. Apply mostly solid flat colors with minimal gradients. Use extremely high color saturation levels throughout the composition. Emphasize strong contrast between warm and cool tones for dramatic visual impact. Build with bold color blocking where each shape contains a single saturated hue. Keep shading subtle and limited, favoring pure flat color over tonal variation. Design with vibrant and intense color relationships that create energetic visual tension. Maintain clean vector shapes with sharp color boundaries between elements. Use simplified forms with minimal detail but maximum color intensity. Style should feel bold, eye catching, and modern with masterful use of high saturation color theory and flat design principles while preserving the approachable geometric aesthetic.

## Lumi hareket güvenliği

- Bir sahnede en fazla bir ana yönsel Lumi geçişi kullan; sahne gerektirmiyorsa Lumi sabit kalabilir ve yalnızca küçük ikincil hareket yapabilir.
- Lumi'nin ilk konumundan son konumuna kadar açık bir hareket koridoru ayır. Maskot, gölge, parıltı, iz ve ikincil hareket hiçbir karede metin, kart, diyagram, etiket, bağlayıcı veya başka grafikle temas etmemelidir.
- Kurz diyagramlarındaki ok ve bağlayıcılar için de ayrı hareket/görünürlük koridorları ayır. Çizgiler ana görselin veya ikonların içinden geçmemeli; hedef sınırında bitmeli ve animasyon boyunca başka çizgi ya da şekillerle çakışmamalıdır.
- Lumi'nin ana yönsel hareketini sahnenin ilk yarısında tamamlayacak hızda kur; hızlı ikincil hareket gerekiyorsa genliği küçük tut. Uygun boş kenar koridorlarında sahneler arasında sağ-sol ve yukarı-aşağı rotaları çeşitlendir.
- Hareket koridorunu yalnızca durağan karelerle değil, tam hareketli preview içinde incele.

## Kanal kartı ve bitiş

- Kurz en az 35 saniyeyse `src/previews/channel-lower-third/ChannelLowerThirdPreview.tsx` bileşenini `00:30–00:35` arasında anlatımı kesmeden göster. Karttaki onaylı metinleri ve hareketleri koru; temel içeriği kapatma.
- Normal ana video CTA'sı, kapanış ekranı, trailing end card veya görünür Filiz/İbrahim sahnesi ekleme. Ders anlatımı bittiğinde video biter.
