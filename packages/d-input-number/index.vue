<template>
  <div
    class="xm_input_number"
    :class="{ xm_no_controls_input_number: !controls }"
  >
    <a-input
      :value="formattedValue"
      @input="inputChange"
      @blur="inputBlur"
      v-bind="$attrs"
    >
      <!-- 使用 v-for 循环渲染插槽内容 -->
      <template v-for="(item, key) in $slots" #[key]>
        <!-- {{key}} -->
        <slot :name="key"></slot>
      </template>
      <template #addonAfter>
        <span class="xm_hander_wrap" v-if="controls">
          <span
            class="up"
            @click="add"
            :class="{
              xm_input_number_handle_disabled:
                max && !(max > unformatValue(formattedValue)),
            }"
          >
            <a-icon type="up" />
          </span>
          <span
            class="down"
            @click="subtract"
            :class="{
              xm_input_number_handle_disabled:
                min && !(min < unformatValue(formattedValue)),
            }"
          >
            <a-icon type="down" />
          </span>
        </span>
        <span class="xm_addon" v-if="!!$slots.addonAfter || addonAfter">
          <slot name="addonAfter">
            {{ addonAfter }}
          </slot>
        </span>
      </template>
    </a-input>
  </div>
</template>
<script>
import { Input } from 'ant-design-vue'
import Props from './props'
export default {
  name: 'DInputNumber',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    AInput: Input
  },
  props: Props,
  data () {
    return {
      formattedValue: null
    }
  },
  created () {
    const propsDataKeys = Object.keys(this.$options.propsData || {})
    if (propsDataKeys.indexOf('value') !== -1) {
      this.emitValueByMaxOrMin(this.value)
    } else this.emitValueByMaxOrMin(this.defaultValue)
  },
  watch: {
    value: {
      handler (val) {
        this.formattedValue = this.formatValue(this.unformatValue(val))
      }
    }
  },
  computed: {
    isPassMin () {
      return this.min !== null && !(this.min < this.unformatValue(this.formattedValue))
    },
    isPassMax () {
      return this.max !== null && !(this.max > this.unformatValue(this.formattedValue))
    }
  },
  methods: {
    isConvertibleToNumber: (str) => !isNaN(Number(str)) && str.trim() !== '',
    formatValue (value) {
      if (!value && value !== 0) return ''
      return this.formatter
        ? this.formatter(!!value || value === 0 ? value : '')
        : value
    },
    unformatValue (value) {
      if (!value && value !== 0) return null
      // 移除任何非数字字符（只保留小数点）
      // eslint-disable-next-line no-useless-escape
      const _value = value.toString().replace(/[^\w\.-]+/g, '')
      if (!_value) return null
      return _value
    },
    formatNumber (value) {
      if (!value && value !== 0) return null
      // eslint-disable-next-line no-useless-escape
      const _value = value.toString().replace(/[^\d\.-]+/g, '')
      if (!_value || _value === '-') return null
      if (!this.precision && this.precision !== 0) return Number(_value)
      return Number(_value).toFixed(this.precision)
    },
    inputBlur (e) {
      this.emitValueByMaxOrMin(e.target.value)
    },
    inputChange (e) {
      this.emitValue(this.unformatValue(e.target.value))
      this.$nextTick(() => {
        e.target.value = this.formattedValue
      })
    },
    add () {
      const _value = this.unformatValue(this.formattedValue || 0)
      if (_value === this.max) return
      this.emitValueByMaxOrMin(_value + this.step)
    },
    subtract () {
      const _value = this.unformatValue(this.formattedValue || 0)
      if (_value === this.min) return
      this.emitValueByMaxOrMin(_value - this.step)
    },
    emitValueByMaxOrMin (value) {
      const min = this.min
      const max = this.max
      let _value = this.formatNumber(value)
      if (min !== null && _value < min) _value = min
      else if (max !== null && max < _value) _value = max
      this.formattedValue = this.formatValue(_value)
      this.$emit('change', _value)
    },
    emitValue (value) {
      this.formattedValue = this.formatValue(value)
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="less">
@import url("./index.less");
</style>
