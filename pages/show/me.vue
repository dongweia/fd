 <template>
	<view>
		
		<!--主体-->
		<view class="meMain">
			<!-- <image src="../../static/icon/meBg.png"></image> -->
			<view class="mePosition">
				<view class="meMainBox">
					
					<!--头部-->
					<view class="meHead " @click="gouserspace">
						<view class="meHeadAvatar"><image :src="avatarUrl" mode="aspectFill"></image></view>
						<view class="meHeadName"><text>{{ nickname }}</text></view>
						<view class="selecttxt"><text >身份：</text></view>
						<view class="select"><text >{{ order }}</text></view>
					</view>
					<!--头部-->
					
					<!--模板-->
					<view class="meOverBg">
						<view class="meVisitor">
							<view class="meVisitorLt" @tap="gowatch">
								<view class="meVisitorTxt_02">{{watch}}</view>
								<view class="meVisitorTxt_01">关注</view>
							</view>
							<view class="meVisitorLt">
								<view class="meVisitorTxt_02">{{grade}}</view>
								<view class="meVisitorTxt_01">信用分</view>
							</view>
						</view>
					</view>
					<!--模板-->
					
					<!--订单-->
					<view class="meOverBg">
						<view class="meVisitorTitle">我的</view>
						<view class="meVisitor">
							<view class="meOrderLt" @tap="order1click">
								<view class="meOrderTxt_01"><image :src="photo1"></image></view>
								<view class="meOrderTxt_02">{{txt1}}</view>
							</view>
							<view class="meOrderLt" @tap="order2click">
								<view class="meOrderTxt_01"><image :src="photo2"></image></view>
								<view class="meOrderTxt_02">{{txt2}}</view>
							</view>
							<view class="meOrderLt" @tap="order3click">
								<view class="meOrderTxt_01"><image :src="photo3"></image></view>
								<view class="meOrderTxt_02">{{txt3}}</view>
							</view>
							<view class="meOrderLt" @tap="order4click">
								<view class="meOrderTxt_01"><image :src="photo4"></image></view>
								<view class="meOrderTxt_02">{{txt4}}</view>
							</view>
						</view>
					</view>
					<!--订单-->
					
					<!--其他-->
					<view class="meOverBg">
						<view class="businessList" @tap="gouserspace">
							<view class="businessListTxt"><image src="../../static/user.png"></image>信息管理</view>
							<view class="businessListYou"><image src=""></image></view>
						</view>
						<view class="businessList" @tap="switchid">
							<view class="businessListTxt"><image src="../../static/sub_account.png"></image>切换身份</view>
							<view class="businessListYou"><image src=""></image></view>
						</view>
					</view>
					<!--其他-->
					
					<!--其他-->
					<view class="meOverBg">
						<view class="businessList" @tap="adminchat">
							<view class="businessListTxt"><image src="../../static/customer_service.png"></image>联系客服</view>
							<view class="businessListYou"><image src=""></image></view>
						</view>
						<view class="businessList" @tap="show">
							<view class="businessListTxt"><image src="../../static/edit.png"></image>意见反馈</view>
							<view class="businessListYou"><image src=""></image></view>
						</view>
					</view>
					<!--其他-->
					
				</view>
			</view>
		</view>
		<!--主体-->
		<luPopupWrapper ref="luPopupWrapper"
		    :type="type"
		    :transition="transition"
		    :backgroundColor="backgroundColor"
		    :active="active"
		    :height="height"
		    :width="width"
		    :popupId="popupId"
		    :maskShow="maskShow"
		    :maskClick="maskClick"
		    :closeCallback="closeCallback"
		    >	
			<view style="width: 90%;hemargin: 0 auto;height: 80%;margin: 0 auto;">
				<view style="margin:0auto;text-align: center;border-radius:10rpx;margin: 0 auto;" @tap="opinion">
					<text style="font-size: 25upx;color: #333333;border:1px #999 solid;padding: 10rpx;border-radius: 20rpx;">反馈</text>
				</view>			
				 <view class="uni-flex uni-column" style="width: 100%;box-sizing: border-box;margin-top: 20rpx;">
					<textarea v-model="content" placeholder="留下您宝贵的意见." style="background: #f9f9f9;padding: 10px;width: 100%;box-sizing: border-box;" />		
				 </view>	
				
			</view>
			
		</luPopupWrapper>
	</view>
</template>

