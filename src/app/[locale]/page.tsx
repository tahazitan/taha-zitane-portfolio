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
 const title=isArabic?"طه زيطان | الدعم التقني وإدارة الأنظمة والشبكات عن بُعد":"Taha Zitane | Support IT à distance et administration systèmes";
 const description=isArabic?"الملف المهني لطه زيطان: الدعم التقني عن بُعد وإدارة الأنظمة والشبكات، مع الخبرة العملية والمشاريع التطبيقية الموثقة وفرص التعاون الدولي.":"Portfolio professionnel de Taha Zitane : support IT à distance, administration systèmes et réseaux, expérience professionnelle et laboratoires techniques documentés.";
 const canonical=`/${locale}/`;
 return {title:{absolute:title},description,alternates:{canonical,languages:{en:"/",fr:"/fr/",ar:"/ar/"}},openGraph:{title,description,url:canonical,locale:isArabic?"ar_MA":"fr_FR",images:[{url:"/meta/portfolio-social.png",width:1200,height:630,alt:title}]},twitter:{title,description}};
}
export default async function LocalizedHome({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(locale!=="fr"&&locale!=="ar")notFound();return <Home locale={locale as Locale}/>;}
