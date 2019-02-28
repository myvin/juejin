let utils = require('../../utils/utils')
Component({
  properties: {
    img: {
      type: String,
      value: '/img/logo_gray.png',
    },
    imgWidth: {
      type: Number,
      value: 150
    },
    imgHeight: {
      type: Number,
      value: 120
    },
    tip: {
      type: String,
      value: '这里空空的什么都没有呢...',
    },
  },
})