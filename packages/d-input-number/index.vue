<template>
  <div class="xm_input_number">
    <a-input
      v-model.trim="txtValue"
      @input="inputBlur"
      @blur="inputBlur"
      :placeholder="placeholder"
      v-bind="$attrs"
      type="number"
    >
      <!-- 使用 v-for 循环渲染插槽内容 -->
      <template v-for="(item, key) in $slots" #[key]>
        <!-- {{key}} -->
        <slot :name="key"></slot>
      </template>
      <template #addonAfter>
        <span class="xm_hander_wrap">
          <span class="up" @click="add">
            <a-icon type="up" />
          </span>
          <span class="down" @click="subtract">
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
export default {
  name: 'DInputNumber',
  model: {
    prop: 'value',
    event: 'blur'
  },
  components: {
    AInput: Input
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: undefined
    },
    addonAfter: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      txtValue: undefined
    }
  },
  watch: {
    value (val) {
      this.txtValue = val
    }
  },
  created () {
    this.txtValue = this.value
    console.log(this.$slots)
    console.log(this.$$scopedSlots)
  },
  methods: {
    inputBlur (e) {
      this.$emit('blur', e.target.value)
    },
    add () {
      this.$emit('blur', this.value++)
    },
    subtract () {
      this.$emit('blur', this.value--)
    }
  }
}
</script>
<style lang="less" scoped>
@import "~ant-design-vue/lib/style/themes/index.less";
.xm_input_number {
    width: 90px;
  position: relative;
  .xm_hander_wrap {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    left: -24px;
    top: 0;
    width: 22px;
    height: 2em;
    color: rgba(0, 0, 0, 0.25);
    z-index: 99;
    .up,
    .down {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      font-size: 9px;
      line-height: 1em;
      width: 100%;
      border-top-right-radius: 4px;
      flex: 3;
      cursor: pointer;
      transition: all 0.1s linear;
      border-left: 1px solid #d9d9d9;
      opacity: 0;
      user-select: none;
      &:hover {
        flex: 5;
        color: @primary-color;
      }

      &:active{
        background: #f4f4f4;
      }
    }
    .up {
      border-bottom: 1px solid #d9d9d9;
    }
    .down {
      border-bottom-right-radius: 4px;
    }
    &:hover {
      .up,
      .down {
        opacity: 1;
      }
    }
  }

  .xm_addon {
    padding: 0 11px;
    border-right: 01px solid #d9d9d9;
  }
  /deep/ .ant-input-wrapper {
    .ant-input-affix-wrapper{
        .ant-input[type="number"] {
    // padding-right: 58px !important;
  }
    }
    .ant-input-affix-wrapper:hover ~ .ant-input-group-addon, .ant-input:hover ~ .ant-input-group-addon{
      .xm_hander_wrap {
        .up,
        .down {
          opacity: 1;
        }
      }
    }
    .ant-input-group-addon:last-child {
      padding: 0;
      border-right: 0;
    }
  }
  /deep/ .ant-input[type="number"] {
    padding-right: 30px;
  }

  /deep/ .ant-input-suffix {
    right: 40px;
    .xm_suffix {
      display: block;
      border: 1px solid #d9d9d9;
      padding: 0 8px;
      margin-left: 8px;
      color: rgba(0, 0, 0, 0.65);
      background-color: #fafafa;
    }
  }

  /deep/ input[type="number"]::-webkit-inner-spin-button,
  /deep/ input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* 对于 Firefox */
  /deep/ input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
