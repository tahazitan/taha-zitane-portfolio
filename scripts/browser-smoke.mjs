import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFileSync,existsSync,statSync,mkdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright-core';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'out');
const mime={'.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.xml':'application/xml','.ico':'image/x-icon','.vcf':'text/vcard','.woff2':'font/woff2','.txt':'text/plain'};
const serve=createServer((req,res)=>{
 try{
  const url=new URL(req.url??'/', 'http://127.0.0.1');
  const filename=decodeURIComponent(url.pathname);
  const target=path.resolve(out, '.'+filename);
  if(!target.startsWith(out+path.sep)&&target!==out){res.writeHead(403).end();return}
  const resolved=existsSync(target)&&statSync(target).isDirectory()?path.join(target,'index.html'):target;
  if(!existsSync(resolved)||!statSync(resolved).isFile()){res.writeHead(404).end('Not found');return}
  res.writeHead(200,{'Content-Type':mime[path.extname(resolved)]||'application/octet-stream'}).end(readFileSync(resolved));
 }catch(err){res.writeHead(500).end(String(err))}
});
await new Promise(resolve=>serve.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${serve.address().port}`;
const chrome=[process.env.CHROME_PATH,'/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium','/opt/google/chrome/chrome'].filter(Boolean).find(x=>existsSync(x));
if(!chrome){serve.close();throw Error('Browser QA blocked: no Chromium/Chrome executable found on CI runner')}
let browser;
try{
 browser=await chromium.launch({executablePath:chrome,headless:true,timeout:40000,args:['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--use-gl=angle','--use-angle=swiftshader']});
 const errors=[];
 const desktop=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 desktop.on('pageerror',err=>errors.push(err.message));
 await desktop.goto(base+'/',{waitUntil:'domcontentloaded',timeout:30000});
 await desktop.locator('.work-card').first().waitFor({timeout:30000});
 await desktop.waitForTimeout(900); // allow React hydration before exercising client-side filters
 assert.equal(await desktop.locator('.nav-links a').count(),5,'Five deliberate navigation links with distinct purposes');
 assert.equal(await desktop.locator('.hero-person').innerText(),'Taha Zitane','Name must render without literal template characters');
 assert.equal(await desktop.locator('.work-card').count(),8,'All eight case studies visible by default');
 const search=desktop.locator('.work-search input');
 await search.fill('Proxmox');
 await desktop.waitForFunction(()=>document.querySelectorAll('.work-card').length===1);
 assert.equal(await desktop.locator('.work-card').count(),1,'Search filters projects by technology');
 await search.fill('');
 await desktop.locator('.work-filter button').nth(2).click();
 await desktop.waitForFunction(()=>document.querySelectorAll('.work-card').length===3);
 assert.equal(await desktop.locator('.work-card').count(),3,'Professional experience category filters correctly');
 await desktop.locator('.work-filter button').first().click();
 // Portfolio must focus on real work, not synthetic SOC interfaces
 assert.equal(await desktop.locator('.security-operations').count(),0,'SOC demo removed');
 assert.equal(await desktop.locator('.diagnostic-section').count(),1,'User-requested recruiter-friendly troubleshooting section is present');
 assert.equal(await desktop.locator('.diagnostic-tabs button').count(),4,'Four diagnostic scenarios are available');
 await desktop.locator('.diagnostic-tabs button').nth(1).click();
 assert.equal(await desktop.locator('.diagnostic-tabs button[aria-pressed="true"]').count(),1,'Diagnostic scenario selection updates');
 assert.equal(await desktop.locator('.diagnostic-step-track button').count(),5,'Five structured diagnostic steps');
 await desktop.locator('.diagnostic-step-track button').nth(2).click();
 assert.equal(await desktop.locator('.diagnostic-step-track button[aria-current="step"]').count(),1,'Step selection works');
 assert.equal(await desktop.locator('.work-card .visual-project').count(),8,'Every project includes a visual workflow preview');
 assert.equal(await desktop.locator('.lab-roadmap-card').count(),4,'Architecture roadmap distinguishes planned labs');
 assert.equal(await desktop.locator('.experience-proof').count(),6,'Every professional role shows skill evidence');
 // Source-linked connections are traceable to repository YAML, not fictitious equipment images.
 assert.equal(await desktop.locator('.equipment-card').count(),0,'Unsourced equipment gallery removed');
 assert.equal(await desktop.locator('.solution-media-card').count(),0,'Unreliable remote-image gallery must not appear');
 assert.equal(await desktop.locator('.hero-proof-strip').count(),0,'Vanity counters must be removed');
 assert.equal(await desktop.locator('.engineering-method').count(),0,'No repetitive methodology card grid');
 const primaryCTA=await desktop.locator('.hero-actions a').first().getAttribute('href');
 const secondaryCTA=await desktop.locator('.hero-actions a').last().getAttribute('href');
 assert.equal(primaryCTA,'#work','Primary hero action opens projects');
 assert.equal(secondaryCTA,'#contact','Secondary hero action opens actual contact details');
 assert.equal(await desktop.locator('.technology-reference').count(),0,'Redundant technical reference card library is no longer on homepage');

 assert.equal(await desktop.locator('.source-topology').count(),1,'Actual source topology section exists');
 assert.equal(await desktop.locator('.source-figure svg image').count(),5,'Topology displays Linux technology marks within source-backed nodes');
 assert.ok((await desktop.locator('.source-figure svg').getAttribute('aria-label')).includes('IPv4'),'Topology communicates source IP context');
 assert.equal(await desktop.locator('.source-edges button').count(),4,'Base YAML profile has four wired links');
 await desktop.locator('.source-switch button').nth(1).click();
 assert.equal(await desktop.locator('.source-edges button').count(),6,'Secure YAML profile has six wired links');
 const sourceUrl=await desktop.locator('.source-links a').first().getAttribute('href');
 assert.ok(sourceUrl.includes('secure/topology.secure.clab.yml'),'Selected secure profile links to original YAML');
 // Portrait must be an actual decoded image, visible and unobscured by the architecture panel
 const portrait=desktop.locator('.portrait-photo');
 await portrait.waitFor({state:'visible'});
 await desktop.waitForFunction(()=>{const el=document.querySelector('.portrait-photo');return el instanceof HTMLImageElement && el.complete && el.naturalWidth>100 && el.naturalHeight>100;});
 const photoBox=await desktop.locator('.portrait-frame').boundingBox();
 assert.ok(photoBox&&photoBox.width>220&&photoBox.height>260,'Authentic portrait must be clearly visible');
 assert.equal(await desktop.locator('a[href^="mailto:"]').count()>0,true,'Functional email links');
 assert.equal(await desktop.locator('a[href^="tel:"]').count()>0,true,'Functional phone link');
 assert.equal(await desktop.locator('a[href$=".vcf"]').count()>0,true,'Contact VCard download');
 assert.equal(await desktop.locator('a[href="/cv/Taha_Zitane_CV_2026.pdf"]').count(),1,'Genuine PDF CV download link');
 mkdirSync(path.join(root,'screenshots'),{recursive:true});
 await desktop.locator('.hero').screenshot({path:path.join(root,'screenshots','desktop-hero.png'),animations:'disabled'});
 await desktop.locator('.work-card').first().screenshot({path:path.join(root,'screenshots','desktop-project-card.png'),animations:'disabled'});
 await desktop.goto(base+'/projects/enterprise-network-lab/',{waitUntil:'domcontentloaded',timeout:30000});
 assert.equal(await desktop.locator('.source-topology-compact .source-edges button').count(),4,'Enterprise case uses actual base-profile wiring');
 assert.equal(await desktop.locator('.design-review-card').count(),3,'Case includes technical review');
 assert.equal(await desktop.locator('.visual-project--large .visual-node').count(),5,'Full enterprise case includes both routers and actual source IP labels');
 assert.equal(await desktop.locator('.related-work-grid a').count(),2,'Case-to-case navigation');
 await desktop.locator('.source-topology-compact').screenshot({path:path.join(root,'screenshots','enterprise-source-topology.png'),animations:'disabled'});
 const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 mobile.on('pageerror',err=>errors.push('mobile: '+err.message));
 await mobile.goto(base+'/fr/',{waitUntil:'domcontentloaded',timeout:30000});
 await mobile.waitForFunction(()=>{const img=document.querySelector('.portrait-photo');return img instanceof HTMLImageElement&&img.complete&&img.naturalWidth>100;},{timeout:15000});
 const mobilePortrait=await mobile.locator('.portrait-frame').boundingBox();
 const mobileLayout=await mobile.evaluate(()=>{
  const grid=document.querySelector('.hero-grid'),visual=document.querySelector('.hero-visual'),photo=document.querySelector('.portrait-frame'),scroll=window.scrollY;
  return {scroll,viewport:window.innerHeight,grid:window.getComputedStyle(grid).display,visualOrder:window.getComputedStyle(visual).order,photoTop:photo?.getBoundingClientRect().top,photoBottom:photo?.getBoundingClientRect().bottom}
 });
 console.log('QA MOBILE PORTRAIT GEOMETRY',JSON.stringify({mobilePortrait,mobileLayout}));
 await mobile.screenshot({path:path.join(root,'screenshots','mobile-fr-debug.png'),animations:'disabled'});
 assert.ok(mobilePortrait&&mobilePortrait.y>=0&&mobilePortrait.y<770,'Authentic portrait must be visible in initial mobile viewport');

 await mobile.locator('.nav-toggle').waitFor({timeout:15000});
 await mobile.waitForTimeout(650);
 await mobile.locator('.nav-toggle').click();
 assert.equal(await mobile.locator('#mobile-nav a').count(),8,'Five destinations and three language choices');
 await mobile.locator('.nav-toggle').click();
 const overflowFR=await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 assert.ok(overflowFR<=2,`French page horizontal overflow: ${overflowFR}px`);
 await mobile.screenshot({path:path.join(root,'screenshots','mobile-fr.png'),animations:'disabled'});
 await mobile.goto(base+'/ar/',{waitUntil:'domcontentloaded',timeout:30000});
 assert.equal(await mobile.locator('html').getAttribute('lang'),'ar');
 await mobile.waitForFunction(()=>{const el=document.querySelector('.portrait-photo');return el instanceof HTMLImageElement && el.complete && el.naturalWidth>100;});
 assert.equal(await mobile.locator('html').getAttribute('dir'),'rtl');
 assert.ok((await mobile.locator('.brand-name').innerText()).includes('طه زيطان'),'Arabic spelling is correct');
 assert.equal(await mobile.locator('.hero-person').innerText(),'طه زيطان','Arabic identity must render naturally with no stray symbols');
 assert.equal(await mobile.locator('.source-topology').count(),1,'Source topology available in Arabic RTL');
 assert.equal(await mobile.locator('.diagnostic-tabs button').count(),4,'Arabic diagnostic controls available');
 assert.equal(await mobile.locator('.lab-roadmap-card').count(),4,'Arabic lab roadmap available');
 assert.equal(await mobile.locator('.solution-media-card').count(),0,'Arabic layout omits broken third-party images');
 assert.equal(await mobile.locator('.technology-reference').count(),0,'Mobile homepage avoids redundant reference card grid');
 const arabicPortrait=await mobile.locator('.portrait-frame').boundingBox();
 assert.ok(arabicPortrait&&arabicPortrait.y>=0&&arabicPortrait.y<770,'Arabic mobile also shows the portrait near the top');
 const overflowAR=await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 assert.ok(overflowAR<=2,`Arabic page horizontal overflow: ${overflowAR}px`);
 await mobile.screenshot({path:path.join(root,'screenshots','mobile-ar.png'),animations:'disabled'});
 // Ignore WebGL warnings produced in some headless renderers; do not ignore React runtime exceptions.
 if(errors.length)throw Error(`Browser runtime errors:\n${errors.slice(0,8).join('\n')}`);
 console.log('PASS: real-browser desktop/mobile navigation, project search, category filters, source-based network links, unobscured decoded portrait, honest project cards, actual portrait and real-media integrity, enterprise source viewer, case navigation, 3 locales, phone/email/vCard, RTL and no mobile overflow');
}finally{if(browser)await browser.close();await new Promise(resolve=>serve.close(resolve))}
