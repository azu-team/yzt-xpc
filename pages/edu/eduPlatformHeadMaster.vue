<template>
	<!-- 校长 -->
	<view class="container">
		<view class="m-title">选择学习平台</view>
		<view class="m-condition">
			<view class=""></view>
			<view class="">
				<text class="u-tips" @tap="handleChooseTime(true)">{{startTime || '开始时间'}}</text>
				<text class="u-middle">至</text>
				<text class="u-tips" @tap="handleChooseTime(false)">{{endTime || '结束时间'}}</text>
			</view>
			
			<uni-tag @click="handleClearData" style="display: inline-block;width: 90upx;margin-left: 20upx;" text="清空" type="primary" size="small"></uni-tag>
		</view>
		<view class="m-content">
			<view class="u-title-wrapper">
				<view class="u-title"></view>
				<view class="u-title">课程门数</view>
				<view class="u-title">应到/实到(人)</view>
				<view class="u-title">课时总长(小时)</view>
			</view>
			<view class="u-list" v-for="(item, index) in dataArr" :key="index">
				<view class="u-platform" @tap="handleNav(item)">
					<view class="u-left"><image class="icon" :src="item.logoUrl" mode="aspectFit"></image></view>
					<view class="u-right">{{ item.name }}</view>
				</view>
				<view class="u-desc" @tap="handleWatchDetail(item,0,!!item.courseNum)">
					<text class="link">{{ item.courseNum||'' }}</text>
				</view>
				<view class="u-desc" @tap="handleWatchDetail(item,1,!!item.yd)">
					{{ item.yd||'' }}/
					<text class="link">{{ item.sd||'' }}</text>
				</view>
				<view class="u-desc">{{ item.totalTime||'' }}</view>
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
			themeColor="#25a5ff"
		></link-area>
		<!-- <uni-popup ref="popup"> -->
		<view :class="{ 'm-mask': true, active: active }">
			<view class="m-pop-content">
				<view class="m-close">
					<text></text>
					<text>{{ dialogType == 1 ? '缺勤人数' : '课程' }}</text>
					<icon type="cancel" size="20" @tap="handleClose" color="#000" />
				</view>
				<view class="t-table">
					<view class="t-row t-title" v-if="dialogType == 1">
						<view class="t-th">课程名称</view>
						<view class="t-th">缺课人</view>
						<view class="t-th">缺课原因</view>
						<view class="t-th">学习时间</view>
					</view>
					<view class="t-row t-title" v-else>
						<view class="t-th">课程名称</view>
						<view class="t-th">学习时间</view>
					</view>
					<view class="" v-if="dialogType == 1">
						<view class="t-row" v-for="(row, index) in trList" :key="index">
							<view class="t-td">{{ row.course }}</view>
							<view class="t-td">{{ row.name }}</view>
							<view class="t-td">{{ row.reason }}</view>
							<view class="t-td">{{ row.totalTime }}</view>
						</view>
					</view>
					<view class="" v-else>
						<view class="t-row" v-for="(row, index) in trList" :key="index">
							<view class="t-td">{{ row.course }}</view>
							<view class="t-td">{{ row.totalTime }}</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<!-- </uni-popup> -->
	</view>
</template>
<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: { uniPopup },
	data() {
		return {
			dialogType: 1,
			active: false,
			startTime: '',
			endTime: '',
			currentSelect: '',
			trList: [],
			dataList: [],
			dataArr: [
			]
		};
	},
	mounted() {
		this.initData();
	},
	methods: {
		handleClearData(){
			this.startTime = '';
			this.endTime = ''
			this.initData()
		},
		handleClose() {
			this.active = false;
		},
		handleWatchDetail(item,type,canShow) {
			if(!canShow) return;
			this.dialogType = type;
			this.active = true;
			if(type == 0){
				let dataObj = item.kcjh,
					dataArr = []
				for(let key in dataObj){
					dataArr.push({
						course:key,
						totalTime:dataObj[key]
					})
				}
				this.trList = dataArr
			}else{
				this.trList = item.wdjh.map(list=>{
					return{
						...list,
						course:list.kcmc,
						name:list.xsxm,
						reason:list.wdyy,
						totalTime:list.sksj,
					}
				})
			}
			// this.getDetailData(item,type)
		},
		handleChooseTime(isStartTime) {
			if (isStartTime) {
				this.currentSelect = 'startTime';
			} else {
				this.currentSelect = 'endTime';
			}
			this.$refs.linkage.show();
		},
		handleCancelChoose() {
			this.$refs.linkage.hide();
		},
		handleChoose({ checkArr, checkValue, defaultVal, result }) {
			console.log(arguments, 'arguments');
			this[this.currentSelect] = result;
			this.$refs.linkage.hide();
			this.initData()
		},
		initData() {
			this.$HTTP({
				url: '/statistical/getXzck',
				params: {
					kssj: this.startTime,
					jssj: this.endTime,
					userid: uni.getStorageSync('userId')
				},
				successCallback: ({ data }) => {
					if(data.code == 0){
						let dataObj = data.data
						this.dataArr = []
						/* 
						name: '钉钉',
						value: '2',
						logoUrl: '/static/mp-weixin/dingding.png',
						courseNum: '2',
						loginTime: '3月4日 9:00',
						totalTime: '12',
						sd: '42',
						yd: '44' */
						for(let key in dataObj){
							this.dataArr.push({
								...dataObj[key],
								name:dataObj[key].name||'名称',
								logoUrl:dataObj[key].imgUrl,
								courseNum:dataObj[key].kcs,
								sd:dataObj[key].sdrs,
								yd:dataObj[key].ydrs,
								totalTime:dataObj[key].zsc,
							})
						}
					}else{
						uni.showToast({
							title:data.msg,
							icon:'none'
						})
					}
				}
			});
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
@import '../../static/mp-weixin/globalStyle/platform.scss';
</style>
