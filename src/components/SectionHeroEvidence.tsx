import Link from "next/link";
import {ArrowUpRight,FileCode2,Github,Mail} from "lucide-react";
import {content,homePath,mailUrl,type Locale} from "@/data/content";
import {professional} from "@/data/professional";

/**
 * An editorial, information-rich sidebar in each section's introduction.
 * Unlike the repeated three-icon carousel, every page uses its actual
 * professional data, with source links and explicit project provenance.
 */
type Section="projects"|"experience"|"education"|"expertise"|"services"|"contact";
const labels={
 en:{profile:"PORTFOLIO RECORD",selected:"Selected work",source:"Open source topology",experience:"Professional timeline",education:"Academic pathway",expertise:"Technical domains",services:"Service scopes",contact:"Direct contact",browse:"Explore all projects",view:"Read details",status:"Reference architecture · not a live deployment",github:"Source repository"},
 fr:{profile:"DOSSIER PROFESSIONNEL",selected:"Travaux sélectionnés",source:"Topologie et fichiers source",experience:"Parcours professionnel",education:"Parcours académique",expertise:"Domaines techniques",services:"Prestations proposées",contact:"Contact direct",browse:"Voir les projets",view:"Voir les détails",status:"Architecture de référence · non déployée en production",github:"Dépôt source"},
 ar:{profile:"الملف المهني",selected:"أعمال مختارة",source:"المخطط وملفات المصدر",experience:"المسار المهني",education:"المسار الدراسي",expertise:"المجالات التقنية",services:"نطاق الخدمات",contact:"التواصل المباشر",browse:"تصفح المشاريع",view:"استعراض التفاصيل",status:"بنية مرجعية وليست شبكة منشورة في بيئة إنتاج",github:"مستودع المصدر"}
} as const;
const projectRepo="https://github.com/tahazitan/enterprise-network-lab";
export default function SectionHeroEvidence({locale,section}:{locale:Locale;section:Section}){
 const t=labels[locale],c=content[locale],p=professional[locale];
 const base=locale==="en"?"":"/"+locale;
 const eyebrow=section==="projects"?t.selected:section==="experience"?t.experience:section==="education"?t.education:section==="expertise"?t.expertise:section==="services"?t.services:t.contact;
 const items=section==="experience"?c.experience.slice(0,3).map(e=>({key:e.period,title:e.position,detail:e.organisation})):
  section==="education"?p.studies.slice(0,3).map(e=>({key:e.year,title:e.title,detail:e.detail})):
  section==="expertise"?c.capabilities.slice(0,4).map(e=>({key:e.n,title:e.title,detail:e.description})):
  section==="services"?c.services.map(e=>({key:e.number,title:e.title,detail:e.body})):null;
 return <aside className={"evidence-intro evidence-intro--"+section} aria-label={eyebrow} dir={locale==="ar"?"rtl":"ltr"}>
  <div className="evidence-intro-head"><span>{t.profile}</span><strong>{eyebrow}</strong></div>
  {section==="projects"&&<>
   <div className="evidence-intro-project-title"><span>01 / 08</span><strong>{c.projects[0].title}</strong></div>
   <p className="evidence-intro-description">{c.projects[0].summary}</p>
   <div className="evidence-intro-facts">
    <div><span>LAB / CONFIGURATION</span><strong>Containerlab · FRRouting</strong></div>
    <div><span>{locale==="ar"?"المخطط الأساسي":locale==="fr"?"PROFIL DE BASE":"BASE PROFILE"}</span><strong>5 nodes · 4 links</strong></div>
    <div><span>{locale==="ar"?"المخطط المجزأ":locale==="fr"?"PROFIL SEGMENTÉ":"SEGMENTED PROFILE"}</span><strong>7 nodes · 6 links</strong></div>
   </div>
   <p className="evidence-intro-status">{t.status}</p>
   <div className="evidence-intro-actions"><Link href={base+"/projects/enterprise-network-lab/"}>{t.view}<ArrowUpRight size={15}/></Link><a href={projectRepo+"/blob/main/topology.clab.yml"} target="_blank" rel="noopener noreferrer"><FileCode2 size={15}/>{t.source}</a></div>
  </>}
  {items&&<div className="evidence-intro-list">{items.map((e,i)=><div key={e.key+"-"+i} className="evidence-intro-entry"><small>{e.key}</small><strong>{e.title}</strong>{section!=="expertise"&&<span>{e.detail}</span>}</div>)}</div>}
  {section==="contact"&&<div className="evidence-intro-contact"><p>{c.contactBody}</p><a href={mailUrl}><Mail size={18}/>zitanet44@gmail.com<ArrowUpRight size={16}/></a><a href="https://github.com/tahazitan" target="_blank" rel="noopener noreferrer"><Github size={18}/>github.com/tahazitan<ArrowUpRight size={16}/></a></div>}
  <div className="evidence-intro-bottom"><span>{section==="projects"?"YAML / IPV4 / TOPOLOGY":"TAHA ZITANE / "+section.toUpperCase()}</span><Link href={section==="projects"?base+"/projects/":homePath(locale)} aria-label={section==="projects"?t.browse:c.aboutKicker}><ArrowUpRight size={17}/></Link></div>
 </aside>;
}
