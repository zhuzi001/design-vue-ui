<template>
  <div style="padding: 48px">
    <!-- <div>
      <br />
      <button @click="init">点击显示加载中、、、1秒自动关闭</button>
    </div> -->

    <a-card
      hoverable
      v-for="(item, index) in items"
      :key="index"
    >
      <a-card-meta :title="item.title">
        <template slot="description"> <component :is="item.component" :data="item.data" /> </template>
      </a-card-meta>
    </a-card>
  </div>
</template>
<script>
import cascader from './cascader.vue'
import input from './input.vue'
import textarea from './textarea.vue'
import inputNumber from './input-number.vue'
export default {
  data () {
    return {
      items: [
        {
          component: input,
          title: 'input 组件',
          description: 'input 组件'
        },
        {
          component: textarea,
          title: 'textarea 组件',
          description: 'textarea 组件'
        },
        {
          component: inputNumber,
          title: 'inputNumber',
          description: 'inputNumber'
        },
        {
          component: cascader,
          title: 'cascader 级联',
          description: 'cascader 级联'
        }

      ]
    }
  },
  methods: {
    init () {
      this.$xmLoading.show()
      this.hide()
    }
  }
}
</script>
