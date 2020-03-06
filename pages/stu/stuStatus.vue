<template>
	<view class="container">
		<view class="c-title"><tabs :list="list" v-model="active"></tabs></view>
		<!-- <view class="m-title">当前学习进度</view> -->
		<view class="m-content">
			<view class="" v-show="active == '0'">
				<view class="u-list" v-for="(item, index) in dataArr" :key="index">
					<view class="u-list-title">{{ item.userName }}-{{ item.className }}</view>
					<view class="u-list-desc">
						<view class="cell">授课老师:{{ item.teacher }}</view>
						<view class="cell">当前进度:{{ item.progress }}</view>
						<view class="cell">最近上课时间:{{ item.lastTime }}</view>
					</view>
				</view>
			</view>
			<view class="" v-show="active == '1'">
				<view class="">学生成绩,暂未确定显示方式</view>
			</view>
		</view>
	</view>
</template>
<script>
import tabs from '../../components/ms-tabs/ms-tabs.vue';
export default {
	components: { tabs },
	data() {
		return {
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
					userName: '上课人',
					className: '语文',
					progress: '50%',
					lastTime: '2020-02-26',
					teacher: '王某'
				}
			]
		};
	},
	watch: {
		active: {
			immediate:true,
			handler(val) {
				if (val == '0') {
					// 学习进度
					this.dataArr = new Array(6).fill({
						userName: '上课人',
						className: '语文',
						progress: '50%',
						lastTime: '2020-02-26',
						teacher: '王某'
					});
				} else if (val == '1') {
					//学习结果
					this.dataArr = new Array(3).fill({
						userName: '上课人',
						className: '语文',
						progress: '50%',
						lastTime: '2020-02-26',
						teacher: '王某'
					});
				}
			}
		}
	},
	onLoad(evt) {},
	methods: {
		getData() {}
	}
};
</script>
<style lang="scss" scoped>
.c-title {
	position: sticky;
	top: 0;
	z-index: 2;
}
@import '../../assets/style/list.scss';
</style>
