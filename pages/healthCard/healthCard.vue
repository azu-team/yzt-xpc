<template>
	<view class="container">
		<view class="c-title"><tabs :list="list" v-model="active"></tabs></view>
		<view class="" v-show="active == '0'">
			<add-page ></add-page>
		</view>
		<view class="" v-show="active == '1'">
			<his-page ></his-page>
		</view>
	</view>
</template>
<script>
import addPage from './healCardAdd.vue';
import hisPage from './healthCardHistory.vue'
export default {
	components:{addPage,hisPage},
	data() {
		return {
			list: [
				{
					title: '打卡填报'
				},
				{
					title: '打卡历史(一周)'
				}
			],
			active: '0'
		};
	},
	onLoad(e) {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.container {
	background-color: #f6fbfe;
	height: 100vh;
	overflow: auto;
}
.c-title {
	position: sticky;
	top: 0;
	z-index: 10;
	margin-bottom: 20upx;
}
</style>
