<template>
	<view class="container">
		<view class="m-top">
			<view class="u-title-1">学生每日健康打卡</view>
			<view class="u-title-2">请大家认真填写</view>
		</view>
		<view class="m-list">
			<view class="m-line">
				<view class="u-title">所在区县</view>
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
			<radio-group class="radio-group" @change="handleRadioChange($event, 'field07')">
				<label class="u-list-cell" v-for="(item, index) in list1" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field07 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field07 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title">
				<text>2.今日体温</text>
				<text class="icon">单选</text>
			</view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'field08')">
				<label class="u-list-cell" v-for="(item, index) in tempList" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field08 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field08 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>3.自2020年1月15日起是否途径湖北省</text></view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'field09')">
				<label class="u-list-cell" v-for="(item, index) in yesOrNo" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field09 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field09 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>4.自2020年1月15日起是否接触过来自重点疫区人员或者被隔离人员</text></view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'field10')">
				<label class="u-list-cell" v-for="(item, index) in yesOrNo" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field10 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field10 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>5.是否接触过疑似或确诊的新型冠状病毒肺炎患者</text></view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'field11')">
				<label class="u-list-cell" v-for="(item, index) in yesOrNo" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field11 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field11 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>6.自2020年1月15日起是否乘坐长途公交（如果选是，则补充后续的字段）</text></view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'field12')">
				<label class="u-list-cell" v-for="(item, index) in yesOrNo" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field12 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field12 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list" v-if="form.field12=='1'">
			<view class="m-line u-q-title">
				<view class="u-title">乘坐开始日期</view>
				<view class="u-content">
					<input class="u-input" type="text" v-model="form.field13" placeholder="例如2020-01-21" />
				</view>
			</view>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>7.交通工具</text></view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'field14')">
				<label class="u-list-cell" v-for="(item, index) in vehicleList" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field14 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field14 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list" v-if="form.field14">
			<view class="u-q-title"><text>交通详细信息</text></view>
			<view class="u-q-content">
				<view class="m-line">
					<view class="u-title">{{text1}}</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.a" placeholder="飞机-航班号" /></view>
				</view>
				<view class="m-line" v-if="text2">
					<view class="u-title">{{text2}}</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.b" placeholder="飞机-起降地点" /></view>
				</view>
				<view class="m-line" v-if="text3">
					<view class="u-title">{{text3}}</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.c" placeholder="飞机-座位号" /></view>
				</view>
			</view>
		</view>

		<view class="m-bottom">
			<view class="u-btn" @click="validate"><text>提交</text></view>
		</view>
		<link-area 
			mode="region"
			@confirm="handleChoose"
			@cancel="handleCancelChoose"
			ref="linkage"
			:hideArea="false"
			:areaCode="['11', '1101', '110101']"
			themeColor="#25a5ff"></link-area>
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
				field07: '0',
				field08: '0',
				field09: '0',
				field10: '0',
				field11: '0',
				field12: '0',
				field13: '',
				field14: '',
				a: '0', // 暂时获取页面数据
				b: '0',// 暂时获取页面数据
				c: '0' // 暂时获取页面数据
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
					name: '否'
				},
				{
					value: '1',
					name: '是'
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
			return this.form.field14?textArr[this.form.field14]:''
		},
		text2(){
			let textArr= ['飞机-起降地点','火车-乘车区间','汽车-是否司机']
			return this.form.field14 < 3?textArr[this.form.field14]:''
		},
		text3(){
			let textArr= ['飞机-座位号','火车-车厢及座位号']
			return this.form.field14 < 2?textArr[this.form.field14]:''
		},
	},
	onLoad(e) {},
	methods: {
		validate(){
			switch(this.form.field14){
				case '0': {
					this.form.field15 = this.form.a;
					this.form.field16 = this.form.b;
					this.form.field17 = this.form.c;
				} ;break;
				case '1':{
					this.form.field18 = this.form.a;
					this.form.field19 = this.form.b;
					this.form.field20 = this.form.c;
				} ;break;
				case '2':{
					this.form.field21 = this.form.a;
					this.form.field22 = this.form.b;
				} ;break;
				case '3':{
					this.form.field23 = this.form.a;
				} ;break;
			}
			this.send()
		},
		handleCancelChoose(){
			this.$refs.linkage.hide()
		},
		showChoose(){
			this.$refs.linkage.show()
		},
		handleChoose({checkArr,checkValue,defaultVal,result}){
			this.$refs.linkage.hide()
			this.form.field06 = checkValue.join(',')
			this.region = result
		},
		handleRadioChange(evt, name) {
			this.form[name] = evt.target.value;
		},
		send() {
			// field03	用户所属学校
			// 以上字段暂未确定
			let params = {
				...this.form,
				field01:uni.getStorageSync('userId'),
				field02:uni.getStorageSync('idType'),
			}
			// 去除多余属性
			delete params.a
			delete params.b
			delete params.c
			this.$HTTP({
				url: '/healthForDay/save',
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

.u-input {
	border-bottom: solid 1px #ccc;
	padding: 0 20upx;
	color:#303133 ;
}
</style>
