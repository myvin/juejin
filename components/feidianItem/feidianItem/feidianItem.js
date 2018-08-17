Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
  },
  methods: {
    toPostDetail(e) {
      wx.navigateTo({
        url: `/pages/post/post?id=${e.currentTarget.dataset.id}`,
      })
    },
  },
})