import asyncio
import json
import os

import edge_tts
import mutagen.mp3

VOICE_FILIZ = "tr-TR-EmelNeural"
VOICE_IBRAHIM = "tr-TR-AhmetNeural"

dialogues = [
    ("01", "filiz", "Yaşam kaynağı olan Güneş, Dünya’nın ısı ve ışık kaynağıdır. Mevsimlerin oluşmasında, bitkilerin fotosentez yapmasında, su döngüsünde ve canlılar için uygun sıcaklığın oluşmasında etkilidir.", "ibrahim", "Güneş bunun gibi birçok olayda da rol oynar. Şimdi Güneş’in yapısını ve özelliklerini birlikte inceleyelim."),
    ("02", "ibrahim", "Gaz hâlinde olan, küre biçimindeki Güneş’in enerjisini yapısında bulunan hidrojen atomları sağlar. Güneş katmanlardan oluşur. Merkezinin sıcaklığı yaklaşık 15 milyon derece Celsius, yüzey sıcaklığı yaklaşık 5500 derece Celsius’tur.", "filiz", "Her saniye milyonlarca ton hidrojen atomu helyum atomlarına dönüşür ve Güneş’in enerjisini oluşturur."),
    ("03", "filiz", "Bu enerji sonsuz değildir. Güneş yaklaşık olarak ömrünün yarısını tamamlamış olup kalan ömrünün 4-5 milyar yıl olduğu düşünülmektedir.", "ibrahim", "Güneş’in yüzeyindeki soğuk bölgelere güneş lekesi denir. Güneş lekeleri takip edilerek Güneş’in dönme yönü bulunabilir mi? Bu soruyu düşünelim."),
    ("04", "ibrahim", "Güneş, Dünya’dan yaklaşık 150 milyon kilometre uzaklıktadır. Güneş sistemindeki tek yıldız olan Güneş, orta büyüklükte bir yıldızdır.", "filiz", "Güneş’te patlamalar olmasına rağmen bu patlamaların sesini duyamayız. Bunun nedeni sesin boşlukta yayılmamasıdır."),
    ("05", "filiz", "Güneş, Dünya ile karşılaştırıldığında Dünya’nın kütlesinin 332 000, yüzey alanının 11 900, çekim kuvvetinin 28 katıdır.", "ibrahim", "Güneş’in kendi etrafında dönüş yönü batıdan doğuya, yani saat yönünün tersinedir. Güneş’in yüzeyindeki soğuk bölgelere güneş lekesi denildiğini de unutmayalım."),
    ("06", "ibrahim", "Dünya, Ay’dan daha büyüktür. Dünya’nın çapı Ay’ın çapının yaklaşık 4 katıdır. Güneş’in çapı ise Dünya’nın çapının 109 katıdır.", "filiz", "Güneş, Dünya ve Ay’ı büyüklüklerine göre Güneş, Dünya, Ay şeklinde sıralayabiliriz. Ancak cisimler uzaklaştıkça gerçek boyutlarından daha küçük görünür."),
    ("07", "filiz", "Çok uzaktaki ağaçların yakınımızdaki ağaçlardan daha küçük görünmesi buna örnektir. Uçak yerden yükseldikçe uçağın içindeki yolcuların, evlerin ve taşıtların daha küçük görünmesi de uzaklıkla ilgilidir.", "ibrahim", "Camdan dışarı baktığımızda uzaktaki bir arabayı, yakındaki bir arabadan daha küçük görürüz. Bu örnekler uzaklığın görünüşü etkilediğini gösterir."),
    ("08", "ibrahim", "İnsanlar geçmişten bu yana merakla gökyüzünü inceleyerek Güneş, Dünya ve Ay ile ilgili çeşitli fikirler ortaya atmışlardır. Eskiden bazı insanlar Dünya’nın düz bir tepsi şeklinde olduğuna, bazıları ise öküzün boynunda durduğuna inanıyordu.", "filiz", "Hatta yıldız, Ay ve Güneş gibi gök cisimlerinin gökyüzünde asılı olduğunu düşünenler bile vardı. Teleskobun icadıyla masal ve hikâyelerin yerini gerçek gözlemler almıştır."),
    ("09", "filiz", "Bilim insanları uzay ve gök cisimlerinin gizemini çözmek için gözlemevleri kurmuş, uydular aracılığıyla çekilen fotoğraflarla Güneş, Dünya ve Ay’ın şekil ve büyüklükleri hakkında bilgiler elde etmişlerdir.", "ibrahim", "Dünya, kutuplardan biraz basık, Ekvator bölgesinde ise daha şişkin, küresel bir şekle sahiptir. Bu özel şekle geoit denir. Dünya gibi Güneş ve Ay da küresel şekildedir."),
    ("10", "ibrahim", "Kıyıdan uzaklaşan bir geminin önce gövdesinin, sonra bacasının, daha sonra dumanının gözden kaybolması Dünya’nın küresel şekline kanıttır. Sürekli aynı yükseklikten aynı yöne uçan uçağın ilk kalktığı yere tekrar gelmesi de başka bir kanıttır.", "filiz", "Gök cisimlerinin kökenlerini, fiziksel ve kimyasal yapılarını ve oluşum süreçlerini açıklayan bilim dalına gök bilimi, yani astronomi denir. Bu bilimle ilgilenen bilim insanına gök bilimci, yani astronom denir."),
    ("11", "filiz", "Tebrikler! Güneş’in yaşamımızdaki önemini, enerjisinin nasıl oluştuğunu ve Güneş, Dünya ve Ay’ın özelliklerini öğrendin.", "ibrahim", "Gök bilimi ile astronom arasındaki farkı, gök cisimlerinin şekillerini ve uzaklık algısını artık açıklayabilirsin. Çok iyi çalıştın!"),
]


async def generate():
    output_dir = "public/audio/fen/gunes"
    os.makedirs(output_dir, exist_ok=True)
    timings = {}
    for scene_id, speaker_1, text_1, speaker_2, text_2 in dialogues:
        first_path = os.path.join(output_dir, f"{scene_id}_1.mp3")
        second_path = os.path.join(output_dir, f"{scene_id}_2.mp3")
        first_voice = VOICE_FILIZ if speaker_1 == "filiz" else VOICE_IBRAHIM
        second_voice = VOICE_FILIZ if speaker_2 == "filiz" else VOICE_IBRAHIM
        await edge_tts.Communicate(text_1, first_voice, rate="+0%", pitch="+0Hz").save(first_path)
        await edge_tts.Communicate(text_2, second_voice, rate="+0%", pitch="+0Hz").save(second_path)
        first_duration = mutagen.mp3.MP3(first_path).info.length
        total_duration = first_duration + mutagen.mp3.MP3(second_path).info.length
        timings[scene_id] = {"first_speaker": speaker_1, "split_sec": round(first_duration, 2), "total_sec": round(total_duration, 2)}
        print(f"Scene {scene_id}: {total_duration:.2f}s")
    with open("src/gunes/gunes_timings.json", "w", encoding="utf-8") as file:
        json.dump(timings, file, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    asyncio.run(generate())