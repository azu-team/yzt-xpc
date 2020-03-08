import {
	http_root
} from './config.js'

let api = function({
	url,
	root = http_root,
	method = 'POST',
	header,
	params = {},
	successCallback,
	failCallback,
	completeCallback,
	showLoading=true,
}) {
	if(showLoading){
		uni.showLoading()
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: root + url,
			method: method.toUpperCase(),
			data:params,
			header: header || {
				'content-type': "application/json"
			},
			success: res => {
				if(showLoading){
					uni.hideLoading()
				}
				successCallback && successCallback(res)
				resolve(res);
			},
			fail: res => {
				if(showLoading){
					uni.hideLoading()
				}
				failCallback && failCallback(res)
				reject(res);
			},
			complete: () => {
				completeCallback && completeCallback();
			}
		})
	})
}

export default api;
