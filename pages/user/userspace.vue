<template>
	<view class="content">
		<view class="bordars"></view>
		<view class="body">
			<view style="width: 100%;height: 35rpx;background: #f0f0f1;"></view>
			<view class="bordars"></view>
			<view class="detaillist" @click="update_avatar">
				<view class="detaillist_left">
					<text>头像</text>
				</view>
				<view class="detaillist_center">
					<view style="width: 100rpx;height: 100%;float: right;border-radius: 50rpx;overflow: hidden;">
						<image style="width: 100%;height: 100%;" :src="userimg"></image>
					</view>
					
				</view>
				<view class="detaillist_right">
						<image style="width: 100%;height: 100%;" src="../../static/arrow_right.png"></image>
				</view>			
			</view>
			<view class="bordars"></view>
			<view class="detaillist">
				<view class="detaillist_left">
					<text>ID</text>
				</view>
				<view class="detaillist_center">
					<text >{{id}}</text>
				</view>
			</view>
			<view class="bordars"></view>
			<view class="detaillist">
				<view class="detaillist_left">
					<text>用户名</text>
				</view>
				<view class="detaillist_center">
					<text>{{user_name}}</text>
				</view>
			</view>
			<view class="bordars"></view>
			<view class="detaillist">
				<view class="detaillist_left">
					<text>昵称</text>
				</view>
				<view class="detaillist_center">
					<text >{{nickname}}</text>
				</view>
				<view class="detaillist_right">
						<image style="width: 100%;height: 100%;" src="../../static/arrow_right.png"></image>
				</view>
			</view>
			<view class="bordars"></view>
			<view class="detaillist">
				<view class="detaillist_left" >
					<text>手机号</text>
				</view>
				<view class="detaillist_center">
					<text >{{phone}}</text>
				</view>
				<view class="detaillist_right">
						<image style="width: 100%;height: 100%;" src="../../static/arrow_right.png"></image>
				</view>
			</view>
			<view class="bordars"></view>
			<view class="detaillist">
				<view class="detaillist_left">
					<text>注册时间</text>
				</view>
				<view class="detaillist_center">
					<text >{{createtime}}</text>
				</view>
			</view>
			<view class="bordars"></view>
		</view>
		<view class="footer" @click="quit">
			<text>退出登录</text>
		</view>
	</view>
</template>

<script>
	import config from '../../components/config/config.vue'
	export default {
		onLoad() {
			//加载用户信息
			this.onloaduser()	
		},
		// mounted() {
		// 	//加载用户信息
		// 	this.onloaduser()									
		// },
		data() {
			return {
				userimg:"../../static/nickname.png",				
				id:"0",
				user_name:"Nil",
				nickname:"Nil",
				phone:"Nil",
				createtime:"",
		}
		},
		methods:{
			onloaduser(){
				// config.txtshow('网络异常')
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
				  				this.nickname=jsondata.data.nickname
								if(jsondata.data.avatar){
									this.userimg=jsondata.data.avatar
								}
								this.id=jsondata.data.id
								this.user_name=jsondata.data.user_name
								this.phone=jsondata.data.phone
								var date=new Date(jsondata.data.created_at*1000)
								var Y = date.getFullYear() + '-'
								var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
								var D = (date.getDate()< 10 ? '0'+date.getDate() :date.getDate() )+ ' '
								this.createtime=Y+M+D
								
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
				      url: '../../pages/user/login'
				  });
				    
				}
			},
			goback(){
				uni.switchTab({
					url: '../show/me'
				})
			},
			quit(){
				uni.showModal({
				    title: '提示',
				    content: '确定要退出登陆么？',
				    success: function (res) {
				        if (res.confirm) {
				            //console.log('用户点击确定');
							uni.removeStorageSync('token');
							uni.closeSocket();
							uni.navigateTo({
							    url: 'login'
							});
				        } else if (res.cancel) {
				            //console.log('用户点击取消');
				        }
				    }
				});
			},
			
			update_avatar(){
				uni.redirectTo({
				    url: 'choose'
				});
				
				// // 从相册选择6张图
				// uni.chooseImage({
				//     count: 1,
				//     sizeType: ['original', 'compressed'],
				//     sourceType: ['album'],
				//     success: function(res) {
				//         console.log(JSON.stringify(res.tempFiles));
				       
				//     }
				//     });
				
			},	

		},
		
	}
</script>

<style>
	.content{
		width: 100vw;
		height: 100vh;
		background: #fafafb;

		
		
	}
	.header{
		height: 100rpx;
		/* background:#f7f7f8 ; */
		display: flex;
	}
	.header .re_icon{
		width: 100rpx;
		height: 100%;
	}
	.header .re_icon image{
		width: 100%;
		height: 100%;
		
	}
	.bordars{
		width: 100%;
		height: 3rpx;
		background:#D8D8D8 ;
		
	}
	.detaillist{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		/* background:#EFEFF3 ; */
		display: flex;
		padding:0 20rpx ;
	}
	.detaillist .detaillist_left{
		width:25%;
	}
	.detaillist .detaillist_center{
		width: 60%;
		text-align: right;
		white-space: nowrap; 
		text-overflow:ellipsis; 
		overflow:hidden; 
		
	}
	.detaillist .detaillist_right{
		width: 100rpx;
		height: 100rpx;
		float: right;
	}
	.footer {
		margin: 100rpx auto;
		width: 70%;
		height: 110rpx;
		background: #EFEFF3;
		border-radius: 50rpx;
		border:1px solid #7F8388;
		text-align: center;
		font-size:50rpx ;
		line-height: 110rpx;
		color: #7f8388;
	}
</style>
