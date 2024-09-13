<template>
  <div>
    <d-cascader
      :options="options"
      v-model="form.selectValue"
      :load-data="loadData"
      :fieldNames="{ children: 'child' }"
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
        selectValue: [],
      },
    };
  },
  created() {},
  methods: {
    async loadData(item) {
      // 模拟数据
      if (item.child) return;
      item.$loading = true;
      await this.delay(1000)
      item.child = item.children.map((v) => {
        v.disabled = Number(v.id) % 6 === 1;
        v.isLeaf = v.level === 3;
        return v;
      });
      item.$loading = false;
    },
  },
};
</script>
