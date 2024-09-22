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
    },
    loadData: {
      type: Function
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
      console.log('this.optionsArr', this.optionsArr.length)
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
    async onChange (val, index) {
      const { value, children } = this.$attrs.fieldNames
      // option 处理
      this.optionsArr = this.optionsArr.slice(0, index + 1)
      const childObj = this.optionsArr[index].find((v) => v[value] === val)

      const child = childObj && childObj[children] ? childObj[children] : []

      if ((!this.maxLevel || this.maxLevel > this.optionsArr.length)) {
        if (this.loadData) this.optionsArr.splice(index + 1, 1, await this.loadData(val, childObj))
        else if (child) this.optionsArr[index + 1] = child
      }
      console.log(this.optionsArr.length)
      this.currentValueArr = this.currentValueArr.slice(0, index + 1)
      this.currentValueArr[index] = val
      this.$emit('change', this.currentValueArr, index)
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
