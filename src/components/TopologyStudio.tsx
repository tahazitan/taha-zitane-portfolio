"use client";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {ArrowUpRight,Box,MousePointer2,Rotate3D,MousePointerClick} from 'lucide-react';
import {topologyDesigns} from '@/data/labTopologies';
import {topoText,localizedTopology} from '@/data/topologyDescriptions';
import {projectPath,type Locale} from '@/data/content';
import TopologyFallback from './TopologyFallback';
const Canvas=dynamic(()=>import('./TopologyCanvas'),{ssr:false,loading:()=>null});
const label={
 en:{kicker:'THE INTERACTIVE LAB',title:'Explore the architecture.',sub:'Select a reference design. Inspect each device and follow its connections in an interactive 3D network model.',info:'ARCHITECTURE / 3D',instruction:'Move the pointer to orbit · Select a device',open:'Explore the project',roadmap:'DESIGN → BUILD → VERIFY → DOCUMENT'},
 fr:{kicker:'LE LABORATOIRE INTERACTIF',title:'Explorer les architectures.',sub:'Choisissez une topologie, explorez les connexions 3D et inspectez le rôle de chaque équipement.',info:'ARCHITECTURE / 3D',instruction:'Déplacez le pointeur · Sélectionnez un équipement',open:'Voir le projet',roadmap:'CONCEVOIR → DÉPLOYER → TESTER → DOCUMENTER'},
 ar:{kicker:'المختبر التفاعلي',title:'استكشف هندسة الشبكات.',sub:'اختر تصميم شبكة، وحرّك المنظور ثلاثي الأبعاد، ثم تعرف على دور كل جهاز واتصالاته.',info:'تصميم هندسي / 3D',instruction:'حرّك المؤشر لتغيير المنظور · اختر جهازاً',open:'استكشف المشروع',roadmap:'التصميم ← التنفيذ ← الاختبار ← التوثيق'}
};
export default function TopologyStudio({locale,compact=false,project}:{locale:Locale;compact?:boolean;project?:string}){
 const choices=project?topologyDesigns.filter(t=>t.project===project):topologyDesigns;
 const [id,setId]=useState(choices[0]?.id||'multi'),[selected,setSelected]=useState('');
 const [reduce,setReduce]=useState(false),[webgl,setWebgl]=useState(false);
 useEffect(()=>{const m=window.matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduce(m.matches);sync();m.addEventListener('change',sync);
  try{const canvas=document.createElement('canvas');setWebgl(Boolean(canvas.getContext('webgl2')||canvas.getContext('webgl')))}catch{setWebgl(false)}
  return()=>m.removeEventListener('change',sync)},[]);
 useEffect(()=>{setId(choices[0]?.id||'multi');setSelected('')},[project]);
 const current=choices.find(t=>t.id===id)||choices[0];if(!current)return null;
 const t=label[locale],words=topoText[locale],display=localizedTopology(current,locale);
 const device=current.nodes.find(n=>n.id===selected);
 return <section className={`topology-studio ${compact?'topology-compact':''}`} id={compact?undefined:'topology'} aria-labelledby={compact?undefined:'topology-title'}>
  <div className="container-xl">
   {!compact&&<div className="topology-intro"><span className="section-number light-number">02 / {t.kicker}</span><div className="heading-row"><h2 id="topology-title">{t.title}</h2><p>{t.sub}</p></div></div>}
   {!compact&&<div className="topology-options" role="group" aria-label="Choose topology">{choices.map((x,i)=><button type="button" className={current.id===x.id?'active':''} key={x.id} onClick={()=>{setId(x.id);setSelected('')}} aria-pressed={current.id===x.id}><span>{String(i+1).padStart(2,'0')}</span>{localizedTopology(x,locale).title}</button>)}</div>}
   <div className="topology-screen">
    <div className="topology-head"><span><span className="topology-live-dot"/> ENGINEERING / ARCHITECTURE <Box size={15}/></span><span>{t.info}</span></div>
    <div className="topology-render">
     {webgl&&!reduce?<Canvas topology={current} reduced={reduce} selected={selected} onSelected={setSelected}/>:<TopologyFallback topology={current} onSelected={setSelected}/>}
     <div className="topology-scene-note"><Rotate3D size={17}/> {t.instruction}</div>
     <div className="topology-inspect"><MousePointer2 size={14}/>{device?.label||current.protocol}</div>
    </div>
    <div className="topology-screen-foot"><div><small>ARCHITECTURE / {current.nodes.length} NODES</small><h3>{display.title}</h3><p>{display.subtitle}</p></div><Link href={projectPath(locale,current.project)}>{t.open}<ArrowUpRight size={18}/></Link></div>
    <div className="topology-devices" aria-label={words.devices}>
      <div className="topology-device-header"><span><MousePointerClick size={16}/>{words.devices}</span><span>{words.hint}</span></div>
      <div className="topology-device-buttons">{current.nodes.map(n=><button key={n.id} type="button" aria-pressed={selected===n.id} className={selected===n.id?'selected':''} onClick={()=>setSelected(n.id)}>{n.label}</button>)}</div>
      <div className="topology-device-details" aria-live="polite"><span>{words.label}</span>{device?<div><strong>{device.label}</strong><p>{words.deviceRoles[device.kind]}</p></div>:<p>{words.defaultText}</p>}</div>
    </div>
   </div>
   {!compact&&<div className="topology-method"><span className="topology-method-line"/> {t.roadmap} <span className="topology-method-line"/></div>}
  </div>
 </section>
}
