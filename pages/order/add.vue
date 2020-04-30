 <template>
	<view>
		
		<!--主体-->
		<view class="meMain">
			<!-- <image src="../../static/icon/meBg.png"></image> -->
			<view class="mePosition">
				<view class="meMainBox">					
					
					<!--寄件人-->
					<view class="meOverBg" >
						<view class="meVisitor">
							<view class="meVisitorLt1">
								<view style="vertical-align: middle;width: 50rpx;height: 50rpx;background-color: #565656;margin: 0 auto;border-radius: 12upx;color: #ffffff;">寄</view>
							</view>
							<view class="meVisitorLt2">
								<view class="line">
									<input class="meVisitorTxt_01" v-model="sname"  type="text"  value="" placeholder="请输入姓名" maxlength="10" />								
								</view>
								<view class="line">
									<input class="meVisitorTxt_01" v-model="sphone"  type="number"  value="" placeholder="请输入手机号" maxlength="11" />								
								</view>
								<view class="line" @tap="btnClick" style="display: flex;">
									<view style=" font-size: 28upx;color: #666666;width: 50%;margin: 0 auto;text-align: left;">{{saddress}}</view>	
									<view style=" font-size: 28upx;color: #666666;width: 30%;margin: 0 auto;text-align: right;"><text style="border:1px solid #babfc6;padding:5rpx;border-radius:15rpx;color:#7f8388 ;">地区选择</text></view>	
								</view>
								<view class="line">
									<input class="meVisitorTxt_01" v-model="sdetail"  type="text"  value="" placeholder="地址详细..." maxlength="10" />								
								</view>
				
							</view>
						</view>
					</view>
					<!--寄件人-->
					
					<!--收件人-->
					<view class="meOverBg" >
						<view class="meVisitor">
							<view class="meVisitorLt1">
								<view style="vertical-align: middle;width: 50rpx;height: 50rpx;background-color: #ff0000;margin: 0 auto;border-radius: 12upx;color: #ffffff;">收</view>
							</view>
							<view class="meVisitorLt2">
								<view class="line">
									<input class="meVisitorTxt_01" v-model="rname"  type="text"  value="" placeholder="请输入姓名" maxlength="10" />								
								</view>
								<view class="line">
									<input class="meVisitorTxt_01" v-model="rphone"  type="number"  value="" placeholder="请输入手机号" maxlength="11" />								
								</view>
								<view class="line" @tap="btnClick2" style="display: flex;">
									<view style=" font-size: 28upx;color: #666666;width: 50%;margin: 0 auto;text-align: left;">{{raddress}}</view>	
									<view style=" font-size: 28upx;color: #666666;width: 30%;margin: 0 auto;text-align: right;"><text style="border:1px solid #babfc6;padding:5rpx;border-radius:15rpx;color:#7f8388 ;">地区选择</text></view>	
								</view>
								<view class="line">
									<input class="meVisitorTxt_01" v-model="rdetail"  type="text"  value="" placeholder="地址详细..." maxlength="10" />								
								</view>
									
							</view>
						</view>
					</view>
					<!--收件人-->
					
					<!--物品信息-->
					<view class="meOverBg">
						<view class="meVisitorTitle" >物品信息</view>
						<view class="line" style="display: flex;padding: 10rpx ;" @tap="thingtypeclick">						
							<view style=" font-size: 28upx;color: #666666;width: 35%;margin: 0 auto;text-align: left;"><text style="border:1px solid #babfc6;padding:5rpx;border-radius:15rpx;color:#7f8388 ;">物品类型</text></view>	
							<view style=" font-size: 28upx;color: #666666;width: 65%;margin: 0 auto;text-align: left;">{{thingtype}}</view>	
						</view>
						<view class="line" style="display: flex;padding: 10rpx ;">
							<view style=" font-size: 28upx;color: #666666;width: 35%;margin: 0 auto;text-align: left;">重量：</view>	
							<input class="meVisitorTxt_01" v-model="thingweight"  type="number"  value="" placeholder="请输入重量" maxlength="4" />Kg			
						</view>
						<view class="line" style="display: flex;padding: 10rpx ;">
							<view style=" font-size: 28upx;color: #666666;width: 35%;margin: 0 auto;text-align: left;">备注：</view>	
							<view class="uni-flex uni-column" style="width: 100%;box-sizing: border-box;background: #f9f9f9;">
						    <textarea v-model="thingmess" placeholder="请输入内容" style="padding: 10px;width: 100%;box-sizing: border-box;" />
						    </view>	
						</view>
					
					</view>
					<!--物品信息-->
					<view class="meOverBg" style="width: 50%;margin: 0 auto;margin-top: 20rpx;border-radius:10rpx;" @tap="send">
						<view class="meVisitorTitle" style="text-align: center;">确认下单</view>											
					</view>
					

					
	
				</view>
			</view>
		</view>
		<!--主体-->
		<selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>
		<selectAddress ref='selectAddress2' @selectAddress="successSelectAddress2"></selectAddress>
	</view>
</template>

