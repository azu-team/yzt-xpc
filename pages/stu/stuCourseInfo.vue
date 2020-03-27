<template>
	<view class="container">
		<view class="m-top">
			<view class="top-content">
				<view class="content-list">
					<text class="text">姓名:</text><text>123</text>
				</view>
				<view class="content-list">
					<text class="text">性别:</text><text>2222</text>
				</view>
				<view class="content-list">
					<text class="text">学校:</text><text>2222</text>
				</view>
				<view class="content-list">
					<text class="text">班级:</text><text>2222</text>
				</view>
				<view class="content-list">
					<text class="text">联系方式:</text><text>222</text>
				</view>
				<view class="content-list">
					<text class="text">查询时间:</text><text>22222</text>
				</view>
			</view>
		</view>
		<view class="m-list">
			<view class="list-title">
				<image class="img" src="../../static/mp-weixin/dingding.png" mode=""></image>
				<text class="text">   智慧职校</text>
			</view>
			<view class="list-content">
				<view class="content-list">
					<text class="text">学习科目:</text>
					<text>123</text>
				</view>
				<view class="content-list">
					<text class="text">课堂互动次数:</text>
					<text>123</text>
				</view>
				<view class="content-list">
					<text class="text">作业提交次数:</text>
					<text>123</text>
				</view>
				<view class="content-list">
					<text class="text">未作业提交次数:</text>
					<text>123</text>
				</view>
				<view class="content-list">
					<text class="text">吃到次数:</text>
					<text>123</text>
				</view>
				<view class="content-list">
					<text class="text">课前预习次数:</text>
					<text>123</text>
				</view>
				<view class="content-list">
					<text class="text">老师表扬次数:</text>
					<text>123</text>
				</view>
				<view class="content-list">
					<text class="text">老师提醒次数:</text>
					<text>123</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad(params) {
			console.log(params)
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		color: $uni-text-color;
		background: #f4f8ff;
		font-size: 28upx;
		padding-bottom: 40upx;
	}
	.m-top{
		padding: 20upx 80upx;
		.top-content{
			 font-size: 30upx;
			 background-color: #FFFFFF;
			 border-radius: 20upx;
			 border: solid 1upx #eee;
			 box-shadow: 0 5upx 5upx #dadada;
			 padding: 10upx 20upx;
			 display: flex;
			 align-items: center;
			 flex-wrap: wrap;
			 .content-list{
				 width: 50%;
				 margin-top: 15upx;
				 color: #5F5F5F;
				 .text{
				 	color: #959595;
				 }
			 }
		}
	}
	.m-list{
		padding: 20upx;
		background-color: #FFFFFF;
		margin: 10upx;
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
