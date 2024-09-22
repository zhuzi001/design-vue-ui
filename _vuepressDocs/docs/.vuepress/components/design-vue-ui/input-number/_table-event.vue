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
          description: "当input 的 value 变化时，调用此函数",
          callbackProp: "function(value)",
        },
      ],
    };
  },
};
</script>
