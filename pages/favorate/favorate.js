const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    list: [],
    auth: {},
    thirduid: '',
    page: 0,
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
    this.getUserLikeList()
  },
  getUserLikeList() {
    const auth = this.data.auth
    wx.request({
      header: {
        'X-Juejin-Src': 'web',
        'X-Juejin-Client': auth.clientId || '',
        'X-Juejin-Token': auth.token || '',
        'X-Juejin-Uid': auth.uid || '',
      },
      url: `${config.userLikeWrapperMsRequestUrl}/user/${this.data.thirduid || auth.uid}/like/entry`,
      data: {
        page: this.data.page,
        pageSize: 20,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let list = (data.d && data.d.entryList) || []
          if (!utils.isEmptyObject(list)) {
            let page = this.data.page + 1
            this.setData({
              page,
              list: this.data.list.concat(list),
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
  onReachBottom() {
    this.getUserLikeList()
  },
})