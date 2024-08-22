<template>
  <div class="xxx_main">
    <c-table
      title="专家管理"
      :resetColumns="resetColumns"
      :table="table"
      :pag="pag"
      :searchConfig="searchConfig"
      @pagChange="pagChange"
      @change="tableChange"
      @searchClick="searchClick"
    >
      <div slot="headerLeft">
        <a-space :size="10">
          <a-button type="primary" class="mr24" icon="plus">
            新增用户
          </a-button>
          <a-button class="mr24" icon="download"> 批量导入 </a-button>
          <a-button class="mr24" icon="upload"> 导出模板 </a-button>
        </a-space>
      </div>
    </c-table>
  </div>
</template>
<script>
import { columns } from "../config/tableColumns";
import { searchConfig } from "../config/searchConfig";
export default {
  data() {
    return {
      textValue: "",
      searchConfig,
      resetColumns: JSON.parse(JSON.stringify(columns)),
      table: {
        columns: JSON.parse(JSON.stringify(columns)),
        rowKey: "roleName",
        dataSource: [{ roleName: "sadf" }],
        loading: false,
      },
      pag: {
        total: 0,
        current: 0,
        pageSize: 10,
      },
    };
  },
  created() {
    this.initSearchConfig();
  },
  methods: {
    init() {
      this.table.loading = true;
      this.hide();
    },
    pagChange(page, pageSize) {
      this.pag.current = page;
      this.pag.pageSize = pageSize;
      this.init();
    },
    tableChange(value) {
      this.table.columns = value;
      // this.init();
    },
    searchClick(formData) {
      console.log(formData);
      this.init();
    },
    hide() {
      setTimeout(() => {
        this.table.loading = false;
      }, 1000);
    },
    initSearchConfig() {
      this.searchConfig &&
        (this.searchConfig.form.selectValue.onChange = (value) => {
          // console.log(value);
          if (value == 1)
            this.searchConfig.form.selectValue2.attrs.options = [
              { value: "", label: "拉布拉多" },
            ];
          else
            this.searchConfig.form.selectValue2.attrs.options = [
              {
                value: "",
                label: "全部",
              },
              {
                value: "1",
                label: "其他",
              },
            ];
        });
    },
  },
};
</script>
<style scoped>
.xxx_main {
  /* margin: 16px 40px; */
  padding: 24px;
  background-color: #fff;
  border: 1px solid #eee;
}
</style>
