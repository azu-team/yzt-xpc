<template>
	<view class="container">
		<view class="m-tip">
			<view class="u-grid">
				<view class="left">紧急联系人</view>
				<view class="right">
					<view class="list-item" v-for="(item,index) in contactArr" :key="index"><text class="name">{{item.name}}</text> <text class="phone" @tap="handleCall(item.phone)">{{item.phone}}</text></view>
				</view>
			</view>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>1.是否需要援助</text> <text class="icon">单选</text> </view>
			<radio-group @change="handleRadioChange($event,'additionalProp1')">
				<label class="u-list-cell" v-for="(item,index) in list1" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp1 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp1 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>2.是否受伤</text> <text class="icon">单选</text> </view>
			<radio-group @change="handleRadioChange($event,'additionalProp2')">
				<label class="u-list-cell" v-for="(item, index) in list2" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.additionalProp2 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.additionalProp2 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>3.语音信息</text></view>
			<view class="u-content">
				<view :class="{'f-record':true,'recording':recordStatus==2}" @click="handleRecord">{{audioText}}</view>
				<view :class="['f-audio',voicePath?'':'disabled',audioStatus=='播放文件'?'':'recording']" @click="playVoice">{{audioStatus}}</view>
			</view>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>4.求助具体要求</text></view>
			<view class="u-content">
				<editor id="editor" class="ql-container" placeholder="请输入具体要求" @ready="onEditorReady"></editor>
				<!-- <input class="input" type="text" v-model="form.requireContent" /> -->
			</view>
		</view>
		<view class="m-bottom">
			<view class="u-btn" @click="validate"><text>提交</text></view>
		</view>
	</view>
</template>

<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;

export default {
	data() {
		return {
			editorCtx:'',//文本域上下文
			contactArr:[
				{
					name:'赵某某',phone:'15154546565',
				},{
					name:'钱某某',phone:'15154546565',
				},{
					name:'孙某某',phone:'15154546565',
				},
			],
			recordStatus:'1',// 录音状态 1 就绪 2 正在录制 3 已有一份音频文件
			audioStatus:'播放文件',
			text: 'uni-app',
			voicePath: '',
			form:{
				additionalProp1:'0',
				additionalProp2:'0',
				requireContent:''
			},
			list1: [
				{
					value: '0',
					name: '健康',
					checked:true,
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
			list2:[
				{
					value:'0',
					name:'无'
				},{
					value:'1',
					name:'有'
				}
			]
		};
	},
	computed:{
		audioText(){
			let audioObj = {
				1:'录制',
				2:'结束录制',
				3:'重新录制'
			}
			return audioObj[this.recordStatus]
		}
	},
	mounted() {
		this.judgeAuthorize()
		innerAudioContext.onEnded(()=>{
			console.log('结束了')
			this.audioStatus = '播放文件'
		})
	},
	methods: {
		onEditorReady() {
		    uni.createSelectorQuery().select('#editor').context((res) => {
		        this.editorCtx = res.context
		    }).exec()
		},
		handleCall(phoneNumber){
			uni.makePhoneCall({
			    phoneNumber: phoneNumber
			});
		},
		handleRadioChange(evt,name){
			this.form[name] = evt.target.value
		},
		validate(){
			this.editorCtx.getContents({
				success:(data)=>{
					this.form.requireContent = data.text
				},
				fail:()=>{
					uni.showToast({
						title:'求助具体要求出现问题!',
						icon:'none'
					})
				},
				complete:()=>{
					// 如果求助要求不是必须项，则使用此方法，否则只调用success方法
					this.sendData()
				}
			})
		},
		sendData(){
			// let params = JSON.stringify({
			// 	userid:'123',
			// 	results:this.form
			// })
			// this.$HTTP({
			// 	url:'/campusapp/userhealth/answer',
			// 	root:'http://61.132.95.169:10105',
			// 	params,
			// 	successCallback:(res)=>{
			// 		console.log(res,'res')
			// 		uni.showToast({
			// 			title:'提交成功!'
			// 		})
			// 	}
			// })
		},
		judgeAuthorize() {
			uni.getSetting({
				success: info => {
					/*
						{"errMsg":"getSetting:ok","authSetting":{"scope.userInfo":true,"scope.record":true}}
					*/
					if(!info.authSetting['scope.record']){
						uni.authorize({
							scope:'scope.record',
							success:()=>{
								this.initPage()
							},
							fail:()=>{
								uni.showToast({
									title:'请确认录音功能正常',
									icon:'none'
								})
								setTimeout(()=> {
									uni.openSetting({
										success: res => {
											this.initPage()
										}
									});
								}, 1500);
							}
						})
					}else{
						this.initPage()
					}
				}
			});
		},
		initPage(){
			recorderManager.onStop((res) =>{
				this.voicePath = res.tempFilePath;
			});
		},
		handleRecord(){
			if(this.recordStatus == 1 || this.recordStatus == 3){
				recorderManager.start();
				this.recordStatus = 2
			}else if(this.recordStatus == 2){
				recorderManager.stop();
				this.recordStatus = 3
			}
		},
		playVoice() {
			if(this.audioStatus == '播放中...') return;
			if (this.voicePath) {
				innerAudioContext.src = this.voicePath;
				innerAudioContext.play();
				this.audioStatus = '播放中...'
			}
		},
		sendData(){
			// 上传数据
			uni.uploadFile({
				url:'',//服务器地址
				filePath:'',//文件地址
				name:'',//服务器中文件对应的key值
				formData:{
				},//上传的额外参数
				success:(res)=>{
					console.log(res,'上传成功')
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
	.m-tip{
		background-color: #FFFFFF;
		padding: 20upx 20upx;
		margin-bottom: 20upx;
		border-bottom: solid 1upx #e7f4fe;
		.u-grid{
			.left,.right{
				display: inline-block;
				vertical-align: top;
				font-size: 30upx;
				color: $uni-text-color;
			}
			.left{
				width: 40%;
				text-align: center;
			}
			.right{
				width: 60%;
				text-align: center;
				.list-item{
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin-bottom: 10upx;
					.name{
						font-weight: bold;
					}
					.phone{
						color: #25A5FF;
					}
				}
			}
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
	.m-bottom{
		text-align: center;
	}
	#editor {
		box-sizing: border-box;
	    width: 95%;
	    height: 60upx;
	    background-color: #EEEEEE;
		color: $uni-text-color;
		padding: 30upx;
	}
</style>
