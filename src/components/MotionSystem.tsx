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
  return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update);document.removeEventListener("pointermove",glow);if(frame)window.cancelAnimationFrame(frame)};
 },[pathname]);
 return <div id="site-scroll-progress" className="site-scroll-progress" aria-hidden="true"/>;
}