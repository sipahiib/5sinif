import React from 'react';
import {useCurrentFrame,interpolate,Easing} from 'remotion';
const P={ink:'#101820',blue:'#1178E8',cyan:'#00CDB8',yellow:'#FFC400',orange:'#FF6B00',purple:'#7429E8',red:'#EF386D',green:'#36CC55'};
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const,easing:Easing.inOut(Easing.cubic)};
// The tip is exactly (x2,y2). The shaft terminates inside the solid triangle.
export const Ray:React.FC<{x1:number;y1:number;x2:number;y2:number;color?:string;progress?:number}>=({x1,y1,x2,y2,color=P.ink,progress=1})=>{
 const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy);if(len<1||progress<=0)return null;
 const ux=dx/len,uy=dy/len,travel=len*progress,ex=x1+dx*progress,ey=y1+dy*progress,h=Math.min(22,travel*.5),w=h*.45;
 const bx=ex-ux*h,by=ey-uy*h;
 return <g><line x1={x1} y1={y1} x2={bx+ux*3} y2={by+uy*3} stroke={color} strokeWidth="6" strokeLinecap="butt"/><polygon points={`${ex},${ey} ${bx-uy*w},${by+ux*w} ${bx+uy*w},${by-ux*w}`} fill={color}/></g>;
};
const Bulb:React.FC<{x:number;y:number;scale?:number}>=({x,y,scale=1})=><g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M-28 20C-85-40-45-105 0-105S85-40 28 20Z" fill={P.yellow}/><path d="M-18-20L0 2 18-20M0 2V35" stroke={P.orange} strokeWidth="6" fill="none"/><rect x="-28" y="20" width="56" height="45" rx="8" fill={P.blue}/><path d="M-25 35H25M-25 49H25" stroke={P.cyan} strokeWidth="5"/></g>;
const Eye=({x,y}:{x:number;y:number})=><g transform={`translate(${x} ${y})`}><path d="M-30 0Q0-35 30 0Q0 35-30 0" fill="white" stroke={P.blue} strokeWidth="5"/><circle r="12" fill={P.ink}/></g>;
const Torch=({x,y}:{x:number;y:number})=><g transform={`translate(${x} ${y})`}><rect x="-65" y="-18" width="95" height="36" rx="10" fill={P.blue}/><path d="M30-18L55-30V30L30 18Z" fill={P.cyan}/><path d="M55-29V29" stroke={P.yellow} strokeWidth="8"/></g>;
const Icon:React.FC<{kind:string;x:number;y:number}>=({kind,x,y})=><g transform={`translate(${x} ${y})`}>{kind==='sun'?<><circle r="40" fill={P.orange}/>{Array.from({length:8}).map((_,i)=><path key={i} d="M0-53V-67" stroke={P.yellow} strokeWidth="8" transform={`rotate(${i*45})`}/>)}</>:kind==='star'?<path d="M0-57L14-18 54-18 23 7 34 47 0 23-34 47-23 7-54-18-14-18Z" fill={P.yellow}/>:kind==='bolt'?<path d="M8-64L-40 8H-3L-15 65 42-15H6L30-64Z" fill={P.yellow}/>:kind==='bug'?<><ellipse ry="42" rx="24" fill={P.green}/><circle cy="-44" r="17" fill={P.purple}/><ellipse cy="24" ry="17" rx="24" fill={P.yellow}/><path d="M-20-13L-42-28M20-13L42-28M-20 12L-42 28M20 12L42 28" stroke={P.cyan} strokeWidth="8"/></>:kind==='candle'?<><rect x="-24" y="-10" width="48" height="80" rx="8" fill={P.red}/><path d="M0-70Q45-20 0-13Q-35-20 0-70" fill={P.orange}/><path d="M0-47Q20-20 0-16Q-15-20 0-47" fill={P.yellow}/></>:kind==='torch'?<Torch x={0} y={0}/>:kind==='flame'?<><rect x="-10" y="-8" width="20" height="78" fill={P.purple}/><path d="M0-78Q65-2 0 10Q-55-8 0-78" fill={P.orange}/></>:<Bulb x={0} y={0} scale={.65}/>}</g>;
export const LightVisual:React.FC<{kind:string;phase?:number;variant?:boolean;revealed?:boolean}>=({kind,phase=0,variant=false,revealed=false})=>{
 const f=useCurrentFrame(),t=interpolate(f,[0,100],[0,1],clamp),ink=variant?'#FFFFFF':P.ink;
 const svg={width:'100%',height:'100%',viewBox:'0 0 900 300'};
 if(['sources','natural','artificial'].includes(kind)){
 const icons=kind==='natural'?['sun','star','bolt','bug']:kind==='artificial'?['candle','torch','flame','bulb']:variant?['star','bug','candle','bulb']:phase===0?['sun','bulb']:['flame','candle','bulb'];
 const labels:Record<string,string>={sun:'Güneş',star:'Yıldız',bolt:'Şimşek',bug:'Ateş böceği',candle:'Mum',torch:'El feneri',flame:'Meşale',bulb:'Ampul'};
 return <svg {...svg}>{icons.map((k,i)=>{const x=100+(i+.5)*(700/icons.length);return <g key={k} opacity={interpolate(f,[i*15,i*15+25],[.35,1],clamp)}><Icon kind={k} x={x} y={variant?128+Math.sin(f/30+i)*5:135}/><text x={x} y="266" textAnchor="middle" fontSize="29" fontWeight="750" fill={ink}>{labels[k]}</text></g>})}</svg>;
 }
 if(kind==='ray')return <svg {...svg}><Bulb x={145} y={175} scale={.8}/><Ray x1={210} y1={135} x2={775} y2={135} color={variant?P.yellow:P.ink} progress={interpolate(f,[0,90],[.12,1],clamp)}/><text x="145" y="276" textAnchor="middle" fill={ink} fontSize="30" fontWeight="750">KAYNAK</text><text x="620" y="276" textAnchor="middle" fill={ink} fontSize="30" fontWeight="750">YAYILMA YÖNÜ</text></svg>;
 if(['bundle','radial','straight'].includes(kind)){
 if(kind==='straight'&&phase===1)return <svg {...svg}><Torch x={150} y={155}/>{[-50,0,50].map((dy,i)=><Ray key={i} x1={220} y1={155} x2={685} y2={155+dy} color={P.orange} progress={t}/>) }<rect x="710" y="64" width="45" height="186" rx="10" fill={P.purple}/><text x="735" y="289" textAnchor="middle" fill={ink} fontSize="27">CİSİM</text></svg>;
 const cx=450,cy=variant?170:182,angles=[-165,-135,-105,-75,-45,-15];
 return <svg {...svg}><Bulb x={cx} y={cy+30} scale={.65}/>{angles.map((a,i)=>{const rad=a*Math.PI/180;return <Ray key={a} x1={cx+Math.cos(rad)*85} y1={cy+Math.sin(rad)*85} x2={cx+Math.cos(rad)*250} y2={cy+Math.sin(rad)*170} color={variant?[P.yellow,P.cyan,P.orange][i%3]:P.orange} progress={interpolate(f,[i*12,70+i*12],[.15,1],clamp)}/>})}</svg>;
 }
 if(kind==='barrier')return <svg {...svg}><rect x="235" y="16" width="465" height="266" rx="8" fill={variant?'#142A72':'#FFF4C0'} stroke={P.blue} strokeWidth="6"/><rect x="240" y="184" width="455" height="93" fill={variant?'#09152C':'#E1E8EE'}/><Bulb x={467} y={105} scale={.45}/>{[-1,0,1].map((v,i)=><Ray key={v} x1={467+v*30} y1={117} x2={467+v*130} y2={160} color={variant?P.yellow:P.orange} progress={t}/>)}<rect x="235" y="178" width="465" height="12" fill={P.purple}/><text x="760" y="186" fill={ink} fontSize="27">Karton</text><text x="467" y="247" fill={ink} fontSize="28" textAnchor="middle">Doğrudan ışık almaz</text></svg>;
 if(['tube','shorttube'].includes(kind))return <svg {...svg}>
 <path d="M230 68H735" stroke={P.blue} strokeWidth="66" strokeLinecap="butt"/><path d="M230 68H735" stroke={variant?'#182448':'#EAF5FF'} strokeWidth="43"/>
 <path d="M230 235H470V165H735" fill="none" stroke={P.purple} strokeWidth="66" strokeLinejoin="round"/><path d="M230 235H470V165H735" fill="none" stroke={variant?'#182448':'#F4ECFF'} strokeWidth="43" strokeLinejoin="round"/>
 <Torch x={125} y={68}/><Torch x={125} y={235}/><Eye x={802} y={68}/><Eye x={802} y={165}/>
 {(kind!=='shorttube'||revealed)&&<><Ray x1={230} y1={68} x2={750} y2={68} color={P.orange} progress={t}/><Ray x1={230} y1={235} x2={478} y2={235} color={P.orange} progress={t}/></>}
 <text x="802" y="119" textAnchor="middle" fill={ink} fontSize="25">Yiğit</text><text x="802" y="223" textAnchor="middle" fill={ink} fontSize="25">Irmak</text>
 </svg>;
 return <svg {...svg}><Icon kind="sun" x={155} y={142}/><circle cx="765" cy="142" r="60" fill={P.blue}/><path d="M745 92l35 25-25 30 32 22-22 31-32-12-19-49Z" fill={P.green}/><Ray x1={238} y1={142} x2={675} y2={142} color={variant?P.yellow:P.orange} progress={interpolate(f,[0,140],[.08,1],clamp)}/><text x="450" y="275" fill={ink} textAnchor="middle" fontSize="34" fontWeight="800">≈ 300.000 km/s • BOŞLUK</text></svg>;
};
// Same full-body antenna/head/body/limb design used by the project's Lumi.
export const Lumi:React.FC<{x:number;y:number;flip?:boolean}>=({x,y,flip=false})=>{const f=useCurrentFrame();return <svg width="168" height="252" viewBox="0 0 240 360" style={{position:'absolute',left:x,top:y+Math.sin(f/22)*3,transform:`scaleX(${flip?-1:1})`}}><path d="M120 42V12" stroke={P.cyan} strokeWidth="11" strokeLinecap="round"/><circle cx="120" cy="15" r="14" fill={P.yellow}/><rect x="35" y="50" width="170" height="138" rx="54" fill={P.cyan} stroke={P.yellow} strokeWidth="10"/><rect x="62" y="88" width="116" height="62" rx="23" fill={P.purple}/><ellipse cx="94" cy="118" rx="14" ry={f%97<5?3:14} fill={P.yellow}/><ellipse cx="147" cy="118" rx="14" ry={f%97<5?3:14} fill={P.yellow}/><rect x="70" y="202" width="100" height="105" rx="35" fill={P.purple} stroke={P.cyan} strokeWidth="9"/><path d="M67 222L22 266M173 222l45 44M91 302l-13 42m71-42 13 42" stroke={P.cyan} strokeWidth="22" strokeLinecap="round"/><circle cx="22" cy="266" r="18" fill={P.yellow}/><circle cx="218" cy="266" r="18" fill={P.yellow}/></svg>;};

export const ConceptVisual=LightVisual;
