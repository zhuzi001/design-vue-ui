# d-input-number 数字输入框

## 何时使用

<br/>

扩展 `a-input-number` 组件

## 代码演示

<tag text="基本">
<design-vue-ui-input-number-index />

:::slot content
在原有 a-input-number 上的扩展
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/input-number/index.vue
:::

</tag>

## API

### inputNumber props

| 参数           | 说明                         | 类型                             | 默认值 | 版本 |
| -------------- | ---------------------------- | -------------------------------- | ------ | ---- |
| value(v-model) | 内容                         | `number`                         | -      | -    |
| controls       | 是否显示增减按钮             | `boolean`                        | true   | -    |
| addonAfter     | 带标签的 input，设置后置标签 | string\|slot                     | -      | -    |
| min            | 最小值                       | `number`                         | -      | -    |
| max            | 最大值                       | `number`                         | -      | -    |
| step           | 每次改变步数，可以为小数     | `number`                         | 1      | -    |
| defaultValue   | 初始值                       | `number`                         | -      | -    |
| precision      | 数值精度                     | `number`                         | -      | -    |
| formatter      | 指定输入框展示值的格式       | function(value:number \| string) | -      | -    |

### 事件

| 事件名称 | 说明                                              | 回调参数        |
| -------- | ------------------------------------------------- | --------------- |
| change   | 选中 option，或 input 的 value 变化时，调用此函数 | function(value) |
