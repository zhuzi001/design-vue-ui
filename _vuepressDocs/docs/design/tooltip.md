# d-tooltip 文字提示

## 何时使用

<br/>

`d-tooltip `组件基于 `ant-design-vue 中的 a-tooltip` 扩展，新增了 `len` 属性，用于控制提示内容的显示长度。通过设置 len，可以根据 `content` 内容的字符长度来自动调整显示的内容，从而提供更加灵活和个性化的提示信息。

常规的 使用`a-tooltip`

[a-tooltip](https://1x.antdv.com/components/tooltip-cn/)

## 代码演示

<tag text="基本">
<design-vue-ui-tooltip-index />

:::slot content
支持所有 `a-tooltip` 的 `API` 属性

可修改 字符长度、显示大小
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/tooltip/index.vue
:::

</tag>

## API

| 参数             | 说明       | 类型     | 默认值 | 版本    |
| ---------------- | ---------- | -------- | ------ | ------- | --- | --- |
| content          | 内容       | `string  | array  | number` | ''  | -   |
| len              | 显示的长度 | `number` | 30     | -       |
| overlayClassName | 卡片类名   | `string` | ''     | -       |

> 支持 标签内部 slot
