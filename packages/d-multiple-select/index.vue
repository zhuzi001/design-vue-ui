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
      type: Number,
      default: 1 // 默认显示几个选择框
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
        console.log('信的options', val)
        this.optionsArr = [val]
      },
      immediate: true
    }
  },
  computed: {
    currentLevel () {
      return this.defaultLevel
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
      const child = this.optionsArr[index].find((v) => v[value] === val)[children]
      child && (this.optionsArr[index + 1] = child)
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
