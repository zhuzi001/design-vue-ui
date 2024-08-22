<template>
  <a-tooltip placement="top">
    <template slot="title">
      <span>列设置</span>
    </template>
    <a-popover
      placement="bottom"
      trigger="click"
      :visible="clicked"
      @visibleChange="handleClickChange"
    >
      <div slot="title" class="xm_dropdown_title">
        <a-checkbox
          :indeterminate="indeterminate"
          :checked="checkAll"
          @change="onCheckAllChange"
        >
          列展示
        </a-checkbox>
        <a @click="resetHeaders(false)" class="reset">重置</a>
      </div>
      <div slot="content" class="xm_list_setting">
        <ul class="list_ul">
          <a-checkbox-group v-model="checkedList" @change="onChange">
            <Vuedraggable
              :options="{ draggable: '.item_drag' }"
              @end="onEnd"
              :value="columnsCopy"
              @input="dragChange"
            >
              <li
                v-for="item in columnsCopy.filter(v=>v.title)"
                :key="item.dataIndex"
                class="content-ul-li"
                :class="item.noDrag ? '' : 'item_drag'"
              >
                <a-checkbox
                  class="checkbox"
                  :value="item.dataIndex"
                  :disabled="item.disabled"
                >
                  {{ item.title }}
                </a-checkbox>
              </li>
            </Vuedraggable>
          </a-checkbox-group>
        </ul>
      </div>
      <a-icon type="setting" class="icon"></a-icon>
    </a-popover>
  </a-tooltip>
</template>
<script>
import { Tooltip, Popover, Icon, Checkbox } from 'ant-design-vue'
import Vuedraggable from 'vuedraggable'
export default {
  name: 'DTableSet',
  components: {
    ATooltip: Tooltip, APopover: Popover, AIcon: Icon, ACheckbox: Checkbox, Vuedraggable
  },
  data () {
    return {
      checkedList: [],
      checkAll: false,
      clicked: false,
      columnsCopy: [],
      indeterminate: false,
      resetColumns: [],
      storageName: ''
    }
  },
  created () {
    this.storageName = this.suffix + this.$route.path
    this.resetColumns = [...this.columns]
    this.resetHeaders(true)
  },
  props: {
    // 显示的列表
    columns: {
      type: Array,
      default: () => []
    },
    // 缓存的时候增加的前缀
    suffix: {
      type: String,
      default: ''
    },
    // 是否缓存
    isCache: {
      type: Boolean,
      default: false
    }
  },
  watch: {},
  methods: {
    onEnd () {},
    dragChange (value) {
      this.renderData(value)
    },
    resetHeaders (useStorage) {
      const _resetColumns = this.resetColumns ? [...this.resetColumns] : []
      this.$emit('change', _resetColumns)
      this.columnsCopy = _resetColumns
      this.indeterminate = false
      const noExistList = localStorage.getItem(this.storageName)
      const isCache = this.isCache // 是否缓存，默认不缓存
      if (useStorage && noExistList && isCache) {
        this.checkedStorage(noExistList)
      } else this.initRender()
    },
    initRender () {
      this.checkedList = this.checkedAll()
      this.checkAll = true
      this.renderData(this.columnsCopy)
    },
    checkedStorage (storageData) {
      storageData = JSON.parse(storageData)
      if (!storageData.length) return this.initRender()
      const checkedList = [].concat(
        this.columnsCopy
          .filter((val) => {
            return !storageData.includes(val.dataIndex)
          })
          .map((item) => item.dataIndex)
      )
      this.checkedList = checkedList
      // checkedList 选中的列表的长度  就是columnsCopy的长度，那么缓存的数据已经没要了，所以是全选
      if (checkedList.length === this.columnsCopy.length) this.checkAll = true
      else if (checkedList.length) this.indeterminate = true
      this.renderData(this.columnsCopy)
    },
    // 点击box
    onChange (checkedList) {
      this.indeterminate =
        !!checkedList.length && checkedList.length < this.columnsCopy.length
      this.checkAll = checkedList.length === this.columnsCopy.length
      this.renderData(this.columnsCopy)
    },
    // 全选
    checkedAll () {
      const arr = []
      this.columnsCopy.forEach((item) => {
        arr.push(item.dataIndex && item.dataIndex)
      })
      return arr
    },
    checkedAllDisabled () {
      const arr = []
      this.columnsCopy.forEach((item) => {
        item.disabled && arr.push(item.dataIndex && item.dataIndex)
      })
      return arr
    },
    // 切换点击状态
    handleClickChange (visible) {
      this.clicked = visible
    },
    // 点击全选
    onCheckAllChange (e) {
      this.checkedList = e.target.checked
        ? this.checkedAll()
        : this.checkedAllDisabled()
      this.indeterminate = false
      this.checkAll = e.target.checked
      this.renderData(this.columnsCopy)
    },
    // 设置隐藏的属性
    setNoExistColumns (data) {
      data
        ? localStorage.setItem(this.storageName, JSON.stringify(data))
        : localStorage.removeItem(this.storageName)
    },
    // 规序化 数据
    renderData (columnsData) {
      const noExistColumns = [].concat(
        columnsData
          .filter((val) => {
            return !this.checkedList.includes(val.dataIndex)
          })
          .map((item) => item.dataIndex)
      )
      this.setNoExistColumns(noExistColumns)
      const arr = []
      columnsData.forEach((item) => {
        this.checkedList &&
          this.checkedList.every((key) => {
            if (key === item.dataIndex) {
              arr.push(item)
              return false
            }
            return true
          })
      })
      this.columnsCopy = [...columnsData]
      this.$emit('change', arr)
    }
  }
}
</script>
<style lang="less">
@import "~ant-design-vue/lib/style/themes/index.less";
.xm_list_setting {
  .list_ul {
    padding-left: 0;
    margin-bottom: 0;
  }
}
.xm_dropdown_title {
  display: flex;
  justify-content: space-between;
}
.xm_table-set-icon {
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: @primary-color;
  }
}

// .ant-popover-content {
//   user-select: none;
// }
</style>
