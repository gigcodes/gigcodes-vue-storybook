import{c as i}from"./_commonjsHelpers-725317a4.js";function j(r,t){for(var e=-1,n=r==null?0:r.length,a=Array(n);++e<n;)a[e]=t(r[e],e,r);return a}var v=j,m=typeof i=="object"&&i&&i.Object===Object&&i,d=m,u=d,p=typeof self=="object"&&self&&self.Object===Object&&self,$=u||p||Function("return this")(),O=$,_=O,h=_.Symbol,b=h,s=b,S=Object.prototype,w=S.hasOwnProperty,G=S.toString,o=s?s.toStringTag:void 0;function A(r){var t=w.call(r,o),e=r[o];try{r[o]=void 0;var n=!0}catch{}var a=G.call(r);return n&&(t?r[o]=e:delete r[o]),a}var P=A,k=Object.prototype,I=k.toString;function L(r){return I.call(r)}var M=L,c=b,N=P,R=M,x="[object Null]",F="[object Undefined]",f=c?c.toStringTag:void 0;function U(r){return r==null?r===void 0?F:x:f&&f in Object(r)?N(r):R(r)}var Y=U,q=Array.isArray,z=q;function B(r){return r!=null&&typeof r=="object"}var C=B,D=Y,E=C,H="[object Symbol]";function J(r){return typeof r=="symbol"||E(r)&&D(r)==H}var K=J,g=b,Q=v,V=z,W=K,X=1/0,l=g?g.prototype:void 0,y=l?l.toString:void 0;function T(r){if(typeof r=="string")return r;if(V(r))return Q(r,T)+"";if(W(r))return y?y.call(r):"";var t=r+"";return t=="0"&&1/r==-X?"-0":t}var Z=T,rr=Z;function tr(r){return r==null?"":rr(r)}var nr=tr;export{O as _,v as a,b,C as c,z as d,Y as e,d as f,K as i,nr as t};
//# sourceMappingURL=toString-c1be95cc.js.map
