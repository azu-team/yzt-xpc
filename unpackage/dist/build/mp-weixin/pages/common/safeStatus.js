(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/common/safeStatus"],{5965:function(e,n,a){"use strict";var t,u=function(){var e=this,n=e.$createElement;e._self._c},c=[];a.d(n,"b",function(){return u}),a.d(n,"c",function(){return c}),a.d(n,"a",function(){return t})},"762d":function(e,n,a){},b31e:function(e,n,a){"use strict";var t=a("762d"),u=a.n(t);u.a},b55d:function(e,n,a){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{form:{additionalProp1:"0",additionalProp2:"0"},list1:[{value:"0",name:"被盗",checked:!0},{value:"1",name:"人身伤害"},{value:"2",name:"大量聚集"}],list2:[{value:"0",name:"红"},{value:"1",name:"橙"},{value:"2",name:"黄"},{value:"3",name:"蓝"}],list3:[{value:"0",name:"本地居家隔离"},{value:"1",name:"返程后居家隔离"},{value:"2",name:"封路暂时不能返程"},{value:"3",name:"其余原因不能返程"}],list4:[{value:"0",name:"安全"},{value:"1",name:"低风险"},{value:"2",name:"高风险"},{value:"3",name:"未知"}]}},onLoad:function(e){},methods:{handleRadioChange:function(e,n){this.form[n]=e.target.value},send:function(){var n=JSON.stringify({userid:"123",results:this.form});this.$HTTP({url:"/campusapp/userhealth/answer",root:"http://61.132.95.169:10105",params:n,successCallback:function(n){console.log(n,"res"),e.showToast({title:"提交成功!"})}})}}};n.default=a}).call(this,a("543d")["default"])},c329:function(e,n,a){"use strict";(function(e){a("30c6"),a("921b");t(a("66fd"));var n=t(a("c766"));function t(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,a("543d")["createPage"])},c766:function(e,n,a){"use strict";a.r(n);var t=a("5965"),u=a("ce9e");for(var c in u)"default"!==c&&function(e){a.d(n,e,function(){return u[e]})}(c);a("b31e");var o,l=a("f0c5"),r=Object(l["a"])(u["default"],t["b"],t["c"],!1,null,"56c58ce3",null,!1,t["a"],o);n["default"]=r.exports},ce9e:function(e,n,a){"use strict";a.r(n);var t=a("b55d"),u=a.n(t);for(var c in t)"default"!==c&&function(e){a.d(n,e,function(){return t[e]})}(c);n["default"]=u.a}},[["c329","common/runtime","common/vendor"]]]);