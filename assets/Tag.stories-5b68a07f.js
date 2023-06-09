import{a as B,h as i,u as D,f as l,F as m,v as d,e as r,j,m as A,o as a,l as x,p as T}from"./vue.esm-bundler-1b210534.js";import{c as p}from"./index-778010da.js";import"./_commonjsHelpers-725317a4.js";const E={inheritAttrs:!1},F=Object.assign(E,{__name:"Tag",props:{prefixClass:String,suffixClass:String},setup(n){var f,g;const u=n,t=B(),v=t.prefix&&((f=t.prefix())==null?void 0:f.map(s=>i(s.type,{...s.props,class:p("gc-tag-affix gc-tag-prefix",u.prefixClass)},s.children))),y=t.suffix&&((g=t.suffix())==null?void 0:g.map(s=>i(s.type,{...s.props,class:p("gc-tag-affix gc-tag-suffix",u.suffixClass)},s.children))),{class:C,...b}=D();return(s,O)=>(a(),l("div",A(b,{class:r(p)("gc-tag",r(C))}),[(a(!0),l(m,null,d(r(v),(o,c)=>(a(),x(T(o),{key:c}))),128)),j(s.$slots,"default"),(a(!0),l(m,null,d(r(y),(o,c)=>(a(),x(T(o),{key:c}))),128))],16))}}),k=F,U={title:"UI/Tag",tags:["autodocs"],component:k},N=n=>({components:{Tag:k},setup(){return n},template:'<Tag v-bind="args">Tag</Tag>'}),e=N.bind({});e.args={};var _,S,h;e.parameters={...e.parameters,docs:{...(_=e.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
  components: {
    Tag
  },
  setup() {
    return args;
  },
  template: \`<Tag v-bind="args">Tag</Tag>\`
})`,...(h=(S=e.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const $=["Default"];export{e as Default,$ as __namedExportsOrder,U as default};
//# sourceMappingURL=Tag.stories-5b68a07f.js.map
