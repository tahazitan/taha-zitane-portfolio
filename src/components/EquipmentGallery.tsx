"use client";
import {useState} from "react";
import Link from "next/link";
import {ArrowUpRight, Server, Shield, Network, MonitorCog, Boxes, Wrench, CheckCircle2} from "lucide-react";
import {projectPath,type Locale} from "@/data/content";

/** Architectural reference flows, not product screenshots or completed-test claims. */
type LanguageText={en:string;fr:string;ar:string};
type Case={id:string;label:string;tag:string;title:LanguageText;summary:LanguageText;steps:string[];tech:string[];project:string;icon:"server"|"shield"|"network"|"support"|"docker"|"monitor"};
const cases:Case[]=[
{id:"identity",label:"01",tag:"IDENTITY / SYSTEMS",title:{en:"Windows Server & Active Directory",fr:"Windows Server et Active Directory",ar:"Windows Server و Active Directory"},summary:{en:"Directory, DNS and file services in a managed LAN: practical experience and a separately documented reconstruction.",fr:"Annuaire, DNS et partage de fichiers en réseau local : expérience pratique et reconstruction distincte.",ar:"إدارة الدليل وDNS ومشاركة الملفات في الشبكة المحلية مع توثيق التجربة والمختبر بشكل منفصل."},steps:["CLIENT DEVICES","DNS / DOMAIN","AD DS / FILES"],tech:["Windows Server","AD DS","DNS","SMB"],project:"windows-server-ad",icon:"server"},
{id:"security",label:"02",tag:"SECURITY / OBSERVABILITY",title:{en:"Security monitoring with Wazuh",fr:"Supervision de sécurité avec Wazuh",ar:"مراقبة الأمن باستخدام Wazuh"},summary:{en:"Explore an endpoint-to-SIEM monitoring pipeline and the evidence needed to validate detection and response scenarios.",fr:"Explorer le flux endpoints vers SIEM et les preuves nécessaires pour valider des scénarios de détection.",ar:"عرض تدفق أحداث الأجهزة إلى SIEM وما يلزم للتحقق من سيناريوهات الكشف."},steps:["ENDPOINT LOGS","WAZUH AGENT","SIEM / ANALYSIS"],tech:["Wazuh","Syslog","Snort","Wireshark"],project:"security-observability-labs",icon:"shield"},
{id:"linux",label:"03",tag:"LINUX / VIRTUALIZATION",title:{en:"Linux, Docker & Proxmox",fr:"Linux, Docker et Proxmox",ar:"Linux وDocker وProxmox"},summary:{en:"Virtual infrastructure, Linux services, segmented bridges and recoverability in a documented lab blueprint.",fr:"Infrastructure virtuelle, services Linux, ponts segmentés et reprise dans un laboratoire documenté.",ar:"بنية افتراضية وخدمات Linux وشبكات معزولة وخطط الاستعادة في مختبر موثق."},steps:["PROXMOX HOST","LINUX VM","DOCKER SERVICE"],tech:["Debian","Ubuntu","Docker","Proxmox"],project:"proxmox-virtualization-lab",icon:"docker"},
{id:"network",label:"04",tag:"NETWORK / LAB DESIGN",title:{en:"GNS3 enterprise topology",fr:"Topologie d’entreprise avec GNS3",ar:"تصميم شبكة مؤسسات باستخدام GNS3"},summary:{en:"Headquarters, branches, VLAN segmentation and controlled routes represented as an engineering reference architecture.",fr:"Siège, agences, VLAN et routage contrôlé sous forme d'architecture de référence.",ar:"مقر رئيسي وفروع وتقسيم VLAN ومسارات اتصال محكومة في تصميم مرجعي."},steps:["BRANCH LAN","IPsec / WAN","HQ / SERVICES"],tech:["GNS3","VLAN","Routing","ACL"],project:"enterprise-network-lab",icon:"network"},
{id:"firewalls",label:"05",tag:"FIREWALL / VPN",title:{en:"FortiGate & Palo Alto IPsec",fr:"VPN IPsec FortiGate et Palo Alto",ar:"IPsec بين FortiGate وPalo Alto"},summary:{en:"An inter-site security design explaining encrypted transit, access rules, zones and verification checkpoints.",fr:"Conception inter-sites : chiffrement, politiques d'accès, zones et points de vérification.",ar:"تصميم أمني بين موقعين يوضح التشفير والسياسات ومناطق الحماية ونقاط التحقق."},steps:["FORTIGATE LAN","IPsec TUNNEL","PALO ALTO LAN"],tech:["FortiOS","PAN-OS","IPsec","NAT"],project:"firewall-ipsec-lab",icon:"shield"},
{id:"support",label:"06",tag:"IT OPERATIONS / SUPPORT",title:{en:"Remote IT troubleshooting",fr:"Diagnostic et support IT à distance",ar:"الدعم التقني وتشخيص المشاكل عن بعد"},summary:{en:"A practical incident workflow: assess impact, isolate the fault, assist securely and document the resolution.",fr:"Démarche d'incident : mesurer l'impact, isoler le défaut, intervenir et documenter.",ar:"منهجية معالجة الأعطال: تقدير التأثير وعزل السبب والتدخل بأمان وتوثيق الحل."},steps:["USER INCIDENT","DIAGNOSIS","RESOLUTION / NOTES"],tech:["AnyDesk","Windows","LAN / Wi-Fi","ITSM"],project:"remote-it-support",icon:"support"}
];
const words={
en:{eyebrow:"ENGINEERING / SOLUTIONS",heading:"What I troubleshoot, build and document.",intro:"Professional experience and technical architectures organized by IT responsibility. Select a workflow to explore its services and case study.",open:"Read the case study",note:"Architecture diagrams connect each service workflow to its technical case study.",select:"EXPLORE A TECHNICAL SOLUTION"},
fr:{eyebrow:"INGÉNIERIE / SOLUTIONS",heading:"Diagnostiquer, configurer et documenter.",intro:"Expérience professionnelle et architectures techniques, organisées par fonction IT. Sélectionnez un scénario pour explorer ses services.",open:"Lire l’étude de cas",note:"Des schémas d’architecture relient chaque parcours de service à son étude technique.",select:"EXPLORER UNE SOLUTION TECHNIQUE"},
ar:{eyebrow:"الهندسة / الحلول",heading:"تشخيص الأنظمة وبناؤها وتوثيقها.",intro:"خبرات مهنية وتصاميم تقنية منظمة حسب وظائف تقنية المعلومات. اختر سيناريو لاستكشاف خدماته وتفاصيله.",open:"عرض دراسة المشروع",note:"مخططات هندسية تربط كل مسار خدمة بدراسته التقنية.",select:"استكشف حلاً تقنياً"}
} as const;
const symbols={server:Server,shield:Shield,network:Network,support:Wrench,docker:Boxes,monitor:MonitorCog};
export default function EquipmentGallery({locale}:{locale:Locale}){
 const [selected,setSelected]=useState(cases[0].id);
 const active=cases.find(x=>x.id===selected)||cases[0];
 const labels=words[locale];
 const Icon=symbols[active.icon];
 return <section id="solutions" className="solutions-section" aria-labelledby="solutions-title"><div className="container-xl">
  <header className="solutions-heading"><span className="section-number">{labels.eyebrow}</span><h2 id="solutions-title">{labels.heading}</h2><p>{labels.intro}</p></header>
  <div className="solutions-layout">
   <div className="solution-tabs" role="group" aria-label={labels.select}>{cases.map(item=>{const ItemIcon=symbols[item.icon];return <button key={item.id} type="button" className={"solution-tab"+(item.id===selected?" active":"")} aria-pressed={item.id===selected} onClick={()=>setSelected(item.id)}><span className="solution-tab-number">{item.label}</span><ItemIcon size={21} aria-hidden="true"/><span><small>{item.tag}</small><strong>{item.title[locale]}</strong></span><ArrowUpRight size={17} aria-hidden="true"/></button>})}</div>
   <article className="solution-detail" aria-live="polite">
    <div className="solution-detail-heading"><span>{active.tag}</span><Icon size={29} aria-hidden="true"/></div>
    <h3>{active.title[locale]}</h3><p>{active.summary[locale]}</p>
    <div className="solution-flow" aria-label={active.steps.join(" to ")}>{active.steps.map((step,i)=><div className="solution-flow-step" key={step}><div className="solution-flow-index">{String(i+1).padStart(2,"0")}</div><strong>{step}</strong>{i<active.steps.length-1&&<span className="solution-flow-connector" aria-hidden="true">→</span>}</div>)}</div>
    <div className="solution-tech">{active.tech.map(t=><span key={t}>{t}</span>)}</div>
    <Link className="solution-link" href={projectPath(locale,active.project)}>{labels.open}<ArrowUpRight size={18}/></Link>
   </article>
  </div>
  <p className="solution-disclaimer"><CheckCircle2 size={15}/>{labels.note}</p>
 </div></section>;
}
