# d-textarea 文本域

## 何时使用

<br/>

- 常规使用的 `a-textarea` 组件

## 代码演示

<tag text="文本域">
<design-vue-ui-textarea-index />

:::slot content
支持所有 `a-textarea` 的 `API` 属性

可修改 字符长度、显示大小
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/textarea/index.vue
:::
</tag>

## Api

### 总体

| 参数           | 说明                          | 类型                                     | 默认值   | 版本    |
| -------------- | ----------------------------- | ---------------------------------------- | -------- | ------- | -------------------------- | --- |
| len            | 字符最大长度                  | `number`                                 | 255      | -       |
| placeholder    | 占位符                        | `string`                                 | ''       | -       |
| outside        | 长度标识是否据外              | `boolean`                                | false    | -       |
| value(v-model) | 输入框内容                    | `string`                                 | ''       | -       |
| autoSize       | 自适应内容高度，可设置为 true - false 或对象：{ minRows: 2, maxRows: 6 } | `boolean | object` | { minRows: 3, maxRows: 4 } | -   |
| resizeNone       | 是否允许元素不能被用户调整大小 | `boolean` | false | -   |