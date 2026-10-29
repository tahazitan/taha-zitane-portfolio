import Link from "next/link";
import {ArrowUpRight,Network,ShieldCheck,GraduationCap,BriefcaseBusiness} from "lucide-react";
import VisualProject from "./VisualProject";
import TechnologyMarks from "./TechnologyMarks";
import {content,type Locale} from "@/data/content";
const path=(locale:Locale,p:string)=>`${locale==="en"?"":"/"+locale}/${p}/`;
const strings={
 en:{section:"EXPLORE THE PORTFOLIO",title:"Experience and evidence, organized.",sub:"Explore professional experience, documented engineering projects, technical education and independent services.",projects:"Infrastructure projects",projectsText:"Network architecture, firewalls, server design, security monitoring and source-linked technical diagrams.",service:"Technical services",serviceText:"Remote infrastructure support, VPS administration, configuration review and practical network-security assistance.",exp:"Professional experience",expText:"Hands-on support, ITSM operations, teaching and server and network exposure.",edu:"Training & education",eduText:"Academic pathway, Cisco learning, Linux and cybersecurity foundations.",cta:"Explore",route:"Network / Systems / Security",sample:"Selected technical domains"},
 fr:{section:"DÉCOUVRIR LE PORTFOLIO",title:"Expérience et réalisations documentées.",sub:"Expérience professionnelle, projets techniques documentés, formation et services indépendants.",projects:"Projets d’infrastructure",projectsText:"Architecture réseau, pare-feu, systèmes, supervision et schémas techniques liés aux sources.",service:"Services techniques",serviceText:"Support distant, administration VPS, audits de configuration et assistance en sécurité réseau.",exp:"Expérience professionnelle",expText:"Support, exploitation ITSM, formation et pratique réseaux et serveurs.",edu:"Formation & études",eduText:"Études académiques, formations Cisco, Linux et fondamentaux cybersécurité.",cta:"Découvrir",route:"Réseaux / Systèmes / Sécurité",sample:"Domaines techniques"},
 ar:{section:"استكشاف الملف المهني",title:"خبرة ومشاريع موثقة بمسارات واضحة.",sub:"مساحات واضحة للخبرة المهنية والمشاريع التطبيقية الموثقة والتكوين والخدمات المستقلة.",projects:"مشاريع البنية التحتية",projectsText:"تصميم الشبكات والجدران النارية والخوادم والمراقبة الأمنية والمخططات الهندسية المرتبطة بالمصادر.",service:"الخدمات التقنية",serviceText:"الدعم عن بُعد وإدارة VPS ومراجعة الإعدادات وحلول أمن الشبكات.",exp:"الخبرة المهنية",expText:"الدعم التقني وعمليات ITSM والتكوين والعمل على الأنظمة والشبكات.",edu:"الدراسة والتكوين",eduText:"الدراسات الأكاديمية وتكوينات Cisco وLinux وأساسيات الأمن السيبراني.",cta:"استكشف",route:"الشبكات / الأنظمة / الأمن",sample:"المجالات التقنية"}
} as const;
export default function LandingOverview({locale}:{locale:Locale}){
 const t=strings[locale];const c=content[locale];
 const cards=[
  {id:"projects",icon:Network,title:t.projects,description:t.projectsText,tools:["Cisco","FortiGate","Palo Alto","Proxmox","Wazuh"],className:"overview-projects"},
  {id:"experience",icon:BriefcaseBusiness,title:t.exp,description:t.expText,tools:["Cisco","Windows Server","Linux"],className:"overview-experience"},
  {id:"education",icon:GraduationCap,title:t.edu,description:t.eduText,tools:["Cisco","Linux"],className:"overview-education"},
  {id:"services",icon:ShieldCheck,title:t.service,description:t.serviceText,tools:["Windows Server","Linux","Wireshark","AnyDesk"],className:"overview-services"}
 ] as const;
 return <section className="landing-overview" id="work"><div className="container-xl">
  <div className="landing-overview-heading"><div><span className="section-number">{t.section}</span><h2>{t.title}</h2></div><p>{t.sub}</p></div>
  <div className="overview-grid">{cards.map((card,i)=>{const Icon=card.icon;return <Link href={path(locale,card.id)} className={`overview-card ${card.className}`} key={card.id}>
   <div className="overview-card-top"><span>0{i+1} / {t.route}</span><ArrowUpRight size={23}/></div>
   <div className="overview-content"><div className="overview-icon"><Icon size={22}/></div><h3>{card.title}</h3><p>{card.description}</p></div>
   {i===0&&<div className="overview-project-preview"><VisualProject slug="enterprise-network-lab" locale={locale}/></div>}
   <div className="overview-card-bottom"><TechnologyMarks technologies={card.tools} limit={5} variant="inline"/><span className="overview-cta">{t.cta}<ArrowUpRight size={15}/></span></div>
  </Link>})}</div>
 </div></section>;
}
