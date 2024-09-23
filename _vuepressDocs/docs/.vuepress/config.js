module.exports = {
  title: "design-vue-ui",
  description: "基于ant框架",
  base: "/",
  port: "8081",
  head: [["link", { rel: "icon", href: "/d.png" }],['meta', { name: 'keywords', content: 'designVueUi,antdesignvue,design-vue-ui' }]],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    search: false,
    logo: "/d.png", // 设置左侧的 logo
    // navbar: false,
    nav: [
      {
        text: "概览",
        link: "/",
      },
      {
        text: "文档",
        link: "/design/",
      },
    ],
    sidebar: {
      "/design/": [
        "",
        {
          title: "Components", // 必要的
          sidebarDepth: 1, // 可选的, 默认值是 1
          children: [
            "input",
            "input-number",
            "tooltip",
            "textarea",
            "select",
            "cascader",
            "multiple-select"
          ],
        },
        "update",
      ],
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("core-js/library/fn", "core-js/features");
  },
  plugins: ["@vuepress-reco/extract-code"],
};
