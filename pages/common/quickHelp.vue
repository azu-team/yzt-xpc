<template>
	<view class="container">
		<view class="m-tip">
			<view class="u-grid">
				<view class="left">紧急联系人</view>
				<view class="right">
					<view class="list-item" v-for="(item,index) in contactArr" :key="index"><text class="name" @tap="handleCall(item.phone)">{{item.name.length>=8?item.name.substring(0,7)+'...':item.name}}</text></view>
				</view>
			</view>
			<view class="">
				<tabs :list="list" v-model="active"></tabs>
			</view>
		</view>
		<view class="" v-show="active == '0'">
			<add-page ></add-page>
		</view>
		<view class="" v-show="active == '1'">
			<his-page ></his-page>
		</view>
	</view>
</template>

<script>
	import addPage from './quickHelpAdd.vue';
	import hisPage from './quickHelpHistory.vue';
export default {
	components:{addPage,hisPage},
	data() {
		return {
			active:'0',
			list:[
				{
					title: '信息填报'
				},
				{
					title: '求助记录(一周)'
				}
			],
			contactArr:[
				{
					name:'班主任',phone:'18621582789',
				},{
					name:'学校保卫室',phone:'18621582789',
				},{
					name:'110',phone:'18621582789',
				},
			]
		};
	},
	methods: {
		handleCall(phoneNumber){
			uni.makePhoneCall({
			    phoneNumber: phoneNumber
			});
		},
	}
};
</script>

<style lang="scss" scoped>
	@import '../../static/mp-weixin/globalStyle/radio.scss';
	.container {
		background-color: #f6fbfe;
		height: 100vh;
		overflow: auto;
	}
	.m-tip{
		position: sticky;
		top: 0;
		z-index: 4;
		background-color: #FFFFFF;
		margin-bottom: 0;
	}
</style>
