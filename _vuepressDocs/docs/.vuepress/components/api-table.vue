<template>
  <d-table
    :columns="columns"
    :dataSource="dataSource"
    @setColumns="setColumns"
    :showPag="false"
    :scroll="!isMobile ? {} : { x: 800 }"
  ></d-table>
</template>
<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    columnsType: {
      type: String,
      default: "columns",
    },
  },
  data() {
    return {
      columns: [
        {
          title: "参数",
          dataIndex: "prop",
          disabled: true,
        },
        {
          title: "说明",
          dataIndex: "description",
        },
        {
          title: "类型",
          dataIndex: "type",
          customRender: (text, record, index) => {
            return <span style="color: #c41d7f">{{ text }}</span>;
          },
        },
        {
          title: "默认值",
          dataIndex: "default",
          disabled: true,
        },
        {
          title: "版本",
          dataIndex: "version",
          width: 100,
          align: "center",
        },
      ],
      columnsEvents: [
        {
          title: "事件名称",
          dataIndex: "name",
          disabled: true,
        },
        {
          title: "说明",
          dataIndex: "description",
        },
        {
          title: "回调参数",
          dataIndex: "callbackProp",
          customRender: (text, record, index) => {
            return <span style="color: #c41d7f">{{ text }}</span>;
          },
        },
      ],
      columnsMethods: [
        {
          title: "名称",
          dataIndex: "name",
          disabled: true,
        },
        {
          title: "说明",
          dataIndex: "description",
        },
      ],
      isMobile: false,
    };
  },
  created() {
    if (this.columnsType === "events") this.columns = this.columnsEvents;
    else if (this.columnsType === "methods") this.columns = this.columnsMethods;

    if (typeof process !== 'undefined' && process.client) {
      this.isMobile = /Mobi|Android/i.test(navigator.userAgent)
    }
  },
  methods: {
    setColumns(value) {
      this.columns = value;
    },
  },
};
</script>
