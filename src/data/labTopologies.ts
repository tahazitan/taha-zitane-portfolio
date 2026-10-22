/** Architecture reference diagrams. They visualize planned lab designs, not live networks. */
export type NodeKind = 'router'|'switch'|'firewall'|'server'|'client'|'monitor'|'cloud';
export type TopologyNode = {id:string; label:string; kind:NodeKind; at:[number,number,number]};
export type Topology = {id:string; title:string; subtitle:string; protocol:string; nodes:TopologyNode[]; links:[string,string][]; project:string};
export const topologyDesigns: Topology[] = [
 {id:'multi',title:'Multi-site routing',subtitle:'Headquarters ↔ branch office · segmented routing and encrypted connectivity',protocol:'OSPF · VLAN · WireGuard',project:'enterprise-network-lab',nodes:[
  {id:'wan',label:'WAN',kind:'cloud',at:[0,1.25,-.6]},{id:'hq',label:'HQ Router',kind:'router',at:[-2.05,.15,.15]},{id:'br',label:'Branch Router',kind:'router',at:[2.05,.15,.15]},
  {id:'hqs',label:'Core Switch',kind:'switch',at:[-2.2,-1.05,1]},{id:'brs',label:'Branch Switch',kind:'switch',at:[2.25,-1.05,1]},
  {id:'srv',label:'Services',kind:'server',at:[-3.45,-1.85,1.25]},{id:'pc1',label:'HQ Clients',kind:'client',at:[-1.05,-1.95,1.25]},
  {id:'pc2',label:'Branch PCs',kind:'client',at:[3.28,-1.9,1.25]}],links:[['wan','hq'],['wan','br'],['hq','br'],['hq','hqs'],['br','brs'],['hqs','srv'],['hqs','pc1'],['brs','pc2']]},
 {id:'identity',title:'Windows identity',subtitle:'An isolated enterprise domain with core roles and client enrollment',protocol:'AD DS · DNS · GPO · SMB',project:'windows-server-ad',nodes:[
  {id:'edge',label:'Gateway',kind:'router',at:[0,1.6,-.6]},{id:'sw',label:'LAN Switch',kind:'switch',at:[0,.35,0]},
  {id:'dc',label:'DC / DNS',kind:'server',at:[-2,-.9,.8]},{id:'files',label:'File Server',kind:'server',at:[2,-.9,.8]},
  {id:'pc',label:'Domain Client',kind:'client',at:[0,-1.7,1.7]},{id:'back',label:'Backup',kind:'server',at:[-3.2,.65,-.5]}],links:[['edge','sw'],['sw','dc'],['sw','files'],['sw','pc'],['dc','back']]},
 {id:'vpn',title:'Perimeter & IPsec',subtitle:'FortiGate and Palo Alto policy zones with site-to-site tunnel architecture',protocol:'IPsec · Security Policy · NAT',project:'firewall-ipsec-lab',nodes:[
  {id:'fort',label:'FortiGate',kind:'firewall',at:[-2,.35,.25]},{id:'palo',label:'Palo Alto',kind:'firewall',at:[2,.35,.25]},
  {id:'int',label:'Public WAN',kind:'cloud',at:[0,1.75,-1]},{id:'lan1',label:'LAN A',kind:'switch',at:[-2.35,-1.15,1.2]},
  {id:'lan2',label:'LAN B',kind:'switch',at:[2.35,-1.15,1.2]},{id:'host1',label:'Client A',kind:'client',at:[-3.45,-2,1.35]},
  {id:'host2',label:'Client B',kind:'client',at:[3.45,-2,1.35]}],links:[['fort','int'],['int','palo'],['fort','palo'],['fort','lan1'],['palo','lan2'],['lan1','host1'],['lan2','host2']]},
 {id:'hypervisor',title:'Virtual infrastructure',subtitle:'Proxmox host, virtual networks, directory services and monitoring',protocol:'Proxmox · vBridge · VM · Backup',project:'proxmox-virtualization-lab',nodes:[
  {id:'host',label:'Proxmox VE',kind:'server',at:[0,1.45,0]},{id:'bridge',label:'VM Bridge',kind:'switch',at:[0,.0,.7]},
  {id:'win',label:'Windows VM',kind:'server',at:[-2,-1.25,1.25]},{id:'linux',label:'Linux VM',kind:'server',at:[2,-1.25,1.25]},
  {id:'mon',label:'Monitoring',kind:'monitor',at:[0,-1.75,1.75]},{id:'backup',label:'Storage',kind:'server',at:[-2.7,1.1,-.7]}],links:[['host','bridge'],['host','backup'],['bridge','win'],['bridge','linux'],['bridge','mon']]},
 {id:'observability',title:'Security observability',subtitle:'Endpoints, mirrored traffic, IDS and an event collection pipeline',protocol:'Syslog · Wazuh · Snort · PCAP',project:'security-observability-labs',nodes:[
  {id:'r',label:'Edge',kind:'router',at:[0,1.75,-1]},{id:'s',label:'Switch',kind:'switch',at:[0,.45,.2]},
  {id:'snort',label:'Snort IDS',kind:'firewall',at:[-2,-.95,1.1]},{id:'wazuh',label:'Wazuh SIEM',kind:'monitor',at:[2,-.95,1.1]},
  {id:'a',label:'Endpoint A',kind:'client',at:[-3.4,-1.75,1.35]},{id:'b',label:'Endpoint B',kind:'client',at:[3.4,-1.75,1.35]}],links:[['r','s'],['s','snort'],['s','wazuh'],['snort','a'],['wazuh','b'],['snort','wazuh']]},
 {id:'campus',title:'Campus switching',subtitle:'An access-distribution topology with segmented departments and gateway routing',protocol:'802.1Q · STP · ACL · Inter-VLAN',project:'cisco-campus-network-lab',nodes:[
  {id:'router',label:'L3 Gateway',kind:'router',at:[0,1.4,-.8]},{id:'core',label:'Core Switch',kind:'switch',at:[0,.25,.2]},
  {id:'as1',label:'Access SW 1',kind:'switch',at:[-2.1,-1,1]},{id:'as2',label:'Access SW 2',kind:'switch',at:[2.1,-1,1]},
  {id:'a',label:'VLAN 10',kind:'client',at:[-3.3,-1.85,1.4]},{id:'b',label:'VLAN 20',kind:'client',at:[-1,-1.85,1.4]},
  {id:'c',label:'VLAN 30',kind:'client',at:[3.3,-1.85,1.4]}],links:[['router','core'],['core','as1'],['core','as2'],['as1','a'],['as1','b'],['as2','c']]}
];
export function topologyForProject(slug:string){return topologyDesigns.find(x=>x.project===slug)}
