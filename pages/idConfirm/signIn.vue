<template>
	<view class="bg">
		<view class="container">
			<!-- <view class="top-btn-g">
				<view class="g-btn"  @tap="goSignUp">去认证</view>
			</view> -->
			<view class="m-line">
				<view class="u-title">
					<!-- <image class="icon" src="../../static/mp-weixin/type.png" mode="aspectFit"></image> -->
					我是
				</view>
				<view class="u-content">
					<my-select
						:list="list"
						:clearable="false"
						:showItemNum="5"
						:listShow="false"
						:isCanInput="false"
						:style_Container="'height: 2em; font-size: 28upx;'"
						:placeholder="'选择身份'"
						:selectHideType="'hideAll'"
						:initValue="list[0].value"
						@change="handleSelectChange"
					></my-select>
				</view>
			</view>

			<view class="m-line">
				<view class="u-title">
					<!-- <image class="icon" src="../../static/mp-weixin/name.png" mode="aspectFit"></image> -->
					姓名
				</view>
				<view class="u-content"><input class="u-input" type="text" v-model="form.XM" placeholder="请输入姓名(必填)" /></view>
			</view>

			<view class="m-line">
				<view class="u-title">
					<!-- <image class="icon" src="../../static/mp-weixin/id.png" mode="aspectFit"></image> -->
					身份证号
				</view>
				<view class="u-content"><input class="u-input" type="idcard" v-model="form.SFZH" placeholder="请输入身份证号(必填)" /></view>
			</view>

			<view class="m-line">
				<view class="u-title">
					<!-- <image class="icon" src="../../static/mp-weixin/name.png" mode="aspectFit"></image> -->
					ESN账号
				</view>
				<view class="u-content"><input class="u-input" type="text" v-model="form.ESN" placeholder="没有ESN账号则不填" /></view>
			</view>
			<view class="u-line-tips">Education Security Number 教育电子身份号。是根据个人的实名信息，采用密码算法生成的个人身份标识，是一个10位数字串。</view>

			<view class="m-bottom">
				<!-- open-type="getUserInfo" -->
				<button class="u-btn" @tap="handleConfirm">
					<text>下一步{{ form.ESN ? '(人脸识别)' : '' }}</text>
				</button>
			</view>
			<view class="m-clause">
				<checkbox-group @change="handleCheckChange" style="display: inline-block;">
					<checkbox   :checked="hasChecked" color="#5E5EFC" style="transform:scale(0.7)" />
				</checkbox-group>
				   我同意
					<text class="link" @tap="watchLink('https://hao.pthink.com.cn/privacy/jszj_user.htm')">《用户协议》</text>及
					<text class="link" @tap="watchLink('https://hao.pthink.com.cn/privacy/jszj.htm')">《隐私政策》</text>
			</view>
			<cropper selWidth="660rpx" selHeight="660rpx" @upload="myUpload" avatarStyle="width:100vw;height:100vw;" ref='cropper' ></cropper>
			<!-- #ifdef MP-WEIXIN -->
			<!-- <camera device-position="front" flash="off" binderror="error" style="width: 100%; height: 300px;"></camera> -->
			<!-- #endif -->
		</view>
	</view>
