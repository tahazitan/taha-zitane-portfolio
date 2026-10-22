import {Scale, ShieldCheck, ListChecks, Waypoints} from 'lucide-react';
import {getReview} from '@/data/projectReviews';
import type {Locale} from '@/data/content';
const headings={en:{title:'Technical design review',goal:'Engineering objective',decisions:'Architecture decisions',constraints:'Constraints & trade-offs',checks:'Proposed verification'},fr:{title:'Revue de conception technique',goal:'Objectif technique',decisions:'Décisions d’architecture',constraints:'Contraintes et compromis',checks:'Vérifications proposées'},ar:{title:'مراجعة التصميم التقني',goal:'الهدف الهندسي',decisions:'قرارات هندسية',constraints:'القيود والمفاضلات',checks:'الاختبارات المقترحة'}};
export default function DesignReview({slug,locale}:{slug:string;locale:Locale}){
 const data=getReview(slug,locale);if(!data)return null;
 const t=headings[locale];
 const sections=[{label:t.decisions,icon:Waypoints,items:data.decisions},{label:t.constraints,icon:Scale,items:data.constraints},{label:t.checks,icon:ListChecks,items:data.checks}];
 return <section className="design-review" aria-labelledby="design-review-title"><div className="design-review-heading"><span className="section-number">TECHNICAL REVIEW / 01</span><h2 id="design-review-title">{t.title}</h2></div><div className="design-review-goal"><ShieldCheck size={20}/><div><strong>{t.goal}</strong><p>{data.goal}</p></div></div><div className="design-review-grid">{sections.map(item=><article className="design-review-card" key={item.label}><span className="design-review-icon"><item.icon size={20}/></span><h3>{item.label}</h3><ul>{item.items.map((x,i)=><li key={i}>{x}</li>)}</ul></article>)}</div></section>;
}
