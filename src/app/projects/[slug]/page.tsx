import CasePage from "@/components/CasePage";
import {allSlugs, content} from "@/data/content";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
export const dynamicParams=false;
export function generateStaticParams(){return allSlugs.map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params; const p=content.en.projects.find(p=>p.slug===slug);return {title:p?.title||"Project",description:p?.summary};}
export default async function Project({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!allSlugs.includes(slug))notFound();return <CasePage locale="en" slug={slug}/>;}
