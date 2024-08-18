# 基本组件介绍

## GlobalHeader

> layout 头部组件 给 layout 使用的

::: warning config
代表 `@/config/default.config.js`
:::

data:

| name        |  type   |      default       | sources  | remarks                 |
| ----------- | :-----: | :----------------: | -------- | ----------------------- |
| title       | String  | config.projectName | data     | config 中的 projectName |
| isShowTitle | Boolean |       false        | props    | 是否显示管理系统名称    |
| headTheme   | String  |  config.headTheme  | computed | light or dark           |
| layout      | String  |   config.layout    | computed | sidemenu or topmenu     |

::: details 点击查看实例

```html
<global-header :isShowTitle="true" />
```

```javascript {1,8}
import GlobalHeader from '@/components/GlobalHeader'
export default {
  name: 'BaseLayout',
  data() {
    return {}
  },
  components: {
    GlobalHeader
  }
}
```

:::

## GlobalLeft

> layout 左边 slide 组件 给 layout 使用的

::: warning config
代表 `@/config/default.config.js`
:::

data:

| name        |  type   |      default       | sources  | remarks                 |
| ----------- | :-----: | :----------------: | -------- | ----------------------- |
| title       | String  | config.projectName | data     | config 中的 projectName |
| isShowTitle | Boolean |       false        | props    | 是否显示管理系统名称    |
| navTheme    | String  |  config.navTheme   | computed | light or dark           |
| collapsed   | Boolean |       false        | data     | slide 下边的收缩状态    |

::: details 点击查看实例

```html
<global-left v-if="layout === 'sidemenu'" />
```

```javascript {1,8}
import GlobalLeft from '@/components/GlobalLeft'
export default {
  name: 'BaseLayout',
  data() {
    return {}
  },
  components: {
    GlobalLeft
  }
}
```

:::

## GlobalMenu

> layout 菜单组件，slide 或 head 给 layout 使用的

::: warning config
代表 `@/config/default.config.js`
:::

data:

| name         |  type  |            default            | sources  | remarks                |
| ------------ | :----: | :---------------------------: | -------- | ---------------------- |
| mode         | String |            inline             | props    | menu 摆放方式          |
| selectedKeys | Array  | [this.$store.getters.menuKey] | computed | menu 目前选中状态      |
| theme        | String |        config 计算而得        | computed | light or dark 菜单主题 |

::: details 点击查看实例

```html
<global-menu />
```

```javascript {1,8}
import GlobalMenu from '@/components/GlobalMenu'
export default {
  name: 'GlobalLeft',
  data() {
    return {}
  },
  components: {
    GlobalMenu
  }
}
```

:::

## GlobalContent

> layout 中心部分 给 layout 使用的

::: details 点击查看实例

```html
<global-content />
```

```javascript {1,8}
import GlobalContent from '@/components/GlobalContent'
export default {
  name: 'BaseLayout',
  data() {
    return {}
  },
  components: {
    GlobalContent
  }
}
```

:::

## PageLoading

> 页面加载

使用方式：

```javascript {4,6}
export default {
  methods: {
    handleClick() {
      this.$loading.show() // loading加载
      setTimeout(() => {
        this.$loading.hide() // loading销毁
      }, 2000)
    }
  }
}
```
