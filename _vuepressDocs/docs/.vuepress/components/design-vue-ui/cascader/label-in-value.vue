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
