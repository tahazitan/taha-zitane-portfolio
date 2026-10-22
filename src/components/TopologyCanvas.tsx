"use client";
import {Canvas, useFrame} from '@react-three/fiber';
import {useEffect, useMemo, useRef} from 'react';
import * as THREE from 'three';
import type {NodeKind,Topology,TopologyNode} from '@/data/labTopologies';

const tone:Record<NodeKind,string>={
  router:'#5dc7ff',
  switch:'#7be0da',
  firewall:'#ff9b74',
  server:'#9bb0ff',
  client:'#d7dde9',
  monitor:'#dcaaff',
  cloud:'#8eddb6'
};

function Label({value,color}:{value:string;color:string}){
  const tex=useMemo(()=>{
    const canvas=document.createElement('canvas');
    canvas.width=520; canvas.height=108;
    const ctx=canvas.getContext('2d');
    if(ctx){
      ctx.fillStyle='rgba(10,18,24,0.88)';
      ctx.fillRect(0,0,520,108);
      ctx.strokeStyle='rgba(164,196,255,0.42)';
      ctx.lineWidth=2;
      ctx.strokeRect(3,3,514,102);
      ctx.fillStyle=color;
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      ctx.font='bold 29px Arial';
      ctx.fillText(value,260,55,500);
    }
    const map=new THREE.CanvasTexture(canvas);
    map.colorSpace=THREE.SRGBColorSpace;
    return map;
  },[value,color]);
  useEffect(()=>()=>tex.dispose(),[tex]);
  return <sprite position={[0,-.58,0]} scale={[1.62,.34,1]}><spriteMaterial map={tex} transparent depthWrite={false}/></sprite>;
}

function RackUnit({y=0}:{y?:number}){
  return <group position={[0,y,0]}>
    <mesh position={[0,0,0]}>
      <boxGeometry args={[.46,.16,.34]}/>
      <meshStandardMaterial color="#101826" metalness={.55} roughness={.35}/>
    </mesh>
    {[-.13,0,.13].map((x,i)=><mesh key={i} position={[x,0,.175]}>
      <sphereGeometry args={[.016,10,10]}/>
      <meshBasicMaterial color={i===1?"#78d8ff":"#bfe2ff"}/>
    </mesh>)}
  </group>;
}

function DeviceGeometry({kind}:{kind:NodeKind}){
  switch(kind){
    case 'router':
      return <group>
        <mesh position={[0,.03,0]}>
          <cylinderGeometry args={[.26,.26,.22,28]}/>
          <meshStandardMaterial color={tone.router} metalness={.25} roughness={.28}/>
        </mesh>
        <mesh rotation={[0,0,Math.PI/2]} position={[0,.12,0]}>
          <torusGeometry args={[.22,.025,10,40,Math.PI*1.6]}/>
          <meshBasicMaterial color="#e9fbff" transparent opacity={.95}/>
        </mesh>
      </group>;
    case 'switch':
      return <group>
        <mesh>
          <boxGeometry args={[.62,.16,.44]}/>
          <meshStandardMaterial color={tone.switch} metalness={.3} roughness={.25}/>
        </mesh>
        {Array.from({length:6}).map((_,i)=><mesh key={i} position={[-.22+i*.088,-.01,.224]}>
          <boxGeometry args={[.045,.03,.02]}/>
          <meshStandardMaterial color="#10242b" metalness={.5} roughness={.35}/>
        </mesh>)}
      </group>;
    case 'firewall':
      return <group>
        <mesh>
          <boxGeometry args={[.52,.22,.22]}/>
          <meshStandardMaterial color={tone.firewall} metalness={.32} roughness={.22}/>
        </mesh>
        <mesh position={[0,.02,.12]}>
          <ringGeometry args={[.05,.11,20]}/>
          <meshBasicMaterial color="#fff3e6" side={THREE.DoubleSide}/>
        </mesh>
      </group>;
    case 'server':
      return <group>
        <RackUnit y={.18}/><RackUnit y={0}/><RackUnit y={-.18}/>
      </group>;
    case 'client':
      return <group>
        <mesh position={[0,.02,0]}>
          <boxGeometry args={[.34,.22,.05]}/>
          <meshStandardMaterial color="#dde6ef" metalness={.25} roughness={.18}/>
        </mesh>
        <mesh position={[0,-.16,0]}>
          <boxGeometry args={[.12,.08,.04]}/>
          <meshStandardMaterial color="#cad3de"/>
        </mesh>
        <mesh position={[0,-.22,0]}>
          <boxGeometry args={[.22,.025,.12]}/>
          <meshStandardMaterial color="#bac5d3"/>
        </mesh>
      </group>;
    case 'monitor':
      return <group>
        <mesh position={[0,.03,0]}>
          <boxGeometry args={[.46,.28,.06]}/>
          <meshStandardMaterial color="#11192b" metalness={.4} roughness={.2}/>
        </mesh>
        <mesh position={[0,.03,.035]}>
          <planeGeometry args={[.38,.2]}/>
          <meshBasicMaterial color={tone.monitor}/>
        </mesh>
        <mesh position={[0,-.17,0]}>
          <boxGeometry args={[.06,.12,.04]}/>
          <meshStandardMaterial color="#cad5e4"/>
        </mesh>
        <mesh position={[0,-.24,0]}>
          <boxGeometry args={[.24,.024,.12]}/>
          <meshStandardMaterial color="#c5d2df"/>
        </mesh>
      </group>;
    case 'cloud':
      return <group>
        {[[-.15,0,0,.14],[0,.06,0,.18],[.16,0,0,.14],[0,-.02,0,.13]].map(([x,y,z,r],i)=><mesh key={i} position={[x as number,y as number,z as number]}>
          <sphereGeometry args={[r as number,16,16]}/>
          <meshStandardMaterial color={tone.cloud} metalness={.1} roughness={.4}/>
        </mesh>)}
      </group>;
  }
}

