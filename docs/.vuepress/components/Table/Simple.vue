<template>
  <div class="xxx_main">
    <!-- 无title、无table头部设置、无分页 -->
    <c-table
      :show-title="false"
      :show-header="false"
      :show-pag="false"
      :table="table"
    >
    </c-table>
    <!-- 无table头部设置、无分页 -->
    <c-table
      title="有标题"
      :show-header="false"
      :show-pag="false"
      :table="table"
    >
    </c-table>
    <!-- 无title、无分页 -->
    <c-table :show-title="false" :show-pag="false" :table="table" :resetColumns="resetColumns">
      <div slot="headerLeft">
        <a-space :size="10">
          <a-button type="primary" class="mr24" icon="plus">
            新增用户
          </a-button>
        </a-space>
      </div>
    </c-table>
  </div>
</template>
<script>
import { columns } from "../config/tableColumns";
export default {
  data() {
    return {
      resetColumns: JSON.parse(JSON.stringify(columns)),
      table: {
        columns: JSON.parse(JSON.stringify(columns)),
        rowKey: "roleName",
        dataSource: [{ roleName: "sadf" }],
        loading: false,
      },
    };
  },
  methods: {
    init() {
      this.table.loading = true;
      this.hide();
    },
    hide() {
      setTimeout(() => {
        this.table.loading = false;
      }, 1000);
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
