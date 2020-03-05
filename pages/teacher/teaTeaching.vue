<template>
	<view class="container">
		<view class="m-title">选择授课平台</view>
		<view class="m-content">
			<view class="u-list" v-for="(item,index) in dataArr" :key="index">
					<view class="u-left">
						<image class="icon" src="/static/mp-weixin/dingding.png" mode="aspectFit"></image>
					</view>
					<view class="u-right">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				dataArr:[
					{
						name:'网易云课堂',
						value:'1'
					},{
						name:'钉钉',
						value:'2'
					},{
						name:'腾讯课堂',
						value:'3'
					},{
						name:'云朵课堂',
						value:'4'
					},{
						name:'环球网校',
						value:'4'
					}
				]
			}
		},
		onLoad(evt){
			
		},
		methods:{
			
		}
	}
</script>
<style lang="scss" scoped>
	.container{
		min-height: 100vh;
	}
	.m-title{
		padding: 30upx 0 0 40upx;
	}
	.m-content{
		padding: 20upx 20upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		.u-list{
			width: 28%;
			margin: 0 2.5%;
			text-align: center;
			padding: 20upx 0;
			margin-bottom: 30upx;
			border-radius: 10upx;
			box-shadow: 0 0 15upx #CCCCCC;
			.u-left{
				font-size: 0;
				line-height: 0;
				.icon{
					width: 100upx;
					height: 100upx;
				}
			}
			.u-right{
				margin-top: 10upx;
				font-size: 32upx;
				color: #303133;
				vertical-align: middle;
			}
		}
	}
</style>