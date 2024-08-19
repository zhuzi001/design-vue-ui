<template>
  <a-select
    v-bind="$attrs"
    :placeholder="placeholder"
    style="width: 240px"
    :value="selectValue"
    mode="multiple"
    :open="isOpen"
    :getPopupContainer="(el) => el.parentNode"
    dropdownClassName="xm_dropdown_main"
    @focus="onFocus"
  >
    <template slot="dropdownRender">
      <!-- <v-nodes :vnodes="menu" /> -->
      <div class="xm_cascader_main" @click.stop="(e) => e.stopPropagation()">
        <ul v-for="(item, pIndex) in listArr" :key="pIndex">
          <li
            v-for="subItem in item"
            :key="subItem.value"
            @click.stop="itemChange(subItem, pIndex)"
            :class="{ cascader_item_active: subItem.$active }"
          >
            <div class="title_content">
              <a-checkbox
                :checked="!!subItem.$checked"
                :indeterminate="!!subItem.$indeterminate"
                @click.stop="handleCheckClick($event, subItem, pIndex)"
              >
              </a-checkbox>
              <span class="text_ellpisis label_title" :title="subItem.label">
                {{ subItem.label }}
              </span>
            </div>
            <a-icon
              type="right"
              v-show="subItem.children && subItem.children.length"
            />
          </li>
        </ul>
      </div>
    </template>
  </a-select>
</template>
<script>
import { deepClone } from '../_utils/index'
export default {
  name: 'DCascader',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  components: {},
  data: () => {
    return {
      isOpen: false, // 控制面板是否打开，select组件选择后会自动关闭，需要手动控制
      selectValue: [],
      listArr: [],
      treeDataCopy: []
    }
  },
  watch: {
    options: {
      handler (val) {
        this.treeDataCopy = deepClone(val)
        this.listArr = val ? [this.treeDataCopy] : []
      },
      immediate: true
    }
  },
  methods: {
    itemChange (item, pIndex) {
      // 处理面板的显示列表数据 以及 显示效果
      this.handleListData(item, pIndex)
      // 处理 选中状态  没有孩子的列表item点击进行选中处理
      if (!item.children?.length) {
        this.handleChecked(item, pIndex)
      }
    },
    /**
     * 处理面板的显示列表数据 以及 显示效果
     */
    handleListData (item, pIndex) {
      this.listArr.splice(pIndex + 1) // 删除数组当前下标为index后面的元素
      this.clearActive(this.listArr.at(-1)) // 删除当前列表的选中 active
      item.$active = true
      if (item.children?.length) {
        this.clearActive(item.children)
        this.listArr.push(item.children)
      }
    },
    handleChecked (item, pIndex) {
      // 当前选中或取消
      item.$checked = !item.$checked
      item.$indeterminate = false // 只要当前check状态改变 indeterminate 置为 false
      // 选中或未选中状态，则处理孩子们的选中或未选中   ----- 向下
      this.handleNextChecked(item.children, item.$checked)
      // 选中或未选中状态，则处理长辈们的选中或未选中或indeterminate状态    ----- 向上
      this.handlePrevChecked()
      // 渲染 select 的值显示
      // this.listArr = deepClone(this.listArr)
      this.selectValue = this.setSelectValue(this.treeDataCopy)
      // 渲染
    },
    /**
     * 处理下一级的选中或未选中
     */
    handleNextChecked (childArr, checked) {
      if (!childArr?.length) return
      childArr.forEach((v) => {
        v.$checked = checked
        this.handleNextChecked(v.children, checked)
      })
    },
    /**
     * 处理上一级选中或未选中或 indeterminate 状态
     */
    handlePrevChecked () {
      const _listArr = this.listArr
      const _pIndex = _listArr.length - 1
      // let _item = item
      if (_pIndex === 0) return
      for (let index = _pIndex; index > 0; index--) {
        // 是否是全部选中状态 _isAllChecked = true 父级为选中状态
        // _isAllChecked = false 父级为 indeterminate 或 未选中 状态
        const _isAllChecked = _listArr[index].every((v) => v.$checked)
        // 是否存在 选中 状态  _isExistChecked = true 父级为状态 选中 或 indeterminate 状态
        // 是否存在 未选中 状态  _isExistChecked = false 父级为状态  未选中 状态
        const _isExistChecked = _listArr[index].some((v) => v.$checked)
        // 获取当前的父亲item
        const _item = _listArr[index - 1].filter((v) => v.$active)
        _item.forEach((v) => {
          v.$checked = _isAllChecked // 父亲的选中状态
          v.$indeterminate = !_isAllChecked && _isExistChecked // 表示没有全部选中 但是也存在 部分选中
        })
      }
    },
    setSelectValue (arr) {
      const _selectValue = []
      arr.forEach((v) => {
        if (v.$checked) _selectValue.push(v.value)
        else if (v.$indeterminate) {
          _selectValue.push(...this.setSelectValue(v.children))
        }
      })
      return _selectValue
    },
    /**
     * 点击多选框处理逻辑
     */
    handleCheckClick (e, subItem, pIndex) {
      this.handleChecked(subItem, pIndex)
    },
    onFocus () {
      this.isOpen = true
    },
    clearActive (childArr) {
      childArr &&
        childArr.forEach((element) => {
          element.$active = false
        })
    }
  }
}
</script>
<style lang="less">
@import url(./index.less);
</style>
