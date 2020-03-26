<template>
	<view >
		<view class="m-list first-line">
			<view class="m-line">
				<view class="u-title" style="width: 20%;">当前位置</view>
				<view class="u-content" style="width: 75%;">
					<view class="" style="width: 100%;"><input type="text" v-model="form.FIELD02" placeholder="请输入当前位置" /></view>
					<!-- <text @tap="showChoose">{{region}}</text> -->
				</view>
			</view>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>1.是否需要援助</text> 
			<!-- <text class="icon">单选</text> -->
			</view>
			<radio-group @change="handleRadioChange($event,'FIELD03')">
				<label class="u-list-cell" v-for="(item,index) in list2" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.FIELD03 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.FIELD03 == item.value }">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="m-list">
			<view class="u-q-title"><text>2.是否受伤</text> 
			<!-- <text class="icon">单选</text> -->
			</view>
			<radio-group @change="handleRadioChange($event,'FIELD04')">
				<label class="u-list-cell" v-for="(item, index) in list2" :key="index">
					<view class="u-radio"><radio :value="item.value" :checked="form.FIELD04 == item.value" /></view>
					<view :class="{ 'u-text': true, active: form.FIELD04 == item.value }">{{ item.name }}</view>
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
				<editor id="editor" style="background-color: #EEEEEE;padding: 20upx;width: 95%;border: solid 1upx #EEEEEE;"  placeholder="请输入具体要求" @ready="onEditorReady"></editor>
				<!-- <textarea id="editor" v-model="form.FIELD06" placeholder-style="color:#F76260" placeholder="占位符字体是红色的"/> -->
				<!-- <input class="input" type="text" v-model="form.FIELD06" /> -->
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
import {http_root} from '../../utils/config.js'
import amap from '../../utils/amap-wx.js';
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;

