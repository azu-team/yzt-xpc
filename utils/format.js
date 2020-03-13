import Vue from 'vue'
Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		S: this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(this.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
			);
	return fmt;
};

Vue.prototype.$tranform_code2name = function(arr, target) {
	if (!arr.length) return ''
	let result = ''
	arr.forEach((item, index) => {
		if (item.id == target) {
			result = item.value
		}
	})
	return result;
}


import amap from './amap-wx.js';
let amapPlugin = new amap.AMapWX({
	key: 'ce334d5499fb668332c1a65513a54201'
});
Vue.prototype.$getLocationByAmap = function() {
	return new Promise((resolve, reject) => {
		amapPlugin.getRegeo({
			success: data => {
				console.log(data)
				resolve(data)
			},
			fail: (err) => {
				uni.getSetting({
						success:info => {
						if(info.authSetting['scope.userLocation']){
							uni.showToast({
								title:'当前定位服务未打开',
								icon:'none'
							})
						}else{
							uni.showToast({
								title:'当前定位权限未开启',
								icon:'none'
							})
						}
					}
				})
				reject(err)
			}
		});
	})
}
