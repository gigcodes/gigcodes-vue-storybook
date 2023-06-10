import{o as p,f as $,g as v,u as Q,a as Y,l as x,b as i,e as n,k as ee,j as d,E as u,q as te,m as ae,v as oe}from"./vue.esm-bundler-debd4251.js";import{a as l,D as re,C as s}from"./constant-c86932b1.js";import{S as V}from"./Spinner-46ef9b89.js";import{c as g}from"./index-778010da.js";import"./_commonjsHelpers-725317a4.js";function ne(t,e){return p(),$("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true"},[v("path",{d:"M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z"}),v("path",{d:"M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z"}),v("path",{d:"M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z"})])}function se(t){const e=["50","100","200","300","400","500","600","700","800","900"],c=e.indexOf(t==null?void 0:t.toString());function m(y){if(c===0||c===e.length-1)return t;if(y==="decrement")return e[c-1];if(y==="increment")return e[c+1]}const o=m("decrement");return[m("increment"),o]}const le=["disabled"],ce={key:0,class:"flex items-center justify-center"},ie={key:3,class:"flex items-center justify-center"},de={class:"text-lg"},ue={class:"ltr:ml-1 rtl:mr-1"},ge=oe({inheritAttrs:!1}),pe="button",C="inline-flex items-center justify-center",be="opacity-50 cursor-not-allowed",fe=Object.assign(ge,{__name:"Button",props:{disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},block:{type:Boolean,default:!1},active:{type:Boolean,default:!1},shape:{type:String,default:"round",validator(t){return["round","circle","none"].includes(t)}},size:{type:String,validator(t){return[l.LG,l.SM,l.XS,l.MD].includes(t)}},variant:{type:String,default:"default",validator(t){return["solid","twoTone","plain","default"].includes(t)}},color:{type:String,default:""}},setup(t){var L,A;const e=t,{class:c,...m}=Q(),o=Y(),{themeColor:S,controlSize:y,primaryColorLevel:D}=x("config",re),G=(L=x("form",{}))==null?void 0:L.size,W=(A=x("inputGroup",{}))==null?void 0:A.size,w=i(()=>e.color.split("-")),F=i(()=>e.size||W||G||y),r=i(()=>w.value[0]||S),k=i(()=>w.value[1]||D),[z,U]=se(k),X=i(()=>{let a="";switch(F.value){case l.LG:a=g(`h-${s.lg}`,e.icon&&!o.default?`w-${s.lg} ${C} text-2xl`:"px-8 py-2 text-base");break;case l.SM:a=g(`h-${s.sm}`,e.icon&&!o.default?`w-${s.sm} ${C} text-lg`:"px-3 py-2 text-sm");break;case l.XS:a=g(`h-${s.xs}`,e.icon&&!o.default?`w-${s.xs} ${C} text-base`:"px-3 py-1 text-xs");break;default:a=g(`h-${s.md}`,e.icon&&!o.default?`w-${s.md} ${C} text-xl`:"px-8 py-2");break}return a}),Z=()=>{const a={bgColor:e.active?`bg-${r.value}-${z}`:`bg-${r.value}-${k.value}`,textColor:"text-white",hoverColor:e.active?"":`hover:bg-${r.value}-${U}`,activeColor:`active:bg-${r.value}-${z}`};return h(a)},q=()=>{const a={bgColor:e.active?`bg-${r.value}-200 dark:bg-${r.value}-50`:`bg-${r.value}-50 dark:bg-${r.value}-500 dark:bg-opacity-20`,textColor:`text-${r.value}-${k.value} dark:text-${r.value}-50`,hoverColor:e.active?"":`hover:bg-${r.value}-100 dark:hover:bg-${r.value}-500 dark:hover:bg-opacity-30`,activeColor:`active:bg-${r.value}-200 dark:active:bg-${r.value}-500 dark:active:bg-opacity-40`};return h(a)},I=()=>{const a={bgColor:e.active?"bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:border-gray-500":"bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700",textColor:"text-gray-600 dark:text-gray-100",hoverColor:e.active?"":"hover:bg-gray-50 dark:hover:bg-gray-600",activeColor:"active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500"};return h(a)},P=()=>{const a={bgColor:e.active?"bg-gray-100 dark:bg-gray-500":"bg-transparent border border-transparent",textColor:"text-gray-600 dark:text-gray-100",hoverColor:e.active?"":"hover:bg-gray-50 dark:hover:bg-gray-600",activeColor:"active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500"};return h(a)},h=({bgColor:a,hoverColor:T,activeColor:J,textColor:K})=>`${a} ${e.disabled||e.loading?be:T+" "+J} ${K}`,R=()=>{switch(e.variant){case"solid":return Z();case"twoTone":return q();case"plain":return P();case"default":return I();default:return I()}},H=i(()=>g(pe,R(),`radius-${e.shape}`,X.value,c,e.block?"w-full":""));return(a,T)=>(p(),$("button",ae(m,{disabled:t.disabled||t.loading,class:H.value}),[t.loading&&n(o).default?(p(),$("span",ce,[ee(n(V),{"enable-theme":!1,class:"mr-1"}),d(a.$slots,"default")])):u("",!0),n(o).icon&&!n(o).default&&t.loading?(p(),te(n(V),{key:1,"enable-theme":!1})):u("",!0),!n(o).default&&!t.loading?d(a.$slots,"icon",{key:2}):u("",!0),n(o).icon&&n(o).default&&!t.loading?(p(),$("span",ie,[v("span",de,[d(a.$slots,"icon")]),v("span",ue,[d(a.$slots,"default")])])):u("",!0),!n(o).icon&&n(o).default&&!t.loading?d(a.$slots,"default",{key:4}):u("",!0)],16,le))}}),B=fe,xe={title:"UI/Button",tags:["autodocs"],component:B,argTypes:{variant:{control:{type:"select"},options:["solid","twoTone","plain","default"],defaultValue:"default"},size:{control:{type:"select"},options:["lg","md","sm","xs"],defaultValue:"md"},shape:{control:{type:"select"},options:["round","circle","none"],defaultValue:"round"},color:{description:"Tailwind class for color",control:{type:"text"}},disabled:{control:"boolean",defaultValue:!1},loading:{control:"boolean",defaultValue:!1},block:{control:"boolean",defaultValue:!1},active:{control:"boolean",defaultValue:!1},icon:{control:!1,description:"Icon component to be passed"}}},ve=t=>({components:{Button:B},setup(){return t},template:'<Button v-bind="args">Button</Button>'}),b=ve.bind({});b.args={variant:"default",size:"md",default:"Button",shape:"round",color:"blue-600",disabled:!1,loading:!1,block:!1,active:!1};const me=t=>({components:{Button:B,AcademicCapIcon:ne},setup(){return t},template:'<Button v-bind="args"><template #icon><AcademicCapIcon class="h-4" /></template> With Icon </Button>'}),f=me.bind({});f.args={variant:"default",size:"md",shape:"round",color:"blue-600",disabled:!1,loading:!1,block:!1,active:!1};var _,N,j;b.parameters={...b.parameters,docs:{...(_=b.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
  components: {
    Button
  },
  setup() {
    return args;
  },
  template: \`<Button v-bind="args">Button</Button>\`
})`,...(j=(N=b.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var E,M,O;f.parameters={...f.parameters,docs:{...(E=f.parameters)==null?void 0:E.docs,source:{originalSource:`args => ({
  components: {
    Button,
    AcademicCapIcon
  },
  setup() {
    return args;
  },
  template: \`<Button v-bind="args"><template #icon><AcademicCapIcon class="h-4" /></template> With Icon </Button>\`
})`,...(O=(M=f.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};const Be=["Default","WithIcon"];export{b as Default,f as WithIcon,Be as __namedExportsOrder,xe as default};
//# sourceMappingURL=Button.stories-7f52d6d5.js.map
