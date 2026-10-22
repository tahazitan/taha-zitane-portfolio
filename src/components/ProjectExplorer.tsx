"use client";
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight, Github, Search, X, Network, BriefcaseBusiness} from 'lucide-react';
import {projectPath,type Locale,type Project} from '@/data/content';
import TechnologyMarks from './TechnologyMarks';

type Group='all'|'architecture'|'experience';
const strings={
 en:{search:'Search projects or technology',all:'All work',architecture:'Architecture & labs',experience:'Professional experience',study:'Explore case study',repo:'Source repository',empty:'No matching work. Try another technology or category.',reset:'Clear filters',count:'case studies'},
 fr:{search:'Rechercher un projet ou une technologie',all:'Tout voir',architecture:'Architectures & labs',experience:'Expérience professionnelle',study:'Explorer l’étude de cas',repo:'Code source',empty:'Aucun résultat. Essayez une autre technologie ou catégorie.',reset:'Effacer les filtres',count:'études de cas'},
 ar:{search:'ابحث عن مشروع أو تقنية',all:'جميع الأعمال',architecture:'التصاميم والمختبرات',experience:'التجارب المهنية',study:'اقرأ دراسة المشروع',repo:'مستودع المشروع',empty:'لا توجد نتائج. جرّب تقنية أو تصنيفاً آخر.',reset:'مسح عوامل البحث',count:'دراسات مشاريع'}
} as const;

export default function ProjectExplorer({locale,projects}:{locale:Locale;projects:Project[]}){
 const [group,setGroup]=useState<Group>('all');
 const [query,setQuery]=useState('');
 const t=strings[locale];
 const matches=useMemo(()=>{
  const needle=query.trim().toLocaleLowerCase();
  return projects.filter(p=>{
   const isExperience=p.statusKind==='historical';
   if(group==='experience'&&!isExperience)return false;
   if(group==='architecture'&&isExperience)return false;
   return !needle||[p.title,p.type,p.summary,p.context,p.role,...p.tech].join(' ').toLocaleLowerCase().includes(needle);
  });
 },[projects,group,query]);
 return <div className="project-explorer">
  <div className="work-toolbar">
   <div className="work-filter" role="group" aria-label={locale==='fr'?'Catégorie':locale==='ar'?'التصنيف':'Project category'}>
    {(['all','architecture','experience'] as const).map(g=><button key={g} type="button" className={group===g?'is-active':''} aria-pressed={group===g} onClick={()=>setGroup(g)}>{g==='architecture'?<Network size={16}/>:g==='experience'?<BriefcaseBusiness size={16}/>:null}{t[g]}</button>)}
   </div>
   <label className="work-search"><Search size={17}/><span className="sr-only">{t.search}</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search} type="search" autoComplete="off" />{query&&<button type="button" aria-label={t.reset} onClick={()=>setQuery('')}><X size={17}/></button>}</label>
  </div>
  <div className="work-results-count" role="status" aria-live="polite"><strong>{matches.length.toString().padStart(2,'0')}</strong> / {projects.length} {t.count}</div>
  {matches.length?<div className="work-cards">{matches.map((p,i)=><article className="work-card" key={p.slug}>
     <Link className="work-card-art work-art-editorial" href={projectPath(locale,p.slug)} aria-label={`${t.study}: ${p.title}`}><span className="editorial-project-no">{p.number}</span><div className="editorial-project-body"><small>{p.statusKind==='historical'?(locale==='fr'?'EXPÉRIENCE PROFESSIONNELLE':locale==='ar'?'خبرة مهنية':'PROFESSIONAL EXPERIENCE'):(locale==='fr'?'ÉTUDE TECHNIQUE':locale==='ar'?'دراسة تقنية':'ENGINEERING CASE STUDY')}</small><strong>{p.title}</strong></div><TechnologyMarks technologies={p.tech} limit={5} variant="card"/><span className="editorial-project-arrow"><ArrowUpRight size={22}/></span></Link>
     <div className="work-card-copy"><div className="work-card-meta"><span>{p.number} / {p.type}</span></div>
       <p className="work-card-summary">{p.summary}</p>
       <div className="work-tags">{p.tech.slice(0,6).map(tag=><span key={tag}>{tag}</span>)}</div>
       <div className="work-card-actions"><Link className="work-primary-action" href={projectPath(locale,p.slug)}>{t.study}<ArrowUpRight size={17}/></Link>{p.link&&<a className="work-secondary-action" href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`${t.repo}: ${p.title}`}><Github size={18}/><span>{t.repo}</span></a>}</div>
     </div>
   </article>)}</div>:<div className="work-empty"><p>{t.empty}</p><button type="button" onClick={()=>{setQuery('');setGroup('all')}}>{t.reset}</button></div>}
 </div>;
}