<script>
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue";
	import config from '../../components/config/config.vue'
	export default{
		components: {
			 luPopupWrapper
		},
		data(){
			return{
				userstatus:"0", //身份切换 0发货人  1运送商
				grade:0,
				
				avatarUrl:'../../static/nickname.png',//头像
				order:"Nil",				
				nickname:'Nil',
				
				watch:0,
				
				//变化ui栏
				photo1:"",
				txt1:"",
				photo2:"",
				txt2:"",
				photo3:"",
				txt3:"",
				photo4:"",
				txt4:"",
				
				
				token:'',
				loginState:'',
				
				//底部弹出框
				type:"bottom",// left right top bottom center
				transition:"slider",//none slider fade
				backgroundColor:'#FFF',
				active:false,
				height:"30%",
				width:"100%",
				popupId:1,
				maskShow:true,
				maskClick:true,
				
				content:""
			}
		},
		onLoad() {
			
		},
		onShow() {				
			uni.startPullDownRefresh();				
		},
		onTabItemTap(){
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.token = uni.getStorageSync('token');
			var tmp= uni.getStorageSync('userstatus');
			if(tmp){
				this.userstatus=tmp
			}
			this.onloadui()
			this.onloadmyself()		
			this.onloadwatch()
			this.getgrade()



		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		methods:{
			onloadmyself(){
				if(this.token){
				  	uni.request({
				  	    url: config.httpUrl +'/api/v1/user/me',
				  		method:"GET",
				  	    header: {
				  	       'content-type': 'application/x-www-form-urlencoded',
				  		   'Authorization' : this.token,
				  	    },
				  	    success: (res) => {
				  			var jsondata=res.data
				  			if(jsondata.code=='0'){
				  				this.nickname=jsondata.data.nickname
								if(jsondata.data.avatar){
									this.avatarUrl=jsondata.data.avatar
								}
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
				      url: '../user/login'
				  });
				    
				}
			},
			onloadui(){
				if(this.userstatus=="1"){
					this.order="运货商",								
					this.photo1="../../static/order.png",
					this.txt1="发布",
					this.photo2="../../static/order.png",
					this.txt2="已发布",
					this.photo3="../../static/time.png",
					this.txt3="处理中",
					this.photo4="../../static/benefits.png",
					this.txt4="已完成"
				}else{
					this.order="寄货人",
					this.photo1="../../static/time.png",
					this.txt1="运送中",
					this.photo2="../../static/benefits.png",
					this.txt2="已完成",
					this.photo3="../../static/star.png",
					this.txt3="收藏夹",
					this.photo4="../../static/view.png",
					this.txt4="足迹"
				}
			},
			
			//关注
			onloadwatch(){
				if(this.token){
				  	uni.request({
				  	    url: config.httpUrl +'/api/v1/user/friendlist',
				  		method:"GET",
				  	    header: {
				  		   'Authorization' : this.token,
				  	    },
				  	    success: (res) => {
				  			var jsondata=res.data
				  			if(jsondata.code=='0'){
				  				this.watch=jsondata.data.length
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
				      url: '../user/login'
				  });
				  }
			},
			
			//跳转关注
			gowatch(){
				uni.navigateTo({
					url: '../user/watch'	
				})
			},
			//信息管理
			gouserspace(){
				uni.navigateTo({
					url: '../user/userspace'	
				})
			},
			//switchid
			switchid(){
				var that=this
				uni.showModal({
				    title: '提示',
				    content: '确定要切换身份么？',
				    success: function (res) {
				        if (res.confirm) {
				           if(that.userstatus=="1"){
								that.userstatus="0"
								uni.removeStorageSync('userstatus');
								uni.setStorageSync('userstatus',"0")
							}else if(that.userstatus=="0"){
								that.userstatus="1"
								uni.removeStorageSync('userstatus');
								uni.setStorageSync('userstatus',"1")
							}else{
								//非法操作
							}
							uni.startPullDownRefresh();		
						   
				        } else if (res.cancel) {
				            //console.log('用户点击取消');
				        }
				    }
				});
				
				
			},
			
			//运送中0/发布1
			order1click(){
				if(this.userstatus=="1"){
					uni.navigateTo({
						url:"../commodity/add"
					})
				}else if(this.userstatus=="0"){
					uni.navigateTo({
						url:"../order/user_dealing"
					})
				}else{
					//非法操作
				}
			},
			//已完成0/已发布1
			order2click(){
				if(this.userstatus=="1"){
					uni.navigateTo({
						url:"../commodity/mypublished"
					})
				}else if(this.userstatus=="0"){
					uni.navigateTo({
						url:"../order/user_finish"
					})
				}else{
					//非法操作
				}
			},
			//收藏夹0/处理中1
			order3click(){
				if(this.userstatus=="1"){
					uni.navigateTo({
						url:"../order/businesser_dealing"
					})
				}else if(this.userstatus=="0"){
					uni.navigateTo({
						url:"../commodity/collect"
					})
				}else{
					//非法操作
				}
			},
			//足迹0/已完成1
			order4click(){
				if(this.userstatus=="1"){
					uni.navigateTo({
						url:"../order/businesser_finish"
					})
				}else if(this.userstatus=="0"){
					uni.navigateTo({
						url:"../commodity/watchhistory"
					})
				}else{
					//非法操作
				}
			},
			getgrade(){
				uni.request({
				    url: config.httpUrl +'/api/v1/user/grade',
					method:"GET",
				    header: {
					   'Authorization' : this.token,
				    },
					data:{
						'num':this.userstatus
					},
				    success: (res) => {
						var jsondata=res.data
						if(jsondata.code=='0'){
							this.grade=jsondata.data
						}else{
							config.txtshow(jsondata.msg)				  				
						}								
				    },
					fail: () =>{  
						config.txtshow('网络异常')
				     }, 
				});
			},
			//客服聊天
			adminchat(){
				uni.navigateTo({
				       url: '../user/chat?id=1&name=客服01'
				   });
			},
			opinion(){
				if(this.content.length<10 || this.content.length>1000){
					config.txtshow("长度限制10-1000")
				}else{
					uni.request({
				    url: config.httpUrl +'/api/v1/user/opinion',
				    data: {
						 "content":this.content
				    },
					method:"POST",
				    header: {
				       'content-type': 'application/x-www-form-urlencoded',
					   'Authorization' : this.token,
				    },
				    success: (res) => {
						var jsondata=res.data
						if(jsondata.code=='0'){//登录成功
							config.txtshow('反馈成功')
							this.close()
						}else {
							config.txtshow(jsondata.msg)
						}								
				    },
					fail: () =>{  
						config.txtshow('网络异常')
				     }, 
				});
				}
				
			},			
			show: function() {
			            this.$refs.luPopupWrapper.show();
			        },
			 close: function() {
			            this.$refs.luPopupWrapper.close();
			        },
			 closeCallback:function() {
			            // console.log("关闭后回调");
			        }
																	
		}
	}
</script>

<style>
	page{ background: #F5F5F5; }
	.meMain{ width: 100%;position: relative; }
	.meMain>image{ width: 100%;height: 220upx;display: block; }
	.meMainBox{ width: 92%;margin: 0 auto; }
	.mePosition{ position: absolute;top: 0;left: 0;width: 100%; }
	.meHead{ overflow: hidden;position: relative;background: #1296db; }
	.meHeadAvatar{ float: left;width: 19%;margin-top: 10upx; }
	.meHeadAvatar image{ width: 110upx;height: 110upx;display: block;border-radius: 50%; }
	.meHeadName{ float: left;width: 31%;line-height: 120upx;color: #FFFFFF;font-size: 28upx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
	.selecttxt{ float: left;width: 20%;line-height: 120upx;color: #FFFFFF;font-size: 28upx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
	.select{ float: left;width: 30%;line-height: 120upx;color: #FFFFFF;font-size: 28upx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
	
	.meOverBg{ background: #FFFFFF;overflow: hidden;border-radius: 12upx;margin-top: 30upx; }
	.meVisitor{ display: flex;flex-direction: row; }
	.meVisitorLt{ width: 50%;text-align: center;margin: 30upx 0; }
	.meVisitorLt:nth-child(1){ border-left: 1px #F5F5F5 solid;border-right: 1px #F5F5F5 solid; }
	.meVisitorTxt_01{ font-size: 28upx;color: #666666; }
	.meVisitorTxt_01 image{ width: 35upx;height: 35upx;vertical-align: middle;margin: 0 10upx 4upx 0; }
	.meVisitorTxt_02{ font-size: 30upx;color: #3B7ED5; }
	
	.meVisitorTitle{ font-size: 30upx;color: #333333;border-bottom: 1px #F5F5F5 solid;padding: 20upx 30upx; }
	.meOrderLt{ width: 25%;text-align: center;padding: 30upx 0;transition: all 0.4s; }
	.meOrderLt:active{ background: #E2E2E2; }
	.meOrderTxt_01{  }
	.meOrderTxt_01 image{ width: 40upx;height: 40upx;display: block;margin: 0 auto 6upx; }
	.meOrderTxt_02{ font-size: 24upx;color: #666666; }
	
	.businessList{ overflow: hidden;padding: 30upx;border-bottom: 1px #F5F5F5 solid;transition: all 0.4s; }
	.businessList:active{ background: #E2E2E2; }
	.businessList:last-child{ border-bottom: none; }
	.businessListTxt{ float: left;font-size: 28upx;color: #333333; }
	.businessListTxt image{ width: 35upx;height: 35upx;vertical-align: middle;margin: 0 10upx 4upx 0; }
	.businessListYou{ float: right;font-size: 28upx;color: #333333; }
	.businessListYou image{ width: 20upx;height: 20upx;vertical-align: middle;margin: 0 0 4upx 10upx; }
	
	.line{ overflow: hidden;border-bottom: 1px #F5F5F5 solid;transition: all 0.4s;padding: 5upx;width: 90%; margin: 0 auto;}
	.iconfriendsHelpWrap {
	  display: flex;
	  position: absolute;
	  bottom: 10rpx;
	  /* #ifdef H5 */
	  bottom: 50rpx;
	  /* #endif */
	  align-items: center;
	  flex-direction: row;
	  justify-content: center;
	  border-radius: 50rpx;
	  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
	  color: #FFFFFF;
	  background-color: #1296db;
	  width: 100rpx;
	  height: 100rpx;
	}
	
</style>
