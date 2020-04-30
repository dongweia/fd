<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		 <view class="status_bar" :style="{'margin-top':'40rpx'}"></view>  
		<!-- #endif --> 
		<view class="avatarWrapper">
			<view class="avater" @click="register">
				<image class="image" src="../../static/arrow_left.png"></image>
			</view>
			<view class="registname">
				<text>注册</text>
			</view>
		</view>
		<view class="form">
			<view class="form2">
				<view class="showtext">
					<text>昵称:</text>
				</view>
				<view class="inputWrapper">
				<input v-model="nickname" class="input" type="text"  value="" placeholder="请输入昵称"  />
			    </view>
			</view>
			<view class="form2">
				<view class="showtext">
					<text>用户名:</text>
				</view>
				<view class="inputWrapper">
				<input v-model="user_name" class="input" type="text"  value="" placeholder="请输入用户名"  />
			    </view>
			</view>
			<view class="form2">
				<view class="showtext">
					<text>手机号:</text>
				</view>
				<view class="inputWrapper">
				<input v-model="phone" class="input" type="text"  value="" placeholder="请输入手机号"  />
			    </view>
			</view>
			<view class="form2">
				<view class="showtext">
					<text>密码:</text>
				</view>
				<view class="inputWrapper">
				<input v-model="password" class="input" type="password"  value="" placeholder="请输入密码"  />
			    </view>
			</view>
			<view class="form2">
				<view class="showtext">
					<text>确认密码:</text>
				</view>
				<view class="inputWrapper">
				<input v-model="password_confirm" class="input" type="password"  value="" placeholder="请再次输入密码"  />
			    </view>
			</view>
		
			<view class="registBtn">
				<text class="btnName" @click="submitregist">注册</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	import config from '../../components/config/config.vue'
	export default {
		data() {
			return {
				nickname:"",
				user_name:"",
				phone:"",
				password:"",
				password_confirm:"",
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
			submitregist(){
				if(this.nickname.length>=2&&this.nickname.length<=30){
					if(this.user_name.length>=5&&this.nickname.length<=30){
						if((/^1[3456789]\d{9}$/.test(this.phone))){
							if(this.password.length>=8&&this.password.length<=40){
								if(this.password==this.password_confirm){
									//提交注册
									uni.request({
									    url: config.httpUrl +'/api/v1/user/register',
									    data: {
											'nickname':this.nickname,
									        'user_name':this.user_name,
											'phone':this.phone,
											'password':this.password,
											'password_confirm':this.password_confirm,
									    },
										method:"POST",
									    header: {
									       'content-type': 'application/x-www-form-urlencoded',
									    },
									    success: (res) => {
											var jsondata=res.data
											if(jsondata.code=='0'){//登录成功
												//console.log(res)															
											this.txtshow('注册成功')
											setTimeout(function(){
													uni.redirectTo({
													url: 'login'
													});				
												},2000)										
											}else{
												this.txtshow(jsondata.msg)
											}								
									    },
										fail: () =>{  
											this.txtshow('网络异常')
									     }, 
									});
								}else{
									this.txtshow("两次密码不一致")
								}
							}else{
								this.txtshow("密码长度8-40之间")
							}
						}else{
							this.txtshow("手机号不正确")
						}
					}else{
						this.txtshow("用户名长度5-30之间")
					}
				}else{
					this.txtshow("昵称长度2-30之间")
				}
			},
			register(){
				uni.redirectTo({
				    url: 'login'
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
		width: 100vw;
		height: 100vh;
		background: #c5d0d7;
	}
	.avatarWrapper{
		background: #007AFF;
		height:6vh;
		width: 100vw;
		display: flex;
		align-items: flex-end;
	}
	.registname{
		 height: 100%;
		 width: 100%;
		 padding-left: 35%;
		
	}
	.registname text{
		color: #fff;
		text-align: center;
		font-size: 60rpx; 
	} 
	.avater{
		width: 100rpx;
		height: 100rpx;
		overflow: hidden;
	}
	.avater .image{
		width: 100%;
		height: 100%;
	}
	.form{
		padding: 0 30rpx; 
		margin-top: 80rpx;
	}
	.form .form2{
		height: 100rpx;
		width: 100%;
		margin: 0 auto;
		display: flex;
	}
	.form .form2 .inputWrapper{
		height: 100%;
		font-size: 30rpx;
		padding-left: 30rpx;
	}
	.showtext{
		width: 150rpx;
	}
	.showtext text{
		font-size: 30rpx; 
	}
	.registBtn{
		width: 100%;
		height: 80rpx;
		background: #77B3D7;
		border-radius: 50rpx;
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	
</style>
