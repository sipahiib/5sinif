# Mezopotamya Ortak Mirası Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Kaynak sayfaları sırayla işleyen, 5. sınıfa uygun ana video, Kurz/Lumi ve Short üretmek.

**Architecture:** Yeni konu `src/mezopotamya/` altında bağımsız bir Remotion composition paketi olur. Konuşma metinleri ve üretilmiş ses süreleri `content/` ve zamanlama JSON'u ile yönetilir; ana, Kurz ve Short aynı konu bileşenlerinin farklı düzenlerini kullanır. `src/index.tsx` üç composition'ı kaydeder.

**Tech Stack:** React, TypeScript, Remotion, Edge TTS, ffmpeg/ffprobe.

**Spec:** `docs/superpowers/specs/2026-11-20-mezopotamya-design.md`

## Global Constraints

- Kaynak fotoğrafları videoda kullanılmaz; sadece içerik kaynağıdır.
- Ana/Kurz finali 1280×720; Short finali 720×1280; 30 fps.
- Filiz ve İbrahim sesleri Edge TTS `rate="-2%"`; zamanlama gerçek ses sürelerinden türetilir.
- Ana video beyaz zemin, kanal kartı 00:30–00:35 ve yerleşik CTA ile biter.
- Kurz'ta yalnız Lumi görünür, sesler Filiz→İbrahim dönüşümlüdür.
- Short'ta İbrahim kesintisiz görünür; dört seçenek, beş saniye sayaç ve doğru cevap Asurlar'dır.
- MP3/MP4 Git'e eklenmez; commit/push öncesinde `npm run check:media` zorunludur.

## Review Focus

- Kaynak sırası: 4244–4248'deki tüm başlık ve öğretim noktaları bir sahneye bağlı olmalı.
- Ses süresi: her bölümün `audioFrames` değeri üretilen sesin gerçek süresinden hesaplanmalı.
- Ana video frame 0: Filiz görünür, ilk anlatım ve ağız hareketi senkron olmalı.
- Harita/tarih şeridi: metin, çizgi ve oklar tüm hareket boyunca güvenli alanda ve çakışmasız kalmalı.
- Short: seçenekler ilk göründüğünde sayaç da görünmeli, beş saniye boyunca işaret bulunmamalı.

### Task 1: Kaynak Metni ve Ses Varlıkları

**Files:**
- Create: `content/mezopotamya.json`
- Create: `public/audio/mezopotamya/*.mp3` (Git dışı)
- Create: `src/mezopotamya/timings.json`

**Interfaces:**
- Produces: Sayfa sırasını, konuşmacıyı, anlatımı ve gerçek ses tabanlı kare sürelerini içeren konu verisi.

- [ ] Kaynak sayfalarındaki başlıkları, tarihleri, açık soru noktalarını ve hiçbir `NOT` çağrısı olmadığını `content/mezopotamya.json` içine sırayla yaz.
- [ ] Filiz ve İbrahim için `rate="-2%"` seslendirmelerini üret; her dosyanın gerçek süresini ölç.
- [ ] Ölçülen ses sürelerinden `src/mezopotamya/timings.json` değerlerini üret; ana, Kurz ve Short sınırlarını yaz.
- [ ] Ses metni ve zamanlama eşleşmesini tekil bir doğrulama betiğiyle kontrol et.

### Task 2: Ortak Görsel Sözlük ve Ana Video

**Files:**
- Create: `src/mezopotamya/Video.tsx`
- Create: `src/mezopotamya/entry.tsx`
- Modify: `src/index.tsx`

**Interfaces:**
- Consumes: `content/mezopotamya.json`, `src/mezopotamya/timings.json`, `GifCharacter`, `ChannelLowerThird`, `CtaOptionOne`.
- Produces: `Mezopotamya` ana video composition'ı ve ana video kare/süre hesaplayıcıları.

- [ ] Kaynak fotoğrafına başvurmayan kod tabanlı nehir-havza, zaman şeridi, ziggurat/tablet/tekerlek, hukuk dengesi, ticaret-kervan ve kütüphane görsellerini yaz.
- [ ] Sayfa sırasını koruyan altı ana sahneyi; konuşmacı, gerçek ses ve hareketli vurgularla yaz.
- [ ] Filiz'in frame 0 görünürlüğünü, kanal kartını ve tam tuval CTA kapanışını ekle.
- [ ] `Mezopotamya` composition'ını `src/index.tsx` içine ekle ve `npm run typecheck` ile doğrula.

### Task 3: Kurz/Lumi ve Short Düzenleri

**Files:**
- Modify: `src/mezopotamya/Video.tsx`
- Modify: `src/mezopotamya/entry.tsx`

**Interfaces:**
- Consumes: aynı konu verisi/zamanlama; `MezopotamyaKurz`, `MezopotamyaShorts` composition sözleşmeleri.
- Produces: 16:9 Kurz ve 9:16 Short composition'ları.

- [ ] Farklı metaforla, doygun renk bloklarında Lumi odaklı Kurz sahnelerini ve Filiz→İbrahim ses sırasını yaz.
- [ ] “Çivi yazısını Anadolu'ya kim taşıdı?” sorusunu dört seçenek, beş saniye sayaç, Asurlar reveal'i ve İbrahim ile Short düzenine yaz.
- [ ] Composition boyutlarını/bitiriş sürelerini ve görünürlük durumlarını typecheck ile doğrula.

### Task 4: Önizleme, Render ve QA

**Files:**
- Create: `out/sosyal/mezopotamya/mezopotamya.mp4` (Git dışı)
- Create: `out/sosyal/mezopotamya/mezopotamya_kurz.mp4` (Git dışı)
- Create: `out/shorts/sosyal/mezopotamya_shorts/mezopotamya_shorts.mp4` (Git dışı)
- Create: `out/sosyal/mezopotamya/mezopotamya_hashtags.md`
- Create: `src/mezopotamya/QA.md`

**Interfaces:**
- Consumes: üç kayıtlı composition ve gerçek ses dosyaları.
- Produces: doğrulanmış nihai medya ve kısa QA kanıtı.

- [ ] Remotion Studio'da üç composition önizlemesini aç; ana video, Kurz ve Short ilk karelerini kontrol et.
- [ ] Hedef çözünürlüklere render al, `ffprobe` ile çözünürlük/süreyi doğrula.
- [ ] Sahne sınırları, kanal kartı, CTA, Kurz güvenli alanı, Short sayaç/reveal/tebrikler karelerini görsel olarak incele; bulunan sorunu düzeltip yeniden render et.
- [ ] Hashtag kümelerini ve QA raporunu yaz; sadece bu üretimin geçici QA/preview dosyalarını temizle.

## Self-Review

- Spec kapsamı dört göreve dağılmıştır: içerik/ses (1), ana video (2), alternatif formatlar (3), render ve teslim QA (4).
- Ana riskler Review Focus altında her birine sahip görevle ilişkilendirilmiştir.
- Tüm dosya, composition ve çıktı yolları tasarım belgesiyle aynıdır.
