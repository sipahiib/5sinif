# Ana Video Tasarım Kuralları

Bu belge ana videoların görsel dilini tanımlar; `docs/agent-rules/COMMON.md` ve `docs/agent-rules/MAIN_VIDEO.md` içindeki zorunlu üretim kuralları geçerliliğini korur. Çakışma durumunda bu iki belgedeki zorunlu kurallar önceliklidir. Kullanıcının açık talimatı tüm bu belgelerin üzerindedir.

## Sanat yönetimi ve tersine mühendislik

Profesyonel teknoloji sunumlarının görsel hiyerarşi, boşluk, nesne sürekliliği ve hareket ritmini inceleyip özgün sahnelere uygula. Ücretli şablon veya özel ürün tasarımını birebir kopyalama. 

Google Labs DESIGN.md yaklaşımından renk, tipografi ve bileşen kurallarını tek belgede tanımlama fikri; IBM Carbon'dan işlevsel ve vurgulu hareket ayrımı alınmıştır. Bunlar arayüz kaynaklarıdır; aşağıdaki video ölçüleri ve süreleri bu projeye özel tasarım kararlarıdır.

## Görsel sistem

- Tuval: 1280×720, 16:9, 30 fps. YouTube ve Instagram için tek ortak MP4.
- Arka plan: kullanıcının kalıcı tercihi gereği bütün ana video sahnelerinde, ara sahnelerde ve kapanışta düz beyaz (#FFFFFF) kullan. Koyu, siyah veya renkli tam ekran arka plan ve açık/koyu tema dönüşümü kullanma. Mevcut bileşenleri kullanırken de bu tercihi koru.
- Renkler: mürekkep #101820 (metin), beyaz #FFFFFF (arka plan), turkuaz #3AD6C5 ve amber #FFB454 (içerik vurguları). Turkuaz değişim/yeni, amber dikkat/tarih için; renk tek başına anlam taşımasın.
- Tipografi: ücretsiz ve lisansı kaydedilmiş Inter veya eşdeğer açık lisanslı sans; tarihlerde monospace. 1280×720 tuval için başlangıç aralıkları: başlık 54–70 px, destek metni 28–36 px; kaynak etiketi en az 28 px. Boyutları içerik ve karakter yerleşimine göre belirle; final 1280×720 çıktıda ve küçük ekran görünümünde okunabilirliği doğrula.
- Güvenli alan: 1280×720 tuvalde yatay en az 64 px, dikey en az 48 px. Metinleri, karakter gövdelerini, gölgelerini ve temel öğretim içeriğini bu sınırlar içinde tut. Farklı mantıksal tuval kullanan mevcut composition'larda ölçüleri orantılı uygula; final teslim çözünürlüğü 1280×720 kalır.
- Kompozisyon: beyaz arka planı koruyarak konuya uygun gerçek görüntü alanları, büyük nesne yakın planları, özgün diyagramlar ve editoryal ara sahneler arasında çeşitlilik sağla. Gerçek görüntüyü beyaz tuvalin tamamını kaplayan bir arka plan olarak kullanma.
- Gerçek görüntü kullanıldığında da her ders sahnesinde konuşan karakter tam ve görünür kalır; karakter ve temel öğretim içeriği birbirini kapatmaz. Kaynak sayfa fotoğraflarını videoya gömme; bunları özgün, kod tabanlı diyagram ve animasyonlarla yeniden anlat.

## Ana kareler ve tasarım incelemesi

Designer incelemesi: odak ilk bakışta belli mi, görüntü anlatımı destekliyor mu, geçişin anlamı var mı? Başarısız ölçüt düzeltilmeden tam rendera geçilmesin.

## İncelenen tasarım kaynakları

- https://github.com/google-labs-code/design.md/blob/main/docs/spec.md — tasarım sistemini kalıcı metin belgesinde tanımlama.
- https://carbondesignsystem.com/elements/motion/overview/ — işlevsel/vurgulu hareket ve tutarlılık.
