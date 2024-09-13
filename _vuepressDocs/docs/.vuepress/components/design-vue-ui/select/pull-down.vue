<template>
  <div class="demo-main">
    <label for="">基本版</label>
    <d-select
      v-model="form.loadValue"
      placeholder="请选择"
      :options="allRegion"
      showSearch
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
      :total="total"
      :loadData="loadData"
      :searchLoading="searchLoading"
      @search="search"
      @focus="onFocus"
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
      filterOptions1: [],
      pag: {
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共 ${total} 条`,
      },
      form: {},
      timer: null,
    };
  },
  created() {},
  beforeDestroy() {
    this.timer && clearTimeout(this.timer);
  },
  methods: {
    async onFocus() {
      if (this.filterOptions.length) return;
      this.search("");
    },
    search(v) {
      /** 初始重置 */
      this.total = 0;
      this.filterOptions = [];
      this.inputValue = v;
      // 节流
      this.timer && clearTimeout(this.timer);
      this.searchLoading = true;
      this.timer = setTimeout(async () => {
        const result = await this.queryData({
          pageSize: this.pag.pageSize,
          current: 1,
        });
        this.searchLoading = false;
        this.handleResult(result);
      }, 400);
    },
    handleResult(result) {
      this.filterOptions.push(...(result.data || []));
      this.pag.current = result.current || 1;
      this.total = result.total || 0;
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async loadData(e) {
      if (this.loading) return;
      if (this.total <= this.filterOptions.length) return;
      // 下面相当于一个后台接口
      this.loading = true; // 这里相当于节流的作用，免得获取同样数据进行追加
      const _resut = await this.queryData({
        pageSize: this.pag.pageSize,
        current: this.pag.current + 1,
      });
      this.loading = false;
      this.handleResult(_resut);
    },
    /**
     * 下面是模拟接口返回数据，可忽略
     */
    async queryData(param) {
      /**   模拟接口  ---------start---------- */
      const { current, pageSize } = param;
      const inputValue = this.inputValue;
      // 下面相当于一个后台接口
      await this.delay(1000);
      const start = (current - 1) * pageSize;
      const end = current * pageSize;
      const _all = inputValue
        ? this.allRegion.filter((v) => v.label.indexOf(inputValue) !== -1)
        : this.allRegion;
      const _optionArr = _all.slice(start, end);
      /**   模拟接口  ---------end---------- */
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
