"use client";
import {Canvas,useFrame} from "@react-three/fiber";
import {useEffect,useMemo,useRef} from "react";
import * as THREE from "three";

/** A conceptual infrastructure constellation, not an illustration of a deployed customer network. */
const points:[number,number,number][]=[
  [-2.7,.95,-.7],[-1.65,1.48,.35],[-.36,.75,1.13],[.95,1.46,-.7],[2.5,.8,.48],
  [-2.42,-.53,.62],[-1.04,-.25,-.94],[0,.02,.56],[1.48,-.38,1.0],[2.65,-.96,-.42],
  [-1.48,-1.38,-.4],[.05,-1.48,-.73],[1.7,-1.53,.35]
];
const connections:[number,number][]=[
  [0,1],[0,5],[1,2],[1,6],[2,3],[2,7],[3,4],[3,8],[4,9],[5,6],
  [5,10],[6,7],[6,10],[7,8],[7,11],[8,9],[8,12],[10,11],[11,12]
];

function Packet({from,to,delay,bright}:{from:number;to:number;delay:number;bright:boolean}){
  const mesh=useRef<THREE.Mesh>(null);
  const a=useMemo(()=>new THREE.Vector3(...points[from]),[from]);
  const b=useMemo(()=>new THREE.Vector3(...points[to]),[to]);
  useFrame(({clock})=>{
    const p=((clock.elapsedTime*(bright?.38:.25))+delay)%1;
    if(mesh.current){
      mesh.current.position.lerpVectors(a,b,p);
      const size=(.7+Math.sin(Math.PI*p)*.65);
      mesh.current.scale.setScalar(size);
    }
  });
  return <mesh ref={mesh}>
    <sphereGeometry args={[bright?.058:.04,10,10]}/>
    <meshBasicMaterial color={bright?"#f6c592":"#72e1d6"}/>
  </mesh>;
}

function SignalNode({point,index}:{point:[number,number,number];index:number}){
  const ring=useRef<THREE.Mesh>(null);
  const key=index===7||index===1||index===8;
  useFrame(({clock})=>{
    if(ring.current){
      const pulse=(clock.elapsedTime*.8+index*.17)%1;
      ring.current.scale.setScalar(.85+pulse*.8);
      const material=ring.current.material as THREE.MeshBasicMaterial;
      material.opacity=(1-pulse)*.58;
    }
  });
  return <group position={point}>
    <mesh>
      <icosahedronGeometry args={[key?.15:.087,1]}/>
      <meshStandardMaterial color={key?"#e4ac80":"#88dfd8"} emissive={key?"#a75d36":"#1e7a88"} emissiveIntensity={.75} metalness={.2} roughness={.3}/>
    </mesh>
    {key&&<mesh ref={ring} rotation={[Math.PI/2,.16,0]}>
      <torusGeometry args={[.29,.009,6,40]}/>
      <meshBasicMaterial color="#f3c6a5" transparent opacity={.48} depthWrite={false}/>
    </mesh>}
  </group>;
}

function NetworkMesh(){
  const group=useRef<THREE.Group>(null);
  const lines=useMemo(()=>{
    const xyz:number[]=[];
    connections.forEach(([a,b])=>xyz.push(...points[a],...points[b]));
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute("position",new THREE.Float32BufferAttribute(xyz,3));
    return geometry;
  },[]);
  useEffect(()=>()=>lines.dispose(),[lines]);
  useFrame(({clock,pointer},delta)=>{
    if(!group.current)return;
    const t=clock.elapsedTime;
    group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,Math.sin(t*.25)*.24+pointer.x*.22,1.3,delta);
    group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,Math.cos(t*.18)*.095-pointer.y*.11,1.3,delta);
    group.current.position.y=Math.sin(t*.55)*.055;
  });
  return <group ref={group} rotation={[.11,-.3,0]}>
    <gridHelper args={[8.4,16,"#2c5965","#1c3947"]} position={[0,-2.06,-1.2]}/>
    <lineSegments geometry={lines}>
      <lineBasicMaterial color="#7cb9c7" transparent opacity={.56}/>
    </lineSegments>
    {points.map((pt,i)=><SignalNode key={i} point={pt} index={i}/>)}
    {[0,2,3,5,7,9,11,13,16,18].map((n,i)=>{
      const [a,b]=connections[n];
      return <Packet key={n} from={a} to={b} delay={(i*.137)%1} bright={i%3===0}/>;
    })}
  </group>;
}
export default function NetworkScene(){
  return <div className="network-canvas" aria-hidden="true">
    <Canvas camera={{position:[0,.05,7.2],fov:44}} gl={{alpha:true,antialias:true,powerPreference:"low-power"}} dpr={[1,1.45]} fallback={null}>
      <ambientLight intensity={1.4}/>
      <pointLight position={[0,2,4]} color="#84deda" intensity={20}/>
      <pointLight position={[3,1,0]} color="#e0a87e" intensity={11}/>
      <NetworkMesh/>
    </Canvas>
  </div>;
}
