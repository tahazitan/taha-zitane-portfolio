import type {Locale} from "@/data/content";
import TechnologyMarks from "./TechnologyMarks";
type RecordProof={scope:string;keywords:string[];technologies:string[];kind:string};
const en:RecordProof[]=[
 {scope:"SYSTEMS & NETWORKS / FREELANCE",kind:"VPS & CONFIGURATION",keywords:["VPS administration","Configuration review","Systems & networks","Remote support"],technologies:["Windows","Linux","AnyDesk"],},
 {scope:"HOSPITAL / INTERNSHIP",kind:"APPLICATION & LAN",keywords:["Enova Santé","User guidance","Connectivity","Escalation"],technologies:["Enova Santé"]},
 {scope:"TRAINING / PRACTICAL LABS",kind:"PACKET TRACER / TEACHING",keywords:["Cisco Packet Tracer","Routing & switching","Practical labs","Troubleshooting"],technologies:["Cisco Packet Tracer"]},
 {scope:"IT SUPPORT / ITSM",kind:"TICKETING WORKFLOW",keywords:["Ticket triage","Emailing platforms","Incident tracking","User support"],technologies:[]},
 {scope:"PHYSICAL SERVERS / INTERNSHIP",kind:"SYSTEMS & NETWORKS",keywords:["Windows Server","AD DS","DNS","File shares","LAN support"],technologies:["Windows Server","Cisco"]},
 {scope:"PUBLIC SECTOR / INTERNSHIP",kind:"ENDPOINT SUPPORT",keywords:["Workstations","Printer diagnosis","Software setup"],technologies:["Windows"]}
];
const fr:RecordProof[]=[
 {scope:"ADMINISTRATION / FREELANCE",kind:"VPS & CONFIGURATION",keywords:["Administration VPS","Revue de configurations","Systèmes & réseaux","Support distant"],technologies:["Windows","Linux","AnyDesk"]},
 {scope:"HÔPITAL / STAGE",kind:"APPLICATION & LAN",keywords:["Enova Santé","Aide utilisateurs","Connectivité","Escalade"],technologies:["Enova Santé"]},
 {scope:"FORMATION / TP",kind:"PACKET TRACER / TP",keywords:["Cisco Packet Tracer","Routage & commutation","Exercices pratiques","Diagnostic"],technologies:["Cisco Packet Tracer"]},
 {scope:"SUPPORT IT / ITSM",kind:"GESTION DE TICKETS",keywords:["Ticketing ITSM","Plateformes e-mail","Qualification","Suivi d’incident"],technologies:[]},
 {scope:"SERVEURS PHYSIQUES / STAGE",kind:"SYSTÈMES & RÉSEAUX",keywords:["Windows Server","AD DS","DNS","Partages","Support LAN"],technologies:["Windows Server","Cisco"]},
 {scope:"COLLECTIVITÉ / STAGE",kind:"SUPPORT POSTES",keywords:["Postes clients","Diagnostic imprimantes","Installation logiciels"],technologies:["Windows"]}
];
const ar:RecordProof[]=[
 {scope:"إدارة الأنظمة / عمل حر",kind:"خوادم وإعدادات",keywords:["إدارة VPS","مراجعة الإعدادات","الأنظمة والشبكات","الدعم عن بُعد"],technologies:["Windows","Linux","AnyDesk"]},
 {scope:"مستشفى / تدريب",kind:"دعم التطبيقات والشبكة",keywords:["Enova Santé","مساعدة المستخدمين","الاتصال","التصعيد"],technologies:["Enova Santé"]},
 {scope:"التكوين والتطبيقات",kind:"PACKET TRACER",keywords:["Cisco Packet Tracer","تمارين التوجيه والتبديل","تطبيق عملي","تشخيص الشبكات"],technologies:["Cisco Packet Tracer"]},
 {scope:"الدعم / ITSM",kind:"إدارة التذاكر",keywords:["نظام Ticketing","منصات البريد","تصنيف الحوادث","متابعة الحلول"],technologies:[]},
 {scope:"خوادم فعلية / تدريب",kind:"أنظمة وشبكات",keywords:["Windows Server","AD DS","DNS","مشاركة الملفات","LAN"],technologies:["Windows Server","Cisco"]},
 {scope:"مرفق عمومي / تدريب",kind:"صيانة الحواسيب",keywords:["الحواسيب","تشخيص الطابعات","تثبيت البرامج"],technologies:["Windows"]}
];
export default function ExperienceProof({index,locale}:{index:number;locale:Locale}){
 const e=({en,fr,ar} as const)[locale][index];if(!e)return null;
 return <div className="experience-proof"><span className="proof-context"><span className="proof-context-dot"/>{e.scope}</span>
 <div className="evidence-pills">{e.keywords.map((word,i)=><span key={word} className={"evidence-pill evidence-pill--"+i%4}>{word}</span>)}</div>
 {e.technologies.length?<TechnologyMarks technologies={e.technologies} variant="inline" limit={3}/>:<span className="proof-process-label">{e.kind}</span>}
 </div>
}
