Page({
  data: {
    cardArr: [{
      name: '学生每日健康打卡',
      poi: 1,
      imgUrl: '/assets/imgs/pic1.png',
      path: '/pages/healthCard/healthCard'
    }, {
      name: '学生安全确认表',
      poi: 2,
      imgUrl: '/assets/imgs/pic2.png',
      path: '/pages/healthCard/healthCard'
    }, {
      name: '外出登记',
      poi: 3,
      imgUrl: '/assets/imgs/pic3.png',
      path: '/pages/healthCard/healthCard'
    }, {
      name: '学生健康情况收集表',
      poi: 4,
      imgUrl: '/assets/imgs/pic4.png',
      path: '/pages/healthCard/healthCard'
    }]
  },
  onLoad() {
    this.judgeAuth();

  },
  judgeAuth() {

  },
  handleNavTo(evt) {
    if (Object.keys(evt.currentTarget.dataset).length) {
      let item = evt.currentTarget.dataset.item
      wx.navigateTo({
        url: item.path,
      })
    }
  }
})