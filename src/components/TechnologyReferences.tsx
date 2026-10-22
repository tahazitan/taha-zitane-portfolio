import {ArrowUpRight,BookOpen,ExternalLink} from "lucide-react";
import type {Locale} from "@/data/content";

type Copy={en:string;fr:string;ar:string};
type Reference={name:string;category:string;topic:Copy;summary:Copy;url:string};
const references:Reference[]=[
{name:"Microsoft Windows Server",category:"IDENTITY & SYSTEMS",
 topic:{en:"AD DS, DNS, GPO, server management",fr:"AD DS, DNS, GPO et gestion serveur",ar:"إدارة AD DS وDNS وGPO والخوادم"},
 summary:{en:"Enterprise identity, name resolution and directory access controls.",fr:"Identité d'entreprise, résolution DNS et contrôle d'accès.",ar:"الهوية المؤسسية وحل الأسماء والتحكم في الصلاحيات."},
 url:"https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview"},
{name:"Ubuntu Server / Linux",category:"SYSTEM ADMINISTRATION",
 topic:{en:"Services, SSH, networking and hardening",fr:"Services, SSH, réseau et durcissement",ar:"الخدمات وSSH والشبكات وتقوية الحماية"},
 summary:{en:"Linux administration, host firewalls and secure operational baselines.",fr:"Administration Linux, pare-feu hôte et configuration sécurisée.",ar:"إدارة Linux وجدران الحماية وإعداد الأنظمة بصورة آمنة."},
 url:"https://ubuntu.com/server/docs/"},
{name:"Docker",category:"CONTAINER OPERATIONS",
 topic:{en:"Containers, images, networking and Compose",fr:"Conteneurs, images, réseau et Compose",ar:"الحاويات والصور والشبكات وCompose"},
 summary:{en:"Service packaging and repeatable infrastructure workloads.",fr:"Déploiement reproductible des services et applications.",ar:"تنظيم الخدمات وتشغيل أحمال العمل بصورة قابلة للتكرار."},
 url:"https://docs.docker.com/get-started/docker-overview/"},
{name:"Wireshark",category:"NETWORK TROUBLESHOOTING",
 topic:{en:"Packet captures and protocol analysis",fr:"Capture et analyse de protocoles",ar:"التقاط الحزم وتحليل البروتوكولات"},
 summary:{en:"Inspect TCP/IP, DNS, DHCP and TLS flows for evidence-driven diagnosis.",fr:"Analyser TCP/IP, DNS, DHCP et TLS pour diagnostiquer les incidents.",ar:"فحص TCP/IP وDNS وDHCP وTLS لدعم التشخيص بالأدلة."},
 url:"https://www.wireshark.org/docs/wsug_html_chunked/ChapterUsing.html"},
{name:"Wazuh",category:"SECURITY VISIBILITY",
 topic:{en:"Log collection, agents and alert review",fr:"Collecte de journaux, agents et alertes",ar:"جمع السجلات والوكلاء ومراجعة التنبيهات"},
 summary:{en:"Security telemetry architecture and centralized event investigation.",fr:"Architecture de télémétrie et analyse d'événements centralisée.",ar:"بنية جمع البيانات الأمنية وتحليل الأحداث مركزياً."},
 url:"https://documentation.wazuh.com/current/getting-started/architecture.html"},
{name:"FortiGate",category:"FIREWALL / VPN",
 topic:{en:"Firewall policy, NAT and secure tunnels",fr:"Politiques de filtrage, NAT et tunnels",ar:"قواعد الجدار الناري وNAT والأنفاق الآمنة"},
 summary:{en:"Policy boundaries and branch-to-HQ connectivity design.",fr:"Zones de sécurité et architecture de connexion entre sites.",ar:"حدود الصلاحيات وتصميم الربط الآمن بين المواقع."},
 url:"https://docs.fortinet.com/product/fortigate"},
{name:"Palo Alto Networks",category:"FIREWALL / VPN",
 topic:{en:"Security zones, routing and site-to-site IPsec",fr:"Zones de sécurité, routage et IPsec inter-sites",ar:"مناطق الأمان والتوجيه وIPsec بين المواقع"},
 summary:{en:"Zone-based security rules and controlled encrypted inter-site access.",fr:"Filtrage par zones et connexions chiffrées entre sites.",ar:"قواعد أمن حسب المناطق وربط المواقع باتصالات مشفرة."},
 url:"https://docs.paloaltonetworks.com/network-security/ipsec-vpn/administration/set-up-site-to-site-vpn"},
{name:"GNS3",category:"NETWORK EMULATION",
 topic:{en:"Network appliance lab projects and topology export",fr:"Labs d'équipements et export de topologies",ar:"مختبر معدات الشبكات وتصدير الطوبولوجيا"},
 summary:{en:"The official SVG/PNG capture workflow for a real GNS3 project.",fr:"La méthode officielle d'export SVG/PNG d'un projet GNS3 réel.",ar:"الطريقة الرسمية لاستخراج SVG/PNG من مشروع GNS3 حقيقي."},
 url:"https://docs.gns3.com/docs-3.1-en/web-ui/use-screenshot"},
{name:"Cisco Networking",category:"NETWORK ENGINEERING",
 topic:{en:"Campus switching, routing and segmentation",fr:"Commutation campus, routage et segmentation",ar:"تبديل شبكات المؤسسات والتوجيه وتقسيم الشبكات"},
 summary:{en:"Study of infrastructure access layers, VLANs and route control.",fr:"Couches d'accès, VLAN et contrôle du routage.",ar:"طبقات الوصول وVLAN والتحكم في مسارات الشبكة."},
 url:"https://www.cisco.com/c/en/us/solutions/enterprise-networks/index.html"}
];
const ui={
en:{kicker:"TECHNICAL REFERENCE LIBRARY",title:"The systems behind the engineering decisions.",description:"Official product documentation and platform references relevant to systems, networking, security and lab design. External reference material, not screenshots of my own deployments.",source:"Official documentation"},
fr:{kicker:"RÉFÉRENCES TECHNIQUES",title:"Les technologies derrière les choix d'architecture.",description:"Documentation officielle liée aux systèmes, réseaux, sécurité et environnements de lab. Références externes, sans les présenter comme mes propres captures.",source:"Documentation officielle"},
ar:{kicker:"المراجع التقنية",title:"التقنيات وراء القرارات الهندسية.",description:"مراجع رسمية للأنظمة والشبكات والأمن ومختبرات الاختبار، وليست صوراً أو لقطات من تشغيل شخصي.",source:"الوثائق الرسمية"}
} as const;

export default function TechnologyReferences({locale}:{locale:Locale}){
 const t=ui[locale];
 return <div className="technology-reference-section" aria-label={t.title}>
  <div className="technology-heading"><span className="section-number"><BookOpen size={15}/>{t.kicker}</span><h3>{t.title}</h3><p>{t.description}</p></div>
  <div className="technology-grid">{references.map((item,i)=><a className="technology-reference" href={item.url} key={item.name} target="_blank" rel="noopener noreferrer" aria-label={item.name+" — "+t.source}>
   <div className="technology-reference-top"><span>{String(i+1).padStart(2,"0")}</span><span>{item.category}</span><ArrowUpRight size={19}/></div>
   <h4>{item.name}</h4><strong>{item.topic[locale]}</strong><p>{item.summary[locale]}</p>
   <span className="technology-reference-link">{t.source}<ExternalLink size={13}/></span>
  </a>)}</div>
 </div>;
}
