// 暴露组件
import DTooltip from './d-tooltip'
import DTable from './d-table'
import DCascader from './d-cascader'
import PageLoading from './page-loading'
import Loading from './page-loading/loading.js'

DTooltip.install = (vue) => {
  vue.component(DTooltip.name, DTooltip)
}

PageLoading.install = (vue) => {
  vue.component(PageLoading.name, PageLoading)
}

DTable.install = (vue) => {
  vue.component(DTable.name, DTable)
}

DCascader.install = (vue) => {
  vue.component(DCascader.name, DCascader)
}

const components = [PageLoading, DTooltip, DTable, DCascader]

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })

  //  里面会用到，顺带一起了
  Vue.prototype.$xmLoading = Loading
  Vue.prototype.$xmConfig = config
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const config = {
  $apiFc: function () {}
}

export { DTooltip, PageLoading, DTable, DCascader }

export default {
  install,
  config
}
