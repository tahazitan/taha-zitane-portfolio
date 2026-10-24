"use client";
import {useEffect,useRef,useState,type CSSProperties} from "react";
import dynamic from "next/dynamic";
import {ArrowUpRight,Box,Orbit,Server,ShieldCheck,Activity,Network,MoveUpRight,RotateCcw,ChevronLeft,ChevronRight} from "lucide-react";
import TechnologyMarks from "./TechnologyMarks";
import type {Locale} from "@/data/content";
import type {Focus} from "./NetworkWorld";
const NetworkWorld=dynamic(()=>import("./NetworkWorld"),{ssr:false,loading:()=> <div className="stage-loading" aria-hidden="true"><span/><span/><span/><span/></div>});
const categories=[
 {id:"network" as Focus,icon:Network,tools:["Cisco","Linux","Wireshark"]},
 {id:"security" as Focus,icon:ShieldCheck,tools:["FortiGate","Palo Alto","Snort"]},
 {id:"systems" as Focus,icon:Server,tools:["Windows Server","Proxmox","Docker"]},
 {id:"monitoring" as Focus,icon:Activity,tools:["Wazuh","Zabbix","Wireshark"]}
];
const copy={
 en:{orbitLeft:"Rotate infrastructure left",orbitRight:"Rotate infrastructure right",orbitReset:"Reset 3D view",eyebrow:"A LIVING INFRASTRUCTURE",title:"The systems behind the work.",subtitle:"Explore a three-dimensional infrastructure study: connected switching, security, virtual servers and monitoring. Select a layer to examine its role.",interaction:"MOVE POINTER TO EXPLORE · SELECT A LAYER",fallback:"INTERACTIVE INFRASTRUCTURE MODEL",foot:"Conceptual 3D visualization · not a production deployment",focus:["Network fabric","Security edge","Compute & identity","Observability"],detail:["Traffic paths, connectivity and segmentation provide the foundation for reliable services.","Security policies and encrypted connectivity protect flows between network zones.","Windows/Linux servers, directory services and virtualization carry the workloads.","Logs, monitoring and diagnostics help surface issues and support remediation."],link:"Explore engineering projects",scene:"LIVE SYSTEMS / 3D"},
 fr:{orbitLeft:"Pivoter l’infrastructure à gauche",orbitRight:"Pivoter l’infrastructure à droite",orbitReset:"Réinitialiser la vue 3D",eyebrow:"UNE INFRASTRUCTURE VIVANTE",title:"Les systèmes derrière le travail.",subtitle:"Explorez une infrastructure 3D : commutation, sécurité, serveurs virtuels et supervision. Sélectionnez une couche pour comprendre son rôle.",interaction:"DÉPLACEZ LE POINTEUR · CHOISISSEZ UNE COUCHE",fallback:"MODÈLE D’INFRASTRUCTURE",foot:"Visualisation 3D conceptuelle · pas un déploiement en production",focus:["Réseau & connectivité","Sécurité périmétrique","Systèmes & identité","Supervision"],detail:["Les flux et la segmentation constituent la base d'une infrastructure stable.","Les politiques de sécurité et les liens chiffrés contrôlent les échanges entre zones.","Windows/Linux, annuaire et virtualisation hébergent les services essentiels.","Les journaux, la surveillance et le diagnostic permettent d'identifier les problèmes."],link:"Découvrir les projets techniques",scene:"SYSTÈMES / 3D"},
 ar:{orbitLeft:"تدوير البنية نحو اليسار",orbitRight:"تدوير البنية نحو اليمين",orbitReset:"إعادة ضبط العرض الثلاثي الأبعاد",eyebrow:"بنية تحتية نابضة بالحياة",title:"اكتشف الأنظمة وراء كل مشروع.",subtitle:"استكشف نموذجاً ثلاثي الأبعاد يوضح الترابط بين الشبكات والحماية والخوادم الافتراضية والمراقبة. اختر أحد المجالات لمعرفة دوره.",interaction:"حرّك المؤشر للاستكشاف · اختر مجالاً",fallback:"نموذج تفاعلي للبنية التحتية",foot:"تصور هندسي ثلاثي الأبعاد لأغراض العرض وليس نظاماً إنتاجياً",focus:["الشبكات والاتصال","أمن الشبكات","الأنظمة والهوية","المراقبة والتحليل"],detail:["تشكّل مسارات البيانات وتقسيم الشبكات أساس استقرار الخدمات.","تُساهم السياسات الأمنية والاتصالات المشفرة في حماية حركة البيانات بين المناطق.","تستضيف أنظمة Windows وLinux والافتراضية خدمات المؤسسة.","يساعد جمع السجلات والمراقبة والتشخيص على اكتشاف المشكلات ومعالجتها."],link:"استكشف المشاريع الهندسية",scene:"أنظمة تفاعلية / 3D"}
} as const;
export default function InfrastructureStage({locale}:{locale:Locale}){
 const [active,setActive]=useState<Focus>("network");
 const [enhanced,setEnhanced]=useState(false);
 const [orbitAngle,setOrbitAngle]=useState(0);
 const orbitRef=useRef(0);
 const touchX=useRef<number|null>(null);
 orbitRef.current=orbitAngle;
 const rotate=(delta:number)=>setOrbitAngle(prev=>Math.max(-.95,Math.min(.95,prev+delta)));
 const [inViewport,setInViewport]=useState(false);
 const sectionRef=useRef<HTMLElement>(null);
 useEffect(()=>{
  const section=sectionRef.current;
  if(!section)return;
  if(!("IntersectionObserver" in window)){setInViewport(true);return;}
  const observer=new IntersectionObserver(entries=>setInViewport(entries.some(entry=>entry.isIntersecting)),{rootMargin:"250px",threshold:0});
  observer.observe(section);
  return()=>observer.disconnect();
 },[]);
 const t=copy[locale];const selected=categories.findIndex(x=>x.id===active);
 useEffect(()=>{
  let active=true;
  const test=()=>{
   // Mobile gets the exact same Three.js scene. WebGL capability—not screen width—decides the fallback.
   const supported=typeof window.WebGLRenderingContext!=="undefined";
   if(!supported){if(active)setEnhanced(false);return;}
   try{const c=document.createElement("canvas");const gl=c.getContext("webgl2",{powerPreference:"low-power"})||c.getContext("webgl",{powerPreference:"low-power"});if(active)setEnhanced(Boolean(gl));}
   catch{if(active)setEnhanced(false);}
  };
  test();window.addEventListener("resize",test,{passive:true});
  return()=>{active=false;window.removeEventListener("resize",test);};
 },[]);
 return <section ref={sectionRef} className="immersive-section" id="infrastructure" aria-labelledby="immersive-title" dir={locale==="ar"?"rtl":"ltr"}>
  <div className="container-xl">
   <div className="immersive-heading">
    <div><span className="immersive-eyebrow"><span className="immersive-pulse"/>{t.eyebrow} / 002</span><h2 id="immersive-title">{t.title}</h2></div>
    <p>{t.subtitle}</p>
   </div>
   <div className="immersive-interface">
    <div className="immersive-visual" aria-label={t.fallback} data-orbit-angle={orbitAngle.toFixed(2)}
     onTouchStart={event=>{if(event.touches.length===1)touchX.current=event.touches[0].clientX;}}
     onTouchMove={event=>{if(touchX.current===null||event.touches.length!==1)return;const x=event.touches[0].clientX;const delta=x-touchX.current;if(Math.abs(delta)>3){rotate(delta*.005);touchX.current=x;}}}
     onTouchEnd={()=>{touchX.current=null;}} onTouchCancel={()=>{touchX.current=null;}}>
     <div className="immersive-stage-top"><span><Orbit size={15}/>{t.scene}</span><span>SYS / 01—04</span></div>
     {enhanced&&inViewport?<NetworkWorld active={active} orbit={orbitRef}/>:<div className="stage-blueprint" aria-label={t.fallback} role="img">
      <div className="blueprint-glow"/>
      <span className="blueprint-label blueprint-label--n">LAN / VLAN</span>
      <span className="blueprint-label blueprint-label--s">FIREWALL / VPN</span>
      <div className="blueprint-rack" style={{"--mobile-orbit":orbitAngle*18+"deg"} as CSSProperties}><div className="blueprint-rack-top"/>{categories.map((cat,i)=><div key={cat.id} className={"blueprint-unit "+(cat.id===active?"is-lit":"")}><span className="unit-slots">{Array.from({length:8},(_,k)=><i key={k}/>)}</span><span className="unit-led"/></div>)}</div>
      <span className="blueprint-label blueprint-label--c">AD / LINUX / VM</span>
      <span className="blueprint-label blueprint-label--o">LOG / SIEM</span>
      <div className="blueprint-trace blueprint-trace--a"/><div className="blueprint-trace blueprint-trace--b"/>
     </div>}
     <div className="immersive-orbit-controls" role="group" aria-label={t.fallback}>
      <button type="button" aria-label={t.orbitLeft} title={t.orbitLeft} onClick={()=>rotate(-.25)}><ChevronLeft size={21}/></button>
      <button type="button" aria-label={t.orbitReset} title={t.orbitReset} onClick={()=>setOrbitAngle(0)}><RotateCcw size={17}/></button>
      <button type="button" aria-label={t.orbitRight} title={t.orbitRight} onClick={()=>rotate(.25)}><ChevronRight size={21}/></button>
     </div>
     <div className="immersive-stage-foot"><span><Box size={15}/>{t.foot}</span><span className="stage-interaction">{t.interaction}</span></div>
    </div>
    <div className="immersive-panel">
     <div className="immersive-panel-title"><span>ARCHITECTURE / LAYERS</span><MoveUpRight size={19}/></div>
     <div className="layer-controls" role="group" aria-label={t.fallback}>
      {categories.map((cat,i)=>{const Icon=cat.icon;return <button className={"layer-button "+(active===cat.id?"is-selected":"")} type="button" aria-pressed={active===cat.id} onClick={()=>setActive(cat.id)} key={cat.id}>
       <span className="layer-icon"><Icon size={22}/></span><span className="layer-text"><small>0{i+1} / 04</small><strong>{t.focus[i]}</strong></span><ArrowUpRight size={18}/></button>})}
     </div>
     <div className="layer-information" aria-live="polite"><span className="layer-number">0{selected+1} / SELECTED LAYER</span><p>{t.detail[selected]}</p><TechnologyMarks technologies={categories[selected].tools} limit={3} variant="inline"/></div>
     <a className="immersive-project-link" href={locale==="en"?"/projects/":"/"+locale+"/projects/"}>{t.link}<ArrowUpRight size={19}/></a>
    </div>
   </div>
  </div>
 </section>;
}