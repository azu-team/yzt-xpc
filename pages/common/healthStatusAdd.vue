<template>
	<view >
		<view class="m-list first-line">
			<view class="u-q-title"><text>1.目前健康状态</text> 
			<!-- <text class="icon">单选</text> -->
			</view>
			<radio-group @change="handleRadioChange($event,'field02')">
				<label class="u-list-cell" v-for="(item,index) in list1" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field02 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field02 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>2.导致风险原因</text> 
			<!-- <text class="icon">单选</text> -->
			</view>
			<radio-group @change="handleRadioChange($event,'field05')">
				<label class="u-list-cell" v-for="(item, index) in list2" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field05 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field05 == item.value }">{{ item.name }}</view>
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
			region:'选择位置',
			form:{
				field02:'0',
				field05:'0',
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
	mounted(){
	},
	methods: {
		handleRadioChange(evt,name){
			this.form[name] = evt.target.value
		},
		send(){
			// 缺少key值 field01 用户id
			let params = {
				...this.form,
				field01:uni.getStorageSync('userId')
			}
			this.$HTTP({
				url:'/healthCollect/save',
				params,
				successCallback: ({data}) => {
					if(data.code == 0){
						uni.showToast({
							title:'提交成功!'
						})
						setTimeout(()=>{
							uni.navigateBack()
						},1500)
					}else{
						uni.showToast({
							title:data.msg,
							icon:'none'
						})
					}
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
