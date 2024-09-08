<template>
  <div>
    <d-cascader
      :options="options"
      placeholder="Please select"
      showSelectAll
      v-model="form.selectValue"
    >
      <template #optionRender="{ option }">
        {{ option.label }} （{{ option.value }}）
      </template>
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
