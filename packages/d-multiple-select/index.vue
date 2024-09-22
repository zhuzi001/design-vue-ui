<template>
  <div class="xm_multiple_select">
    <d-select
      v-for="(item, index) in currentLevel"
      :key="item"
      v-bind="$attrs"
      :options="optionsArr[index]"
      v-on="filteredListeners"
      mode="default"
      :value="currentValueArr[index]"
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
    }
  },
  computed: {
    currentLevel () {
      const arrLen = this.optionsArr.length
      const level = this.defaultLevel
      return arrLen > (level || 0) ? arrLen : level
    },
    filteredListeners () {
      // 过滤掉 'change' 事件
      const { change, ...rest } = this.$listeners
      return rest
    }
  },
  methods: {
    onChange (val, index) {
      const { value, children } = this.$attrs.fieldNames
      // option 处理
      this.optionsArr = this.optionsArr.slice(0, index + 1)
      const child = this.optionsArr[index].find((v) => v[value] === val)[
        children
      ]

      child &&
        (!this.maxLevel || this.maxLevel > this.optionsArr.length) &&
        (this.optionsArr[index + 1] = child)
      this.currentValueArr = this.currentValueArr.slice(0, index + 1)
      this.currentValueArr[index] = val
      this.$emit('change', this.currentValueArr)
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
