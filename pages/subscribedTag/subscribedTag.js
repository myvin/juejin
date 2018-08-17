const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    tagList: [],
    auth: {},
    thirduid: '',
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
    this.getSubscribedTag()
  },
  getSubscribedTag() {
    const auth = this.data.auth
    wx.request({
      header: {
        'X-Juejin-Src': 'web',
        'X-Juejin-Client': auth.clientId || '',
        'X-Juejin-Token': auth.token || '',
        'X-Juejin-Uid': auth.uid || '',
      },
      url: `${config.goldTagMsRequestUrl}/user/${this.data.thirduid || auth.uid}/subscribe`,
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let tagList = (data.d && data.d.tagList) || []
          if (!utils.isEmptyObject(tagList)) {
            this.setData({
              tagList,
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
})