"use client";
import {useState} from 'react';
import {Building2, Network, Shield, Server, Cloud, HardDriveDownload} from 'lucide-react';
import type {Locale} from '@/data/content';

const text={
 en:{label:'ENTERPRISE NETWORK / LOGICAL DESIGN',title:'One organisation. Multiple security boundaries.',subtitle:'A reference design: select a network zone to see its function and the intended access boundary.',hint:'SELECT A ZONE',zones:[
  ['WAN & remote access','Internet transit, remote-worker authentication and protected VPN termination. External traffic must cross an explicit access policy.'],
  ['Headquarters perimeter','Stateful firewall, DMZ termination, restricted site-to-site tunnels and controlled internal ingress.'],
  ['Branch A & Branch B','Two separately routed branch sites. Each branch receives only the explicitly permitted headquarters services.'],
  ['HQ core & VLANs','Users 10 · Servers 20 · Management 30 · Guests 40. Inter-zone traffic is governed by policy.'],
  ['Identity, apps & monitoring','Windows AD/DNS, Linux/Docker applications, security events and monitoring in distinct services zones.'],
  ['Backup & recovery','Restricted recovery target, documented restore process and planned integrity and timing checks.']]},
 fr:{label:'ENTREPRISE / ARCHITECTURE LOGIQUE',title:'Une organisation. Plusieurs frontières de sécurité.',subtitle:'Schéma de référence : sélectionnez une zone pour comprendre son rôle et ses contrôles d’accès.',hint:'CHOISIR UNE ZONE',zones:[
  ['WAN et accès distant','Transit internet, authentification des télétravailleurs et terminaison VPN. Accès soumis à une politique explicite.'],
  ['Périmètre du siège','Pare-feu, DMZ, tunnels inter-sites restreints et contrôle d’entrée vers le réseau interne.'],
  ['Agences A et B','Deux sites routés distincts. Chaque agence accède uniquement aux services autorisés du siège.'],
  ['Cœur réseau et VLAN','Utilisateurs 10 · Serveurs 20 · Administration 30 · Invités 40. Flux inter-zones filtrés.'],
  ['Identité, applications, supervision','AD/DNS Windows, applications Linux/Docker, journaux de sécurité et supervision dans des zones distinctes.'],
  ['Sauvegarde et reprise','Cible de restauration protégée et critères proposés d’intégrité et de durée.']]},
 ar:{label:'هندسة الشبكة المؤسسية / التصميم المنطقي',title:'مؤسسة واحدة. حدود أمنية متعددة.',subtitle:'تصميم مرجعي: اختر منطقة لمعرفة دورها وحدود الوصول المسموح به.',hint:'اختر المنطقة',zones:[
  ['الإنترنت والوصول عن بُعد','اتصال الإنترنت، المصادقة للمستخدمين عن بُعد وإنهاء VPN وفق سياسات وصول محددة.'],
  ['الحماية بالمقر الرئيسي','جدار ناري وDMZ وأنفاق ربط الفروع والسيطرة على الدخول إلى الشبكة الداخلية.'],
  ['الفرع A والفرع B','موقعان منفصلان لكل منهما توجيه مستقل ووصول مقيد لخدمات المقر.'],
  ['قلب الشبكة وVLAN','المستخدمون 10 · الخوادم 20 · الإدارة 30 · الضيوف 40. الاتصال بين المناطق محكوم بسياسات.'],
  ['الهوية والتطبيقات والمراقبة','Windows AD/DNS وتطبيقات Linux/Docker وجمع سجلات الأمن ومراقبة الأنظمة في شبكات متميزة.'],
  ['النسخ الاحتياطي والاستعادة','وجهة استعادة محمية ومعايير مقترحة لسلامة النسخ وقياس وقت الاسترجاع.']]}
} as const;
const nodes=[
 {x:440,y:90,w:190,h:62,short:'WAN / VPN',id:0},
 {x:440,y:215,w:190,h:62,short:'HQ FIREWALL',id:1},
 {x:95,y:215,w:220,h:62,short:'BRANCH A / B',id:2},
 {x:440,y:345,w:190,h:62,short:'HQ CORE / VLAN',id:3},
 {x:740,y:345,w:245,h:62,short:'AD / LINUX / SIEM',id:4},
 {x:740,y:485,w:245,h:62,short:'BACKUP / RESTORE',id:5}
];
export default function EnterpriseBlueprint({locale}:{locale:Locale}){
 const [active,setActive]=useState(3);const t=text[locale];
 return <section className="blueprint-section" aria-labelledby="blueprint-title"><div className="blueprint-top"><span className="section-number">{t.label}</span><h2 id="blueprint-title">{t.title}</h2><p>{t.subtitle}</p></div>
  <div className="blueprint-shell"><div className="blueprint-figure"><svg viewBox="0 0 1100 630" role="img" aria-label={t.title} xmlns="http://www.w3.org/2000/svg"><defs>
   <pattern id="bpgrid" patternUnits="userSpaceOnUse" width="30" height="30"><path d="M30 0H0V30" fill="none" stroke="#e3e9ed" strokeWidth="1"/></pattern>
   <marker id="bparrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" stroke="none" fill="#5c8995"/></marker>
  </defs><rect width="1100" height="630" rx="8" fill="url(#bpgrid)"/>
  <g fill="none" stroke="#7895a0" strokeWidth="2.5" markerEnd="url(#bparrow)"><path d="M535 152V215"/><path d="M315 245H440"/><path d="M535 277V345"/><path d="M630 376H740"/><path d="M863 407V485"/></g>
  <g fill="#476a78" fontSize="13" fontFamily="Arial, sans-serif" letterSpacing="1"><text x="549" y="184">IPsec / SSL VPN</text><text x="333" y="234">site-to-site</text><text x="549" y="318">L3 / ACL</text><text x="650" y="363">DNS / apps / logs</text><text x="879" y="459">backup</text></g>
  <g fill="#f7fafb" stroke="#b3c6cd"><rect x="68" y="308" width="220" height="180" rx="9" fill="#edf7f5" strokeDasharray="5 5"/><rect x="420" y="320" width="226" height="150" rx="9" fill="#eef3f8" strokeDasharray="5 5"/></g>
  <g fontSize="15" fontWeight="700" fontFamily="Arial, sans-serif" fill="#284653"><text x="86" y="341">BRANCH SEGMENTATION</text><text x="438" y="448">10 USERS · 20 SERVERS</text><text x="438" y="462">30 MGMT · 40 GUESTS</text></g>
  {nodes.map(n=><g key={n.id} onClick={()=>setActive(n.id)} style={{cursor:'pointer'}} role="button" tabIndex={0} aria-label={`${t.hint}: ${t.zones[n.id][0]}`} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActive(n.id)}}}>
   <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="9" stroke={active===n.id?'#df8553':'#648b99'} strokeWidth={active===n.id?4:1.5} fill={active===n.id?'#fff2e7':'#ffffff'}/>
   <rect x={n.x+12} y={n.y+15} width="32" height="32" rx="5" fill={n.id===1?'#f8d2bc':n.id===5?'#d8d4fa':'#d8eeea'}/>
   <path d={`M${n.x+20} ${n.y+30}h16m-8-8v16`} stroke="#244d5e" strokeWidth="2" strokeLinecap="round"/>
   <text x={n.x+54} y={n.y+36} fontSize="17" fontWeight="700" fill="#1d3347" fontFamily="Arial, sans-serif">{n.short}</text>
  </g>)}
  <g fontFamily="Arial, sans-serif" fill="#5d7381" fontSize="13"><text x="82" y="518">BRANCH A / B: USERS · SWITCH · EDGE FW</text><text x="434" y="500">HQ: INTER-ZONE POLICY</text><text x="744" y="576">RECOVERY IS SEPARATED</text></g>
 </svg></div>
 <aside className="blueprint-inspector" aria-live="polite"><span>{t.hint}</span><div className="blueprint-zone-buttons">{t.zones.map((z,i)=><button key={i} type="button" aria-pressed={active===i} className={active===i?'active':''} onClick={()=>setActive(i)}>{String(i+1).padStart(2,'0')} · {z[0]}</button>)}</div><div className="blueprint-explanation"><h3>{t.zones[active][0]}</h3><p>{t.zones[active][1]}</p></div></aside></div>
 </section>;
}
