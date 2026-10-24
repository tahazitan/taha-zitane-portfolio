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
 await d.locator('.hero').screenshot({path:path.join(root,'screenshots','desktop-hero.png'),animations:'disabled'});
 await d.locator('.landing-overview').screenshot({path:path.join(root,'screenshots','desktop-overview.png'),animations:'disabled'});

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
 assert.equal(await d.locator('.source-topology-compact .source-edges button').count(),4,'Source-based base topology has four links');
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
  assert.ok(await m.locator('.stage-blueprint').count()===1,'locale: lightweight fallback instead of WebGL on narrow screens');
  assert.equal(await m.locator('.layer-button').count(),4,'Localized focus controls work in mobile layout');

  await m.locator('.nav-toggle').click();
  assert.equal(await m.locator('#mobile-nav a').count(),9,'Six sections and three languages in mobile menu');
  await m.locator('.nav-toggle').click();
  await overflow(m,`${locale} home mobile`);
  await m.screenshot({path:path.join(root,'screenshots',`mobile-${locale}.png`),animations:'disabled'});
  for(const s of ['projects','services','experience','education','expertise','contact']){
   await m.goto(base+`/${locale}/${s}/`,{waitUntil:'domcontentloaded'});
   await overflow(m,`${locale} ${s} mobile`);
  }
 }
 if(errors.length)throw Error('Runtime errors:\n'+errors.slice(0,12).join('\n'));
 console.log('PASS: homepage editorial UX, six sections in EN/FR/AR, filtered projects, technical diagrams, service branding, source-linked case topology, mobile navigation, portrait, responsive layout, contact and RTL');
} finally {
 if(browser)await browser.close();
 await new Promise(resolve=>serve.close(resolve));
}
