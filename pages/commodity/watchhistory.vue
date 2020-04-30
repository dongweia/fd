<template>
	<view>	
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" height="100%" top="10" :down="downOption" @down="downCallback" :up="upOption"
		 @up="upCallback" >
		<!-- 数据列表 -->
		<view class="cu-list menu sm-border padding-tb-sm bg-white" v-if="listType==1">
			<view class="cu-item solid-bottom" v-for="(item,idx) in list" :key="idx">
				<view class="flex justify-start" @tap="watchdetail(item)">
					<view>
						<image class="basic" :src="item.image"></image>
					</view>
					<view class="content margin-left-sm">
						<text class="text-ellipsis2">{{item.title}}</text>
						<view class="margin-bottom-xs" style="float: left;" v-for="(i,lab) in item.lable" :key="lab">
							<view class='cu-tag radius sm text-gray' v-show="i!=''" style="font-size: 25rpx;height: 35rpx;">{{i}}</view>							
						</view>					
						<view class="margin-bottom-xs" style="clear:both;height:50rpx;overflow: hidden;"  >						
							<view class="" style="float: left;" v-for="(a,add) in item.address" :key="add">
								<view class='cu-tag radius sm' v-show="a!=''" style="font-size: 27rpx;height: 36rpx;">{{a}}</view>							
							</view>
						</view>
						<view class='cu-tag radius sm' style="font-size: 27rpx;height: 36rpx;">.....</view>	

						<view class="flex justify-between" style="clear:both" >
							<view class="" style="white-space: nowrap; text-overflow:ellipsis; overflow:hidden;width:400rpx; ">
								<text class="text-sm text-gray" >{{item.describe}}</text>
							</view>
							<!-- <view class="">
								<text class="text-red iconfont icongouwuche"></text>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
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
				<div class="hm-commodity-display-card" >
					<div class="itemWrap">
						<image class="item" :src="winimage" />		         
						<text class="title" style="width: 80%;overflow: scroll;">{{wintitle}}</text>				  
						<view class="transporter_detail">
							<view style="width: 50%;">货运商：{{winmname}}</view>
							<view style="width: 50%;">注册时间：{{winbirth}}</view>
						</view>
						<view class="transporter_detail">
							<view style="width: 50%;">信用分：{{wingrade}}</view>
							<view style="width: 50%;">电话：{{winphone}}</view>
						</view>
						<view class="transporter_detail">
							<view style="width: 50%;">编号：{{winid}}</view>
							<view style="width: 50%;">发布时间：{{wintime}}</view>
						</view>
						<view class="transporter_detail2">标签：{{winlable}}</view>				  	
						<view class="transporter_detail2" style="overflow: scroll;height: 150rpx; ">运输范围：{{winaddress}}</view>
						<view class="transporter_detail2" style="overflow: scroll;height: 150rpx;">描述：{{windescribe}}</view>							
						<div class="iconfriendsHelpWrap" style="left: 150rpx;" @tap="deletewatchhistory" >删除</div>
						<div class="iconfriendsHelpWrap" @tap="chat">交流</div>
						<div class="iconfriendsHelpWrap" style="right: 150rpx;" @tap="order" >下单</div>
					</div>
				</div>	    
		</luPopupWrapper>
		</mescroll-uni>	
	</view>
</template>

