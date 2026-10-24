"use client";
import {useState} from "react";
import {Activity,ArrowUpRight,BookOpen,CheckCheck,ClipboardCheck,GraduationCap,LifeBuoy,Network,RadioTower,Server,ShieldCheck,Workflow} from "lucide-react";
import TechnologyMarks from "./TechnologyMarks";
import type {Locale} from "@/data/content";
type Section="projects"|"experience"|"education"|"expertise"|"services"|"contact";
type Node={label:string;detail:string;mark:string};
const icons={
 projects:[Network,ShieldCheck,Activity],
 experience:[LifeBuoy,Server,ClipboardCheck],
 education:[GraduationCap,BookOpen,Network],
 expertise:[Network,Server,ShieldCheck],
 services:[Workflow,RadioTower,CheckCheck],
 contact:[LifeBuoy,ClipboardCheck,Workflow]
};
const stories:Record<Locale,Record<Section,{kicker:string;title:string;caption:string;nodes:[Node,Node,Node]}>>={
 en:{
 projects:{kicker:"ENGINEERING VIEW / 01",title:"From the network edge to observability",caption:"Project architecture · illustrative engineering view",nodes:[{label:"Network fabric",detail:"VLANs, addressing and controlled traffic paths",mark:"Cisco"},{label:"Security gateway",detail:"Policy design, firewall zones and VPN flows",mark:"FortiGate"},{label:"Systems & insight",detail:"Virtual services, logs and analysis",mark:"Wazuh"}]},
 experience:{kicker:"OPERATIONS VIEW / 02",title:"Troubleshooting with clear handover",caption:"A generalized support workflow · not a customer incident record",nodes:[{label:"Understand the issue",detail:"Determine impact and reproduce symptoms",mark:"AnyDesk"},{label:"Inspect the system",detail:"Check connectivity, identity and server services",mark:"Windows Server"},{label:"Test and document",detail:"Verify behavior and write useful handover notes",mark:"Wireshark"}]},
 education:{kicker:"LEARNING VIEW / 03",title:"Theory connected to practice",caption:"Technical learning journey · not a certification claim",nodes:[{label:"Network foundations",detail:"Models, protocols and switching",mark:"Cisco"},{label:"System practice",detail:"Administration, commands and diagnosis",mark:"Linux"},{label:"Modern infrastructure",detail:"Containers, virtualization and isolation",mark:"Docker"}]},
 expertise:{kicker:"OPERATING MODEL / 04",title:"See the full dependency chain",caption:"Technical domains · conceptual relationships",nodes:[{label:"Network transport",detail:"Connectivity, segmentation and traffic analysis",mark:"Cisco"},{label:"Systems & identity",detail:"Compute, directory and access services",mark:"Windows Server"},{label:"Security operations",detail:"Event collection, investigation and monitoring",mark:"Wazuh"}]},
 services:{kicker:"DELIVERY VIEW / 05",title:"An accountable technical process",caption:"Illustrative process · every engagement requires authorization",nodes:[{label:"Assess the scope",detail:"Understand the environment and access limits",mark:"AnyDesk"},{label:"Fix the right issue",detail:"Implement targeted, authorized technical changes",mark:"Linux"},{label:"Verify the result",detail:"Test, document and communicate outcomes",mark:"Wireshark"}]},
 contact:{kicker:"COLLABORATION VIEW / 06",title:"One clear path from issue to solution",caption:"Collaboration flow · scope agreed before access",nodes:[{label:"Describe your issue",detail:"Share the symptom, context and goal",mark:""},{label:"Agree on scope",detail:"Set boundaries, access and expected deliverables",mark:""},{label:"Coordinate the work",detail:"Plan troubleshooting and handover together",mark:""}]}
 },
 fr:{
 projects:{kicker:"VUE INGÉNIERIE / 01",title:"Du réseau jusqu'à la supervision",caption:"Vue d'architecture illustrative",nodes:[{label:"Infrastructure réseau",detail:"VLAN, adressage et cheminement contrôlé",mark:"Cisco"},{label:"Passerelle de sécurité",detail:"Politiques, zones et flux VPN",mark:"FortiGate"},{label:"Systèmes & visibilité",detail:"Services virtuels, journaux et analyses",mark:"Wazuh"}]},
 experience:{kicker:"VUE EXPLOITATION / 02",title:"Du diagnostic à la transmission",caption:"Méthode illustrative · aucune donnée client",nodes:[{label:"Comprendre le problème",detail:"Mesurer l'impact et reproduire l'anomalie",mark:"AnyDesk"},{label:"Examiner le système",detail:"Connectivité, identité et services",mark:"Windows Server"},{label:"Vérifier et documenter",detail:"Tester le résultat et préparer la transmission",mark:"Wireshark"}]},
 education:{kicker:"PARCOURS / 03",title:"Relier théorie et travaux pratiques",caption:"Parcours d'apprentissage · pas une attestation",nodes:[{label:"Fondamentaux réseau",detail:"Modèles, protocoles et commutation",mark:"Cisco"},{label:"Pratique systèmes",detail:"Administration, commandes et diagnostic",mark:"Linux"},{label:"Infrastructure moderne",detail:"Conteneurs, virtualisation et isolation",mark:"Docker"}]},
 expertise:{kicker:"MODÈLE TECHNIQUE / 04",title:"Comprendre les dépendances",caption:"Domaines techniques · liens conceptuels",nodes:[{label:"Transport réseau",detail:"Connectivité, segmentation et analyse",mark:"Cisco"},{label:"Systèmes & identité",detail:"Serveurs, annuaire et accès",mark:"Windows Server"},{label:"Opérations de sécurité",detail:"Collecte des événements et supervision",mark:"Wazuh"}]},
 services:{kicker:"MÉTHODE / 05",title:"Un processus technique responsable",caption:"Méthode illustrative · intervention autorisée",nodes:[{label:"Qualifier le besoin",detail:"Comprendre le contexte et les accès",mark:"AnyDesk"},{label:"Corriger avec méthode",detail:"Appliquer les changements validés",mark:"Linux"},{label:"Vérifier le résultat",detail:"Tester, documenter et communiquer",mark:"Wireshark"}]},
 contact:{kicker:"COLLABORATION / 06",title:"Du besoin à la solution adaptée",caption:"Parcours de collaboration · périmètre défini",nodes:[{label:"Décrire le besoin",detail:"Contexte, symptômes et objectif",mark:""},{label:"Définir le périmètre",detail:"Accès, limites et livrables",mark:""},{label:"Organiser le travail",detail:"Diagnostic et transmission claire",mark:""}]}
 },
 ar:{
 projects:{kicker:"المشاريع الهندسية / 01",title:"من الشبكات إلى المراقبة والتحليل",caption:"تصور هندسي توضيحي وليس نشرًا إنتاجيًا",nodes:[{label:"البنية الشبكية",detail:"تقسيم الشبكات والعناوين ومسارات البيانات",mark:"Cisco"},{label:"بوابة الحماية",detail:"السياسات الأمنية ومناطق الشبكة والـVPN",mark:"FortiGate"},{label:"الأنظمة والمراقبة",detail:"الخدمات والسجلات والتحليل",mark:"Wazuh"}]},
 experience:{kicker:"الخبرات العملية / 02",title:"التشخيص ثم التحقق والتوثيق",caption:"منهجية توضيحية دون بيانات عملاء حقيقية",nodes:[{label:"فهم المشكلة",detail:"تحديد التأثير وإعادة إنتاج العطل",mark:"AnyDesk"},{label:"فحص النظام",detail:"الاتصال والهوية والخدمات",mark:"Windows Server"},{label:"التحقق والتوثيق",detail:"اختبار النتيجة وتوثيق الإجراءات",mark:"Wireshark"}]},
 education:{kicker:"التكوين والتعلم / 03",title:"ربط المعرفة النظرية بالتطبيق",caption:"مسار تعليمي لا يشير إلى شهادات غير محققة",nodes:[{label:"أساسيات الشبكات",detail:"النماذج والبروتوكولات والتبديل",mark:"Cisco"},{label:"التطبيق على الأنظمة",detail:"الإدارة والأوامر والتشخيص",mark:"Linux"},{label:"البنية الحديثة",detail:"الحاويات والافتراضية والعزل",mark:"Docker"}]},
 expertise:{kicker:"المجالات التقنية / 04",title:"فهم ترابط الخدمات والأنظمة",caption:"علاقات هندسية توضيحية بين التخصصات",nodes:[{label:"نقل البيانات",detail:"الاتصال والتقسيم وتحليل حركة الشبكة",mark:"Cisco"},{label:"الأنظمة والهوية",detail:"الخوادم والدليل وإدارة الوصول",mark:"Windows Server"},{label:"العمليات الأمنية",detail:"تجميع الأحداث والتحليل والمراقبة",mark:"Wazuh"}]},
 services:{kicker:"منهجية العمل / 05",title:"خطوات دقيقة ومسؤولية مهنية",caption:"عملية توضيحية وكل تدخل يحتاج إلى تصريح",nodes:[{label:"تحديد الاحتياج",detail:"فهم البيئة ونطاق الصلاحيات",mark:"AnyDesk"},{label:"معالجة المشكلة",detail:"تنفيذ التعديلات التقنية المصرح بها",mark:"Linux"},{label:"التحقق من الحل",detail:"الاختبار والتوثيق والتواصل",mark:"Wireshark"}]},
 contact:{kicker:"التعاون التقني / 06",title:"مسار واضح من المشكلة إلى الحل",caption:"نطاق التعاون يُتفق عليه قبل الوصول للأنظمة",nodes:[{label:"شرح الاحتياج",detail:"طبيعة المشكلة والسياق والهدف",mark:""},{label:"تحديد النطاق",detail:"الصلاحيات والحدود والمخرجات",mark:""},{label:"تنسيق العمل",detail:"وضع خطة التشخيص والتوثيق",mark:""}]}
 }
};
export default function SectionHeroVisual({locale,section}:{locale:Locale;section:Section}){
 const [selected,setSelected]=useState(0);
 const t=stories[locale][section];
 return <div className={"domain-visual domain-visual--"+section} dir={locale==="ar"?"rtl":"ltr"} aria-label={t.title}>
  <div className="domain-visual-top"><span className="domain-signal"><RadioTower size={17}/>{t.kicker}</span><span>0{selected+1}/03</span></div>
  <h2 className="domain-visual-title">{t.title}</h2>
  <div className="domain-node-map" role="group" aria-label={t.title}>
   {t.nodes.map((n,i)=>{const Icon=icons[section][i];return <button type="button" className={"domain-node "+(selected===i?"is-active":"")} onClick={()=>setSelected(i)} aria-pressed={selected===i} key={n.label} aria-label={n.label}>
    <span className="domain-node-plate">{n.mark?<TechnologyMarks technologies={[n.mark]} limit={1} variant="mini"/>:<Icon size={28}/>}<Icon className="domain-overlay-glyph" size={13}/><span className="domain-led"/></span>
    <span className="domain-node-label">{n.label}</span>
    {i!==2&&<span className="domain-node-link" aria-hidden="true"/>}
   </button>})}
  </div>
  <div className="domain-selected" aria-live="polite"><span className="domain-selected-num">0{selected+1} / FOCUS</span><p key={selected}>{t.nodes[selected].detail}</p><TechnologyMarks technologies={[t.nodes[selected].mark]} limit={1} variant="inline"/><ArrowUpRight className="domain-selected-arrow" size={17}/></div>
  <div className="domain-visual-foot"><span><Activity size={15}/>{t.caption}</span><span>TAHA / ZITANE</span></div>
 </div>;
}