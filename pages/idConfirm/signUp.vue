<template>
	<view class="bg">
		<view class="container">
			<view class="title">
				 填报信息
				<view class="u-tips"  @tap="handleBack">上一步</view>
			</view>
			<view v-if="form.type <= 2">
				<view class="m-line">
					<view class="u-title">学籍号</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.XJH" placeholder="请输入学籍号" /></view>
				</view>
				<view class="m-line">
					<view class="u-title">姓名</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.XM" placeholder="请输入姓名" /></view>
				</view>
				<view class="m-line">
					<view class="u-title">出生日期</view>
					<view class="u-content">
						<!-- <input class="u-input" type="text" v-model="form.CSRQ" placeholder="例如19790307" /> -->
						<text @tap="showChoose('form','CSRQ')">{{form.CSRQ || '选择日期'}}</text>
						</view>
				</view>
				<view class="m-line">
					<view class="u-title">性别</view>
					<view class="u-content">
						<my-select
							:list="sexList"
							:clearable="false"
							:showItemNum="5"
							:listShow="false"
							:isCanInput="false"
							:style_Container="'height: 2em; font-size: 28upx;'"
							:placeholder="'选择性别'"
							:selectHideType="'hideAll'"
							:initValue="sexList[0].value"
							@change="handleSelectChange($event, 'XB')"
						></my-select>
					</view>
				</view>
				<view class="m-line">
					<view class="u-title">身份证件类型</view>
					<view class="u-content">
						<my-select
							:list="idCardTypeList"
							:clearable="false"
							:showItemNum="10"
							:listShow="false"
							:isCanInput="false"
							:style_Container="'height: 2em; font-size: 28upx;'"
							:placeholder="'选择身份证件类型'"
							:selectHideType="'hideAll'"
							:initValue="idCardTypeList[0].value"
							@change="handleSelectChange($event, 'SFZJLX')"
						></my-select>
					</view>
				</view>
				<view class="m-line">
					<view class="u-title">身份证件号码</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.SFZJHM" placeholder="请输入身份证件号码" /></view>
				</view>
				<view class="m-line">
					<view class="u-title">学校名称/教育机构名称</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.XXMZ" placeholder="学校名称/教育机构名称" /></view>
				</view>
				<view class="m-line">
					<view class="u-title">班级</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.BJ" placeholder="至少两位例如02" /></view>
				</view>
				<view class="m-line">
					<view class="u-title">数字相片</view>
					<view class="u-content">
						<image @tap="handleChooseImg('form','SZXP')" v-if="form.SZXP" class="img" :src="form.SZXP" mode="aspectFit"></image>
						<view v-else><view class="u-tips" @tap="handleChooseImg('form','SZXP')">选择图片</view></view>
					</view>
				</view>
				<view class="m-line">
					<view class="u-title">手机号</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.XXSJ" placeholder="请输入手机号" /></view>
				</view>
				<view class="m-line">
					<view class="u-title">监护人姓名</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.JHRXM" placeholder="汉字姓名" /></view>
				</view>
				<view class="m-line">
					<view class="u-title">监护人身份证件类型编码</view>
					<view class="u-content">
						<my-select
							:list="idCardTypeList"
							:clearable="false"
							:showItemNum="10"
							:listShow="false"
							:isCanInput="false"
							:style_Container="'height: 2em; font-size: 28upx;'"
							:placeholder="'18岁以下必填'"
							:selectHideType="'hideAll'"
							@change="handleSelectChange($event, 'JHRZJLX')"
						></my-select>
					</view>
				</view>
				<view class="m-line">
					<view class="u-title">监护人身份证件号</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.JHRSFZJH" placeholder="18岁以下必填" /></view>
				</view>
				<view class="m-line">
					<view class="u-title">与申请人关系</view>
					<view class="u-content">
						<my-select
							:list="relationList"
							:clearable="false"
							:showItemNum="8"
							:listShow="false"
							:isCanInput="false"
							:style_Container="'height: 2em; font-size: 28upx;'"
							:placeholder="'18岁以下必填'"
							:selectHideType="'hideAll'"
							@change="handleSelectChange($event, 'JHRZJLX')"
						></my-select>
					</view>
				</view>
				<view class="m-line">
					<view class="u-title">监护人手机</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.JHRSJ" placeholder="18岁以下可选" /></view>
				</view>
				<view class="m-line">
					<view class="u-title">确认人员ESN</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.QRRYESN" placeholder="班主任ESN" /></view>
				</view>
				<view class="m-line">
					<view class="u-title">签名证书</view>
					<view class="u-content"><input class="u-input" type="text" v-model="form.QMZS" placeholder="请输入班主任的签名证书" /></view>
				</view>
				<view class="m-line">
					<view class="u-title">确认时间</view>
					<view class="u-content">
						<text @tap="showChoose('form','QRSJ')">{{form.QRSJ || '选择日期'}}</text>
						<!-- <input class="u-input" type="text" v-model="form.QRSJ" placeholder="YYYYMMDDHHMISS" /> -->
						</view>
				</view>
			</view>
			<view  v-else-if="form.type == 3">
				<view class="m-line">
				    <view class="u-title">教育身份类别</view>
				    <view class="u-content">
						<my-select
						    :list="jsTypeList"
						    :clearable="false"
						    :showItemNum="10"
						    :listShow="false"
						    :isCanInput="false"
						    :style_Container="'height: 2em; font-size: 28upx;'"
						    :placeholder="'选择身份证件类型'"
						    :selectHideType="'hideAll'"
						    :initValue="jsTypeList[0].value"
						    @change="handleSelectChange($event, 'ZYSFLB','jsForm')"
						></my-select>
					</view>
				</view>
				<view class="m-line">
				    <view class="u-title">姓名</view>
				    <view class="u-content"><input class="u-input" type="text" v-model="jsForm.XM" placeholder="请输入姓名" /></view>
				</view>
				<view class="m-line">
				    <view class="u-title">出生日期</view>
				    <view class="u-content">
						<text @tap="showChoose('jsForm','CSRQ')">{{jsForm.CSRQ || '选择日期'}}</text>
						<!-- <input class="u-input" type="text" v-model="jsForm.CSRQ" placeholder="例如19790307" /> -->
						</view>
				</view>
				<view class="m-line">
				    <view class="u-title">性别</view>
				    <view class="u-content">
				        <my-select
				            :list="sexList"
				            :clearable="false"
				            :showItemNum="5"
				            :listShow="false"
				            :isCanInput="false"
				            :style_Container="'height: 2em; font-size: 28upx;'"
				            :placeholder="'选择性别'"
				            :selectHideType="'hideAll'"
				            :initValue="sexList[0].value"
				            @change="handleSelectChange($event, 'XB')"
				        ></my-select>
				    </view>
				</view>
				<view class="m-line">
				    <view class="u-title">身份证件类型</view>
				    <view class="u-content">
				        <my-select
				            :list="idCardTypeList"
				            :clearable="false"
				            :showItemNum="10"
				            :listShow="false"
				            :isCanInput="false"
				            :style_Container="'height: 2em; font-size: 28upx;'"
				            :placeholder="'选择身份证件类型'"
				            :selectHideType="'hideAll'"
				            :initValue="idCardTypeList[0].value"
				            @change="handleSelectChange($event, 'SFZJLX')"
				        ></my-select>
				    </view>
				</view>
				<view class="m-line">
				    <view class="u-title">身份证件号码</view>
				    <view class="u-content"><input class="u-input" type="text" v-model="jsForm.SFZJHM" placeholder="请输入身份证件号码" /></view>
				</view>
				<view class="m-line">
				    <view class="u-title">学校名称/教育机构名称</view>
				    <view class="u-content"><input class="u-input" type="text" v-model="jsForm.XXMZ" placeholder="学校名称/教育机构名称" /></view>
				</view>
				 <view class="m-line">
				    <view class="u-title">数字相片</view>
				    <view class="u-content">
				        <image @tap="handleChooseImg('jsForm','SZXP')" v-if="jsForm.SZXP" class="img" :src="jsForm.SZXP" mode="aspectFit"></image>
				        <view v-else><view class="u-tips" @tap="handleChooseImg('jsForm','SZXP')">选择图片</view></view>
				    </view>
				</view>
				<view class="m-line">
				    <view class="u-title">手机号</view>
				    <view class="u-content"><input class="u-input" type="text" v-model="jsForm.XXSJ" placeholder="请输入手机号" /></view>
				</view>
				<view class="m-line">
				    <view class="u-title">确认人员ESN</view>
				    <view class="u-content"><input class="u-input" type="text" v-model="jsForm.QRRYESN" placeholder="班主任ESN" /></view>
				</view>
				<view class="m-line">
				    <view class="u-title">签名证书</view>
				    <view class="u-content"><input class="u-input" type="text" v-model="jsForm.QMZS" placeholder="请输入班主任的签名证书" /></view>
				</view>
				<view class="m-line">
				    <view class="u-title">确认时间</view>
				    <view class="u-content">
						<text @tap="showChoose('jsForm','QRSJ')">{{jsForm.QRSJ || '选择日期'}}</text>
						<!-- <input class="u-input" type="text" v-model="jsForm.QRSJ" placeholder="YYYYMMDDHHMISS" /> -->
						</view>
				</view>
			</view>
			<view  v-else-if="form.type == 4">
				<view class="m-line">
				    <view class="u-title">教育身份号</view>
				    <view class="u-content"><input class="u-input" type="text" v-model="eduForm.ESN" placeholder="请输入教育身份号" /></view>
				</view>
				<view class="m-line">
				    <view class="u-title">教育身份类型</view>
				    <view class="u-content">
						<my-select
						    :list="eduTypeList"
						    :clearable="false"
						    :showItemNum="10"
						    :listShow="false"
						    :isCanInput="false"
						    :style_Container="'height: 2em; font-size: 28upx;'"
						    :placeholder="'选择身份证件类型'"
						    :selectHideType="'hideAll'"
						    :initValue="eduTypeList[0].value"
						    @change="handleSelectChange($event, 'ZYSFLX','eduForm')"
						></my-select>
					</view>
				</view>
				<view class="m-line">
				    <view class="u-title">人脸数据</view>
				    <view class="u-content">
				        <image @tap="handleChooseImg('eduForm','RLSJ')" v-if="eduForm.RLSJ" class="img" :src="eduForm.RLSJ" mode="aspectFit"></image>
				        <view v-else><view class="u-tips" @tap="handleChooseImg('eduForm','RLSJ')">选择图片</view></view>
				    </view>
				</view>
				<view class="m-line">
				    <view class="u-title">PIN码</view>
				    <view class="u-content"><input class="u-input" type="text" v-model="eduForm.PIN" placeholder="请输入PIN码" /></view>
				</view>
			</view>

			<view class="m-bottom">
				<button class="u-btn"  @tap="handleConfirm" ><text>认证</text></button>
			</view>
			<link-area
				mode="date"
				startYear="1970" 
				endYear="2030"
				:current="true" 
				:disabledAfter="false"
				@confirm="handleChoose"
				@cancel="handleCancelChoose"
				ref="linkage"
				themeColor="#25a5ff"></link-area>
		</view>
	</view>
