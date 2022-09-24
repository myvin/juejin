const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    item: [],
  },
  onLoad(query) {
    if (query && query.msgId) {
      const msgId = query && query.msgId
      this.getById(msgId)
    }
  },
  getById(msgId) {
    wx.request({
      url: `https://api.juejin.cn/content_api/v1/short_msg/detail?aid=2608&uuid=${utils.getUuid()}&spider=0`,
      method: 'POST',
      data: {
        msg_id: msgId,
      },
      success: (res) => {
        let data = res.data
        if (data.err_no === 0) {
          let item = data.data || {}
          if (!utils.isEmptyObject(item)) {
            this.setData({
              item,
            })
            wx.setNavigationBarTitle({
              title: item.msg_Info.content || '沸点详情',
            })
          }
        } else {
          wx.showToast({
            title: data.err_msg,
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