import{u as x,a as k,b as N,d as j,e as t,f as d,g as v,t as m,n as A,i as D,j as O,m as g,o as u}from"./vue.esm-bundler-a6102adf.js";import{c as a}from"./index-778010da.js";import"./_commonjsHelpers-725317a4.js";const $={inheritAttrs:!1},h=Object.assign($,{__name:"Badge",props:{content:[String,Number],badgeClass:String,innerClass:String,badgeStyle:{type:Object,default:()=>({})},maxCount:{type:Number,default:99}},setup(e,{expose:y}){const n=e,{class:o,...c}=x(),B=k(),S=N(()=>typeof n.content!="number"&&typeof n.content!="string"),l=a(S.value?"badge-dot":"badge",n.innerClass),r=j();return y({ref:r}),(C,E)=>t(B).default?(u(),d("span",g({key:0},c,{ref_key:"ref",ref:r,class:t(a)("badge-wrapper",t(o))}),[v("span",{class:A(t(a)(t(l),"badge-inner")),style:D(e.badgeStyle)},m(typeof e.content=="number"&&e.content>e.maxCount?`${e.maxCount}+`:e.content),7),O(C.$slots,"default")],16)):(u(),d("span",g({key:1,ref_key:"ref",ref:r,class:t(a)(t(l),t(o)),style:e.badgeStyle},c),m(e.content),17))}}),p=h,T={title:"UI/Badge",tags:["autodocs"],component:p},z=e=>({components:{Badge:p},setup(){return e},template:'<Badge v-bind="args"></Badge>'}),s=z.bind({});s.args={class:"mr-4 font-semibold",content:"99","inner-class":"bg-red-50 text-red-500"};var i,f,b;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`args => ({
  components: {
    Badge
  },
  setup() {
    return args;
  },
  template: \`<Badge v-bind="args"></Badge>\`
})`,...(b=(f=s.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const U=["Default"];export{s as Default,U as __namedExportsOrder,T as default};
//# sourceMappingURL=Badge.stories-35d6f524.js.map
