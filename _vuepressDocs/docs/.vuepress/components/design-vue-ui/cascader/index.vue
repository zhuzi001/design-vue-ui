<template>
  <div>
    <d-cascader
      :options="options"
      placeholder="请选择"
      v-model="form.selectValue"
    ></d-cascader>
  </div>
</template>
<script>
import region from '../../../http/json/region.json'
export default {
  data() {
    return {
      options: region.data,
      form: {
        selectValue: ['320000'],
      },
    };
  },
  created() {},
  methods: {},
};
</script>
