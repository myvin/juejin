let utils = require('../../utils/utils.js')
Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
    avatar: {
      type: String,
      value: '/img/default_avatar.png'
    },
    userName: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    briefContent: {
      type: String,
      value: ''
    },
    coverImage: {
      type: String,
      value: ''
    },
    likeCount: {
      type: Number,
      value: ''
    },
    commentCount: {
      type: Number,
      value: ''
    },
    tags: {
      type: Array,
      value: []
    }
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