import SectionPage from "@/components/SectionPage";
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import type {Locale} from "@/data/content";
export const dynamicParams=false;
export function generateStaticParams(){return [{locale:"fr"},{locale:"ar"}]}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(locale!=="fr"&&locale!=="ar")notFound();return {title:`Taha Zitane | Formation / التكوين`,alternates:{canonical:`/${locale}/education/`,languages:{en:"/education/",fr:"/fr/education/",ar:"/ar/education/"}}}}
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(locale!=="fr"&&locale!=="ar")notFound();return <SectionPage locale={locale as Locale} section="education"/>}
