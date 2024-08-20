<template>
  <div ref="dropdown">
    <a-select
      :placeholder="placeholder"
      style="width:100%"
      :value="selectValue"
      mode="multiple"
      :open="isOpen"
      labelInValue
      :max-tag-count="maxTagCount"
      :getPopupContainer="(el) => el.parentNode"
      dropdownClassName="xm_dropdown_main"
      allowClear
      v-bind="$attrs"
      @focus="onFocus"
      @deselect="deselect"
    >
      <a-icon
        type="close-circle"
        slot="clearIcon"
        theme="filled"
        @click="clearAllClick"
      />
      <template slot="dropdownRender">
        <div class="xm_cascader_main" @click.stop="(e) => e.stopPropagation()">
          <a-empty
            :image="simpleImage"
            class="xm_empty_data"
            v-if="!listArr.length"
          />
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
  </div>
</template>
<script>
import { deepClone } from '../_utils/index'
import { Empty } from 'ant-design-vue'
import props from './props'
export default {
  name: 'DCascader',
  props: props,
  components: {},
  model: {
    prop: 'needValue',
    event: 'change'
  },
  data: () => {
    return {
      isOpen: false, // 控制面板是否打开，select组件选择后会自动关闭，需要手动控制
      listArr: [],
      treeDataCopy: [],
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      selectValue: []
    }
  },
  watch: {
    options: {
      handler (val) {
        this.treeDataCopy = deepClone(val)
        this.listArr = val && val.length ? [this.treeDataCopy] : []
      },
      immediate: true
    },
    needValue: {
      handler (val = []) {
        const _labelInValue = this.labelInValue
        const _val = _labelInValue ? val.map(v => v.key) : val
        // 与 selectValue 做比较，不一致，进行更新处理
        const isEqual = this.arraysEqual(_val, this.selectValue)
        console.log('neddval========', isEqual, this.selectValue)
        if (isEqual) return
        // 当 选择框 获取焦点时，执行下 根据 selectValue 选中 等处理
        this.updateCheckedStatus(this.treeDataCopy, _val)
      }
    }
  },
  beforeDestroy () {
    this.closePanel()
  },
  methods: {
    arraysEqual (arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false
      }
      const set1 = new Set(arr1)
      const set2 = new Set(arr2)
      return set1.size === set2.size && [...set1].every(item => set2.has(item))
    },
    closePanel (e) {
      if (e && this.$refs.dropdown && !this.$refs.dropdown.contains(e.target)) {
        this.isOpen = false
        document.removeEventListener('click', this.closePanel)
      }
    },
    startEvent () {
      document.addEventListener('click', this.closePanel)
    },
    clearAllClick () {
      // 删除所有，只需要把第一列数组全部修改成未选中状态
      this.listArr[0] &&
        this.listArr[0].forEach((item) => {
          if (item.$checked || item.$indeterminate) {
            this.handleChecked(item, false)
          }
        })
    },
    // val : label   key   这个是点击选择器里面的那个美格选项的删除
    deselect (val) {
      // 获取到 要删除 的那个 item
      const _item = this.getCurrentDelItem(this.treeDataCopy, val.key)
      // 选中 或 取消
      _item && this.handleChecked(_item)
    },
    getCurrentDelItem (arr, value) {
      let _item = null
      arr &&
        arr.some((v) => {
          if (v.value === value) {
            _item = v
            return true
          }
          const _temp = v.children && this.getCurrentDelItem(v.children, value)
          if (_temp) {
            _item = _temp
            return true
          }
          return false
        })
      return _item
    },
    itemChange (item, pIndex) {
      // 处理面板的显示列表数据 以及 显示效果
      this.handleListData(item, pIndex)
      // 处理 选中状态  没有孩子的列表item点击进行选中处理
      if (!item.children?.length) {
        this.handleChecked(item)
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
    // item 需要修改的item   customChecked： 自定义需要修改成的的状态 默认 -1 就是不需要自定义
    handleChecked (item, customChecked = -1) {
      // 当前选中或取消
      item.$checked = customChecked === -1 ? !item.$checked : customChecked
      item.$indeterminate = false // 只要当前check状态改变 indeterminate 置为 false
      // 选中或未选中状态，则处理孩子们的选中或未选中   ----- 向下
      this.handleNextChecked(item.children, item.$checked)
      // 选中或未选中状态，则处理长辈们的选中或未选中或indeterminate状态    ----- 向上
      this.handlePrevChecked()
      // 渲染 select 的值显示
      const _selectValue = [...this.selectValue] = this.setSelectValue(this.treeDataCopy)
      const _needValue = this.labelInValue ? _selectValue : _selectValue.map(v => v.key)
      this.$emit('change', _needValue)
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
        const _isExistChecked = _listArr[index].some(
          (v) => v.$checked || v.$indeterminate
        )
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
        if (v.$checked) {
          _selectValue.push({
            key: v.value,
            label: v.label
          })
        } else if (v.$indeterminate) {
          _selectValue.push(...this.setSelectValue(v.children))
        }
      })
      return _selectValue
    },
    /**
     * 点击多选框处理逻辑
     */
    handleCheckClick (e, subItem, pIndex) {
      this.handleChecked(subItem)
    },
    onFocus () {
      if (this.isOpen) {
        return
      }
      this.isOpen = true
      // 开始监听
      this.startEvent()
    },
    findParent (tree, value) {
      for (const node of tree) {
        if (node.children) {
          for (const child of node.children) {
            if (child.value === value) {
              return node
            }
            const result = this.findParent(node.children, value)
            if (result) return result
          }
        }
      }
      return null
    },
    // 去当前选中的选项并进行选中处理
    updateCheckedStatus (arr, valueArr) {
      let _valueArr = [...valueArr]
      arr && arr.some(v => {
        if (_valueArr.indexOf(v.value) !== -1) {
          // // this.handleChecked(v, true, true)
          // this.handleNextChecked(item.children, item.$checked)
          v.$checked = true
          this.handleNextChecked(v.children, v.$checked) // 向下全部选中
          let node = this.findParent(this.treeDataCopy, v.value)
          // 向上选中
          while (node) {
            node.$indeterminate = true
            node = this.findParent(this.treeDataCopy, node.value)
          }
          _valueArr = _valueArr.filter(j => j !== v.value)
          return !_valueArr.length
        }
        v.children && this.updateCheckedStatus(v.children, _valueArr)
      })
      this.selectValue = this.setSelectValue(this.treeDataCopy)
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
