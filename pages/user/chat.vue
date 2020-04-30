<template>
	<view class="page">
		<view class="tips color_fff size_12 align_c" :class="{ 'show':ajax.loading }" @tap="getHistoryMsg">{{ajax.loadText}}</view>
		<view class="box-1" id="list-box">
			<view class="talk-list">
				<view v-for="(item,index) in talkList" :key="index" :id="`msg-${item.id}`">
					<view class="item flex_col" :class=" item.s_or_r == 1 ? 'push':'pull' ">
						<image :src="item.pic" mode="aspectFill" class="pic"></image>
						<view class="content">
								
								<view v-if="item.type=='1'" class="chatimage" :style="{backgroundImage:'url('+item.content+')'}" @tap="browse(item.content)" ></view>		
								<view v-else>{{item.content}}</view>																				
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-2">
			<view class="flex_col">
				<view class="flex_grow">
					<input type="text" class="content" v-model="content" placeholder="请输入聊天内容" placeholder-style="color:#DDD;" :cursor-spacing="6">
				</view>
				<view style="height: 68rpx;width: 68rpx;padding:2rpx;" @tap="sendpic">
					<image src="../../static/picture.png" style="width: 100%;height:100%;"></image>
				</view>
				<button class="send" @tap="send">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../components/config/config.vue'
	export default {
		
		data() {
			return {
				talkList:[],
				ajax:{
					rows:20,	//每页数量
					page:1,	//页码
					flag:true,	// 请求开关
					loading:true,	// 加载中
					loadText:'正在获取消息'
				},
				content:'',
				rid:0,// 接收者id
				myself:{
					id:0,
					user_name:"",
					avatar:"../../static/nickname.png",
					created_at:0,				
				}
			}
		},
		onLoad:function(option) {
			if(option.id && option.name ){
				var that=this
				this.rid=parseInt(option.id)		
				this.$nextTick(()=>{
					this.getHistoryMsg();					
				});		
										
				uni.setNavigationBarTitle({
				　　title:"正在与 "+option.name+" 交流"
				})				
				this.getmyself()
				
				//接收服务端发来的信息
				uni.onSocketMessage(function (res) {
					  console.log('收到服务器内容：' + res.data);
					  var mess=JSON.parse(res.data)
					  if(mess["code"]==200){
						// setTimeout(()=>{
					  	// 将当前发送信息 添加到消息列表。
					  	let data = {
					  		"id":mess["sid"],
							"name":mess["sname"],
					  		"content":mess["content"],
					  		"s_or_r":0,
					  		"pic":mess["savatar"],																		
							"time":mess["time"]	,
							"type":mess["type"]		
							
					  	}
					  	that.talkList.push(data);
						//将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
					  	that.$nextTick(()=>{
					  		uni.pageScrollTo({
					  		    scrollTop: 999999,	// 设置一个超大值，以保证滚动条滚动到底部
					  		    duration: 0
					  		});
					  	})
						
						// // },1500);
					}else{
						//其他
					}
					  					  					 				  
				});
				
			}else{
				uni.navigateTo({
				    url: '../show/message'
				});
			}
			
			
			
			
		},
		onPageScroll(e){
			if(e.scrollTop<5){
				this.getHistoryMsg();
			}
		},
		methods: {
			//获取个人信息
			getmyself(){
				var value = uni.getStorageSync('token');
				if(value){
				  	uni.request({
				  	    url: config.httpUrl +'/api/v1/user/me',
				  		method:"GET",
				  	    header: {
				  	       'content-type': 'application/x-www-form-urlencoded',
				  		   'Authorization' : value,
				  	    },
				  	    success: (res) => {
				  			var jsondata=res.data
				  			if(jsondata.code=='0'){
				  				this.myself.name=jsondata.data.nickname
								if(jsondata.data.avatar){
									this.myself.avatar=jsondata.data.avatar
								}
								this.myself.id=jsondata.data.id
								this.myself.created_at=jsondata.data.created_at						
				  			}else{
				  				 config.txtshow(jsondata.msg)				  				
				  			}								
				  	    },
				  		fail: () =>{  
				  			 config.txtshow('网络异常')
				  	     }, 
				  	});
				}else{
				  	//跳转到登录界面
				  	uni.navigateTo({
				      url: 'login'
				  });
				    
				}
				
			},
			 
			 
			// 获取历史消息
			getHistoryMsg(){
				if(!this.ajax.flag){
					return; //
				}
				
				// 此处用到 ES7 的 async/await 知识，为使代码更加优美。不懂的请自行学习。
				let get = async ()=>{
					this.hideLoadTips();
					this.ajax.flag = false;
					let data = await this.joinHistoryMsg();
					
					// console.log('----- 模拟数据格式，供参考 -----');
					// console.log(data);	// 查看请求返回的数据结构 
					
					// 获取待滚动元素选择器，解决插入数据后，滚动条定位时使用
					let selector = '';
										
					if(this.ajax.page>1){
						// 非第一页，则取历史消息数据的第一条信息元素
						selector = `#msg-${this.talkList[0].id}`;
					}else{
						// 第一页，则取当前消息数据的最后一条信息元素
						selector = `#msg-${data[data.length-1].id}`;
					}
					
					// 将获取到的消息数据合并到消息数组中
					this.talkList = [...data,...this.talkList];	
					
					// 数据挂载后执行，不懂的请自行阅读 Vue.js 文档对 Vue.nextTick 函数说明。
					this.$nextTick(()=>{
						// 设置当前滚动的位置
						this.setPageScrollTo(selector);
						
						this.hideLoadTips(true);
												
						if(data.length < this.ajax.rows){
							// 当前消息数据条数小于请求要求条数时，则无更多消息，不再允许请求。
							// 可在此处编写无更多消息数据时的逻辑
						}else{
							this.ajax.page ++;
							
							// 延迟 200ms ，以保证设置窗口滚动已完成
							setTimeout(()=>{
								this.ajax.flag = true;
							},200)
						}
						
					})
				}
				get();
			},
			// 拼接历史记录消息，正式项目可替换为请求历史记录接口
			joinHistoryMsg(){
				// let join = ()=>{
				// 	let arr = [];
					
					
															
				// 	// //通过当前页码及页数，模拟数据内容
				// 	// let startIndex = (this.ajax.page-1) * this.ajax.rows;
				// 	// let endIndex = startIndex + this.ajax.rows;
				// 	// for(let i = startIndex; i < endIndex; i++){
				// 	// 	arr.push({
				// 	// 		"id":i,	// 消息的ID
				// 	// 		"content":`这是历史记录的第${i+1}条消息`,	// 消息内容
				// 	// 		"s_or_r":Math.random() > 0.5 ? 1 : 0	,// 此为消息类别，设 1 为发出去的消息，0 为收到对方的消息,
				// 	// 		"pic":"/static/logo.png"	// 头像
				// 	// 	})
				// 	// }
					
				// 	/*
				// 		颠倒数组中元素的顺序。将最新的数据排在本次接口返回数据的最后面。
				// 		后端接口按 消息的时间降序查找出当前页的数据后，再将本页数据按消息时间降序排序返回。
				// 		这是数据的重点，因为页面滚动条和上拉加载历史的问题。
				// 	 */
				// 	return arr
				// }
				
				// 此处用到 ES6 的 Promise 知识，不懂的请自行学习。
				return new Promise((done,fail)=>{
					// 无数据请求接口，由 setTimeout 模拟，正式项目替换为 ajax 即可。
					// setTimeout(()=>{
					// 	let data = join();
					// 	done(data);
					// },1500);
					let arr = [];
					var value = uni.getStorageSync('token');
					  if(value){
					  	uni.request({
					  	    url: config.httpUrl +'/api/v1/user/chathistory?id='+this.rid+'&offset='+this.talkList.length+'&limit=20',
					  		method:"GET",
					  	    header: {
					  		   'Authorization' : value,
					  	    },
					  	    success: (res) => {
					  			var jsondata=res.data
					  			if(jsondata.code=='0'){
									for(let i=0;i<jsondata.data.length;i++){
										arr.push({
												"id":jsondata.data[i]["sid"],	// 消息的ID
												"name":jsondata.data[i]["name"],
												"content":jsondata.data[i]["content"],	// 消息内容
												"s_or_r":jsondata.data[i]["sid"]==this.myself.id ? 1 : 0	,// 此为消息类别，设 1 为发出去的消息，0 为收到对方的消息,
												"pic":jsondata.data[i]["savatar"],	// 头像
												"time":jsondata.data[i]["time"],
												"type":jsondata.data[i]["type"]
											})
									}
					  				arr.reverse();
									done(arr)
					  			}else{
					  				 config.txtshow(jsondata.msg)				  				
					  			}	
															
					  	    },
					  		fail: () =>{  
					  			 config.txtshow('网络异常')
					  	     }, 
					  	});
					  }else{
					  	//跳转到登录界面
					  	uni.navigateTo({
					      url: 'login'
					  });
					    
					}
					
				})
			},
			// 设置页面滚动位置
			setPageScrollTo(selector){
				let view = uni.createSelectorQuery().in(this).select(selector);
				view.boundingClientRect((res) => {
					uni.pageScrollTo({
					    scrollTop:res.top - 30,	// -30 为多显示出大半个消息的高度，示意上面还有信息。
					    duration: 0
					});
				}).exec();
			},
			// 隐藏加载提示
			hideLoadTips(flag){
				if(flag){
					this.ajax.loadText = '消息获取成功';
					setTimeout(()=>{
						this.ajax.loading = false;
					},300);
				}else{
					this.ajax.loading = true;
					this.ajax.loadText = '正在获取消息';
				}
			},
			// 发送信息
			send(){								 																																			
				if(!this.content){
					uni.showToast({
						title:'请输入有效的内容',
						icon:'none'
					})
					return;
				}
				var message = { 
				         rid: this.rid, 
				         content:this.content,
						 type:0
				    };
				uni.sendSocketMessage({
					data:JSON.stringify(message)
				});		
				uni.showLoading({
					title:'正在发送'
				})
				setTimeout(()=>{
					uni.hideLoading();
					
					// 将当前发送信息 添加到消息列表。
					let data = {
						"id":this.myself.id,
						"content":this.content,
						"s_or_r":1,
						"pic":this.myself.avatar,
						"type":0
					}
					this.talkList.push(data);
					
					this.$nextTick(()=>{
						// 清空内容框中的内容
						this.content = '';
						uni.pageScrollTo({
						    scrollTop: 999999,	// 设置一个超大值，以保证滚动条滚动到底部
						    duration: 0
						});
					})
				},500);
			},
			sendpic(){
				// 从相册选择1张图
				var that=this;
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'],
				    // sourceType: ['album'],
				    success: function(res) {
				        var image=res.tempFiles[0];//只取第一张
						console.log(image)
						var value = uni.getStorageSync('token');
						uni.uploadFile({
							header: {
							'Authorization' : value,
							},
						    url: config.httpUrl+'/api/v1/user/chatimage', 
						    filePath:image["path"],
							formData:{
								"name":image["name"],
								"size":image["size"]
							},
						    name: 'image',
						    success: function (uploadFileRes) {
						         if(JSON.parse(uploadFileRes.data)["code"]==0){
									  //图片路径
									var tmppath=JSON.parse(uploadFileRes.data)["data"];
									 var message = {
									      rid:that.rid, 
									      content: tmppath,
										  type:1
									   };
									 uni.sendSocketMessage({
									 	data:JSON.stringify(message)
									 });		
									 uni.showLoading({
									 	title:'正在发送'
									 });
									 setTimeout(()=>{
									 	uni.hideLoading();									 	
									 	// 将当前发送信息 添加到消息列表。
									 	let data = {
									 		"id":that.myself.id,
									 		"content":tmppath,
									 		"s_or_r":1,
									 		"pic":that.myself.avatar,																
											"type":1	
									 	}
									 	that.talkList.push(data);
									 	
										that.$nextTick(()=>{
											uni.pageScrollTo({
											scrollTop: 999999,	// 设置一个超大值，以保证滚动条滚动到底部
											duration: 0
											});
										})
									 },500);									 
									}else{
										config.txtshow(uploadFileRes.data)
									}
						        }
						     });
				       
				    }
				    });
			},
			browse(path){
				uni.previewImage({
				            urls:[path],
				    });
			}
			
		}
	}
