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
      @focus="onFocus"
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
      timer: null,
    };
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer);
  },
  methods: {
    async onFocus() {
      if (this.filterOptions.length) return;
      this.onSearch("");
    },
    async pagChange(current, pageSize) {
      console.log(current, pageSize)
      if (this.searchLoading) return;
      this.searchLoading = true;
      const result = await this.queryData({
        pageSize,
        current,
      });
      this.handleResult(result);
    },
    async onSearch(v) {
      if (v === this.inputValue && this.filterOptions.length) return;
      // 查询的时候需要重置一些变量
      this.total = 0;
      this.filterOptions = [];
      this.inputValue = v;
      this.searchLoading = true;
      // 节流
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        const result = await this.queryData({
          pageSize: this.pag.pageSize,
          current: 1,
        });
        this.handleResult(result);
      }, 500);
    },
    handleResult(result) {
      this.filterOptions = result.data || []
      this.pag.current = result.current || 1;
      this.total = result.total || 0;
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    /**
     * 下面是模拟接口返回数据，可忽略
     */
    async queryData(param) {
      const { current, pageSize } = param;
      const inputValue = this.inputValue;

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
