import fs from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',C='udlr';
function P(t){let w=t.indexOf('\n'),a=new Uint8Array(t.length).fill(1),g=[],b=[],p=0;
for(let i=0;i<t.length;i++){let c=t[i];if(c=='\n')continue;let x=i%(w+1),y=i/(w+1)|0,k=y*w+x;
if(c=='#')continue;a[k]=0;if('.*+'.includes(c))g.push(k);if('$*'.includes(c))b.push(k);if('@+'.includes(c))p=k;}
return{w,a,g,b:b.sort((x,y)=>x-y),p};}
function Q(l,b,f,p){let w=l.w,a=l.a,q=[f],m=f,E=[-w,w,-1,1];p.fill(-1);p[f]=f;
for(let i=0;i<q.length;i++){let x=q[i];if(x<m)m=x;
for(let d of E){let y=x+d;
if(!a[y]&&!b.includes(y)&&p[y]<0){p[y]=x;q.push(y);}}}
return m;}
function S(l){let{w,a,g}=l,s=a.length,e=new Int32Array(s),m=new Int32Array(s),E=[-w,w,-1,1];
let B=[l.b],P=[l.p],M=[''],I=new Map();
I.set(l.b+'|'+Q(l,l.b,l.p,e),0);
if(l.b.every(x=>g.includes(x)))return'';
for(let h=0;h<B.length;h++){let b=B[h];
Q(l,b,P[h],e);
for(let i=0;i<b.length;i++){let x=b[i];
for(let j=0;j<4;j++){let d=E[j],t=x+d;
if(e[x-d]<0||a[t]||b.includes(t))continue;
let n=b.slice();n[i]=t;n.sort((p,q)=>p-q);let y=n+'|'+Q(l,n,x,m);
if(I.has(y))continue;
I.set(y,B.length);
let w2='';for(let u=x-d;u!=P[h];u=e[u])w2=C[E.indexOf(u-e[u])]+w2;
let mv=M[h]+w2+C[j];
if(n.every(x=>g.includes(x)))return mv;
B.push(n);P.push(x);M.push(mv);}}}
return null;}
function Rm(l){let v=new Uint8Array(l.a.length),q=[...l.g],E=[-l.w,l.w,-1,1];
for(let x of l.g)v[x]=1;
for(let i=0;i<q.length;i++)for(let d of E){let y=q[i]-d;
if(!l.a[y]&&!l.a[y-d]&&!v[y]){v[y]=1;q.push(y);}}
let n=new Int32Array(l.a.length).fill(-1),R=[];
for(let s=0;s<l.a.length;s++){if(!v[s]||n[s]>=0)continue;
let q2=[s];n[s]=R.length;
for(let i=0;i<q2.length;i++)for(let d of E){let y=q2[i]+d;
if(v[y]&&n[y]<0){n[y]=R.length;q2.push(y);}}
R.push({b:[],g:[]});}
for(let x of l.b){if(n[x]<0)return null;R[n[x]].b.push(x);}
for(let x of l.g)R[n[x]].g.push(x);
if(R.some(x=>x.b.length!=x.g.length))return null;
return R.filter(x=>x.b.length);}
function B(l){let r=Rm(l);if(!r)return S(l);let p=l.p,mv='';
for(let rm of r){let w2=l.a.slice();
for(let o of r)if(o!=rm)for(let x of o.d?o.g:o.b)w2[x]=1;
let s={w:l.w,a:w2,g:rm.g,b:rm.b,p};
let z=S(s);if(z==null)return null;
mv+=z;for(let c of z)p+=c=='u'?-l.w:c=='d'?l.w:c=='l'?-1:1;rm.d=1;}
return mv;}
for(let n=1;n<6;n++){let id='i00'+n,mv=B(P(fs.readFileSync(I+'/'+id+'/level.txt','utf8')))??'';
fs.mkdirSync(O+'/'+id,{recursive:true});
fs.writeFileSync(O+'/'+id+'/solution.txt',mv+'\n');}
