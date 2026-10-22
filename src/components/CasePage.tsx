import Link from "next/link";
import {ArrowLeft,ArrowUpRight, Github, Mail} from "lucide-react";
import Navigation from "./Navigation";
import ProjectGraphic from "./ProjectGraphic";
import LocaleSetup from "./LocaleSetup";
import {content,homePath,projectPath,Locale,mailUrl} from "@/data/content";
export default function CasePage({locale,slug}:{locale:Locale;slug:string}){
 const c=content[locale], project=c.projects.find(p=>p.slug===slug);if(!project)return null;
 const rtl=locale==='ar';
 return <div className={`page-shell ${rtl?'rtl':''}`} dir={rtl?'rtl':'ltr'}><LocaleSetup locale={locale}/><Navigation locale={locale} slug={slug}/><main className="case-main"><div className="container-xl">
  <div className="case-breadcrumb"><Link href={`${homePath(locale)}#work`}><ArrowLeft size={16}/>{c.backToWork}</Link><span>{project.number} / 05</span></div>
  <div className="case-heading"><span className="section-number">{project.type}</span><h1>{project.title}<span>.</span></h1><p>{project.summary}</p><span className={`status-pill status-${project.statusKind}`}>{project.status}</span></div>
  <div className="case-cover"><ProjectGraphic slug={project.slug}/></div>
  <div className="case-info-bar"><div><small>{c.projectRole}</small><strong>{project.role}</strong></div><div><small>{c.statusLabel}</small><strong>{project.status}</strong></div><div><small>TECHNOLOGIES</small><strong>{project.tech.join(" / ")}</strong></div></div>
  <div className="case-body"><div className="case-intro"><span className="section-number">/ 01</span><h2>{c.projectContext}</h2><p>{project.context}</p></div><div className="case-intro"><span className="section-number">/ 02</span><h2>{c.projectWork}</h2><ol>{project.approach.map((s,i)=><li key={i}><span>0{i+1}</span>{s}</li>)}</ol></div><div className="case-intro"><span className="section-number">/ 03</span><h2>{c.projectProof}</h2><p>{project.evidence}</p><div className="case-proof"><span>↳</span> {c.proofBadge}</div></div></div>
  <div className="case-bottom-links">{project.link&&<a className="btn btn-primary" href={project.link} target="_blank" rel="noopener noreferrer"><Github size={19}/>{c.viewRepo}<ArrowUpRight size={17}/></a>}<Link href={`${homePath(locale)}#work`} className="btn btn-outline">{c.backToWork}<ArrowUpRight size={17}/></Link><a className="btn btn-outline" href={mailUrl}><Mail size={18}/>{c.contact}</a></div>
  </div></main><footer className="case-footer"><div className="container-xl"><span>© 2026 TAHA ZITANE</span><span>{c.footerNote}</span></div></footer></div>;
}
