"use client";
import {useState} from "react";
import Link from "next/link";
import {ArrowUpRight,Network,Layers,Server,Shield,GitBranch} from "lucide-react";
import {projectPath,type Locale} from "@/data/content";

/** Vendor-inspired equipment silhouettes, hand-drawn as vector art.
 * Not photographs or exact product models; reference architectures only.
 */
type Kit="cisco-switch"|"cisco-router"|"fortigate"|"paloalto"|"windows"|"linux"|"gns3";
type Translated={en:string;fr:string;ar:string};
type Item={id:Kit;name:string;family:string;role:Translated;notes:string[];project:string};
const kit:Item[]=[
 {id:"cisco-switch",name:"Cisco switching",family:"LAN / ACCESS",role:{en:"802.1Q VLANs, trunk and access ports, inter-VLAN routing boundary.",fr:"VLAN 802.1Q, ports trunk/access et frontières de routage inter-VLAN.",ar:"تقسيم VLAN 802.1Q، منافذ Trunk وAccess وحدود التوجيه بين الشبكات."},notes:["802.1Q","STP","SVI / ACL"],project:"cisco-campus-network-lab"},
 {id:"cisco-router",name:"Cisco routing",family:"L3 / WAN",role:{en:"IP addressing, gateways, routing decisions and branch connectivity.",fr:"Adressage, passerelles, décisions de routage et connexions agences.",ar:"عنونة IP والبوابات ومسارات التوجيه واتصال الفروع."},notes:["IPv4","OSPF","WAN"],project:"enterprise-network-lab"},
 {id:"fortigate",name:"FortiGate",family:"SECURITY / VPN",role:{en:"Perimeter zones, scoped security policies, NAT and site-to-site IPsec.",fr:"Zones périmétriques, règles ciblées, NAT et IPsec inter-sites.",ar:"مناطق الحماية، قواعد وصول محددة، NAT وIPsec بين المواقع."},notes:["IPsec","NAT","POLICY"],project:"firewall-ipsec-lab"},
 {id:"paloalto",name:"Palo Alto Networks",family:"NEXT-GEN FIREWALL",role:{en:"Zone-based policy, application traffic control and VPN design analysis.",fr:"Politiques par zones, contrôle applicatif et analyse de conception VPN.",ar:"قواعد حسب مناطق الشبكة وتحليل حركة التطبيقات وتصميم VPN."},notes:["ZONES","POLICY","VPN"],project:"firewall-ipsec-lab"},
 {id:"windows",name:"Windows Server",family:"IDENTITY / SERVICES",role:{en:"AD DS, integrated DNS, GPO, groups and shared-file permissions.",fr:"AD DS, DNS intégré, GPO, groupes et autorisations de partage.",ar:"خدمات AD DS وDNS وGPO والمجموعات وصلاحيات الملفات."},notes:["AD DS","DNS","GPO"],project:"windows-server-ad"},
 {id:"linux",name:"Linux systems",family:"SERVICES / AUTOMATION",role:{en:"Linux network services, Docker workloads and observability agents.",fr:"Services réseau Linux, workloads Docker et agents de supervision.",ar:"خدمات Linux وأحمال Docker ووكلاء المراقبة."},notes:["LINUX","DOCKER","LOGS"],project:"proxmox-virtualization-lab"},
 {id:"gns3",name:"GNS3 / virtualization",family:"ENGINEERING LAB",role:{en:"Interconnect network appliances, virtual machines and test segments in a reference lab.",fr:"Relier équipements réseau, VM et segments d'essai dans un lab.",ar:"ربط معدات الشبكة والآلات الافتراضية وأجزاء الاختبار في مختبر."},notes:["GNS3","VM","TOPOLOGY"],project:"enterprise-network-lab"}
];
const ui={
 en:{tag:"TECHNOLOGY / EQUIPMENT",title:"The infrastructure behind the work.",intro:"An engineering-oriented equipment atlas, not decorative imagery: representative hardware silhouettes and the services, protocols and design roles associated with each case study.",caption:"Representative technical illustrations · no particular appliance model or production deployment implied",inspect:"SELECT AN EQUIPMENT FAMILY",relevant:"Explore related engineering case",legend:"ILLUSTRATIVE HARDWARE / SERVICE VIEW"},
 fr:{tag:"TECHNOLOGIES / ÉQUIPEMENTS",title:"Les systèmes derrière les projets.",intro:"Un atlas technique des équipements, avec des schémas d'appareils représentatifs et leurs fonctions, protocoles et relations dans les études de cas.",caption:"Illustrations techniques représentatives · aucun modèle précis ni déploiement en production sous-entendu",inspect:"CHOISIR UN ÉQUIPEMENT",relevant:"Voir l'étude de cas associée",legend:"VUE TECHNIQUE REPRÉSENTATIVE"},
 ar:{tag:"التقنيات / المعدات",title:"المعدات والخدمات وراء المشاريع.",intro:"عرض تقني للمعدات وليس مجرد زخرفة: رسوم توضيحية أصلية للأجهزة مع الأدوار والبروتوكولات وعلاقتها بكل دراسة.",caption:"رسوم تمثيلية للمعدات، لا تشير إلى طراز محدد أو تشغيل فعلي في الإنتاج",inspect:"اختر فئة المعدات",relevant:"استكشف المشروع المرتبط",legend:"عرض تمثيلي للمعدات والخدمات"}
} as const;
function NetworkDevice({kind,large=false}:{kind:Kit;large?:boolean}){
 const appliance=["cisco-switch","cisco-router","fortigate","paloalto"].includes(kind);
 const hue=kind==="fortigate"?"#ed9573":kind==="paloalto"?"#f9b47e":kind==="cisco-router"?"#95c6ee":"#8bddcb";
 return <svg className={large?"equipment-drawing equipment-drawing-large":"equipment-drawing"} viewBox="0 0 360 194" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={kind.replace("-"," ")}>
  <defs><linearGradient id={"case-"+kind} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#38596c"/><stop offset=".54" stopColor="#1b3445"/><stop offset="1" stopColor="#0d2332"/></linearGradient>
   <linearGradient id={"top-"+kind} x1="0" x2="0" y1="0" y2="1"><stop stopColor="#54758a"/><stop offset="1" stopColor="#2b4b5c"/></linearGradient>
  </defs>
  <ellipse cx="180" cy="158" rx="125" ry="17" fill="#071523" opacity=".26"/>
  {appliance?<g>
    <path d="M43 80 290 69 327 88 74 100Z" fill={"url(#top-"+kind+")"} stroke="#7c9eac" strokeWidth="1"/>
    <path d="M74 100 327 88 327 143 74 156Z" fill={"url(#case-"+kind+")"} stroke="#799cac" strokeWidth="1.3"/>
    <path d="M43 80 74 100 74 156 43 135Z" fill="#1b3242" stroke="#547586"/>
    {kind==="cisco-switch"?<g>{Array.from({length:24},(_,j)=>{const col=j%12,row=Math.floor(j/12);return <g key={j}><rect x={105+col*16.9} y={105+row*17} width="11" height="10" rx="1.2" fill="#081c2a" stroke="#7199a6" strokeWidth=".75"/>{j%4===0&&<rect x={109+col*16.9} y={108+row*17} width="2.1" height="2.3" fill="#7fe5cb"/>}</g>})}</g>:null}
    {kind==="cisco-router"?<g><rect x="120" y="108" width="87" height="24" rx="3" fill="#162c3e" stroke="#65889c"/>{Array.from({length:6},(_,j)=><rect key={j} x={131+j*12} y="117" width="8" height="5" fill="#071926" stroke="#6f9fb1"/>)}<rect x="234" y="108" width="52" height="25" rx="3" fill="#102436" stroke="#64889b"/>{Array.from({length:4},(_,j)=><circle key={j} cx={241+j*11} cy="119" r="2.6" fill="#82cce3"/>)}</g>:null}
    {kind==="fortigate"||kind==="paloalto"?<g><rect x="107" y="105" width="118" height="34" rx="3" fill="#142b3a" stroke="#6c99a4"/>{Array.from({length:8},(_,j)=><rect key={j} x={116+j*13} y="117" width="8" height="8" fill="#061b26" stroke="#83a3a8" strokeWidth=".7"/>)}<rect x="243" y="110" width="57" height="24" rx="4" fill={hue} opacity=".9"/><path d="m260 117 9 0 0 10 10 0" stroke="#fff" strokeWidth="2" fill="none"/></g>:null}
    <circle cx="86" cy="138" r="2.8" fill={hue}/><circle cx="96" cy="138" r="2.3" fill="#7595a1"/>
   </g>:null}
  {kind==="windows"||kind==="linux"?<g>
    <path d="M118 38 229 44 246 57 136 52Z" fill="#64869b"/>
    <path d="M136 52 246 57 246 155 136 151Z" fill="#1b3749" stroke="#84a4b6" strokeWidth="2"/>
    <path d="M118 38 136 52 136 151 118 138Z" fill="#2a5161" stroke="#658ca2"/>
    {[0,1,2,3].map(j=><g key={j}><rect x="147" y={65+j*21} width="88" height="14" rx="2" fill="#0c2232" stroke="#55798b"/><rect x="158" y={71+j*21} width="9" height="3.5" rx="1" fill={kind==="linux"?"#d3c7a2":"#80bfe5"}/><circle cx="222" cy={71+j*21} r="2.6" fill="#8cdfbd"/></g>)}
    <rect x="173" y="20" width="48" height="32" rx="4" fill="#203c51" stroke="#a9bfcd"/>
    {kind==="windows"?<g fill="#83c9fa"><path d="M183 28 196 26 V36 L183 36Z"/><path d="M199 25 212 24 V36 H199Z"/><path d="M183 39 H196 V49 L183 47Z"/><path d="M199 39 H212 V51 L199 49Z"/></g>:<g fill="none" stroke="#bddfd6" strokeWidth="3"><path d="M186 29 194 35 186 41"/><path d="M197 41h11"/></g>}
   </g>:null}
   {kind==="gns3"?<g>
    <rect x="48" y="27" width="265" height="125" rx="10" fill="#143247" stroke="#6598b0" strokeWidth="2"/>
    <rect x="59" y="38" width="243" height="104" rx="5" fill="#082031"/>
    <g stroke="#78bfd3" strokeWidth="2" fill="none"><path d="M105 80 177 66 247 89 203 116 105 80 126 116 203 116"/><path d="M177 66v50"/></g>
    {[{x:105,y:80},{x:177,y:66},{x:247,y:89},{x:203,y:116},{x:126,y:116}].map((p,i)=><g key={i}><rect x={p.x-15} y={p.y-9} width="30" height="18" rx="3" fill={i===1?"#b56b57":"#276078"} stroke="#c7e6e5"/><rect x={p.x-7} y={p.y-2} width="14" height="3" rx="1" fill="#c3e4dc"/></g>)}
   </g>:null}
   <g stroke="#9cdacb" strokeWidth="1" opacity=".3"><path d="M32 172 H328"/><path d="M52 180H300"/></g>
 </svg>;
}
export default function EquipmentGallery({locale}:{locale:Locale}){
 const [selected,setSelected]=useState<Kit>("cisco-switch");
 const item=kit.find(x=>x.id===selected)||kit[0],t=ui[locale];
 return <section className="equipment-section" id="equipment" aria-labelledby="equipment-title"><div className="container-xl">
  <div className="equipment-heading"><span className="section-number">{t.tag}</span><h2 id="equipment-title">{t.title}</h2><p>{t.intro}</p></div>
  <div className="equipment-grid">{kit.map(x=><button type="button" key={x.id} className={"equipment-card"+(selected===x.id?" is-selected":"")} aria-pressed={selected===x.id} onClick={()=>setSelected(x.id)}>
   <span className="equipment-card-top"><strong>{x.name}</strong><small>{x.family}</small></span>
   <NetworkDevice kind={x.id}/>
   <span className="equipment-tags">{x.notes.map(n=><span key={n}>{n}</span>)}</span>
  </button>)}</div>
  <div className="equipment-inspector" aria-live="polite">
   <div className="equipment-inspector-image"><NetworkDevice kind={item.id} large/></div>
   <div className="equipment-inspector-copy"><span><Network size={16}/>{t.inspect}</span><h3>{item.name}</h3><p>{item.role[locale]}</p><div className="equipment-inspector-tags">{item.notes.map(x=><small key={x}>{x}</small>)}</div><Link href={projectPath(locale,item.project)}>{t.relevant}<ArrowUpRight size={16}/></Link></div>
  </div>
  <p className="equipment-caption"><Shield size={14}/>{t.caption}</p>
 </div></section>;
}
