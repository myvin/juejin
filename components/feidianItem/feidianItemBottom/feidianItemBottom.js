Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
  },
  data: {
    target: {},
  },
  attached() {
    const node = this.data.item.node
    this.setData({
      target: node.targets[0],
    })
  },
})