function Device({node,selected,onSelect}:{node:TopologyNode;selected:boolean;onSelect:(id:string)=>void}){
  const ref=useRef<THREE.Group>(null);
  useFrame(({clock})=>{
    if(ref.current) ref.current.position.y=node.at[1]+Math.sin(clock.elapsedTime*1.15+node.at[0]*.7)*.04;
  });
  const color=tone[node.kind];
  return <group ref={ref} position={node.at} onClick={()=>onSelect(node.id)} onPointerOver={()=>{document.body.style.cursor='pointer';}} onPointerOut={()=>{document.body.style.cursor='auto';}}>
    <DeviceGeometry kind={node.kind}/>
    {selected&&<mesh rotation={[-Math.PI/2,0,0]} position={[0,-.28,0]}>
      <torusGeometry args={[.41,.012,8,48]}/>
      <meshBasicMaterial color={color} transparent opacity={.95}/>
    </mesh>}
    {selected&&<mesh position={[0,.36,0]}>
      <sphereGeometry args={[.05,10,10]}/>
      <meshBasicMaterial color="#f4ffd4"/>
    </mesh>}
    <Label value={node.label} color={selected?'#f4ffd4':'#eef4ff'}/>
  </group>;
}

function FlowLink({a,b,idx,reduced,highlighted,dimmed}:{a:TopologyNode;b:TopologyNode;idx:number;reduced:boolean;highlighted:boolean;dimmed:boolean}){
  const start=useMemo(()=>new THREE.Vector3(...a.at),[a]);
  const end=useMemo(()=>new THREE.Vector3(...b.at),[b]);
  const geometry=useMemo(()=>new THREE.BufferGeometry().setFromPoints([start,end]),[start,end]);
  const orb=useRef<THREE.Mesh>(null);
  useEffect(()=>()=>geometry.dispose(),[geometry]);
  useFrame(({clock})=>{if(orb.current&&!reduced) orb.current.position.copy(start).lerp(end,(clock.elapsedTime*(highlighted?.26:.12)+idx*.17)%1)});
  return <>
    <lineSegments geometry={geometry}><lineBasicMaterial color={highlighted?"#fbbf9b":"#83b6d7"} opacity={highlighted?1:dimmed?.2:.62} transparent/></lineSegments>
    {!reduced && (!dimmed || highlighted)&&<mesh ref={orb}><sphereGeometry args={[highlighted?.064:.037,10,10]}/><meshBasicMaterial color={highlighted?"#ffd1aa":"#d5f8ff"}/></mesh>}
  </>;
}

function Network({topology,reduced,selected,onSelected,activeFlow}:{topology:Topology;reduced:boolean;selected:string;onSelected:(id:string)=>void;activeFlow?:string}){
  const group=useRef<THREE.Group>(null);
  const lookup=useMemo(()=>new Map(topology.nodes.map(x=>[x.id,x])),[topology]);
  const flowNodes=topology.flows?.find(f=>f.id===activeFlow)?.nodes ?? [];
  const highlight=new Set(flowNodes.slice(1).map((node,i)=>[flowNodes[i],node].sort().join(":")));
  const dimmed=flowNodes.length>1;
  useFrame(({clock,pointer},delta)=>{
    if(group.current && !reduced){
      group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,pointer.x*.12+Math.sin(clock.elapsedTime*.1)*.07,1.4,delta);
      group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,pointer.y*-.05,1.4,delta);
    }
  });
  return <group ref={group} rotation={[.08,0,0]}>
    <gridHelper args={[9,18,'#3d566e','#203447']} position={[0,-2.6,-.25]}/>
    {topology.links.map(([a,b],i)=>{const na=lookup.get(a), nb=lookup.get(b); return na&&nb ? <FlowLink key={`${a}-${b}`} a={na} b={nb} idx={i} reduced={reduced} highlighted={highlight.has([a,b].sort().join(":"))} dimmed={dimmed}/> : null;})}
    {topology.nodes.map(node=><Device key={node.id} node={node} selected={selected===node.id} onSelect={onSelected}/>)}
  </group>;
}

export default function TopologyCanvas({topology,reduced=false,selected='',onSelected,activeFlow}:{topology:Topology;reduced?:boolean;selected?:string;onSelected:(id:string)=>void;activeFlow?:string}){
  return <Canvas key={topology.id} dpr={[1,1.5]} camera={{position:[0,1.0,10.5],fov:44}} gl={{alpha:true,antialias:true,powerPreference:'low-power'}}>
    <ambientLight intensity={1.55}/>
    <directionalLight intensity={2.6} position={[4,5,6]}/>
    <pointLight intensity={18} color="#97c5ff" position={[-4,2,2]}/>
    <pointLight intensity={12} color="#ffd9c6" position={[4,1,3]}/>
    <Network topology={topology} onSelected={onSelected} selected={selected} reduced={reduced} activeFlow={activeFlow}/>
  </Canvas>;
}
