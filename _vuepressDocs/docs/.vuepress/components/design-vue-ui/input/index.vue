<template>
  <div class="xm-main">
    <a-space direction="vertical" style="width: 100%" :size="24">
      <h2>带长度的 input</h2>
      <d-input v-model="form.textValue" placeholder="请输入"> </d-input>
      <d-input v-model="form.textValue1" placeholder="请输入" :len="5"> </d-input>
    </a-space>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        textValue: '',
        textValue1: '',
        textValue2: ''
      }
    }
  }
}
</script>
