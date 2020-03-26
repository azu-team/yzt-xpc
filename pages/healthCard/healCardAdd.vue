<template>
	<view>
		<view class="m-top-desc">
			<image class="img" :src="pageInfo.imgPath" mode="aspectFit"></image>
			<view class="rich">
				<rich-text :nodes="pageInfo.textDesc"></rich-text>
			</view>
			<view class="">
				<text class="text">日期:{{pageInfo.date}}</text>
			</view>
			<view class="">
				<text class="text">发起人:{{pageInfo.person}}</text>
			</view>
		</view>
		<!-- <view class="m-top">
			<view class="u-title-1">学生每日健康打卡</view>
			<view class="u-title-2">请大家认真填写</view>
		</view> -->
		<view class="m-list">
			<view class="m-line">
				<view class="u-title" style="width: 25%;">当前区县</view>
				<view class="u-content" style="width: 70%;display: inline-block;">
					<!-- <text @tap="showChoose('linkage')">{{ region }}</text> -->
					<view class=""><input type="text" v-model="form.field06" placeholder="请输入当前位置" /></view>
					<!-- <view class=""><text @tap="showChoose('linkage')">{{ region }}</text></view> -->
					
				</view>
			</view>
		</view>
		<view class="m-list">
			<view class="u-q-title">
				<text>1.目前健康状态</text>
				<!-- <text class="icon">单选</text> -->
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
				<!-- <text class="icon">单选</text> -->
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
		<view class="m-list" v-if="form.field12 == '是'">
			<view class="m-line u-q-title">
				<view class="u-title">乘坐开始日期</view>
				<view class="u-content">
					<text @tap="showChoose('date')">{{ form.field13 || '选择日期' }}</text>
				</view>
			</view>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>7.交通工具</text>
				<uni-tag @click="handleClearData" style="display: inline-block;width: 140upx;margin-left: 20upx;" text="清除选项" type="primary" size="small"></uni-tag>
			</view>
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
					<view class="u-title">{{ text1 }}</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.a" :placeholder="text1" /></view>
				</view>
				<view class="m-line" v-if="text2">
					<view class="u-title">{{ text2 }}</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.b" :placeholder="text2" /></view>
				</view>
				<view class="m-line" v-if="text3">
					<view class="u-title">{{ text3 }}</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.c" :placeholder="text3" /></view>
				</view>
			</view>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>8.导致风险原因</text></view>
			<radio-group class="radio-group" @change="handleRadioChange($event, 'field30')">
				<label class="u-list-cell" v-for="(item, index) in riskReasonList" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field30 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field30 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-bottom">
			<view class="u-btn" @click="validate"><text>提交</text></view>
		</view>
		<link-area
			mode="region"
			@confirm="handleChoose"
			@cancel="handleCancelChoose('linkage')"
			ref="linkage"
			:hideArea="false"
			:areaCode="['11', '1101', '110101']"
			themeColor="#25a5ff"
		></link-area>
		<link-area
			mode="date"
			startYear="2000"
			endYear="2030"
			:current="true"
			@confirm="handleChooseDate"
			@cancel="handleCancelChoose('date')"
			:disabledAfter="true"
			ref="date"
			themeColor="#25a5ff"
		></link-area>
	</view>
