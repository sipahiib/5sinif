# Proje Ajan Talimatları

Bu dosya kısa bir yönlendiricidir. Görevle ilgisiz standart dosyalarını okuma.

## Göreve göre okunacak kurallar

1. Her video üretimi veya video değişikliğinde önce `docs/agent-rules/COMMON.md` dosyasını oku.
2. Ana video için ayrıca `docs/agent-rules/MAIN_VIDEO.md` dosyasını oku.
3. Kurz/Lumi için ayrıca `docs/agent-rules/KURZ_LUMI.md` dosyasını oku.
4. Shorts veya Reels için ayrıca `docs/agent-rules/SHORTS.md` dosyasını oku.
5. Yeni bir ana video istenirse, kullanıcı aksini söylemedikçe ana video + Kurz/Lumi + en az bir Short üretileceğinden dört dosyanın tamamını oku.
6. Yalnızca dokümantasyon, altyapı veya video dışı kod değişikliğinde sadece görevle doğrudan ilgili dosyaları incele; video standartlarını gereksiz yere yükleme.

## Üretim ölçeği ve ajan kullanımı

- Küçük metin, konum, ok, zamanlama veya tek animasyon düzeltmesini ana ajan yapar. Riskliyse en fazla bir dar kapsamlı bağımsız QA ajanı kullanılır.
- Yeni konu veya önemli revizyonda varsayılan ekip: bir içerik uzmanı, üretici/entegratör olarak ana ajan ve bir birleşik eğitim doğruluğu + görsel/platform QA uzmanıdır.
- Yalnızca yeni bir görsel dil veya karmaşık Lumi animasyonu gerekiyorsa ayrı yaratıcı uzman; önemli altyapı ya da yeniden kullanılabilir şablon işi varsa ayrı uygulama uzmanı eklenir.
- Alt ajanlara uzun konuşma geçmişi değil; kaynak yolları, sahip olunan dosyalar, çıktı, kısıtlar ve kabul kontrollerinden oluşan kısa görev verilir.
- Uzman raporları kısa olmalıdır: `PASS` veya `RED`, dosya/zaman kodu, kanıt ve gerekli düzeltme.
- Aynı dosyada eşzamanlı düzenleme yapılmaz. Entegrasyon, ses üretimi, render, temizlik ve son kalite onayı ana ajana aittir.
- Üretici dışında biri içerik ve görselleri incelemelidir. Küçük düzeltmeden sonra yalnızca değişen sahneler ve sınırları bağımsız yeniden kontrol edilir; ana ajan final çıktının tamamını yine doğrular.

## Değişmez sınırlar

- YouTube, Instagram veya başka bir platforma yükleme/yayınlama yalnızca kullanıcının ayrıca açık talimatıyla yapılır.
- Kullanıcı açıkça istemedikçe mevcut çalışan üretim dosyaları veya teslimatlar silinmez.
- MP3 ve MP4 dosyaları Git'e commit veya push edilmez.
- Kullanıcının açık isteği, bu belgelerdeki varsayılan üretim paketinden ve yaratıcı tercihlerden üstündür.
