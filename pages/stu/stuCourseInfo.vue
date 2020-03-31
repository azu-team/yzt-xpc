<template>
	<view class="container">
		<view class="m-top">
			<view class="top-content">
				<view class="title-1">{{dataObj.xxmc||'学校名称'}}</view>
				<view class="title-2">可 信 教 育 身 份 “一 证 通”</view>
				<image v-if="dataObj.tpUrl" class="img" :src="dataObj.tpUrl" mode=""></image>
				<image v-else class="img" src="../../static/mp-weixin/imgs/avatar.png" mode=""></image>
				<view class="name content-list"><text class="text">姓名:</text><text>{{dataObj.xm || '姓名'}}</text></view>
				<view class="content-list"><text class="text">性别:</text><text>{{dataObj.xb || '未知'}}</text></view>
				<view class="content-list"><text class="text">班级:</text><text>{{dataObj.bjmc}}</text></view>
				<view class="content-list"><text class="text">电话:</text><text>{{dataObj.dh}}</text></view>
				<view class="content-list"><text class="text">ESN号码:</text><text>{{dataObj.esn}}</text></view>
				<view class="content-list">查询时间：{{dataObj.cxsj}}</view>
				<view class="type">{{dataObj.zysflb || '学生卡'}}</view>
			</view>
		</view>
		<view class="m-list" v-for="(item,index) in listArr" :key="index">
			<view class="list-title">
				<image class="img" :src="item.imgUrl"  mode="" ></image>
				<text class="text">   {{ item.name }}</text>
			</view>
			<view class="list-content">
				<view class="content-list" v-for="(list, idx) in item.tjjh" :key="idx">
					<text class="text">{{ list.name }}:</text>
					<text>{{ list.value + list.unit}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				listArr:[],
				dataObj:{},
				userArr:[
					{
						name:'姓名',
						value:'',
						key:'xm',
					},{
						name:'性别',
						value:'',
						key:'xb',
					},{
						name:'班级名称',
						value:'',
						key:'bjmc',
					},{
						name:'学校名称',
						value:'',
						key:'xxmc',
					},{
						name:'esn号码',
						value:'',
						key:'esn',
					},{
						name:'电话',
						value:'',
						key:'dh',
					},{
						name:'查询时间',
						value:'',
						key:'cxsj',
					},
				],
				params:{
					lx:'',
					kssj:'',
					jssj:'',
					userid:'',
				}
			}
		},
		onLoad(params) {
			this.params = params
			this.getData()
		},
		methods:{
			getData(){
				this.$HTTP({
					url:'/studentDto/getYw',
					params:this.params,
					successCallback:({data})=>{
						if(data.code == 0){
							// let dataArr = data.data.splice(data.data.length - 1,1)
							// data.data.unshift(dataArr[0])
							// data.data.forEach(item=>{
							// 	if(typeObj[item.name]){
							// 		item.type = typeObj[item.name]
							// 	}
							// })
							// this.dataArr = data.data
							// if(data.data.user.tpUrl){
							// 	// base64格式图片
							// 	data.data.user.tpUrl = 'data:image/jpeg;base64,'+data.data.user.tpUrl
							// }
							this.dataObj = data.data.user
							// let userObj = data.data.user
							// this.userArr = this.userArr.map(item=>{
							// 	return{
							// 		...item,
							// 		value:userObj[item.key]
							// 	}
							// })
							this.listArr = data.data.list
						}else{
							uni.showToast({
								title:data.msg,
								icon:'none'
							})
						}
					},
					failCallback:(res)=>{
				
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		color: $uni-text-color;
		background: #f4f8ff;
		font-size: 28upx;
		padding-bottom: 60upx;
		height: 100vh;
		overflow: auto;
	}
	.m-top{
		padding: 20upx 40upx;
		.top-content{
			 font-size: 30upx;
			 background-color: #FFFFFF;
			 border-radius: 20upx;
			 border: solid 1upx #eee;
			 box-shadow: 0 5upx 5upx #dadada;
			 padding: 20upx 35upx;
			 // display: flex;
			 // align-items: center;
			 // flex-wrap: wrap;
			 position: relative;
			 .img{
				 width: 120rpx;
				 height: 144rpx;
				 position: absolute;
				 right: 50rpx;
				 top: 45rpx;
				 z-index: 10;
			 }
			 .title-1{
				 font-size: 32upx;
				 font-weight: bold;
				 color: #303030;
			 }
			 .title-2{
				 font-size: 30upx;
				 margin-top: 20upx;
				 margin-bottom: 10upx;
				 color: #2C2C2C;
			 }
			 .name.content-list{
				 width: 100%;
			 }
			 .content-list{
				 display: inline-block;
				 width: 40%;
				 margin-top: 10upx;
				 color: #5F5F5F;
				 font-size: 26upx;
			 }
			 .type{
				 display: inline-block;
				 width: 50%;
				 text-align: right;
				 color: #6380A4;
				 font-size: 28upx;
			 }
			 .text{
			 	color: #959595;
			 }
		}
	}
	.m-list{
		padding: 20upx;
		background-color: #FFFFFF;
		margin: 10upx;
		border: solid 1upx #eee;
		box-shadow: 0 3upx #eee;
		margin-bottom: 20upx;
		.list-title{
			font-size: 32upx;
			font-weight: bold;
			padding-bottom: 10upx;
			border-bottom: solid 2upx #eee;
			.img{
				width: 60upx;
				height: 60upx;
				vertical-align: middle;
				margin-right: 20upx;
			}
		}
		.list-content{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			border-radius: 10upx;
			.content-list{
				width: 50%;
				margin-top: 20upx;
				color: #5F5F5F;
				.text{
					color: #959595;
				}
			}
		}
	}
</style>
