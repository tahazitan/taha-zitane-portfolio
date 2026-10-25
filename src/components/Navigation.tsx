"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {Menu,X,ArrowUpRight} from "lucide-react";
import {content,homePath,languages,type Locale} from "@/data/content";
const sections=["projects","experience","education","expertise","services","contact"] as const;
type Page=typeof sections[number];
const pagePath=(locale:Locale,page:Page)=>`${locale==="en"?"":"/"+locale}/${page}/`;
export default function Navigation({locale,slug,section}:{locale:Locale;slug?:string;section?:string}){
 const c=content[locale], [open,setOpen]=useState(false);
 const toggleRef=useRef<HTMLButtonElement>(null);
 const menuRef=useRef<HTMLElement>(null);
 const labels=locale==="ar"?{open:"فتح قائمة التنقل",close:"إغلاق قائمة التنقل",main:"التنقل الرئيسي",lang:"اللغات"}:locale==="fr"?{open:"Ouvrir la navigation",close:"Fermer la navigation",main:"Navigation principale",lang:"Langues"}:{open:"Open navigation",close:"Close navigation",main:"Main navigation",lang:"Languages"};
 useEffect(()=>{
  if(!open)return;
  const first=menuRef.current?.querySelector<HTMLAnchorElement>("a");
  first?.focus();
  const onEscape=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);toggleRef.current?.focus();}};
  const onOutside=(e:PointerEvent)=>{if(!(e.target instanceof Node))return;if(!menuRef.current?.contains(e.target)&&!toggleRef.current?.contains(e.target))setOpen(false);};
  window.addEventListener("keydown",onEscape);
  document.addEventListener("pointerdown",onOutside);
  return()=>{window.removeEventListener("keydown",onEscape);document.removeEventListener("pointerdown",onOutside);};
 },[open]);
 const otherHref=(lang:Locale)=>slug?`${lang==="en"?"":"/"+lang}/projects/${slug}/`:section&&sections.includes(section as Page)?pagePath(lang,section as Page):homePath(lang);
 return <><div className="agency-top-label studio-template-banner"><strong>TAHA IT SOLUTIONS</strong><span>{locale==="fr"?"RÉSEAUX · SYSTÈMES · INFRASTRUCTURE":locale==="ar"?"الشبكات · الأنظمة · البنية التحتية":"NETWORKS · SYSTEMS · INFRASTRUCTURE"}</span></div><header className="header-wrap studio-marketing-header"><div className="site-nav container-xl" dir={locale==="ar"?"rtl":"ltr"}>
 <Link className="brand" href={homePath(locale)} aria-label="Taha Zitane home"><span className="studio-t-logo" aria-hidden="true">T<span>.</span></span><span className="brand-name">{locale==="ar"?"طه زيطان":"TAHA ZITANE"}<span>{locale==="ar"?" / الأنظمة والشبكات":" / SYSTEMS & NETWORKS"}</span></span></Link>
 <nav className="nav-links" aria-label={labels.main}>{sections.map((s,i)=><Link key={s} href={pagePath(locale,s)} aria-current={section===s?"page":undefined}>{c.nav[i]}</Link>)}</nav>
 <div className="nav-right"><div className="language-switcher" aria-label={labels.lang}>{languages.map(lang=><Link href={otherHref(lang)} key={lang} hrefLang={lang} aria-current={lang===locale?"page":undefined} className={lang===locale?"selected":""}>{lang.toUpperCase()}</Link>)}</div></div>
 <button ref={toggleRef} className="nav-toggle" type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open?labels.close:labels.open} onClick={()=>setOpen(v=>!v)}>{open?<X size={24}/>:<Menu size={24}/>}</button>
 </div>
 {open&&<nav ref={menuRef} id="mobile-nav" className="mobile-menu" aria-label={labels.main} dir={locale==="ar"?"rtl":"ltr"}>{sections.map((s,i)=><Link key={s} onClick={()=>setOpen(false)} aria-current={section===s?"page":undefined} href={pagePath(locale,s)}><span className="mobile-link-index">{String(i+1).padStart(2,"0")}</span><span>{c.nav[i]}</span><ArrowUpRight size={17}/></Link>)}<div className="mobile-langs">{languages.map(lang=><Link key={lang} onClick={()=>setOpen(false)} href={otherHref(lang)} className={lang===locale?"selected":""}>{lang.toUpperCase()}</Link>)}</div></nav>}
 </header></>;
}
