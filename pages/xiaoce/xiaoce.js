const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    xiaoceList: [],
    noResult: false,
    cursor: 0,
  },
  onLoad() {
    this.init()
  },
  onPullDownRefresh () {
    this.reload()
  },
  // 下拉刷新触发
  reload(reload) {
    this.setData({
      noResult: false,
      cursor: 1,
    })
    this.init(reload)
  },
  init(reload) {
    this.getXiaoce(reload)
  },
  // 获取小册列表
  getXiaoce(reload) {
    if (reload) {
      this.setData({
        pageNum: 1,
      })
    }
    wx.request({
      url: `https://api.juejin.cn/booklet_api/v1/booklet/listbycategory?aid=2608&uuid=${utils.getUuid()}&spider=0`,
      method: 'POST',
      data: {
        category_id: "0",
        cursor: this.data.cursor.toString(),
        sort: 10,
        limit: 20,
        coupon_id: "",
        is_vip: 0
      },
      success: (res) => {
        let data = res.data
        if (data.err_no === 0) {
          let list = data.data
          if (!utils.isEmptyObject(list)) {
            this.setData({
              cursor: this.data.cursor + 20,
              xiaoceList: reload ? list : this.data.xiaoceList.concat(list),
            })
          }
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
    if (!this.data.xiaoceList.length || !this.data.noResult) {
      this.getXiaoce()
    }
  },
  onShareAppMessage(res) {
    return {}
  },
})