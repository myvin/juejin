Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
  },
  methods: {
    toXiaoceDetail(e) {
      console.log('to xiaoce detail')
      // wx.navigateTo({
      //   url: `/pages/post/post?id=${e.currentTarget.dataset.id}`,
      // })
    },
  },
})