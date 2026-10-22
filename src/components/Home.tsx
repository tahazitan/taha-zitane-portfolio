import Image from "next/image";
import Link from "next/link";
import {ArrowDownRight,ArrowUpRight,ArrowRight,Github,Linkedin,Mail,MoveDown,ShieldCheck,ArrowDown} from "lucide-react";
import Navigation from "./Navigation";
import Reveal from "./Reveal";
import NetworkBackdrop from "./NetworkBackdrop";
import ProjectGraphic from "./ProjectGraphic";
import LocaleSetup from "./LocaleSetup";
import TopologyStudio from "./TopologyStudio";
import {professional} from "@/data/professional";
import {content,githubUrl,linkedInUrl,mailUrl,projectPath,Locale} from "@/data/content";

export default function Home({locale}:{locale:Locale}){
 const c=content[locale];const rtl=locale==="ar";const credentials=professional[locale];
 return <div className={`page-shell ${rtl?"rtl":""}`} dir={rtl?"rtl":"ltr"}>
  <LocaleSetup locale={locale}/>
  <Navigation locale={locale}/>
  <main>
   <section className="hero" id="top" aria-labelledby="hero-title"><div className="hero-sheen"/><div className="container-xl hero-shell">
    <div className="hero-meta"><span className="small-overline">{c.eyebrow}</span><span className="live-tag"><span className="pulse-dot"/>{c.availability}</span></div>
    <div className="hero-grid"><div className="hero-copy">
      <div className="hero-serial"><span className="index-dot"/> SYSTEMS / NETWORKS / OPERATIONS <span>— 001</span></div>
      <h1 id="hero-title">{c.heroLine1}<br/><span className="hero-serif">{c.heroLine2}</span></h1>
      <div className="hero-lead"><div className="hero-rule"/><div><h2>{c.heroSubtitle}</h2><p>{c.heroLead}</p></div></div>
      <div className="hero-actions"><a className="btn btn-primary" href="#topology">{c.seeWork}<ArrowUpRight size={18}/></a><a className="btn btn-text" href="#work">{c.projectsTitle}<ArrowRight size={18}/></a></div>
    </div><div className="hero-visual"><div className="hero-network"><NetworkBackdrop/></div>
       <div className="portrait-frame"><div className="portrait-image"><Image src="/images/taha-portrait.webp" alt={c.portraitAlt} fill priority sizes="(max-width: 900px) 80vw, 440px"/></div><span className="portrait-vertical">TAHA / ZITANE — 2026</span></div>
       <div className="portrait-caption"><div><span className="image-number">FIG. 01</span><strong>{c.portraitLabel}</strong></div><span>{c.portraitCaption}</span></div>
    </div></div>
    <div className="hero-foot"><span><MoveDown size={14}/>{c.scroll}</span><div className="hero-foot-rule"/><span>35° 10′ N &nbsp; / &nbsp; 05° 16′ W</span></div>
   </div></section>

   <section className="principle-band"><div className="container-xl principle-inner"><span>∴</span><p>{c.foundation}</p><span>↗ 2026</span></div></section>

   <TopologyStudio locale={locale}/>

   <section className="section work-section" id="work" aria-labelledby="work-title"><div className="container-xl">
     <Reveal className="section-heading"><span className="section-number">{c.projectsLead}</span><div className="heading-row"><h2 id="work-title">{c.projectsTitle}</h2><p>{c.projectsSub}</p></div></Reveal>
     <div className="projects-list">{c.projects.map((project,i)=><Reveal key={project.slug} delay={i*.055}><article className={`project-row ${i%2===1?"project-alt":""}`}>
       <Link className="project-art" href={projectPath(locale,project.slug)} aria-label={`${c.viewStudy}: ${project.title}`}><ProjectGraphic slug={project.slug}/></Link>
       <div className="project-copy"><div className="project-overline"><span>{project.number} / {project.type}</span><span className={`status-pill status-${project.statusKind}`}>{project.status}</span></div>
        <h3><Link href={projectPath(locale,project.slug)}>{project.title}</Link></h3><p>{project.summary}</p><div className="tech-rows">{project.tech.map(t=><span key={t}>{t}</span>)}</div>
        <Link className="project-link" href={projectPath(locale,project.slug)}>{c.viewStudy} <ArrowUpRight size={20}/></Link></div>
      </article></Reveal>)}</div>
     <Reveal><div className="proof-note"><ShieldCheck size={20}/><span>{c.statusNote}</span></div></Reveal>
   </div></section>

   <section className="about-section" id="about" aria-labelledby="about-title"><div className="container-xl about-grid">
     <Reveal><span className="section-number light-number">{c.aboutKicker}</span><h2 id="about-title">{c.aboutTitle}</h2></Reveal>
     <Reveal className="about-right" delay={.08}><p className="about-paragraph">{c.aboutBody}</p><div className="facts-grid">{c.profileFacts.map(f=><div key={f.label} className="fact"><span>{f.label}</span><strong>{f.value}</strong></div>)}</div></Reveal>
   </div></section>

   <section className="section experience-section" id="experience" aria-labelledby="experience-title"><div className="container-xl">
     <Reveal className="section-heading"><span className="section-number">{c.experienceKicker}</span><div className="heading-row"><h2 id="experience-title">{c.experienceTitle}</h2><p>{c.experienceSub}</p></div></Reveal>
     <div className="experience-list">{c.experience.map((exp,i)=><Reveal key={i}><div className="experience-item"><div className="experience-period">{exp.period}</div><div className="experience-detail"><h3>{exp.position}</h3><p>{exp.organisation}</p></div><p className="experience-desc">{exp.details}</p><span className="experience-arrow">↗</span></div></Reveal>)}</div>
   </div></section>

   <section className="section education-section" id="education"><div className="container-xl">
    <Reveal className="section-heading"><span className="section-number">{credentials.kicker}</span><div className="heading-row"><h2>{credentials.title}</h2><p>{credentials.intro}</p></div></Reveal>
    <div className="education-grid"><Reveal><h3>{credentials.studyTitle}</h3><div className="study-list">{credentials.studies.map(item=><article key={item.year} className="study-item"><small>{item.year}</small><div><h4>{item.title}</h4><p>{item.detail}</p></div></article>)}</div></Reveal>
    <Reveal delay={.1}><h3>{credentials.trainingTitle}</h3><div className="training-list">{credentials.courses.map(item=><div className="training-item" key={item.name}><div><strong>{item.name}</strong><span>{item.provider}</span></div><small>{item.kind}</small></div>)}</div><p className="education-footnote">{credentials.note}</p></Reveal></div>
   </div></section>

   <section className="expertise-section" id="expertise" aria-labelledby="expertise-title"><div className="container-xl"><Reveal className="section-heading"><span className="section-number light-number">{c.capabilitiesKicker}</span><div className="heading-row"><h2 id="expertise-title">{c.capabilitiesTitle}</h2><p>{c.capabilitiesSub}</p></div></Reveal><div className="capability-grid">{c.capabilities.map(cap=><Reveal key={cap.n}><article className="capability-card"><span className="cap-no">{cap.n}</span><h3>{cap.title}</h3><p>{cap.description}</p><span className="cap-tech">{cap.tech}</span></article></Reveal>)}</div></div></section>

   <section className="section service-section" id="services" aria-labelledby="services-title"><div className="container-xl"><Reveal className="section-heading"><span className="section-number">{c.servicesKicker}</span><div className="heading-row"><h2 id="services-title">{c.servicesTitle}</h2><p>{c.servicesSub}</p></div></Reveal><div className="services-grid">{c.services.map(service=><Reveal key={service.number}><article className="service-item"><span>{service.number}</span><ArrowUpRight size={22}/><h3>{service.title}</h3><p>{service.body}</p></article></Reveal>)}</div></div></section>

   <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container-xl"><Reveal><span className="section-number light-number">{c.contactKicker}</span><div className="contact-row"><div><h2 id="contact-title">{c.contactTitle}</h2><p>{c.contactBody}</p></div><a className="contact-circle" href={mailUrl} aria-label={c.emailMe}><ArrowUpRight size={52} strokeWidth={1.3}/></a></div></Reveal><div className="contact-bottom"><a href={mailUrl} className="email-address">zitanet44@gmail.com <ArrowUpRight size={20}/></a><div className="socials"><a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github size={18}/> GITHUB</a><a href={linkedInUrl} target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> LINKEDIN</a></div></div></div></section>
  </main>
  <footer className="site-footer"><div className="container-xl"><span>© 2026 TAHA ZITANE</span><span>{c.footerNote}</span><a href="#top">BACK TO TOP <ArrowDown size={15}/></a></div></footer>
 </div>;
}
