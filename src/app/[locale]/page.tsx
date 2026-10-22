import Home from "@/components/Home";
import {Locale} from "@/data/content";
import {notFound} from "next/navigation";
export const dynamicParams=false;
export function generateStaticParams(){return [{locale:"fr"},{locale:"ar"}];}
export default async function LocalizedHome({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(locale!=="fr"&&locale!=="ar")notFound();return <Home locale={locale as Locale}/>;}
