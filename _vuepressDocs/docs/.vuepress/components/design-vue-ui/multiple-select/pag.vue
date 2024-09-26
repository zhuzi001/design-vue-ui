<template>
  <div class="demo-main">
    <a-button-group>
      <a-button
        v-for="item in btnArr"
        :key="item"
        :type="item === pageType ? 'primary' : 'default'"
        @click="btnClick(item)"
      >
        {{ item }}
      </a-button>
    </a-button-group>
    <d-multiple-select
      v-model="form.basicValue"
      :options="options"
      placeholder="请选择"
      :pageType="pageType"
      :maxLevel="3"
      :pag="{
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共 ${total} 条`,
      }"
    />
  </div>
</template>
<script>
import baseMixin from "./baseMixin";
export default {
  mixins: [baseMixin],
  data() {
    return {
      form: {
        basicValue: [],
      },
      pageType: "pagination",
      btnArr: ["pagination", "scroll"],
    };
  },
  methods: {
    btnClick(item) {
      this.pageType = item;
      // 初始化，，还原
      this.form.basicValue = [];
    },
  },
};
</script>
<style scoped>
.demo-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
