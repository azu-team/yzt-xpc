(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/common/healthStatusAdd"],{"03be":function(e,t,n){"use strict";var a=n("c55f"),u=n.n(a);u.a},"72d5":function(e,t,n){"use strict";(function(e){function n(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},u=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(u=u.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),u.forEach(function(t){a(e,t,n[t])})}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u={data:function(){return{region:"选择位置",form:{field02:"0",field05:"0"},list1:[{value:"0",name:"健康",checked:!0},{value:"1",name:"有发烧咳嗽等症状"},{value:"2",name:"无发烧但有咳嗽胸闷等症状"},{value:"3",name:"无发烧但有其他症状"},{value:"4",name:"其他"}],list2:[{value:"0",name:"有确诊病历"},{value:"1",name:"有长途行程"},{value:"2",name:"在重点疫区"}]}},onLoad:function(e){},mounted:function(){},methods:{handleRadioChange:function(e,t){this.form[t]=e.target.value},send:function(){var t=n({},this.form,{field01:e.getStorageSync("userId")});this.$HTTP({url:"/healthCollect/save",params:t,successCallback:function(t){var n=t.data;0==n.code?(e.showToast({title:"提交成功!"}),setTimeout(function(){e.navigateBack()},1500)):e.showToast({title:n.msg,icon:"none"})}})}}};t.default=u}).call(this,n("543d")["default"])},8635:function(e,t,n){"use strict";n.r(t);var a=n("a7e0"),u=n("f0f8");for(var o in u)"default"!==o&&function(e){n.d(t,e,function(){return u[e]})}(o);n("03be");var r,c=n("f0c5"),f=Object(c["a"])(u["default"],a["b"],a["c"],!1,null,"86917fc0",null,!1,a["a"],r);t["default"]=f.exports},a7e0:function(e,t,n){"use strict";var a,u=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"b",function(){return u}),n.d(t,"c",function(){return o}),n.d(t,"a",function(){return a})},c55f:function(e,t,n){},f0f8:function(e,t,n){"use strict";n.r(t);var a=n("72d5"),u=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/common/healthStatusAdd-create-component',
    {
        'pages/common/healthStatusAdd-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8635"))
        })
    },
    [['pages/common/healthStatusAdd-create-component']]
]);