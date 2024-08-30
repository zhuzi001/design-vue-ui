<template>
  <div>
    <d-cascader
      :options="options"
      placeholder="Please select"
      labelInValue
      v-model="form.selectValue"
    >
    </d-cascader>
  </div>
</template>
<script>
import region from "../../../http/json/region.json";
export default {
  data() {
    return {
      options: region.data,
      form: {
        selectValue: [],
      },
    };
  },
  created() {},
  methods: {},
};
</script>
