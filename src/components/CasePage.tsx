import Link from "next/link";
import {ArrowLeft,ArrowUpRight, Github, Mail, Route, Scale, ListChecks} from "lucide-react";
import Navigation from "./Navigation";
import LocaleSetup from "./LocaleSetup";
import DesignReview from "./DesignReview";
import SourceTopology from "./SourceTopology";
import TechnologyMarks from "./TechnologyMarks";
import VisualProject from "./VisualProject";
import {enterpriseCase} from "@/data/enterpriseCase";
import {content,homePath,projectPath,Locale,mailUrl} from "@/data/content";

export default function CasePage({locale,slug}:{locale:Locale;slug:string}){
 const c=content[locale], project=c.projects.find(p=>p.slug===slug);if(!project)return null;
 const rtl=locale==='ar';
 const enterprise = slug === 'enterprise-network-lab' ? enterpriseCase[locale] : null;
 const index=c.projects.findIndex(p=>p.slug===slug);
 const related=[1,2].map(offset=>c.projects[(index+offset)%c.projects.length]);
 const enterpriseUi={
  en:{scopeValue:'HQ + Branch A + Branch B + Remote users',choicesValue:'Segmentation, perimeter, access control, observability and recoverability',criteriaValue:'Security, cost and operational clarity drive the design choices below.',walkthroughTitle:'Traffic walkthroughs',walkthroughBody:'Interactive topology and narrative paths that explain how selected flows should traverse the architecture.',acceptanceBody:'Proposed validation objectives for the practical implementation stage. They define the next lab validation steps.',tradeoffBody:'Key design decisions and the main trade-offs considered for security, cost and operations.',altLabel:'Alternative / trade-off'},
  fr:{scopeValue:'Siège + agence A + agence B + utilisateurs distants',choicesValue:'Segmentation, périmètre, contrôle d’accès, supervision et reprise',criteriaValue:'Sécurité, coût et exploitation guident les choix ci-dessous.',walkthroughTitle:'Parcours de trafic',walkthroughBody:'Topologie interactive et scénarios décrivant le trajet attendu de certains flux dans l’architecture.',acceptanceBody:'Objectifs de validation proposés pour la phase d’implémentation pratique. Elles orientent les prochaines vérifications du laboratoire.',tradeoffBody:'Principales décisions de conception et compromis étudiés du point de vue sécurité, coût et exploitation.',altLabel:'Alternative / compromis'},
  ar:{scopeValue:'المقر الرئيسي + الفرع A + الفرع B + مستخدمون عن بُعد',choicesValue:'التقسيم، الأمن الطرفي، التحكم في الوصول، المراقبة والاستعادة',criteriaValue:'الأمن والكلفة وسهولة التشغيل هي التي توجه القرارات التالية.',walkthroughTitle:'مسارات حركة المرور',walkthroughBody:'مخطط تفاعلي وسيناريوهات تشرح كيف يُفترض أن تمر بعض التدفقات داخل البنية.',acceptanceBody:'أهداف تحقق مقترحة لمرحلة التنفيذ العملي، لتوجيه مراحل التحقق القادمة.',tradeoffBody:'أهم قرارات التصميم والمفاضلات المرتبطة بالأمن والكلفة والتشغيل.',altLabel:'بديل / مفاضلة'}
 }[locale];
 return <div className={`page-shell ${rtl?'rtl':''}`} dir={rtl?'rtl':'ltr'}><LocaleSetup locale={locale}/><Navigation locale={locale} slug={slug}/><main className="case-main"><div className="container-xl">
  <div className="case-breadcrumb"><Link href={`${homePath(locale)}#work`}><ArrowLeft size={16}/>{c.backToWork}</Link><span>{project.number} / {String(c.projects.length).padStart(2,"0")}</span></div>
  <div className="case-heading"><span className="section-number">{project.type}</span><h1>{project.title}<span>.</span></h1><p>{project.summary}</p><span className={`status-pill status-${project.statusKind}`}>{project.status}</span></div>
  <div className="case-overview-strip"><strong>{project.type}</strong><span>{project.tech.slice(0,5).join(" · ")}</span></div>
  <TechnologyMarks technologies={project.tech} limit={8} variant="case"/>
  <VisualProject slug={slug} locale={locale} large/>
  {enterprise&&<SourceTopology locale={locale} compact/>}
  <div className="case-info-bar"><div><small>{c.projectRole}</small><strong>{project.role}</strong></div><div><small>{c.statusLabel}</small><strong>{project.status}</strong></div><div><small>TECHNOLOGIES</small><strong>{project.tech.join(" / ")}</strong></div></div>

  <div className="case-body">
    <div className="case-intro"><span className="section-number">/ 01</span><h2>{c.projectContext}</h2><p>{project.context}</p></div>
    <div className="case-intro"><span className="section-number">/ 02</span><h2>{c.projectWork}</h2><ol>{project.approach.map((s,i)=><li key={i}><span>0{i+1}</span>{s}</li>)}</ol></div>
    <div className="case-intro"><span className="section-number">/ 03</span><h2>{c.projectProof}</h2><p>{project.evidence}</p><div className="case-proof"><span>↳</span> {c.proofBadge}</div></div>
  </div>

  <DesignReview locale={locale} slug={slug}/>
  {enterprise && <>
    <section className="enterprise-section">
      <div className="enterprise-header"><span className="section-number">/ 04</span><div><h2>{enterprise.scenario}</h2><p>{enterprise.context}</p></div></div>
      <div className="enterprise-meta-grid">
        <article><small>{enterprise.scope}</small><strong>{enterpriseUi.scopeValue}</strong></article>
        <article><small>{enterprise.choices}</small><strong>{enterpriseUi.choicesValue}</strong></article>
        <article><small>{enterprise.criteria}</small><strong>{enterpriseUi.criteriaValue}</strong></article>
      </div>
      <div className="enterprise-columns">
        {enterprise.sections.map((section,idx)=><article key={idx} className="enterprise-card"><h3>{section.title}</h3><ul>{section.items.map((item,i)=><li key={i}>{item}</li>)}</ul></article>)}
      </div>
    </section>

    <section className="enterprise-section">
      <div className="enterprise-header"><span className="section-number">/ 05</span><div><h2><Scale size={18}/> {enterprise.considerations}</h2><p>{enterpriseUi.tradeoffBody}</p></div></div>
      <div className="decision-grid">{enterprise.decisions.map((item,idx)=><article key={idx} className="decision-card"><h3>{item.title}</h3><p>{item.reason}</p><div><small>{enterpriseUi.altLabel}</small><strong>{item.alternative}</strong></div></article>)}</div>
    </section>

    <section className="enterprise-section">
      <div className="enterprise-header"><span className="section-number">/ 06</span><div><h2><Route size={18}/> {enterpriseUi.walkthroughTitle}</h2><p>{enterpriseUi.walkthroughBody}</p></div></div>
      <div className="walkthrough-grid">{enterprise.walkthrough.map((path,idx)=><article key={path.id} className="walkthrough-card"><span>{String(idx+1).padStart(2,'0')}</span><h3>{path.title}</h3><p>{path.description}</p><ol>{path.steps.map((step,i)=><li key={i}>{step}</li>)}</ol></article>)}</div>
    </section>

    <section className="enterprise-section">
      <div className="enterprise-header"><span className="section-number">/ 07</span><div><h2><ListChecks size={18}/> {enterprise.criteria}</h2><p>{enterpriseUi.acceptanceBody}</p></div></div>
      <div className="acceptance-grid">{enterprise.acceptance.map((test,idx)=><article key={idx} className="acceptance-card"><h3>{test.name}</h3><p>{test.expectation}</p></article>)}</div>
    </section>
  </>}

  <aside className="related-work" aria-label={locale==='ar'?'مشاريع أخرى':locale==='fr'?'Autres projets':'Explore more work'}><div className="related-work-top"><span className="section-number">{locale==='ar'?'مشاريع أخرى':locale==='fr'?'DÉCOUVRIR PLUS':'OTHER PROJECTS'}</span><h2>{locale==='ar'?'واصل الاستكشاف.':locale==='fr'?'Poursuivre la découverte.':'Continue exploring.'}</h2></div><div className="related-work-grid">{related.map(next=><Link href={projectPath(locale,next.slug)} key={next.slug}><small>{next.type}</small><strong>{next.title}</strong><span><ArrowUpRight size={22}/></span></Link>)}</div></aside>
  <div className="case-bottom-links">{project.link&&<a className="btn btn-primary" href={project.link} target="_blank" rel="noopener noreferrer"><Github size={19}/>{c.viewRepo}<ArrowUpRight size={17}/></a>}<Link href={`${homePath(locale)}#work`} className="btn btn-outline">{c.backToWork}<ArrowUpRight size={17}/></Link><a className="btn btn-outline" href={mailUrl}><Mail size={18}/>{c.contact}</a></div>
  </div></main><footer className="case-footer"><div className="container-xl"><span>© 2026 TAHA ZITANE</span><span>{c.footerNote}</span></div></footer></div>;
}
