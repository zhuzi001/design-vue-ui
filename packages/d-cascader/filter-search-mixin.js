export default {
  props: {
    showSearch: {
      type: Boolean,
      default: false
    },
    optionFilterProp: {
      type: String,
      default: 'label'
    }
  },
  data () {
    return {
      allHidden: false
    }
  },
  methods: {
    onSearch (value) {
      // 给全局所有数据打上 $valueHidden 标识 代表着当前搜索的这个值需要隐藏
      this.allHidden = !this.fsFilterDeep(this.treeDataCopy, value)
      this.$forceUpdate()
    },
    fsFilterDeep (data, value, parentExist) {
      const { children } = this.fieldNames
      const searchProp = this.fieldNames[this.optionFilterProp]

      // 遍历数据并更新 $valueHidden
      data.forEach((element) => {
        const currentExist = parentExist || (element[searchProp] && element[searchProp].includes(value))
        if (element[children] && element[children].length > 0) {
          const childExist = this.fsFilterDeep(element[children], value, currentExist)
          element.$valueHidden = !(currentExist || childExist)
        } else {
          element.$valueHidden = !currentExist
        }
      })

      // 返回是否有可见的元素
      return data.some(element => !element.$valueHidden)
    }
  }
}
