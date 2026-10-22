import Link from "next/link";
import {ArrowUpRight,ArrowRight,Github,Linkedin,MoveDown,ArrowUp,Phone,ContactRound,FileDown} from "lucide-react";
import Navigation from "./Navigation";
import Reveal from "./Reveal";
import LocaleSetup from "./LocaleSetup";
import ProjectExplorer from "./ProjectExplorer";
import SourceTopology from "./SourceTopology";
import TechnologyMarks from "./TechnologyMarks";
import ExperienceProof from "./ExperienceProof";
import DiagnosticSection from "./DiagnosticSection";
import LabRoadmap from "./LabRoadmap";
import {professional} from "@/data/professional";
import {content,githubUrl,linkedInUrl,mailUrl,phoneNumber,prettyPhoneNumber,Locale} from "@/data/content";

export default function Home({locale}:{locale:Locale}){
 const c=content[locale];const rtl=locale==="ar";const credentials=professional[locale];
 const serviceTools=[["AnyDesk","Windows"],["Cisco","Windows Server","Linux"],["Wireshark","Linux"],["GNS3","FRRouting","GitHub"]];
 return <div className={`page-shell ${rtl?"rtl":""}`} dir={rtl?"rtl":"ltr"}>
  <LocaleSetup locale={locale}/>
  <Navigation locale={locale}/>
  <main>
   <section className="hero" id="top" aria-labelledby="hero-title"><div className="hero-sheen"/><div className="container-xl hero-shell">
    <div className="hero-meta"><span className="small-overline">{c.eyebrow}</span><span className="live-tag"><span className="pulse-dot"/>{c.availability}</span></div>
    <div className="hero-grid"><div className="hero-copy">
      <div className="hero-serial"><span className="index-dot"/>{locale==='ar'?'الأنظمة / الشبكات / العمليات':'SYSTEMS / NETWORKS / OPERATIONS'}<span>— 001</span></div>
      <h1 id="hero-title"><span className="hero-person">{locale==='ar'?'طه زيطان':'Taha Zitane'}</span><span className="hero-serif">{locale==='ar'?'هندسة الأنظمة والشبكات':locale==='fr'?'Systèmes, réseaux & infrastructure.':'Systems, networks & infrastructure.'}</span></h1>
      <div className="hero-lead"><div className="hero-rule"/><div><h2>{c.heroSubtitle}</h2><p>{c.heroLead}</p></div></div>
      <TechnologyMarks technologies={["Windows Server","Cisco","Linux","Proxmox","Docker","FortiGate","Palo Alto","Wazuh","Wireshark"]} limit={9} variant="hero"/>
      <div className="hero-actions"><a className="btn btn-primary" href="#work">{locale==='fr'?'Études de cas':locale==='ar'?'المشاريع التقنية':'View projects'}<ArrowUpRight size={18}/></a><a className="btn btn-text" href="#contact">{locale==='fr'?'Me contacter':locale==='ar'?'تواصل معي':'Get in touch'}<ArrowRight size={18}/></a></div>
      <a className="hero-resume-link" href="/cv/Taha_Zitane_CV_2026.pdf" download="Taha_Zitane_CV_2026.pdf"><FileDown size={17}/>{locale==='ar'?'تحميل السيرة الذاتية (PDF)':locale==='fr'?'Télécharger mon CV (PDF)':'Download CV (PDF)'}<ArrowUpRight size={16}/></a>
    </div><div className="hero-visual">
       <div className="portrait-frame"><div className="portrait-image"><img className="portrait-photo" src="/images/taha-portrait.webp" alt={c.portraitAlt} width={630} height={900} fetchPriority="high" decoding="async" /></div><span className="portrait-vertical">{locale==='ar'?'طه زيطان — 2026':'TAHA / ZITANE — 2026'}</span></div>
       <div className="portrait-caption"><div><span className="image-number">{locale==='ar'?'شفشاون، المغرب':locale==='fr'?'Chefchaouen, Maroc':'Chefchaouen, Morocco'}</span><strong>{c.portraitLabel}</strong></div><span>{c.portraitCaption}</span></div>
    </div></div>
    <div className="hero-foot"><span><MoveDown size={14}/>{c.scroll}</span><div className="hero-foot-rule"/><span>{locale==='ar'?'البنية التحتية · التشغيل والدعم':locale==='fr'?'Infrastructure · Exploitation & support':'Infrastructure · Operations & support'}</span></div>
   </div></section>

   <section className="about-section" id="about" aria-labelledby="about-title"><div className="container-xl about-grid">
     <Reveal><span className="section-number light-number">{c.aboutKicker}</span><h2 id="about-title">{c.aboutTitle}</h2></Reveal>
     <Reveal className="about-right" delay={.08}><p className="about-paragraph">{c.aboutBody}</p><div className="facts-grid">{c.profileFacts.map(f=><div key={f.label} className="fact"><span>{f.label}</span><strong>{f.value}</strong></div>)}</div></Reveal>
   </div></section>

   <section className="section experience-section" id="experience" aria-labelledby="experience-title"><div className="container-xl">
     <Reveal className="section-heading"><span className="section-number">{c.experienceKicker}</span><div className="heading-row"><h2 id="experience-title">{c.experienceTitle}</h2><p>{c.experienceSub}</p></div></Reveal>
     <div className="experience-list">{c.experience.map((exp,i)=><Reveal key={i}><div className="experience-item"><div className="experience-period">{exp.period}</div><div className="experience-detail"><h3>{exp.position}</h3><p>{exp.organisation}</p><ExperienceProof index={i} locale={locale}/></div><p className="experience-desc">{exp.details}</p><span className="experience-arrow">↗</span></div></Reveal>)}</div>
   </div></section>

   <section className="section work-section" id="work" aria-labelledby="work-title"><div className="container-xl">
     <Reveal className="section-heading"><span className="section-number">{c.projectsLead}</span><div className="heading-row"><h2 id="work-title">{c.projectsTitle}</h2><p>{c.projectsSub}</p></div></Reveal>
     <ProjectExplorer locale={locale} projects={c.projects}/>
   </div></section>

   <DiagnosticSection locale={locale}/>
   <SourceTopology locale={locale}/>
   <LabRoadmap locale={locale}/>

   <section className="expertise-section" id="expertise" aria-labelledby="expertise-title"><div className="container-xl"><Reveal className="section-heading"><span className="section-number light-number">{c.capabilitiesKicker}</span><div className="heading-row"><h2 id="expertise-title">{c.capabilitiesTitle}</h2><p>{c.capabilitiesSub}</p></div></Reveal><div className="capability-grid">{c.capabilities.map(cap=><Reveal key={cap.n}><article className="capability-card"><span className="cap-no">{cap.n}</span><h3>{cap.title}</h3><p>{cap.description}</p><TechnologyMarks technologies={[cap.tech]} limit={4} variant="inline"/><div className="capability-keywords">{cap.tech.split("  /  ").map(x=><span key={x}>{x}</span>)}</div></article></Reveal>)}</div></div></section>

   <section className="section education-section" id="education"><div className="container-xl">
    <Reveal className="section-heading"><span className="section-number">{credentials.kicker}</span><div className="heading-row"><h2>{credentials.title}</h2><p>{credentials.intro}</p></div></Reveal>
    <div className="education-grid"><Reveal><h3>{credentials.studyTitle}</h3><div className="study-list">{credentials.studies.map((item,i)=><article key={item.year} className="study-item"><small>{item.year}</small><div className="study-body"><span className="institution-name" aria-label={i===0?"EMSI Tanger":i===1?"ISMO Tétouan / OFPPT":"Lycée Al-Khawarizmi"}>{i===0?"EMSI":i===1?"OFPPT / ISMO":"AL-KHAWARIZMI"}<small>{i===0?"TANGER":i===1?"TÉTOUAN":"CHEFCHAOUEN"}</small></span><h4>{item.title}</h4><p>{item.detail}</p></div></article>)}</div></Reveal>
    <Reveal delay={.1}><h3>{credentials.trainingTitle}</h3><div className="training-list">{credentials.courses.map(item=><div className="training-item" key={item.name}><div><strong>{item.name}</strong><span>{item.provider}</span><TechnologyMarks technologies={[item.provider]} limit={1} variant="inline"/></div><small>{item.kind}</small></div>)}</div><p className="education-footnote">{credentials.note}</p></Reveal></div>
   </div></section>

   <section className="section service-section" id="services" aria-labelledby="services-title"><div className="container-xl"><Reveal className="section-heading"><span className="section-number">{c.servicesKicker}</span><div className="heading-row"><h2 id="services-title">{c.servicesTitle}</h2><p>{c.servicesSub}</p></div></Reveal><div className="services-grid">{c.services.map((service,i)=><Reveal key={service.number}><article className="service-item"><span>{service.number}</span><ArrowUpRight size={22}/><h3>{service.title}</h3><p>{service.body}</p><div className="service-tool-strip"><TechnologyMarks technologies={serviceTools[i]} limit={4} variant="inline"/></div></article></Reveal>)}</div></div></section>

   <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container-xl"><Reveal><span className="section-number light-number">{c.contactKicker}</span><div className="contact-row"><div><h2 id="contact-title">{c.contactTitle}</h2><p>{c.contactBody}</p></div><a className="contact-circle" href={mailUrl} aria-label={c.emailMe}><ArrowUpRight size={52} strokeWidth={1.3}/></a></div></Reveal><div className="contact-bottom"><a href={mailUrl} className="email-address">zitanet44@gmail.com <ArrowUpRight size={20}/></a><a href={`tel:${phoneNumber}`} className="phone-address"><Phone size={18}/> {prettyPhoneNumber}</a><div className="socials"><a href="/contact/taha-zitane.vcf" download="taha-zitane.vcf" aria-label={locale==='ar'?'حفظ بطاقة الاتصال':locale==='fr'?'Enregistrer le contact':'Save contact'}><ContactRound size={18}/>{locale==='ar'?'حفظ الاتصال':locale==='fr'?'CONTACT':'SAVE CONTACT'}</a><a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github size={18}/> GITHUB</a><a href={linkedInUrl} target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> LINKEDIN</a></div></div></div></section>
  </main>
  <footer className="site-footer"><div className="container-xl"><span>© 2026 {locale==='ar'?'طه زيطان':'TAHA ZITANE'}</span><span>{c.footerNote}</span><a href="#top">{locale==='ar'?'إلى الأعلى':locale==='fr'?'RETOUR EN HAUT':'BACK TO TOP'} <ArrowUp size={15}/></a></div></footer>
 </div>;
}
