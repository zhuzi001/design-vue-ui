<template>
  <div class="demo-main">
    <label for="">基本版</label>
    <d-select
      v-model="form.loadValue"
      placeholder="请选择"
      :options="allRegion"
      showSearch
      :fieldNames="{ label: 'name', value: 'code' }"
      optionFilterProp="label"
      pageType="scroll"
      :pag="{
        current: 1,
        pageSize: 10,
      }"
    >
    </d-select>
    <label for="">远程搜索</label>
    <d-select
      v-model="form.loadRemote"
      placeholder="请选择"
      :options="filterOptions"
      showSearch
      optionFilterProp="label"
      pageType="scroll"
      :total="options.length"
      :loadData="loadData"
      :searchLoading="searchLoading"
      @search="search"
    >
    </d-select>
  </div>
</template>
<script>
import region from "../../../http/json/region.json";
export default {
  data() {
    return {
      allRegion: region.data[0].children, // 假数据格式，忽略写法
      searchLoading: false,
      total: 0,
      inputValue: "", // 需要搜索的关键字
      filterOptions: [],
      pag: {
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共 ${total} 条`,
      },
      form: {},
    };
  },
  created() {},
  methods: {
    onFocus() {
      if (this.filterOptions.length) return;
      this.pagChange(this.pag.current, this.pag.pageSize);
    },
    async pagChange(current, pageSize) {
      const result = await this.queryData({
        current,
        pageSize,
      });

      this.filterOptions.push(...(_resut.data || []));
      this.pag.current = result.current || 1;
      this.total = result.total || 0;
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async queryData(param) {
      if (this.searchLoading) return;
      const { current, pageSize } = param;
      const inputValue = this.inputValue;
      this.searchLoading = true;
      /**   模拟接口  ---------start---------- */
      // 下面相当于一个后台接口
      await this.delay(1000);
      const start = (current - 1) * pageSize;
      const end = current * pageSize;
      const _all = inputValue
        ? this.allRegion.filter((v) => v.label.indexOf(inputValue) !== -1)
        : this.allRegion;
      const _optionArr = _all.slice(start, end);
      /**   模拟接口  ---------end---------- */
      this.searchLoading = false;
      return {
        data: _optionArr,
        current: current,
        total: _all.length,
      };
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
