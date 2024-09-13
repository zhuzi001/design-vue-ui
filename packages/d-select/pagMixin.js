
export default {
  props: {
    /** current, pageSize 等 */
    pag: {
      type: Object
    },
    total: {
      type: Number,
      default: 0
    },
    pageType: {
      type: String,
      default: '' // pagination scroll
    },
    loadData: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      pagBind: null
    }
  },
  computed: {
    pagTotal () {
    //   if (this.groups.length) return this.groups.reduce((sum, item) => sum + (item.options ? item.options.length : 0), 0)
      return this.total || this.resultOptions.length
    }
  },
  watch: {
    pag: {
      handler (v) {
        this.initPag()
      },
      immediate: true
    }
  },
  created () {
    this.initPag()
  },
  methods: {
    initPag () {
      const _pag = this.pag || {}
      this.pagBind = {
        current: 1,
        pageSize: 10,
        ..._pag
      }
    },
    pagSearch () {
      // 重置 页码
      this.initPag()
    },
    pagFilterOptions () {
      if (this.pageType === 'paginationRemote') return this.resultOptions
      const { current, pageSize } = this.pagBind
      let start = (current - 1) * pageSize
      let end = current * pageSize
      if (this.pageType === 'scroll') {
        start = 0
        if (this.loadData) end = this.total
      }

      return this.resultOptions.slice(start, end)
    },
    pagChange (page, pageSize) {
      // 开发人员不想自己修改
      this.pagBind.current = page
      this.pagBind.pageSize = pageSize
      this.$emit('update:pag',
        {
          ...this.pag,
          pageSize,
          current: page
        }
      )
      this.$emit('pagChange', page, pageSize)
    },
    handlePagScroll (e) {
      if (this.pageType !== 'scroll') return
      const { target } = e
      const rmHeight = target.scrollHeight - target.scrollTop
      const clHeight = target.clientHeight
      const { current, pageSize } = this.pagBind
      // 当下拉框失焦的时候，也就是不下拉的时候
      if (!(rmHeight === 0 && clHeight === 0) && rmHeight - 5 < clHeight) {
        if (this.options.length > current * pageSize) this.pagBind.current++
        this.loadData && this.loadData()
      }
    }
  }
}
