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
          prop: "value(v-model)",
          description: "内容",
          type: "number",
          default: "-",
          version: "-",
        },
        {
          prop: "controls",
          description: "是否显示增减按钮",
          type: "boolean",
          default: "true",
          version: "-",
        },
        {
          prop: "addonAfter",
          description: "带标签的 input，设置后置标签",
          type: "string | slot",
          default: "-",
          version: "-",
        },
        {
          prop: "min",
          description: "最小值",
          type: "number",
          default: "-",
          version: "-",
        },
        {
          prop: "max",
          description: "最大值",
          type: "number",
          default: "-",
          version: "-",
        },
        {
          prop: "step",
          description: "每次改变步数，可以为小数",
          type: "number",
          default: "1",
          version: "-",
        },
        {
          prop: "defaultValue",
          description: "初始值",
          type: "number",
          default: "-",
          version: "-",
        },
        {
          prop: "precision",
          description: "数值精度",
          type: "number",
          default: "-",
          version: "-",
        },
        {
          prop: "formatter",
          description: "指定输入框展示值的格式",
          type: "function(value:number | string)",
          default: "-",
          version: "-",
        },
      ],
    };
  },
};
</script>
