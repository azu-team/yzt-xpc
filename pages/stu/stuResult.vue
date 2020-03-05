<template>
	<view class="container">
		<view class="m-title">学习结果</view>
		<view class="m-content">
			<view class="u-list" v-for="(item,index) in dataArr" :key="index">
				<view class="u-list-title">{{item.className}}-{{item.result}}</view>
				<view class="u-list-desc">
					<view class="cell">授课老师:{{item.teacher}}</view>
					<view class="cell">完成评价:{{item.comment}}</view>
					<view class="cell">完成时间:{{item.lastTime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				dataArr:[
					{
						result:'通过',
						className:'语文',
						comment:'优秀',
						lastTime:'2020-02-26',
						teacher:'王某',
					},{
						result:'通过',
						className:'语文',
						comment:'良好',
						lastTime:'2020-02-26',
						teacher:'王某',
					},{
						result:'不通过',
						className:'语文',
						comment:'不通过',
						lastTime:'2020-02-26',
						teacher:'王某',
					}
				]
			}
		},
		onLoad(evt){
			
		},
		methods:{
			
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../assets/style/list.scss';
</style>