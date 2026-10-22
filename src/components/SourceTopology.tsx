"use client";
import {useState} from "react";
import {ExternalLink,GitBranch,FileCode2} from "lucide-react";
import type {Locale} from "@/data/content";

// These links and interfaces match the owner's Containerlab YAML files.
// This is NOT a GNS3 screenshot and makes no claim of successful deployment.
type N={id:string;label:string;x:number;y:number};
type E={a:string;b:string;ports:string};
type Profile={file:string;url:string;nodes:N[];edges:E[]};
const repo="https://github.com/tahazitan/enterprise-network-lab";
const base:Profile={file:"topology.clab.yml",url:repo+"/blob/main/topology.clab.yml",nodes:[
 {id:"hq-rtr",label:"HQ · FRRouting",x:250,y:87},
 {id:"branch-rtr",label:"BRANCH · FRRouting",x:670,y:87},
 {id:"hq-it",label:"HQ IT · 10.10.10.10",x:100,y:275},
 {id:"hq-users",label:"HQ USERS · 10.10.20.10",x:395,y:275},
 {id:"branch-user",label:"BRANCH · 10.20.30.10",x:670,y:275}
],edges:[
 {a:"hq-rtr",b:"branch-rtr",ports:"eth1 ↔ eth1 · WAN / OSPF"},
 {a:"hq-rtr",b:"hq-it",ports:"eth2 ↔ eth1 · HQ IT"},
 {a:"hq-rtr",b:"hq-users",ports:"eth3 ↔ eth1 · HQ USERS"},
 {a:"branch-rtr",b:"branch-user",ports:"eth2 ↔ eth1 · BRANCH"}
]};
const secure:Profile={file:"secure/topology.secure.clab.yml",url:repo+"/blob/main/secure/topology.secure.clab.yml",nodes:[
 {id:"hq-rtr",label:"HQ · FRRouting",x:210,y:75},
 {id:"branch-rtr",label:"BRANCH · FRRouting",x:680,y:75},
 {id:"hq-switch",label:"HQ · VLAN switch",x:210,y:184},
 {id:"branch-switch",label:"BRANCH · VLAN switch",x:680,y:184},
 {id:"hq-it",label:"HQ IT",x:65,y:315},
 {id:"hq-users",label:"HQ USERS",x:360,y:315},
 {id:"branch-user",label:"BRANCH USER",x:680,y:315}
],edges:[
 {a:"hq-rtr",b:"branch-rtr",ports:"eth1 ↔ eth1 · WAN"},
 {a:"hq-rtr",b:"hq-switch",ports:"eth2 ↔ eth1"},
 {a:"hq-switch",b:"hq-it",ports:"eth2 ↔ eth1"},
 {a:"hq-switch",b:"hq-users",ports:"eth3 ↔ eth1"},
 {a:"branch-rtr",b:"branch-switch",ports:"eth2 ↔ eth1"},
 {a:"branch-switch",b:"branch-user",ports:"eth2 ↔ eth1"}
]};
const copy={
 en:{kicker:"SOURCE-BACKED NETWORK",title:"The configuration is the source of truth.",intro:"An exact connection view derived from my public Containerlab YAML configurations. Not a GNS3 screenshot and not presented as proof of a running deployment.",a:"Base routing",b:"Segmented profile",inventory:"INTERFACE INVENTORY",read:"Open original topology YAML",project:"View repository",note:"Select a link to inspect matching interface endpoints",nodes:"nodes",links:"links"},
 fr:{kicker:"RÉSEAU DOCUMENTÉ PAR SON CODE",title:"L'architecture reliée à sa source.",intro:"Connexions fidèles aux fichiers YAML Containerlab de mon dépôt GitHub. Ce n'est pas une capture GNS3 ni une preuve de mise en production.",a:"Routage de base",b:"Profil segmenté",inventory:"INVENTAIRE DES INTERFACES",read:"Lire le YAML d'origine",project:"Voir le dépôt",note:"Choisissez une liaison pour examiner ses interfaces",nodes:"nœuds",links:"liens"},
 ar:{kicker:"شبكة موثقة بملفات المصدر",title:"الطوبولوجيا مطابقة لملفات الإعداد.",intro:"عرض للاتصالات المحددة في ملفات Containerlab YAML الموجودة في GitHub. ليس لقطة GNS3 ولا دليلاً على تشغيل الشبكة فعلياً.",a:"التوجيه الأساسي",b:"النسخة المجزأة",inventory:"المنافذ والاتصالات",read:"ملف YAML الأصلي",project:"افتح المستودع",note:"اختر اتصالاً لمعرفة المنافذ المطابقة",nodes:"أجهزة",links:"اتصالات"}
} as const;
export default function SourceTopology({locale,compact=false}:{locale:Locale;compact?:boolean}){
 const [mode,setMode]=useState<"base"|"secure">("base");
 const [active,setActive]=useState(0);
 const p=mode==="base"?base:secure,t=copy[locale];
 const nodes=new Map(p.nodes.map(n=>[n.id,n]));
 const address:Record<string,{role:string;addr:string;zone:string}>={
  "hq-rtr":{role:"ROUTING / FRR",addr:"10.10.10.1",zone:"network"},
  "branch-rtr":{role:"ROUTING / FRR",addr:"10.20.30.1",zone:"network"},
  "hq-switch":{role:"VLAN 10 / 20",addr:"802.1Q",zone:"network"},
  "branch-switch":{role:"VLAN 30",addr:"802.1Q",zone:"network"},
  "hq-it":{role:mode==="secure"?"HQ IT / VLAN 10":"HQ IT",addr:"10.10.10.10/24",zone:"users"},
  "hq-users":{role:mode==="secure"?"HQ USERS / VLAN 20":"HQ USERS",addr:"10.10.20.10/24",zone:"users"},
  "branch-user":{role:mode==="secure"?"BRANCH / VLAN 30":"BRANCH",addr:"10.20.30.10/24",zone:"users"}
 };
 const wan=mode==="base"?"OSPF · 10.255.0.0/30":"OSPF · 172.16.255.0/30";

 return <section className={"source-topology"+(compact?" source-topology-compact":"")} id={compact?undefined:"topology"} aria-labelledby={compact?undefined:"source-title"}>
  <div className="container-xl">
   {!compact&&<div className="source-heading"><span className="section-number">{t.kicker}</span><h2 id="source-title">{t.title}</h2><p>{t.intro}</p></div>}
   <div className="source-shell">
    <div className="source-bar"><div><GitBranch size={18}/><strong>CONTAINERLAB / YAML</strong></div><div className="source-switch" role="group" aria-label={t.kicker}>
     <button type="button" aria-pressed={mode==="base"} onClick={()=>{setMode("base");setActive(0)}}>{t.a}</button>
     <button type="button" aria-pressed={mode==="secure"} onClick={()=>{setMode("secure");setActive(0)}}>{t.b}</button>
    </div></div>
    <div className="source-columns">
     <div className="source-figure">
      <div className="source-caption"><span>{p.file}</span><span>{p.nodes.length} {t.nodes} / {p.edges.length} {t.links}</span></div>
      <svg viewBox="0 0 900 375" role="img" aria-label={p.file+" architecture with source-backed IPv4 addressing and interface links"}>
       <defs><pattern id="yaml-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#285062" strokeWidth=".65"/></pattern></defs>
       <rect width="900" height="375" fill="#0b2230"/><rect width="900" height="375" fill="url(#yaml-grid)"/>
       <rect x="344" y="5" width="213" height="25" rx="3" fill="#173b4e" stroke="#537d87"/>
       <text x="450" y="22" textAnchor="middle" fill="#c1e2e2" fontSize="11" fontFamily="monospace">{wan}</text>
       {p.edges.map((e,i)=>{const a=nodes.get(e.a)!,b=nodes.get(e.b)!;return <g key={e.a+"-"+e.b}><path d={"M"+a.x+","+a.y+"L"+b.x+","+b.y} fill="none" stroke={active===i?"#ffbc86":"#6da7b5"} strokeWidth={active===i?5:2.8} strokeLinecap="round"/><circle cx={(a.x+b.x)/2} cy={(a.y+b.y)/2} r={active===i?6:4} fill={active===i?"#ffbc86":"#8cd2c5"}/></g>})}
       {p.nodes.map(n=>{const m=address[n.id];return <g key={n.id} transform={"translate("+n.x+","+n.y+")"}>
         <rect x="-83" y="-34" width="166" height="71" rx="8" fill={m.zone==="network"?"#254d67":"#1c514f"} stroke={m.zone==="network"?"#9bbef7":"#7be2c6"} strokeWidth="1.7"/>
         <rect x="-83" y="-34" width="166" height="8" rx="4" fill={m.zone==="network"?"#5488d2":"#4dc4a1"}/>
         <rect x="-73" y="-18" width="26" height="26" rx="4" fill="#eff7f8"/>
         <image href="/tech-logos/linux.svg" x="-70" y="-15" width="20" height="20"/>
         <text x="-40" y="-8" textAnchor="start" fill="#f1f9fc" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">{n.id.toUpperCase().replaceAll("-"," ")}</text>
         <text x="0" y="17" textAnchor="middle" fill="#c8e1e5" fontSize="11" fontFamily="monospace">{m.addr}</text>
         <title>{n.label+" · "+m.role+" · "+m.addr}</title>
        </g>})}
       {mode==="secure"&&<g><rect x="374" y="344" width="157" height="24" rx="3" fill="#28495a" stroke="#56baad"/><text x="452" y="360" fill="#b9f4dc" fontSize="10.5" textAnchor="middle" fontFamily="monospace">WireGuard 10.254.0.0/30</text></g>}
      </svg>
      <div className="topology-legend" aria-label="Topology color key">
       <span><i className="topology-key-network"/>{locale==="fr"?"Routage / commutation":locale==="ar"?"التوجيه والتبديل":"Routing / switching"}</span>
       <span><i className="topology-key-user"/>{locale==="fr"?"Postes et VLAN":locale==="ar"?"أجهزة المستخدمين":"Endpoints / subnets"}</span>
       <span><i className="topology-key-link"/>{locale==="fr"?"Liaison sélectionnée":locale==="ar"?"الرابط المحدد":"Selected link"}</span>
      </div>
      <p>{t.note}</p>
     </div>
     <aside className="source-aside"><h3>{t.inventory}</h3>
      <div className="source-edges">{p.edges.map((e,i)=><button key={e.a+e.b} type="button" aria-pressed={active===i} onClick={()=>setActive(i)}><strong dir="ltr">{e.a} ↔ {e.b}</strong><small dir="ltr">{e.ports}</small></button>)}</div>
      <div className="source-links"><a href={p.url} target="_blank" rel="noopener noreferrer"><FileCode2 size={17}/>{t.read}<ExternalLink size={15}/></a><a href={repo} target="_blank" rel="noopener noreferrer">{t.project}<ExternalLink size={15}/></a></div>
     </aside>
    </div>
   </div>
  </div>
 </section>;
}
