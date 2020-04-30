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
						<view class="select"><text >管理员</text></view>
					</view>
					<!--头部-->
														
					<!--其他-->
					<view class="meOverBg">
						<view class="businessList"  @tap="gomess">
							<view class="businessListTxt">用户疑难解答</view>
						</view>
						<view class="businessList" @tap="closeid">
							<view class="businessListTxt" >冻结账号</view>
						</view>
						<view class="businessList" @tap="delcommodity">
							<view class="businessListTxt">违规下架</view>
						</view>
						<view class="businessList" @tap="opinion">
							<view class="businessListTxt">查看反馈</view>
						</view>
					</view>
					<!--其他-->
										
				</view>
			</view>
		</view>
		<!--主体-->
		<hFormAlert v-if="cancelShow"  name="cancel_desc" placeholder="请输入冻结用户id" type="number" @confirm="confirm" @cancel="cancel"></hFormAlert>
		<hFormAlert v-if="cancelShow2"  name="cancel_desc" placeholder="请输入违规商品id" type="number" @confirm="confirm2" @cancel="cancel2"></hFormAlert>
	</view>
</template>

<script>
	import hFormAlert from '@/components/h-form-alert/h-form-alert.vue';
	import config from '../../components/config/config.vue'
	export default{
		components: {hFormAlert},
		data(){
			return{
				avatarUrl:'../../static/nickname.png',//头像
				order:"Nil",				
				nickname:'Nil',							
				token:'',
				
				cancelShow:false,
				cancelShow2:false,
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
			this.onloadmyself()		
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
			//信息管理
			gouserspace(){
				uni.navigateTo({
					url: '../user/userspace'	
				})
			},
			//用户疑难解答
			gomess(){
				uni.navigateTo({
					url: 'mess'	
				})
			},
			closeid(){
				this.cancelShow=true
			},
			delcommodity(){
				this.cancelShow2=true
			},
			confirm(h){
				if(parseInt(h.cancel_desc)){
					var tmpnum=parseInt(h.cancel_desc)
					uni.request({
					    url: config.httpUrl +'/api/v1/admin/freeze',
						method:"PUT",
					    header: {
					       'content-type': 'application/x-www-form-urlencoded',
						   'Authorization' : this.token,
					    },
						data:{
							'uid':tmpnum
						},
					    success: (res) => {
							var jsondata=res.data
							if(jsondata.code=='0'){					
								config.txtshow("冻结成功")		
							}else{
								 config.txtshow(jsondata.msg)				  				
							}								
					    },
						fail: () =>{  
							 config.txtshow('网络异常')
					     }, 
					});
					
					
				}else{
					config.txtshow("不能为空")
				}
				
				this.cancelShow=false
			},
			cancel(){
				this.cancelShow=false
			},
			confirm2(h){
				if(parseInt(h.cancel_desc)){
					var tmpnum=parseInt(h.cancel_desc)
					uni.request({
					    url: config.httpUrl +'/api/v1/admin/commodity',
						method:"DELETE",
					    header: {
						   'Authorization' : this.token,
					    },
						data:{
							'cid':13
						},
					    success: (res) => {
							var jsondata=res.data
							if(jsondata.code=='0'){					
								config.txtshow("下架成功")		
							}else{
								 config.txtshow(jsondata.msg)				  				
							}								
					    },
						fail: () =>{  
							 config.txtshow('网络异常')
					     }, 
					});
					
					
				}else{
					config.txtshow("不能为空")
				}
				
				this.cancelShow2=false
			},
			cancel2(){
				this.cancelShow2=false
			},
			opinion(){
				uni.navigateTo({
					'url':'opinion'
				})
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
	
	
</style>
