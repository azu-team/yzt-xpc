<template>
	<view class="container">
		<view class="m-title">选择学习平台</view>
		<view class="m-content">
			<view class="u-title-wrapper">
				<view class="u-title"></view>
				<view class="u-title">上次课程名称</view>
				<view class="u-title">登录时间</view>
				<view class="u-title">学习时间</view>
			</view>
			<view class="u-list" v-for="(item, index) in dataArr" :key="index">
				<view class="u-platform"   @tap="handleNav(item)">
					<view class="u-left"><image class="icon" :src="item.logoUrl" mode="aspectFit"></image></view>
					<view class="u-right">{{ item.name }}</view>
				</view>
				<view class="u-desc">{{item.courseName}}</view>
				<view class="u-desc">{{item.loginTime}}</view>
				<view class="u-desc">{{item.learningTime}}</view>
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
					logoUrl: '/static/mp-weixin/tencent.png',
					courseName:'计算机原理',
					loginTime:'3月3日 9:00',
					learningTime:'9:00-10:00',
				},
				{
					name: '钉钉',
					value: '2',
					logoUrl: '/static/mp-weixin/dingding.png',
					courseName:'思想品德修养',
					loginTime:'3月4日 9:00',
					learningTime:'9:00-10:00',
				},
				{
					name: '凤凰职教云',
					value: '3',
					logoUrl: '/static/mp-weixin/fenghuang.png',
					courseName:'计算机原理',
					loginTime:'3月5日 9:00',
					learningTime:'9:00-10:00',
				},
				{
					name: '智慧职教',
					value: '4',
					logoUrl: '/static/mp-weixin/zhihui.png',
					courseName:'数学',
					loginTime:'3月3日 9:00',
					learningTime:'9:00-10:00',
				},
				{
					name: '超星泛雅',
					value: '5',
					logoUrl: '/static/mp-weixin/chaoxing.png',
					courseName:'体育',
					loginTime:'3月4日 9:00',
					learningTime:'9:00-10:00',
				}
			]
		};
	},
	onLoad(evt) {},
	methods: {
		handleNav() {
			uni.showToast({
				title: '暂未开通',
				icon: 'none'
			});
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
	.u-title-wrapper{
		color: #197EC6;
		vertical-align: middle;
		font-size: 28rpx;
		.u-title{
			display: inline-block;
			width: 25%;
			vertical-align: middle;
		}
	}
	// display: flex;
	// justify-content: flex-start;
	// align-items: center;
	// flex-wrap: wrap;
	.u-list {
		width: 100%;
		display: flex;
		align-items: center;

		.u-platform {
			display: inline-block;
			width: 20%;
			margin: 0 2.5%;
			text-align: center;
			padding: 20upx 0;
			// margin-bottom: 30upx;
			border-radius: 10upx;
			// box-shadow: 0 0 15upx #cccccc;
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
				font-size: 28upx;
				color:$uni-text-color;
				vertical-align: middle;
			}
		}
		.u-desc{
			display: inline-block;
			width: 25%;
			font-size: 28rpx;
			color: $uni-text-color;
			word-break: break-all;
			padding: 10upx;
		}
	}
}
</style>
