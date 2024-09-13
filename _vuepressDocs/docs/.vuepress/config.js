module.exports = {
  title: "design-vue-ui",
  description: "基于ant框架",
  base: "/",
  port: "8081",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    search: false,
    // navbar: false,
    nav: [
      {
        text: "组件",
        link: "/design/",
      },
    ],
    sidebar:{
      "/design/": [
        "",
        {
          title: "Components", // 必要的
          sidebarDepth: 1, // 可选的, 默认值是 1
          children: [ "input", "input-number","tooltip", "textarea", "select", "cascader"],
        },
        "update"
      ],
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("core-js/library/fn", "core-js/features");
  },
  plugins: ["@vuepress-reco/extract-code"],
};