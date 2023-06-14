import{u as h,i as r,r as z,c as m,B as A,b as I,e as N,m as G,d as p,k as D}from"./vue.esm-bundler-9eb4c8aa.js";import{a as o,D as k}from"./constant-dee45eb4.js";import{c as C}from"./index-778010da.js";import"./_commonjsHelpers-725317a4.js";const O={inheritAttrs:!1},P=Object.assign(O,{__name:"Segment",props:{modelValue:[Array,String],selectionType:{type:String,default:o.SINGLE,validator(t){return[o.SINGLE,o.MULTIPLE].includes(t)}},size:String},emits:["update:modelValue"],setup(t,{emit:l}){var c,i;const e=t,{class:v,...y}=h(),T=(c=r("form",{}))==null?void 0:c.size,V=(i=r("inputGroup",{}))==null?void 0:i.size,{controlSize:_}=r("config",k),s=z(e.modelValue),E=n=>{s.value=n,l("update:modelValue",s.value)},L=n=>{e.selectionType===o.MULTIPLE&&(s.value=s.value.filter(u=>u!==n),l("update:modelValue",s.value))},b=m(()=>e.selectionType===o.SINGLE?e.modelValue&&typeof e.modelValue=="string"?[e.modelValue]:e.modelValue&&Array.isArray(e.modelValue)?e.modelValue:[]:e.modelValue??[]);return A("segment",{value:b,onActive:E,onDeactivate:L,selectionType:e.selectionType,size:m(()=>e.size||V||T||_)}),(n,u)=>(D(),I("div",G({class:p(C)("segment",p(v))},y),[N(n.$slots,"default")],16))}}),S=P,M={title:"UI/Segment",tags:["autodocs"],component:S,argTypes:{value:{control:"boolean",defaultValue:!1,description:"To set the field checked or not"},onChange:{control:!1,description:"This event is triggered on change",table:{category:"Events",type:{summary:null}}},onFocus:{control:!1,description:"This event is triggered on focus",table:{category:"Events",type:{summary:null}}}}},U=t=>({components:{Segment:S},setup(){return t},template:`
    <Segment v-bind="args"></Segment>`}),a=U.bind({});a.args={};var d,g,f;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
  components: {
    Segment
  },
  setup() {
    return args;
  },
  template: \`
    <Segment v-bind="args"></Segment>\`
})`,...(f=(g=a.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};const Y=["Default"];export{a as Default,Y as __namedExportsOrder,M as default};
//# sourceMappingURL=Segment.stories-56a3631d.js.map
