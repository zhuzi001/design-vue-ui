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
      <component :is="item.component" :data="item.data" />
      <a-card-meta :title="item.title">
        <template slot="description"> {{ item.description }} </template>
      </a-card-meta>
    </a-card>
  </div>
</template>
<script>
import cascader from './cascader.vue'
import input from './input.vue'
export default {
  data () {
    return {
      items: [
        {
          component: cascader,
          title: 'cascader 级联',
          description: 'cascader 级联'
        },
        {
          component: input,
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
