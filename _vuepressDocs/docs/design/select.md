# d-select 分页选择框

## 何时使用

<br/>

扩展 `a-select` 组件，又一定的局限性，如果只是使用普通的，建议使用 `a-select`

## 代码演示
<box>
<tag text="基本">
<design-vue-ui-select-index />

:::slot content
支持大多数 `a-select` 的 `API` 属性，

mode 为 tags 并 手动输入添加的 未支持

常规功能大多支持
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/select/index.vue
:::

</tag>
<tag text="回填到选择框的 Option 的属性值-optionLabelProp">
<design-vue-ui-select-label-prop />

:::slot content
默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value。
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/select/label-prop.vue
:::

</tag>

<tag text="分页-pagination-动态加载">
<design-vue-ui-select-pagination-load />

:::slot content

完整的例子

远程搜索建议使用 labelInValue 模式，编辑回显 value 值 找不到 回显效果不好
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/select/pagination-load.vue
:::

</tag>
<tag text="上滑分页">
<design-vue-ui-select-pull-down />

:::slot content

完整的例子

远程搜索建议使用 labelInValue 模式，编辑回显 value 值 找不到 回显效果不好
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/select/pull-down.vue
:::

</tag>
<tag text="分页-pagination">
<design-vue-ui-select-pagination />

:::slot content
默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value。

远程搜索建议使用 labelInValue 模式，编辑回显 value 值 找不到 回显效果不好
:::

::: slot sourceCode
<<< @/docs/.vuepress/components/design-vue-ui/select/pagination.vue
:::

</tag>
</box>
