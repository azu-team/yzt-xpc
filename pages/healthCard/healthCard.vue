<template>
	<view class="container">
		<view class="m-top">
			<view class="u-title-1">学生每日健康打卡</view>
			<view class="u-title-2">请大家认真填写</view>
		</view>
		<view class="m-list">
			<view class="m-line">
				<view class="u-title">目前模糊位置</view>
				<view class="u-content">
					<text @tap="showChoose">{{region}}</text>
				</view>
			</view>
		</view>
		<view class="m-list">
			<view class="u-q-title">
				<text>1.目前健康状态</text>
				<text class="icon">单选</text>
			</view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'additionalProp1')">
				<label class="u-list-cell" v-for="(item, index) in list1" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp1 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp1 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title">
				<text>2.今日体温</text>
				<text class="icon">单选</text>
			</view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'additionalProp2')">
				<label class="u-list-cell" v-for="(item, index) in tempList" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp2 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp2 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>3.自2020年1月15日起是否途径湖北省</text></view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'additionalProp3')">
				<label class="u-list-cell" v-for="(item, index) in yesOrNo" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp3 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp3 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>4.自2020年1月15日起是否接触过来自重点疫区人员或者被隔离人员</text></view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'additionalProp4')">
				<label class="u-list-cell" v-for="(item, index) in yesOrNo" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp4 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp4 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>5.是否接触过疑似或确诊的新型冠状病毒肺炎患者</text></view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'additionalProp5')">
				<label class="u-list-cell" v-for="(item, index) in yesOrNo" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp5 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp5 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>6.自2020年1月15日起是否乘坐长途公交（如果选是，则补充后续的字段）</text></view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'additionalProp6')">
				<label class="u-list-cell" v-for="(item, index) in yesOrNo" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp6 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp6 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="m-line u-q-title">
				<view class="u-title">乘坐开始日期</view>
				<view class="u-content">
					<input class="u-input" type="text" v-model="form.additionalProp7" placeholder="例如2020-01-21" />
				</view>
			</view>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>7.交通工具</text></view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'additionalProp8')">
				<label class="u-list-cell" v-for="(item, index) in vehicleList" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp8 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp8 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list" v-if="form.additionalProp8">
			<view class="u-q-title"><text>交通详细信息</text></view>
			<view class="u-q-content">
				<view class="m-line">
					<view class="u-title">{{text1}}</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.additionalProp9" placeholder="飞机-航班号" /></view>
				</view>
				<view class="m-line" v-if="text2">
					<view class="u-title">{{text2}}</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.additionalProp10" placeholder="飞机-起降地点" /></view>
				</view>
				<view class="m-line" v-if="text3">
					<view class="u-title">{{text3}}</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.additionalProp11" placeholder="飞机-座位号" /></view>
				</view>
			</view>
		</view>

		<view class="m-bottom">
			<view class="u-btn" @click="send"><text>提交</text></view>
		</view>
		<!-- <link-area @choseVal="choseValue" :lotusAddressData="lotusAddressData"></link-area> -->
		<link-area 
			mode="region"
			:level="3"
			@confirm="handleChoose"
			@cancel="handleCancelChoose"
			ref="linkage"
			:hideArea="true"
			themeColor="#f00"></link-area>
		<!-- <link-area 
			mode="date" 
			startYear="2017" 
			endYear="2019"
			defaultVal="2019-10-31"
			:current="false" 
			@confirm="handleChoose"
			:disabledAfter="true"
			ref="linkage" 
			themeColor="#f00"
		></link-area> -->
	</view>
</template>
<script>
// import linkArea from '../../components/linkArea/linkArea.vue'
import linkArea from '../../components/w-picker/w-picker.vue'
export default {
	components:{linkArea},
	data() {
		return {
			lotusAddressData:{
				visible:false,
				provinceName:'',
				cityName:'',
				townName:'',
			},
			region:'选择位置',
			form: {
				additionalProp1: '0',
				additionalProp2: '0',
				additionalProp3: '0',
				additionalProp4: '0',
				additionalProp5: '0',
				additionalProp6: '0',
				additionalProp7: '',
				additionalProp8: '',
				additionalProp9: '0',
				additionalProp10: '0',
				additionalProp11: '0'
			},
			list1: [
				{
					value: '0',
					name: '健康',
					checked: true
				},
				{
					value: '1',
					name: '有发烧、咳嗽等症状'
				},
				{
					value: '2',
					name: '其他症状'
				}
			],
			list2: [
				{
					value: '0',
					name: '无'
				},
				{
					value: '1',
					name: '有'
				}
			],
			tempList: [
				{
					value: '0',
					name: '37以下'
				},
				{
					value: '1',
					name: '37-38.5'
				},
				{
					value: '2',
					name: '38.5以上'
				}
			],
			yesOrNo: [
				{
					value: '0',
					name: '无'
				},
				{
					value: '1',
					name: '有'
				}
			],
			vehicleList: [
				{
					value: '0',
					name: '飞机'
				},
				{
					value: '1',
					name: '火车'
				},
				{
					value: '2',
					name: '汽车'
				},
				{
					value: '3',
					name: '轮船'
				}
			]
		};
	},
	computed:{
		text1(){
			let textArr= ['飞机-航班号','火车-车次','汽车-起止地点','轮船-起止地点']
			return this.form.additionalProp8?textArr[this.form.additionalProp8]:''
		},
		text2(){
			let textArr= ['飞机-起降地点','火车-乘车区间','汽车-是否司机']
			return this.form.additionalProp8 < 3?textArr[this.form.additionalProp8]:''
		},
		text3(){
			let textArr= ['飞机-座位号','火车-车厢及座位号']
			return this.form.additionalProp8 < 2?textArr[this.form.additionalProp8]:''
		},
	},
	onLoad(e) {},
	methods: {
		handleCancelChoose(){
			this.$refs.linkage.hide()
		},
		showChoose(){
			this.$refs.linkage.show()
		},
		handleChoose({checkArr,checkValue,defaultVal,result}){
			this.$refs.linkage.hide()
			this.region = result
		},
		choseValue(res){
			//res数据源包括已选省市区与省市区code
			console.log(res);
			this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
			//res.isChose = 1省市区已选 res.isChose = 0;未选
			if(res.isChose){
				this.lotusAddressData.provinceName = res.province;//省
				this.lotusAddressData.cityName = res.city;//市
				this.lotusAddressData.townName = res.town;//区
				this.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
			}
		},
		confirmCallback(){
			console.log(arguments,'参数')
			// let ads=this.$store.state.user_address;
		},
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
.m-line {
	display: flex;
	padding: 5upx 40upx;
	padding-top: 50upx;
	justify-content: space-between;
	align-items: center;
	.u-title {
		width: 35%;
		color: #303133;
		font-size: 32upx;
		.icon {
			width: 50upx;
			height: 40upx;
			vertical-align: middle;
			margin-right: 10upx;
		}
	}
	.u-content {
		width: 60%;
		font-size: 32upx;
		.img {
			width: 60%;
			height: 145upx;
		}
	}
}
.u-input {
	border-bottom: solid 1px #ccc;
	padding: 0 20upx;
	color:#303133 ;
}
</style>
