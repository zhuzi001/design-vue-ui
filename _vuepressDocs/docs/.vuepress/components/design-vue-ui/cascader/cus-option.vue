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