</template>
<script>
import mySelect from '../../components/xfl-select/xfl-select.vue';
import cropper from "./cropper.vue";
import {http_root} from '../../utils/config.js'
export default {
	
	components: { mySelect , cropper},
	data() {
		return {
			hasChecked:false,
			tempFilePath: '', //上传图片地址
			form: {
				SFZH: '',
				ZYSFLX: '1',
				XM: '',
				ESN: '',
				RLSJ: ''
			},
			list: [
				//要展示的数据
				{
					value: '学生',
					id: '1'
				},
				{
					value: '家长',
					id: '2'
				},
				{
					value: '教师',
					id: '3'
				},
				{
					value: '行政管理人员',
					id: '4'
				}
			]
		};
	},
	methods: {
		handleCheckChange(){
			this.hasChecked = !this.hasChecked
		},
		watchLink(link){
			uni.navigateTo({
				url:'../outLink/outLink?type='+link,
			})
		},
		// 图片选择之后
		myUpload({path}) {
		  // TODO 将选择的图片上传到服务器，同时携带参数
		  // this.sendData();
		  console.log(path)
		  // 图片选择之后进行上传
		},
		handleSelectChange({ index, newVal, oldVal, orignItem }) {
			this.form.ZYSFLX = orignItem.id;
		},
		handleLogin(wxUserInfo) {
			// http://192.168.1.102:8015/UserAuth/esnActivate
			// this.$HTTP({
			// 	url:'/UserAuth/esnActivate',
			// 	params:{},
			// 	successCallback:(res)=>{
			// 	},
			// })
			// uni.setStorageSync('userInfo',res)
			// uni.setStorageSync('idType',this.form.type)
			// uni.navigateBack()
		},
		handleConfirm() {
			// 确保用户隐私协议已勾选
			if(!this.hasChecked){
				uni.showToast({
					title:'请勾选用户隐私协议！',
					icon:'none'
				})
				return
			}
			// this.$emit('switchStatus', this.form.ZYSFLX);
			// return;
			// 将身份类型进行转码，因为在首页的权限判断不一致
			let idType = {
				"1":'1',
				"2":'20',
				"3":'2',
				"4":'21'
			}
			let params = {
				...this.form,
				USERID: uni.getStorageSync('userId')
			}
			params.ZYSFLX = idType[this.form.ZYSFLX]
			if (!this.form.ESN) {
				// 如果esn为空，表示注册用户
				this.sendData(params);
				return;
			}
			// this.$emit('switchStatus', this.form.type);
			// return;
			// #ifdef MP-WEIXIN
			// 选择图片
			// this.$refs['cropper'].fSelect();
			// return;
			uni.chooseImage({
				count: 1,
				sourceType:['camera'],
				success: ({ tempFilePaths, tempFiles }) => {
					// 图片大小小于40k
					this.tempFilePath = tempFilePaths[0];
					this.sendDataByFile(params)
					// if (tempFiles[0].size < 40 * 1024) {
					// 	uni.getFileSystemManager().readFile({
					// 		filePath: tempFilePaths[0],
					// 		encoding: 'base64',
					// 		success: res => {
					// 			this.form.RLSJ = 'data:image/jpeg;base64,' + res.data;
					// 			this.sendData();
					// 		}
					// 	});
					// } else {
					// 	uni.showToast({
					// 		title: '文件大小要小于40k',
					// 		icon: 'none',
					// 		duration: 3000
					// 	});
					// }
				},
				fail: () => {
					// uni.showToast({
					// 	title:'图片上传错误,请重试',
					// 	icon:'none'
					// })
				}
			});
			// wx.checkIsSupportSoterAuthentication({
			// 	success: supportMode => {
			// 		// console.log(supportMode,'mode')
			// 		// facial 脸部识别
			// 		if (supportMode.supportMode.includes('fingerPrint') != -1) {
			// 			// wx.checkIsSoterEnrolledInDevice({
			// 			//  checkAuthMode:'fingerPrint',
			// 			//  success:(info)=>{
			// 			//   console.log(info,'isEnrolled')
			// 			//  }
			// 			// })
			// 			// 系统不支持人脸识别就采用手动人脸识别
			// 		}
			// 	}
			// });
			// #endif
		},
		// 不包含附件，直接发请求,注册用户
		sendData(params){
			this.$HTTP({
				url: '/UserAuth/registerUser',
				params: params,
				successCallback: ({ data }) => {
					this.handleSuccess(data)
				}
			});
		},
		// 上传附件进行验证
		sendDataByFile(params) {
			uni.showLoading({
				title:'正在验证',
				icon:'none'
			})
			uni.uploadFile({
				url:http_root+'/UserAuth/register',//服务器地址
				filePath:this.tempFilePath,//文件地址
				name:'RLSJ',//服务器中文件对应的key值
				formData:params,//上传的额外参数
				success:({data})=>{
					uni.hideLoading()
					data = JSON.parse(data)
					this.handleSuccess(data)
				}
			})
		},
		handleSuccess(data){
			if (data.code == '0') {
				this.$emit('switchStatus', this.form.ZYSFLX);
				return;
			}
			if (data.code == '0000') {
				let resData = data.data;
				if (resData.state == '2') {
					// 激活成功
					uni.setStorageSync('state', resData.state);
					uni.setStorageSync('idType', this.form.ZYSFLX);
					uni.navigateBack();
				}
			} else {
				uni.showToast({
					title: data.code + ' : ' + data.msg,
					icon: 'none',
					duration: 3000
				});
			}
		},
		judgeAuthSetting() {
			uni.getSetting({
				success: info => {
					/*
						{"errMsg":"getSetting:ok","authSetting":{"scope.userInfo":true,"scope.record":true}}
					*/
					// 用于权限判断，在登录部分进行处理
					if (info.authSetting['scope.userInfo']) {
					} else {
					}
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import './idConfirm.scss';
.top-btn-g {
	font-size: 36upx;
	line-height: 48upx;
	font-weight: bold;
	padding: 30upx 0 0 30upx;
	vertical-align: middle;
	background-color: #ffffff;
}
.m-line .u-title {
	width: 25%;
}
.m-clause{
	text-align: center;
	padding: 30rpx 60rpx;
	font-size: 28rpx;
	.link{
		color: #5E5EFC;
	}
}
.u-line-tips{
	padding:0 40rpx;
	font-size: 28rpx;
	color: #646464;
}
</style>
