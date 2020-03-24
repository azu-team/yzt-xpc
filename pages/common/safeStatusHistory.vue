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
					name: '所在区县',
					key: 'field02'
				},
				{
					name: '安全预警原因',
					key: 'field03'
				},
				{
					name: '安全预警级别',
					key: 'field04'
				},
				{
					name: '当前状态',
					key: 'field05'
				},
				{
					name: '安全情况',
					key: 'field06'
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
				url:'/safeData/list',
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
.m-content .u-list .u-list-desc .cell{
	display: inline-block;
	width: 95%;
	margin: 20upx 0 0 40upx;
}
</style>
