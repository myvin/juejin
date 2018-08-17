const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    xiaoceList: [],
    noResult: false,
    auth: {},
    pageNum: 1,
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
      auth: {},
      pageNum: 1,
    })
    this.init(reload)
  },
  init(reload) {
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    this.getXiaoce(reload)
  },
  // 获取小册列表
  getXiaoce(reload) {
    let auth = this.data.auth
    if (reload) {
      this.setData({
        pageNum: 1,
      })
    }
    wx.request({
      url: `${config.xiaoceRequestUrl}/getListByLastTime`,
      data: {
        src: 'web',
        uid: auth.uid || '',
        device_id: auth.clientId,
        token: auth.token,
        pageNum: this.data.pageNum,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let list = data.d
          if (!utils.isEmptyObject(list)) {
            let pageNum = this.data.pageNum + 1
            this.setData({
              pageNum,
              xiaoceList: reload ? list : this.data.xiaoceList.concat(list),
            })
          }
        } else {
          if (data.s === 2) {
            // no result
            this.setData({
              noResult: true,
            })
          } else {
            wx.showToast({
              title: data.m.toString(),
              icon: 'none',
            })
          }
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
})