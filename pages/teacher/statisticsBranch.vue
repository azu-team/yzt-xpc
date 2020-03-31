<template>
	<view class="container">
		<view :class="{'tip-btn':true,'active':showBtn}" @tap="handleScroll">
			<view class='iconfont icon-arrow-up'></view>
		</view>
		<view class="title">
			<text>查询时间:</text>
			<text>{{params.kssj|| '开始时间'}} 至 {{params.jssj||'结束时间'}}</text>
			<text></text>
		</view>
		<view class="m-list">
			<view class="t-table">
				<view class="t-title">
					<view class="t-row">
						<view class="t-th" v-for="(title,index) in titleArr" :key="index">{{title.name}}</view>
					</view>
				</view>
				<view class="t-title">
					<view class="t-row" v-for="(row,index) in dataArr" :key="index">
						<view class="t-td" v-for="(item,idx) in row.data" :key="idx">{{item}}</view>
					</view>
					<!-- 固定高度40 -->
					<uni-load-more :status="more" iconType="circle"></uni-load-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import loadMore from '../../components/uni-load-more/uni-load-more.vue';
export default {
	components: { loadMore },
	data() {
		return {
			showBtn:false,
			titleArr:[],
			titleObj:{
				// 活跃学生
				'hyxsqd':[
					{name:'学生姓名',key:'XSXM'},
					{name:'课程名称',key:'KCMC'},
					{name:'活跃次数',key:'HYCS'},
					{name:'平台名称',key:'PTMC'},
				],
				// 学生成绩
				'xscj':[
					{name:'学生姓名',key:'XSXM'},
					{name:'课程名称',key:'KCMC'},
					{name:'成绩',key:'CJ'},
					{name:'平台名称',key:'PTMC'},
				],
				// 教师工作量
				'jsgzl':[
					{name:'教师姓名',key:'JSXM'},
					{name:'课程名称',key:'KCMC'},
					{name:'上课时长',key:'SKSC'},
					{name:'平台名称',key:'PTMC'},
				],
				//教师获赞数
				'jsxbpm':[
					{name:'教师姓名',key:'JSXM'},
					{name:'课程名称',key:'KCMC'},
					{name:'获赞数',key:'HZS'},
					{name:'平台名称',key:'PTMC'},
				]
			},
			dataArr:[],
			more: 'more',
			screenHeight:'',
			params: {
				userid: '',
				kssj: '',
				jssj: '',
				url: '',
				title: ''
			},
			page: {
				pageNum: 1,
				pageSize: 30,
				total: 0
			},
			bottomDistinct:0
		};
	},
	onLoad(params) {
		// 表头赋值
		this.titleArr = this.titleObj[params.url] || []
		// 做滚动处理
		this.screenHeight = uni.getSystemInfoSync().screenHeight;
		this.params = params;
		uni.setNavigationBarTitle({
			title: params.title
		});
		this.getData();
	},
	onPullDownRefresh() {
		this.dataArr = []
		this.page.pageNum = 1;
		this.getData().then(()=>{
			uni.stopPullDownRefresh()
		})
	},
	methods: {
		handleScroll(){
			uni.pageScrollTo({
				scrollTop:'0',
				duration:100
			})
			setTimeout(()=>{
				this.showBtn = false;
			},100)
		},
		getData() {
			return new Promise((resolve,reject)=>{
				this.$HTTP({
					url: '/teacherDto/' + this.params.url,
					params: {
						kssj: this.params.kssj,
						jssj: this.params.jssj,
						userid: this.params.userid,
						pageNum: this.page.pageNum,
						pageSize: this.page.pageSize
					},
					successCallback: ({ data }) => {
						if(data.code == 0){
							let dataArr = data.data.list,
								targetArr = []
								dataArr.forEach((list,index)=>{
									let valueData = []
									this.titleArr.forEach((title,idx)=>{
										valueData.push(list[title.key])
									})
									targetArr.push({
										data:valueData
									})
								})
								this.dataArr = [...this.dataArr,...targetArr]
								this.page.pageNum = data.data.pageNum
								this.page.pageSize = data.data.pageSize
								if(data.data.isLastPage){
									this.more = 'noMore'
								}
							
						}else{
							uni.showToast({
								title:data.msg,
								icon:'none'
							})
						}
					},
					completeCallback:()=>{
						resolve();
					}
				});
			})
		},
		onPageScroll(e) {
			const {
				scrollTop 
			} = e;
			//无数据或者正在加载时不进行处理
			if (this.more == 'loading' || this.more == 'noMore') {
				return;
			}
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.container')
				.boundingClientRect(data => {
					let {
						height 
					} = data;
					// 如果加载列表数据在一个屏幕内
					if(this.screenHeight > height){
						this.more = 'loading';
						this.page.pageNum++
						this.getData()
						return
					}
					// 下滑到一定程度显示按钮
					if(scrollTop > this.screenHeight){
						this.showBtn = true;
					}else{
						this.showBtn = false;
					}
					// 滑到底部为-64
					//如果设置的事件触发距离 大于等于 (节点的高度-屏幕高度-滚动条到顶部的距离)
					if (this.bottomDistinct >= height - this.screenHeight - scrollTop) {
						//设置加载状态
						this.more = 'loading';
						this.page.pageNum++
						this.getData()
					}
				})
				.exec();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../static/mp-weixin/globalStyle/table.scss';
.m-list {
	margin: 0 20upx;
	border: solid 1upx #eeeeee;
}
.t-table {
}
.tip-btn{
	position: fixed;
	bottom: 50upx;
	right: 50upx;
	width: 100rpx;
	height: 100rpx;
	justify-content: center;
	align-items: center;
	background: #eee;
	color: #fff;
	font-size: 50rpx;
	border-radius: 50%;
	box-shadow: 0 0 5rpx #ccc;
	z-index: 10;
	display: none;
	&.active{
		display: flex;
	}
}
.title{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10rpx 20rpx;
	color: #333;
	font-size: 30rpx;
}
</style>
