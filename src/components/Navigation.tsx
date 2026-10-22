"use client";
import Link from "next/link";
import {useState} from "react";
import {ArrowUpRight, Menu, X} from "lucide-react";
import {content, homePath, languages, Locale} from "@/data/content";

export default function Navigation({locale,slug}:{locale:Locale;slug?:string}){
 const c=content[locale];const [open,setOpen]=useState(false);
 const anchors=["work","experience","expertise","services","contact"];
 const target=(id:string)=>slug?`${homePath(locale)}#${id}`:`#${id}`;
 const otherHref=(lang:Locale)=>slug?`${lang==='en'?'':`/${lang}`}/projects/${slug}/`:homePath(lang);
 return <header className="header-wrap"><div className="site-nav container-xl" dir={locale==='ar'?'rtl':'ltr'}>
  <Link className="brand" href={homePath(locale)} aria-label="Taha Zitane home"><span className="brand-symbol">t<span className="brand-dot">.</span>z</span><span className="brand-name">TAHA ZITANE<span> / SYSTEMS & NETWORKS</span></span></Link>
  <nav className="nav-links" aria-label="Primary navigation">{c.nav.map((item,i)=><Link key={i} href={target(anchors[i])}>{item}</Link>)}</nav>
  <div className="nav-right"><div className="language-switcher" aria-label="Site language">{languages.map(lang=><Link href={otherHref(lang)} key={lang} hrefLang={lang} aria-current={lang===locale?"page":undefined} className={lang===locale?"selected":""}>{lang.toUpperCase()}</Link>)}</div>
   <Link href={target("contact")} className="nav-cta" aria-label={c.contact}><ArrowUpRight size={17}/></Link>
  </div>
  <button className="nav-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open?'Close navigation':'Open navigation'}>{open?<X size={24}/>:<Menu size={24}/>}</button>
 </div>
 {open&&<nav id="mobile-nav" className="mobile-menu" aria-label="Mobile navigation" dir={locale==='ar'?'rtl':'ltr'}>
 {c.nav.map((item,i)=><Link onClick={()=>setOpen(false)} key={i} href={target(anchors[i])}>{item} <ArrowUpRight size={15}/></Link>)}
 <div className="mobile-langs">{languages.map(lang=><Link onClick={()=>setOpen(false)} key={lang} href={otherHref(lang)} className={lang===locale?'selected':''}>{lang.toUpperCase()}</Link>)}</div></nav>}
 </header>;
}
