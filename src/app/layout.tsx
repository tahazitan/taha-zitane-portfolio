import type {Metadata,Viewport} from "next";
import type {ReactNode} from "react";
import "./globals.css";
import "./portfolio-polish.css";
import "./evidence-design.css";
import "./visual-identity.css";
import "./network-polish.css";
import "./engineering-identity.css";
import "./experience-polish.css";
import "./projects-identity.css";
import "./expertise-identity.css";
import "./services-identity.css";
import "./education-training.css";
import "./site-branding.css";
import "./immersive-experience.css";
import "./sitewide-motion.css";
import "./mobile-premium.css";
import "./studio-design.css";
import "./studio-source-template.css";
import "./portfolio-studio-skin.css";
import "./career-focus.css";
import MotionSystem from "@/components/MotionSystem";

const siteUrl = "https://taha-zitane-engineering.zitanet44.workers.dev";

export const metadata:Metadata={
 metadataBase:new URL(siteUrl),
 alternates:{canonical:"/",languages:{en:"/",fr:"/fr/",ar:"/ar/"}},
 title:{default:"Taha Zitane | Remote IT Support & Systems Infrastructure",template:"%s | Taha Zitane"},
 description:"Taha Zitane — IT Support, Systems & Network Infrastructure professional in Morocco. Professional experience, documented hands-on labs and international remote career focus.",
 keywords:[
  "Taha Zitane",
  "طه زيطان",
  "systems and network administrator",
  "IT support Morocco",
  "remote IT support engineer",
  "technical support engineer",
  "remote systems administrator",
  "international remote IT jobs",
  "Windows Server",
  "Active Directory",
  "network security",
  "cybersecurity",
  "FortiGate",
  "Palo Alto",
  "IPsec VPN",
  "Wazuh",
  "GNS3 lab",
  "infrastructure portfolio",
  "Chefchaouen",
  "Morocco"
 ],
 category:"technology",
 icons:{icon:"/meta/mark.svg"},
 openGraph:{
  title:"Taha Zitane — Remote IT Support & Infrastructure",
  description:"Professional IT Support and Systems & Network Infrastructure portfolio with real experience, technical labs and evidence-linked projects.",
  type:"website",
  url:siteUrl,
  siteName:"Taha Zitane Portfolio",
  images:[{url:"/meta/portfolio-social.png",width:1200,height:630,alt:"Taha Zitane — Remote IT Support & Infrastructure"}]
 },
 twitter:{
  card:"summary_large_image",
  title:"Taha Zitane — Systems, Networks & Cybersecurity",
  description:"Professional IT Support portfolio with professional experience, documented infrastructure labs and systems and network administration.",
  images:[{url:"/meta/portfolio-social.png",width:1200,height:630,alt:"Taha Zitane — Systems, Networks & Cybersecurity"}]
 },
 robots:{index:true,follow:true},
};

export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#0f172a"};

const personSchema={
  "@context":"https://schema.org",
  "@type":"Person",
  name:"Taha Zitane",
  alternateName:"طه زيطان",
  url:siteUrl,
  jobTitle:"Systems & Network Infrastructure · IT Operations",
  telephone:"+212627933831",
  email:"zitanet44@gmail.com",
  address:{"@type":"PostalAddress",addressLocality:"Chefchaouen",addressCountry:"MA"},
  sameAs:["https://github.com/tahazitan","https://www.linkedin.com/in/taha-zitane/fr"]
};

export default function RootLayout({children}:{children:ReactNode}){
  return <html lang="en"><body><MotionSystem/>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(personSchema)}} /></body></html>
}
