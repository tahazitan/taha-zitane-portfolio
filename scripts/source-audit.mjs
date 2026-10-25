import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const read=(file)=>readFileSync(path.join(root,file),'utf8');
const content=read('src/data/content.ts')+read('src/data/additionalProjects.ts');
const css=read('src/app/globals.css');
const home=read('src/components/Home.tsx');
const section=read('src/components/SectionPage.tsx');
const overview=read('src/components/LandingOverview.tsx');
const immersive=read('src/components/InfrastructureStage.tsx');
const network3d=read('src/components/NetworkWorld.tsx');
const motionSystem=read('src/components/MotionSystem.tsx');
const sectionEvidence=read('src/components/SectionHeroEvidence.tsx');
const siteMotionCSS=read('src/app/sitewide-motion.css');
const immersiveCSS=read('src/app/immersive-experience.css');
const mobilePremiumCSS=read('src/app/mobile-premium.css');
const layout=read('src/app/layout.tsx');
const nav=read('src/components/Navigation.tsx');
const diagram=read('src/components/SourceTopology.tsx');
const studioTheme=read('src/app/portfolio-studio-skin.css');
const studioSource=read('src/app/studio-source-template.css');
if(!layout.includes('portfolio-studio-skin.css')||!layout.includes('studio-source-template.css')||
  !studioTheme.includes('.portfolio-template .studio-hero')||
  !studioSource.includes('.agency-offer-row')||!home.includes('studio-tool-rail')||
  !home.includes('studio-career-preview'))throw Error('Studio visual template was not wired to the entire public portfolio');

const casePage=read('src/components/CasePage.tsx');
const gallery=read('src/components/ProjectExplorer.tsx');
if(!home.includes('<InfrastructureStage locale={locale}/>')||!immersive.includes('NetworkWorld active={active} orbit={orbitRef}')||!immersive.includes('stage-blueprint'))throw Error('Missing progressive 3D engineering story');
if(!network3d.includes('topologyDesigns')||!network3d.includes('architecture.links')||!network3d.includes('architecture.flows'))throw Error('3D must visualize structured enterprise infrastructure data instead of a decorative rack');
if(!network3d.includes('useReducedMotion')||!immersiveCSS.includes('@media(prefers-reduced-motion:reduce)'))throw Error('Accessible static 3D motion behavior missing');
if(immersive.includes('min-width: 900px')||!immersive.includes('window.WebGLRenderingContext'))throw Error('Mobile WebGL must not be disabled by device width');
if(!network3d.includes('CameraFit')||!network3d.includes('orbit.current')||!immersive.includes('onTouchMove')||!immersive.includes('immersive-orbit-controls'))throw Error('Full 3D mobile viewport, touch, and explicit camera controls missing');
if(!layout.includes('mobile-premium.css')||!mobilePremiumCSS.includes('immersive-orbit-controls')||!mobilePremiumCSS.includes('.hero .hero-schematic{display:flex!important'))throw Error('Mobile immersive design parity missing');
if(!layout.includes('immersive-experience.css')||!layout.includes('<MotionSystem/>')||!motionSystem.includes('site-scroll-progress'))throw Error('Immersive global design missing');
if(!layout.includes('sitewide-motion.css')||!motionSystem.includes('IntersectionObserver')||!siteMotionCSS.includes('.domain-visual'))throw Error('Sitewide motion and branding missing');
if(!motionSystem.includes('site-return-top')||!nav.includes('aria-expanded={open}')||!nav.includes('onEscape'))throw Error('Whole-site mobile navigation and scroll controls missing');
if(!section.includes('<SectionHeroEvidence section={section} locale={locale}/>'))throw Error('The page-specific professional record view is not wired across sections');
if(!sectionEvidence.includes('c.experience.slice(0,3)')||!sectionEvidence.includes('p.studies.slice(0,3)')||!sectionEvidence.includes('projectRepo'))throw Error('Section introductions must use actual experience, education and traceable topology');
for(const name of ['projects','experience','education','expertise','services','contact'])if(!sectionEvidence.includes('section===\"'+name+'\"'))throw Error('Missing distinct record type '+name);
if(!casePage.includes('case-site--${slug}'))throw Error('Case-specific visual identity missing');
for(const role of ['network','systems','security','monitoring'])if(!network3d.includes(role+':'))throw Error('Missing 3D architectural layer: '+role);
if(!casePage.includes('<SourceTopology locale={locale} compact/>'))throw new Error('Real source topology must remain in enterprise project');
if(!gallery.includes('View project')||gallery.includes('Explore case study'))throw new Error('Project wording must be clear');

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

const anchors=['projects','experience','education','expertise','services','contact'];
for(const anchor of anchors)if(!nav.includes('"'+anchor+'"'))throw new Error('Navigation missing '+anchor);
if(!nav.includes('c.nav[i]'))throw new Error('Localized navigation labels not preserved');

const sections=['className="hero studio-hero"','className="about-section studio-about-section"','<LandingOverview locale={locale}/>','className="contact-section"'];
for(let i=1;i<sections.length;i++)if(home.indexOf(sections[i])<=home.indexOf(sections[i-1]))throw new Error('Incorrect portfolio story order');
for(const necessary of ['LandingOverview','portrait-photo','/images/taha-portrait.webp']){
 if(!home.includes(necessary))throw new Error('Missing real portfolio element: '+necessary);
}
if(!section.includes('ProjectExplorer locale={locale} projects={c.projects}')||!overview.includes('<VisualProject slug="enterprise-network-lab" locale={locale}/>'))throw new Error('Projects need a dedicated page and the homepage needs its source-defined topology');
if(home.includes('<SourceTopology')||home.includes('hero-resume-link')||home.includes('<LabRoadmap')||home.includes('cv/Taha_Zitane_CV_2026.pdf'))throw new Error('CV download and lab roadmap must stay off the homepage');
for(const unused of ['SolutionMedia','SkillEvidence','TechnologyReferences','engineeringMethod','hero-proof-strip','NetworkBackdrop','TopologyStudio','DiagnosticExplorer','SecurityOperationsDesk']){
 if(home.includes(unused))throw new Error('Unwanted widget still on homepage: '+unused);
}
if(home.includes('hero-person">'+String.fromCharCode(36))||home.includes('hero-serif>'+String.fromCharCode(36)))throw new Error('Stray dollar prefix on identity');
if(!/@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/.test(css))throw new Error('Reduced motion accessibility missing');
if(!css.includes('.work-cards')||!css.includes('.hero-visual { order: -1;'))throw new Error('Responsive layout or mobile portrait order missing');

for(const page of ['projects','experience','education','expertise','services','contact']){for(const prefix of ['src/app/','src/app/[locale]/'])if(!existsSync(path.join(root,prefix+page+'/page.tsx')))throw Error('Missing dedicated localized page: '+prefix+page)}
for(const node of ['hq-rtr','branch-rtr','hq-switch','branch-switch']){
 if(!diagram.includes(node))throw new Error('Source diagram missing documented node: '+node);
}
for(const source of ['topology.clab.yml','secure/topology.secure.clab.yml','github.com/tahazitan/enterprise-network-lab']){
 if(!diagram.includes(source))throw new Error('Diagram source provenance missing: '+source);
}
console.log('PASS: professional story order, clean identity, six dedicated sections, 8 projects, 3 languages, actual portrait, real source diagram and responsive accessibility');
