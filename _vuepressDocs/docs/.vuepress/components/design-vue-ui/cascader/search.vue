<template>
    <div>
      <d-cascader
        :options="options"
        placeholder="请选择"
        showSearch
        v-model="form.selectValue"
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
          selectValue: ["320000"],
        },
      };
    },
    created() {},
    methods: {},
  };
  </script>
  