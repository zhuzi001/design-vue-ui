<template>
  <div class="demo-main">
    <d-select
      v-model="form.loadRemote1"
      placeholder="请选择"
      :options="filterOptions"
      showSearch
      pageType="paginationRemote"
      :total="total"
      optionFilterProp="label"
      :searchLoading="searchLoading"
      @search="onSearch"
      @focus="onSearch('')"
      @pagChange="pagChange"
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
  methods: {
    async pagChange(current, pageSize) {
        console.log('pagCHange')
      this.queryData({
        current,
        pageSize,
      });
    },
    async onSearch(v) {
        console.log('onSearch')
      if (v === this.inputValue && this.filterOptions.length) return;
      // 查询的时候需要重置一些变量
      this.total = 0;
      this.filterOptions = [];
      this.inputValue = v;
      this.queryData({
        pageSize: this.pag.pageSize,
        current: 1,
      });
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
      const _resut = {
        data: _optionArr,
        current: current,
        total: _all.length,
      };
      console.log(_resut)
      /**   模拟接口  ---------end---------- */
      this.searchLoading = false;
      this.filterOptions = _resut.data || [];
      this.pag.current = _resut.current || 1;
      this.total = _resut.total || 0;
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
