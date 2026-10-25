"use client";
import {Canvas,useFrame,useThree} from "@react-three/fiber";
import {Html,Line,RoundedBox} from "@react-three/drei";
import {useReducedMotion} from "framer-motion";
import {useEffect,useMemo,useRef} from "react";
import * as THREE from "three";
import {topologyDesigns,type TopologyNode} from "@/data/labTopologies";

export type Focus="network"|"systems"|"security"|"monitoring";
/** Positions are a view layout; IDs, roles and links are from the documented
 * enterprise reference data. This is NOT observed production topology. */
const architecture=topologyDesigns.find(t=>t.id==="enterprise")!;
const stage:Record<string,[number,number,number]>={
 remote:[-4.75,2.55,0],wan:[-.05,2.55,0],
 hqfw:[-.05,1.35,.1],core:[-.05,.05,.2],
 dmz:[-2.05,.35,.1],dmzapp:[-2.45,-.9,.2],
 identity:[-1.6,-1.55,.2],linux:[.65,-1.55,.2],
 siem:[.7,-2.8,.15],backups:[2.2,-2.8,.15],
 branchA:[4.25,1.3,0],branchASw:[4.25,-.05,.1],branchAUsers:[4.25,-1.35,.1],
 branchB:[-4.15,1.3,0],branchBSw:[-4.15,-.05,.1],branchBUsers:[-4.15,-1.35,.1],
 users:[-1.15,-.48,.1],management:[1.6,-.48,.1],guests:[2.8,-1.55,.1]
};
const focusOf=(node:TopologyNode):Focus=>node.kind==="firewall"?"security":node.kind==="monitor"?"monitoring":node.kind==="server"?"systems":"network";
const palette:Record<Focus,string>={network:"#65c5d7",security:"#edbd82",systems:"#b0bfe1",monitoring:"#7bd6ad"};
const coords=(id:string):THREE.Vector3=>new THREE.Vector3(...(stage[id]??[0,0,0]));
const inView=architecture.nodes.filter(node=>Boolean(stage[node.id]));
const lines=architecture.links.filter(([a,b])=>Boolean(stage[a]&&stage[b]));
const flowTypes:Record<Focus,string>={network:"branch",security:"remote",systems:"backup",monitoring:"monitor"};
function CameraFit(){
 const {size,camera}=useThree();
 useEffect(()=>{
  if(!(camera instanceof THREE.OrthographicCamera))return;
  camera.zoom=Math.max(18,Math.min(115,(size.width-38)/11,(size.height-75)/6.4));
  camera.position.set(0,.03,20);
  camera.lookAt(0,-.15,0);camera.updateProjectionMatrix();
 },[size.width,size.height,camera]);
 return null;
}
function ArchitectureNode({node,active,selected,onInspect}:{node:TopologyNode;active:Focus;selected:boolean;onInspect:(id:string)=>void}){
 const kind=focusOf(node),lit=kind===active;
 const pos=stage[node.id];const color=palette[kind];
 return <group position={pos} onClick={e=>{e.stopPropagation();onInspect(node.id)}} onPointerOver={e=>{e.stopPropagation();document.body.style.cursor="pointer"}} onPointerOut={()=>{document.body.style.cursor=""}}>
  <RoundedBox args={[.81,.42,.27]} radius={.072} smoothness={3} castShadow>
   <meshStandardMaterial color={selected?"#3c5c6f":lit?"#29475b":"#1d3346"} metalness={.17} roughness={.7}/>
  </RoundedBox>
  <mesh position={[0,0,.15]}><boxGeometry args={[.65,.04,.025]}/><meshBasicMaterial color={color} transparent opacity={lit?1:.25}/></mesh>
  <mesh position={[-.24,-.12,.15]}><sphereGeometry args={[.035,8,8]}/><meshBasicMaterial color={lit?color:"#556e80"}/></mesh>
  {selected&&<mesh position={[0,0,-.03]}><boxGeometry args={[1.02,.6,.28]}/><meshBasicMaterial color={color} wireframe transparent opacity={.65}/></mesh>}
  <Html center position={[0,-.37,0]} distanceFactor={12} style={{pointerEvents:"none"}} zIndexRange={[12,0]}>
   <span className={"topology-3d-label"+(lit?" is-lit":"")} data-kind={kind}>{node.label}</span>
  </Html>
 </group>;
}
function Trace({active,paused}:{active:Focus;paused:boolean}){
 const reduced=useReducedMotion();
 const marker=useRef<THREE.Mesh>(null);
 const route=useMemo(()=>architecture.flows?.find(x=>x.id===flowTypes[active])?.nodes.filter(x=>stage[x])??[],[active]);
 useFrame(({clock})=>{
  if(!marker.current||route.length<2)return;
  const speed=paused||reduced?0:clock.elapsedTime*.34;
  const tick=speed%(route.length-1);
  const index=Math.floor(tick);
  marker.current.position.lerpVectors(coords(route[index]),coords(route[index+1]),tick-index);
  marker.current.position.z+=.16;
 });
 if(route.length<2||paused||reduced)return null;
 return <mesh ref={marker}><sphereGeometry args={[.085,12,12]}/><meshBasicMaterial color={palette[active]}/></mesh>;
}
function Diagram({active,orbit,onInspect,motionPaused,selected}:{active:Focus;orbit:{current:number};onInspect:(id:string)=>void;motionPaused:boolean;selected:string|null}){
 const root=useRef<THREE.Group>(null),reduced=useReducedMotion();
 useFrame((state,delta)=>{
  if(!root.current)return;
  const target=(motionPaused||reduced?0:state.pointer.x*.055)+orbit.current*.3;
  root.current.rotation.y=THREE.MathUtils.damp(root.current.rotation.y,target,2.7,delta);
 });
 return <group ref={root}>
  <mesh position={[0,-.08,-.6]} receiveShadow><planeGeometry args={[11.5,6.6]}/><meshBasicMaterial color="#0d2535" transparent opacity={.58}/></mesh>
  {lines.map(([a,b],i)=>{
   const aa=architecture.nodes.find(n=>n.id===a)!,bb=architecture.nodes.find(n=>n.id===b)!;
   const relation=focusOf(aa)===active||focusOf(bb)===active;
   const vpn=(a==="branchA"||a==="branchB")&&b==="hqfw";
   const ca=coords(a),cb=coords(b);
   return <Line key={a+"-"+b+"-"+i} points={[[ca.x,ca.y,ca.z-.16],[cb.x,cb.y,cb.z-.16]]} lineWidth={vpn?2:1.4} color={vpn?"#d7a876":"#5e8da7"} transparent opacity={relation?.83:.24} dashed={vpn} dashSize={.18} gapSize={.12}/>;
  })}
  {inView.map(node=><ArchitectureNode key={node.id} node={node} active={active} selected={selected===node.id} onInspect={onInspect}/>)}
  <Trace active={active} paused={motionPaused}/>
 </group>;
}
export default function NetworkWorld({active,orbit,onSelect,onInspect,selectedNode,motionPaused,onContextLost}:{active:Focus;orbit:{current:number};onSelect:(kind:Focus)=>void;onInspect?:(id:string)=>void;selectedNode?:string|null;motionPaused:boolean;onContextLost:()=>void}){
 const inspect=(id:string)=>{let n=architecture.nodes.find(x=>x.id===id);if(n)onSelect(focusOf(n));onInspect?.(id)};
 return <Canvas orthographic camera={{position:[0,0,20],zoom:70,near:.1,far:100}} dpr={[1,1.5]} gl={{alpha:true,antialias:true,powerPreference:"low-power"}} onCreated={({gl})=>gl.domElement.addEventListener("webglcontextlost",e=>{e.preventDefault();onContextLost()},{once:true})} fallback={<div className="stage-no-webgl"/>} aria-label="Interactive three-dimensional reference network architecture: HQ, two branches and remote connectivity">
  <CameraFit/>
  <ambientLight intensity={1.9}/>
  <directionalLight position={[3,5,8]} color="#d8effa" intensity={1.6}/>
  <Diagram active={active} orbit={orbit} onInspect={inspect} motionPaused={motionPaused} selected={selectedNode??null}/>
 </Canvas>;
}
