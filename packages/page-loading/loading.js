import Vue from 'vue'
import loadingComponent from './index.vue'
/***
 *
 * 对loading提供js方法   绑定到Vue prototype 上
 */
const LoadingConstructor = Vue.extend(loadingComponent)

const instance = new LoadingConstructor({})

instance.show = false // 默认隐藏
const loading = {
  /**
   *
   * @param {显示内容} tip
   * @param {挂在在哪一个标签中} el
   */
  show ({ tip = '', el = null } = {}) {
    // 显示方法
    const loading = instance.$mount()
    instance.show = true
    instance.tip = tip || ''
    // eslint-disable-next-line no-unused-expressions
    el ? el.appendChild(loading.$el) : document?.body?.appendChild(loading.$el)
  },
  hide () {
    // 隐藏方法
    instance.show = false
  }
}

export default loading
