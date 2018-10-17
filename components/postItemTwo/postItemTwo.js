let utils = require('../../utils/utils.js')
Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
  },
  methods: {
    toPostDetail(e) {
      utils.toPostDetail(e)
    },
    toPersonal(e) {
      let item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/personal/personal?thirduid=${item.user.objectId}`,
      })
    },
  },
})