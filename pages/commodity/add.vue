<template>
    <view class="uni-page-body" style="box-sizing: border-box;">
        <kps-image-cutter @ok="onok" @cancel="oncancle" :url="url" :fixed="true" :width="200" :height="200"></kps-image-cutter>
        <scroll-view class="" scroll-y="true" :style="'height:'+scrollHeight+'px;'">
            <view class="" style="display: flex;justify-content: center;flex-direction: row;" @tap="chooseImage()" >
                <image :src="form.image" style="width: 200px;height: 200px;" mode="aspectFill"> </image>
            </view>
			
            <view class="list">
                <view class="li">
                    <view class="uni-row uni-flex" style="justify-content: space-between;background: #fff;padding: 15rpx;">
                        <view class="uni-flex" style="align-self: center;width: 160upx;">
                            标题
                        </view>
                        <input type="text" v-model="form.title" placeholder="请输入" maxlength="50" style="background: #f3f3f3;flex: 1;" />
                    </view>
                </view>

            </view>

            <view class="list uni-row uni-flex">
                <view class="uni-flex uni-flex-item" style="padding: 5px 0;">
                    <view class="uni-flex uni-row color-nav" style="writing-mode:tb-rl">
                        标签
                    </view>
                    <view class="uni-flex-item">
                        <view class="li uni-flex-item" v-for="(item,i) in form.attribute" :key="item.id">
                            <view class="uni-row uni-flex" style="justify-content: space-between;background: #fff;padding: 10rpx;">
                                <view class="uni-flex" style="align-self: center;">
                                    <input class="uni-flex-item" type="text" v-model="item.text"  maxlength="8"
                                        placeholder="请输入内容" style="background: #f3f3f3;flex: 1;" />
									<view class="uni-flex iconfont" style="align-self: center;margin: 0 15rpx;" @tap="delTable('attribute',i)">
										✕
									</view>
								
								</view>
                                
                            </view>
                        </view>
                        <view class="li uni-flex-item" @tap="addTable('attribute')">
                            <view class="uni-row uni-flex" style="justify-content: center;background: #fff;padding: 10px;">
                                添加
                            </view>
                        </view>
                    </view>									
                </view>
            </view>
			
			<view class="list uni-row uni-flex">
			    <view class="uni-flex uni-flex-item" style="padding: 5px 0;">
			        <view class="uni-flex uni-row color-nav" style="writing-mode:tb-rl">
			            地址选择
			        </view>			
			        <view class="uni-flex-item">
			            <view class="li uni-flex-item" v-for="(item,i) in form.attribute2" :key="item.id">
			                <view class="uni-row uni-flex" style="justify-content: space-between;background: #fff;padding: 10rpx;">
			                    <view class="uni-flex" style="align-self: center;">
			                        <input class="uni-flex-item" type="text" v-model="item.text"  maxlength="8"
			                            placeholder="请输入内容" style="background: #f3f3f3;flex: 1;" />
									<view class="uni-flex iconfont" style="align-self: center;margin: 0 15rpx;" @tap="delTable('attribute2',i)">
										✕
									</view>
								
								</view>
			                    
			                </view>
			            </view>
			            <view class="li uni-flex-item" @tap="btnClick">
			                <view class="uni-row uni-flex" style="justify-content: center;background: #fff;padding: 10px;">
			                    添加
			                </view>
			            </view>
						
			        </view>									
			    </view>
			</view>

            <view class="list uni-row uni-flex" style="background: #FFFFFF;">
                <view class="uni-flex  color-nav" style="writing-mode:tb-rl;">
                    内容
                </view>
                <view class="uni-flex uni-flex-item" style="padding: 5px;">
                    <view class="uni-flex uni-column" style="width: 100%;box-sizing: border-box;background: #f5f5f5;">
                        <textarea v-model="form.text" placeholder="请输入内容" style="padding: 10px;width: 100%;box-sizing: border-box;" />
                        </view>
                </view>
            </view>
        </scroll-view>
        <button type="default" style="width: 100%;" @tap="send">提交</button>
		<selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>
    </view>
