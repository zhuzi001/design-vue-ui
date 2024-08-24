<template>
  <div class="xm_textarea">
    <a-textarea
      v-model.trim="txtValue"
      @input="inputBlur"
      @blur="inputBlur"
      :placeholder="placeholder"
      :maxLength="len"
      :auto-size="autoSize"
      v-bind="$attrs"
      :style="{'resize': resizeNone ? 'none' : 'vertical'}"
    />
    <span class="xm_text_len" :class="{ xm_text_outside_len: outside }">
      {{ txtValue.length }} / {{ len }}
    </span>
  </div>
</template>
<script>
import { Input } from 'ant-design-vue'
export default {
  name: 'DTextarea',
  model: {
    prop: 'value',
    event: 'blur'
  },
  components: {
    ATextarea: Input.TextArea
  },
  props: {
    resizeNone: {
      type: Boolean,
      default: false
    },
    len: {
      type: Number,
      default: 255
    },
    autoSize: {
      type: Object,
      default: () => {
        return { minRows: 3, maxRows: 4 }
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    outside: {
      type: Boolean,
      default: false
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
      this.$emit('blur', e.target.value)
    }
  }
}
</script>
<style lang="less" scoped>
.xm_textarea {
  position: relative;
  .xm_text_len {
    position: absolute;
    right: 10px;
    bottom: 0px;
    color: rgba(0, 0, 0, 0.25);
  }
  .xm_text_outside_len {
    position: relative;
    float: right;
  }
}
</style>
