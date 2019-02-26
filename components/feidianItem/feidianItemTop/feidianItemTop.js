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
  data: {
    actor: {},
    target: {},
  },
  attached() {
    const node = ((this.data.item || {}).node) || null
    if (node) {
      this.setData({
        actor: node.actors[0],
        target: node.targets[0],
      })
    }
  },
  methods: {
    preview (e) {
      let dataset = e.currentTarget.dataset
      let urls = dataset.urls
      let index = dataset.index
      wx.previewImage({
        urls,
        current: urls[index],
      })
    },
    toPersonal(e) {
      let actor = e.currentTarget.dataset.actor
      wx.navigateTo({
        url: `/pages/personal/personal?thirduid=${actor.id}`,
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