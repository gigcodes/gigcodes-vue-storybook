import{I as n}from"./Input-a0010c67.js";import"./vue.esm-bundler-9eb4c8aa.js";import"./constant-dee45eb4.js";import"./lodash-9252d092.js";import"./_commonjsHelpers-725317a4.js";import"./index-778010da.js";const m={title:"UI/Input",tags:["autodocs"],component:n,argTypes:{placeholder:{control:"text",defaultValue:"placeholder",description:"Placeholder for input",table:{category:"Text"}},size:{control:{type:"select"},defaultValue:"md",options:["lg","md","sm"],table:{category:"Sizes"}},invalid:{control:"boolean",defaultValue:!1,description:"To set the field invalid or not"},disabled:{control:"boolean",defaultValue:!1,description:"To set the field is diabled or not"},unstyle:{control:"boolean",defaultValue:!1},type:{control:{type:"select"},defaultValue:"text",options:["textarea","button","checkbox","color","date","datetime-local","email","file","hidden","image","month","password","radio","range","reset","search","submit","text","time","url","week"],table:{category:"Text"}},onBlur:{control:!1,description:"This event is triggered on blur",table:{category:"Events",type:{summary:null}}},onChange:{control:!1,description:"This event is triggered on change",table:{category:"Events",type:{summary:null}}},onFocus:{control:!1,description:"This event is triggered on focus",table:{category:"Events",type:{summary:null}}}}},l=r=>({components:{Input:n},setup(){return r},template:`
    <Input v-bind="args"></Input>`}),e=l.bind({});e.args={};var t,o,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`args => ({
  components: {
    Input
  },
  setup() {
    return args;
  },
  template: \`
    <Input v-bind="args"></Input>\`
})`,...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const g=["Default"];export{e as Default,g as __namedExportsOrder,m as default};
//# sourceMappingURL=Input.stories-38aae1b4.js.map
