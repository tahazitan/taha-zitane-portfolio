import Link from "next/link";
import {ArrowUpRight,GitBranch,ShieldCheck,ServerCog,Network,Activity,Check} from "lucide-react";
import type {Locale} from "@/data/content";
import {content,projectPath} from "@/data/content";
import TechnologyMarks from "./TechnologyMarks";
const labels={
 en:{kicker:"NEXT / ENGINEERING LABS",title:"Design. Build. Verify. Publish.",intro:"A transparent implementation queue, separate from completed professional experience. Each case shows the architecture and the tests needed before it is called verified.",plan:"DESIGN STUDY",steps:["Architecture","Implementation","Testing","Evidence"],open:"Explore plan"},
 fr:{kicker:"PROCHAINEMENT / LABS",title:"Concevoir. Construire. Vérifier. Publier.",intro:"Des études techniques en évolution, présentées séparément des expériences professionnelles. Les résultats ne sont annoncés qu’après validation.",plan:"ÉTUDE TECHNIQUE",steps:["Architecture","Réalisation","Tests","Preuves"],open:"Voir le projet"},
 ar:{kicker:"مختبرات قيد التطوير",title:"تصميم. تنفيذ. اختبار. توثيق.",intro:"مشاريع تقنية مستقبلية مستقلة عن الخبرة المهنية الفعلية؛ لا نعرض نتائج تشغيل قبل إثباتها.",plan:"دراسة تصميم",steps:["تصميم","تنفيذ","اختبار","أدلة"],open:"افتح المشروع"}
} as const;
const slugs=["enterprise-network-lab","firewall-ipsec-lab","proxmox-virtualization-lab","security-observability-labs"];
const icons=[Network,ShieldCheck,ServerCog,Activity];
export default function LabRoadmap({locale}:{locale:Locale}){
 const t=labels[locale],c=content[locale];
 return <section className="lab-roadmap" id="roadmap" aria-labelledby="roadmap-title"><div className="container-xl">
 <div className="section-heading"><span className="section-number">{t.kicker}</span><div className="heading-row"><h2 id="roadmap-title">{t.title}</h2><p>{t.intro}</p></div></div>
 <div className="lab-roadmap-grid">{slugs.map((slug,i)=>{const project=c.projects.find(p=>p.slug===slug);if(!project)return null;const Icon=icons[i];
 return <article className="lab-roadmap-card" key={slug}><div className="roadmap-card-head"><Icon size={24}/><span>{t.plan} / 0{i+1}</span></div><h3>{project.title}</h3><TechnologyMarks technologies={project.tech} variant="inline" limit={4}/><div className="roadmap-stages">{t.steps.map((step,j)=><span key={step} className={j===0?"roadmap-stage roadmap-stage--design":"roadmap-stage"}>{j===0?<Check size={12}/>:String(j+1).padStart(2,"0")}{step}</span>)}</div><Link href={projectPath(locale,slug)}>{t.open}<ArrowUpRight size={17}/></Link></article>})}</div>
 </div></section>
}
