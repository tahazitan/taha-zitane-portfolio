import Link from "next/link";
import {ArrowUpRight,ExternalLink,Camera} from "lucide-react";
import {projectPath,type Locale} from "@/data/content";

/** Authentic publicly licensed Wikimedia Commons media.
 * Original source and license remain visible; these are illustrative references,
 * not photos from any user-owned deployment or customer engagement.
 */
const media=[
 {key:"rack",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Servers_in_a_Rack.jpg/500px-Servers_in_a_Rack.jpg",
  title:{en:"Server infrastructure",fr:"Infrastructure serveur",ar:"البنية التحتية للخوادم"},
  detail:{en:"Physical server racks, virtualization and operations",fr:"Racks physiques, virtualisation et exploitation",ar:"خوادم فعلية وافتراضية وعمليات التشغيل"},
  slug:"proxmox-virtualization-lab",credit:"Abigor · CC BY-SA 3.0",license:"https://creativecommons.org/licenses/by-sa/3.0/",
  source:"https://commons.wikimedia.org/wiki/File:Servers_in_a_Rack.jpg",
  alt:"Real photograph of server racks in a data center"},
 {key:"cisco",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Cisco_SG_200-08P_front.jpg/960px-Cisco_SG_200-08P_front.jpg",
  title:{en:"Cisco switching",fr:"Commutation Cisco",ar:"محولات شبكات Cisco"},
  detail:{en:"Switching, access ports and network segmentation",fr:"Commutation, ports d'accès et segmentation",ar:"تبديل الشبكات ومنافذ الوصول وتقسيم VLAN"},
  slug:"cisco-campus-network-lab",credit:"Антон Пищулин · CC BY-SA 4.0",license:"https://creativecommons.org/licenses/by-sa/4.0/",
  source:"https://commons.wikimedia.org/wiki/File:Cisco_SG_200-08P_front.jpg",
  alt:"Real photograph of Cisco SG 200-08P network switch"},
 {key:"fortigate",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Fortinet_FortiGate_6501F.png/1280px-Fortinet_FortiGate_6501F.png",
  title:{en:"Network security perimeter",fr:"Sécurité périmétrique",ar:"حماية محيط الشبكة"},
  detail:{en:"Firewall zones, IPsec policies and site connectivity",fr:"Zones pare-feu, règles IPsec et interconnexion",ar:"مناطق الجدار الناري وسياسات IPsec وربط المواقع"},
  slug:"firewall-ipsec-lab",credit:"Premeditated · CC BY-SA 4.0",license:"https://creativecommons.org/licenses/by-sa/4.0/",
  source:"https://commons.wikimedia.org/wiki/File:Fortinet_FortiGate_6501F.png",
  alt:"Real photograph of Fortinet FortiGate 6501F firewall appliance"},
 {key:"wireshark",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Screenshots_of_the_Wireshark_interface%2C_showing_captured_packets_data_-_DNS.png/960px-Screenshots_of_the_Wireshark_interface%2C_showing_captured_packets_data_-_DNS.png",
  title:{en:"Packet-level troubleshooting",fr:"Diagnostic des paquets réseau",ar:"تشخيص حزم الشبكة"},
  detail:{en:"Wireshark DNS and TCP/IP packet inspection",fr:"Inspection des paquets DNS et TCP/IP avec Wireshark",ar:"تحليل حزم DNS وTCP/IP باستعمال Wireshark"},
  slug:"remote-it-support",credit:"Oluwatobi TJ · CC0 1.0",license:"https://creativecommons.org/publicdomain/zero/1.0/",
  source:"https://commons.wikimedia.org/wiki/File:Screenshots_of_the_Wireshark_interface,_showing_captured_packets_data_-_DNS.png",
  alt:"Authentic Wireshark screenshot showing DNS packet capture analysis"}
] as const;
const copy={
 en:{kicker:"SOLUTIONS / REAL MEDIA",title:"Infrastructure in its working context.",intro:"Documentary photographs and software screenshots from openly licensed sources, paired with relevant technical case studies. These images illustrate technology categories, not equipment installed by me.",case:"Related case study",attribution:"Photo or screenshot source",license:"License",note:"Representative imagery from Wikimedia Commons · credits and license links are attached to every asset."},
 fr:{kicker:"SOLUTIONS / IMAGES RÉELLES",title:"L'infrastructure dans son contexte.",intro:"Photographies et captures logicielles de sources ouvertes, associées aux études techniques pertinentes. Ces images illustrent les technologies, sans prétendre montrer mes propres installations.",case:"Étude de cas associée",attribution:"Source de l'image",license:"Licence",note:"Images représentatives issues de Wikimedia Commons · auteur, source et licence associés à chaque image."},
 ar:{kicker:"حلول / صور حقيقية",title:"البنية التحتية في سياقها العملي.",intro:"صور فوتوغرافية ولقطات برامج من مصادر مفتوحة الترخيص، مرتبطة بالمشاريع التقنية المناسبة. تمثل نوع التقنية ولا تدّعي أنها صور معدات قمت بتركيبها.",case:"المشروع المرتبط",attribution:"مصدر الصورة",license:"الرخصة",note:"صور تمثيلية من Wikimedia Commons مع ذكر المصدر وصاحب العمل والرخصة لكل صورة."}
} as const;

export default function SolutionMedia({locale}:{locale:Locale}){
 const t=copy[locale];
 return <section className="solution-media" id="solutions" aria-labelledby="solution-media-title">
  <div className="container-xl">
   <div className="solution-media-heading"><span className="section-number"><Camera size={16}/>{t.kicker}</span><h2 id="solution-media-title">{t.title}</h2><p>{t.intro}</p></div>
   <div className="solution-media-grid">
    {media.map((item,i)=><article className={"solution-media-card solution-media-"+item.key} key={item.key}>
     <div className="solution-media-image">
      <img src={item.src} alt={item.alt} width={item.key==="rack"?500:960} height={item.key==="rack"?752:item.key==="fortigate"?371:item.key==="wireshark"?363:540} loading="lazy" decoding="async" referrerPolicy="no-referrer"/>
      <span>{String(i+1).padStart(2,"0")} / 04</span>
     </div>
     <div className="solution-media-copy"><h3>{item.title[locale]}</h3><p>{item.detail[locale]}</p>
      <Link href={projectPath(locale,item.slug)}>{t.case}<ArrowUpRight size={17}/></Link>
      <div className="solution-media-credits"><a href={item.source} target="_blank" rel="noopener noreferrer" aria-label={t.attribution+" "+item.credit}>{t.attribution}: {item.credit}<ExternalLink size={12}/></a><a href={item.license} target="_blank" rel="noopener noreferrer">{t.license}<ExternalLink size={12}/></a></div>
     </div>
    </article>)}
   </div>
   <p className="solution-media-foot">{t.note}</p>
  </div>
 </section>;
}
