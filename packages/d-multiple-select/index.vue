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
      @focus="handleSelectFocus(index)"
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
    renderValue: {
      type: [Array]
    },
    endValid: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      optionsArr: [],
      currentValueArr: [],
      isChangeUpdate: false
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
        this.updateOptionsArray(val)
      },
      immediate: true
    }
  },
  computed: {
    /**
     * 当前需要显示的级数
     * 1. 默认显示 level 个选择框，如果 level 为 0，则显示所有选择框
     * 2. 如果 focus 下加载数据，需要 + 1 ， 但不得超过 最大级联数
     * 3. 常规取 默认显示数 和 实际长度的最大值
     * @return {Number}
     */
    currentLevel () {
      const { loadMode, maxLevel, optionsArr, defaultLevel, currentValueArr } =
        this

      // 允许聚焦则计算当前值数组长度加1，否则使用选项数组长度
      const arrLen =
        loadMode !== 'change' ? currentValueArr.length + 1 : optionsArr.length

      // 返回当前级别
      if (maxLevel && arrLen > maxLevel) return maxLevel
      return arrLen > (defaultLevel || 0) ? arrLen : defaultLevel
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
    updateOptionsArray (val) {
      let _options = this.options
      const { renderValue, isChangeUpdate, endValid } = this
      if (renderValue && renderValue.join('') !== val.join('')) return
      if (endValid && isChangeUpdate) {
        this.isChangeUpdate = false
        if (!val.length) return
      }
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

        const previousValue = this.attrsBooleanIsTrue(this.$attrs.labelInValue)
          ? val[index - 1].key
          : val[index - 1]
        const option =
          _options.find((v) => v[this.fieldNames.value] === previousValue) ||
          []

        _options = option[this.fieldNames.children] || []
        return _options
      })
    },

    async handleSelectFocus (index) {
      // 提前返回，如果 loadMode 为 'change' 或选项已存在
      if (this.loadMode === 'change' || this.optionsArr[index]?.length) return
      // 确保 currentValueArr 的长度足够
      if (this.currentValueArr.length <= index) return

      // 删除现有选项
      if (this.optionsArr[index]) {
        this.optionsArr.splice(index, this.optionsArr.length)
      }

      // 加载新数据并替换
      const newData = await this.loadData({
        option: null,
        index,
        val: this.currentValueArr,
        loadMode: 'focus'
      })

      this.optionsArr.splice(index, 0, newData)
      this.$emit('focus', this.currentValueArr, index)
    },
    attrsBooleanIsTrue (attr) {
      return attr !== undefined && attr !== false && attr !== 0
    },
    isMaxLevel (index, child) {
      return (this.maxLevel || 0) === this.optionsArr.length || !child?.length
    },
    async onChange (val, index) {
      const { value, children } = this.fieldNames
      const labelInValue = this.attrsBooleanIsTrue(this.$attrs.labelInValue)
      // 点击后 当前列表截断后面的
      this.optionsArr.splice(index + 1, this.optionsArr.length)
      // 切片并更新当前值
      this.currentValueArr = [...this.currentValueArr.slice(0, index), val]

      // 查找子选项
      const option = this.optionsArr[index].find((v) =>
        labelInValue ? v[value] === val.key : v[value] === val
      )
      const child = option ? option[children] : []

      // 发送更新事件
      if (this.renderValue) {
        this.$emit('update:renderValue', this.currentValueArr)
      }

      // 发送变化事件
      await this.$nextTick()

      // renderValue （校验场景下的某种实现方式），未启用 renderValue 时，直接发送当前值
      // 启用 renderValue 时，如果当前级别已经到了最大级别，则发送当前值
      const shouldEmitCurrent =
        !this.renderValue ||
        (this.renderValue && this.isMaxLevel(index, child))
      // endValid（校验场景下的某种实现方式），未启用 renderValue 时，直接发送当前值
      // endValid（校验场景下的某种实现方式），启用 endValid 时，如果当前级别已经到了最大级别，则发送当前值
      const _endValid =
        !this.endValid || (this.endValid && this.isMaxLevel(index, child))
      // 与 endValid 共同使用检验是否结束
      this.isChangeUpdate = true
      this.$emit(
        'change',
        shouldEmitCurrent && _endValid ? this.currentValueArr : [],
        index
      )
      // 是否级别已经是最大的了（ maxLevel 未设置默认无限增加，全量数据根据 children 判断最后的级别长度）
      const isLevelFull =
        !this.maxLevel || this.maxLevel > this.optionsArr.length
      // 处理加载或添加子选项
      if (isLevelFull) {
        if (this.loadData) {
          if (this.loadMode !== 'focus') {
            this.optionsArr.splice(
              index + 1,
              1,
              await this.loadData({
                option,
                index,
                val: this.currentValueArr,
                loadMode: 'change'
              })
            )
          }
        } else if (child?.length) {
          this.optionsArr.splice(index + 1, 1, child)
        }
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
