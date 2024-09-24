<template>
  <div class="xm_multiple_select">
    <d-select
      v-for="(item, index) in currentLevel"
      :key="item"
      v-bind="$attrs"
      :options="optionsArr[index]"
      v-on="filteredListeners(index)"
      mode="default"
      :value="currentValueArr[index]"
      @focus="selectFocus(index)"
      :fieldNames="fieldNames"
      :searchLoading="!optionsArr[index] && index === currentValueArr.length"
      @change="onChange($event, index)"
    >
    </d-select>
  </div>
</template>
<script>
import DSelect from '../d-select'
export default {
  name: 'DMultipleSelect',
  components: {
    DSelect
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    fieldNames: {
      type: Object,
      default: () => {
        return { label: 'label', value: 'value', children: 'children' }
      }
    },
    value: {
      type: [Array]
    },
    defaultLevel: {
      type: Number, // 默认显示几个选择框
      default: 1
    },
    maxLevel: {
      type: Number
    },
    options: {
      type: Array,
      default: () => []
    },
    loadData: {
      type: Function
    },
    loadMode: {
      type: String,
      default: 'change' // 'change' || 'focus' || 'all'
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      optionsArr: [],
      currentValueArr: []
    }
  },
  watch: {
    options: {
      handler (val) {
        this.optionsArr = [val]
      },
      immediate: true
    },
    value: {
      handler (val) {
        this.handleValue(val)
      },
      immediate: true
    }
  },
  computed: {
    currentLevel () {
      const arrLen = this.optionsArr.length
      const level = this.defaultLevel
      return arrLen > (level || 0) ? arrLen : level
    },
    filteredListeners () {
      // 过滤掉 'change' 'focus' 事件
      const { change, focus, ...rest } = this.$listeners
      return (index) => {
        return Object.keys(rest).reduce((acc, key) => {
          acc[key] = (...event) => {
            rest[key](...event, index) // 将 event 和 index 传递给原始处理函数
          }
          return acc
        }, {})
      }
    }
  },
  methods: {
    handleValue (val) {
      let _options = this.options

      // 清空值时重置状态
      if (!val || !val.length) {
        this.currentValueArr = []
        this.optionsArr = [_options]
        return
      }

      // 如果当前值与新值相同，则不进行处理
      const newValueJoined = val.join('')
      const currentValueJoined = this.currentValueArr.join('')
      if (newValueJoined === currentValueJoined) return

      // 更新当前值
      this.currentValueArr = val

      // 当只有一个值时，重置 optionsArr
      if (val.length === 1) {
        this.optionsArr = [_options]
        return
      }

      // 根据当前值更新 optionsArr
      this.optionsArr = val.map((item, index) => {
        if (index === 0) return _options

        const previousValue = this.attrsBooleanIsTrue(this.$attrs.labelInValue) ? val[index - 1].key : val[index - 1]
        const option =
          _options.find(
            (v) => v[this.fieldNames.value] === previousValue
          ) || []

        _options = option[this.fieldNames.children] || []
        return _options
      })
    },

    async selectFocus (index) {
      if (this.loadMode === 'change') return
      if (this.optionsArr[index]) return
      if (this.currentValueArr.length < index) return []
      this.optionsArr.splice(
        index,
        1,
        await this.loadData({
          option: null,
          index,
          val: this.currentValueArr,
          loadMode: 'focus'
        })
      )
      this.$emit('focus', this.currentValueArr, index)
    },
    isLevelFull () {
      return !this.maxLevel || this.maxLevel > this.optionsArr.length
    },
    attrsBooleanIsTrue (attr) {
      return attr !== undefined && attr !== false && attr !== 0
    },
    async onChange (val, index) {
      const { value, children } = this.fieldNames
      // option 处理
      this.optionsArr = this.optionsArr.slice(0, index + 1)
      const labelInValue = this.attrsBooleanIsTrue(this.$attrs.labelInValue)

      const childObj = this.optionsArr[index].find((v) => labelInValue ? v[value] === val.key : v[value] === val)
      const child = childObj && childObj[children] ? childObj[children] : []
      this.currentValueArr = this.currentValueArr.slice(0, index + 1)
      this.currentValueArr[index] = val
      if (!this.isEnd || (this.isEnd && !this.isLevelFull())) { this.$emit('change', this.currentValueArr, index) }

      if (this.isLevelFull()) {
        if (this.loadData) {
          this.loadMode !== 'focus' &&
            this.optionsArr.splice(
              index + 1,
              1,
              await this.loadData({
                option: childObj,
                index,
                val: this.currentValueArr,
                loadMode: 'change'
              })
            )
        } else if (child.length) this.optionsArr[index + 1] = child
        console.log(child)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.xm_multiple_select {
  width: 100%;
  display: inline-flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
</style>
