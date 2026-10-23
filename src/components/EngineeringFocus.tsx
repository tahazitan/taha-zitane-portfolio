import {Activity, ArrowUpRight, Database, HardDrive, LockKeyhole, Network, Router, Server, ShieldCheck} from "lucide-react";
import type {Locale} from "@/data/content";

const copy = {
 en:{
  heading:"Three disciplines. One operational perspective.",
  intro:"A connected view of the infrastructure behind dependable IT services.",
  network:"Network infrastructure",networkLead:"Segmentation & connectivity",networkText:"Switching, routing and clearly defined traffic paths.",
  systems:"Systems administration",systemsLead:"Identity & server services",systemsText:"Windows, Linux and virtualized workloads working together.",
  security:"Cybersecurity operations",securityLead:"Traffic control & visibility",securityText:"Network boundaries, traffic inspection and operational monitoring.",
  core:"CORE",users:"USERS",servers:"SERVERS",guest:"GUEST",edge:"EDGE",
  identity:"IDENTITY",services:"SERVICES",platform:"PLATFORM",
  allowed:"PERMITTED FLOW",blocked:"FILTERED FLOW",observe:"OBSERVABILITY",boundary:"FIREWALL"
 },
 fr:{
  heading:"Trois domaines. Une même vision opérationnelle.",
  intro:"Une vue cohérente des infrastructures qui assurent la continuité des services IT.",
  network:"Infrastructure réseau",networkLead:"Segmentation et connectivité",networkText:"Commutation, routage et maîtrise des flux réseau.",
  systems:"Administration systèmes",systemsLead:"Identité et services serveur",systemsText:"Windows, Linux et environnements virtualisés.",
  security:"Opérations cybersécurité",securityLead:"Contrôle des flux et supervision",securityText:"Filtrage réseau, inspection du trafic et suivi des événements.",
  core:"CŒUR",users:"USAGERS",servers:"SERVEURS",guest:"INVITÉS",edge:"ACCÈS",
  identity:"IDENTITÉ",services:"SERVICES",platform:"PLATEFORME",
  allowed:"FLUX AUTORISÉ",blocked:"FLUX FILTRÉ",observe:"SUPERVISION",boundary:"PARE-FEU"
 },
 ar:{
  heading:"ثلاثة تخصصات، ورؤية تشغيلية متكاملة.",
  intro:"منظور مترابط للبنية التحتية التي تدعم استمرارية الخدمات المعلوماتية.",
  network:"البنية التحتية للشبكات",networkLead:"التقسيم والاتصال",networkText:"التبديل والتوجيه وتنظيم مسارات حركة البيانات.",
  systems:"إدارة الأنظمة",systemsLead:"الهوية وخدمات الخوادم",systemsText:"تكامل أنظمة Windows وLinux والبيئات الافتراضية.",
  security:"عمليات الأمن السيبراني",securityLead:"التحكم في الحركة والمراقبة",securityText:"تصفية حركة الشبكة وفحص الاتصالات ومتابعة الأحداث.",
  core:"المركز",users:"المستخدمون",servers:"الخوادم",guest:"الضيوف",edge:"الوصول",
  identity:"الهوية",services:"الخدمات",platform:"المنصة",
  allowed:"اتصال مسموح",blocked:"اتصال محظور",observe:"المراقبة",boundary:"الجدار الناري"
 }
} as const;

