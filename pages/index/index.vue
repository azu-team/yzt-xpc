<template>
	<view class="container">
		<view class="title">
			使用场景
			<!-- todo 不需要退出 -->
			<!-- <view class="u-tips" v-if="idType != 1" @tap="handleUserOut">退出</view> -->
		</view>
		<view class="list-wrapper">
			<view class="list-item" v-for="(item, index) in moduleArr" :key="index">
				<view class="item-wrapper" @click="handleNavTo(item)">
					<view class="img"><image :src="item.imgUrl" mode="aspectFit"></image></view>
					<view class="text">
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	data() {
		return {
			hasUserInfo: false,
			idType: '1',
			showAll:false,
		};
	},
	onShow() {
		
		// 防止重复赋值
		let idType = uni.getStorageSync('idType'),
			state = uni.getStorageSync('state')
		if (idType && idType == '1') {
			// 学生与家长权限一致，标识不同需要单独处理
			idType = '2';
		}
		if (idType != this.idType) this.idType = idType || '1';
		this.showAll = state == '2'
	},
	mounted() {
		this.getOpenId();
	},
	
	computed: {
		moduleArr() {
			let moduleCon = {
				'1': [
					{
						name: '身份认证',
						imgUrl: '../../static/mp-weixin/imgs/1.png',
						path: '/pages/idConfirm/idConfirm'
					}
				],
				'2': [
					{
						name: '个人信息',
						imgUrl: '../../static/mp-weixin/imgs/1.png',
						path: '/pages/idConfirm/baseInfo'
					},
					{
						name: '学生每日健康打卡',
						imgUrl: '../../static/mp-weixin/imgs/2.png',
						path: '/pages/healthCard/healthCard'
					},
					{
						name: '在线学习',
						imgUrl: '../../static/mp-weixin/imgs/3.png',
						path: '/pages/stu/stuLearning'
					},
					{
						name: '查看学习情况',
						imgUrl: '../../static/mp-weixin/imgs/4.png',
						path: '/pages/stu/stuStatus'
					},
					{
						name: '一键求助',
						imgUrl: '../../static/mp-weixin/imgs/5.png',
						path: '/pages/common/quickHelp'
					},
					{
						name: '健康情况收集',
						imgUrl: '../../static/mp-weixin/imgs/6.png',
						path: '/pages/common/healthStatus'
					},
					{
						name: '安全情况',
						imgUrl: '../../static/mp-weixin/imgs/7.png',
						path: '/pages/common/safeStatus'
					}
				],
				'3': [
					{
						name: '个人信息',
						imgUrl: '../../static/mp-weixin/imgs/1.png',
						path: '/pages/idConfirm/baseInfo'
					},
					{
						name: '在线授课',
						imgUrl: '../../static/mp-weixin/pic2.png',
						path: '/pages/teacher/teaTeaching'
					},
					{
						name: '查看授课情况',
						imgUrl: '../../static/mp-weixin/pic3.png',
						path: '/pages/teacher/teaStatistic'
					}
				],
				'4': [
					{
						name: '个人信息',
						imgUrl: '../../static/mp-weixin/imgs/1.png',
						path: '/pages/idConfirm/baseInfo'
					},
					{
						name: '查看与统计所辖区域授课情况',
						imgUrl: '../../static/mp-weixin/pic4.png',
						path: '/pages/edu/eduTeachingStatistic'
					},
					{
						name: '查看与统计所辖区域学习情况',
						imgUrl: '../../static/mp-weixin/pic1.png',
						path: '/pages/edu/eduLearningStatistic'
					}
				]
			};
			return this.showAll? moduleCon[this.idType] : moduleCon[this.idType].slice(0,1);
		}
	},
	methods: {
		getOpenId() {
			uni.login({
				provider: 'weixin',
				success: ({ code }) => {
					this.$HTTP({
						url: '/UserAuth/openid',
						params: {
							code
						},
						successCallback: ({ data }) => {
							if (data.code == '0') {
								let idTypeObj={
									"1":'2',
									"2":'3',
									"20":'2',
									"21":'4'
								}
								let resData = data.data;
								// userId必定存在 保存
								uni.setStorageSync('userId', resData.userId);
								if (resData.state == '1') {
									// 已认证 但未激活
									uni.setStorageSync('idType', idTypeObj[resData.zysflb]);
									// 只显示个人身份信息
									this.idType = idTypeObj[resData.zysflb];
								} else if (resData.state == '0') {
									// 跳转注册部分
									uni.navigateTo({
										url: '/pages/idConfirm/idConfirm'
									});
								} else if(resData.state == '2'){
									// 登录正常
									uni.setStorageSync('state',resData.state)
									uni.setStorageSync('idType', idTypeObj[resData.zysflb]);
									// 显示权限模块
									this.idType = idTypeObj[resData.zysflb];
									// 显示权限下所有模块
									this.showall = true;
								}
							} else {
								uni.showToast({
									title: data.msg,
									icon: 'none'
								});
							}
						},
						failCallback: ({ data }) => {
							uni.showToast({
								title: '非合法域名',
								icon: 'none'
							});
						}
					});
				},
				fail: () => {
					uni.showToast({
						title: '微信获取信息失败',
						icon: 'none'
					});
				}
			});
		},
		// 退出清缓存
		handleUserOut() {
			uni.removeStorageSync('idType');
			this.idType = 1;
		},
		handleNavTo(item) {
			uni.navigateTo({
				url: item.path
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0 20upx 0;
	background: #f4f8ff;
	min-height: 100vh;
}
.title {
	font-size: 36upx;
	line-height: 48upx;
	font-weight: bold;
	padding: 30upx 0 30upx 0;
	vertical-align: middle;
	position: sticky;
	top: 0;
	background-color: #f4f8ff;
	z-index: 2;
	.u-tips {
		display: inline-block;
		font-size: 26upx;
		padding: 3upx 20upx;
		border-radius: 5upx;
		background-color: #ffffff;
		color: #303133;
		margin-left: 15upx;
	}
}
.title::before {
	content: '';
	display: inline-block;
	width: 20upx;
	height: 36upx;
	vertical-align: middle;
	background: #ffe16f;
	margin-right: 20upx;
	border-radius: 10upx;
}
.list-wrapper {
	display: flex;
	flex-wrap: wrap;
}
.list-item {
	width: 50%;
	padding: 20upx;
	display: inline-flex;
	justify-content: center;
	align-items: center;
}
.item-wrapper {
	width: 90%;
	height: 260upx;
	transform: scale(1.05);
	&.disabled {
		opacity: 0.6;
	}
}
.img {
	height: 165upx;
}
.text {
	font-size: 30upx;
	background: #fff;
	color: #333333;//#808080;
	height: 95upx;
	display: flex;
	align-items: center;
	padding: 0 20upx;
	border-bottom-left-radius: 20upx;
	border-bottom-right-radius: 20upx;
}
image {
	width: 100%;
	height: 100%;
}
</style>
