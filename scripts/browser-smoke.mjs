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
 assert.equal(await desktop.locator('.nav-links a').count(),7,'Navigation must point to seven unique sections');
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
 // Simulated diagnostics: actual client-side state transitions and case-specific evidence
 assert.equal(await desktop.locator('.diagnostic-cases button').count(),5,'Five troubleshooting scenarios are offered');
 await desktop.locator('.diagnostic-cases button').nth(1).click();
 assert.equal(await desktop.locator('.diagnostic-options button').count(),3,'Diagnostic has three meaningful checks');
 await desktop.locator('.diagnostic-options button').first().click();
 assert.equal(await desktop.locator('.diagnostic-feedback.good').count(),1,'Evidence-based choice must update feedback');
 await desktop.locator('.diagnostic-observation .demo-action').click();
 await desktop.locator('.diagnostic-options button').first().click();
 await desktop.locator('.diagnostic-observation .demo-action').click();
 assert.equal(await desktop.locator('.diagnostic-results').count(),1,'Case result must include cause and proposed validation');
 // Security desk is unambiguously synthetic, filterable, and event details are inspectable
 assert.equal(await desktop.locator('.security-stream > button').count(),5,'Five synthetic SOC events displayed');
 await desktop.locator('.security-filter button').nth(3).click();
 assert.equal(await desktop.locator('.security-stream > button').count(),2,'Medium severity filters relevant events');
 await desktop.locator('.security-stream > button').last().click();
 assert.equal(await desktop.locator('.security-raw pre').count(),1,'Selected synthetic event exposes illustrative evidence');
 await desktop.locator('.security-filter button').first().click();
 // A technical domain maps to concrete case studies instead of speculative proficiency percentages
 await desktop.locator('.skill-selectors button').nth(1).click();
 assert.equal(await desktop.locator('.skill-linked-work a').count(),2,'Systems domain points to two real portfolio studies');
 assert.equal(await desktop.locator('.skill-linked-work a[href*="windows-server-ad"]').count(),1);
 const toggle=desktop.locator('.topology-view-toggle button');
 await toggle.nth(1).click();
 assert.equal(await desktop.locator('.topology-fallback-svg').count(),1,'Schematic view should be visible when selected');
 const firstDevice=await desktop.locator('.topology-device-buttons button').first().innerText();
 await desktop.locator('.topology-device-buttons button').first().click();
 assert.ok((await desktop.locator('.topology-device-details').innerText()).includes(firstDevice),'Device inspector must update');
 assert.equal(await desktop.locator('a[href^="mailto:"]').count()>0,true,'Functional email links');
 assert.equal(await desktop.locator('a[href^="tel:"]').count()>0,true,'Functional phone link');
 assert.equal(await desktop.locator('a[href$=".vcf"]').count()>0,true,'Contact VCard download');
 assert.equal(await desktop.locator('a[href="/cv/Taha_Zitane_CV_2026.pdf"]').count(),1,'Genuine PDF CV download link');
 mkdirSync(path.join(root,'screenshots'),{recursive:true});
 await desktop.locator('.hero').screenshot({path:path.join(root,'screenshots','desktop-hero.png'),animations:'disabled'});
 await desktop.locator('.work-card').first().screenshot({path:path.join(root,'screenshots','desktop-project-card.png'),animations:'disabled'});
 await desktop.goto(base+'/projects/enterprise-network-lab/',{waitUntil:'domcontentloaded',timeout:30000});
 assert.equal(await desktop.locator('.blueprint-zone-buttons button').count(),6,'Six enterprise zones');
 await desktop.locator('.blueprint-zone-buttons button').nth(0).click();
 assert.ok((await desktop.locator('.blueprint-explanation').innerText()).includes('WAN'),'Enterprise inspector updates');
 assert.equal(await desktop.locator('.design-review-card').count(),3,'Each case includes technical review');
 assert.equal(await desktop.locator('.related-work-grid a').count(),2,'Case-to-case navigation');
 await desktop.locator('.blueprint-shell').screenshot({path:path.join(root,'screenshots','enterprise-blueprint.png'),animations:'disabled'});
 const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 mobile.on('pageerror',err=>errors.push('mobile: '+err.message));
 await mobile.goto(base+'/fr/',{waitUntil:'domcontentloaded',timeout:30000});
 await mobile.locator('.nav-toggle').waitFor({timeout:15000});
 await mobile.waitForTimeout(650);
 await mobile.locator('.nav-toggle').click();
 assert.equal(await mobile.locator('#mobile-nav a').count()>=7,true,'Responsive menu must expose navigation');
 await mobile.locator('.nav-toggle').click();
 const overflowFR=await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 assert.ok(overflowFR<=2,`French page horizontal overflow: ${overflowFR}px`);
 await mobile.screenshot({path:path.join(root,'screenshots','mobile-fr.png'),animations:'disabled'});
 await mobile.goto(base+'/ar/',{waitUntil:'domcontentloaded',timeout:30000});
 assert.equal(await mobile.locator('html').getAttribute('lang'),'ar');
 assert.equal(await mobile.locator('html').getAttribute('dir'),'rtl');
 assert.ok((await mobile.locator('.brand-name').innerText()).includes('طه زيطان'),'Arabic spelling is correct');
 assert.equal(await mobile.locator('#diagnostics').count(),1,'Arabic diagnostics section is present');
 assert.equal(await mobile.locator('#security-operations').count(),1,'Arabic SOC section is present');
 const overflowAR=await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 assert.ok(overflowAR<=2,`Arabic page horizontal overflow: ${overflowAR}px`);
 await mobile.screenshot({path:path.join(root,'screenshots','mobile-ar.png'),animations:'disabled'});
 // Ignore WebGL warnings produced in some headless renderers; do not ignore React runtime exceptions.
 if(errors.length)throw Error(`Browser runtime errors:\n${errors.slice(0,8).join('\n')}`);
 console.log('PASS: real-browser desktop/mobile navigation, project search, category filters, topology controls, diagnostic workflows, SOC severity and inspection, skill evidence, enterprise map, case navigation, 3 locales, phone/email/vCard, RTL and no mobile overflow');
}finally{if(browser)await browser.close();await new Promise(resolve=>serve.close(resolve))}
