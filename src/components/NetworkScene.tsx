"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const points: [number, number, number][] = [
  [-2.6,.9,-.6],[-1.4,1.5,.2],[-.4,.9,1.2],[.85,1.7,-.2],[2.3,.85,.5],
  [-2.5,-.75,.1],[-1.25,-.3,1.05],[0,0,.45],[1.45,-.4,1.1],[2.65,-.85,-.35],
  [-1.4,-1.55,-.3],[.15,-1.35,.6],[1.6,-1.6,-.5]
];
const connections: [number,number][] = [[0,1],[0,5],[1,2],[1,6],[2,3],[2,7],[3,4],[3,8],[4,9],[5,6],[5,10],[6,7],[6,10],[7,8],[7,11],[8,9],[8,12],[10,11],[11,12]];
function NetworkMesh(){
 const group=useRef<THREE.Group>(null);
 const segmentGeometry=useMemo(()=>{
  const coords:number[]=[];
  for(const [a,b] of connections)coords.push(...points[a],...points[b]);
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(coords,3));return g;
 },[]);
 useFrame(({clock,pointer},delta)=>{
  if(!group.current)return;
  group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y, pointer.x*.18 + Math.sin(clock.elapsedTime*.19)*.18,1.1,delta);
  group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x, pointer.y*-.10 + Math.cos(clock.elapsedTime*.25)*.08,1.1,delta);
 });
 return <group ref={group} rotation={[.08,-.2,.04]}>
   <lineSegments geometry={segmentGeometry}><lineBasicMaterial attach="material" color="#b8d5bf" transparent opacity={.35}/></lineSegments>
   {points.map(([x,y,z],i)=><group position={[x,y,z]} key={i}>
     <mesh><sphereGeometry args={[i===7?.13:.075,14,14]}/><meshBasicMaterial color={i%3===0?"#d4f980":"#e0eee2"}/></mesh>
     {(i===3||i===7||i===10)&&<mesh><sphereGeometry args={[i===7?.27:.19,20,20]}/><meshBasicMaterial color="#d4f980" wireframe transparent opacity={.23}/></mesh>}
   </group>)}
 </group>;
}
export default function NetworkScene(){
 return <div className="network-canvas" aria-hidden="true">
   <Canvas camera={{position:[0,0,7],fov:42}} gl={{alpha:true,antialias:true,powerPreference:"low-power"}} dpr={[1,1.5]}>
     <NetworkMesh/>
   </Canvas>
 </div>;
}
