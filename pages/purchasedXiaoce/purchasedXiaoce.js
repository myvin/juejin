const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    list: [],
    auth: {},
  },
  onLoad() {
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    this.userBuyList()
  },
  userBuyList() {
    const auth = this.data.auth
    wx.request({
      url: `${config.xiaoceCacheApiMs}/userBuyList`,
      data: {
        uid: auth.uid,
        client_id: auth.clientId,
        token: auth.token,
        src: 'web',
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let list = (data.d && data.d.entryList) || []
          this.setData({
            list: this.data.list.concat(list),
          })
        } else {
          if (data.s === 2) {
            // no result
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
    })
  },
})