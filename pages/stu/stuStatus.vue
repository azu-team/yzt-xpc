<template>
	<view class="container">
		<view class="c-title">
			<view class="m-condition">
				<text class="u-tips" @tap="handleChooseTime(true)">{{startTime || '开始时间'}}</text>
				<text class="u-middle">至</text>
				<text class="u-tips" @tap="handleChooseTime(false)">{{endTime || '结束时间'}}</text>
				<uni-tag @click="handleClearData" style="display: inline-block;width: 90upx;margin-left: 20upx;" text="清空" type="primary" size="small"></uni-tag>
			</view>
		</view>
		<view class="m-content">
			<view class="u-list" v-for="(item, index) in dataArr" :key="index">
				<view :class="{'u-list-title':true,'all-platform':index == 0}" @tap="handleCollapse(item,index)">
					{{ item.title }} 
					<view  v-if="index!=0" :class="{'u-dot':true, 'active':item.isActive}"></view>
				</view>
				<view :class="{'u-list-desc':true,active:item.isActive || index == 0}">
					<view class="cell" v-for="(params, idx) in paramsArr" :key="idx">
						<text class="cell-title">{{ params.name }}</text>
						:  {{ item[params.key] }}
					</view>
					<view class="u-btn-wrapper">
						<view class="u-btn" @tap="handleNav(item)">
							查看详细
						</view>
					</view>
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
				},{
					name:'课程门数',
					key:'kcms'
				},{
					name:'课程名称',
					key:'kcmc'
				}
			],
			dataArr: [
				{
					title: '整体情况',
					yskszl: '10个',
					zxsc: '20h',
					dxcs: '15次',
					kqyx: '25次',
					khzycs: '4次',
					wtsl: '11个',
					hycs: '25次',
					kscs: '2次',
					jscs: '6次',
					bdmcs: '111次',
					kcms:'20门',
					kcmc:'课程名称',
				},{
					title: '腾讯-模拟数据',
					yskszl: '10个',
					zxsc: '20h',
					dxcs: '15次',
					kqyx: '25次',
					khzycs: '4次',
					wtsl: '11个',
					hycs: '25次',
					kscs: '2次',
					jscs: '6次',
					bdmcs: '111次',
					kcms:'20门',
					kcmc:'课程名称',
				},{
					title: '凤凰-模拟数据',
					yskszl: '10个',
					zxsc: '20h',
					dxcs: '15次',
					kqyx: '25次',
					khzycs: '4次',
					wtsl: '11个',
					hycs: '25次',
					kscs: '2次',
					jscs: '6次',
					bdmcs: '111次',
					kcms:'20门',
					kcmc:'课程名称',
				}
			]
		};
	},
	mounted(){
		this.initData()
	},
	methods: {
		handleNav(item){
			uni.navigateTo({
				url:'./stuCourseInfo?course=1',
				
			})
		},
		handleClearData(){
			this.startTime = '';
			this.endTime = '';
			this.initData()
		},
		initData(){
			// this.$HTTP({
			// 	url:'/statistical/getXxqk',
			// 	params:{
			// 		kssj:this.startTime,
			// 		jssj:this.endTime,
			// 		userid:uni.getStorageSync('userId')
			// 	},
			// 	successCallback:(res)=>{
			// 		console.log(res,'获取参数')
			// 	},
			// 	failCallback:(res)=>{
					
			// 	}
			// })
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
.m-condition{
	text-align: center;
	padding: 20rpx 0;
	font-size: 32rpx;
	.u-middle{
		margin: 0 20upx;
	}
	.u-tips{
		color: #007aff;
	}
}
.m-content{
	height: auto;
	 .u-list-title.all-platform{
		text-align: center;
		// color: #007aff;
		font-weight: bold;
	}
}
.u-btn-wrapper{
	text-align: center;
	padding: 20upx 0;
	.u-btn{
		margin: 0;
		height: 60upx;
		width: 60%;
		font-size: 30upx;
	}
}

</style>
