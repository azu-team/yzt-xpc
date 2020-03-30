const typeList = [ //登录人身份
		{
			value: '学生',
			id: '1'
		},
		{
			value: '家长',
			id: '2'
		},
		{
			value: '教师',
			id: '3'
		},
		{
			value: '行政管理人员',
			id: '4'
		}
	],
	relationList = [ //亲属关系
		{
			value: '父亲',
			id: '51'
		},
		{
			value: '母亲',
			id: '52'
		},
		{
			value: '公公',
			id: '53'
		},
		{
			value: '婆婆',
			id: '54'
		},
		{
			value: '岳父',
			id: '55'
		},
		{
			value: '岳母',
			id: '56'
		},
		{
			value: '继父或养父',
			id: '57'
		},
		{
			value: '继母或养母',
			id: '58'
		},
		{
			value: '其他父母关系',
			id: '59'
		},
		{
			value: '祖父母或外祖父母',
			id: '60'
		},
		{
			value: '祖父',
			id: '61'
		},
		{
			value: '祖母',
			id: '62'
		},
		{
			value: '外祖父',
			id: '63'
		},
		{
			value: '外祖母',
			id: '64'
		},
		{
			value: '配偶的祖父母或外祖父母',
			id: '65'
		},
		{
			value: '曾祖父',
			id: '66'
		},
		{
			value: '曾祖母',
			id: '67'
		},
		{
			value: '配偶的曾祖父母',
			id: '68'
		},
		{
			value: '其他祖父母或外祖父母关系',
			id: '69'
		},
		{
			value: '伯父',
			id: '81'
		},
		{
			value: '伯母',
			id: '82'
		},
		{
			value: '叔父',
			id: '83'
		},
		{
			value: '婶母',
			id: '84'
		},
		{
			value: '舅父',
			id: '85'
		},
		{
			value: '舅母',
			id: '86'
		},
		{
			value: '姨父',
			id: '87'
		},
		{
			value: '姨母',
			id: '88'
		},
		{
			value: '姑父',
			id: '89'
		},
		{
			value: '姑母',
			id: '90'
		},
		{
			value: '其他亲属',
			id: '97'
		},
		{
			value: '非亲属',
			id: '99'
		}
	],
	idTypeList = [ //身份证类型
		{
			value: '居民身份证',
			id: '1'
		},
		{
			value: '台湾居民来往大陆通行证',
			id: '8'
		},
		{
			value: '护照',
			id: 'A'
		},
		{
			value: '军官证',
			id: '2'
		},
		{
			value: '士兵证',
			id: '3'
		},
		{
			value: '文职干部证',
			id: '4'
		},
		{
			value: '部队离退休证',
			id: '5'
		},
		{
			value: '香港特区护照/身份证明',
			id: '6'
		},
		{
			value: '澳门特区护照/身份证明',
			id: '7'
		}
	],
	sexList = [ //性别
		{
			value: '男',
			id: '1'
		},
		{
			value: '女',
			id: '2'
		}
	],
	eduTypeList = [
		{
			value:'学生',
			id:'1'
		},{
			value:'教师',
			id:'2'
		},{
			value:'家长',
			id:'20'
		},{
			value:'行政管理人员',
			id:'21'
		},
	],
	jsTypeList = [
		{
			value:'教师',
			id:'2'
		},{
			value:'行政管理人员',
			id:'21'
		},
	],
	authorControl = {
		'1': [
			{
				name: '身份认证',
				imgUrl: '../../static/mp-weixin/imgs/login.png',
				path: '/pages/idConfirm/idConfirm'
			}
		],
		'2': [
			{
				name: '个人信息',
				imgUrl: '../../static/mp-weixin/imgs/1.png',
				path: '/pages/idConfirm/baseInfo'
			},
			{
				name: '每日健康打卡',
				imgUrl: '../../static/mp-weixin/imgs/2.png',
				path: '/pages/healthCard/healthCard'
			},
			{
				name: '在线学习',
				imgUrl: '../../static/mp-weixin/imgs/3.png',
				path: '/pages/stu/stuLearning'
			},
			{
				name: '学习情况',
				imgUrl: '../../static/mp-weixin/imgs/4.png',
				path: '/pages/stu/stuStatus'
			},
			{
				name: '一键求助',
				imgUrl: '../../static/mp-weixin/imgs/5.png',
				path: '/pages/common/quickHelp'
			},
			{
				name: '安全情况',
				imgUrl: '../../static/mp-weixin/imgs/7.png',
				path: '/pages/common/safeStatus'
			}
		],
		'3': [
			{
				name: '个人信息',
				imgUrl: '../../static/mp-weixin/imgs/1.png',
				path: '/pages/idConfirm/baseInfo'
			},
			{
				name: '在线授课',
				imgUrl: '../../static/mp-weixin/imgs/2.png',
				path: '/pages/teacher/teaTeaching'
			},
			{
				name: '授课情况',
				imgUrl: '../../static/mp-weixin/imgs/3.png',
				path: '/pages/teacher/teaStatistic'
			},
			{
				name:'学生申报统计',
				imgUrl: '../../static/mp-weixin/imgs/4.png',
				path: '/pages/statistics/stuSubmissionStatistics'
			}
		],
		'4': [
			{
				name: '个人信息',
				imgUrl: '../../static/mp-weixin/imgs/1.png',
				path: '/pages/idConfirm/baseInfo'
			},{
				name: '授课平台',
				imgUrl: '../../static/mp-weixin/imgs/2.png',
				path: '/pages/edu/eduPlatform'
			},
			// {
			// 	name: '查看与统计所辖区域授课情况',
			// 	imgUrl: '../../static/mp-weixin/imgs/3.png',
			// 	path: '/pages/edu/eduTeachingStatistic'
			// },
			// {
			// 	name: '查看与统计所辖区域学习情况',
			// 	imgUrl: '../../static/mp-weixin/imgs/4.png',
			// 	path: '/pages/edu/eduLearningStatistic'
			// },
			{
				name:'学生申报统计',
				imgUrl: '../../static/mp-weixin/imgs/5.png',
				path: '/pages/statistics/stuSubmissionStatistics'
			}
		],
		'99':[
			{
				name: '个人信息',
				imgUrl: '../../static/mp-weixin/imgs/1.png',
				path: '/pages/idConfirm/baseInfo'
			},
			{
				name: '每日健康打卡',
				imgUrl: '../../static/mp-weixin/imgs/2.png',
				path: '/pages/healthCard/healthCard'
			},
			{
				name: '在线学习',
				imgUrl: '../../static/mp-weixin/imgs/3.png',
				path: '/pages/stu/stuLearning'
			},
			{
				name: '学习情况',
				imgUrl: '../../static/mp-weixin/imgs/4.png',
				path: '/pages/stu/stuStatus'
			},
			{
				name: '一键求助',
				imgUrl: '../../static/mp-weixin/imgs/5.png',
				path: '/pages/common/quickHelp'
			},
			{
				name: '安全情况',
				imgUrl: '../../static/mp-weixin/imgs/7.png',
				path: '/pages/common/safeStatus'
			},
			{
				name: '在线授课',
				imgUrl: '../../static/mp-weixin/imgs/2.png',
				path: '/pages/teacher/teaTeaching'
			},
			{
				name: '授课情况',
				imgUrl: '../../static/mp-weixin/imgs/3.png',
				path: '/pages/teacher/teaStatistic'
			},
			{
				name:'学生申报统计',
				imgUrl: '../../static/mp-weixin/imgs/5.png',
				path: '/pages/statistics/stuSubmissionStatistics'
			},
			{
				name: '授课平台',
				imgUrl: '../../static/mp-weixin/imgs/2.png',
				path: '/pages/edu/eduPlatform'
			}
		]
	}
	
export {
	typeList,
	relationList,
	idTypeList,
	sexList,
	eduTypeList,
	jsTypeList,
	authorControl
}
