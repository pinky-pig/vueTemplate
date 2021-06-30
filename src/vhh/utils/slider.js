class Slider {
  /**
   * @param {*} itemWidth 滑块大小
   * @param {*} size 滑块数量
   * @param {*} windowWidth 滑动窗口大小
   * @param {*} step 步进 (每次滑动距离为 step 个滑块的距离)
   */
  constructor({cursor = 0, itemWidth, size, windowWidth, step = 1}) {
    this.cursor = cursor
    this.itemWidth = itemWidth
    this.size = size
    this.windowWidth = windowWidth
    // 步进
    this.step = step

    // item 对齐哪一边, 0: left, 1: right, -1: 非对齐状态
    this.alignSide = 0
  }

  get windowWidth() {
    return this.windowWidth_
  }

  // 窗口宽度动态调整时, 需要修正 cursor 值 (替代方案: 可以直接重新创建一个 slider 对象)
  set windowWidth(val) {
    this.windowWidth_ = val

    // TODO: 调整 cursor 值
    if(this.cursor > this.maxCursor) {
      this.cursor = this.maxCursor
      this.alignSide = 1
    }
  }

  get totalWidth() {
    return this.itemWidth * this.size
  }

  // 最大滑动距离 = 总宽度 - 滑动窗口宽度
  get maxSlideDistance() {
    return this.totalWidth - this.windowWidth
  }

  // 滑动游标 (注意滑块宽度与窗口宽度不整除的情况, 取上沿)
  get maxCursor() {
    return Math.ceil(this.maxSlideDistance / this.itemWidth)
  }

  // 偏移(宽度)
  get offset() {
    // 左侧触底后的滑动
    if(this.alignSide === 0) {
      return this.cursor * this.itemWidth
    } else {
      // 右侧触底后的滑动
      return this.maxSlideDistance - (this.maxCursor - this.cursor) * this.itemWidth
    }
  }

  prev() {
    // 已达到最小值, 立即返回
    if(this.cursor === 0) {
      return
    }
    // 避免越界
    let cursor = Math.max((this.cursor - this.step), 0)

    // 离触底还有一小段距离, 直接滑到底
    if(cursor === 1) {
      cursor--
    }

    this.cursor = cursor

    // 触底换边
    this.alignSide = -1
    if(this.cursor === 0) {
      this.alignSide = 0
    }
  }

  next() {
    // 已达到最大值, 立即返回
    if(this.cursor === this.maxCursor) {
      return
    }
    // 避免越界
    let cursor = Math.min((this.cursor + this.step), this.maxCursor)

    // 离触底还有一小段距离, 直接滑到底
    if(cursor === this.maxCursor - 1) {
      cursor++
    }

    this.cursor = cursor

    // 触底换边
    this.alignSide = -1
    if(this.cursor === this.maxCursor) {
      this.alignSide = 1
    }
  }
}

export default Slider
