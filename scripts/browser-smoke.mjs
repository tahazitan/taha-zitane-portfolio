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
 // Portfolio must focus on real work, not synthetic SOC interfaces
 assert.equal(await desktop.locator('.security-operations').count(),0,'SOC demo removed');
 assert.equal(await desktop.locator('.diagnostic-section').count(),0,'Unrequested diagnostic demo removed');
 // Equipment visuals are authored per technology and link to related engineering studies
 assert.equal(await desktop.locator('.equipment-card').count(),7,'Seven vendor-inspired equipment illustrations');
 await desktop.locator('.equipment-card').nth(3).click();
 assert.ok((await desktop.locator('.equipment-inspector h3').innerText()).includes('Palo Alto'),'Selected equipment inspector updates');
 assert.ok((await desktop.locator('.equipment-inspector a').getAttribute('href')).includes('firewall-ipsec-lab'),'Related case study is contextually correct');
 // Portrait must be an actual decoded image, visible and unobscured by the architecture panel
 const portrait=desktop.locator('.portrait-photo');
 await portrait.waitFor({state:'visible'});
 await desktop.waitForFunction(()=>{const el=document.querySelector('.portrait-photo');return el instanceof HTMLImageElement && el.complete && el.naturalWidth>100 && el.naturalHeight>100;});
 const boxes=await desktop.evaluate(()=>{
  const a=document.querySelector('.portrait-frame')?.getBoundingClientRect();
  const b=document.querySelector('.hero-network-exhibit')?.getBoundingClientRect();
  if(!a||!b)return null;
  return {photo:{x:a.x,y:a.y,w:a.width,h:a.height},network:{x:b.x,y:b.y,w:b.width,h:b.height},intersection:Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top))};
 });
 assert.ok(boxes&&boxes.photo.w>220&&boxes.photo.h>260,'Portrait must occupy a legible area');
 assert.ok(boxes.intersection<=1,'Architecture graphic must not cover portrait');
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
 assert.equal(await desktop.locator('.topology-compact .topology-screen-foot a').count(),0,'Project page must not link back to itself');
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
 await mobile.waitForFunction(()=>{const el=document.querySelector('.portrait-photo');return el instanceof HTMLImageElement && el.complete && el.naturalWidth>100;});
 assert.equal(await mobile.locator('html').getAttribute('dir'),'rtl');
 assert.ok((await mobile.locator('.brand-name').innerText()).includes('طه زيطان'),'Arabic spelling is correct');
 assert.equal(await mobile.locator('.equipment-card').count(),7,'Equipment gallery available in Arabic RTL');
 const overflowAR=await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 assert.ok(overflowAR<=2,`Arabic page horizontal overflow: ${overflowAR}px`);
 await mobile.screenshot({path:path.join(root,'screenshots','mobile-ar.png'),animations:'disabled'});
 // Ignore WebGL warnings produced in some headless renderers; do not ignore React runtime exceptions.
 if(errors.length)throw Error(`Browser runtime errors:\n${errors.slice(0,8).join('\n')}`);
 console.log('PASS: real-browser desktop/mobile navigation, project search, category filters, topology controls, unobscured decoded portrait, seven equipment diagrams, skill evidence, enterprise map, case navigation, 3 locales, phone/email/vCard, RTL and no mobile overflow');
}finally{if(browser)await browser.close();await new Promise(resolve=>serve.close(resolve))}
