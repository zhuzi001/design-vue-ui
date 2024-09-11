<template>
  <api-table :dataSource="dataSource" columnsType="methods"></api-table>
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
          name: "focus()",
          description: "获取焦点",
        },
        {
          name: "blur()",
          description: "失去焦点",
        },
      ],
    };
  },
};
</script>
