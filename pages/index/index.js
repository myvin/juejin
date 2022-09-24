const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
let globalData = getApp().globalData
Page({
  data: {
    COUNT: 20,
    timeline: [],
    hotRecomment: [],
    hotRrecommendShow: true,
    auth: {},
    logined: true,
    rotate: '',
  },
  onLoad () {
    wx.startPullDownRefresh({})
  },
  onPullDownRefresh() {
    this.init()
  },
  init() {
    this.setData({
      hotRrecommendShow: this.data.hotRrecommendShow,
      auth: {},
      rotate: '',
    })
    let auth = utils.ifLogined()
    this.setData({
      auth,
      logined: auth,
    })
    // this.getBannerImgList()
    this.getEntryByTimeline(true)
    if (auth) {
      this.getEntryByHotRecomment()
    }
  },
  // getBannerImgList() {
  //   const auth = this.data.auth
  //   wx.request({
  //     url: `${config.bannerRequestUrl}/get_banner`,
  //     data: {
  //       position: 'explore',
  //       page: 0,
  //       pageSize: 20,
  //       platform: 'android',
  //       device_id: auth.clientId,
  //       client_id: auth.clientId,
  //       token: auth.token,
  //       src: 'android',
  //     },
  //     success: (res) => {
  //       let data = res.data
  //       if (data.s === 1) {
  //         let bannerImgList = (data.d && data.d.banner) || []
  //         wx.setStorage({
  //           key: 'bannerImgList',
  //           data: bannerImgList,
  //         })
  //       } else {
  //         wx.showToast({
  //           title: data.m.toString(),
  //           icon: 'none',
  //         })
  //       }
  //     },
  //     fail: () => {
  //       wx.showToast({
  //         title: '网路开小差，请稍后再试',
  //         icon: 'none',
  //       })
  //     },
  //   })
  // },
  // 获取 timeline 推荐列表
  // 翻页：将最后一条的 verifyCreatedAt 赋值给 before 字段即可
  getEntryByTimeline(reload) {
    const auth = this.data.auth
    let timeline = this.data.timeline
    if (utils.isEmptyObject(timeline) || reload) {
      timeline = [{ verifyCreatedAt: '' }]
    }
    let rankIndex = (timeline.slice(-1)[0].verifyCreatedAt) || ''
    wx.request({
      url: `${config.timelineRequestUrl}/get_entry_by_timeline`,
      data: {
        src: 'web',
        uid: auth.uid || '',
        device_id: auth.clientId,
        token: auth.token,
        limit: this.data.COUNT,
        category: 'all',
        recomment: 1,
        before: rankIndex,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          wx.hideLoading()
          let list = (data.d && data.d.entrylist) || []
          this.setData({
            timeline: reload ? list : this.data.timeline.concat(list),
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
      complete: () => {
        wx.stopPullDownRefresh()
      },
    })
  },
  // 热门推荐
  getEntryByHotRecomment() {
    const auth = this.data.auth
    wx.request({
      url: `${config.timelineRequestUrl}/get_entry_by_hot_recomment`,
      data: {
        src: 'web',
        uid: auth.uid || '',
        device_id: auth.clientId || '',
        client_id: auth.clientId || '',
        token: auth.token || '',
        limit: this.data.COUNT,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let entrylist = (data.d && data.d.entry && data.d.entry.entrylist) || []
          this.setData({
            hotRecomment: entrylist.slice(0, 3),
          })
          if (!utils.isEmptyObject(entrylist)) {
            if (!this.data.hotRrecommendShow) {
              this.setData({
                hotRrecommendShow: true,
              })
            }
          } else {
            if (this.data.hotRrecommendShow) {
              this.setData({
                hotRrecommendShow: false,
              })
            }
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
  // 热门推荐点击刷新，将当前的 3 条文章 objectId 以 id|id|id 的格式发送请求，然后重新拉取热门推荐列表
  // 看抓包，热门推荐只返回 20 条，刷新一次移除三条，所以简单处理的话，user_filter_entry 之后直接将热门推荐数组的前三条移除即可；上面方式更精确，以防服务端之后又有什么返回呢
  userFilterEntry(ids) {
    const auth = this.data.auth
    wx.request({
      url: `${config.timelineRequestUrl}/user_filter_entry`,
      data: {
        src: 'web',
        uid: auth.uid,
        device_id: auth.clientId,
        client_id: auth.clientId,
        token: auth.token,
        entryId: ids.join('|'),
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          this.getEntryByHotRecomment()
        } else {
          // friendly 不提示错误信息
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
  refreshHot() {
    this.setData({
      rotate: 'rotate',
    })
    let timer = setTimeout(() => {
      this.setData({
        rotate: '',
      })
      clearTimeout(timer)
    }, 800)
    let hotRecomment = this.data.hotRecomment
    this.userFilterEntry(hotRecomment.map(item => {
      return item.objectId
    }))
  },
  closeHot () {
    this.setData({
      hotRrecommendShow: false,
    })
  },
  onReachBottom () {
    this.getEntryByTimeline()
  },
  onShareAppMessage(res) {
    return {}
  },
})