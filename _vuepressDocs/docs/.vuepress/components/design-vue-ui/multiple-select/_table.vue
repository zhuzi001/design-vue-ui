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
          description: "指定当前选中的条目",
          type: "string | number | array | object",
          default: "-",
          version: "-",
        },
        {
          prop: "groups",
          description:
            "[{label: '',key: '',options: []}] 将OptGroup包装成了options的父节点",
          type: "array",
          default: "[]",
          version: "-",
        },
        {
          prop: "options",
          description:
            "[{value, label, [disabled, key, title]}],fieldNames可修改value和label取向",
          type: "array",
          default: "[]",
          version: "-",
        },
        {
          prop: "labelInValue",
          description:
            "是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 {key: string, label: vNodes} 的格式",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "fieldNames",
          description:
            "自定义节点 label、value （[disabled, key, title]）的字段  ",
          type: "object",
          default: "{ label: 'label', value: 'value' }",
          version: "-",
        },
        {
          prop: "searchLoading",
          description: "查询的时候加载状态",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "loadData",
          description: "上滑加载数据函数",
          type: "funtion",
          default: "null",
          version: "-",
        },
        {
          prop: "defaultActiveFirstOption",
          description: "是否默认高亮第一个选项。",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "pag",
          description: "分页配置 pagination （ant-design中的pagination）",
          type: "object",
          default: "-",
          version: "-",
        },
        {
          prop: "total",
          description: "分页总数",
          type: "number",
          default: "0",
          version: "-",
        },
        {
          prop: "pageType",
          description: "分页类型",
          type: "string",
          default: "-",
          version: "-",
        },
        {
          prop: "searchLoad",
          description: "自定义搜索加载状态",
          type: "slot",
          default: "-",
          version: "-",
        },
        {
          prop: "optionLoad",
          description: "自定义上滑加载",
          type: "slot",
          default: "-",
          version: "-",
        },
        {
          prop: "children",
          description: "自定义选项",
          type: "slot-scope",
          default: "-",
          version: "-",
        },
      ],
    };
  },
};
</script>
