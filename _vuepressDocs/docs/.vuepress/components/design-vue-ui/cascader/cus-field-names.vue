<template>
  <d-cascader
    :options="options"
    :fieldNames="{ label: 'label', value: 'id', children: 'children' }"
    v-model="form.selectValue"
  ></d-cascader>
</template>
<script>
import baseMixin from './baseMixin'
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
