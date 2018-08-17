const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    tagList: [],
    hotTagList: [],
    hotPage: 1,
    recommendTagList: [],
    auth: {},
    thirduid: '',
    currentSwiper: '0',
  },
  onLoad(query) {
    if (query && query.thirduid) {
      let thirduid = query && query.thirduid
      this.setData({
        thirduid,
      })
    }
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    this.getSubscribedTag()
    this.getHotTags(1)
    this.getRecommendTags(this.data.hotPage)
  },
  switchSwiper(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentSwiper: parseInt(index),
    })
  },
  swiperChanged(e) {
    this.setData({
      currentSwiper: e.detail.currentItemId,
    })
  },
  getSubscribedTag() {
    const auth = this.data.auth
    wx.request({
      header: {
        'X-Juejin-Src': 'web',
        'X-Juejin-Client': auth.clientId || '',
        'X-Juejin-Token': auth.token || '',
        'X-Juejin-Uid': auth.uid || '',
      },
      url: `${config.goldTagMsRequestUrl}/user/${this.data.thirduid || auth.uid}/subscribe`,
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let tagList = (data.d && data.d.tagList) || []
          if (!utils.isEmptyObject(tagList)) {
            this.setData({
              tagList,
            })
          }
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
  // 获取推荐标签
  getHotTags(page) {
    const auth = this.data.auth
    wx.request({
      header: {
        'X-Juejin-Src': 'web',
        'X-Juejin-Client': auth.clientId || '',
        'X-Juejin-Token': auth.token || '',
        'X-Juejin-Uid': auth.uid || '',
      },
      url: `${config.goldTagMsRequestUrl}/tags/type/hot/suggest/category/page/${page}/pageSize/100`,
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let hotTagList = (data.d && data.d.tags) || []
          if (!utils.isEmptyObject(hotTagList)) {
            this.setData({
              hotTagList,
            })
          }
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
  // 获取所有标签
  getRecommendTags(page) {
    const auth = this.data.auth
    wx.request({
      header: {
        'X-Juejin-Src': 'web',
        'X-Juejin-Client': auth.clientId || '',
        'X-Juejin-Token': auth.token || '',
        'X-Juejin-Uid': auth.uid || '',
      },
      url: `${config.goldTagMsRequestUrl}/tags/type/hot/suggest/tag/page/${page}/pageSize/100`,
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let recommendTagList = (data.d && data.d.tags) || []
          if (!utils.isEmptyObject(recommendTagList)) {
            let hotPage = this.data.hotPage + 1
            this.setData({
              recommendTagList: this.data.recommendTagList.concat(recommendTagList),
              hotPage,
            })
          }
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
  getMoreRecommendTags () {
    this.getRecommendTags(this.data.hotPage)
  },
})