/* 统一资源标识符，设置项目全局请求域名 */
let URI = {
	/* 请求路径 */
	request: 'https://request.xxx.com',
	/* 文件上传服务器路径 */
	upload: 'https://upload.xxx.com',
	/* 图片服务路径 */
	images: 'https://images.xxx.com'
}

/* 常用正则 */
let regExps = {
	email: /^[0-9a-zA-Z_]+@[0-9a-zA-Z_]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$/, //邮箱
	mobile: /^(?:1\d{2})-?\d{5}(\d{3}|\*{3})$/, //手机号码
	qq: /^[1-9][0-9]{4,9}$/, //QQ
	befitName: /^[a-z0-9A-Z\u4e00-\u9fa5]+$/, //合适的用户名，中文,字母,数字
	befitPwd: /^[a-z0-9A-Z_]+$/, //合适的密码，字母,数字,下划线
	allNumber: /^[0-9]+.?[0-9]$/ //全部为数字
}

/* 加载框 */
let showLoading = (title = '加载中') => {
	uni.showLoading({
		title,
		mask: true
	});
}

/* 提示框 */
let showToast = (title = '', icon = 'none', duration = 1500) => {
	uni.showToast({
		title,
		icon,
		duration,
		position: 'center',
		mask: true
	});
}

/* 获取元素自定义属性值-当前事件元素 */
let getData = (el, key) => {
	if (key) {
		return el.currentTarget.dataset[key];
	} else {
		return el.currentTarget.dataset;
	}
}

/* 获取元素大小及位置 */
let getRect = (selector) => {
	return new Promise((resolve, reject) => {
		let view = uni.createSelectorQuery().select(selector);
		view.fields({
			size: true,
			rect: true
		}, (res) => {
			resolve(res);
		}).exec();
	})
}

/* 
	发送请求
	url 为绝对路径时使用绝对路径，为相对路径时会自拼接 URI 中的 request 地址
	method 默认为 GET ,默认时可不传
*/
let request = (param={}) => {
	let url=param.url || '';
	if(!/http:|https:/.test(url)){
		url=URI.request+url;
	}
	
	/* 请求头设置 */
	let header={};
	
	/* 定义请求数据格式 */
	/* 数据会进行 JSON 序列化，Request Payload，与下方相同属性保留接口所需要的类型即可 */
	//header['content-type']='application/json';
	/* 数据转换为 query string，Form Data，与上方相同属性保留接口所需要的类型即可*/
	header['content-type']='application/x-www-form-urlencoded';
	
	/* 请求头自定义数据 */
	/* 令牌数据自行完成获取过程 */
	//header['token']='helang';
	
	return new Promise((resolve,reject)=>{
		uni.request({
			url,
			method:param.method || 'GET',
			dataType:'json',
			header,
			data:param.data,
			success:(res)=>{
				resolve(res.data);
			},
			fail:(err)=>{
				uni.hideLoading();
				showToast('请求错误，请重试！');
				reject(err);
			}
		});
	})
}

export default {
	URI,
	regExps,
	showLoading,
	showToast,
	getData,
	getRect,
	request
}
