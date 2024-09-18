<template>
  <api-table :dataSource="dataSource"></api-table>
</template>
<script>
import apiTableVue from "../../api-table.vue";
export default {
  components: {
    apiTableVue,
  },
  data() {
    return {
      dataSource: [
        {
          prop: "content",
          description: "内容",
          type: "string | array | number",
          default: "-",
          version: "-",
        },
        {
          prop: "len",
          description: "显示的长度",
          type: "number",
          default: "30	",
          version: "-",
        },
        {
          prop: "overlayClassName",
          description: "卡片类名",
          type: "string",
          default: "-",
          version: "-",
        },
      ],
    };
  },
};
</script>
