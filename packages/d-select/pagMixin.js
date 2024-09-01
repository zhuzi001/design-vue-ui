
export default {
  props: {
    /** current, pageSize 等 */
    pag: {
      type: Object
    },
    total: {
      type: Number
    },
    pageType: {
      type: String,
      default: 'pagination'
    }
  },
  data () {
    return {
      filterTotal: 0,
      pagBind: {
        current: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    pagTotal () {
    //   if (this.groups.length) return this.groups.reduce((sum, item) => sum + (item.options ? item.options.length : 0), 0)
      return this.resultOptions.length
    }
  },
  watch: {
    pag: {
      handler (v) {
        this.pagBind = v || {}
      },
      immediate: true
    }
  },
  created () {
  },
  methods: {
    pagFilterOptions () {
      const { current, pageSize } = this.pagBind
      let start = (current - 1) * pageSize
      const end = current * pageSize
      if (this.pageType === 'scroll')start = 0
      return this.resultOptions.slice(start, end)
    },
    pagSearch (value) {
      this.filterTotal = 0
    },
    pagChange (page, pageSize) {
      // 开发人员不想自己修改
      this.pagBind.current = page
      this.pagBind.pageSize = pageSize
      this.$emit('update:pag',
        {
          ...this.pag,
          pageSize: pageSize,
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
      if (rmHeight === 0 && clHeight === 0) {
        this.pagBind.current = 1
      } else {
        if (rmHeight - 5 < clHeight) {
          if (this.resultOptions.length < current * pageSize) return
          this.pagBind.current++
        }
      }
    }
  }
}
