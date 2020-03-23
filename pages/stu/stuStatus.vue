<template>
	<view class="container">
		<view class="c-title">
			<tabs :list="list" v-model="active"></tabs>
			<view class="m-condition">
				<text class="u-tips" @tap="handleChooseTime(true)">{{startTime || '开始时间'}}</text>
				<text class="u-middle">至</text>
				<text class="u-tips" @tap="handleChooseTime(false)">{{endTime || '结束时间'}}</text>
			</view>
		</view>
		<!-- <view class="m-title">当前学习进度</view> -->
		<view class="m-content">
			<view class="" v-show="active == '0'">
				<view class="u-list" v-for="(item, index) in dataArr" :key="index">
					<view class="u-list-title" @tap="handleCollapse(item,index)">{{ item.title }} <view  :class="{'u-dot':true, 'active':item.isActive}"></view></view>
					<view :class="{'u-list-desc':true,active:item.isActive}">
						<view class="cell" v-for="(params, idx) in paramsArr" :key="idx">
							<text class="cell-title">{{ params.name }}</text>
							:  {{ item[params.key] }}
						</view>
					</view>
				</view>
			</view>
			<view class="" v-show="active == '1'"><view class="m-tips">暂无学生具体成绩</view></view>
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
	</view>
</template>
<script>
export default {
	data() {
		return {
			startTime:'',
			endTime:'',
			currentSelect:'',
			paramsArr:[
				{
					name:'以上课时总量',
					key:'yskszl'
				},{
					name:'在线时长',
					key:'zxsc'
				},{
					name:'掉线次数',
					key:'dxcs'
				},{
					name:'课前预习次数',
					key:'kqyx'
				},{
					name:'课后作业次数',
					key:'khzycs'
				},{
					name:'问题数量',
					key:'wtsl'
				},{
					name:'活跃次数',
					key:'hycs'
				},{
					name:'考试次数',
					key:'kscs'
				},{
					name:'拒收次数',
					key:'jscs'
				},{
					name:'被点名次数',
					key:'bdmcs'
				},
			],
			list: [
				{
					title: '学习情况统计'
				},
				{
					title: '学习成绩'
				}
			],
			active: '0',
			dataArr: [
				{
					title: '整体情况-模拟数据',
					yskszl: '10',
					zxsc: '20',
					dxcs: '15',
					kqyx: '25',
					khzycs: '4',
					wtsl: '011',
					hycs: '25',
					kscs: '2',
					jscs: '6',
					bdmcs: '111',
					isActive:true,
				},{
					title: '腾讯-模拟数据',
					yskszl: '10',
					zxsc: '20',
					dxcs: '15',
					kqyx: '25',
					khzycs: '4',
					wtsl: '011',
					hycs: '25',
					kscs: '2',
					jscs: '6',
					bdmcs: '111'
				},{
					title: '凤凰-模拟数据',
					yskszl: '10',
					zxsc: '20',
					dxcs: '15',
					kqyx: '25',
					khzycs: '4',
					wtsl: '011',
					hycs: '25',
					kscs: '2',
					jscs: '6',
					bdmcs: '111'
				}
			]
		};
	},
	watch: {
		active: {
			immediate:true,
			handler(val) {
				if (val == '0') {
				} else if (val == '1') {

				}
			}
		}
	},
	mounted(){
		this.initData()
	},
	methods: {
		initData(){
			this.$HTTP({
				url:'/statistical/getXxqk',
				params:{
					kssj:this.startTime,
					jssj:this.endTime,
					userid:uni.getStorageSync('userId')
				},
				successCallback:(res)=>{
					console.log(res,'获取参数')
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
			console.log(arguments,'arguments')
			this[this.currentSelect] = result;
			this.$refs.linkage.hide()
		},
		handleCollapse(item,index){
			this.$set(item,'isActive',!item.isActive)
		},
		getData() {}
	}
};
</script>
<style lang="scss" scoped>
.c-title {
	position: sticky;
	top: 0;
	z-index: 10;
	background: #FFFFFF;
}
@import '../../assets/style/list.scss';
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
.m-content{
	height: calc(100vh - 168upx);
}
</style>