export default {
	data() {
		return {
			amapPlugin: null,
			key: 'ce334d5499fb668332c1a65513a54201',
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
				FIELD02:'',
				FIELD03:'否',
				FIELD04:'否',
				FIELD06:'',
				FIELD08:'',//经度
				FIELD09:'',//纬度
			},
			list1: [
				{
					value: '健康',
					name: '健康',
					checked:true,
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
			list2:[
				{
					value:'否',
					name:'否'
				},{
					value:'是',
					name:'是'
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
		this.$getLocationByAmap().then((data)=>{
			this.form.FIELD08 = data[0].longitude
			this.form.FIELD09 = data[0].latitude
			this.form.FIELD02 = data[0].name;
		}).catch(()=>{
			
		});
		// this.amapPlugin = new amap.AMapWX({
		// 	key: this.key
		// });
		// 判断当前是否有录音权限
		recorderManager.onStop((res) =>{
			uni.getFileInfo({
				filePath:res.tempFilePath,
				success:({errMsg,size,digest})=>{
					// TODO 是否需要限制上传音频文件大小
					console.log(size/1024+'kb')
				}
			})
			this.voicePath = res.tempFilePath;
		});
		this.judgeAuthorize()
		innerAudioContext.onEnded(()=>{
			this.audioStatus = '播放文件'
		})
		innerAudioContext.onError(({errCode})=>{
			uni.showToast({
				title:errCode,
				icon:'none'
			})
			this.$nextTick(()=>{
				// this.audioStatus = '播放文件'
			})
		})
		this.getLastContent()
	},
	methods: {
		setText(text){
			if(this.editorCtx){
				this.editorCtx.insertText({
					text:text,
					success:()=>{
						// 在赋值完成后页面会滚动到对应的位置
						uni.pageScrollTo({
							scrollTop:0
						})
						// this.$emit('pageScrollTop')
					}
				})
			}else{
				setTimeout(()=>{
					this.setText(text)
				},1500)
			}
		},
		handleFile(fileUrl){
			uni.showLoading({
				title:'下载录音文件中...'
			})
			let fileName = new Date().valueOf();
			let fileType = fileUrl.substring(fileUrl.length - 3)
			uni.downloadFile({
				url:fileUrl,
				filePath:wx.env.USER_DATA_PATH + '/' + fileName + '.'+ fileType,
				success:(res)=>{
					console.log(res,'res')
					uni.hideLoading()
					// console.log(tempFilePath,'音频文件路径')
					this.voicePath = res.filePath;
				},
				fail:()=> {
					uni.hideLoading()
					uni.showToast({
						title:'下载失败',
						icon:'none'
					})
				}
			})
		},
		getLastContent(){
			this.$HTTP({
				url:'/getHelp/getLastOne',
				params:{
					userid:uni.getStorageSync('userId'),
				},
				successCallback:({data})=>{
					if(data.code == 0){
						if(!data.data) return;
						this.form.FIELD03 = data.data.field03
						this.form.FIELD04 = data.data.field04
						// 给文本域赋值
						if(data.data.field06) this.setText(data.data.field06)
						// 处理录音文件
						if(data.data.field05) this.handleFile(data.data.field05);
						// 设置当前位置
						if(!this.form.FIELD02){
							this.form.FIELD02 = data.data.field02
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
		handleCancelChoose(){
			this.$refs.linkage.hide()
		},
		showChoose(){
			this.$refs.linkage.show()
		},
		handleChoose({checkArr,checkValue,defaultVal,result}){
			this.$refs.linkage.hide()
			this.region = result
			this.form.FIELD02 = result
		},
		onEditorReady() {
			uni.createSelectorQuery().in(this).select('#editor').context((res) => {
		        this.editorCtx = res.context
		    }).exec()
		},
		handleRadioChange(evt,name){
			this.form[name] = evt.target.value
		},
		validate(){
			this.editorCtx.getContents({
				success:(data)=>{
					this.form.FIELD06 = data.text
				},
				fail:()=>{
					uni.showToast({
						title:'求助具体要求出现问题!',
						icon:'none'
					})
				},
				complete:()=>{
					// 对文本域内的内容进行字数限制
					if(this.form.FIELD06.length>500){
						uni.showToast({
							title:'求助具体要求不能超过1000字!',
							icon:'none'
						})
						return
					}
					// 如果求助要求不是必须项，则使用此方法，否则只调用success方法
					let params = {
						...this.form,
						FIELD01:uni.getStorageSync('userId'),
						ID:'',
					}
					if(this.voicePath){
						this.sendDataByFiles(params)
					}else{
						this.sendData(params)
					}
				}
			})
		},
		hasLocationQx(){
			uni.getLocation({
				success: res => {
					this.amapPlugin.getRegeo({
						success: data => {
							this.form.FIELD08 = data[0].longitude
							this.form.FIELD09 = data[0].latitude
							this.form.FIELD02 = data[0].name;
							// this.form.FIELD05 = data[0].regeocodeData.addressComponent.city
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
		},
		judgeAuthorize() {
			uni.getSetting({
				success: info => {
					if(info.authSetting['scope.record']){
						this.canRecord = true;
					}
				}
			});
		},
		openQx(){
			uni.authorize({
				scope:'scope.record',
				success:()=>{
					this.canRecord = true;
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
							}
						});
					}, 500);
				}
			})
		},
		handleRecord(){
			if(!this.canRecord){
				uni.showToast({
					title:'请保证当前录音权限正常!',
					icon:'none'
				})
				setTimeout(()=>{
					this.openQx()
				},500)
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
				console.log(this.voicePath,'=====')
				innerAudioContext.src = this.voicePath;
				innerAudioContext.play();
				this.audioStatus = '播放中...'
			}
		},
		handleSuccess(data){
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
		},
		sendDataByFiles(params){
			
			uni.showLoading({
				title:'正在提交',
				icon:'none'
			})
			uni.uploadFile({
				url:http_root+'/getHelp/saveupFile',//服务器地址
				filePath:this.voicePath,//文件地址
				name:'FIELD05',//服务器中文件对应的key值
				formData:params,//上传的额外参数
				success:({data})=>{
					uni.hideLoading()
					data = JSON.parse(data)
					this.handleSuccess(data)
				}
			})
		},
		sendData(params){
			// 不含附件字段要为小写
			let params_lower={}
			for(let key in params){
				params_lower[key.toLowerCase()] = params[key]
			}
			this.$HTTP({
				url:'/getHelp/save',
				params:params_lower,
				successCallback: ({data}) => {
					this.handleSuccess(data)
				}
			})
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
	    background-color: #EEEEEE ;
		color: $uni-text-color;
		padding: 30upx ;
		border: solid 1upx #EEEEEE;
	}
</style>
