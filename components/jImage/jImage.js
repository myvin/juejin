Component({
  properties: {
    src: {
      type: String,
      value: '',
      observer: function (newVal) {
        this.setSrc(newVal)
      }
    },
  },
  attached: function () {
    this.setSrc(this.data.src)
  },
  methods: {
    setSrc (src) {
      const imgSrc = `${getApp().globalData.imageServer}?url=${src}`
      this.setData({
        imgSrc,
      })
    }
  },
})