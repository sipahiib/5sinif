"""Verify final media, full decode, durations and Short timing contracts."""
import hashlib,json,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'src/madde-isik/timeline.json').read_text())
jobs=[('main','out/fen/madde-isik/madde-isik.mp4',1280,720,data['main']['durationInFrames']),('kurz','out/fen/madde-isik/madde-isik_kurz.mp4',1280,720,data['kurz']['durationInFrames']),('short','out/shorts/fen/madde-isik_shorts/madde-isik_shorts.mp4',720,1280,data['shorts'][0]['durationInFrames'])]
report={'fps':30,'files':[]}
for group,file,width,height,frames in jobs:
 path=ROOT/file
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))
 video=next(s for s in probe['streams'] if s['codec_type']=='video')
 audio=next(s for s in probe['streams'] if s['codec_type']=='audio')
 assert (video['width'],video['height'])==(width,height)
 assert video['r_frame_rate']=='30/1' and int(video['nb_frames'])==frames
 assert audio['codec_name']=='aac' and int(audio['sample_rate'])==48000
 duration=float(probe['format']['duration']);assert abs(duration-frames/30)<.15
 subprocess.run(['ffmpeg','-v','error','-i',str(path),'-f','null','-'],check=True)
 report['files'].append({'group':group,'path':file,'width':width,'height':height,'frames':frames,'seconds':duration,'video':video['codec_name'],'audio':audio['codec_name'],'sampleRate':audio['sample_rate'],'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'fullDecode':'PASS'})
ratio=report['files'][1]['seconds']/report['files'][0]['seconds'];assert .5<=ratio<=.7
s=data['shorts'][0];assert s['reveal']-s['qEnd']==150
assert s['answerEnd']==s['reveal']+s['a']['frames'] and len(s['choices'])==4
for group in ['main','kurz']:
 for scene in data[group]['scenes']:
  for part in scene['parts']:
   assert (ROOT/'public'/part['audio']).is_file()
report['kurzMainRatio']=ratio;report['shortCountdownSeconds']=5
(ROOT/'content/madde-isik/final-verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'status':'PASS','durations':[f['seconds'] for f in report['files']],'kurzRatio':ratio},ensure_ascii=False))
