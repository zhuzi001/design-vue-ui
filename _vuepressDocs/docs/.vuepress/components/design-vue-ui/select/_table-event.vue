<template>
  <api-table :dataSource="dataSource" columnsType="events"></api-table>
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
          name: "search",
          description: "文本框值变化时回调",
          callbackProp: "function(value: string)",
        },
        {
          name: "change",
          description:
            "选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数",
          callbackProp: "function(value)",
        },
        {
          name: "focus",
          description: "获得焦点时回调",
          callbackProp: "function",
        },
        {
          name: "popupScroll",
          description: "下拉列表滚动时的回调",
          callbackProp: "function",
        },
        {
          name: "pagChange",
          description: "点击分页页码时的回调",
          callbackProp: "function( page, pageSize)",
        },
      ],
    };
  },
};
</script>
