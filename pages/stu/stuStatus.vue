<template>
	<view class="container">
		<view class="c-title">
			<view class="m-condition">
				<text class="u-tips" @tap="handleChooseTime(true)">{{ startTime || '开始时间' }}</text>
				<text class="u-middle">至</text>
				<text class="u-tips" @tap="handleChooseTime(false)">{{ endTime || '结束时间' }}</text>
				<uni-tag @click="handleClearData" style="display: inline-block;width: 90upx;margin-left: 20upx;" text="清空" type="primary" size="small"></uni-tag>
			</view>
		</view>
		<view class="m-content">
			<view class="u-list" v-for="(item, index) in dataArr" :key="index">
				<view :class="{ 'u-list-title': true, 'all-platform': index == 0 }" @tap="handleCollapse(item, index)">
					<image class="img" :src="item.imgUrl" mode="" v-if="index != 0"></image>
					{{ item.name }}
					<view v-if="index != 0" :class="{ 'u-dot': true, active: item.isActive }"></view>
				</view>
				<view :class="{ 'u-list-desc': true, active: item.isActive || index == 0 }">
					<view class="cell" v-for="(cell, idx) in item.tjjh" :key="idx">
						<text class="cell-title">{{ cell.name }}</text>
						: {{ cell.value + cell.unit}}
					</view>
					<view class="u-btn-wrapper"><view class="u-btn" @tap="handleNav(item)">查看详细</view></view>
				</view>
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
			userId:uni.getStorageSync('userId'),
			startTime:'',
			endTime:'',
			currentSelect:'',
			dataArr: []
		};
	},
	mounted(){
		this.initData()
	},
	methods: {
		handleNav(item){
			let obj = {
				'lx':item.type,
				'kssj':this.startTime,
				'jssj':this.endTime,
				'userid':this.userId,
			},paramStr = []
			for(let key in obj){
				paramStr.push(key+'='+obj[key])
			}
			paramStr = paramStr.join('&')
			
			uni.navigateTo({
				url:`./stuCourseInfo?${paramStr}`,
			})
		},
		handleClearData(){
			this.startTime = '';
			this.endTime = '';
			this.initData()
		},
		initData(){
			this.$HTTP({
				url:'/studentDto/getYw',
				params:{
					kssj:this.startTime,
					jssj:this.endTime,
					userid:this.userId,
					lx:'0'
				},
				successCallback:({data})=>{
					if(data.code == 0){
						// 将标识符进行判断
						// 	 0统计页面
						// 	 1电子卡全部数据 
						// 	 2电子卡腾讯 
						// 	 3电子卡钉钉 
						// 	 4电子卡凤凰 
						// 	 5电子卡职教 
						// 	 6电子卡超星
						let typeObj = {
							'整体情况':'1',
							'腾讯课堂':'2',
							'钉钉':'3',
							'凤凰职教云':'4',
							'智慧职教':'5',
							'超星泛雅':'6'
						}
						let dataArr = data.data.splice(data.data.length - 1,1)
						data.data.unshift(dataArr[0])
						data.data.forEach(item=>{
							if(typeObj[item.name]){
								item.type = typeObj[item.name]
							}
						})
						this.dataArr = data.data
					}else{
						uni.showToast({
							title:data.msg,
							icon:'none'
						})
					}
				},
				failCallback:(res)=>{

				}
			})
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
		handleCollapse(item,index){
			this.$set(item,'isActive',!item.isActive)
		},
		getData() {}
	}
};
</script>
<style lang="scss" scoped>
@import '../../assets/style/list.scss';
.m-condition {
	text-align: center;
	padding: 20rpx 0;
	font-size: 32rpx;
	.u-middle {
		margin: 0 20upx;
	}
	.u-tips {
		color: #007aff;
	}
}
.m-content {
	height: auto;
	.u-list-title{
		.img{
			width: 50rpx;
			height: 50rpx;
			vertical-align: middle;
			margin-right: 35rpx;
		}
	}
	.u-list-title.all-platform {
		text-align: center;
		// color: #007aff;
		font-weight: bold;
	}
}
.u-btn-wrapper {
	text-align: center;
	padding: 20upx 0;
	.u-btn {
		margin: 0;
		height: 60upx;
		width: 60%;
		font-size: 30upx;
	}
}
</style>
