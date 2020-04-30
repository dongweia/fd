<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		 <view class="status_bar" :style="{'margin-top':'40rpx'}"></view>  
		<!-- #endif --> 
		<view class="avatarWrapper">
			<view class="avater">
				<!-- <image class="image" src="../../static/logo.ico"></image> -->
			</view>
		</view>
		<view class="textWrapper">
			<text class="describeText">欢迎使用</text>
		</view>
	</view>
</template>

<script>
	import config from '../../components/config/config.vue'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			setTimeout(function(){
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
								uni.switchTab({
								    url: '../show/home'
								});			
							}else{
								config.txtshow('请登录')
								//跳转到登录界面
									uni.redirectTo({
								    url: '../user/login'
								});
							}								
					    },
						fail: () =>{  
							config.txtshow('网络异常')
					     }, 
					});
				}else{
					//跳转到登录界面
					uni.redirectTo({
				    url: '../user/login'
				});
				// uni.switchTab({
				//     url: '../show/home'
				// });	
				}					
				},2000)
		},
		onReady(){
			
		}
	}
</script>

<style>
	.content{
		background: #377EB4;
		width: 100vw;
		height: 100vh;
	}
	.avatarWrapper{
		height: 30vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.avater{
		width: 200rpx;
		height: 200rpx;
		overflow: hidden;
	}
	.avater .image{
		width: 100%;
		height: 100%;
	}
	.textWrapper{
		width: 100%;
		height: 100rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
		text-align: center;
	}
	.textWrapper .describeText{
		color: #b3e3f9;
		font-size: 100rpx;
		margin-top: 20rpx;
	}
</style>
