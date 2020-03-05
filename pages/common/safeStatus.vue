<template>
	<view class="container">
		<view class="m-tip">
			<view class="u-grid">
				<view class="left">安全告知书</view>
				<view class="right">
					<rich-text :nodes="nodes"></rich-text>
				</view>
			</view>
			<view class="u-grid">
				<view class="left">紧急联系人</view>
				<view class="right">
					<view class="list-item" v-for="(item,index) in contactArr" :key="index"><text class="name">{{item.name}}</text> <text class="phone" @tap="handleCall(item.phone)">{{item.phone}}</text></view>
				</view>
			</view>
		</view>
		<view class="m-list">
			<view class="u-q-title">
				<text>1.安全预警原因</text>
				<text class="icon">单选</text>
			</view>
			<radio-group @change="handleRadioChange($event, 'additionalProp1')">
				<label class="u-list-cell" v-for="(item, index) in list1" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp1 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp1 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title">
				<text>2.安全预警级别</text>
				<text class="icon">单选</text>
			</view>
			<radio-group @change="handleRadioChange($event, 'additionalProp2')">
				<label class="u-list-cell" v-for="(item, index) in list2" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp2 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp2 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title">
				<text>3.当前状态</text>
				<text class="icon">单选</text>
			</view>
			<radio-group @change="handleRadioChange($event, 'additionalProp3')">
				<label class="u-list-cell" v-for="(item, index) in list3" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp3 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp3 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title">
				<text>4.安全情况</text>
				<text class="icon">单选</text>
			</view>
			<radio-group @change="handleRadioChange($event, 'additionalProp4')">
				<label class="u-list-cell" v-for="(item, index) in list4" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp4 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp4 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		
		<view class="m-bottom">
			<view class="u-btn" @click="send"><text>提交</text></view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			nodes:`<div><span>富文本内容</span><span style="color:red;">初始HTML</span></div>`,//富文本内容
			contactArr:[
				{
					name:'赵某某',phone:'15154546565',
				},{
					name:'钱某某',phone:'15154546565',
				},{
					name:'孙某某',phone:'15154546565',
				},
			],
			form: {
				additionalProp1: '0',
				additionalProp2: '0',
				additionalProp3: '0',
				additionalProp4: '0'
			},
			list1: [
				{
					value: '0',
					name: '被盗',
					checked: true
				},
				{
					value: '1',
					name: '人身伤害'
				},
				{
					value: '2',
					name: '大量聚集'
				}
			],
			list2: [
				{
					value: '0',
					name: '红'
				},
				{
					value: '1',
					name: '橙'
				},
				{
					value: '2',
					name: '黄'
				},
				{
					value: '3',
					name: '蓝'
				}
			],
			list3: [
				{
					value: '0',
					name: '本地居家隔离'
				},
				{
					value: '1',
					name: '返程后居家隔离'
				},
				{
					value: '2',
					name: '封路暂时不能返程'
				},
				{
					value: '3',
					name: '其余原因不能返程'
				}
			],
			list4: [
				{
					value: '0',
					name: '安全'
				},
				{
					value: '1',
					name: '低风险'
				},
				{
					value: '2',
					name: '高风险'
				},
				{
					value: '3',
					name: '未知'
				}
			]
		};
	},
	onLoad(e) {},
	methods: {
		handleRadioChange(evt, name) {
			this.form[name] = evt.target.value;
		},
		send() {
			let params = JSON.stringify({
				userid: '123',
				results: this.form
			});
			this.$HTTP({
				url: '/campusapp/userhealth/answer',
				root: 'http://61.132.95.169:10105',
				params,
				successCallback: res => {
					console.log(res, 'res');
					uni.showToast({
						title: '提交成功!'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../static/mp-weixin/globalStyle/radio.scss';
.container {
	background-color: #f6fbfe;
	min-height: 100vh;
}
.m-top {
	padding: 20upx 0 30upx 20upx;
	background-color: #ffffff;
	border-bottom: solid 1upx #e7f4fe;
	margin-bottom: 20upx;
	.u-title-1 {
		font-size: 35upx;
		color: #3f3f3f;
		font-weight: bold;
	}
	.u-title-2 {
		font-size: 28upx;
		color: #797979;
		margin-top: 20upx;
	}
}
.m-bottom {
	text-align: center;
}
</style>
