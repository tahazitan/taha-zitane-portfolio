import CasePage from "@/components/CasePage";
import {allSlugs,content,Locale} from "@/data/content";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
export const dynamicParams=false;
export function generateStaticParams(){return ["fr","ar"].flatMap(locale=>allSlugs.map(slug=>({locale,slug})));}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{const {locale,slug}=await params;const c=content[locale as Locale];const p=c?.projects.find(p=>p.slug===slug);return {title:p?.title||"Project",description:p?.summary};}
export default async function LocalizedProject({params}:{params:Promise<{locale:string;slug:string}>}){const {slug,locale}=await params;if(!["fr","ar"].includes(locale)||!allSlugs.includes(slug))notFound();return <CasePage locale={locale as Locale} slug={slug}/>;}