</template>
<script>
// import linkArea from '../../components/linkArea/linkArea.vue'
// import linkArea from '../../components/w-picker/w-picker.vue'
// import amap from '../../utils/amap-wx.js';
export default {
	data() {
		return {
			userId:uni.getStorageSync('userId'),
			pageInfo:{
				date:new Date().Format('yyyy-MM-dd'),
				person:'姓名',
				imgPath:'',
				textDesc:'',
			},
			// amapPlugin: null,
			// key: 'ce334d5499fb668332c1a65513a54201',
			lotusAddressData: {
				visible: false,
				provinceName: '',
				cityName: '',
				townName: ''
			},
			region: '选择位置',
			form: {
				field06: '',
				field07: '健康',
				field08: '37以下',
				field09: '否',
				field10: '否',
				field11: '否',
				field12: '否',
				field13: '',
				field14: '',
				field30: '有确诊病历',
				a: '', // 暂时获取页面数据
				b: '', // 暂时获取页面数据
				c: '' // 暂时获取页面数据
			},
			list1: [
				{
					value: '健康',
					name: '健康',
					checked: true
				},
				{
					value: '有发烧、咳嗽等症状',
					name: '有发烧、咳嗽等症状'
				},
				{
					value: '其他症状',
					name: '其他症状'
				}
			],
			list2: [
				{
					value: '无',
					name: '无'
				},
				{
					value: '有',
					name: '有'
				}
			],
			tempList: [
				{
					value: '37以下',
					name: '37以下'
				},
				{
					value: '37-38.5',
					name: '37-38.5'
				},
				{
					value: '38.5以上',
					name: '38.5以上'
				}
			],
			yesOrNo: [
				{
					value: '否',
					name: '否'
				},
				{
					value: '是',
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
			],
			riskReasonList:[
				{
					value:'有确诊病历',
					name:'有确诊病历'
				},{
					value:'有长途行程',
					name:'有长途行程'
				},{
					value:'在重点疫区',
					name:'在重点疫区'
				}
			]
		};
	},
	computed: {
		text1() {
			let textArr = ['飞机-航班号', '火车-车次', '汽车-起止地点', '轮船-起止地点'];
			return this.form.field14 ? textArr[this.form.field14] : '';
		},
		text2() {
			let textArr = ['飞机-起降地点', '火车-乘车区间', '汽车-是否司机'];
			return this.form.field14 < 3 ? textArr[this.form.field14] : '';
		},
		text3() {
			let textArr = ['飞机-座位号', '火车-车厢及座位号'];
			return this.form.field14 < 2 ? textArr[this.form.field14] : '';
		}
	},
	onLoad(e) {},
	mounted() {
		this.$getLocationByAmap().then((data)=>{
			let address = data[0].regeocodeData.addressComponent
			this.form.field06 = address.province + address.city + address.district;
			this.form.field05 = data[0].regeocodeData.addressComponent.city
		}).catch(()=>{
			
		});
		this.initData()
		// this.amapPlugin = new amap.AMapWX({
		// 	key: this.key
		// });
		// this.judgeAuthorize();
	},
	methods: {
		getUserInfo() {
			this.$HTTP({
				url: '/User/userData',
				params: {
					userId: this.userId
				},
				successCallback: ({data}) => {
					if(data.code == '0'){
						this.pageInfo.name = data.data.userName
					}
				}
			});
		},
		initData(){
			// 获取标题数据
			this.$HTTP({
				url:'/healthForDay/getParam',
				params:{},
				successCallback:({data})=>{
					if(data.code == 0){
						this.pageInfo.imgPath = data.data[0].v
						this.pageInfo.textDesc = data.data[1].v
						
					}else{
						uni.showToast({
							title:data.msg,
							icon:'none'
						})
					}
				}
			})
			// 获取上次填报信息
			this.$HTTP({
				url:'/healthForDay/getLastOne',
				params:{
					userid:this.userId
				},
				successCallback:({data})=>{
					if(data.code == 0){
						if(!data.data) return;
						let dataObj = data.data
						let keyArr = ['07','08','09',10,11,12,13,30]
						keyArr.forEach((num,idx)=>{
							this.form['field'+num] = dataObj['field'+num]
						})
						if(dataObj.field14){
							this.setDataByfield14(dataObj.field14,dataObj)
						}
						if(!this.form.field06){
							this.form.field06 = dataObj['field06']
						}
					}else{
						uni.showToast({
							title:data.msg,
							icon:'none'
						})
					}
				}
			})
			this.getUserInfo();
		},
		setDataByfield14(type,dataObj){
			switch(type){
				case '飞机': {
					this.form.a = dataObj.field15 ;
					this.form.b = dataObj.field16 ;
					this.form.c = dataObj.field17 ;
					this.form.field14 = '0'
				};break;
				case '火车': {
					this.form.a = dataObj.field18 ;
					this.form.b = dataObj.field19 ;
					this.form.c = dataObj.field20 ;
					this.form.field14 = '1'
				};break;
				case '汽车': {
					this.form.a = dataObj.field21 ;
					this.form.b = dataObj.field22 ;
					this.form.field14 = '2'
				};break;
				case '轮船': {
					this.form.a = dataObj.field23 ;
					this.form.field14 = '3'
				};break;
			}
		},
		handleClearData(){
			this.form.field14 = ''
		},
		validate() {
			let params = {
				...this.form
			}
			switch (this.form.field14) {
				case '0':
					{
						params.field15 = this.form.a;
						params.field16 = this.form.b;
						params.field17 = this.form.c;
						params.field14 = '飞机'
					}
					break;
				case '1':
					{
						params.field18 = this.form.a;
						params.field19 = this.form.b;
						params.field20 = this.form.c;
						params.field14 = '火车'
					}
					break;
				case '2':
					{
						params.field21 = this.form.a;
						params.field22 = this.form.b;
						params.field14 = '汽车'
					}
					break;
				case '3':
					{
						params.field23 = this.form.a;
						params.field14 = '轮船'
					}
					break;
			}
			params.field01 = this.userId
			params.field02 = uni.getStorageSync('idType')
			// console.log(params)
			// return;
			this.send(params);
		},
		send(params) {
			// 以上字段暂未确定
			// let params = {
			// 	...this.form,
			// 	field01: uni.getStorageSync('userId'),
			// 	field02: uni.getStorageSync('idType')
			// };
			// 去除多余属性
			delete params.a;
			delete params.b;
			delete params.c;
			this.$HTTP({
				url: '/healthForDay/save',
				params,
				successCallback: ({ data }) => {
					if (data.code == 0) {
						uni.showToast({
							title: '提交成功!'
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					} else {
						uni.showToast({
							title: data.msg,
							icon: 'none'
						});
					}
				}
			});
		},
		showChoose(refName) {
			this.$refs[refName].show();
		},
		handleCancelChoose(refName) {
			this.$refs[refName].hide();
		},
		handleChoose({ checkArr, checkValue, defaultVal, result }) {
			this.$refs.linkage.hide();
			this.form.field06 = result//checkValue.join(',');
			this.region = result;
		},
		handleChooseDate({ checkArr, checkValue, defaultVal, result }) {
			this.$refs.date.hide();
			this.form.field13 = checkArr[0].join('');
		},
		handleRadioChange(evt, name) {
			this.form[name] = evt.target.value;
		},
		
		judgeAuthorize() {
			uni.getSetting({
				success: info => {
					if (!info.authSetting['scope.userLocation']) {
						uni.authorize({
							scope: 'scope.userLocation',
							success: () => {
								// this.initPage()
								this.amapPlugin.getRegeo({
									success: data => {
										this.form.field06 = data[0].name;
										this.form.field05 = data[0].regeocodeData.addressComponent.city
									},
									fail:(err)=>{
										console.log(err,'err')
									}
								});
								uni.getLocation({
									success: res => {
										console.log(res, '地理位置');
									}
								});
							},
							fail: () => {
								uni.showToast({
									title:'请打开定位服务以便获取当前位置!',
									icon:'none',
									duration:3000
								})
							}
						});
					} else {
						// this.initPage()
						uni.getLocation({
							success: res => {
								this.amapPlugin.getRegeo({
									success: data => {
										this.form.field06 = data[0].name;
										this.form.field05 = data[0].regeocodeData.addressComponent.city
									},
									fail:(err)=>{
										console.log(err,'err')
									}
								});
							},
							fail: () => {
								uni.showToast({
									title:'请打开定位服务以便获取当前位置!',
									icon:'none',
									duration:3000
								})
							}
						});
					}
				},
				// complete: () => {
				// 	this.amapPlugin.getRegeo({
				// 		success: data => {
				// 			console.log(data, 'geo');
				// 			this.form.field06 = data[0].name;
				// 		}
				// 	});
				// }
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
.m-top-desc{
	background-color: #FFFFFF;
	margin-bottom: 20upx;
	padding-bottom: 20upx;
	.img{
		width: 750rpx;
		height: 350rpx;
	}
	.text{
		font-size: 32upx;
		color: #797979;
		padding-left: 20upx;
	}
	.rich{
		padding: 0 20rpx;
	}
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
	color: #303133;
}
</style>
