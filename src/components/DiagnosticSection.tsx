"use client";
import {useState} from "react";
import {Activity,SearchCheck,FlaskConical,CheckCircle2,FileText,AlertTriangle,ArrowUpRight,Terminal,Network,MonitorCog,ShieldCheck} from "lucide-react";
import TechnologyMarks from "./TechnologyMarks";
import type {Locale} from "@/data/content";
type Scenario={title:string;issue:string;scope:string;tools:string[];sequence:string[]};
const translations={
 en:{kicker:"OPERATIONS / TROUBLESHOOTING",title:"Diagnose before you change.",intro:"A practical incident-analysis workflow. Select a scenario to see the checks and tools I would use. These are illustrative procedures, not claims of completed incidents.",label:"INCIDENT SIMULATOR",workflow:"DIAGNOSTIC PATH",tools:"TOOLS & COMMANDS",steps:["Identify","Isolate","Test","Validate","Document"],note:"Procedure example · no real customer systems or data",scenarios:[
 {title:"DNS / Identity",issue:"A workstation cannot resolve an internal resource.",scope:"Check scope, AD/DNS dependency and client resolver settings.",tools:["Windows Server","nslookup","ipconfig","DNS"],sequence:["Confirm affected users and domain scope","Compare client DNS settings and resolver reachability","Query A/SRV records and inspect DNS service","Confirm access after the approved fix","Record the root cause and escalation notes"]},
 {title:"DHCP / LAN",issue:"Clients receive APIPA or lose connectivity.",scope:"Distinguish DHCP pool failure from switch or VLAN reachability.",tools:["Cisco","DHCP","ipconfig","Wireshark"],sequence:["Identify impact by location and VLAN","Check physical link, gateway and DHCP path","Inspect lease, scope exhaustion and relay","Renew a test lease and confirm route","Document the configuration change"]},
 {title:"Endpoint / Support",issue:"A user reports a slow workstation or printer error.",scope:"Check scope, application logs, service and peripheral connectivity.",tools:["Windows","Event Viewer","AnyDesk","ping"],sequence:["Capture user symptoms and impact","Separate device, account and shared service issues","Check resources, queue and relevant logs","Retest the exact user workflow","Close with user confirmation and record"]},
 {title:"VPN / Firewall",issue:"An allowed site-to-site flow stops working.",scope:"Trace routes, security policies and IPsec negotiation in an isolated lab.",tools:["FortiGate","Palo Alto","Wireshark","IPsec"],sequence:["Identify impacted zones and flow","Check addressing, routes and tunnel peers","Inspect IKE/IPsec status, NAT and policy order","Test permitted and blocked traffic","Capture sanitized diagnostics and lessons"]}]},
 fr:{kicker:"EXPLOITATION / DIAGNOSTIC",title:"Diagnostiquer avant de modifier.",intro:"Une démarche opérationnelle structurée. Choisissez un incident pour voir les contrôles et outils pertinents. Il s'agit de procédures illustratives, pas de résultats d'interventions réelles.",label:"SCÉNARIOS DE DIAGNOSTIC",workflow:"MÉTHODE",tools:"OUTILS & COMMANDES",steps:["Identifier","Isoler","Tester","Valider","Documenter"],note:"Exemple de procédure · aucune donnée client réelle",scenarios:[
 {title:"DNS / Identité",issue:"Un poste ne résout pas une ressource interne.",scope:"Vérifier le périmètre, les dépendances AD/DNS et le résolveur.",tools:["Windows Server","nslookup","ipconfig","DNS"],sequence:["Confirmer l’étendue et les utilisateurs touchés","Comparer DNS du poste et connectivité","Interroger les enregistrements A/SRV et le service","Valider après correction autorisée","Documenter cause et transmission"]},
 {title:"DHCP / LAN",issue:"Les postes obtiennent une adresse APIPA.",scope:"Distinguer problème de pool DHCP et défaut de VLAN/commutation.",tools:["Cisco","DHCP","ipconfig","Wireshark"],sequence:["Identifier les VLAN et zones touchées","Vérifier lien, passerelle et chemin DHCP","Inspecter pool, bail et relais","Renouveler un bail test et confirmer l’accès","Documenter les modifications"]},
 {title:"Poste / Support",issue:"Poste lent ou erreur d'impression.",scope:"Contrôler l'application, les journaux et la connectivité des périphériques.",tools:["Windows","Event Viewer","AnyDesk","ping"],sequence:["Qualifier symptômes et impact","Isoler poste, compte ou service commun","Contrôler ressources, file et journaux","Rejouer le cas avec l’utilisateur","Documenter la résolution"]},
 {title:"VPN / Pare-feu",issue:"Un flux inter-sites autorisé ne passe plus.",scope:"Tracer le routage, les règles et IPsec dans un laboratoire isolé.",tools:["FortiGate","Palo Alto","Wireshark","IPsec"],sequence:["Délimiter flux et zones","Vérifier adresses, routes et pairs","Examiner IKE/IPsec, NAT et politiques","Tester flux autorisés et refusés","Conserver diagnostics anonymisés"]}]},
 ar:{kicker:"التشغيل / تشخيص الأعطال",title:"التشخيص قبل تغيير الإعدادات.",intro:"منهج عملي لتحليل الحوادث. اختر حالة لرؤية الفحوص والأدوات المقترحة. هذه أمثلة تعليمية وليست إثباتاً لحوادث تم حلها.",label:"حالات التشخيص",workflow:"مراحل التشخيص",tools:"الأدوات والأوامر",steps:["تحديد","عزل","اختبار","تحقق","توثيق"],note:"مثال توضيحي، بدون بيانات عملاء",scenarios:[
 {title:"DNS / الهوية",issue:"حاسوب لا يستطيع الوصول إلى اسم مورد داخلي.",scope:"تحديد نطاق العطل والاعتماد على AD/DNS.",tools:["Windows Server","nslookup","ipconfig","DNS"],sequence:["تحديد الأجهزة والمستخدمين المتأثرين","مقارنة DNS والاتصال","فحص سجلات DNS والخدمة","التحقق بعد التعديل المصرح به","توثيق السبب"]},
 {title:"DHCP / الشبكة",issue:"الحواسيب تحصل على APIPA.",scope:"التمييز بين عطل DHCP أو VLAN.",tools:["Cisco","DHCP","ipconfig","Wireshark"],sequence:["تحديد VLAN المتأثرة","فحص الربط والبوابة ومسار DHCP","التحقق من النطاق وrelay","إعادة طلب عنوان اختباري","توثيق النتائج"]},
 {title:"الدعم التقني",issue:"حاسوب بطيء أو طابعة لا تعمل.",scope:"فحص الجهاز والسجلات والاتصال.",tools:["Windows","Event Viewer","AnyDesk","ping"],sequence:["جمع الأعراض","عزل الجهاز أو الحساب أو الخدمة","فحص الموارد والطباعة والسجلات","إعادة اختبار طلب المستخدم","توثيق ما تم"]},
 {title:"VPN / جدار ناري",issue:"توقف اتصال مسموح بين موقعين.",scope:"تحليل المسارات والسياسات وIPsec ضمن مختبر.",tools:["FortiGate","Palo Alto","Wireshark","IPsec"],sequence:["تحديد المناطق والتدفق","فحص المسارات ونقاط VPN","مراجعة التفاوض وNAT والسياسات","اختبار المسموح والممنوع","حفظ أدلة منقحة"]}]}
} as const;
const stepIcons=[SearchCheck,Network,FlaskConical,CheckCircle2,FileText];
export default function DiagnosticSection({locale}:{locale:Locale}){
 const [active,setActive]=useState(0);const [selected,setSelected]=useState(0);
 const t=translations[locale],s=t.scenarios[active];
 return <section className="diagnostic-section" id="diagnostics" aria-labelledby="diagnostic-title"><div className="container-xl">
  <div className="section-heading"><span className="section-number">{t.kicker}</span><div className="heading-row"><h2 id="diagnostic-title">{t.title}</h2><p>{t.intro}</p></div></div>
  <div className="diagnostic-console"><div className="diagnostic-nav"><span className="diagnostic-micro"><Activity size={15}/>{t.label}</span>
   <div className="diagnostic-tabs" role="group" aria-label={t.label}>{t.scenarios.map((scenario,i)=><button key={scenario.title} type="button" aria-pressed={i===active} onClick={()=>{setActive(i);setSelected(0)}}>{scenario.title}<ArrowUpRight size={14}/></button>)}</div></div>
   <div className="diagnostic-content"><div className="diagnostic-situation">
    <span className="diagnostic-micro"><AlertTriangle size={15}/>TICKET / 0{active+1}</span><h3>{s.issue}</h3><p>{s.scope}</p>
    <span className="diagnostic-small-heading">{t.tools}</span>
    <div className="diagnostic-toolkit"><TechnologyMarks technologies={[...s.tools]} limit={5} variant="inline"/>{s.tools.map(tool=><span className="diagnostic-command" key={tool}>{tool}</span>)}</div>
   </div>
   <div className="diagnostic-steps"><span className="diagnostic-micro"><Terminal size={15}/>{t.workflow}</span><div className="diagnostic-step-track">{t.steps.map((step,i)=>{const Icon=stepIcons[i];return <button type="button" key={step} aria-current={i===selected?"step":undefined} onClick={()=>setSelected(i)}><Icon size={17}/><span>{step}</span></button>})}</div>
   <div className="diagnostic-step-detail"><span>0{selected+1} / 05</span><h4>{t.steps[selected]}</h4><p>{s.sequence[selected]}</p></div>
   <small>{t.note}</small></div></div>
  </div>
 </div></section>
}
