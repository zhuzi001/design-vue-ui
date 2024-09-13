<template>
  <div class="demo-main">
    <label for="">optionLabelProp 默认: {{ form.basicValue }}</label>
    <d-select v-model="form.basicValue" :options="options" placeholder="请选择">
      <template #children="{ option }">
        {{ option.label }}({{ option.value }})
      </template>
    </d-select>
    <d-select
      v-model="form.basicValue"
      :options="options"
      placeholder="请选择"
      optionLabelProp="label"
    >
      <template #children="{ option }">
        {{ option.label }}({{ option.value }})
      </template>
    </d-select>
    <d-select
      v-model="form.basicValue"
      :options="options"
      placeholder="请选择"
      optionLabelProp="value"
    >
      <template #children="{ option }">
        {{ option.label }}({{ option.value }})
      </template>
    </d-select>
  </div>
</template>
<script>
import region from "../../../http/json/region.json";
export default {
  data() {
    return {
      options: region.data[0].children, // 假数据格式，忽略写法
      form: {
        basicValue: '320300'
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
