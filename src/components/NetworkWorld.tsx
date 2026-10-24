"use client";
import {Canvas,useFrame,useThree} from "@react-three/fiber";
import {useEffect,useMemo,useRef} from "react";
import {useReducedMotion} from "framer-motion";
import * as THREE from "three";
export type Focus = "network" | "systems" | "security" | "monitoring";
const palette={network:"#65e0db",systems:"#91baff",security:"#ffb38b",monitoring:"#c2a7ff"} as const;
function Equipment({y,kind,selected}:{y:number;kind:Focus;selected:boolean}){
 const light=palette[kind];
 return <group position={[0,y,0.34]}>
   <mesh castShadow><boxGeometry args={[2.33,.36,.61]}/><meshStandardMaterial color={selected?"#285767":"#162f43"} metalness={.72} roughness={.35} emissive={light} emissiveIntensity={selected?.13:.018}/></mesh>
   <mesh position={[0,0,.314]}><boxGeometry args={[2.28,.28,.018]}/><meshStandardMaterial color="#1a3445" metalness={.45} roughness={.35}/></mesh>
   {Array.from({length:kind==="network"?12:kind==="systems"?5:8},(_,i)=><mesh key={i} position={[-.85+i*(kind==="network"?.15:kind==="systems"?.34:.23),.012,.33]}>
     <boxGeometry args={[.086,.072,.015]}/><meshStandardMaterial color={selected?light:"#598399"} emissive={light} emissiveIntensity={selected?.7:.1}/></mesh>)}
   <mesh position={[.94,-.092,.331]}><sphereGeometry args={[.038,8,8]}/><meshStandardMaterial color={light} emissive={light} emissiveIntensity={selected?2:.38}/></mesh>
 </group>;
}
const connections=[
 {a:[-2.95,.85,-.3],b:[-.98,.8,.5],focus:"network" as Focus},
 {a:[-2.85,-.65,.12],b:[-1.02,-.63,.5],focus:"security" as Focus},
 {a:[1.03,1.03,.55],b:[3,1.1,-.4],focus:"systems" as Focus},
 {a:[1.02,-.76,.55],b:[3,-.92,.15],focus:"monitoring" as Focus}
];
function Cable({a,b,focus,selected}:{a:number[];b:number[];focus:Focus;selected:boolean}){
 const tube=useMemo(()=>new THREE.CatmullRomCurve3([
 new THREE.Vector3(a[0],a[1],a[2]),
 new THREE.Vector3((a[0]+b[0])/2,(a[1]+b[1])/2+.25,Math.max(a[2],b[2])+.35),
 new THREE.Vector3(b[0],b[1],b[2])
 ]),[a,b]);
 return <mesh><tubeGeometry args={[tube,28,selected?.024:.012,6,false]}/><meshBasicMaterial color={palette[focus]} transparent opacity={selected?.96:.27}/></mesh>;
}
function RemoteNode({pos,kind,selected}:{pos:[number,number,number];kind:Focus;selected:boolean}){
 return <group position={pos}>
   <mesh castShadow><boxGeometry args={[.66,.48,.58]}/><meshStandardMaterial color="#16374b" metalness={.54} roughness={.31} emissive={palette[kind]} emissiveIntensity={selected?.18:0}/></mesh>
   <mesh position={[0,0,.298]}><boxGeometry args={[.47,.15,.024]}/><meshStandardMaterial color={palette[kind]} emissive={palette[kind]} emissiveIntensity={selected?1.2:.18}/></mesh>
   <mesh position={[0,-.35,0]}><cylinderGeometry args={[.09,.11,.19,8]}/><meshStandardMaterial color="#41647b" metalness={.68}/></mesh>
   <mesh position={[0,-.47,0]}><cylinderGeometry args={[.37,.37,.035,20]}/><meshStandardMaterial color="#34556e" metalness={.67}/></mesh>
   {selected&&<mesh rotation={[Math.PI/2,0,0]} position={[0,-.45,0]}><torusGeometry args={[.55,.012,5,44]}/><meshBasicMaterial color={palette[kind]} transparent opacity={.7}/></mesh>}
 </group>;
}
function CameraFit(){
 const {camera,size,invalidate}=useThree();
 useEffect(()=>{
  if(!(camera instanceof THREE.PerspectiveCamera))return;
  const aspect=size.width/Math.max(1,size.height);
  camera.position.set(0,1.15,aspect<.86?12.4:aspect<1.25?11.3:9.6);
  camera.fov=aspect<.86?44:42;
  camera.updateProjectionMatrix();
  invalidate();
 },[camera,size.width,size.height,invalidate]);
 return null;
}
function Rack({active,orbit}:{active:Focus;orbit:{current:number}}){
 const reduced=useReducedMotion();
 const root=useRef<THREE.Group>(null);
 useFrame(({pointer,clock},delta)=>{
   if(!root.current)return;
   const smoothing=Math.min(1,delta*2.5);
   root.current.rotation.y+=((reduced?0:pointer.x*.21)+orbit.current+(reduced?0:Math.sin(clock.elapsedTime*.16)*.06)-root.current.rotation.y)*smoothing;
   root.current.rotation.x+=((reduced?0:-pointer.y*.07)-root.current.rotation.x)*smoothing;
   root.current.position.y=reduced?0:Math.sin(clock.elapsedTime*.48)*.035;
 });
 return <group ref={root} rotation={[0,-.14,0]}>
   <mesh receiveShadow position={[0,-2.05,0]}><cylinderGeometry args={[2.1,2.35,.1,44]}/><meshStandardMaterial color="#102a3b" metalness={.65} roughness={.46}/></mesh>
   <mesh position={[0,-2.002,0]} rotation={[-Math.PI/2,0,0]}><torusGeometry args={[1.82,.019,6,56]}/><meshBasicMaterial color={palette[active]} transparent opacity={.6}/></mesh>
   {[-1.3,1.3].flatMap(x=>[-.1,.9].map(z=><mesh key={x+"-"+z} position={[x,.1,z]} castShadow><boxGeometry args={[.1,4,.1]}/><meshStandardMaterial color="#507083" metalness={.85} roughness={.25}/></mesh>))}
   <mesh position={[0,2.1,.4]} castShadow><boxGeometry args={[2.72,.12,1.3]}/><meshStandardMaterial color="#26465a" metalness={.82} roughness={.3}/></mesh>
   <mesh position={[0,-1.91,.4]}><boxGeometry args={[2.72,.12,1.3]}/><meshStandardMaterial color="#26465a" metalness={.82} roughness={.3}/></mesh>
   <mesh position={[0,.1,-.13]}><boxGeometry args={[2.6,3.86,.08]}/><meshStandardMaterial color="#0d2235" metalness={.58} roughness={.41}/></mesh>
   <Equipment y={1.58} kind="network" selected={active==="network"}/>
   <Equipment y={.9} kind="security" selected={active==="security"}/>
   <Equipment y={.22} kind="systems" selected={active==="systems"}/>
   <Equipment y={-.46} kind="systems" selected={active==="systems"}/>
   <Equipment y={-1.14} kind="monitoring" selected={active==="monitoring"}/>
   <mesh position={[0,-1.72,.32]}><boxGeometry args={[2.3,.12,.6]}/><meshStandardMaterial color="#203c50" metalness={.7}/></mesh>
   {connections.map((edge,i)=><Cable key={i} {...edge} selected={active===edge.focus}/>)}
   <RemoteNode pos={[-2.95,.85,-.3]} kind="network" selected={active==="network"}/>
   <RemoteNode pos={[-2.85,-.65,.12]} kind="security" selected={active==="security"}/>
   <RemoteNode pos={[3,1.1,-.4]} kind="systems" selected={active==="systems"}/>
   <RemoteNode pos={[3,-.92,.15]} kind="monitoring" selected={active==="monitoring"}/>
 </group>;
}
function Particles(){
 const buffer=useMemo(()=>{
   const points=new Float32Array(270);
   for(let i=0;i<90;i++){const a=i*2.3999632297;const r=2.5+(i%8)*.45;points[i*3]=Math.cos(a)*r;points[i*3+1]=((i*17)%49)/7-3.2;points[i*3+2]=Math.sin(a)*r-1.2;}
   return points;
 },[]);
 return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[buffer,3]}/></bufferGeometry><pointsMaterial color="#82c8d5" size={.023} transparent opacity={.55} sizeAttenuation/></points>;
}
export default function NetworkWorld({active,orbit}:{active:Focus;orbit:{current:number}}){
 return <Canvas dpr={[1,2]} camera={{position:[0,1.15,9.6],fov:42,near:.1,far:70}} gl={{alpha:true,antialias:true,powerPreference:"high-performance"}} fallback={<div className="stage-no-webgl" aria-hidden="true"/>} aria-label="Interactive 3D network infrastructure visualization">
   <CameraFit/>
   <ambientLight intensity={1.4}/><directionalLight position={[4,6,7]} intensity={2.6} color="#d5f6ff"/><pointLight position={[-5,1,1]} color="#51d5d4" intensity={21} distance={14}/><pointLight position={[4,-2,2]} color="#ffb17f" intensity={10} distance={12}/>
   <fog attach="fog" args={["#0b2030",13,27]}/>
   <Particles/><Rack active={active} orbit={orbit}/>
 </Canvas>;
}