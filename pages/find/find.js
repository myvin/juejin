const utils = require('../../utils/utils.js')
Page({
  data: {
    swiperHeight: 'auto',
    list: [],
    cursor: "0",
  },
  onLoad () {
    this.init()
  },
  init() {
    wx.showLoading({
      title: '数据加载中',
    })
    this.getList(true)
  },
  toPostDetail (e) {
    wx.navigateTo({
      url: `/pages/post/post?id=${e.currentTarget.dataset.id}`,
    })
  },
  getList(reload) {
    if (reload) {
      this.setData({
        cursor: "0",
        list: [],
      })
    }
    wx.request({
      url: `https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?aid=2608&uuid=${utils.getUuid()}&spider=0`,
      method: 'POST',
      data: {
        "id_type": 2,
        "sort_type": 0,
        "cate_id": "6809637772874219534",
        "cursor": this.data.cursor,
        "limit": 20
      },
      success: (res) => {
        let data = res.data
        if (data.err_no === 0) {
          wx.hideLoading()
          this.setData({
            cursor: data.cursor,
            list: this.data.list.concat(data.data || []),
          })
        } else {
          wx.showToast({
            title: data.err_msg.toString(),
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
    this.getList()
  },
  onShareAppMessage(res) {
    return {}
  },
})