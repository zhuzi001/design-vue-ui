<template>
  <div class="demo-main">
    <label for="">基本使用-value: {{ form.basicValue }}</label>
    <d-multiple-select
      v-model="form.basicValue"
      :options="options"
      placeholder="请选择"
    />
    <label for="">只显示前面两节</label>
    <d-multiple-select
      v-model="form.basicValue3"
      :options="options"
      :maxLevel="2"
      :defaultLevel="2"
      placeholder="请选择"
    />

    <label for="">labelInValue: {{ form.basicValue2 }}</label>
    <d-multiple-select
      v-model="form.basicValue2"
      :options="options"
      labelInValue
      placeholder="请选择"
    />
  </div>
</template>
<script>
import baseMixin from "./baseMixin";
export default {
  mixins: [baseMixin],
  data() {
    return {
      form: {
        basicValue: [],
        basicValue2: [],
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
