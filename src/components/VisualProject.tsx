"use client";
import {useState} from "react";
import type {Locale} from "@/data/content";
import {Activity,Cloud,HardDrive,Monitor,Network,Router,Server,ShieldCheck,Wrench} from "lucide-react";

type Equipment = "pc"|"router"|"switch"|"firewall"|"server"|"sensor"|"cloud"|"support";
type TopoNode={id:string;name:string;role:Equipment;x:number;y:number;detail:string;logo?:string};
type Cable={a:string;b:string;label:string;x:number;y:number;vpn?:boolean};
type Preview={title:string;source?:boolean;nodes:TopoNode[];cables:Cable[]};
const node=(id:string,name:string,role:Equipment,x:number,y:number,detail:string,logo?:string):TopoNode=>({id,name,role,x,y,detail,logo});
const wire=(a:string,b:string,label:string,x:number,y:number,vpn=false):Cable=>({a,b,label,x,y,vpn});
/** Technical diagrams with explicit equipment, cables and ports.
 * Only the enterprise base preview includes IP addresses from the public FRRouting/Containerlab configs.
 * Other cases are clear lab layouts or support workflows with no invented interfaces or IPs.
 */
const previews:Record<string,Preview>={
 "enterprise-network-lab":{
  title:"HQ / WAN / BRANCH",source:true,
  nodes:[
   node("hq-r","HQ FRR","router",285,126,"10.10.10.1","linux"),
   node("br-r","BRANCH FRR","router",709,126,"10.20.30.1","linux"),
   node("hq-it","HQ IT","pc",120,349,"10.10.10.10/24","linux"),
   node("hq-users","HQ USERS","pc",396,349,"10.10.20.10/24","linux"),
   node("br-user","BRANCH PC","pc",794,349,"10.20.30.10/24","linux")
  ],
  cables:[
   wire("hq-r","br-r","eth1 ↔ eth1 · OSPF",500,96),
   wire("hq-r","hq-it","eth2 ↔ eth1",142,235),
   wire("hq-r","hq-users","eth3 ↔ eth1",418,235),
   wire("br-r","br-user","eth2 ↔ eth1",787,235)
  ]},
 "windows-server-ad":{
  title:"ACTIVE DIRECTORY / LAN",
  nodes:[node("client","DOMAIN PC","pc",140,350,"Windows client","windows"),node("switch","LAN SWITCH","switch",350,126,"Access layer"),node("ad","AD DS / DNS","server",616,350,"Windows Server","windows"),node("files","FILE SERVER","server",798,126,"SMB shares","windows")],
  cables:[wire("client","switch","Ethernet LAN",180,231),wire("switch","ad","Domain / DNS",527,231),wire("switch","files","LAN uplink",570,96)]},
 "remote-it-support":{
  title:"REMOTE DIAGNOSTICS",
  nodes:[node("pc","USER PC","pc",140,340,"Workstation","windows"),node("router","LAN / WI-FI","router",343,120,"Connectivity"),node("remote","IT SUPPORT","support",675,120,"AnyDesk","anydesk"),node("result","USER CHECK","pc",815,340,"Resolution")],
  cables:[wire("pc","router","Local network",182,230),wire("router","remote","Remote session",510,92,true),wire("remote","result","User validation",820,230)]},
 "hospital-network-support":{
  title:"APPLICATION SUPPORT",
  nodes:[node("user","USER POSTE","pc",150,342,"Workstation"),node("lan","LOCAL LAN","switch",350,126,"Network access"),node("app","ENOVA SANTÉ","server",665,126,"Application"),node("help","IT HANDOVER","support",810,342,"Escalation")],
  cables:[wire("user","lan","LAN",165,237),wire("lan","app","App connectivity",510,98),wire("app","help","Support ticket",818,235)]},
 "security-observability-labs":{
  title:"TRAFFIC / LOG MONITORING",
  nodes:[node("pc","ENDPOINT","pc",130,342,"Event source"),node("switch","LAN SWITCH","switch",348,128,"Traffic path"),node("ids","SNORT IDS","sensor",628,342,"PCAP / IDS","snort"),node("siem","WAZUH","server",816,128,"Event analysis","wazuh")],
  cables:[wire("pc","switch","Ethernet",170,229),wire("switch","ids","SPAN / PCAP",527,229),wire("ids","siem","Security events",811,238)]},
 "firewall-ipsec-lab":{
  title:"SITE-TO-SITE VPN",
  nodes:[node("a","SITE A LAN","pc",140,338,"Local subnet"),node("fort","FORTIGATE","firewall",350,126,"Security policy","fortinet"),node("palo","PALO ALTO","firewall",670,126,"Security policy","paloalto"),node("b","SITE B LAN","pc",825,338,"Remote subnet")],
  cables:[wire("a","fort","LAN A",163,226),wire("fort","palo","IPsec tunnel",510,95,true),wire("palo","b","LAN B",815,229)]},
 "proxmox-virtualization-lab":{
  title:"VIRTUAL INFRASTRUCTURE",
  nodes:[node("pve","PROXMOX VE","server",478,112,"Hypervisor","proxmox"),node("bridge","VM BRIDGE","switch",478,295,"Virtual network"),node("win","WINDOWS VM","server",166,362,"AD / DNS","windows"),node("linux","UBUNTU VM","server",800,362,"Linux workloads","ubuntu")],
  cables:[wire("pve","bridge","vBridge",620,212),wire("bridge","win","VM NIC",304,306),wire("bridge","linux","VM NIC",646,306)]},
 "cisco-campus-network-lab":{
  title:"CAMPUS VLAN TOPOLOGY",
  nodes:[node("core","CISCO CORE","switch",480,112,"L3 / routing","cisco"),node("a","ACCESS SW 1","switch",260,264,"VLAN access","cisco"),node("b","ACCESS SW 2","switch",706,264,"VLAN access","cisco"),node("pc1","DEPT A","pc",105,394,"Endpoint"),node("pc2","DEPT B","pc",847,394,"Endpoint")],
  cables:[wire("core","a","802.1Q trunk",293,150),wire("core","b","802.1Q trunk",690,150),wire("a","pc1","Access port",99,303),wire("b","pc2","Access port",853,304)]}
};
const projectPalette:Record<string,{edge:string;vpn:string;node:string;server:string;client:string;firewall:string;frame:string}>={
 "enterprise-network-lab":{edge:"#79cfd2",vpn:"#e4b184",node:"#83d4d0",server:"#92cdd5",client:"#9bc9ee",firewall:"#dfa17f",frame:"#12384c"},
 "windows-server-ad":{edge:"#7bafe7",vpn:"#ddae81",node:"#7eaee0",server:"#a3c8f5",client:"#8edbd1",firewall:"#dfa17f",frame:"#152f4f"},
 "remote-it-support":{edge:"#7ad0c0",vpn:"#ddb280",node:"#8dcfc3",server:"#8fbcbf",client:"#8cdbd0",firewall:"#dfa17f",frame:"#123b43"},
 "hospital-network-support":{edge:"#81bdd8",vpn:"#e3a88c",node:"#8cc2d8",server:"#9cc9da",client:"#97d9ca",firewall:"#dda591",frame:"#14394a"},
 "security-observability-labs":{edge:"#a8a1e4",vpn:"#e1a08d",node:"#a69cda",server:"#b6a8e9",client:"#90cadf",firewall:"#e1a08d",frame:"#292d4c"},
 "firewall-ipsec-lab":{edge:"#99c4ca",vpn:"#eab17c",node:"#8cbdc6",server:"#b8c6db",client:"#a3d6d3",firewall:"#e4a477",frame:"#322d3e"},
 "proxmox-virtualization-lab":{edge:"#92b1e6",vpn:"#e2b081",node:"#a1b2e6",server:"#adbef6",client:"#89d1d0",firewall:"#e2a785",frame:"#172f4b"},
 "cisco-campus-network-lab":{edge:"#7cb6db",vpn:"#e1b284",node:"#89b8df",server:"#a6bddd",client:"#8ed3cc",firewall:"#e2a785",frame:"#13344b"}
};
const pictograms={pc:Monitor,router:Router,switch:Network,firewall:ShieldCheck,server:Server,sensor:Activity,cloud:Cloud,support:Wrench};
const translations={
 en:{source:"SOURCE-DEFINED CABLING",concept:"TOPOLOGY / PROJECT VIEW",intro:"Network layout",detail:"Open project architecture and configuration details",caption:"Equipment · Links · Roles",inspect:"ENGINEERING INSPECTOR",hint:"Select a device or connection in the diagram",equipment:"EQUIPMENT",connection:"CONNECTION"},
 fr:{source:"LIAISONS DU FICHIER SOURCE",concept:"TOPOLOGIE / PROJET",intro:"Schéma réseau",detail:"Découvrir les détails techniques du projet",caption:"Équipements · Liens · Rôles",inspect:"INSPECTEUR D’ARCHITECTURE",hint:"Sélectionnez un équipement ou une connexion",equipment:"ÉQUIPEMENT",connection:"LIAISON"},
 ar:{source:"وصلات من ملفات الإعداد",concept:"طوبولوجيا / مشروع",intro:"مخطط الشبكة",detail:"افتح المشروع للتفاصيل",caption:"الأجهزة · الروابط · الأدوار",inspect:"مستعرض البنية التقنية",hint:"اختر جهازاً أو وصلة لمشاهدة تفاصيلها",equipment:"الجهاز",connection:"الاتصال"}
} as const;
export function projectVisualData(slug:string){return previews[slug]}

