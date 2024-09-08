<template>
  <div>
    <d-cascader
      :options="options"
      placeholder="请选择"
      v-model="form.selectValue"
      showCheckedChild
    ></d-cascader>
  </div>
</template>
<script>
import baseMixin from "./baseMixin";
export default {
  mixins: [baseMixin],
  data() {
    return {
      form: {
        selectValue: [],
      },
    };
  },
  created() {},
  methods: {},
};
</script>
