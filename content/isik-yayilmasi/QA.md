# Işığın yayılması — kalite kaydı

Üretim: 2026-10-05. Kaynak IMG_4177–4180, kitap sayfa109–112. Dört sayfa ana videoda sırayla işlendi; içerik uzmanı kapsam/eğitim doğruluğu PASS. Açık NOT yok; EK BİLGİ boşlukta yayılma/hız sahnesinde görünür. Kaynak fotoğrafları gömülmedi.

## Görsel kontrol

Ana 43, Kurz22, Short15 temsilî tam çözünürlük render karesi incelendi. Frame0, sahne/konuşma sınırları, giriş/çıkış, kanal kartı, CTA, soru/seçenek/sayaç/reveal/tebrikler kontrol edildi. Bağımsız QA: ana ve Short yerleşimleri PASS. Kurz ana diyagram sarmalından ayrılıp altı özgün sahne olarak yeniden kuruldu. Metin/koni/boru temasları ve üst-alt karton düzeni düzeltildi. Değişen kareler bağımsız yeniden kontrol edildi.

Dolu üçgen ok ucu tam hedef koordinatında; çizgi üçgenin içine bağlanır. Yön vektörüyle hesaplanan ok başı kaynaklardan dışarı yönelir. Opak engel içinden devam eden ışın yok. Tek seferlik çizim, periyodik ani ok sıfırlamasını kaldırır.

Hareketli oynatma bilgisayar erişimi olmadan yapılmadı. Kullanıcının önceki “izin veremiyorum, bu şekilde devam et” talimatı doğrultusunda gerçek render kareleri ve geometrik hareket sınırlarıyla devam edildi; hareketli izleme yapılmış sayılmıyor.

## Zaman ve ses

Ana 370.00 sn; Kurz 192.83 sn; oran %52.12. Short 26.93 sn. Gerçek MP3 süreleri üzerinden30fps. Filiz/EmelNeural ve İbrahim/AhmetNeural EdgeTTS -2%.

Ana+Kurz1280×720, Short720×1280. Ana/Short beyaz, Kurz sahneye göre doygun renkli zemin.

## Final dosya doğrulaması

**PASS**: üç MP4 tam ffmpeg decode kontrolünden hatasız geçti. ffprobe çözünürlükler/30fps/H.264/AAC48kHz/süreleri doğruladı; Kurz oranı %52,13. Ana, Kurz ve Short final MP4lerinden kare çıkarılarak incelendi. Oklar bağlı, metinler okunur, karakterler tam. TypeScript kontrolü geçti. Bağımsız kare/geometri QA PASS; hareketli oynatma sınırı yukarıda kayıtlı.

- `out/fen/isik-yayilmasi/isik-yayilmasi.mp4`: 370.048 sn; SHA-256 `5d54071f3df45bde2245dfe29bc90db10732c3f527dec1f5e6e0d27cd70dd2ce`.
- `out/fen/isik-yayilmasi/isik-yayilmasi_kurz.mp4`: 192.896 sn; SHA-256 `de5887500cb2c091024c879243367721b3d968049cb404ef5dca1a5b65c89738`.
- `out/shorts/fen/isik-yayilmasi_shorts/isik-yayilmasi_shorts.mp4`: 26.987 sn; SHA-256 `e75fb5bfc09cf5b9f48775f3ae0ae28380542ec40c3e9bbb0269c233929bd6ca`.

Bu üretime ait geçici QA kare klasörleri doğrulama ardından temizlendi; yeniden üretim betikleri ve JSON kayıtları korunur.
