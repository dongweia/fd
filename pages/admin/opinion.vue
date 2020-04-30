 <template>
	<view>
		
		<!--主体-->
		<view class="meMain">
			<view class="mePosition">
				<view class="meMainBox">
					<mescroll-uni ref="mescrollRef" @init="mescrollInit" height="100%" top="10" :down="downOption" @down="downCallback" :up="upOption"
							 @up="upCallback" >
							
					<!--  -->
					<view v-for="(item,idx) in list" :key="idx">
						<view class="meOverBg" >
							<view class="meVisitor">
								<view class="meVisitorTitle" style="width: 80%;" >用户：{{item.uname}}</view>
							</view>						
							<view class="meVisitorTitle" >意见：{{item.content}}</view>
							<view class="meVisitorTitle" >时间：{{item.time}}</view>
						</view>
					</view>
					
					
					</mescroll-uni>	
				</view>
			</view>
			
		</view>
		
		

	</view>
</template>

<script>
	import config from '../../components/config/config.vue'
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default{
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			 luPopupWrapper
			},
		data(){
			return{
				list:[],
				CustomBar: this.CustomBar,
				mescroll: null,
				downOption: {
					auto: false, // 不自动加载
					use: false
				},
				upOption: {
					auto: false, // 不自动加载
					noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '暂无相关数据' // 提示
						}
					},
					dataList: [], //列表数据
					isInit: false, // 列表是否已经初始化
					scrollY: 0,																										
			}
		},
		onLoad:function (option)  {			
 
		},
		mounted() {
					this.mescroll.triggerDownScroll();
				},
		methods: {
					// mescroll组件初始化的回调,可获取到mescroll对象
					mescrollInit(mescroll) {
						this.mescroll = mescroll;
					},
					/*下拉刷新的回调 */
					downCallback() {
						// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
						// loadSwiper();
						// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
						this.dataList = []
						this.mescroll.resetUpScroll()
					},
					/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
					upCallback() {
						this.getdata()
		
					},	
					add0(m){
							  return m<10?'0'+m:m 
							  },
					format(shijianchuo){
					//shijianchuo是整数，否则要parseInt转换
					var time = new Date(shijianchuo);
					var y = time.getFullYear();
					var m = time.getMonth()+1;
					var d = time.getDate();
					var h = time.getHours();
					var mm = time.getMinutes();
					var s = time.getSeconds();
					return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
					},					
					getdata(){
						let  curPageData = []
						var value = uni.getStorageSync('token');
						if(value){				
						  	uni.request({
						  	    url: config.httpUrl +'/api/v1/user/opinionlist',
						  		method:"GET",
						  	    header: {
						  		   'Authorization' : value,
						  	    },
						  	    success: (res) => {
									var jsondata=res.data
						  			if(jsondata.code=='0'){
										console.log(jsondata)
										for (var i = 0;i<jsondata.data.length; i++) {
											curPageData.push({
												uid:jsondata.data[i]["uid"],
												uname:jsondata.data[i]["uname"],
												uavatar:jsondata.data[i]["uavatar"],
												content:jsondata.data[i]["content"],
												time:this.format(jsondata.data[i]["time"]*1000),
											})
										}
										
										this.list = curPageData;
										//分页加载 暂时不用
										this.mescroll.endByPage(curPageData.length,0);																																
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
						      url: '../user/login'
						  });
						    
						}
					},

		
																
				},
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
	
	.meOverBg{ background: #FFFFFF;overflow: hidden;border-radius: 12upx;margin-top: 20upx; }
	.meVisitor{ display: flex;flex-direction: row;}
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
	
	.line{ overflow: hidden;border-bottom: 1px #F5F5F5 solid;transition: all 0.4s;padding: 5upx;width: 90%; margin: 0 auto;text-align: left;}
</style>
