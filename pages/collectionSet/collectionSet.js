const config = getApp().globalData.config
const utils = require('../../utils/utils.js')
Page({
  data: {
    listUser: [],
    listFollowed: [],
    auth: {},
    page: 0,
    thirduid: '',
    currentSwiper: '0',
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
    this.getUserCollectionSet()
    this.getFollowedCollectionSet()
  },
  switchSwiper (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentSwiper: parseInt(index),
    })
  },
  swiperChanged (e) {
    this.setData({
      currentSwiper: e.detail.currentItemId,
    })
  },
  // 用户创建的收藏集
  getUserCollectionSet() {
    const auth = this.data.auth
    wx.request({
      url: `${config.collectionSetMsRequestUrl}/getUserCollectionSet`,
      data: {
        src: 'web',
        userId: auth.uid || '',
        clientId: auth.clientId,
        token: auth.token || '',
        page: this.data.page,
        targetUserId: this.data.thirduid || auth.uid,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let listUser = (data.d && data.d.collectionSets) || []
          this.setData({
            listUser: this.data.listUser.concat(listUser),
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
  // 用户关注的收藏集
  getFollowedCollectionSet() {
    const auth = this.data.auth
    wx.request({
      url: `${config.collectionSetMsRequestUrl}/getFollowedCollectionSet`,
      data: {
        src: 'web',
        userId: auth.uid || '',
        clientId: auth.clientId,
        token: auth.token || '',
        page: this.data.page,
        targetUserId: this.data.thirduid || auth.uid,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let listFollowed = (data.d && data.d.collectionSets) || []
          this.setData({
            listFollowed: this.data.listFollowed.concat(listFollowed),
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
  scrolltolower () {
    console.log('scrolltolower')
  },
})