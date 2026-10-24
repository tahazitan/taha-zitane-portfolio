import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFileSync,existsSync,statSync,mkdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright-core';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'), out=path.join(root,'out');
const mime={'.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.xml':'application/xml','.vcf':'text/vcard'};
const serve=createServer((req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url??'/','http://127.0.0.1').pathname);
  const target=path.resolve(out,'.'+pathname);
  if(!target.startsWith(out+path.sep)&&target!==out){res.writeHead(403).end();return}
  const resolved=existsSync(target)&&statSync(target).isDirectory()?path.join(target,'index.html'):target;
  if(!existsSync(resolved)||!statSync(resolved).isFile()){res.writeHead(404).end('Not found');return}
  res.writeHead(200,{'Content-Type':mime[path.extname(resolved)]||'application/octet-stream'}).end(readFileSync(resolved));
 }catch(e){res.writeHead(500).end(String(e))}
});
await new Promise(resolve=>serve.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${serve.address().port}`;
const chrome=[process.env.CHROME_PATH,'/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium'].filter(Boolean).find(existsSync);
if(!chrome){serve.close();throw Error('Chrome/Chromium executable required for browser QA')}
const errors=[];
const overflow=async(page,label)=>{const delta=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);assert.ok(delta<=2,`${label} horizontal overflow: ${delta}px`)};
let browser;
try{
 browser=await chromium.launch({executablePath:chrome,headless:true,timeout:45000,args:['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--use-gl=angle','--use-angle=swiftshader']});
 mkdirSync(path.join(root,'screenshots'),{recursive:true});
 const d=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 d.on('pageerror',e=>errors.push('desktop: '+e.message));
 await d.goto(base+'/',{waitUntil:'domcontentloaded'});
 await d.locator('.overview-card').first().waitFor();
 assert.equal(await d.locator('.nav-links a').count(),6,'Navigation must expose six dedicated pages');
 assert.equal(await d.locator('.hero-person').innerText(),'Taha Zitane');
 assert.equal(await d.locator('.overview-card').count(),4,'Homepage is a focused four-path overview');
 assert.equal(await d.locator('.immersive-section .layer-button').count(),4,'Interactive 3D infrastructure has four functional layers');
 assert.equal(await d.locator('.immersive-orbit-controls button').count(),3,'The 3D visualization offers keyboard-accessible camera controls');
 await d.locator('.immersive-orbit-controls button').nth(2).click();
 assert.equal(await d.locator('.immersive-visual').getAttribute('data-orbit-angle'),'0.25','Desktop camera rotates on request');
 await d.locator('.immersive-orbit-controls button').nth(1).click();
 assert.equal(await d.locator('.immersive-visual').getAttribute('data-orbit-angle'),'0.00','Camera reset restores orientation');
 assert.equal(await d.locator('.immersive-section .layer-button[aria-pressed="true"]').count(),1,'One infrastructure focus selected');
 await d.locator('.immersive-section .layer-button').nth(1).click();
 assert.ok(await d.locator('.immersive-section .layer-button').nth(1).getAttribute('aria-pressed')==='true','Selecting security updates visualization focus');
 assert.ok((await d.locator('.layer-information').innerText()).includes('Security policies'),'Context changes with 3D layer selection');
 assert.equal(await d.locator('.work-card').count(),0,'Engineering diagrams belong to Projects, not homepage');
 assert.equal(await d.locator('.source-topology').count(),0,'Source-specific diagram only on project page');
 assert.equal(await d.locator('.overview-project-preview .visual-project--topology').count(),1,'Homepage previews the documented enterprise topology');
 assert.equal(await d.locator('.overview-project-preview svg[aria-label]').count(),1,'Home network topology remains accessible and labelled');
 const photo=d.locator('.portrait-photo');
 await d.waitForFunction(()=>{const el=document.querySelector('.portrait-photo');return el instanceof HTMLImageElement&&el.complete&&el.naturalWidth>100},{timeout:18000});
 const pb=await d.locator('.portrait-frame').boundingBox();assert.ok(pb&&pb.width>220,'Portrait prominent on desktop');
 await overflow(d,'desktop home');
 // Long portfolio pages reveal the return control on upward scroll without blocking content on downward scroll.
 await d.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));
 await d.waitForTimeout(120);
 assert.equal(await d.locator('.site-return-top').getAttribute('data-visible'),'false','Back-to-top stays hidden while reading downward');
 await d.evaluate(()=>window.scrollBy(0,-320));
 await d.waitForFunction(()=>document.querySelector('.site-return-top')?.getAttribute('data-visible')==='true');
 await d.locator('.site-return-top').click();
 await d.waitForFunction(()=>window.scrollY<100);
 assert.equal(await d.locator('.site-return-top').getAttribute('data-visible'),'false','Back-to-top disappears after returning to the start');
 await d.locator('.hero').screenshot({path:path.join(root,'screenshots','desktop-hero.png'),animations:'disabled'});
 await d.locator('.immersive-interface').screenshot({path:path.join(root,'screenshots','desktop-3d-infrastructure.png'),animations:'disabled'});
 await d.locator('.landing-overview').screenshot({path:path.join(root,'screenshots','desktop-overview.png'),animations:'disabled'});

 for(const section of ['projects','experience','education','expertise','services','contact']){
  await d.goto(base+'/'+section+'/',{waitUntil:'domcontentloaded'});
  assert.equal(await d.locator('.domain-node').count(),3,section+': unique three-stage technical visual');
  if(section!=='contact')assert.equal(await d.locator('.domain-node .tech-mark-image img').count(),3,section+': sourced technology branding within each three-stage illustration');
  assert.equal(await d.locator('.domain-node[aria-pressed="true"]').count(),1,section+': exactly one active domain');
  await d.locator('.domain-node').nth(1).click();
  assert.equal(await d.locator('.domain-node').nth(1).getAttribute('aria-pressed'),'true',section+': active node selection responds to click');
  assert.ok(await d.locator('.domain-selected').isVisible(),section+': contextual technical explanation visible');
  await overflow(d,section+' desktop');
  await d.locator('.detail-hero').screenshot({path:path.join(root,'screenshots','desktop-'+section+'-hero.png'),animations:'disabled'});
 }

 await d.goto(base+'/projects/',{waitUntil:'domcontentloaded'});
 await d.locator('.work-card').first().waitFor();
 assert.equal(await d.locator('.work-card').count(),8,'All eight technical project case studies');
 assert.equal(await d.locator('.work-card .visual-project--topology').count(),8,'Eight contextual engineering diagrams');
 await d.waitForTimeout(500);
 const search=d.locator('.work-search input');
 await search.fill('Proxmox');
 await d.waitForFunction(()=>document.querySelectorAll('.work-card').length===1);
 assert.equal(await d.locator('.work-card').count(),1,'Project technology search');
 await search.fill('');
 await d.locator('.work-filter button').nth(2).click();
 await d.waitForFunction(()=>document.querySelectorAll('.work-card').length===3);
 await d.locator('.work-filter button').first().click();
 await overflow(d,'projects desktop');
 await d.locator('.work-card').first().screenshot({path:path.join(root,'screenshots','desktop-project-card.png'),animations:'disabled'});

 await d.goto(base+'/services/',{waitUntil:'domcontentloaded'});
 assert.equal(await d.locator('.service-item').count(),4,'Four scoped technical services');
 assert.equal(await d.locator('.service-diagram').count(),4,'Every service has a domain-specific workflow visual');
 assert.equal(await d.locator('.process-steps>div').count(),4,'Realistic collaboration steps');
 await overflow(d,'services desktop');
 await d.locator('.service-item').first().screenshot({path:path.join(root,'screenshots','desktop-service-card.png'),animations:'disabled'});

 await d.goto(base+'/experience/',{waitUntil:'domcontentloaded'});
 assert.equal(await d.locator('.experience-item').count(),6,'Six distinct professional experiences');
 assert.equal(await d.locator('.experience-proof').count(),6,'Work roles have relevant technical branding');
 await d.goto(base+'/education/',{waitUntil:'domcontentloaded'});
 assert.equal(await d.locator('.study-item').count(),4,'Education: four academic timeline entries');
 assert.equal(await d.locator('.institution-crest').count(),4,'Academic institutions have owner-supplied marks');
 assert.equal(await d.locator('.training-timeline .training-item').count(),5,'Five courses in their own timeline');
 await overflow(d,'education desktop');
 await d.goto(base+'/expertise/',{waitUntil:'domcontentloaded'});
 assert.equal(await d.locator('.capability-card').count(),6,'Six technical domains');
 assert.equal(await d.locator('.diagnostic-tabs button').count(),4,'Four diagnostic paths');
 await d.waitForTimeout(400);
 await d.locator('.diagnostic-tabs button').nth(1).click();
 assert.equal(await d.locator('.diagnostic-tabs button[aria-pressed="true"]').count(),1);
 await d.locator('.diagnostic-step-track button').nth(2).click();
 assert.equal(await d.locator('.diagnostic-step-track button[aria-current="step"]').count(),1);
 await d.goto(base+'/contact/',{waitUntil:'domcontentloaded'});
 assert.ok(await d.locator('a[href^="mailto:"]').count()>0);
 assert.ok(await d.locator('a[href^="tel:"]').count()>0);

 await d.goto(base+'/projects/enterprise-network-lab/',{waitUntil:'domcontentloaded'});
 assert.equal(await d.locator('.case-site--enterprise-network-lab').count(),1,'Every engineering case uses its named design identity');
 assert.ok(await d.locator('.case-main .visual-project--large').isVisible(),'Case hero technical visual present');
 assert.equal(await d.locator('.source-topology-compact .source-edges button').count(),4,'Source-based base topology has four links');
 assert.ok(await d.locator('.visual-project--large .visual-project-inspector').isVisible(),'Each case-study visual exposes an engineering inspector');
 await d.locator('.visual-project--large .visual-project-interactive[role="button"]').first().click();
 assert.notEqual(await d.locator('.visual-project-inspector-copy strong').innerText(),'Select a device or connection in the diagram','Project diagrams support direct inspection');
 await d.locator('.source-topology-compact .source-diagram-node').first().click();
 assert.equal(await d.locator('.source-inspector h3').innerText(),'hq-rtr','Source-defined devices are directly inspectable');
 assert.ok(await d.locator('.source-inspector-config').count()>0,'Router inspection links to FRR configuration');
 await d.locator('.source-topology-compact .source-edges button').first().click();
 assert.ok((await d.locator('.source-inspector h3').innerText()).includes('↔'),'Inventory and source-inspector selection are synchronized');
 await d.waitForTimeout(400);
 await d.locator('.source-switch button').nth(1).click();
 assert.equal(await d.locator('.source-topology-compact .source-edges button').count(),6,'Secure source profile uses six links');

 const tablet=await browser.newPage({viewport:{width:1024,height:768},deviceScaleFactor:1});
 await tablet.goto(base+'/',{waitUntil:'domcontentloaded'});
 assert.ok(await tablet.locator('.nav-toggle').isVisible(),'Tablet hamburger must be visible');
 await tablet.locator('.nav-toggle').click();
 assert.ok(await tablet.locator('#mobile-nav').isVisible(),'Tablet menu must expand visibly at 1024px');
 assert.equal(await tablet.locator('.immersive-section').count(),1,'Tablet includes the infrastructure showcase');
 assert.equal(await tablet.locator('#mobile-nav a').count(),9,'Tablet menu has six sections and three languages');
 await overflow(tablet,'tablet home');
 await tablet.close();

 const m=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 m.on('pageerror',e=>errors.push('mobile: '+e.message));
 for(const locale of ['fr','ar']){
  await m.goto(base+`/${locale}/`,{waitUntil:'domcontentloaded'});
  await m.waitForFunction(()=>{const p=document.querySelector('.portrait-photo');return p instanceof HTMLImageElement&&p.complete&&p.naturalWidth>100},{timeout:15000});
  const frame=await m.locator('.portrait-frame').boundingBox();
  assert.ok(frame&&frame.y<775,`${locale}: portrait appears in initial mobile viewport`);
  assert.equal(await m.locator('.overview-card').count(),4);
  assert.ok(await m.locator('.immersive-section').count()===1,'locale: 3D infrastructure section exists on mobile');
  // Phone must get the real 3D canvas whenever this browser actually supports WebGL.
  await m.locator('.immersive-visual').scrollIntoViewIfNeeded();
  const mobileWebGL=await m.evaluate(()=>{
   try{const el=document.createElement('canvas');return Boolean(el.getContext('webgl2')||el.getContext('webgl'));}catch{return false}
  });
  if(mobileWebGL){
   await m.locator('.immersive-visual canvas').first().waitFor({state:'visible',timeout:20000});
   assert.equal(await m.locator('.stage-blueprint').count(),0,`${locale}: 3D must not be downgraded on phones with WebGL`);
  } else {
   assert.equal(await m.locator('.stage-blueprint').count(),1,`${locale}: only browsers without real WebGL use the fallback`);
  }
  const angle0=await m.locator('.immersive-visual').getAttribute('data-orbit-angle');
  await m.locator('.immersive-orbit-controls button').nth(2).click();
  assert.notEqual(await m.locator('.immersive-visual').getAttribute('data-orbit-angle'),angle0,`${locale}: rotation controls operate on mobile`);
  await m.locator('.immersive-orbit-controls button').nth(1).click();
  assert.equal(await m.locator('.immersive-visual').getAttribute('data-orbit-angle'),'0.00',`${locale}: reset works on mobile`);
  assert.equal(await m.locator('.layer-button').count(),4,'Localized focus controls work in mobile layout');

  await m.locator('.immersive-interface').screenshot({path:path.join(root,'screenshots',`mobile-${locale}-3d.png`),animations:'disabled'});
  await m.locator('.nav-toggle').click();
  assert.equal(await m.locator('#mobile-nav a').count(),9,'Six sections and three languages in mobile menu');
  assert.equal(await m.evaluate(()=>document.activeElement?.tagName),'A','Keyboard focus moves into open mobile navigation');
  await m.keyboard.press('Escape');
  assert.equal(await m.locator('#mobile-nav').count(),0,'Escape closes the mobile navigation');
  await m.locator('.nav-toggle').click();
  await m.locator('.nav-toggle').click();
  await overflow(m,`${locale} home mobile`);
  await m.screenshot({path:path.join(root,'screenshots',`mobile-${locale}.png`),animations:'disabled'});
  for(const s of ['projects','services','experience','education','expertise','contact']){
   await m.goto(base+`/${locale}/${s}/`,{waitUntil:'domcontentloaded'});
   assert.ok(await m.locator('.domain-visual').isVisible(),`${locale} ${s}: own visual story remains visible on mobile`);
   assert.ok(await m.locator('.mobile-menu').count()===0,`${locale} ${s}: mobile menu stays closed until requested`);
   assert.equal(await m.locator('.domain-node').count(),3,`${locale} ${s}: technical nodes remain interactive`);
   await overflow(m,`${locale} ${s} mobile`);
  }
 }
 // Cross-device audit: smallest phones, larger phones and landscape must preserve all content.
 for(const width of [320,360,430,768]){
  const phone=await browser.newPage({viewport:{width,height:width===768?1024:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  await phone.goto(base+'/',{waitUntil:'domcontentloaded'});
  assert.equal(await phone.locator('.immersive-orbit-controls button').count(),3,`${width}px: full 3D control surface on every device width`);
  assert.equal(await phone.locator('.overview-card').count(),4,`${width}px: homepage content parity`);
  await overflow(phone,`${width}px homepage`);
  await phone.goto(base+'/projects/',{waitUntil:'domcontentloaded'});
  await overflow(phone,`${width}px projects`);
  await phone.goto(base+'/projects/enterprise-network-lab/',{waitUntil:'domcontentloaded'});
  await overflow(phone,`${width}px engineering case`);
  await phone.close();
 }
 const landscape=await browser.newPage({viewport:{width:844,height:390},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 await landscape.goto(base+'/',{waitUntil:'domcontentloaded'});
 assert.equal(await landscape.locator('.immersive-orbit-controls button').count(),3,'Phone landscape has full 3D controls');
 await overflow(landscape,'mobile landscape');
 await landscape.close();
 if(errors.length)throw Error('Runtime errors:\n'+errors.slice(0,12).join('\n'));
 console.log('PASS: homepage editorial UX, six sections in EN/FR/AR, filtered projects, technical diagrams, service branding, source-linked case topology, mobile navigation, portrait, responsive layout, contact and RTL');
} finally {
 if(browser)await browser.close();
 await new Promise(resolve=>serve.close(resolve));
}
