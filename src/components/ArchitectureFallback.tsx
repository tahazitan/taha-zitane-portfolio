"use client";
import {topologyDesigns,type TopologyNode} from "@/data/labTopologies";
import type {Focus} from "./NetworkWorld";
import type {Locale} from "@/data/content";

/** 2D fallback uses the same architecture source as the WebGL scene.
 * It is a reference design, not live data or a fabricated screenshot. */
const architecture=topologyDesigns.find(item=>item.id==="enterprise")!;
const positions:Record<string,[number,number]>={
 remote:[160,90],wan:[535,90],
 branchB:[170,288],branchBSw:[170,447],branchBUsers:[170,610],
 hqfw:[535,250],core:[535,420],
 dmz:[342,290],dmzapp:[342,455],
 identity:[410,610],linux:[600,610],siem:[760,610],
 branchA:[932,288],branchASw:[932,447],branchAUsers:[932,610]
};
const visible=architecture.nodes.filter(node=>Boolean(positions[node.id]));
const edges=architecture.links.filter(([a,b])=>positions[a]&&positions[b]);
const focusOf=(node:TopologyNode):Focus=>node.kind==="firewall"?"security":node.kind==="monitor"?"monitoring":node.kind==="server"?"systems":"network";
const color:Record<Focus,string>={network:"#71cbdc",systems:"#b1c4d9",security:"#e2b785",monitoring:"#87cbae"};
const copy={
 en:{scope:"HQ · 2 branches · remote access",status:"Enterprise reference design · not a production network",hint:"Select a node to inspect its role"},
 fr:{scope:"Siège · 2 agences · accès distant",status:"Architecture de référence · non déployée en production",hint:"Sélectionnez un équipement"},
 ar:{scope:"المقر الرئيسي · فرعان · الوصول عن بُعد",status:"تصميم مرجعي وليس شبكة إنتاجية",hint:"اختر جهازاً لاستعراض دوره"}
} as const;
export default function ArchitectureFallback({active,locale,onInspect,selected}:{active:Focus;locale:Locale;onInspect:(id:string)=>void;selected:string|null}){
 const t=copy[locale];
 return <div className="reference-topology-shell">
  <div className="reference-topology-summary"><strong>{t.scope}</strong><span>{visible.length} nodes · {edges.length} source links</span></div>
  <svg className="reference-topology-svg" viewBox="0 0 1100 700" xmlns="http://www.w3.org/2000/svg" role="group" aria-label={architecture.title}>
   <defs><pattern id="reference-grid" width="35" height="35" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#739ab1" opacity=".2"/></pattern></defs>
   <rect x="0" y="0" width="1100" height="700" fill="#102a3c"/>
   <rect x="0" y="0" width="1100" height="700" fill="url(#reference-grid)"/>
   <rect x="35" y="214" width="266" height="455" rx="7" fill="#173348" stroke="#42677b" strokeDasharray="5 7"/>
   <rect x="305" y="195" width="508" height="473" rx="7" fill="#12384d" stroke="#4a7e91" strokeDasharray="5 7"/>
   <rect x="817" y="214" width="260" height="455" rx="7" fill="#173348" stroke="#42677b" strokeDasharray="5 7"/>
   <g fill="#a5c7d5" fontSize="19" fontFamily="Arial, sans-serif" fontWeight="600" letterSpacing="2"><text x="57" y="244">BRANCH B</text><text x="327" y="227">HEADQUARTERS</text><text x="839" y="244">BRANCH A</text></g>
   {edges.map(([a,b])=>{
    const pa=positions[a],pb=positions[b];
    const na=architecture.nodes.find(n=>n.id===a)!,nb=architecture.nodes.find(n=>n.id===b)!;
    const lit=focusOf(na)===active||focusOf(nb)===active;
    const vpn=(a==="branchA"||a==="branchB")&&b==="hqfw";
    return <g key={a+"-"+b}><path d={`M${pa[0]},${pa[1]} L${pb[0]},${pb[1]}`} stroke={vpn?"#dfae7f":"#6ba5bb"} strokeWidth={vpn?4:3} strokeDasharray={vpn?"13 11":undefined} opacity={lit?0.9:0.25} fill="none"/><title>{na.label+" ↔ "+nb.label}</title></g>;
   })}
   {visible.map(node=>{
    const [x,y]=positions[node.id];const focus=focusOf(node),lit=focus===active;
    return <g key={node.id} role="button" tabIndex={0} aria-pressed={selected===node.id} aria-label={node.label+" "+node.kind} onClick={()=>onInspect(node.id)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onInspect(node.id)}}} className="reference-topology-device" transform={`translate(${x},${y})`}>
     <rect x="-67" y="-30" width="134" height="62" rx="4" fill={selected===node.id?"#355b6b":"#193b52"} stroke={lit?color[focus]:"#537489"} strokeWidth={selected===node.id?4:2}/>
     <path d="M-58 -19h21" stroke={color[focus]} strokeWidth="4" opacity={lit?1:.35}/>
     <text x="-55" y="4" fontFamily="monospace" fontSize="12" fill="#8cb7c8">{node.id.toUpperCase()}</text>
     <text x="0" y="21" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600" fill="#eef9fd" textLength={node.label.length>16?119:undefined} lengthAdjust="spacingAndGlyphs">{node.label}</text>
     <title>{node.label} · {node.kind}</title>
    </g>;
   })}
  </svg>
  <div className="reference-topology-note"><span>{t.status}</span><span>{t.hint}</span></div>
 </div>;
}
