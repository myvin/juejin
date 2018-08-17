Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
  },
  methods: {
    toTagDetail(e) {
      wx.navigateTo({
        url: `/pages/post/post?id=${e.currentTarget.dataset.id}`,
      })
    },
  },
})