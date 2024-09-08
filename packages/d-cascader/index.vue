<template>
  <div ref="dropdown" class="xm_cascader_main">
    <a-select
      :placeholder="placeholder"
      style="width: 100%"
      :value="getLabel()"
      mode="multiple"
      :open="isOpen"
      labelInValue
      :max-tag-count="maxTagCount"
      :dropdownClassName="`xm_dropdown_main ${
        allowResize ? 'xm_dropdown_main_resize' : ''
      }`"
      allowClear
      v-bind="$attrs"
      showArrow
      :showSearch="false"
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
        <div
          ref="panelRef"
          class="xm_cascader_panel"
          @click.stop="(e) => e.stopPropagation()"
        >
          <div v-if="!listArr.length" class="xm_empty_data">
            <slot name="notFoundContent">
              <a-empty :image="simpleImage" />
            </slot>
          </div>
          <div class="xm_cascader_search" v-if="showSearch">
            <a-input-search
              placeholder="请输入关键字"
              style="width: 100%"
              @search="onSearch"
            />
          </div>
          <div class="xm_cascader_content">
            <ul
              v-for="(item, pIndex) in listArr"
              :key="pIndex"
              class="xm_cascader_list"
            >
              <li v-if="pIndex === 0 && showSelectAll">
                <div class="title_content">
                  <a-checkbox
                    v-model="allChecked"
                    :indeterminate="!allChecked && !!selectValue.length"
                    @change="allCheckedChange"
                  >
                    全选
                  </a-checkbox>
                </div>
              </li>
              <li
                v-for="subItem in item"
                :key="subItem[optionProps.value]"
                @click.stop="itemChange(subItem, pIndex)"
                :class="{ cascader_item_active: subItem.$active,  cascader_item_disabled: !!subItem[optionProps.disabled]}"
              >
                <div class="title_content">
                  <a-checkbox
                    :checked="!!subItem.$checked"
                    :indeterminate="!!subItem.$indeterminate"
                    :disabled="!!subItem[optionProps.disabled]"
                    @click.stop="handleCheckClick($event, subItem, pIndex)"
                  >
                  </a-checkbox>
                  <span
                    class="text_ellpisis label_title"
                    :title="subItem[optionProps.label]"
                  >
                    <slot name="optionRender" :option="subItem">
                      {{ subItem[optionProps.label] }}
                    </slot>
                  </span>
                </div>
                <a-icon
                  :type="subItem.$loading ? 'loading' : 'right'"
                  v-show="
                   ( subItem[optionProps.children] &&
                    subItem[optionProps.children].length)
                    || (!subItem[optionProps.isLeaf] && !!loadData)
                  "
                />
              </li>
            </ul>
          </div>
        </div>
      </template>
    </a-select>
  </div>
</template>
<script>
/**
 * 还需要实现功能 远程搜索
 */
// import { deepClone } from '../_utils/index'
import { Empty, Select, Icon, Checkbox } from 'ant-design-vue'
import props from './props'
import eventMixin from './eventMixin'
import filterSearchMixin from './filter-search-mixin'
export default {
  name: 'DCascader',
  props: props,
  mixins: [eventMixin, filterSearchMixin],
  components: {
    ASelect: Select,
    AIcon: Icon,
    ACheckbox: Checkbox,
    AEmpty: Empty
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data: () => {
    return {
      listArr: [],
      treeDataCopy: [],
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      selectValue: [],
      allChecked: false, // 全选状态
      selectedChildItem: [], // 显示子节点的
      selectedParentItem: [] // 显示父节点的
    }
  },
  watch: {
    options: {
      handler (val) {
        // this.treeDataCopy = deepClone(val, this.optionProps)
        this.treeDataCopy = val
        this.listArr = val && val.length ? [this.treeDataCopy] : []
      },
      immediate: true
    },
    value: {
      handler (val = []) {
        const _labelInValue = this.labelInValue
        const _val = _labelInValue ? val.map((v) => v.key) : val
        // 与 selectValue 做比较，不一致，进行更新处理
        const isEqual = this.arraysEqual(_val, this.selectValue.map(v => v.key))
        if (isEqual) return
        // 当 选择框 获取焦点时，执行下 根据 selectValue 选中 等处理
        this.updateCheckedStatus(this.treeDataCopy, _val)
        this.setSelectedItem(val)
        this.allChecked = this.treeDataCopy.every((v) => v.$checked)
      },
      immediate: true
    }
  },
  computed: {
    optionProps () {
      const defaultObj = { label: 'label', value: 'value', children: 'children', isLeaf: 'isLeaf', disabled: 'disabled', disableCheckbox: 'disableCheckbox', selectable: 'selectable' }
      return Object.assign({}, defaultObj, this.fieldNames || {})
    }
  },
  methods: {
    getLabel () {
      const defaultDisplayRender = (itemArr) => itemArr
      // this.$scopedSlots.displayRender ||
      const displayRender = this.displayRender || defaultDisplayRender
      const arr = displayRender(this.selectValue)
      if (arr.length && typeof arr[0] === 'string') {
        return arr.map((v) => {
          return {
            key: v,
            label: v
          }
        })
      }
      return arr
    },
    // 全选 全取消 点击
    allCheckedChange (e) {
      this.clearOrAddAll(e.target.checked)
    },
    arraysEqual (arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false
      }
      const set1 = new Set(arr1)
      const set2 = new Set(arr2)
      return (
        set1.size === set2.size && [...set1].every((item) => set2.has(item))
      )
    },
    clearOrAddAll (checked) {
      this.selectValue = []
      this.handleEmitChange()
      this.treeDataCopy.forEach((item) => {
        if (!checked) {
          (item.$checked || item.$indeterminate) &&
            this.handleChecked(item, checked)
        } else this.handleChecked(item, checked)
      })
    },
    clearAllClick () {
      // 删除所有，只需要把第一列数组全部修改成未选中状态
      this.clearOrAddAll(false)
    },
    // val : label   key   这个是点击选择器里面的那个美格选项的删除
    deselect (val, option) {
      this.selectValue = this.selectValue.filter(v => v.key !== val.key)
      this.handleEmitChange()
      // 获取到 要删除 的那个 item
      const _item = this.getCurrentDelItem(this.treeDataCopy, val.key)
      // 选中 或 取消
      _item && this.handleChecked(_item)
      this.$emit('deselect', val, option)
    },
    getCurrentDelItem (arr, val) {
      let _item = null
      const { children, value } = this.optionProps
      arr &&
        arr.some((v) => {
          if (v[value] === val) {
            _item = v
            return true
          }
          const _temp = v[children] && this.getCurrentDelItem(v[children], val)
          if (_temp) {
            _item = _temp
            return true
          }
          return false
        })
      return _item
    },
    // 整个item点击的时候
    async itemChange (item, pIndex) {
      if (item[this.optionProps.disabled]) return
      this.listArr.splice(pIndex + 1) // 删除数组当前下标为index后面的元素
      this.clearActive(this.listArr.at(-1)) // 删除当前列表的选中 active
      item.$active = true
      const { children, isLeaf } = this.optionProps
      if (!item[isLeaf] && this.loadData && !item[children]?.length) {
        await this.loadData(item)
      }
      if (item[children]?.length) {
        this.clearActive(item[children])
        this.listArr.push(item[children])
        this.updateCheckedStatus(this.treeDataCopy, this.selectValue)
        // this.handleNextChecked(item[children], item.$checked)
        // item.$checked && this.handleNextChecked(item[children], item.$checked)
      } else if (item[isLeaf] || !this.loadData) {
        this.handleChecked(item)
      }
      this.checkElementBounds()
    },
    // item 需要修改的item   customChecked： 自定义需要修改成的的状态 默认 -1 就是不需要自定义
    handleChecked (item, customChecked = -1) {
      // 当前选中或取消
      item.$checked = customChecked === -1 ? !item.$checked : customChecked
      item.$indeterminate = false // 只要当前check状态改变 indeterminate 置为 false
      // 选中或未选中状态，则处理孩子们的选中或未选中   ----- 向下
      this.handleNextChecked(item[this.optionProps.children], item.$checked)
      // 选中或未选中状态，则处理长辈们的选中或未选中或indeterminate状态    ----- 向上
      this.handlePrevChecked()
      // 渲染 select 的值显示
      this.setSelectedItem()
      this.allChecked = this.treeDataCopy.every((v) => v.$checked)
      this.handleEmitChange()
      // 渲染
    },
    handleEmitChange () {
      const _selectValue = this.selectValue
      const _needValue = this.labelInValue
        ? [..._selectValue]
        : _selectValue.map((v) => v.key)
      this.$emit(
        'change',
        _needValue,
        [...this.selectedChildItem],
        [...this.selectedParentItem]
      )
    },
    /**
     * 处理下一级的选中或未选中
     */
    handleNextChecked (childArr, checked) {
      if (!childArr?.length) return
      const { children, disabled } = this.optionProps
      childArr.forEach((v) => {
        !v[disabled] && (v.$checked = checked)
        v.$indeterminate = false
        this.handleNextChecked(v[children], checked)
      })
    },
    /**
     * 处理上一级选中或未选中或 indeterminate 状态
     */
    handlePrevChecked () {
      const _listArr = this.listArr
      const _pIndex = _listArr.length - 1
      const { disabled } = this.optionProps
      // let _item = item
      if (_pIndex === 0) return
      for (let index = _pIndex; index > 0; index--) {
        // 是否是全部选中状态 _isAllChecked = true 父级为选中状态
        // _isAllChecked = false 父级为 indeterminate 或 未选中 状态
        const _isAllChecked = _listArr[index].every((v) => v.$checked || v[disabled])
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
    setLoadSelectValue (modeVal) {
      this.selectValue = modeVal.map(v => ({
        label: v?.label || v,
        key: v?.key || v
      }))
    },
    setSelectedItem (val) {
      const { label, value } = this.optionProps

      // 获取选中的父节点和子节点
      const _selectedParentItem = this.setSelectParentValue(this.treeDataCopy)
      const _selectedChildItem = this.setSelectChildValue(this.treeDataCopy)

      // 根据是否展示被选中的子节点来选择数据源
      const _selectValue = this.showCheckedChild ? _selectedChildItem : _selectedParentItem
      const prevSelectItem = this.showCheckedChild ? this.selectedChildItem : this.selectedParentItem

      // 获取 array1 中不在 array2 中的对象
      const uniqueInArray1 = (array1, array2) =>
        array1.filter(item1 => !array2.some(item2 => item1[value] === item2[value]))

      // 更新选中的父子节点
      this.selectedParentItem = _selectedParentItem
      this.selectedChildItem = _selectedChildItem

      if (val) {
        // 处理传入的值
        this.selectValue = val.map(v => this.processValue(v, _selectValue, { label, value }))
      } else {
        // 计算不在选中值中的选项
        const _noOptionsValue = uniqueInArray1(prevSelectItem, _selectValue)
        const _mergeOptionValue = this.selectValue.filter(item =>
          !_noOptionsValue.some(v => v[value] === item.key)
        )

        const _arr2 = _selectValue.map(item => ({
          label: item[label],
          key: item[value]
        }))

        // 使用 Map 对象进行合并
        const map = new Map()
        _mergeOptionValue.concat(_arr2).forEach(item =>
          map.set(item.key, { ...map.get(item.key), ...item })
        )

        this.selectValue = Array.from(map.values())
      }
    },
    processValue (v, selectValue, { label, value }) {
      if (typeof v === 'string') {
        const foundItem = selectValue.find(item => item[value] === v)
        return foundItem || { label: v, key: v }
      }

      const foundItem = selectValue.find(item => item[value] === v.key)
      return foundItem || { label: v.label, key: v.key }
    },
    setSelectParentValue (arr) {
      const _selectValue = []
      const { children, label, value } = this.optionProps
      arr.forEach((v) => {
        if (v.$checked) {
          const { [children]: dynamicValue, ...r } = v
          _selectValue.push({
            ...r,
            label: r[label],
            key: r[value]
          })
        } else if (v.$indeterminate) {
          v[children] && _selectValue.push(...this.setSelectParentValue(v[children]))
        }
      })
      return _selectValue
    },
    setSelectChildValue (arr) {
      const _selectValue = []
      const { children, value } = this.optionProps
      arr.forEach((v) => {
        if (v[children]?.length) {
          (v.$indeterminate || v.$checked) &&
            _selectValue.push(...this.setSelectChildValue(v[children]))
        } else {
          if (v.$checked) {
            const { children, ...r } = v
            _selectValue.push({
              ...r,
              key: r[value]
            })
          }
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
    findParent (tree, val) {
      const { children, value } = this.filter
      for (const node of tree) {
        if (node[children]) {
          for (const child of node[children]) {
            if (child[value] === val) {
              return node
            }
            const result = this.findParent(node[children], val)
            if (result) return result
          }
        }
      }
      return null
    },
    // 去当前选中的选项并进行选中处理
    updateCheckedStatus (arr, valueArr) {
      const isArrayOfStrings = (ww) => {
        return Array.isArray(ww) && ww.every(item => typeof item === 'string')
      }
      const _valueArr = isArrayOfStrings(valueArr) ? [...valueArr] : valueArr.map(v => v.key)
      const _obj = {
        checkedNum: 0,
        indeterminateNum: 0
      }
      // 先全部定义的选中，再遍历
      const { children, value } = this.optionProps
      arr.forEach((v) => {
        v.$indeterminate = false
        v.$checked = false // 全部置为 false
        if (_valueArr.indexOf(v[value]) !== -1) {
          v.$checked = true
          this.handleNextChecked(v[children], v.$checked) // 向下全部选中
          _obj.checkedNum++
        } else if (v[children]?.length) {
          const _chidObj = this.updateCheckedStatus(v[children], valueArr)
          if (!_chidObj.checkedNum && !_chidObj.indeterminateNum) return
          if (
            _chidObj.indeterminateNum ||
            _chidObj.checkedNum !== v[children].length
          ) {
            v.$indeterminate = true
            _obj.indeterminateNum++
          } else {
            v.$checked = true
            _obj.checkedNum++
          }
        }
      })
      return _obj
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
@import url("./index.less");
</style>
