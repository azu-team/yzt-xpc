(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/idConfirm/signIn"],{"34b6":function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"b",function(){return i}),n.d(t,"c",function(){return o}),n.d(t,"a",function(){return a})},"5d38":function(e,t,n){"use strict";(function(e){function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),a.forEach(function(t){i(e,t,n[t])})}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){return n.e("components/xfl-select/xfl-select").then(n.bind(null,"eeee"))},r={components:{mySelect:o},data:function(){return{tempFilePath:"",form:{SFZH:"",ZYSFLX:"2",XM:"",ESN:"",RLSJ:""},list:[{value:"学生",id:"1"},{value:"家长",id:"2"},{value:"老师",id:"3"},{value:"行政管理人员",id:"4"}]}},methods:{handleSelectChange:function(e){e.index,e.newVal,e.oldVal;var t=e.orignItem;this.form.ZYSFLX=t.id},handleLogin:function(e){},handleConfirm:function(){var t=this;this.form.ESN?e.chooseImage({count:1,success:function(n){var a=n.tempFilePaths,i=n.tempFiles;i[0].size<40960?(t.tempFilePath=a[0],e.getFileSystemManager().readFile({filePath:a[0],encoding:"base64",success:function(e){t.form.RLSJ="data:image/jpeg;base64,"+e.data,t.sendData()}})):e.showToast({title:"文件大小要小于40k",icon:"none",duration:3e3})}}):this.sendData()},sendData:function(){var t=this;this.$HTTP({url:"/UserAuth/register",params:a({},this.form,{USERID:e.getStorageSync("userId")}),successCallback:function(n){var a=n.data;if("0"!=a.code)if("0000"==a.code){var i=a.data;"0"==i.state&&(e.setStorageSync("userInfo",i),e.setStorageSync("idType",i.zysflb),e.navigateBack())}else e.showToast({title:a.code+" : "+a.msg,icon:"none",duration:3e3});else t.$emit("switchStatus",t.form.ZYSFLX)}})},judgeAuthSetting:function(){e.getSetting({success:function(e){e.authSetting["scope.userInfo"]}})},register:function(){var t=e.createCameraContext();t.takePhoto({quality:"high",success:function(e){}})}}};t.default=r}).call(this,n("543d")["default"])},e1bd:function(e,t,n){"use strict";n.r(t);var a=n("5d38"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=i.a},e45f:function(e,t,n){},eb42:function(e,t,n){"use strict";n.r(t);var a=n("34b6"),i=n("e1bd");for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);n("fc1d");var r,c=n("f0c5"),u=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"dc625192",null,!1,a["a"],r);t["default"]=u.exports},fc1d:function(e,t,n){"use strict";var a=n("e45f"),i=n.n(a);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/idConfirm/signIn-create-component',
    {
        'pages/idConfirm/signIn-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("eb42"))
        })
    },
    [['pages/idConfirm/signIn-create-component']]
]);