<script>
	import config from '../../components/config/config.vue'
	import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue'
	export default{
		components: {selectAddress},
		data(){
			return{
				cid:0,//商品id
				
				sname:"",
				sphone:"",
				saddress:"",
				sdetail:"",
				rname:"",
				rphone:"",
				raddress:"",
				rdetail:"",
				
				//物品信息
				selecttype:['日用品', '食品', '文件','数码产品','衣物','其他'],
				thingtype:"",
				thingweight:"",
				thingmess:"",
				
			}
		},
		onLoad:function (option)  {			
			this.cid=parseInt(option.id	)	 
		},
		onShow() {				
			uni.startPullDownRefresh();				
		},
		onTabItemTap(){
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.token = uni.getStorageSync('token');
			
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		methods:{
			btnClick() {
			        this.$refs.selectAddress.show()
			    },
			successSelectAddress(address){ //选择成功回调
			   this.saddress=address
			},
			btnClick2() {
			        this.$refs.selectAddress2.show()
			},
			successSelectAddress2(address){ //选择成功回调
			   this.raddress=address
			},
			thingtypeclick(){
				var that=this
				uni.showActionSheet({
				    itemList:that.selecttype,
				    success: function (res) {
						that.thingtype=that.selecttype[res.tapIndex]
				    },
				    fail: function (res) {
						//不进行任何操作
				        // console.log(res.errMsg);
				    }
				});		
			},
			send(){
				// 表单验证
				var err = {
				    msg: '',
				    ok: true
				}
				if(this.sname.length<=0 || this.sname.length>10 || this.rname.length<=0 || this.rname.length>10){
					err.ok = false;
					err.msg = "姓名长度限制1-10"
				}
				
				if(!(/^1[3456789]\d{9}$/.test(this.sphone)) || !(/^1[3456789]\d{9}$/.test(this.rphone))){
					err.ok = false;
					err.msg = "手机号码有误"
				}
				
				if(this.saddress.length<=0 || this.raddress.length<=0 ){
					err.ok = false;
					err.msg = "地址不能为空"
				}
				
				if(this.sdetail.length>200 || this.rdetail.length>200 ){
					err.ok = false;
					err.msg = "地址详细长度限制1000"
				}
				
				if(this.thingtype.length<=0){
					err.ok = false;
					err.msg = "货物类型不能为空"
				}
				
				if(this.thingweight.length<=0){
					err.ok = false;
					err.msg = "货物重量不能为空"
				}
				
				if(this.thingmess.length>1000){
					err.ok = false;
					err.msg = "备注限制1000"
				}				
				
				if (!err.ok) {
				    uni.showModal({
				        title: '提示',
				        content: err.msg
				    })
				    return;
				}
				
				uni.showLoading({
				    title: '数据处理中'
				});
				var value = uni.getStorageSync('token')
				if(value){
				  	uni.request({
				  	    url: config.httpUrl +'/api/v1/commodity/order',
				  		method:"POST",
				  	    header: {
				  		   'Authorization' : value,
				  	    },
						data:{
							'cid':this.cid,//商品id							
							'sname':this.sname,
							'sphone':this.sphone,
							'saddress':this.saddress,
							'sdetail':this.sdetail,
							'rname':this.rname,
							'rphone':this.rphone,
							'raddress':this.raddress,
							'rdetail':this.rdetail,
							'thingtype':this.thingtype,
							'thingweight':parseInt(this.thingweight),
							'thingmess':this.thingmess,
						},
				  	    success: (res) => {
				  			var jsondata=res.data
				  			if(jsondata.code=='0'){
								config.txtshow('下单成功')
								var tmpoid=jsondata.data
								uni.request({
								    url: config.httpUrl +'/api/v1/commodity/transportlog',
									method:"POST",
								    header: {
									   'Authorization' : value,
								    },
									data:{
										'oid':tmpoid, //0代表所有id
										'content':'下单成功'
									},
								    success: (res) => {
										var jsondata=res.data
										if(jsondata.code=='0'){
											console.log('更新物流信息成功')
										}else{
											 config.txtshow(jsondata.msg)				  				
										}														
								    },
									fail: () =>{  
										 config.txtshow('网络异常')
								     }, 
								});
								
								uni.redirectTo({
									url:'user_dealing'
								})							
				  			}else{
				  				 config.txtshow(jsondata.msg)	
								console.log(jsondata)							 
				  			}														
				  	    },
				  		fail: () =>{  
				  			 config.txtshow('网络异常')
				  	     }, 
				  	});
				  }else{
				  	//跳转到登录界面
				  config.txtshow("未登录")	
				}
				
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
	.meVisitorLt1{ width: 10%;text-align: center;margin: 30upx 0; }
	.meVisitorLt2{ width: 90%;text-align: center;margin: 30upx 0; }
	.meVisitorLt1:nth-child(1){ border-left: 1px #F5F5F5 solid;border-right: 1px #F5F5F5 solid; }
	.meVisitorLt2:nth-child(1){ border-left: 1px #F5F5F5 solid;border-right: 1px #F5F5F5 solid; }
	.meVisitorTxt_01{ font-size: 28upx;color: #666666;width: 90%;margin: 0 auto;text-align: left;  }
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
</style>
