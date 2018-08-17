const utils = require('../../utils/utils.js')
const config = getApp().globalData.config
Page({
  data: {
    userInfo: {},
    auth: {},
  },
  onLoad() {
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    if (auth) {
      this.getUserInfo()
    }
  },
  // 获取个人信息
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
  signout () {
    wx.showModal({
      title: '提示',
      content: '确定退出?',
      cancelColor: '#3281ff',
      confirmColor: '#3281ff',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorage({
            key: 'auth',
            success: function(res) {
              wx.switchTab({
                url: '/pages/feidian/feidian',
              })
            },
          })
        }
      }
    })
  },
})