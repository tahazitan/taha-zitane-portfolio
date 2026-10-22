import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight,ArrowRight,Github,Linkedin,MoveDown,ArrowDown,Phone,Network,ContactRound,FileDown} from "lucide-react";
import Navigation from "./Navigation";
import Reveal from "./Reveal";
import NetworkBackdrop from "./NetworkBackdrop";
import LocaleSetup from "./LocaleSetup";
import TopologyStudio from "./TopologyStudio";
import ProjectExplorer from "./ProjectExplorer";
import DiagnosticExplorer from "./DiagnosticExplorer";
import SecurityOperationsDesk from "./SecurityOperationsDesk";
import SkillEvidence from "./SkillEvidence";
import {professional} from "@/data/professional";
import {content,githubUrl,linkedInUrl,mailUrl,phoneNumber,prettyPhoneNumber,Locale} from "@/data/content";

const engineeringMethod = {
 en:{kicker:"THE WORKING METHOD",title:"Design for the day after deployment.",intro:"Infrastructure is useful only when it can be operated, investigated and handed over. This is the workflow I apply to support tasks and develop through my documented labs.",steps:[
  {num:"01",title:"Understand",tag:"SCOPE / BASELINE",body:"Clarify symptoms, users, topology, dependencies and the boundaries of the assignment before changing a system."},
  {num:"02",title:"Configure",tag:"BUILD / CONTROL",body:"Work through repeatable configurations, access rules and change notes with attention to least privilege and reversibility."},
  {num:"03",title:"Verify",tag:"TEST / OBSERVE",body:"Check reachability, name resolution, event logs and expected access paths. Identify what has been tested versus what remains planned."},
  {num:"04",title:"Document",tag:"HANDOVER / IMPROVE",body:"Record decisions, troubleshooting steps and next checks so another person can understand and support the environment."}]},
 fr:{kicker:"MA MÉTHODE DE TRAVAIL",title:"Une infrastructure pensée pour durer.",intro:"Une infrastructure utile doit rester compréhensible, vérifiable et maintenable. Voici ma démarche pour les interventions de support et les laboratoires documentés.",steps:[
  {num:"01",title:"Comprendre",tag:"PÉRIMÈTRE / ÉTAT INITIAL",body:"Qualifier les symptômes, les utilisateurs, la topologie, les dépendances et les limites de l'intervention avant de modifier le système."},
  {num:"02",title:"Configurer",tag:"MISE EN ŒUVRE / CONTRÔLE",body:"Procéder par configurations reproductibles, règles d'accès précises et changements documentés, avec un plan de retour arrière."},
  {num:"03",title:"Vérifier",tag:"TESTS / SUPERVISION",body:"Contrôler la connectivité, le DNS, les journaux et les flux autorisés. Distinguer les vérifications effectuées des tests encore prévus."},
  {num:"04",title:"Documenter",tag:"TRANSMISSION / AMÉLIORATION",body:"Consigner les décisions, diagnostics et étapes suivantes pour faciliter la reprise par un autre technicien."}]},
 ar:{kicker:"منهجيتي في العمل",title:"بنية يمكن تشغيلها وفهمها وصيانتها.",intro:"قيمة البنية التحتية لا تقف عند التركيب؛ بل تظهر عند التشخيص والتحقق والتوثيق. هذه هي المنهجية التي أتبعها في الدعم التقني وأطوّرها في مختبراتي.",steps:[
  {num:"01",title:"فهم المشكلة",tag:"النطاق / الوضع الأولي",body:"تحديد الأعراض والمستخدمين وطوبولوجيا الشبكة والاعتماديات وحدود المهمة قبل تغيير أي إعداد."},
  {num:"02",title:"الإعداد والتنفيذ",tag:"التنفيذ / الضبط",body:"اعتماد إعدادات قابلة لإعادة التطبيق، وصلاحيات دقيقة، وتوثيق التغييرات مع مراعاة إمكانية الرجوع."},
  {num:"03",title:"التحقق",tag:"اختبارات / مراقبة",body:"فحص الاتصال وDNS والسجلات ومسارات الوصول، والتمييز بوضوح بين الاختبارات المنجزة والمخطط لها."},
  {num:"04",title:"التوثيق",tag:"تسليم / تحسين",body:"توثيق القرارات وخطوات التشخيص والفحوص المقبلة حتى يستطيع شخص آخر صيانة البيئة التقنية."}]}
} as const;

