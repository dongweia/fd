<template>
		<!-- swiper中的transfrom会使fixed失效,此时用height固定高度 -->
	<!-- mescroll写在了子组件也无法使用mescroll-body, 只能用mescroll-uni ,因为在子组件中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法 -->
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" height="100%" top="110" :down="downOption" @down="downCallback" :up="upOption"
	 @up="upCallback" @emptyclick="emptyClick">
		<view class="cu-bar tabbar bg-white fixed" :style="[{top:CustomBar+'rpx'}]">
			<view style="display: flex;width: 45%;">
				<view @tap="togglePopup('bottom','popup')" style="display: flex;align-items: center;margin: 0 auto;">
					<view v-for="(item, index) in selectList" :key="index">
						{{item.txt}}<span v-show="index == 0 || index == 1">,</span>
					</view>
				</view>
			</view>
			至
			<view style="display: flex;width: 45%;margin-right: 20rpx;">
				<view @tap="togglePopup2('bottom','popup2')" style="display: flex;align-items: center;margin: 0 auto;">
					<view v-for="(item2, index2) in selectList2" :key="index2">
						{{item2.txt}}<span v-show="index2 == 0 || index2 == 1">,</span>
					</view>
				</view>
			</view>
			
			<uni-popup ref="popup" :type="type" @change="change">
				<view class="select-border">
					<view class="header">
						<view class="title">
							选择地区
						</view>
						<view class="cancel-icon" @tap="cancel('popup')">
							X
						</view>
					</view>
					<view class="select-box">
						<view class="select-item">
							<view class="select-list" @tap="tabEvent(index)" :class="indexTab == index ? 'selected' : ''" v-for="(item, index) in selectList"
							 :key="index">
								{{item.txt}}
							</view>
						</view>
						<view class="select-item-box">
							<!-- 省 -->
							<view class="province-box" v-show="proviceShow">
								<view class="select-list-cont" @tap="provinceEvent(item,index)" v-for="(item,index) in provinceData" :key="item.code">
									{{item.name}}<span class="check" v-show="index == checkOne">√</span>
								</view>
							</view>
							<!-- 市 -->
							<view class="city-box" v-show="cityShow">
								<view class="select-list-cont" @tap="cityEvent(item,index)" v-for="(item,index) in cityData" :key="item.code">
									{{item.name}}<span class="check" v-show="index==checkTwo">√</span>
								</view>
							</view>
							<!-- 区 -->
							<view class="area-box" v-show="areaShow">
								<view class="select-list-cont" @tap="areaEvent(item,index)" v-for="(item,index) in areaData" :key="item.code">
									{{item.name}}<span class="check" v-show="index==checkThree">√</span>
								</view>
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
			
			<uni-popup ref="popup2" :type="type2" @change="change2">
				<view class="select-border">
					<view class="header">
						<view class="title">
							选择地区
						</view>
						<view class="cancel-icon" @tap="cancel2('popup2')">
							X
						</view>
					</view>
					<view class="select-box">
						<view class="select-item">
							<view class="select-list" @tap="tabEvent2(index2)" :class="indexTab2 == index2 ? 'selected' : ''" v-for="(item2, index2) in selectList2"
							 :key="index2">
								{{item2.txt}}
							</view>
						</view>
						<view class="select-item-box">
							<!-- 省 -->
							<view class="province-box" v-show="proviceShow2">
								<view class="select-list-cont" @tap="provinceEvent2(item2,index2)" v-for="(item2,index2) in provinceData2" :key="item2.code">
									{{item2.name}}<span class="check" v-show="index2 == checkOne2">√</span>
								</view>
							</view>
							<!-- 市 -->
							<view class="city-box" v-show="cityShow2">
								<view class="select-list-cont" @tap="cityEvent2(item2,index2)" v-for="(item2,index2) in cityData2" :key="item2.code">
									{{item2.name}}<span class="check" v-show="index2==checkTwo2">√</span>
								</view>
							</view>
							<!-- 区 -->
							<view class="area-box" v-show="areaShow2">
								<view class="select-list-cont" @tap="areaEvent2(item2,index2)" v-for="(item2,index2) in areaData2" :key="item2.code">
									{{item2.name}}<span class="check" v-show="index2==checkThree2">√</span>
								</view>
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
			
		</view>
		<qit-list :list="dataList"></qit-list>
	</mescroll-uni>			
	</view>

</template>


