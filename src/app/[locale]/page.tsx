import Home from "@/components/Home";
import {Locale} from "@/data/content";
import {notFound} from "next/navigation";
import type {Metadata} from "next";

export const dynamicParams=false;
export function generateStaticParams(){return [{locale:"fr"},{locale:"ar"}];}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;
 if(locale!=="fr"&&locale!=="ar")notFound();
 const isArabic=locale==="ar";
 const title=isArabic?"طه زيطان | إدارة الأنظمة والشبكات والأمن السيبراني":"Taha Zitane | Administration systèmes, réseaux et infrastructure IT";
 const description=isArabic?"الموقع المهني لطه زيطان: إدارة الأنظمة والشبكات، الدعم التقني، Active Directory، الأمن الشبكي، هندسة المؤسسات ودراسات مشاريع بتصميم تفاعلي ثلاثي الأبعاد.":"Portfolio professionnel de Taha Zitane : administration systèmes et réseaux, support IT, infrastructure Windows/Linux, sécurité réseau et études d’architecture 3D.";
 const canonical=`/${locale}/`;
 return {title:{absolute:title},description,alternates:{canonical,languages:{en:"/",fr:"/fr/",ar:"/ar/"}},openGraph:{title,description,url:canonical,locale:isArabic?"ar_MA":"fr_FR",images:[{url:"/meta/portfolio-social.png",width:1200,height:630,alt:title}]},twitter:{title,description}};
}
export default async function LocalizedHome({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(locale!=="fr"&&locale!=="ar")notFound();return <Home locale={locale as Locale}/>;}
