Page({
  data: {
    userInfo: {
      username: 'myvin',
      postedEntriesCount: 0,
      totalCollectionsCount: 0,
      totalViewsCount: 0,
      totalCommentsCount: 0,
    },
  },
  onLoad (query) {
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    let userInfo = prevPage.data.userInfo || {}
    this.setData({
      userInfo: {
        username: userInfo.username,
        postedEntriesCount: 0,
        totalCollectionsCount: this.generateZeroArr(userInfo.totalCollectionsCount.length),
        totalViewsCount: this.generateZeroArr(userInfo.totalViewsCount && userInfo.totalViewsCount.length),
        totalCommentsCount: this.generateZeroArr(userInfo.totalCommentsCount.length),
      },
    })
    // 延迟触发数字滚动动画
    let timer = setTimeout(() => {
      this.setData({
        userInfo,
      })
      clearTimeout(timer)
    }, 200)
  },
  // 按照长度生成 0 字符串
  generateZeroArr (len) {
    Array.apply(null, Array(len)).map(function (item, i) {
      return 0
    })
  },
})