# d-multiple-select 多个选择框级联

## 何时使用

<br/>

扩展 `d-select` 组件，多个选择框级联功能。

## 代码演示

<box>
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

</box>

## API

### Select props

> 继承 `d-select` 大多数的属性,(目前不支持 d-select 的 slot 系列)

<design-vue-ui-multiple-select-_table />

### Select events

> 与 `d-select` 有细微差别, 其他事件皆继承了！详情请查看 `d-select` 文档

<design-vue-ui-multiple-select-_table-event />