<template>
	<view class="bg">
		<view class="container">
			<!-- <view class="top-btn-g">
				<view class="g-btn"  @tap="goSignUp">去认证</view>
			</view> -->
			<view class="m-line">
				<view class="u-title">
					<!-- <image class="icon" src="../../static/mp-weixin/id.png" mode="aspectFit"></image> -->
					身份证号
				</view>
				<view class="u-content"><input class="u-input" type="idcard" v-model="form.SFZH" placeholder="请输入身份证号" /></view>
			</view>
			<view class="m-line">
				<view class="u-title">
					<!-- <image class="icon" src="../../static/mp-weixin/name.png" mode="aspectFit"></image> -->
					姓名
				</view>
				<view class="u-content"><input class="u-input" type="text" v-model="form.XM" placeholder="请输入姓名" /></view>
			</view>
			<view class="m-line">
				<view class="u-title">
					<!-- <image class="icon" src="../../static/mp-weixin/name.png" mode="aspectFit"></image> -->
					ESN账号
				</view>
				<view class="u-content"><input class="u-input" type="text" v-model="form.ESN" placeholder="没有ESN账号则不填" /></view>
			</view>
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
						initValue="学生"
						@change="handleSelectChange"
					></my-select>
				</view>
			</view>
			<view class="m-bottom">
				<button class="u-btn" open-type="getUserInfo" @tap="handleConfirm">
					<text>下一步{{form.ESN?'(人脸识别)':''}}</text></button>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<!-- <camera device-position="front" flash="off" binderror="error" style="width: 100%; height: 300px;"></camera> -->
			<!-- #endif -->
		</view>
	</view>
</template>
<script>
import mySelect from '../../components/xfl-select/xfl-select.vue';
export default {
	components: { mySelect },
	data() {
		return {
			tempFilePath:'',//上传图片地址
			form: {
				SFZH: '',
				ZYSFLX: '2',
				XM: '',
				ESN: '',
				RLSJ:'',
				
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
					value: '老师',
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
			if(!this.form.ESN){
				// 如果esn为空，表示注册用户
				this.sendData()
				return
			}
			// this.$emit('switchStatus', this.form.type);
			// return;
			// #ifdef MP-WEIXIN
			uni.chooseImage({
				count:1,
			    success: ({tempFilePaths,tempFiles}) => {
				  // 图片大小小于40k
				  if(tempFiles[0].size < 40 * 1024 ){
					  this.tempFilePath = tempFilePaths[0]
					  uni.getFileSystemManager().readFile({
						  filePath:tempFilePaths[0],
						  encoding:'base64',
						  success:res=>{
							  this.form.RLSJ = 'data:image/jpeg;base64,'+ res.data
							  this.sendData();
						  }
					  })
				  }else{
					  uni.showToast({
					  	title:'文件大小要小于40k',
						icon:'none',
						duration:3000
					  })
				  }
			  }
			})
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
		sendData(){
			uni.showLoading({
				title: '正在验证...',
				mask: true
			});
			// 判断用户state，决定下一步是填写基本资料还是返回到首页切换身份
			this.$HTTP({
				url: '/UserAuth/register',
				params: {
					...this.form,
					USERID:uni.getStorageSync('userId')
				},
				successCallback:({data})=>{
					uni.hideLoading()
					if(data.code=='0'){
						this.$emit('switchStatus', this.form.ZYSFLX)
						return;
					}
					if(data.code == '0000'){
						let resData = data.data
						// uni.setStorageSync('userId', resData.userId);
						if(resData.state == '0'){
							// 激活成功
							uni.setStorageSync('userInfo', resData);
							uni.setStorageSync('idType', resData.zysflb);
							uni.navigateBack()
						}
					}else{
						uni.showToast({
							title:data.code + ' : ' + data.msg,
							icon:'none',
							duration:3000
						})
					}
				}
			});
			
			// 如果需要填写基本资料进行认证
			// this.$emit('switchStatus', this.form.type);
			
			// uni.getUserInfo({
			// 	provider: 'weixin',
			// 	success: res => {
			// 		this.handleLogin(res);
			// 	},
			// 	fail:() =>{
			// 		uni.showToast({
			// 			title:"请同意授权用户信息!",
			// 			icon:'none'
			// 		})
			// 	}
			// });
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
		},
		register: function() {
			const ctx = uni.createCameraContext(); //创建相机上下文
			// uni.getFileSystemManager().readFile({
			// 	filePath: tempFilePaths[0],
			// 	encoding: 'base64',
			// 	success: res => {
			// 		this[formName][keyName] = 'data:image/jpeg;base64,' + res.data;
			// 	}
			// });
			ctx.takePhoto({
				quality: 'high', //获取原图
				success: res => {
					
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
</style>
