"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
/** Lightweight, route-aware progressive enhancement; never hides real content. */
export default function MotionSystem(){
 const pathname=usePathname();
 useEffect(()=>{
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const progress=document.getElementById("site-scroll-progress");
  let frame=0;
  const update=()=>{
   if(frame)return;
   frame=window.requestAnimationFrame(()=>{
    frame=0;
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    progress?.style.setProperty("--site-progress",String(Math.min(1,Math.max(0,window.scrollY/max))));
    document.documentElement.dataset.scrolled=window.scrollY>44?"true":"false";
   });
  };
  // Progressive section reveals across home, all six directories and all case-study routes.
  // The content never starts invisible: search, keyboard and no-JS visitors keep full access.
  const select=".landing-overview-heading,.overview-card,.section-site .detail-hero-body > div:first-child,.section-site .domain-visual,.section-site .work-card,.section-site .experience-item--visual,.section-site .study-item,.section-site .training-item,.section-site .capability-card,.section-site .service-item,.section-site .process-steps>div,.section-site .contact-route-list a,.section-site .contact-detail-grid>div,.case-site .case-heading,.case-site .case-overview-strip,.case-site .case-info-bar>div,.case-site .case-intro,.case-site .related-work-grid a,.case-site .design-review-card,.case-site .enterprise-card";
  const observed=new WeakSet<Element>();
  const observer=!reduced&&"IntersectionObserver" in window?new IntersectionObserver((entries)=>{
   for(const entry of entries)if(entry.isIntersecting){
    const element=entry.target as HTMLElement;
    element.dataset.motionSeen="true";
    observer?.unobserve(element);
   }
  },{rootMargin:"0px 0px -4% 0px",threshold:.09}):null;
  const scan=()=>{
   if(!observer)return;
   document.querySelectorAll<HTMLElement>(select).forEach(el=>{
    if(observed.has(el))return;
    observed.add(el);
    el.classList.add("motion-enter");
    observer.observe(el);
   });
  };
  scan();
  const projectList=document.querySelector(".work-cards");
  const mutation=projectList&&observer?new MutationObserver(scan):null;
  if(projectList&&mutation)mutation.observe(projectList,{childList:true});
  const glow=(event:PointerEvent)=>{
   if(reduced||event.pointerType!=="mouse")return;
   const target=event.target;
   if(!(target instanceof Element))return;
   const card=target.closest<HTMLElement>(".overview-card");
   if(!card)return;
   const rect=card.getBoundingClientRect();
   card.style.setProperty("--glow-x",((event.clientX-rect.left)/rect.width*100).toFixed(1)+"%");
   card.style.setProperty("--glow-y",((event.clientY-rect.top)/rect.height*100).toFixed(1)+"%");
  };
  update();
  window.addEventListener("scroll",update,{passive:true});
  window.addEventListener("resize",update,{passive:true});
  document.addEventListener("pointermove",glow,{passive:true});
  return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update);document.removeEventListener("pointermove",glow);mutation?.disconnect();observer?.disconnect();if(frame)window.cancelAnimationFrame(frame);};
 },[pathname]);
 return <div id="site-scroll-progress" className="site-scroll-progress" aria-hidden="true"/>;
}