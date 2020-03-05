<template>
	<view class="container">
		<view class="m-title">个人基本信息</view>
		<view class="m-content">
			<view class="m-line" v-for="(item,index) in infoArr" :key="index">
				<view class="u-left">{{item.name}}</view>
				<view class="u-right">{{item.value}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				infoArr:[
					{
						name:'姓名',
						value:'某某人'
					},
					{
						name:'民族',
						value:'汉'
					},
					{
						name:'出生年月',
						value:'1990-10'
					},
					{
						name:'政治面貌',
						value:'群众'
					},
					{
						name:'联系电话',
						value:'15115155151'
					},
					{
						name:'身份证号',
						value:'320321199010150125'
					},
					{
						name:'户口类型',
						value:'农村'
					},
					{
						name:'账号类型',
						value:'学生'
					},
					{
						name:'籍贯',
						value:'湖北武汉'
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.m-title {
		font-size: 36upx;
		line-height: 48upx;
		font-weight: bold;
		margin: 30upx 0;
		padding-left: 40upx;
	}
	.m-title::before {
		content: '';
		display: inline-block;
		width: 20upx;
		height: 36upx;
		vertical-align: middle;
		background: #ffe16f;
		margin-right: 20upx;
		border-radius: 10upx;
	}
	.m-content{
		padding: 30upx 40upx;
		.m-line{
			margin-top: 20upx;
			padding: 10upx 0;
			border-bottom: solid 1upx #eee;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.u-left{
				width: 150upx;
				text-align-last: justify;
				color: #6a6a6a;
				font-size: $uni-font-size-lg;
				margin-right: 40upx;
			}
			.u-right{
				color: #a7a7a7;
				font-size: $uni-font-size-lg;
			}
		}
	}
</style>
