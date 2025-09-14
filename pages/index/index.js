const utils = require('../../utils/utils.js')
Page({
  data: {
    logined: false,
    list: [],
    cursor: '0'
  },
  onLoad() {
    this.getList(true)
  },
  onShow(){
    this.setData({
      logined: utils.getUuid()
    })
  },
  onPullDownRefresh() {
    this.getList(true)
  },
  getList(reload) {
    if (reload) {
      this.setData({
        list: [],
      })
    }
    wx.request({
      url: `https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed?aid=2608&uuid=${utils.getUuid()}&spider=0`,
      method: 'POST',
      data: {
        "id_type": 2,
        "client_type": 2608,
        "sort_type": 200,
        "cursor": this.data.cursor,
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
  onReachBottom() {
    this.getList()
  },
  onShareAppMessage(res) {
    return {}
  },
})