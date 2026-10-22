"use client";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {ArrowUpRight, Box, MousePointer2, Rotate3D} from 'lucide-react';
import {topologyDesigns} from '@/data/labTopologies';
import {projectPath,type Locale} from '@/data/content';
const Canvas=dynamic(()=>import('./TopologyCanvas'),{ssr:false,loading:()=>null});
const label={
 en:{kicker:'THE INTERACTIVE LAB',title:'Explore the architecture.',sub:'Six reference topologies for the engineering projects we will build and document. Select a system, explore the 3D model, and open its engineering brief.',info:'3D REFERENCE DESIGN · NOT A LIVE NETWORK',instruction:'Move the pointer to orbit · Select a node to inspect',open:'Explore the project',roadmap:'DESIGN → BUILD → VERIFY → DOCUMENT'},
 fr:{kicker:'LE LABORATOIRE INTERACTIF',title:'Explorer les architectures.',sub:'Six topologies de référence pour les projets à réaliser et documenter. Choisissez un scénario, explorez son modèle 3D puis son dossier technique.',info:'MODÈLE D’ARCHITECTURE 3D · NON CONNECTÉ À UN RÉSEAU RÉEL',instruction:'Bougez le pointeur pour orienter · Cliquez sur un nœud',open:'Voir le projet',roadmap:'CONCEVOIR → DÉPLOYER → TESTER → DOCUMENTER'},
 ar:{kicker:'المختبر التفاعلي',title:'استكشف هندسة الشبكات.',sub:'ستة تصاميم ثلاثية الأبعاد للمشاريع التي سننفذها ونوثقها عملياً. اختر النظام، استكشف مكوّناته، ثم افتح ملف المشروع.',info:'تصميم معماري ثلاثي الأبعاد · ليس شبكة تشغيل فعلية',instruction:'حرّك المؤشر لتغيير المنظور · اضغط على أي مكوّن',open:'استكشف المشروع',roadmap:'التصميم ← التنفيذ ← الاختبار ← التوثيق'}
};
export default function TopologyStudio({locale,compact=false,project}:{locale:Locale;compact?:boolean;project?:string}){
 const choices=project?topologyDesigns.filter(t=>t.project===project):topologyDesigns;
 const [id,setId]=useState(choices[0]?.id||'multi'),[selected,setSelected]=useState('');
 const [reduce,setReduce]=useState(false),[webgl,setWebgl]=useState(true);
 useEffect(()=>{const m=window.matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduce(m.matches);sync();m.addEventListener('change',sync);try{const canvas=document.createElement('canvas');setWebgl(Boolean(canvas.getContext('webgl2')||canvas.getContext('webgl')))}catch{setWebgl(false)}return()=>m.removeEventListener('change',sync)},[]);
 useEffect(()=>{setId(choices[0]?.id||'multi')},[project]);
 const current=choices.find(t=>t.id===id)||choices[0];if(!current)return null;
 const t=label[locale];
 return <section className={`topology-studio ${compact?'topology-compact':''}`} id={compact?undefined:'topology'} aria-labelledby={compact?undefined:'topology-title'}>
  <div className="container-xl">
   {!compact&&<div className="topology-intro"><span className="section-number light-number">02 / {t.kicker}</span><div className="heading-row"><h2 id="topology-title">{t.title}</h2><p>{t.sub}</p></div></div>}
   {!compact&&<div className="topology-options" role="group" aria-label="Choose topology">{choices.map((x,i)=><button type="button" className={current.id===x.id?'active':''} key={x.id} onClick={()=>{setId(x.id);setSelected('')}} aria-pressed={current.id===x.id}><span>{String(i+1).padStart(2,'0')}</span>{x.title}</button>)}</div>}
   <div className="topology-screen">
    <div className="topology-head"><span><span className="topology-live-dot"/> ENGINEERING / ARCHITECTURE <Box size={15}/></span><span>{t.info}</span></div>
    <div className="topology-render">
     {webgl&&!reduce?<Canvas topology={current} reduced={reduce} onSelected={setSelected}/>:<div className="topology-no-webgl" role="img" aria-label={`${current.title}: ${current.subtitle}`}><span>◈</span><p>{current.nodes.map(n=>n.label).join('  —  ')}</p></div>}
     <div className="topology-scene-note"><Rotate3D size={17}/> {t.instruction}</div>
     <div className="topology-inspect"><MousePointer2 size={14}/>{selected||current.protocol}</div>
    </div>
    <div className="topology-screen-foot"><div><small>ARCHITECTURE / {current.nodes.length} NODES</small><h3>{current.title}</h3><p>{current.subtitle}</p></div><Link href={projectPath(locale,current.project)}>{t.open}<ArrowUpRight size={18}/></Link></div>
   </div>
   {!compact&&<div className="topology-method"><span className="topology-method-line"/> {t.roadmap} <span className="topology-method-line"/></div>}
  </div>
 </section>
}
