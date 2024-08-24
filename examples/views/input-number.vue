<template>
  <div class="xm-main">
    <a-space direction="vertical" style="width: 100%" :size="24">
      <h2>inputNumber</h2>
      <d-input-number
        v-model="form.textValue"
        placeholder="请输入"
      >
      </d-input-number>
      <d-input-number
        v-model="form.textValue"
        placeholder="请输入"
        addonAfter="342"
        style="width: 200px"
      >
        <template #prefix> & </template>
        <template #addonBefore> http </template>
      </d-input-number>
      <a-input-number
        v-model="form.textValue"
        placeholder="请输入"
        prefix="￥"
        addon-after=".com"
      >
        <a-icon slot="prefix" type="user" />
        <template #addonBefore> 234532 </template>
      </a-input-number>
    </a-space>
  </div>
</template>
<script>
import { InputNumber } from 'ant-design-vue'
export default {
  data () {
    return {
      form: {
        textValue: 0
      }
    }
  },
  mounted () {
    console.log(InputNumber)
  }
}
</script>