export default function Home({locale}:{locale:Locale}){
 const c=content[locale];const rtl=locale==="ar";const credentials=professional[locale];
 return <div className={`page-shell ${rtl?"rtl":""}`} dir={rtl?"rtl":"ltr"}>
  <LocaleSetup locale={locale}/>
  <Navigation locale={locale}/>
  <main>
   <section className="hero" id="top" aria-labelledby="hero-title"><div className="hero-sheen"/><div className="container-xl hero-shell">
    <div className="hero-meta"><span className="small-overline">{c.eyebrow}</span><span className="live-tag"><span className="pulse-dot"/>{c.availability}</span></div>
    <div className="hero-grid"><div className="hero-copy">
      <div className="hero-serial"><span className="index-dot"/>{locale==='ar'?'الأنظمة / الشبكات / العمليات':'SYSTEMS / NETWORKS / OPERATIONS'}<span>— 001</span></div>
      <h1 id="hero-title">{c.heroLine1}<br/><span className="hero-serif">{c.heroLine2}</span></h1>
      <div className="hero-lead"><div className="hero-rule"/><div><h2>{c.heroSubtitle}</h2><p>{c.heroLead}</p></div></div>
      <div className="hero-actions"><a className="btn btn-primary" href="#work">{locale==='fr'?'Voir mes projets':locale==='ar'?'تصفح المشاريع':'Explore case studies'}<ArrowUpRight size={18}/></a><a className="btn btn-text" href="#experience">{locale==='fr'?'Mon parcours':locale==='ar'?'الخبرات المهنية':'Professional experience'}<ArrowRight size={18}/></a></div>
      <a className="hero-resume-link" href="/cv/Taha_Zitane_CV_2026.pdf" download="Taha_Zitane_CV_2026.pdf"><FileDown size={17}/>{locale==='ar'?'تحميل السيرة الذاتية (PDF)':locale==='fr'?'Télécharger mon CV (PDF)':'Download CV (PDF)'}<ArrowUpRight size={16}/></a>
      <a className="hero-3d-link" href="#topology"><Network size={18}/>{c.seeWork}<ArrowUpRight size={16}/></a>
      <div className="hero-proof-strip" aria-label={locale==='ar'?'ملخص ملف الأعمال':locale==='fr'?'Portfolio en chiffres':'Portfolio overview'}>
        <div><strong>{String(c.projects.length).padStart(2,'0')}</strong><span>{locale==='ar'?'دراسات مشاريع':locale==='fr'?'études de cas':'case studies'}</span></div>
        <div><strong>{String(c.experience.length).padStart(2,'0')}</strong><span>{locale==='ar'?'تجارب مهنية':locale==='fr'?'expériences':'career entries'}</span></div>
        <div><strong>03</strong><span>{locale==='ar'?'لغات':locale==='fr'?'langues':'languages'}</span></div>
      </div>

    </div><div className="hero-visual">
       <div className="portrait-frame"><div className="portrait-image"><Image src="/images/taha-portrait.webp" alt={c.portraitAlt} fill priority sizes="(max-width: 900px) 80vw, 440px"/></div><span className="portrait-vertical">{locale==='ar'?'طه زيطان — 2026':'TAHA / ZITANE — 2026'}</span></div>
       <div className="portrait-caption"><div><span className="image-number">FIG. 01</span><strong>{c.portraitLabel}</strong></div><span>{c.portraitCaption}</span></div>
       <div className="hero-network hero-network-exhibit" role="group" aria-label={locale==='fr'?'Visualisation réseau animée en 3D':locale==='ar'?'تصور ثلاثي الأبعاد لشبكة معلوماتية':'Animated 3D network visualization'}>
         <div className="hero-exhibit-top"><span className="hero-exhibit-status"/><span>{locale==='fr'?'VISUALISATION 3D / EN DIRECT':locale==='ar'?'تصور تفاعلي / ثلاثي الأبعاد':'LIVE VISUALIZATION / 3D'}</span><span>00:NETWORK</span></div>
         <NetworkBackdrop/>
         <a className="hero-exhibit-bottom" href="#topology"><span>{locale==='fr'?'Ouvrir le laboratoire interactif':locale==='ar'?'افتح مختبر الشبكات التفاعلي':'Explore the interactive network lab'}</span><ArrowUpRight size={17}/></a>
       </div>
    </div></div>
    <div className="hero-foot"><span><MoveDown size={14}/>{c.scroll}</span><div className="hero-foot-rule"/><span>35° 10′ N &nbsp; / &nbsp; 05° 16′ W</span></div>
   </div></section>

   <section className="principle-band"><div className="container-xl principle-inner"><span>∴</span><p>{c.foundation}</p><span>↗ 2026</span></div></section>

   <section className="section work-section" id="work" aria-labelledby="work-title"><div className="container-xl">
     <Reveal className="section-heading"><span className="section-number">{c.projectsLead}</span><div className="heading-row"><h2 id="work-title">{c.projectsTitle}</h2><p>{c.projectsSub}</p></div></Reveal>
     <ProjectExplorer locale={locale} projects={c.projects}/>
   </div></section>

   <TopologyStudio locale={locale}/>

   <div className="lab-pathway"><div className="container-xl lab-pathway-inner">
      <span>${locale==='fr'?'EXPLORER LES MÉTHODES':locale==='ar'?'استكشف المنهجيات':'EXPLORE THE WORKFLOWS'}</span>
      <a href="#diagnostics">${locale==='fr'?'Simuler un diagnostic':locale==='ar'?'محاكاة تشخيص عطل':'Run a diagnostic scenario'} <ArrowUpRight size={16}/></a>
      <a href="#security-operations">${locale==='fr'?'Analyser les événements sécurité':locale==='ar'?'تحليل أحداث الأمن':'Investigate synthetic security events'} <ArrowUpRight size={16}/></a>
   </div></div>

   <DiagnosticExplorer locale={locale}/>
   <SecurityOperationsDesk locale={locale}/>

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

   <section className="expertise-section" id="expertise" aria-labelledby="expertise-title"><div className="container-xl"><Reveal className="section-heading"><span className="section-number light-number">{c.capabilitiesKicker}</span><div className="heading-row"><h2 id="expertise-title">{c.capabilitiesTitle}</h2><p>{c.capabilitiesSub}</p></div></Reveal><div className="capability-grid">{c.capabilities.map(cap=><Reveal key={cap.n}><article className="capability-card"><span className="cap-no">{cap.n}</span><h3>{cap.title}</h3><p>{cap.description}</p><span className="cap-tech">{cap.tech}</span></article></Reveal>)}</div><SkillEvidence locale={locale}/></div></section>

   <section className="engineering-method" aria-labelledby="engineering-method-title">
     <div className="container-xl">
       <Reveal className="method-heading"><span className="section-number">{engineeringMethod[locale].kicker}</span><h2 id="engineering-method-title">{engineeringMethod[locale].title}</h2><p>{engineeringMethod[locale].intro}</p></Reveal>
       <div className="method-grid">
         {engineeringMethod[locale].steps.map(step=><Reveal key={step.num}><article className="method-card"><div className="method-card-top"><strong>{step.num}</strong><span className="method-card-line"/></div><span className="method-tag">{step.tag}</span><h3>{step.title}</h3><p>{step.body}</p><span className="method-card-arrow" aria-hidden="true">↗</span></article></Reveal>)}
       </div>
     </div>
   </section>

   <section className="section service-section" id="services" aria-labelledby="services-title"><div className="container-xl"><Reveal className="section-heading"><span className="section-number">{c.servicesKicker}</span><div className="heading-row"><h2 id="services-title">{c.servicesTitle}</h2><p>{c.servicesSub}</p></div></Reveal><div className="services-grid">{c.services.map(service=><Reveal key={service.number}><article className="service-item"><span>{service.number}</span><ArrowUpRight size={22}/><h3>{service.title}</h3><p>{service.body}</p></article></Reveal>)}</div></div></section>

   <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container-xl"><Reveal><span className="section-number light-number">{c.contactKicker}</span><div className="contact-row"><div><h2 id="contact-title">{c.contactTitle}</h2><p>{c.contactBody}</p></div><a className="contact-circle" href={mailUrl} aria-label={c.emailMe}><ArrowUpRight size={52} strokeWidth={1.3}/></a></div></Reveal><div className="contact-bottom"><a href={mailUrl} className="email-address">zitanet44@gmail.com <ArrowUpRight size={20}/></a><a href={`tel:${phoneNumber}`} className="phone-address"><Phone size={18}/> {prettyPhoneNumber}</a><div className="socials"><a href="/contact/taha-zitane.vcf" download="taha-zitane.vcf" aria-label={locale==='ar'?'حفظ بطاقة الاتصال':locale==='fr'?'Enregistrer le contact':'Save contact'}><ContactRound size={18}/>{locale==='ar'?'حفظ الاتصال':locale==='fr'?'CONTACT':'SAVE CONTACT'}</a><a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github size={18}/> GITHUB</a><a href={linkedInUrl} target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> LINKEDIN</a></div></div></div></section>
  </main>
  <footer className="site-footer"><div className="container-xl"><span>© 2026 {locale==='ar'?'طه زيطان':'TAHA ZITANE'}</span><span>{c.footerNote}</span><a href="#top">BACK TO TOP <ArrowDown size={15}/></a></div></footer>
 </div>;
}
