const {readFileSync}=require('node:fs');
const ts=require('typescript');
const assert=require('node:assert/strict');
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,file);
const {engineering}=require('../src/data/engineering.ts');
assert.equal(Object.keys(engineering).length,8);
for(const [slug,b] of Object.entries(engineering)){
 assert.ok(b.tests.length>=2,slug);assert.ok(b.stages.length>=2,slug);
 const copy=[b.goal,b.scenario,...b.components,...b.flow,...b.stages,...b.decisions.flatMap(d=>[d.choice,d.tradeoff]),...b.tests.flatMap(t=>[t.name,t.method,t.expected])];
 for(const text of copy)for(const locale of ['en','fr','ar'])assert.ok(text[locale]?.trim(),slug+'/'+locale);
}
console.log('PASS: 8 engineering briefs, 24 localized acceptance specifications');
