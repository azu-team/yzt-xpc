<template>
	<view class="bg">
		<view class="container">
			<view class="top-btn-g">
				<view class="g-btn"  @tap="goSignUp">去认证</view>
			</view>
			<view class="m-line">
				<view class="u-title">
					<image class="icon" src="../../static/mp-weixin/id.png" mode="aspectFit"></image>
					身份证号
				</view>
				<view class="u-content"><input class="u-input" type="idcard" :value="form.id" placeholder="请输入身份证号" /></view>
			</view>
			<view class="m-line">
				<view class="u-title">
					<image class="icon" src="../../static/mp-weixin/name.png" mode="aspectFit"></image>
					姓名
				</view>
				<view class="u-content"><input class="u-input" type="text" :value="form.name" placeholder="请输入姓名" /></view>
			</view>
			<view class="m-line">
				<view class="u-title">
					<image class="icon" src="../../static/mp-weixin/type.png" mode="aspectFit"></image>
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
				<button class="u-btn" open-type="getUserInfo" @tap="handleConfirm"><text>登录</text></button>
			</view>
		</view>
	</view>
</template>
<script>
import mySelect from '../../components/xfl-select/xfl-select.vue';
export default {
	components: { mySelect },
	data() {
		return {
			form: {
				id: '',
				type: '2',
				name: ''
			},
			list: [
				//要展示的数据
				{
					value: '学生',
					id: '1',
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
		goSignUp(){
			this.$emit('switchStatus')
		},
		handleSelectChange({
			index,newVal,oldVal,orignItem
		}){
			this.form.type = orignItem.id
		},
		handleConfirm() {
			uni.getUserInfo({
				provider: 'weixin',
				success: res => {
					console.log(res, 'res');
					uni.setStorageSync('userInfo',res)
					uni.setStorageSync('idType',this.form.type)
					uni.navigateBack()
				},
				fail:() =>{
					uni.showToast({
						title:"请同意授权用户信息!",
						icon:'none'
					})
				}
			});
		},
		judgeAuthSetting(){
			uni.getSetting({
				success: info => {
					/*
						{"errMsg":"getSetting:ok","authSetting":{"scope.userInfo":true,"scope.record":true}}
					*/
				   // 用于权限判断，在登录部分进行处理
				   if(info.authSetting['scope.userInfo']){
					   
				   }else{
					   
				   }
				}
			});
		},
	}
};
</script>
<style lang="scss" scoped>
@import  './idConfirm.scss';
.top-btn-g{
	font-size: 36upx;
	line-height: 48upx;
	font-weight: bold;
	padding: 30upx 0 0 30upx;
	vertical-align: middle;
	background-color: #ffffff;
}
</style>
