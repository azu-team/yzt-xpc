(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0cd4":function(t,e,i){"use strict";(function(t){i("8a1b"),i("921b");n(i("66fd"));var e=n(i("7f26"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"18f0":function(t,e,i){"use strict";var n=i("fec8"),a=i.n(n);a.a},"64e7":function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement;t._self._c},c=[];i.d(e,"b",function(){return a}),i.d(e,"c",function(){return c}),i.d(e,"a",function(){return n})},"72d2":function(t,e,i){"use strict";i.r(e);var n=i("ef84"),a=i.n(n);for(var c in n)"default"!==c&&function(t){i.d(e,t,function(){return n[t]})}(c);e["default"]=a.a},"7f26":function(t,e,i){"use strict";i.r(e);var n=i("64e7"),a=i("72d2");for(var c in a)"default"!==c&&function(t){i.d(e,t,function(){return a[t]})}(c);i("18f0");var s,o=i("f0c5"),p=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"5d43b737",null,!1,n["a"],s);e["default"]=p.exports},ef84:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{hasUserInfo:!1,idType:"1"}},onShow:function(){var e=t.getStorageSync("idType");e&&"1"==e&&(e="2"),e!=this.idType&&(this.idType=e||"1")},mounted:function(){this.getOpenId()},computed:{moduleArr:function(){var t={1:[{name:"身份认证",imgUrl:"../../static/mp-weixin/pic1.png",path:"/pages/idConfirm/idConfirm"}],2:[{name:"个人信息",imgUrl:"../../static/mp-weixin/pic2.png",path:"/pages/idConfirm/baseInfo"},{name:"学生每日健康打卡",imgUrl:"../../static/mp-weixin/pic2.png",path:"/pages/healthCard/healthCard"},{name:"在线学习",imgUrl:"../../static/mp-weixin/pic3.png",path:"/pages/stu/stuLearning"},{name:"查看学习情况",imgUrl:"../../static/mp-weixin/pic4.png",path:"/pages/stu/stuStatus"},{name:"一键求助",imgUrl:"../../static/mp-weixin/pic3.png",path:"/pages/common/quickHelp"},{name:"健康情况收集",imgUrl:"../../static/mp-weixin/pic4.png",path:"/pages/common/healthStatus"},{name:"安全情况",imgUrl:"../../static/mp-weixin/pic1.png",path:"/pages/common/safeStatus"}],3:[{name:"个人信息",imgUrl:"../../static/mp-weixin/pic2.png",path:"/pages/idConfirm/baseInfo"},{name:"在线授课",imgUrl:"../../static/mp-weixin/pic2.png",path:"/pages/teacher/teaTeaching"},{name:"查看授课情况",imgUrl:"../../static/mp-weixin/pic3.png",path:"/pages/teacher/teaStatistic"}],4:[{name:"个人信息",imgUrl:"../../static/mp-weixin/pic2.png",path:"/pages/idConfirm/baseInfo"},{name:"查看与统计所辖区域授课情况",imgUrl:"../../static/mp-weixin/pic4.png",path:"/pages/edu/eduTeachingStatistic"},{name:"查看与统计所辖区域学习情况",imgUrl:"../../static/mp-weixin/pic1.png",path:"/pages/edu/eduLearningStatistic"}]};return t[this.idType]}},methods:{getOpenId:function(){var e=this;t.login({provider:"weixin",success:function(i){var n=i.code;e.$HTTP({url:"/UserAuth/openid",params:{code:n},successCallback:function(i){var n=i.data;if("0"==n.code){var a=n.data;t.setStorageSync("userId",a.userId),"0"==a.state?(t.setStorageSync("userInfo",a),t.setStorageSync("idType",a.zysflb),e.idType=a.zysflb):"1"==a.state&&t.navigateTo({url:"/pages/idConfirm/idConfirm"})}else t.showToast({title:n.msg,icon:"none"})},failCallback:function(e){e.data;t.showToast({title:"非合法域名",icon:"none"})}})},fail:function(){t.showToast({title:"微信获取信息失败",icon:"none"})}})},handleUserOut:function(){t.removeStorageSync("idType"),this.idType=1},handleNavTo:function(e){t.navigateTo({url:e.path})}}};e.default=i}).call(this,i("543d")["default"])},fec8:function(t,e,i){}},[["0cd4","common/runtime","common/vendor"]]]);