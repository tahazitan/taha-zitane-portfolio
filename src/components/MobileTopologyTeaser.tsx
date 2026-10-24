import {ArrowUpRight,Layers3,Route} from "lucide-react";
import type {Locale} from "@/data/content";

const copy={
 en:{eyebrow:"ENGINEERING / 3D",title:"Explore the network in 3D",open:"Open interactive infrastructure",alt:"Source-defined Containerlab lab diagram: HQ router connected to Branch router, HQ IT, HQ users; Branch router connected to Branch user.",note:"CONTAINERLAB LAB · CONCEPTUAL VISUAL"},
 fr:{eyebrow:"INGÉNIERIE / 3D",title:"Explorez le réseau en 3D",open:"Ouvrir l’infrastructure interactive",alt:"Schéma du laboratoire Containerlab : routeur du siège relié au routeur de filiale, aux postes IT et utilisateurs; routeur de filiale relié au poste utilisateur.",note:"LAB CONTAINERLAB · VUE CONCEPTUELLE"},
 ar:{eyebrow:"الهندسة / 3D",title:"استكشف الشبكة ثلاثية الأبعاد",open:"استكشف البنية التفاعلية",alt:"مخطط مختبر Containerlab: موجه المقر متصل بموجه الفرع وبجهازي تقنية المعلومات والمستخدمين، وموجه الفرع متصل بجهاز مستخدم.",note:"مختبر CONTAINERLAB · عرض توضيحي"}
} as const;

type Equipment={id:string;name:string;address?:string;x:number;y:number;kind:"router"|"client"};
const equipment:Equipment[]=[
 {id:"hq-rtr",name:"HQ ROUTER",x:137,y:55,kind:"router"},
 {id:"branch-rtr",name:"BRANCH RTR",x:310,y:64,kind:"router"},
 {id:"hq-it",name:"HQ · IT",address:"10.10.10.10",x:65,y:163,kind:"client"},
 {id:"hq-users",name:"HQ · USERS",address:"10.10.20.10",x:181,y:177,kind:"client"},
 {id:"branch-user",name:"BRANCH USER",address:"10.20.30.10",x:329,y:173,kind:"client"}
];

function LabNode({node}:{node:Equipment}){
 const router=node.kind==="router";
 const w=router?110:104;
 return <g className={"mobile-lab-node mobile-lab-node--"+node.kind} transform={`translate(${node.x},${node.y})`}>
  <rect className="mobile-lab-node-shadow" x={-w/2+8} y={-16+10} width={w} height="46" rx="8"/>
  <path d={`M${-w/2} -14 h${w} l8 8 h-${w} z`} fill={router?"#315e77":"#274c61"}/>
  <rect className="mobile-lab-node-face" x={-w/2} y="-14" width={w} height="37" rx="7"/>
  <path className="mobile-lab-node-side" d={`M${w/2} -8 l8 8 v20 l-8 3 z`}/>
  <circle cx={-w/2+14} cy="-3" r="3.5" fill={router?"#73ebcb":"#8cbffd"}/>
  <text x={-w/2+24} y="1" className="mobile-lab-node-name">{node.name}</text>
  {router?<g stroke="#8bd4d6" opacity=".85"><path d="M-28 12 h18 m5 0 h18 m5 0 h18" strokeWidth="2"/><circle cx="35" cy="12" r="2" fill="#8bd4d6"/></g>:
   <text x="0" y="13" textAnchor="middle" className="mobile-lab-node-ip">{node.address}</text>}
 </g>;
}

export default function MobileTopologyTeaser({locale}:{locale:Locale}){
 const t=copy[locale];
 return <a className="mobile-lab-entry" href="#infrastructure" aria-label={t.open} data-mobile-3d-entry="true">
  <div className="mobile-lab-entry-head">
   <div className="mobile-lab-entry-copy">
    <span className="mobile-lab-entry-kicker"><Layers3 size={15} aria-hidden="true"/>{t.eyebrow}</span>
    <strong>{t.title}</strong>
   </div>
   <span className="mobile-lab-entry-expand" aria-hidden="true"><ArrowUpRight size={20}/></span>
  </div>
  <div className="mobile-lab-viewport" dir="ltr">
   <div className="mobile-lab-stamp"><Route size={12} aria-hidden="true"/> HQ / BRANCH</div>
   <svg viewBox="0 0 400 237" className="mobile-lab-topology" role="img" aria-label={t.alt} preserveAspectRatio="xMidYMid meet">
    <defs>
     <linearGradient id="labPreviewCircuit" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5fe7cf"/><stop offset="1" stopColor="#7dbfff"/></linearGradient>
    </defs>
    <g className="mobile-lab-grid" stroke="#37647a" strokeWidth=".7" opacity=".4">
     {Array.from({length:11},(_,i)=><path key={`h${i}`} d={`M0 ${i*24} H400`}/>)}
     {Array.from({length:17},(_,i)=><path key={`v${i}`} d={`M${i*25} 0 V237`}/>)}
    </g>
    <g className="mobile-lab-connections" fill="none" stroke="url(#labPreviewCircuit)" strokeWidth="2.4" strokeLinejoin="round">
     <path d="M137 55 H310 V64"/>
     <path d="M137 55 H100 V128 L65 163"/>
     <path d="M137 55 V115 L181 177"/>
     <path d="M310 64 V136 L329 173"/>
    </g>
    <g className="mobile-lab-flow" fill="none" stroke="#e5c39b" strokeWidth="3.6" strokeDasharray="9 17">
     <path d="M137 55 H310 V64"/>
     <path d="M137 55 V115 L181 177"/>
     <path d="M310 64 V136 L329 173"/>
    </g>
    <text x="219" y="40" textAnchor="middle" className="mobile-lab-protocol">OSPF / WAN</text>
    {equipment.map(node=><LabNode key={node.id} node={node}/>)}
   </svg>
  </div>
  <div className="mobile-lab-entry-foot">
   <span>{t.note}</span>
   <span className="mobile-lab-entry-cta">{t.open}<ArrowUpRight size={14} aria-hidden="true"/></span>
  </div>
 </a>;
}
