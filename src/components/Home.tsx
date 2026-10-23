import {ArrowUpRight,ArrowRight,MoveDown} from "lucide-react";
import Navigation from "./Navigation";
import Reveal from "./Reveal";
import LocaleSetup from "./LocaleSetup";
import LandingOverview from "./LandingOverview";
import FooterBrand from "./FooterBrand";
import TechnologyMarks from "./TechnologyMarks";
import {content,type Locale} from "@/data/content";
export default function Home({locale}:{locale:Locale}){
 const c=content[locale],rtl=locale==="ar";
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
      <TechnologyMarks technologies={["Windows Server","Cisco","Linux","Proxmox","FortiGate","Wazuh"]} limit={6} variant="hero"/>
      <div className="hero-actions"><a className="btn btn-primary" href={locale==="en"?"/projects/":`/${locale}/projects/`}>{locale==='fr'?'Voir les projets':locale==='ar'?'المشاريع التقنية':'View projects'}<ArrowUpRight size={18}/></a><a className="btn btn-text" href="#contact">{locale==='fr'?'Me contacter':locale==='ar'?'تواصل معي':'Get in touch'}<ArrowRight size={18}/></a></div>

    </div><div className="hero-visual">
       <div className="hero-schematic" aria-hidden="true"><svg viewBox="0 0 660 640" preserveAspectRatio="xMidYMid meet">
        <path className="schematic-guide" d="M65 166 H174 V75 H460 V158 H603 M56 452 H154 V563 H488 V461 H606"/>
        <path className="schematic-guide" d="M92 285 H150 V229 H511 V282 H586 M85 352 H188 V401 H474 V338 H594"/>
        <path className="schematic-route" d="M65 166 H174 V75 H460 V158 H603"/>
        <path className="schematic-route schematic-route--blue" d="M56 452 H154 V563 H488 V461 H606"/>
        <circle className="schematic-anchor" cx="65" cy="166" r="7"/><circle className="schematic-anchor" cx="603" cy="158" r="7"/>
        <circle className="schematic-anchor schematic-anchor--secondary" cx="56" cy="452" r="7"/><circle className="schematic-anchor schematic-anchor--secondary" cx="606" cy="461" r="7"/>
        <circle className="schematic-ring" cx="65" cy="166" r="22"/><circle className="schematic-ring" cx="603" cy="158" r="22"/>
       </svg></div>
       <div className="portrait-frame"><div className="portrait-image"><img className="portrait-photo" src="/images/taha-portrait.webp" alt={c.portraitAlt} width={630} height={900} fetchPriority="high" decoding="async" /></div><span className="portrait-vertical">{locale==='ar'?'طه زيطان — 2026':'TAHA / ZITANE — 2026'}</span></div>
       <div className="portrait-caption"><div><span className="image-number">{locale==='ar'?'شفشاون، المغرب':locale==='fr'?'Chefchaouen, Maroc':'Chefchaouen, Morocco'}</span><strong>{c.portraitLabel}</strong></div><span>{c.portraitCaption}</span></div>
    </div></div>
    <div className="hero-foot"><span><MoveDown size={14}/>{c.scroll}</span><div className="hero-foot-rule"/><span>{locale==='ar'?'البنية التحتية · التشغيل والدعم':locale==='fr'?'Infrastructure · Exploitation & support':'Infrastructure · Operations & support'}</span></div>
   </div></section>

   <section className="about-section" id="about" aria-labelledby="about-title"><div className="container-xl">
     <div className="about-grid">
      <Reveal><span className="section-number light-number">{c.aboutKicker}</span><h2 id="about-title">{c.aboutTitle}</h2></Reveal>
      <Reveal className="about-right" delay={.08}><p className="about-paragraph">{c.aboutBody}</p><div className="facts-grid">{c.profileFacts.map(f=><div key={f.label} className="fact"><span>{f.label}</span><strong>{f.value}</strong></div>)}</div></Reveal>
     </div>

   </div></section>

   <LandingOverview locale={locale}/>

   <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container-xl"><Reveal><span className="section-number light-number">{c.contactKicker}</span><div className="contact-row"><div><h2 id="contact-title">{c.contactTitle}</h2><p>{c.contactBody}</p><div className="contact-flow" aria-label={locale==="fr"?"Méthode de collaboration":locale==="ar"?"منهجية التعاون":"Collaboration workflow"}>{contactSteps.map((step,i)=><span key={step}>{i>0&&<ArrowRight size={15} aria-hidden="true"/>}<b>{step}</b></span>)}</div></div><a className="contact-circle" href={mailUrl} aria-label={c.emailMe}><ArrowUpRight size={52} strokeWidth={1.3}/></a></div></Reveal><div className="contact-bottom"><a href={mailUrl} className="email-address">zitanet44@gmail.com <ArrowUpRight size={20}/></a><a href={`tel:${phoneNumber}`} className="phone-address"><Phone size={18}/> {prettyPhoneNumber}</a><div className="socials"><a href="/contact/taha-zitane.vcf" download="taha-zitane.vcf" aria-label={locale==='ar'?'حفظ بطاقة الاتصال':locale==='fr'?'Enregistrer le contact':'Save contact'}><ContactRound size={18}/>{locale==='ar'?'حفظ الاتصال':locale==='fr'?'CONTACT':'SAVE CONTACT'}</a><a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github size={18}/> GITHUB</a><a href={linkedInUrl} target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> LINKEDIN</a></div></div></div></section>
  </main>
  <FooterBrand locale={locale}/>
 </div>;
}
