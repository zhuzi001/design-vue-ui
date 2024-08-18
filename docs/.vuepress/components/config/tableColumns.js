export const columns = [
  {
    title: "序号",
    dataIndex: "index",
    width: "60px",
    key: "index",
    disabled: true,
    customRender: (text, record, index) => {
      console.log(text, record, index);
      return index + 1;
      // return this.page > 1
      //   ? index + 1 + (this.page - 1) * this.pageSize
      //   : index + 1
    },
  },
  {
    title: "用户ID",
    dataIndex: "roleName",
    key: "roleName",
  },
  {
    title: "姓名",
    dataIndex: "orgName",
    key: "orgName",
  },
  {
    title: "性别",
    dataIndex: "remarks",
    key: "remarks",
  },
  {
    title: "登录名",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "身份证",
    dataIndex: "card",
    key: "card",
  },
  {
    title: "联系方式",
    dataIndex: "qwww",
    key: "qwww",
  },
  {
    title: "操作",
    key: "action",
    disabled: true,
    dataIndex: "action",
    width: "100px",
  },
];
