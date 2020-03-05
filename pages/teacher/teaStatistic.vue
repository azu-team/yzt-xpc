<template>
	<view class="container">
		<view class="m-title">授课情况</view>
		<view class="m-content">
			<view class="u-list" v-for="(item,index) in dataArr" :key="index">
				<view class="u-list-title">科目-{{item.className}}</view>
				<view class="u-list-desc">
					<view class="cell">学生数:{{item.stuNumber}}</view>
					<view class="cell">当前进度:{{item.progress}}</view>
					<view class="cell one_line">上一次上课时间:{{item.lastTime}}</view>
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
						className:'语文',
						stuNumber:'1000人',
						progress:'90%',
						lastTime:'2020-02-26',
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