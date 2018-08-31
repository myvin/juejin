const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    auth: {},
    author: {},
    sections: [],
  },
  onLoad(e) {
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    let id = e.id
    this.getAuthorDetail(id)
    this.getXiaoceDetail(id)
  },
  toPersonal(e) {
    wx.navigateTo({
      url: `/pages/personal/personal?thirduid=${e.currentTarget.dataset.uid}`,
    })
  },
  // 获取作者信息
  getAuthorDetail(id) {
    let auth = this.data.auth
    wx.request({
      url: `${config.xiaoceCacheApiMs}/get`,
      data: {
        src: 'web',
        uid: auth.uid || '',
        client_id: auth.clientId,
        token: auth.token,
        id,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let author = data.d
          if (!utils.isEmptyObject(author)) {
            this.setData({
              author,
            })
          }
        } else {
          if (data.s === 2) {
            // no result
            this.setData({
              noResult: true,
            })
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
  // 获取小册详情
  getXiaoceDetail(id) {
    let auth = this.data.auth
    wx.request({
      url: `${config.xiaoceCacheApiMs}/getListSection`,
      data: {
        src: 'web',
        uid: auth.uid || '',
        client_id: auth.clientId,
        token: auth.token,
        id,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let sections = data.d
          if (!utils.isEmptyObject(sections)) {
            this.setData({
              sections,
            })
          }
        } else {
          if (data.s === 2) {
            // no result
            this.setData({
              noResult: true,
            })
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