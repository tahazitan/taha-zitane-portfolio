import type {Metadata,Viewport} from "next";
import type {ReactNode} from "react";
import "./globals.css";

const siteUrl = "https://taha-zitane-engineering.zitanet44.workers.dev";

export const metadata:Metadata={
 metadataBase:new URL(siteUrl),
 alternates:{canonical:"/",languages:{en:"/",fr:"/fr/",ar:"/ar/"}},
 title:{default:"Taha Zitane | Systems, Networks & IT Infrastructure",template:"%s | Taha Zitane"},
 description:"Professional portfolio of Taha Zitane: systems and network infrastructure, IT support, Windows Server, secure network design, monitoring and technical case studies.",
 keywords:[
  "Taha Zitane",
  "طه زيطان",
  "systems and network administrator",
  "IT support Morocco",
  "Windows Server",
  "Active Directory",
  "network security",
  "GNS3 lab",
  "infrastructure portfolio",
  "Chefchaouen",
  "Morocco"
 ],
 category:"technology",
 icons:{icon:"/meta/mark.svg"},
 openGraph:{
  title:"Taha Zitane — Infrastructure & Network Operations",
  description:"Professional portfolio with systems, networking and security architecture case studies.",
  type:"website",
  url:siteUrl,
  siteName:"Taha Zitane Portfolio",
  images:[{url:"/meta/portfolio-social.png",width:1200,height:630,alt:"Taha Zitane — Systems & Network Infrastructure"}]
 },
 twitter:{
  card:"summary_large_image",
  title:"Taha Zitane — Systems & Network Infrastructure",
  description:"Professional portfolio: infrastructure, network operations, support and engineering case studies.",
  images:[{url:"/meta/portfolio-social.png",width:1200,height:630,alt:"Taha Zitane — Systems & Network Infrastructure"}]
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
  jobTitle:"Systems & Network Infrastructure Specialist",
  telephone:"+212627933831",
  email:"zitanet44@gmail.com",
  address:{"@type":"PostalAddress",addressLocality:"Chefchaouen",addressCountry:"MA"},
  sameAs:["https://github.com/tahazitan","https://www.linkedin.com/in/taha-zitane/fr"]
};

export default function RootLayout({children}:{children:ReactNode}){
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(personSchema)}} /></body></html>
}
