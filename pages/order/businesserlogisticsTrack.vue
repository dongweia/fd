<template>
  <div class="total-wrap">
	  <view style="margin: 0 auto;text-align: center;border-radius:10rpx;" @tap="add"><text style="font-size: 25upx;color: #333333;border:1px #999 solid;padding: 10rpx;border-radius: 20rpx;">添加物流信息</text></view>
    <div class="logistics-title">物流跟踪</div>	
    <block v-for="(item, index) in tracesData" :key="index">
      <trackNode :is-first="index===tracesData.length-1" :is-newest="index===0" :is-main-node="item.isMainNode" :node-data="item"></trackNode>
    </block>
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
		<!--物品信息-->
		<view class="meOverBg">
			<view class="line" style="display: flex;padding: 10rpx ;">
				<view style=" font-size: 28upx;color: #666666;width: 35%;margin: 0 auto;text-align: left;">描述：</view>	
				<view class="uni-flex uni-column" style="width: 100%;box-sizing: border-box;background: #f9f9f9;">
			    <textarea v-model="content" placeholder="请输入内容" style="padding: 10px;width: 100%;box-sizing: border-box;" />
			    </view>	
			</view>
			<view class="line" style="display: flex;padding: 10rpx ;">
				<view style=" font-size: 28upx;color: #666666;width: 35%;margin: 0 auto;text-align: left;">手机号：</view>	
				<input class="meVisitorTxt_01" v-model="phone"  type="number"  value="" placeholder="选填" maxlength="11" />		
			</view>
			<div class="iconfriendsHelpWrap" @tap="addmess" style="right: 50rpx;">添加</div>	
		</view>
		<!--物品信息-->	    
	</luPopupWrapper>
  </div>
</template>

