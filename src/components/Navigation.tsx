"use client";
import Link from "next/link";
import {useState} from "react";
import {Menu,X,ArrowUpRight} from "lucide-react";
import {content,homePath,languages,type Locale} from "@/data/content";
import BrandMark from "./BrandMark";
const sections=["projects","experience","education","expertise","services","contact"] as const;
type Page=typeof sections[number];
const pagePath=(locale:Locale,page:Page)=>`${locale==="en"?"":"/"+locale}/${page}/`;
export default function Navigation({locale,slug,section}:{locale:Locale;slug?:string;section?:string}){
 const c=content[locale], [open,setOpen]=useState(false);
 const otherHref=(lang:Locale)=>slug?`${lang==="en"?"":"/"+lang}/projects/${slug}/`:section&&sections.includes(section as Page)?pagePath(lang,section as Page):homePath(lang);
 return <header className="header-wrap"><div className="site-nav container-xl" dir={locale==="ar"?"rtl":"ltr"}>
 <Link className="brand" href={homePath(locale)} aria-label="Taha Zitane home"><BrandMark size={52} className="brand-mark"/><span className="brand-name">{locale==="ar"?"طه زيطان":"TAHA ZITANE"}<span>{locale==="ar"?" / الأنظمة والشبكات":" / SYSTEMS & NETWORKS"}</span></span></Link>
 <nav className="nav-links" aria-label="Primary navigation">{sections.map((s,i)=><Link key={s} href={pagePath(locale,s)} aria-current={section===s?"page":undefined}>{c.nav[i]}</Link>)}</nav>
 <div className="nav-right"><div className="language-switcher" aria-label="Site language">{languages.map(lang=><Link href={otherHref(lang)} key={lang} hrefLang={lang} aria-current={lang===locale?"page":undefined} className={lang===locale?"selected":""}>{lang.toUpperCase()}</Link>)}</div></div>
 <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open?"Close navigation":"Open navigation"} onClick={()=>setOpen(v=>!v)}>{open?<X size={24}/>:<Menu size={24}/>}</button>
 </div>
 {open&&<nav id="mobile-nav" className="mobile-menu" aria-label="Mobile navigation" dir={locale==="ar"?"rtl":"ltr"}>{sections.map((s,i)=><Link key={s} onClick={()=>setOpen(false)} href={pagePath(locale,s)}>{c.nav[i]}<ArrowUpRight size={15}/></Link>)}<div className="mobile-langs">{languages.map(lang=><Link key={lang} onClick={()=>setOpen(false)} href={otherHref(lang)} className={lang===locale?"selected":""}>{lang.toUpperCase()}</Link>)}</div></nav>}
 </header>;
}
