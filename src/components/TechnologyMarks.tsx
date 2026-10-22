/** Authentic self-hosted technology marks, placed in context throughout the site.
 * Icon files are sourced from Simple Icons, Devicon and Wazuh (see docs).
 * Trademark marks identify technologies only; they do not imply certification or partnership.
 */
type Variant = "hero" | "card" | "inline" | "case" | "mini";
type Brand = {key:string;name:string;matcher:RegExp};
const brands:Brand[] = [
 {key:"windows",name:"Microsoft Windows",matcher:/\b(windows|active directory|ad ds|gpo|iis|microsoft)\b/i},
 {key:"anydesk",name:"AnyDesk",matcher:/\banydesk\b/i},
 {key:"cisco",name:"Cisco",matcher:/\b(cisco|packet tracer)\b/i},
 {key:"linux",name:"Linux",matcher:/\blinux\b/i},
 {key:"ubuntu",name:"Ubuntu",matcher:/\bubuntu\b/i},
 {key:"debian",name:"Debian",matcher:/\bdebian\b/i},
 {key:"proxmox",name:"Proxmox VE",matcher:/\bproxmox\b/i},
 {key:"docker",name:"Docker",matcher:/\bdocker\b/i},
 {key:"fortinet",name:"Fortinet",matcher:/\b(fortigate|fortinet)\b/i},
 {key:"paloalto",name:"Palo Alto Networks",matcher:/\b(palo alto|paloalto|pan.os)\b/i},
 {key:"wireshark",name:"Wireshark",matcher:/\bwireshark\b/i},
 {key:"wazuh",name:"Wazuh",matcher:/\bwazuh\b/i},
 {key:"snort",name:"Snort",matcher:/\bsnort\b/i},
 {key:"github",name:"GitHub",matcher:/\bgithub\b/i}
];
export default function TechnologyMarks({technologies,limit=5,variant="inline"}:{technologies:string[];limit?:number;variant?:Variant}){
 const haystack=technologies.join(" | ");
 const matched=brands.filter(brand=>brand.matcher.test(haystack)).slice(0,limit);
 if(!matched.length)return null;
 return <div className={"tech-marks tech-marks--"+variant} aria-label="Technologies">
   {matched.map(brand=><span className="tech-mark" key={brand.key} title={brand.name}>
     <span className="tech-mark-image"><img src={"/tech-logos/"+brand.key+".svg"} width={25} height={25} alt="" loading={variant==="hero"?"eager":"lazy"} decoding="async" /></span>
     <span className="tech-mark-label">{brand.name}</span>
   </span>)}
 </div>;
}
