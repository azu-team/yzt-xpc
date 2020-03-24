<template>
	<view class="container">
		<view class="c-title">
			<tabs :list="list" v-model="active"></tabs>
			<view class="m-condition">
				<text class="u-tips" @tap="handleChooseTime(true)">{{ startTime || '开始时间' }}</text>
				<text class="u-middle">至</text>
				<text class="u-tips" @tap="handleChooseTime(false)">{{ endTime || '结束时间' }}</text>
			</view>
		</view>
		<view class="m-q" v-for="(item,index) in questionArr" :key='index'>
			<view class="u-title">
				<text>{{item.title}}</text>
			</view>
			<view class="u-line" v-for="(option,idx) in item.options" :key="idx">
				<text>{{option.name}}({{option.value}})</text>
				<view class="u-progress" :style="'width: '+option.per+'%;'"></view>
				<div class="u-per">{{option.per}}%</div>
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
	</view>
</template>

<script>
export default {
	data() {
		return {
			startTime: '',
			endTime: '',
			currentSelect: '',
			questionArr:[]
		};
	},
	mounted() {
		this.initData()
	},
	methods: {
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
			this[this.currentSelect] = result;
			this.$refs.linkage.hide();
			this.initData()
		},
		getQuestionData(url){
			this.$HTTP({
				url:url,
				params: {
					kssj: this.startTime,
					jssj: this.endTime,
					userid: uni.getStorageSync('userId')
				},
				successCallback: ({ data }) => {
					if (data.code == 0) {
						let dataObj = data.data
						/* 所有返回的标题
						安全情况: {安全: 2, 低风险: 1, }
						当地状况: {其余原因不能返程: 1, }
						预警原因: {未填写: 0, 总数: 5, } */
						for(let key in dataObj){
							let optionObj = dataObj[key],
								optionsArr = []
							/* 每个标题的候选项值
							低风险: 1
							安全: 2
							总数: 5
							未填写: 0
							未知: 0
							高风险: 2 */
							for(let option in optionObj){
								// 如果为总数字段，直接跳过
								if(option=='总数') continue;
								optionsArr.push({
									name:option,
									value:optionObj[option],
									per:optionObj['总数']!=0? Math.round(optionObj[option]/optionObj['总数']*10000)/100:0
								})
							}
							this.questionArr.push({
								title:key,
								options:optionsArr
							})
						}
					} else {
						uni.showToast({
							title: data.msg,
							icon: 'none'
						});
					}
				}
			});
		},
		initData() {
			this.questionArr = []
			let urlArr = [
				// 安全情况统计
				'/statistical/getAqqk',
				// 每日健康打卡统计
				'/statistical/getMrjkdk',
				// 一键求助统计
				'/statistical/getYjqz'
			]
			urlArr.forEach(item=>this.getQuestionData(item))
			
		}
	}
};
</script>

<style lang="scss" scoped>
.container{
	background: #f4f8ff;
	padding-bottom: 60upx;
}
.c-title {
	position: sticky;
	top: 0;
	z-index: 10;
	background: #ffffff;
	margin-bottom: 20upx;
}
.m-condition {
	text-align: center;
	padding: 20rpx;
	font-size: 32rpx;
	.u-middle {
		margin: 0 20upx;
	}
	.u-tips {
		color: #007aff;
	}
}
.m-q{
	padding: 20upx;
	margin-bottom: 20upx;
	box-shadow: 0 3upx 3upx #eee;
	color: $uni-text-color;
	background-color: #FFFFFF;
	position: relative;
	z-index: 0;
	.u-title{
		margin-bottom: 20upx;
	}
	.u-line{
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		z-index: 2;
		font-size: 30upx;
		color: #212121;
		width: 95%;
		border: solid 1px #6451FC;
		border-radius: 10upx;
		margin-top: 20upx;
		padding: 5upx 10upx;
		overflow: hidden;
		.u-progress{
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			background-color: #93c1fb;
			z-index: -1;
		}
	}
}
</style>
