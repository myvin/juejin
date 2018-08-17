const utils = require('../../utils/utils.js')
const config = getApp().globalData.config
Page({
  data: {
    userInfo: {},
    userNotificationNum: 0,
    auth: {},
  },
  onShow () {
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    if (auth) {
      this.getUserInfo()
      this.userNotificationNum()
    } else {
      this.setData({
        userInfo: {},
        userNotificationNum: 0,
      })
    }
  },
  navigatItem (e) {
    return utils.navigatItem(e)
  },
  // 获取用户信息
  getUserInfo() {
    const auth = this.data.auth
    wx.request({
      url: `${config.apiRequestUrl}/getUserInfo`,
      data: {
        src: 'web',
        device_id: auth.clientId,
        uid: auth.uid,
        token: auth.token,
        current_uid: auth.uid,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          this.setData({
            userInfo: data.d,
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
  // 消息中心消息条数
  userNotificationNum() {
    const auth = this.data.auth
    wx.request({
      url: `${config.notifyRequestUrl}/getUserNotificationNum`,
      data: {
        src: 'web',
        uid: auth.uid,
        token: auth.token,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          this.setData({
            userNotificationNum: data.d && data.d.notification_num,
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
})