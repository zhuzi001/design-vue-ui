export default {
  props: {
    groups: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  methods: {
    gHandleValue (gVal) {
      return this.getValue(gVal, (filterData) => {
        return this.groups.flatMap((group) => filterData(group.options || []))
      })
    },
    gHandleOptions (filterBySearch) {
      return this.groups
        .map((group) => {
          // 过滤 group 的 options
          const filteredOptions = group.options
            ? group.options.filter((option) => filterBySearch(option))
            : []

          // 仅返回有匹配 options 的 group
          if (filteredOptions.length > 0 || filterBySearch(group, 'label')) {
            return {
              ...group,
              options: filteredOptions
            }
          }

          return null
        })
        .filter((group) => group !== null) // 去掉 null 值
    },
    gGetGroups () {
      return this.groups
    }
  }
}
