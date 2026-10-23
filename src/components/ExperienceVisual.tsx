import {Activity, ArrowRight, BookOpen, ClipboardCheck, Cloud, FileCheck2, HardDrive, Headset, Laptop, Mail, Network, Printer, Router, Server, ShieldCheck, TicketCheck, Users} from "lucide-react";
import type {Locale} from "@/data/content";
import type {ReactNode} from "react";

/** Editorial infrastructure illustrations for the six roles; not vendor screenshots or live telemetry. */
const labels={
 en:{
  freelance:"SYSTEMS · NETWORKS · VPS",vps:"VPS ADMIN",review:"CONFIG REVIEW",support:"REMOTE SUPPORT",connect:"ACCESS",
  hospital:"HEALTHCARE IT",staff:"USERS",app:"ENOVA SANTÉ",lan:"LAN SUPPORT",
  training:"NETWORK TRAINING",lab:"PACKET TRACER",students:"LAB CLIENTS",routing:"ROUTING",switching:"SWITCHING",
  itsm:"SERVICE OPERATIONS",incident:"INCIDENT",triage:"TRIAGE",followup:"FOLLOW-UP",email:"EMAIL SERVICES",
  servers:"SERVER & DIRECTORY",ad:"ACTIVE DIRECTORY",dns:"DNS",files:"FILE SHARES",cisco:"LAN / CISCO",
  commune:"WORKSTATION SUPPORT",workstation:"WORKSTATION",diagnosis:"DIAGNOSIS",printer:"PRINTER"
 },
 fr:{
  freelance:"SYSTÈMES · RÉSEAUX · VPS",vps:"ADMIN VPS",review:"REVUE DE CONFIG.",support:"SUPPORT DISTANT",connect:"ACCÈS",
  hospital:"INFORMATIQUE DE SANTÉ",staff:"UTILISATEURS",app:"ENOVA SANTÉ",lan:"SUPPORT LAN",
  training:"FORMATION RÉSEAUX",lab:"PACKET TRACER",students:"POSTES TP",routing:"ROUTAGE",switching:"COMMUTATION",
  itsm:"EXPLOITATION ITSM",incident:"INCIDENT",triage:"QUALIFICATION",followup:"SUIVI",email:"MESSAGERIE",
  servers:"SERVEURS & ANNUAIRE",ad:"ACTIVE DIRECTORY",dns:"DNS",files:"PARTAGES",cisco:"LAN / CISCO",
  commune:"SUPPORT DES POSTES",workstation:"POSTE DE TRAVAIL",diagnosis:"DIAGNOSTIC",printer:"IMPRIMANTE"
 },
 ar:{
  freelance:"الأنظمة · الشبكات · الخوادم الافتراضية",vps:"إدارة VPS",review:"مراجعة الإعدادات",support:"الدعم عن بُعد",connect:"الوصول",
  hospital:"المعلوماتية الصحية",staff:"المستخدمون",app:"ENOVA SANTÉ",lan:"دعم الشبكة",
  training:"التكوين في الشبكات",lab:"PACKET TRACER",students:"أجهزة التدريب",routing:"التوجيه",switching:"التبديل",
  itsm:"عمليات إدارة الدعم",incident:"حادث",triage:"التصنيف",followup:"المتابعة",email:"خدمات البريد",
  servers:"الخوادم والدليل",ad:"ACTIVE DIRECTORY",dns:"DNS",files:"الملفات المشتركة",cisco:"LAN / CISCO",
  commune:"دعم محطات العمل",workstation:"الحاسوب",diagnosis:"التشخيص",printer:"الطابعة"
 }
} as const;

