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
		<view class="form">
			<view class="inputWrapper">
				<input v-model="username" class="input" type="text"  value="" placeholder="请输入用户名"  />
			</view>
			<view class="inputWrapper">
				<input v-model="password" class="input" type="password"  value="" placeholder="请输入密码" />
			</view>
			<view class="loginBtn">
				<text class="btnName" @click="submitlogin">登录</text>
			</view>
			<view class="registBtn">
				<text  @click="register">注册账号</text>
			</view>
			<view class="forgetBtn">
				<text>找回密码</text>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../components/config/config.vue'
	export default {
		data() {
			return {
				username:"",
				password:"",
			}
		},
		methods: {
			txtshow(mess){
				uni.showToast({
					icon:"none",
				    title: mess,
				    duration: 2000
				});
			},
			submitlogin(){
				if(this.username.length>=5&&this.username.length<=30){
					if(this.password.length>=8&&this.password.length<=40){
						uni.request({
						    url: config.httpUrl +'/api/v1/user/login',
						    data: {
						          'user_name':this.username,
								  'password':this.password,
						    },
							method:"POST",
						    header: {
						       'content-type': 'application/x-www-form-urlencoded',
							   'Authorization' : '',
						    },
						    success: (res) => {
								var jsondata=res.data
								if(jsondata.code=='0'){//登录成功
									//console.log(res)
									this.txtshow('登录成功')
									uni.removeStorageSync('token');
									//存储token
									uni.setStorageSync('token', jsondata.token)
									//启动websocket
									
									
									
									uni.switchTab({
										url: '../show/home'
									})
									
								}else{
									this.txtshow(jsondata.msg)
								}								
						    },
							fail: () =>{  
								this.txtshow('网络异常')
						     }, 
						});
					}else{
						this.txtshow('密码长度8-40')
					}
				}else{
					this.txtshow('用户名长度5-30')
				}
			},
			register(){
				uni.navigateTo({
				    url: '../user/register'
				});
			}
		},
		onLoad() {
			
		},
		onReady() {

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
	.form{
		padding: 0 100rpx; 
		margin-top: 80rpx;
	}
	.inputWrapper{
		width: 100%;
		height: 80rpx;
		background: white;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		margin-top: 30rpx;
	}
	.inputWrapper .input{
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 30rpx;
	}
	.loginBtn{
		width: 100%;
		height: 80rpx;
		background: #77B3D7;
		border-radius: 50rpx;
		margin-top: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.loginBtn .btnName{
		color: #FFFFFF;
	}
	.registBtn{
		text-align: center;
		color: #EAF6F9;
		font-size: 30rpx;
		margin-top: 30rpx;
	}
	.forgetBtn{
		text-align: center;
		color: #EAF6F9;
		font-size: 30rpx;
		margin-top: 30rpx;
	}
	
</style>
