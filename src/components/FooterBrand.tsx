import Link from "next/link";
import {ArrowUpRight,Github,Linkedin,Mail} from "lucide-react";
import BrandMark from "./BrandMark";
import {content,homePath,githubUrl,linkedInUrl,mailUrl,type Locale} from "@/data/content";
const paths=["projects","experience","education","expertise","services","contact"];
export default function FooterBrand({locale}:{locale:Locale}){
 const c=content[locale];const prefix=locale==="en"?"":"/"+locale;
 const tagline=locale==="fr"?"Infrastructures systèmes & réseaux · Orientation cybersécurité":locale==="ar"?"البنية التحتية للأنظمة والشبكات · توجه نحو الأمن السيبراني":"Systems & Network Infrastructure · Cybersecurity oriented";
 const label=locale==="fr"?"EXPLORER":locale==="ar"?"استكشف":"EXPLORE";
 return <footer className="site-footer footer-branded"><div className="container-xl">
  <div className="footer-brand-main"><div className="footer-signature"><Link href={homePath(locale)} aria-label="Taha Zitane home"><BrandMark size={55}/><strong>{locale==="ar"?"طه زيطان":"TAHA ZITANE"}</strong></Link><p>{tagline}</p><span className="footer-location">CHEFCHAOUEN · MOROCCO / REMOTE</span></div>
   <div className="footer-directory"><span className="footer-overline">{label}</span><nav aria-label="Footer navigation">{paths.map((path,i)=><Link key={path} href={`${prefix}/${path}/`}>{c.nav[i]}<ArrowUpRight size={14}/></Link>)}</nav></div>
   <div className="footer-channel"><span className="footer-overline">{locale==="fr"?"COLLABORER":locale==="ar"?"التواصل":"WORK WITH ME"}</span><a href={mailUrl} className="footer-email"><Mail size={15}/>zitanet44@gmail.com</a><div className="footer-social"><a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20}/></a><a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20}/></a></div></div>
  </div><div className="footer-copyright"><span>© 2026 TAHA ZITANE</span><span>{c.footerNote}</span><a href="#top" aria-label={locale==="fr"?"Haut de page":locale==="ar"?"أعلى الصفحة":"Back to top"}>↑ TOP</a></div>
 </div></footer>;
}
