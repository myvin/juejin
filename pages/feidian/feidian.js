const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    COUNT: 30,
    swiperHeight: 'auto',
    recommendList: [],
    list: [],
    auth: {},
    scrollTop: 0,
  },
  onShow () {
    // 如果 scrollTop 为 0，也 reload
    if (utils.pageReload(this.data.auth, [this.data.list]) || !this.data.scrollTop) {
      this.init()
    }
  },
  onPullDownRefresh() {
    this.init()
  },
  init() {
    wx.showLoading({
      title: '数据加载中',
    })
    this.setData({
      auth: {},
    })
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    this.initSwiper()
    this.getHotRecommendList()
    this.pinListRecommend(true)
  },
  initSwiper() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          swiperHeight: `${(res.windowWidth || res.screenWidth) / 375 * 135}px`
        })
      },
    })
  },
  // 热门推荐列表
  getHotRecommendList() {
    const auth = this.data.auth
    wx.request({
      url: `${config.shortMsgMsRequestUrl}/getHotRecommendList`,
      data: {
        uid: auth.uid,
        device_id: auth.clientId,
        client_id: auth.client_id,
        token: auth.token,
        src: 'web',
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          this.setData({
            recommendList: (data.d && data.d.list) || [],
          })
        } else {
          wx.showToast({
            title: data.m.toString(),
            icon: 'none',
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '网路开小差，请稍后再试',
          icon: 'none',
        })
      },
    })
  },
  // 沸点列表
  pinListRecommend(reload) {
    const auth = this.data.auth
    let list = this.data.list
    if (utils.isEmptyObject(list) || reload) {
      list = [{ createdAt: '' }]
    }
    let createdAt = (list.slice(-1)[0].createdAt) || ''
    wx.request({
      url: `${config.shortMsgMsRequestUrl}/pinList/recommend`,
      data: {
        uid: auth.uid,
        device_id: auth.clientId,
        token: auth.token,
        src: 'web',
        limit: this.data.COUNT,
        before: createdAt,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          wx.hideLoading()
          let list = (data.d && data.d.list) || []
          this.setData({
            list: reload ? list : this.data.list.concat(list),
          })
        } else {
          wx.showToast({
            title: data.m.toString(),
            icon: 'none',
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '网路开小差，请稍后再试',
          icon: 'none',
        })
      },
    })
  },
  onReachBottom() {
    this.pinListRecommend()
  },
  onPageScroll (e) {
    this.setData({
      scrollTop: e.scrollTop,
    })
  },
  onShareAppMessage(res) {
    return {}
  },
})