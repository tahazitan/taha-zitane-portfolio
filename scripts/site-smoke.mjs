import {existsSync,readFileSync,readdirSync,statSync} from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const out=path.join(root,'out');
if(!existsSync(out))throw Error('Static export missing. Run npm run build first.');
const htmlFiles=[];
function walk(dir){for(const item of readdirSync(dir)){const file=path.join(dir,item);if(statSync(file).isDirectory())walk(file);else if(file.endsWith('.html'))htmlFiles.push(file)}}
walk(out);
const allSlugs=['enterprise-network-lab','windows-server-ad','remote-it-support','hospital-network-support','security-observability-labs','firewall-ipsec-lab','proxmox-virtualization-lab','cisco-campus-network-lab'];
const expected=[];
for(const locale of ['','fr/','ar/']){
 expected.push(`${locale}index.html`);
 for(const slug of allSlugs)expected.push(`${locale}projects/${slug}/index.html`);
}
for(const relative of expected)if(!existsSync(path.join(out,relative)))throw Error(`Missing localized page ${relative}`);
if(!existsSync(path.join(out,'meta/mark.svg'))||!existsSync(path.join(out,'contact/taha-zitane.vcf')))throw Error('Portfolio brand or contact asset missing');
const decode=(s)=>s.replace(/&amp;/g,'&').replace(/&#x27;/g,"'").replace(/&quot;/g,'"');
const failures=[];
let checked=0;
for(const file of htmlFiles){
 const body=readFileSync(file,'utf8');
 if(body.includes('href="#undefined"')||body.includes('href="/undefined"'))failures.push(`${file}: undefined link`);
 const language=path.relative(out,file).startsWith('fr/')?'fr':path.relative(out,file).startsWith('ar/')?'ar':'en';
 if(!new RegExp(`<html[^>]*lang=["']${language}["']`).test(body))failures.push(`${file}: HTML language is not ${language}`);
 if(!/name="description"|name="description"/.test(body))failures.push(`${file}: missing meta description`);
 const anchors=[...body.matchAll(/<a\b[^>]*?\bhref="([^"]+)"/g)];
 for(const [,raw] of anchors){
  const href=decode(raw);
  if(/^(mailto:|tel:|https?:|data:)/i.test(href))continue;
  if(href.startsWith('javascript:')){failures.push(`${file}: unsafe link ${href}`);continue}
  if(!href.startsWith('/')&&!href.startsWith('#'))continue;
  let uri;try{uri=new URL(href,'https://portfolio.test'+('/'+path.relative(out,file).replace(/index\.html$/,'')))}catch{failures.push(`${file}: invalid URL ${href}`);continue}
  if(uri.pathname.startsWith('/_next/'))continue;
  let target=path.join(out,decodeURIComponent(uri.pathname).replace(/^\//,''));
  if(!existsSync(target)){
   if(existsSync(target+'/index.html'))target+='/index.html';
   else if(existsSync(target+'.html'))target+='.html';
   else{failures.push(`${file}: broken link to ${href}`);continue}
  }else if(statSync(target).isDirectory())target=path.join(target,'index.html');
  checked++;
  if(uri.hash&&target.endsWith('.html')){
   const id=decodeURIComponent(uri.hash.slice(1));
   const targetText=target===file?body:readFileSync(target,'utf8');
   if(!targetText.includes(`id="${id}"`)&&!targetText.includes(`id='${id}'`))failures.push(`${file}: missing #${id} at ${href}`);
  }
 }
}
if(failures.length)throw Error(`Site smoke test failed (${failures.length}):\n${failures.slice(0,36).join('\n')}`);
console.log(`PASS: ${expected.length} localized pages, ${htmlFiles.length} HTML files, ${checked} internal links, language tags, metadata, VCard and no broken anchors`);
