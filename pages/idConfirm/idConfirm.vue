<template>
	<view class="">
		<view  v-show="showSignIn">
			<sign-in @switchStatus="handleSignIn"></sign-in>
		</view>
		<view  v-show="!showSignIn">
			<sign-up @switchStatus="handleSignUp" :type="formType"></sign-up>
		</view>
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
			formType:'1'
		};
	},
	methods: {
		handleSignIn(formType){
			this.formType = formType;
			this.showSignIn = false;
		},
		handleSignUp(){
			this.showSignIn = true;
		}
	}
};
</script>
<style lang="scss" scoped></style>
