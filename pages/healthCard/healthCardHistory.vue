<template>
	<view class="m-content">
		<view class="u-list" v-for="(item, index) in dataArr" :key="index">
			<view class="u-list-title" @tap="handleCollapse(item, index)">
				{{ item.title }}
				<view  :class="{ 'u-dot': true, active: item.isActive }"></view>
			</view>
			<view :class="{ 'u-list-desc': true, active: item.isActive }">
				<view class="cell" v-for="(params, idx) in paramsArr" :key="idx">
					<text>{{ params.name }}</text>: {{ item[params.key] }}
				</view>
				<view class="cell" v-if="item.field12 == '是'">
					<text>乘坐开始日期</text>:{{item.field13}}
				</view>
				<view class="cell">
					<text>交通工具</text>:{{item.field14}}
				</view>
				<!-- 判断交通工具的类型以及显示的字段 -->
				<view  v-if="item.field14">
					<view class="cell">
						<text>{{vehicleTranslate[item.field14][0]}}</text>: {{ item.field15 || item.field18 || item.field21 || item.field23 }}
					</view>
					<view class="cell" v-if="item.field14 != '3'">
						<text >{{vehicleTranslate[item.field14][1]}}</text>: {{item.field16 || item.field19 || item.field22}}
					</view>
					<view class="cell" v-if="item.field14 != '3' && item.field14 != '2'">
						<text >{{vehicleTranslate[item.field14][2]}}</text>: {{item.field17 || item.field20}}
					</view>
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
					name: '当前区县',
					key: 'field06'
				},
				{
					name: '目前健康状态',
					key: 'field07'
				},
				{
					name: '今日体温',
					key: 'field08'
				},
				{
					name: '自2020年1月15日起是否途径湖北省',
					key: 'field09'
				},
				{
					name: '自2020年1月15日起是否接触过来自重点疫区人员或者被隔离人员',
					key: 'field10'
				},
				{
					name: '自2020年1月15日起是否接触过疑似或确诊的新型冠状病毒肺炎患者',
					key: 'field11'
				},
				{
					name: '是否乘坐长途公交',
					key: 'field12'
				}
			],
			dataArr: [
				// {
				// 	title: '2020-03-09',
				// 	field06: '10',
				// 	field07: '20',
				// 	field08: '15',
				// 	field09: '25',
				// 	field10: '4',
				// 	field11: '011',
				// 	field12: '25',
				// 	field13: '2',
				// 	field14: '',
				// 	isActive: true
				// }
			],
			vehicleTranslate:{
				'飞机':['飞机-航班号','飞机-起降地点','飞机-座位号'],
				'火车':['火车-车次','火车-乘车区间','火车-车厢及座位号'],
				'汽车':['汽车-起止地点','汽车-是否司机'],
				'轮船':['轮船-起止地点']
			}
		};
	},
	mounted(){
		this.getData()
	},
	methods: {
		getData(){
			this.$HTTP({
				url:'/healthForDay/list',
				showLoading:false,
				params:{
					"field01":uni.getStorageSync('userId'),
					"pageNum":"",
					"pageSize":"",
				} ,
				successCallback:({data})=>{
					if(data.code == '0'){
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
		handleCollapse(item, index) {
			this.$set(item, 'isActive', !item.isActive);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../assets/style/list.scss';
.m-content {
	padding: 20upx 40upx;
	height: calc(100vh - 128upx);
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
				&.one_line {
					display: block;
					width: 100%;
				}
			}
		}
	}
}
</style>
