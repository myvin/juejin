const WxParse = require('../../wxParse/wxParse.js')
const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    auth: {},
    img: '',
    free: true,
    price: 0,
    timeLimitDiscountFirstDay: 0,
  },
  onLoad(e) {
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    if (e.isFree === 'false') {
      let pages = getCurrentPages()
      let currentPage = pages[pages.length - 2]
      let author = currentPage.data.author
      this.setData({
        free: false,
        img: author.img,
        price: author.price,
        timeLimitDiscountFirstDay: author.timeLimitDiscountFirstDay || 0,
      })
      wx.setNavigationBarTitle({
        title: '购买小册',
      })
      return
    }
    this.getSection(e.id)
  },
  // 获取作者信息
  getSection(id) {
    wx.showLoading({
      title: '加载中',
    })
    let auth = this.data.auth
    wx.request({
      url: `${config.xiaoceCacheApiMs}/getSection`,
      data: {
        src: 'web',
        uid: auth.uid || '',
        client_id: auth.clientId,
        token: auth.token,
        sectionId: id,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          wx.hideLoading()
          let d = data.d
          if (!utils.isEmptyObject(d)) {
            // 设置 title 为小册标题
            wx.setNavigationBarTitle({
              title: d.title || '试读',
            })
            let article = (d.html) || ''
            WxParse.wxParse('article', 'html', article, this)
          }
        } else {
          if (data.s === 4) {
            wx.hideLoading()
          } else {
            wx.showToast({
              title: data.m.toString(),
              icon: 'none',
            })
          }
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