import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const ts=require('typescript');

// Execute only our own local static data fixture, not user-uploaded or remote code.
const root=path.resolve(import.meta.dirname,'..');
const source=fs.readFileSync(path.join(root,'src/data/labTopologies.ts'),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const obj={exports:{}};
vm.runInNewContext(js,{exports:obj.exports,module:obj},{timeout:3000});
const topologies=obj.exports.topologyDesigns;
if(!Array.isArray(topologies)||topologies.length!==6)throw new Error(`Expected six topology designs; received ${topologies?.length}`);
const known=new Set();
const content=fs.readFileSync(path.join(root,'src/data/content.ts'),'utf8')+fs.readFileSync(path.join(root,'src/data/additionalProjects.ts'),'utf8');
const descriptions=fs.readFileSync(path.join(root,'src/data/topologyDescriptions.ts'),'utf8');
for(const topo of topologies){
 if(known.has(topo.id))throw new Error(`Duplicate topology ID: ${topo.id}`);known.add(topo.id);
 if(!topo.project||!content.includes(`slug:'${topo.project}'`)&&!content.includes(`slug:"${topo.project}"`))throw new Error(`No project page for ${topo.id}: ${topo.project}`);
 if(!Array.isArray(topo.nodes)||topo.nodes.length<5||!Array.isArray(topo.links)||topo.links.length<4)throw new Error(`Incomplete graph: ${topo.id}`);
 const nodes=new Set();
 for(const n of topo.nodes){
  if(nodes.has(n.id))throw new Error(`Duplicate node ${n.id} in ${topo.id}`);nodes.add(n.id);
  if(!Array.isArray(n.at)||n.at.length!==3||n.at.some(x=>!Number.isFinite(x)||Math.abs(x)>6))throw new Error(`Invalid 3D coords: ${n.id}`);
 }
 const edges=new Set();
 for(const [a,b] of topo.links){
  if(!nodes.has(a)||!nodes.has(b)||a===b)throw new Error(`Invalid link ${a} -> ${b} in ${topo.id}`);
  const key=[a,b].sort().join('~');if(edges.has(key))throw new Error(`Repeated link: ${key}`);edges.add(key);
 }
 for(const locale of ['en','fr','ar'])if(!descriptions.includes(`${locale}:{`))throw new Error(`Missing translation: ${locale}`);
 if(!descriptions.includes(`${topo.id}:{title:`))throw new Error(`Missing locale topology title ${topo.id}`);
}
const studio=fs.readFileSync(path.join(root,'src/components/TopologyStudio.tsx'),'utf8');
if(!studio.includes('TopologyFallback')||!studio.includes('topology-device-buttons'))throw new Error('Accessible fallback/inspector integration missing');
console.log(`PASS: ${topologies.length} graph models, all node/link references, project links, localized labels and 2D fallback`);
