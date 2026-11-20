# Mezopotamya Ortak Mirası — Tasarım Belgesi

## Amaç

5. sınıf Sosyal Bilgiler öğrencisinin, Mezopotamya'nın neden Dicle ve Fırat çevresinde geliştiğini ve Sümer, Babil, Asur uygarlıklarının günümüze uzanan ortak miras katkılarını neden-sonuç ilişkisiyle kavramasını sağlamak.

## Hedefler

- Kaynak sayfaları `IMG_4244.jpg`–`IMG_4248.jpg` sırasıyla ve eksiksiz kapsamak.
- Ana video, Kurz/Lumi ve bir Short üretmek.
- Kaynak fotoğrafları yerine özgün kod tabanlı harita, tarih şeridi, nehir, tablet, ziggurat, tekerlek, ticaret ve kütüphane animasyonları kullanmak.
- Ana videoda Anadolu–Mezopotamya medeniyet havzaları çerçevesi → coğrafya/zaman → Sümerler → Babiller → Asurlar → ortak miras kapanışı akışını korumak.

## Hedef Dışı Olanlar

- Kaynak sayfa fotoğraflarını video içinde göstermek.
- Kaynağın desteklemediği tarihsel iddia, tarih veya ayrıntı eklemek.
- Şiddet içeren hukuk örneklerini görselleştirmek.
- Kapak görseli üretmek veya platforma yayın yapmak.

## Yaklaşım Seçimi

1. **Seçilen: İki nehir, üç kalıcı katkı.** Dicle-Fırat'ın beslediği yerleşimler, zaman çizgisiyle Sümer-Babil-Asur bölümlerine dönüşür. Her uygarlık ortak mirasa bir somut katkı bırakır: yazı/bilim, hukuk/mimari, ticaret/kütüphane. Sayfa sırası ile neden-sonuç ilişkisini birlikte korur.
2. **Zaman yolculuğu.** Uygarlıkları yalnızca sırayla ziyaret eden tarih şeridi. Kronolojiyi güçlü kurar ancak coğrafya ve ortak miras ilişkisini ikinci plana iter.
3. **Tablet yolculuğu.** Çivi yazılı bir tablet üzerinden anlatım. Sümer-Asur bağlantısını kuvvetlendirir ancak Babil hukuk ve mimari bölümünü daraltır.

Kullanıcı 1. yaklaşımı seçti.

## Teslimatlar

### Ana video

- 1280×720, 30 fps, beyaz `#FFFFFF` zemin, konuşan Filiz/İbrahim ve gerçek Edge TTS sürelerinden türetilen zamanlama.
- Bölümler: (1) uygarlık ve ortak miras; Anadolu (Hitit, Frig, İyon, Urartu, Lidya) ile Mezopotamya (Sümer, Babil, Asur) havzalarını kaynakta verilen zaman aralıklarıyla kısa harita/tarih şeridi vuruşunda konumlandırma, (2) Dicle-Fırat/Münbit Hilal ve tarih şeridi, (3) Sümerler: çivi yazısı, site devletleri, ziggurat, takvim, hukuk, tekerlek ve matematik, (4) Babiller: Hammurabi, mimari, İştar Kapısı/Asma Bahçeler, (5) Asurlar: Kültepe ticareti, yazının Anadolu'ya taşınması, Ninova Kütüphanesi, (6) ortak miras ve CTA.
- Konuşmacı sırası: Filiz açılış/havzalar ve Sümerler; İbrahim coğrafya-zaman, Babiller ve Asurlar; Filiz ortak miras özeti; kapanış CTA'sında ikisi birlikte. Her ders sahnesinde yalnız aktif konuşmacının sprite ağzı gerçek sesle eşleşir; Filiz frame 0'da görünür.
- 00:30–00:35 arasında kanal kartı; son bölümde yerleşik CTA bileşeni.

### Kurz/Lumi

- Ana videonun gerçek süresinin %50–%70'i, 1280×720.
- Doygun renk blokları üzerinde farklı bir görsel metafor: iki nehirden çıkan üç akışın yazı, hukuk ve bilgi/ticarete dönüşmesi.
- Görünür Filiz/İbrahim yok; sesler Filiz→İbrahim dönüşümlü; yalnız tam gövdeli Lumi.

### Short

- 720×1280; konu: “Çivi yazısını Anadolu'ya kim taşıdı?”
- Dört seçenek: Sümerler, Babiller, Asurlar, Lidyalılar. Doğru cevap: Asurlar.
- İbrahim baştan sona görünür; beş saniye işaretsiz seçenek/sayaç, ardından mevcut kart üzerinde cevap açıklaması ve `Tebrikler!`.

## Görsel ve Anlatım Kararları

- Ana video: metin `#101820`, değişim/yeni bilgi turkuaz `#3AD6C5`, tarih/dikkat amber `#FFB454`; 1280×720 güvenli alanda Inter veya mevcut açık lisanslı eşdeğeri.
- Harita, tarih şeridi ve yön okları birbirinden ve metinden ayrı koridorlarda ilerler; ok uçları hedeflerin dış sınırında biter.
- Her ders sahnesinde konuşan karakter tam görünür; Filiz sol, İbrahim sağ güvenli kenardadır. Kapanışta ikisi birlikte görünür.
- Kaynakta açık `Not` etiketi bulunmadığı için ayrı `NOT` çağrısı yoktur. Kaynaktaki soru kutuları, anlatım içi kısa düşünme durakları olarak yeniden yorumlanır.
- “İlk” gibi kesin ifadeler yalnızca kaynak bağlamında ifade edilir; Hammurabi'nin kuralları şiddetsiz, yaş düzeyine uygun bir metin/denge terazisi metaforuyla anlatılır.

## Teknik Kararlar

- Mevcut Remotion/React/TypeScript yapısına, yeni `src/mezopotamya/` composition'ı olarak eklenir ve `src/index.tsx` üzerinden kaydedilir.
- Ses dosyaları Filiz ve İbrahim için Edge TTS, `rate="-2%"` ile oluşturulur. Sahne süreleri ses dosyalarının gerçek sürelerinden ölçülür; sabit tahmin kullanılmaz.
- Çıktılar ana/Kurz için `out/sosyal/mezopotamya/`, Short için `out/shorts/sosyal/mezopotamya_shorts/` altında tutulur. Hashtag dosyası aynı üretim metadatası yanında yer alır.

## Kabul Kontrolleri

- Kaynak sırası ve tüm öğretim noktaları doğrulanır; ana videoda 00:30–00:35 kanal kartı ve kapanış CTA'sı görünür.
- Ana/Kurz 1280×720, Short 720×1280 olarak `ffprobe` ile doğrulanır.
- Frame 0, tüm sahne sınırları, ana hareketler, metinler, karakterler, Short sayaç/reveal/tebrikler durumları tam çözünürlükte ve hareketli önizlemede incelenir.
- Ses akışı ve süreler gerçek ses dosyalarıyla eşleşir; final dosyası bütünlüğü doğrulanır.
