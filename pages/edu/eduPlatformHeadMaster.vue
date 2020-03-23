<template>
	<!-- 校长 -->
	<view class="container">
		<view class="m-title">选择学习平台</view>
		<!-- <view class="m-condition">
			<text class="u-tips" @tap="handleChooseTime(true)">{{startTime || '开始时间'}}</text>
			<text class="u-middle">至</text>
			<text class="u-tips" @tap="handleChooseTime(false)">{{endTime || '结束时间'}}</text>
		</view> -->
		<view class="m-content">
			<view class="u-title-wrapper">
				<view class="u-title"></view>
				<view class="u-title">课程门数</view>
				<view class="u-title">应到/实到(人)</view>
				<view class="u-title">可是总长(小时)</view>
			</view>
			<view class="u-list" v-for="(item, index) in dataArr" :key="index">
				<view class="u-platform" @tap="handleNav(item)">
					<view class="u-left"><image class="icon" :src="item.logoUrl" mode="aspectFit"></image></view>
					<view class="u-right">{{ item.name }}</view>
				</view>
				<view class="u-desc" @tap="handleWatchDetail(item,0)">
					<text class="link">{{ item.courseNum }}</text>
				</view>
				<view class="u-desc" @tap="handleWatchDetail(item,1)">
					{{ item.yd }}/
					<text class="link">{{ item.sd }}</text>
				</view>
				<view class="u-desc">{{ item.totalTime }}</view>
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
							<view class="t-td">{{ row.courseNum }}</view>
							<view class="t-td">{{ row.name }}</view>
							<view class="t-td">{{ row.reason }}</view>
							<view class="t-td">{{ row.totalTime }}</view>
						</view>
					</view>
					<view class="" v-else>
						<view class="t-row" v-for="(row, index) in trList" :key="index">
							<view class="t-td">{{ row.courseNum }}</view>
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
			trList: [
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				},
				{
					courseNum: '10',
					name: '张三',
					reason: '请假',
					totalTime: '25h'
				}
			],
			dataList: [],
			dataArr: [
				{
					name: '腾讯课堂',
					value: '1',
					logoUrl: '/static/mp-weixin/tencent.png',
					courseNum: '13',
					loginTime: '3月3日 9:00',
					totalTime: '20',
					sd: '42',
					yd: '44'
				},
				{
					name: '钉钉',
					value: '2',
					logoUrl: '/static/mp-weixin/dingding.png',
					courseNum: '2',
					loginTime: '3月4日 9:00',
					totalTime: '12',
					sd: '42',
					yd: '44'
				},
				{
					name: '凤凰职教云',
					value: '3',
					logoUrl: '/static/mp-weixin/fenghuang.png',
					courseNum: '12',
					loginTime: '3月5日 9:00',
					totalTime: '21',
					sd: '42',
					yd: '44'
				},
				{
					name: '智慧职教',
					value: '4',
					logoUrl: '/static/mp-weixin/zhihui.png',
					courseNum: '3',
					loginTime: '3月3日 9:00',
					totalTime: '14',
					sd: '42',
					yd: '44'
				},
				{
					name: '超星泛雅',
					value: '5',
					logoUrl: '/static/mp-weixin/chaoxing.png',
					courseNum: '2',
					loginTime: '3月4日 9:00',
					totalTime: '21',
					sd: '42',
					yd: '44'
				}
			]
		};
	},
	mounted() {
		this.initData();
	},
	methods: {
		handleClose() {
			this.active = false;
		},
		handleWatchDetail(item,type) {
			this.dialogType = type;
			this.active = true;
			// this.$refs.popup.open()
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
		},
		initData() {
			this.$HTTP({
				url: '/statistical/getXxqk',
				params: {
					kssj: this.startTime,
					jssj: this.endTime,
					userid: uni.getStorageSync('userId')
				},
				successCallback: ({ data }) => {
					if (data.code == 0) {
						console.log(data, '获取参数');
					} else {
						uni.showToast({
							title: data.msg,
							icon: 'none'
						});
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
