"use client";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {ArrowUpRight,Box,MousePointer2,Rotate3D,MousePointerClick, Layers3, Map, RotateCcw} from 'lucide-react';
import {topologyDesigns} from '@/data/labTopologies';
import {topoText,localizedTopology} from '@/data/topologyDescriptions';
import {projectPath,type Locale} from '@/data/content';
import TopologyFallback from './TopologyFallback';
import {enterpriseCase} from '@/data/enterpriseCase';
const Canvas=dynamic(()=>import('./TopologyCanvas'),{ssr:false,loading:()=>null});
const label={
 en:{kicker:'INTERACTIVE NETWORK ATLAS',title:'Infrastructure, explained in 3D.',sub:'Select a reference design. Inspect each device and follow its connections in an interactive 3D network model.',info:'ARCHITECTURE / 3D',instruction:'Drag to orbit · Scroll to zoom · Select a device',open:'Explore the project',roadmap:'TOPOLOGY  /  SECURITY ZONES  /  TRAFFIC FLOWS'},
 fr:{kicker:'ATLAS RÉSEAU INTERACTIF',title:'Explorer les architectures.',sub:'Choisissez une topologie, explorez les connexions 3D et inspectez le rôle de chaque équipement.',info:'ARCHITECTURE / 3D',instruction:'Glissez pour tourner · Molette pour zoomer · Sélectionnez un appareil',open:'Voir le projet',roadmap:'TOPOLOGIE  /  SEGMENTATION  /  FLUX RÉSEAU'},
 ar:{kicker:'أطلس الشبكات التفاعلي',title:'استكشف هندسة الشبكات.',sub:'اختر تصميم شبكة، وحرّك المنظور ثلاثي الأبعاد، ثم تعرف على دور كل جهاز واتصالاته.',info:'تصميم هندسي / 3D',instruction:'اسحب لتدوير النموذج · قرّب بإصبعين · اختر جهازاً',open:'استكشف المشروع',roadmap:'الطوبولوجيا  /  العزل  /  تدفق البيانات'}
};
export default function TopologyStudio({locale,compact=false,project}:{locale:Locale;compact?:boolean;project?:string}){
 const choices=project?topologyDesigns.filter(t=>t.project===project):topologyDesigns;
 const [id,setId]=useState(choices[0]?.id||'enterprise'),[selected,setSelected]=useState('');
 const [activeFlow,setActiveFlow]=useState('branch');
 const [reduce,setReduce]=useState(false),[webgl,setWebgl]=useState(false);
 const [view,setView]=useState<'3d'|'2d'>('3d');
 useEffect(()=>{const m=window.matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduce(m.matches);sync();m.addEventListener('change',sync);
  try{const canvas=document.createElement('canvas');setWebgl(Boolean(canvas.getContext('webgl2')||canvas.getContext('webgl')))}catch{setWebgl(false)}
  // WebGL-capable phones can explore the real 3D scene; users can always switch to 2D.
  return()=>m.removeEventListener('change',sync)},[]);
 useEffect(()=>{setId(choices[0]?.id||'enterprise');setSelected('');setActiveFlow('branch')},[project]);
 const current=choices.find(t=>t.id===id)||choices[0];if(!current)return null;
 const t=label[locale],words=topoText[locale],display=localizedTopology(current,locale);
 const device=current.nodes.find(n=>n.id===selected);
 const linked=current.links.filter(edge=>edge.includes(selected)).map(edge=>current.nodes.find(n=>n.id===(edge[0]===selected?edge[1]:edge[0]))?.label).filter(Boolean);
 const walkthrough=current.id==='enterprise'?enterpriseCase[locale].walkthrough.find(x=>x.id===activeFlow):undefined;
 const flowTitle={en:'Traffic path explorer',fr:'Parcours de trafic',ar:'استعراض مسار البيانات'}[locale];
 return <section className={`topology-studio ${compact?'topology-compact':''}`} id={compact?undefined:'topology'} aria-labelledby={compact?undefined:'topology-title'}>
  <div className="container-xl">
   {!compact&&<div className="topology-intro"><span className="section-number light-number">02 / {t.kicker}</span><div className="heading-row"><h2 id="topology-title">{t.title}</h2><p>{t.sub}</p></div></div>}
   {!compact&&<div className="topology-options" role="group" aria-label="Choose topology">{choices.map((x,i)=><button type="button" className={current.id===x.id?'active':''} key={x.id} onClick={()=>{setId(x.id);setSelected('');setActiveFlow(x.flows?.[0]?.id||'')}} aria-pressed={current.id===x.id}><span>{String(i+1).padStart(2,'0')}</span>{localizedTopology(x,locale).title}</button>)}</div>}
   <div className="topology-screen">
    <div className="topology-head"><span><span className="topology-live-dot"/> ENGINEERING / ARCHITECTURE <Box size={15}/></span><span>{t.info}</span><div className="topology-view-toggle" role="group" aria-label={locale==='ar'?'طريقة العرض':locale==='fr'?'Mode de visualisation':'View mode'}><button type="button" onClick={()=>setView('3d')} aria-pressed={view==='3d'} disabled={!webgl||reduce}><Layers3 size={15}/>{locale==='fr'?'Modèle 3D':locale==='ar'?'نموذج 3D':'3D model'}</button><button type="button" aria-pressed={view==='2d'||!webgl||reduce} onClick={()=>setView('2d')}><Map size={15}/>{locale==='fr'?'Schéma 2D':locale==='ar'?'مخطط 2D':'2D schematic'}</button></div></div>
    <div className="topology-render">
     {webgl&&!reduce&&view==='3d'?<Canvas topology={current} reduced={reduce} selected={selected} onSelected={setSelected} activeFlow={activeFlow}/>:<TopologyFallback topology={current} onSelected={setSelected} activeFlow={activeFlow}/>}
     <div className="topology-scene-note"><Rotate3D size={17}/> {t.instruction}</div>
     <div className="topology-inspect"><MousePointer2 size={14}/>{device?.label||current.protocol}</div>
    </div>
    <div className="topology-screen-foot"><div><small>ARCHITECTURE / {current.nodes.length} NODES</small><h3>{display.title}</h3><p>{display.subtitle}</p></div>{compact?<span className="topology-reference-label">{locale==='fr'?'VUE TECHNIQUE':locale==='ar'?'عرض تقني':'ENGINEERING OVERVIEW'}</span>:<Link href={projectPath(locale,current.project)}>{t.open}<ArrowUpRight size={18}/></Link>}</div>
    {current.flows?.length? <div className="topology-traffic"><div className="topology-flow-title"><span>{flowTitle}</span><small>IP / VPN / POLICY / SERVICES</small></div><div className="topology-flow-choices">{current.flows.map(path=><button key={path.id} type="button" aria-pressed={activeFlow===path.id} className={activeFlow===path.id?"selected":""} onClick={()=>{setActiveFlow(path.id);setSelected(path.nodes[path.nodes.length-1])}}>{enterpriseCase[locale].walkthrough.find(w=>w.id===path.id)?.title||path.id}</button>)}</div>{walkthrough&&<div className="topology-flow-detail"><p>{walkthrough.description}</p><ol>{walkthrough.steps.map((step,i)=><li key={i}>{step}</li>)}</ol></div>}</div>:null}
    <div className="topology-devices" aria-label={words.devices}>
      <div className="topology-device-header"><span><MousePointerClick size={16}/>{words.devices}</span><span>{words.hint}</span></div>
      <div className="topology-device-buttons">{current.nodes.map(n=><button key={n.id} type="button" aria-pressed={selected===n.id} className={selected===n.id?'selected':''} onClick={()=>setSelected(n.id)}>{n.label}</button>)}{selected&&<button type="button" className="topology-clear" onClick={()=>setSelected('')}><RotateCcw size={15}/>{words.clear}</button>}</div>
      <div className="topology-device-details" aria-live="polite"><span>{words.label}</span>{device?<div><strong>{device.label}</strong><p>{words.deviceRoles[device.kind]}</p>{linked.length>0&&<p className="topology-adjacent">{locale==='ar'?'متصل مع: ':locale==='fr'?'Connecté à : ':'Connected to: '}{linked.join(' · ')}</p>}</div>:<p>{words.defaultText}</p>}</div>
    </div>
   </div>
   {!compact&&<div className="topology-method"><span className="topology-method-line"/> {t.roadmap} <span className="topology-method-line"/></div>}
  </div>
 </section>
}
