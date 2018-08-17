Page({
  data: {
    miniqrcode: 'https://raw.githubusercontent.com/myvin/miniprogram/master/juejin/images/miniqrcode.jpg',
  },
  previewImages (e) {
    wx.previewImage({
      urls: [this.data.miniqrcode],
      success: function (res) { },
      fail: function (res) {
        console.error('previewImage fail: ', res)
      }
    })
  },
})