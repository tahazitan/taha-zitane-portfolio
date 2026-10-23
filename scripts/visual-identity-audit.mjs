import {readFileSync,existsSync} from "node:fs";
import {resolve} from "node:path";
const root=resolve(import.meta.dirname,"..");
const read=f=>readFileSync(resolve(root,f),"utf8");
const marks=read("src/components/TechnologyMarks.tsx");
const home=read("src/components/Home.tsx");
const sections=read("src/components/SectionPage.tsx");
const experience=read("src/components/ExperienceProof.tsx");
const topology=read("src/components/SourceTopology.tsx");
const css=read("src/app/visual-identity.css");
const professional=read("src/data/professional.ts");
const layout=read("src/app/layout.tsx");
const logos=[...marks.matchAll(/\{key:"([^"]+)",name:[^\n]+logo:true\}/g)].map(m=>m[1]);
if(logos.length<12)throw new Error("Incomplete authentic logo manifest");
for(const logo of logos){
 const f="public/tech-logos/"+logo+(logo==="zabbix"?".webp":".svg");
 if(!existsSync(resolve(root,f)))throw new Error("Missing branded logo asset: "+f);
 if(logo!=="zabbix"&&!read(f).includes("<svg"))throw new Error("Not an SVG: "+f);
}
for(const term of ["FRRouting","Containerlab","GNS3","WireGuard","Cybrary","Enova Santé"])
 if(!marks.includes('name:"'+term+'"')||!marks.includes("logo:false"))throw new Error("Unbranded tool name not documented: "+term);
for(const use of ['TechnologyMarks technologies={serviceTools[i]}','TechnologyMarks technologies={[item.provider]}','institution-name','service-tool-strip'])
 if(!sections.includes(use))throw new Error("Missing relevant service/education mark: "+use);
for(const name of ["EMSI","OFPPT / ISMO","AL-KHAWARIZMI"])if(!sections.includes(name))throw new Error("Missing typographic institution name: "+name);
for(const loc of ["en:","fr:","ar:"])if(!professional.includes(loc))throw new Error("Education translation missing: "+loc);
if(!experience.includes("proof-process-label")||!experience.includes("Enova Santé"))throw new Error("Experience identification missing");
for(const token of ['kind==="router"','kind==="switch"','"client"','e.ports.split(" · ")[0]','source-technology','10.255.0.0/30','172.16.255.0/30','10.254.0.0/30'])
 if(!topology.includes(token))throw new Error("Network source visual missing: "+token);
if(!layout.includes('visual-identity.css')||!layout.includes('site-branding.css'))throw new Error("Visual styles not imported");
if(!css.includes("max-width:550px")||!css.includes("prefers-reduced-motion"))throw new Error("Visual accessibility styles missing");
console.log("PASS: "+logos.length+" real local SVG marks, text-only tools, institutional branding, standalone services and education, FR/EN/AR, sourced ports/IPv4 and responsive styles");
