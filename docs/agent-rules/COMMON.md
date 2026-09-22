# Ortak Video Üretim Kuralları

Bu belge ana video, Kurz/Lumi, Shorts ve Reels için ortak kuralları içerir. Format ayrıntıları ilgili profil belgesindedir.

## Kaynak ve içerik

- Kaynak JPG'leri yalnızca içeriği anlamak için kullan. Sayfa fotoğraflarını videoya gömme; özgün, kod tabanlı diyagram ve animasyonlarla yeniden anlat.
- Anlatıma selamlama veya “Merhaba arkadaşlar” gibi girişlerle başlama; doğrudan derse gir.
- Sahne, konuşma, seçim, sayaç, cevap ve bitiş zamanlarını tahminî sabitlerden değil üretilen gerçek ses sürelerinden türet.
- Filiz ve İbrahim için yerleşik Türkçe Edge TTS seslerine ders metni gönderme izni vardır; yeniden izin isteme.

## Görsel ve hareket kalitesi

- Her sahnede konuya özgü, amacı anlaşılır animasyon kullan. Akıcı easing/spring, eşzamanlı vurgu, uygun ikincil hareket ve gerektiğinde ölçülü derinlik/parçacık ekle.
- Statik yer tutucu, ani hareket, titreme, flicker, kırpılma, gizli içerik ve okunaksız kompozisyon bırakma.
- Bağlı çizgi, ok, etiket, nesne ve yüzeyleri bütün hareket aralığında incele; ayrılma, kayma, sıçrama, istenmeyen temas veya boşluk oluşmamalıdır.

## Zorunlu QA

- Final MP4'ten önce videoyu hedef çözünürlükte hem temsilî tam çözünürlük kareleriyle hem de hareketli preview ile gerçekten izle.
- En az frame 0'ı, sahne sınırlarını, giriş/çıkışları, metinleri, karakterleri, diyagramları ve formata özgü etkileşimleri kontrol et.
- Bulunan kusuru düzelt, etkilenen bölümü yeniden render et ve yeniden incele. Preview üretmiş olmak tek başına inceleme sayılmaz.
- Finalden sonra çözünürlük, süre, ses akışı, dosya bütünlüğü ve temsilî final karelerini doğrula. Çözülmemiş önemli kusurla teslim etme.

## Çıktı ve depo

- Kalıcı çözünürlük standardı: bütün yatay videolar ve kapaklar `1280 × 720`; bütün dikey Shorts/Reels videoları `720 × 1280` teslim edilir. Kullanıcı açıkça farklı bir çözünürlük istemedikçe daha yüksek çözünürlük kullanma.
- Eski composition'ların mantıksal tuvalini körlemesine değiştirme. En-boy oranını koruyarak Remotion `--scale` değerini hedef çözünürlüğe göre hesapla ve final dosyasını `ffprobe` ile doğrula.
- Ana ve Kurz çıktıları ilgili konu klasöründe `out` altında birlikte tutulur. Kurz adı `<ana-video-adı>_kurz.mp4` olur.
- Shorts çıktıları `out/shorts/<ana-video-adı>_shorts/` altında tutulur. Tek Short `<ana-video-adı>_shorts.mp4`, birden fazlası `_shorts_1`, `_shorts_2` biçiminde adlandırılır.
- Final MP4'ü proje kökünde bırakma.
- Yalnızca mevcut üretime ait geçici `preview*.mp4` ve `qa*` kare klasörlerini, final doğrulaması geçtikten sonra temizle. Başka konuya ait dosyalara dokunma.
- Her teslim edilen format için konuya ve hedef kitleye uygun YouTube ve Instagram hashtag kümeleri hazırla; `<ana-video-adı>_hashtags.md` adıyla üretim metadatasının yanında sakla.
