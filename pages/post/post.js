const WxParse = require('../../wxParse/wxParse.js')
const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    postInfo: {},
    auth: '',
    t: '',
  },
  onLoad(query) {
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    let t = query.type
    let id = query.id
    this.setData({
      t,
    })
    if (t === 'post') {
      this.getDetailData(query.id, 1)
      this.getDetailData(query.id, 2)
    } else {
      this.getEntryView(id)
      this.getEntryByIds(id)
    }
  },
  toPersonal () {
    wx.navigateTo({
      url: `/pages/personal/personal?thirduid=${this.data.postInfo.user.objectId}`,
    })
  },
  // 获取 post 概要、详情
  getDetailData(postId, t) {
    const auth = this.data.auth
    wx.request({
      url: `${config.postStorageApiMsRequestUrl}/getDetailData`,
      data: {
        uid: auth.uid,
        device_id: auth.clientId,
        token: auth.token,
        src: 'web',
        type: t === 1 ? 'entryView' : 'entry',
        postId,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          if (t === 1) {
            let article = (data.d && data.d.content) || ''
            WxParse.wxParse('article', 'html', article, this)
          } else {
            this.setData({
              postInfo: data.d || {},
            })
            wx.setNavigationBarTitle({
              title: (data.d && data.d.user && data.d.user.username) || '掘金'
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
  // 获取 entry 详情
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
  // 获取 entry 概要
  getEntryByIds(entryId) {
    const auth = this.data.auth
    wx.request({
      url: `${config.timelineRequestUrl}/get_entry_by_ids`,
      data: {
        uid: auth.uid,
        device_id: auth.clientId,
        token: auth.token,
        src: 'web',
        entryIds: entryId,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let entrylist = (data.d && data.d.entrylist) || []
          this.setData({
            postInfo: entrylist[0] || {},
          })
          wx.setNavigationBarTitle({
            title: (entrylist[0].user && entrylist[0].user.username) || '掘金'
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
  onShareAppMessage(res) {
    return {}
  },
})