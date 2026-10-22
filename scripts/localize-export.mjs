import {readdirSync,readFileSync,writeFileSync,statSync,existsSync} from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'../out');
for(const [locale,dir] of [['fr','ltr'],['ar','rtl']]){
 const folder=path.join(root,locale);
 if(!existsSync(folder))throw new Error('Missing export folder for '+locale);
 let changed=0;
 function scan(p){for(const name of readdirSync(p)){const item=path.join(p,name);if(statSync(item).isDirectory())scan(item);else if(item.endsWith('.html')){
  const before=readFileSync(item,'utf8');
  const after=before.replace(/<html\s+lang="en"/,'<html lang="'+locale+'" dir="'+dir+'"');
  if(after===before)throw new Error('Could not localize root HTML for '+item);
  writeFileSync(item,after);changed++;
 }}}
 scan(folder);
 if(changed<6)throw new Error('Expected 6 localized HTML documents for '+locale+', got '+changed);
 console.log('Localized '+changed+' HTML pages as '+locale+' ('+dir+')');
}
