Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
  },
  methods: {
    toXiaoceDetail(e) {
      wx.navigateTo({
        url: `/pages/xiaocedetail/xiaocedetail?id=${e.currentTarget.dataset.id}`,
      })
    },
  },
})