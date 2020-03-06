<template>
	<view class="container">
		<view class="m-title">个人基本信息</view>
		<view class="m-content">
			<view class="m-line" v-for="(item, index) in infoArr" :key="index">
				<view class="u-left">{{ item.name }}</view>
				<view class="u-right">{{ item.value }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import {typeList} from '../../utils/selectLists.js'
export default {
	data() {
		return {
			typeList:typeList,
			infoArr: [
				{
					name: '姓名',
					value: '',
					key:'realname',
				},
				{
					name: 'ESN账号',
					value: '',
					key:'esn',
					
				},
				{
					name: '身份证号',
					value: '',
					key:'sfzjhm',
				},
				{
					name: '类别',
					value: '',
					key:'zysflb',
					special:'typeList'
				}
			]
		};
	},
	mounted() {
		this.getUserInfo();
	},
	methods: {
		findValue(arrName,source){
			if(!this[arrName]) return ''
			let target = ''
			this[arrName].forEach((item,index)=>{
				if(item.id == source){
					target = item.value
				}
			})
			return target
		},
		getUserInfo() {
			this.$HTTP({
				url: '/User/userData',
				params: {
					userId: uni.getStorageSync('userId')
				},
				successCallback: ({data}) => {
					if(data.code == '0'){
						let resData = data.data
						this.infoArr.forEach((item,index)=>{
							if(item.special){
								item.value = this.findValue(item.special,resData[item.key])
							}else{
								item.value = resData[item.key]
							}
						})
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.m-title {
	font-size: 36upx;
	line-height: 48upx;
	font-weight: bold;
	margin: 30upx 0;
	padding-left: 40upx;
}
.m-title::before {
	content: '';
	display: inline-block;
	width: 20upx;
	height: 36upx;
	vertical-align: middle;
	background: #ffe16f;
	margin-right: 20upx;
	border-radius: 10upx;
}
.m-content {
	padding: 30upx 40upx;
	.m-line {
		margin-top: 20upx;
		padding: 10upx 0;
		border-bottom: solid 1upx #eee;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.u-left {
			width: 150upx;
			text-align-last: justify;
			color: #6a6a6a;
			font-size: $uni-font-size-lg;
			margin-right: 40upx;
		}
		.u-right {
			color: #a7a7a7;
			font-size: $uni-font-size-lg;
		}
	}
}
</style>
