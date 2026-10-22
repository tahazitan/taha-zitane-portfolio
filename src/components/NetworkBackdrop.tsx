"use client";

/** Author-built, semantically connected enterprise reference diagram.
 * This complements the interactive project-specific 3D atlas below.
 */
const devices=[
 {id:"wan",x:300,y:36,w:134,title:"WAN",subtitle:"ISP / INTERNET",kind:"cloud"},
 {id:"firewall",x:300,y:128,w:182,title:"SECURITY EDGE",subtitle:"FIREWALL / IPsec",kind:"firewall"},
 {id:"core",x:300,y:218,w:190,title:"CAMPUS CORE",subtitle:"L3 / TRUNK",kind:"switch"},
 {id:"users",x:100,y:321,w:156,title:"USER SEGMENT",subtitle:"VLAN 10",kind:"switch"},
 {id:"servers",x:300,y:321,w:156,title:"SERVER SEGMENT",subtitle:"VLAN 20",kind:"server"},
 {id:"mgmt",x:500,y:321,w:156,title:"MGMT SEGMENT",subtitle:"VLAN 30",kind:"server"}
] as const;

const traces=[
 "M300 58 V101","M300 155 V190","M300 244 V264 H100 V294",
 "M300 244 V294","M300 244 V264 H500 V294"
];

export default function NetworkBackdrop(){
 return <div className="network-schematic" aria-hidden="true">
 <svg viewBox="0 0 600 370" xmlns="http://www.w3.org/2000/svg" focusable="false">
  <defs>
   <linearGradient id="schematicCase" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#214e60"/><stop offset="1" stopColor="#123447"/></linearGradient>
   <linearGradient id="schematicEdge"><stop stopColor="#df866c"/><stop offset="1" stopColor="#b35b4a"/></linearGradient>
  </defs>
  <g className="schematic-grid">
   {Array.from({length:12},(_,i)=><path key={"h"+i} d={"M0 "+i*34+" H600"} />)}
   {Array.from({length:20},(_,i)=><path key={"v"+i} d={"M"+i*32+" 0 V370"} />)}
  </g>
  <g fill="none" stroke="#6db3c8" strokeWidth="1.8" strokeLinejoin="round">
   {traces.map((d,i)=><path key={i} d={d} strokeDasharray={i===0?"5 5":undefined}/>)}
  </g>
  {traces.map((d,i)=><circle key={i} r="3.2" fill={i===0?"#f4bd85":"#91e5e0"} className="schematic-packet"><animateMotion dur={(3.6+i*.42)+"s"} path={d} repeatCount="indefinite"/></circle>)}
  {devices.map((p)=><g key={p.id} transform={"translate("+(p.x-p.w/2)+","+(p.y-24)+")"}>
   <rect x="1" y="4" width={p.w} height="62" rx="8" fill="#071d29" opacity=".55"/>
   <rect width={p.w} height="62" rx="8" fill="url(#schematicCase)" stroke={p.kind==="firewall"?"#e4a28b":"#6198a9"} strokeWidth="1.2"/>
   {p.kind==="cloud"?<g fill="none" stroke="#a9deec" strokeWidth="2"><path d="M17 31h28a9 9 0 001-18 12 12 0 00-21-3A10 10 0 0017 31z"/></g>:null}
   {p.kind==="firewall"?<g transform="translate(14 15)"><rect width="35" height="29" rx="5" fill="url(#schematicEdge)"/><path d="M17 5l12 6v8l-12 7L5 19v-8z" fill="none" stroke="#fff1e6" strokeWidth="2"/></g>:null}
   {p.kind==="switch"?<g transform="translate(11 19)"><rect width="43" height="24" rx="3" fill="#124154" stroke="#65a9b8"/>{Array.from({length:8},(_,j)=><rect key={j} x={5+(j%4)*9} y={5+Math.floor(j/4)*10} width="5" height="4" rx=".5" fill={j%3===0?"#aadad2":"#4d849c"}/>)}</g>:null}
   {p.kind==="server"?<g transform="translate(18 10)"><rect width="30" height="43" rx="4" fill="#142535" stroke="#a8c7d8"/>{[0,1,2].map(j=><g key={j}><rect x="4" y={5+j*12} width="22" height="9" rx="2" fill="#275367"/><circle cx="9" cy={9+j*12} r="2" fill="#8ce3c3"/></g>)}</g>:null}
   <text x={p.kind==="cloud"?55:66} y="25" fill="#eefaff" fontFamily="Arial, sans-serif" fontSize="12.5" fontWeight="700">{p.title}</text>
   <text x={p.kind==="cloud"?55:66} y="43" fill="#a6c8d8" fontFamily="Arial, sans-serif" fontSize="9.3">{p.subtitle}</text>
  </g>)}
 </svg>
 </div>;
}
