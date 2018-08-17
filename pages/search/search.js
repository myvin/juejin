const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    bannerImgList: [],
    swiperHeight: 'auto',
    rankList: [],
    COUNT: 20,
    auth: {},
  },
  onShow () {
    if (utils.pageReload(this.data.auth, [this.data.rankList])) {
      this.init()
    }
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
    this.getBannerImgList()
    this.getEntryByRank(true)
  },
  initSwiper () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          swiperHeight: `${(res.windowWidth || res.screenWidth) / 108 * 36}px`
        })
      },
    })
  },
  getBannerImgList () {
    wx.getStorage({
      key: 'bannerImgList',
      success: (res) => {
        this.setData({
          bannerImgList: res.data || [],
        })
      },
      fail: (res) => {
        this.setData({
          bannerImgList: [],
        })
      },
    })
  },
  toPostDetail (e) {
    wx.navigateTo({
      url: `/pages/post/post?id=${e.currentTarget.dataset.id}`,
    })
  },
  getEntryByRank(reload) {
    const auth = this.data.auth
    let rankList = this.data.rankList
    if (utils.isEmptyObject(rankList) || reload) {
      rankList = [{ rankIndex: '' }]
    }
    let rankIndex = (rankList.slice(-1)[0].rankIndex) || ''
    wx.request({
      url: `${config.timelineRequestUrl}/get_entry_by_rank`,
      data: {
        src: 'web',
        uid: auth.uid || 'unlogin',
        device_id: auth.clientId,
        token: auth.token || '',
        limit: this.data.COUNT,
        // category: 'all',
        // recomment: 1,
        before: rankIndex,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          wx.hideLoading()
          let entrylist = (data.d && data.d.entrylist) || []
          this.setData({
            rankList: reload ? entrylist : this.data.rankList.concat(entrylist),
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
    this.getEntryByRank()
  },
  onShareAppMessage(res) {
    return {}
  },
})