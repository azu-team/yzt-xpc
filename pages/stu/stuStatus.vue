<template>
	<view class="container">
		<view class="c-title"><tabs :list="list" v-model="active"></tabs></view>
		<!-- <view class="m-title">当前学习进度</view> -->
		<view class="m-content">
			<view class="" v-show="active == '0'">
				<view class="u-list" v-for="(item, index) in dataArr" :key="index">
					<view class="u-list-title">{{ item.title }} <view @tap="handleCollapse(item,index)" :class="{'u-dot':true, 'active':item.isActive}"></view></view>
					<view :class="{'u-list-desc':true,active:item.isActive}">
						<view class="cell" v-for="(params, idx) in paramsArr" :key="idx">
							<text>{{ params.name }}</text>
							:  {{ item[params.key] }}
						</view>
					</view>
				</view>
			</view>
			<view class="" v-show="active == '1'"><view class="m-tips">暂无学生具体成绩</view></view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
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
					title: '整体情况',
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
					title: '腾讯',
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
					title: '凤凰',
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
	onLoad(evt) {},
	methods: {
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
}
@import '../../assets/style/list.scss';
</style>
