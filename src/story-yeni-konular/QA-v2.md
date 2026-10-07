# Yeni konular Story — v2

- Çıktı: `out/promos/yeni-konular-story/yeni-konular_story_v2.mp4`
- Kullanıcı değişiklikleri: seslendirmeyi kaldır, her sayfaya 2 saniye ekle, YouTube kapanış kartını kırmızı yap
- Önceki teslim edilen MP4 korundu; v2 ayrı dosyaya kaydedildi
- Altı sahnenin her biri önceki süresine göre tam 60 frame uzatıldı
- Toplam: 807 frame / 26,9 saniye görüntü; 720 × 1280, 30 fps
- Seslendirme katmanları devre dışı; tek ses kaynağı özgün müzik
- Müzik tam yeni süreye göre üretildi; geçiş vurguları yeni sınırlara hizalandı
- Kapanış YouTube simgesi, KUTUSU yazısı ve abonelik kartı kırmızı #E62117
- TypeScript kontrolü geçti
- Ana ajan tam çözünürlük temsilî kareleri ve başlangıç/final karelerini inceledi
- Bağımsız değişiklik ve sahne sınırı QA: PASS; boş kare, taşma veya çakışma yok
- Oynatıcı erişimi önceki kontrolde kapalıydı; gerçek zamanlı oynatarak izleme tamamlanamadı
- Final tam FFmpeg decode kontrolü hatasız; H.264 görüntü ve AAC müzik akışı doğrulandı
- Final MP4 son ekranı ayrıca incelendi
- Kullanıcı incelemesi için hazır; yayın yapılmadı
