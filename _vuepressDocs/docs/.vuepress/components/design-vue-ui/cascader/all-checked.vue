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
