
export default {
  props: {
    /** current, pageSize 等 */
    pag: {
      type: Object
    },
    total: {
      type: Number
    }
  },
  data () {
    return {
      filterTotal: 0,
      pagBind: {}
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
      const start = (current - 1) * pageSize
      const end = current * pageSize
      console.log(this.resultOptions.slice(start, end), 'sdaf')
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
    }
  }
}
