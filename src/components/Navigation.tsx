"use client";
import Link from "next/link";
import {useState} from "react";
import {ArrowUpRight, Menu, X} from "lucide-react";
import {content, homePath, languages, Locale} from "@/data/content";
import BrandMark from "./BrandMark";

export default function Navigation({locale,slug}:{locale:Locale;slug?:string}){
 const c=content[locale];const [open,setOpen]=useState(false);
 const anchors=["topology","work","experience","education","expertise","services","contact"];
 const names=[locale==="fr"?"Lab 3D":locale==="ar"?"مختبر 3D":"3D Lab",...c.nav];
 const target=(id:string)=>slug?`${homePath(locale)}#${id}`:`#${id}`;
 const otherHref=(lang:Locale)=>slug?`${lang==='en'?'':`/${lang}`}/projects/${slug}/`:homePath(lang);
 return <header className="header-wrap"><div className="site-nav container-xl" dir={locale==='ar'?'rtl':'ltr'}>
  <Link className="brand" href={homePath(locale)} aria-label={locale==="ar"?"الصفحة الرئيسية لطه زيطان":"Taha Zitane home"}><BrandMark size={52} className="brand-mark"/><span className="brand-name">{locale==="ar"?"طه زيطان":"TAHA ZITANE"}<span>{locale==="ar"?" / هندسة الأنظمة والشبكات":" / SYSTEMS & NETWORKS"}</span></span></Link>
  <nav className="nav-links" aria-label="Primary navigation">{names.map((item,i)=><Link key={i} href={target(anchors[i])}>{item}</Link>)}</nav>
  <div className="nav-right"><div className="language-switcher" aria-label="Site language">{languages.map(lang=><Link href={otherHref(lang)} key={lang} hrefLang={lang} aria-current={lang===locale?"page":undefined} className={lang===locale?"selected":""}>{lang.toUpperCase()}</Link>)}</div>
   <Link href={target("contact")} className="nav-cta" aria-label={c.contact}><ArrowUpRight size={17}/></Link>
  </div>
  <button className="nav-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open?'Close navigation':'Open navigation'}>{open?<X size={24}/>:<Menu size={24}/>}</button>
 </div>
 {open&&<nav id="mobile-nav" className="mobile-menu" aria-label="Mobile navigation" dir={locale==='ar'?'rtl':'ltr'}>
 {names.map((item,i)=><Link onClick={()=>setOpen(false)} key={i} href={target(anchors[i])}>{item} <ArrowUpRight size={15}/></Link>)}
 <div className="mobile-langs">{languages.map(lang=><Link onClick={()=>setOpen(false)} key={lang} href={otherHref(lang)} className={lang===locale?'selected':''}>{lang.toUpperCase()}</Link>)}</div></nav>}
 </header>;
}
