# Kurz/Lumi Profili

## Süre ve teslimat

- Finali `1280 × 720` olarak, ana videonun yanında `<ana-video-adı>_kurz.mp4` adıyla teslim et.
- Önce ana videonun gerçek süresini ölç. Kullanıcı farklı bir süre istemedikçe Kurz, ana sürenin `%50–%70` aralığında olmalıdır.
- Anlatımı bu bütçeye göre yaz; sahne zamanlarını gerçek ses sürelerinden türet ve final oranını ölç.

## Anlatım ve karakter

- Ana videodan farklı anlatım, örnek sırası, metafor, diyagram, geçiş ve hareket dili kullan.
- Filiz ve İbrahim'i gösterme; seslerini ekran dışından sahneler arasında `Filiz → İbrahim → Filiz → İbrahim…` sırasıyla kullan.
- Yalnızca projenin özgün, antenli başı, gövdesi, kolları ve elleri bulunan tam gövdeli Lumi maskotunu göster. 

## Zorunlu görsel dil

- Bu bölüm bütün Kurz/Lumi videolarında önceliklidir; çelişen ortak veya eski görsel tercihi geçersiz kılar.
- Arka plan: ana videonun düz beyaz arka plan kuralı Kurz/Lumi için geçerli değildir. Sahnenin kavramına uygun, doygun renkli tam ekran zeminler kullan; lacivert, petrol, mor veya diğer sıcak/soğuk renk alanlarıyla çeşitlendir. Bütün videoyu beyaz zemine sabitleme. Düz renk ve belirgin renk bloklarını tercih et; metin, Lumi ve diyagramların zeminden açıkça ayrılmasını sağla. Kullanıcının bu formata özel sonraki talimatı önceliklidir.
- Create in the style of Kurzgesagt with flat vector illustration using rounded geometric shapes and smooth curves. Apply mostly solid flat colors with minimal gradients. Use extremely high color saturation levels throughout the composition. Emphasize strong contrast between warm and cool tones for dramatic visual impact. Build with bold color blocking where each shape contains a single saturated hue. Keep shading subtle and limited, favoring pure flat color over tonal variation. Design with vibrant and intense color relationships that create energetic visual tension. Maintain clean vector shapes with sharp color boundaries between elements. Use simplified forms with minimal detail but maximum color intensity. Style should feel bold, eye catching, and modern with masterful use of high saturation color theory and flat design principles while preserving the approachable geometric aesthetic.

## Sahne tasarımı

- Her sahnede ana kavramı taşıyan büyük, okunabilir ve konuya özgü bir görsel olay kur. Başlık, birkaç basit şekil ve küçük maskottan oluşan durağan infografikle yetinme.
- Her sahne için ayrı metafor ve animasyon sistemi kullan; aynı merkez ikonunu veya düz bağlayıcı düzenini tekrarlama. Katmanlı reveal, çizim, dönüşüm, kamera hareketi, örtüşme, ölçek, parallax ve ölçülü ikincil hareket/parçacıklarla çeşitlilik sağla.
- Derinliği katman, örtüşme, ölçek ve parallax ile kur; hacimsel veya gerçekçi gölgelendirme kullanma.

## Yerleşim ve hareket güvenliği

- Lumi; anteni, gövdesi, uzuvları, gölgesi, parıltısı ve hareket iziyle her karede tamamen ekranın güvenli alanında kalmalıdır. Taşma veya kırpılma kabul edilmez.
- Metin, Lumi ve bütün görsel öğeler için ayrı bölgeler ile açık güvenlik boşlukları ayır. Yazılar; görsel, ikon, kart, diyagram, ok, bağlayıcı, parçacık, gölge veya hareket iziyle hiçbir karede çakışmamalıdır.
- Bir sahnede en fazla bir ana yönsel Lumi geçişi kullan ve bunu sahnenin ilk yarısında tamamla. Gereksiz geçiş yapma; hızlı ikincil hareketlerin genliğini küçük tut ve sahneler arasında boş kenar koridorlarını çeşitlendir.
- Lumi, oklar ve bağlayıcılar için bütün hareket boyunca ayrı koridorlar ayır. Çizgiler şekil veya metinlerin içinden geçmemeli; hedefin dış sınırında bitmeli ve birbirleriyle çakışmamalıdır.
- Frame 0'ı, sahne giriş/çıkışlarını ve hareketli öğelerin tüm sınırlarını incele; kamera ve ölçek değişimleri dahil bütün kuralları tam hareketli preview içinde doğrula.

## Kanal kartı ve bitiş

- Kurz en az 35 saniyeyse `src/previews/channel-lower-third/ChannelLowerThirdPreview.tsx` bileşenini `00:30–00:35` arasında anlatımı kesmeden göster; kart temel içeriği kapatmamalıdır.
- Ana video CTA'sı, kapanış ekranı, trailing end card veya görünür Filiz/İbrahim ekleme. Anlatım bittiğinde video bitsin.
