<template>
  <div class="xm_title_main">
    <div class="xm_title">
      <span class="xm_title_border"></span>
      <slot name="title">
        {{ title || '' }}
      </slot>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.xm_title_main {
  display: flex;
  margin-bottom: 24px;
  .xm_title {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    .xm_title_border {
      width: 4px;
      height: 16px;
      line-height: 16px;
      border-radius: 2px;
      margin-right: 8px;
      background-color: @primary-color;
    }
  }
}
</style>
