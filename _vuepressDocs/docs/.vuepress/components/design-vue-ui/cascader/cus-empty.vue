<template>
  <div>
    <d-cascader
      :options="[]"
      placeholder="Please select"
      showSelectAll
      v-model="form.selectValue"
    >
    </d-cascader>
    <d-cascader
      :options="[]"
      placeholder="Please select"
      showSelectAll
      v-model="form.selectValue"
      style="margin-top: 24px"
    >
      <template #notFoundContent>
        <a-empty />
      </template>
    </d-cascader>
  </div>
</template>
<script>
export default {
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
