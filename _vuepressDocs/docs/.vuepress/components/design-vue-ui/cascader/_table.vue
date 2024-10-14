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
          type: "string[] | number[]",
          default: "-",
          version: "-",
        },
        {
          prop: "showSelectAll",
          description: "显示全选按钮",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "options",
          description: "可选项数据源(树结构)",
          type: "object[]",
          default: "[]",
          version: "-",
        },
        {
          prop: "labelInValue",
          description:
            "是否把每个选项的 label 包装到 value 中， {key: string, label: string} 的格式",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "placeholder",
          description: "输入框占位文本 ",
          type: "string",
          default: "请选择",
          version: "-",
        },
        {
          prop: "maxTagCount",
          description: "最多显示多少个 tag",
          type: "number",
          default: "4",
          version: "-",
        },
        {
          prop: "showCheckedChild",
          description: "定义选中项回填的方式( true: 只显示选中的子节点 false: 只显示父节点-当父节点下所有子节点都选中时)",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "displayRender",
          description: "选择后展示的渲染函数",
          type: "function | null",
          default: "null",
          version: "-",
        },
        {
          prop: "fieldNames",
          description: "自定义节点 label、value、options 的字段",
          type: "object",
          default: "{ label: 'label', value: 'value', children: 'children' }",
          version: "-",
        },
        {
          prop: "allowResize",
          description: "允许监听resize事件处理面板动态显示不超出边界",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "allText",
          description: "全选文案",
          type: "string",
          default: "全选",
          version: "-",
        },
        {
          prop: "noDataContent",
          description: "没有数据的提示语",
          type: "string | slot",
          default: "暂无数据",
          version: "-",
        },
        {
          prop: "loadData",
          description: "点击动态加载数据",
          type: "function",
          default: "-",
          version: "-",
        },
        {
          prop: "optionRender",
          description: "自定义面板显示数据",
          type: "slot | slot-scope",
          default: "-",
          version: "-",
        },
        {
          prop: "showSearch",
          description: "是否显示搜索框并搜索",
          type: "boolean",
          default: "false",
          version: "-",
        },
        {
          prop: "optionFilterProp",
          description: "过滤options中的某参数（默认fieldNames中的label）",
          type: "string",
          default: "label",
          version: "-",
        }
      ],
    };
  },
};
</script>
