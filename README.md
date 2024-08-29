# ant-design-vue 1.7.8 基础上扩展封装组件

---

## 简介

组件封装，全面拥抱 `Vue2` 生态，正在持续完善中...
# 快速上手

`design-vue-ui` 是基于 `Ant Design Vue v1.7.8` 版本进行封装的 UI 组件库。为了提升用户体验和组件一致性，我们决定对库进行升级，整合 `Ant Design Vue` 的新版本功能及新增组件。

## 封装目的

- **提升组件一致性**：确保所有组件在样式和行为上与设计系统保持一致。
- **扩展功能**：根据 Ant Design Vue 的 1.7.8 最新版本，封装新组件和功能，以满足更广泛的业务需求。
- **优化性能**：利用新版的性能改进和最佳实践，提升组件的性能和响应速度

## 引入 design-vue-ui

1. 安装脚手架工具

```
$ npm install -g @vue/cli
# OR
$ yarn global add @vue/cli
```

2. 创建一个项目

使用命令行进行初始化。

```
$ vue create design-ui-demo
```

并配置项目。

若安装缓慢报错，可尝试用 `cnpm` 或别的镜像源自行安装：`rm -rf node_modules && cnpm install`。

3. 使用组件

::: tip 前提条件
需要引入 ant-design-vue 的 全局样式
:::

```
$ npm i --save design-vue-ui
```

完整引入

```js
import Vue from "vue";
import Antd from "ant-design-vue";
import DesignVueUI from "design-vue-ui";
import App from "./App";
import { apiFc } from "./http/api"; // 开放的  请求函数
import "ant-design-vue/dist/antd.less";
import "design-vue-ui/lib/design-vue-ui.css";
// import 'design-vue-ui/lib/design-vue-ui.less';
Vue.config.productionTip = false;
Vue.use(DesignVueUI);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
});
```

局部导入组件

```js
import Vue from "vue";
import Antd from "ant-design-vue";
import { DInput } from "design-vue-ui";
import "ant-design-vue/dist/antd.less";
import "design-vue-ui/lib/design-vue-ui.css";
import App from "./App";

Vue.config.productionTip = false;

Vue.component(DInput.name, DInput);

// Vue.use(DInput);
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
});
```

## 配置请求

::: tip apiFc
封装好的 `axios`，使用到 apiFc 的组件有： 
不使用可忽略
:::

```js
import CDesign from "design-vue-ui";
import { apiFc } from "./http/api"; // 封装 的axios 语法
CDesign.config.$apiFc = apiFc;
```

## 全局变量

### $xmLoading

```js
this.$xmLoading.show();
this.$xmLoading.show({tip: '加载中', el: document.body});
this.$xmLoading.hide();
```