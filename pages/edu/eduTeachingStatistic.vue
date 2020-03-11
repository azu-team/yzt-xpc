<template>
	<view class="qiun-columns">
		<view class="qiun-padding" style="font-size: 32upx;">
			<text>{{ tips }}</text>
		</view>
		<view class="qiun-title-bar" style="background-color: #fff;"><view class="qiun-title-dot-light">柱状图</view></view>
		<view class="qiun-charts" style="background-color: #fff;">
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchIt($event, 'canvasColumn')"></canvas>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt"><view class="qiun-title-dot-light">温度计式图表</view></view>
		<view class="qiun-charts"><canvas canvas-id="canvasColumnMeter" id="canvasColumnMeter" class="charts" @touchstart="touchIt($event, 'canvasColumnMeter')"></canvas></view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt"><view class="qiun-title-dot-light">饼状图</view></view>
		<view class="qiun-charts"><canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie($event, 'canvasPie')"></canvas></view>
	</view>
</template>

<script>
import uCharts from '../../components/u-charts/u-charts.js';
var _self;
var canvasObj = {};

export default {
	data() {
		return {
			cWidth: '',
			cHeight: '',
			cWidth2: '', //横屏图表
			cHeight2: '', //横屏图表
			cWidth3: '', //圆弧进度图
			cHeight3: '', //圆弧进度图
			arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
			gaugeWidth: '', //仪表盘宽度,此设置可使各端宽度一致
			tips: '',
			pixelRatio: 1,
			serverData: '',
			itemCount: 30, //x轴单屏数据密度
			sliderMax: 50
		};
	},
	onLoad() {
		_self = this;
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.cWidth2 = uni.upx2px(700);
		this.cHeight2 = uni.upx2px(1100);
		this.cWidth3 = uni.upx2px(250);
		this.cHeight3 = uni.upx2px(250);
		this.arcbarWidth = uni.upx2px(24);
		this.gaugeWidth = uni.upx2px(30);
	},
	mounted() {
		this.getServerData();
	},
	methods: {
		getServerData() {
			let dataObj = {
				Column: {
					categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
					series: [
						{ name: '成交量1', data: [15, { value: 20, color: '#f04864' }, 45, 37, 43, 34] },
						{ name: '成交量2', data: [30, { value: 40, color: '#facc14' }, 25, 14, 34, 18] }
					]
				},
				ColumnMeter: {
					categories: ['2013', '2014', '2015', '2016', '2017', '2018'],
					series: [{ name: '目标值', data: [35, 36, 31, 33, 13, 34], color: '#2fc25b' }, { name: '完成量', data: [18, 27, 21, 24, 6, 28], color: '#1890ff' }]
				},
				Pie: { series: [{ name: '一班', data: 50 }, { name: '二班', data: 30 }, { name: '三班', data: 20 }, { name: '四班', data: 18 }, { name: '五班', data: 8 }] },
				tips:''
			};
			// uni.showLoading({
			// 	title: '正在加载数据...'
			// });
			// setTimeout(()=>{
				_self.fillData(dataObj);
			// },1000)
			// uni.request({
			// 	url: 'https://unidemo.dcloud.net.cn/hello-uniapp-ucharts-data.json',
			// 	data: {},
			// 	success: function(res) {
			// 		console.log('res.data',res.data)
			// 		console.log('column',JSON.stringify(res.data.Column))
			// 		console.log('ColumnMeter',JSON.stringify(res.data.ColumnMeter))
			// 		console.log('Pie',JSON.stringify(res.data.Pie))
			// 		_self.fillData(res.data);
			// 	},
			// 	fail: () => {
			// 		_self.tips = '网络错误，小程序端请检查合法域名';
			// 	},
			// 	complete() {
			// 		uni.hideLoading();
			// 	}
			// });
		},
		fillData(data) {
			this.serverData = data;
			this.tips = data.tips;
			let Column = {
				categories: [],
				series: []
			};
			let ColumnMeter = {
				categories: [],
				series: []
			};
			let Pie = {
				series: []
			};
			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			Column.categories = data.Column.categories;
			//这里的series数据是后台做好的，如果您的数据没有和前面我注释掉的格式一样，请自行拼接数据
			Column.series = data.Column.series;
			ColumnMeter.categories = data.ColumnMeter.categories;
			//这里的series数据,如果为Meter，series[0]定义为外层数据，series[1]定义为内层数据
			ColumnMeter.series = data.ColumnMeter.series;

			Pie.series = data.Pie.series;

			this.showColumn('canvasColumn', Column);
			this.showColumnMeter('canvasColumnMeter', ColumnMeter);
			// this.showLineA('canvasLineA', LineA);
			// this.showLineB('canvasLineB', LineB);
			// this.showArea('canvasArea', Area);
			this.showPie('canvasPie', Pie);
			// this.showRing('canvasRing', Ring);
			// this.showFunnel('canvasFunnel', Funnel);
			// this.showRadar('canvasRadar', Radar);
			// this.showArcbar('canvasArcbar1', Arcbar1);
			// this.showArcbar2('canvasArcbar2', Arcbar2);
			// this.showArcbar3('canvasArcbar3', Arcbar3);
			// this.showGauge('canvasGauge', Gauge);
			// this.showCandle('canvasCandle', Candle);
			// this.showMix('canvasMix', Mix);
		},
		showColumn(canvasId, chartData) {
			canvasObj[canvasId] = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				padding: [15, 15, 0, 15],
				legend: {
					show: true,
					padding: 5,
					lineHeight: 11,
					margin: 0
				},
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: false,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true
				},
				yAxis: {
					format: val => {
						return val.toFixed(0) + '元';
					}
				},
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						type: 'group',
						width: (_self.cWidth * _self.pixelRatio * 0.45) / chartData.categories.length
					}
				}
			});
		},
		showColumnMeter(canvasId, chartData) {
			canvasObj[canvasId] = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				padding: [15, 15, 0, 15],
				legend: {
					show: true,
					padding: 5,
					lineHeight: 11,
					margin: 0
				},
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: false,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true
				},
				yAxis: {
					//disabled:true
				},
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						type: 'meter',
						width: (_self.cWidth * _self.pixelRatio * 0.45) / chartData.categories.length,
						meter: {
							border: 4,
							// fillColor: '#E5FDC3'
							fillColor: '#ffffff'
						}
					}
				}
			});
		},

		showPie(canvasId, chartData) {
			canvasObj[canvasId] = new uCharts({
				$this: _self,
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
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				animation: false,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				dataLabel: true,
				extra: {
					pie: {
						lableWidth: 15
					}
				}
			});
		},

		changeData() {
			canvasObj['canvasColumn'].updateData({
				series: _self.serverData.ColumnB.series,
				categories: _self.serverData.ColumnB.categories
			});
		},

		touchIt(e, id) {
			canvasObj[id].touchLegend(e, {
				animation: false
			});
			canvasObj[id].showToolTip(e, {
				format: function(item, category) {
					if (typeof item.data === 'object') {
						return category + ' ' + item.name + ':' + item.data.value;
					} else {
						return category + ' ' + item.name + ':' + item.data;
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

<style scoped>
page {
	background: #f2f2f2;
	width: 750upx;
	overflow-x: hidden;
}

.qiun-padding {
	padding: 2%;
	width: 96%;
}

.qiun-wrap {
	display: flex;
	flex-wrap: wrap;
}

.qiun-rows {
	display: flex;
	flex-direction: row !important;
}

.qiun-columns {
	display: flex;
	flex-direction: column !important;
}

.qiun-common-mt {
	margin-top: 10upx;
}

.qiun-bg-white {
	background: #ffffff;
}

.qiun-title-bar {
	width: 96%;
	padding: 10upx 2%;
	flex-wrap: nowrap;
}

.qiun-title-dot-light {
	border-left: 10upx solid #0ea391;
	padding-left: 10upx;
	font-size: 32upx;
	color: #000000;
}

/* 通用样式 */
.qiun-charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}

.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}

/* 横屏样式 */
.qiun-charts-rotate {
	width: 700upx;
	height: 1100upx;
	background-color: #ffffff;
	padding: 25upx;
}

.charts-rotate {
	width: 700upx;
	height: 1100upx;
	background-color: #ffffff;
}

/* 圆弧进度样式 */
.qiun-charts3 {
	width: 750upx;
	height: 250upx;
	background-color: #ffffff;
	position: relative;
}

.charts3 {
	position: absolute;
	width: 250upx;
	height: 250upx;
	background-color: #ffffff;
}

.qiun-tip {
	display: block;
	width: auto;
	overflow: hidden;
	padding: 15upx;
	height: 30upx;
	line-height: 30upx;
	margin: 10upx;
	background: #ff9933;
	font-size: 30upx;
	border-radius: 8upx;
	justify-content: center;
	text-align: center;
	border: 1px solid #dc7004;
	color: #ffffff;
}
</style>
