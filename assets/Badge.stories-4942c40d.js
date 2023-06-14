import{u as C,a as k,c as N,r as v,d as t,b as d,v as A,x as m,n as D,y as O,e as $,m as g,k as u}from"./vue.esm-bundler-9eb4c8aa.js";import{c as a}from"./index-778010da.js";import"./_commonjsHelpers-725317a4.js";const h={inheritAttrs:!1},j=Object.assign(h,{__name:"Badge",props:{content:[String,Number],badgeClass:String,innerClass:String,badgeStyle:{type:Object,default:()=>({})},maxCount:{type:Number,default:99}},setup(e,{expose:y}){const n=e,{class:o,...c}=C(),B=k(),S=N(()=>typeof n.content!="number"&&typeof n.content!="string"),l=a(S.value?"badge-dot":"badge",n.innerClass),r=v();return y({ref:r}),(x,E)=>t(B).default?(u(),d("span",g({key:0},c,{ref_key:"ref",ref:r,class:t(a)("badge-wrapper",t(o))}),[A("span",{class:D(t(a)(t(l),"badge-inner")),style:O(e.badgeStyle)},m(typeof e.content=="number"&&e.content>e.maxCount?`${e.maxCount}+`:e.content),7),$(x.$slots,"default")],16)):(u(),d("span",g({key:1,ref_key:"ref",ref:r,class:t(a)(t(l),t(o)),style:e.badgeStyle},c),m(e.content),17))}}),p=j,T={title:"UI/Badge",tags:["autodocs"],component:p},z=e=>({components:{Badge:p},setup(){return e},template:'<Badge v-bind="args"></Badge>'}),s=z.bind({});s.args={class:"mr-4 font-semibold",content:"99","inner-class":"bg-red-50 text-red-500"};var i,f,b;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`args => ({
  components: {
    Badge
  },
  setup() {
    return args;
  },
  template: \`<Badge v-bind="args"></Badge>\`
})`,...(b=(f=s.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const U=["Default"];export{s as Default,U as __namedExportsOrder,T as default};
//# sourceMappingURL=Badge.stories-4942c40d.js.map
