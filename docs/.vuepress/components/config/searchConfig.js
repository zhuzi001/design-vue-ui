function getStyle() {
  return "width:200px";
}

export const searchConfig = {
  // space: {
  //   size: 20,
  // },
  // btnSpace: {
  //   size: 10
  // },
  //   rules: {},
  form: {
    professorName: {
      label: "系统名称",
      tagName: "textInput",
      itemAttrs: {},
      attrs: {
        placeholder: "请输入系统名称",
        style: getStyle(),
      },
    },
    otherInput: {
      label: "其他名称",
      tagName: "textInput",
      itemAttrs: {},
      attrs: {
        placeholder: "请输入其他名称",
        style: getStyle(),
      },
    },
    selectValue: {
      label: "选择题",
      tagName: "select",
      itemAttrs: {},
      defaultValue: "", // 这里和下面那个不一样就是会显示默认值
      onChange: (value) => {
        console.log("我进来了", value);
      },
      attrs: {
        options: [
          {
            value: "",
            label: "全部",
          },
          {
            value: "1",
            label: "其他",
          },
        ],
        placeholder: "请选择",
        style: getStyle(),
      },
    },
    selectValue2: {
      label: "选择题",
      tagName: "select",
      itemAttrs: {},
      attrs: {
        placeholder: "请选择",
        style: getStyle(),
        options: [
          {
            value: "",
            label: "全部",
          },
          {
            value: "1",
            label: "其他",
          },
        ],
      },
    },
  },
};
