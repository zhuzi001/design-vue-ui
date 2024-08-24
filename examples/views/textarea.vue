<template>
  <div class="xm-main">
    <a-space direction="vertical" style="width: 100%" :size="24">
      <h2>常规文本域</h2>
      <d-textarea v-model="form.textValue" placeholder="请输入"> </d-textarea>
      <d-textarea v-model="form.textValue" placeholder="请输入" resizeNone> </d-textarea>
      <d-textarea
        v-model="form.textValue"
        :len="1000"
        placeholder="请输入备注"
        :autoSize="autoSize"
      >
      </d-textarea>
      <d-textarea
        v-model="form.textValue"
        :len="1000"
        placeholder="请输入备注"
        :autoSize="autoSize"
        outside
      >
      </d-textarea>
    </a-space>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        textValue: ''
      },
      autoSize: { minRows: 4, maxRows: 8 }
    }
  }
}
</script>
