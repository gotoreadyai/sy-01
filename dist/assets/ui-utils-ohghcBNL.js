import{a as U}from"./react-vendor-Crp7TieP.js";function Me(e){var r,o,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e)){var n=e.length;for(r=0;r<n;r++)e[r]&&(o=Me(e[r]))&&(t&&(t+=" "),t+=o)}else for(o in e)e[o]&&(t&&(t+=" "),t+=o);return t}function Le(){for(var e,r,o=0,t="",n=arguments.length;o<n;o++)(e=arguments[o])&&(r=Me(e))&&(t&&(t+=" "),t+=r);return t}const ie="-",je=e=>{const r=Te(e),{conflictingClassGroups:o,conflictingClassGroupModifiers:t}=e;return{getClassGroupId:c=>{const u=c.split(ie);return u[0]===""&&u.length!==1&&u.shift(),_e(u,r)||Ge(c)},getConflictingClassGroupIds:(c,u)=>{const p=o[c]||[];return u&&t[c]?[...p,...t[c]]:p}}},_e=(e,r)=>{if(e.length===0)return r.classGroupId;const o=e[0],t=r.nextPart.get(o),n=t?_e(e.slice(1),t):void 0;if(n)return n;if(r.validators.length===0)return;const i=e.join(ie);return r.validators.find(({validator:c})=>c(i))?.classGroupId},ye=/^\[(.+)\]$/,Ge=e=>{if(ye.test(e)){const r=ye.exec(e)[1],o=r?.substring(0,r.indexOf(":"));if(o)return"arbitrary.."+o}},Te=e=>{const{theme:r,classGroups:o}=e,t={nextPart:new Map,validators:[]};for(const n in o)se(o[n],t,n,r);return t},se=(e,r,o,t)=>{e.forEach(n=>{if(typeof n=="string"){const i=n===""?r:ge(r,n);i.classGroupId=o;return}if(typeof n=="function"){if(qe(n)){se(n(t),r,o,t);return}r.validators.push({validator:n,classGroupId:o});return}Object.entries(n).forEach(([i,c])=>{se(c,ge(r,i),o,t)})})},ge=(e,r)=>{let o=e;return r.split(ie).forEach(t=>{o.nextPart.has(t)||o.nextPart.set(t,{nextPart:new Map,validators:[]}),o=o.nextPart.get(t)}),o},qe=e=>e.isThemeGetter,Ee=e=>{if(e<1)return{get:()=>{},set:()=>{}};let r=0,o=new Map,t=new Map;const n=(i,c)=>{o.set(i,c),r++,r>e&&(r=0,t=o,o=new Map)};return{get(i){let c=o.get(i);if(c!==void 0)return c;if((c=t.get(i))!==void 0)return n(i,c),c},set(i,c){o.has(i)?o.set(i,c):n(i,c)}}},ae="!",ne=":",He=ne.length,Oe=e=>{const{prefix:r,experimentalParseClassName:o}=e;let t=n=>{const i=[];let c=0,u=0,p=0,f;for(let v=0;v<n.length;v++){let w=n[v];if(c===0&&u===0){if(w===ne){i.push(n.slice(p,v)),p=v+He;continue}if(w==="/"){f=v;continue}}w==="["?c++:w==="]"?c--:w==="("?u++:w===")"&&u--}const y=i.length===0?n:n.substring(p),x=Be(y),_=x!==y,S=f&&f>p?f-p:void 0;return{modifiers:i,hasImportantModifier:_,baseClassName:x,maybePostfixModifierPosition:S}};if(r){const n=r+ne,i=t;t=c=>c.startsWith(n)?i(c.substring(n.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:c,maybePostfixModifierPosition:void 0}}if(o){const n=t;t=i=>o({className:i,parseClassName:n})}return t},Be=e=>e.endsWith(ae)?e.substring(0,e.length-1):e.startsWith(ae)?e.substring(1):e,Ue=e=>{const r=Object.fromEntries(e.orderSensitiveModifiers.map(t=>[t,!0]));return t=>{if(t.length<=1)return t;const n=[];let i=[];return t.forEach(c=>{c[0]==="["||r[c]?(n.push(...i.sort(),c),i=[]):i.push(c)}),n.push(...i.sort()),n}},Fe=e=>({cache:Ee(e.cacheSize),parseClassName:Oe(e),sortModifiers:Ue(e),...je(e)}),We=/\s+/,Ze=(e,r)=>{const{parseClassName:o,getClassGroupId:t,getConflictingClassGroupIds:n,sortModifiers:i}=r,c=[],u=e.trim().split(We);let p="";for(let f=u.length-1;f>=0;f-=1){const y=u[f],{isExternal:x,modifiers:_,hasImportantModifier:S,baseClassName:v,maybePostfixModifierPosition:w}=o(y);if(x){p=y+(p.length>0?" "+p:p);continue}let z=!!w,P=t(z?v.substring(0,w):v);if(!P){if(!z){p=y+(p.length>0?" "+p:p);continue}if(P=t(v),!P){p=y+(p.length>0?" "+p:p);continue}z=!1}const F=i(_).join(":"),H=S?F+ae:F,L=H+P;if(c.includes(L))continue;c.push(L);const j=n(P,z);for(let R=0;R<j.length;++R){const O=j[R];c.push(H+O)}p=y+(p.length>0?" "+p:p)}return p};function Ke(){let e=0,r,o,t="";for(;e<arguments.length;)(r=arguments[e++])&&(o=ze(r))&&(t&&(t+=" "),t+=o);return t}const ze=e=>{if(typeof e=="string")return e;let r,o="";for(let t=0;t<e.length;t++)e[t]&&(r=ze(e[t]))&&(o&&(o+=" "),o+=r);return o};function De(e,...r){let o,t,n,i=c;function c(p){const f=r.reduce((y,x)=>x(y),e());return o=Fe(f),t=o.cache.get,n=o.cache.set,i=u,u(p)}function u(p){const f=t(p);if(f)return f;const y=Ze(p,o);return n(p,y),y}return function(){return i(Ke.apply(null,arguments))}}const g=e=>{const r=o=>o[e]||[];return r.isThemeGetter=!0,r},Ce=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,Ne=/^\((?:(\w[\w-]*):)?(.+)\)$/i,Je=/^\d+\/\d+$/,Xe=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Qe=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Ye=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,eo=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,oo=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,T=e=>Je.test(e),h=e=>!!e&&!Number.isNaN(Number(e)),$=e=>!!e&&Number.isInteger(Number(e)),te=e=>e.endsWith("%")&&h(e.slice(0,-1)),A=e=>Xe.test(e),to=()=>!0,ro=e=>Qe.test(e)&&!Ye.test(e),Ae=()=>!1,so=e=>eo.test(e),ao=e=>oo.test(e),no=e=>!s(e)&&!a(e),io=e=>q(e,Pe,Ae),s=e=>Ce.test(e),I=e=>q(e,Re,ro),re=e=>q(e,ho,h),be=e=>q(e,$e,Ae),lo=e=>q(e,Se,ao),X=e=>q(e,Ve,so),a=e=>Ne.test(e),B=e=>E(e,Re),co=e=>E(e,uo),ke=e=>E(e,$e),mo=e=>E(e,Pe),po=e=>E(e,Se),Q=e=>E(e,Ve,!0),q=(e,r,o)=>{const t=Ce.exec(e);return t?t[1]?r(t[1]):o(t[2]):!1},E=(e,r,o=!1)=>{const t=Ne.exec(e);return t?t[1]?r(t[1]):o:!1},$e=e=>e==="position"||e==="percentage",Se=e=>e==="image"||e==="url",Pe=e=>e==="length"||e==="size"||e==="bg-size",Re=e=>e==="length",ho=e=>e==="number",uo=e=>e==="family-name",Ve=e=>e==="shadow",fo=()=>{const e=g("color"),r=g("font"),o=g("text"),t=g("font-weight"),n=g("tracking"),i=g("leading"),c=g("breakpoint"),u=g("container"),p=g("spacing"),f=g("radius"),y=g("shadow"),x=g("inset-shadow"),_=g("text-shadow"),S=g("drop-shadow"),v=g("blur"),w=g("perspective"),z=g("aspect"),P=g("ease"),F=g("animate"),H=()=>["auto","avoid","all","avoid-page","page","left","right","column"],L=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],j=()=>[...L(),a,s],R=()=>["auto","hidden","clip","visible","scroll"],O=()=>["auto","contain","none"],m=()=>[a,s,p],C=()=>[T,"full","auto",...m()],le=()=>[$,"none","subgrid",a,s],ce=()=>["auto",{span:["full",$,a,s]},$,a,s],W=()=>[$,"auto",a,s],de=()=>["auto","min","max","fr",a,s],Y=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],G=()=>["start","end","center","stretch","center-safe","end-safe"],N=()=>["auto",...m()],V=()=>[T,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...m()],l=()=>[e,a,s],me=()=>[...L(),ke,be,{position:[a,s]}],pe=()=>["no-repeat",{repeat:["","x","y","space","round"]}],he=()=>["auto","cover","contain",mo,io,{size:[a,s]}],ee=()=>[te,B,I],k=()=>["","none","full",f,a,s],M=()=>["",h,B,I],Z=()=>["solid","dashed","dotted","double"],ue=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],b=()=>[h,te,ke,be],fe=()=>["","none",v,a,s],K=()=>["none",h,a,s],D=()=>["none",h,a,s],oe=()=>[h,a,s],J=()=>[T,"full",...m()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[A],breakpoint:[A],color:[to],container:[A],"drop-shadow":[A],ease:["in","out","in-out"],font:[no],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[A],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[A],shadow:[A],spacing:["px",h],text:[A],"text-shadow":[A],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",T,s,a,z]}],container:["container"],columns:[{columns:[h,s,a,u]}],"break-after":[{"break-after":H()}],"break-before":[{"break-before":H()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:j()}],overflow:[{overflow:R()}],"overflow-x":[{"overflow-x":R()}],"overflow-y":[{"overflow-y":R()}],overscroll:[{overscroll:O()}],"overscroll-x":[{"overscroll-x":O()}],"overscroll-y":[{"overscroll-y":O()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:C()}],"inset-x":[{"inset-x":C()}],"inset-y":[{"inset-y":C()}],start:[{start:C()}],end:[{end:C()}],top:[{top:C()}],right:[{right:C()}],bottom:[{bottom:C()}],left:[{left:C()}],visibility:["visible","invisible","collapse"],z:[{z:[$,"auto",a,s]}],basis:[{basis:[T,"full","auto",u,...m()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[h,T,"auto","initial","none",s]}],grow:[{grow:["",h,a,s]}],shrink:[{shrink:["",h,a,s]}],order:[{order:[$,"first","last","none",a,s]}],"grid-cols":[{"grid-cols":le()}],"col-start-end":[{col:ce()}],"col-start":[{"col-start":W()}],"col-end":[{"col-end":W()}],"grid-rows":[{"grid-rows":le()}],"row-start-end":[{row:ce()}],"row-start":[{"row-start":W()}],"row-end":[{"row-end":W()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":de()}],"auto-rows":[{"auto-rows":de()}],gap:[{gap:m()}],"gap-x":[{"gap-x":m()}],"gap-y":[{"gap-y":m()}],"justify-content":[{justify:[...Y(),"normal"]}],"justify-items":[{"justify-items":[...G(),"normal"]}],"justify-self":[{"justify-self":["auto",...G()]}],"align-content":[{content:["normal",...Y()]}],"align-items":[{items:[...G(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...G(),{baseline:["","last"]}]}],"place-content":[{"place-content":Y()}],"place-items":[{"place-items":[...G(),"baseline"]}],"place-self":[{"place-self":["auto",...G()]}],p:[{p:m()}],px:[{px:m()}],py:[{py:m()}],ps:[{ps:m()}],pe:[{pe:m()}],pt:[{pt:m()}],pr:[{pr:m()}],pb:[{pb:m()}],pl:[{pl:m()}],m:[{m:N()}],mx:[{mx:N()}],my:[{my:N()}],ms:[{ms:N()}],me:[{me:N()}],mt:[{mt:N()}],mr:[{mr:N()}],mb:[{mb:N()}],ml:[{ml:N()}],"space-x":[{"space-x":m()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":m()}],"space-y-reverse":["space-y-reverse"],size:[{size:V()}],w:[{w:[u,"screen",...V()]}],"min-w":[{"min-w":[u,"screen","none",...V()]}],"max-w":[{"max-w":[u,"screen","none","prose",{screen:[c]},...V()]}],h:[{h:["screen","lh",...V()]}],"min-h":[{"min-h":["screen","lh","none",...V()]}],"max-h":[{"max-h":["screen","lh",...V()]}],"font-size":[{text:["base",o,B,I]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[t,a,re]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",te,s]}],"font-family":[{font:[co,s,r]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[n,a,s]}],"line-clamp":[{"line-clamp":[h,"none",a,re]}],leading:[{leading:[i,...m()]}],"list-image":[{"list-image":["none",a,s]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",a,s]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:l()}],"text-color":[{text:l()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...Z(),"wavy"]}],"text-decoration-thickness":[{decoration:[h,"from-font","auto",a,I]}],"text-decoration-color":[{decoration:l()}],"underline-offset":[{"underline-offset":[h,"auto",a,s]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:m()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",a,s]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",a,s]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:me()}],"bg-repeat":[{bg:pe()}],"bg-size":[{bg:he()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},$,a,s],radial:["",a,s],conic:[$,a,s]},po,lo]}],"bg-color":[{bg:l()}],"gradient-from-pos":[{from:ee()}],"gradient-via-pos":[{via:ee()}],"gradient-to-pos":[{to:ee()}],"gradient-from":[{from:l()}],"gradient-via":[{via:l()}],"gradient-to":[{to:l()}],rounded:[{rounded:k()}],"rounded-s":[{"rounded-s":k()}],"rounded-e":[{"rounded-e":k()}],"rounded-t":[{"rounded-t":k()}],"rounded-r":[{"rounded-r":k()}],"rounded-b":[{"rounded-b":k()}],"rounded-l":[{"rounded-l":k()}],"rounded-ss":[{"rounded-ss":k()}],"rounded-se":[{"rounded-se":k()}],"rounded-ee":[{"rounded-ee":k()}],"rounded-es":[{"rounded-es":k()}],"rounded-tl":[{"rounded-tl":k()}],"rounded-tr":[{"rounded-tr":k()}],"rounded-br":[{"rounded-br":k()}],"rounded-bl":[{"rounded-bl":k()}],"border-w":[{border:M()}],"border-w-x":[{"border-x":M()}],"border-w-y":[{"border-y":M()}],"border-w-s":[{"border-s":M()}],"border-w-e":[{"border-e":M()}],"border-w-t":[{"border-t":M()}],"border-w-r":[{"border-r":M()}],"border-w-b":[{"border-b":M()}],"border-w-l":[{"border-l":M()}],"divide-x":[{"divide-x":M()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":M()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...Z(),"hidden","none"]}],"divide-style":[{divide:[...Z(),"hidden","none"]}],"border-color":[{border:l()}],"border-color-x":[{"border-x":l()}],"border-color-y":[{"border-y":l()}],"border-color-s":[{"border-s":l()}],"border-color-e":[{"border-e":l()}],"border-color-t":[{"border-t":l()}],"border-color-r":[{"border-r":l()}],"border-color-b":[{"border-b":l()}],"border-color-l":[{"border-l":l()}],"divide-color":[{divide:l()}],"outline-style":[{outline:[...Z(),"none","hidden"]}],"outline-offset":[{"outline-offset":[h,a,s]}],"outline-w":[{outline:["",h,B,I]}],"outline-color":[{outline:l()}],shadow:[{shadow:["","none",y,Q,X]}],"shadow-color":[{shadow:l()}],"inset-shadow":[{"inset-shadow":["none",x,Q,X]}],"inset-shadow-color":[{"inset-shadow":l()}],"ring-w":[{ring:M()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:l()}],"ring-offset-w":[{"ring-offset":[h,I]}],"ring-offset-color":[{"ring-offset":l()}],"inset-ring-w":[{"inset-ring":M()}],"inset-ring-color":[{"inset-ring":l()}],"text-shadow":[{"text-shadow":["none",_,Q,X]}],"text-shadow-color":[{"text-shadow":l()}],opacity:[{opacity:[h,a,s]}],"mix-blend":[{"mix-blend":[...ue(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":ue()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[h]}],"mask-image-linear-from-pos":[{"mask-linear-from":b()}],"mask-image-linear-to-pos":[{"mask-linear-to":b()}],"mask-image-linear-from-color":[{"mask-linear-from":l()}],"mask-image-linear-to-color":[{"mask-linear-to":l()}],"mask-image-t-from-pos":[{"mask-t-from":b()}],"mask-image-t-to-pos":[{"mask-t-to":b()}],"mask-image-t-from-color":[{"mask-t-from":l()}],"mask-image-t-to-color":[{"mask-t-to":l()}],"mask-image-r-from-pos":[{"mask-r-from":b()}],"mask-image-r-to-pos":[{"mask-r-to":b()}],"mask-image-r-from-color":[{"mask-r-from":l()}],"mask-image-r-to-color":[{"mask-r-to":l()}],"mask-image-b-from-pos":[{"mask-b-from":b()}],"mask-image-b-to-pos":[{"mask-b-to":b()}],"mask-image-b-from-color":[{"mask-b-from":l()}],"mask-image-b-to-color":[{"mask-b-to":l()}],"mask-image-l-from-pos":[{"mask-l-from":b()}],"mask-image-l-to-pos":[{"mask-l-to":b()}],"mask-image-l-from-color":[{"mask-l-from":l()}],"mask-image-l-to-color":[{"mask-l-to":l()}],"mask-image-x-from-pos":[{"mask-x-from":b()}],"mask-image-x-to-pos":[{"mask-x-to":b()}],"mask-image-x-from-color":[{"mask-x-from":l()}],"mask-image-x-to-color":[{"mask-x-to":l()}],"mask-image-y-from-pos":[{"mask-y-from":b()}],"mask-image-y-to-pos":[{"mask-y-to":b()}],"mask-image-y-from-color":[{"mask-y-from":l()}],"mask-image-y-to-color":[{"mask-y-to":l()}],"mask-image-radial":[{"mask-radial":[a,s]}],"mask-image-radial-from-pos":[{"mask-radial-from":b()}],"mask-image-radial-to-pos":[{"mask-radial-to":b()}],"mask-image-radial-from-color":[{"mask-radial-from":l()}],"mask-image-radial-to-color":[{"mask-radial-to":l()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":L()}],"mask-image-conic-pos":[{"mask-conic":[h]}],"mask-image-conic-from-pos":[{"mask-conic-from":b()}],"mask-image-conic-to-pos":[{"mask-conic-to":b()}],"mask-image-conic-from-color":[{"mask-conic-from":l()}],"mask-image-conic-to-color":[{"mask-conic-to":l()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:me()}],"mask-repeat":[{mask:pe()}],"mask-size":[{mask:he()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",a,s]}],filter:[{filter:["","none",a,s]}],blur:[{blur:fe()}],brightness:[{brightness:[h,a,s]}],contrast:[{contrast:[h,a,s]}],"drop-shadow":[{"drop-shadow":["","none",S,Q,X]}],"drop-shadow-color":[{"drop-shadow":l()}],grayscale:[{grayscale:["",h,a,s]}],"hue-rotate":[{"hue-rotate":[h,a,s]}],invert:[{invert:["",h,a,s]}],saturate:[{saturate:[h,a,s]}],sepia:[{sepia:["",h,a,s]}],"backdrop-filter":[{"backdrop-filter":["","none",a,s]}],"backdrop-blur":[{"backdrop-blur":fe()}],"backdrop-brightness":[{"backdrop-brightness":[h,a,s]}],"backdrop-contrast":[{"backdrop-contrast":[h,a,s]}],"backdrop-grayscale":[{"backdrop-grayscale":["",h,a,s]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[h,a,s]}],"backdrop-invert":[{"backdrop-invert":["",h,a,s]}],"backdrop-opacity":[{"backdrop-opacity":[h,a,s]}],"backdrop-saturate":[{"backdrop-saturate":[h,a,s]}],"backdrop-sepia":[{"backdrop-sepia":["",h,a,s]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":m()}],"border-spacing-x":[{"border-spacing-x":m()}],"border-spacing-y":[{"border-spacing-y":m()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",a,s]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[h,"initial",a,s]}],ease:[{ease:["linear","initial",P,a,s]}],delay:[{delay:[h,a,s]}],animate:[{animate:["none",F,a,s]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[w,a,s]}],"perspective-origin":[{"perspective-origin":j()}],rotate:[{rotate:K()}],"rotate-x":[{"rotate-x":K()}],"rotate-y":[{"rotate-y":K()}],"rotate-z":[{"rotate-z":K()}],scale:[{scale:D()}],"scale-x":[{"scale-x":D()}],"scale-y":[{"scale-y":D()}],"scale-z":[{"scale-z":D()}],"scale-3d":["scale-3d"],skew:[{skew:oe()}],"skew-x":[{"skew-x":oe()}],"skew-y":[{"skew-y":oe()}],transform:[{transform:[a,s,"","none","gpu","cpu"]}],"transform-origin":[{origin:j()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:J()}],"translate-x":[{"translate-x":J()}],"translate-y":[{"translate-y":J()}],"translate-z":[{"translate-z":J()}],"translate-none":["translate-none"],accent:[{accent:l()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:l()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",a,s]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":m()}],"scroll-mx":[{"scroll-mx":m()}],"scroll-my":[{"scroll-my":m()}],"scroll-ms":[{"scroll-ms":m()}],"scroll-me":[{"scroll-me":m()}],"scroll-mt":[{"scroll-mt":m()}],"scroll-mr":[{"scroll-mr":m()}],"scroll-mb":[{"scroll-mb":m()}],"scroll-ml":[{"scroll-ml":m()}],"scroll-p":[{"scroll-p":m()}],"scroll-px":[{"scroll-px":m()}],"scroll-py":[{"scroll-py":m()}],"scroll-ps":[{"scroll-ps":m()}],"scroll-pe":[{"scroll-pe":m()}],"scroll-pt":[{"scroll-pt":m()}],"scroll-pr":[{"scroll-pr":m()}],"scroll-pb":[{"scroll-pb":m()}],"scroll-pl":[{"scroll-pl":m()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",a,s]}],fill:[{fill:["none",...l()]}],"stroke-w":[{stroke:[h,B,I,re]}],stroke:[{stroke:["none",...l()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},mt=De(fo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yo=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),go=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,o,t)=>t?t.toUpperCase():o.toLowerCase()),xe=e=>{const r=go(e);return r.charAt(0).toUpperCase()+r.slice(1)},Ie=(...e)=>e.filter((r,o,t)=>!!r&&r.trim()!==""&&t.indexOf(r)===o).join(" ").trim(),bo=e=>{for(const r in e)if(r.startsWith("aria-")||r==="role"||r==="title")return!0};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ko={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xo=U.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:o=2,absoluteStrokeWidth:t,className:n="",children:i,iconNode:c,...u},p)=>U.createElement("svg",{ref:p,...ko,width:r,height:r,stroke:e,strokeWidth:t?Number(o)*24/Number(r):o,className:Ie("lucide",n),...!i&&!bo(u)&&{"aria-hidden":"true"},...u},[...c.map(([f,y])=>U.createElement(f,y)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=(e,r)=>{const o=U.forwardRef(({className:t,...n},i)=>U.createElement(xo,{ref:i,iconNode:r,className:Ie(`lucide-${yo(xe(e))}`,`lucide-${e}`,t),...n}));return o.displayName=xe(e),o};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vo=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],pt=d("arrow-left",vo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wo=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],ht=d("arrow-right",wo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mo=[["path",{d:"M3 5v14",key:"1nt18q"}],["path",{d:"M8 5v14",key:"1ybrkv"}],["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"M17 5v14",key:"ycjyhj"}],["path",{d:"M21 5v14",key:"nzette"}]],ut=d("barcode",Mo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _o=[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]],ft=d("building-2",_o);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zo=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],yt=d("camera",zo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Co=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],gt=d("chart-column",Co);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const No=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],bt=d("check",No);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ao=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],kt=d("chevron-down",Ao);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $o=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],xt=d("chevron-left",$o);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const So=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],vt=d("chevron-right",So);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Po=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],wt=d("chevron-up",Po);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ro=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],Mt=d("circle-check-big",Ro);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vo=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]],_t=d("clipboard-list",Vo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Io=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],zt=d("clock",Io);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lo=[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]],Ct=d("coins",Lo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jo=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Nt=d("eye",jo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Go=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],At=d("file-text",Go);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const To=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],$t=d("info",To);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qo=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],St=d("key-round",qo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eo=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],Pt=d("key",Eo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ho=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Rt=d("layout-dashboard",Ho);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oo=[["path",{d:"M21 12h-8",key:"1bmf0i"}],["path",{d:"M21 6H8",key:"1pqkrb"}],["path",{d:"M21 18h-8",key:"1tm79t"}],["path",{d:"M3 6v4c0 1.1.9 2 2 2h3",key:"1ywdgy"}],["path",{d:"M3 10v6c0 1.1.9 2 2 2h3",key:"2wc746"}]],Vt=d("list-tree",Oo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bo=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],It=d("loader-circle",Bo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uo=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Lt=d("lock",Uo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fo=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],jt=d("log-out",Fo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wo=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],Gt=d("mail",Wo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zo=[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]],Tt=d("menu",Zo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ko=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],qt=d("package",Ko);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Do=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Et=d("plus",Do);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jo=[["path",{d:"M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",key:"x6z5xu"}],["path",{d:"M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",key:"1x4zh5"}],["path",{d:"m14 16-3 3 3 3",key:"f6jyew"}],["path",{d:"M8.293 13.596 7.196 9.5 3.1 10.598",key:"wf1obh"}],["path",{d:"m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",key:"9tzpgr"}],["path",{d:"m13.378 9.633 4.096 1.098 1.097-4.096",key:"1oe83g"}]],Ht=d("recycle",Jo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xo=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Ot=d("refresh-cw",Xo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qo=[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]],Bt=d("scale",Qo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yo=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Ut=d("settings",Yo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Ft=d("shield",et);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],Wt=d("square-pen",ot);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],Zt=d("trash-2",tt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rt=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Kt=d("triangle-alert",rt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const st=[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]],Dt=d("truck",st);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],Jt=d("user-check",at);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nt=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]],Xt=d("user-plus",nt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Qt=d("user",it);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],Yt=d("users",lt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],er=d("x",ct),ve=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,we=Le,or=(e,r)=>o=>{var t;if(r?.variants==null)return we(e,o?.class,o?.className);const{variants:n,defaultVariants:i}=r,c=Object.keys(n).map(f=>{const y=o?.[f],x=i?.[f];if(y===null)return null;const _=ve(y)||ve(x);return n[f][_]}),u=o&&Object.entries(o).reduce((f,y)=>{let[x,_]=y;return _===void 0||(f[x]=_),f},{}),p=r==null||(t=r.compoundVariants)===null||t===void 0?void 0:t.reduce((f,y)=>{let{class:x,className:_,...S}=y;return Object.entries(S).every(v=>{let[w,z]=v;return Array.isArray(z)?z.includes({...i,...u}[w]):{...i,...u}[w]===z})?[...f,x,_]:f},[]);return we(e,c,p,o?.class,o?.className)};export{ht as A,ft as B,kt as C,Jt as D,Nt as E,At as F,Qt as G,zt as H,$t as I,Ot as J,St as K,jt as L,Tt as M,Pt as N,Et as P,Ht as R,Ut as S,Dt as T,Yt as U,er as X,or as a,wt as b,Le as c,bt as d,Vt as e,xt as f,vt as g,Wt as h,pt as i,Zt as j,Rt as k,Ft as l,Bt as m,Ct as n,_t as o,ut as p,yt as q,gt as r,qt as s,mt as t,Mt as u,Kt as v,Gt as w,Lt as x,It as y,Xt as z};
