import type {MetadataRoute} from "next";
import {allSlugs} from "@/data/content";
const base="https://taha-zitane-engineering.zitanet44.workers.dev";
export const dynamic="force-static";
export default function sitemap():MetadataRoute.Sitemap{
 const home=["/","/fr/","/ar/"];
 const sections=["projects","experience","education","expertise","services","contact"];
 const sectionPaths=sections.flatMap(section=>[`/${section}/`,`/fr/${section}/`,`/ar/${section}/`]);
 const projects=allSlugs.flatMap(slug=>[`/projects/${slug}/`,`/fr/projects/${slug}/`,`/ar/projects/${slug}/`]);
 return [...home,...sectionPaths,...projects].map(path=>({url:`${base}${path}`,changeFrequency:"monthly" as const,priority:path==="/"?1:home.includes(path)?.9:sectionPaths.includes(path)?.85:.7}));
}
