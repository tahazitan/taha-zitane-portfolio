import Link from "next/link";
import {ArrowUpRight,BriefcaseBusiness,FolderGit2,Terminal,ExternalLink} from "lucide-react";
import {githubUrl,linkedInUrl,type Locale} from "@/data/content";

const copy={
 en:{
  overline:"INTERNATIONAL REMOTE CAREER",heading:"Built for the work behind reliable IT.",intro:"I bring practical IT support experience, systems and networking education, and documented infrastructure labs to remote technical teams. I am exploring international remote employment and contractor opportunities from Morocco.",
  roles:"ROLES I AM TARGETING",items:[
   {name:"IT Support / Technical Support",detail:"Remote troubleshooting, Windows endpoints, user access and connectivity."},
   {name:"Systems & Network Administration",detail:"Windows Server, Active Directory, DNS, DHCP and network operations."},
   {name:"Cloud & Infrastructure Support",detail:"Building on systems fundamentals through Linux, automation and cloud learning."}
  ],real:"PROFESSIONAL EXPERIENCE",realBody:"Work, internships, support assignments and teaching are recorded separately from independent technical practice.",lab:"HAND-ON ENGINEERING LABS",labBody:"Lab pages document configurations, test plans and observed evidence as each project progresses.",experience:"Experience",projects:"Technical projects",linkedin:"LinkedIn profile",github:"GitHub evidence"
 },
 fr:{
  overline:"CARRIÈRE INTERNATIONALE À DISTANCE",heading:"Une expertise orientée vers les opérations IT.",intro:"J'associe une expérience pratique en support informatique, une formation en systèmes et réseaux et des laboratoires d'infrastructure documentés. Je m'intéresse aux postes internationaux à distance et aux collaborations contractuelles depuis le Maroc.",
  roles:"POSTES CIBLÉS",items:[
   {name:"Support IT / Support technique",detail:"Dépannage à distance, postes Windows, accès utilisateurs et connectivité."},
   {name:"Administration systèmes & réseaux",detail:"Windows Server, Active Directory, DNS, DHCP et exploitation réseau."},
   {name:"Support Cloud & Infrastructure",detail:"Progression en Linux, automatisation et cloud à partir des fondamentaux systèmes."}
  ],real:"EXPÉRIENCE PROFESSIONNELLE",realBody:"Expériences, stages, missions de support et enseignement sont distincts des projets personnels.",lab:"LABORATOIRES TECHNIQUES",labBody:"Les projets présentent leurs configurations, scénarios de test et preuves observées au fil de leur réalisation.",experience:"Expérience",projects:"Projets techniques",linkedin:"Profil LinkedIn",github:"Preuves sur GitHub"
 },
 ar:{
  overline:"المسار المهني الدولي عن بُعد",heading:"كفاءات عملية لدعم الأنظمة والبنية التحتية.",intro:"أجمع بين الخبرة العملية في الدعم التقني والتكوين في الأنظمة والشبكات والمختبرات التقنية الموثقة. أستهدف فرص العمل والتعاقد التقني الدولي عن بُعد انطلاقاً من المغرب.",
  roles:"المناصب المستهدفة",items:[
   {name:"الدعم التقني / الدعم الفني",detail:"تشخيص مشكلات Windows والوصول والحسابات والاتصال عن بُعد."},
   {name:"إدارة الأنظمة والشبكات",detail:"Windows Server وActive Directory وDNS وDHCP وتشغيل الشبكات."},
   {name:"دعم السحابة والبنية التحتية",detail:"تطوير الكفاءات في Linux والأتمتة والحوسبة السحابية."}
  ],real:"الخبرة المهنية",realBody:"تُعرض الخبرات والتداريب ومهام الدعم والتدريس بشكل منفصل عن المشاريع التطبيقية.",lab:"المختبرات التقنية",labBody:"توثّق المشاريع الإعدادات وخطط الاختبار والأدلة العملية تبعاً لتقدم إنجازها.",experience:"الخبرة المهنية",projects:"المشاريع التقنية",linkedin:"الملف على LinkedIn",github:"الأدلة على GitHub"
 }
} as const;

export default function CareerFocus({locale}:{locale:Locale}){
 const c=copy[locale],prefix=locale==="en"?"":"/"+locale;
 return <section className="career-focus" id="career-focus" aria-labelledby="career-focus-title" dir={locale==="ar"?"rtl":"ltr"}>
  <div className="container-xl">
   <div className="career-focus-head"><div><span className="career-focus-overline"><BriefcaseBusiness size={15} aria-hidden="true"/>{c.overline}</span><h2 id="career-focus-title">{c.heading}</h2></div><p>{c.intro}</p></div>
   <div className="career-focus-roles"><div className="career-focus-roles-label">{c.roles}</div>{c.items.map((role,i)=><article key={role.name} className="career-focus-role"><span>{String(i+1).padStart(2,"0")}</span><div><h3>{role.name}</h3><p>{role.detail}</p></div></article>)}</div>
   <div className="career-focus-proof">
    <div><BriefcaseBusiness size={21} aria-hidden="true"/><span>{c.real}</span><p>{c.realBody}</p><Link href={prefix+"/experience/"}>{c.experience}<ArrowUpRight size={16}/></Link></div>
    <div><Terminal size={21} aria-hidden="true"/><span>{c.lab}</span><p>{c.labBody}</p><Link href={prefix+"/projects/"}>{c.projects}<ArrowUpRight size={16}/></Link></div>
   </div>
   <div className="career-focus-links"><a href={linkedInUrl} target="_blank" rel="noopener noreferrer">{c.linkedin}<ExternalLink size={15}/></a><a href={githubUrl} target="_blank" rel="noopener noreferrer"><FolderGit2 size={16}/>{c.github}</a></div>
  </div>
 </section>;
}
