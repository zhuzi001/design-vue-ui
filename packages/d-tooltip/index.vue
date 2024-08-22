<template>
  <a-tooltip placement="top" :overlayClassName="overlayClassName">
    <template
      slot="title"
      v-if="contentValue.length && (contentValue.length > len || len === 0)"
    >
      {{ contentValue }}
    </template>
    <slot>
      <span :class="{ xm_tootip_span: len === 0 }">
        {{
          contentValue.length > len && len !== 0
            ? contentValue.slice(0, len) + "..."
            : contentValue || $emptyTxt
        }}
      </span>
    </slot>
  </a-tooltip>
</template>
<script>
import { Tooltip } from 'ant-design-vue'
export default {
  name: 'DTooltip',
  components: {
    ATooltip: Tooltip
  },
  props: {
    content: {
      type: [String, Array],
      default: ''
    },
    len: {
      type: Number,
      default: 9
    },
    overlayClassName: {
      default: ''
    }
  },
  computed: {
    contentValue () {
      if (!this.content && this.content !== 0) return ''
      if (typeof this.content === 'string') return this.content + ''
      return this.content.join('、') + ''
    }
  }
}
</script>
<style lang="less" scoped>
.xm_tootip_span {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
