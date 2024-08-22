# ant-design-vue 1.7.8 基础上扩展封装组件

---

## 简介

组件封装，全面拥抱 `Vue2` 生态，正在持续完善中...

### 主要用到的一些技术栈

- ui 库：ant-design-vue.
- 提交规范：git cz commitizen
- 版本更改历史：changelog

### 安装使用，打包部署，提交代码

- Installation dependencies

```bash
yarn install

```

- run

```bash
yarn serve
```

- build

```bash
yarn build
```

- commit

```bash
# git add
git add .

# yarn
yarn commit
```

#### 代码基础架构说明

```treeNode
|-- 根目录
  |-- docs 文档生成的根目录位置
  |-- examples 本地调试
  |-- lib 打包发布的资源
  |-- packages 主要的组件目录
    |-- business 业务组件
    |-- layout 布局组件
    |-- page 页面组件
    |-- tools 小的工具组件
    |-- index.js 入口文件
  |-- public 项目静态资源
  |-- src 项目的一些开发目录
  |-- README.md 项目说明
  |-- vue.config.js 脚手架配置文件

```

#### Git 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md)

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `docs` 文档/注释
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 代码重构（不包括 bug 修复、功能新增）
- `revert` 撤销修改
- `test` 测试相关
- `build` 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
- `ci` 修改 CI 配置、脚本
- `chore` 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
- `revert` 回滚 commit

#### 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

#### License

[MIT © cec-2022](./LICENSE)

## 更新

- table-set =========== table 列表控制 ，引入 vuedraggable 20220701

## patch-package 给 npm 依赖打补丁

这里注意注意！！！

大家可以看到我弄了一个 `patch-package` 包

下载来后，在命令行执行一下 `npm run patch`


## 注意

1. 每一个组件应该取名 class 要具有唯一性，因为我们打包后会脚本处理合并成一个 less 文件，重名影响也不好
2. `npm install` 后 一定要 `npm run patch` 下，这个是修改了 `node_modules` 中的代码，进行覆盖处理
3. 一定记得别用`cnpm`，兼容处理三方插件的话，不会被编译



Cascader 级联选择  一次性选择多个选项。