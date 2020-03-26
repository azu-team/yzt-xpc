<template>
	<!-- 行政人员 -->
	<view class="container">
		<view class="m-title">选择学习平台</view>
		<view class="m-condition">
			<text class="u-tips" @tap="handleChooseTime(true)">{{startTime || '开始时间'}}</text>
			<text class="u-middle">至</text>
			<text class="u-tips" @tap="handleChooseTime(false)">{{endTime || '结束时间'}}</text>
			<uni-tag @click="handleClearData" style="display: inline-block;width: 90upx;margin-left: 20upx;" text="清空" type="primary" size="small"></uni-tag>
		</view>
		<view class="m-content">
			<view class="u-title-wrapper">
				<view class="u-title"></view>
				<view class="u-title">辖区学校使用数</view>
				<view class="u-title">使用人数</view>
				<view class="u-title">课程门数</view>
				<view class="u-title">课时总长</view>
			</view>
			<view class="u-list" v-for="(item, index) in dataArr" :key="index">
				<view class="u-platform"   @tap="handleNav(item)">
					<view class="u-left"><image class="icon" :src="item.logoUrl" mode="aspectFit"></image></view>
					<view class="u-right">{{ item.name }}</view>
				</view>
				<view class="u-desc" @tap="handleWatchDetail(item)"><text class="link">{{item.schoolNum||''}}</text></view>
				<view class="u-desc" >{{item.userNum ||''}} </view>
				<view class="u-desc">{{item.courseNum||''}}</view>
				<view class="u-desc">{{item.totalTime||''}}</view>
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
			<view :class="{'m-mask':true,'active':active}" >
				<view class="m-pop-content">
					<view class="m-close">
						<text></text>
						<text>学校列表</text>
						<icon type="cancel" size="20" @tap="handleClose" color="#000"/>
					</view>
					<view class="t-table" >
					  <view class="t-row t-title">
					    <view class="t-th">学校名称</view>
					  </view>
					  	<view class="t-row" v-for="(row, index) in trList" :key="index">
					  	  <view class="t-td">{{row.schoolName}}</view>
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
			trList:[],
			dataArr: [
				// {
				// 	name: '腾讯课堂',
				// 	value: '1',
				// 	logoUrl: '/static/mp-weixin/tencent.png',
				// 	schoolNum:'10',
				// 	loginTime:'3月3日 9:00',
				// 	learningTime:'9:00-10:00',
				// 	courseNum:'42',
				// 	totalTime:'44h',
				// 	userNum:100,
				// },
				// {
				// 	name: '钉钉',
				// 	value: '2',
				// 	logoUrl: '/static/mp-weixin/dingding.png',
				// 	schoolNum:'11',
				// 	loginTime:'3月4日 9:00',
				// 	learningTime:'9:00-10:00',
				// 	courseNum:'42',
				// 	totalTime:'44h',
				// 	userNum:100,
				// },
				// {
				// 	name: '凤凰职教云',
				// 	value: '3',
				// 	logoUrl: '/static/mp-weixin/fenghuang.png',
				// 	schoolNum:'12',
				// 	loginTime:'3月5日 9:00',
				// 	learningTime:'9:00-10:00',
				// 	courseNum:'42',
				// 	totalTime:'44h',
				// 	userNum:100,
				// },
				// {
				// 	name: '智慧职教',
				// 	value: '4',
				// 	logoUrl: '/static/mp-weixin/zhihui.png',
				// 	schoolNum:'13',
				// 	loginTime:'3月3日 9:00',
				// 	learningTime:'9:00-10:00',
				// 	courseNum:'42',
				// 	totalTime:'44h',
				// 	userNum:100,
				// },
				// {
				// 	name: '超星泛雅',
				// 	value: '5',
				// 	logoUrl: '/static/mp-weixin/chaoxing.png',
				// 	schoolNum:'11',
				// 	loginTime:'3月4日 9:00',
				// 	learningTime:'9:00-10:00',
				// 	courseNum:'42',
				// 	totalTime:'44h',					
				// 	userNum:100,
				// }
			]
		};
	},
	mounted(){
		this.initData()
	},
	methods: {
		getDetailData(row){
			this.trList  = []
			this.$HTTP({
				url:'/statistical/getGlztkXx',
				params:{
					userid:uni.getStorageSync('userId'),
					'xxjh':row.xxjh
				},
				successCallback:({data})=>{
					console.log(data,'data')
					if(data.code ==0){
						let dataArr = data.data.map(item=>{
							return{
								schoolName:item,
							}
						})
						for(let i = 0;i<4;i++){
							dataArr = dataArr.concat(dataArr)
						}
						// dataArr = [...dataArr,...dataArr,...dataArr,...dataArr]
						this.trList = dataArr
					}else{
						
					}
				}
			})
		},
		handleClose(){
			this.active = false;
		},
		handleWatchDetail(item){
			this.active = true
			this.getDetailData(item)
			// this.$refs.popup.open()
		},
		handleClearData(){
			this.startTime = '';
			this.endTime = ''
			this.initData()
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
			this[this.currentSelect] = result;
			this.$refs.linkage.hide()
			this.initData()
		},
		initData(){
			this.$HTTP({
				url:'/statistical/getGlzck',
				params:{
					kssj:this.startTime,
					jssj:this.endTime,
					userid:uni.getStorageSync('userId')
				},
				successCallback:({data})=>{
					if(data.code == 0){
						let dataObj = data.data
						this.dataArr = []
						/* 	
						{
							name: '超星泛雅',
							value: '5',
							logoUrl: '/static/mp-weixin/chaoxing.png',
							schoolNum:'11',
							loginTime:'3月4日 9:00',
							learningTime:'9:00-10:00',
							courseNum:'42',
							totalTime:'44h',					
							userNum:100,
						} */
						for(let key in dataObj){
							this.dataArr.push({
								...dataObj[key],
								name:dataObj[key].name||'名称',
								logoUrl:dataObj[key].imgUrl,
								
								schoolNum:dataObj[key].xqxxs,
								userNum:dataObj[key].syrs,
								courseNum:dataObj[key].kcs,
								totalTime:dataObj[key].kss,
							})
						}
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
			width: 20%;
			vertical-align: middle;
		}
	}
	.u-list {
		width: 100%;
		display: flex;
		align-items: center;

		.u-platform {
			display: inline-block;
			width: 15%;
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
			width: 20%;
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
	z-index: 50;
	display: none;
	&.active{
		display: block;
	}
}
.m-pop-content{
	position: fixed;
	z-index: 60;
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
