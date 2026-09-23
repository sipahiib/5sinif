# Ana Video Profili

## Teknik sınırlar

- Final ana video `1280 × 720` teslim edilir ve kapanış dahil en fazla 300 saniye sürer.
- Kaynak sayfaları numara sırasıyla işle; her başlığı, önemli öğretim noktasını ve açıkça `Not` olarak işaretlenen her cümleyi kapsa.
- Kaynaktaki her notu ilgili sahnede, okunaklı ve anlatımla eşzamanlı `NOT` çağrısı olarak göster.
- Tek karakterli ders sahnelerinde içeriği kullanılmayan yana doğru genişlet; karakter genişliğinde boş kolon bırakma.
- Normal ders anlatımı bittikten sonra kapanış ayrı final bölümüdür.

## Karakterler

- Yalnızca `public/images/filiz_2.gif` ve `public/images/ibrahim_2.gif` içindeki temiz, şeffaf 22 karelik animasyonları kullan. Eski PNG/çizim, beyaz zemin, boş sprite hücresi veya siyah artefakt gösterme.
- Filiz frame 0'da render-blocking yüklemeyle görünür olmalıdır.
- Her ders sahnesinde tam bir konuşan karakter göster; Filiz/İbrahim sırasını koru veya uygun biçimde dönüşümlü kullan. Ağız hareketi aktif sesle eşzamanlı olmalıdır.
- İki karakteri birlikte yalnızca ana videonun kapanış bölümünde göster. Konuşmayan karakter nötr ilk kare ve hafif nefes hareketi kullanabilir.
- `160 × 280` kaynak kutusunun oranını bozma. İbrahim'i sağ kenardan içeride tut; gövdesi ve gölgesi yatay güvenli alanın dışına çıkmamalıdır.
- Karakterlerin altında veya yanında `Filiz` ve `İbrahim` ad etiketlerini gösterme.
- Filiz ve İbrahim'in konuşma sprite'larında gövde, baş, ayak ve gölge kareler arasında yukarı-aşağı sıçramamalıdır. Karakter karelerini yarı saydam üst üste bindirerek çapraz harmanlama yapma; bu yöntem parlama/yanıp sönme üretir. Her anda tek, tam opak sprite karesi göster ve nefes hareketini düşük genlikli, kesintisiz easing/sinüs ile ilerlet.
- Ana ders sahnelerinde sağ üst veya başka bir köşede sahne/sayfa numarası gösterme.

## Kanal kartı ve kapanış

- Video en az 35 saniyeyse `src/previews/channel-lower-third/ChannelLowerThirdPreview.tsx` bileşenini `00:30–00:35` arasında anlatımı kesmeden göster.
- Kartta `DERSKUTUSU32`, `youtube.com/@derskutusu32` ve `KANALA GİT` bulunur. Onaylı giriş/çıkış, shine, ilerleme vurgusu, tıklama ve aktif durum korunur; kart temel içeriği kapatmaz.
- Her normal ana videoyu `src/previews/cta-option-1/CtaOptionOne.tsx` ile bitir. Filiz ve İbrahim karşılıklı konumlanır; beğen, abone ve zil sırasıyla canlanır.
- “Dersi beğendiysen desteğini gösterebilirsin.” cümlesini kullanma.
- Ana video için ayrıca kapak/thumbnail üretme.
