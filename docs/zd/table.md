# CTable 表格

展示公共搜索框、公共按钮、行列数据。

## 何时使用

- ant 框架统一组件下的 ui 布局 （ui 设计为类似 table）
- 除了固定的几个属性，内部的属性都与 ant 相连接，可添加删除

## 代码演示

::: details 点击查看 tableColumns.js 统一使用的表格 Columns
<<< @/docs/.vuepress/components/config/tableColumns.js
:::
::: details 点击查看 searchConfig.js 统一使用的表单搜索查询
<<< @/docs/.vuepress/components/config/searchConfig.js
:::

<tag text="最简单的例子"/>
<Table-Simple/>

::: details 点击查看代码 vue 页面
<<< @/docs/.vuepress/components/Table/Simple.vue
:::

<tag text="比较复杂的例子"/>
<Table-Complex/>

::: details 点击查看代码 vue 页面
<<< @/docs/.vuepress/components/Table/Complex.vue
:::

### 常规 table

## Api

### 总体

| 参数                          | 说明                                               | 类型                          | 默认值    | 版本 |
| ----------------------------- | -------------------------------------------------- | ----------------------------- | --------- | ---- |
| showTitle                     | 是否显示头部标题信息                               | `boolean`                     | true      | -    |
| title                         | 头部标题显示数据                                   | <code>string&#124;slot</code> | -         | -    |
| showHeader                    | 是否显示 table 头部信息 （table 设置右边位置）     | `boolean`                     | true      | -    |
| resetColumns                  | table 头部重置的表头信息 （一般与 table 表头一样） | `array`                       | []        | -    |
| [searchConfig](#searchConfig) | 头部搜索 form 配置                                 | `object`                      | {form:{}} | -    |
| [table](#table)               | table 内容 (ant 所有 table 属性)                   | `object`                      | {}        | -    |
| [pag](#pag)                   | pag 分页 内容                                      | `object`                      | {}        | -    |

### <a name="searchConfig"> searchConfig </a>

| 参数     | 说明                                 | 类型     | 默认值 | 版本 |
| -------- | ------------------------------------ | -------- | ------ | ---- |
| rules    | form 的检验 rules，与 ant 作用一样   | `object` | -      | -    |
| space    | Space 间距(ant Space 组件所有 props) | `object` | -      | -    |
| btnSpace | Space 间距(ant Space 组件所有 props) | `object` | -      | -    |
| form     | 表单内部配置                         | `object` | {}     | -    |

### <a name="table"> table 常规属性（其他查看 ant） </a>

| 参数       | 说明                                      | 类型                                             | 默认值 | 版本 |
| ---------- | ----------------------------------------- | ------------------------------------------------ | ------ | ---- |
| columns    | 表格列的配置描述，具体查看 ant 文档       | `array`                                          | -      | -    |
| rowKey     | 表格行 key 的取值，可以是字符串或一个函数 | <code>string&#124;Function(record):string</code> | 'key'  | -    |
| dataSource | 数据数组                                  | `any[]`                                          | -      | -    |
| loading    | 页面是否加载中                            | <code>boolean&#124;object</code>                 | false  | -    |

### <a name="pag"> pag 常规属性（其他查看 ant）</a>

| 参数     | 说明     | 类型     | 默认值 | 版本 |
| -------- | -------- | -------- | ------ | ---- |
| total    | 数据总数 | `number` | 0      | -    |
| current  | 当前页数 | `number` | -      | -    |
| pageSize | 每页条数 | `number` | -      | -    |

::: warning tips
show-quick-jumper/show-size-changer 固定 true
:::

## 事件
