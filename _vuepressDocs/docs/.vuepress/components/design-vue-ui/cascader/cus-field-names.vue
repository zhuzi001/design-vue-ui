<template>
  <d-cascader
    :options="options"
    :fieldNames="{ label: 'label', value: 'id', children: 'children' }"
    v-model="form.selectValue"
  ></d-cascader>
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
