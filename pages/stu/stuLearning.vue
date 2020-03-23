<template>
	<view class="container">
		<view class="m-title">选择学习平台</view>
		<view class="m-condition">
			<text class="u-tips" @tap="handleChooseTime(true)">{{startTime || '开始时间'}}</text>
			<text class="u-middle">至</text>
			<text class="u-tips" @tap="handleChooseTime(false)">{{endTime || '结束时间'}}</text>
		</view>
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
		<link-area
			mode="date"
			startYear="2019" 
			endYear="2030"
			:current="true" 
			:disabledAfter="false"
			@confirm="handleChoose"
			@cancel="handleCancelChoose"
			ref="linkage"
			themeColor="#25a5ff"></link-area>
	</view>
</template>
<script>
export default {
	data() {
		return {
			startTime:'',
			endTime:'',
			currentSelect:'',
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
	mounted(){
		this.initData()
	},
	methods: {
		handleChooseTime(isStartTime){
			if(isStartTime){
				this.currentSelect = 'startTime'
			}else{
				this.currentSelect = 'endTime'
			}
			this.$refs.linkage.show()
		},
		handleCancelChoose(){
			this.$refs.linkage.hide()
		},
		handleChoose({checkArr,checkValue,defaultVal,result}){
			console.log(arguments,'arguments')
			this[this.currentSelect] = result;
			this.$refs.linkage.hide()
		},
		initData(){
			this.$HTTP({
				url:'/statistical/getXxqk',
				params:{
					kssj:this.startTime,
					jssj:this.endTime,
					userid:uni.getStorageSync('userId')
				},
				successCallback:({data})=>{
					if(data.code == 0){
						console.log(data,'获取参数')
					}else{
						uni.showToast({
							title:data.msg,
							icon:'none'
						})
					}
					
				}
			})
		},
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
	@import  '../../static/mp-weixin/globalStyle/platform.scss';
</style>
