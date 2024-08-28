<template>
  <div class="xm_input">
    <a-input
      v-model.trim="txtValue"
      @input="inputBlur"
      @blur="inputBlur"
      v-bind="$attrs"
      :maxLength="len || null"
    />
    <span class="xm_text_len" v-if="len">
      {{ txtValue.length }} / {{ len }}
    </span>
  </div>
</template>
<script>
import { Input } from 'ant-design-vue'
export default {
  name: 'DInput',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    AInput: Input
  },
  props: {
    len: {
      type: Number,
      default: 0
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      txtValue: ''
    }
  },
  watch: {
    value (val) {
      this.txtValue = val
    }
  },
  created () {
    this.txtValue = this.value
  },
  methods: {
    inputBlur (e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>
<style lang="less" scoped>
.xm_input {
  position: relative;
  .xm_text_len {
    position: absolute;
    display: flex;
    align-items: center;
    right: 10px;
    top: 0;
    height: 100%;
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>
