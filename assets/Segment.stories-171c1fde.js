import{u as h,l as r,d as z,b as m,p as A,f as I,j as N,m as G,e as p,o as D}from"./vue.esm-bundler-debd4251.js";import{S as n,D as C}from"./constant-c86932b1.js";import{c as O}from"./index-778010da.js";import"./_commonjsHelpers-725317a4.js";const P={inheritAttrs:!1},U=Object.assign(P,{__name:"Segment",props:{modelValue:[Array,String],selectionType:{type:String,default:n.SINGLE,validator(t){return[n.SINGLE,n.MULTIPLE].includes(t)}},size:String},emits:["update:modelValue"],setup(t,{emit:l}){var c,u;const e=t,{class:v,...y}=h(),T=(c=r("form",{}))==null?void 0:c.size,V=(u=r("inputGroup",{}))==null?void 0:u.size,{controlSize:_}=r("config",C),s=z(e.modelValue),E=o=>{s.value=o,l("update:modelValue",s.value)},L=o=>{e.selectionType===n.MULTIPLE&&(s.value=s.value.filter(i=>i!==o),l("update:modelValue",s.value))},b=m(()=>e.selectionType===n.SINGLE?e.modelValue&&typeof e.modelValue=="string"?[e.modelValue]:e.modelValue&&Array.isArray(e.modelValue)?e.modelValue:[]:e.modelValue??[]);return A("segment",{value:b,onActive:E,onDeactivate:L,selectionType:e.selectionType,size:m(()=>e.size||V||T||_)}),(o,i)=>(D(),I("div",G({class:p(O)("segment",p(v))},y),[N(o.$slots,"default")],16))}}),S=U,M={title:"UI/Segment",tags:["autodocs"],component:S,argTypes:{value:{control:"boolean",defaultValue:!1,description:"To set the field checked or not"},onChange:{control:!1,description:"This event is triggered on change",table:{category:"Events",type:{summary:null}}},onFocus:{control:!1,description:"This event is triggered on focus",table:{category:"Events",type:{summary:null}}}}},j=t=>({components:{Segment:S},setup(){return t},template:`
    <Segment v-bind="args"></Segment>`}),a=j.bind({});a.args={};var d,g,f;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
  components: {
    Segment
  },
  setup() {
    return args;
  },
  template: \`
    <Segment v-bind="args"></Segment>\`
})`,...(f=(g=a.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};const Y=["Default"];export{a as Default,Y as __namedExportsOrder,M as default};
//# sourceMappingURL=Segment.stories-171c1fde.js.map
