let utils = require('../../utils/utils.js')
Component({
  properties: {
    item: {
      type: Object,
      value: {}
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