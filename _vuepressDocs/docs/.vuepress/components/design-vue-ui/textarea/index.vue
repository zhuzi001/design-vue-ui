<template>
  <a-space direction="vertical" style="width: 100%" :size="24">
    <d-textarea v-model="form.textValue" placeholder="请输入"> </d-textarea>
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
    <d-textarea
      v-model="form.textValue"
      :len="1000"
      placeholder="请输入备注"
      resizeNone
    >
    </d-textarea>
  </a-space>
</template>
<script>
export default {
  data() {
    return {
      form: {
        textValue: "",
      },
      autoSize: { minRows: 4, maxRows: 8 },
    };
  },
};
</script>
