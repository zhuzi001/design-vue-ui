/**
 * 1. 控制开始 event 和 结束 event
 * 2. 同时 event 处理 isOpen 状态
 */
export default {
  data () {
    return {
      isOpen: false, // 控制面板是否打开，select组件选择后会自动关闭，需要手动控制
      timer: null
    }
  },
  beforeDestroy () {
    this.handleClosePanel()
  },
  methods: {
    onFocus () {
      if (this.isOpen) return
      this.isOpen = true
      // 开始监听
      this.startEvent()
      this.checkElementBounds()
    },
    closePanel (e) {
      if (e && this.$refs.dropdown && !this.$refs.dropdown.contains(e.target)) {
        this.handleClosePanel()
      }
    },
    handleClosePanel () {
      this.isOpen = false
      this.timer && clearTimeout(this.timer)
      document.removeEventListener('click', this.closePanel)
      this.allowResize && window.removeEventListener('resize', this.checkElementBounds)
    },
    startEvent () {
      document.addEventListener('click', this.closePanel)
      this.allowResize && window.addEventListener('resize', this.checkElementBounds)
    },
    checkElementBounds () {
      if (!this.allowResize) return
      setTimeout(() => {
        this.timer && clearTimeout(this.timer)
        this.timer = this.hanldleGBLeft()
      }, 0)
    },
    hanldleGBLeft () {
      this.$nextTick(() => {
        const childElement = this.$refs.panelRef
        const pElement = this.$refs.dropdown
        const isChild = !!pElement.querySelector('.ant-select-dropdown') // 判断面板是否在当前组件内部
        if (!childElement) return
        const element = childElement?.parentNode
        const rect = element.getBoundingClientRect()
        const pRect = pElement.getBoundingClientRect()
        const _w = rect.right + (pRect.left - rect.left) // 相当于 right 的距离 + 选择框和面板左边之差 （选择框 >= 面板左边 ）
        const _left = isChild ? 0 : pRect.left // 在组件内部 使用 组件的left   在组件外面
        if (_w > window.innerWidth) {
          element.style.marginLeft = _left - (_w - window.innerWidth) + 'px'
        } else {
          element.style.marginLeft = _left + 'px'
        }
      })
    }
  }
}
