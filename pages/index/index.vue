<template>
	<view class="container">
		<view class="title">
			{{tips}}
		</view>
		<view class="list-wrapper">
			<view class="list-item" v-for="(item, index) in moduleArr" :key="index">
				<view class="item-wrapper" @tap="handleNavTo(item)">
					<view class="img"><image :src="item.imgUrl" mode="aspectFit"></image></view>
					<view class="text">
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="m-bottom-tips" v-if="idType == '1'">
			<text>提示：请先进行“可信教育数字身份认证” ，助您“健康与安全确认” “在线教学” 一证畅通！</text>
		</view>
	</view>
</template>

<script>
import {authorControl} from '../../utils/selectLists.js'
export default {
	data() {
		return {
			hasUserInfo: false,
			idType: '1',
			showAll:false,
			tips:'可信身份认证',
		};
	},
	onShow() {
		
		// 防止重复赋值
		// 用户权限判断标识符
		let idType = uni.getStorageSync('idType'),
			// 未激活用户 仅显示身份认证信息
			state = uni.getStorageSync('state')
		if (idType && idType == '1') {
			// 学生与家长权限一致，标识不同需要单独处理
			idType = '2';
		}
		if (idType != this.idType) this.idType = idType || '1';
		this.showAll = state == '2'
		this.tips = this.idType == '1'?'可信身份认证':'使用场景'
	},
	mounted() {
		this.getOpenId();
	},
	
	computed: {
		moduleArr() {
			return this.showAll? authorControl[this.idType] : authorControl[this.idType].slice(0,1);
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
									"21":'4',
									'99':'99'//测试账号 ， 赋初值
									
								}
								let resData = data.data;
								// userId必定存在 保存
								uni.setStorageSync('userId', resData.userId);
								if (resData.state == '1') {
									// 已认证 但未激活
									uni.setStorageSync('idType', idTypeObj[resData.zysflb]);
									// 只显示个人身份信息
									this.idType = idTypeObj[resData.zysflb];
									this.tips = '使用场景'
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
									// zysflb 为99 测试账号，显示所有模块
									this.idType = idTypeObj[resData.zysflb];
									// 显示权限下所有模块
									this.showAll = true;
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
			setTimeout(()=>{
				uni.navigateTo({
					url: item.path
				});
			},100)
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
	
	&.disabled {
		opacity: 0.6;
	}
}
.img {
	height: 165upx;
	transform: scale(1.038);
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
.m-bottom-tips{
	position: fixed;
	bottom: 5vh;
	padding: 20rpx;
	font-size: 28rpx;
	color: #333333;
}
</style>
