<template>
	<view  v-if="showSignIn">
		<sign-in @switchStatus="handleSignIn"></sign-in>
	</view>
	<view  v-else>
		<sign-up @switchStatus="handleSignUp"></sign-up>
	</view>
</template>
<script>
import signIn from './signIn.vue'
import signUp from './signUp.vue'
export default {
	components: {signIn,signUp},
	data() {
		return {
			showSignIn:true,
		};
	},
	methods: {
		handleSignIn(){
			this.showSignIn = false;
		},
		handleSignUp(){
			this.showSignIn = true;
		}
	}
};
</script>
<style lang="scss" scoped></style>
