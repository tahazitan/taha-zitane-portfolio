import type {Locale} from "@/data/content";

/** Service illustrations depict the scope of an offer, never a live deployment. */
type Props={index:number;locale:Locale;title:string};
function Box({x,y,w=128,name,sub}:{x:number;y:number;w?:number;name:string;sub?:string}){
 return <g><rect className="service-diagram-node" x={x} y={y} width={w} height="48" rx="6"/><text className="service-diagram-label" x={x+w/2} y={y+(sub?19:29)} textAnchor="middle">{name}</text>{sub&&<text className="service-diagram-sub" x={x+w/2} y={y+34} textAnchor="middle">{sub}</text>}</g>;
}
function RemoteSupport(){return <>
 <Box x={23} y={52} w={138} name="USER DEVICE" sub="ISSUE / REQUEST"/>
 <Box x={319} y={52} w={138} name="IT SUPPORT" sub="DIAGNOSIS"/>
 <path className="service-diagram-link" d="M161 76 H319"/>
 <path className="service-diagram-packets" d="M161 76 H319"/>
 <text className="service-diagram-sub" x="240" y="58" textAnchor="middle">REMOTE SESSION</text>
 <text className="service-diagram-annotation" x="240" y="121" textAnchor="middle">VERIFY · DOCUMENT</text>
 <path className="service-diagram-marker" d="M233 128 l5 5 11 -12"/>
 </>}
function Infrastructure(){return <>
 <Box x={19} y={54} w={107} name="LAN" sub="CLIENTS"/>
 <Box x={187} y={54} w={107} name="SERVER" sub="WINDOWS / LINUX"/>
 <Box x={352} y={54} w={107} name="VPS" sub="HOSTED"/>
 <path className="service-diagram-link" d="M126 78 H187 M294 78 H352"/>
 <path className="service-diagram-packets" d="M126 78 H187 M294 78 H352"/>
 <text className="service-diagram-annotation" x="241" y="130" textAnchor="middle">NETWORK · DNS · ACCESS</text>
 </>}
function Review(){return <>
 <Box x={16} y={54} w={118} name="TRAFFIC" sub="PACKETS"/>
 <Box x={180} y={54} w={121} name="ANALYSIS" sub="LOGS / CONFIG"/>
 <Box x={352} y={54} w={111} name="HANDOVER" sub="FINDINGS"/>
 <path className="service-diagram-link" d="M134 78 H180 M301 78 H352"/>
 <path className="service-diagram-packets" d="M134 78 H180 M301 78 H352"/>
 <path className="service-diagram-wave" d="M186 118 H207 L218 106 L232 129 L246 101 L260 119 H290"/>
 <text className="service-diagram-annotation" x="382" y="132" textAnchor="middle">REVIEW</text>
 </>}
function Architecture(){return <>
 <Box x={186} y={13} w={108} name="CORE" sub="NETWORK"/>
 <path className="service-diagram-link" d="M240 61 V76 H76 V97 M240 76 V97 M240 76 H405 V97"/>
 <path className="service-diagram-packets" d="M240 61 V76 H76 V97"/>
 <Box x={20} y={97} w={113} name="USERS" sub="VLAN"/>
 <Box x={183} y={97} w={114} name="SERVERS" sub="VLAN"/>
 <Box x={350} y={97} w={113} name="DMZ" sub="POLICIES"/>
 </>}
const visuals=[RemoteSupport,Infrastructure,Review,Architecture] as const;
const labels={
 en:["Remote support workflow","Server, network and VPS configuration","Structured diagnosis and configuration review","Infrastructure architecture and documentation"],
 fr:["Méthode de support à distance","Configuration des serveurs, réseaux et VPS","Diagnostic structuré et revue de configuration","Architecture et documentation"],
 ar:["مسار الدعم التقني عن بعد","إعداد الخوادم والشبكات وVPS","التشخيص المنهجي ومراجعة الإعدادات","تصميم البنية التحتية وتوثيقها"]
} as const;
export default function ServiceVisual({index,locale,title}:Props){
 const Visual=visuals[index];if(!Visual)return null;
 return <div className={"service-diagram service-diagram--"+index} role="img" aria-label={title+": "+labels[locale][index]} dir="ltr">
  <svg viewBox="0 0 480 165" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"><Visual/></svg>
 </div>;
}
