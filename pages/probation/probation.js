const WxParse = require('../../wxParse/wxParse.js')
const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    section: {},
  },
  onLoad(e) {
    this.getSection(e.section_id)
  },
  // 获取作者信息
  getSection(id) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `https://api.juejin.cn/booklet_api/v1/section/get?aid=2608&uuid=${utils.getUuid()}&spider=0`,
      method: 'POST',
      data: {
        section_id: id,
      },
      success: (res) => {
        let data = res.data
        if (data.err_no === 0) {
          wx.hideLoading()
          data = data.data
          this.setData({
            section: data.section || {},
          })
          wx.setNavigationBarTitle({
            title: data.section.draft_title || '试读',
          })
          WxParse.wxParse('article', 'html', (data.section.content) || '', this)
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
      complete: () => {
        wx.stopPullDownRefresh()
      },
    })
  },
})