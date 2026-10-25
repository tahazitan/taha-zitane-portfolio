import type {Metadata} from "next";
import type {Locale} from "./content";
export type PortfolioSection="projects"|"experience"|"education"|"expertise"|"services"|"contact";
const copy:Record<Locale,Record<PortfolioSection,{title:string;description:string}>>={
 en:{
  projects:{title:"Infrastructure projects & network labs",description:"Explore documented network architecture, enterprise topology, Windows Server, Linux, monitoring and cybersecurity reference labs, with implementation status clearly identified."},
  experience:{title:"Professional IT support & network experience",description:"Experience in IT support, Cisco LAN, Windows Server and Active Directory, training, end-user troubleshooting and independent systems and network operations."},
  education:{title:"Education, networking diploma & technical training",description:"Specialized Network Technician diploma from OFPPT ISMO Tetouan, one year of university sciences and first-year engineering studies at EMSI Tanger, plus continuing courses."},
  expertise:{title:"Systems, networking & security expertise",description:"Technical expertise in Cisco networking, Windows and Linux administration, firewall policy, VPN troubleshooting, monitoring, incident diagnostics and security operations."},
  services:{title:"Remote IT support & infrastructure services",description:"Remote IT support, Windows Server administration, Linux VPS maintenance, network diagnostics, firewall and VPN configuration and security-oriented infrastructure reviews."},
  contact:{title:"Contact for remote IT support",description:"Contact Taha Zitane for remote IT support, systems and network administration, infrastructure troubleshooting and technical projects based in Morocco."}
 },
 fr:{
  projects:{title:"Projets d'infrastructure, réseaux et laboratoires",description:"Architectures de réseaux, topologies d'entreprise, projets Windows Server et Linux, supervision et sécurité informatique, avec un état de réalisation clairement indiqué."},
  experience:{title:"Expérience professionnelle en systèmes et réseaux",description:"Expériences en support informatique, réseau Cisco, Windows Server, Active Directory, formation pratique, assistance utilisateurs et administration indépendante."},
  education:{title:"Formation, diplôme réseaux et parcours académique",description:"Diplôme de Technicien Spécialisé OFPPT ISMO Tétouan, études en sciences à l'université et première année d'études d'ingénierie à l'EMSI Tanger."},
  expertise:{title:"Expertises techniques en systèmes, réseaux et sécurité",description:"Administration Windows et Linux, réseaux Cisco, diagnostic informatique, VPN, pare-feu, supervision, analyse du trafic et sécurité de l'infrastructure."},
  services:{title:"Support IT à distance et services infrastructures",description:"Support informatique à distance, administration Windows Server et VPS Linux, diagnostic réseau, configuration VPN et audit technique des systèmes."},
  contact:{title:"Contact et collaboration technique",description:"Contacter Taha Zitane pour le support IT à distance, l'administration systèmes et réseaux et les projets techniques depuis le Maroc."}
 },
 ar:{
  projects:{title:"مشاريع هندسة الشبكات والبنية التحتية",description:"استعراض تصاميم الشبكات المؤسسية ومختبرات Windows Server وLinux والمراقبة والأمن السيبراني، مع توضيح حالة تنفيذ كل مشروع."},
  experience:{title:"الخبرة المهنية في إدارة الأنظمة والشبكات",description:"خبرات مهنية في الدعم التقني وشبكات Cisco وخوادم Windows Server وActive Directory وتكوين المتدربين ومعالجة أعطال المستخدمين."},
  education:{title:"الدراسة والتكوين التقني في الشبكات",description:"دبلوم تقني متخصص في الشبكات من OFPPT بتطوان، وسنة من الدراسات الجامعية في العلوم، والسنة الأولى من الدراسات الهندسية بمدرسة EMSI طنجة."},
  expertise:{title:"الكفاءات التقنية في الأنظمة والشبكات والأمن",description:"مهارات في إدارة Windows وLinux وشبكات Cisco وتشخيص الأعطال والجدران النارية والشبكات الافتراضية الخاصة والمراقبة وتحليل حركة الشبكة."},
  services:{title:"خدمات الدعم التقني وإدارة البنية التحتية عن بُعد",description:"خدمات الدعم المعلوماتي عن بُعد وإدارة خوادم Windows وLinux وتهيئة الشبكات وVPN ومراجعة الإعدادات التقنية والأمنية."},
  contact:{title:"التواصل بشأن خدمات الشبكات والأنظمة",description:"تواصل مع طه زيطان بخصوص الدعم التقني عن بُعد وإدارة الأنظمة والشبكات ومشاريع البنية التحتية التقنية من المغرب."}
 }
};
export function sectionMetadata(locale:Locale,section:PortfolioSection):Metadata{
 const {title,description}=copy[locale][section];
 const path="/"+section+"/";
 const localized=(lang:Locale)=>lang==="en"?path:"/"+lang+path;
 const canonical=localized(locale);
 return {title:{absolute:title+" | "+(locale==="ar"?"طه زيطان":"Taha Zitane")},description,
  alternates:{canonical,languages:{en:localized("en"),fr:localized("fr"),ar:localized("ar"),"x-default":localized("en")}},
  openGraph:{title,description,type:"website",url:canonical,locale:locale==="fr"?"fr_FR":locale==="ar"?"ar_MA":"en_US",
   images:[{url:"/meta/portfolio-social.png",width:1200,height:630,alt:locale==="ar"?"طه زيطان — البنية التحتية للأنظمة والشبكات":"Taha Zitane — Systems and Networks Infrastructure"}]},
  twitter:{card:"summary_large_image",title,description,images:["/meta/portfolio-social.png"]}
 };
}
