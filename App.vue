<script>
	import config from 'components/config/config.vue'
	export default {
		data:{
			socket_connect: false,
		},
		methods:{
			websocket_start(){
				var that=this;
				var connect_s;
				var message = {
				         rid:0, 
				         content:"",
						 type:0
				   };	
				var value = uni.getStorageSync('token');
				uni.connectSocket({
			    url:config.wsUrl+'/api/v1/user/websocket?token='+value,
				 });
					uni.onSocketOpen(function (res) {
						console.log('WebSocket连接已打开！');
						that.socket_connect=true
					});
					//心跳包 暂时不用
					// heart_tiao = setInterval(function(){
					// uni.sendSocketMessage({
					// 		data:JSON.stringify(message)
					// 	});
					// },6000);
					
					
					uni.onSocketClose(function (res) {
					  console.log('WebSocket 已关闭！');
					    that.socket_connect=false
						console.log('WebSocket连接打开失败，请检查！');
						setTimeout(function(){  
									if(!that.socket_connect){  
										console.log('重连一下');  
										that.websocket_start() 
									}else{  
										console.log(value)
									console.log('已经连上了，退出定时器');  
							}  
						},5000);  							
						});
						
					uni.onSocketError(function (res) {
						  console.log('WebSocket连接打开失败，请检查！');
						  that.socket_connect=false
						  setTimeout(function(){  
							if(!that.socket_connect){  
									console.log('重连一下');  
									that.websocket_start() 
								}else{  
									 console.log('已经连上了，退出定时器');  
								}  
							},5000);  
						  
					});
							
			}
		},
		onLaunch: function() {
			console.log('开始连接wb')
			this.websocket_start()			
				
				
		},
		onShow: function() {
			console.log("show")

				
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "common/colorui/main.css";
	@import "common/colorui/icon.css";
	@import "common/icon/iconfont.css";
	@import "uni.scss";
	
</style>