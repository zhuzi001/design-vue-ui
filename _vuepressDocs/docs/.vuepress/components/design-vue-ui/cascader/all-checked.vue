<template>
  <div>
    <d-cascader
      :options="options"
      v-model="form.selectValue"
      showSelectAll
    ></d-cascader>
  </div>
</template>
<script>
import region from "../../../http/json/region.json";
export default {
  data() {
    return {
      options: region.data,
      form: {
        selectValue: ["320000"],
      },
    };
  },
  created() {},
  methods: {},
};
</script>