<script>
	import config from '@/components/config/config.vue'
	
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		 components: {
		        luPopupWrapper
		    },
		data() {
			return {
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
																			
																							
				/* 搜索条默认选中项 */
				index: 1,
				/* 搜索条综合是否展开 */
				c: false,
				/* 搜索条综合搜索选项 */
				cList: ['综合', '最新上架', '价格最低', '价格最高', '评价最多'],
				/* 搜索条 综合显示文本 */
				syntText: '综合',
				/* 列表类型 1一行一个，2一行两个*/
				listType: 1,
				/* 更多过滤 */
				showFilter: false,
				
				
				//底部弹出框
				type:"bottom",// left right top bottom center
				transition:"slider",//none slider fade
				backgroundColor:'#FFF',
				active:false,
				height:"100%",
				width:"100%",
				popupId:1,
				maskShow:true,
				maskClick:true,
				
				//底部弹出框内容
				winid:0,
				winmid:0,
				winmname:"Nil",
				wingrade:0,
				winbirth:"",
				winimage:"Nil",
				wintitle:"Nil",
				wintime:"",
				windescribe:"Nil",
				winaddress:"Nil",
				winlable:"Nil",
				winphone:""
				
			}
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
			getdata(){
				let  curPageData = []
				var value = uni.getStorageSync('token');
				if(value){				
				  	uni.request({
				  	    url: config.httpUrl +'/api/v1/commodity/watchhistorylist',
				  		method:"GET",
				  	    header: {
				  		   'Authorization' : value,
				  	    },
				  	    success: (res) => {
				  			var jsondata=res.data
				  			if(jsondata.code=='0'){
								
								for (var i = 0;i<jsondata.data.length; i++) {
									var tmplab=jsondata.data[i]["lable"].split(",")
									tmplab.pop()
									var tmpadd=jsondata.data[i]["address"].split(",")
									tmpadd.pop()
									curPageData.push({
										id:jsondata.data[i]["id"],
										mid:jsondata.data[i]["mid"],
										image:jsondata.data[i]["image"],
										title:jsondata.data[i]["title"],
										describe:jsondata.data[i]["describe"],
										lable:tmplab,
										address:tmpadd,
										time:jsondata.data[i]["time"]
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
			//查看商品详情
			watchdetail(item){
				var value = uni.getStorageSync('token');
				if(value){
				  	uni.request({
				  	    url: config.httpUrl +'/api/v1/transporter',
				  		method:"GET",
				  	    header: {
				  		   'Authorization' : value,
				  	    },
						data:{
							'id':item.mid, //0代表所有id
						},
				  	    success: (res) => {
				  			var jsondata=res.data
				  			if(jsondata.code=='0'){
								var date=new Date(jsondata.data.created_at*1000)
								var Y = date.getFullYear() + '-'
								var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
								var D = (date.getDate()< 10 ? '0'+date.getDate() :date.getDate() )+ ' '
								this.winbirth=Y+M+D
								
								var date1=new Date(item.time*1000)
								var Y1 = date1.getFullYear() + '-'
								var M1 = (date1.getMonth()+1 < 10 ? '0'+(date1.getMonth()+1) : date1.getMonth()+1) + '-'
								var D1 = (date1.getDate()< 10 ? '0'+date1.getDate() :date1.getDate() )+ ' '
								this.wintime=Y1+M1+D1
								
								
								this.winid=item.id,
								this.winmid=item.mid,
								this.winmname=jsondata.data["nickname"],  //
								this.winphone=jsondata.data["phone"],  //
								this.wingrade=10,    //
								this.winimage=item.image,
								this.wintitle=item.title,
								this.windescribe=item.describe,
								this.winaddress=item.address,//
								this.winlable=item.lable//
								
								this.width ="100%";
								this.height ="70%";
								this.transition = "slider";
								this.type = "bottom";
								this.show();
																							
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
				  config.txtshow("未登录")	
				}																										
			},
			//取关
			deletewatchhistory(){
				var tmpid=this.winid
				var tmpdownCallback=this.downCallback
				var tmpclose=this.close
				uni.showModal({
				    title: '提示',
				    content: '你确定要删除该记录？',
				    success: function (res) {
				        if (res.confirm) {
				            var value = uni.getStorageSync('token');
				            if(value){
				              	uni.request({
				              	    url: config.httpUrl +'/api/v1/commodity/watchhistory',
				              		method:"DELETE",
				              	    header: {
				              		   'Authorization' : value,
				              	    },
				            		data:{
				            			'id':tmpid, 
				            		},
				              	    success: (res) => {
				              			var jsondata=res.data
				              			if(jsondata.code=='0'){
											config.txtshow('删除成功')	
											tmpdownCallback()
											tmpclose()
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
				        } else if (res.cancel) {
				            //无动作
				        }
				    }
				});
			},
			//交流
			chat(){
				uni.navigateTo({
					url:'../user/chat?id='+this.winmid+'&name='+this.winmname
				})
			},
			order(){
				uni.navigateTo({
				    url: '../../pages/order/add?id='+this.winid
				});
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
			


		},

	}
</script>

<style>
	page {
		/* background-color: #FFFFFF; */
		overflow: hidden;
	}

	.tools-alert {
		height: 100%;
		position: fixed;
		width: 100%;
		left: 0;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 100;
	}

	.filter-content {
		overflow-y: auto;
		/* #ifdef H5 */
		height: calc(100vh - 105px);
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: calc(100vh - 125px);
		/* #endif */
		/* #ifdef APP-VUE */
		height: calc(100vh - 145px);
		/* #endif */
	}

	.filter-price-input {
		width: 232upx;
		height: 80upx;
		border-radius: 6upx;
	}

	.solids-center {
		height: 4upx;
		background-color: #eee;
		width: 30upx;
		margin-top: 38upx;
	}
	
	
	
	
	
	
	.hm-commodity-display-card {
	  display: flex;
	  align-items: center;
	  flex-direction: row;
	  width: 97%;
	  height:90%;
	}
	
	.itemWrap {
	  display: flex;
	  position: relative;
	  align-items: center;
	  flex-direction: column;
	  margin-left: 13.64rpx;
	  border-radius: 38.96rpx;
	  box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
	  background-color: #ffffff;
	  width:100%;
	  height: 100%;
	}
	
	.title {
	  position: relative;
	  opacity: 1;
	  margin-top:30.34rpx;
	  height: 45rpx;
	  text-align: center;
	  line-height: 38.96rpx;
	  white-space: nowrap;
	  color: #141821;
	  font-family: MicrosoftYaHei, Microsoft YaHei;
	  font-size: 40rpx;
	  font-weight: normal;
	}
	
	.item {
		margin-top: 20rpx;
	  position: relative;
	  width: 250rpx;
	  height: 250rpx;
	}
	
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

	
	.transporter_detail{
		padding: 0 30rpx;
		display: flex;
		width: 100%;
		/* background-color: #007AFF; */
		position: relative;
		opacity: 1;
		/* margin-top:5rpx; */
		height: 45rpx;
		overflow: hidden;
		/* text-align: center; */
		text-overflow: ellipsis;
		line-height: 38.96rpx;
		white-space: nowrap;
		color: #141821;
		font-family: MicrosoftYaHei, Microsoft YaHei;
		font-size: 25rpx;
		font-weight: normal;
	}
	
	.transporter_detail2{
		padding: 0 30rpx;
		display: flex;
		width: 100%;
		/* background-color: #007AFF; */
		position: relative;
		opacity: 1;
		margin-top:10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 38.96rpx;
		color: #141821;
		font-family: MicrosoftYaHei, Microsoft YaHei;
		font-size: 25rpx;
		font-weight: normal;
		word-break: break-all;
	}
	
</style>
