const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    item: [],
    auth: {},
    msgId: '',
  },
  onLoad(query) {
    if (query && query.msgId) {
      let msgId = query && query.msgId
      let auth = utils.ifLogined()
      this.setData({
        auth,
      })
      this.getById(msgId)
    }
  },
  getById(msgId) {
    const auth = this.data.auth
    wx.request({
      url: `${config.shortMsgMsRequestUrl}/getByID`,
      data: {
        uid: auth.uid || '',
        msgId,
        device_id: auth.clientId || '',
        token: auth.token,
        src: 'web',
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let item = data.d || {}
          if (!utils.isEmptyObject(item)) {
            this.setData({
              item,
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