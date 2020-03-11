<template>
	<view class="m-content">
		<view class="u-list" v-for="(item, index) in dataArr" :key="index">
			<view class="u-list-title" @tap="handleCollapse(item, index)">
				{{ item.title }}
				<view  :class="{ 'u-dot': true, active: item.isActive }"></view>
			</view>
			<view :class="{ 'u-list-desc': true, active: item.isActive }">
				<view class="cell" v-for="(params, idx) in paramsArr" :key="idx">
					<text>{{ params.name }}</text>
					: {{ item[params.key] }}
				</view>
			</view>
		</view>
		<view class="" v-if="!dataArr.length">
			<view class="m-tips">暂无填报数据</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			paramsArr: [
				{
					name: '填报位置',
					key: 'field02'
				},
				{
					name: '是否需要援助',
					key: 'field06'
				},
				{
					name: '是否受伤',
					key: 'field07'
				},
				{
					name: '语音信息',
					key: 'field08'
				},
				{
					name: '求助具体要求',
					key: 'field09'
				}
			],
			dataArr: []
		};
	},
	mounted(){
		this.getData()
	},
	methods: {
		handleCollapse(item, index) {
			this.$set(item, 'isActive', !item.isActive);
		},
		getData(){
			this.$HTTP({
				url:'/getHelp/list',
				params:{
					"field01":uni.getStorageSync('userId'),
					"pageNum":"",
					"pageSize":""
				},
				successCallback:({data})=>{
					if(data.code == 0){
						let arr = data.data.list.map(item=>{
							return{
								...item,
								title:new Date(item.addTime).Format('yyyy-MM-dd')
							}
						})
						this.dataArr = arr
					}else{
						uni.showToast({
							title:data.msg,
							icon:'none'
						})
					}
				}
			})
		},
	}
};
</script>

<style lang="scss" scoped>
@import '../../assets/style/list.scss';
.m-content {
	padding: 20upx 40upx;
	height: calc(100vh - 295upx);
	overflow: auto;
	swiper,swiper-item,{
		width: 100%;
		height: 100%;
		overflow:auto;
	}
	.u-list {
		padding: 20upx 40upx;
		background-color: #ffffff;
		border-radius: 30upx;
		margin-bottom: 20upx;
		box-shadow: 0 5upx 5upx #eee;
		border: solid 1upx $main-borer-color;
		.u-list-title {
			font-size: 32upx;
			color: $uni-text-color;
			border-bottom: solid 1px $main-borer-color;
			padding-bottom: 20upx;
			position: relative;
		}
		.u-list-desc {
			font-size: 28upx;
			color: $uni-text-second-color;
			transition: max-height 0.3s; 
			max-height: 0;
			overflow: hidden;
			&.active{
				max-height: 750upx;
			}
			.cell {
				display: inline-block;
				width: 95%;
				margin: 20upx 0 0 40upx;
				// white-space: nowrap;
				&.one_line {
					display: block;
					width: 100%;
				}
			}
		}
	}
}
</style>
