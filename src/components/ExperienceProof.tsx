import type {Locale} from "@/data/content";
import TechnologyMarks from "./TechnologyMarks";
import {ClipboardCheck,Shield,Router,Headphones,TicketCheck,GraduationCap} from "lucide-react";
type RecordProof={scope:string;keywords:string[];technologies:string[];kind:string};
const en:RecordProof[]=[
 {scope:"REMOTE SUPPORT / FREELANCE",kind:"USER OPERATIONS",keywords:["Windows support","LAN / Wi-Fi","Remote diagnosis","Peripherals"],technologies:["Windows","AnyDesk"],},
 {scope:"HOSPITAL / INTERNSHIP",kind:"APPLICATION & LAN",keywords:["Enova Santé","User guidance","Connectivity","Escalation"],technologies:["Enova Santé"]},
 {scope:"TRAINING / PRACTICAL LABS",kind:"KNOWLEDGE TRANSFER",keywords:["Networking labs","Systems basics","Hands-on exercises","Troubleshooting"],technologies:[]},
 {scope:"IT SUPPORT / ITSM",kind:"INCIDENT WORKFLOW",keywords:["Ticket triage","Emailing platforms","Incident follow-up","User support"],technologies:[]},
 {scope:"PHYSICAL SERVERS / INTERNSHIP",kind:"SYSTEMS & NETWORKS",keywords:["Windows Server","AD DS","DNS","File shares","LAN support"],technologies:["Windows Server","Cisco"]},
 {scope:"PUBLIC SECTOR / INTERNSHIP",kind:"ENDPOINT SUPPORT",keywords:["Workstations","Printer diagnosis","Software setup"],technologies:[]}
];
const fr:RecordProof[]=[
 {scope:"SUPPORT À DISTANCE / FREELANCE",kind:"SUPPORT UTILISATEUR",keywords:["Support Windows","LAN / Wi-Fi","Diagnostic distant","Périphériques"],technologies:["Windows","AnyDesk"]},
 {scope:"HÔPITAL / STAGE",kind:"APPLICATION & LAN",keywords:["Enova Santé","Aide utilisateurs","Connectivité","Escalade"],technologies:["Enova Santé"]},
 {scope:"FORMATION / TP",kind:"TRANSMISSION",keywords:["TP réseaux","Bases systèmes","Exercices pratiques","Diagnostic"],technologies:[]},
 {scope:"SUPPORT IT / ITSM",kind:"TRAITEMENT D'INCIDENTS",keywords:["Qualification tickets","Emailing","Suivi d’incident","Support"],technologies:[]},
 {scope:"SERVEURS PHYSIQUES / STAGE",kind:"SYSTÈMES & RÉSEAUX",keywords:["Windows Server","AD DS","DNS","Partages","Support LAN"],technologies:["Windows Server","Cisco"]},
 {scope:"COLLECTIVITÉ / STAGE",kind:"SUPPORT POSTES",keywords:["Postes clients","Imprimantes","Installation logiciels"],technologies:[]}
];
const ar:RecordProof[]=[
 {scope:"دعم عن بُعد / مستقل",kind:"دعم المستخدمين",keywords:["Windows","شبكات LAN / Wi-Fi","تشخيص عن بُعد","ملحقات الحاسوب"],technologies:["Windows","AnyDesk"]},
 {scope:"مستشفى / تدريب",kind:"دعم التطبيقات والشبكة",keywords:["Enova Santé","مساعدة المستخدمين","الاتصال","التصعيد"],technologies:["Enova Santé"]},
 {scope:"تكوين وتطبيقات",kind:"تأطير تقني",keywords:["تمارين الشبكات","أساسيات الأنظمة","تطبيق عملي","تشخيص"],technologies:[]},
 {scope:"الدعم / ITSM",kind:"تدبير الحوادث",keywords:["تذاكر الدعم","منصات البريد","متابعة الحوادث","المستخدمون"],technologies:[]},
 {scope:"خوادم فعلية / تدريب",kind:"أنظمة وشبكات",keywords:["Windows Server","AD DS","DNS","مشاركة الملفات","LAN"],technologies:["Windows Server","Cisco"]},
 {scope:"مرفق عمومي / تدريب",kind:"صيانة الحواسيب",keywords:["الحواسيب","الطابعات","البرامج"],technologies:[]}
];
export default function ExperienceProof({index,locale}:{index:number;locale:Locale}){
 const e=({en,fr,ar} as const)[locale][index];if(!e)return null;
 return <div className="experience-proof"><span className="proof-context"><span className="proof-context-dot"/>{e.scope}</span>
 <div className="evidence-pills">{e.keywords.map((word,i)=><span key={word} className={"evidence-pill evidence-pill--"+i%4}>{word}</span>)}</div>
 {e.technologies.length?<TechnologyMarks technologies={e.technologies} variant="inline" limit={3}/>:<span className="proof-process-label">{e.kind}</span>}
 </div>
}
