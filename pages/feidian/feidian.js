const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    swiperHeight: 'auto',
    recommendList: [],
    list: [],
    auth: {},
    scrollTop: 0,
    after: '',
    cursor: 0,
  },
  onLoad() {
    wx.startPullDownRefresh({})
  },
  onPullDownRefresh() {
    this.init()
  },
  init() {
    this.initSwiper()
    this.queryDongtai(true)
  },
  illegalToken(s) {
    if (s === 3) {
      wx.removeStorage({
        key: 'auth',
        complete() {
          const timer = setTimeout(() => {
            wx.navigateTo({
              url: '/pages/login/login',
            })
            clearTimeout(timer)
          }, 1000)
        }
      })
    }
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
  // 沸点列表
  queryDongtai(reload) {
    let list = this.data.list
    if (utils.isEmptyObject(list) || reload) {
      this.setData({
        list: [],
      })
    }
    wx.request({
      url: `https://api.juejin.cn/recommend_api/v1/short_msg/recommend?aid=2608&uuid=${utils.getUuid()}&spider=0`,
      method: 'POST',
      data: {
        "id_type": 4,
        "sort_type": 300,
        "cursor": this.data.cursor.toString(),
        "limit": 20
      },
      success: (res) => {
        let data = res.data || {}
        if (data.err_no === 0) {
          this.setData({
            cursor: data.cursor,
            list: this.data.list.concat(data.data)
          })
        } else {
          wx.showToast({
            title: data.err_msg,
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
  toFeidianDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/feidianDetail/feidianDetail?msgId=${id}`,
    })
  },
  onReachBottom() {
    this.queryDongtai()
  },
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop,
    })
  },
  onShareAppMessage(res) {
    let obj = {}
    let from = res.from
    if (from === 'button') {
      let item = res.target.dataset.item
      obj.title = `来自 ${item.author_user_info.user_name} 的沸点: ${item.msg_Info.content}`
      obj.path = `/pages/feidianDetail/feidianDetail?msgId=${item.msg_id}`
      obj.imageUrl = (item.msg_Info && item.msg_Info.pic_list[0]) || (item.author_user_info && item.author_user_info.avatar_large)
    }
    return obj
  },
})