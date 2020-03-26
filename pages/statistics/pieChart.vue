<template>
	<view class="qiun-charts" v-if="chartDataLength"><canvas :canvas-id="canvasId" :id="canvasId" class="charts" @touchstart="touchPie($event,canvasId)"></canvas></view>
</template>

<script>
import uCharts from '../../components/u-charts/u-charts.js';
var canvasObj = {};
export default {
	props:{
		canvasId:{
			type:String,
			require:true,
		},
		chartData:{
			type:Object,
			default(){
				return{}
			}
		}
	},
	computed:{
		chartDataLength(){
			if(Object.keys(this.chartData).length){
				this.showPie(this.canvasId,JSON.parse(JSON.stringify(this.chartData)))
			}
			return Object.keys(this.chartData).length
		}
	},
	data() {
		return {
			cWidth: uni.upx2px(750),
			cHeight: uni.upx2px(500),
			cWidth2: uni.upx2px(700), //横屏图表
			cHeight2: uni.upx2px(1100), //横屏图表
			cWidth3: uni.upx2px(250), //圆弧进度图
			cHeight3: uni.upx2px(250), //圆弧进度图
			arcbarWidth: uni.upx2px(24), //圆弧进度图，进度条宽度,此设置可使各端宽度一致
			gaugeWidth: uni.upx2px(30), //仪表盘宽度,此设置可使各端宽度一致
			tips: '',
			pixelRatio: 1,
			serverData: '',
			itemCount: 30, //x轴单屏数据密度
			sliderMax: 50
		};
	},
	mounted() {
		// let data = {
		// 	series: [{ name: '一班一班一班一班一班一班一班', data: 50 }, { name: '二班', data: 30 }, { name: '三班', data: 20 }, { name: '四班', data: 18 }, { name: '五班', data: 8 }]
		// }
		// this.showPie(this.canvasId, data);
	},
	methods: {
		showPie(canvasId, chartData) {
			canvasObj[canvasId] = new uCharts({
				$this: this,
				canvasId: canvasId,
				type: 'pie',
				fontSize: 11,
				padding: [15, 15, 0, 15],
				legend: {
					show: true,
					padding: 5,
					lineHeight: 11,
					margin: 0
				},
				background: '#FFFFFF',
				pixelRatio: this.pixelRatio,
				series: chartData.series,
				animation: true,
				width: this.cWidth * this.pixelRatio,
				height: this.cHeight * this.pixelRatio,
				dataLabel: true,
				extra: {
					pie: {
						lableWidth: 15
					}
				}
			});
		},
		touchPie(e, id) {
			canvasObj[id].showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.qiun-padding{padding:2%; width:96%;}
	.qiun-wrap{display:flex; flex-wrap:wrap;}
	.qiun-rows{display:flex; flex-direction:row !important;}
	.qiun-columns{display:flex; flex-direction:column !important;}
	.qiun-common-mt{margin-top:10upx;}
	.qiun-bg-white{background:#FFFFFF;}
	.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
	.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
	/* 通用样式 */
	.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
	.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
</style>
