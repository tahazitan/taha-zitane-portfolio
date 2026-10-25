import Link from "next/link";
import {ArrowUpRight, ArrowLeft, Mail, Phone, Github, Linkedin, ShieldCheck, Layers3} from "lucide-react";
import Navigation from "./Navigation";
import SectionHeroVisual from "./SectionHeroVisual";
import LocaleSetup from "./LocaleSetup";
import FooterBrand from "./FooterBrand";
import Reveal from "./Reveal";
import ProjectExplorer from "./ProjectExplorer";
import ExperienceVisual from "./ExperienceVisual";
import ExperienceProof from "./ExperienceProof";
import CapabilityVisual from "./CapabilityVisual";
import TechnologyMarks from "./TechnologyMarks";
import ServiceVisual from "./ServiceVisual";
import DiagnosticSection from "./DiagnosticSection";
import {professional} from "@/data/professional";
import {content,homePath,githubUrl,linkedInUrl,mailUrl,phoneNumber,prettyPhoneNumber,type Locale} from "@/data/content";

export type SectionKey="projects"|"experience"|"education"|"expertise"|"services"|"contact";
const details={
 en:{
  projects:["PROJECTS / ENGINEERING","Infrastructure, explained.","Architectures, practical labs and technical work, with diagrams, implementation choices and reproducible validation criteria.","Explore every system behind the design."],
  experience:["PROFESSIONAL JOURNEY","Experience in context.","Systems operations, freelance administration, network support and practical instruction — each role linked to relevant technologies.","Work completed in professional environments."],
  education:["EDUCATION & TRAINING","The foundation of the work.","Academic studies, technical specialization and ongoing training, presented as two clear timelines.","Technical education and continuous learning."],
  expertise:["TECHNICAL EXPERTISE","Know the system. Trace the fault.","Network infrastructure, operating systems and security operations with a diagnosis-first mindset.","Capabilities organized by engineering domain."],
  services:["IT / CYBERSECURITY SERVICES","Clear scope. Dependable delivery.","Professional IT support, VPS administration, infrastructure configuration and technical security reviews for businesses and remote clients.","A technical partner for systems and networks."],
  contact:["CONTACT / COLLABORATE","Let's solve the right problem.","Share your environment, your challenge and the expected outcome. We can agree on scope, access and documentation before work begins.","Remote projects and technical collaboration."]
 },
 fr:{
  projects:["PROJETS / INGÉNIERIE","L'infrastructure en détail.","Architectures, travaux pratiques et études techniques avec schémas, choix d'implémentation et critères de validation.","Explorez la logique derrière chaque réseau."],
  experience:["PARCOURS PROFESSIONNEL","L'expérience en contexte.","Administration freelance, support réseau, exploitation systèmes et formation pratique, avec les outils propres à chaque mission.","Interventions dans des environnements professionnels."],
  education:["FORMATION / ÉTUDES","Les bases de la pratique.","Études universitaires, spécialisation technique et formation continue au sein de deux parcours chronologiques.","Études académiques et perfectionnement."],
  expertise:["EXPERTISE TECHNIQUE","Comprendre avant de modifier.","Infrastructures réseau, systèmes et sécurité, avec une approche fondée sur le diagnostic.","Des compétences structurées par domaine."],
  services:["SERVICES IT / CYBERSÉCURITÉ","Des missions claires. Un vrai suivi.","Support informatique, administration VPS, configuration systèmes et réseaux, et revue technique de sécurité pour les entreprises et les clients distants.","Votre partenaire pour l'infrastructure technique."],
  contact:["CONTACT / COLLABORATION","Parlons de votre besoin.","Présentez votre environnement, la difficulté et l'objectif. Nous définirons le périmètre, les accès et la documentation.","Projets à distance et collaboration technique."]
 },
 ar:{
  projects:["المشاريع / الهندسة","البنية التحتية بكل تفاصيلها.","تصاميم ومختبرات وأعمال تقنية مع مخططات الشبكات وخيارات التنفيذ ومعايير التحقق.","استكشف الجانب الهندسي وراء كل تصميم."],
  experience:["المسار المهني","خبرة تقنية في سياقها.","إدارة الأنظمة والشبكات والعمل الحر والدعم التقني والتكوين التطبيقي، مع أدوات كل تجربة ومجالها.","مهام وتجارب ضمن بيئات مهنية."],
  education:["التعليم / التكوين","المعرفة أساس الممارسة.","الدراسات الأكاديمية والتخصص التقني والتكوين المستمر ضمن مسارين واضحين ومتناسقين.","دراسة أكاديمية وتطوير مهني مستمر."],
  expertise:["التخصصات التقنية","افهم النظام قبل تغيير إعداداته.","بنية الشبكات وإدارة الأنظمة والأمن السيبراني بمنهج يرتكز على التشخيص والتحليل.","كفاءات موزعة حسب المجالات الهندسية."],
  services:["خدمات المعلوماتية والأمن السيبراني","مهام واضحة. تنفيذ منهجي.","الدعم التقني وإدارة الخوادم الافتراضية وتهيئة الأنظمة والشبكات ومراجعة الإعدادات الأمنية للشركات والعملاء عن بُعد.","شريك تقني لإدارة الأنظمة والشبكات."],
  contact:["التواصل / التعاون","لنتحدث عن احتياجك.","أخبرني بطبيعة بيئتك التقنية والمشكلة والنتيجة المطلوبة. نحدد نطاق المهمة والصلاحيات والتوثيق قبل البدء.","مشاريع عن بُعد وتعاون مهني."]
 }
} as const;
const serviceTools=[["AnyDesk","Windows"],["Microsoft","Windows Server","Linux","Proxmox"],["Wireshark","Wazuh","FortiGate","Palo Alto"],["Cisco","GNS3","Windows Server","Linux"]];
const marks={"2024 — 2025":{logo:"emsi",name:"EMSI",city:"TANGER"},"2020 — 2022":{logo:"ofppt",name:"OFPPT / ISMO",city:"TÉTOUAN"},"2019 — 2020":{logo:"university",name:"UNIVERSITÉ ABDELMALEK ESSAÂDI",city:"FACULTÉ DES SCIENCES"},"2019":{logo:"ministry",name:"LYCÉE AL-KHAWARIZMI",city:"CHEFCHAOUEN"}} as const;
const route=(locale:Locale,section:SectionKey)=>`${locale==="en"?"":"/"+locale}/${section}/`;
export default function SectionPage({locale,section}:{locale:Locale;section:SectionKey}){
 const c=content[locale],p=professional[locale],t=details[locale][section],rtl=locale==="ar";
 const companyLine=locale==="fr"?"ENTREPRISES · INDÉPENDANTS · MISSIONS À DISTANCE":locale==="ar"?"الشركات · العملاء · المهام عن بُعد":"BUSINESSES · CLIENTS · REMOTE MISSIONS";
 return <div className={`page-shell detail-site section-site section-site--${section} ${rtl?"rtl":""}`} dir={rtl?"rtl":"ltr"}>
  <LocaleSetup locale={locale}/>
  <Navigation locale={locale} section={section}/>
  <main>
   <section className="detail-hero" id="top"><div className="container-xl detail-hero-inner">
    <div className="detail-headerline"><span>{t[0]}</span><span>{rtl?"طه زيطان":"TAHA ZITANE"} / {c.nav[["projects","experience","education","expertise","services","contact"].indexOf(section)]}</span></div>
    <div className="detail-hero-body"><div><h1>{t[1]}</h1><p>{t[2]}</p><Link className="detail-back" href={homePath(locale)}><ArrowLeft size={17}/>{locale==="fr"?"Accueil":rtl?"الرئيسية":"Home"}</Link></div>
    <SectionHeroVisual section={section} locale={locale}/></div>
   </div></section>
   {section==="projects"&&<section id="work" className="section work-section"><div className="container-xl">
    <div className="detail-section-caption"><span>{locale==="fr"?"01 / PROJETS TECHNIQUES":rtl?"٠١ / المشاريع التقنية":"01 / ENGINEERING PORTFOLIO"}</span><span>{c.projects.length} {locale==="fr"?"ÉTUDES DE CAS":rtl?"دراسات تقنية":"CASE STUDIES"}</span></div>
    <ProjectExplorer locale={locale} projects={c.projects}/>
   </div></section>}
   {section==="experience"&&<section id="experience" className="section experience-section"><div className="container-xl">
    <div className="experience-list">{c.experience.map((exp,i)=><Reveal key={i}><article className="experience-item experience-item--visual"><span className="experience-period">{exp.period}</span><div className="experience-detail"><h2>{exp.position}</h2><p>{exp.organisation}</p><ExperienceProof index={i} locale={locale}/></div><div className="experience-media"><ExperienceVisual index={i} locale={locale}/></div><p className="experience-desc">{exp.details}</p></article></Reveal>)}</div>
   </div></section>}
   {section==="education"&&<section id="education" className="section education-section"><div className="container-xl">
    <div className="education-grid">
     <Reveal><h2>{p.studyTitle}</h2><div className="study-list">{p.studies.map(item=>{const m=marks[item.year as keyof typeof marks];return <article className="study-item" key={item.year}><small>{item.year}</small><div className="study-body"><div className="institution-head"><span className={`institution-crest institution-crest--${m.logo}`} role="img" aria-label={m.name}/><span className="institution-name">{m.name}<small>{rtl?{"TANGER":"طنجة","TÉTOUAN":"تطوان","FACULTÉ DES SCIENCES":"كلية العلوم","CHEFCHAOUEN":"شفشاون"}[m.city]||m.city:m.city}</small></span></div><h3>{item.title}</h3><p>{item.detail}</p></div></article>})}</div></Reveal>
     <Reveal delay={.08}><h2>{p.trainingTitle}</h2><ol className="training-list training-timeline">{p.courses.map((item,i)=><li className="training-item" key={item.name}><span className="training-index" aria-hidden="true">{String(i+1).padStart(2,"0")}</span><div className="training-details"><strong>{item.name}</strong><span>{item.provider}</span><TechnologyMarks technologies={[item.provider]} limit={1}/></div><small>{item.kind}</small></li>)}</ol></Reveal>
    </div>
   </div></section>}
   {section==="expertise"&&<><section id="expertise" className="expertise-section section"><div className="container-xl"><div className="capability-grid">{c.capabilities.map((cap,i)=><Reveal key={cap.n}><article className="capability-card"><span className="cap-no">{cap.n}</span><CapabilityVisual index={i} locale={locale} label={cap.title}/><h2>{cap.title}</h2><p>{cap.description}</p><TechnologyMarks technologies={[cap.tech]} limit={5}/></article></Reveal>)}</div></div></section><DiagnosticSection locale={locale}/></>}
   {section==="services"&&<><section id="services" className="section service-section"><div className="container-xl">
     <div className="services-intro"><ShieldCheck size={22}/><span>{companyLine}</span><p>{locale==="fr"?"Périmètre défini, revue technique, intervention autorisée et compte rendu clair.":rtl?"نطاق عمل محدد، مراجعة تقنية، صلاحيات مصرح بها، وتوثيق واضح.":"Defined scope, authorized changes, practical diagnosis and clear technical handover."}</p></div>
     <div className="services-grid">{c.services.map((s,i)=><Reveal key={s.number}><article className="service-item"><span className="service-number">{s.number}</span><ServiceVisual index={i} locale={locale} title={s.title}/><h2>{s.title}</h2><p>{s.body}</p><div className="service-tool-strip"><TechnologyMarks technologies={serviceTools[i]} limit={4}/></div><a className="service-action" href={mailUrl}>{c.emailMe}<ArrowUpRight size={16}/></a></article></Reveal>)}</div>
    </div></section>
    <section className="process-section"><div className="container-xl"><span className="section-number">WORKFLOW / 01—04</span><h2>{locale==="fr"?"Une collaboration transparente":rtl?"منهجية تعاون واضحة":"A practical collaboration process"}</h2><div className="process-steps">{(locale==="fr"?["Analyse du besoin","Diagnostic & périmètre","Intervention autorisée","Validation & documentation"]:rtl?["فهم الاحتياج","التشخيص وتحديد النطاق","التنفيذ المصرّح به","التحقق والتوثيق"]:["Discovery","Diagnosis & scope","Authorized implementation","Validation & handover"]).map((s,i)=><div key={s}><span>0{i+1}</span><strong>{s}</strong></div>)}</div></div></section></>}
   {section==="contact"&&<section id="contact" className="contact-detail-section"><div className="container-xl"><div className="contact-detail-grid"><div><span className="section-number">{locale==="fr"?"CONTACT":rtl?"التواصل":"REACH OUT"}</span><h2>{locale==="fr"?"Construisons une solution adaptée.":rtl?"لنحدد الحل التقني المناسب.":"Start with the problem. Build the solution."}</h2><p>{c.contactBody}</p><a href={mailUrl} className="contact-big-email">{locale==="ar"?"راسلني":locale==="fr"?"Écrivez-moi":"Email me"}<ArrowUpRight size={22}/></a></div><div className="contact-route-list"><a href={mailUrl}><Mail size={20}/>zitanet44@gmail.com<ArrowUpRight size={16}/></a><a href={`tel:${phoneNumber}`}><Phone size={20}/>{prettyPhoneNumber}</a><a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github size={20}/>GitHub<ArrowUpRight size={16}/></a><a href={linkedInUrl} target="_blank" rel="noopener noreferrer"><Linkedin size={20}/>LinkedIn<ArrowUpRight size={16}/></a></div></div></div></section>}
   {section!=="contact"&&<section className="detail-next"><div className="container-xl"><div><span className="section-number">{locale==="fr"?"ÉTAPE SUIVANTE / COLLABORER":rtl?"الخطوة التالية / التعاون":"NEXT / COLLABORATE"}</span><h2>{locale==="fr"?"Un projet ou un besoin technique ?":rtl?"عندك مشروع أو احتياج تقني؟":"Have a technical challenge?"}</h2><p>{c.contactBody}</p></div><Link className="btn btn-primary" href={route(locale,"contact")}>{c.emailMe}<ArrowUpRight size={18}/></Link></div></section>}
  </main>
  <FooterBrand locale={locale}/>
 </div>;
}
