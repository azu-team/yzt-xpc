<template>
	<view class="container">
		<view class="c-title">
			<view class=""><tabs :list="list" v-model="active"></tabs></view>
		</view>
		<view class="" v-show="active == '0'"><add-page></add-page></view>
		<view class="" v-show="active == '1'"><his-page></his-page></view>
	</view>
</template>

<script>
import addPage from './safeStatusAdd.vue';
import hisPage from './safeStatusHistory.vue';
export default {
	components: { addPage, hisPage },
	data() {
		return {
			active: '0',
			list: [
				{
					title: '信息填报'
				},
				{
					title: '安全记录(一周)'
				}
			]
		};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
@import '../../static/mp-weixin/globalStyle/radio.scss';
.container {
	background-color: #f6fbfe;
	height: 100vh;
	overflow: auto;
}
.c-title {
	position: sticky;
	top: 0;
	z-index: 4;
	background-color: #ffffff;
	margin-bottom: 0;
}
</style>
