<template>
	<view >
		<view class="m-tip first-line">
			<view class="u-grid" style="margin-bottom: 10upx;">
				<view class="left">安全告知书</view>
				<view class="right">
					<rich-text :nodes="nodes"></rich-text>
				</view>
			</view>
			<view class="u-grid">
				<view class="left">紧急联系人</view>
				<view class="right">
					<view class="list-item" v-for="(item,index) in contactArr" :key="index"><text class="name" @tap="handleCall(item.phone)">{{item.name.length>=8?item.name.substring(0,7)+'...':item.name}}</text> </view>
				</view>
			</view>
		</view>
		<view class="m-list first-line">
			<view class="m-line">
				<view class="u-title">所在区县</view>
				<view class="u-content">
					<!-- <text @tap="showChoose">{{region}}</text> -->
					<view class=""><input type="text" v-model="form.field02" placeholder="请输入当前位置" /></view>
				</view>
			</view>
		</view>
		<view class="m-list">
			<view class="u-q-title">
				<text>1.安全预警原因</text>
				<!-- <text class="icon">单选</text> -->
			</view>
			<radio-group @change="handleRadioChange($event, 'field03')">
				<label class="u-list-cell" v-for="(item, index) in list1" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field03 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field03 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title">
				<text>2.安全预警级别</text>
				
				<!-- <text class="icon">单选</text> -->
			</view>
			<radio-group @change="handleRadioChange($event, 'field04')">
				<label class="u-list-cell" v-for="(item, index) in list2" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field04 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field04 == item.value }">{{ item.name }}<view :class="['color-seg',item.class]"></view> </view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title">
				<text>3.当前状态</text>
				<!-- <text class="icon">单选</text> -->
			</view>
			<radio-group @change="handleRadioChange($event, 'field05')">
				<label class="u-list-cell" v-for="(item, index) in list3" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field05 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field05 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title">
				<text>4.安全情况</text>
				<!-- <text class="icon">单选</text> -->
			</view>
			<radio-group @change="handleRadioChange($event, 'field06')">
				<label class="u-list-cell" v-for="(item, index) in list4" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field06 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field06 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		
		<view class="m-bottom">
			<view class="u-btn" @click="send"><text>提交</text></view>
		</view>
		<link-area
			mode="region"
			@confirm="handleChoose"
			@cancel="handleCancelChoose"
			ref="linkage"
			:hideArea="false"
			:areaCode="['11', '1101', '110101']"
			themeColor="#25a5ff"></link-area>
	</view>
</template>
<script>
export default {
	data() {
		return {
			userId:uni.getStorageSync('userId'),
			region:'选择位置',
			nodes:``,//富文本内容
			contactArr:[
				{
					name:'班主任',phone:'18621582789',
				},{
					name:'110',phone:'18621582789',
				},{
					name:'保卫室',phone:'18621582789',
				},
			],
			form: {
				field02:'',
				field03: '被盗',
				field04: '红',
				field05: '本地居家隔离',
				field06: '安全'
			},
			list1: [
				{
					value: '被盗',
					name: '被盗',
					checked: true
				},
				{
					value: '人身伤害',
					name: '人身伤害'
				},
				{
					value: '大量聚集',
					name: '大量聚集'
				}
			],
			list2: [
				{
					value: '红',
					name: '红',
					class:'one'
				},
				{
					value: '橙',
					name: '橙',
					class:'two'
				},
				{
					value: '黄',
					name: '黄',
					class:'three'
				},
				{
					value: '蓝',
					name: '蓝',
					class:'four'
				}
			],
			list3: [
				{
					value: '本地居家隔离',
					name: '本地居家隔离'
				},
				{
					value: '返程后居家隔离',
					name: '返程后居家隔离'
				},
				{
					value: '封路暂时不能返程',
					name: '封路暂时不能返程'
				},
				{
					value: '其余原因不能返程',
					name: '其余原因不能返程'
				}
			],
			list4: [
				{
					value: '安全',
					name: '安全'
				},
				{
					value: '低风险',
					name: '低风险'
				},
				{
					value: '高风险',
					name: '高风险'
				},
				{
					value: '未知',
					name: '未知'
				}
			]
		};
	},
	mounted(){
		this.$getLocationByAmap().then((data)=>{
			let address = data[0].regeocodeData.addressComponent
			this.form.field02 = address.province + address.city + address.district;
		}).catch(()=>{
			
		});
		this.getHtmlContent();
		this.getLastContent()
	},
	methods: {
		getLastContent(){
			this.$HTTP({
				url:'/safeData/getLastOne',
				params:{
					userid:this.userId,
				},
				successCallback:({data})=>{
					if(data.code == 0){
						if(!data.data) return;
						let keyArr = ['03','04','05','06']
						keyArr.forEach(item=>{
							this.form['field'+item] = data.data['field'+item]
						})
						if(!this.form.field02){
							this.form.field02 = data.data.field02
						}
					}else{
						uni.showToast({
							title:data.msg,
							icon:'none'
						})
					}
				}
			})
		},
		handleCall(phoneNumber){
			uni.makePhoneCall({
			    phoneNumber: phoneNumber
			});
		},
		getHtmlContent(){
			this.$HTTP({
				url:'/safeData/getParam',
				params:{},
				successCallback:({data})=>{
					if(data.code == 0){
						this.nodes = data.data[0].v
					}else{
						uni.showToast({
							title:data.msg,
							icon:'none'
						})
					}
					
				}
			})
		},
		handleCancelChoose(){
			this.$refs.linkage.hide()
		},
		showChoose(){
			this.$refs.linkage.show()
		},
		handleChoose({checkArr,checkValue,defaultVal,result}){
			this.$refs.linkage.hide()
			this.region = result
			this.form.field02 = result
		},
		handleRadioChange(evt, name) {
			this.form[name] = evt.target.value;
		},
		send() {
			let params = {
				...this.form,
				field01:this.userId
			}
			this.$HTTP({
				url: '/safeData/save',
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
.color-seg{
	display: inline-block;
	width: 70upx;
	height: 34upx;
	margin-left: 20upx;
	vertical-align: middle;
	&.one{
		background-color: red;
	}
	&.two{
		background-color: orange;
	}
	&.three{
		background-color: yellow;
	}
	&.four{
		
		background-color: blue;
	}
}
</style>
