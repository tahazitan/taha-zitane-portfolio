"use client";
import {useState} from "react";
import Link from "next/link";
import {ArrowUpRight,Boxes,GitBranch} from "lucide-react";
import {content,projectPath,type Locale} from "@/data/content";
const projectsBySkill=[
 ["enterprise-network-lab","cisco-campus-network-lab","firewall-ipsec-lab"],
 ["windows-server-ad","proxmox-virtualization-lab"],
 ["firewall-ipsec-lab","security-observability-labs","enterprise-network-lab"],
 ["remote-it-support","hospital-network-support","security-observability-labs"],
 ["windows-server-ad","remote-it-support"],
 ["enterprise-network-lab","security-observability-labs","remote-it-support"]
];
const ui={
 en:{kicker:"FROM TECHNOLOGY TO CONTEXT",title:"Explore skills through case studies.",lead:"Choose a technical domain to see its scope and related portfolio work — no arbitrary percentage scores.",associated:"RELATED ENGINEERING WORK",open:"Read case study"},
 fr:{kicker:"DES COMPÉTENCES AUX PROJETS",title:"Des compétences contextualisées.",lead:"Choisissez un domaine pour retrouver les projets et expériences associés, sans scores de compétences arbitraires.",associated:"TRAVAUX TECHNIQUES ASSOCIÉS",open:"Voir l'étude"},
 ar:{kicker:"من المهارة إلى التطبيق",title:"التخصصات مرتبطة بمشاريعها.",lead:"اختر مجالاً تقنياً لاستكشاف المشاريع والتجارب المرتبطة به دون نسب مئوية تخمينية للمهارات.",associated:"مشاريع وخبرات مرتبطة",open:"دراسة المشروع"}
} as const;
export default function SkillEvidence({locale}:{locale:Locale}){
 const [selected,setSelected]=useState(0);
 const c=content[locale],t=ui[locale],skill=c.capabilities[selected];
 return <div className="skill-evidence" aria-label={t.title}>
   <div className="skill-evidence-heading"><span><Boxes size={19}/>{t.kicker}</span><h3>{t.title}</h3><p>{t.lead}</p></div>
   <div className="skill-evidence-grid">
    <div className="skill-selectors" role="group" aria-label={t.title}>{c.capabilities.map((entry,i)=><button type="button" key={entry.n} className={selected===i?"active":""} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span>{entry.n}</span>{entry.title}<ArrowUpRight size={16}/></button>)}</div>
    <div className="skill-detail" aria-live="polite"><span className="skill-detail-caption"><GitBranch size={15}/>{t.associated}</span><h4>{skill.title}</h4><p>{skill.description}</p><div className="skill-stack">{skill.tech.split("/").map((s,i)=><span key={i}>{s.trim()}</span>)}</div><div className="skill-linked-work">{projectsBySkill[selected].map(slug=>{const project=c.projects.find(p=>p.slug===slug);return project?<Link key={slug} href={projectPath(locale,slug)}><span><strong>{project.title}</strong><small>{project.type}</small></span><ArrowUpRight size={17}/></Link>:null;})}</div></div>
   </div>
 </div>;
}
