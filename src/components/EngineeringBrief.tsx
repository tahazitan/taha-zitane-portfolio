import './EngineeringBrief.css';
import {engineering,briefLabels} from '@/data/engineering';
import type {Locale} from '@/data/content';
export default function EngineeringBrief({slug,locale,testsOnly=false}:{slug:string;locale:Locale;testsOnly?:boolean}){
 const b=engineering[slug],l=briefLabels[locale];if(!b)return null;
 return <div className="engineering-brief">
  {!testsOnly&&<><section className="brief-overview" id="design"><div><span className="section-number">/ {l.title}</span><h2>{l.goal}</h2><p className="brief-goal">{b.goal[locale]}</p></div><div><h3>{l.scenario}</h3><p>{b.scenario[locale]}</p></div></section>
  <section className="brief-section"><h2>{l.components}</h2><ul className="component-specs">{b.components.map((c,i)=><li key={i}><span>{String(i+1).padStart(2,'0')}</span><p>{c[locale]}</p></li>)}</ul></section>
  <section className="brief-section"><h2>{l.flow}</h2><ol className="packet-journey">{b.flow.map((s,i)=><li key={i}><span>{i+1}</span><p>{s[locale]}</p></li>)}</ol></section>
  <section className="brief-section" id="build"><h2>{l.stages}</h2><ol className="build-stages">{b.stages.map((s,i)=><li key={i}><span>{String(i+1).padStart(2,'0')}</span><p>{s[locale]}</p></li>)}</ol></section>
  <section className="brief-section"><h2>{l.decisions}</h2><div className="decision-grid">{b.decisions.map((d,i)=><article key={i}><span>↳ {String(i+1).padStart(2,'0')}</span><h3>{d.choice[locale]}</h3><p>{d.tradeoff[locale]}</p></article>)}</div></section>
  </>}<section className="brief-section" id="validation"><h2>{l.tests}</h2><p className="test-contract">{l.testIntro}</p><div className="acceptance-tests">{b.tests.map((test,i)=><article key={i}><div className="test-name"><span>{String(i+1).padStart(2,'0')}</span><h3>{test.name[locale]}</h3></div><div><h4>{l.method}</h4><p>{test.method[locale]}</p></div><div><h4>{l.expected}</h4><p>{test.expected[locale]}</p></div></article>)}</div></section>
 </div>;
}
