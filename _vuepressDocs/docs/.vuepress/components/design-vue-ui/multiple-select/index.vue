<template>
  <div class="demo-main">
    <label for="">基本使用-value: {{ form.basicValue }}</label>
    <d-multiple-select
      v-model="form.basicValue"
      :options="options"
      placeholder="请选择"
    />
  </div>
</template>
<script>
import region from "../../../http/json/region.json";
export default {
  data() {
    return {
      options: region.data, // 假数据格式，忽略写法
      form: {
        basicValue: [],
      },
    };
  },
  methods: {},
};
</script>
<style scoped>
.demo-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
