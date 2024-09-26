// 暴露组件
import DTooltip from './d-tooltip'
import DTable from './d-table'
import DCascader from './d-cascader'
import DTextarea from './d-textarea'
import DInput from './d-input'
import DInputNumber from './d-input-number'
import DSelect from './d-select'
import DMultipleSelect from './d-multiple-select'
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

DTextarea.install = (vue) => {
  vue.component(DTextarea.name, DTextarea)
}

DInput.install = (vue) => {
  vue.component(DInput.name, DInput)
}

DInputNumber.install = (vue) => {
  vue.component(DInputNumber.name, DInputNumber)
}

DSelect.install = (vue) => {
  vue.component(DSelect.name, DSelect)
}

DMultipleSelect.install = (vue) => {
  vue.component(DMultipleSelect.name, DMultipleSelect)
}

const components = [
  PageLoading,
  DTooltip,
  DTable,
  DCascader,
  DTextarea,
  DInput,
  DInputNumber,
  DSelect,
  DMultipleSelect
]

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

export {
  DTooltip,
  PageLoading,
  DTable,
  DCascader,
  DTextarea,
  DInput,
  DInputNumber,
  DSelect,
  DMultipleSelect
}

export default {
  install,
  config
}
