import type {Metadata,Viewport} from "next";
import "./globals.css";
export const metadata:Metadata={
 metadataBase:new URL("https://taha-zitane-engineering.zitanet44.workers.dev"),
 metadataBase:new URL("https://taha-zitane-engineering.zitanet44.workers.dev"),
 alternates:{canonical:"/",languages:{en:"/",fr:"/fr/",ar:"/ar/"}},
 title:{default:"Taha Zitane — Systems & Network Infrastructure",template:"%s | Taha Zitane"},
 description:"Systems and network infrastructure specialist in Morocco. Real professional experience, reproducible network labs, technical support and documented case studies.",
 icons:{icon:"/meta/mark.svg"},
 openGraph:{title:"Taha Zitane — Infrastructure & Network Operations",description:"Technical portfolio: professional work, engineering labs and evidence-led case studies.",type:"website",images:["/images/taha-portrait.webp"]},
 robots:{index:true,follow:true},
};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#101918"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
