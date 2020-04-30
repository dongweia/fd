
<script>
	const httpUrl = 'http://192.168.0.5:3000'
	const wsUrl='ws://192.168.0.5:3000'
	function txtshow(mess){
		uni.showToast({
			icon:"none",
		    title: mess,
		    duration: 2000
		});
	}
	    function newwebsocket() {
	        uni.connectSocket({
	                 url: wsUrl+'/api/v1/user/websocket',
	                 protocols: [value],
	               });
	    }
	    // 暴露出这些属性和方法
	    export default {
	        httpUrl,
			wsUrl,
			txtshow,
			newwebsocket,
	    }
</script>

<style>
</style>
