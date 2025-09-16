import{a as F}from"./react-vendor-BVzrj2YZ.js";function Me(e){var r,o,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(r=0;r<i;r++)e[r]&&(o=Me(e[r]))&&(t&&(t+=" "),t+=o)}else for(o in e)e[o]&&(t&&(t+=" "),t+=o);return t}function Le(){for(var e,r,o=0,t="",i=arguments.length;o<i;o++)(e=arguments[o])&&(r=Me(e))&&(t&&(t+=" "),t+=r);return t}const ie="-",Ie=e=>{const r=Ge(e),{conflictingClassGroups:o,conflictingClassGroupModifiers:t}=e;return{getClassGroupId:d=>{const u=d.split(ie);return u[0]===""&&u.length!==1&&u.shift(),_e(u,r)||qe(d)},getConflictingClassGroupIds:(d,u)=>{const h=o[d]||[];return u&&t[d]?[...h,...t[d]]:h}}},_e=(e,r)=>{if(e.length===0)return r.classGroupId;const o=e[0],t=r.nextPart.get(o),i=t?_e(e.slice(1),t):void 0;if(i)return i;if(r.validators.length===0)return;const l=e.join(ie);return r.validators.find(({validator:d})=>d(l))?.classGroupId},fe=/^\[(.+)\]$/,qe=e=>{if(fe.test(e)){const r=fe.exec(e)[1],o=r?.substring(0,r.indexOf(":"));if(o)return"arbitrary.."+o}},Ge=e=>{const{theme:r,classGroups:o}=e,t={nextPart:new Map,validators:[]};for(const i in o)ae(o[i],t,i,r);return t},ae=(e,r,o,t)=>{e.forEach(i=>{if(typeof i=="string"){const l=i===""?r:ke(r,i);l.classGroupId=o;return}if(typeof i=="function"){if(Te(i)){ae(i(t),r,o,t);return}r.validators.push({validator:i,classGroupId:o});return}Object.entries(i).forEach(([l,d])=>{ae(d,ke(r,l),o,t)})})},ke=(e,r)=>{let o=e;return r.split(ie).forEach(t=>{o.nextPart.has(t)||o.nextPart.set(t,{nextPart:new Map,validators:[]}),o=o.nextPart.get(t)}),o},Te=e=>e.isThemeGetter,He=e=>{if(e<1)return{get:()=>{},set:()=>{}};let r=0,o=new Map,t=new Map;const i=(l,d)=>{o.set(l,d),r++,r>e&&(r=0,t=o,o=new Map)};return{get(l){let d=o.get(l);if(d!==void 0)return d;if((d=t.get(l))!==void 0)return i(l,d),d},set(l,d){o.has(l)?o.set(l,d):i(l,d)}}},se="!",ne=":",Ee=ne.length,Oe=e=>{const{prefix:r,experimentalParseClassName:o}=e;let t=i=>{const l=[];let d=0,u=0,h=0,y;for(let v=0;v<i.length;v++){let w=i[v];if(d===0&&u===0){if(w===ne){l.push(i.slice(h,v)),h=v+Ee;continue}if(w==="/"){y=v;continue}}w==="["?d++:w==="]"?d--:w==="("?u++:w===")"&&u--}const f=l.length===0?i:i.substring(h),x=Be(f),_=x!==f,S=y&&y>h?y-h:void 0;return{modifiers:l,hasImportantModifier:_,baseClassName:x,maybePostfixModifierPosition:S}};if(r){const i=r+ne,l=t;t=d=>d.startsWith(i)?l(d.substring(i.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:d,maybePostfixModifierPosition:void 0}}if(o){const i=t;t=l=>o({className:l,parseClassName:i})}return t},Be=e=>e.endsWith(se)?e.substring(0,e.length-1):e.startsWith(se)?e.substring(1):e,Fe=e=>{const r=Object.fromEntries(e.orderSensitiveModifiers.map(t=>[t,!0]));return t=>{if(t.length<=1)return t;const i=[];let l=[];return t.forEach(d=>{d[0]==="["||r[d]?(i.push(...l.sort(),d),l=[]):l.push(d)}),i.push(...l.sort()),i}},Ue=e=>({cache:He(e.cacheSize),parseClassName:Oe(e),sortModifiers:Fe(e),...Ie(e)}),We=/\s+/,Ze=(e,r)=>{const{parseClassName:o,getClassGroupId:t,getConflictingClassGroupIds:i,sortModifiers:l}=r,d=[],u=e.trim().split(We);let h="";for(let y=u.length-1;y>=0;y-=1){const f=u[y],{isExternal:x,modifiers:_,hasImportantModifier:S,baseClassName:v,maybePostfixModifierPosition:w}=o(f);if(x){h=f+(h.length>0?" "+h:h);continue}let z=!!w,V=t(z?v.substring(0,w):v);if(!V){if(!z){h=f+(h.length>0?" "+h:h);continue}if(V=t(v),!V){h=f+(h.length>0?" "+h:h);continue}z=!1}const U=l(_).join(":"),E=S?U+se:U,L=E+V;if(d.includes(L))continue;d.push(L);const I=i(V,z);for(let P=0;P<I.length;++P){const O=I[P];d.push(E+O)}h=f+(h.length>0?" "+h:h)}return h};function De(){let e=0,r,o,t="";for(;e<arguments.length;)(r=arguments[e++])&&(o=ze(r))&&(t&&(t+=" "),t+=o);return t}const ze=e=>{if(typeof e=="string")return e;let r,o="";for(let t=0;t<e.length;t++)e[t]&&(r=ze(e[t]))&&(o&&(o+=" "),o+=r);return o};function Ke(e,...r){let o,t,i,l=d;function d(h){const y=r.reduce((f,x)=>x(f),e());return o=Ue(y),t=o.cache.get,i=o.cache.set,l=u,u(h)}function u(h){const y=t(h);if(y)return y;const f=Ze(h,o);return i(h,f),f}return function(){return l(De.apply(null,arguments))}}const k=e=>{const r=o=>o[e]||[];return r.isThemeGetter=!0,r},Ce=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,Ne=/^\((?:(\w[\w-]*):)?(.+)\)$/i,Je=/^\d+\/\d+$/,Qe=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Xe=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Ye=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,eo=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,oo=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,G=e=>Je.test(e),m=e=>!!e&&!Number.isNaN(Number(e)),$=e=>!!e&&Number.isInteger(Number(e)),te=e=>e.endsWith("%")&&m(e.slice(0,-1)),A=e=>Qe.test(e),to=()=>!0,ro=e=>Xe.test(e)&&!Ye.test(e),Ae=()=>!1,ao=e=>eo.test(e),so=e=>oo.test(e),no=e=>!a(e)&&!s(e),io=e=>T(e,Ve,Ae),a=e=>Ce.test(e),R=e=>T(e,Pe,ro),re=e=>T(e,mo,m),ge=e=>T(e,$e,Ae),lo=e=>T(e,Se,so),Q=e=>T(e,je,ao),s=e=>Ne.test(e),B=e=>H(e,Pe),co=e=>H(e,uo),be=e=>H(e,$e),po=e=>H(e,Ve),ho=e=>H(e,Se),X=e=>H(e,je,!0),T=(e,r,o)=>{const t=Ce.exec(e);return t?t[1]?r(t[1]):o(t[2]):!1},H=(e,r,o=!1)=>{const t=Ne.exec(e);return t?t[1]?r(t[1]):o:!1},$e=e=>e==="position"||e==="percentage",Se=e=>e==="image"||e==="url",Ve=e=>e==="length"||e==="size"||e==="bg-size",Pe=e=>e==="length",mo=e=>e==="number",uo=e=>e==="family-name",je=e=>e==="shadow",yo=()=>{const e=k("color"),r=k("font"),o=k("text"),t=k("font-weight"),i=k("tracking"),l=k("leading"),d=k("breakpoint"),u=k("container"),h=k("spacing"),y=k("radius"),f=k("shadow"),x=k("inset-shadow"),_=k("text-shadow"),S=k("drop-shadow"),v=k("blur"),w=k("perspective"),z=k("aspect"),V=k("ease"),U=k("animate"),E=()=>["auto","avoid","all","avoid-page","page","left","right","column"],L=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],I=()=>[...L(),s,a],P=()=>["auto","hidden","clip","visible","scroll"],O=()=>["auto","contain","none"],p=()=>[s,a,h],C=()=>[G,"full","auto",...p()],le=()=>[$,"none","subgrid",s,a],ce=()=>["auto",{span:["full",$,s,a]},$,s,a],W=()=>[$,"auto",s,a],de=()=>["auto","min","max","fr",s,a],Y=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],q=()=>["start","end","center","stretch","center-safe","end-safe"],N=()=>["auto",...p()],j=()=>[G,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...p()],c=()=>[e,s,a],pe=()=>[...L(),be,ge,{position:[s,a]}],he=()=>["no-repeat",{repeat:["","x","y","space","round"]}],me=()=>["auto","cover","contain",po,io,{size:[s,a]}],ee=()=>[te,B,R],b=()=>["","none","full",y,s,a],M=()=>["",m,B,R],Z=()=>["solid","dashed","dotted","double"],ue=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],g=()=>[m,te,be,ge],ye=()=>["","none",v,s,a],D=()=>["none",m,s,a],K=()=>["none",m,s,a],oe=()=>[m,s,a],J=()=>[G,"full",...p()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[A],breakpoint:[A],color:[to],container:[A],"drop-shadow":[A],ease:["in","out","in-out"],font:[no],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[A],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[A],shadow:[A],spacing:["px",m],text:[A],"text-shadow":[A],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",G,a,s,z]}],container:["container"],columns:[{columns:[m,a,s,u]}],"break-after":[{"break-after":E()}],"break-before":[{"break-before":E()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:I()}],overflow:[{overflow:P()}],"overflow-x":[{"overflow-x":P()}],"overflow-y":[{"overflow-y":P()}],overscroll:[{overscroll:O()}],"overscroll-x":[{"overscroll-x":O()}],"overscroll-y":[{"overscroll-y":O()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:C()}],"inset-x":[{"inset-x":C()}],"inset-y":[{"inset-y":C()}],start:[{start:C()}],end:[{end:C()}],top:[{top:C()}],right:[{right:C()}],bottom:[{bottom:C()}],left:[{left:C()}],visibility:["visible","invisible","collapse"],z:[{z:[$,"auto",s,a]}],basis:[{basis:[G,"full","auto",u,...p()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[m,G,"auto","initial","none",a]}],grow:[{grow:["",m,s,a]}],shrink:[{shrink:["",m,s,a]}],order:[{order:[$,"first","last","none",s,a]}],"grid-cols":[{"grid-cols":le()}],"col-start-end":[{col:ce()}],"col-start":[{"col-start":W()}],"col-end":[{"col-end":W()}],"grid-rows":[{"grid-rows":le()}],"row-start-end":[{row:ce()}],"row-start":[{"row-start":W()}],"row-end":[{"row-end":W()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":de()}],"auto-rows":[{"auto-rows":de()}],gap:[{gap:p()}],"gap-x":[{"gap-x":p()}],"gap-y":[{"gap-y":p()}],"justify-content":[{justify:[...Y(),"normal"]}],"justify-items":[{"justify-items":[...q(),"normal"]}],"justify-self":[{"justify-self":["auto",...q()]}],"align-content":[{content:["normal",...Y()]}],"align-items":[{items:[...q(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...q(),{baseline:["","last"]}]}],"place-content":[{"place-content":Y()}],"place-items":[{"place-items":[...q(),"baseline"]}],"place-self":[{"place-self":["auto",...q()]}],p:[{p:p()}],px:[{px:p()}],py:[{py:p()}],ps:[{ps:p()}],pe:[{pe:p()}],pt:[{pt:p()}],pr:[{pr:p()}],pb:[{pb:p()}],pl:[{pl:p()}],m:[{m:N()}],mx:[{mx:N()}],my:[{my:N()}],ms:[{ms:N()}],me:[{me:N()}],mt:[{mt:N()}],mr:[{mr:N()}],mb:[{mb:N()}],ml:[{ml:N()}],"space-x":[{"space-x":p()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":p()}],"space-y-reverse":["space-y-reverse"],size:[{size:j()}],w:[{w:[u,"screen",...j()]}],"min-w":[{"min-w":[u,"screen","none",...j()]}],"max-w":[{"max-w":[u,"screen","none","prose",{screen:[d]},...j()]}],h:[{h:["screen","lh",...j()]}],"min-h":[{"min-h":["screen","lh","none",...j()]}],"max-h":[{"max-h":["screen","lh",...j()]}],"font-size":[{text:["base",o,B,R]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[t,s,re]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",te,a]}],"font-family":[{font:[co,a,r]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[i,s,a]}],"line-clamp":[{"line-clamp":[m,"none",s,re]}],leading:[{leading:[l,...p()]}],"list-image":[{"list-image":["none",s,a]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",s,a]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:c()}],"text-color":[{text:c()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...Z(),"wavy"]}],"text-decoration-thickness":[{decoration:[m,"from-font","auto",s,R]}],"text-decoration-color":[{decoration:c()}],"underline-offset":[{"underline-offset":[m,"auto",s,a]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:p()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",s,a]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",s,a]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:pe()}],"bg-repeat":[{bg:he()}],"bg-size":[{bg:me()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},$,s,a],radial:["",s,a],conic:[$,s,a]},ho,lo]}],"bg-color":[{bg:c()}],"gradient-from-pos":[{from:ee()}],"gradient-via-pos":[{via:ee()}],"gradient-to-pos":[{to:ee()}],"gradient-from":[{from:c()}],"gradient-via":[{via:c()}],"gradient-to":[{to:c()}],rounded:[{rounded:b()}],"rounded-s":[{"rounded-s":b()}],"rounded-e":[{"rounded-e":b()}],"rounded-t":[{"rounded-t":b()}],"rounded-r":[{"rounded-r":b()}],"rounded-b":[{"rounded-b":b()}],"rounded-l":[{"rounded-l":b()}],"rounded-ss":[{"rounded-ss":b()}],"rounded-se":[{"rounded-se":b()}],"rounded-ee":[{"rounded-ee":b()}],"rounded-es":[{"rounded-es":b()}],"rounded-tl":[{"rounded-tl":b()}],"rounded-tr":[{"rounded-tr":b()}],"rounded-br":[{"rounded-br":b()}],"rounded-bl":[{"rounded-bl":b()}],"border-w":[{border:M()}],"border-w-x":[{"border-x":M()}],"border-w-y":[{"border-y":M()}],"border-w-s":[{"border-s":M()}],"border-w-e":[{"border-e":M()}],"border-w-t":[{"border-t":M()}],"border-w-r":[{"border-r":M()}],"border-w-b":[{"border-b":M()}],"border-w-l":[{"border-l":M()}],"divide-x":[{"divide-x":M()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":M()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...Z(),"hidden","none"]}],"divide-style":[{divide:[...Z(),"hidden","none"]}],"border-color":[{border:c()}],"border-color-x":[{"border-x":c()}],"border-color-y":[{"border-y":c()}],"border-color-s":[{"border-s":c()}],"border-color-e":[{"border-e":c()}],"border-color-t":[{"border-t":c()}],"border-color-r":[{"border-r":c()}],"border-color-b":[{"border-b":c()}],"border-color-l":[{"border-l":c()}],"divide-color":[{divide:c()}],"outline-style":[{outline:[...Z(),"none","hidden"]}],"outline-offset":[{"outline-offset":[m,s,a]}],"outline-w":[{outline:["",m,B,R]}],"outline-color":[{outline:c()}],shadow:[{shadow:["","none",f,X,Q]}],"shadow-color":[{shadow:c()}],"inset-shadow":[{"inset-shadow":["none",x,X,Q]}],"inset-shadow-color":[{"inset-shadow":c()}],"ring-w":[{ring:M()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:c()}],"ring-offset-w":[{"ring-offset":[m,R]}],"ring-offset-color":[{"ring-offset":c()}],"inset-ring-w":[{"inset-ring":M()}],"inset-ring-color":[{"inset-ring":c()}],"text-shadow":[{"text-shadow":["none",_,X,Q]}],"text-shadow-color":[{"text-shadow":c()}],opacity:[{opacity:[m,s,a]}],"mix-blend":[{"mix-blend":[...ue(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":ue()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[m]}],"mask-image-linear-from-pos":[{"mask-linear-from":g()}],"mask-image-linear-to-pos":[{"mask-linear-to":g()}],"mask-image-linear-from-color":[{"mask-linear-from":c()}],"mask-image-linear-to-color":[{"mask-linear-to":c()}],"mask-image-t-from-pos":[{"mask-t-from":g()}],"mask-image-t-to-pos":[{"mask-t-to":g()}],"mask-image-t-from-color":[{"mask-t-from":c()}],"mask-image-t-to-color":[{"mask-t-to":c()}],"mask-image-r-from-pos":[{"mask-r-from":g()}],"mask-image-r-to-pos":[{"mask-r-to":g()}],"mask-image-r-from-color":[{"mask-r-from":c()}],"mask-image-r-to-color":[{"mask-r-to":c()}],"mask-image-b-from-pos":[{"mask-b-from":g()}],"mask-image-b-to-pos":[{"mask-b-to":g()}],"mask-image-b-from-color":[{"mask-b-from":c()}],"mask-image-b-to-color":[{"mask-b-to":c()}],"mask-image-l-from-pos":[{"mask-l-from":g()}],"mask-image-l-to-pos":[{"mask-l-to":g()}],"mask-image-l-from-color":[{"mask-l-from":c()}],"mask-image-l-to-color":[{"mask-l-to":c()}],"mask-image-x-from-pos":[{"mask-x-from":g()}],"mask-image-x-to-pos":[{"mask-x-to":g()}],"mask-image-x-from-color":[{"mask-x-from":c()}],"mask-image-x-to-color":[{"mask-x-to":c()}],"mask-image-y-from-pos":[{"mask-y-from":g()}],"mask-image-y-to-pos":[{"mask-y-to":g()}],"mask-image-y-from-color":[{"mask-y-from":c()}],"mask-image-y-to-color":[{"mask-y-to":c()}],"mask-image-radial":[{"mask-radial":[s,a]}],"mask-image-radial-from-pos":[{"mask-radial-from":g()}],"mask-image-radial-to-pos":[{"mask-radial-to":g()}],"mask-image-radial-from-color":[{"mask-radial-from":c()}],"mask-image-radial-to-color":[{"mask-radial-to":c()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":L()}],"mask-image-conic-pos":[{"mask-conic":[m]}],"mask-image-conic-from-pos":[{"mask-conic-from":g()}],"mask-image-conic-to-pos":[{"mask-conic-to":g()}],"mask-image-conic-from-color":[{"mask-conic-from":c()}],"mask-image-conic-to-color":[{"mask-conic-to":c()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:pe()}],"mask-repeat":[{mask:he()}],"mask-size":[{mask:me()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",s,a]}],filter:[{filter:["","none",s,a]}],blur:[{blur:ye()}],brightness:[{brightness:[m,s,a]}],contrast:[{contrast:[m,s,a]}],"drop-shadow":[{"drop-shadow":["","none",S,X,Q]}],"drop-shadow-color":[{"drop-shadow":c()}],grayscale:[{grayscale:["",m,s,a]}],"hue-rotate":[{"hue-rotate":[m,s,a]}],invert:[{invert:["",m,s,a]}],saturate:[{saturate:[m,s,a]}],sepia:[{sepia:["",m,s,a]}],"backdrop-filter":[{"backdrop-filter":["","none",s,a]}],"backdrop-blur":[{"backdrop-blur":ye()}],"backdrop-brightness":[{"backdrop-brightness":[m,s,a]}],"backdrop-contrast":[{"backdrop-contrast":[m,s,a]}],"backdrop-grayscale":[{"backdrop-grayscale":["",m,s,a]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[m,s,a]}],"backdrop-invert":[{"backdrop-invert":["",m,s,a]}],"backdrop-opacity":[{"backdrop-opacity":[m,s,a]}],"backdrop-saturate":[{"backdrop-saturate":[m,s,a]}],"backdrop-sepia":[{"backdrop-sepia":["",m,s,a]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":p()}],"border-spacing-x":[{"border-spacing-x":p()}],"border-spacing-y":[{"border-spacing-y":p()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",s,a]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[m,"initial",s,a]}],ease:[{ease:["linear","initial",V,s,a]}],delay:[{delay:[m,s,a]}],animate:[{animate:["none",U,s,a]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[w,s,a]}],"perspective-origin":[{"perspective-origin":I()}],rotate:[{rotate:D()}],"rotate-x":[{"rotate-x":D()}],"rotate-y":[{"rotate-y":D()}],"rotate-z":[{"rotate-z":D()}],scale:[{scale:K()}],"scale-x":[{"scale-x":K()}],"scale-y":[{"scale-y":K()}],"scale-z":[{"scale-z":K()}],"scale-3d":["scale-3d"],skew:[{skew:oe()}],"skew-x":[{"skew-x":oe()}],"skew-y":[{"skew-y":oe()}],transform:[{transform:[s,a,"","none","gpu","cpu"]}],"transform-origin":[{origin:I()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:J()}],"translate-x":[{"translate-x":J()}],"translate-y":[{"translate-y":J()}],"translate-z":[{"translate-z":J()}],"translate-none":["translate-none"],accent:[{accent:c()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:c()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",s,a]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":p()}],"scroll-mx":[{"scroll-mx":p()}],"scroll-my":[{"scroll-my":p()}],"scroll-ms":[{"scroll-ms":p()}],"scroll-me":[{"scroll-me":p()}],"scroll-mt":[{"scroll-mt":p()}],"scroll-mr":[{"scroll-mr":p()}],"scroll-mb":[{"scroll-mb":p()}],"scroll-ml":[{"scroll-ml":p()}],"scroll-p":[{"scroll-p":p()}],"scroll-px":[{"scroll-px":p()}],"scroll-py":[{"scroll-py":p()}],"scroll-ps":[{"scroll-ps":p()}],"scroll-pe":[{"scroll-pe":p()}],"scroll-pt":[{"scroll-pt":p()}],"scroll-pr":[{"scroll-pr":p()}],"scroll-pb":[{"scroll-pb":p()}],"scroll-pl":[{"scroll-pl":p()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",s,a]}],fill:[{fill:["none",...c()]}],"stroke-w":[{stroke:[m,B,R,re]}],stroke:[{stroke:["none",...c()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},vt=Ke(yo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fo=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ko=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,o,t)=>t?t.toUpperCase():o.toLowerCase()),xe=e=>{const r=ko(e);return r.charAt(0).toUpperCase()+r.slice(1)},Re=(...e)=>e.filter((r,o,t)=>!!r&&r.trim()!==""&&t.indexOf(r)===o).join(" ").trim(),go=e=>{for(const r in e)if(r.startsWith("aria-")||r==="role"||r==="title")return!0};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var bo={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xo=F.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:o=2,absoluteStrokeWidth:t,className:i="",children:l,iconNode:d,...u},h)=>F.createElement("svg",{ref:h,...bo,width:r,height:r,stroke:e,strokeWidth:t?Number(o)*24/Number(r):o,className:Re("lucide",i),...!l&&!go(u)&&{"aria-hidden":"true"},...u},[...d.map(([y,f])=>F.createElement(y,f)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=(e,r)=>{const o=F.forwardRef(({className:t,...i},l)=>F.createElement(xo,{ref:l,iconNode:r,className:Re(`lucide-${fo(xe(e))}`,`lucide-${e}`,t),...i}));return o.displayName=xe(e),o};/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vo=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",key:"1s80jp"}],["path",{d:"M10 12h4",key:"a56b0p"}]],wt=n("archive",vo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wo=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],Mt=n("arrow-left",wo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mo=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],_t=n("arrow-right",Mo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _o=[["path",{d:"M3 5v14",key:"1nt18q"}],["path",{d:"M8 5v14",key:"1ybrkv"}],["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"M17 5v14",key:"ycjyhj"}],["path",{d:"M21 5v14",key:"nzette"}]],zt=n("barcode",_o);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zo=[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]],Ct=n("building-2",zo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Co=[["path",{d:"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",key:"1osxxc"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M3 10h5",key:"r794hk"}],["path",{d:"M17.5 17.5 16 16.3V14",key:"akvzfd"}],["circle",{cx:"16",cy:"16",r:"6",key:"qoo3c4"}]],Nt=n("calendar-clock",Co);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const No=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]],At=n("calendar-days",No);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ao=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],$t=n("camera",Ao);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $o=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],St=n("chart-column",$o);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const So=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Vt=n("check",So);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vo=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Pt=n("chevron-down",Vo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Po=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],jt=n("chevron-left",Po);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jo=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Rt=n("chevron-right",jo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ro=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],Lt=n("chevron-up",Ro);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lo=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],It=n("circle-check-big",Lo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Io=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],qt=n("circle-check",Io);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qo=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]],Gt=n("clipboard-list",qo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Go=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],Tt=n("clock",Go);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const To=[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]],Ht=n("coins",To);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ho=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],Et=n("download",Ho);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Eo=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Ot=n("eye",Eo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oo=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],Bt=n("file-text",Oo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bo=[["path",{d:"M20 7h-3a2 2 0 0 1-2-2V2",key:"x099mo"}],["path",{d:"M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z",key:"18t6ie"}],["path",{d:"M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8",key:"1nja0z"}]],Ft=n("files",Bo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fo=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],Ut=n("info",Fo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uo=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],Wt=n("key-round",Uo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wo=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]],Zt=n("key",Wo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zo=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Dt=n("layout-dashboard",Zo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Do=[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]],Kt=n("link-2",Do);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ko=[["path",{d:"M21 12h-8",key:"1bmf0i"}],["path",{d:"M21 6H8",key:"1pqkrb"}],["path",{d:"M21 18h-8",key:"1tm79t"}],["path",{d:"M3 6v4c0 1.1.9 2 2 2h3",key:"1ywdgy"}],["path",{d:"M3 10v6c0 1.1.9 2 2 2h3",key:"2wc746"}]],Jt=n("list-tree",Ko);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jo=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Qt=n("loader-circle",Jo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qo=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Xt=n("lock",Qo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xo=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],Yt=n("log-out",Xo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yo=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],er=n("mail",Yo);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],or=n("map-pin",et);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]],tr=n("menu",ot);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],rr=n("package",tt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rt=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],ar=n("plus",rt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=[["path",{d:"M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",key:"x6z5xu"}],["path",{d:"M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",key:"1x4zh5"}],["path",{d:"m14 16-3 3 3 3",key:"f6jyew"}],["path",{d:"M8.293 13.596 7.196 9.5 3.1 10.598",key:"wf1obh"}],["path",{d:"m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",key:"9tzpgr"}],["path",{d:"m13.378 9.633 4.096 1.098 1.097-4.096",key:"1oe83g"}]],sr=n("recycle",at);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const st=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],nr=n("refresh-cw",st);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nt=[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]],ir=n("scale",nt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],lr=n("settings",it);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],cr=n("shield",lt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],dr=n("square-pen",ct);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],pr=n("trash-2",dt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}]],hr=n("trash",pt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],mr=n("triangle-alert",ht);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]],ur=n("truck",mt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ut=[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],yr=n("user-check",ut);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]],fr=n("user-plus",yt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],kr=n("user",ft);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],gr=n("users",kt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gt=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]],br=n("wrench",gt);/**
 * @license lucide-react v0.516.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bt=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],xr=n("x",bt),ve=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,we=Le,vr=(e,r)=>o=>{var t;if(r?.variants==null)return we(e,o?.class,o?.className);const{variants:i,defaultVariants:l}=r,d=Object.keys(i).map(y=>{const f=o?.[y],x=l?.[y];if(f===null)return null;const _=ve(f)||ve(x);return i[y][_]}),u=o&&Object.entries(o).reduce((y,f)=>{let[x,_]=f;return _===void 0||(y[x]=_),y},{}),h=r==null||(t=r.compoundVariants)===null||t===void 0?void 0:t.reduce((y,f)=>{let{class:x,className:_,...S}=f;return Object.entries(S).every(v=>{let[w,z]=v;return Array.isArray(z)?z.includes({...l,...u}[w]):{...l,...u}[w]===z})?[...y,x,_]:y},[]);return we(e,d,h,o?.class,o?.className)};export{Tt as $,_t as A,Ct as B,Pt as C,Et as D,Ot as E,Bt as F,zt as G,$t as H,St as I,Ut as J,mr as K,Yt as L,tr as M,er as N,Xt as O,ar as P,Qt as Q,sr as R,lr as S,ur as T,gr as U,fr as V,br as W,xr as X,Wt as Y,yr as Z,kr as _,vr as a,nr as a0,Zt as a1,Lt as b,Le as c,Vt as d,Jt as e,jt as f,Rt as g,dr as h,Mt as i,Nt as j,It as k,wt as l,Kt as m,qt as n,pr as o,hr as p,Dt as q,cr as r,or as s,vt as t,rr as u,At as v,Ft as w,ir as x,Ht as y,Gt as z};
