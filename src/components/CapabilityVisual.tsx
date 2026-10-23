import type {Locale} from "@/data/content";

type VisualProps={index:number;locale:Locale;label:string};
type NodeProps={x:number;y:number;w?:number;h?:number;name:string;detail?:string;accent?:boolean};
function Node({x,y,w=112,h=46,name,detail,accent=false}:NodeProps){
 return <g>
  <rect className={"capvis-node"+(accent?" capvis-node--accent":"")} x={x} y={y} width={w} height={h} rx="7"/>
  <text className="capvis-name" x={x+w/2} y={y+(detail?19:h/2+4)} textAnchor="middle">{name}</text>
  {detail&&<text className="capvis-detail" x={x+w/2} y={y+35} textAnchor="middle">{detail}</text>}
 </g>;
}
const scenes={
 en:["Network segmentation and routed connectivity","Systems and virtualization infrastructure","Security zones, policies and VPN connectivity","System monitoring and incident observability","Directory identity and endpoint services","Traffic capture and troubleshooting"],
 fr:["Segmentation et routage réseau","Administration systèmes et virtualisation","Zones de sécurité, règles et VPN","Supervision systèmes et observabilité","Identité et services des postes","Capture des paquets et diagnostic"],
 ar:["تقسيم الشبكات والتوجيه","إدارة الأنظمة والبنية الافتراضية","المناطق الأمنية والسياسات والاتصال الآمن","مراقبة الأنظمة وتحليل الأحداث","إدارة الهوية وخدمات الأجهزة","تحليل حركة البيانات وتشخيص الأعطال"]
} as const;
function Networks(){return <>
 <path className="capvis-line" d="M240 72 V94 H100 V120 M240 94 H380 V120"/>
 <path className="capvis-flow" d="M100 120 V94 H240 V72"/>
 <Node x={179} y={21} w={122} name="L3 / ROUTER" detail="ROUTING" accent/>
 <Node x={34} y={122} w={132} name="VLAN 10" detail="USERS"/>
 <Node x={314} y={122} w={132} name="VLAN 20" detail="SERVERS"/>
 <g className="capvis-leds">{[0,1,2].map(i=><circle key={i} cx={205+i*22} cy={82} r={3}/>)}</g>
 </>}
function Systems(){return <>
 <rect className="capvis-rack" x="40" y="21" width="122" height="145" rx="9"/>
 {[0,1,2].map(i=><g key={i}><rect className="capvis-device" x="51" y={34+i*38} width="100" height="28" rx="4"/><circle className="capvis-led" cx="133" cy={48+i*38} r="3"/><path className="capvis-device-detail" d={`M64 ${48+i*38} h33`}/></g>)}
 <path className="capvis-line" d="M162 93 H227 V52 H284 M227 93 H284 M227 93 V138 H284"/>
 <path className="capvis-flow" d="M162 93 H227 V52 H284"/>
 <Node x={284} y={30} w={152} h={42} name="WINDOWS SERVER"/>
 <Node x={284} y={75} w={152} h={42} name="LINUX / DOCKER"/>
 <Node x={284} y={120} w={152} h={42} name="VIRTUAL MACHINES"/>
 </>}
function Security(){return <>
 <Node x={22} y={74} w={104} name="WAN" detail="INBOUND"/>
 <path className="capvis-line" d="M126 97 H190 M288 97 H348"/>
 <path className="capvis-flow" d="M126 97 H190"/>
 <Node x={190} y={64} w={98} h={64} name="FIREWALL" detail="POLICY" accent/>
 <path className="capvis-blocked" d="M239 128 V157 H195"/>
 <path className="capvis-blocked" d="M192 151 l10 12 m0 -12 l-10 12"/>
 <Node x={348} y={74} w={104} name="LAN" detail="TRUST"/>
 <text className="capvis-minitext" x={190} y={177}>FILTER</text>
 <text className="capvis-minitext" x={343} y={61}>VPN / ZONES</text>
 </>}
function Monitoring(){return <>
 <Node x={25} y={34} w={128} name="ENDPOINTS" detail="LOG SOURCES"/>
 <Node x={25} y={112} w={128} name="NETWORK" detail="SYSLOG"/>
 <path className="capvis-line" d="M153 57 H203 V93 H248 M153 135 H203 V93"/>
 <path className="capvis-flow" d="M153 57 H203 V93 H248"/>
 <rect className="capvis-console" x="247" y="22" width="207" height="144" rx="7"/>
 <path className="capvis-device-detail" d="M261 48 H440"/>
 <text className="capvis-name" x="265" y="40">MONITORING</text>
 <text className="capvis-detail" x="266" y="68">EVENTS / LOGS</text>
 <path className="capvis-wave" d="M264 127 H290 L300 114 L310 136 L328 84 L346 126 H372 L388 107 L400 129 H439"/>
 <path className="capvis-gridline" d="M264 147 H439"/>
 </>}
function Identity(){return <>
 <Node x={25} y={56} w={144} h={72} name="ACTIVE DIRECTORY" detail="IDENTITY" accent/>
 <path className="capvis-line" d="M169 91 H235 V49 H286 M235 91 H286 M235 91 V133 H286"/>
 <path className="capvis-flow" d="M169 91 H235 V49 H286"/>
 <Node x={286} y={24} w={155} name="DNS" detail="RESOLUTION"/>
 <Node x={286} y={70} w={155} name="DHCP" detail="ADDRESSING"/>
 <Node x={286} y={116} w={155} name="ENDPOINTS" detail="ACCESS"/>
 </>}
function Analysis(){return <>
 <rect className="capvis-console" x="32" y="19" width="416" height="146" rx="8"/>
 <text className="capvis-detail" x="49" y="43">PACKET INSPECTION</text>
 <path className="capvis-device-detail" d="M49 52 H432"/>
 {[
  ["FRAME","L2 / ETHERNET"],
  ["NETWORK","L3 / IP"],
  ["TRANSPORT","L4 / TCP · UDP"]
 ].map((row,i)=><g key={i}>
  <rect className={i===1?"capvis-packet capvis-packet--highlight":"capvis-packet"} x="49" y={60+i*30} width="382" height="26" rx="3"/>
  <text className="capvis-name" x="64" y={77+i*30}>{row[0]}</text>
  <text className="capvis-detail" textAnchor="end" x="418" y={77+i*30}>{row[1]}</text>
 </g>)}
 <path className="capvis-flow" d="M49 57 H431"/>
 </>}
const visuals=[Networks,Systems,Security,Monitoring,Identity,Analysis] as const;
export default function CapabilityVisual({index,locale,label}:VisualProps){
 const Scene=visuals[index];if(!Scene)return null;
 return <div className={"capability-visual capability-visual--"+index} role="img" aria-label={label+": "+scenes[locale][index]} dir="ltr">
  <svg viewBox="0 0 480 190" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet"><Scene/></svg>
 </div>;
}
