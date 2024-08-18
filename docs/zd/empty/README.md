# CEmpty 空状态

空状态时的展示占位图。

空状态时的展示占位图。

## 何时使用

- 当目前没有数据时，用于显式的用户提示。
- 初始化场景时的引导创建流程。

## 代码演示

<tag text="最简单的例子"/>
<Empty-Simple/>

::: details 点击查看代码 vue 页面
<<< @/docs/.vuepress/components/Empty/Simple.vue
:::

<tag text="提供的默认显示例子"/>
<Empty-Basic/>

::: details 点击查看代码 vue 页面
<<< @/docs/.vuepress/components/Empty/Basic.vue
:::

<tag text="自定义例子"/>
<Empty-Custom/>

::: details 点击查看代码 vue 页面
<<< @/docs/.vuepress/components/Empty/Custom.vue
:::

## Api

| 参数        | 说明                                         | 类型                          | 默认值               | 版本 |
| ----------- | -------------------------------------------- | ----------------------------- | -------------------- | ---- |
| description | 自定义描述内容                               | <code>string&#124;slot</code> | imageType 对应默认值 | -    |
| imageStyle  | 图片样式                                     | CSSProperties                 | -                    | -    |
| image       | 设置显示图片，为 string 时表示自定义图片地址 | <code>string&#124;slot</code> | imageType 对应默认值 | -    |
| imageType   | 图片自定义的一系列默认值                     | string                        | 'empty'              | -    |


## imageType  值

