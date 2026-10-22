"use client";
import {Canvas,useFrame} from '@react-three/fiber';
import {useMemo,useRef,useEffect} from 'react';
import * as THREE from 'three';
import type {NodeKind,Topology,TopologyNode} from '@/data/labTopologies';

const tone:Record<NodeKind,string>={router:'#bdf97a',switch:'#72d5d4',firewall:'#ffa77c',server:'#d2ddff',client:'#b7bcd4',monitor:'#e1bcff',cloud:'#a8ecbd'};
function Label({value,color}:{value:string;color:string}){
 const tex=useMemo(()=>{
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=104;
  const ctx=canvas.getContext('2d');if(ctx){ctx.fillStyle='rgba(15,32,30,0.88)';ctx.fillRect(0,0,512,104);ctx.strokeStyle='#86b99b88';ctx.lineWidth=2;ctx.strokeRect(2,2,508,100);ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 30px Arial';ctx.fillText(value,256,54,480)}
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;return map;
 },[value,color]);
 useEffect(()=>()=>tex.dispose(),[tex]);
 return <sprite position={[0,-.44,0]} scale={[1.56,.32,1]}><spriteMaterial map={tex} transparent depthWrite={false}/></sprite>;
}
function Device({node,selected,onSelect}:{node:TopologyNode;selected:boolean;onSelect:(id:string)=>void}){
 const ref=useRef<THREE.Group>(null);
 useFrame(({clock})=>{if(ref.current)ref.current.position.y=node.at[1]+Math.sin(clock.elapsedTime*1.25+node.at[0])*.045});
 const color=tone[node.kind];
 return <group ref={ref} position={node.at}>
  <mesh onClick={()=>onSelect(node.id)} onPointerOver={()=>{document.body.style.cursor='pointer'}} onPointerOut={()=>{document.body.style.cursor='auto'}}>
   {node.kind==='firewall'?<octahedronGeometry args={[.25,0]}/>:node.kind==='server'?<boxGeometry args={[.42,.52,.38]}/>:node.kind==='switch'?<boxGeometry args={[.52,.19,.42]}/>:node.kind==='cloud'?<icosahedronGeometry args={[.29,1]}/>:node.kind==='client'?<boxGeometry args={[.32,.31,.15]}/>:node.kind==='monitor'?<torusGeometry args={[.23,.08,12,24]}/>:<dodecahedronGeometry args={[.28,0]}/>}
   <meshStandardMaterial color={color} metalness={.3} roughness={.28} emissive={color} emissiveIntensity={selected?.42:.12}/>
  </mesh>
  {selected&&<mesh><torusGeometry args={[.39,.009,6,52]}/><meshBasicMaterial color="#e0f5af" transparent opacity={.9}/></mesh>}
  <Label value={node.label} color={selected?'#efffb9':'#e9f3e8'}/>
 </group>;
}
function FlowLink({a,b,idx,reduced}:{a:TopologyNode;b:TopologyNode;idx:number;reduced:boolean}){
 const start=useMemo(()=>new THREE.Vector3(...a.at),[a]);const end=useMemo(()=>new THREE.Vector3(...b.at),[b]);
 const geometry=useMemo(()=>new THREE.BufferGeometry().setFromPoints([start,end]),[start,end]);
 const orb=useRef<THREE.Mesh>(null);
 useFrame(({clock})=>{if(orb.current&&!reduced)orb.current.position.copy(start).lerp(end,(clock.elapsedTime*.21+idx*.19)%1)});
 return <>
  <lineSegments geometry={geometry}><lineBasicMaterial color="#7fb59e" opacity={.65} transparent/></lineSegments>
  {!reduced&&<mesh ref={orb}><sphereGeometry args={[.044,8,8]}/><meshBasicMaterial color="#d6fa8e"/></mesh>}
 </>;
}
function Network({topology,reduced,selected,onSelected}:{topology:Topology;reduced:boolean;selected:string;onSelected:(id:string)=>void}){
 const group=useRef<THREE.Group>(null);
 const lookup=useMemo(()=>new Map(topology.nodes.map(x=>[x.id,x])),[topology]);
 useFrame(({clock,pointer},delta)=>{
  if(group.current&&!reduced){group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,pointer.x*.15+Math.sin(clock.elapsedTime*.12)*.11,1.5,delta);group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,pointer.y*-.06,1.5,delta)}
 });
 return <group ref={group} rotation={[.12,.0,0]}>
   <gridHelper args={[9,18,'#456e57','#284c41']} position={[0,-2.6,-.25]}/>
   {topology.links.map(([a,b],i)=>{const na=lookup.get(a),nb=lookup.get(b);return na&&nb?<FlowLink key={`${a}-${b}`} a={na} b={nb} idx={i} reduced={reduced}/>:null})}
   {topology.nodes.map(node=><Device key={node.id} node={node} selected={selected===node.id} onSelect={onSelected}/>)}
  </group>;
}
export default function TopologyCanvas({topology,reduced=false,selected='',onSelected}:{topology:Topology;reduced?:boolean;selected?:string;onSelected:(id:string)=>void}){
 return <Canvas key={topology.id} dpr={[1,1.5]} camera={{position:[0,1.0,10.5],fov:44}} gl={{alpha:true,antialias:true,powerPreference:'low-power'}}>
   <ambientLight intensity={1.8}/><directionalLight intensity={3} position={[3,5,8]}/><pointLight intensity={20} color="#b7f9a1" position={[-4,2,2]}/>
   <Network topology={topology} onSelected={onSelected} selected={selected} reduced={reduced}/>
  </Canvas>;
}
