<template>
	<view class="container">
		<view v-if="isHeadMaster">
			<head-master></head-master>
		</view>
		<view v-else>
			<person></person>
		</view>
	</view>
</template>
<script>
	import headMaster from './eduPlatformHeadMaster.vue'
	import person from './eduPlatformPerson.vue'
export default {
	components:{headMaster,person},
	data() {
		return {
			isHeadMaster:true,
		};
	},
	onLoad(){
		this.judgePerson()
	},
	mounted(){
	},
	methods: {
		judgePerson(){
			// this.$HTTP({
			// 	url:'',
			// 	params:{}
			// })
		}
	}
};
</script>
<style lang="scss" scoped>

</style>
