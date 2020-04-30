<template>
	<view class="content">
		<view class="body">
			<view class="list">
				<view class="flex_col" @longtap="listTap($event,item)" :class="{'active':pickerUserIndex==index}" @click="listTap($event,item)" v-for="(item,index) in userList"
						 :key="index" :data-index="index">
						<image :src=item.avatar mode="aspectFill"></image>
						<view class="flex_grow">
							<view class="flex_col">
								<view class="flex_grow">{{item.name}}</view>
								<view class="time"></view>
							</view>
							<view class="info"></view>
						</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "../../components/config/config.vue"
	export default {
		data() {
			return {
								userList: [],
								/* 选择的用户下标 */
								pickerUserIndex: -1,
								value:""
			}
		},
		methods: {
			
			/* 列表触摸事件 */
			listTap: function(e,val){
				// var us=e.currentTarget.dataset.index
				uni.showActionSheet({
				    itemList: ['进入聊天', '取消关注'],
				    success: function (res) {
				        //console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if(res.tapIndex==0){
							var value = uni.getStorageSync('token');
							uni.request({
							    url: config.httpUrl +'/api/v1/user/chatlist',
								method:"POST",
								data: {
									'rid':parseInt(val["id"]),
								},
							    header: {
							       'content-type': 'application/x-www-form-urlencoded',
								   'Authorization' : value,
							    },
							    success: (res) => {
									var jsondata=res.data
									if(jsondata.code=='0'){
										uni.navigateTo({
										url: 'chat?id='+val["id"]+'&name='+val["name"]
										});																			
									}else{
										 config.txtshow(jsondata.msg)				  				
									}								
							    },
								fail: () =>{  
									 config.txtshow('网络异常')
							     }, 
							});
							
							 
						}else if(res.tapIndex==1){
							var value = uni.getStorageSync('token');
							if(value){
							  	uni.request({
							  	    url: config.httpUrl +'/api/v1/user/friend',
							  		method:"DELETE",
									data:{
										"oid":val["id"]
									},
							  	    header: {
							  		   'Authorization' : value,
							  	    },
							  	    success: (res) => {
							  			var jsondata=res.data
							  			if(jsondata.code=='0'){								
											config.txtshow("删除成功")
											uni.startPullDownRefresh();
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
								console.log("需要登录")
							  	uni.redirectTo({
							  		url: '../user/login'
							  	});
							    
							}
						}else{
							//其他行为
						}
				    },
				    fail: function (res) {
						//不进行任何操作
				        // console.log(res.errMsg);
				    }
				});				

				
				
			},
			/* 获取列表数据 */
			getListData() {
				let list = [];
				//向后端发起请求
				if(this.value){
				  	uni.request({
				  	    url: config.httpUrl +'/api/v1/user/friendlist',
				  		method:"GET",
				  	    header: {
				  		   'Authorization' : this.value,
				  	    },
				  	    success: (res) => {
				  			var jsondata=res.data
				  			if(jsondata.code=='0'){								
								for (let i = 0; i < jsondata.data.length; i++) {								
									//头像
									var photo="../../static/my/unlogin.jpg"
									if(jsondata.data[i]["avatar"]){
										photo=jsondata.data[i]["avatar"]
									}
																											
									list.push({
										"id":jsondata.data[i]["id"],
										"name":jsondata.data[i]["nickname"],
										"avatar":photo
										})
									}
								this.userList = list;								
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
				  	uni.redirectTo({
				      url: 'login'
				  });
				    console.log("需要登录")
				}
				
				
			},
		},
		onLoad() {
			this.value = uni.getStorageSync('token');
			this.getListData();	
		
		},
		onTabItemTap(){
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
				this.getListData();	
		        setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000);
		    }
	}
</script>

<style scoped lang="scss">
.content{
		width: 100vw;
		 background: #fafafb;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis; 			
	}
/* 列式弹性盒子 */
	.flex_col {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}

	/* 弹性盒子弹性容器 */
	.flex_col .flex_grow {
		width: 0;
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
	}

	.flex_row .flex_grow {
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
	}

	/* 弹性盒子允许换行 */
	.flex_col.flex_wrap {
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}

	/* 列表 */
	.list {
		background-color: #fff;
		font-size: 28upx;
		color: #333;
		user-select: none;
		touch-callout: none;

		&>view {
			padding: 24upx 30upx;
			position: relative;

			&:active,
			&.active {
				background-color: #f3f3f3;
			}

			image {
				height: 80upx;
				width: 80upx;
				border-radius: 4px;
				margin-right: 20upx;
			}

			&>view {
				line-height: 40upx;

				.time,
				.info {
					color: #999;
					font-size: 24upx;
				}

				.time {
					width: 150upx;
					text-align: right;
				}

				.info {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		&>view:not(:first-child) {
			margin-top: 1px;

			&::after {
				content: '';
				display: block;
				height: 0;
				border-top: #CCC solid 1px;
				width: 620upx;
				position: absolute;
				top: -1px;
				right: 0;
				transform:scaleY(0.5);	/* 1px像素 */
			}
		}
	}

	/* 遮罩 */
	.shade {
		position: fixed;
		z-index: 100;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		-webkit-touch-callout: none;

		.pop {
			position: fixed;
			z-index: 101;
			width: 200upx;
			box-sizing: border-box;
			font-size: 28upx;
			text-align: left;
			color: #333;
			background-color: #fff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
			line-height: 80upx;
			transition: transform 0.15s ease-in-out 0s;
			user-select: none;
			-webkit-touch-callout: none;
			transform: scale(0, 0);

			&.show {
				transform: scale(1, 1);
			}

			&>view {
				padding: 0 20upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				user-select: none;
				-webkit-touch-callout: none;

				&:active {
					background-color: #f3f3f3;
				}
			}
		}
	}
</style>
