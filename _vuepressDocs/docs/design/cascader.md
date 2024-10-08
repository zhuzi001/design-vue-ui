# d-cascader 多选级联

## 何时使用

<br/>

<div style="margin-top: 24px">常规的 使用`a-cascader`</div>

[a-cascader](https://1x.antdv.com/components/cascader-cn/)

`d-cascader` 是一个基于 `ant-design-vue` 中的 `a-cascader` 组件扩展的多功能级联选择组件(但未使用 `a-cascader` 组件，故不能全使用里面的属性等，以文中属性为主)，提供以下增强功能：

## 代码演示

<box>
<tag text="基本使用 - 多选级联">
<design-vue-ui-cascader-index />

:::slot content
支持多选模式的级联选择，允许用户在多个级别中进行选择
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/cascader/index.vue
:::

</tag>

<tag text="只显示选中的子节点">
<design-vue-ui-cascader-show-child-nodes />

:::slot content
组件会自动筛选并仅显示当前已选中子节点的选项。
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/cascader/show-child-nodes.vue
:::

</tag>

<tag text="显示全选按钮进行全选处理">
<design-vue-ui-cascader-all-checked />

:::slot content
提供全选按钮，允许用户在当前级别上快速选择所有选项。
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/cascader/all-checked.vue
:::

</tag>

<tag text="label 包装到 value 中 {key: string, label: string}">
<design-vue-ui-cascader-label-in-value />

:::slot content
label 和 key 被包装到 value 中，便于处理和显示自定义数据。
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/cascader/label-in-value.vue
:::

</tag>

<tag text="自定义 option 显示数据">
<design-vue-ui-cascader-cus-option />

:::slot content
允许用户自定义下拉选项的显示数据和格式。
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/cascader/cus-option.vue
:::

</tag>

<tag text="自定义已选项">
<design-vue-ui-cascader-display-render />

:::slot content
返回值格式为 [{ label: **,key: ** }] ， 因为处理后的数据逻辑 key 值 会变化，

采用这种方式，要么 key 使用 fieldNames 中的 value 值， 要么通过 deselect 自己进行删除处理逻辑

:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/cascader/display-render.vue
:::

</tag>
<tag text="自定义字段名">
<design-vue-ui-cascader-cus-field-names />

:::slot content
支持自定义字段名称，以适应不同的数据结构需求。
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/cascader/cus-field-names.vue
:::

</tag>

<tag text="自定义没有数据的 option 面板显示效果">
<design-vue-ui-cascader-cus-empty />

:::slot content
提供自定义配置，用于定制当没有数据时 option 面板的显示效果，提升用户体验。
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/cascader/cus-empty.vue
:::

</tag>
<tag text="遇到面板超过边界动态左移显示出完整面板">
<design-vue-ui-cascader-resize />

:::slot content
遇到超出边界，为了显示 options 数据，而又不愿意移位置到其他地方化的，可以试试这个属性。
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/cascader/resize.vue
:::

</tag>

<tag text="点击options item 动态加载下一级">
<design-vue-ui-cascader-load-data />

:::slot content
loadData 函数：加载数据并根据 isLeaf 确定是否需要加载下一级。  
处理异步操作：确保异步操作完成后再处理后续逻辑。  
loadData 必须处理完异步操作，组件还需要处理后面的逻辑，所以需要使用到 promise 或 async
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/cascader/load-data.vue
:::

</tag>

<tag text="搜索功能">
<design-vue-ui-cascader-search />

:::slot content
optionFilterProp 搜索查询某字段 （默认 label （fieldNames 中的label属性））

目前只能过滤当前已经存在的数据，远程的，无法过滤
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/cascader/search.vue
:::

</tag>
</box>

## API

### cascader props

<design-vue-ui-cascader-_table />

### 事件

<design-vue-ui-cascader-_table-event />

<a-alert
    style="margin-top:12px"
    message=" isLeaf?: boolean;"
    description="标记是否为叶子节点，设置了 `loadData` 时有效!!!!!!!!!!设为 `false` 时会强制标记为父节点，即使当前节点没有 children，也会显示展开图标"
    type="warning"
    show-icon
    />
