import{a as D,l as i,u as B,b as l,F as m,D as d,d as r,e as A,m as E,k as a,g as x,h as T}from"./vue.esm-bundler-9eb4c8aa.js";import{c as p}from"./index-778010da.js";import"./_commonjsHelpers-725317a4.js";const F={inheritAttrs:!1},N=Object.assign(F,{__name:"Tag",props:{prefixClass:String,suffixClass:String},setup(n){var u,f;const g=n,t=D(),b=t.prefix&&((u=t.prefix())==null?void 0:u.map(s=>i(s.type,{...s.props,class:p("gc-tag-affix gc-tag-prefix",g.prefixClass)},s.children))),y=t.suffix&&((f=t.suffix())==null?void 0:f.map(s=>i(s.type,{...s.props,class:p("gc-tag-affix gc-tag-suffix",g.suffixClass)},s.children))),{class:C,...v}=B();return(s,P)=>(a(),l("div",E(v,{class:r(p)("gc-tag",r(C))}),[(a(!0),l(m,null,d(r(b),(o,c)=>(a(),x(T(o),{key:c}))),128)),A(s.$slots,"default"),(a(!0),l(m,null,d(r(y),(o,c)=>(a(),x(T(o),{key:c}))),128))],16))}}),S=N,U={title:"UI/Tag",tags:["autodocs"],component:S},O=n=>({components:{Tag:S},setup(){return n},template:'<Tag v-bind="args">Tag</Tag>'}),e=O.bind({});e.args={};var _,h,k;e.parameters={...e.parameters,docs:{...(_=e.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
  components: {
    Tag
  },
  setup() {
    return args;
  },
  template: \`<Tag v-bind="args">Tag</Tag>\`
})`,...(k=(h=e.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};const $=["Default"];export{e as Default,$ as __namedExportsOrder,U as default};
//# sourceMappingURL=Tag.stories-7a016a0f.js.map
