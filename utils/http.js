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
				successCallback && successCallback(res)
				resolve(res);
			},
			fail: res => {
				failCallback && failCallback(res)
				reject(res);
			},
			complete: () => {
				if(showLoading){
					uni.hideLoading()
				}
				completeCallback && completeCallback();
			}
		})
	})
}

export default api;
