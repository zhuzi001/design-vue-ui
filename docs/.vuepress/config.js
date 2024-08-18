module.exports = {
  title: "统一组件库（内部使用）",
  description: "基于ant框架",
  base: "/",
  port: "8081",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    search: false,
    // navbar: false,
    sidebar: ["/", "/zd/unit/", "/zd/table.html","/zd/empty/", "/zd/devops.html"],
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("core-js/library/fn", "core-js/features");
  },
  plugins: ["@vuepress-reco/extract-code"],
};
