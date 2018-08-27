const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    mobile: '',
    password: '',
  },
  login (params, Type) {
    wx.showLoading({
      title: '加载中...',
    })
    let url = (Type === 1 ? config.loginRequestUrlByMobile : config.loginRequestUrlByEMail)
    wx.request({
      url,
      method: "POST",
      data: params,
      success: function (res) {
        console.log('login success res: ' ,res)
        let statusCode = res.statusCode
        if (statusCode === 401) {
          wx.showToast({
            title: '密码错误',
            icon: 'none',
          })
          return
        } else if (statusCode === 404) {
          wx.showToast({
            title: '用户不存在',
            icon: 'none',
          })
          return
        } else if (statusCode !== 200) {
          wx.showToast({
            title: '未知错误',
            icon: 'none',
          })
        }
        let data = res.data
        if (!utils.isEmptyObject(data)) {
          wx.showToast({
            title: '已登录',
            icon: 'none',
          })
          wx.setStorage({
            key: 'auth',
            data: {
              'token': data.token,
              'uid': data.userId,
              'clientId': data.clientId,
            },
          })
          wx.navigateBack({})
        } else {
          wx.showToast({
            title: '发生错误，请稍后再试',
            icon: 'none',
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '网路开小差，请稍后再试',
          icon: 'none',
        })
      },
    })
  },
  commit(e) {
    let values = e.detail.value
    let phoneNumber = values.phoneNumber || ''
    let password = values.password || ''
    if (!phoneNumber.replace(/\s+/g, '')) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
      })
      return
    }
    if (!values.password.replace(/\s+/g, '')) {
      wx.showToast({
        title: '请输入登录密码',
        icon: 'none',
      })
      return
    }

    if (values.phoneNumber.indexOf('@') !== -1) {
      let params = {
        email: values.phoneNumber,
        password: values.password,
      }
      this.login(params, 2)
    } else {
      this.login(values, 1)
    }
  },
})