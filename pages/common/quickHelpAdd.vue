<template>
	<view >
		<view class="m-list first-line">
			<view class="m-line">
				<view class="u-title">所在区县</view>
				<view class="u-content">
					<text @tap="showChoose">{{region}}</text>
				</view>
			</view>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>1.是否需要援助</text> 
			<!-- <text class="icon">单选</text> -->
			</view>
			<radio-group @change="handleRadioChange($event,'field06')">
				<label class="u-list-cell" v-for="(item,index) in list1" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field06 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field06 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>2.是否受伤</text> 
			<!-- <text class="icon">单选</text> -->
			</view>
			<radio-group @change="handleRadioChange($event,'field07')">
				<label class="u-list-cell" v-for="(item, index) in list2" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.field07 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.field07 == item.value }">{{ item.name }}</view>
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
				<editor id="editor"  placeholder="请输入具体要求" @ready="onEditorReady"></editor>
				<!-- <input class="input" type="text" v-model="form.field09" /> -->
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
	</view>
</template>

<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;

export default {
	data() {
		return {
			canRecord:false,//判断是否有录音权限
			region:'选择位置',
			editorCtx:'',//文本域上下文
			contactArr:[
				{
					name:'班主任',phone:'18621582789',
				},{
					name:'学校保卫室',phone:'18621582789',
				},{
					name:'110',phone:'18621582789',
				},
			],
			recordStatus:'1',// 录音状态 1 就绪 2 正在录制 3 已有一份音频文件
			audioStatus:'播放文件',
			text: 'uni-app',
			voicePath: '',
			form:{
				field06:'0',
				field07:'无',
				field09:''
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
					value:'无',
					name:'无'
				},{
					value:'有',
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
			this.audioStatus = '播放文件'
		})
	},
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
			this.form.field02 = result
		},
		onEditorReady() {
			uni.createSelectorQuery().in(this).select('#editor').context((res) => {
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
					this.form.field09 = data.text
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
								this.canRecord = true;
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
											this.canRecord = true;
											this.initPage()
										}
									});
								}, 1500);
							}
						})
					}else{
						this.canRecord = true;
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
			if(!this.canRecord){
				uni.showToast({
					title:'请保证当前录音权限正常!',
					icon:'none'
				})
				return
			};
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
			// 缺少key值  field01 用户id
			// field08 语音信息
			let params = {
				...this.form,
				field01:uni.getStorageSync('userId')
			}
			console.log(params,'params')
			return;
			this.$HTTP({
				url:'/getHelp/save',
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
			// 上传数据
			// uni.uploadFile({
			// 	url:'',//服务器地址
			// 	filePath:'',//文件地址
			// 	name:'',//服务器中文件对应的key值
			// 	formData:{
			// 	},//上传的额外参数
			// 	success:(res)=>{
			// 		console.log(res,'上传成功')
			// 	}
			// })
		}
	}
};
</script>

<style lang="scss" scoped>
	@import '../../static/mp-weixin/globalStyle/radio.scss';
	.first-line{
		margin-top: 20upx;
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
	    background-color: #EEEEEE !important;
		color: $uni-text-color;
		padding: 30upx !important;
		border: solid 1upx #EEEEEE;
	}
</style>
