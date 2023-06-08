import{d as u,u as p,l as d,m as k,e as s,p as f,o as g}from"./vue.esm-bundler-a6102adf.js";import{c as S}from"./index-778010da.js";import"./_commonjsHelpers-725317a4.js";const h={inheritAttrs:!1},b=Object.assign(h,{__name:"Skeleton",props:{asElement:{type:String,default:"span"},variant:{type:String,default:"block",validator(e){return["circle","block"].includes(e)}},height:[String,Number],width:[String,Number],animation:{type:Boolean,default:!0}},setup(e,{expose:c}){const n=u(null),{class:i,...m}=p();return c({ref:n}),(y,x)=>(g(),d(f(e.asElement),k(m,{ref_key:"ref",ref:n,class:s(S)("skeleton",e.variant==="circle"&&"skeleton-circle",e.variant==="block"&&"skeleton-block",e.animation&&"animate-pulse",s(i)),style:{height:`${e.height}px`,width:`${e.width}px`}}),null,16,["class","style"]))}}),l=b,w={title:"UI/Skeleton",tags:["autodocs"],component:l},v=e=>({components:{Skeleton:l},setup(){return e},template:'<Skeleton v-bind="args">Button</Skeleton>'}),t=v.bind({});t.args={};var a,r,o;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`args => ({
  components: {
    Skeleton
  },
  setup() {
    return args;
  },
  template: \`<Skeleton v-bind="args">Button</Skeleton>\`
})`,...(o=(r=t.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};const D=["Default"];export{t as Default,D as __namedExportsOrder,w as default};
//# sourceMappingURL=Skeleton.stories-82874fd4.js.map
