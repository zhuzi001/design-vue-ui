import Ant from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import CustomUi from "/packages/index.js";

export default async ({ Vue }) => {
  if (typeof process === "undefined") {
    Vue.use(Ant);
    Vue.use(CustomUi);
    // Vue.mixin({
    //   created() {
    //     import('/packages/index.js').then(function(m) {
    //       Vue.use(m.default)
    //     })
    //   }
    // })
  }
};
