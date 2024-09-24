# d-multiple-select 多个选择框级联

## 何时使用

<br/>

扩展 `d-select` 组件，多个选择框级联功能。

## 代码演示

<box single>
<tag text="基本">
<design-vue-ui-multiple-select-index />

:::slot content
支持大多数 `d-select` 的 `API` 属性

详细看下面 API
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/multiple-select/index.vue
:::

</tag>

<tag text="动态加载">
<design-vue-ui-multiple-select-load />

:::slot content

`loadMode` 分为 change 和 focus 的时候动态加载

也支持传 all 的时候 change 加载失败或数据为 [] 后，focus 会重新加载数据

`loadData` 为一个函数，返回一个 Promise，resolve 后会渲染数据（无 loadData，loadMode 设置无效）

同时必须设置 `maxLevel` 属性，用来设置级联的层级
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/multiple-select/load.vue
:::

</tag>

<tag text="分页">
<design-vue-ui-multiple-select-pag />

:::slot content

分页通过 `pageType` 来 控制 分页类型 ("pagination", "scroll")

`pag` 模式下，默认每页 10 条数据

暂时不支持 单 select 列表 动态加载数据。

:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/multiple-select/pag.vue
:::

</tag>

<tag text="校验">
<design-vue-ui-multiple-select-valid />

:::slot content

只需选择一个选项或必须选择最后一个选项才能进行校验

isEnd 属性控制是否为最后一个选项 校验（这种场景会使开始的一系列选项结果都是 []  直到全部选择完毕才会得到 value 值）

:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/multiple-select/valid.vue
:::

</tag>

</box>

## API

### Select props

> 继承 `d-select` 大多数的属性,(目前不支持 d-select 的 slot 系列)

<design-vue-ui-multiple-select-_table />

### Select events

> 与 `d-select` 有细微差别, 其他事件皆继承了！详情请查看 `d-select` 文档

<design-vue-ui-multiple-select-_table-event />