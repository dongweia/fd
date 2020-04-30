import http from './interface'
import {
	config,
	TOKENSITES,
	ACCESSTOKEN
} from '../../api/config.js'
const $config = {
	baseURL: config.baseURL,
	sftpURL: config.sftpURL
}

function $api({
	url,
	data,
	method
}) {
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"TOKEN-SITES": TOKENSITES
		}
		if (uni.getStorageSync(ACCESSTOKEN)) {
			config.header[ACCESSTOKEN] = uni.getStorageSync(ACCESSTOKEN)
		}
	}

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		if ('request:fail abort' == response['errMsg'] || response['statusCode'] != 200) {
			uni.showToast({
				title: '网络异常:' + response['statusCode'],
				icon: 'none'
			})
		}
		if (response.data.code == -1) {
			uni.navigateTo({
				url: '/pages/login/login',
				success: res => {
					console.log('success', res)
				},
				fail: (e) => {
					console.log('success', e)
				},
			})
			uni.showToast({
				title: '授权过期，重新登录',
				icon: 'none'
			})
		}
		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: url,
		data: data,
		method: method || 'get'
	})
}

export {
	$api,
	$config
}
