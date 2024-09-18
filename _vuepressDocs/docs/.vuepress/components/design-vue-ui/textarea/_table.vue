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
          prop: "len",
          description: "字符最大长度",
          type: "number",
          default: "255",
          version: "-",
        },
        {
          prop: "outside",
          description: "长度标识是否据外",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "value(v-model)",
          description: "输入框内容",
          type: "string",
          default: "-",
          version: "-",
        },
        {
          prop: "autoSize",
          description:
            "自适应内容高度，可设置为 true - false 或对象：{ minRows: 2, maxRows: 6 }",
          type: "boolean | object",
          default: "{ minRows: 3, maxRows: 4 }",
          version: "-",
        },
        {
          prop: "resizeNone",
          description:
            "是否允许元素不能被用户调整大小",
          type: "boolean",
          default: "false",
          version: "-",
        },
      ],
    };
  },
};
</script>
