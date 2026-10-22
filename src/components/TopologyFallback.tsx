"use client";
import type {Topology} from '@/data/labTopologies';
const colors={router:'#bdf97a',switch:'#72d5d4',firewall:'#ffa77c',server:'#d2ddff',client:'#b7bcd4',monitor:'#e1bcff',cloud:'#a8ecbd'} as const;
/** Accessible schematic fallback: unlike a plain text placeholder it preserves the actual graph edges. */
export default function TopologyFallback({topology,onSelected}:{topology:Topology;onSelected:(id:string)=>void}){
 const n=new Map(topology.nodes.map(node=>[node.id,node]));
 const at=(id:string)=>{const q=n.get(id);return q?{x:400+q.at[0]*88,y:250-q.at[1]*63}:null};
 return <svg viewBox="0 0 800 510" className="topology-fallback-svg" role="img" aria-label={`${topology.title} — reference network architecture`}>
  <defs><pattern id="topo-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" stroke="#ffffff12" fill="none"/></pattern></defs>
  <rect width="800" height="510" fill="url(#topo-grid)"/>
  {topology.links.map(([a,b],i)=>{const p=at(a),q=at(b);return p&&q?<line key={`${a}:${b}:${i}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#87bb9a" strokeWidth="2" strokeDasharray="7 7"/>:null})}
  {topology.nodes.map(node=>{const p=at(node.id);if(!p)return null;return <g key={node.id} role="button" tabIndex={0} aria-label={`Inspect ${node.label}`} onClick={()=>onSelected(node.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelected(node.id)}}} style={{cursor:'pointer'}}><circle cx={p.x} cy={p.y} r="22" fill="#132a2a" stroke={colors[node.kind]} strokeWidth="2.5"/><circle cx={p.x} cy={p.y} r="7" fill={colors[node.kind]}/><rect x={p.x-66} y={p.y+28} width="132" height="26" rx="3" fill="#102220" stroke="#547765"/><text x={p.x} y={p.y+46} fontSize="12" fill="#f3f5e9" textAnchor="middle" fontFamily="Arial, sans-serif">{node.label}</text></g>})}
 </svg>;
}
