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

const siteUrl = "https://taha-zitane-engineering.zitanet44.workers.dev";

export const metadata:Metadata={
 metadataBase:new URL(siteUrl),
 alternates:{canonical:"/",languages:{en:"/",fr:"/fr/",ar:"/ar/"}},
 title:{default:"Taha Zitane | Systems, Networks & Cybersecurity",template:"%s | Taha Zitane"},
 description:"Taha Zitane's portfolio: systems and network infrastructure, IT support, cybersecurity labs, Windows Server, FortiGate, Palo Alto, IPsec VPN and security monitoring.",
 keywords:[
  "Taha Zitane",
  "طه زيطان",
  "systems and network administrator",
  "IT support Morocco",
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
  title:"Taha Zitane — Systems, Networks & Cybersecurity",
  description:"Professional portfolio with systems administration, network security, cybersecurity labs and linked technical projects and network architectures.",
  type:"website",
  url:siteUrl,
  siteName:"Taha Zitane Portfolio",
  images:[{url:"/meta/portfolio-social.png",width:1200,height:630,alt:"Taha Zitane — Systems, Networks & Cybersecurity"}]
 },
 twitter:{
  card:"summary_large_image",
  title:"Taha Zitane — Systems, Networks & Cybersecurity",
  description:"Professional portfolio: systems, networks, IT support, firewall/VPN labs and cybersecurity and infrastructure projects.",
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
  jobTitle:"Systems & Network Infrastructure · Cybersecurity",
  telephone:"+212627933831",
  email:"zitanet44@gmail.com",
  address:{"@type":"PostalAddress",addressLocality:"Chefchaouen",addressCountry:"MA"},
  sameAs:["https://github.com/tahazitan","https://www.linkedin.com/in/taha-zitane/fr"]
};

export default function RootLayout({children}:{children:ReactNode}){
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(personSchema)}} /></body></html>
}
