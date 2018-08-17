let utils = require('../../utils/utils.js')
Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
    graphics: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    toPostDetail(e) {
      utils.toPostDetail(e)
    },
  },
})