</template>
<script>
import mySelect from '../../components/xfl-select/xfl-select.vue';
import { typeList, relationList, idTypeList, sexList ,eduTypeList,	jsTypeList} from '../../utils/selectLists.js';
import {http_root} from '../../utils/config.js'
export default {
	components: { mySelect },
	props:{
		type:[String,Number],
	},
	data() {
		return {
			tempFilePath:'',//临时附件路径
			formStatus: '1', //表填填写的进度，1 为 身份选择  2 为信息录入 作废
			form: {
				//学生表单数据
				type: this.type,
				XJH: '', //学籍号
				XM: '', //姓名
				CSRQ: '', //出生日期
				XB: sexList[0].id, //性别
				SFZJLX: idTypeList[0].id, //身份证件类型编码
				SFZJHM: '', //身份证件号码
				XXMZ: '', //学校名称/教育机构名称
				BJ: '', //班级
				SZXP: '', //数字相片
				XXSJ: '', //手机号
				JHRXM: '', //监护人姓名
				JHRZJLX: '', //监护人身份证件类型编码
				JHRSFZJH: '', //监护人身份证件号
				YSQRGX: '', //与申请人关系编码
				JHRSJ: '', //监护人手机
				QRRYESN: '', //确认人员ESN
				QMZS: '', //签名证书
				QRSJ: '' //确认时间
			},
			jsForm: {
				ZYSFLB: jsTypeList[0].id, //教育身份类别
				XM: '', //姓名
				CSRQ: '', //出生日期
				XB: sexList[0].id, //性别编码
				SFZJLX: idTypeList[0].id, //身份证件类型
				SFZJHM: '', //身份证件号码
				XXMZ: '', //学校名称/教育机构名称
				SZXP: '', //数字相片
				XXSJ: '', //手机
				QRRYESN: '', //确认人员ESN
				QMZS: '', //签名证书
				QRSJ: '' //确认时间
			},
			eduForm: {
				ESN: '', //教育身份号
				ZYSFLX: eduTypeList[0].id, //教育身份类型
				RLSJ: '', //人脸数据
				PIN: '' //PIN码
			},
			sexList: sexList,
			idCardTypeList: idTypeList,
			eduTypeList:eduTypeList,
			jsTypeList:jsTypeList,
			relationList: relationList,
			typeList: typeList,
			timeFormName:'',
			timeFormKey:'',
		};
	},
	mounted(){
		this.queryUserInfo()
	},
	methods: {
		queryUserInfo(){
			let url = '',formName = ''
			if(this.type <= 2){
				url = '/api/tour/esnAuthStudent/list'
				formName = 'form'
			}else if(this.type == 3){
				url = '/api/tour/esnAuthTeacher/list'
				formName = 'jsForm'
			}else if(this.type == 4){
				url = '/api/tour/esnForSchool/list'
				formName = 'eduForm'
			}
			this.$HTTP({
				url,
				params:{
					"pageNum": "",
					"pageSize": "",
					"userid": uni.getStorageSync('userId')
				},
				successCallback:res=>{
					console.log(res,'res')
				}
			})
		},
		// 查询数据，将已有数据进行填充
		queryInfo(){
			 this.$HTTP({
				 url:'',
				 params:{
					 
				 },
				 successCallback:({data})=>{
					 
				 }
			 })
		},
		handleCancelChoose(){
			this.$refs.linkage.hide()
		},
		showChoose(timeFormName,timeFormKey){
			this.timeFormName = timeFormName
			this.timeFormKey = timeFormKey
			this.$refs.linkage.show()
		},
		handleChoose({checkArr,checkValue,defaultVal,result}){
			this.$refs.linkage.hide()
			// this.region = result
			// this.form.field02 = result
			this[this.timeFormName][this.timeFormKey] = checkArr[0].join('')
		},
		handleChooseImg(formName,keyName){
			uni.chooseImage({
				count:1,
			  success: ({tempFilePaths,tempFiles}) => {
				  // 图片大小小于40k TODO 图片大小不做处理，直接上传到服务器
				  if(tempFiles[0].size < 40 * 1024 ){
					  this.tempFilePath = tempFilePaths[0]
					  this[formName][keyName] = tempFilePaths[0]
					  return
					  uni.getFileSystemManager().readFile({
						  filePath:tempFilePaths[0],
						  encoding:'base64',
						  success:res=>{
							  this[formName][keyName] = 'data:image/jpeg;base64,'+ res.data
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
		},
		handleBack() {
			this.$emit('switchStatus')
		},
		next() {
			uni.setStorageSync('idType', 1);
		},
		handleSelectChange({ index, newVal, oldVal, orignItem }, formType,formName) {
			if(formName){
				this[formName][formType] = orignItem.id
				return;
			}
			this.form[formType] = orignItem.id;
		},
		saveInfo(wxUserInfo){
			// 根据角色设置请求参数
			let params = {}
			if(this.form.type <=2){
				params = {...this.form}
				delete params.type
			}else if(this.form.type == 3){
				params = {
					...this.jsForm
				}
			}else if(this.form.type == 4){
				params = {
					...this.eduForm
				}
			}
			let fileParams = {
					...params,
					USERID:uni.getStorageSync('userId')
				}
			// delete fileParams.SZXP
			// console.log(fileParams,'file')
			// uni.uploadFile({
			// 	url:http_root+'/UserAuth/createEsn',//服务器地址
			// 	filePath:this.tempFilePath,//文件地址
			// 	name:'SZXP',//服务器中文件对应的key值
			// 	formData:fileParams,//上传的额外参数
			// 	success:(res)=>{
			// 		console.log(res,'上传成功')
			// 	}
			// })
			this.$HTTP({
				url:'/UserAuth/createEsn',
				params:fileParams,
				successCallback:({data})=>{
					if(data.code == '0'){
						// 接口响应成功
						// esn 认证成功返回的esn号码
						// uni.setStorageSync('userInfo', wxUserInfo);
						uni.setStorageSync('idType', this.form.type);
						uni.showToast({
							title:'认证成功',
							mask:true,
							duration:1500
						})
						setTimeout(()=>{
							uni.navigateBack();
						},1500)
					}else{
						uni.showToast({
							title: `${data.code}:${data.msg}`,
							icon:'none',
							duration:3000
						})
					}
				},
				completeCallback:()=>{
					// uni.hideLoading()
				}
			})
		},
		handleConfirm() {
			if(this.form.type <= 2){
				// 学生权限，需要添加默认参数 1 学生 20 家长
				this.form.ZYSFLB = this.form.type == 1? "1" : "20"
			}else if(this.form.type == 4){
				this.eduForm.ZYSFLB = "21"
			}
			// uni.showLoading({
			// 	title:'正在认证...'
			// })
			this.saveInfo();
			// uni.getUserInfo({
			// 	provider: 'weixin',
			// 	success: res => {
			// 		// 获取微信授权信息之后进行接口请求
			// 	},
			// 	fail: () => {
			// 		uni.showToast({
			// 			title: '请同意授权用户信息!',
			// 			icon: 'none'
			// 		});
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
		}
	}
};
</script>
<style lang="scss" scoped>
@import  './idConfirm.scss';
</style>
