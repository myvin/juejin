Page({
  data: {
    projectAddress: 'https://github.com/myvin/juejin',
    github: 'https://github.com/myvin',
    email: '851399101@qq.com',
    qq: '851399101',
  },
  copy(e) {
    let dataset = (e.currentTarget || {}).dataset || {}
    let title = dataset.title || ''
    let content = dataset.content || ''
    wx.setClipboardData({
      data: content,
      success() {
        wx.showToast({
          title: `已复制${title}`,
          duration: 2000,
        })
      },
    })
  },
})