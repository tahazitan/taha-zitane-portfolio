import CasePage from "@/components/CasePage";
import {allSlugs,content} from "@/data/content";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
export const dynamicParams=false;
export function generateStaticParams(){return allSlugs.map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;
 const project=content.en.projects.find(p=>p.slug===slug);
 if(!project)notFound();
 const canonical=`/projects/${slug}/`;
 const title=`${project.title} | Systems & Network Project`;
 const description=project.summary;
 return {title:{absolute:`${title} — Taha Zitane`},description,alternates:{canonical,languages:{en:canonical,fr:`/fr/projects/${slug}/`,ar:`/ar/projects/${slug}/`}},openGraph:{title,description,url:canonical,images:[{url:"/meta/portfolio-social.png",width:1200,height:630,alt:"Taha Zitane portfolio"}]},twitter:{title,description}};
}
export default async function Project({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!allSlugs.includes(slug))notFound();return <CasePage locale="en" slug={slug}/>;}