</script>

<style lang="scss">
	@import "../../lib/global.scss";
	.page{
		background-color: #F3F3F3;
		font-size: 28rpx;
	}
	
	/* 加载数据提示 */
	.tips{
		position: fixed;
		left: 0;
		top:var(--window-top);
		width: 100%;
		z-index: 9;
		background-color: rgba(0,0,0,0.15);
		height: 72rpx;
		line-height: 72rpx;
		transform:translateY(-80rpx);
		transition: transform 0.3s ease-in-out 0s;
		
		&.show{
			transform:translateY(0);
		}
	}
	
	.chatimage{
		min-width: 300rpx;
		height: 300rpx; 
		background-repeat: no-repeat;
		background-size: auto 100%;
	}
	.box-1{
		width: 100%;
		height: auto;
		padding-bottom: 100rpx;
		box-sizing: content-box;
		
		/* 兼容iPhoneX */
		margin-bottom: 0;  
		margin-bottom: constant(safe-area-inset-bottom);  
		margin-bottom: env(safe-area-inset-bottom);  
	}
	.box-2{
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: auto;
		z-index: 2;
		border-top: #e5e5e5 solid 1px;
		box-sizing: content-box;
		background-color: #F3F3F3;
		
		/* 兼容iPhoneX */
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
		
		>view{
			padding: 0 20rpx;
			height: 100rpx;
		}
		
		.content{
			background-color: #fff;
			height: 64rpx;
			padding: 0 20rpx;
			border-radius: 32rpx;
			font-size: 28rpx;
		}
		
		.send{
			background-color: #42b983;
			color: #fff;
			height: 64rpx;
			margin-left: 20rpx;
			border-radius: 32rpx;
			padding: 0;
			width: 120rpx;
			line-height: 62rpx;
			
			&:active{
				background-color: #5fc496;
			}
		}
	}
	
	.talk-list{
		padding-bottom: 20rpx;
		
		/* 消息项，基础类 */
		.item{
			padding: 20rpx 20rpx 0 20rpx;
			align-items:flex-start;
			align-content:flex-start;
			color: #333;
			
			.pic{
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				border: #fff solid 1px;
			}
			
			.content{
				padding: 20rpx;
				border-radius: 4px;
				max-width: 500rpx;
				word-break: break-all;
				line-height: 52rpx;
				position: relative;
			}
			
			/* 收到的消息 */
			&.pull{
				.content{
					margin-left: 32rpx;
					background-color: #fff;
					
					&::after{
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-right: 20rpx solid #fff;
						position: absolute;
						top: 30rpx;
						left: -18rpx;
					}
				}
			}
			
			/* 发出的消息 */
			&.push{
				/* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
				flex-direction: row-reverse;
				
				.content{
					margin-right: 32rpx;
					background-color: #a0e959;
					
					&::after{
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-left: 20rpx solid #a0e959;
						position: absolute;
						top: 30rpx;
						right: -18rpx;
					}
				}
			}
		}
	}
</style>