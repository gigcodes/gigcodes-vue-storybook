import{B as n}from"./Button-e2e4bf53.js";import{k as d,b as p,v as a}from"./vue.esm-bundler-9eb4c8aa.js";import"./constant-dee45eb4.js";import"./Spinner-5089a4ca.js";import"./index-778010da.js";import"./_commonjsHelpers-725317a4.js";function m(o,B){return d(),p("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true"},[a("path",{d:"M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z"}),a("path",{d:"M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z"}),a("path",{d:"M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z"})])}const w={title:"UI/Button",tags:["autodocs"],component:n,argTypes:{variant:{control:{type:"select"},options:["solid","twoTone","plain","default"],defaultValue:"default"},size:{control:{type:"select"},options:["lg","md","sm","xs"],defaultValue:"md"},shape:{control:{type:"select"},options:["round","circle","none"],defaultValue:"round"},color:{description:"Tailwind class for color",control:{type:"text"}},disabled:{control:"boolean",defaultValue:!1},loading:{control:"boolean",defaultValue:!1},block:{control:"boolean",defaultValue:!1},active:{control:"boolean",defaultValue:!1},icon:{control:!1,description:"Icon component to be passed"}}},f=o=>({components:{Button:n},setup(){return o},template:'<Button v-bind="args">Button</Button>'}),t=f.bind({});t.args={variant:"default",size:"md",default:"Button",shape:"round",color:"blue-600",disabled:!1,loading:!1,block:!1,active:!1};const g=o=>({components:{Button:n,AcademicCapIcon:m},setup(){return o},template:'<Button v-bind="args"><template #icon><AcademicCapIcon class="h-4" /></template> With Icon </Button>'}),e=g.bind({});e.args={variant:"default",size:"md",shape:"round",color:"blue-600",disabled:!1,loading:!1,block:!1,active:!1};var s,l,r;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`args => ({
  components: {
    Button
  },
  setup() {
    return args;
  },
  template: \`<Button v-bind="args">Button</Button>\`
})`,...(r=(l=t.parameters)==null?void 0:l.docs)==null?void 0:r.source}}};var c,u,i;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  components: {
    Button,
    AcademicCapIcon
  },
  setup() {
    return args;
  },
  template: \`<Button v-bind="args"><template #icon><AcademicCapIcon class="h-4" /></template> With Icon </Button>\`
})`,...(i=(u=e.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};const x=["Default","WithIcon"];export{t as Default,e as WithIcon,x as __namedExportsOrder,w as default};
//# sourceMappingURL=Button.stories-168f9d24.js.map
