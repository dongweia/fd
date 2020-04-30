let [isOn,isOff,task]=[false,true];

/* 启动Socket服务 */
let startSocket=()=>{
	/* 创建连接 */
	task = uni.connectSocket({
	  url: 'ws://123.207.167.163:9010/ajaxchattest',
	  success:(res)=>{
		  //console.log(res)/
	  }
	});
	
	/* 监听连接已打开 */
	task.onOpen(function (res) {
		console.log('WebSocket连接已打开');
		isOff=false;
	});
		
	task.onError(function (res) {
		console.log('WebSocket连接打开失败');
	});

	/* 接收服务器返回的数据 */
	task.onMessage(function (res) {
		/*
			在这里执行数据的处理再将数据通过全局方法 dataSocket 广播出去
			比如将数据存入本地数据库、拼接完整的文件地址等操作
		*/
		uni.$emit('dataSocket',res.data);
	});
}

/* 监听 */
let on=()=>{
	if(isOn){
		console.log("不能重复打开连接")
		return;
	}
	isOn=true;
	/* 注册启动Socket事件，供应用其它窗口调用 */
	uni.$on("startSocket",()=>{
		startSocket();
	})
}

/* 启动 */
let start=()=>{
	uni.$emit('startSocket',{});
}

/* 接收数据 */
let data=(callback)=>{
	uni.$on("dataSocket",(res)=>{
		callback && callback(res)
	})
}

/* 发送数据 */
let send=(value)=>{
	if(isOff){
		console.log("连接未打开，请先打开连接")
		return;
	}
	console.log(value)
	task.send({
      "data": value
    });
}

/* 关闭 */
let off=()=>{
	task.close({
		code:1000,
		reason:'主动关闭',
		success:(res)=>{
			console.log("关闭连接成功")
			isOff=true;
		},
		fail:(res)=>{
			console.log("关闭连接失败");
		}
	});
}


export default {on,start,data,send,off}