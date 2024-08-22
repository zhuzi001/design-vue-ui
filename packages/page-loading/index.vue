<template>
  <div v-if="show" class="xm_spinner">
    <div class="spinner">
      <Spin size="large" :tip="tip" />
    </div>
  </div>
</template>
<script>
/**
 * @author hxm
 * @description 页面加载中公共组件
 * @param show : 是否显示加载中状态
 * @param tip ：加载中显示的提示内容 默认为空字符串
 * @startTIme ： 2024-08-15
 */
import { Spin } from 'ant-design-vue'
export default {
  name: 'PageLoading',
  props: {
    show: Boolean,
    tip: {
      type: String,
      default: ''
    }
  },
  components: { Spin },
  data () {
    return {}
  }
}
</script>
<style scoped lang="less">
.xm_spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
