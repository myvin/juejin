Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
  },
  methods: {
    toFeidianDetail (e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/feidianDetail/feidianDetail?msgId=${id}`,
      })
    },
  },
})