</template>
<script src="node_modules/cos-js-sdk-v5.js" type="text/javascript"></script>
<script>
	import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue'
	
	import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	import config from '../../components/config/config.vue'
    export default {
		components: {
			kpsImageCutter,
			selectAddress
		},
        data() {
            return {
				url: "",
				scrollHeight: 1280,
                form: {
                    image:'../../static/default.jpg',
                    title: '',
                    text:'',
					attribute: [],
					attribute2: []
                },

                
            }
        },
        computed: {


        },
        onShow() {

        },
        onLoad(event) {
			var systeminfo = uni.getSystemInfoSync();
            this.systeminfo = systeminfo;
            // console.log(systeminfo.windowHeight)
            this.scrollHeight = systeminfo.windowHeight - systeminfo.statusBarHeight - 46;
            // 目前在某些平台参数会被主动 decode，暂时这样处理。
 

        },
        methods: {
			chooseImage() {
			    uni.chooseImage({
			        success: (res) => {
			            // 设置url的值，显示控件
			            this.url = res.tempFilePaths[0];
			        }
			    });
			},
			onok(ev) {
                this.form.image = ev.path;
				//上传
                this.url = "";
            },
            oncancle() {
                // url设置为空，隐藏控件
                this.url = "";
            },
            addTable(e, idx) {
                switch (e) {
                    case 'attribute':
					    if( this.form.attribute.length<5){
							 this.form.attribute.push({
							text:""
							})
						}else{
							config.txtshow("最大标签数为5")
						}                       
                        break;
                    default:
                        break;
                }
            },

            delTable(e, idx) {
                switch (e) {
                    case 'attribute':
                        this.form.attribute = this.form.attribute.filter((
                            item, i) => {								
                            if (i != idx) {

                                return e
                            }
                        })
                        break;
					case 'attribute2':
					    this.form.attribute2 = this.form.attribute2.filter((
					        item, i) => {								
					        if (i != idx) {					
					            return e
					        }
					    })
					    break;
                    default:
                        break;
                }
            },
			btnClick() {
			        this.$refs.selectAddress.show()
			    },
			successSelectAddress(address){ //选择成功回调
			    //console.log(address)
				this.form.attribute2.push({
				text:address
				})
			 },

            send() {
                var form = this.form;
                var attribute = form.attribute; //标签
				var attribute2 = form.attribute2; //地址

                // 表单验证
                var err = {
                    msg: '',
                    ok: true
                }
				if(attribute.length<=0){
					err.ok = false;
					err.msg = "至少设置一个标签"
				}else{
					for (var i = 0; i < attribute.length; i++) {                   
                    if (!attribute[i].text) {
                        err.ok = false;
                        err.msg = "标签存在空值\n位置:" + (i + 1) 
                        break;
                    }
					}
				}
                
				if(attribute2.length<=0){
					err.ok = false;
					err.msg = "至少设置一个地址"
				}else{
					for (var i = 0; i < attribute2.length; i++) {
					if (!attribute2[i].text) {
					    err.ok = false;
					    err.msg = "地址存在空值\n位置:" + (i + 1) 
					    break;
					}
					}
				}
								
                if (form.title.length < 2 || form.title.length > 50) {
                    err.ok = false;
                    err.msg = "标题限制长度2-50";

                }
				if(form.text.length < 5 ||form.text.length > 1000 ){
                    err.ok=false;
                    err.msg="内容限制5-1000"
                }
                if (!err.ok) {
                    uni.showModal({
                        title: '提示',
                        content: err.msg
                    })
                    return;
                }
				var tmp=form.image
				if(tmp=="../../static/default.jpg"){
					tmp="../../static/default.png"
				}
				
				//标签
				var str=""
				for (var i = 0; i < attribute.length; i++) {
					str+=attribute[i].text+","

				}
				
				//地址
				var str2=""
				for (var i = 0; i < attribute2.length; i++) {
					str2+=attribute2[i].text+","				
				}
				
                uni.showLoading({
                    title: '数据处理中'
                });
				var value = uni.getStorageSync('token');
				uni.uploadFile({
					header: {
					'Authorization' : value,
					},
				    url: config.httpUrl+'/api/v1/commodity', 
				    filePath:tmp,
					formData:{
						"title":form.title,						
						"image":"",
						"describe":form.text,
						"lable":str,
						"address":str2
					},
				    name: 'image',
				    success: function (uploadFileRes) {
				         if(JSON.parse(uploadFileRes.data)["code"]==0){
							  //返回
							  config.txtshow("上传成功")
							uni.navigateBack({
							        delta: 1
							    });
							}else{
								config.txtshow(uploadFileRes.data)
							}
				        }
				     });                
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import "../../common/uni.css";
	@import "../../common/yc.css";
	.color-font {
	    color: #F7F7F7;
	}
	
	.color-background {
	    color: #333333;
	    background: #F7F7F7;
	}
	.color-nav{
	    background: #0A98D5;
	    color: #ffffff;
	}
	/*每个页面公共css */
	
	
    .uni-page-body {
        background: rgb(240, 240, 240);
    }

    .color-nav {
        flex-direction: column;
        box-sizing: border-box;
        width: 0px;
        padding: 5px 12px;
        justify-content: center;
        align-items: center;
        // writing-mode: tb-rl;
    }

    .red {
        border: 1px solid #DD524D;
    }

    .list {
        background: rgb(240, 240, 240);
        padding: 5px 0;
        box-sizing: border-box;

        .li {
            padding: 1px 0;
            box-sizing: border-box;
        }
    }
	
</style>