function NetworkDiagram({t}:{t:typeof copy[Locale]}){
 return <div className="focus-diagram focus-diagram--network" dir="ltr">
  <svg viewBox="0 0 470 208" role="img" aria-label={t.networkLead} preserveAspectRatio="xMidYMid meet">
   <path className="focus-link" d="M235 91 V48 H97 V71 M235 48 H371 V71 M235 120 V155 H97 V144 M235 155 H371 V144"/>
   <path className="focus-flow focus-flow--blue" d="M97 71 V48 H235 V91"/>
   <path className="focus-flow focus-flow--teal" d="M235 120 V155 H371 V144"/>
   <rect className="focus-node focus-node--main" x="181" y="85" width="108" height="43" rx="9"/>
   <text className="focus-node-title" x="235" y="103" textAnchor="middle">L3 / CORE</text>
   <text className="focus-node-detail" x="235" y="117" textAnchor="middle">SWITCHING</text>
   <rect className="focus-node" x="43" y="66" width="108" height="47" rx="9"/>
   <text className="focus-node-title" x="97" y="84" textAnchor="middle">VLAN 10</text>
   <text className="focus-node-detail" x="97" y="99" textAnchor="middle">{t.users}</text>
   <rect className="focus-node" x="317" y="66" width="108" height="47" rx="9"/>
   <text className="focus-node-title" x="371" y="84" textAnchor="middle">VLAN 20</text>
   <text className="focus-node-detail" x="371" y="99" textAnchor="middle">{t.servers}</text>
   <rect className="focus-node" x="43" y="132" width="108" height="47" rx="9"/>
   <text className="focus-node-title" x="97" y="151" textAnchor="middle">VLAN 30</text>
   <text className="focus-node-detail" x="97" y="165" textAnchor="middle">{t.guest}</text>
   <rect className="focus-node" x="317" y="132" width="108" height="47" rx="9"/>
   <text className="focus-node-title" x="371" y="151" textAnchor="middle">{t.edge}</text>
   <text className="focus-node-detail" x="371" y="165" textAnchor="middle">WAN / VPN</text>
   <circle className="focus-hub-pulse" cx="235" cy="91" r="4"/>
  </svg>
 </div>;
}
function SystemsDiagram({t}:{t:typeof copy[Locale]}){
 return <div className="focus-diagram focus-diagram--systems" dir="ltr" aria-label={t.systemsLead}>
  <div className="focus-rack" aria-hidden="true">
   <div className="focus-rack-top"><span/><span/><span/></div>
   <div className="focus-rack-unit"><span className="focus-drive"/><span className="focus-drive"/><span className="focus-drive"/><i/></div>
   <div className="focus-rack-unit"><span className="focus-drive"/><span className="focus-drive"/><span className="focus-drive"/><i/></div>
   <div className="focus-rack-unit"><span className="focus-drive"/><span className="focus-drive"/><span className="focus-drive"/><i/></div>
  </div>
  <div className="focus-system-services">
   <div className="focus-system-service"><Server size={17} aria-hidden="true"/><div><strong>Windows Server</strong><span>AD DS · DNS · DHCP</span></div></div>
   <div className="focus-system-service"><HardDrive size={17} aria-hidden="true"/><div><strong>Linux</strong><span>{t.services} · Docker</span></div></div>
   <div className="focus-system-service"><Database size={17} aria-hidden="true"/><div><strong>Proxmox</strong><span>{t.platform} · VM</span></div></div>
  </div>
 </div>;
}
function SecurityDiagram({t}:{t:typeof copy[Locale]}){
 return <div className="focus-diagram focus-diagram--security" dir="ltr">
  <div className="focus-security-flow" role="img" aria-label={t.securityLead}>
   <div className="focus-security-source"><Network size={24} aria-hidden="true"/><span>WAN</span></div>
   <div className="focus-security-wire focus-security-wire--incoming" aria-hidden="true"><i/></div>
   <div className="focus-security-firewall"><ShieldCheck size={27} aria-hidden="true"/><span>{t.boundary}</span></div>
   <div className="focus-security-wire focus-security-wire--allowed" aria-hidden="true"><i/></div>
   <div className="focus-security-destination"><Server size={24} aria-hidden="true"/><span>LAN</span></div>
  </div>
  <div className="focus-security-observe">
   <div className="focus-security-blocked"><LockKeyhole size={15} aria-hidden="true"/><span>{t.blocked}</span><i/></div>
   <div className="focus-security-monitor"><Activity size={18} aria-hidden="true"/><div><strong>{t.observe}</strong><span className="focus-monitor-wave" aria-hidden="true"><svg viewBox="0 0 120 25"><path d="M1 17 H23 L30 11 L37 19 L47 4 L55 17 H77 L85 12 L92 18 L100 8 L107 17 H119"/></svg></span></div></div>
  </div>
 </div>;
}
export default function EngineeringFocus({locale}:{locale:Locale}){
 const t=copy[locale];
 const areas=[
  {id:"network",icon:Router,title:t.network,lead:t.networkLead,description:t.networkText,visual:<NetworkDiagram t={t}/>},
  {id:"systems",icon:Server,title:t.systems,lead:t.systemsLead,description:t.systemsText,visual:<SystemsDiagram t={t}/>},
  {id:"security",icon:ShieldCheck,title:t.security,lead:t.securityLead,description:t.securityText,visual:<SecurityDiagram t={t}/>}
 ] as const;
 return <div className="engineering-focus" aria-labelledby="engineering-focus-title">
  <div className="engineering-focus-heading">
   <span className="engineering-focus-index">01 — 03 / INFRASTRUCTURE & OPERATIONS</span>
   <h3 id="engineering-focus-title">{t.heading}</h3>
   <p>{t.intro}</p>
  </div>
  <div className="engineering-focus-grid">{areas.map((area,i)=>{
   const Icon=area.icon;
   return <article className={"focus-area focus-area--"+area.id} key={area.id}>
    <div className="focus-area-top"><span className="focus-area-number">0{i+1}</span><Icon size={21} strokeWidth={1.6} aria-hidden="true"/></div>
    {area.visual}
    <div className="focus-area-copy"><h4>{area.title}</h4><strong>{area.lead}</strong><p>{area.description}</p></div>
    <span className="focus-area-bottom" aria-hidden="true"><ArrowUpRight size={16}/></span>
   </article>;
  })}</div>
 </div>;
}
