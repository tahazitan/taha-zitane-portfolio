/** Vendor marks are self-hosted and provenance documented in docs/TECH-LOGOS.md.
 * Text-only chips are deliberate: never invent a logo for a tool or institution.
 * Marks refer to tools, not credentials, employment or vendor endorsements.
 */
type Variant = "hero" | "card" | "inline" | "case" | "mini";
type Brand = {key:string;name:string;matcher:RegExp;logo:boolean};
const brands:Brand[] = [
 {key:"windows",name:"Microsoft Windows",matcher:/\b(windows(?: server)?|active directory|ad ds|gpo|iis|microsoft)\b/i,logo:true},
 {key:"cisco",name:"Cisco",matcher:/\b(cisco|packet tracer)\b/i,logo:true},
 {key:"anydesk",name:"AnyDesk",matcher:/\banydesk\b/i,logo:true},
 {key:"linux",name:"Linux",matcher:/\blinux\b/i,logo:true},
 {key:"ubuntu",name:"Ubuntu",matcher:/\bubuntu\b/i,logo:true},
 {key:"debian",name:"Debian",matcher:/\bdebian\b/i,logo:true},
 {key:"proxmox",name:"Proxmox VE",matcher:/\bproxmox\b/i,logo:true},
 {key:"docker",name:"Docker",matcher:/\bdocker\b/i,logo:true},
 {key:"fortinet",name:"Fortinet / FortiGate",matcher:/\b(fortigate|fortinet)\b/i,logo:true},
 {key:"paloalto",name:"Palo Alto Networks",matcher:/\b(palo alto|paloalto|pan.os)\b/i,logo:true},
 {key:"wireshark",name:"Wireshark",matcher:/\bwireshark\b/i,logo:true},
 {key:"wazuh",name:"Wazuh",matcher:/\bwazuh\b/i,logo:true},
 {key:"snort",name:"Snort",matcher:/\bsnort\b/i,logo:true},
 {key:"github",name:"GitHub",matcher:/\bgithub\b/i,logo:true},
 {key:"frr",name:"FRRouting",matcher:/\b(frrouting|frr)\b/i,logo:false},
 {key:"containerlab",name:"Containerlab",matcher:/\bcontainerlab\b/i,logo:false},
 {key:"gns3",name:"GNS3",matcher:/\bgns3\b/i,logo:false},
 {key:"zabbix",name:"Zabbix",matcher:/\bzabbix\b/i,logo:false},
 {key:"wireguard",name:"WireGuard",matcher:/\bwireguard\b/i,logo:false},
 {key:"cybrary",name:"Cybrary",matcher:/\bcybrary\b/i,logo:false},
 {key:"enova",name:"Enova Santé",matcher:/\benova\s+sant[ée]/i,logo:false}
];
export default function TechnologyMarks({technologies,limit=5,variant="inline"}:{technologies:readonly string[];limit?:number;variant?:Variant}){
 const haystack=technologies.join(" | ");
 const matched=brands.filter(brand=>brand.matcher.test(haystack)).slice(0,limit);
 if(!matched.length)return null;
 return <div className={"tech-marks tech-marks--"+variant} aria-label="Tools and technologies">
   {matched.map(brand=><span className={"tech-mark "+(brand.logo?"tech-mark--logo":"tech-mark--wordmark")} key={brand.key} title={brand.name} aria-label={brand.name}>
     {brand.logo&&<span className="tech-mark-image"><img src={"/tech-logos/"+brand.key+".svg"} width={25} height={25} alt="" loading={variant==="hero"?"eager":"lazy"} decoding="async" /></span>}
     <span className="tech-mark-label">{brand.name}</span>
   </span>)}
 </div>;
}