<script>
	import config from '../../components/config/config.vue'
	
	import cityDatas from '@/components/city.area.js'
	import uniPopup from '@/components/uni-pop.vue'
	
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import QitList from '@/components/Qit-list.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			QitList,
			uniPopup
		},
		data() {
			return {
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
				
				
				provinceData: cityDatas,
				cityData: [],
				areaData: [],
				selectList: [{
					txt: '请选择'
				}, {
					txt: '请选择'
				}, {
					txt: '请选择'
				}],
				tabOne: '请选择',
				indexTab: 0,
				proviceShow: true,
				areaShow: false,
				cityShow: false,
				show: false,
				type: '',
				checkOne: null,
				checkTwo: null,
				checkThree: null,
				
				provinceData2: cityDatas,
				cityData2: [],
				areaData2: [],
				selectList2: [{
					txt: '请选择'
				}, {
					txt: '请选择'
				}, {
					txt: '请选择'
				}],
				tabOne2: '请选择',
				indexTab2: 0,
				proviceShow2: true,
				areaShow2: false,
				cityShow2: false,
				show2: false,
				type2: '',
				checkOne2: null,
				checkTwo2: null,
				checkThree2: null,
				
				choose1:false,
				choose2:false,
				status1:false,
				status2:false,
			}
		},
		onLoad(options) {

		},
		mounted() {
			this.mescroll.triggerDownScroll();
		},
		onTabItemTap(){
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
			upCallback(page) {
				this.addresschange()

				 // var curPageData = []
				// for (var i = 0; i < 5; i++) {
				// 	curPageData.push({
				// 		image:"https://dongwei-1300856266.cos.ap-chengdu.myqcloud.com/avatar/a2522a91-792f-4ebb-a413-2748cf975f09.jpeg",
				// 		tag: "dfd",
				// 		price :100,
				// 		oldPrice:100
				// 	})
				// }
				// console.log(curPageData)
				
				// this.mescroll.endByPage(curPageData.length,0);
				// this.dataList = this.dataList.concat(curPageData);
				
				
				
				


				// goods_list({
				// }).then(res => {
				// 	var curPageData = res.data.rows || []
				// 	curPageData.forEach(item => {
				// 		const mainImg = JSON.parse(item.mainImg)
				// 		item.mainImg = mainImg[0].path
				// 		item.tag = item.tag.split(",")
				// 		item.price = (item.price / 100).toFixed(2)
				// 		item.oldPrice = (item.oldPrice / 100).toFixed(2)
				// 	})
				// 	this.mescroll.endByPage(curPageData.length, res.data.pages);
				// 	this.dataList = this.dataList.concat(curPageData);
				// 	if (this.dataList.length < 1) {
				// 		this.mescroll.showEmpty()
				// 	}
				// }).catch(() => {
				// 	//联网失败, 结束加载
				// 	this.mescroll.endErr();
				// })
				
				
			},
			//点击空布局按钮的回调
			emptyClick() {

			},
			
			//初始加载，以及地址变动的界面加载
			addresschange(){
				//将选项框中的地址转成两个字符串
				var selectList=this.selectList
				var selectList2=this.selectList2
				
				var address1=""
				for (var i = 0; i <selectList.length; i++) {
					if(i==1 && selectList[i]==selectList[0]){ }else{
						if(selectList[i].txt=="请选择"){
							address1+=""+","
						}else{
							address1+=selectList[i].txt+","
						}			
						
					}//解决地址选择器差异问题

									
				}
				
				var address2=""
				for (var i = 0; i <selectList2.length; i++) {
					if(i==1 && selectList2[i]==selectList2[0]){ }else{
						if(selectList2[i].txt=="请选择"){
							address2+=""+","
						}else{
							address2+=selectList2[i].txt+","
						}				
					}//解决地址选择器差异问题
								
				}
				
				var value = uni.getStorageSync('token');
				if(value){
				  	uni.request({
				  	    url: config.httpUrl +'/api/v1/commoditylist',
				  		method:"GET",
				  	    header: {
				  		   'Authorization' : value,
				  	    },
						data:{
							'mid':0, //0代表所有id
							'startaddress':address1, //address有值且mid为0是根据地址条件查询
							'endaddress':address2
						},
				  	    success: (res) => {
				  			var jsondata=res.data
				  			if(jsondata.code=='0'){
								var curPageData = []
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
								this.dataList = curPageData;
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
			
			
			
			
			togglePopup(type, open) {
				this.type = type
				if (open === 'tip') {
					this.show = true
				} else {
					this.$refs[open].open()
				}
			},
			cancel(type) {
				if (type === 'tip') {
					this.show = false
					return
				}
				this.$refs[type].close()
			},
			change(e) {
				if(this.status1==true){
					this.status1=false
				}else{
					this.status1=true
				}
				this.ischooseok()
				if (e.show == true) {
					uni.hideTabBar()
				} else {
					uni.showTabBar()
				}
			},
			tabEvent(index) {
				this.indexTab = index
				if (this.indexTab == 0) {
					this.proviceShow = true
					this.cityShow = false
					this.areaShow = false
					// this.checkOne = null
					this.checkTwo = null
					this.checkThree = null
					// this.cityData = []
					this.areaData = []
					// this.selectList[0].txt = "请选择"
					this.selectList[1].txt = "请选择"
					this.selectList[2].txt = "请选择"
				} else if (this.indexTab == 1) {
					this.proviceShow = false
					this.cityShow = true
					this.areaShow = false
					// this.checkTwo = null
					this.checkThree = null
					// this.areaData = []
					// this.selectList[1].txt = "请选择"
					this.selectList[2].txt = "请选择"
				} else if (this.indexTab == 2) {
					this.proviceShow = false
					this.cityShow = false
					this.areaShow = true
				}
			},
			provinceEvent(data, index) {				
				this.checkOne = index
				this.selectList[0].txt = data.name
				this.indexTab = 1
				this.proviceShow = false
				this.cityShow = true
				this.areaShow = false
				this.cityData = data.cityList
				this.choose1=true
			},
			cityEvent(data, index) {				
				this.checkTwo = index
				this.selectList[1].txt = data.name
				this.indexTab = 2
				this.proviceShow = false
				this.cityShow = false
				this.areaShow = true
				this.areaData = data.areaList
				this.choose1=true
			},
			areaEvent(data, index) {
				this.checkThree = index
				this.selectList[2].txt = data.name
				this.choose1=true
			},		
				
			togglePopup2(type2, open2) {
				this.type2 = type2
				if (open2 === 'tip') {									
					this.show2 = true
				} else {								
					this.$refs[open2].open()
				}
			},
			cancel2(type2) {

				if (type2 === 'tip') {
					this.show2 = false
					return
				}
				this.$refs[type2].close()
			},
			change2(e) {
				if(this.status2==true){
					this.status2=false
				}else{
					this.status2=true
				}
				if (e.show2 == true) {
					uni.hideTabBar()
					
				} else {
					uni.showTabBar()
				}
				this.ischooseok()
			},
			tabEvent2(index2) {
				this.indexTab2 = index2
				if (this.indexTab2 == 0) {
					this.proviceShow2 = true
					this.cityShow2 = false
					this.areaShow2 = false
					// this.checkOne = null
					this.checkTwo2 = null
					this.checkThree2 = null
					// this.cityData = []
					this.areaData2 = []
					// this.selectList[0].txt = "请选择"
					this.selectList2[1].txt = "请选择"
					this.selectList2[2].txt = "请选择"
				} else if (this.indexTab2 == 1) {
					this.proviceShow2 = false
					this.cityShow2 = true
					this.areaShow2 = false
					// this.checkTwo = null
					this.checkThree2 = null
					// this.areaData = []
					// this.selectList[1].txt = "请选择"
					this.selectList2[2].txt = "请选择"
				} else if (this.indexTab2 == 2) {
					this.proviceShow2 = false
					this.cityShow2 = false
					this.areaShow2 = true
				}
			},
			provinceEvent2(data2, index2) {				
				this.checkOne2 = index2
				this.selectList2[0].txt = data2.name
				this.indexTab2 = 1
				this.proviceShow2 = false
				this.cityShow2 = true
				this.areaShow2 = false
				this.cityData2 = data2.cityList
				this.choose2=true
			},
			cityEvent2(data2, index2) {				
				this.checkTwo2 = index2
				this.selectList2[1].txt = data2.name
				this.indexTab2 = 2
				this.proviceShow2 = false
				this.cityShow2 = false
				this.areaShow2 = true
				this.areaData2 = data2.areaList
				this.choose2=true
			},
			areaEvent2(data2, index2) {
				this.checkThree2 = index2
				this.selectList2[2].txt = data2.name
				this.choose2=true
				//判断始末位置是否填写完毕

			},
			ischooseok(){
				if(this.status1==false && this.status2==false){
					if(this.choose1==false){
						config.txtshow("请选择当前位置")
					}else if(this.choose2==false){
						config.txtshow("请选择目标位置")
					}else{
						this.addresschange()
					}
				}else{
					//无操作
				}
				
			}
			
			
		}
	}
</script>


<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 35upx;
	}
	 
	.title {
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}
	 
	.cancel-icon {
		font-size: 34upx;
		color: rgba(153, 153, 153, 1);
	}
	 
	.check {
		padding-left: 17upx;
		color: #FF7E28;
	}
	 
	.select-box {
		height: 1024upx;
	}
	 
	.select-item {
		display: flex;
		align-items: center;
		padding-left: 50upx;
		margin-bottom: 20upx;
		border-bottom: 1px solid #F6F6F6;
	}
	 
	.select-list {
		width: 120upx;
		height: 40upx;
		text-align: center;
		overflow: hidden;
		/*超出部分隐藏*/
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
		white-space: nowrap;
		/*规定段落中的文本不进行换行 */
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin-right: 30upx;
		border-bottom: 1px solid #FFFFFF;
	}
	 
	.select-list-cont {
		padding-left: 67upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 40px;
	}
	 
	.selected {
		border-bottom: 1px solid #F0AD4E;
		color: rgba(255, 133, 0, 1);
	}
	
</style>