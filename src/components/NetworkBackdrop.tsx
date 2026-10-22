"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Scene = dynamic(()=>import("./NetworkScene"),{ssr:false,loading:()=>null});
export default function NetworkBackdrop(){
 const [enabled,setEnabled]=useState(false);
 useEffect(()=>{
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
  const small=window.matchMedia("(max-width: 640px)");
  const update=()=>setEnabled(!reduce.matches && !small.matches);
  update();reduce.addEventListener("change",update);small.addEventListener("change",update);
  return()=>{reduce.removeEventListener("change",update);small.removeEventListener("change",update)};
 },[]);
 return enabled ? <Scene/> : <div className="static-network" aria-hidden="true"><svg viewBox="0 0 600 360"><g fill="none" stroke="currentColor" strokeWidth="1" opacity=".35"><path d="M35 170 140 62 249 155 366 38 545 113 470 246 314 295 188 252 35 170Zm105-108 48 190 61-97 65 140 52-257 104 208-221-91 296-42M35 170l279 125"/></g><g fill="#d1f879">{[[35,170],[140,62],[249,155],[366,38],[545,113],[470,246],[314,295],[188,252]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===2?6:4}/>)}</g></svg></div>;
}
