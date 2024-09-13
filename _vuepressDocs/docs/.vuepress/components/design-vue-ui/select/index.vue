<template>
  <div class="demo-main">
    <label for="">基本使用-value: {{form.basicValue}}</label>
    <d-select
      v-model="form.basicValue"
      :options="options"
      placeholder="请选择"
    />
    <label for="">基本使用-value-multiple: {{form.basicValue1}}</label>
    <d-select
      v-model="form.basicValue1"
      :options="options"
      placeholder="请选择"
      mode="multiple"
    />
    <label for="">基本使用-value-groups: {{form.basicValue2}}</label>
    <d-select
      v-model="form.basicValue2"
      :groups="groups"
      placeholder="请选择"
    />
    <label for="">基本使用-labelInValue: {{form.basicValue3}}</label>
    <d-select
      v-model="form.basicValue3"
      :options="options"
      placeholder="请选择"
      labelInValue
    />
  </div>
</template>
<script>
import region from "../../../http/json/region.json";
export default {
  data() {
    return {
      options: region.data[0].children, // 假数据格式，忽略写法
      groups: [
        {
          label: region.data[0].label,
          key: region.data[0].value,
          options: region.data[0].children,
        },
      ],
      form: {},
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
