<template>
	<view class="m-content">
		<view class="u-list" v-for="(item, index) in dataArr" :key="index">
			<view class="u-list-title" @tap="handleCollapse(item, index)">
				{{ item.title }}
				<view  :class="{ 'u-dot': true, active: item.isActive }"></view>
			</view>
			<view :class="{ 'u-list-desc': true, active: item.isActive }">
				<view class="cell" v-for="(params, idx) in paramsArr" :key="idx">
					<text>{{ params.name }}</text>
					: {{ item[params.key] }}
				</view>
				<view class="cell">
					<text>语音信息</text>:
					<text v-if="item.field05" class="audio" @tap="handleDownload(item)">{{item.isPlaying?'音频文件播放中':'播放'}}</text>
					<text v-else>暂无</text>
				</view>
			</view>
		</view>
		<view class="" v-if="!dataArr.length">
			<view class="m-tips">暂无填报数据</view>
		</view>
	</view>
</template>

<script>
import {http_root} from '../../utils/config.js'
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;
export default {
	data() {
		return {
			paramsArr: [
				{
					name: '填报位置',
					key: 'field02'
				},
				{
					name: '是否需要援助',
					key: 'field03'
				},
				{
					name: '是否受伤',
					key: 'field04'
				},
				{
					name: '求助具体要求',
					key: 'field06'
				}
			],
			dataArr: []
		};
	},
	mounted(){
		this.getData()
	},
	methods: {
		audioPlay(path,item){
			item.isPlaying = true;
			innerAudioContext.src = path;
			innerAudioContext.play();
			innerAudioContext.onEnded(()=>{
				item.isPlaying = false
			})
		},
		handleDownload(item){
			if(item.isPlaying) return;
			if(item.filePath){
				this.audioPlay(item.filePath,item)
			}else{
				uni.showLoading({
					title:'下载附件中...'
				})
				let fileName = new Date().valueOf();
				let fileType = item.field05.substring(item.field05.length - 3)
				uni.downloadFile({
					url:item.field05,
					filePath:wx.env.USER_DATA_PATH + '/' + fileName + '.'+ fileType,
					success:(res)=>{
						uni.hideLoading()
						console.log(item,'item')
						item.filePath = res.filePath;
						this.audioPlay(res.filePath,item)
					},
					fail:()=> {
						uni.hideLoading()
						uni.showToast({
							title:'下载失败',
							icon:'none'
						})
					}
				})
			}
			
		},
		handleCollapse(item, index) {
			this.$set(item, 'isActive', !item.isActive);
		},
		getData(){
			this.$HTTP({
				url:'/getHelp/list',
				showLoading:false,
				params:{
					"field01":uni.getStorageSync('userId'),
					"pageNum":"",
					"pageSize":""
				},
				successCallback:({data})=>{
					if(data.code == 0){
						let arr = data.data.list.map(item=>{
							return{
								...item,
								isPlaying:false,
								title:item.addTime
							}
						})
						this.dataArr = arr
					}else{
						uni.showToast({
							title:data.msg,
							icon:'none'
						})
					}
				}
			})
		},
	}
};
</script>

<style lang="scss" scoped>
@import '../../assets/style/list.scss';
.m-content .u-list .u-list-desc .cell{
	display: inline-block;
	width: 95%;
	margin: 20upx 0 0 40upx;
}
.m-content{
	height: auto;
}
.m-content .u-list .u-list-desc.active{
	max-height: 100vh;
}
.audio{
	color: #007aff;
}
</style>
