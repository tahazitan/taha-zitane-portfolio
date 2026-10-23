import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const read=(file)=>readFileSync(path.join(root,file),'utf8');
const content=read('src/data/content.ts')+read('src/data/additionalProjects.ts');
const css=read('src/app/globals.css');
const home=read('src/components/Home.tsx');
const nav=read('src/components/Navigation.tsx');
const diagram=read('src/components/SourceTopology.tsx');

const required=[
 'src/app/page.tsx','src/app/[locale]/page.tsx',
 'src/components/Home.tsx','src/components/Navigation.tsx',
 'src/components/ProjectExplorer.tsx','src/components/CasePage.tsx',
 'src/components/SourceTopology.tsx','src/components/DesignReview.tsx',
 'src/data/projectReviews.ts','src/data/professional.ts',
 'public/contact/taha-zitane.vcf',
 'public/images/taha-portrait.webp','public/meta/mark.svg',
 'public/meta/portfolio-social.png','src/app/sitemap.ts',
 'scripts/site-smoke.mjs','scripts/browser-smoke.mjs'
];
for(const file of required)if(!existsSync(path.join(root,file)))throw new Error('Missing required artifact: '+file);

const slugs=['enterprise-network-lab','windows-server-ad','remote-it-support','hospital-network-support','security-observability-labs','firewall-ipsec-lab','proxmox-virtualization-lab','cisco-campus-network-lab'];
for(const slug of slugs)if(!(content.includes('slug:"'+slug+'"')||content.includes("slug:'"+slug+"'")))throw new Error('Missing project slug: '+slug);
for(const locale of ['en','fr','ar'])if(!content.includes(locale+':'))throw new Error('Missing locale: '+locale);
if(!content.includes('طه زيطان')||content.includes('طه زيتان'))throw new Error('Wrong Arabic identity');

const anchors=['work','experience','education','expertise','contact'];
for(const anchor of anchors)if(!nav.includes('"'+anchor+'"'))throw new Error('Navigation missing '+anchor);
if(!nav.includes('c.nav[5]'))throw new Error('Contact label not preserved');

const sections=['className="hero"','className="about-section"','className="section experience-section"','className="section work-section"'];
for(let i=1;i<sections.length;i++)if(home.indexOf(sections[i])<=home.indexOf(sections[i-1]))throw new Error('Incorrect portfolio story order');
for(const necessary of ['ProjectExplorer','SourceTopology','portrait-photo','/images/taha-portrait.webp']){
 if(!home.includes(necessary))throw new Error('Missing real portfolio element: '+necessary);
}
if(home.includes('hero-resume-link')||home.includes('<LabRoadmap')||home.includes('cv/Taha_Zitane_CV_2026.pdf'))throw new Error('CV download and lab roadmap must stay off the homepage');
for(const unused of ['SolutionMedia','SkillEvidence','TechnologyReferences','engineeringMethod','hero-proof-strip','NetworkBackdrop','TopologyStudio','DiagnosticExplorer','SecurityOperationsDesk']){
 if(home.includes(unused))throw new Error('Unwanted widget still on homepage: '+unused);
}
if(home.includes('hero-person">'+String.fromCharCode(36))||home.includes('hero-serif>'+String.fromCharCode(36)))throw new Error('Stray dollar prefix on identity');
if(!/@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/.test(css))throw new Error('Reduced motion accessibility missing');
if(!css.includes('.work-cards')||!css.includes('.hero-visual { order: -1;'))throw new Error('Responsive layout or mobile portrait order missing');

for(const node of ['hq-rtr','branch-rtr','hq-switch','branch-switch']){
 if(!diagram.includes(node))throw new Error('Source diagram missing documented node: '+node);
}
for(const source of ['topology.clab.yml','secure/topology.secure.clab.yml','github.com/tahazitan/enterprise-network-lab']){
 if(!diagram.includes(source))throw new Error('Diagram source provenance missing: '+source);
}
console.log('PASS: professional story order, clean identity, five nav links, 8 projects, 3 languages, actual portrait, real source diagram and responsive accessibility');
