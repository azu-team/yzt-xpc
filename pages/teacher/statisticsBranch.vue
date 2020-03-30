<template>
	<view class="">
		统计分支
	</view>
</template>

<script>
	export default{
		data(){
			return{
				params:{
					userid:'',
					kssj:'',
					jssj:'',
					url:'',
					title:'',
				},
				page:{
					current:1,
					limit:10,
					total:0,
				}
			}
		},
		onLoad(params) {
			console.log(params)
			uni.setNavigationBarTitle({
				title:params.title
			})
			this.getData();
		},
		methods:{
			getData(){
				
			},
		},
		
	}
</script>

<style lang="scss" scoped>
	
</style>