<script>
import config from "../../components/config/config.vue"
import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue";
import trackNode from '@/components/trackNode.vue'
export default {
  components: {
    trackNode,
	 luPopupWrapper
  },
  onLoad:function(option) {
  		this.oid=parseInt(option.id)		
 	 	this.getall()  	 	
  },
  data () {
    return {
	  oid:0,
	  phone:"",
	  content:"",
      tracesData: [
  //       {
  //         acceptStation: '包裹已被吴亦发同学签收', // 节点描述
  //         createTime: '2019-10-24 15: 27: 16',
  //         status: 'COMPLETE', // 节点状态
  //         phone: '', // 电话
  //         statusName: '已签收', // 节点标题
  //         isMainNode: true // 是否主节点，主节点前方展示icon
  //       },
  //       {
  //         acceptStation: '由派送员蔡小坤同志配送，电话：',
  //         createTime: '2019-10-24 15: 26: 41',
  //         status: 'DELIVERING',
  //         phone: '16677778888',
  //         statusName: '运输中',
  //         isMainNode: true
  //       },
  //       {
  //         acceptStation: '已到XXX小区快递点',
  //         createTime: '2019-10-24 15: 26: 41',
  //         status: 'DELIVERING',
  //         phone: '',
  //         statusName: '运输中',
  //         isMainNode: false
  //       },
  //       {
  //         acceptStation: '已到海宁集散中心',
  //         createTime: '2019-10-24 15: 26: 18',
  //         status: 'DELIVERING',
  //         phone: '',
  //         statusName: '运输中',
  //         isMainNode: false
  //       },
  //       {
  //         acceptStation: '已到杭州集散中心',
  //         createTime: '2019-10-24 15: 26: 07',
  //         status: 'DELIVERING',
  //         phone: '',
  //         statusName: '运输中',
  //         isMainNode: false
  //       },
  //       {
  //         acceptStation: '包裹已到达余杭区集散中心',
  //         createTime: '2019-10-24 15: 25: 54',
  //         status: 'DELIVERING',
  //         phone: '',
  //         statusName: '运输中',
  //         isMainNode: false
  //       },
  //       {
  //         acceptStation: '快递员已上门取件',
  //         createTime: '2019-10-24 15: 25: 17',
  //         status: 'DELIVERING',
  //         phone: '',
  //         statusName: '已揽收',
  //         isMainNode: false
  //       },
  //       {
  //         acceptStation: '等待快递员上门揽件',
  //         createTime: '2019-10-24 15: 25: 00',
  //         status: 'WATTING_DELIVER',
  //         phone: '',
  //         statusName: '已发货',
  //         isMainNode: true
  //       },
		// {
  //         acceptStation: '您的包裹正在打包',
  //         createTime: '2019-10-24 15: 24: 00',
  //         status: 'WATTING_DELIVER',
  //         phone: '',
  //         statusName: '待发货',
  //         isMainNode: false
  //       },
  //       {
  //         acceptStation: '订单支付成功，等待商家发货',
  //         createTime: '2019-10-24 15: 22: 30',
  //         status: 'PAYED',
  //         statusName: '已支付',
  //         isMainNode: true
  //       },
  //       {
  //         acceptStation: '订单提交成功',
  //         createTime: '2019-10-24 15: 22: 00',
  //         status: 'WATTING_PAY',
  //         statusName: '已下单',
		//   phone: '11111111111',
  //         isMainNode: false
  //       }
      ],
	  
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
    }
  },
  methods:{
	  add(){
		  this.show();
	  },
	  addmess(){
		  var err = {
		      msg: '',
		      ok: true
		  }
		  if(this.content.length<1){
		  	err.ok = false;
		  	err.msg = "内容不能为空"
		  }
		  if (!err.ok) {
		      uni.showModal({
		          title: '提示',
		          content: err.msg
		      })
		      return;
		  }

		  var value = uni.getStorageSync('token')
		  uni.request({
		      url: config.httpUrl +'/api/v1/commodity/transportlog',
		  	method:"POST",
		      header: {
		  	   'Authorization' : value,
		      },
		  	data:{
		  		'oid':this.oid, //0代表所有id
		  		'content':this.content,
				'phone':this.phone
		  	},
		      success: (res) => {
		  		var jsondata=res.data
		  		if(jsondata.code=='0'){
		  			//console.log('更新物流信息成功')
					this.getall()  	
					this.close()
		  		}else{
		  			 config.txtshow(jsondata.msg)				  				
		  		}														
		      },
		  	fail: () =>{  
		  		 config.txtshow('网络异常')
		       }, 
		  });
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
	  getall(){
		  var value = uni.getStorageSync('token')
		  uni.request({
		      url: config.httpUrl +'/api/v1/commodity/transportloglist',
		  	method:"GET",
		      header: {
		  	   'Authorization' : value,
		      },
		  	data:{
		  		'oid':this.oid, //0代表所有id
		  	},
		      success: (res) => {
		  		var jsondata=res.data
		  		if(jsondata.code=='0'){
					//console.log(jsondata.data)
					var curPageData=[]
					for (var i = 0;i<jsondata.data.length; i++) {						
						curPageData.push({
							oid:jsondata.data[i]["oid"],
							acceptStation:jsondata.data[i]["content"],
							phone:jsondata.data[i]["phone"],
							status:'DELIVERING',
							statusName:'运输中',
							isMainNode:false,
							createTime:this.format(jsondata.data[i]["time"]*1000),

						})
					}
					this.tracesData=curPageData
			
		  		}else{
		  			 config.txtshow(jsondata.msg)				  				
		  		}	
		  									
		      },
		  	fail: () =>{  
		  		 config.txtshow('网络异常')
		       }, 
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
	  
  }
}
</script>

<style lang="scss" scoped>
.total-wrap {
	background-color: white;
  width: 100vw;
  height: auto;
  box-sizing: border-box;
  padding: 10rpx 40rpx 10rpx;
  .logistics-title {
    height: 72rpx;
    box-sizing: border-box;
    padding: 36rpx 0 8rpx;
    line-height: 28rpx;
    color: #4B4B4B;
    font-size: 26rpx;
    font-family: 'PingFangSC-Medium';
    text-align: left;
  }
}

.meOverBg{ background: #FFFFFF;overflow: hidden;border-radius: 12upx;margin: 30upx;width: 90%; }
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
