const utils = require('../../utils/utils.js')
Page({
  onLoad () {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      this.direct()
    }, 2000)
  },
  direct () {
    let auth = utils.ifLogined()
    let url = '/pages/feidian/feidian'
    if (auth) {
      url = '/pages/index/index'
    }
    wx.switchTab({
      url,
    })
  },
})