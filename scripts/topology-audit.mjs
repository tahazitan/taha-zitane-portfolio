import fs from 'node:fs';
import path from 'node:path';

// Audit the source-grounded topology shipped to visitors. Old illustrative
// Three.js diagrams were intentionally removed; only the existing user's
// documented Containerlab YAML files may be presented as configured sources.
const root=path.resolve(import.meta.dirname,'..');
const source=fs.readFileSync(path.join(root,'src/components/SourceTopology.tsx'),'utf8');
const home=fs.readFileSync(path.join(root,'src/components/Home.tsx'),'utf8');
const casePage=fs.readFileSync(path.join(root,'src/components/CasePage.tsx'),'utf8');

const mandatoryNodes=['hq-rtr','branch-rtr','hq-it','hq-users','branch-user','hq-switch','branch-switch'];
const mandatoryInterfaces=['eth1 ↔ eth1','eth2 ↔ eth1','eth3 ↔ eth1'];
for(const id of mandatoryNodes)if(!source.includes('id:"'+id+'"'))throw new Error('Missing sourced node: '+id);
for(const port of mandatoryInterfaces)if(!source.includes(port))throw new Error('Missing referenced interface: '+port);
for(const file of ['topology.clab.yml','secure/topology.secure.clab.yml'])if(!source.includes(file))throw new Error('Missing source file: '+file);
const base=source.split('const base:Profile=')[1]?.split('const secure:Profile=')[0]??'';
const secure=source.split('const secure:Profile=')[1]?.split('const copy=')[0]??'';
const count=(x,regex)=>(x.match(regex)||[]).length;
if(count(base,/id:"/g)!==5||count(base,/ports:"/g)!==4)throw new Error('Base YAML must have five nodes/four links');
if(count(secure,/id:"/g)!==7||count(secure,/ports:"/g)!==6)throw new Error('Secure YAML must have seven nodes/six links');
if(!source.includes('github.com/tahazitan/enterprise-network-lab'))throw new Error('Missing original source repository');
if(!casePage.includes('<SourceTopology locale={locale} compact/>'))throw new Error('Documented topology missing from enterprise case study');
if(home.includes('<SourceTopology'))throw new Error('Heavy infrastructure topology must stay inside project case studies');
for(const unsourced of ['TopologyStudio','TopologyCanvas','EquipmentGallery','NetworkBackdrop'])if(home.includes(unsourced)||casePage.includes(unsourced))throw new Error('Unsourced illustration still visible: '+unsourced);
console.log('PASS: base 5 nodes/4 links; secure 7 nodes/6 links; source repository references, project-only enterprise case wiring');
