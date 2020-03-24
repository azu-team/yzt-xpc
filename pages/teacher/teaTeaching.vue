<template>
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
					    <view class="t-th">上课时间</view>
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
				// {
				// 	className:'课程名称',
				// 	name:'张三',
				// 	reason:'请假',
				// 	classTime:'9:00'
				// }
			],
			dataArr: [
				// {
				// 	name: '腾讯课堂',
				// 	value: '1',
				// 	logoUrl: '/static/mp-weixin/tencent.png',
				// 	courseName:'计算机原理',
				// 	loginTime:'3月3日 9:00',
				// 	learningTime:'9:00-10:00',
				// 	sd:'42',
				// 	yd:'44',
				// },
				// {
				// 	name: '钉钉',
				// 	value: '2',
				// 	logoUrl: '/static/mp-weixin/dingding.png',
				// 	courseName:'思想品德修养',
				// 	loginTime:'3月4日 9:00',
				// 	learningTime:'9:00-10:00',
				// 	sd:'42',
				// 	yd:'44',
				// },
				// {
				// 	name: '凤凰职教云',
				// 	value: '3',
				// 	logoUrl: '/static/mp-weixin/fenghuang.png',
				// 	courseName:'计算机原理',
				// 	loginTime:'3月5日 9:00',
				// 	learningTime:'9:00-10:00',
				// 	sd:'42',
				// 	yd:'44',
				// },
				// {
				// 	name: '智慧职教',
				// 	value: '4',
				// 	logoUrl: '/static/mp-weixin/zhihui.png',
				// 	courseName:'数学',
				// 	loginTime:'3月3日 9:00',
				// 	learningTime:'9:00-10:00',
				// 	sd:'42',
				// 	yd:'44',
				// },
				// {
				// 	name: '超星泛雅',
				// 	value: '5',
				// 	logoUrl: '/static/mp-weixin/chaoxing.png',
				// 	courseName:'体育',
				// 	loginTime:'3月4日 9:00',
				// 	learningTime:'9:00-10:00',
				// 	sd:'42',
				// 	yd:'44',
				// }
			]
		};
	},
	mounted(){
		this.initData()
	},
	methods: {
		getDetailData(row){
			this.$HTTP({
				url:'/statistical/getJstkYs',
				params:{
					userid:uni.getStorageSync('userId'),
					'kcid':row.kcid
				},
				successCallback:({data})=>{
					if(data.code ==0){
						this.trList = data.data.map(item=>{
							return{
								...item,
								className:item.kcmc,
								name:item.xsxm,
								reason:item.wdyy,
								classTime:item.sksj,
							}
						})
					}else{
						
					}
				}
			})
		},
		handleClearData(){
			this.startTime = '';
			this.endTime = ''
			this.initData()
		},
		handleClose(){
			this.active = false;
		},
		handleWatchDetail(item){
			this.getDetailData(item)
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
			this[this.currentSelect] = result;
			this.$refs.linkage.hide()
		},
		initData(){
			this.$HTTP({
				url:'/statistical/getJssk',
				params:{
					kssj:this.startTime,
					jssj:this.endTime,
					userid:uni.getStorageSync('userId')
				},
				successCallback:({data})=>{
					if(data.code == 0){
						let dataObj = data.data
						this.dataArr = []
						for(let key in dataObj){
							this.dataArr.push({
								...dataObj[key],
								name:dataObj[key].name||'名称',
								logoUrl:dataObj[key].imgUrl,
								courseName:dataObj[key].kc,
								sd:dataObj[key].sdrs,
								yd:dataObj[key].ydrs,
								learningTime:dataObj[key].sj,
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
@import  '../../static/mp-weixin/globalStyle/platform.scss';
</style>
