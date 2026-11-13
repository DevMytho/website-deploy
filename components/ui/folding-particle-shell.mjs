var t=globalThis.__compifyGlobals&&globalThis.__compifyGlobals.react;if(!t)throw new Error("compify: host global not set for react");var Ft=t.default!==void 0?t.default:t,Tt=t.Children!==void 0?t.Children:t.default&&t.default.Children,Vt=t.Component!==void 0?t.Component:t.default&&t.default.Component,Mt=t.Fragment!==void 0?t.Fragment:t.default&&t.default.Fragment,Dt=t.Profiler!==void 0?t.Profiler:t.default&&t.default.Profiler,Nt=t.PureComponent!==void 0?t.PureComponent:t.default&&t.default.PureComponent,kt=t.StrictMode!==void 0?t.StrictMode:t.default&&t.default.StrictMode,Pt=t.Suspense!==void 0?t.Suspense:t.default&&t.default.Suspense,Lt=t.cloneElement!==void 0?t.cloneElement:t.default&&t.default.cloneElement,Bt=t.createContext!==void 0?t.createContext:t.default&&t.default.createContext,zt=t.createElement!==void 0?t.createElement:t.default&&t.default.createElement,It=t.createFactory!==void 0?t.createFactory:t.default&&t.default.createFactory,Ot=t.createRef!==void 0?t.createRef:t.default&&t.default.createRef,Ht=t.forwardRef!==void 0?t.forwardRef:t.default&&t.default.forwardRef,Ut=t.isValidElement!==void 0?t.isValidElement:t.default&&t.default.isValidElement,Wt=t.lazy!==void 0?t.lazy:t.default&&t.default.lazy,Gt=t.memo!==void 0?t.memo:t.default&&t.default.memo,Yt=t.startTransition!==void 0?t.startTransition:t.default&&t.default.startTransition,jt=t.useCallback!==void 0?t.useCallback:t.default&&t.default.useCallback,qt=t.useContext!==void 0?t.useContext:t.default&&t.default.useContext,Xt=t.useDebugValue!==void 0?t.useDebugValue:t.default&&t.default.useDebugValue,$t=t.useDeferredValue!==void 0?t.useDeferredValue:t.default&&t.default.useDeferredValue,Ze=t.useEffect!==void 0?t.useEffect:t.default&&t.default.useEffect,Kt=t.useId!==void 0?t.useId:t.default&&t.default.useId,Jt=t.useImperativeHandle!==void 0?t.useImperativeHandle:t.default&&t.default.useImperativeHandle,Qt=t.useInsertionEffect!==void 0?t.useInsertionEffect:t.default&&t.default.useInsertionEffect,Zt=t.useLayoutEffect!==void 0?t.useLayoutEffect:t.default&&t.default.useLayoutEffect,en=t.useMemo!==void 0?t.useMemo:t.default&&t.default.useMemo,tn=t.useReducer!==void 0?t.useReducer:t.default&&t.default.useReducer,j=t.useRef!==void 0?t.useRef:t.default&&t.default.useRef,nn=t.useState!==void 0?t.useState:t.default&&t.default.useState,rn=t.useSyncExternalStore!==void 0?t.useSyncExternalStore:t.default&&t.default.useSyncExternalStore,on=t.useTransition!==void 0?t.useTransition:t.default&&t.default.useTransition,an=t.version!==void 0?t.version:t.default&&t.default.version,un=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED!==void 0?t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:t.default&&t.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ln=t.__SECRET_SERVER_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED!==void 0?t.__SECRET_SERVER_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:t.default&&t.default.__SECRET_SERVER_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sn=t.cache!==void 0?t.cache:t.default&&t.default.cache,fn=t.use!==void 0?t.use:t.default&&t.default.use;var l=new Proxy({},{get:(n,r)=>String(r).toLowerCase()});function tt(n,r){if(typeof n=="function")try{n.propertyControls=r}catch{}}function nt(n){let r=ye(n);return{__rgba:r,toValue(){return r?dt(r):String(n)},toString(){return this.toValue()},toHexString(){return r?mt(r):String(n)},toRgbString(){return this.toValue()}}}nt.toHsl=n=>{let r=ye(n&&n.__rgba?n.__rgba:n)||{r:0,g:0,b:0,a:1};return pt(r)};nt.toRgb=n=>{let r=ye(n&&n.__rgba?n.__rgba:n)||{r:0,g:0,b:0,a:1};return{r:r.r,g:r.g,b:r.b,a:r.a}};function ye(n){if(n==null)return null;if(typeof n=="object")return"__rgba"in n?n.__rgba:"r"in n?{r:+n.r,g:+n.g,b:+n.b,a:n.a==null?1:+n.a}:"h"in n?et(n):null;let r=String(n).trim(),i;if(i=r.match(/^#([0-9a-fA-F]{3,8})$/)){let o=i[1];return(o.length===3||o.length===4)&&(o=o.split("").map(a=>a+a).join("")),{r:parseInt(o.slice(0,2),16),g:parseInt(o.slice(2,4),16),b:parseInt(o.slice(4,6),16),a:o.length===8?parseInt(o.slice(6,8),16)/255:1}}if(i=r.match(/^rgba?\(([^)]+)\)$/i)){let o=i[1].split(/[,\/\s]+/).filter(Boolean).map(parseFloat);return{r:o[0],g:o[1],b:o[2],a:o[3]==null?1:o[3]}}if(i=r.match(/^hsla?\(([^)]+)\)$/i)){let o=i[1].split(/[,\/\s]+/).filter(Boolean).map(parseFloat);return et({h:o[0],s:o[1],l:o[2],a:o[3]==null?1:o[3]})}return null}function T(n,r){return Math.max(0,Math.min(r,n))}function dt(n){let r=n.a==null?1:n.a,i=Math.round(T(n.r,255)),o=Math.round(T(n.g,255)),a=Math.round(T(n.b,255));return r>=1?"rgb("+i+", "+o+", "+a+")":"rgba("+i+", "+o+", "+a+", "+r+")"}function mt(n){let r=i=>T(Math.round(i),255).toString(16).padStart(2,"0");return"#"+r(n.r)+r(n.g)+r(n.b)+(n.a==null||n.a>=1?"":r(n.a*255))}function pt(n){let r=T(n.r,255)/255,i=T(n.g,255)/255,o=T(n.b,255)/255,a=Math.max(r,i,o),u=Math.min(r,i,o),m=0,h=0,c=(a+u)/2,d=a-u;return d!==0&&(h=c>.5?d/(2-a-u):d/(a+u),a===r?m=(i-o)/d+(i<o?6:0):a===i?m=(o-r)/d+2:m=(r-i)/d+4,m*=60),{h:m,s:h*100,l:c*100,a:n.a==null?1:n.a}}function et(n){let r=(n.h%360+360)%360/360,i=T(n.s,100)/100,o=T(n.l,100)/100,a=(c,d,g)=>(g<0&&(g+=1),g>1&&(g-=1),g<1/6?c+(d-c)*6*g:g<1/2?d:g<2/3?c+(d-c)*(2/3-g)*6:c),u,m,h;if(i===0)u=m=h=o;else{let c=o<.5?o*(1+i):o+i-o*i,d=2*o-c;u=a(d,c,r+1/3),m=a(d,c,r),h=a(d,c,r-1/3)}return{r:u*255,g:m*255,b:h*255,a:n.a==null?1:n.a}}var v=globalThis.__compifyGlobals&&globalThis.__compifyGlobals["react/jsx-runtime"];if(!v)throw new Error("compify: host global not set for react/jsx-runtime");var mn=v.default!==void 0?v.default:v,pn=v.Fragment!==void 0?v.Fragment:v.default&&v.default.Fragment,Se=v.jsx!==void 0?v.jsx:v.default&&v.default.jsx,hn=v.jsxs!==void 0?v.jsxs:v.default&&v.default.jsxs,xn=v.jsxDEV!==void 0?v.jsxDEV:v.default&&v.default.jsxDEV;var it={shellCount:32500,shellSize:22,centerX:50,centerY:50,foldScale:232,ridge:55,detail:87,morph:69,breathSec:57,breathDepth:45,pitDepth:56,tilt:7,lightAngle:162,shellGlow:71,backDim:45,rim:60,thickness:7,pointSize:77,halo:61,shed:66,speckCount:4700,speckColor:"#C9C7DA",speckBright:67,speckSize:93,bands:77,bandScale:100,drift:36,driftAngle:135,twinkle:50,gap:60,trailCount:30,trailStart:3,trailFall:5,trailWidth:5,trailBright:80,seed:7,hover:100,grain:0,vignette:0},rt={into:{},out:{hover:"advanced"}},ht={advanced:it};function xt(n){let r={...n};for(let[i,o]of Object.entries(rt.into))r[i]=n?.[o]?.[i]??ht[o]?.[i];for(let[i,o]of Object.entries(rt.out))r[i]!==void 0&&(r[o]={...r[o]??{},[i]:r[i]});return r}var K=6e4,J=2e4,we=80,vt=`
vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
vec4 mod289(vec4 x){ return x - floor(x*(1.0/289.0))*289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0*floor(p*ns.z*ns.z);
  vec4 x_ = floor(j*ns.z);
  vec4 y_ = floor(j - 7.0*x_);
  vec4 x = x_*ns.x + ns.yyyy;
  vec4 y = y_*ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m*m;
  return 42.0*dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`,gt=`#version 300 es
precision highp float;
layout(location=0) in vec3 aDir;
layout(location=1) in vec4 aSeed;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uTime;
uniform float uMorph;
uniform float uFreq;
uniform float uAmp;
uniform float uRidge;
uniform float uDetail;
uniform float uPit;
uniform vec3 uPitDir;
uniform vec2 uRot;
uniform vec3 uLight;
uniform float uBackDim;
uniform float uRim;
uniform float uThick;
uniform float uPointPx;
uniform float uIntensity;
uniform vec3 uColor;
uniform float uShed;
uniform vec2 uMouse;
uniform float uHover;
out vec3 vCol;
${vt}
float field(vec3 p){
  float t = uTime*uMorph;
  float a = snoise(p*uFreq + vec3(0.0, t, t*0.7));
  float r = 1.0 - abs(snoise(p*(uFreq*2.3) + vec3(t*1.3, 4.1, -t)));
  float c = snoise(p*(uFreq*5.0) + vec3(-t*1.7, t, 9.0));
  float pit = uPit*exp((dot(p, uPitDir) - 1.0)*5.0);
  return uAmp*(a*0.62 + (r*r - 0.5)*uRidge*0.55 + c*uDetail*0.2) - pit;
}
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,-s, 0.0,1.0,0.0, s,0.0,c); }
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,s, 0.0,-s,c); }
void main(){
  vec3 d = aDir;
  vec3 up = abs(d.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 t1 = normalize(cross(d, up));
  vec3 t2 = cross(d, t1);
  const float e = 0.035;
  float f0 = field(d);
  float f1 = field(normalize(d + t1*e));
  float f2 = field(normalize(d + t2*e));
  vec3 grad = ((f1 - f0)*t1 + (f2 - f0)*t2)/e;
  vec3 n = normalize(d - grad/max(1.0 + f0, 0.2));
  float rad = uRadius*max(1.0 + f0, 0.15)*(1.0 + (aSeed.z - 0.5)*2.0*uThick);
  mat3 R = rotY(uRot.x)*rotX(uRot.y);
  vec3 p = R*(d*rad);
  n = R*n;
  vec2 s = vec2(p.x, -p.y);

  float lam = max(dot(n, uLight), 0.0);
  float fres = pow(1.0 - abs(n.z), 2.0);
  float face = mix(uBackDim, 1.0, smoothstep(-0.3, 0.3, n.z));
  float b = (0.2 + lam + uRim*fres*(0.35 + 0.65*lam))*face;
  float pitW = exp((dot(d, uPitDir) - 1.0)*5.0);
  b *= 1.0 - min(uPit*3.0, 0.75)*pitW;
  b *= 0.45 + 1.1*aSeed.x;
  float sparkle = step(0.985, aSeed.y);
  b *= 1.0 + sparkle*1.4;

  // a few points peel off the surface as faint wisps
  float shed = step(aSeed.w, uShed);
  float life = fract(uTime*0.06 + fract(aSeed.x*31.7 + aSeed.y*7.3));
  vec2 outward = normalize(s + vec2(0.001, 0.0007));
  s += shed*(outward*life*uRadius*0.9
      + vec2(sin(life*6.0 + aSeed.y*20.0), cos(life*5.0 + aSeed.z*17.0))*uRadius*0.1*life);
  b *= mix(1.0, (1.0 - life)*0.7, shed);

  vec2 sp = uCenter + s;
  vec2 mv = sp - uMouse;
  float md = length(mv);
  float h = uHover*exp(-md*md/(uRes.y*uRes.y*0.016));
  sp += mv/(md + 1.0)*h*uRes.y*0.06;
  b *= 1.0 + h*0.8;

  vCol = uColor*b*uIntensity;
  gl_PointSize = uPointPx*(0.8 + 0.4*aSeed.z)*(1.0 + sparkle*0.6);
  gl_Position = vec4(sp.x/uRes.x*2.0 - 1.0, 1.0 - sp.y/uRes.y*2.0, 0.0, 1.0);
}
`,bt=`#version 300 es
precision highp float;
layout(location=0) in vec2 aBase;
layout(location=1) in vec4 aSeed;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uDrift;
uniform float uTwinkle;
uniform float uBright;
uniform float uSize;
uniform vec3 uColor;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uGap;
uniform vec2 uMouse;
uniform float uHover;
out vec3 vCol;
void main(){
  vec2 wob = vec2(sin(aBase.y*11.0 + uTime*0.37 + aSeed.x*6.2832),
                  cos(aBase.x*9.0 - uTime*0.31 + aSeed.y*6.2832))*0.004;
  vec2 uv = fract(aBase + uDrift*uTime + wob);
  vec2 p = uv*uRes;
  vec2 v = uMouse - p;
  float f = uHover*exp(-dot(v, v)/(uRes.y*uRes.y*0.03));
  p += v*f*0.3;
  float d = length(p - uCenter)/max(uRadius, 1.0);
  float g = mix(1.0 - uGap, 1.0, smoothstep(1.0, 1.5, d));
  float tw = 1.0 - uTwinkle*(0.5 + 0.5*sin(uTime*(3.0 + aSeed.z*9.0) + aSeed.w*40.0));
  float big = step(0.95, aSeed.y);
  float b = uBright*(0.3 + 0.7*aSeed.x*aSeed.x)*(1.0 + big*1.2)*tw*g*(1.0 + f*1.5);
  vCol = uColor*b;
  gl_PointSize = uSize*(1.0 + 0.6*aSeed.z + big*1.6);
  gl_Position = vec4(p.x/uRes.x*2.0 - 1.0, 1.0 - p.y/uRes.y*2.0, 0.0, 1.0);
}
`,yt=`#version 300 es
precision highp float;
layout(location=0) in vec4 aSeed;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uOrigin;
uniform float uFall;
uniform float uSpan;
uniform float uWidth;
uniform float uStart;
uniform float uBright;
uniform float uSize;
uniform vec3 uColor;
out vec3 vCol;
void main(){
  float period = uSpan/max(uFall, 1.0) + 1.0;
  float age = mod(uTime + aSeed.x*period, period);
  float te = uTime - age;
  float alive = smoothstep(uStart, uStart + 1.5, te);
  float fr = clamp(age*uFall/max(uSpan, 1.0), 0.0, 1.0);
  vec2 p = uOrigin + vec2(
    (aSeed.y - 0.5)*uWidth*(0.35 + 0.65*fr) + sin(age*1.6 + aSeed.z*6.2832)*uWidth*0.12,
    age*uFall);
  float b = uBright*alive*(1.0 - fr)*smoothstep(0.0, 0.3, age)
          *(0.6 + 0.4*sin(uTime*5.0 + aSeed.w*30.0))*(0.5 + 0.5*aSeed.w);
  vCol = uColor*b;
  gl_PointSize = uSize*(0.8 + 0.5*aSeed.z);
  gl_Position = vec4(p.x/uRes.x*2.0 - 1.0, 1.0 - p.y/uRes.y*2.0, 0.0, 1.0);
}
`,_e=`#version 300 es
precision highp float;
in vec3 vCol;
uniform float uHalo;
out vec4 o;
void main(){
  vec2 d = gl_PointCoord*2.0 - 1.0;
  float r2 = dot(d, d);
  if (r2 > 1.0) discard;
  float a = exp(-r2*10.0) + uHalo*exp(-r2*2.5)*(1.0 - r2);
  o = vec4(vCol*a, 1.0);
}
`,St=`#version 300 es
precision highp float;
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p*2.0 - 1.0, 0.0, 1.0);
}
`,_t=`#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uGrain;
uniform float uVignette;
out vec4 o;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)))*43758.5453); }
void main(){
  vec2 uv = gl_FragCoord.xy/uRes;
  vec2 q = (uv - 0.5)*vec2(uRes.x/max(uRes.y, 1.0), 1.0);
  float v = uVignette*smoothstep(0.25, 1.0, length(q)*1.2);
  float n = hash(gl_FragCoord.xy + floor(uTime*24.0)*vec2(17.0, 31.0));
  float g = uGrain*0.18;
  o = vec4(vec3(n)*g*(1.0 - v), 1.0 - (1.0 - g)*(1.0 - v));
}
`;function Re(n,r){if(typeof n!="string")return r;let i=n.match(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/);if(!i)return r;let o=i[0];if(o[0]==="#"){let u=o.slice(1);return(u.length===3||u.length===4)&&(u=u.split("").map(m=>m+m).join("")),u.length<6?r:[parseInt(u.slice(0,2),16)/255,parseInt(u.slice(2,4),16)/255,parseInt(u.slice(4,6),16)/255]}let a=o.replace(/rgba?\(|\)/g,"").split(/[\s,/]+/).filter(Boolean).map(u=>Number.parseFloat(u));return a.length<3||a.slice(0,3).some(u=>Number.isNaN(u))?r:[a[0]/255,a[1]/255,a[2]/255]}function s(n,r){return typeof n=="number"&&Number.isFinite(n)?n:r}function w(n,r,i){return Math.min(i,Math.max(r,n))}function Ce(n){return()=>{n|=0,n=n+1831565813|0;let r=Math.imul(n^n>>>15,1|n);return r=r+Math.imul(r^r>>>7,61|r)^r,((r^r>>>14)>>>0)/4294967296}}function q(n,r,i){let o=Math.imul(n,374761393)+Math.imul(r,668265263)+Math.imul(i,1442695041)|0;return o=Math.imul(o^o>>>13,1274126177),o^=o>>>16,(o>>>0)/4294967296}function Rt(n,r,i,o,a){let u=Math.floor(n),m=Math.floor(r),h=n-u,c=r-m,d=h*h*(3-2*h),g=c*c*(3-2*c),x=(u%i+i)%i,C=(x+1)%i,e=(m%o+o)%o,V=(e+1)%o,F=q(x,e,a),P=q(C,e,a),L=q(x,V,a),p=q(C,V,a);return F+(P-F)*d+(L-F)*g+(F-P-L+p)*d*g}function Ee(n,r,i,o,a){let u=0,m=.5,h=0,c=1;for(let d=0;d<4;d++)u+=m*Rt(n*c,r*c,i*c,o*c,a+d*17),h+=m,m*=.5,c*=2;return u/h}function Et(n){let r=Ce(n*9973+1),i=new Float32Array(K*7);for(let o=0;o<K;o++){let a=o*7,u=r()*2-1,m=r()*Math.PI*2,h=Math.sqrt(Math.max(0,1-u*u));i[a]=h*Math.cos(m),i[a+1]=u,i[a+2]=h*Math.sin(m),i[a+3]=r(),i[a+4]=r(),i[a+5]=r(),i[a+6]=r()}return i}function wt(n,r,i,o){let a=Ce(n*7919+13),u=new Float32Array(J*6);for(let m=0;m<J;m++){let h=0,c=0;for(let g=0;g<24;g++){h=a(),c=a();let x=Ee(h*r+3.1,c*i+7.7,r,i,n+101)-.5,C=Ee(h*r+11.3,c*i+2.9,r,i,n+202)-.5,e=Ee(h*r+x*1.6,c*i+C*1.6,r,i,n),V=Math.pow(1-Math.abs(2*e-1),10),F=(1-o)*.35+o*V;if(a()<F)break}let d=m*6;u[d]=h,u[d+1]=c,u[d+2]=a(),u[d+3]=a(),u[d+4]=a(),u[d+5]=a()}return u}function Ct(n){let r=Ce(n*6151+29),i=new Float32Array(we*4);for(let o=0;o<i.length;o++)i[o]=r();return i}function ot(n,r,i){let o=n.createShader(r);if(!o)throw new Error("FoldingParticleShell: createShader failed");if(n.shaderSource(o,i),n.compileShader(o),!n.getShaderParameter(o,n.COMPILE_STATUS)){let a=n.getShaderInfoLog(o);throw n.deleteShader(o),new Error("FoldingParticleShell shader: "+a)}return o}function X(n,r,i){let o=n.createProgram();if(!o)throw new Error("FoldingParticleShell: createProgram failed");let a=ot(n,n.VERTEX_SHADER,r),u=ot(n,n.FRAGMENT_SHADER,i);if(n.attachShader(o,a),n.attachShader(o,u),n.linkProgram(o),n.deleteShader(a),n.deleteShader(u),!n.getProgramParameter(o,n.LINK_STATUS))throw new Error("FoldingParticleShell link: "+n.getProgramInfoLog(o));return o}function $(n,r,i){let o={};for(let a of i){let u=n.getUniformLocation(r,a);if(u===null)throw new Error("FoldingParticleShell: missing uniform "+a);o[a]=u}return o}function at(n){n=xt(n);let{speed:r=100,scale:i=100,fold:o=100,density:a=50,color:u="#FFFFFF",background:m="#000000",style:h}=n,c=j(null),d=j(null),g=j(null);return g.current={speed:r,scale:i,fold:o,density:a,color:u,background:m,advanced:n.advanced},Ze(()=>{let x=c.current,C=d.current;if(!x||!C)return;let e=C.getContext("webgl2",{antialias:!1,alpha:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!0});if(!e)return;let V=X(e,gt,_e),F=X(e,bt,_e),P=X(e,yt,_e),L=X(e,St,_t),p=$(e,V,["uRes","uCenter","uRadius","uTime","uMorph","uFreq","uAmp","uRidge","uDetail","uPit","uPitDir","uRot","uLight","uBackDim","uRim","uThick","uPointPx","uIntensity","uColor","uShed","uMouse","uHover","uHalo"]),R=$(e,F,["uRes","uTime","uDrift","uTwinkle","uBright","uSize","uColor","uCenter","uRadius","uGap","uMouse","uHover","uHalo"]),A=$(e,P,["uRes","uTime","uOrigin","uFall","uSpan","uWidth","uStart","uBright","uSize","uColor","uHalo"]),U=$(e,L,["uRes","uTime","uGrain","uVignette"]),Q=e.createBuffer(),Z=e.createVertexArray();e.bindVertexArray(Z),e.bindBuffer(e.ARRAY_BUFFER,Q),e.bufferData(e.ARRAY_BUFFER,K*7*4,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,28,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,28,12);let ee=e.createBuffer(),te=e.createVertexArray();e.bindVertexArray(te),e.bindBuffer(e.ARRAY_BUFFER,ee),e.bufferData(e.ARRAY_BUFFER,J*6*4,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,24,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,24,8);let ne=e.createBuffer(),re=e.createVertexArray();e.bindVertexArray(re),e.bindBuffer(e.ARRAY_BUFFER,ne),e.bufferData(e.ARRAY_BUFFER,we*4*4,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,16,0);let Ae=e.createVertexArray();e.bindVertexArray(null);let Fe=NaN,Te=NaN,Ve="",W=x.offsetWidth,oe=x.offsetHeight,Me=new ResizeObserver(()=>{W=x.offsetWidth,oe=x.offsetHeight});Me.observe(x);let G=typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)"):null,De=!!G?.matches,Ne=()=>{De=!!G?.matches};G?.addEventListener?.("change",Ne);let y={x:0,y:0,over:0,down:0,seen:!1},_={x:0,y:0,over:0,down:0},z=S=>{y.x=S.offsetX,y.y=S.offsetY,y.over=1,y.seen||(_.x=y.x,_.y=y.y,y.seen=!0)},ke=()=>{y.over=0,y.down=0},Pe=S=>{z(S),y.down=1},Y=()=>{y.down=0};x.addEventListener("pointermove",z),x.addEventListener("pointerenter",z),x.addEventListener("pointerleave",ke),x.addEventListener("pointerdown",Pe),window.addEventListener("pointerup",Y),window.addEventListener("pointercancel",Y);let ie=(()=>{let S=[.12,.3,.95],N=Math.hypot(S[0],S[1],S[2]);return[S[0]/N,S[1]/N,S[2]/N]})(),ae=0,ue=-1,I=0,Le=S=>{ae=requestAnimationFrame(Le);let N=ue<0?0:Math.min((S-ue)/1e3,1/20);if(ue=S,e.isContextLost())return;let k=g.current,f={...it,...k.advanced??{}},ut=De?0:Math.max(0,s(k.speed,50))/50;I+=N*ut;let le=I%3600,O=Math.min(window.devicePixelRatio||1,1.5),E=Math.max(1,Math.round(W*O)),b=Math.max(1,Math.round(oe*O));if((C.width!==E||C.height!==b)&&(C.width=E,C.height=b),W<2||oe<2)return;let M=Math.round(s(f.seed,7));M!==Fe&&(Fe=M,e.bindBuffer(e.ARRAY_BUFFER,Q),e.bufferSubData(e.ARRAY_BUFFER,0,Et(M))),M!==Te&&(Te=M,e.bindBuffer(e.ARRAY_BUFFER,ne),e.bufferSubData(e.ARRAY_BUFFER,0,Ct(M)));let Be=Math.max(1,Math.round(2.5*w(s(f.bandScale,100),20,400)/100)),ze=Be,Ie=Math.max(1,Math.round(Be*(E/b))),Oe=w(s(f.bands,70)/100,0,1),He=`${M}|${Ie}|${ze}|${Oe}`;He!==Ve&&(Ve=He,e.bindBuffer(e.ARRAY_BUFFER,ee),e.bufferSubData(e.ARRAY_BUFFER,0,wt(M,Ie,ze,Oe)));let se=1-Math.exp(-N*6),Ue=E/Math.max(W,1);_.x+=(y.x-_.x)*se,_.y+=(y.y-_.y)*se,_.over+=(y.over-_.over)*se,_.down+=(y.down-_.down)*(1-Math.exp(-N*10));let fe=_.x*Ue,ce=_.y*Ue,de=_.over*Math.max(0,s(f.hover,50))/50,We=de*(1+.8*_.down),lt=Math.max(.1,s(k.scale,100)/100),me=E*s(f.centerX,50)/100,pe=b*s(f.centerY,49)/100,he=Math.min(b*s(f.shellSize,16)/100,E*.32)*lt,Ge=Math.max(0,s(k.density,70))/70,Ye=w(Math.round(s(f.shellCount,2e4)*Ge),0,K),je=w(Math.round(s(f.speckCount,7e3)*Ge),0,J),qe=w(Math.round(s(f.trailCount,30)),0,we),st=Math.max(1,s(f.breathSec,24)),xe=1-w(s(f.breathDepth,45)/100,0,1)*(.5+.5*Math.cos(2*Math.PI*I/st)),B=Re(k.color,[.831,.824,.894]),ve=Re(f.speckColor,[.788,.78,.855]),ge=Re(k.background,[0,0,0]);if(e.viewport(0,0,E,b),e.clearColor(ge[0],ge[1],ge[2],1),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),je>0){let D=s(f.driftAngle,135)*Math.PI/180,H=s(f.drift,18)/1e3;e.useProgram(F),e.uniform2f(R.uRes,E,b),e.uniform1f(R.uTime,le),e.uniform2f(R.uDrift,Math.cos(D)*H,Math.sin(D)*H*(E/b)),e.uniform1f(R.uTwinkle,w(s(f.twinkle,50)/100,0,1)),e.uniform1f(R.uBright,s(f.speckBright,60)/100*2),e.uniform1f(R.uSize,4.5*O*Math.max(.1,s(f.speckSize,100)/100)),e.uniform3f(R.uColor,ve[0],ve[1],ve[2]),e.uniform2f(R.uCenter,me,pe),e.uniform1f(R.uRadius,he),e.uniform1f(R.uGap,w(s(f.gap,60)/100,0,1)),e.uniform2f(R.uMouse,fe,ce),e.uniform1f(R.uHover,We),e.uniform1f(R.uHalo,.2),e.bindVertexArray(te),e.drawArrays(e.POINTS,0,je)}if(qe>0){let D=pe+he*.95;e.useProgram(P),e.uniform2f(A.uRes,E,b),e.uniform1f(A.uTime,le),e.uniform2f(A.uOrigin,me+b*.02,D),e.uniform1f(A.uFall,Math.max(1,s(f.trailFall,5)/100*b)),e.uniform1f(A.uSpan,Math.max(1,b-D)),e.uniform1f(A.uWidth,s(f.trailWidth,5)/100*b),e.uniform1f(A.uStart,s(f.trailStart,3)),e.uniform1f(A.uBright,s(f.trailBright,80)/100*1.4),e.uniform1f(A.uSize,10*O*Math.max(.1,s(f.pointSize,100)/100)),e.uniform3f(A.uColor,B[0],B[1],B[2]),e.uniform1f(A.uHalo,.5),e.bindVertexArray(re),e.drawArrays(e.POINTS,0,qe)}if(Ye>0){let D=s(f.tilt,3)*Math.PI/180,H=s(f.lightAngle,160)*Math.PI/180,Ke=Math.cos(H),Je=-Math.sin(H),Qe=.75,be=Math.hypot(Ke,Je,Qe),ft=fe/E-.5,ct=ce/b-.5;e.useProgram(V),e.uniform2f(p.uRes,E,b),e.uniform2f(p.uCenter,me,pe),e.uniform1f(p.uRadius,he),e.uniform1f(p.uTime,le),e.uniform1f(p.uMorph,s(f.morph,30)/500),e.uniform1f(p.uFreq,Math.max(.1,s(f.foldScale,140)/100)),e.uniform1f(p.uAmp,Math.max(0,s(k.fold,60))/100*.42*xe),e.uniform1f(p.uRidge,s(f.ridge,55)/100),e.uniform1f(p.uDetail,s(f.detail,45)/100),e.uniform1f(p.uPit,s(f.pitDepth,40)/100*.3*xe*xe),e.uniform3f(p.uPitDir,ie[0],ie[1],ie[2]),e.uniform2f(p.uRot,D*Math.sin(I*.13)+ft*.3*de,D*.6*Math.sin(I*.09+1)+ct*.25*de),e.uniform3f(p.uLight,Ke/be,Je/be,Qe/be),e.uniform1f(p.uBackDim,w(s(f.backDim,35)/100,0,1)),e.uniform1f(p.uRim,s(f.rim,60)/60),e.uniform1f(p.uThick,s(f.thickness,4)/100),e.uniform1f(p.uPointPx,5.4*O*Math.max(.1,s(f.pointSize,100)/100)),e.uniform1f(p.uIntensity,s(f.shellGlow,55)/40),e.uniform3f(p.uColor,B[0],B[1],B[2]),e.uniform1f(p.uShed,w(s(f.shed,25),0,100)/100*.2),e.uniform2f(p.uMouse,fe,ce),e.uniform1f(p.uHover,We),e.uniform1f(p.uHalo,s(f.halo,35)/100*.15),e.bindVertexArray(Z),e.drawArrays(e.POINTS,0,Ye)}let Xe=w(s(f.grain,0)/100,0,1),$e=w(s(f.vignette,0)/100,0,1);(Xe>0||$e>0)&&(e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(L),e.uniform2f(U.uRes,E,b),e.uniform1f(U.uTime,S/1e3),e.uniform1f(U.uGrain,Xe),e.uniform1f(U.uVignette,$e),e.bindVertexArray(Ae),e.drawArrays(e.TRIANGLES,0,3)),e.bindVertexArray(null)};return ae=requestAnimationFrame(Le),()=>{cancelAnimationFrame(ae),Me.disconnect(),G?.removeEventListener?.("change",Ne),x.removeEventListener("pointermove",z),x.removeEventListener("pointerenter",z),x.removeEventListener("pointerleave",ke),x.removeEventListener("pointerdown",Pe),window.removeEventListener("pointerup",Y),window.removeEventListener("pointercancel",Y),e.deleteBuffer(Q),e.deleteBuffer(ee),e.deleteBuffer(ne),e.deleteVertexArray(Z),e.deleteVertexArray(te),e.deleteVertexArray(re),e.deleteVertexArray(Ae),e.deleteProgram(V),e.deleteProgram(F),e.deleteProgram(P),e.deleteProgram(L)}},[]),Se("div",{ref:c,style:{minWidth:1200,minHeight:800,...h,position:"relative",width:"100%",height:"100%",overflow:"hidden",background:m},children:Se("canvas",{ref:d,style:{position:"absolute",inset:0,width:"100%",height:"100%",display:"block"}})})}tt(at,{background:{type:l.Color,title:"Background",defaultValue:"#000000",description:"Fill behind the particles."},color:{type:l.Color,title:"Color",defaultValue:"#FFFFFF",description:"Highlight colour of the shell and the falling trail."},speed:{type:l.Number,title:"Speed",min:0,max:100,step:1,defaultValue:100,description:"How fast the shell folds and the specks drift. 50 is the reference rate, 0 stops it."},scale:{type:l.Number,title:"Scale",min:50,max:150,step:1,unit:"%",defaultValue:100,description:"How big the shell draws."},fold:{type:l.Number,title:"Fold",min:0,max:100,step:1,defaultValue:100,description:"How deeply the shell crumples into lobes and creases. 0 is a smooth sphere."},density:{type:l.Number,title:"Density",min:20,max:100,step:1,defaultValue:50,description:"How many points make up the shell and the speck field."},hover:{type:l.Number,title:"Hover",min:0,max:100,step:1,unit:"%",defaultValue:100,description:"How strongly the pointer pushes the folds, tilts the shell and gathers specks. 0 is off."},advanced:{type:l.Object,title:"Advanced",description:"Fine tuning for the shell, the speck field and the trail.",controls:{shellCount:{type:l.Number,title:"Shell Points",min:2e3,max:4e4,step:500,defaultValue:32500,description:"Points in the shell at Density 70."},shellSize:{type:l.Number,title:"Shell Size",min:5,max:40,step:1,unit:"%",defaultValue:22,description:"Base shell radius as a share of the stage height."},centerX:{type:l.Number,title:"Center X",min:0,max:100,step:1,unit:"%",defaultValue:50,description:"Horizontal position of the shell."},centerY:{type:l.Number,title:"Center Y",min:0,max:100,step:1,unit:"%",defaultValue:50,description:"Vertical position of the shell."},foldScale:{type:l.Number,title:"Fold Scale",min:30,max:400,step:1,unit:"%",defaultValue:232,description:"Noise frequency: higher gives more, smaller lobes."},ridge:{type:l.Number,title:"Ridges",min:0,max:100,step:1,unit:"%",defaultValue:55,description:"Strength of the sharp creases."},detail:{type:l.Number,title:"Detail",min:0,max:100,step:1,unit:"%",defaultValue:87,description:"Strength of the fine wrinkles."},morph:{type:l.Number,title:"Morph",min:0,max:100,step:1,defaultValue:69,description:"How fast the folds re-form."},breathSec:{type:l.Number,title:"Crumple Cycle",min:4,max:120,step:1,unit:"s",defaultValue:57,description:"Seconds for the shell to crumple and relax again."},breathDepth:{type:l.Number,title:"Crumple Depth",min:0,max:100,step:1,unit:"%",defaultValue:45,description:"How much calmer the shell is at its most relaxed."},pitDepth:{type:l.Number,title:"Pit",min:0,max:100,step:1,unit:"%",defaultValue:56,description:"Depth and darkness of the central pit."},tilt:{type:l.Number,title:"Tilt",min:0,max:20,step:1,unit:"\xB0",defaultValue:7,description:"Slow wobble of the shell."},lightAngle:{type:l.Number,title:"Light Angle",min:0,max:360,step:1,unit:"\xB0",defaultValue:162,description:"Direction the light comes from (0 right, 90 below, 180 left)."},shellGlow:{type:l.Number,title:"Shell Glow",min:0,max:200,step:1,unit:"%",defaultValue:71,description:"Brightness of each shell point."},backDim:{type:l.Number,title:"Back Side",min:0,max:100,step:1,unit:"%",defaultValue:45,description:"Brightness of the far side seen through the shell."},rim:{type:l.Number,title:"Rim",min:0,max:200,step:1,unit:"%",defaultValue:60,description:"Glow along the silhouette."},thickness:{type:l.Number,title:"Thickness",min:0,max:30,step:1,unit:"%",defaultValue:7,description:"Scatter of points off the surface."},pointSize:{type:l.Number,title:"Point Size",min:30,max:300,step:1,unit:"%",defaultValue:77,description:"Size of shell and trail points."},halo:{type:l.Number,title:"Halo",min:0,max:100,step:1,unit:"%",defaultValue:61,description:"Soft bloom around each shell point."},shed:{type:l.Number,title:"Wisps",min:0,max:100,step:1,unit:"%",defaultValue:66,description:"Points peeling off the shell as faint wisps."},speckCount:{type:l.Number,title:"Specks",min:0,max:14e3,step:100,defaultValue:4700,description:"Background specks at Density 70."},speckColor:{type:l.Color,title:"Speck Color",defaultValue:"#C9C7DA",description:"Colour of the background specks."},speckBright:{type:l.Number,title:"Speck Bright",min:0,max:100,step:1,unit:"%",defaultValue:67,description:"Brightness of the background specks."},speckSize:{type:l.Number,title:"Speck Size",min:30,max:300,step:1,unit:"%",defaultValue:93,description:"Size of the background specks."},bands:{type:l.Number,title:"Streams",min:0,max:100,step:1,unit:"%",defaultValue:77,description:"How strongly specks gather into wispy streams."},bandScale:{type:l.Number,title:"Stream Scale",min:20,max:400,step:1,unit:"%",defaultValue:100,description:"How many streams cross the stage."},drift:{type:l.Number,title:"Drift",min:0,max:100,step:1,defaultValue:36,description:"Speck drift speed in tenths of a percent of the width per second."},driftAngle:{type:l.Number,title:"Drift Angle",min:0,max:360,step:1,unit:"\xB0",defaultValue:135,description:"Direction the specks drift (0 right, 90 down)."},twinkle:{type:l.Number,title:"Twinkle",min:0,max:100,step:1,unit:"%",defaultValue:50,description:"How much each speck flickers."},gap:{type:l.Number,title:"Gap",min:0,max:100,step:1,unit:"%",defaultValue:60,description:"How empty the field is around the shell."},trailCount:{type:l.Number,title:"Trail Specks",min:0,max:80,step:1,defaultValue:30,description:"Bright specks falling from the shell."},trailStart:{type:l.Number,title:"Trail Start",min:0,max:20,step:1,unit:"s",defaultValue:3,description:"When the trail begins to fall."},trailFall:{type:l.Number,title:"Trail Fall",min:1,max:40,step:1,unit:"%",defaultValue:5,description:"Fall speed as a share of the height per second."},trailWidth:{type:l.Number,title:"Trail Width",min:1,max:30,step:1,unit:"%",defaultValue:5,description:"Width of the falling column as a share of the height."},trailBright:{type:l.Number,title:"Trail Bright",min:0,max:100,step:1,unit:"%",defaultValue:80,description:"Brightness of the falling specks."},seed:{type:l.Number,title:"Seed",min:1,max:999,step:1,defaultValue:7,description:"Changes the random layout of every point."},grain:{type:l.Number,title:"Grain",min:0,max:100,step:1,unit:"%",defaultValue:0,description:"Film grain over the whole component."},vignette:{type:l.Number,title:"Vignette",min:0,max:100,step:1,unit:"%",defaultValue:0,description:"Darkens the edges."}}}});export{at as default};