function Flow({children}:{children:ReactNode}){
 return <span className="experience-visual-flow" aria-hidden="true"><span/>{children}</span>;
}
function Freelance({t}:{t:typeof labels[Locale]}){
 return <div className="ev-layout ev-layout--freelance">
  <div className="ev-device ev-device--client"><Laptop size={26}/><span>{t.support}</span></div>
  <Flow><ArrowRight size={15}/></Flow>
  <div className="ev-server">
   <div className="ev-server-header"><Cloud size={16}/><strong>{t.vps}</strong></div>
   <span className="ev-drive"/><span className="ev-drive"/><span className="ev-drive"/>
  </div>
  <div className="ev-checklist"><span><FileCheck2 size={15}/>{t.review}</span><i/><i/><i/></div>
 </div>;
}
function Hospital({t}:{t:typeof labels[Locale]}){
 return <div className="ev-layout ev-layout--hospital">
  <div className="ev-users"><Users size={28}/><span>{t.staff}</span></div>
  <Flow><ArrowRight size={15}/></Flow>
  <div className="ev-app-window"><div className="ev-window-top"><span/><span/><span/></div><div className="ev-app-body"><Activity size={22}/><strong>{t.app}</strong><div className="ev-app-lines"><i/><i/></div></div></div>
  <div className="ev-network-end"><Network size={23}/><span>{t.lan}</span></div>
 </div>;
}
function Training({t}:{t:typeof labels[Locale]}){
 return <div className="ev-layout ev-layout--training">
  <div className="ev-topology-heading"><BookOpen size={15}/>{t.lab}</div>
  <svg className="ev-topology-svg" viewBox="0 0 440 120" role="img" aria-label={t.lab+" network topology"}>
   <path className="ev-wire" d="M220 29 V52 M220 75 V91 H72 V96 M220 91 H220 V96 M220 91 H370 V96"/>
   <path className="ev-packet" d="M220 29 V52 M220 75 V91 H72 V96"/>
   <rect className="ev-equipment" x="181" y="5" width="78" height="25" rx="6"/>
   <text className="ev-equipment-name" x="220" y="21" textAnchor="middle">{t.routing}</text>
   <rect className="ev-equipment ev-equipment--switch" x="179" y="51" width="82" height="26" rx="6"/>
   <text className="ev-equipment-name" x="220" y="68" textAnchor="middle">{t.switching}</text>
   {[72,220,370].map((x,i)=><g key={i}><rect className="ev-pc" x={x-18} y="95" width="36" height="15" rx="2"/><path className="ev-pc-line" d={`M${x} 110 v4 m-9 0 h18`}/></g>)}
  </svg>
  <span className="ev-lab-caption">{t.students}</span>
 </div>;
}
function Itsm({t}:{t:typeof labels[Locale]}){
 return <div className="ev-layout ev-layout--itsm">
  <div className="ev-itsm-head"><TicketCheck size={18}/><strong>ITSM / TICKETING</strong><Mail size={15}/></div>
  <div className="ev-tickets">
   <div><TicketCheck size={18}/><span>{t.incident}</span><i/></div>
   <ArrowRight className="ev-itsm-arrow" size={15}/>
   <div><ClipboardCheck size={18}/><span>{t.triage}</span><i/></div>
   <ArrowRight className="ev-itsm-arrow" size={15}/>
   <div><FileCheck2 size={18}/><span>{t.followup}</span><i/></div>
  </div>
  <span className="ev-itsm-caption">{t.email}</span>
 </div>;
}
function Servers({t}:{t:typeof labels[Locale]}){
 return <div className="ev-layout ev-layout--servers">
  <div className="ev-directory-rack"><div className="ev-directory-rack-top"><Server size={16}/> WINDOWS SERVER</div><div><span/><i/></div><div><span/><i/></div><div><span/><i/></div></div>
  <div className="ev-directory-links" aria-hidden="true"><span/><span/><span/></div>
  <div className="ev-directory-services">
   <span><Users size={15}/>{t.ad}</span><span><Network size={15}/>{t.dns}</span><span><HardDrive size={15}/>{t.files}</span>
  </div>
  <div className="ev-directory-lan"><Router size={20}/><span>{t.cisco}</span></div>
 </div>;
}
function Commune({t}:{t:typeof labels[Locale]}){
 return <div className="ev-layout ev-layout--commune">
  <div className="ev-helpdesk-device"><Laptop size={39}/><span>{t.workstation}</span></div>
  <div className="ev-service-path"><Headset size={22}/><span>{t.diagnosis}</span><i/></div>
  <div className="ev-helpdesk-device"><Printer size={36}/><span>{t.printer}</span></div>
 </div>;
}
export default function ExperienceVisual({index,locale}:{index:number;locale:Locale}){
 const t=labels[locale];
 const items=[
  {key:"freelance",tag:t.freelance,element:<Freelance t={t}/>},
  {key:"hospital",tag:t.hospital,element:<Hospital t={t}/>},
  {key:"training",tag:t.training,element:<Training t={t}/>},
  {key:"itsm",tag:t.itsm,element:<Itsm t={t}/>},
  {key:"servers",tag:t.servers,element:<Servers t={t}/>},
  {key:"commune",tag:t.commune,element:<Commune t={t}/>}
 ];
 const item=items[index];if(!item)return null;
 return <div className={"experience-visual experience-visual--"+item.key} role="img" aria-label={item.tag} dir="ltr">
  <div className="experience-visual-top"><span className="ev-topline"><span className="ev-top-dot"/>{item.tag}</span><span className="ev-top-index">EX / 0{index+1}</span></div>
  {item.element}
 </div>;
}
