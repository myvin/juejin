const WxParse = require('../../wxParse/wxParse.js')
const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    entryDetail: {},
    auth: '',
  },
  onLoad(query) {
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    this.getEntryView(query.id)
  },
  toPersonal() {
    wx.navigateTo({
      url: `/pages/personal/personal?thirduid=${this.data.entryDetail.user.objectId}`,
    })
  },
  getEntryView(entryId) {
    const auth = this.data.auth
    wx.request({
      url: `${config.entryViewStorageApiMsRequestUrl}/getEntryView`,
      data: {
        device_id: auth.clientId,
        token: auth.token,
        src: 'web',
        entryId,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let article = (data.d && data.d.content) || ''
          WxParse.wxParse('article', 'html', article, this)
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