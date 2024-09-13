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
          name: "change",
          description: "选中 option，或 input 的 value 变化时，调用此函数",
          callbackProp: "function(value, childArr, parentArr)",
        },
        {
          name: "deselect",
          description: "取消选中时调用（displayRender 下可能需要）",
          callbackProp: "function(item)",
        },
      ],
    };
  },
};
</script>
