const WxParse = require('../../wxParse/wxParse.js')
const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    detail: {},
  },
  onLoad(e) {
    let id = e.id
    this.getXiaoceDetail(id)
  },
  toPersonal(e) {
    wx.navigateTo({
      url: `/pages/personal/personal?thirduid=${e.currentTarget.dataset.uid}`,
    })
  },
  toProbation (e) {
    let dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/probation/probation?section_id=${dataset.section_id}`,
    })
  },
  // 获取小册详情
  getXiaoceDetail(id) {
    wx.request({
      url: `https://api.juejin.cn/booklet_api/v1/booklet/get?aid=2608&uuid=${utils.getUuid()}&spider=0`,
      method: 'POST',
      data: {
        booklet_id: id,
      },
      success: (res) => {
        let data = res.data
        if (data.err_no === 0) {
          data = data.data
          wx.setNavigationBarTitle({
            title: data.booklet.base_info.title || '小册',
          })
          WxParse.wxParse('article', 'html', data.introduction.content, this)

          let sections = data.sections
          if (!utils.isEmptyObject(sections)) {
            this.setData({
              detail: data,
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
      complete: () => {
        wx.stopPullDownRefresh()
      },
    })
  },
})