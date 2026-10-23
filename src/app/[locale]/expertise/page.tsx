import SectionPage from "@/components/SectionPage";
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import type {Locale} from "@/data/content";
export const dynamicParams=false;
export function generateStaticParams(){return [{locale:"fr"},{locale:"ar"}]}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(locale!=="fr"&&locale!=="ar")notFound();return {title:`Taha Zitane | Expertise / التخصصات`,alternates:{canonical:`/${locale}/expertise/`,languages:{en:"/expertise/",fr:"/fr/expertise/",ar:"/ar/expertise/"}}}}
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(locale!=="fr"&&locale!=="ar")notFound();return <SectionPage locale={locale as Locale} section="expertise"/>}
