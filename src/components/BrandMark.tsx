/** Custom vector TZ mark: routed letterforms with two terminal nodes. */
export default function BrandMark({size=48,className=""}:{size?:number;className?:string}){
 return <svg className={className} width={size} height={size} viewBox="0 0 96 96" fill="none" aria-hidden="true" focusable="false">
  <defs>
   <linearGradient id="tz-brand-bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#111f37"/><stop offset="1" stopColor="#172c4a"/></linearGradient>
   <linearGradient id="tz-brand-cyan" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#7de3f8"/><stop offset="1" stopColor="#94a9ff"/></linearGradient>
  </defs>
  <rect x="2" y="2" width="92" height="92" rx="22" fill="url(#tz-brand-bg)" stroke="#7994c8" strokeOpacity=".55" strokeWidth="2"/>
  <path d="M15 24H47M31 24V71" stroke="url(#tz-brand-cyan)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M54 29H77L53 67H79" stroke="#f6b59c" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  <circle cx="15" cy="24" r="4.7" fill="#c8f07b"/><circle cx="79" cy="67" r="4.7" fill="#c8f07b"/>
  <path d="M13 77H22M82 19H75" stroke="#84b0d1" strokeWidth="2" strokeLinecap="round"/>
  <circle cx="11" cy="77" r="2.6" fill="#84b0d1"/><circle cx="84" cy="19" r="2.6" fill="#84b0d1"/>
 </svg>;
}
