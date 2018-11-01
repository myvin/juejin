Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
    // 默认显示摘要，不显示全文
    intro: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    toPersonal(e) {
      let item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/personal/personal?thirduid=${item.user.objectId}`,
      })
    },
    toFeidianDetail (e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/feidianDetail/feidianDetail?msgId=${id}`,
      })
    },
  },
})