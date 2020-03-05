<template>
	<view class="container">
		<view class="m-list">
			<view class="u-q-title"><text>1.目前健康状态</text> <text class="icon">单选</text> </view>
			<radio-group @change="handleRadioChange($event,'additionalProp1')">
				<label class="u-list-cell" v-for="(item,index) in list1" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp1 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp1 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>2.导致风险原因</text> <text class="icon">单选</text> </view>
			<radio-group @change="handleRadioChange($event,'additionalProp2')">
				<label class="u-list-cell" v-for="(item, index) in list2" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp2 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp2 == item.value }">{{ item.name }}</view>
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
			form:{
				additionalProp1:'0',
				additionalProp2:'0',
			},
			list1: [
				{
					value: '0',
					name: '健康',
					checked:true,
				},
				{
					value: '1',
					name: '有发烧咳嗽等症状'
				},
				{
					value: '2',
					name: '无发烧但有咳嗽胸闷等症状'
				},
				{
					value: '3',
					name: '无发烧但有其他症状'
				},
				{
					value:'4',
					name:'其他'
				}
			],
			list2:[
				{
					value:'0',
					name:'有确诊病历'
				},{
					value:'1',
					name:'有长途行程'
				},{
					value:'2',
					name:'在重点疫区'
				}
			]
		};
	},
	onLoad(e) {},
	methods: {
		handleRadioChange(evt,name){
			this.form[name] = evt.target.value
		},
		send(){
			let params = JSON.stringify({
				userid:'123',
				results:this.form
			})
			this.$HTTP({
				url:'/campusapp/userhealth/answer',
				root:'http://61.132.95.169:10105',
				params,
				successCallback:(res)=>{
					console.log(res,'res')
					uni.showToast({
						title:'提交成功!'
					})
				}
			})
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

.m-bottom{
	text-align: center;
}

</style>
