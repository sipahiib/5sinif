# Madde ve Işık — üretim kontrolü

21 Ekim 2026. Kaynak IMG_4181–4184, kitap sayfaları 113–116. İçerik uzmanı kaynakları görsel olarak inceledi; kapsam haritası SOURCE_MAP.md içindedir. Sayfa sırası, bütün önemli noktalar ve X ışınları NOT'u ana videoda kapsanır. Kaynak fotoğrafları finalde kullanılmaz.

## Görsel inceleme

Hedef çözünürlükte gerçek render kareleri ana ajan ve bağımsız eğitim/görsel/platform QA uzmanı tarafından incelendi. Frame 0, sahne/konuşma sınırları, karakterler, NOT, kanal kartı, CTA, gölge geometrisi ve Short etkileşim durumları kontrol edildi. Bağımsız kayıt: QA-independent.md.

Bulunan kare gölgesi kırpılması SVG/CSS dönüşüm merkezleri ayrıştırılarak düzeltildi. Diyagram etiketlerinin perde altındaki boşluğu artırıldı. Yeniden render edilen sahneler ve sınırlar bağımsız olarak tekrar kontrol edildi.

Remotion Studio'nun gerçek oynatımı Chrome üzerinden kontrol edildi: ana giriş ve karakter animasyonu, saydam madde sahnesi geçişi ve kaynak yaklaşması; Kurz giriş/Lumi ve son sahnenin kaynak–cisim hareketleri; Short soru/yanıt akışı. Oynatma yaklaşık 30 fps idi. Bu, temsilî hareketli bölüm incelemesidir; videoların her karesini gözle tek tek izleme iddiası değildir.

Hareketli incelemede Kurz son sahnesindeki kaynak başlangıca dönüşü ani bulundu. Kaynak dönüşü gerçek sözcük zamanlarına bağlı easing ile yumuşatıldı, ayrı “Yeni deneme” etiketi eklendi. Yalnız Kurz yeniden render edildi. Sekiz ara kare ve hareketli geçiş tekrar kontrol edildi; bağımsız yeniden inceleme PASS.

Final MP4'lerden ayrıca kareler çıkarılıp tam çözünürlükte incelendi: ana frame0, NOT, düzeltilen kare gölgesi ve CTA; Kurz kaynak dönüşü ve son kare; Short reveal ve Tebrikler. Önemli açık görsel kusur bulunmadı.

## Ses ve süre

Edge TTS EmelNeural/AhmetNeural, bütün sesler -2%. Gerçek MP3 süreleriyle 30 fps zaman çizelgesi. Yeni seslerde WordBoundary zamanları; ana uzaklık ve Kurz olaylarının ilgili sözcüklere bağlanması. TTS boş yanıtlarına sınırlı, artan beklemeli yeniden deneme ve atomik ses dosyası kaydı.

- Ana: 460,885 sn; 1280×720, H.264/AAC.
- Kurz: 254,592 sn; 1280×720, H.264/AAC. Ana süreye oran %55,24.
- Short: 28,117 sn; 720×1280, H.264/AAC.

Short: soru sonu frame281, seçenekler+sayaç aynı kare; düşünme 150 kare/tam5sn; reveal431; cevap sonu797; Tebrikler45kare; toplam842kare. Dört seçenek korunur, B yalnız reveal ile işaretlenir. İbrahim kesintisiz görünür.

## Teknik doğrulama

TypeScript kontrolü PASS. Üç final dosyanın tamamı ffmpeg ile hatasız çözüldü. ffprobe çözünürlük,30fps,kare sayısı,süre ve AAC48kHz ses akışlarını doğruladı. SHA-256, dosya boyutu ve süreler final-verification.json içindedir. Yeniden kontrol: `python3 scripts/verify-madde-isik.py`.

Bu üretime ait geçici QA kare klasörleri final doğrulamasından sonra temizlenir. Yeniden üretim betikleri, anlatım, gerçek zaman çizelgesi, kaynak kapsamı ve hashtag dosyası korunur.
