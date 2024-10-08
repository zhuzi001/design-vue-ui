<template>
  <div class="demo-main">
    <a-button-group>
      <a-button
        v-for="item in btnArr"
        :key="item"
        :type="item === currentLoadMode ? 'primary' : 'default'"
        @click="btnClick(item)"
      >
        {{ item }}
      </a-button>
    </a-button-group>
    <d-multiple-select
      v-model="form.basicValue"
      :options="options"
      placeholder="请选择"
      :load-mode="currentLoadMode"
      :loadData="loadData"
      :maxLevel="3"
    />
    <d-multiple-select
      v-model="form.basicValue1"
      :options="options"
      placeholder="请选择"
      :load-mode="currentLoadMode"
      :loadData="loadData"
      :maxLevel="3"
      :defaultLevel="3"
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
        basicValue1: []
      },
      currentLoadMode: "change",
      btnArr: ["change", "focus", "all"],
    };
  },
  methods: {
    async loadData({ val, index, option, loadMode }) {
      console.log('=========')
      await this.delay(1000);
      // 下面是模拟接口数据-------忽略
      if (loadMode !== "focus") return option.children;
      let _options = this.options;
      for (let i = 0; i < index; i++) {
        const _val = val[i];
        const _option = _options.find((v) => v.value === _val);
        if (!_option) return [];
        _options = _option.children;
      }
      console.log(_options)
      return _options;
    },
    btnClick(item) {
      this.currentLoadMode = item;
      // 初始化，，还原
      this.form.basicValue = [];
      this.form.basicValue1 = [];
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
