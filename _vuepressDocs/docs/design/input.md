# d-input 带长度的 input

## 何时使用

<br/>

扩展 `a-input` 组件

## 代码演示

<tag text="基本">
<design-vue-ui-input-index />

:::slot content
支持所有 `a-input` 的 `API` 属性

可修改 字符长度、显示大小
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/input/index.vue
:::

</tag>

## API

| 参数             | 说明       | 类型     | 默认值 | 版本    |
| ---------------- | ---------- | -------- | ------ | ------- | --- | --- |
| value(v-model)          | 内容       | `string` | ''  | -   |
| len              | 显示的长度 | `number` | 0     | -       |