import type {Locale} from "@/data/content";
import {ArrowRight,ShieldCheck,Activity,Router,HardDrive,LifeBuoy,Monitor,Network,Layers3,ClipboardCheck} from "lucide-react";
import TechnologyMarks from "./TechnologyMarks";

type Zone="users"|"network"|"security"|"systems"|"monitor"|"support";
type Node={name:string;detail:string;zone:Zone;tech?:string};
type Diagram={id:string;nodes:Node[];accent:string;source:boolean;focus:string[]};
const diagrams:Record<string,Diagram>={
 "enterprise-network-lab":{id:"HQ–BRANCH",accent:"network",source:true,
  nodes:[{name:"HQ IT",detail:"10.10.10.10/24",zone:"users",tech:"Linux"},{name:"FRRouting",detail:"10.10.10.1/24",zone:"network",tech:"Linux"},{name:"OSPF WAN",detail:"10.255.0.0/30",zone:"security"},{name:"Branch",detail:"10.20.30.10/24",zone:"users",tech:"Linux"}],
  focus:["OSPF","Routing","IPv4","Containerlab"]},
 "windows-server-ad":{id:"IDENTITY",accent:"systems",source:false,
  nodes:[{name:"Windows clients",detail:"Domain join",zone:"users",tech:"Windows Server"},{name:"AD DS / DNS",detail:"Identity & names",zone:"systems",tech:"Windows Server"},{name:"SMB shares",detail:"Controlled access",zone:"systems",tech:"Windows Server"}],
  focus:["Windows Server","Active Directory","DNS","SMB"]},
 "remote-it-support":{id:"SERVICE DESK",accent:"support",source:false,
  nodes:[{name:"User incident",detail:"Triage",zone:"users"},{name:"Remote support",detail:"AnyDesk",zone:"support"},{name:"Resolution",detail:"User validation",zone:"monitor"}],
  focus:["Remote support","Windows","LAN / Wi-Fi","Troubleshooting"]},
 "hospital-network-support":{id:"CLINICAL IT",accent:"support",source:false,
  nodes:[{name:"Clinical users",detail:"Support request",zone:"users"},{name:"Enova Santé",detail:"Application support",zone:"systems"},{name:"IT handover",detail:"Escalation",zone:"support"}],
  focus:["Application support","LAN","Connectivity","Escalation"]},
 "security-observability-labs":{id:"SECURITY LAB",accent:"security",source:false,
  nodes:[{name:"Endpoint",detail:"Log source",zone:"users"},{name:"Network IDS",detail:"Snort / PCAP",zone:"security",tech:"Snort"},{name:"SIEM",detail:"Wazuh events",zone:"monitor",tech:"Wazuh"}],
  focus:["Snort","Wireshark","Wazuh","Log analysis"]},
 "firewall-ipsec-lab":{id:"PERIMETER LAB",accent:"security",source:false,
  nodes:[{name:"Site A",detail:"Private subnet",zone:"users"},{name:"FortiGate",detail:"IPsec / policy",zone:"security",tech:"FortiGate"},{name:"Palo Alto",detail:"VPN peer",zone:"security",tech:"Palo Alto"}],
  focus:["IPsec","NAT","FortiGate","Palo Alto"]},
 "proxmox-virtualization-lab":{id:"VIRTUALIZATION",accent:"systems",source:false,
  nodes:[{name:"Proxmox VE",detail:"Hypervisor",zone:"systems",tech:"Proxmox"},{name:"Windows VM",detail:"Identity services",zone:"systems",tech:"Windows Server"},{name:"Ubuntu VM",detail:"Linux workloads",zone:"monitor",tech:"Ubuntu"}],
  focus:["Proxmox","VMs","Linux bridges","Backup"]},
 "cisco-campus-network-lab":{id:"CAMPUS LAN",accent:"network",source:false,
  nodes:[{name:"Access VLAN",detail:"Users / departments",zone:"users",tech:"Cisco"},{name:"Cisco Core",detail:"Inter-VLAN",zone:"network",tech:"Cisco"},{name:"LAN services",detail:"ACL / DHCP",zone:"systems"}],
  focus:["Cisco","802.1Q","STP","ACL"]}
};
const labels={
 en:{source:"ADDRESSES FROM CONFIG FILE",concept:"TECHNICAL WORKFLOW / CONCEPT",diagram:"Architecture preview",skills:"SKILLS & TOOLS",detail:"Architecture overview",note:"Technical design view; not a deployment screenshot"},
 fr:{source:"ADRESSES ISSUES DU FICHIER SOURCE",concept:"SCHÉMA TECHNIQUE / CONCEPT",diagram:"Aperçu d’architecture",skills:"COMPÉTENCES & OUTILS",detail:"Vue d’architecture",note:"Vue de conception, pas une capture d’un système en production"},
 ar:{source:"عناوين من ملفات الإعداد",concept:"تصميم أو مسار تقني توضيحي",diagram:"مخطط هندسي مختصر",skills:"المهارات والأدوات",detail:"عرض معماري",note:"رسم توضيحي وليس صورة من نظام مشغّل"}
} as const;
const icons={users:Monitor,network:Router,security:ShieldCheck,systems:HardDrive,monitor:Activity,support:LifeBuoy};
export function projectVisualData(slug:string){return diagrams[slug]}
export default function VisualProject({slug,locale,large=false}:{slug:string;locale:Locale;large?:boolean}){
 const d=diagrams[slug];if(!d)return null;
 const t=labels[locale],rtl=locale==="ar";
 return <div className={"visual-project visual-project--"+d.accent+(large?" visual-project--large":"")} dir="ltr" role="group" aria-label={t.diagram+": "+d.id}>
   <div className="visual-project-top"><span><Network size={13}/>{d.id}</span><span>{d.source?t.source:t.concept}</span></div>
   <div className="visual-flow">{d.nodes.map((node,i)=>{const Icon=icons[node.zone];return <div className={"visual-node visual-node--"+node.zone} key={node.name}>
     <span className="visual-node-icon">{node.tech?<TechnologyMarks technologies={[node.tech]} limit={1} variant="mini"/>:<Icon size={20} strokeWidth={1.8}/>}</span>
     <strong>{node.name}</strong><small dir="ltr">{node.detail}</small>
     {i<d.nodes.length-1&&<span className="visual-flow-link" aria-hidden="true"><ArrowRight size={14}/></span>}
   </div>})}</div>
   {large?<div className="visual-project-bottom"><span>{t.note}</span><span>{d.focus.slice(0,3).join(" · ")}</span></div>:<span className="visual-project-caption">{d.source?t.source:t.concept}</span>}
 </div>
}
