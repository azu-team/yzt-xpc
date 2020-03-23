<template>
	<!-- 校长 -->
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
				<view class="u-title">应到/实到</view>
				<view class="u-title">学习时间</view>
			</view>
			<view class="u-list" v-for="(item, index) in dataArr" :key="index">
				<view class="u-platform"   @tap="handleNav(item)">
					<view class="u-left"><image class="icon" :src="item.logoUrl" mode="aspectFit"></image></view>
					<view class="u-right">{{ item.name }}</view>
				</view>
				<view class="u-desc">{{item.courseName}}</view>
				<view class="u-desc" @tap="handleWatchDetail(item)">{{item.yd}}/<text class="link">{{item.sd}}</text> </view>
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
			<!-- <uni-popup ref="popup"> -->
			<view :class="{'m-mask':true,'active':active}">
				<view class="m-pop-content">
					<view class="m-close">
						<text></text>
						<text>缺勤人数</text>
						<icon type="cancel" size="20" @tap="handleClose" color="#000"/>
					</view>
					<view class="t-table" >
					  <view class="t-row t-title">
					    <view class="t-th">课程名称</view>
					    <view class="t-th">缺课人</view>
					    <view class="t-th">缺课原因</view>
					    <view class="t-th">学习时间</view>
					  </view>
					  	<view class="t-row" v-for="(row, index) in trList" :key="index">
					  	  <view class="t-td">{{row.className}}</view>
					  	  <view class="t-td">{{row.name}}</view>
					  	  <view class="t-td">{{row.reason}}</view>
					  	  <view class="t-td">{{row.classTime}}</view>
					  	</view>
					</view>
					
				</view>
			</view>
			<!-- </uni-popup> -->
	</view>
</template>
<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
	components:{uniPopup},
	data() {
		return {
			active:false,
			startTime:'',
			endTime:'',
			currentSelect:'',
			trList:[
				{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},{
					className:'课程名称',
					name:'张三',
					reason:'请假',
					classTime:'9:00'
				},
			],
			dataList:[
				
			],
			dataArr: [
				{
					name: '腾讯课堂',
					value: '1',
					logoUrl: '/static/mp-weixin/tencent.png',
					courseName:'计算机原理',
					loginTime:'3月3日 9:00',
					learningTime:'9:00-10:00',
					sd:'42',
					yd:'44',
				},
				{
					name: '钉钉',
					value: '2',
					logoUrl: '/static/mp-weixin/dingding.png',
					courseName:'思想品德修养',
					loginTime:'3月4日 9:00',
					learningTime:'9:00-10:00',
					sd:'42',
					yd:'44',
				},
				{
					name: '凤凰职教云',
					value: '3',
					logoUrl: '/static/mp-weixin/fenghuang.png',
					courseName:'计算机原理',
					loginTime:'3月5日 9:00',
					learningTime:'9:00-10:00',
					sd:'42',
					yd:'44',
				},
				{
					name: '智慧职教',
					value: '4',
					logoUrl: '/static/mp-weixin/zhihui.png',
					courseName:'数学',
					loginTime:'3月3日 9:00',
					learningTime:'9:00-10:00',
					sd:'42',
					yd:'44',
				},
				{
					name: '超星泛雅',
					value: '5',
					logoUrl: '/static/mp-weixin/chaoxing.png',
					courseName:'体育',
					loginTime:'3月4日 9:00',
					learningTime:'9:00-10:00',
					sd:'42',
					yd:'44',
				}
			]
		};
	},
	mounted(){
		this.initData()
	},
	methods: {
		handleClose(){
			this.active = false;
		},
		handleWatchDetail(item){
			this.active = true
			// this.$refs.popup.open()
		},
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
@import  '../../static/mp-weixin/globalStyle/table.scss';
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
			border-radius: 10upx;
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
			.link{
				color: #338DCD;
			}
		}
	}
}
.m-condition{
	text-align: center;
	padding-bottom: 20rpx;
	font-size: 32rpx;
	.u-middle{
		margin: 0 20upx;
	}
	.u-tips{
		color: #007aff;
	}
}
.m-mask{
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba($color: #000000, $alpha: 0.4);
	z-index: 5;
	display: none;
	&.active{
		display: block;
	}
}
.m-pop-content{
	position: fixed;
	z-index: 6;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 90vw;
	height: 80vh;
	overflow: auto;
	background-color: #FFFFFF;
	border-radius: 20upx;
	padding: 0  20upx 20upx;
	.m-close{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10upx 0;
		position: sticky;
		top: 0;
		z-index: 11;
		background-color: #FFFFFF;
	}
	.t-table{
		height: calc(80vh - 100upx);
		overflow: auto;
	}
	
}
</style>