export default function VisualProject({slug,locale,large=false}:{slug:string;locale:Locale;large?:boolean}){
 const [inspection,setInspection]=useState<{kind:"node"|"link";id:string}|null>(null);
 const diagram=previews[slug];
 if(!diagram)return null;
 const language=translations[locale];
 const palette=projectPalette[slug];
 const byId=new Map(diagram.nodes.map(n=>[n.id,n]));
 const inspectedNode=inspection?.kind==="node"?byId.get(inspection.id):null;
 const inspectedCable=inspection?.kind==="link"?diagram.cables.find(c=>c.a+"-"+c.b===inspection.id):null;
 const selectionLabel=inspectedNode?inspectedNode.name:inspectedCable?byId.get(inspectedCable.a)?.name+" ↔ "+byId.get(inspectedCable.b)?.name:null;
 const selectionDescription=inspectedNode?inspectedNode.detail:inspectedCable?inspectedCable.label:null;
 const onSelect=(kind:"node"|"link",id:string)=>setInspection(current=>current?.kind===kind&&current.id===id?null:{kind,id});
 return <div className={"visual-project visual-project--topology visual-project--"+slug+(large?" visual-project--large":"")} dir="ltr" role="group" aria-label={language.intro+": "+diagram.title}>
   <div className="visual-project-top"><span><Network size={14}/>{diagram.title}</span><span>{diagram.source?language.source:language.concept}</span></div>
   <div className="topology-preview-stage">
    <svg viewBox="0 0 960 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={diagram.title+": "+diagram.nodes.map(n=>n.name).join(", ")}>
     <defs>
      <pattern id={"preview-grid-"+slug} width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#568b9c" opacity=".34"/></pattern>
     </defs>
     <rect x="0" y="0" width="960" height="460" rx="12" fill={palette?.frame??"#102c3c"}/>
     <rect x="0" y="0" width="960" height="460" rx="12" fill={"url(#preview-grid-"+slug+")"}/>
     {diagram.cables.map((edge,i)=>{
      const a=byId.get(edge.a)!,b=byId.get(edge.b)!;
      return <g key={edge.a+"-"+edge.b} className={"visual-project-interactive"+(inspection?.kind==="link"&&inspection.id===edge.a+"-"+edge.b?" is-active":"")} role={large?"button":undefined} tabIndex={large?0:undefined} aria-label={large?a.name+" ↔ "+b.name+" · "+edge.label:undefined} onClick={large?()=>onSelect("link",edge.a+"-"+edge.b):undefined} onKeyDown={large?event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();onSelect("link",edge.a+"-"+edge.b)}}:undefined}>
       {large&&<line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="transparent" strokeWidth="28" />}
       <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={edge.vpn?palette.vpn:palette.edge} strokeWidth={edge.vpn?4:3.5} strokeDasharray={edge.vpn?"13 9":undefined} strokeLinecap="round"/>
       <line className="project-flow-line" x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={edge.vpn?palette.vpn:palette.edge} strokeWidth={edge.vpn?3.2:2.4} strokeDasharray={edge.vpn?"10 35":"5 27"} opacity=".75" strokeLinecap="round"/>
       <rect x={edge.x-Math.max(65,edge.label.length*6.7)} y={edge.y-21} width={Math.max(130,edge.label.length*13.4)} height="28" rx="6" fill="#19394b" stroke={edge.vpn?palette.vpn:palette.edge} strokeWidth="1.5"/>
       <text x={edge.x} y={edge.y-2} textAnchor="middle" fill="#e7f5f8" fontSize="17" fontFamily="ui-monospace,monospace">{edge.label}</text>
       <title>{a.name+" — "+edge.label+" — "+b.name}</title>
      </g>;
     })}
     {diagram.nodes.map(n=>{
      const Icon=pictograms[n.role];
      const accent=n.role==="firewall"?palette.firewall:n.role==="server"?palette.server:n.role==="pc"?palette.client:palette.node;
      return <g key={n.id} transform={"translate("+n.x+","+n.y+")"} className={"visual-project-interactive"+(inspection?.kind==="node"&&inspection.id===n.id?" is-active":"")} role={large?"button":undefined} tabIndex={large?0:undefined} aria-label={large?n.name+" · "+n.detail:undefined} onClick={large?()=>onSelect("node",n.id):undefined} onKeyDown={large?event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();onSelect("node",n.id)}}:undefined}>
       <rect x="-103" y="-62" width="206" height="124" rx="12" fill={palette?.frame??"#193e52"} stroke={accent} strokeWidth="2"/>
       <rect x="-103" y="-62" width="206" height="9" rx="4" fill={accent}/>
       <rect x="-85" y="-43" width="49" height="43" rx="8" fill="#eef7fa"/>
       <Icon x={-78} y={-37} width={34} height={31} color="#234b64" strokeWidth={1.7}/>
       {n.logo&&<g><rect x="51" y="-44" width="35" height="35" rx="6" fill="#fff"/><image href={"/tech-logos/"+n.logo+".svg"} x="55" y="-40" width="27" height="27"/></g>}
       <text x="-87" y="25" fill="#f7fdff" fontWeight="700" fontSize="21" fontFamily="Arial,sans-serif">{n.name}</text>
       <text x="-87" y="49" fill="#c6e8ed" fontSize="17" fontFamily="ui-monospace,monospace">{n.detail}</text>
       <title>{n.name+": "+n.detail}</title>
      </g>;
     })}
    </svg>
   </div>
   {large?<><div className="visual-project-inspector" aria-live="polite" dir={locale==="ar"?"rtl":"ltr"}>
      <div className="visual-project-inspector-copy"><small>{language.inspect} · {inspection?(inspectedNode?language.equipment:language.connection):"00"}</small><strong>{selectionLabel??language.hint}</strong><span dir="auto">{selectionDescription??language.caption}</span></div>
      <span className="visual-project-inspector-count" aria-label={language.caption}>{diagram.nodes.length} DEV / {diagram.cables.length} LINKS</span>
    </div><div className="visual-project-bottom"><span>{diagram.source?language.source:language.concept}</span><span>{language.caption}</span></div></>:<span className="visual-project-caption">{language.caption}</span>}
 </div>;
}
