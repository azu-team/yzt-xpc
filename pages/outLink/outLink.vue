<template>
	<view class=""><web-view :src="src"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			src: ''
		};
	},
	onLoad(params) {
		this.src = params.type;
		// console.log(arguments,'arguments')
	},
	methods:{
		
	}
};
</script>

<style></style>
