<template>
	<view class="container">
		<view class="m-title">选择授课平台</view>
		<view class="m-content">
			<view class="u-list" v-for="(item, index) in dataArr" :key="index" @tap="handleNav(item)">
				<view class="u-left"><image class="icon" :src="item.logoUrl" mode="aspectFit"></image></view>
				<view class="u-right">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			dataArr: [
				{
					name: '腾讯课堂',
					value: '1',
					logoUrl:'/static/mp-weixin/tencent.png',
				},
				{
					name: '钉钉',
					value: '2',
					logoUrl:'/static/mp-weixin/dingding.png',
				},
				{
					name: '凤凰职教云',
					value: '3',
					logoUrl:'/static/mp-weixin/fenghuang.png',
				},
				{
					name: '智慧职教',
					value: '4',
					logoUrl:'/static/mp-weixin/zhihui.png',
				},
				{
					name: '超星泛雅',
					value: '5',
					logoUrl:'/static/mp-weixin/chaoxing.png',
				}
			]
		};
	},
	onLoad(evt) {},
	methods: {
		handleNav(){
			uni.showToast({
				title:'暂未开通',
				icon:'none'
			})
		}
	}
};
</script>
<style lang="scss" scoped>
.container {
	min-height: 100vh;
}
.m-title {
	padding: 30upx 0 0 40upx;
}
.m-content {
	padding: 20upx 20upx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	.u-list {
		width: 28%;
		margin: 0 2.5%;
		text-align: center;
		padding: 20upx 0;
		margin-bottom: 30upx;
		border-radius: 10upx;
		box-shadow: 0 0 15upx #cccccc;
		.u-left {
			font-size: 0;
			line-height: 0;
			.icon {
				width: 100upx;
				height: 100upx;
			}
		}
		.u-right {
			margin-top: 10upx;
			font-size: 32upx;
			color: #303133;
			vertical-align: middle;
		}
	}
}
</style>
