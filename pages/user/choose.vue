
<template>
    <view class="content">
        <button @tap="chooseImage()">选择图片</button>
        <image class="image" :src="path"></image>
        <kps-image-cutter @ok="onok" @cancel="oncancle" :url="url" :fixed="true" :width="200" :height="200"></kps-image-cutter>
    </view>
</template>
<script src="node_modules/cos-js-sdk-v5.js" type="text/javascript"></script>
<script>
	
	import config from '../../components/config/config.vue'
    import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
    export default {
        components: {kpsImageCutter},
        data() {
            return {
                url: "",
                path: ""
            }
        },
        onLoad() {

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
                this.path = ev.path;
				console.log(this.path)
				//上传
				this.uploadphoto()
                this.url = "";
            },
            oncancle() {
                // url设置为空，隐藏控件
                this.url = "";
            },
			uploadphoto(){
				var value = uni.getStorageSync('token');
				  if(value){
					  uni.uploadFile({
					  				header: {
					  				   'Authorization' : value,
					  				},
					                  url: config.httpUrl+'/api/v1/user/avatar', //仅为示例，非真实的接口地址
					                  filePath:this.path,
					                  name: 'image',
					                  success: function (uploadFileRes) {
					                      if(JSON.parse(uploadFileRes.data)["code"]==0){
											  uni.redirectTo({
											          url: 'userspace'
											      });
										  }else{
											  config.txtshow("上传失败，请重新尝试")
										  }
					                  }
					              });
					  					  					  					  								  
				  // 	uni.request({
				  // 	    url: config.httpUrl +'/api/v1/coscredentials',
				  // 		method:"GET",
						// data:{
						// 	'name':this.path,
						// 	'size':1
						// },
							
				  // 	    header: {
				  // 		   'Authorization' : value,
				  // 	    },
				  // 	    success: (res) => {
				  // 			var jsondata=res.data
				  // 			if(jsondata.code=='0'){
						// 		console.log(jsondata.data)																
						// 		// var COS = require('cos-js-sdk-v5');
				  // 		// 		var cos = new COS({																	
				  // 		// 			     SecretID:'AKIDl6A5COepZqqFDzi4HDn57yZyCB0kOUZH',
				  // 		// 			     SecretKey:'fneKuEeohJqKfd4eqKQkSu5yavCE81cp' ,
				  // 		// 			     // XCosSecurityToken:jsondata.data["session_token"] 																			 									 
						// 		// 		 })
						// 		// cos.putObject({
						// 		//     Bucket: 'dongwei-1300856266', /* 必须 */
						// 		//     Region: 'ap-chengdu',     /* 存储桶所在地域，必须字段 */
						// 		//     Key:jsondata.data["name"],              /* 必须 */
						// 		//     StorageClass: 'STANDARD',
						// 		//     Body: 'https://dongwei-1300856266.cos.ap-chengdu.myqcloud.com/avatar/nickname.png', // 上传文件对象
						// 		//     onProgress: function(progressData) {
						// 		//         console.log(JSON.stringify(progressData));
						// 		//     }
						// 		// }, function(err, data) {
						// 		//     console.log(err || data);
						// 		// });		 
				  			
						
							
						// 	}else{
				  // 				 config.txtshow(jsondata.msg)				  				
				  // 			}								
				  // 	    },
				  // 		fail: () =>{  
				  // 			 config.txtshow('网络异常')
				  // 	     }, 
				  // 	});
				  
				  
				  }else{
				  	config.txtshow("请重新登录")
				    
				}
			}
        }
    }

</script>
<style>
.image {
    width: 200px;
    height: 200px;
}
</style>