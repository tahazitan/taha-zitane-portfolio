import CasePage from "@/components/CasePage";
import {allSlugs,content,Locale} from "@/data/content";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
export const dynamicParams=false;
export function generateStaticParams(){return ["fr","ar"].flatMap(locale=>allSlugs.map(slug=>({locale,slug})));}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{
 const {locale,slug}=await params;
 if(locale!=="fr"&&locale!=="ar")notFound();
 const project=content[locale as Locale].projects.find(p=>p.slug===slug);
 if(!project)notFound();
 const canonical=`/${locale}/projects/${slug}/`;
 const title=locale==="ar"?`${project.title} | مشروع شبكات وأنظمة — طه زيطان`:`${project.title} | Projet systèmes & réseaux — Taha Zitane`;
 const description=project.summary;
 return {title:{absolute:title},description,alternates:{canonical,languages:{en:`/projects/${slug}/`,fr:`/fr/projects/${slug}/`,ar:`/ar/projects/${slug}/`}},openGraph:{title,description,url:canonical,locale:locale==="ar"?"ar_MA":"fr_FR",images:[{url:"/meta/portfolio-social.png",width:1200,height:630,alt:title}]},twitter:{title,description}};
}
export default async function LocalizedProject({params}:{params:Promise<{locale:string;slug:string}>}){const {slug,locale}=await params;if(!["fr","ar"].includes(locale)||!allSlugs.includes(slug))notFound();return <CasePage locale={locale as Locale} slug={slug}/>;}
